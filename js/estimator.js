/* BUMAVIT · Estimador "Monte seu projeto"
   Wizard → faixa de investimento + prazo → handoff pré-preenchido
   (WhatsApp/e-mail). Trilíngue via window.__LANG.

   MODELO DE PREÇO: horas × RATE (R$/h). Edite RATE, PRICING e FEATURES.
   Âncora: site institucional ≈ 18–22h ≈ R$ 2.700–3.300 (5 páginas),
   chegando a ≈ R$ 3.750–4.650 com 10 páginas, ~20h em média, 8–13 dias.
   O tipo "site" tem um passo extra de nº de páginas (5 inclusas,
   adicionais somam EXTRA_PAGE horas/dias cada). */
(function () {
  'use strict';

  var LANG = window.__LANG || 'pt';
  var WHATSAPP = '5521997235420';
  var RATE = 150;                 // R$/hora
  /* Mesmo endpoint Formspree do formulário de contato da home. */
  var FORM_ENDPOINT = 'https://formspree.io/f/mbdvvyro';

  /* ---------- Tabela de preços (edite aqui) ---------- */
  var PRICING = {
    types: { // hours: [mín, máx] → preço = h × RATE · days: prazo em dias
      site:      { hours: [18, 22],  days: [8, 13] },
      ecommerce: { hours: [36, 51],  days: [18, 25] },
      app:       { hours: [64, 87],  days: [29, 39] },
      saas:      { hours: [79, 118], days: [39, 50] }
    },
    deadlines: { urgente: 1.35, normal: 1, medio: 1, flexivel: 1 } // multiplica só o preço
  };
  var PAGES_INCLUDED = 5;
  var PAGES_MAX = 15;
  var EXTRA_PAGE = { h: [1.4, 1.8], d: 0.4 }; // por página adicional

  /* Faixas numéricas dos budgets, para comparar com a estimativa no resultado.
     'naosei' fica de fora de propósito: sem faixa, sem mensagem. */
  var BUDGET_RANGES = {
    ate3k:    [0, 3000],
    de3a6k:   [3000, 6000],
    de6a12k:  [6000, 12000],
    acima12k: [12000, Infinity]
  };

  /* Horas/dias por funcionalidade (independente de idioma) */
  var FEATURES = {
    site: {
      blog:        { h: [6, 9],  d: [2, 4] },
      idiomas:     { h: [4, 7],  d: [1, 3] },
      seo:         { h: [6, 9],  d: [1, 3] },
      agendamento: { h: [4, 7],  d: [1, 3] },
      restrita:    { h: [7, 11], d: [3, 4] },
      integracoes: { h: [4, 7],  d: [1, 3] }
    },
    ecommerce: {
      catalogo:    { h: [7, 11], d: [3, 4] },
      assinaturas: { h: [7, 11], d: [3, 4] },
      frete:       { h: [4, 7],  d: [1, 3] },
      cupons:      { h: [6, 9],  d: [2, 4] },
      idiomas:     { h: [6, 9],  d: [2, 4] },
      seo:         { h: [6, 9],  d: [1, 3] }
    },
    app: {
      login:      { h: [9, 13],  d: [3, 5] },
      push:       { h: [6, 9],   d: [2, 4] },
      pagamentos: { h: [9, 13],  d: [3, 5] },
      chat:       { h: [11, 17], d: [4, 6] },
      offline:    { h: [9, 13],  d: [4, 6] },
      api:        { h: [7, 11],  d: [3, 4] }
    },
    saas: {
      permissoes:  { h: [11, 17], d: [4, 6] },
      dashboards:  { h: [11, 17], d: [4, 6] },
      assinaturas: { h: [9, 13],  d: [4, 6] },
      api:         { h: [9, 13],  d: [4, 6] },
      automacao:   { h: [7, 11],  d: [3, 4] },
      auditoria:   { h: [6, 9],   d: [2, 4] }
    }
  };

  /* ---------- Textos ---------- */
  var LOCALES = { pt: 'pt-BR', en: 'en-US', es: 'es-ES' };

  var T = {
    pt: {
      stepOf: function (a, b) { return 'Passo ' + a + ' de ' + b; },
      from: function (v) { return 'A partir de R$ ' + v; },
      nameStep: {
        q: 'Antes de começar, como podemos te chamar?',
        hint: 'Só o primeiro nome já está ótimo.',
        placeholder: 'Seu nome',
        error: 'Escreva seu nome para continuar.'
      },
      contactStep: {
        q: function (n) { return n ? 'Pra onde mandamos sua estimativa, ' + n + '?' : 'Pra onde mandamos sua estimativa?'; },
        methods: [{ id: 'email', name: 'E-mail' }, { id: 'phone', name: 'WhatsApp' }],
        hint: {
          email: 'Enviamos o resumo do seu projeto por e-mail, para você guardar e comparar com calma. Nada de spam.',
          phone: 'Mandamos o resumo do seu projeto no WhatsApp. Sem disparo automático, sem spam.'
        },
        placeholder: { email: 'voce@empresa.com.br', phone: '(21) 99999-9999' },
        error: { email: 'Digite um e-mail válido.', phone: 'Digite um telefone válido, com DDD.' }
      },
      budgetStep: {
        q: 'Qual faixa de investimento você tem em mente?',
        hint: 'Isso não muda a estimativa, só nos ajuda a desenhar o escopo certo para o seu momento.',
        options: [
          { id: 'ate3k', name: 'Até R$ 3.000', desc: 'Escopo enxuto, foco no essencial' },
          { id: 'de3a6k', name: 'R$ 3.000 – 6.000', desc: 'Projeto completo com folga' },
          { id: 'de6a12k', name: 'R$ 6.000 – 12.000', desc: 'Escopo robusto, mais recursos' },
          { id: 'acima12k', name: 'Acima de R$ 12.000', desc: 'Projeto de grande porte' },
          { id: 'naosei', name: 'Ainda não sei', desc: 'Quero entender as opções primeiro' }
        ]
      },
      typeStep: {
        q: function (n) { return n ? n + ', o que você quer construir?' : 'O que você quer construir?'; },
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
        hint: 'O pacote inclui até 5 páginas: Home, Sobre, Serviços, Portfólio e Contato. Ideias de extras: FAQ, Depoimentos, Landing pages, Políticas de privacidade, e Blog já entra nas funcionalidades do próximo passo.',
        label: function (n, extra) {
          return n + ' páginas' + (extra > 0 ? ' · ' + extra + (extra === 1 ? ' adicional' : ' adicionais') : ' · todas inclusas');
        }
      },
      featuresStep: {
        q: 'Quais funcionalidades você precisa?',
        hint: 'Selecione quantas quiser, dá para ajustar depois.',
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
          { id: 'urgente', name: 'É pra ontem', desc: 'Prioridade máxima na agenda (+35%)' },
          { id: 'normal', name: '1–2 meses', desc: 'Ritmo acelerado' },
          { id: 'medio', name: '2–4 meses', desc: 'Ritmo confortável' },
          { id: 'flexivel', name: 'Flexível', desc: 'Qualidade acima de pressa' }
        ]
      },
      back: '← Voltar',
      next: 'Avançar →',
      resultGreeting: function (n) { return n ? n + ', aqui está o seu projeto' : 'Aqui está o seu projeto'; },
      resultLabel: 'Estimativa inicial de investimento',
      resultTime: function (a, b) { return 'Prazo estimado: ' + a + ' a ' + b + ' dias'; },
      pagesChip: function (n) { return n + ' páginas'; },
      budgetFit: {
        ok: '✓ Cabe na faixa de investimento que você indicou.',
        tight: 'Encosta no teto da sua faixa, mas dá para ajustar o escopo na conversa para fechar a conta.',
        over: 'Ficou acima da faixa que você indicou, mas dá para dividir o escopo em fases e caber no seu orçamento. Vale uma conversa.',
        under: 'Abaixo da faixa que você indicou: sobra espaço até para ampliar o escopo, se fizer sentido.'
      },
      disclaimer: 'Estimativa automática para referência. A proposta final, com escopo e valores fechados, sai depois de uma conversa gratuita de descoberta.',
      ctaWhats: 'Enviar pelo WhatsApp',
      ctaMail: 'Enviar por e-mail',
      restart: 'Recomeçar',
      handoffIntro: 'Olá, Bumavit! Montei meu projeto no site:',
      handoffName: 'Nome', handoffEmail: 'E-mail', handoffPhone: 'WhatsApp', handoffBudget: 'Faixa de investimento',
      handoffType: 'Tipo', handoffPages: 'Páginas', handoffFeatures: 'Funcionalidades',
      handoffDeadline: 'Prazo', handoffEstimate: 'Estimativa apresentada',
      handoffExtra: function (n) { return n > 0 ? ' (' + n + ' adicionais)' : ''; },
      none: 'Nenhuma'
    },
    en: {
      stepOf: function (a, b) { return 'Step ' + a + ' of ' + b; },
      from: function (v) { return 'From R$ ' + v; },
      nameStep: {
        q: 'Before we start, what should we call you?',
        hint: 'First name is plenty.',
        placeholder: 'Your name',
        error: 'Please enter your name to continue.'
      },
      contactStep: {
        q: function (n) { return n ? 'Where should we send your estimate, ' + n + '?' : 'Where should we send your estimate?'; },
        methods: [{ id: 'email', name: 'E-mail' }, { id: 'phone', name: 'WhatsApp' }],
        hint: {
          email: 'We e-mail you the summary of your project so you can keep it and compare at your own pace. No spam.',
          phone: 'We send your project summary on WhatsApp. No automated blasts, no spam.'
        },
        placeholder: { email: 'you@company.com', phone: '+55 21 99999-9999' },
        error: { email: 'Please enter a valid e-mail.', phone: 'Please enter a valid phone number.' }
      },
      budgetStep: {
        q: 'What investment range do you have in mind?',
        hint: 'This does not change the estimate, it just helps us shape the right scope for where you are now.',
        options: [
          { id: 'ate3k', name: 'Up to R$ 3,000', desc: 'Lean scope, focused on the essentials' },
          { id: 'de3a6k', name: 'R$ 3,000 – 6,000', desc: 'A complete project with room to breathe' },
          { id: 'de6a12k', name: 'R$ 6,000 – 12,000', desc: 'Robust scope, more capabilities' },
          { id: 'acima12k', name: 'Above R$ 12,000', desc: 'Large-scale project' },
          { id: 'naosei', name: 'Not sure yet', desc: 'I want to understand the options first' }
        ]
      },
      typeStep: {
        q: function (n) { return n ? n + ', what do you want to build?' : 'What do you want to build?'; },
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
        hint: 'The package includes up to 5 pages: Home, About, Services, Portfolio and Contact. Extra ideas: FAQ, Testimonials, Landing pages, Privacy policy, and Blog is covered in the next step.',
        label: function (n, extra) {
          return n + ' pages' + (extra > 0 ? ' · ' + extra + ' extra' : ' · all included');
        }
      },
      featuresStep: {
        q: 'Which features do you need?',
        hint: 'Select as many as you like, adjustable later.',
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
          { id: 'urgente', name: 'Yesterday', desc: 'Top priority in the schedule (+35%)' },
          { id: 'normal', name: '1–2 months', desc: 'Fast pace' },
          { id: 'medio', name: '2–4 months', desc: 'Comfortable pace' },
          { id: 'flexivel', name: 'Flexible', desc: 'Quality over rush' }
        ]
      },
      back: '← Back',
      next: 'Next →',
      resultGreeting: function (n) { return n ? n + ', here is your project' : 'Here is your project'; },
      resultLabel: 'Initial investment estimate',
      resultTime: function (a, b) { return 'Estimated timeline: ' + a + ' to ' + b + ' days'; },
      pagesChip: function (n) { return n + ' pages'; },
      budgetFit: {
        ok: '✓ Fits the investment range you indicated.',
        tight: 'Close to the top of your range, but we can fine-tune the scope in the call to make it work.',
        over: 'Above the range you indicated, but we can split the scope into phases to fit your budget. Worth a quick chat.',
        under: 'Below the range you indicated: there is even room to expand the scope, if it makes sense.'
      },
      disclaimer: 'Automatic estimate for reference only. The final proposal, with fixed scope and pricing, comes after a free discovery call.',
      ctaWhats: 'Send via WhatsApp',
      ctaMail: 'Send by e-mail',
      restart: 'Start over',
      handoffIntro: 'Hi Bumavit! I configured my project on the website:',
      handoffName: 'Name', handoffEmail: 'E-mail', handoffPhone: 'WhatsApp', handoffBudget: 'Investment range',
      handoffType: 'Type', handoffPages: 'Pages', handoffFeatures: 'Features',
      handoffDeadline: 'Timeline', handoffEstimate: 'Estimate shown',
      handoffExtra: function (n) { return n > 0 ? ' (' + n + ' extra)' : ''; },
      none: 'None'
    },
    es: {
      stepOf: function (a, b) { return 'Paso ' + a + ' de ' + b; },
      from: function (v) { return 'Desde R$ ' + v; },
      nameStep: {
        q: 'Antes de empezar, ¿cómo te llamamos?',
        hint: 'Con el primer nombre ya basta.',
        placeholder: 'Tu nombre',
        error: 'Escribe tu nombre para continuar.'
      },
      contactStep: {
        q: function (n) { return n ? '¿A dónde enviamos tu estimación, ' + n + '?' : '¿A dónde enviamos tu estimación?'; },
        methods: [{ id: 'email', name: 'Correo' }, { id: 'phone', name: 'WhatsApp' }],
        hint: {
          email: 'Te enviamos el resumen de tu proyecto por correo, para que lo guardes y lo compares con calma. Nada de spam.',
          phone: 'Te enviamos el resumen de tu proyecto por WhatsApp. Sin envíos automáticos, sin spam.'
        },
        placeholder: { email: 'tu@empresa.com', phone: '+55 21 99999-9999' },
        error: { email: 'Escribe un correo válido.', phone: 'Escribe un teléfono válido.' }
      },
      budgetStep: {
        q: '¿Qué rango de inversión tienes en mente?',
        hint: 'Esto no cambia la estimación, solo nos ayuda a diseñar el alcance adecuado para tu momento.',
        options: [
          { id: 'ate3k', name: 'Hasta R$ 3.000', desc: 'Alcance ajustado, foco en lo esencial' },
          { id: 'de3a6k', name: 'R$ 3.000 – 6.000', desc: 'Proyecto completo con holgura' },
          { id: 'de6a12k', name: 'R$ 6.000 – 12.000', desc: 'Alcance robusto, más recursos' },
          { id: 'acima12k', name: 'Más de R$ 12.000', desc: 'Proyecto de gran porte' },
          { id: 'naosei', name: 'Aún no lo sé', desc: 'Quiero entender las opciones primero' }
        ]
      },
      typeStep: {
        q: function (n) { return n ? n + ', ¿qué quieres construir?' : '¿Qué quieres construir?'; },
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
        hint: 'El paquete incluye hasta 5 páginas: Inicio, Nosotros, Servicios, Portafolio y Contacto. Ideas extra: FAQ, Testimonios, Landing pages, Política de privacidad, y el Blog entra en el siguiente paso.',
        label: function (n, extra) {
          return n + ' páginas' + (extra > 0 ? ' · ' + extra + (extra === 1 ? ' adicional' : ' adicionales') : ' · todas incluidas');
        }
      },
      featuresStep: {
        q: '¿Qué funcionalidades necesitas?',
        hint: 'Selecciona las que quieras, se puede ajustar después.',
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
          { id: 'urgente', name: 'Para ayer', desc: 'Prioridad máxima en la agenda (+35%)' },
          { id: 'normal', name: '1–2 meses', desc: 'Ritmo acelerado' },
          { id: 'medio', name: '2–4 meses', desc: 'Ritmo cómodo' },
          { id: 'flexivel', name: 'Flexible', desc: 'Calidad antes que prisa' }
        ]
      },
      back: '← Volver',
      next: 'Avanzar →',
      resultGreeting: function (n) { return n ? n + ', aquí está tu proyecto' : 'Aquí está tu proyecto'; },
      resultLabel: 'Estimación inicial de inversión',
      resultTime: function (a, b) { return 'Plazo estimado: ' + a + ' a ' + b + ' días'; },
      pagesChip: function (n) { return n + ' páginas'; },
      budgetFit: {
        ok: '✓ Cabe en el rango de inversión que indicaste.',
        tight: 'Roza el techo de tu rango, pero podemos ajustar el alcance en la llamada para que cierre.',
        over: 'Quedó por encima del rango que indicaste, pero podemos dividir el alcance en fases para caber en tu presupuesto. Vale una conversación.',
        under: 'Por debajo del rango que indicaste: incluso hay margen para ampliar el alcance, si tiene sentido.'
      },
      disclaimer: 'Estimación automática solo de referencia. La propuesta final, con alcance y valores cerrados, llega después de una llamada de descubrimiento gratuita.',
      ctaWhats: 'Enviar por WhatsApp',
      ctaMail: 'Enviar por correo',
      restart: 'Empezar de nuevo',
      handoffIntro: '¡Hola, Bumavit! Configuré mi proyecto en el sitio:',
      handoffName: 'Nombre', handoffEmail: 'Correo', handoffPhone: 'WhatsApp', handoffBudget: 'Rango de inversión',
      handoffType: 'Tipo', handoffPages: 'Páginas', handoffFeatures: 'Funcionalidades',
      handoffDeadline: 'Plazo', handoffEstimate: 'Estimación mostrada',
      handoffExtra: function (n) { return n > 0 ? ' (' + n + ' adicionales)' : ''; },
      none: 'Ninguna'
    }
  };

  var t = T[LANG] || T.pt;
  var root = document.getElementById('estimator');
  if (!root) return;

  function initialState() {
    return {
      idx: 0, name: '', contact: 'email', email: '', phone: '',
      type: null, pages: PAGES_INCLUDED, features: [], budget: null, deadline: null
    };
  }
  var state = initialState();
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Sequência de passos depende do tipo (site ganha o passo de páginas) */
  function sequence() {
    return state.type === 'site'
      ? ['name', 'type', 'pages', 'features', 'contact', 'budget', 'deadline']
      : ['name', 'type', 'features', 'contact', 'budget', 'deadline'];
  }

  /* Nome e e-mail vêm do usuário e entram via innerHTML: escapar sempre. */
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).trim()); }
  /* Aceita formatos locais e internacionais: só conta dígitos.
     10 = fixo com DDD, 11 = celular com DDD, 15 = máximo do padrão E.164. */
  function validPhone(v) {
    var digits = String(v).replace(/\D/g, '');
    return digits.length >= 10 && digits.length <= 15;
  }
  function contactValue() { return state.contact === 'email' ? state.email : state.phone; }
  function contactValid() {
    return state.contact === 'email' ? validEmail(state.email) : validPhone(state.phone);
  }
  function safeName() { return esc(state.name.trim()); }

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
  function budgetName(id) {
    var o = t.budgetStep.options.filter(function (x) { return x.id === id; })[0];
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

  /* Compara a estimativa com a faixa de budget escolhida.
     Retorna 'ok' | 'tight' | 'over' | 'under' | null (sem faixa). */
  function budgetFit(e) {
    var range = BUDGET_RANGES[state.budget];
    if (!range) return null;
    if (e.lo > range[1]) return 'over';
    if (e.hi > range[1]) return 'tight';
    if (e.hi < range[0]) return 'under';
    return 'ok';
  }

  /* ---------- GA4 (só dispara se o gtag da página estiver carregado) ---------- */
  var lastTrackedStep = null;
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  /* ---------- Captura do lead ----------
     Dispara assim que o resultado aparece: o lead chega por e-mail (Formspree)
     mesmo que o visitante feche a página sem clicar em nenhum CTA. O envio
     manual do resumo prometido no passo de contato parte daí. Reenvia apenas
     se os dados mudarem (voltar, ajustar e concluir de novo). */
  var lastLeadPayload = null;
  function submitLead(e) {
    var payload = {
      _subject: 'Lead do estimador · ' + state.name.trim() + ' · ' + typeName(state.type),
      origem: 'Estimador do site',
      nome: state.name.trim(),
      contato: (state.contact === 'email' ? 'E-mail: ' : 'WhatsApp: ') + contactValue().trim(),
      tipo: typeName(state.type),
      funcionalidades: state.features.length ? state.features.map(featureName).join(', ') : t.none,
      faixa_investimento: budgetName(state.budget),
      prazo: deadlineName(state.deadline),
      estimativa_apresentada: money(e.lo, e.hi),
      idioma: LANG
    };
    if (state.type === 'site') payload.paginas = String(state.pages);

    var body = JSON.stringify(payload);
    if (body === lastLeadPayload) return;
    lastLeadPayload = body;

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: body
    }).then(function (r) {
      if (!r.ok) lastLeadPayload = null; // libera nova tentativa num próximo render
    }).catch(function () {
      lastLeadPayload = null;
    });
  }

  function handoffText() {
    var e = estimate();
    var feats = state.features.length
      ? state.features.map(featureName).join(', ')
      : t.none;
    var lines = [t.handoffIntro,
      '• ' + t.handoffName + ': ' + state.name.trim(),
      '• ' + (state.contact === 'email' ? t.handoffEmail : t.handoffPhone) + ': ' + contactValue().trim(),
      '• ' + t.handoffType + ': ' + typeName(state.type)];
    if (state.type === 'site') {
      lines.push('• ' + t.handoffPages + ': ' + state.pages + t.handoffExtra(state.pages - PAGES_INCLUDED));
    }
    lines.push('• ' + t.handoffFeatures + ': ' + feats,
      '• ' + t.handoffBudget + ': ' + budgetName(state.budget),
      '• ' + t.handoffDeadline + ': ' + deadlineName(state.deadline),
      '• ' + t.handoffEstimate + ': ' + money(e.lo, e.hi));
    return lines.join('\n');
  }

  function canAdvance() {
    var key = sequence()[state.idx];
    if (key === 'name') return state.name.trim().length > 0;
    if (key === 'contact') return contactValid();
    if (key === 'type') return !!state.type;
    if (key === 'budget') return !!state.budget;
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

    /* Funil: um evento por exibição de passo (re-renders do mesmo passo não repetem). */
    if (!isResult && key !== lastTrackedStep) {
      lastTrackedStep = key;
      track('estimator_step', { step_name: key, step_index: state.idx + 1, steps_total: total });
    }

    html += '<div class="est__progress">' +
      '<span class="est__step-label">' + (isResult ? '✦' : t.stepOf(state.idx + 1, total)) + '</span>' +
      '<div class="est__bar"><div class="est__bar-fill" style="width:' + ((isResult ? total : state.idx) / total * 100) + '%"></div></div>' +
      '</div>';

    if (isResult) {
      var e = estimate();
      var fit = budgetFit(e);
      var chips = [typeName(state.type)];
      if (state.type === 'site') chips.push(t.pagesChip(state.pages));
      chips = chips.concat(state.features.map(featureName), [deadlineName(state.deadline)]);
      var waHref = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(handoffText());
      var mailHref = 'mailto:contato@bumavit.com.br?subject=' + encodeURIComponent('Projeto · ' + typeName(state.type)) +
        '&body=' + encodeURIComponent(handoffText());

      submitLead(e);
      if (lastTrackedStep !== 'result') {
        lastTrackedStep = 'result';
        track('estimator_complete', {
          project_type: state.type,
          budget: state.budget,
          deadline: state.deadline,
          contact_method: state.contact,
          estimate_low: e.lo,
          estimate_high: e.hi,
          budget_fit: fit || 'unknown'
        });
      }

      html += '<div class="est__result">' +
        '<p class="est__result-greeting">' + t.resultGreeting(safeName()) + '</p>' +
        '<span class="est__result-label">' + t.resultLabel + '</span>' +
        '<div class="est__result-value">' + money(e.lo, e.hi) + '</div>' +
        '<p class="est__result-time">' + t.resultTime(e.dLo, e.dHi) + '</p>' +
        (fit ? '<p class="est__fit est__fit--' + fit + '">' + t.budgetFit[fit] + '</p>' : '') +
        '<ul class="est__summary">' + chips.map(function (c) { return '<li>' + c + '</li>'; }).join('') + '</ul>' +
        '<p class="est__disclaimer">' + t.disclaimer + '</p>' +
        '<div class="est__ctas">' +
        '<a class="btn-pill btn-pill--accent" href="' + waHref + '" target="_blank" rel="noopener" data-hover><span>' + t.ctaWhats + '</span></a>' +
        '<a class="btn-pill" href="' + mailHref + '" data-hover><span>' + t.ctaMail + '</span></a>' +
        '</div>' +
        '<button type="button" class="est__restart" data-act="restart" data-hover>' + t.restart + '</button>' +
        '</div>';
    } else if (key === 'name') {
      html += '<h2 class="est__question">' + t.nameStep.q + '</h2>' +
        '<p class="est__hint">' + t.nameStep.hint + '</p>' +
        '<div class="est__field">' +
        '<input type="text" id="estInput" class="est__input"' +
        ' value="' + esc(state.name) + '" placeholder="' + esc(t.nameStep.placeholder) + '"' +
        ' autocomplete="given-name" aria-label="' + esc(t.nameStep.placeholder) + '">' +
        '<p class="est__error" id="estError" hidden>' + esc(t.nameStep.error) + '</p>' +
        '</div>' + navButtons(state.idx > 0);
    } else if (key === 'contact') {
      var method = state.contact;
      var cs = t.contactStep;
      html += '<h2 class="est__question">' + cs.q(safeName()) + '</h2>' +
        '<div class="est__toggle" role="group">';
      cs.methods.forEach(function (m) {
        html += '<button type="button" class="est__toggle-btn' + (method === m.id ? ' is-active' : '') + '"' +
          ' data-contact="' + m.id + '" aria-pressed="' + (method === m.id) + '" data-hover>' + m.name + '</button>';
      });
      html += '</div>' +
        '<p class="est__hint">' + cs.hint[method] + '</p>' +
        '<div class="est__field">' +
        '<input type="' + (method === 'email' ? 'email' : 'tel') + '" id="estInput" class="est__input"' +
        ' value="' + esc(contactValue()) + '" placeholder="' + esc(cs.placeholder[method]) + '"' +
        ' autocomplete="' + (method === 'email' ? 'email' : 'tel') + '"' +
        ' aria-label="' + esc(cs.placeholder[method]) + '">' +
        '<p class="est__error" id="estError" hidden>' + esc(cs.error[method]) + '</p>' +
        '</div>' + navButtons(true);
    } else if (key === 'type') {
      html += '<h2 class="est__question">' + t.typeStep.q(safeName()) + '</h2>' +
        '<p class="est__hint">' + t.typeStep.hint + '</p>' +
        '<div class="est__options">';
      t.typeStep.options.forEach(function (o) {
        var fromPrice = round10(PRICING.types[o.id].hours[0] * RATE);
        html += '<button type="button" class="est__opt' + (state.type === o.id ? ' is-selected' : '') + '" data-opt="' + o.id + '" data-hover>' +
          '<span class="est__opt-name">' + o.name + '</span>' +
          '<span class="est__opt-desc">' + o.desc + ' · ' + t.from(fmt(fromPrice)) + '</span>' +
          '</button>';
      });
      html += '</div>' + navButtons(true);
    } else if (key === 'budget') {
      html += '<h2 class="est__question">' + t.budgetStep.q + '</h2>' +
        '<p class="est__hint">' + t.budgetStep.hint + '</p>' +
        '<div class="est__options">';
      t.budgetStep.options.forEach(function (o) {
        html += '<button type="button" class="est__opt' + (state.budget === o.id ? ' is-selected' : '') + '" data-opt="' + o.id + '" data-hover>' +
          '<span class="est__opt-name">' + o.name + '</span>' +
          '<span class="est__opt-desc">' + o.desc + '</span>' +
          '</button>';
      });
      html += '</div>' + navButtons(true);
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

    var input = document.getElementById('estInput');
    if (input) {
      var field = key === 'name' ? 'name' : state.contact; // 'name', 'email' ou 'phone'
      var nextBtn = root.querySelector('.est__next');
      var errorEl = document.getElementById('estError');
      input.addEventListener('input', function () {
        state[field] = input.value;
        if (errorEl) errorEl.hidden = true;
        if (nextBtn) nextBtn.disabled = !canAdvance();
      });
      input.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter') return;
        ev.preventDefault();
        if (canAdvance()) { state.idx++; render(true); }
        else if (errorEl) errorEl.hidden = false;
      });
      if (!reducedMotion) input.focus({ preventScroll: true });
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
    var contactBtn = e.target.closest('[data-contact]');
    var cta = e.target.closest('.est__ctas a');
    var key = sequence()[state.idx];

    if (cta) { // deixa o link seguir; só registra o clique
      track('estimator_cta', { method: cta.href.indexOf('wa.me') !== -1 ? 'whatsapp' : 'email' });
      return;
    }
    if (contactBtn) {
      var m = contactBtn.getAttribute('data-contact');
      if (state.contact !== m) { state.contact = m; render(false); }
      return;
    }
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
      } else if (key === 'budget') {
        state.budget = id;
        render(false);
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
        state = initialState();
        lastTrackedStep = null; // o funil recomeça junto
        render(true);
      }
      if (window.scrollY > 200) window.scrollTo({ top: 0 });
    }
  });

  render(true);
})();
