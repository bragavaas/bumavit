/* BUMAVIT · GA4 lead event instrumentation
   Fires whatsapp_click and cta_orcamento_click via document-level delegation.
   form_submit is fired from main.js; estimator_* from estimator.js. */
(function () {
  'use strict';
  if (typeof window.gtag !== 'function') return;

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.href || '';

    if (href.indexOf('wa.me') !== -1) {
      gtag('event', 'whatsapp_click', {
        link_url: href.split('?')[0],
        link_location: window.location.pathname
      });
    }

    if (href.indexOf('estimador') !== -1 || a.hash === '#orcamento') {
      gtag('event', 'cta_orcamento_click', {
        link_text: (a.textContent || '').trim().substring(0, 60),
        link_location: window.location.pathname
      });
    }
  });
})();
