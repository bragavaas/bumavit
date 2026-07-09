/* BUMAVIT — interações das páginas internas (projetos)
   Subconjunto leve do main.js: sem preloader, marquee ou Three.js. */
(function () {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---- Split helper ---- */
  function splitWords(el) {
    var text = el.textContent.trim();
    el.setAttribute('aria-label', text);
    el.textContent = '';
    text.split(/\s+/).forEach(function (word) {
      var w = document.createElement('span');
      w.className = 'word';
      w.setAttribute('aria-hidden', 'true');
      var s = document.createElement('span');
      s.textContent = word;
      w.appendChild(s);
      el.appendChild(w);
      el.appendChild(document.createTextNode(' '));
    });
  }

  if (reducedMotion) {
    document.body.classList.add('reduced-motion');
    bindMenu(null);
    bindMisc(null);
    return;
  }

  /* ---- Smooth scroll ---- */
  var lenis = new Lenis({
    duration: 1.15,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    smoothWheel: true
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
  gsap.ticker.lagSmoothing(0);

  /* ---- Entrance: title + hero reveals ---- */
  document.querySelectorAll('[data-split]').forEach(splitWords);

  var intro = gsap.timeline({ delay: 0.15 });
  intro
    .to('.p-hero__title .word > span', { y: 0, duration: 1.05, ease: 'power4.out', stagger: 0.07 })
    .to('.p-hero [data-reveal]', {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08
    }, '-=0.65');

  /* ---- Scroll reveals (fora do hero) ---- */
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    if (el.closest('.p-hero')) return;
    gsap.to(el, {
      opacity: 1, y: 0,
      duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* ---- Parallax no monograma do banner ---- */
  var mono = document.querySelector('.p-banner .work__mono');
  if (mono) {
    gsap.fromTo(mono, { yPercent: -12 }, {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: '.p-banner', start: 'top bottom', end: 'bottom top', scrub: 0.8 }
    });
  }

  /* ---- Nav: esconder ao rolar para baixo ---- */
  var nav = document.getElementById('nav');
  ScrollTrigger.create({
    start: 'top top',
    end: 'max',
    onUpdate: function (self) {
      nav.classList.toggle('is-hidden',
        self.direction === 1 && self.scroll() > 350 && !document.body.classList.contains('menu-open'));
    }
  });

  /* ---- Magnetic (desktop) ---- */
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

  /* ---- Cursor customizado (desktop) ---- */
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

  bindMenu(lenis);
  bindMisc(lenis);

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

    burger.addEventListener('click', function () {
      open = !open;
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
    });
  }

  function bindMisc(lenisInstance) {
    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
      backToTop.addEventListener('click', function () {
        if (lenisInstance) lenisInstance.scrollTo(0, { duration: 1.4 });
        else window.scrollTo(0, 0);
      });
    }
  }
})();
