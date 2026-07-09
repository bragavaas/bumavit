/* BUMAVIT — interactions & scroll choreography (GSAP + ScrollTrigger + Lenis) */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ============ Reduced motion: static, accessible page ============ */
  if (reducedMotion) {
    document.body.classList.add('reduced-motion');
    document.body.classList.remove('is-loading');
    var pre = document.getElementById('preloader');
    if (pre) pre.style.display = 'none';
    gsap.set('.hero__line-inner, .preloader__char', { y: 0 });
    document.querySelectorAll('[data-count]').forEach(function (el) {
      el.textContent = el.dataset.count + (el.dataset.suffix || '');
    });
    document.querySelectorAll('.manifesto__text').forEach(function (el) { el.style.opacity = 1; });
    bindMenu(null);
    bindAnchors(null);
    bindLeadForm();
    return; // no scroll-driven motion at all (FAQ usa <details> nativo)
  }

  /* ============ Smooth scroll (Lenis + ScrollTrigger) ============ */
  var lenis = new Lenis({
    duration: 1.15,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  /* ============ Split helpers ============ */
  function splitWords(el, inner, wordClass) {
    var text = el.textContent.trim();
    el.textContent = '';
    // texto real para leitores de tela (aria-label é proibido em p/span sem role)
    var sr = document.createElement('span');
    sr.className = 'sr-only';
    sr.textContent = text;
    el.appendChild(sr);
    text.split(/\s+/).forEach(function (word, i) {
      var w = document.createElement('span');
      w.className = wordClass || 'word';
      w.setAttribute('aria-hidden', 'true');
      if (inner) {
        var s = document.createElement('span');
        s.textContent = word;
        w.appendChild(s);
      } else {
        w.textContent = word;
      }
      el.appendChild(w);
      el.appendChild(document.createTextNode(' '));
    });
  }

  document.querySelectorAll('[data-split]').forEach(function (el) { splitWords(el, true, 'word'); });
  var manifesto = document.getElementById('manifestoText');
  if (manifesto) splitWords(manifesto, false, 'm-word');

  /* ============ Preloader → hero intro ============ */
  gsap.set('.hero__scroll', { opacity: 0 });
  gsap.set('#fab', { y: 120, opacity: 0 });

  var heroIntro = gsap.timeline({ paused: true });
  heroIntro
    .to('.hero__line-inner', { y: 0, duration: 1.15, ease: 'power4.out', stagger: 0.12 })
    .to('.hero [data-reveal]', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }, '-=0.7')
    .to('#fab', { y: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.4)', clearProps: 'all' }, '-=0.6')
    .to('.hero__scroll', { opacity: 1, duration: 0.8 }, '-=0.4');

  var counter = { v: 0 };
  var countEl = document.getElementById('preCount');

  gsap.timeline({
    onComplete: function () {
      document.body.classList.remove('is-loading');
      var p = document.getElementById('preloader');
      if (p) p.style.display = 'none';
      heroIntro.play();
      ScrollTrigger.refresh();
    }
  })
    .to('.preloader__char', { y: 0, duration: 0.9, ease: 'power4.out', stagger: 0.05 })
    .to(counter, {
      v: 100,
      duration: 1.4,
      ease: 'power2.inOut',
      onUpdate: function () { if (countEl) countEl.textContent = Math.round(counter.v); }
    }, '-=0.5')
    .to('.preloader__char', { y: '-110%', duration: 0.7, ease: 'power4.in', stagger: 0.04 }, '+=0.15')
    .to('#preloader', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=0.25');

  /* ============ Nav: shrink + hide on scroll down ============ */
  var nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate: function (self) {
      nav.classList.toggle('is-scrolled', self.scroll() > 60);
      var goingDown = self.direction === 1;
      nav.classList.toggle('is-hidden',
        goingDown && self.scroll() > 350 && !document.body.classList.contains('menu-open'));
    }
  });

  /* ============ Marquee ============ */
  gsap.to('#marqueeTrack', { xPercent: -50, duration: 22, ease: 'none', repeat: -1 });

  /* ============ Generic reveals (outside hero) ============ */
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    if (el.closest('.hero')) return;
    gsap.to(el, {
      opacity: 1, y: 0,
      duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* ============ Split-title reveals ============ */
  document.querySelectorAll('[data-split]').forEach(function (el) {
    gsap.to(el.querySelectorAll('.word > span'), {
      y: 0,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.06,
      scrollTrigger: { trigger: el, start: 'top 85%' }
    });
  });

  /* ============ Manifesto word-by-word scrub ============ */
  if (manifesto) {
    gsap.to(manifesto.querySelectorAll('.m-word'), {
      opacity: 1,
      stagger: 0.06,
      ease: 'none',
      scrollTrigger: {
        trigger: manifesto,
        start: 'top 78%',
        end: 'bottom 45%',
        scrub: 0.6
      }
    });
  }

  /* ============ Stats counters ============ */
  document.querySelectorAll('[data-count]').forEach(function (el) {
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' },
      onUpdate: function () { el.textContent = Math.round(obj.v) + suffix; }
    });
  });

  /* ============ Service rows cascade ============ */
  gsap.utils.toArray('.services__item').forEach(function (item, i) {
    gsap.from(item, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      delay: (i % 5) * 0.05,
      scrollTrigger: { trigger: item, start: 'top 92%' }
    });
  });

  /* ============ Work cards: reveal + inner parallax ============ */
  gsap.utils.toArray('.work__card').forEach(function (card) {
    gsap.from(card, {
      opacity: 0,
      y: 70,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: card, start: 'top 90%' }
    });
    var mono = card.querySelector('.work__mono');
    if (mono) {
      gsap.fromTo(mono, { yPercent: -14 }, {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 0.8 }
      });
    }
  });

  /* ============ Horizontal process section ============ */
  var track = document.getElementById('processTrack');
  if (track) {
    var distance = function () { return Math.max(0, track.scrollWidth - window.innerWidth); };
    gsap.to(track, {
      x: function () { return -distance(); },
      ease: 'none',
      scrollTrigger: {
        trigger: '.process',
        start: 'top top',
        end: function () { return '+=' + distance(); },
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
  }

  /* ============ FAQ: acordeão animado ============ */
  document.querySelectorAll('.faq__item').forEach(function (item) {
    var summary = item.querySelector('summary');
    var answer = item.querySelector('.faq__answer');
    var animating = false;
    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (animating) return;
      animating = true;
      if (item.open) {
        gsap.to(answer, {
          height: 0, duration: 0.4, ease: 'power3.inOut',
          onComplete: function () {
            item.open = false;
            gsap.set(answer, { clearProps: 'height' });
            animating = false;
            ScrollTrigger.refresh();
          }
        });
      } else {
        item.open = true;
        gsap.fromTo(answer, { height: 0 }, {
          height: 'auto', duration: 0.5, ease: 'power3.out',
          onComplete: function () {
            gsap.set(answer, { clearProps: 'height' });
            animating = false;
            ScrollTrigger.refresh();
          }
        });
      }
    });
  });

  /* ============ CTA flutuante: some na seção de contato ============ */
  var fab = document.getElementById('fab');
  if (fab) {
    ScrollTrigger.create({
      trigger: '#contato',
      start: 'top 75%',
      end: 'bottom top',
      onToggle: function (self) { fab.classList.toggle('is-hidden', self.isActive); }
    });
  }

  /* ============ Formulário: entrada ============ */
  var leadForm = document.getElementById('leadForm');
  if (leadForm) {
    gsap.from(leadForm, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: { trigger: leadForm, start: 'top 88%' }
    });
  }

  /* ============ Footer wordmark slide ============ */
  gsap.from('.footer__wordmark', {
    yPercent: 40,
    opacity: 0,
    duration: 1.1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.footer__wordmark', start: 'top 96%' }
  });

  /* ============ Magnetic elements (desktop) ============ */
  if (finePointer) {
    document.querySelectorAll('[data-magnetic]').forEach(function (el) {
      var xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
      var yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.3);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.3);
      });
      el.addEventListener('pointerleave', function () { xTo(0); yTo(0); });
    });
  }

  /* ============ Custom cursor (desktop) ============ */
  if (finePointer) {
    var cursor = document.getElementById('cursor');
    var dot = document.getElementById('cursorDot');
    var label = document.getElementById('cursorLabel');
    var cx = gsap.quickTo(cursor, 'x', { duration: 0.45, ease: 'power3.out' });
    var cy = gsap.quickTo(cursor, 'y', { duration: 0.45, ease: 'power3.out' });
    var dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power2.out' });
    var dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power2.out' });

    window.addEventListener('pointermove', function (e) {
      if (!cursor.classList.contains('is-active')) {
        gsap.set([cursor, dot], { x: e.clientX, y: e.clientY });
        cursor.classList.add('is-active');
        dot.classList.add('is-active');
      }
      cx(e.clientX); cy(e.clientY);
      dx(e.clientX); dy(e.clientY);
    }, { passive: true });

    document.querySelectorAll('[data-hover]').forEach(function (el) {
      el.addEventListener('pointerenter', function () {
        cursor.classList.add('is-hover');
        var text = el.getAttribute('data-cursor');
        if (text) {
          label.textContent = text;
          cursor.classList.add('has-label');
        }
      });
      el.addEventListener('pointerleave', function () {
        cursor.classList.remove('is-hover', 'has-label');
      });
    });
  }

  /* ============ Menu + anchors + formulário ============ */
  bindMenu(lenis);
  bindAnchors(lenis);
  bindLeadForm();

  /* ---------------------------------------------------------- */

  function bindMenu(lenisInstance) {
    var burger = document.getElementById('burger');
    var menu = document.getElementById('menu');
    if (!burger || !menu) return;

    var open = false;
    var tl = gsap.timeline({ paused: true });
    tl.set(menu, { visibility: 'visible' })
      .fromTo(menu,
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'power4.inOut' })
      .fromTo(menu.querySelectorAll('.menu__links a'),
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.07 }, '-=0.25')
      .fromTo(menu.querySelector('.menu__footer'),
        { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.3');

    function setOpen(next) {
      open = next;
      document.body.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-hidden', String(!open));
      if (open) {
        if (lenisInstance) lenisInstance.stop();
        tl.timeScale(1).play();
      } else {
        if (lenisInstance) lenisInstance.start();
        tl.timeScale(1.6).reverse();
      }
    }

    burger.addEventListener('click', function () { setOpen(!open); });
    menu.querySelectorAll('a[data-scroll]').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    window.__closeMenu = function () { if (open) setOpen(false); };
  }

  function bindAnchors(lenisInstance) {
    document.querySelectorAll('a[data-scroll]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (!id || id.charAt(0) !== '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        if (lenisInstance) {
          lenisInstance.scrollTo(target, { offset: 0, duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: 'auto' });
        }
      });
    });

    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
      backToTop.addEventListener('click', function () {
        if (lenisInstance) lenisInstance.scrollTo(0, { duration: 1.6 });
        else window.scrollTo(0, 0);
      });
    }
  }

  function bindLeadForm() {
    var form = document.getElementById('leadForm');
    if (!form) return;
    var status = document.getElementById('leadStatus');
    var submitBtn = form.querySelector('.lead__submit');
    // strings traduzidas pelo i18n.js (fallback pt-BR)
    var STR = window.__STR || {
      formSending: 'Enviando…',
      formOk: 'Mensagem enviada! Respondemos em até 24h. ✦',
      formError: 'Algo deu errado. Tente de novo ou chame no WhatsApp.',
      formUnconfigured: 'Formulário ainda não configurado — por enquanto, chame no WhatsApp ou envie um e-mail. 🙂'
    };

    function setStatus(msg, cls) {
      status.textContent = msg;
      status.className = 'lead__status' + (cls ? ' ' + cls : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      if (form.action.indexOf('SEU_FORM_ID') !== -1) {
        setStatus(STR.formUnconfigured, 'is-error');
        return;
      }

      submitBtn.disabled = true;
      setStatus(STR.formSending);

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        form.reset();
        setStatus(STR.formOk, 'is-ok');
      }).catch(function () {
        setStatus(STR.formError, 'is-error');
      }).finally(function () {
        submitBtn.disabled = false;
      });
    });
  }
})();
