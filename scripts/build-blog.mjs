/* Gera o blog estático a partir de posts/*.md
   Saída: blog/index.html (archive), blog/<slug>/index.html (posts),
          blog/<slug>.html (stub para a URL antiga),
          blog/feed.xml (RSS) e sitemap.xml completo do site.
   Uso: node scripts/build-blog.mjs

   URL canônica de post: https://bumavit.com.br/blog/<slug>/ — barra final,
   sem .html. Decisão travada pelo fundador (BUMA-11); o Content Writer e a
   SEO Analyst já escrevem links nesse formato. Não reverter.

   Atenção ao nível de diretório: a listagem fica em /blog/ (1 nível abaixo
   da raiz) e os posts em /blog/<slug>/ (2 níveis). Todo link relativo passa
   por `base`/`blogHref` — não escreva "../" solto no shell. */
import { writeFileSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://bumavit.com.br';

/* A URL canonica da listagem e o diretorio, nunca /blog/index.html.
   As duas respondem 200 no GitHub Pages; apontar canonical, sitemap,
   breadcrumb e RSS para a mesma forma evita conteudo duplicado. */
const BLOG_URL = `${SITE}/blog/`;

/* Cor de marca lida do proprio design system. O favicon inline precisa de um
   literal, e ja houve divergencia (paginas geradas ficaram no ciano antigo
   depois do rebrand). Lendo o token, regerar o blog sempre reconcilia. */
const ACCENT = (readFileSync(join(root, 'css', 'style.css'), 'utf8')
  .match(/--accent:\s*(#[0-9a-fA-F]{3,8})/) || [, '#ff7a29'])[1];

/* NAP real da empresa. Sem endereco de rua: nao temos um publicado e inventar
   um e o erro classico de SEO local (NAP inconsistente). areaServed e
   verdadeiro e suficiente enquanto o endereco nao existe. */
const BUSINESS = {
  name: 'Bumavit',
  telephone: '+55-21-99723-5420',
  email: 'contato@bumavit.com.br',
  region: 'RJ',
  country: 'BR',
  sameAs: ['https://br.linkedin.com/company/bumavit']
};

/* ---------- Categorias (cores/gradientes em css/style.css: .bcov--*) ---------- */
const CATS = {
  'SEO':         { slug: 'seo',         en: 'SEO',         es: 'SEO' },
  'Performance': { slug: 'performance', en: 'Performance', es: 'Performance' },
  'Negócios':    { slug: 'negocios',    en: 'Business',    es: 'Negocios' }
};

/* ---------- Frontmatter + Markdown mínimos (zero dependências) ---------- */
function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error('frontmatter ausente');
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: m[2].trim() };
}

function inline(text) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

function mdToHtml(md) {
  const out = [];
  const blocks = md.split(/\r?\n\r?\n+/);
  for (const block of blocks) {
    const lines = block.split(/\r?\n/).filter((l) => l.trim());
    if (!lines.length) continue;
    if (lines[0].startsWith('### ')) {
      out.push('<h3>' + inline(lines[0].slice(4)) + '</h3>');
      const rest = lines.slice(1).join(' ');
      if (rest) out.push('<p>' + inline(rest) + '</p>');
    } else if (lines[0].startsWith('## ')) {
      out.push('<h2>' + inline(lines[0].slice(3)) + '</h2>');
      const rest = lines.slice(1).join(' ');
      if (rest) out.push('<p>' + inline(rest) + '</p>');
    } else if (lines.every((l) => /^[-*] /.test(l.trim()))) {
      out.push('<ul>' + lines.map((l) => '<li>' + inline(l.trim().slice(2)) + '</li>').join('') + '</ul>');
    } else if (lines.every((l) => /^\d+\. /.test(l.trim()))) {
      out.push('<ol>' + lines.map((l) => '<li>' + inline(l.trim().replace(/^\d+\. /, '')) + '</li>').join('') + '</ol>');
    } else {
      out.push('<p>' + inline(lines.join(' ')) + '</p>');
    }
  }
  return out.join('\n');
}

/* dateLabel e derivado de date. Se o autor escrever os dois e eles divergirem,
   a pagina mostra uma data e o sitemap/RSS declaram outra — entao date manda. */
const MESES_PT = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
function dateLabelFrom(iso) {
  const [y, m, d] = iso.split('-');
  return `${d} ${MESES_PT[Number(m) - 1]} ${y}`;
}

function readingTime(html) {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/* ---------- Carrega os posts ---------- */
const posts = readdirSync(join(root, 'posts'))
  /* Arquivos de apoio da pasta: `_TEMPLATE.md` e o README que o GitHub
     renderiza na propria pasta. Nao sao posts. */
  .filter((f) => f.endsWith('.md') && !f.startsWith('_') && f.toLowerCase() !== 'readme.md')
  .map((f) => {
    const { meta, body } = parseFrontmatter(readFileSync(join(root, 'posts', f), 'utf8'));
    const html = mdToHtml(body);
    const cat = CATS[meta.category] || CATS['Negócios'];
    return {
      ...meta,
      dateLabel: dateLabelFrom(meta.date),
      catLabel: meta.category,
      catSlug: cat.slug,
      catEn: cat.en,
      catEs: cat.es,
      html,
      minutes: readingTime(html)
    };
  })
  /* `draft: true` deixa o texto no repositorio sem publicar: o post nao vira
     HTML, nao entra na listagem, no RSS nem no sitemap. Tirar a linha publica. */
  .filter((p) => String(p.draft).toLowerCase() !== 'true')
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/* Um slug duplicado sobrescreveria silenciosamente o HTML do outro post. */
const dupes = posts.map((p) => p.slug).filter((s, i, a) => a.indexOf(s) !== i);
if (dupes.length) throw new Error('slug duplicado em posts/: ' + [...new Set(dupes)].join(', '));

/* Campos sem os quais a pagina sai com SEO quebrado (title/description vazios). */
for (const p of posts) {
  for (const field of ['title', 'slug', 'date', 'excerpt', 'category']) {
    if (!p[field]) throw new Error(`posts/${p.slug || '?'}: frontmatter sem "${field}"`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) throw new Error(`posts/${p.slug}: date deve ser AAAA-MM-DD`);
  if (!CATS[p.category]) throw new Error(`posts/${p.slug}: category "${p.category}" nao existe (use: ${Object.keys(CATS).join(', ')})`);
}

/* ---------- Shell compartilhado (nav/fab/menu/footer do site) ---------- */
function shell({ title, desc, canonical, content, extraHead = '', pageI18n = null, ogType = 'website', ogImage = `${SITE}/og.png`, base = '../', blogHref = './' }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="BUMAVIT">
  <meta property="og:locale" content="pt_BR">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonical}">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${ogImage}">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" type="application/rss+xml" title="Bumavit — Blog" href="${SITE}/blog/feed.xml">
  <meta name="theme-color" content="#0b0b0d">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0b0d'/%3E%3Ctext x='32' y='44' font-family='Arial Black,Arial' font-size='36' font-weight='900' fill='%23${ACCENT.slice(1)}' text-anchor='middle'%3EB%3C/text%3E%3C/svg%3E">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-M6TK6TCC9R"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-M6TK6TCC9R');
  </script>
  <link rel="preload" href="${base}fonts/ClashDisplay-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="${base}fonts/Satoshi-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="${base}css/style.css">${extraHead}
</head>
<body>

  <div class="grain" aria-hidden="true"></div>

  <div class="cursor" id="cursor" aria-hidden="true"><span class="cursor__label" id="cursorLabel"></span></div>
  <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>

  <header class="nav is-scrolled" id="nav">
    <a href="${base}index.html" class="nav__logo" data-hover>BUMAVIT<span class="nav__logo-r">®</span></a>
    <nav class="nav__links" aria-label="Navegação principal">
      <a href="${base}index.html#estudio" data-hover>Estúdio</a>
      <a href="${base}index.html#servicos" data-hover>Serviços</a>
      <a href="${base}index.html#projetos" data-hover>Projetos</a>
      <a href="${blogHref}" data-hover>Blog</a>
    </nav>
    <button class="nav__burger" id="burger" aria-label="Abrir menu" aria-expanded="false" data-hover>
      <span></span><span></span>
    </button>
  </header>

  <a href="${base}index.html#contato" class="fab" id="fab" data-hover><span>Vamos conversar</span></a>

  <div class="menu" id="menu" aria-hidden="true">
    <nav class="menu__links" aria-label="Menu">
      <a href="${base}index.html#estudio"><span class="menu__index">01</span>Estúdio</a>
      <a href="${base}index.html#servicos"><span class="menu__index">02</span>Serviços</a>
      <a href="${base}index.html#projetos"><span class="menu__index">03</span>Projetos</a>
      <a href="${blogHref}"><span class="menu__index">04</span>Blog</a>
      <a href="${base}index.html#contato"><span class="menu__index">05</span>Contato</a>
    </nav>
    <div class="menu__footer">
      <a href="mailto:contato@bumavit.com.br">contato@bumavit.com.br</a>
      <p>Brasil — atendendo o mundo</p>
    </div>
  </div>

  <main>
${content}
  </main>

  <footer class="footer">
    <div class="footer__bottom" style="border-top:0; margin-top:0;">
      <p>© 2026 Bumavit. Todos os direitos reservados.</p>
      <a href="${base}index.html" data-hover>← Voltar ao início</a>
      <button class="footer__top-btn" id="backToTop" data-hover>Voltar ao topo ↑</button>
    </div>
  </footer>

  <script>window.__pageI18n = ${JSON.stringify(pageI18n || {})};</script>
  <script src="${base}vendor/gsap.min.js"></script>
  <script src="${base}vendor/ScrollTrigger.min.js"></script>
  <script src="${base}vendor/lenis.min.js"></script>
  <script src="${base}js/i18n.js?v=4" defer></script>
  <script src="${base}js/page.js?v=2" defer></script>
</body>
</html>
`;
}

/* Stub de redirecionamento para uma URL aposentada. O GitHub Pages não emite
   301, então canonical + refresh + replace() é o que consolida o sinal no
   destino. Mesmo formato dos stubs do WordPress legado — uma técnica só. */
function redirectStub({ to, label }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Página movida — BUMAVIT®</title>
<link rel="canonical" href="${to}">
<meta http-equiv="refresh" content="0; url=${to}">
<meta property="og:url" content="${to}">
<meta name="description" content="Esta página mudou de endereço. Você está sendo redirecionado.">
<script>location.replace("${to}");</script>
<style>
  body{background:#0b0b0d;color:#f4f4f5;font:16px/1.6 system-ui,-apple-system,"Segoe UI",sans-serif;
       display:grid;place-items:center;min-height:100vh;margin:0;padding:2rem;text-align:center}
  a{color:${ACCENT}}
</style>
</head>
<body>
  <main>
    <p><strong>${label}</strong> mudou de endereço.</p>
    <p>Se o redirecionamento não acontecer, <a href="${to}">clique aqui para continuar</a>.</p>
  </main>
</body>
</html>
`;
}

mkdirSync(join(root, 'blog'), { recursive: true });

/* ================================================================
   ARCHIVE — blog/index.html
   ================================================================ */
const featured = posts[0];
const rest = posts.slice(1);

const filterBtns = ['all', ...Object.values(CATS).map((c) => c.slug)]
  .map((slug) => {
    const label = slug === 'all' ? 'Todos' : Object.keys(CATS).find((k) => CATS[k].slug === slug);
    return `<button type="button" class="bfilter__btn${slug === 'all' ? ' is-active' : ''}" data-filter="${slug}" data-hover>${label}</button>`;
  })
  .join('\n        ');

/* `prefix` = caminho até /blog/. Vazio na listagem (já está em /blog/),
   '../' dentro de um post (que fica em /blog/<slug>/). */
const card = (p, prefix = '') => `
        <a class="bcard" href="${prefix}${p.slug}/" data-cat="${p.catSlug}" data-hover>
          <div class="bcov bcov--${p.catSlug} bcard__cover">
            <span class="bcat" data-c="${p.catSlug}">${p.catLabel}</span>
          </div>
          <div class="bcard__info">
            <span class="bcard__date">${p.dateLabel} · <span class="bmin" data-min="${p.minutes}">${p.minutes} min de leitura</span></span>
            <h3>${p.title}</h3>
            <p>${p.excerpt}</p>
          </div>
        </a>`;

const archiveContent = `    <section class="p-hero section">
      <p class="section__label" data-reveal>( Blog )</p>
      <h1 class="p-hero__title" data-split>Insights</h1>
      <p class="p-hero__tag" data-reveal>Desenvolvimento, SEO, performance e crescimento — sem enrolação.</p>
    </section>

    <section class="section" style="padding-top:0;">
      <a class="bfeat" href="${featured.slug}/" data-hover data-reveal>
        <div class="bcov bcov--${featured.catSlug} bfeat__cover">
          <span class="bcat" data-c="${featured.catSlug}">${featured.catLabel}</span>
        </div>
        <div class="bfeat__info">
          <span class="bcard__date">${featured.dateLabel} · <span class="bmin" data-min="${featured.minutes}">${featured.minutes} min de leitura</span></span>
          <h2>${featured.title}</h2>
          <p>${featured.excerpt}</p>
          <span class="bfeat__cta">Ler artigo <em aria-hidden="true">→</em></span>
        </div>
      </a>

      <div class="bfilter" role="group" aria-label="Filtrar por categoria" data-reveal>
        ${filterBtns}
      </div>

      <div class="bgrid" id="bgrid">
${posts.map((p) => card(p)).join('\n')}
      </div>
    </section>

    <script>
    (function () {
      var btns = document.querySelectorAll('.bfilter__btn');
      var cards = document.querySelectorAll('#bgrid .bcard');
      btns.forEach(function (b) {
        b.addEventListener('click', function () {
          btns.forEach(function (x) { x.classList.remove('is-active'); });
          b.classList.add('is-active');
          var f = b.getAttribute('data-filter');
          cards.forEach(function (c) {
            var show = f === 'all' || c.getAttribute('data-cat') === f;
            c.classList.toggle('is-hidden', !show);
          });
        });
      });
    })();
    </script>`;

const archiveI18n = {
  en: {
    '.p-hero__tag': 'Development, SEO, performance and growth — no fluff. Articles are written in Portuguese.',
    '.bfilter__btn[data-filter="all"]': 'All',
    '.bcat[data-c="negocios"]': 'Business',
    '.bfilter__btn[data-filter="negocios"]': 'Business',
    '.bfeat__cta': { html: 'Read article <em aria-hidden="true">→</em>' }
  },
  es: {
    '.p-hero__tag': 'Desarrollo, SEO, performance y crecimiento — sin rodeos. Los artículos están escritos en portugués.',
    '.bfilter__btn[data-filter="all"]': 'Todos',
    '.bcat[data-c="negocios"]': 'Negocios',
    '.bfilter__btn[data-filter="negocios"]': 'Negocios',
    '.bfeat__cta': { html: 'Leer artículo <em aria-hidden="true">→</em>' }
  }
};
['en', 'es'].forEach((lang) => {
  posts.forEach((p) => {
    archiveI18n[lang]['.bmin[data-min="' + p.minutes + '"]'] =
      lang === 'en' ? p.minutes + ' min read' : p.minutes + ' min de lectura';
  });
});

/* Organization + LocalBusiness: exigidos no escopo do blog e reaproveitados
   como @id pelos posts, para o grafo do site ficar consistente. */
const orgLd = `
      {
        "@type": "Organization",
        "@id": "${SITE}/#org",
        "name": "${BUSINESS.name}",
        "url": "${SITE}/",
        "email": "${BUSINESS.email}",
        "telephone": "${BUSINESS.telephone}",
        "sameAs": ${JSON.stringify(BUSINESS.sameAs)}
      },
      {
        "@type": "ProfessionalService",
        "@id": "${SITE}/#localbusiness",
        "name": "${BUSINESS.name}",
        "url": "${SITE}/",
        "email": "${BUSINESS.email}",
        "telephone": "${BUSINESS.telephone}",
        "parentOrganization": { "@id": "${SITE}/#org" },
        "address": { "@type": "PostalAddress", "addressRegion": "${BUSINESS.region}", "addressCountry": "${BUSINESS.country}" },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "Rio de Janeiro" },
          { "@type": "Country", "name": "Brasil" }
        ]
      }`;

const archiveLd = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": "${BLOG_URL}#blog",
        "name": "Blog — BUMAVIT®",
        "url": "${BLOG_URL}",
        "inLanguage": "pt-BR",
        "publisher": { "@id": "${SITE}/#org" }
      },${orgLd}
    ]
  }
  </script>`;

writeFileSync(join(root, 'blog', 'index.html'), shell({
  title: 'Blog — BUMAVIT®',
  desc: 'Insights sobre desenvolvimento web, SEO, performance e geração de leads — pela Bumavit, software house brasileira.',
  canonical: BLOG_URL,
  extraHead: archiveLd,
  pageI18n: archiveI18n,
  content: archiveContent
}), 'utf8');
console.log('ok: blog/index.html');

/* ================================================================
   POST SINGLE — blog/<slug>.html
   ================================================================ */
posts.forEach((p, i) => {
  const prev = posts[i + 1] || null; // mais antigo
  const next = posts[i - 1] || null; // mais novo
  const related = posts.filter((x) => x.slug !== p.slug && x.catSlug === p.catSlug);
  const readAlso = (related.length ? related : posts.filter((x) => x.slug !== p.slug)).slice(0, 2);
  const url = `${SITE}/blog/${p.slug}/`;
  const shareText = encodeURIComponent(p.title + ' — ' + url);

  const ld = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "headline": ${JSON.stringify(p.title)},
        "description": ${JSON.stringify(p.excerpt)},
        "datePublished": "${p.date}",
        "inLanguage": "pt-BR",
        "articleSection": ${JSON.stringify(p.catLabel)},
        "timeRequired": "PT${p.minutes}M",
        "dateModified": "${p.updated || p.date}",
        "image": "${p.image ? SITE + p.image : SITE + '/og.png'}",
        "isPartOf": { "@id": "${BLOG_URL}#blog" },
        "author": { "@id": "${SITE}/#org" },
        "publisher": { "@id": "${SITE}/#org" },
        "mainEntityOfPage": "${url}"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Blog", "item": "${BLOG_URL}" },
          { "@type": "ListItem", "position": 2, "name": ${JSON.stringify(p.title)}, "item": "${url}" }
        ]
      },${orgLd}
    ]
  }
  </script>`;

  const navCard = (post, cls, label) => post ? `
        <a class="bnav__card bnav__card--${cls}" href="../${post.slug}/" data-hover>
          <span class="bnav__label bnav__label--${cls}">${label}</span>
          <span class="bnav__title">${post.title}</span>
        </a>` : `<span class="bnav__card bnav__card--empty" aria-hidden="true"></span>`;

  const content = `    <article class="bpost p-hero section">
      <nav class="bcrumb" aria-label="Breadcrumb" data-reveal>
        <a href="../" data-hover>Blog</a> <span aria-hidden="true">/</span> <span class="bcat" data-c="${p.catSlug}">${p.catLabel}</span>
      </nav>

      <h1 class="p-hero__title bpost__title" data-split>${p.title}</h1>
      <p class="bpost__meta" data-reveal>${p.dateLabel} · <span class="bmin" data-min="${p.minutes}">${p.minutes} min de leitura</span> · Bumavit</p>

      <div class="bcov bcov--${p.catSlug} bpost__cover" data-reveal>
        <span class="bcov__mono" aria-hidden="true">${p.catLabel.charAt(0)}</span>
      </div>

      <div class="article__body bpost__body" data-reveal>
${p.html}
      </div>

      <div class="bshare" data-reveal>
        <span class="bshare__label">Compartilhar</span>
        <a class="btn-pill" href="https://wa.me/?text=${shareText}" target="_blank" rel="noopener" data-hover><span>WhatsApp</span></a>
        <a class="btn-pill" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}" target="_blank" rel="noopener" data-hover><span>LinkedIn</span></a>
        <a class="btn-pill" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(p.title)}" target="_blank" rel="noopener" data-hover><span>X</span></a>
      </div>

      <div class="article__cta" data-reveal>
        <h3>Quer aplicar isso no seu negócio?</h3>
        <a class="btn-pill btn-pill--accent" href="../../index.html#contato" data-hover><span>Fale com a Bumavit</span></a>
      </div>

      <nav class="bnav" aria-label="Navegação entre posts">
${navCard(prev, 'prev', '← Anterior')}
${navCard(next, 'next', 'Próximo →')}
      </nav>

      <section class="brelated">
        <h2 class="brelated__title">Leia também</h2>
        <div class="bgrid bgrid--related">
${readAlso.map((r) => card(r, '../')).join('\n')}
        </div>
      </section>
    </article>`;

  const postI18n = {
    en: {
      '.bshare__label': 'Share',
      '.bnav__label--prev': '← Previous',
      '.bnav__label--next': 'Next →',
      '.brelated__title': 'Read next',
      '.bcat[data-c="negocios"]': 'Business',
      ['.bmin[data-min="' + p.minutes + '"]']: p.minutes + ' min read',
      '.article__cta h3': 'Want this working for your business?',
      '.article__cta .btn-pill span': 'Talk to Bumavit'
    },
    es: {
      '.bshare__label': 'Compartir',
      '.bnav__label--prev': '← Anterior',
      '.bnav__label--next': 'Siguiente →',
      '.brelated__title': 'Lee también',
      '.bcat[data-c="negocios"]': 'Negocios',
      ['.bmin[data-min="' + p.minutes + '"]']: p.minutes + ' min de lectura',
      '.article__cta h3': '¿Quieres aplicarlo en tu negocio?',
      '.article__cta .btn-pill span': 'Habla con Bumavit'
    }
  };
  ['en', 'es'].forEach((lang) => {
    readAlso.forEach((r) => {
      postI18n[lang]['.bmin[data-min="' + r.minutes + '"]'] =
        lang === 'en' ? r.minutes + ' min read' : r.minutes + ' min de lectura';
    });
  });

  mkdirSync(join(root, 'blog', p.slug), { recursive: true });
  writeFileSync(join(root, 'blog', p.slug, 'index.html'), shell({
    title: `${p.title} — BUMAVIT®`,
    desc: p.excerpt,
    canonical: url,
    ogType: 'article',
    ogImage: p.image ? SITE + p.image : `${SITE}/og.png`,
    extraHead: ld,
    pageI18n: postI18n,
    content,
    base: '../../',
    blogHref: '../'
  }), 'utf8');
  console.log(`ok: blog/${p.slug}/index.html`);

  /* Stub na URL antiga. /blog/<slug>.html foi indexável e respondeu 200 antes
     da troca de padrão — apagar geraria 404 em link externo já publicado. */
  writeFileSync(join(root, 'blog', `${p.slug}.html`), redirectStub({
    to: url,
    label: p.title
  }), 'utf8');
  console.log(`ok: blog/${p.slug}.html (stub -> ${url})`);
});

/* ================================================================
   RSS — blog/feed.xml
   ================================================================ */
const rssItems = posts.map((p) => `    <item>
      <title>${p.title.replace(/&/g, '&amp;')}</title>
      <link>${SITE}/blog/${p.slug}/</link>
      <guid>${SITE}/blog/${p.slug}/</guid>
      <pubDate>${new Date(p.date + 'T12:00:00Z').toUTCString()}</pubDate>
      <description>${p.excerpt.replace(/&/g, '&amp;')}</description>
      <category>${p.catLabel}</category>
    </item>`).join('\n');

writeFileSync(join(root, 'blog', 'feed.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bumavit — Blog</title>
    <link>${BLOG_URL}</link>
    <atom:link href="${SITE}/blog/feed.xml" rel="self" type="application/rss+xml"/>
    <description>Insights sobre desenvolvimento web, SEO, performance e geração de leads.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date(posts[0].date + 'T12:00:00Z').toUTCString()}</lastBuildDate>
${rssItems}
  </channel>
</rss>
`, 'utf8');
console.log('ok: blog/feed.xml');

/* ================================================================
   SITEMAP — sitemap.xml (site inteiro; posts entram automaticamente)
   ================================================================ */
const staticPages = [
  ['', '1.0'],
  ['sobre.html', '0.8'],
  ['estimador.html', '0.9'],
  ['projetos/yacht-day.html', '0.7'],
  ['projetos/cocban.html', '0.7'],
  ['projetos/fintech.html', '0.6'],
  ['projetos/ecommerce.html', '0.6'],
  ['blog/', '0.8']
];
const urls = staticPages
  .map(([path, pri]) => `  <url><loc>${SITE}/${path}</loc><priority>${pri}</priority></url>`)
  .concat(posts.map((p) => `  <url><loc>${SITE}/blog/${p.slug}/</loc><lastmod>${p.updated || p.date}</lastmod><priority>0.6</priority></url>`))
  .join('\n');

writeFileSync(join(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, 'utf8');
console.log('ok: sitemap.xml');
