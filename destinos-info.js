/* Mide cuándo alguien abre una de las preguntas de la página de destino.
   Contra las visitas dice si el texto le sirve a la gente o le estorba, y si
   una pregunta no la abre nadie, se saca. */
(function () {
  document.querySelectorAll('.dst-info details, .rs-mas').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open || typeof gtag !== 'function') return;
      var s = d.querySelector('summary');
      gtag('event', 'ver_info_destino', {
        destino: window.INFO_DESTINO || window.PR_DESTINO || '(sin destino)',
        item: s ? s.textContent.trim() : '(sin titulo)'
      });
    });
  });
})();
