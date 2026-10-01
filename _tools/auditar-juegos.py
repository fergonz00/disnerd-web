# -*- coding: utf-8 -*-
"""Audita los dos motores (el Sombrero y los 4 tests de personaje) corriendo
el codigo REAL en el navegador, miles de partidas, para ver si:
  1. los datos estan sanos (sin referencias rotas ni opciones vacias)
  2. todos los resultados posibles pueden salir, y salen parejo
  3. el motor realmente detecta la personalidad: un jugador que contesta
     siempre como una casa / un personaje, termina en esa casa / personaje
"""
from playwright.sync_api import sync_playwright
import os, sys, json
sys.stdout.reconfigure(encoding="utf-8")

BASE = os.environ.get("DISNERD_BASE", "http://127.0.0.1:8765")
N = 20000
problemas = []


def ok(desc, cond, detalle=""):
    print(("  OK   " if cond else "  ⚠  ") + desc + ("" if cond else "  -> " + str(detalle)))
    if not cond:
        problemas.append(desc)


# ─────────────────────────── EL SOMBRERO ───────────────────────────
SH_VALIDAR = """() => {
  const casas = ['G','R','H','S'];
  const fallas = [];
  const textos = new Set();
  let ops = 0, puntosPorCasa = {G:0,R:0,H:0,S:0}, maxPorOpcion = 0;
  SH_PREGUNTAS.forEach((q, i) => {
    if (!q.q || !q.q.trim()) fallas.push('pregunta ' + i + ' sin texto');
    if (!['bin','val','dil','ele'].includes(q.tipo)) fallas.push('pregunta ' + i + ' con tipo raro: ' + q.tipo);
    if (textos.has(q.q)) fallas.push('pregunta repetida: ' + q.q.slice(0,45));
    textos.add(q.q);
    if (!q.ops || q.ops.length < 2) fallas.push('pregunta ' + i + ' con menos de 2 opciones');
    (q.ops || []).forEach((o, j) => {
      ops++;
      if (!o.t || !o.t.trim()) fallas.push('opcion sin texto en pregunta ' + i);
      if (!o.e) fallas.push('opcion sin emoji en pregunta ' + i);
      const ks = Object.keys(o.p || {});
      if (!ks.length) fallas.push('opcion que no suma a ninguna casa: p' + i + ' o' + j);
      ks.forEach(k => {
        if (!casas.includes(k)) fallas.push('casa inexistente "' + k + '" en pregunta ' + i);
        else { puntosPorCasa[k] += o.p[k]; maxPorOpcion = Math.max(maxPorOpcion, o.p[k]); }
        if (o.p[k] < 0) fallas.push('puntaje negativo en pregunta ' + i);
      });
    });
  });
  const cupo = SH_CUPO.bin + SH_CUPO.val + SH_CUPO.dil + SH_CUPO.ele;
  const porTipo = {};
  SH_PREGUNTAS.forEach(q => porTipo[q.tipo] = (porTipo[q.tipo]||0) + 1);
  const faltan = Object.keys(SH_CUPO).filter(t => (porTipo[t]||0) < SH_CUPO[t]);
  return {fallas, preguntas: SH_PREGUNTAS.length, ops, puntosPorCasa, maxPorOpcion,
          cupoTotal: cupo, porTipo, faltanParaElCupo: faltan,
          casas: Object.keys(SH_CASAS), empate: SH_EMPATE};
}"""

SH_SIMULAR = """(args) => {
  const [n, objetivo] = args;
  const cuenta = {G:0,R:0,H:0,S:0};
  let dudas = 0;
  for (let i = 0; i < n; i++) {
    const qs = shArmarPartida();
    const pts = {G:0,R:0,H:0,S:0};
    qs.forEach(q => {
      let elegida;
      if (objetivo) {
        // jugador coherente: siempre la opcion que mas suma a su casa
        let mejor = -1;
        q.ops.forEach(o => {
          const v = (o.p && o.p[objetivo]) || 0;
          if (v > mejor) { mejor = v; elegida = o; }
        });
        // si ninguna suma a su casa, elige al azar (no puede "actuar")
        if (mejor <= 0) elegida = q.ops[Math.floor(Math.random()*q.ops.length)];
      } else {
        elegida = q.ops[Math.floor(Math.random()*q.ops.length)];
      }
      for (const k in (elegida.p||{})) pts[k] += elegida.p[k];
    });
    const r = shPuntuar(pts);
    if (r[0].pts - r[1].pts <= SH_EMPATE) dudas++;
    cuenta[r[0].k]++;
  }
  return {cuenta, dudas};
}"""

with sync_playwright() as p:
    nav = p.chromium.launch()
    ctx = nav.new_context()
    pg = ctx.new_page()
    errores = []
    pg.on("pageerror", lambda e: errores.append(str(e)))

    print("══ EL SOMBRERO SELECCIONADOR ══")
    pg.goto(BASE + "/sombrero/", wait_until="load")
    pg.wait_for_timeout(900)
    ok("la pagina carga sin errores de JS", not errores, errores)

    v = pg.evaluate(SH_VALIDAR)
    print("   %d preguntas · %d opciones · %d casas" % (v["preguntas"], v["ops"], len(v["casas"])))
    ok("datos sanos (sin opciones vacias, casas inventadas ni preguntas repetidas)",
       not v["fallas"], v["fallas"][:6])
    ok("hay preguntas de sobra para armar la partida de %d" % v["cupoTotal"],
       not v["faltanParaElCupo"], v["faltanParaElCupo"])
    tot = sum(v["puntosPorCasa"].values())
    rep = {k: round(100*x/tot, 1) for k, x in v["puntosPorCasa"].items()}
    print("   puntos disponibles por casa: " + " · ".join("%s %s%%" % (k, x) for k, x in rep.items()))
    ok("el banco reparte los puntos parejo entre las 4 casas (ninguna fuera de 22-28%%)",
       all(22 <= x <= 28 for x in rep.values()), rep)

    print()
    print("   Jugador al azar, %d partidas:" % N)
    r = pg.evaluate(SH_SIMULAR, [N, None])
    c = r["cuenta"]
    pct = {k: round(100*x/N, 1) for k, x in c.items()}
    print("      " + " · ".join("%s %s%%" % (k, x) for k, x in pct.items()))
    ok("ninguna casa queda afuera", all(x > 0 for x in c.values()), c)
    ok("la distribucion es pareja (todas entre 15%% y 35%%)",
       all(15 <= x <= 35 for x in pct.values()), pct)
    print("      el Sombrero duda (empate) en el %.1f%% de las partidas" % (100*r["dudas"]/N))
    ok("duda a veces pero no siempre (entre 5%% y 45%%)",
       5 <= 100*r["dudas"]/N <= 45, round(100*r["dudas"]/N, 1))

    print()
    print("   Jugador coherente (contesta siempre como una casa), 5.000 partidas cada uno:")
    aciertos = {}
    for casa in ["G", "R", "H", "S"]:
        rr = pg.evaluate(SH_SIMULAR, [5000, casa])
        a = round(100*rr["cuenta"][casa]/5000, 1)
        aciertos[casa] = a
        print("      el que contesta como %s termina en %s el %.1f%% de las veces" % (casa, casa, a))
    ok("el motor detecta la personalidad: acierta mas del 85%% en las 4 casas",
       all(x >= 85 for x in aciertos.values()), aciertos)

    # ─────────────────────── LOS 4 TESTS DE PERSONAJE ───────────────────────
    print()
    print("══ LOS 4 TESTS DE PERSONAJE ══")
    pg.goto(BASE + "/personaje/princesas/", wait_until="load")
    pg.wait_for_timeout(900)

    QP_VALIDAR = """() => {
      const fallas = [];
      const resumen = {};
      Object.entries(MODOS).forEach(([k, m]) => {
        const ids = new Set(m.personajes.map(p => p.id));
        if (ids.size !== m.personajes.length) fallas.push(k + ': hay ids de personaje repetidos');
        m.personajes.forEach(p => {
          EJES.forEach(e => { if (typeof p.perfil[e] !== 'number') fallas.push(k+'/'+p.id+': le falta el eje '+e); });
          if (!p.nombre || !p.desc) fallas.push(k+'/'+p.id+': sin nombre o sin descripcion');
        });
        const textos = new Set();
        m.preguntas.forEach((q, i) => {
          if (textos.has(q.q)) fallas.push(k + ': pregunta repetida -> ' + q.q.slice(0,40));
          textos.add(q.q);
          if (!q.ops || q.ops.length < 2) fallas.push(k + ': pregunta ' + i + ' con menos de 2 opciones');
          (q.ops||[]).forEach(o => {
            if (!o.t) fallas.push(k + ': opcion sin texto en pregunta ' + i);
            Object.keys(o.d||{}).forEach(e => {
              if (!EJES.includes(e)) fallas.push(k + ': eje inexistente "' + e + '"');
            });
            (o.n||[]).forEach(id => {
              if (!ids.has(id)) fallas.push(k + ': empuja a un personaje que no existe -> ' + id);
            });
          });
        });
        if (m.preguntas.length < PREGUNTAS_POR_PARTIDA)
          fallas.push(k + ': tiene menos preguntas que las ' + PREGUNTAS_POR_PARTIDA + ' de una partida');
        resumen[k] = {personajes: m.personajes.length, preguntas: m.preguntas.length};
      });
      return {fallas, resumen, ejes: EJES};
    }"""

    QP_SIMULAR = """(args) => {
      const [modo, n] = args;
      const m = MODOS[modo];
      const cuenta = {};
      m.personajes.forEach(p => cuenta[p.id] = 0);
      for (let i = 0; i < n; i++) {
        const pool = shuffle([...m.preguntas]).slice(0, PREGUNTAS_POR_PARTIDA);
        estado = { modo, qs: pool, i: 0, ejes:{E:5,A:5,H:5,C:5,L:5,O:5,S:5,P:5}, nudges:{} };
        pool.forEach(q => {
          const o = q.ops[Math.floor(Math.random()*q.ops.length)];
          for (const k in (o.d||{})) estado.ejes[k] = Math.max(0, Math.min(10, estado.ejes[k] + o.d[k]));
          (o.n||[]).forEach(id => estado.nudges[id] = (estado.nudges[id]||0) + 1);
        });
        cuenta[calcular()[0].p.id]++;
      }
      return cuenta;
    }"""

    v = pg.evaluate(QP_VALIDAR)
    for k, r in v["resumen"].items():
        print("   %-10s %2d personajes · %2d preguntas" % (k, r["personajes"], r["preguntas"]))
    ok("datos sanos en los 4 (ejes validos, sin ids rotos ni preguntas repetidas)",
       not v["fallas"], v["fallas"][:8])

    print()
    for modo in ["princesas", "villanos", "clasicos", "pixar"]:
        c = pg.evaluate(QP_SIMULAR, [modo, 8000])
        nunca = [k for k, x in c.items() if x == 0]
        pcts = sorted(((round(100*x/8000, 1), k) for k, x in c.items()), reverse=True)
        print("   %-10s mas sale: %s %s%%  ·  menos sale: %s %s%%" %
              (modo, pcts[0][1], pcts[0][0], pcts[-1][1], pcts[-1][0]))
        ok("%s: todos los personajes pueden salir" % modo, not nunca, nunca)
        ok("%s: ninguno acapara (el mas comun por debajo del 25%%)" % modo,
           pcts[0][0] < 25, "%s %s%%" % (pcts[0][1], pcts[0][0]))
        ok("%s: ninguno es casi imposible (el menos comun arriba del 1%%)" % modo,
           pcts[-1][0] >= 1, "%s %s%%" % (pcts[-1][1], pcts[-1][0]))
    nav.close()

print()
print("PROBLEMAS: " + (", ".join(problemas) if problemas else "ninguno"))
