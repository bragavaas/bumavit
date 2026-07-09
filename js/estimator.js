/* BUMAVIT — Estimador "Monte seu projeto"
   Wizard de 3 passos → faixa de investimento + prazo → handoff
   pré-preenchido para WhatsApp/e-mail. Trilíngue via window.__LANG.
   Ajuste os valores em PRICING (R$ mil) conforme sua tabela real. */
(function () {
  'use strict';

  var LANG = window.__LANG || 'pt';
  var WHATSAPP = '5511999999999'; // troque pelo número real

  /* ---------- Tabela de preços (edite aqui) ---------- */
  var PRICING = {
    types: {
      site: { base: [8, 15], weeks: [3, 6] },
      ecommerce: { base: [18, 35], weeks: [8, 12] },
      app: { base: [30, 60], weeks: [10, 16] },
      saas: { base: [40, 80], weeks: [12, 20] }
    },
    features: {
      conteudo: 0.08,
      pagamentos: 0.15,
      membros: 0.2,
      integracoes: 0.15,
      idiomas: 0.1,
      seo: 0.12
    },
    deadlines: {
      urgente: { mult: 1.25 },
      normal: { mult: 1 },
      medio: { mult: 1 },
      flexivel: { mult: 0.95 }
    }
  };

  /* ---------- Textos ---------- */
  var T = {
    pt: {
      stepOf: function (a, b) { return 'Passo ' + a + ' de ' + b; },
      steps: [
        {
          q: 'O que você quer construir?',
          hint: 'Escolha o tipo de projeto.',
          multi: false,
          options: [
            { id: 'site', name: 'Site institucional', desc: 'Presença digital profissional para sua marca' },
            { id: 'ecommerce', name: 'E-commerce', desc: 'Loja virtual pronta para vender' },
            { id: 'app', name: 'Aplicativo', desc: 'App mobile para iOS e Android' },
            { id: 'saas', name: 'Sistema / SaaS', desc: 'Plataforma web sob medida para o seu negócio' }
          ]
        },
        {
          q: 'Quais funcionalidades você precisa?',
          hint: 'Selecione quantas quiser — dá para ajustar depois.',
          multi: true,
          options: [
            { id: 'conteudo', name: 'Blog / Conteúdo', desc: 'Área de artigos e novidades' },
            { id: 'pagamentos', name: 'Pagamentos online', desc: 'Checkout, Pix, cartões e assinaturas' },
            { id: 'membros', name: 'Login / Área de membros', desc: 'Conteúdo restrito e contas de usuário' },
            { id: 'integracoes', name: 'Integrações / API', desc: 'CRM, ERP e outras ferramentas' },
            { id: 'idiomas', name: 'Multi-idioma', desc: 'Site em mais de um idioma' },
            { id: 'seo', name: 'SEO avançado', desc: 'Estratégia de ranqueamento desde o dia 1' }
          ]
        },
        {
          q: 'Para quando você precisa?',
          hint: 'O prazo influencia o formato da equipe.',
          multi: false,
          options: [
            { id: 'urgente', name: 'É pra ontem', desc: 'Menos de 1 mês' },
            { id: 'normal', name: '1–2 meses', desc: 'Ritmo acelerado' },
            { id: 'medio', name: '2–4 meses', desc: 'Ritmo confortável' },
            { id: 'flexivel', name: 'Flexível', desc: 'Qualidade acima de pressa' }
          ]
        }
      ],
      back: '← Voltar',
      next: 'Avançar →',
      resultLabel: 'Estimativa inicial de investimento',
      resultTime: function (w1, w2) { return 'Prazo estimado: ' + w1 + ' a ' + w2 + ' semanas'; },
      money: function (a, b) { return 'R$ ' + a + '–' + b + ' mil'; },
      disclaimer: 'Estimativa automática para referência. A proposta final — com escopo e valores fechados — sai depois de uma conversa gratuita de descoberta.',
      ctaWhats: 'Enviar pelo WhatsApp',
      ctaMail: 'Enviar por e-mail',
      restart: 'Recomeçar',
      handoffIntro: 'Olá, Bumavit! Montei meu projeto no site:',
      handoffType: 'Tipo', handoffFeatures: 'Funcionalidades', handoffDeadline: 'Prazo',
      handoffEstimate: 'Estimativa apresentada', none: 'Nenhuma'
    },
    en: {
      stepOf: function (a, b) { return 'Step ' + a + ' of ' + b; },
      steps: [
        {
          q: 'What do you want to build?',
          hint: 'Pick a project type.',
          multi: false,
          options: [
            { id: 'site', name: 'Institutional website', desc: 'A professional digital home for your brand' },
            { id: 'ecommerce', name: 'E-commerce', desc: 'An online store ready to sell' },
            { id: 'app', name: 'Mobile app', desc: 'iOS and Android' },
            { id: 'saas', name: 'System / SaaS', desc: 'A tailor-made web platform for your business' }
          ]
        },
        {
          q: 'Which features do you need?',
          hint: 'Select as many as you like — adjustable later.',
          multi: true,
          options: [
            { id: 'conteudo', name: 'Blog / Content', desc: 'Articles and news section' },
            { id: 'pagamentos', name: 'Online payments', desc: 'Checkout, cards and subscriptions' },
            { id: 'membros', name: 'Login / Members area', desc: 'Gated content and user accounts' },
            { id: 'integracoes', name: 'Integrations / API', desc: 'CRM, ERP and other tools' },
            { id: 'idiomas', name: 'Multi-language', desc: 'Site in more than one language' },
            { id: 'seo', name: 'Advanced SEO', desc: 'Ranking strategy from day one' }
          ]
        },
        {
          q: 'When do you need it?',
          hint: 'The timeline shapes the team setup.',
          multi: false,
          options: [
            { id: 'urgente', name: 'Yesterday', desc: 'Under 1 month' },
            { id: 'normal', name: '1–2 months', desc: 'Fast pace' },
            { id: 'medio', name: '2–4 months', desc: 'Comfortable pace' },
            { id: 'flexivel', name: 'Flexible', desc: 'Quality over rush' }
          ]
        }
      ],
      back: '← Back',
      next: 'Next →',
      resultLabel: 'Initial investment estimate',
      resultTime: function (w1, w2) { return 'Estimated timeline: ' + w1 + ' to ' + w2 + ' weeks'; },
      money: function (a, b) { return 'R$ ' + a + '–' + b + 'k (BRL)'; },
      disclaimer: 'Automatic estimate for reference only. The final proposal — with fixed scope and pricing — comes after a free discovery call.',
      ctaWhats: 'Send via WhatsApp',
      ctaMail: 'Send by e-mail',
      restart: 'Start over',
      handoffIntro: 'Hi Bumavit! I configured my project on the website:',
      handoffType: 'Type', handoffFeatures: 'Features', handoffDeadline: 'Timeline',
      handoffEstimate: 'Estimate shown', none: 'None'
    },
    es: {
      stepOf: function (a, b) { return 'Paso ' + a + ' de ' + b; },
      steps: [
        {
          q: '¿Qué quieres construir?',
          hint: 'Elige el tipo de proyecto.',
          multi: false,
          options: [
            { id: 'site', name: 'Sitio institucional', desc: 'Presencia digital profesional para tu marca' },
            { id: 'ecommerce', name: 'E-commerce', desc: 'Tienda online lista para vender' },
            { id: 'app', name: 'Aplicación móvil', desc: 'Para iOS y Android' },
            { id: 'saas', name: 'Sistema / SaaS', desc: 'Plataforma web a medida para tu negocio' }
          ]
        },
        {
          q: '¿Qué funcionalidades necesitas?',
          hint: 'Selecciona las que quieras — se puede ajustar después.',
          multi: true,
          options: [
            { id: 'conteudo', name: 'Blog / Contenido', desc: 'Sección de artículos y novedades' },
            { id: 'pagamentos', name: 'Pagos online', desc: 'Checkout, tarjetas y suscripciones' },
            { id: 'membros', name: 'Login / Área de miembros', desc: 'Contenido restringido y cuentas de usuario' },
            { id: 'integracoes', name: 'Integraciones / API', desc: 'CRM, ERP y otras herramientas' },
            { id: 'idiomas', name: 'Multi-idioma', desc: 'Sitio en más de un idioma' },
            { id: 'seo', name: 'SEO avanzado', desc: 'Estrategia de posicionamiento desde el día 1' }
          ]
        },
        {
          q: '¿Para cuándo lo necesitas?',
          hint: 'El plazo define el formato del equipo.',
          multi: false,
          options: [
            { id: 'urgente', name: 'Para ayer', desc: 'Menos de 1 mes' },
            { id: 'normal', name: '1–2 meses', desc: 'Ritmo acelerado' },
            { id: 'medio', name: '2–4 meses', desc: 'Ritmo cómodo' },
            { id: 'flexivel', name: 'Flexible', desc: 'Calidad antes que prisa' }
          ]
        }
      ],
      back: '← Volver',
      next: 'Avanzar →',
      resultLabel: 'Estimación inicial de inversión',
      resultTime: function (w1, w2) { return 'Plazo estimado: ' + w1 + ' a ' + w2 + ' semanas'; },
      money: function (a, b) { return 'R$ ' + a + '–' + b + ' mil (BRL)'; },
      disclaimer: 'Estimación automática solo de referencia. La propuesta final — con alcance y valores cerrados — llega después de una llamada de descubrimiento gratuita.',
      ctaWhats: 'Enviar por WhatsApp',
      ctaMail: 'Enviar por correo',
      restart: 'Empezar de nuevo',
      handoffIntro: '¡Hola, Bumavit! Configuré mi proyecto en el sitio:',
      handoffType: 'Tipo', handoffFeatures: 'Funcionalidades', handoffDeadline: 'Plazo',
      handoffEstimate: 'Estimación mostrada', none: 'Ninguna'
    }
  };

  var t = T[LANG] || T.pt;
  var root = document.getElementById('estimator');
  if (!root) return;

  var state = { step: 0, type: null, features: [], deadline: null };
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function optName(stepIdx, id) {
    var opt = t.steps[stepIdx].options.filter(function (o) { return o.id === id; })[0];
    return opt ? opt.name : id;
  }

  function estimate() {
    var base = PRICING.types[state.type].base;
    var factor = 1;
    state.features.forEach(function (f) { factor += PRICING.features[f] || 0; });
    factor *= PRICING.deadlines[state.deadline].mult;
    var lo = Math.round(base[0] * factor);
    var hi = Math.round(base[1] * factor);
    var weeks = PRICING.types[state.type].weeks;
    return { lo: lo, hi: hi, w1: weeks[0], w2: weeks[1] };
  }

  function handoffText() {
    var e = estimate();
    var feats = state.features.length
      ? state.features.map(function (f) { return optName(1, f); }).join(', ')
      : t.none;
    return t.handoffIntro + '\n' +
      '• ' + t.handoffType + ': ' + optName(0, state.type) + '\n' +
      '• ' + t.handoffFeatures + ': ' + feats + '\n' +
      '• ' + t.handoffDeadline + ': ' + optName(2, state.deadline) + '\n' +
      '• ' + t.handoffEstimate + ': ' + t.money(e.lo, e.hi);
  }

  /* ---------- Render ---------- */
  function render(animate) {
    var total = t.steps.length;
    var isResult = state.step >= total;
    var html = '';

    html += '<div class="est__progress">' +
      '<span class="est__step-label">' + (isResult ? '✦' : t.stepOf(state.step + 1, total)) + '</span>' +
      '<div class="est__bar"><div class="est__bar-fill" style="width:' + ((isResult ? total : state.step) / total * 100) + '%"></div></div>' +
      '</div>';

    if (!isResult) {
      var step = t.steps[state.step];
      html += '<h2 class="est__question">' + step.q + '</h2>' +
        '<p class="est__hint">' + step.hint + '</p>' +
        '<div class="est__options">';
      step.options.forEach(function (o) {
        var selected = step.multi
          ? state.features.indexOf(o.id) !== -1
          : (state.step === 0 ? state.type : state.deadline) === o.id;
        html += '<button type="button" class="est__opt' + (selected ? ' is-selected' : '') + '" data-opt="' + o.id + '" data-hover>' +
          '<span class="est__opt-name">' + o.name + '</span>' +
          '<span class="est__opt-desc">' + o.desc + '</span>' +
          '</button>';
      });
      html += '</div>' +
        '<div class="est__nav">' +
        '<button type="button" class="est__back" data-act="back"' + (state.step === 0 ? ' hidden' : '') + ' data-hover>' + t.back + '</button>' +
        '<button type="button" class="btn-pill btn-pill--accent est__next" data-act="next" ' + (canAdvance() ? '' : 'disabled') + ' data-hover><span>' + t.next + '</span></button>' +
        '</div>';
    } else {
      var e = estimate();
      var feats = state.features.map(function (f) { return optName(1, f); });
      var chips = [optName(0, state.type)].concat(feats, [optName(2, state.deadline)]);
      var waHref = 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(handoffText());
      var mailHref = 'mailto:contato@bumavit.com.br?subject=' + encodeURIComponent('Projeto — ' + optName(0, state.type)) +
        '&body=' + encodeURIComponent(handoffText());
      html += '<div class="est__result">' +
        '<span class="est__result-label">' + t.resultLabel + '</span>' +
        '<div class="est__result-value">' + t.money(e.lo, e.hi) + '</div>' +
        '<p class="est__result-time">' + t.resultTime(e.w1, e.w2) + '</p>' +
        '<ul class="est__summary">' + chips.map(function (c) { return '<li>' + c + '</li>'; }).join('') + '</ul>' +
        '<p class="est__disclaimer">' + t.disclaimer + '</p>' +
        '<div class="est__ctas">' +
        '<a class="btn-pill btn-pill--accent" href="' + waHref + '" target="_blank" rel="noopener" data-hover><span>' + t.ctaWhats + '</span></a>' +
        '<a class="btn-pill" href="' + mailHref + '" data-hover><span>' + t.ctaMail + '</span></a>' +
        '</div>' +
        '<button type="button" class="est__restart" data-act="restart" data-hover>' + t.restart + '</button>' +
        '</div>';
    }

    root.innerHTML = html;
    if (animate && !reducedMotion && window.gsap) {
      gsap.from(root.querySelectorAll('.est__question, .est__hint, .est__opt, .est__nav, .est__result > *'), {
        opacity: 0, y: 24, duration: 0.55, ease: 'power3.out', stagger: 0.05
      });
    }
  }

  function canAdvance() {
    if (state.step === 0) return !!state.type;
    if (state.step === 1) return true; // funcionalidades são opcionais
    if (state.step === 2) return !!state.deadline;
    return false;
  }

  root.addEventListener('click', function (e) {
    var opt = e.target.closest('[data-opt]');
    var act = e.target.closest('[data-act]');
    if (opt) {
      var id = opt.getAttribute('data-opt');
      if (state.step === 0) { state.type = id; render(false); }
      else if (state.step === 1) {
        var i = state.features.indexOf(id);
        if (i === -1) state.features.push(id); else state.features.splice(i, 1);
        opt.classList.toggle('is-selected');
      } else if (state.step === 2) { state.deadline = id; render(false); }
      return;
    }
    if (act) {
      var a = act.getAttribute('data-act');
      if (a === 'next' && canAdvance()) { state.step++; render(true); }
      if (a === 'back' && state.step > 0) { state.step--; render(true); }
      if (a === 'restart') { state = { step: 0, type: null, features: [], deadline: null }; render(true); }
      if (window.scrollY > 200) window.scrollTo({ top: 0 });
    }
  });

  render(true);
})();
