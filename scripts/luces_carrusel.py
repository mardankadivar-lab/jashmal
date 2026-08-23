#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Carrusel "Las Cinco Luces" — plantillas oficiales B/C.
Convierte (a seguidor) y DESPIERTA COMENTARIOS: la última lámina cierra
con una pregunta real al lector (directriz de mercadeo vigente).
6 láminas 1080x1920, mismo grid dorado que el reel.
Reusa las MISMAS escenas del video (img/l1, l5, l6, l7):
Mardan no produce imágenes extra para el carrusel.

  1 · PORTADA          Plantilla B   img/l1.png   "Cinco luces antes del sol"
  2 · LA GUARDADA      Plantilla B   img/l6.png   "La luz del primer día fue guardada"
  3 · EL HALLAZGO      Plantilla B   img/l7.png   "La luz del Mashíaj" (el Trono y la esfera debajo)
  4 · LA ASEGURADA     Plantilla B   img/l5.png   "La luz que no cabe te rodea"
  5 · EL NÚMERO        Plantilla C   fondo negro  "207" (or = raz = Ein Sof)
  6 · LA PREGUNTA/CTA  Plantilla C   fondo negro  pregunta al lector + ruta

Cada afirmación viene del bloque PARA REDES verificado por el Sofer
(scratchpad/estudio-cinco-luces.md). Regla respetada: en redes se dice
"la tradición nombra la luz de cinco maneras" — el quinteto es mapa de
Jashmal, y por eso cada lámina cita SU propia fuente.

Un comando:  python3 scripts/luces_carrusel.py
Sale en:     ~/jashmal-produccion/cinco-luces/carrusel/lamina_1..6.png
"""
import os, sys

MARCA = "/Users/mardan/jashmal-produccion/marca-instagram"
sys.path.insert(0, MARCA)
import plantilla_B_misterio as Bp   # noqa: E402
import plantilla_C_gematria as C    # noqa: E402

NDIR = "/Users/mardan/jashmal-produccion/cinco-luces"
IMG  = os.path.join(NDIR, "img")
OUT  = os.path.join(NDIR, "carrusel")

# lámina B: (archivo_escena, [gancho], etiqueta, ruta_texto)
LAMINAS_B = [
    # 1 · PORTADA — el gancho-paradoja, tal cual el reel
    ("l1.png", ["CINCO LUCES", "ANTES", "DEL SOL"],
     "MISTERIO", None),
    # 2 · Jaguigá 12a — dato citable 1 del Sofer
    ("l6.png", ["LA LUZ DEL", "PRIMER DÍA", "FUE GUARDADA"],
     "JAGUIGÁ 12A", None),
    # 3 · Pesikta Rabbati 36 — dato citable 2 (el hallazgo)
    ("l7.png", ["«LA LUZ", "DEL MASHÍAJ»"],
     "PESIKTA RABBATI 36", None),
    # 4 · Baal HaSulam, TES II — dato citable 5 (makif asegurada)
    ("l5.png", ["LA LUZ QUE", "NO CABE EN TI", "TE RODEA"],
     "BAAL HASULAM", None),
]


def main():
    os.makedirs(OUT, exist_ok=True)
    faltan = []

    # 1-4 · ESCENAS (Plantilla B)
    for i, (fn, gancho, etiq, ruta) in enumerate(LAMINAS_B, start=1):
        p = os.path.join(IMG, fn)
        if os.path.isfile(p):
            Bp.build_B(p, gancho, os.path.join(OUT, f"lamina_{i}.png"),
                       etiqueta=etiq, ruta_texto=ruta)
            print(f"ok lamina_{i} ({etiq})")
        else:
            faltan.append(p)

    # 5 · EL NÚMERO (Plantilla C) — no necesita escena.
    # Gematría verificada letra por letra por el Sofer:
    # אור = 207 = רז = אין סוף. Regla de la plantilla: nada de hebreo
    # multiletra en PIL sin raqm -> el significado va en ESPAÑOL.
    C.build_C("207", "GEMATRÍA",
              ["LUZ  =  SECRETO  =  INFINITO", "or · raz · Ein Sof — la misma cifra"],
              os.path.join(OUT, "lamina_5.png"))
    print("ok lamina_5 (207)")

    # 6 · LA PREGUNTA / CTA (Plantilla C) — cierra con pregunta REAL
    # al lector (mercadeo: estamos despertando comentarios) + ruta corta.
    C.build_C("?", "LA PREGUNTA",
              ["¿Qué luz te rodea todavía…", "y aún no cabe en ti?",
               "Dilo en los comentarios.",
               "El estudio completo: jashmal.org"],
              os.path.join(OUT, "lamina_6.png"))
    print("ok lamina_6 (pregunta + ruta)")

    if faltan:
        print("\nFALTAN escenas de Mardan (guárdalas y vuelve a correr):")
        for f in faltan:
            print("  ·", f)
    else:
        print(f"\nCarrusel completo en: {OUT}")


if __name__ == "__main__":
    main()
