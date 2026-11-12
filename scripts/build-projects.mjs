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
    link: 'https://yachtday.ca/',
    /* Projeto intermediado e feito junto com a agência do Lucas (fundador, 12/11). */
    partner: { name: 'L. Socio Marketing Agency', url: 'https://lsocio.com/' },
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
    slug: 'hera-brand',
    title: 'Hera Brand',
    tag: 'Loja virtual de moda feminina · Portugal',
    mediaClass: 'cover--ink',
    mono: 'H',
    nda: false,
    meta: {
      Cliente: 'Hera Brand',
      Ano: '2025',
      Setor: 'Moda feminina',
      'Serviços': 'Web design, Desenvolvimento, Loja virtual'
    },
    /* Fontes (09/11/2026): post 8 do Instagram (CLA-113, legenda e "2025"), avaliação do Google
       de Jonathas Nascimento (texto sem edição, liberada pelo fundador em 08/11/2026) e o mockup
       do notebook feito da captura de herabrand.pt enviada pelo fundador (26/09/2026). */
    challenge: [
      'A Hera Brand é uma marca de moda feminina de Portugal. A loja virtual precisava mostrar as coleções com o cuidado da marca e levar a cliente até a compra.',
      'Numa loja de moda, o que mais derruba a venda costuma não ser a vitrine: é o número de passos entre o “quero” e o “comprei”.'
    ],
    solution: [
      'Fizemos a loja do design ao lançamento. A regra que guiou cada tela foi tirar passos do caminho entre ver a peça e concluir a compra.',
      'O cliente está em Portugal; o projeto foi feito do Rio de Janeiro, inteiro a distância.'
    ],
    quote: {
      text: 'Já contei com a BUMAVIT para o desenvolvimento de alguns projetos. Excelentes profissionais. Continuo recorrendo a eles sempre que preciso de qualquer serviço na parte de Web.',
      name: 'Jonathas Nascimento',
      role: 'Hera Brand'
    },
    link: 'https://herabrand.pt/',
    showcase: {
      laptop: { src: '../img/projetos/hera-brand-laptop.webp', w: 1600, h: 973 },
      alt: 'Loja virtual da Hera Brand exibida em um notebook'
    },
    t: {
      en: {
        tag: 'Women’s fashion online store · Portugal',
        metaValues: ['Hera Brand', '2025', 'Women’s fashion', 'Web design, Development, Online store'],
        challenge: [
          'Hera Brand is a women’s fashion brand from Portugal. Its online store had to show the collections with the brand’s care and take the customer all the way to the purchase.',
          'In a fashion store, what loses the sale is rarely the shop window: it is the number of steps between “I want it” and “I bought it”.'
        ],
        solution: [
          'We built the store from design to launch. One rule guided every screen: take steps out of the way between seeing a piece and completing the purchase.',
          'The client is in Portugal; the project was built from Rio de Janeiro, entirely remotely.'
        ]
      },
      es: {
        tag: 'Tienda online de moda femenina · Portugal',
        metaValues: ['Hera Brand', '2025', 'Moda femenina', 'Diseño web, Desarrollo, Tienda online'],
        challenge: [
          'Hera Brand es una marca de moda femenina de Portugal. La tienda online tenía que mostrar las colecciones con el cuidado de la marca y llevar a la clienta hasta la compra.',
          'En una tienda de moda, lo que más hace perder la venta no suele ser el escaparate: es el número de pasos entre el “lo quiero” y el “lo compré”.'
        ],
        solution: [
          'Hicimos la tienda del diseño al lanzamiento. La regla que guió cada pantalla fue quitar pasos del camino entre ver la prenda y completar la compra.',
          'El cliente está en Portugal; el proyecto se hizo desde Río de Janeiro, todo a distancia.'
        ]
      }
    }
  },
  {
    slug: 'cnacab',
    title: 'CNACAB',
    tag: 'Rede nacional de associações voluntárias · Brasil',
    mediaClass: 'cover--cyan',
    mono: 'C',
    nda: false,
    meta: {
      Cliente: 'Coordenadoria Nacional das Associações Casa da Amizade do Brasil',
      Ano: '2026',
      Setor: 'Terceiro setor',
      'Serviços': 'Site institucional, Busca de associações, Manutenção'
    },
    /* Fontes (09/11/2026): avaliação do Google de Cecília Lopes (texto sem edição, cargo corrigido
       pelo fundador em 08/11/2026), notas de construção do site (menu, busca, barra fixa do celular),
       gravação de tela do site no celular enviada pelo fundador em 08/11/2026 (o celular em 3D sai
       de um quadro dela, sem retoque) e o plano de manutenção (fundador, 09/11/2026). */
    challenge: [
      'A Coordenadoria Nacional reúne as Associações Casa da Amizade do país, que trabalham com educação, meio ambiente e apoio a mulheres. Fazia alguns anos que a organização tentava manter um site que mostrasse esse trabalho, e as empresas procuradas antes não tinham atendido ao que ela esperava.',
      'O site também tinha dois públicos: quem quer encontrar uma Casa da Amizade perto de onde mora e a associada que procura as publicações.'
    ],
    solution: [
      'Construímos o site em WordPress com Elementor. A página inicial segue o que a visitante procura: a rede, os programas nacionais, a busca das Casas, as honrarias, as publicações e o contato.',
      'A busca encontra a Casa pelo nome da cidade, com ou sem acento, ou pela coordenadoria regional. No celular, uma barra fixa deixa os dois caminhos sempre à mão: encontrar uma Casa e a Área da Associada.',
      'Depois do lançamento, o site continua com a Bumavit no <a href="/manutencao-de-sites/" data-hover>plano de manutenção</a>.'
    ],
    quote: {
      text: 'Nossa organização vinha há alguns anos com dificuldades para manter um site que expressasse o trabalho que fazemos. Buscamos algumas empresas, mas elas não conseguiram atender as nossas expectativas. Ao chegar a BUMAVIT fomos muito bem acolhidos e compreendidos. Nosso site atual corresponde totalmente ao que queremos e só temos a agradecer pelo cumprimento do prazo, facilidade de comunicação com o criador e respeito a nossa missão e princípios. Já contratamos a empresa para um outro site que com certeza será igualmente um sucesso. Gratidão!',
      name: 'Cecília Lopes',
      role: 'Presidente da Comissão de Divulgação e Comunicação, CNACAB'
    },
    link: 'https://casadaamizadedobrasil.org.br/',
    showcase: {
      solo: true,
      laptop: { src: '../img/projetos/cnacab-phone.webp', w: 946, h: 1420 },
      alt: 'Página inicial do site da CNACAB exibida em um celular'
    },
    t: {
      en: {
        tag: 'National network of volunteer associations · Brazil',
        metaValues: ['Coordenadoria Nacional das Associações Casa da Amizade do Brasil', '2026', 'Non-profit', 'Institutional website, Association search, Maintenance'],
        challenge: [
          'The national coordination brings together the Casa da Amizade associations across Brazil, which work in education, the environment and support for women. For a few years the organization had been trying to keep a website that showed this work, and the companies it had tried before had not met its expectations.',
          'The site also had two audiences: people looking for a Casa da Amizade near where they live, and members looking for the publications.'
        ],
        solution: [
          'We built the site on WordPress with Elementor. The home page follows what visitors look for: the network, the national programs, the search for local associations, the honors, the publications and the contact.',
          'The search finds an association by city name, with or without accents, or by regional coordination. On mobile, a fixed bar keeps both paths at hand: finding an association and the members’ area.',
          'After launch, the site stays with Bumavit on the maintenance plan.'
        ]
      },
      es: {
        tag: 'Red nacional de asociaciones voluntarias · Brasil',
        metaValues: ['Coordenadoria Nacional das Associações Casa da Amizade do Brasil', '2026', 'Tercer sector', 'Sitio institucional, Búsqueda de asociaciones, Mantenimiento'],
        challenge: [
          'La coordinación nacional reúne a las asociaciones Casa da Amizade de todo Brasil, que trabajan en educación, medio ambiente y apoyo a mujeres. Hacía algunos años que la organización intentaba mantener un sitio que mostrara ese trabajo, y las empresas consultadas antes no habían cumplido lo que esperaba.',
          'El sitio también tenía dos públicos: quien quiere encontrar una Casa da Amizade cerca de donde vive y la asociada que busca las publicaciones.'
        ],
        solution: [
          'Construimos el sitio en WordPress con Elementor. La página de inicio sigue lo que busca la visitante: la red, los programas nacionales, la búsqueda de las Casas, los honores, las publicaciones y el contacto.',
          'La búsqueda encuentra la Casa por el nombre de la ciudad, con o sin tilde, o por la coordinación regional. En el celular, una barra fija deja los dos caminos siempre a mano: encontrar una Casa y el Área de la Asociada.',
          'Después del lanzamiento, el sitio sigue con Bumavit en el plan de mantenimiento.'
        ]
      }
    }  },
  {
    slug: 'abmasto',
    title: 'ABMasto',
    tag: 'Academia médica · Rio de Janeiro, RJ',
    mediaClass: 'cover--ink',
    mono: 'A',
    nda: false,
    meta: {
      Cliente: 'Academia Brasileira de Mastologia',
      Ano: '2023',
      Setor: 'Medicina e memória institucional',
      'Serviços': 'Site institucional, Acervo e notícias, Manutenção'
    },
    /* Fontes (09/11/2026): o próprio site abmasto.com (página inicial e "A História da ABMasto": fundação em
       1 de agosto de 2020, memorialismo entre os mastologistas, membro da FBAM; menu com Institucional, Acadêmicos,
       Acervo, Prêmios e Revista; rodapé de 2023) e o fundador (nome por extenso Academia Brasileira de Mastologia,
       site construído pela Bumavit em 2023, hoje no plano de manutenção; eleições online e revista fora da página).
       O celular em 3D sai de uma captura real da página inicial em 09/11/2026, sem retoque.
       O primeiro parágrafo do desafio aguarda as linhas do fundador sobre o que a Academia precisava em 2023. */
    challenge: [
      'A Academia Brasileira de Mastologia foi fundada em 1 de agosto de 2020, em plena pandemia, para preservar a memória dos mastologistas brasileiros: a história da especialidade, seus pioneiros e seus prêmios. É membro da Federação Brasileira de Academias de Medicina.',
      'Em 2023, a Academia precisava de um site que reunisse num só lugar o que até então estava disperso: a história e os símbolos da instituição, os acadêmicos, o acervo, os prêmios e as notícias para os membros.'
    ],
    solution: [
      'Construímos o site em WordPress. O menu segue a estrutura da Academia: Institucional (história, palavra do presidente, bandeira, brasão e medalhão), Acadêmicos, Acervo (Biblioteca Mastológica Brasileira e Museu), Prêmios e Revista da Academia.',
      'A página inicial traz os comunicados e as últimas notícias, com inscrição por e-mail para quem quer receber as atualizações, e a busca encontra qualquer página do site.',
      'Desde o lançamento, o site continua com a Bumavit no <a href="/manutencao-de-sites/" data-hover>plano de manutenção</a>: atualizações, backups e as publicações da Academia.'
    ],
    link: 'https://abmasto.com/',
    showcase: {
      solo: true,
      laptop: { src: '../img/projetos/abmasto-phone.webp', w: 946, h: 1420 },
      alt: 'Página inicial do site da ABMasto exibida em um celular'
    },
    t: {
      en: {
        tag: 'Medical academy · Rio de Janeiro, Brazil',
        metaValues: ['Academia Brasileira de Mastologia', '2023', 'Medicine and institutional memory', 'Institutional website, Archive and news, Maintenance'],
        challenge: [
          'The Brazilian Academy of Mastology was founded on 1 August 2020, in the middle of the pandemic, to preserve the memory of Brazilian breast specialists: the history of the specialty, its pioneers and its awards. It is a member of the Brazilian Federation of Medical Academies.',
          'In 2023 the Academy needed a website that gathered in one place what had been scattered until then: the institution’s history and symbols, its members, the archive, the awards and the news for members.'
        ],
        solution: [
          'We built the site on WordPress. The menu follows the Academy’s structure: Institutional (history, the president’s word, flag, coat of arms and medallion), Members, Archive (Brazilian Mastology Library and Museum), Awards and the Academy’s Journal.',
          'The home page carries the announcements and the latest news, with an e-mail sign-up for those who want the updates, and the search finds any page on the site.',
          'Since launch, the site has stayed with Bumavit on the maintenance plan: updates, backups and the Academy’s publications.'
        ]
      },
      es: {
        tag: 'Academia médica · Río de Janeiro, Brasil',
        metaValues: ['Academia Brasileira de Mastologia', '2023', 'Medicina y memoria institucional', 'Sitio institucional, Acervo y noticias, Mantenimiento'],
        challenge: [
          'La Academia Brasileña de Mastología fue fundada el 1 de agosto de 2020, en plena pandemia, para preservar la memoria de los mastólogos brasileños: la historia de la especialidad, sus pioneros y sus premios. Es miembro de la Federación Brasileña de Academias de Medicina.',
          'En 2023, la Academia necesitaba un sitio que reuniera en un solo lugar lo que hasta entonces estaba disperso: la historia y los símbolos de la institución, los académicos, el acervo, los premios y las noticias para los miembros.'
        ],
        solution: [
          'Construimos el sitio en WordPress. El menú sigue la estructura de la Academia: Institucional (historia, palabra del presidente, bandera, escudo y medallón), Académicos, Acervo (Biblioteca Mastológica Brasileña y Museo), Premios y Revista de la Academia.',
          'La página de inicio trae los comunicados y las últimas noticias, con inscripción por correo para quien quiere recibir las actualizaciones, y la búsqueda encuentra cualquier página del sitio.',
          'Desde el lanzamiento, el sitio sigue con Bumavit en el plan de mantenimiento: actualizaciones, copias de seguridad y las publicaciones de la Academia.'
        ]
      }
    }
  }
];

/* Rótulos fixos do template por idioma */
const LABELS = {
  en: {
    projLabel: '( Project )',
    partnerLead: 'Project in collaboration with',
    metaLabels: ['Client', 'Year', 'Industry', 'Services'],
    challengeTitle: 'The challenge',
    solutionTitle: 'The solution',
    quoteTitle: 'Google review'
  },
  es: {
    projLabel: '( Proyecto )',
    partnerLead: 'Proyecto en colaboración con',
    metaLabels: ['Cliente', 'Año', 'Sector', 'Servicios'],
    challengeTitle: 'El desafío',
    solutionTitle: 'La solución',
    quoteTitle: 'Reseña en Google'
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
    if (p.partner) d['.p-partner'] = { html: `${L.partnerLead} <a href="${p.partner.url}" target="_blank" rel="noopener" data-hover>${p.partner.name}</a>` };
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
    /* A avaliação fica em português nos três idiomas: é o texto do cliente, sem edição. */
    if (p.quote) d['section.p-quote .p-section__label'] = L.quoteTitle;
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

/* ---------- Card social por projeto ----------
   Mesmo formato do og.png do site (1200x630), que e a proporcao que
   Facebook, WhatsApp e LinkedIn esperam. Sai em SVG, que e a fonte
   versionada; o JPEG servido no og:image e rasterizado a partir dele.
   Por que JPEG e nao PNG: o gradiente nao comprime em PNG e cada card
   saía com 372KB, contra 33KB em JPEG 0.92.
   Por que nao SVG direto no og:image: Facebook, WhatsApp, LinkedIn e X
   nao renderizam SVG em previa; a previa sai sem imagem nenhuma.
   Como rasterizar apos mudar titulo ou tag de um projeto: abrir o site
   local, desenhar o SVG num canvas 1200x630 e exportar em image/jpeg 0.92.
   Fontes de sistema de proposito: webfont em SVG nao carrega quando o
   arquivo e aberto fora do site. */
const CARD_GRAD = {
  'cover--cyan': '#075985',
  'cover--rust': '#9a3f12',
  'cover--ink':  '#1c1c22'
};

function cardWrap(text, max) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w;
    if (next.length > max && cur) { lines.push(cur); cur = w; } else { cur = next; }
  }
  if (cur) lines.push(cur);
  return lines;
}

const cardEsc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;')
  .replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function projectCard(p) {
  const W = 1200, H = 630, PX = 80;
  const grad = CARD_GRAD[p.mediaClass] || CARD_GRAD['cover--ink'];

  /* Arial Black e larga: a media por caractere fica perto de 0.70em, nao de
     0.55em. Subestimar isso faz o titulo vazar pela direita do card. */
  const CHAR_W = 0.70;
  const tLen = p.title.length;
  const fs = tLen <= 14 ? 88 : tLen <= 24 ? 68 : 54;
  const titleLines = cardWrap(p.title, Math.floor((W - 2 * PX) / (fs * CHAR_W)));
  const lh = Math.round(fs * 1.16);
  const titleY = 330 - (titleLines.length - 1) * lh / 2;
  const tspans = titleLines.map((l, i) =>
    `<tspan x="${PX}" dy="${i === 0 ? 0 : lh}">${cardEsc(l)}</tspan>`).join('');

  /* A tag e longa e descritiva; duas linhas no maximo, com reticencias. */
  const tagLines = cardWrap(p.tag, 58).slice(0, 2);
  const tagSpans = tagLines.map((l, i) =>
    `<tspan x="${PX}" dy="${i === 0 ? 0 : 34}">${cardEsc(l)}</tspan>`).join('');

  const selo = p.status === 'andamento' ? 'PROJETO EM ANDAMENTO'
             : p.nda ? 'PROJETO SOB NDA'
             : 'PROJETO';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="${grad}"/>
      <stop offset="100%" stop-color="#0b0b0d"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#0b0b0d"/>
  <rect width="${W}" height="420" fill="url(#g)" opacity="0.45"/>
  <text x="${W - PX}" y="${H - 8}" fill="#16161e" font-family="Arial Black,Arial,sans-serif" font-size="300" font-weight="900" text-anchor="end">B</text>
  <rect x="${PX}" y="68" width="44" height="4" fill="#ff7a29" rx="2"/>
  <text x="${PX}" y="112" fill="rgba(239,237,230,0.78)" font-family="Arial Black,Arial,sans-serif" font-size="16" font-weight="900" letter-spacing="5">${cardEsc(selo)}</text>
  <text x="${PX}" y="${titleY}" fill="#efede6" font-family="Arial Black,Arial,sans-serif" font-size="${fs}" font-weight="900">${tspans}</text>
  <text x="${PX}" y="440" fill="rgba(239,237,230,0.62)" font-family="Arial,sans-serif" font-size="26">${tagSpans}</text>
  <text x="${PX}" y="${H - 52}" fill="#363648" font-family="Arial,sans-serif" font-size="20" letter-spacing="2">bumavit.com.br</text>
</svg>`;
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

  /* Avaliação do Google: texto sem edição e nome como aparece lá (regra do fundador, 08/11/2026). */
  const quote = p.quote ? `
    <section class="p-section p-quote section">
      <h2 class="p-section__label" data-reveal>Avaliação no Google</h2>
      <div class="p-section__body" data-reveal>
        <figure class="voices__card p-quote__card">
          <blockquote>${p.quote.text}</blockquote>
          <figcaption><strong>${p.quote.name}</strong><span>${p.quote.role}</span></figcaption>
        </figure>
      </div>
    </section>
` : '';

  const ndaBadge = p.nda ? `\n        <span class="p-nda" data-reveal>Projeto sob NDA</span>` : '';

  /* Banner: palco 2.5D quando o projeto tem mockups, senão o gradiente padrão.
     As <img> internas são decorativas (alt vazio); o rótulo fica no contêiner. */
  /* showcase.solo: um aparelho só, no centro do palco (o celular da CNACAB); o celular de apoio é opcional. */
  const phoneImg = p.showcase && p.showcase.phone ? `
          <img class="devstage__phone" src="${p.showcase.phone.src}" alt="" width="${p.showcase.phone.w}" height="${p.showcase.phone.h}" decoding="async">` : '';
  const banner = p.showcase ? `
      <div class="devstage${p.showcase.solo ? ' devstage--solo' : ''}" id="devstage" data-reveal role="img" aria-label="${esc(p.showcase.alt)}">
        <div class="devstage__scene" id="devstageScene">
          <img class="devstage__laptop" src="${p.showcase.laptop.src}" alt="" width="${p.showcase.laptop.w}" height="${p.showcase.laptop.h}" decoding="async">${phoneImg}
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
  <meta property="og:image" content="https://bumavit.com.br/images/projetos/${p.slug}-card.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(p.title)}, projeto da Bumavit">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="https://bumavit.com.br/projetos/${p.slug}.html">
  <meta name="twitter:title" content="${esc(p.title)} · BUMAVIT®">
  <meta name="twitter:description" content="${esc(p.tag)}.">
  <meta name="twitter:image" content="https://bumavit.com.br/images/projetos/${p.slug}-card.jpg">
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
  <link rel="stylesheet" href="../css/style.css?v=13">
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
      <p class="p-hero__tag" data-reveal>${esc(p.tag)}</p>${p.partner ? `
      <p class="p-partner" data-reveal>Projeto em colaboração com <a href="${p.partner.url}" target="_blank" rel="noopener" data-hover>${p.partner.name}</a></p>` : ''}

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
${quote}${statItems ? `
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
      <p class="footer__services"><span class="footer__services-label">Serviços:</span> <a href="/criacao-de-sites-rj/" data-hover>Criação de sites no Rio de Janeiro</a> · <a href="/manutencao-de-sites/" data-hover>Manutenção de sites</a> · <a href="/estimador.html" data-hover>Estimador de orçamento</a></p>
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
  <script src="../js/page.js?v=4" defer></script>
  <script src="../js/analytics.js" defer></script>
</body>
</html>
`;
}

mkdirSync(join(root, 'projetos'), { recursive: true });
mkdirSync(join(root, 'images', 'projetos'), { recursive: true });
projects.forEach((p, i) => {
  const next = projects[(i + 1) % projects.length];
  const out = join(root, 'projetos', `${p.slug}.html`);
  writeFileSync(out, page(p, next), 'utf8');
  console.log('ok:', out);

  const card = join(root, 'images', 'projetos', `${p.slug}-card.svg`);
  writeFileSync(card, projectCard(p), 'utf8');
  console.log('ok:', card);
});
