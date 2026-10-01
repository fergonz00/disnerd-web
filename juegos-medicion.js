/* MEDICIÓN: clics a WhatsApp desde el test */
document.addEventListener('click', function(e){
  const el = e.target;
  if (!el || !el.closest) return;
  const a = el.closest('a');
  if (!a || (a.getAttribute('href') || '').indexOf('wa.me') === -1) return;

  if (a.id === 'wa-flotante') {
    if (typeof gtag === 'function') {
      gtag('event', 'click_whatsapp', { ubicacion: 'flotante', item: '(generico)' });
    }
    return;
  }
  const caja = a.closest('#scr-res') || a.closest('#sh-res');
  let item = '(generico)';
  if (caja) {
    try { item = JSON.parse(caja.dataset.ganador).nombre; } catch (err) {}
  }
  if (typeof gtag === 'function') {
    gtag('event', 'click_whatsapp', {
      ubicacion: caja ? 'quiz_resultado' : 'nav',
      item: item
    });
  }
}, true);
