/* Formulario "Cotizá tu viaje". Lo usan la home y las páginas por destino.
   Se dibuja dentro de <div id="form-cotiza"></div>. */

let destSeleccionado = '';
var cotizacionEmpezada = false;

const FORM_HTML = `<!-- DESTINO -->
    <div class="cq-group">
      <label class="cq-label">¿A dónde querés ir?</label>
      <div class="cq-dest-grid">
        <button class="cq-dest-btn" onclick="selectDest(this,'Orlando')" data-dest="Orlando">
          <span class="cq-dest-icon">🏰</span>
          <span class="cq-dest-name">ORLANDO</span>
        </button>
        <button class="cq-dest-btn" onclick="selectDest(this,'París')" data-dest="París">
          <span class="cq-dest-icon">🥐</span>
          <span class="cq-dest-name">PARÍS</span>
        </button>
        <button class="cq-dest-btn" onclick="selectDest(this,'Crucero')" data-dest="Crucero">
          <span class="cq-dest-icon">🚢</span>
          <span class="cq-dest-name">CRUCERO</span>
        </button>
      </div>
    </div>

    <!-- PERSONAS Y MES -->
    <div class="cq-row">
      <div class="cq-group">
        <label class="cq-label">¿Cuántas personas son?</label>
        <select class="cq-select" id="cq-personas">
          <option value="">Seleccioná</option>
          <option>1 persona</option>
          <option>2 personas</option>
          <option>3 personas</option>
          <option>4 personas</option>
          <option>5 personas</option>
          <option>6 o más</option>
        </select>
      </div>
      <div class="cq-group">
        <label class="cq-label">¿En qué mes pensás viajar?</label>
        <select class="cq-select" id="cq-mes">
          <option value="">Seleccioná</option>
          <option>Enero</option><option>Febrero</option><option>Marzo</option>
          <option>Abril</option><option>Mayo</option><option>Junio</option>
          <option>Julio</option><option>Agosto</option><option>Septiembre</option>
          <option>Octubre</option><option>Noviembre</option><option>Diciembre</option>
          <option>Aún no sé</option>
        </select>
      </div>
    </div>

    <!-- DÍAS Y CELULAR -->
    <div class="cq-row">
      <div class="cq-group">
        <label class="cq-label">¿Cuántos días más o menos?</label>
        <select class="cq-select" id="cq-dias">
          <option value="">Seleccioná</option>
          <option>3–4 días</option>
          <option>5–7 días</option>
          <option>8–10 días</option>
          <option>11–14 días</option>
          <option>Más de 14 días</option>
          <option>No sé todavía</option>
        </select>
      </div>
      <div class="cq-group">
        <label class="cq-label">Tu celular (para contactarte)</label>
        <input class="cq-input" id="cq-celular" type="tel" placeholder="Ej: 1150001234">
      </div>
    </div>

    <!-- MENORES -->
    <div class="cq-group">
      <label class="cq-check-label">
        <input type="checkbox" id="cq-hay-menores" onchange="toggleMenores(this)">
        <span>Sí, hay chicos en el grupo</span>
      </label>
      <div id="cq-menores-extra" style="display:none;margin-top:0.8rem;">
        <input class="cq-input" id="cq-edades" type="text" placeholder="Ej: 4 años, 8 años, 12 años">
        <p style="font-size:0.7rem;color:var(--text-soft);margin-top:0.3rem;">Indicá la edad de cada menor</p>
      </div>
    </div>

    <!-- COMENTARIO -->
    <div class="cq-group">
      <label class="cq-label">¿Algo más que quieras contarme? <span style="font-weight:300;">(opcional)</span></label>
      <textarea class="cq-textarea" id="cq-nota" rows="3" placeholder="Ej: es el primer viaje de mis hijos, quiero sorprender a alguien, tengo alguna restricción alimentaria..."></textarea>
    </div>

    <!-- BOTÓN -->
    <button class="cq-submit" onclick="enviarCotizacion()">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.558 4.136 1.535 5.874L.057 23.882a.5.5 0 0 0 .61.61l6.008-1.478A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a10 10 0 0 1-5.13-1.406l-.367-.22-3.566.878.893-3.458-.24-.377A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>
      QUIERO QUE ME CONTACTEN
    </button>`;

(function(){
  var cont = document.getElementById('form-cotiza');
  if (cont) cont.innerHTML = FORM_HTML;
})();

function selectDest(btn, dest) {
  document.querySelectorAll('.cq-dest-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  destSeleccionado = dest;

  /* Primer toque del formulario. Comparado contra enviar_cotizacion dice
     cuánta gente lo empieza y lo abandona a mitad de camino. */
  if (!cotizacionEmpezada) {
    cotizacionEmpezada = true;
    if (typeof gtag === 'function') gtag('event', 'iniciar_cotizacion', { destino: dest });
  }
}

function toggleMenores(checkbox) {
  document.getElementById('cq-menores-extra').style.display = checkbox.checked ? 'block' : 'none';
}

function enviarCotizacion() {
  const personas = document.getElementById('cq-personas').value;
  const mes = document.getElementById('cq-mes').value;
  const dias = document.getElementById('cq-dias').value;
  const celular = document.getElementById('cq-celular').value.trim();
  const hayMenores = document.getElementById('cq-hay-menores').checked;
  const edades = document.getElementById('cq-edades').value.trim();
  const nota = document.getElementById('cq-nota').value.trim();

  if (!destSeleccionado) { alert('Por favor elegí un destino 🏰'); return; }
  if (!personas) { alert('Por favor indicá cuántas personas son'); return; }
  if (!celular) { alert('Por favor ingresá tu celular para poder contactarte'); return; }

  let msg = `Hola Sofi! Quiero cotizar un viaje:\n\n`;
  msg += `• Destino: ${destSeleccionado}\n`;
  msg += `• Personas: ${personas}\n`;
  if (mes) msg += `• Mes: ${mes}\n`;
  if (dias) msg += `• Duración: ${dias}\n`;
  if (hayMenores) msg += `• Hay menores${edades ? ': ' + edades : ''}\n`;
  msg += `• Celular: ${celular}\n`;
  if (nota) msg += `• Comentario: ${nota}\n`;

  if (typeof gtag === 'function') {
    gtag('event', 'enviar_cotizacion', {
      destino: destSeleccionado,
      personas: personas,
      mes: mes || '(sin definir)',
      dias: dias || '(sin definir)',
      menores: hayMenores ? 'si' : 'no'
    });
  }

  const url = `https://wa.me/5491132924274?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}
