/* Gera o blog estático em blog/*.html + listagem blog/index.html
   Uso: node scripts/build-blog.mjs */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://bragavaas.github.io/bumavit';

const posts = [
  {
    slug: 'seo-local',
    title: 'O poder do SEO local: apareça para quem está perto de comprar',
    excerpt: 'A maioria das buscas com intenção de compra tem contexto local. Veja como colocar seu negócio na frente de quem já está procurando por você.',
    date: '2026-07-01',
    dateLabel: '01 Jul 2026',
    body: `
<p>Quando alguém busca "pizzaria perto de mim" ou "agência de marketing em Curitiba", essa pessoa não está pesquisando — está <strong>decidindo</strong>. O SEO local existe para colocar o seu negócio exatamente nesse momento da jornada.</p>
<h2>Por que o local converte mais</h2>
<p>Buscas locais carregam intenção: quem procura um serviço com a cidade no texto costuma contratar em poucos dias. Ranquear bem nessas buscas vale mais do que milhares de visitas genéricas.</p>
<h2>Os três pilares</h2>
<ul>
<li><strong>Perfil da Empresa no Google</strong> completo: categoria certa, fotos reais, horários atualizados e respostas às avaliações.</li>
<li><strong>Consistência de dados</strong>: nome, endereço e telefone idênticos no site, redes e diretórios.</li>
<li><strong>Conteúdo com contexto local</strong>: páginas que respondem às perguntas da sua região, não textos genéricos.</li>
</ul>
<h2>O papel do site</h2>
<p>Nada disso funciona se o site demora para carregar ou quebra no celular. Velocidade, dados estruturados e páginas de serviço bem construídas são o alicerce técnico que sustenta o ranqueamento — e é aí que a engenharia encontra o marketing.</p>
<p>Foi essa combinação que usamos no projeto <strong>Yacht Day</strong>, em Toronto: plataforma rápida + estratégia local = topo das buscas na região.</p>`
  },
  {
    slug: 'leads-com-orcamento-limitado',
    title: 'Geração de leads com orçamento limitado: o que priorizar',
    excerpt: 'Sem verba para mídia? Ainda dá para gerar leads de forma consistente. O segredo é ordem de prioridade, não volume de canais.',
    date: '2026-06-15',
    dateLabel: '15 Jun 2026',
    body: `
<p>Todo negócio quer mais leads. Poucos têm orçamento para disputar leilão de anúncio com os grandes. A boa notícia: as fontes mais duradouras de leads são as que dependem de <strong>consistência</strong>, não de verba.</p>
<h2>1. Conserte o balde antes de abrir a torneira</h2>
<p>Investir em tráfego com um site que não converte é pagar para perder. Antes de qualquer campanha: formulário simples, WhatsApp visível, prova social e velocidade. Cada segundo de carregamento a mais derruba a conversão.</p>
<h2>2. Um canal orgânico, bem feito</h2>
<p>Escolha <strong>um</strong> canal onde seu cliente já está e publique com constância. Para serviços locais, Google + avaliações. Para B2B, LinkedIn + conteúdo que responde dúvidas reais de quem compra.</p>
<h2>3. Transforme clientes em canal</h2>
<p>Indicação é o lead mais barato que existe. Crie o hábito de pedir: uma mensagem pós-entrega pedindo avaliação ou indicação custa zero e compõe com o tempo.</p>
<h2>Onde a tecnologia entra</h2>
<p>Automatizar a captura (formulário → CRM → resposta em minutos) multiplica o resultado de qualquer canal. Leads esfriam rápido: responder em 5 minutos, e não em 5 horas, muda a taxa de fechamento.</p>`
  },
  {
    slug: 'core-web-vitals',
    title: 'Core Web Vitals: por que a velocidade do seu site é dinheiro',
    excerpt: 'Google mede a experiência real de quem usa seu site — e usa isso no ranqueamento. Entenda as três métricas e o que fazer com elas.',
    date: '2026-05-28',
    dateLabel: '28 Mai 2026',
    body: `
<p>Core Web Vitals são as três métricas com que o Google mede a experiência real dos seus visitantes. Elas afetam seu ranqueamento — e, antes disso, afetam quantos visitantes viram clientes.</p>
<h2>As três métricas, sem jargão</h2>
<ul>
<li><strong>LCP</strong> — em quanto tempo o conteúdo principal aparece. Meta: até 2,5s.</li>
<li><strong>INP</strong> — quanto o site demora para reagir a um clique. Meta: até 200ms.</li>
<li><strong>CLS</strong> — quanto a página "pula" enquanto carrega. Meta: quase zero.</li>
</ul>
<h2>Por que isso é dinheiro</h2>
<p>Estudos de mercado se repetem há anos: cada segundo a mais de carregamento derruba conversão de forma mensurável. Em e-commerce, um site lento é um desconto involuntário dado ao concorrente.</p>
<h2>O que costuma resolver</h2>
<p>Imagens otimizadas e servidas no tamanho certo, fontes auto-hospedadas, JavaScript só do que a página realmente usa e um bom cache. Nada disso é mágica — é engenharia bem feita, medida com dados reais (o relatório CrUX do próprio Google) e não só com testes de laboratório.</p>
<p>Nos nossos projetos, Core Web Vitals no verde é critério de entrega, não otimização posterior.</p>`
  }
];

function shell({ title, desc, canonical, content, extraHead = '', pageI18n = null }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:image" content="${SITE}/og.png">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#0b0b0d">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0b0d'/%3E%3Ctext x='32' y='44' font-family='Arial Black,Arial' font-size='36' font-weight='900' fill='%23c6f035' text-anchor='middle'%3EB%3C/text%3E%3C/svg%3E">
  <link rel="preload" href="../fonts/ClashDisplay-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../fonts/Satoshi-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../css/style.css">${extraHead}
</head>
<body>

  <div class="grain" aria-hidden="true"></div>

  <div class="cursor" id="cursor" aria-hidden="true"><span class="cursor__label" id="cursorLabel"></span></div>
  <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>

  <header class="nav is-scrolled" id="nav">
    <a href="../index.html" class="nav__logo" data-hover>BUMAVIT<span class="nav__logo-r">®</span></a>
    <nav class="nav__links" aria-label="Navegação principal">
      <a href="../index.html#estudio" data-hover>Estúdio</a>
      <a href="../index.html#servicos" data-hover>Serviços</a>
      <a href="../index.html#projetos" data-hover>Projetos</a>
      <a href="index.html" data-hover>Blog</a>
    </nav>
    <button class="nav__burger" id="burger" aria-label="Abrir menu" aria-expanded="false" data-hover>
      <span></span><span></span>
    </button>
  </header>

  <a href="../index.html#contato" class="fab" id="fab" data-hover><span>Vamos conversar</span></a>

  <div class="menu" id="menu" aria-hidden="true">
    <nav class="menu__links" aria-label="Menu">
      <a href="../index.html#estudio"><span class="menu__index">01</span>Estúdio</a>
      <a href="../index.html#servicos"><span class="menu__index">02</span>Serviços</a>
      <a href="../index.html#projetos"><span class="menu__index">03</span>Projetos</a>
      <a href="index.html"><span class="menu__index">04</span>Blog</a>
      <a href="../index.html#contato"><span class="menu__index">05</span>Contato</a>
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
      <a href="../index.html" data-hover>← Voltar ao início</a>
      <button class="footer__top-btn" id="backToTop" data-hover>Voltar ao topo ↑</button>
    </div>
  </footer>

  <script>window.__pageI18n = ${JSON.stringify(pageI18n || {})};</script>
  <script src="../vendor/gsap.min.js"></script>
  <script src="../vendor/ScrollTrigger.min.js"></script>
  <script src="../vendor/lenis.min.js"></script>
  <script src="../js/i18n.js?v=2" defer></script>
  <script src="../js/page.js" defer></script>
</body>
</html>
`;
}

mkdirSync(join(root, 'blog'), { recursive: true });

/* ---- Listagem ---- */
const cards = posts.map((p) => `
      <a class="blog-card" href="${p.slug}.html" data-hover>
        <span class="blog-card__date">${p.dateLabel}</span>
        <h2>${p.title}</h2>
        <span class="blog-card__arrow" aria-hidden="true">→</span>
        <p>${p.excerpt}</p>
      </a>`).join('\n');

writeFileSync(join(root, 'blog', 'index.html'), shell({
  title: 'Blog — BUMAVIT®',
  desc: 'Insights sobre desenvolvimento web, SEO, performance e geração de leads — pela Bumavit, software house brasileira.',
  canonical: `${SITE}/blog/index.html`,
  pageI18n: {
    en: {
      '.p-hero__tag': 'Development, SEO, performance and growth — no fluff. Articles are written in Portuguese.'
    },
    es: {
      '.p-hero__tag': 'Desarrollo, SEO, performance y crecimiento — sin rodeos. Los artículos están escritos en portugués.'
    }
  },
  content: `    <section class="p-hero section">
      <p class="section__label" data-reveal>( Blog )</p>
      <h1 class="p-hero__title" data-split>Insights</h1>
      <p class="p-hero__tag" data-reveal>Desenvolvimento, SEO, performance e crescimento — sem enrolação.</p>
    </section>

    <section class="section" style="padding-top:0;">
      <div class="blog-list">
${cards}
      </div>
    </section>`
}), 'utf8');
console.log('ok: blog/index.html');

/* ---- Posts ---- */
posts.forEach((p) => {
  const ld = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": ${JSON.stringify(p.title)},
    "description": ${JSON.stringify(p.excerpt)},
    "datePublished": "${p.date}",
    "inLanguage": "pt-BR",
    "author": { "@type": "Organization", "name": "Bumavit", "url": "${SITE}/" },
    "publisher": { "@type": "Organization", "name": "Bumavit" },
    "mainEntityOfPage": "${SITE}/blog/${p.slug}.html"
  }
  </script>`;

  writeFileSync(join(root, 'blog', `${p.slug}.html`), shell({
    title: `${p.title} — BUMAVIT®`,
    desc: p.excerpt,
    canonical: `${SITE}/blog/${p.slug}.html`,
    extraHead: ld,
    content: `    <article class="article p-hero section">
      <p class="article__date" data-reveal>${p.dateLabel} — Bumavit</p>
      <h1 class="p-hero__title" style="font-size:clamp(2rem,5.5vw,4.2rem);" data-split>${p.title}</h1>
      <div class="article__body" data-reveal>
${p.body}
      </div>
      <div class="article__cta" data-reveal>
        <h3>Quer aplicar isso no seu negócio?</h3>
        <a class="btn-pill btn-pill--accent" href="../index.html#contato" data-hover><span>Fale com a Bumavit</span></a>
      </div>
    </article>`
  }), 'utf8');
  console.log(`ok: blog/${p.slug}.html`);
});
