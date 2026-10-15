/* Agrandar una captura o una foto al tocarla.

   Las tarjetas de la seccion de mensajes se muestran chicas y parejas para que
   la seccion no se coma media pagina. Lo que se pierde es poder leer el
   mensaje, asi que cualquier imagen se abre a pantalla completa al tocarla.

   Sin librerias: es un div que se crea una sola vez y se muestra. */
(function () {
  var imgs = document.querySelectorAll('.rs-grid img, .rs-fotos img');
  if (!imgs.length) return;

  var capa = document.createElement('div');
  capa.className = 'rs-lupa';
  capa.setAttribute('role', 'dialog');
  capa.setAttribute('aria-label', 'Imagen ampliada');
  capa.innerHTML = '<button class="rs-lupa-x" aria-label="Cerrar">×</button><img alt="">';
  document.body.appendChild(capa);
  var grande = capa.querySelector('img');

  function abrir(src, alt) {
    grande.src = src;
    grande.alt = alt || '';
    capa.classList.add('abierta');
    document.body.style.overflow = 'hidden';
    if (typeof gtag === 'function') gtag('event', 'ampliar_resena', { item: alt || src });
  }
  function cerrar() {
    capa.classList.remove('abierta');
    document.body.style.overflow = '';
    grande.src = '';
  }

  imgs.forEach(function (im) {
    im.style.cursor = 'zoom-in';
    im.addEventListener('click', function () {
      /* la tarjeta muestra un cuadrado; la lupa, la captura entera */
      abrir(im.getAttribute('data-entera') || im.src, im.alt);
    });
  });
  capa.addEventListener('click', cerrar);
  /* Escape tambien cierra: si alguien llega con el teclado no queda atrapado */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && capa.classList.contains('abierta')) cerrar();
  });
})();
