/**
 * gsc-export.mjs — Exporta dados da Google Search Console para CSV.
 *
 * Uso:
 *   GSC_SERVICE_ACCOUNT_JSON='{"type":"service_account",...}' node scripts/gsc-export.mjs
 *
 * Saída:
 *   data/gsc/YYYY-MM-DD_queries.csv  — desempenho por consulta (query)
 *   data/gsc/YYYY-MM-DD_pages.csv    — desempenho por página (page)
 *
 * Requer: Node.js >= 18 (fetch nativo).
 * Sem dependências externas além da API do Google (OAuth via JWT manual).
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createSign } from 'node:crypto';

const PROPERTY = 'https://bumavit.com.br';
const DAYS = 28;
const ROW_LIMIT = 25000; // máximo da API por requisição

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'data', 'gsc');

// ── Credenciais ───────────────────────────────────────────────────────────────

const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
if (!raw) {
  console.error(
    'Erro: variável GSC_SERVICE_ACCOUNT_JSON não definida.\n' +
    'Exporte o JSON da conta de serviço antes de rodar o script.\n' +
    'Exemplo:\n' +
    "  export GSC_SERVICE_ACCOUNT_JSON='$(cat service-account.json)'\n" +
    '  node scripts/gsc-export.mjs'
  );
  process.exit(1);
}

let sa;
try {
  sa = JSON.parse(raw);
} catch {
  console.error('Erro: GSC_SERVICE_ACCOUNT_JSON não é JSON válido.');
  process.exit(1);
}

if (sa.type !== 'service_account') {
  console.error('Erro: credencial não é do tipo service_account.');
  process.exit(1);
}

// ── JWT + token OAuth2 ────────────────────────────────────────────────────────

function base64url(buf) {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  );
  const sigInput = `${header}.${claim}`;
  const sign = createSign('RSA-SHA256');
  sign.update(sigInput);
  const sig = base64url(sign.sign(sa.private_key));
  const jwt = `${sigInput}.${sig}`;

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Falha ao obter token OAuth2: ${res.status} ${body}`);
  }
  const data = await res.json();
  return data.access_token;
}

// ── Datas ─────────────────────────────────────────────────────────────────────

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

const endDate = new Date();
endDate.setDate(endDate.getDate() - 3); // GSC tem ~3 dias de delay
const startDate = new Date(endDate);
startDate.setDate(startDate.getDate() - (DAYS - 1));

const dateLabel = isoDate(new Date()); // data de geração para o nome do arquivo

// ── Consulta à API ────────────────────────────────────────────────────────────

async function queryGSC(token, dimensions) {
  const url =
    `https://searchconsole.googleapis.com/webmasters/v3/sites/` +
    `${encodeURIComponent(PROPERTY)}/searchAnalytics/query`;

  const body = {
    startDate: isoDate(startDate),
    endDate: isoDate(endDate),
    dimensions,
    rowLimit: ROW_LIMIT,
    dataState: 'final',
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GSC API erro (${dimensions.join(',')}): ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.rows ?? [];
}

// ── CSV ───────────────────────────────────────────────────────────────────────

function escapeCSV(val) {
  if (val === null || val === undefined) return '';
  const s = String(val);
  return s.includes(',') || s.includes('"') || s.includes('\n')
    ? `"${s.replace(/"/g, '""')}"`
    : s;
}

function rowsToCSV(rows, dimensionKey) {
  const header = [dimensionKey, 'clicks', 'impressions', 'ctr', 'position'];
  const lines = [header.join(',')];
  for (const row of rows) {
    const dim = escapeCSV(row.keys[0]);
    const ctr = (row.ctr * 100).toFixed(2); // percentual
    const pos = row.position.toFixed(1);
    lines.push([dim, row.clicks, row.impressions, ctr, pos].join(','));
  }
  return lines.join('\n') + '\n';
}

// ── Main ──────────────────────────────────────────────────────────────────────

console.log(`Propriedade: ${PROPERTY}`);
console.log(`Período: ${isoDate(startDate)} → ${isoDate(endDate)} (${DAYS} dias)`);
console.log('Autenticando...');

const token = await getAccessToken(sa);
console.log('Token obtido.');

console.log('Consultando por consulta (query)...');
const queryRows = await queryGSC(token, ['query']);

console.log('Consultando por página (page)...');
const pageRows = await queryGSC(token, ['page']);

mkdirSync(outDir, { recursive: true });

const queryFile = join(outDir, `${dateLabel}_queries.csv`);
const pageFile = join(outDir, `${dateLabel}_pages.csv`);

writeFileSync(queryFile, rowsToCSV(queryRows, 'query'), 'utf8');
writeFileSync(pageFile, rowsToCSV(pageRows, 'page'), 'utf8');

console.log(`\nArquivos gerados:`);
console.log(`  ${queryFile}  (${queryRows.length} linhas)`);
console.log(`  ${pageFile}  (${pageRows.length} linhas)`);
