#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Carrusel de la letra Tet (ט) — plantillas oficiales A/B/C.
Convierte (a seguidor). 6 láminas 1080x1920, mismo grid dorado que el reel.
Reusa las MISMAS escenas del video (img/t3, t4, t6) + la escena de portada:
Mardan no produce imágenes extra para el carrusel.

  1 · PORTADA          sellado de marca de la portada de Mardan (su título
                       YA viene dentro de la imagen — precedente Eikev: NO se
                       monta tipografía encima, solo marco+sello+firma)
  2 · EL ESTRENO       Plantilla B   img/t3.png   "Tres versículos sin una sola Tet"
  3 · LA LUZ ESCONDIDA Plantilla B   img/t4.png   "La luz del primer día fue escondida"
  4 · EL ZOHAR         Plantilla B   img/t6.png   "Tu bien está sellado dentro de ti"
  5 · EL NÚMERO        Plantilla C   fondo negro  "9"
  6 · CIERRE/CTA       Plantilla C   fondo negro  "Estudia la Tet completa"

Un comando:  python3 scripts/tet_carrusel.py
Sale en:     ~/jashmal-produccion/tet/carrusel/lamina_1..6.png
"""
import os, sys

MARCA = "/Users/mardan/jashmal-produccion/marca-instagram"
sys.path.insert(0, MARCA)
sys.path.insert(0, "/Users/mardan/jashmal-produccion/tet/portada")
import plantilla_B_misterio as Bp   # noqa: E402
import plantilla_C_gematria as C    # noqa: E402

TDIR   = "/Users/mardan/jashmal-produccion/tet"
IMG    = os.path.join(TDIR, "img")
OUT    = os.path.join(TDIR, "carrusel")

# lámina B: (archivo_escena, [gancho], etiqueta)
# Cada gancho es afirmación verificada de jashmal.org/es/letra/tet.
LAMINAS_B = [
    ("t3.png", ["TRES VERSÍCULOS", "SIN UNA", "SOLA TET"],        "BAVÁ KAMÁ 55A"),
    ("t4.png", ["LA LUZ DEL", "PRIMER DÍA", "FUE ESCONDIDA"],     "JAGUIGÁ 12A"),
    ("t6.png", ["«TU BIEN ESTÁ", "SELLADO", "DENTRO DE TI»"],     "EL ZOHAR"),
]


def main():
    os.makedirs(OUT, exist_ok=True)
    faltan = []

    # 1 · PORTADA — sellado de marca (el título de Mardan ya viene dentro:
    # precedente Eikev, NO se monta tipografía encima).
    port = os.path.join(IMG, "t8_portada.png")
    if os.path.isfile(port):
        import shutil
        import montar_portada_tet as MP
        shutil.copyfile(MP.story_9x16(), os.path.join(OUT, "lamina_1.png"))
        print("ok lamina_1 (portada sellada, sin tipografía nueva)")
    else:
        faltan.append(port)

    # 2-4 · CONCEPTO (Plantilla B)
    for i, (fn, gancho, etiq) in enumerate(LAMINAS_B, start=2):
        p = os.path.join(IMG, fn)
        if os.path.isfile(p):
            Bp.build_B(p, gancho, os.path.join(OUT, f"lamina_{i}.png"),
                       etiqueta=etiq)
            print(f"ok lamina_{i} ({etiq})")
        else:
            faltan.append(p)

    # 5 · EL NÚMERO (Plantilla C) — no necesita escena.
    # Los datos son exactos (Nidá 38b hace la gematría de הריון = 271 y fija
    # los nueve meses); el puente con la letra es el drash declarado de la página.
    C.build_C("9", "EL NÚMERO",
              ["nueve meses se forma la vida", "donde nadie la ve"],
              os.path.join(OUT, "lamina_5.png"), glifo_heb="ט")
    print("ok lamina_5 (número)")

    # 6 · CIERRE / CTA (Plantilla C)
    C.build_C("ט", "SIGUE EL HILO",
              ["Estudia la Tet completa", "en jashmal.org / letra / tet"],
              os.path.join(OUT, "lamina_6.png"))
    print("ok lamina_6 (cierre)")

    if faltan:
        print("\nFALTAN escenas de Mardan (guárdalas y vuelve a correr):")
        for f in faltan:
            print("  ·", f)
    else:
        print(f"\nCarrusel completo en: {OUT}")


if __name__ == "__main__":
    main()
