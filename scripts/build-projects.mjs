/* Gera as páginas individuais de projeto em projetos/*.html
   Uso: node scripts/build-projects.mjs */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const projects = [
  {
    slug: 'yacht-day',
    title: 'Yacht Day',
    tag: 'Plataforma de reservas de iates — Toronto, Canadá',
    mediaClass: 'work__media--yacht',
    mono: 'Y',
    nda: false,
    meta: {
      Cliente: 'Yacht Day',
      Ano: '2024',
      Setor: 'Turismo náutico',
      'Serviços': 'Web design, Desenvolvimento, SEO local, Booking'
    },
    challenge: [
      'O mercado de aluguel de iates em Toronto é disputado e sazonal: poucas semanas de alta temporada concentram quase toda a receita do ano. A Yacht Day precisava aparecer primeiro nas buscas locais e converter o visitante em reserva antes que ele abrisse a aba do concorrente.',
      'O site anterior não refletia a experiência premium do serviço e o processo de reserva dependia de trocas manuais de mensagens.'
    ],
    solution: [
      'Projetamos uma plataforma rápida e visual, com catálogo de embarcações, disponibilidade clara e um fluxo de reserva que resolve tudo em poucos cliques.',
      'Por trás da vitrine, uma estratégia de SEO local posicionou a marca nas buscas por aluguel de iates na região de Toronto — com conteúdo, dados estruturados e performance no verde.'
    ],
    stats: [
      ['+120%', 'Tráfego orgânico em 6 meses'],
      ['Top 3', 'Nas buscas locais em Toronto'],
      ['2×', 'Mais reservas online']
    ],
    link: 'https://yachtday.bumavit.com.br/'
  },
  {
    slug: 'cocban',
    title: 'COCBAN',
    tag: 'Portal institucional com presença digital completa',
    mediaClass: 'work__media--cocban',
    mono: 'C',
    nda: false,
    meta: {
      Cliente: 'COCBAN',
      Ano: '2024',
      Setor: 'Institucional',
      'Serviços': 'Web design, Desenvolvimento, Identidade digital'
    },
    challenge: [
      'A COCBAN precisava de uma casa digital à altura da instituição: a informação estava fragmentada e a comunicação com o público dependia de canais dispersos.',
      'O desafio era centralizar tudo em um portal claro, acessível e fácil de manter — sem abrir mão de personalidade.'
    ],
    solution: [
      'Construímos um portal institucional moderno, com arquitetura de informação pensada para quem busca — não para quem publica. Conteúdo organizado, navegação direta e identidade visual consistente em todas as páginas.',
      'O resultado é uma presença digital que transmite credibilidade e funciona em qualquer dispositivo.'
    ],
    stats: [
      ['100%', 'Da informação centralizada em um só lugar'],
      ['<2s', 'Tempo de carregamento das páginas'],
      ['90+', 'Pontuação de performance no Lighthouse']
    ],
    link: 'https://bumavit.com.br/cocban/'
  },
  {
    slug: 'fintech',
    title: 'Fintech SaaS',
    tag: 'Dashboard SaaS para fintech em crescimento',
    mediaClass: 'work__media--fintech',
    mono: 'F',
    nda: true,
    meta: {
      Cliente: 'Confidencial (NDA)',
      Ano: '2025',
      Setor: 'Serviços financeiros',
      'Serviços': 'Produto digital, UI/UX, Desenvolvimento'
    },
    challenge: [
      'Uma fintech em plena expansão operava processos críticos em planilhas e ferramentas desconectadas. Cada novo cliente aumentava o retrabalho — e o risco.',
      'O time precisava de um painel único: visão em tempo real da operação, com segurança e trilha de auditoria.'
    ],
    solution: [
      'Desenhamos e desenvolvemos um dashboard SaaS modular: dados consolidados, fluxos de aprovação e relatórios que antes levavam dias passaram a sair em minutos.',
      'A interface prioriza densidade de informação sem sacrificar clareza — cada tela responde uma pergunta do negócio. Por respeito ao acordo de confidencialidade, os detalhes visuais não são públicos.'
    ],
    stats: [
      ['-40%', 'Tempo gasto por tarefa no painel'],
      ['99,9%', 'Disponibilidade da plataforma'],
      ['12', 'Módulos integrados em produção']
    ],
    link: null
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce de moda',
    tag: 'Loja virtual com checkout otimizado para conversão',
    mediaClass: 'work__media--commerce',
    mono: 'E',
    nda: true,
    meta: {
      Cliente: 'Confidencial (NDA)',
      Ano: '2025',
      Setor: 'Moda & varejo',
      'Serviços': 'E-commerce, CRO, Desenvolvimento'
    },
    challenge: [
      'A marca vendia bem nas redes sociais, mas perdia o cliente no site: páginas lentas, checkout longo e carrinho abandonado na etapa de frete.',
      'O objetivo era claro — transformar audiência em receita sem depender de desconto.'
    ],
    solution: [
      'Reconstruímos a loja com foco em velocidade e fricção zero: páginas de produto que carregam instantaneamente, checkout enxuto e frete calculado antes do último passo.',
      'Testes A/B contínuos guiaram cada decisão de interface — o que não aumenta conversão, sai. Detalhes da marca permanecem sob acordo de confidencialidade.'
    ],
    stats: [
      ['+35%', 'Taxa de conversão no checkout'],
      ['-28%', 'Abandono de carrinho'],
      ['3×', 'Mais recompra em 90 dias']
    ],
    link: null
  }
];

const esc = (s) => s; // conteúdo controlado localmente

function page(p, next) {
  const metaItems = Object.entries(p.meta).map(([k, v]) => `
        <div class="p-meta__item" data-reveal>
          <h5>${k}</h5>
          <p>${v}</p>
        </div>`).join('');

  const paras = (arr) => arr.map((t) => `<p>${t}</p>`).join('\n          ');

  const statItems = p.stats.map(([num, desc]) => `
        <div class="stats__item" data-reveal>
          <span class="stats__num">${num}</span>
          <span class="stats__desc">${desc}</span>
        </div>`).join('');

  const visit = p.link ? `
    <section class="p-visit section">
      <a class="btn-pill btn-pill--accent" href="${p.link}" target="_blank" rel="noopener" data-hover data-magnetic><span>Visitar site ↗</span></a>
    </section>` : '';

  const ndaBadge = p.nda ? `\n        <span class="p-nda" data-reveal>Projeto sob NDA</span>` : '';

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.title)} — BUMAVIT®</title>
  <meta name="description" content="${esc(p.tag)}. Projeto desenvolvido pela Bumavit, software house brasileira.">
  <meta property="og:title" content="${esc(p.title)} — BUMAVIT®">
  <meta property="og:description" content="${esc(p.tag)}.">
  <meta property="og:type" content="article">
  <meta property="og:image" content="https://bragavaas.github.io/bumavit/og.png">
  <link rel="canonical" href="https://bragavaas.github.io/bumavit/projetos/${p.slug}.html">
  <meta name="theme-color" content="#0b0b0d">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230b0b0d'/%3E%3Ctext x='32' y='44' font-family='Arial Black,Arial' font-size='36' font-weight='900' fill='%23c6f035' text-anchor='middle'%3EB%3C/text%3E%3C/svg%3E">
  <link rel="preload" href="../fonts/ClashDisplay-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../fonts/Satoshi-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../css/style.css">
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
      <a href="../index.html#processo" data-hover>Processo</a>
    </nav>
    <a href="../index.html#contato" class="btn-pill nav__cta" data-hover><span>Iniciar projeto</span></a>
    <button class="nav__burger" id="burger" aria-label="Abrir menu" aria-expanded="false" data-hover>
      <span></span><span></span>
    </button>
  </header>

  <div class="menu" id="menu" aria-hidden="true">
    <nav class="menu__links" aria-label="Menu">
      <a href="../index.html#estudio"><span class="menu__index">01</span>Estúdio</a>
      <a href="../index.html#servicos"><span class="menu__index">02</span>Serviços</a>
      <a href="../index.html#projetos"><span class="menu__index">03</span>Projetos</a>
      <a href="../index.html#processo"><span class="menu__index">04</span>Processo</a>
      <a href="../index.html#contato"><span class="menu__index">05</span>Contato</a>
    </nav>
    <div class="menu__footer">
      <a href="mailto:contato@bumavit.com.br">contato@bumavit.com.br</a>
      <p>Brasil — atendendo o mundo</p>
    </div>
  </div>

  <main>
    <section class="p-hero section">
      <p class="section__label" data-reveal>( Projeto )</p>${ndaBadge}
      <h1 class="p-hero__title" data-split>${esc(p.title)}</h1>
      <p class="p-hero__tag" data-reveal>${esc(p.tag)}</p>

      <div class="p-meta">${metaItems}
      </div>

      <div class="work__media p-banner ${p.mediaClass}" data-reveal>
        <span class="work__mono">${p.mono}</span>
      </div>
    </section>

    <section class="p-section section">
      <h2 class="p-section__label" data-reveal>O desafio</h2>
      <div class="p-section__body" data-reveal>
          ${paras(p.challenge)}
      </div>
    </section>

    <section class="p-section section">
      <h2 class="p-section__label" data-reveal>A solução</h2>
      <div class="p-section__body" data-reveal>
          ${paras(p.solution)}
      </div>
    </section>

    <section class="section">
      <div class="p-stats">${statItems}
      </div>
    </section>
${visit}
    <a class="next" href="${next.slug}.html" data-hover>
      <span class="next__label">Próximo projeto</span>
      <span class="next__title">${esc(next.title)}</span>
      <span class="next__arrow">→</span>
    </a>
  </main>

  <footer class="footer">
    <div class="footer__bottom" style="border-top:0; margin-top:0;">
      <p>© 2026 Bumavit. Todos os direitos reservados.</p>
      <a href="../index.html#projetos" data-hover>← Todos os projetos</a>
      <button class="footer__top-btn" id="backToTop" data-hover>Voltar ao topo ↑</button>
    </div>
  </footer>

  <script src="../vendor/gsap.min.js"></script>
  <script src="../vendor/ScrollTrigger.min.js"></script>
  <script src="../vendor/lenis.min.js"></script>
  <script src="../js/page.js" defer></script>
</body>
</html>
`;
}

mkdirSync(join(root, 'projetos'), { recursive: true });
projects.forEach((p, i) => {
  const next = projects[(i + 1) % projects.length];
  const out = join(root, 'projetos', `${p.slug}.html`);
  writeFileSync(out, page(p, next), 'utf8');
  console.log('ok:', out);
});
