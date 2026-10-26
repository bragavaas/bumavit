/* BUMAVIT · página /manutencao-de-sites/
   Três peças interativas, sem dependência: funcionam com ou sem GSAP.
   - Painel "Sem / Com manutenção" (chave + anel de saúde). Vira para "com"
     sozinho na primeira vez que aparece na tela.
   - Medidor das 4 horas do plano, com três cenários.
   - Régua do contrato (6 meses de permanência e depois).
   Traduções das peças ficam aqui; o resto da página usa window.__pageI18n. */
(function () {
  'use strict';

  var LANG = window.__LANG || 'pt';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var T = {
    en: {
      switchLabel: 'Compare the site without and with maintenance',
      sem: 'Without maintenance', com: 'With maintenance',
      ringSem: 'At risk', ringCom: 'Up to date', ringSub: 'site health',
      rows: [
        ['WordPress and plugins', 'Updates pending', 'Up to date'],
        ['Last backup', 'Nobody knows', 'Done this month'],
        ['Security', 'Never checked', 'Checked, no threats'],
        ['Dashboard sign-in', 'Password only', 'Two-step verification'],
        ['Documents', 'Old version online', 'Latest version published'],
        ['Errors', 'Waiting for someone to notice', 'Fixed within the plan']
      ],
      tabs: ['Routine month', 'Busier month', 'New page'],
      scale: ['0', '4 h included in the plan', 'extra'],
      notes: {
        rotina: 'Text and document updates plus the month’s technical care fit within the plan’s hours.',
        cheio: 'The month went past 4 hours: the extra hours, at R$ 90 each, were quoted and approved by you before starting.',
        novo: 'A new page is a project, not maintenance: it has its own quote and doesn’t use the plan’s hours.'
      },
      termMin: 'Minimum term of 6 months', termAfter: 'After that: continue or stop, no fee',
      termEnd: 'When you stop, at any time after the sixth month, you take the last full backup and all access credentials.',
      termLabel: 'Contract timeline'
    },
    es: {
      switchLabel: 'Comparar el sitio sin y con mantenimiento',
      sem: 'Sin mantenimiento', com: 'Con mantenimiento',
      ringSem: 'En riesgo', ringCom: 'Al día', ringSub: 'salud del sitio',
      rows: [
        ['WordPress y plugins', 'Actualizaciones pendientes', 'Actualizados'],
        ['Último backup', 'Nadie sabe', 'Hecho este mes'],
        ['Seguridad', 'Sin verificación', 'Verificado, sin amenazas'],
        ['Acceso al panel', 'Solo contraseña', 'Verificación en dos pasos'],
        ['Documentos', 'Versión vieja publicada', 'Última versión publicada'],
        ['Errores', 'Esperando que alguien los vea', 'Corregidos en el plan']
      ],
      tabs: ['Mes de rutina', 'Mes con más pedidos', 'Página nueva'],
      scale: ['0', '4 h incluidas en el plan', 'extra'],
      notes: {
        rotina: 'Las actualizaciones de texto, los documentos y el cuidado técnico del mes caben en las horas del plan.',
        cheio: 'El mes pasó de 4 horas: las horas extra, a R$ 90 cada una, se presupuestaron y las aprobaste antes de empezar.',
        novo: 'Una página nueva es proyecto, no mantenimiento: tiene presupuesto propio y no usa las horas del plan.'
      },
      termMin: 'Permanencia mínima de 6 meses', termAfter: 'Después: continúas o terminas, sin multa',
      termEnd: 'Al terminar, en cualquier momento después del sexto mes, te llevas el último backup completo y todos los accesos.',
      termLabel: 'Línea de tiempo del contrato'
    }
  };

  function setText(el, txt) { if (el && txt != null) el.textContent = txt; }

  /* Aplica as traduções das peças (pt é o HTML). */
  var t = T[LANG];
  if (t) {
    var sw = document.querySelector('.mt-health__switch');
    if (sw) sw.setAttribute('aria-label', t.switchLabel);
    var opts = document.querySelectorAll('.mt-health__opt');
    setText(opts[0], t.sem); setText(opts[1], t.com);
    var ringB = document.querySelector('.mt-ring__label b');
    if (ringB) { ringB.dataset.sem = t.ringSem; ringB.dataset.com = t.ringCom; ringB.textContent = t.ringSem; }
    setText(document.querySelector('.mt-ring__label small'), t.ringSub);
    document.querySelectorAll('.mt-health__rows li').forEach(function (li, i) {
      var r = t.rows[i]; if (!r) return;
      setText(li.querySelector('.mt-row__k'), r[0]);
      var v = li.querySelector('.mt-row__v');
      v.dataset.sem = r[1]; v.dataset.com = r[2]; v.textContent = r[1];
    });
    document.querySelectorAll('.mt-hours__tab').forEach(function (b, i) { setText(b, t.tabs[i]); });
    document.querySelectorAll('.mt-hours__scale span').forEach(function (s, i) { setText(s, t.scale[i]); });
    var note = document.querySelector('.mt-hours__note');
    if (note) { note.dataset.rotina = t.notes.rotina; note.dataset.cheio = t.notes.cheio; note.dataset.novo = t.notes.novo; note.textContent = t.notes.rotina; }
    var term = document.querySelector('.mt-term');
    if (term) term.setAttribute('aria-label', t.termLabel);
    setText(document.querySelector('.mt-term__min'), t.termMin);
    setText(document.querySelector('.mt-term__after'), t.termAfter);
    setText(document.querySelector('.mt-term__end'), t.termEnd);
  }

  /* Dispara uma vez quando o elemento entra na tela. */
  function onceVisible(el, fn, threshold) {
    if (!el) return;
    if (reduced || !('IntersectionObserver' in window)) { fn(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { io.disconnect(); fn(); }
      });
    }, { threshold: threshold || 0.45 });
    io.observe(el);
  }

  /* ---------- Painel Sem / Com manutenção ---------- */
  var win = document.querySelector('.mt-health__window');
  var touched = false;
  function setHealth(state) {
    if (!win) return;
    win.dataset.state = state;
    document.querySelectorAll('.mt-health__opt').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.state === state));
    });
    win.querySelectorAll('[data-sem]').forEach(function (el, i) {
      var txt = el.dataset[state];
      if (reduced) { el.textContent = txt; return; }
      /* Cada linha troca com um pequeno atraso, em cascata. */
      setTimeout(function () { el.textContent = txt; }, 90 * i);
    });
  }
  document.querySelectorAll('.mt-health__opt').forEach(function (b) {
    b.addEventListener('click', function () { touched = true; setHealth(b.dataset.state); });
  });
  onceVisible(win, function () {
    setTimeout(function () { if (!touched) setHealth('com'); }, reduced ? 0 : 900);
  }, 0.6);

  /* ---------- Medidor das 4 horas ---------- */
  var hours = document.querySelector('.mt-hours');
  /* Proporções ilustrativas do desenho (não são horas medidas): rotina ocupa
     parte do plano; mês cheio enche o plano e transborda; página nova não
     consome o plano. */
  var SCENES = { rotina: [0.62, 0], cheio: [1, 0.55], novo: [0.62, 0] };
  function setScene(name) {
    if (!hours) return;
    hours.dataset.scene = name;
    var v = SCENES[name] || SCENES.rotina;
    hours.style.setProperty('--plan', v[0]);
    hours.style.setProperty('--extra', v[1]);
    hours.querySelectorAll('.mt-hours__tab').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.scene === name));
    });
    var note = hours.querySelector('.mt-hours__note');
    if (note) note.textContent = note.dataset[name];
  }
  if (hours) {
    hours.style.setProperty('--plan', 0); hours.style.setProperty('--extra', 0);
    hours.querySelectorAll('.mt-hours__tab').forEach(function (b) {
      b.addEventListener('click', function () { setScene(b.dataset.scene); });
    });
    onceVisible(hours, function () { setScene(hours.dataset.scene || 'rotina'); });
  }

  /* ---------- Régua do contrato ---------- */
  var term = document.querySelector('.mt-term');
  onceVisible(term, function () { if (term) term.classList.add('is-on'); });
})();
