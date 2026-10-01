# -*- coding: utf-8 -*-
"""¿El test acierta cuando alguien contesta como un personaje concreto?
Simula, para cada personaje, un jugador que siempre elige la opcion que mas
lo acerca a ese perfil, y mide si termina saliendo ese personaje."""
from playwright.sync_api import sync_playwright
import os, sys
sys.stdout.reconfigure(encoding="utf-8")

BASE = os.environ.get("DISNERD_BASE", "http://127.0.0.1:8765")

SIM = """(args) => {
  const [modo, porPersonaje] = args;
  const m = MODOS[modo];
  const salida = {};
  m.personajes.forEach(obj => {
    let acierto = 0, enTop3 = 0;
    for (let i = 0; i < porPersonaje; i++) {
      const pool = shuffle([...m.preguntas]).slice(0, PREGUNTAS_POR_PARTIDA);
      estado = { modo, qs: pool, i: 0, ejes:{E:5,A:5,H:5,C:5,L:5,O:5,S:5,P:5}, nudges:{} };
      pool.forEach(q => {
        // elige la opcion que deja los ejes mas cerca del perfil del objetivo
        let mejor = null, mejorDist = Infinity;
        q.ops.forEach(o => {
          let d = 0;
          EJES.forEach(k => {
            const v = Math.max(0, Math.min(10, estado.ejes[k] + ((o.d||{})[k] || 0)));
            const dif = v - obj.perfil[k];
            d += dif * dif;
          });
          // un empujon si la opcion apunta al objetivo
          if ((o.n||[]).includes(obj.id)) d -= 9;
          if (d < mejorDist) { mejorDist = d; mejor = o; }
        });
        for (const k in (mejor.d||{})) estado.ejes[k] = Math.max(0, Math.min(10, estado.ejes[k] + mejor.d[k]));
        (mejor.n||[]).forEach(id => estado.nudges[id] = (estado.nudges[id]||0) + 1);
      });
      const res = calcular();
      if (res[0].p.id === obj.id) acierto++;
      if (res.slice(0,3).some(r => r.p.id === obj.id)) enTop3++;
    }
    salida[obj.id] = {acierto: acierto/porPersonaje, top3: enTop3/porPersonaje, nombre: obj.nombre};
  });
  return salida;
}"""

problemas = []
with sync_playwright() as p:
    nav = p.chromium.launch()
    pg = nav.new_context().new_page()
    pg.goto(BASE + "/personaje/princesas/", wait_until="load")
    pg.wait_for_timeout(900)

    print("Jugador que contesta como un personaje concreto (300 partidas por personaje)")
    print("%-10s %-24s %8s %8s" % ("test", "", "sale el", "entra en"))
    print("%-10s %-24s %8s %8s" % ("", "personaje", "mismo", "el top 3"))
    for modo in ["princesas", "villanos", "clasicos", "pixar"]:
        r = pg.evaluate(SIM, [modo, 300])
        filas = sorted(r.items(), key=lambda x: x[1]["acierto"])
        malos = [(k, v) for k, v in filas if v["top3"] < 0.5]
        print()
        print("── %s ──" % modo)
        for k, v in filas[:4]:
            print("   %-32s %6.0f%% %7.0f%%" % (v["nombre"], 100*v["acierto"], 100*v["top3"]))
        print("   ...")
        for k, v in filas[-2:]:
            print("   %-32s %6.0f%% %7.0f%%" % (v["nombre"], 100*v["acierto"], 100*v["top3"]))
        prom = sum(v["acierto"] for v in r.values()) / len(r)
        promt3 = sum(v["top3"] for v in r.values()) / len(r)
        print("   promedio: sale el mismo %.0f%% · entra en el top 3 %.0f%%" % (100*prom, 100*promt3))
        if malos:
            problemas.append("%s: %s no entra ni en el top 3 ni contestando como el/ella" %
                             (modo, ", ".join(v["nombre"] for _, v in malos)))
            print("   ⚠ NO lo detecta: " + ", ".join(v["nombre"] for _, v in malos))
    nav.close()

print()
print("PROBLEMAS: " + ("; ".join(problemas) if problemas else "ninguno"))
