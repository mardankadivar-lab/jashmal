#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Carrusel de la letra Zayin (ז) — plantillas oficiales A/B/C.
Convierte (a seguidor). 6 láminas 1080x1920, mismo grid dorado que el reel:

  1 · PORTADA        Plantilla A   escena "letra"   "LA ZAYIN"
  2 · ESPADA/CORONA  Plantilla B   escena "corona"  "La misma forma: espada y corona"
  3 · SIETE/SHABAT   Plantilla B   escena "seis7"   "Su número es siete: el Shabat"
  4 · EL ARMA CALLA  Plantilla B   escena "espada"  "En Shabat el arma se queda en casa"
  5 · GEMATRÍA       Plantilla C   fondo negro      "67 · ZAYIN = BINÁ"
  6 · CIERRE/CTA     Plantilla C   fondo negro      "Estudia la Zayin completa"

Las ESCENAS (2-4) las hace Mardan en GPT (cinematográficas, sin texto) y las
guarda con estos nombres en  ~/jashmal-produccion/zayin/portada-scenes/ :
    zayin_escena.png   (portada · la letra encarnada)
    z_corona.png       (corona sobre pilar)
    z_seis_siete.png   (6 llamas + 7ª estrella / Shabat)
    z_espada.png       (espada en reposo)

Un comando:  python3 scripts/zayin_carrusel.py
Sale en:     ~/jashmal-produccion/zayin/carrusel/lamina_1..6.png
"""
import os, sys

MARCA = "/Users/mardan/jashmal-produccion/marca-instagram"
sys.path.insert(0, MARCA)
import plantilla_A_letra as A   # noqa: E402
import plantilla_B_misterio as Bp  # noqa: E402
import plantilla_C_gematria as C   # noqa: E402

ZDIR   = "/Users/mardan/jashmal-produccion/zayin"
SCENES = os.path.join(ZDIR, "portada-scenes")
OUT    = os.path.join(ZDIR, "carrusel")

# lámina B: (nombre_archivo_escena, [gancho], etiqueta)
LAMINAS_B = [
    ("z_corona.png",     ["LA MISMA FORMA:", "ESPADA", "Y CORONA"],        "LA PARADOJA"),
    ("z_seis_siete.png", ["SU NÚMERO", "ES SIETE:", "EL SHABAT"],          "EL NÚMERO"),
    ("z_espada.png",     ["EN SHABAT", "EL ARMA SE QUEDA", "EN CASA"],     "LA LEY"),
]


def main():
    os.makedirs(OUT, exist_ok=True)
    faltan = []

    # 1 · PORTADA (Plantilla A)
    port = os.path.join(SCENES, "zayin_escena.png")
    if os.path.isfile(port):
        A.build_A(port, "ZAYIN", "ז", "EL ALFABETO DE LA LUZ",
                  ["LA LETRA", "QUE ES ESPADA"],
                  os.path.join(OUT, "lamina_1.png"), remate="Y CORONA")
        print("ok lamina_1 (portada)")
    else:
        faltan.append(port)

    # 2-4 · CONCEPTO (Plantilla B)
    for i, (fn, gancho, etiq) in enumerate(LAMINAS_B, start=2):
        p = os.path.join(SCENES, fn)
        if os.path.isfile(p):
            Bp.build_B(p, gancho, os.path.join(OUT, f"lamina_{i}.png"),
                       etiqueta=etiq)
            print(f"ok lamina_{i} ({etiq})")
        else:
            faltan.append(p)

    # 5 · GEMATRÍA (Plantilla C) — no necesita escena
    C.build_C("67", "GEMATRÍA", ["ZAYIN  =  BINÁ",
              "el entendimiento que corona el arma"],
              os.path.join(OUT, "lamina_5.png"), glifo_heb="ז")
    print("ok lamina_5 (gematría)")

    # 6 · CIERRE / CTA (Plantilla C) — palabra en vez de número
    C.build_C("ז", "SIGUE EL HILO",
              ["Estudia la Zayin completa", "en jashmal.org / letra / zayin"],
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
