/* BUMAVIT — Estimador "Monte seu projeto"
   Wizard → faixa de investimento + prazo → handoff pré-preenchido
   (WhatsApp/e-mail). Trilíngue via window.__LANG.

   MODELO DE PREÇO: horas × RATE (R$/h). Edite RATE, PRICING e FEATURES.
   Âncora: site institucional ≈ 24–32h ≈ R$ 2.160–2.880, 12–18 dias.
   O tipo "site" tem um passo extra de nº de páginas (5 inclusas,
   adicionais somam EXTRA_PAGE horas/dias cada). */
(function () {
  'use strict';

  var LANG = window.__LANG || 'pt';
  var WHATSAPP = '5521997235420';
  var RATE = 90;                  // R$/hora

  /* ---------- Tabela de preços (edite aqui) ---------- */
  var PRICING = {
    types: { // hours: [mín, máx] → preço = h × RATE · days: prazo em dias
      site:      { hours: [24, 32],   days: [12, 18] },
      ecommerce: { hours: [50, 72],   days: [25, 35] },
      app:       { hours: [90, 122],  days: [40, 55] },
      saas:      { hours: [110, 165], days: [55, 70] }
    },
    deadlines: { urgente: 1.2, normal: 1, medio: 1, flexivel: 1 } // multiplica só o preço
  };
  var PAGES_INCLUDED = 5;
  var PAGES_MAX = 15;
  var EXTRA_PAGE = { h: [2.5, 3.5], d: 0.5 }; // por página adicional

  /* Horas/dias por funcionalidade (independente de idioma) */
  var FEATURES = {
    site: {
      blog:        { h: [8, 12],  d: [3, 5] },
      idiomas:     { h: [6, 10],  d: [2, 4] },
      seo:         { h: [8, 12],  d: [2, 4] },
      agendamento: { h: [6, 10],  d: [2, 4] },
      restrita:    { h: [10, 16], d: [4, 6] },
      integracoes: { h: [6, 10],  d: [2, 4] }
    },
    ecommerce: {
      catalogo:    { h: [10, 16], d: [4, 6] },
      assinaturas: { h: [10, 16], d: [4, 6] },
      frete:       { h: [6, 10],  d: [2, 4] },
      cupons:      { h: [8, 12],  d: [3, 5] },
      idiomas:     { h: [8, 12],  d: [3, 5] },
      seo:         { h: [8, 12],  d: [2, 4] }
    },
    app: {
      login:      { h: [12, 18], d: [4, 7] },
      push:       { h: [8, 12],  d: [3, 5] },
      pagamentos: { h: [12, 18], d: [4, 7] },
      chat:       { h: [16, 24], d: [6, 9] },
      offline:    { h: [12, 18], d: [5, 8] },
      api:        { h: [10, 16], d: [4, 6] }
    },
    saas: {
      permissoes:  { h: [16, 24], d: [6, 9] },
      dashboards:  { h: [16, 24], d: [6, 9] },
      assinaturas: { h: [12, 18], d: [5, 8] },
      api:         { h: [12, 18], d: [5, 8] },
      automacao:   { h: [10, 16], d: [4, 6] },
      auditoria:   { h: [8, 12],  d: [3, 5] }
    }
  };

  /* ---------- Textos ---------- */
  var LOCALES = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };

  var T = {
    pt: {
      stepOf: function (a, b) { return 'Passo ' + a + ' de ' + b; },
      from: function (v) { return 'A partir de R$ ' + v; },
      typeStep: {
        q: 'O que você quer construir?',
        hint: 'Escolha o tipo de projeto.',
        options: [
          { id: 'site', name: 'Site institucional', desc: 'Presença digital profissional para sua marca' },
          { id: 'ecommerce', name: 'E-commerce', desc: 'Loja virtual pronta para vender' },
          { id: 'app', name: 'Aplicativo', desc: 'App mobile para iOS e Android' },
          { id: 'saas', name: 'Sistema / SaaS', desc: 'Plataforma web sob medida para o seu negócio' }
        ]
      },
      pagesStep: {
        q: 'Quantas páginas você precisa?',
        hint: 'O pacote inclui até 5 páginas: Home, Sobre, Serviços, Portfólio e Contato. Ideias de extras: FAQ, Depoimentos, Landing pages, Políticas de privacidade — e Blog já entra nas funcionalidades do próximo passo.',
        label: function (n, extra) {
          return n + ' páginas' + (extra > 0 ? ' · ' + extra + (extra === 1 ? ' adicional' : ' adicionais') : ' · todas inclusas');
        }
      },
      featuresStep: {
        q: 'Quais funcionalidades você precisa?',
        hint: 'Selecione quantas quiser — dá para ajustar depois.',
        options: {
          site: [
            { id: 'blog', name: 'Blog / Conteúdo', desc: 'Área de artigos e novidades' },
            { id: 'idiomas', name: 'Multi-idioma', desc: 'Site em mais de um idioma' },
            { id: 'seo', name: 'SEO avançado', desc: 'Estratégia de ranqueamento desde o dia 1' },
            { id: 'agendamento', name: 'Formulários / Agendamento', desc: 'Formulários avançados e marcação de horários' },
            { id: 'restrita', name: 'Área restrita', desc: 'Conteúdo exclusivo com login simples' },
            { id: 'integracoes', name: 'Integrações', desc: 'CRM, WhatsApp e outras ferramentas' }
          ],
          ecommerce: [
            { id: 'catalogo', name: 'Catálogo grande', desc: 'Muitos produtos, variações e filtros' },
            { id: 'assinaturas', name: 'Assinaturas', desc: 'Compra recorrente e clube de assinatura' },
            { id: 'frete', name: 'Frete integrado', desc: 'Cálculo automático com transportadoras' },
            { id: 'cupons', name: 'Cupons & fidelidade', desc: 'Descontos, cashback e pontos' },
            { id: 'idiomas', name: 'Multi-idioma', desc: 'Loja em mais de um idioma' },
            { id: 'seo', name: 'SEO avançado', desc: 'Produtos ranqueando no Google' }
          ],
          app: [
            { id: 'login', name: 'Login & perfis', desc: 'Contas de usuário e personalização' },
            { id: 'push', name: 'Notificações push', desc: 'Mensagens direto no celular do usuário' },
            { id: 'pagamentos', name: 'Pagamentos in-app', desc: 'Compras e assinaturas dentro do app' },
            { id: 'chat', name: 'Chat / mensagens', desc: 'Conversa em tempo real no app' },
            { id: 'offline', name: 'Modo offline', desc: 'Funciona sem internet e sincroniza depois' },
            { id: 'api', name: 'Integração com API', desc: 'Conexão com sistemas externos' }
          ],
          saas: [
            { id: 'permissoes', name: 'Multiusuário & permissões', desc: 'Times, papéis e níveis de acesso' },
            { id: 'dashboards', name: 'Dashboards & relatórios', desc: 'Métricas e exportações' },
            { id: 'assinaturas', name: 'Pagamentos & assinaturas', desc: 'Cobrança recorrente integrada' },
            { id: 'api', name: 'Integrações / API', desc: 'API pública e conexões externas' },
            { id: 'automacao', name: 'Automações & e-mails', desc: 'Fluxos automáticos e notificações' },
            { id: 'auditoria', name: 'Logs & auditoria', desc: 'Trilha de tudo que acontece no sistema' }
          ]
        }
      },
      deadlineStep: {
        q: 'Para quando você precisa?',
        hint: 'O prazo influencia o formato da equipe.',
        options: [
          { id: 'urgente', name: 'É pra ontem', desc: 'Prioridade máxima na agenda (+20%)' },
          { id: 'normal', name: '1–2 meses', desc: 'Ritmo acelerado' },
          { id: 'medio', name: '2–4 meses', desc: 'Ritmo confortável' },
          { id: 'flexivel', name: 'Flexível', desc: 'Qualidade acima de pressa' }
        ]
      },
      back: '← Voltar',
      next: 'Avançar →',
      resultLabel: 'Estimativa inicial de investimento',
      resultTime: function (a, b) { return 'Prazo estimado: ' + a + ' a ' + b + ' dias'; },
      pagesChip: function (n) { return n + ' páginas'; },
      disclaimer: 'Estimativa automática para referência. A proposta final — com escopo e valores fechados — sai depois de uma conversa gratuita de descoberta.',
      ctaWhats: 'Enviar pelo WhatsApp',
      ctaMail: 'Enviar por e-mail',
      restart: 'Recomeçar',
      handoffIntro: 'Olá, Bumavit! Montei meu projeto no site:',
      handoffType: 'Tipo', handoffPages: 'Páginas', handoffFeatures: 'Funcionalidades',
      handoffDeadline: 'Prazo', handoffEstimate: 'Estimativa apresentada',
      handoffExtra: function (n) { return n > 0 ? ' (' + n + ' adicionais)' : ''; },
      none: 'Nenhuma'
    },
    en: {
      stepOf: function (a, b) { return 'Step ' + a + ' of ' + b; },
      from: function (v) { return 'From R$ ' + v; },
      typeStep: {
        q: 'What do you want to build?',
        hint: 'Pick a project type.',
        options: [
          { id: 'site', name: 'Institutional website', desc: 'A professional digital home for your brand' },
          { id: 'ecommerce', name: 'E-commerce', desc: 'An online store ready to sell' },
          { id: 'app', name: 'Mobile app', desc: 'iOS and Android' },
          { id: 'saas', name: 'System / SaaS', desc: 'A tailor-made web platform for your business' }
        ]
      },
      pagesStep: {
        q: 'How many pages do you need?',
        hint: 'The package includes up to 5 pages: Home, About, Services, Portfolio and Contact. Extra ideas: FAQ, Testimonials, Landing pages, Privacy policy — and Blog is covered in the next step.',
        label: function (n, extra) {
          return n + ' pages' + (extra > 0 ? ' · ' + extra + ' extra' : ' · all included');
        }
      },
      featuresStep: {
        q: 'Which features do you need?',
        hint: 'Select as many as you like — adjustable later.',
        options: {
          site: [
            { id: 'blog', name: 'Blog / Content', desc: 'Articles and news section' },
            { id: 'idiomas', name: 'Multi-language', desc: 'Site in more than one language' },
            { id: 'seo', name: 'Advanced SEO', desc: 'Ranking strategy from day one' },
            { id: 'agendamento', name: 'Forms / Scheduling', desc: 'Advanced forms and appointment booking' },
            { id: 'restrita', name: 'Members area', desc: 'Gated content with simple login' },
            { id: 'integracoes', name: 'Integrations', desc: 'CRM, WhatsApp and other tools' }
          ],
          ecommerce: [
            { id: 'catalogo', name: 'Large catalog', desc: 'Many products, variants and filters' },
            { id: 'assinaturas', name: 'Subscriptions', desc: 'Recurring purchases and membership clubs' },
            { id: 'frete', name: 'Shipping integration', desc: 'Automatic carrier rate calculation' },
            { id: 'cupons', name: 'Coupons & loyalty', desc: 'Discounts, cashback and points' },
            { id: 'idiomas', name: 'Multi-language', desc: 'Store in more than one language' },
            { id: 'seo', name: 'Advanced SEO', desc: 'Products ranking on Google' }
          ],
          app: [
            { id: 'login', name: 'Login & profiles', desc: 'User accounts and personalization' },
            { id: 'push', name: 'Push notifications', desc: 'Messages straight to the user’s phone' },
            { id: 'pagamentos', name: 'In-app payments', desc: 'Purchases and subscriptions inside the app' },
            { id: 'chat', name: 'Chat / messaging', desc: 'Real-time conversations in the app' },
            { id: 'offline', name: 'Offline mode', desc: 'Works without internet, syncs later' },
            { id: 'api', name: 'API integration', desc: 'Connection to external systems' }
          ],
          saas: [
            { id: 'permissoes', name: 'Multi-user & roles', desc: 'Teams, roles and access levels' },
            { id: 'dashboards', name: 'Dashboards & reports', desc: 'Metrics and exports' },
            { id: 'assinaturas', name: 'Payments & subscriptions', desc: 'Integrated recurring billing' },
            { id: 'api', name: 'Integrations / API', desc: 'Public API and external connections' },
            { id: 'automacao', name: 'Automations & e-mails', desc: 'Automatic flows and notifications' },
            { id: 'auditoria', name: 'Logs & audit trail', desc: 'A record of everything in the system' }
          ]
        }
      },
      deadlineStep: {
        q: 'When do you need it?',
        hint: 'The timeline shapes the team setup.',
        options: [
          { id: 'urgente', name: 'Yesterday', desc: 'Top priority in the schedule (+20%)' },
          { id: 'normal', name: '1–2 months', desc: 'Fast pace' },
          { id: 'medio', name: '2–4 months', desc: 'Comfortable pace' },
          { id: 'flexivel', name: 'Flexible', desc: 'Quality over rush' }
        ]
      },
      back: '← Back',
      next: 'Next →',
      resultLabel: 'Initial investment estimate',
      resultTime: function (a, b) { return 'Estimated timeline: ' + a + ' to ' + b + ' days'; },
      pagesChip: function (n) { return n + ' pages'; },
      disclaimer: 'Automatic estimate for reference only. The final proposal — with fixed scope and pricing — comes after a free discovery call.',
      ctaWhats: 'Send via WhatsApp',
      ctaMail: 'Send by e-mail',
      restart: 'Start over',
      handoffIntro: 'Hi Bumavit! I configured my project on the website:',
      handoffType: 'Type', handoffPages: 'Pages', handoffFeatures: 'Features',
      handoffDeadline: 'Timeline', handoffEstimate: 'Estimate shown',
      handoffExtra: function (n) { return n > 0 ? ' (' + n + ' extra)' : ''; },
      none: 'None'
    },
    es: {
      stepOf: function (a, b) { return 'Paso ' + a + ' de ' + b; },
      from: function (v) { return 'Desde R$ ' + v; },
      typeStep: {
        q: '¿Qué quieres construir?',
        hint: 'Elige el tipo de proyecto.',
        options: [
          { id: 'site', name: 'Sitio institucional', desc: 'Presencia digital profesional para tu marca' },
          { id: 'ecommerce', name: 'E-commerce', desc: 'Tienda online lista para vender' },
          { id: 'app', name: 'Aplicación móvil', desc: 'Para iOS y Android' },
          { id: 'saas', name: 'Sistema / SaaS', desc: 'Plataforma web a medida para tu negocio' }
        ]
      },
      pagesStep: {
        q: '¿Cuántas páginas necesitas?',
        hint: 'El paquete incluye hasta 5 páginas: Inicio, Nosotros, Servicios, Portafolio y Contacto. Ideas extra: FAQ, Testimonios, Landing pages, Política de privacidad — y el Blog entra en el siguiente paso.',
        label: function (n, extra) {
          return n + ' páginas' + (extra > 0 ? ' · ' + extra + (extra === 1 ? ' adicional' : ' adicionales') : ' · todas incluidas');
        }
      },
      featuresStep: {
        q: '¿Qué funcionalidades necesitas?',
        hint: 'Selecciona las que quieras — se puede ajustar después.',
        options: {
          site: [
            { id: 'blog', name: 'Blog / Contenido', desc: 'Sección de artículos y novedades' },
            { id: 'idiomas', name: 'Multi-idioma', desc: 'Sitio en más de un idioma' },
            { id: 'seo', name: 'SEO avanzado', desc: 'Estrategia de posicionamiento desde el día 1' },
            { id: 'agendamento', name: 'Formularios / Agenda', desc: 'Formularios avanzados y reserva de horarios' },
            { id: 'restrita', name: 'Área restringida', desc: 'Contenido exclusivo con login simple' },
            { id: 'integracoes', name: 'Integraciones', desc: 'CRM, WhatsApp y otras herramientas' }
          ],
          ecommerce: [
            { id: 'catalogo', name: 'Catálogo grande', desc: 'Muchos productos, variantes y filtros' },
            { id: 'assinaturas', name: 'Suscripciones', desc: 'Compra recurrente y clubes de membresía' },
            { id: 'frete', name: 'Envío integrado', desc: 'Cálculo automático con transportistas' },
            { id: 'cupons', name: 'Cupones y fidelidad', desc: 'Descuentos, cashback y puntos' },
            { id: 'idiomas', name: 'Multi-idioma', desc: 'Tienda en más de un idioma' },
            { id: 'seo', name: 'SEO avanzado', desc: 'Productos posicionando en Google' }
          ],
          app: [
            { id: 'login', name: 'Login y perfiles', desc: 'Cuentas de usuario y personalización' },
            { id: 'push', name: 'Notificaciones push', desc: 'Mensajes directo al móvil del usuario' },
            { id: 'pagamentos', name: 'Pagos in-app', desc: 'Compras y suscripciones dentro de la app' },
            { id: 'chat', name: 'Chat / mensajes', desc: 'Conversación en tiempo real en la app' },
            { id: 'offline', name: 'Modo offline', desc: 'Funciona sin internet y sincroniza después' },
            { id: 'api', name: 'Integración con API', desc: 'Conexión con sistemas externos' }
          ],
          saas: [
            { id: 'permissoes', name: 'Multiusuario y permisos', desc: 'Equipos, roles y niveles de acceso' },
            { id: 'dashboards', name: 'Dashboards e informes', desc: 'Métricas y exportaciones' },
            { id: 'assinaturas', name: 'Pagos y suscripciones', desc: 'Cobro recurrente integrado' },
            { id: 'api', name: 'Integraciones / API', desc: 'API pública y conexiones externas' },
            { id: 'automacao', name: 'Automatizaciones y correos', desc: 'Flujos automáticos y notificaciones' },
            { id: 'auditoria', name: 'Logs y auditoría', desc: 'Registro de todo lo que pasa en el sistema' }
          ]
        }
      },
      deadlineStep: {
        q: '¿Para cuándo lo necesitas?',
        hint: 'El plazo define el formato del equipo.',
        options: [
          { id: 'urgente', name: 'Para ayer', desc: 'Prioridad máxima en la agenda (+20%)' },
          { id: 'normal', name: '1–2 meses', desc: 'Ritmo acelerado' },
          { id: 'medio', name: '2–4 meses', desc: 'Ritmo cómodo' },
          { id: 'flexivel', name: 'Flexible', desc: 'Calidad antes que prisa' }
        ]
      },
      back: '← Volver',
      next: 'Avanzar →',
      resultLabel: 'Estimación inicial de inversión',
      resultTime: function (a, b) { return 'Plazo estimado: ' + a + ' a ' + b + ' días'; },
      pagesChip: function (n) { return n + ' páginas'; },
      disclaimer: 'Estimación automática solo de referencia. La propuesta final — con alcance y valores cerrados — llega después de una llamada de descubrimiento gratuita.',
      ctaWhats: 'Enviar por WhatsApp',
      ctaMail: 'Enviar por correo',
      restart: 'Empezar de nuevo',
      handoffIntro: '¡Hola, Bumavit! Configuré mi proyecto en el sitio:',
      handoffType: 'Tipo', handoffPages: 'Páginas', handoffFeatures: 'Funcionalidades',
      handoffDeadline: 'Plazo', handoffEstimate: 'Estimación mostrada',
      handoffExtra: function (n) { return n > 0 ? ' (' + n + ' adicionales)' : ''; },
      none: 'Ninguna'
    }
  };

  var t = T[LANG] || T.pt;
  var root = document.getElementById('estimator');
  if (!root) return;

  var state = { idx: 0, type: null, pages: PAGES_INCLUDED, features: [], deadline: null };
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Sequência de passos depende do tipo (site ganha o passo de páginas) */
  function sequence() {
    return state.type === 'site'
      ? ['type', 'pages', 'features', 'deadline']
      : ['type', 'features', 'deadline'];
  }

  function fmt(n) { return n.toLocaleString(LOCALES[LANG] || 'pt-BR'); }
  function round10(x) { return Math.round(x / 10) * 10; }

  function featureList() { return t.featuresStep.options[state.type] || t.featuresStep.options.site; }
  function featureName(id) {
    var f = featureList().filter(function (o) { return o.id === id; })[0];
    return f ? f.name : id;
  }
  function typeName(id) {
    var o = t.typeStep.options.filter(function (x) { return x.id === id; })[0];
    return o ? o.name : id;
  }
  function deadlineName(id) {
    var o = t.deadlineStep.options.filter(function (x) { return x.id === id; })[0];
    return o ? o.name : id;
  }

  function estimate() {
    var base = PRICING.types[state.type];
    var hLo = base.hours[0], hHi = base.hours[1];
    var dLo = base.days[0], dHi = base.days[1];

    if (state.type === 'site') {
      var extra = Math.max(0, state.pages - PAGES_INCLUDED);
      hLo += extra * EXTRA_PAGE.h[0];
      hHi += extra * EXTRA_PAGE.h[1];
      dLo += Math.floor(extra * EXTRA_PAGE.d);
      dHi += Math.ceil(extra * EXTRA_PAGE.d);
    }

    var feats = FEATURES[state.type] || {};
    state.features.forEach(function (id) {
      var f = feats[id];
      if (!f) return;
      hLo += f.h[0]; hHi += f.h[1];
      dLo += f.d[0]; dHi += f.d[1];
    });

    var mult = PRICING.deadlines[state.deadline] || 1;
    return {
      lo: round10(hLo * mult * RATE),
      hi: round10(hHi * mult * RATE),
      dLo: dLo,
      dHi: dHi
    };
  }

  function money(lo, hi) { return 'R$ ' + fmt(lo) + ' – ' + fmt(hi); }

  function handoffText() {
    var e = estimate();
    var feats = state.features.length
      ? state.features.map(featureName).join(', ')
      : t.none;
    var lines = [t.handoffIntro,
      '• ' + t.handoffType + ': ' + typeName(state.type)];
    if (state.type === 'site') {
      lines.push('• ' + t.handoffPages + ': ' + state.pages + t.handoffExtra(state.pages - PAGES_INCLUDED));
    }
    lines.push('• ' + t.handoffFeatures + ': ' + feats,
      '• ' + t.handoffDeadline + ': ' + deadlineName(state.deadline),
      '• ' + t.handoffEstimate + ': ' + money(e.lo, e.hi));
    return lines.join('\n');
  }

  function canAdvance() {
    var key = sequence()[state.idx];
    if (key === 'type') return !!state.type;
    if (key === 'deadline') return !!state.deadline;
    return true; // páginas e funcionalidades sempre podem avançar
  }

  /* ---------- Render ---------- */
  function render(animate) {
    var seq = sequence();
    var total = seq.length;
    var isResult = state.idx >= total;
    var key = seq[state.idx];
    var html = '';

    html += '<div class="est__progress">' +
      '<span class="est__step-label">' + (isResult ? '✦' : t.stepOf(state.idx + 1, total)) + '</span>' +
      '<div class="est__bar"><div class="est__bar-fill" style="width:' + ((isResult ? total : state.idx) / total * 100) + '%"></div></div>' +
      '</div>';

    if (isResult) {
      var e = estimate();
      var chips = [typeName(state.type)];
      if (state.type === 'site') chips.push(t.pagesChip(state.pages));
      chips = chips.concat(state.features.map(featureName), [deadlineName(state.deadline)]);
      var waHref = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(handoffText());
      var mailHref = 'mailto:contato@bumavit.com.br?subject=' + encodeURIComponent('Projeto — ' + typeName(state.type)) +
        '&body=' + encodeURIComponent(handoffText());
      html += '<div class="est__result">' +
        '<span class="est__result-label">' + t.resultLabel + '</span>' +
        '<div class="est__result-value">' + money(e.lo, e.hi) + '</div>' +
        '<p class="est__result-time">' + t.resultTime(e.dLo, e.dHi) + '</p>' +
        '<ul class="est__summary">' + chips.map(function (c) { return '<li>' + c + '</li>'; }).join('') + '</ul>' +
        '<p class="est__disclaimer">' + t.disclaimer + '</p>' +
        '<div class="est__ctas">' +
        '<a class="btn-pill btn-pill--accent" href="' + waHref + '" target="_blank" rel="noopener" data-hover><span>' + t.ctaWhats + '</span></a>' +
        '<a class="btn-pill" href="' + mailHref + '" data-hover><span>' + t.ctaMail + '</span></a>' +
        '</div>' +
        '<button type="button" class="est__restart" data-act="restart" data-hover>' + t.restart + '</button>' +
        '</div>';
    } else if (key === 'type') {
      html += '<h2 class="est__question">' + t.typeStep.q + '</h2>' +
        '<p class="est__hint">' + t.typeStep.hint + '</p>' +
        '<div class="est__options">';
      t.typeStep.options.forEach(function (o) {
        var fromPrice = round10(PRICING.types[o.id].hours[0] * RATE);
        html += '<button type="button" class="est__opt' + (state.type === o.id ? ' is-selected' : '') + '" data-opt="' + o.id + '" data-hover>' +
          '<span class="est__opt-name">' + o.name + '</span>' +
          '<span class="est__opt-desc">' + o.desc + ' · ' + t.from(fmt(fromPrice)) + '</span>' +
          '</button>';
      });
      html += '</div>' + navButtons(false);
    } else if (key === 'pages') {
      var extra = Math.max(0, state.pages - PAGES_INCLUDED);
      html += '<h2 class="est__question">' + t.pagesStep.q + '</h2>' +
        '<div class="est__slider">' +
        '<div class="est__slider-value" id="estPagesLabel">' + t.pagesStep.label(state.pages, extra) + '</div>' +
        '<input type="range" id="estRange" min="' + PAGES_INCLUDED + '" max="' + PAGES_MAX + '" step="1" value="' + state.pages + '" aria-label="' + t.pagesStep.q + '">' +
        '<div class="est__slider-scale"><span>' + PAGES_INCLUDED + '</span><span>' + PAGES_MAX + '+</span></div>' +
        '</div>' +
        '<p class="est__hint est__hint--pages">' + t.pagesStep.hint + '</p>' +
        navButtons(true);
    } else if (key === 'features') {
      html += '<h2 class="est__question">' + t.featuresStep.q + '</h2>' +
        '<p class="est__hint">' + t.featuresStep.hint + '</p>' +
        '<div class="est__options">';
      featureList().forEach(function (o) {
        var selected = state.features.indexOf(o.id) !== -1;
        html += '<button type="button" class="est__opt' + (selected ? ' is-selected' : '') + '" data-opt="' + o.id + '" data-hover>' +
          '<span class="est__opt-name">' + o.name + '</span>' +
          '<span class="est__opt-desc">' + o.desc + '</span>' +
          '</button>';
      });
      html += '</div>' + navButtons(true);
    } else if (key === 'deadline') {
      html += '<h2 class="est__question">' + t.deadlineStep.q + '</h2>' +
        '<p class="est__hint">' + t.deadlineStep.hint + '</p>' +
        '<div class="est__options">';
      t.deadlineStep.options.forEach(function (o) {
        html += '<button type="button" class="est__opt' + (state.deadline === o.id ? ' is-selected' : '') + '" data-opt="' + o.id + '" data-hover>' +
          '<span class="est__opt-name">' + o.name + '</span>' +
          '<span class="est__opt-desc">' + o.desc + '</span>' +
          '</button>';
      });
      html += '</div>' + navButtons(true);
    }

    root.innerHTML = html;

    var range = document.getElementById('estRange');
    if (range) {
      range.addEventListener('input', function () {
        state.pages = parseInt(range.value, 10);
        var lbl = document.getElementById('estPagesLabel');
        if (lbl) lbl.textContent = t.pagesStep.label(state.pages, Math.max(0, state.pages - PAGES_INCLUDED));
      });
    }

    if (animate && !reducedMotion && window.gsap) {
      gsap.from(root.querySelectorAll('.est__question, .est__hint, .est__opt, .est__slider, .est__nav, .est__result > *'), {
        opacity: 0, y: 24, duration: 0.55, ease: 'power3.out', stagger: 0.05
      });
    }
  }

  function navButtons(showBack) {
    return '<div class="est__nav">' +
      '<button type="button" class="est__back" data-act="back"' + (showBack ? '' : ' hidden') + ' data-hover>' + t.back + '</button>' +
      '<button type="button" class="btn-pill btn-pill--accent est__next" data-act="next" ' + (canAdvance() ? '' : 'disabled') + ' data-hover><span>' + t.next + '</span></button>' +
      '</div>';
  }

  root.addEventListener('click', function (e) {
    var opt = e.target.closest('[data-opt]');
    var act = e.target.closest('[data-act]');
    var key = sequence()[state.idx];

    if (opt) {
      var id = opt.getAttribute('data-opt');
      if (key === 'type') {
        if (state.type !== id) { // features/páginas pertencem ao tipo
          state.features = [];
          state.pages = PAGES_INCLUDED;
        }
        state.type = id;
        render(false);
      } else if (key === 'features') {
        var i = state.features.indexOf(id);
        if (i === -1) state.features.push(id); else state.features.splice(i, 1);
        opt.classList.toggle('is-selected');
      } else if (key === 'deadline') {
        state.deadline = id;
        render(false);
      }
      return;
    }
    if (act) {
      var a = act.getAttribute('data-act');
      if (a === 'next' && canAdvance()) { state.idx++; render(true); }
      if (a === 'back' && state.idx > 0) { state.idx--; render(true); }
      if (a === 'restart') {
        state = { idx: 0, type: null, pages: PAGES_INCLUDED, features: [], deadline: null };
        render(true);
      }
      if (window.scrollY > 200) window.scrollTo({ top: 0 });
    }
  });

  render(true);
})();
