/* Gera docs/faixas-de-preco.md a partir das tabelas de js/estimator.js.
   Uso: node scripts/build-pricing.mjs
   O estimador é a fonte de verdade dos valores. Este arquivo só lê RATE,
   PRICING, PAGES_INCLUDED, PAGES_MAX, EXTRA_PAGE, BUDGET_RANGES e FEATURES
   e escreve o documento que os agentes de conteúdo usam para citar preço.
   Se o estimador mudar, rode de novo e commite o .md junto. */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = readFileSync(join(root, 'js', 'estimator.js'), 'utf8');

/* Extrai `var NOME = <literal>;` do IIFE e avalia o literal (só objetos e números). */
function pick(name) {
  const re = new RegExp(`var ${name} = ([\\s\\S]*?);[ \\t]*(?://[^\\n]*)?\\n`);
  const m = src.match(re);
  if (!m) throw new Error(`nao achei var ${name} em js/estimator.js`);
  return new Function(`return (${m[1]});`)();
}
const RATE = pick('RATE');
const PRICING = pick('PRICING');
const PAYMENT = pick('PAYMENT').pt;
const PAGES_INCLUDED = pick('PAGES_INCLUDED');
const PAGES_MAX = pick('PAGES_MAX');
const EXTRA_PAGE = pick('EXTRA_PAGE');
const BUDGET_RANGES = pick('BUDGET_RANGES');
const FEATURES = pick('FEATURES');

/* Nomes visíveis (pt) das funcionalidades, por tipo, lidos de T.pt.featuresStep.options
   (ids como seo, idiomas e assinaturas têm nomes diferentes conforme o tipo). */
const ptBlock = src.slice(src.indexOf('  var T = {'), src.indexOf('    en: {'));
const optsBlock = ptBlock.slice(ptBlock.indexOf('featuresStep: {'), ptBlock.indexOf('deadlineStep: {'));
function labels(type) {
  const start = optsBlock.indexOf(`${type}: [`);
  const end = optsBlock.indexOf(']', start);
  const out = {};
  const re = /\{ id: '([a-z]+)', name: '([^']+)'/g;
  let m;
  while ((m = re.exec(optsBlock.slice(start, end)))) out[m[1]] = m[2];
  return out;
}
const NAMES = Object.fromEntries(Object.keys(FEATURES).map((t) => [t, labels(t)]));
const num = (v) => v.toLocaleString('pt-BR');

/* Mesmo arredondamento do estimador. */
const round10 = (v) => Math.round(v / 10) * 10;
const brl = (v) => 'R$ ' + round10(v).toLocaleString('pt-BR');
const price = (h) => brl(h * RATE);
const range = (lo, hi) => `${price(lo)} a ${price(hi)}`;
const days = (lo, hi) => `${lo} a ${hi} dias`;

const TYPE_LABEL = { site: 'Site institucional', ecommerce: 'Loja virtual', app: 'Aplicativo', saas: 'Sistema sob medida' };
const urgent = PRICING.deadlines.urgente;
const today = new Date().toISOString().slice(0, 10);

let md = `# Faixas de preço da Bumavit

> Gerado por \`scripts/build-pricing.mjs\` a partir de \`js/estimator.js\` em ${today}.
> Não edite à mão: mude o estimador e rode o script. O estimador é a fonte de verdade.

Este é o único documento de onde um agente de conteúdo (blog, redes, Post do Google, portfólio) pode tirar um valor em reais. Número que não está aqui não existe.

## Como o estimador calcula

- Preço = horas estimadas × R$ ${RATE}/hora. Cada tipo de projeto tem uma faixa de horas; cada funcionalidade soma horas e dias.
- Prazo em dias corridos de produção, contados a partir do início do trabalho, com o conteúdo (textos, fotos, produtos) já em mãos.
- Prazo "é pra ontem" multiplica o preço por ${num(urgent)} (${Math.round((urgent - 1) * 100)}% a mais). Os outros prazos não mudam o preço.
- Site institucional inclui ${PAGES_INCLUDED} páginas (Home, Sobre, Serviços, Portfólio e Contato); cada página a mais soma ${num(EXTRA_PAGE.h[0])} a ${num(EXTRA_PAGE.h[1])} horas (${range(EXTRA_PAGE.h[0], EXTRA_PAGE.h[1])}) e ${num(EXTRA_PAGE.d)} dia. O estimador aceita até ${PAGES_MAX} páginas.
- Valores arredondados para a dezena, como o estimador mostra.

## Faixas por tipo de projeto

Base = tipo escolhido, sem funcionalidade extra, prazo normal. Máximo = todas as funcionalidades do estimador marcadas. Urgente = máximo × ${num(urgent)}.

| Tipo | Base | Prazo base | Máximo | Prazo máximo | Máximo urgente |
|---|---|---|---|---|---|
`;

const summary = {};
for (const [id, t] of Object.entries(PRICING.types)) {
  const feats = Object.values(FEATURES[id] || {});
  let hLo = t.hours[0], hHi = t.hours[1], dLo = t.days[0], dHi = t.days[1];
  if (id === 'site') {
    const extra = PAGES_MAX - PAGES_INCLUDED;
    hLo += extra * EXTRA_PAGE.h[0]; hHi += extra * EXTRA_PAGE.h[1];
    dLo += Math.floor(extra * EXTRA_PAGE.d); dHi += Math.ceil(extra * EXTRA_PAGE.d);
  }
  for (const f of feats) { hLo += f.h[0]; hHi += f.h[1]; dLo += f.d[0]; dHi += f.d[1]; }
  summary[id] = { base: [t.hours[0], t.hours[1]], baseDays: t.days, max: [hLo, hHi], maxDays: [dLo, dHi] };
  md += `| ${TYPE_LABEL[id]} | ${range(t.hours[0], t.hours[1])} | ${days(t.days[0], t.days[1])} | ${range(hLo, hHi)} | ${days(dLo, dHi)} | ${price(hHi * urgent)} |\n`;
}

md += `
Site institucional: o "máximo" considera ${PAGES_MAX} páginas. Com as ${PAGES_INCLUDED} páginas inclusas e todas as funcionalidades, fica em ${(() => {
  const feats = Object.values(FEATURES.site);
  let lo = PRICING.types.site.hours[0], hi = PRICING.types.site.hours[1];
  for (const f of feats) { lo += f.h[0]; hi += f.h[1]; }
  return range(lo, hi);
})()}.

## Preço de cada funcionalidade

Cada item soma ao preço base do tipo. Os nomes são os que o estimador mostra.

`;

for (const [id, feats] of Object.entries(FEATURES)) {
  md += `### ${TYPE_LABEL[id]}\n\n| Funcionalidade | Acrescenta | Dias a mais |\n|---|---|---|\n`;
  for (const [fid, f] of Object.entries(feats)) {
    md += `| ${NAMES[id][fid] || fid} | ${range(f.h[0], f.h[1])} | ${f.d[0]} a ${f.d[1]} |\n`;
  }
  md += '\n';
}

md += `## Exemplos prontos para citar

Combinações que o estimador devolve. Use a frase inteira, com o que está incluso, nunca só o número.

`;
function combo(type, featIds, pages) {
  const t = PRICING.types[type];
  let hLo = t.hours[0], hHi = t.hours[1], dLo = t.days[0], dHi = t.days[1];
  if (type === 'site' && pages > PAGES_INCLUDED) {
    const extra = pages - PAGES_INCLUDED;
    hLo += extra * EXTRA_PAGE.h[0]; hHi += extra * EXTRA_PAGE.h[1];
    dLo += Math.floor(extra * EXTRA_PAGE.d); dHi += Math.ceil(extra * EXTRA_PAGE.d);
  }
  for (const fid of featIds) { const f = FEATURES[type][fid]; hLo += f.h[0]; hHi += f.h[1]; dLo += f.d[0]; dHi += f.d[1]; }
  return { price: range(hLo, hHi), days: days(dLo, dHi) };
}
const examples = [
  ['site', [], 5, `Site institucional de ${PAGES_INCLUDED} páginas, textos do cliente, sem integrações`],
  ['site', ['seo', 'integracoes'], 8, 'Site de 8 páginas com SEO avançado e integrações (CRM, WhatsApp)'],
  ['site', ['blog', 'seo', 'agendamento', 'integracoes'], 8, 'Site de 8 páginas com blog, SEO avançado, agendamento e integrações'],
  ['site', ['blog', 'agendamento', 'restrita', 'integracoes'], 8, 'Site de 8 páginas com área restrita, agendamento, blog e integrações (CRM)'],
  ['site', ['blog', 'idiomas', 'seo', 'agendamento', 'restrita', 'integracoes'], 15, `Site de ${PAGES_MAX} páginas com todas as funcionalidades`],
  ['ecommerce', [], 0, 'Loja virtual inicial: catálogo pequeno, pagamento e frete padrão'],
  ['ecommerce', ['frete', 'cupons', 'seo'], 0, 'Loja virtual com frete integrado, cupons e SEO avançado'],
  ['ecommerce', ['catalogo', 'assinaturas', 'frete', 'cupons', 'idiomas', 'seo'], 0, 'Loja virtual com todas as funcionalidades'],
  ['app', [], 0, 'Aplicativo básico para iPhone e Android'],
  ['app', ['login', 'push', 'pagamentos', 'chat', 'offline', 'api'], 0, 'Aplicativo com todas as funcionalidades'],
  ['saas', [], 0, 'Sistema sob medida básico'],
  ['saas', ['permissoes', 'dashboards', 'assinaturas', 'api', 'automacao', 'auditoria'], 0, 'Sistema sob medida com todas as funcionalidades']
];
md += '| Projeto | Faixa | Prazo |\n|---|---|---|\n';
for (const [type, feats, pages, label] of examples) {
  const c = combo(type, feats, pages);
  md += `| ${label} | ${c.price} | ${c.days} |\n`;
}

md += `
## Faixas de orçamento que o estimador pergunta ao visitante

Servem para o visitante se situar; não são preços da Bumavit.

`;
for (const [id, [lo, hi]] of Object.entries(BUDGET_RANGES)) {
  const label = hi === Infinity ? `acima de ${brl(lo)}` : lo === 0 ? `até ${brl(hi)}` : `${brl(lo)} a ${brl(hi)}`;
  md += `- ${label}\n`;
}

md += `
## Condições de pagamento

Definidas pelo fundador em 28/09. Citar junto com a faixa sempre que o valor passar de alguns milhares de reais: é o que torna um projeto maior viável para uma empresa pequena.

| Tipo | Como se paga |
|---|---|
${Object.entries(TYPE_LABEL).map(([id, label]) => `| ${label} | ${PAYMENT[id]} |`).join('\n')}

## Regras para citar preço em conteúdo

1. Só cite valor que esteja neste arquivo, na combinação exata (tipo + funcionalidades + páginas). Não interpole, não arredonde para cima, não crie faixa nova.
2. Toda faixa vem com o que está incluso, no mesmo parágrafo. "De ${range(PRICING.types.site.hours[0], PRICING.types.site.hours[1])}" sozinho não diz nada; "site de ${PAGES_INCLUDED} páginas, textos do cliente, sem integrações, de ${range(PRICING.types.site.hours[0], PRICING.types.site.hours[1])}" diz.
3. Prazo em dias, como o estimador, ou em semanas arredondando para cima (${PRICING.types.site.days[0]} a ${PRICING.types.site.days[1]} dias = "até 2 semanas"). Sempre contado a partir do conteúdo pronto.
4. Preço de mercado (o que outros fornecedores cobram) só com fonte aberta e link. Sem fonte, não entra.
5. O estimador é o destino padrão de quem quer saber o próprio caso: https://bumavit.com.br/estimador.html
6. Nada de garantia de resultado, posição no Google ou aumento de vendas junto com o preço.
7. Domínio, hospedagem, textos, fotos e manutenção não estão nas faixas. Diga isso quando citar valor de projeto.
8. Loja virtual construída do zero, sem plataforma, e projetos fora dos quatro tipos do estimador não têm faixa: são orçados na conversa. Não invente número para eles.
9. Ao citar preço de loja virtual, aplicativo ou sistema, diga como se paga (tabela acima). Site pode citar ou não; loja e projetos maiores, sempre.
`;

/* Varre posts/*.md: todo "R$ n" que não seja um valor deste documento precisa de revisão. */
const known = new Set([...md.matchAll(/R\$ ([\d.]+)/g)].map((m) => m[1]));
const postsDir = join(root, 'posts');
const rows = [];
for (const f of readdirSync(postsDir).filter((n) => n.endsWith('.md') && !n.startsWith('_')).sort()) {
  const text = readFileSync(join(postsDir, f), 'utf8');
  const vals = [...new Set([...text.matchAll(/R\$ ?(\d{1,3}(?:\.\d{3})+|\d{3})/g)].map((m) => m[1]))];
  if (!vals.length) continue;
  const off = vals.filter((v) => !known.has(v));
  rows.push(`| ${f.replace(/\.md$/, '')} | ${vals.map((v) => 'R$ ' + v).join(', ')} | ${off.length ? off.map((v) => 'R$ ' + v).join(', ') : 'nenhum'} |`);
}
md += `
## Valores em reais que já estão nos posts

Varredura de \`posts/*.md\` na data de geração. A última coluna lista o que não bate com nenhum valor deste documento e precisa de revisão, ou de fonte externa linkada, se for preço de mercado.

| Post | Valores citados | Fora do estimador |
|---|---|---|
${rows.join('\n')}
`;

writeFileSync(join(root, 'docs', 'faixas-de-preco.md'), md, 'utf8');
console.log('ok: docs/faixas-de-preco.md');
