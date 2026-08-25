#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Carrusel "Ki Tavó — La bendición que se invierte".
Plantillas oficiales B/C. La última lámina cierra con UNA pregunta real
al lector (directriz de mercadeo vigente) + ruta.
6 láminas 1080x1920, mismo grid dorado que el reel.
Reusa las MISMAS escenas del video (img/k1, k2, k4, k5):
Mardan no produce imágenes extra para el carrusel.

  1 · PORTADA          Plantilla B   img/k1.png  gancho-paradoja (98)
  2 · MEROV KOL        Plantilla B   img/k2.png  "por la abundancia de todo"
  3 · DOS OÍDOS        Plantilla B   img/k4.png  Moed Katán 9b
  4 · UNA LUZ          Plantilla B   img/k5.png  Baal HaSulam
  5 · EL NÚMERO        Plantilla C   fondo negro "353" (simjá = jamishá)
  6 · LA PREGUNTA/CTA  Plantilla C   fondo negro pregunta + ruta

Cada afirmación viene del bloque PARA REDES verificado por el Sofer
(scratchpad/estudio-ki-tavo-simja.md). Barreras: tono diagnóstico
compasivo (nunca "Dios te castiga"); nada de 358; la gematría permitida
es שמחה 353 = חמשה (anagrama "cinco") como puente a las Cinco Luces.

Un comando:  python3 scripts/kitavo_carrusel.py
Sale en:     ~/jashmal-produccion/ki-tavo/carrusel/lamina_1..6.png
"""
import os, sys

MARCA = "/Users/mardan/jashmal-produccion/marca-instagram"
sys.path.insert(0, MARCA)
import plantilla_B_misterio as Bp   # noqa: E402
import plantilla_C_gematria as C    # noqa: E402

NDIR = "/Users/mardan/jashmal-produccion/ki-tavo"
IMG  = os.path.join(NDIR, "img")
OUT  = os.path.join(NDIR, "carrusel")

# lámina B: (archivo_escena, [gancho], etiqueta, ruta_texto)
LAMINAS_B = [
    # 1 · PORTADA — el gancho-paradoja del Sofer, tal cual el reel
    ("k1.png", ["98 MALDICIONES.", "LA CAUSA NO ES", "DEJAR DE SERVIR"],
     "KI TAVÓ · MISTERIO", None),
    # 2 · Devarim 28:47 — dato citable 1 del Sofer (merov kol)
    ("k2.png", ["«POR LA", "ABUNDANCIA", "DE TODO»"],
     "DEVARIM 28:47", None),
    # 3 · Moed Katán 9b — dato citable 3 (mismas palabras, dos lecturas)
    ("k4.png", ["MISMAS PALABRAS.", "DOS OÍDOS."],
     "MOED KATÁN 9B", None),
    # 4 · Baal HaSulam, Hakdamá al Zohar — el Sod (una luz, dos vasijas)
    ("k5.png", ["UNA SOLA LUZ.", "DOS VASIJAS."],
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
    # Gematría calculada y verificada por el Sofer:
    # שמחה (simjá) = 353 = חמשה (jamishá, "cinco") — mismas letras,
    # anagrama exacto. Puente a las Cinco Luces (misterio ya publicado).
    # Regla de la plantilla: nada de hebreo multiletra en PIL sin raqm
    # -> el significado va en ESPAÑOL.
    C.build_C("353", "GEMATRÍA",
              ["ALEGRÍA  =  CINCO",
               "simjá y jamishá — mismas letras",
               "la alegría es el cinco reordenado"],
              os.path.join(OUT, "lamina_5.png"))
    print("ok lamina_5 (353)")

    # 6 · LA PREGUNTA / CTA (Plantilla C) — cierra con pregunta REAL
    # al lector (mercadeo: despertar comentarios) + ruta corta.
    C.build_C("?", "LA PREGUNTA",
              ["¿Qué cosa buena de tu vida", "empezaste a cargar como deuda?",
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
