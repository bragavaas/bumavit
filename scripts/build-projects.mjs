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
    tag: 'Plataforma de reservas de iates · Toronto, Canadá',
    mediaClass: 'cover--cyan',
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
      'Por trás da vitrine, uma estratégia de SEO local posicionou a marca nas buscas por aluguel de iates na região de Toronto, com conteúdo, dados estruturados e performance no verde.'
    ],
    stats: [
      ['+120%', 'Tráfego orgânico em 6 meses'],
      ['Top 3', 'Nas buscas locais em Toronto'],
      ['2×', 'Mais reservas online']
    ],
    link: null, // subdomínio yachtday saiu do ar: reative aqui se voltar
    /* Palco 2.5D no lugar do banner gradiente: mockups com fundo transparente
       em img/projetos/ (WebP ~150KB no total). O tilt vive em js/page.js. */
    showcase: {
      laptop: { src: '../img/projetos/yacht-day-laptop.webp', w: 1600, h: 973 },
      phone:  { src: '../img/projetos/yacht-day-phone.webp',  w: 960,  h: 1200 },
      alt: 'Site da Yacht Day exibido em um notebook e em um celular'
    },
    t: {
      en: {
        tag: 'Yacht booking platform · Toronto, Canada',
        metaValues: ['Yacht Day', '2024', 'Nautical tourism', 'Web design, Development, Local SEO, Booking'],
        challenge: [
          'The yacht rental market in Toronto is competitive and seasonal: a few high-season weeks concentrate almost the entire year’s revenue. Yacht Day needed to show up first in local searches and turn visitors into bookings before they opened a competitor’s tab.',
          'The previous website didn’t reflect the premium nature of the service, and booking depended on back-and-forth messages.'
        ],
        solution: [
          'We designed a fast, visual platform with a vessel catalog, clear availability and a booking flow that gets everything done in a few clicks.',
          'Behind the storefront, a local SEO strategy positioned the brand for yacht rental searches across the Toronto area: content, structured data and performance in the green.'
        ],
        stats: [['+120%', 'Organic traffic in 6 months'], ['Top 3', 'In Toronto local searches'], ['2×', 'More online bookings']]
      },
      es: {
        tag: 'Plataforma de reservas de yates · Toronto, Canadá',
        metaValues: ['Yacht Day', '2024', 'Turismo náutico', 'Diseño web, Desarrollo, SEO local, Booking'],
        challenge: [
          'El mercado de alquiler de yates en Toronto es competitivo y estacional: pocas semanas de temporada alta concentran casi todos los ingresos del año. Yacht Day necesitaba aparecer primero en las búsquedas locales y convertir al visitante en reserva antes de que abriera la pestaña de la competencia.',
          'El sitio anterior no reflejaba la experiencia premium del servicio y el proceso de reserva dependía de intercambios manuales de mensajes.'
        ],
        solution: [
          'Diseñamos una plataforma rápida y visual, con catálogo de embarcaciones, disponibilidad clara y un flujo de reserva que resuelve todo en pocos clics.',
          'Detrás del escaparate, una estrategia de SEO local posicionó la marca en las búsquedas de alquiler de yates en la región de Toronto, con contenido, datos estructurados y performance en verde.'
        ],
        stats: [['+120%', 'Tráfico orgánico en 6 meses'], ['Top 3', 'En búsquedas locales de Toronto'], ['2×', 'Más reservas online']]
      }
    }
  },
  {
    slug: 'cocban',
    title: 'COCBAN',
    tag: 'Cooperativa de crédito · Juiz de Fora, MG',
    mediaClass: 'cover--rust',
    mono: 'C',
    nda: false,
    meta: {
      Cliente: 'COCBAN',
      Ano: '2024',
      Setor: 'Cooperativa de crédito',
      'Serviços': 'Site institucional, SEO, Performance'
    },
    challenge: [
      'A COCBAN é a Cooperativa de Economia e Crédito Mútuo dos Bancários de Juiz de Fora, fundada em 2000, com atuação na Zona da Mata mineira e um público definido: bancários e dependentes que já são cooperados. O site precisava cumprir dois papéis ao mesmo tempo.',
      'O primeiro: deixar o cooperado simular um empréstimo em poucos cliques. O segundo: publicar o que o Banco Central exige de uma cooperativa de crédito, como ouvidoria, canal de denúncias, demonstrativos contábeis e governança. O risco num projeto assim é construir um arquivo morto, que fecha o checklist regulatório mas não gera pedido de crédito.'
    ],
    solution: [
      'Construímos o site em WordPress com Elementor, com arquitetura que separa os dois fluxos. A navegação leva o cooperado direto ao simulador. As páginas de conformidade ficam organizadas e acessíveis: ouvidoria com 0800, canal de denúncias, demonstrativos contábeis e governança, cada uma no lugar certo, sem gerar retrabalho.',
      'Uma cooperativa com mais de duas décadas tem história e prestação de contas para mostrar. Integramos isso ao site sem deixá-lo pesado: quem quer crédito encontra o simulador, e quem precisa de transparência encontra os documentos.'
    ],
    link: 'https://cocban.coop.br/',
    t: {
      en: {
        tag: 'Credit union · Juiz de Fora, Brazil',
        metaValues: ['COCBAN', '2024', 'Credit union', 'Institutional website, SEO, Performance'],
        challenge: [
          'COCBAN is the Cooperativa de Economia e Crédito Mútuo dos Bancários de Juiz de Fora, a credit union founded in 2000 that serves bank workers and their dependents in the Zona da Mata region of Minas Gerais. The site had to do two things at once.',
          'First, let a member simulate a loan in a few clicks. Second, publish what the Brazilian Central Bank requires from a credit union: an ombudsman channel, a whistleblowing channel, financial statements and governance disclosures. The risk in a project like this is building a dead archive: a site that checks every compliance box but never brings in a loan request.'
        ],
        solution: [
          'We built the site on WordPress with Elementor, with an architecture that keeps the two flows separate. Navigation routes members straight to the simulator. The compliance pages, ombudsman channel with a toll-free number, whistleblowing channel, financial statements and governance disclosures, each sit in the right place and stay current without constant rework.',
          'A cooperative with more than two decades of history has a track record to show. We brought that into the site without weighing it down: members looking for credit find the simulator, and members who need transparency find the documents.'
        ]
      },
      es: {
        tag: 'Cooperativa de crédito · Juiz de Fora, Brasil',
        metaValues: ['COCBAN', '2024', 'Cooperativa de crédito', 'Sitio institucional, SEO, Performance'],
        challenge: [
          'COCBAN es la Cooperativa de Economía y Crédito Mutuo de los Bancarios de Juiz de Fora, fundada en 2000, que atiende a trabajadores bancarios y sus dependientes en la región de la Zona da Mata, en Minas Gerais. El sitio tenía que cumplir dos funciones al mismo tiempo.',
          'La primera: permitir que el cooperado simule un préstamo en pocos clics. La segunda: publicar lo que el Banco Central de Brasil exige a una cooperativa de crédito, como defensoría, canal de denuncias, estados financieros y gobernanza. El riesgo en un proyecto así es construir un archivo muerto: un sitio que completa la lista de conformidad pero nunca genera una solicitud de crédito.'
        ],
        solution: [
          'Construimos el sitio en WordPress con Elementor, con una arquitectura que mantiene los dos flujos separados. La navegación lleva al cooperado directamente al simulador. Las páginas de conformidad, defensoría con número gratuito, canal de denuncias, estados financieros y gobernanza, quedan cada una en su lugar y se mantienen al día sin retrabajo constante.',
          'Una cooperativa con más de dos décadas tiene historia y rendición de cuentas que mostrar. Integramos eso al sitio sin que pesara: quien busca crédito encuentra el simulador, y quien necesita transparencia encuentra los documentos.'
        ]
      }
    }
  },
  {
    slug: 'fintech',
    title: 'Fintech SaaS',
    tag: 'Dashboard SaaS para fintech em crescimento',
    mediaClass: 'cover--ink',
    mono: 'F',
    nda: true,
    meta: {
      Cliente: 'Confidencial (NDA)',
      Ano: '2025',
      Setor: 'Serviços financeiros',
      'Serviços': 'Produto digital, UI/UX, Desenvolvimento'
    },
    challenge: [
      'Uma fintech em plena expansão operava processos críticos em planilhas e ferramentas desconectadas. Cada novo cliente aumentava o retrabalho e o risco.',
      'O time precisava de um painel único: visão em tempo real da operação, com segurança e trilha de auditoria.'
    ],
    solution: [
      'Desenhamos e desenvolvemos um dashboard SaaS modular: dados consolidados, fluxos de aprovação e relatórios que antes levavam dias passaram a sair em minutos.',
      'A interface prioriza densidade de informação sem sacrificar clareza: cada tela responde uma pergunta do negócio. Por respeito ao acordo de confidencialidade, os detalhes visuais não são públicos.'
    ],
    stats: [
      ['-40%', 'Tempo gasto por tarefa no painel'],
      ['99,9%', 'Disponibilidade da plataforma'],
      ['12', 'Módulos integrados em produção']
    ],
    link: null,
    t: {
      en: {
        tag: 'SaaS dashboard for a fast-growing fintech',
        metaValues: ['Confidential (NDA)', '2025', 'Financial services', 'Digital product, UI/UX, Development'],
        challenge: [
          'A fast-expanding fintech ran critical processes on spreadsheets and disconnected tools. Every new client meant more rework and more risk.',
          'The team needed a single dashboard: a real-time view of the operation, with security and an audit trail.'
        ],
        solution: [
          'We designed and built a modular SaaS dashboard: consolidated data, approval flows, and reports that used to take days now ship in minutes.',
          'The interface favors information density without sacrificing clarity: every screen answers a business question. Out of respect for the NDA, visual details are not public.'
        ],
        stats: [['-40%', 'Time spent per task in the dashboard'], ['99.9%', 'Platform availability'], ['12', 'Integrated modules in production']]
      },
      es: {
        tag: 'Dashboard SaaS para una fintech en crecimiento',
        metaValues: ['Confidencial (NDA)', '2025', 'Servicios financieros', 'Producto digital, UI/UX, Desarrollo'],
        challenge: [
          'Una fintech en plena expansión operaba procesos críticos en hojas de cálculo y herramientas desconectadas. Cada nuevo cliente aumentaba el retrabajo y el riesgo.',
          'El equipo necesitaba un panel único: visión en tiempo real de la operación, con seguridad y trazabilidad de auditoría.'
        ],
        solution: [
          'Diseñamos y desarrollamos un dashboard SaaS modular: datos consolidados, flujos de aprobación e informes que antes tomaban días y ahora salen en minutos.',
          'La interfaz prioriza la densidad de información sin sacrificar claridad: cada pantalla responde una pregunta del negocio. Por respeto al acuerdo de confidencialidad, los detalles visuales no son públicos.'
        ],
        stats: [['-40%', 'Tiempo por tarea en el panel'], ['99,9%', 'Disponibilidad de la plataforma'], ['12', 'Módulos integrados en producción']]
      }
    }
  },
  {
    slug: 'ecommerce',
    title: 'E-commerce de moda',
    tag: 'Loja virtual com checkout otimizado para conversão',
    mediaClass: 'cover--cyan',
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
      'O objetivo era claro: transformar audiência em receita sem depender de desconto.'
    ],
    solution: [
      'Reconstruímos a loja com foco em velocidade e fricção zero: páginas de produto que carregam instantaneamente, checkout enxuto e frete calculado antes do último passo.',
      'Testes A/B contínuos guiaram cada decisão de interface: o que não aumenta conversão, sai. Detalhes da marca permanecem sob acordo de confidencialidade.'
    ],
    stats: [
      ['+35%', 'Taxa de conversão no checkout'],
      ['-28%', 'Abandono de carrinho'],
      ['3×', 'Mais recompra em 90 dias']
    ],
    link: null,
    t: {
      en: {
        title: 'Fashion e-commerce',
        tag: 'Online store with a conversion-optimized checkout',
        metaValues: ['Confidential (NDA)', '2025', 'Fashion & retail', 'E-commerce, CRO, Development'],
        challenge: [
          'The brand sold well on social media but lost customers on the website: slow pages, a long checkout and carts abandoned at the shipping step.',
          'The goal was clear: turn audience into revenue without leaning on discounts.'
        ],
        solution: [
          'We rebuilt the store around speed and zero friction: product pages that load instantly, a lean checkout, and shipping calculated before the last step.',
          'Continuous A/B testing guided every interface decision: whatever doesn’t lift conversion gets cut. Brand details remain under NDA.'
        ],
        stats: [['+35%', 'Checkout conversion rate'], ['-28%', 'Cart abandonment'], ['3×', 'More repeat purchases in 90 days']]
      },
      es: {
        title: 'E-commerce de moda',
        tag: 'Tienda online con checkout optimizado para conversión',
        metaValues: ['Confidencial (NDA)', '2025', 'Moda y retail', 'E-commerce, CRO, Desarrollo'],
        challenge: [
          'La marca vendía bien en redes sociales, pero perdía al cliente en el sitio: páginas lentas, checkout largo y carritos abandonados en el paso del envío.',
          'El objetivo era claro: transformar audiencia en ingresos sin depender de descuentos.'
        ],
        solution: [
          'Reconstruimos la tienda con foco en velocidad y cero fricción: páginas de producto que cargan al instante, checkout ágil y envío calculado antes del último paso.',
          'Tests A/B continuos guiaron cada decisión de interfaz: lo que no aumenta la conversión, se elimina. Los detalles de la marca permanecen bajo NDA.'
        ],
        stats: [['+35%', 'Tasa de conversión en el checkout'], ['-28%', 'Abandono de carrito'], ['3×', 'Más recompra en 90 días']]
      }
    }
  }
];

/* Rótulos fixos do template por idioma */
const LABELS = {
  en: {
    projLabel: '( Project )',
    metaLabels: ['Client', 'Year', 'Industry', 'Services'],
    challengeTitle: 'The challenge',
    solutionTitle: 'The solution'
  },
  es: {
    projLabel: '( Proyecto )',
    metaLabels: ['Cliente', 'Año', 'Sector', 'Servicios'],
    challengeTitle: 'El desafío',
    solutionTitle: 'La solución'
  }
};

/* Monta o dicionário seletor→texto consumido pelo js/i18n.js */
function pageDict(p, next) {
  const out = {};
  for (const lang of ['en', 'es']) {
    const t = p.t[lang];
    const L = LABELS[lang];
    const d = {};
    d['.p-hero .section__label'] = L.projLabel;
    if (t.title) d['.p-hero__title'] = t.title;
    d['.p-hero__tag'] = t.tag;
    t.metaValues.forEach((v, i) => {
      d[`.p-meta__item:nth-child(${i + 1}) dt`] = L.metaLabels[i];
      d[`.p-meta__item:nth-child(${i + 1}) dd`] = v;
    });
    d['section.p-section:nth-of-type(2) .p-section__label'] = L.challengeTitle;
    d['section.p-section:nth-of-type(3) .p-section__label'] = L.solutionTitle;
    t.challenge.forEach((txt, i) => {
      d[`section.p-section:nth-of-type(2) .p-section__body p:nth-of-type(${i + 1})`] = txt;
    });
    t.solution.forEach((txt, i) => {
      d[`section.p-section:nth-of-type(3) .p-section__body p:nth-of-type(${i + 1})`] = txt;
    });
    (t.stats || []).forEach(([num, desc], i) => {
      d[`.p-stats .stats__item:nth-child(${i + 1}) .stats__num`] = num;
      d[`.p-stats .stats__item:nth-child(${i + 1}) .stats__desc`] = desc;
    });
    const nextT = next.t[lang];
    d['.next__title'] = (nextT && nextT.title) ? nextT.title : next.title;
    out[lang] = d;
  }
  return out;
}

const esc = (s) => s; // conteúdo controlado localmente

function page(p, next) {
  const metaItems = Object.entries(p.meta).map(([k, v]) => `
        <div class="p-meta__item" data-reveal>
          <dt>${k}</dt>
          <dd>${v}</dd>
        </div>`).join('');

  const paras = (arr) => arr.map((t) => `<p>${t}</p>`).join('\n          ');

  const statItems = (p.stats || []).map(([num, desc]) => `
        <div class="stats__item" data-reveal>
          <span class="stats__num">${num}</span>
          <span class="stats__desc">${desc}</span>
        </div>`).join('');

  const visit = p.link ? `
    <section class="p-visit section">
      <a class="btn-pill btn-pill--accent" href="${p.link}" target="_blank" rel="noopener" data-hover data-magnetic><span>Visitar site ↗</span></a>
    </section>` : '';

  const ndaBadge = p.nda ? `\n        <span class="p-nda" data-reveal>Projeto sob NDA</span>` : '';

  /* Banner: palco 2.5D quando o projeto tem mockups, senão o gradiente padrão.
     As <img> internas são decorativas (alt vazio); o rótulo fica no contêiner. */
  const banner = p.showcase ? `
      <div class="devstage" id="devstage" data-reveal role="img" aria-label="${esc(p.showcase.alt)}">
        <div class="devstage__scene" id="devstageScene">
          <img class="devstage__laptop" src="${p.showcase.laptop.src}" alt="" width="${p.showcase.laptop.w}" height="${p.showcase.laptop.h}" decoding="async">
          <img class="devstage__phone" src="${p.showcase.phone.src}" alt="" width="${p.showcase.phone.w}" height="${p.showcase.phone.h}" decoding="async">
        </div>
      </div>` : `
      <div class="work__media p-banner ${p.mediaClass}" data-reveal>
        <span class="work__mono">${p.mono}</span>
      </div>`;

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(p.title)} · BUMAVIT®</title>
  <meta name="description" content="${esc(p.tag)}. Projeto desenvolvido pela Bumavit, software house brasileira.">
  <meta property="og:title" content="${esc(p.title)} · BUMAVIT®">
  <meta property="og:description" content="${esc(p.tag)}.">
  <meta property="og:site_name" content="BUMAVIT">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://bumavit.com.br/projetos/${p.slug}.html">
  <meta property="og:image" content="https://bumavit.com.br/og.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://bumavit.com.br/projetos/${p.slug}.html">
  <meta name="twitter:title" content="${esc(p.title)} · BUMAVIT®">
  <meta name="twitter:description" content="${esc(p.tag)}.">
  <meta name="twitter:image" content="https://bumavit.com.br/og.png">
  <link rel="canonical" href="https://bumavit.com.br/projetos/${p.slug}.html">
  <meta name="theme-color" content="#0b0b0d">
  <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-M6TK6TCC9R"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-M6TK6TCC9R');
  </script>
  <link rel="preload" href="../fonts/ClashDisplay-600.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="../fonts/Satoshi-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../css/style.css?v=9">
</head>
<body>

  <div class="grain" aria-hidden="true"></div>

  <div class="cursor" id="cursor" aria-hidden="true"><span class="cursor__label" id="cursorLabel"></span></div>
  <div class="cursor-dot" id="cursorDot" aria-hidden="true"></div>

  <header class="nav is-scrolled" id="nav">
    <a href="/" class="nav__logo" data-hover>BUMAVIT<span class="nav__logo-r">®</span></a>
    <nav class="nav__links" aria-label="Navegação principal">
      <a href="/#estudio" data-hover>Estúdio</a>
      <a href="/#servicos" data-hover>Serviços</a>
      <a href="/#projetos" data-hover>Projetos</a>
      <a href="/#processo" data-hover>Processo</a>
      <a href="/estimador.html" data-hover>Estimador</a>
    </nav>
    <button class="nav__burger" id="burger" aria-label="Abrir menu" aria-expanded="false" data-hover>
      <span></span><span></span>
    </button>
  </header>

  <a href="/#contato" class="fab" id="fab" data-hover><span>Vamos conversar</span></a>

  <div class="menu" id="menu" aria-hidden="true">
    <nav class="menu__links" aria-label="Menu">
      <a href="/#estudio"><span class="menu__index">01</span>Estúdio</a>
      <a href="/#servicos"><span class="menu__index">02</span>Serviços</a>
      <a href="/#projetos"><span class="menu__index">03</span>Projetos</a>
      <a href="/#processo"><span class="menu__index">04</span>Processo</a>
      <a href="/estimador.html"><span class="menu__index">05</span>Estimador</a>
      <a href="/#contato"><span class="menu__index">06</span>Contato</a>
    </nav>
    <div class="menu__footer">
      <a href="mailto:contato@bumavit.com.br">contato@bumavit.com.br</a>
      <p>Brasil, atendendo o mundo</p>
    </div>
  </div>

  <main>
    <section class="p-hero section">
      <p class="section__label" data-reveal>( Projeto )</p>${ndaBadge}
      <h1 class="p-hero__title" data-split>${esc(p.title)}</h1>
      <p class="p-hero__tag" data-reveal>${esc(p.tag)}</p>

      <dl class="p-meta">${metaItems}
      </dl>

${banner}
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
${statItems ? `
    <section class="section">
      <div class="p-stats">${statItems}
      </div>
    </section>
` : ''}${visit}
    <a class="next" href="${next.slug}.html" data-hover>
      <span class="next__label">Próximo projeto</span>
      <span class="next__title">${esc(next.title)}</span>
      <span class="next__arrow">→</span>
    </a>
  </main>

  <footer class="footer">
    <div class="footer__bottom" style="border-top:0; margin-top:0;">
      <p>© 2026 Bumavit. Todos os direitos reservados.</p>
      <a class="footer__privacy" href="/privacidade.html" data-hover>Política de Privacidade</a>
      <a href="/#projetos" data-hover>← Todos os projetos</a>
      <button class="footer__top-btn" id="backToTop" data-hover>Voltar ao topo ↑</button>
    </div>
  </footer>

  <script>window.__pageI18n = ${JSON.stringify(pageDict(p, next))};</script>
  <script src="../vendor/gsap.min.js"></script>
  <script src="../vendor/ScrollTrigger.min.js"></script>
  <script src="../vendor/lenis.min.js"></script>
  <script src="../js/i18n.js?v=6" defer></script>
  <script src="../js/page.js?v=3" defer></script>
  <script src="../js/analytics.js" defer></script>
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
