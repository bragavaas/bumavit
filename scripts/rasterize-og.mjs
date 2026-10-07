/* Rasteriza os cards de compartilhamento dos posts: images/posts/<slug>-og.svg
   (gerados por scripts/build-blog.mjs) viram <slug>-og.jpg, 1200x630, JPEG 0.92.

   Por que JPEG: redes sociais nao exibem SVG em previa, e o gradiente do card
   nao comprime em PNG (~370 KB contra ~35 KB em JPEG).

   So refaz o JPEG que falta ou cujo SVG mudou em relacao ao commit atual, para
   o PR de rebuild nao trazer os JPEGs de todos os posts a cada execucao.
   --all refaz todos.

   Precisa de um Chromium. Usa CHROME_PATH se existir (no runner do GitHub, o
   Chrome ja instalado) e o pacote playwright-core ou playwright para dirigir o
   navegador:
     npm i --no-save --no-package-lock playwright-core
     CHROME_PATH=$(command -v google-chrome) node scripts/rasterize-og.mjs */
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'images', 'posts');
const all = process.argv.includes('--all');

/* createRequire respeita NODE_PATH e o node_modules local; import() de ESM nao. */
const require = createRequire(join(root, 'package.json'));
let chromium;
for (const mod of ['playwright-core', 'playwright']) {
  try { ({ chromium } = require(mod)); break; } catch (e) { /* tenta o proximo */ }
}
if (!chromium) {
  console.error('rasterize-og: instale playwright-core (npm i --no-save --no-package-lock playwright-core)');
  process.exit(1);
}

function svgChanged(rel) {
  try {
    execFileSync('git', ['diff', '--quiet', 'HEAD', '--', rel], { cwd: root });
    execFileSync('git', ['ls-files', '--error-unmatch', rel], { cwd: root, stdio: 'ignore' });
    return false; // rastreado e igual ao HEAD
  } catch (e) {
    return true; // diferente do HEAD, ou ainda nao rastreado
  }
}

const todo = readdirSync(dir)
  .filter((f) => f.endsWith('-og.svg'))
  .filter((f) => {
    const jpg = f.replace(/\.svg$/, '.jpg');
    return all || !existsSync(join(dir, jpg)) || svgChanged(join('images', 'posts', f));
  });

if (!todo.length) {
  console.log('rasterize-og: nenhum card mudou');
  process.exit(0);
}

const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
for (const f of todo) {
  const svg = readFileSync(join(dir, f), 'utf8');
  await page.setContent(`<!doctype html><html><body style="margin:0;background:#0b0b0d">${svg}</body></html>`);
  const buf = await page.screenshot({ type: 'jpeg', quality: 92, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  if (buf[0] !== 0xff || buf[1] !== 0xd8 || buf[buf.length - 2] !== 0xff || buf[buf.length - 1] !== 0xd9) {
    throw new Error(`rasterize-og: JPEG invalido para ${f}`);
  }
  const out = f.replace(/\.svg$/, '.jpg');
  writeFileSync(join(dir, out), buf);
  console.log(`ok: images/posts/${out} (${Math.round(buf.length / 1024)} KB)`);
}
await browser.close();
