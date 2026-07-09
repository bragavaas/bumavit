/* BUMAVIT — i18n runtime (pt-BR padrão, EN e ES)
   Carregar ANTES de main.js/page.js (ambos defer: a ordem no HTML garante).
   Mecanismo: dicionário { seletorCSS: valor } onde valor é
     - string            → textContent
     - { html: '...' }   → innerHTML (para nós com markup interno)
     - { attr: {...} }   → atributos (placeholder, aria-label, data-cursor…)
   Páginas podem registrar traduções próprias em window.__pageI18n = { en: {...}, es: {...} }.
   A troca de idioma grava localStorage e recarrega a página (re-executa as animações). */
(function () {
  'use strict';

  var KEY = 'bumavit_lang';
  var LANG = 'pt';
  try { LANG = localStorage.getItem(KEY) || 'pt'; } catch (e) {}
  if (['pt', 'en', 'es'].indexOf(LANG) === -1) LANG = 'pt';

  /* ---------- Strings usadas pelo JS (formulário etc.) ---------- */
  var STR = {
    pt: {
      formSending: 'Enviando…',
      formOk: 'Mensagem enviada! Respondemos em até 24h. ✦',
      formError: 'Algo deu errado. Tente de novo ou chame no WhatsApp.',
      formUnconfigured: 'Formulário ainda não configurado — por enquanto, chame no WhatsApp ou envie um e-mail. 🙂'
    },
    en: {
      formSending: 'Sending…',
      formOk: 'Message sent! We reply within 24h. ✦',
      formError: 'Something went wrong. Try again or ping us on WhatsApp.',
      formUnconfigured: 'The form isn’t configured yet — for now, reach us on WhatsApp or by e-mail. 🙂'
    },
    es: {
      formSending: 'Enviando…',
      formOk: '¡Mensaje enviado! Respondemos en hasta 24h. ✦',
      formError: 'Algo salió mal. Inténtalo de nuevo o escríbenos por WhatsApp.',
      formUnconfigured: 'El formulario aún no está configurado — por ahora, escríbenos por WhatsApp o por correo. 🙂'
    }
  };
  window.__STR = STR[LANG];
  window.__LANG = LANG;

  /* ---------- Dicionário comum + página principal ---------- */
  var faqIcon = '<span class="faq__icon" aria-hidden="true"></span>';
  var marqueeEN = '<span>Web Development</span><i>✺</i><span>Mobile Apps</span><i>✺</i><span>E-commerce</span><i>✺</i><span>UI/UX Design</span><i>✺</i><span>SEO &amp; Performance</span><i>✺</i><span>Automation</span><i>✺</i>';
  var marqueeES = '<span>Desarrollo Web</span><i>✺</i><span>Aplicaciones</span><i>✺</i><span>E-commerce</span><i>✺</i><span>Diseño UI/UX</span><i>✺</i><span>SEO y Performance</span><i>✺</i><span>Automatización</span><i>✺</i>';

  var DICT = {
    en: {
      /* --- nav / menu / footer (todas as páginas) --- */
      '.nav__links a[href$="#estudio"]': 'Studio',
      '.nav__links a[href$="#servicos"]': 'Services',
      '.nav__links a[href$="#projetos"]': 'Work',
      '.nav__links a[href$="#processo"]': 'Process',
      '.nav__cta span': 'Start a project',
      '.menu__links a[href$="#estudio"]': { text: 'Studio' },
      '.menu__links a[href$="#servicos"]': { text: 'Services' },
      '.menu__links a[href$="#projetos"]': { text: 'Work' },
      '.menu__links a[href$="#processo"]': { text: 'Process' },
      '.menu__links a[href$="#contato"]': { text: 'Contact' },
      '.menu__footer p': 'Brazil — serving the world',
      '.footer__col h4 + a[href$="#inicio"]': 'Home',
      '.footer__col a[href$="#inicio"]': 'Home',
      '.footer__col a[href$="#servicos"]': 'Services',
      '.footer__col a[href$="#projetos"]': 'Work',
      '.footer__col a[href$="sobre.html"]': 'About',
      '.footer__col a[href$="#contato"]': 'Contact',
      '.footer__col--info h4': 'Base',
      '.footer__col--info p': { html: 'Brazil — serving<br>clients worldwide.' },
      '.footer__bottom p:first-child': '© 2026 Bumavit. All rights reserved.',
      '.footer__bottom p:nth-of-type(2)': 'Brewed with coffee ☕ in Brazil',
      '.footer__top-btn': 'Back to top ↑',
      '[data-cursor="Ver projeto"]': { attr: { 'data-cursor': 'View project' } },

      /* --- hero --- */
      '.hero__eyebrow': { html: '<span class="hero__dot"></span> Software house — Brazil' },
      '.hero__line:nth-child(1) .hero__line-inner': 'WE CRAFT',
      '.hero__line:nth-child(2) .hero__line-inner': 'DIGITAL',
      '.hero__line:nth-child(3) .hero__line-inner': { html: 'EXPERIENCES<em class="hero__asterisk">*</em>' },
      '.hero__sub': '*From idea to deploy — we design and build websites, apps and platforms tailor-made for brands that want to grow.',
      '.hero__bottom .btn-pill span': 'Let’s talk',

      /* --- marquee --- */
      '.marquee__group': { html: marqueeEN },

      /* --- estúdio / manifesto --- */
      '#estudio .section__label': '( Studio )',
      '#manifestoText': 'We don’t just ship code. We blend engineering, design and strategy to build products that drive revenue, brands that earn presence and experiences people remember.',
      '.stats__item:nth-child(1) .stats__desc': 'Projects delivered',
      '.stats__item:nth-child(2) .stats__desc': 'Industries served',
      '.stats__item:nth-child(3) .stats__desc': 'Focused on results',
      '.stats__item:nth-child(4) .stats__desc': 'Dedicated support',

      /* --- serviços --- */
      '#servicos .section__label': '( Services )',
      '#servicos .section__title': 'What we do',
      '.services__item:nth-child(1) .services__name': 'Web Development',
      '.services__item:nth-child(1) .services__desc': 'Websites, systems and platforms — fast, secure and built to scale.',
      '.services__item:nth-child(2) .services__name': 'Mobile Apps',
      '.services__item:nth-child(2) .services__desc': 'Native and hybrid apps with flawless UX for iOS and Android.',
      '.services__item:nth-child(3) .services__name': 'E-commerce',
      '.services__item:nth-child(3) .services__desc': 'Stores that convert — from storefront to checkout, optimized to sell.',
      '.services__item:nth-child(4) .services__name': 'SEO & Performance',
      '.services__item:nth-child(4) .services__desc': 'Local and global visibility with Core Web Vitals in the green.',
      '.services__item:nth-child(5) .services__name': 'Brand & UI/UX',
      '.services__item:nth-child(5) .services__desc': 'Interfaces and brands with personality, purpose and consistency.',

      /* --- projetos --- */
      '#projetos .section__label': '( Work )',
      '#projetos .section__title': 'Selected work',
      '.work__card:nth-child(1) .work__info p': 'Yacht booking platform — Toronto, Canada',
      '.work__card:nth-child(2) .work__info p': 'Institutional portal with a complete digital presence',
      '.work__card:nth-child(3) .work__info h3': 'Confidential project',
      '.work__card:nth-child(3) .work__info p': 'SaaS dashboard for a fast-growing fintech',
      '.work__card:nth-child(4) .work__info h3': 'Confidential project',
      '.work__card:nth-child(4) .work__info p': 'Fashion e-commerce with an optimized checkout',

      /* --- processo --- */
      '.process__panel--intro .section__label': '( Process )',
      '.process__heading': { html: 'How the magic<br>happens<em>→</em>' },
      '.process__panel:nth-child(2) h3': 'Discovery',
      '.process__panel:nth-child(2) p': 'Deep dive into your business, goals and audience. No guesswork: context and data drive every decision.',
      '.process__panel:nth-child(3) h3': 'Strategy & Design',
      '.process__panel:nth-child(3) p': 'Information architecture, clickable prototypes and visual identity — all validated with you.',
      '.process__panel:nth-child(4) h3': 'Development',
      '.process__panel:nth-child(4) p': 'Clean, performant, scalable code, with continuous delivery and full transparency.',
      '.process__panel:nth-child(5) h3': 'Launch & Growth',
      '.process__panel:nth-child(5) p': 'Smooth deploys, real metrics and constant optimization after go-live.',

      /* --- clientes --- */
      '#clientes .section__label': '( Clients )',
      '#clientes .section__title': 'Who has built with us',
      '.voices__card:nth-child(1) blockquote': '"Bumavit understood the business before writing a single line of code. The site became our main booking channel."',
      '.voices__card:nth-child(1) figcaption strong': 'Yacht Day team',
      '.voices__card:nth-child(1) figcaption span': 'Toronto, Canada',
      '.voices__card:nth-child(2) blockquote': '"We centralized all our communication in a portal that finally feels like us. A transparent process from start to finish."',
      '.voices__card:nth-child(2) figcaption span': 'Institutional portal',
      '.voices__card:nth-child(3) blockquote': '"Delivered on time, clean code and a dashboard the whole team can use. A partnership that outlasts go-live."',
      '.voices__card:nth-child(3) figcaption strong': 'Confidential client',
      '.voices__card:nth-child(3) figcaption span': 'Fintech — SaaS',
      '.voices__logos-you': 'your brand here →',

      /* --- FAQ --- */
      '#faq .section__label': '( FAQ )',
      '#faq .section__title': 'Frequently asked questions',
      '.faq__item:nth-child(1) summary': { html: 'How much does a project cost?' + faqIcon },
      '.faq__item:nth-child(1) .faq__answer p': 'Every project is quoted individually, based on scope, timeline and complexity. After a free intro call we send a detailed proposal within 48h — no surprises along the way.',
      '.faq__item:nth-child(2) summary': { html: 'How long does a website or app take?' + faqIcon },
      '.faq__item:nth-child(2) .faq__answer p': 'Institutional websites usually take 3–6 weeks; e-commerce and apps, 2–4 months. The schedule is set with you during discovery, with continuous deliveries throughout.',
      '.faq__item:nth-child(3) summary': { html: 'Do you provide support after launch?' + faqIcon },
      '.faq__item:nth-child(3) .faq__answer p': 'Yes. Every project includes a warranty period, and we offer maintenance and continuous-evolution plans — monitoring, updates, improvements and new features.',
      '.faq__item:nth-child(4) summary': { html: 'Do you work with clients outside Brazil?' + faqIcon },
      '.faq__item:nth-child(4) .faq__answer p': 'Yes — we’ve delivered projects for clients in Canada and work in Portuguese, English and Spanish, with remote meetings in any timezone.',
      '.faq__item:nth-child(5) summary': { html: 'How does a project start?' + faqIcon },
      '.faq__item:nth-child(5) .faq__answer p': 'With a conversation. Tell us your idea through the form or WhatsApp, we’ll do a no-strings discovery call and come back with a proposal, timeline and investment.',

      /* --- contato --- */
      '#contato .section__label': '( Contact )',
      '.cta__line:nth-child(1)': 'Got an idea?',
      '.cta__line:nth-child(2)': 'Let’s make it real.',
      '.lead__row .lead__field:nth-child(1) span': 'Your name',
      '.lead__row .lead__field:nth-child(2) span': 'Your e-mail',
      'input[name="nome"]': { attr: { placeholder: 'What should we call you?' } },
      'input[name="email"]': { attr: { placeholder: 'you@company.com' } },
      'form.lead > .lead__field:nth-of-type(1) > span': 'Project type',
      'form.lead > .lead__field:nth-of-type(2) > span': 'Tell us the idea',
      'select[name="tipo"] option:nth-child(1)': 'Select…',
      'select[name="tipo"] option:nth-child(2)': 'Institutional website',
      'select[name="tipo"] option:nth-child(3)': 'E-commerce',
      'select[name="tipo"] option:nth-child(4)': 'Mobile app',
      'select[name="tipo"] option:nth-child(5)': 'System / SaaS',
      'select[name="tipo"] option:nth-child(6)': 'SEO & Performance',
      'select[name="tipo"] option:nth-child(7)': 'Other',
      'textarea[name="mensagem"]': { attr: { placeholder: 'What do you want to build?' } },
      '.lead__submit span': 'Send message',
      '.lead__actions a.btn-pill span': 'Chat on WhatsApp',
      '.cta__note': { html: 'Or write to <a class="cta__mail" href="mailto:contato@bumavit.com.br" data-hover>contato@bumavit.com.br</a> — we reply within 24h, in Portuguese, English or Spanish.' },

      /* --- páginas internas (comuns) --- */
      '.footer__bottom a[href$="index.html#projetos"]': '← All projects',
      '.footer__bottom a[href="../index.html"]': '← Back home',
      '.footer__bottom a[href="index.html"]:not([data-scroll])': '← Back home',
      '.next__label': 'Next project',
      '.p-nda': 'Project under NDA',
      '.p-visit .btn-pill span': 'Visit website ↗',
      '.article__cta h3': 'Want this working for your business?',
      '.article__cta .btn-pill span': 'Talk to Bumavit',

      /* --- 404 --- */
      '.nf__title': 'This page hasn’t been developed yet.',
      '.nf p': 'How about yours? We build digital experiences that move businesses — including pages that exist.',
      '.nf .btn-pill span': 'Back home'
    },

    es: {
      '.nav__links a[href$="#estudio"]': 'Estudio',
      '.nav__links a[href$="#servicos"]': 'Servicios',
      '.nav__links a[href$="#projetos"]': 'Proyectos',
      '.nav__links a[href$="#processo"]': 'Proceso',
      '.nav__cta span': 'Iniciar proyecto',
      '.menu__links a[href$="#estudio"]': { text: 'Estudio' },
      '.menu__links a[href$="#servicos"]': { text: 'Servicios' },
      '.menu__links a[href$="#projetos"]': { text: 'Proyectos' },
      '.menu__links a[href$="#processo"]': { text: 'Proceso' },
      '.menu__links a[href$="#contato"]': { text: 'Contacto' },
      '.menu__footer p': 'Brasil — atendiendo al mundo',
      '.footer__col a[href$="#inicio"]': 'Inicio',
      '.footer__col a[href$="#servicos"]': 'Servicios',
      '.footer__col a[href$="#projetos"]': 'Proyectos',
      '.footer__col a[href$="sobre.html"]': 'Nosotros',
      '.footer__col a[href$="#contato"]': 'Contacto',
      '.footer__col--info p': { html: 'Brasil — atendiendo<br>clientes en todo el mundo.' },
      '.footer__bottom p:first-child': '© 2026 Bumavit. Todos los derechos reservados.',
      '.footer__bottom p:nth-of-type(2)': 'Hecho con café ☕ en Brasil',
      '.footer__top-btn': 'Volver arriba ↑',
      '[data-cursor="Ver projeto"]': { attr: { 'data-cursor': 'Ver proyecto' } },

      '.hero__eyebrow': { html: '<span class="hero__dot"></span> Software house — Brasil' },
      '.hero__line:nth-child(1) .hero__line-inner': 'CREAMOS',
      '.hero__line:nth-child(2) .hero__line-inner': 'EXPERIENCIAS',
      '.hero__line:nth-child(3) .hero__line-inner': { html: 'DIGITALES<em class="hero__asterisk">*</em>' },
      '.hero__sub': '*De la idea al deploy — diseñamos y desarrollamos sitios, aplicaciones y plataformas a medida para marcas que quieren crecer.',
      '.hero__bottom .btn-pill span': 'Hablemos',

      '.marquee__group': { html: marqueeES },

      '#estudio .section__label': '( Estudio )',
      '#manifestoText': 'No entregamos solo código. Combinamos ingeniería, diseño y estrategia para construir productos que generan ingresos, marcas que ganan presencia y experiencias que quedan en la memoria.',
      '.stats__item:nth-child(1) .stats__desc': 'Proyectos entregados',
      '.stats__item:nth-child(2) .stats__desc': 'Sectores atendidos',
      '.stats__item:nth-child(3) .stats__desc': 'Enfoque en resultados',
      '.stats__item:nth-child(4) .stats__desc': 'Soporte dedicado',

      '#servicos .section__label': '( Servicios )',
      '#servicos .section__title': 'Qué hacemos',
      '.services__item:nth-child(1) .services__name': 'Desarrollo Web',
      '.services__item:nth-child(1) .services__desc': 'Sitios, sistemas y plataformas rápidas, seguras y escalables.',
      '.services__item:nth-child(2) .services__name': 'Aplicaciones Móviles',
      '.services__item:nth-child(2) .services__desc': 'Apps nativas e híbridas con UX impecable para iOS y Android.',
      '.services__item:nth-child(3) .services__name': 'E-commerce',
      '.services__item:nth-child(3) .services__desc': 'Tiendas que convierten — del escaparate al checkout, todo optimizado para vender.',
      '.services__item:nth-child(4) .services__name': 'SEO y Performance',
      '.services__item:nth-child(4) .services__desc': 'Visibilidad local y global con Core Web Vitals en verde.',
      '.services__item:nth-child(5) .services__name': 'Identidad y UI/UX',
      '.services__item:nth-child(5) .services__desc': 'Interfaces y marcas con personalidad, propósito y consistencia.',

      '#projetos .section__label': '( Proyectos )',
      '#projetos .section__title': 'Trabajos seleccionados',
      '.work__card:nth-child(1) .work__info p': 'Plataforma de reservas de yates — Toronto, Canadá',
      '.work__card:nth-child(2) .work__info p': 'Portal institucional con presencia digital completa',
      '.work__card:nth-child(3) .work__info h3': 'Proyecto confidencial',
      '.work__card:nth-child(3) .work__info p': 'Dashboard SaaS para una fintech en crecimiento',
      '.work__card:nth-child(4) .work__info h3': 'Proyecto confidencial',
      '.work__card:nth-child(4) .work__info p': 'E-commerce de moda con checkout optimizado',

      '.process__panel--intro .section__label': '( Proceso )',
      '.process__heading': { html: 'Cómo sucede<br>la magia<em>→</em>' },
      '.process__panel:nth-child(2) h3': 'Descubrimiento',
      '.process__panel:nth-child(2) p': 'Inmersión en tu negocio, objetivos y público. Sin suposiciones: el contexto y los datos guían cada decisión.',
      '.process__panel:nth-child(3) h3': 'Estrategia y Diseño',
      '.process__panel:nth-child(3) p': 'Arquitectura de la información, prototipos navegables e identidad visual — todo validado contigo.',
      '.process__panel:nth-child(4) h3': 'Desarrollo',
      '.process__panel:nth-child(4) p': 'Código limpio, performante y escalable, con entregas continuas y transparencia total.',
      '.process__panel:nth-child(5) h3': 'Lanzamiento y Evolución',
      '.process__panel:nth-child(5) p': 'Deploy sin sustos, métricas reales y optimización constante después del go-live.',

      '#clientes .section__label': '( Clientes )',
      '#clientes .section__title': 'Quiénes ya construyeron con nosotros',
      '.voices__card:nth-child(1) blockquote': '"Bumavit entendió el negocio antes de escribir la primera línea de código. El sitio se convirtió en nuestro principal canal de reservas."',
      '.voices__card:nth-child(1) figcaption strong': 'Equipo Yacht Day',
      '.voices__card:nth-child(1) figcaption span': 'Toronto, Canadá',
      '.voices__card:nth-child(2) blockquote': '"Centralizamos toda nuestra comunicación en un portal que por fin se parece a nosotros. Proceso transparente de principio a fin."',
      '.voices__card:nth-child(2) figcaption span': 'Portal institucional',
      '.voices__card:nth-child(3) blockquote': '"Entrega a tiempo, código limpio y un panel que todo el equipo puede usar. Una alianza que continúa después del go-live."',
      '.voices__card:nth-child(3) figcaption strong': 'Cliente confidencial',
      '.voices__card:nth-child(3) figcaption span': 'Fintech — SaaS',
      '.voices__logos-you': 'tu marca aquí →',

      '#faq .section__label': '( FAQ )',
      '#faq .section__title': 'Preguntas frecuentes',
      '.faq__item:nth-child(1) summary': { html: '¿Cuánto cuesta un proyecto con Bumavit?' + faqIcon },
      '.faq__item:nth-child(1) .faq__answer p': 'Cada proyecto se cotiza a medida, según alcance, plazo y complejidad. Tras una conversación inicial gratuita, enviamos una propuesta detallada en 48h — sin sorpresas en el camino.',
      '.faq__item:nth-child(2) summary': { html: '¿Cuánto tarda un sitio web o una app?' + faqIcon },
      '.faq__item:nth-child(2) .faq__answer p': 'Los sitios institucionales suelen tomar de 3 a 6 semanas; e-commerce y apps, de 2 a 4 meses. El cronograma se define contigo en la fase de descubrimiento, con entregas continuas.',
      '.faq__item:nth-child(3) summary': { html: '¿Dan soporte después del lanzamiento?' + faqIcon },
      '.faq__item:nth-child(3) .faq__answer p': 'Sí. Todo proyecto incluye un período de garantía, y ofrecemos planes de mantenimiento y evolución continua — monitoreo, actualizaciones, mejoras y nuevas funcionalidades.',
      '.faq__item:nth-child(4) summary': { html: '¿Atienden clientes fuera de Brasil?' + faqIcon },
      '.faq__item:nth-child(4) .faq__answer p': 'Sí — ya entregamos proyectos para clientes en Canadá y trabajamos en portugués, inglés y español, con reuniones remotas en cualquier huso horario.',
      '.faq__item:nth-child(5) summary': { html: '¿Cómo empieza un proyecto?' + faqIcon },
      '.faq__item:nth-child(5) .faq__answer p': 'Con una conversación. Cuéntanos tu idea por el formulario o WhatsApp, hacemos una llamada de descubrimiento sin compromiso y volvemos con propuesta, plazo e inversión.',

      '#contato .section__label': '( Contacto )',
      '.cta__line:nth-child(1)': '¿Tienes una idea?',
      '.cta__line:nth-child(2)': 'Hagámosla realidad.',
      '.lead__row .lead__field:nth-child(1) span': 'Tu nombre',
      '.lead__row .lead__field:nth-child(2) span': 'Tu correo',
      'input[name="nome"]': { attr: { placeholder: '¿Cómo te llamamos?' } },
      'input[name="email"]': { attr: { placeholder: 'tu@empresa.com' } },
      'form.lead > .lead__field:nth-of-type(1) > span': 'Tipo de proyecto',
      'form.lead > .lead__field:nth-of-type(2) > span': 'Cuéntanos la idea',
      'select[name="tipo"] option:nth-child(1)': 'Selecciona…',
      'select[name="tipo"] option:nth-child(2)': 'Sitio institucional',
      'select[name="tipo"] option:nth-child(3)': 'E-commerce',
      'select[name="tipo"] option:nth-child(4)': 'Aplicación móvil',
      'select[name="tipo"] option:nth-child(5)': 'Sistema / SaaS',
      'select[name="tipo"] option:nth-child(6)': 'SEO y Performance',
      'select[name="tipo"] option:nth-child(7)': 'Otro',
      'textarea[name="mensagem"]': { attr: { placeholder: '¿Qué quieres construir?' } },
      '.lead__submit span': 'Enviar mensaje',
      '.lead__actions a.btn-pill span': 'Escribir por WhatsApp',
      '.cta__note': { html: 'O escribe a <a class="cta__mail" href="mailto:contato@bumavit.com.br" data-hover>contato@bumavit.com.br</a> — respondemos en hasta 24h, en portugués, inglés o español.' },

      '.footer__bottom a[href$="index.html#projetos"]': '← Todos los proyectos',
      '.footer__bottom a[href="../index.html"]': '← Volver al inicio',
      '.footer__bottom a[href="index.html"]:not([data-scroll])': '← Volver al inicio',
      '.next__label': 'Siguiente proyecto',
      '.p-nda': 'Proyecto bajo NDA',
      '.p-visit .btn-pill span': 'Visitar sitio ↗',
      '.article__cta h3': '¿Quieres aplicarlo en tu negocio?',
      '.article__cta .btn-pill span': 'Habla con Bumavit',

      '.nf__title': 'Esta página aún no fue desarrollada.',
      '.nf p': '¿Qué tal la tuya? Construimos experiencias digitales que mueven negocios — incluidas páginas que existen.',
      '.nf .btn-pill span': 'Volver al inicio'
    }
  };

  /* ---------- Aplicação ---------- */
  function applyDict(dict) {
    if (!dict) return;
    Object.keys(dict).forEach(function (sel) {
      var val = dict[sel];
      var nodes;
      try { nodes = document.querySelectorAll(sel); } catch (e) { return; }
      nodes.forEach(function (node) {
        if (typeof val === 'string') {
          node.textContent = val;
        } else {
          if (val.html !== undefined) node.innerHTML = val.html;
          if (val.text !== undefined) {
            // substitui apenas o último nó de texto (preserva spans internos, ex.: numeração do menu)
            var last = null;
            node.childNodes.forEach(function (c) {
              if (c.nodeType === 3 && c.nodeValue.trim()) last = c;
            });
            if (last) last.nodeValue = val.text;
            else node.appendChild(document.createTextNode(val.text));
          }
          if (val.attr) Object.keys(val.attr).forEach(function (a) { node.setAttribute(a, val.attr[a]); });
        }
      });
    });
  }

  if (LANG !== 'pt') {
    document.documentElement.setAttribute('lang', LANG === 'en' ? 'en' : 'es');
    applyDict(DICT[LANG]);
    if (window.__pageI18n && window.__pageI18n[LANG]) applyDict(window.__pageI18n[LANG]);
  }

  /* ---------- Seletor de idioma (bandeiras, canto superior direito) ---------- */
  var FLAGS = {
    pt: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#009c3b"/><path d="M10 1.5L18.5 7 10 12.5 1.5 7z" fill="#ffdf00"/><circle cx="10" cy="7" r="3" fill="#002776"/></svg>',
    en: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#b22234"/><path d="M0 2h20M0 4.3h20M0 6.5h20M0 8.8h20M0 11h20" stroke="#fff" stroke-width="1.1"/><rect width="9" height="7.5" fill="#3c3b6e"/></svg>',
    es: '<svg viewBox="0 0 20 14" aria-hidden="true"><rect width="20" height="14" fill="#aa151b"/><rect y="3.7" width="20" height="6.6" fill="#f1bf00"/></svg>'
  };
  var NAMES = { pt: 'Português (Brasil)', en: 'English', es: 'Español' };

  function buildSwitcher() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var wrap = document.createElement('div');
    wrap.className = 'lang';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Idioma / Language');
    ['pt', 'en', 'es'].forEach(function (code) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'lang__btn' + (code === LANG ? ' is-active' : '');
      btn.setAttribute('aria-label', NAMES[code]);
      btn.setAttribute('title', NAMES[code]);
      btn.setAttribute('data-hover', '');
      btn.innerHTML = FLAGS[code];
      btn.addEventListener('click', function () {
        if (code === LANG) return;
        try { localStorage.setItem(KEY, code); } catch (e) {}
        window.location.reload();
      });
      wrap.appendChild(btn);
    });
    var cta = nav.querySelector('.nav__cta');
    var burger = nav.querySelector('.nav__burger');
    nav.insertBefore(wrap, cta || burger || null);
  }
  buildSwitcher();
})();
