#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Carrusel «Elul — Yo soy de mi Amado» (serie Tiempos Sagrados).
Plantillas oficiales B (misterio) y C (gematría) del sistema de marca IG.
9 láminas 1080x1920, mismo grid dorado que el reel.

REUSA LAS MISMAS ESCENAS DEL VIDEO (img/e1, e2, e3, e5, e6, e8):
Mardan NO produce imágenes extra para el carrusel. Solo hay UNA imagen
adicional opcional (e_portada.png) para la lámina 1; si no existe, la
portada cae automáticamente a e5 (el Rey en el campo), que también
cumple la fórmula de impacto (sujeto vivo + mucho negro).

  1 · PORTADA         B   e_portada / e5   el gancho del reel
  2 · EL ACRÓSTICO    B   e2               "yo soy de mi Amado"
  3 · EL ESPEJO       B   e3               las mismas palabras, al revés
  4 · EL NOMBRE       C   negro            ELUL = las 4 iniciales
  5 · EL REY          B   e5               el Rey salió al campo
  6 · EL FILO         B   e8               pero no toca a tu puerta
  7 · LA GEMATRÍA     C   negro            67 = Biná
  8 · EL PLAZO        B   e6               40 días hasta Yom Kipur
  9 · LA PREGUNTA     C   negro            pregunta real + ruta

Cada afirmación sale del estudio ya verificado por el Sofer
(app/[locale]/misterio/elul/data.ts). Nada añadido.

Gematría publicable: אֱלוּל = 67 = בִּינָה (verificada letra por letra en
el estudio: א1+ל30+ו6+ל30 = 67 · ב2+י10+נ50+ה5 = 67).

Regla de la plantilla C: nada de hebreo multiletra en PIL sin raqm
-> el significado va en ESPAÑOL, con la transliteración latina.

Un comando:  python3 scripts/elul_carrusel.py
Sale en:     ~/jashmal-produccion/tiempos-sagrados/elul/carrusel/lamina_1..9.png
"""
import os, sys

MARCA = "/Users/mardan/jashmal-produccion/marca-instagram"
sys.path.insert(0, MARCA)
import plantilla_B_misterio as Bp   # noqa: E402
import plantilla_C_gematria as C    # noqa: E402

NDIR = "/Users/mardan/jashmal-produccion/tiempos-sagrados/elul"
IMG  = os.path.join(NDIR, "img")
OUT  = os.path.join(NDIR, "carrusel")

# (n_lamina, archivo_escena, [gancho], etiqueta, ruta_texto)
LAMINAS_B = [
    # 1 · PORTADA — la fórmula que ya pegó: sujeto vivo + mucho negro +
    #     marco Cinzel dorado. El gancho es el del reel, en 3 líneas.
    (1, "e_portada.png", ["EL NOMBRE DE", "ESTE MES ESTÁ EN", "UN VERSO DE AMOR"],
     "ELUL · TIEMPOS SAGRADOS", None),

    # 2 · EL ACRÓSTICO — Shir HaShirim 6:3
    (2, "e2.png", ["«YO SOY DE", "MI AMADO Y MI", "AMADO ES MÍO»"],
     "CANTAR DE LOS CANTARES 6:3", None),

    # 3 · EL ESPEJO — Shir HaShirim 2:16
    (3, "e3.png", ["LAS MISMAS", "PALABRAS.", "AL REVÉS."],
     "CANTAR DE LOS CANTARES 2:16", None),

    # 5 · EL REY EN EL CAMPO — Likutei Torá, Re'eh 32b
    (5, "e5.png", ["EL REY SALIÓ", "DE SU PALACIO", "Y ESTÁ EN TU CAMPO"],
     "LIKUTEI TORÁ · LA PARÁBOLA", None),

    # 6 · EL FILO de la parábola — la frase que decide todo el mes
    (6, "e8.png", ["PERO NO TOCA", "A TU PUERTA."],
     "ELUL", None),

    # 8 · EL PLAZO — Tur, Oraj Jaim 581 (Pirkei deRabí Eliezer)
    (8, "e6.png", ["CUARENTA DÍAS", "HASTA", "YOM KIPUR"],
     "TUR, ORAJ JAIM 581", None),
]

# Portada de reserva si Mardan no genera e_portada.png
FALLBACK_PORTADA = "e5.png"


def main():
    os.makedirs(OUT, exist_ok=True)
    faltan = []

    for n, fn, gancho, etiq, ruta in LAMINAS_B:
        p = os.path.join(IMG, fn)
        if not os.path.isfile(p) and n == 1:
            alt = os.path.join(IMG, FALLBACK_PORTADA)
            if os.path.isfile(alt):
                print(f"  (sin e_portada.png -> portada con {FALLBACK_PORTADA})")
                p = alt
        if os.path.isfile(p):
            Bp.build_B(p, gancho, os.path.join(OUT, f"lamina_{n}.png"),
                       etiqueta=etiq, ruta_texto=ruta)
            print(f"ok lamina_{n} ({etiq})")
        else:
            faltan.append(p)

    # 4 · EL NOMBRE (Plantilla C) — el acróstico explicado, en español.
    # Notarikón: las iniciales de las 4 palabras de Shir HaShirim 6:3
    # dan א-ל-ו-ל. NO se afirma que sea la etimología del mes.
    C.build_C("ELUL", "EL ACRÓSTICO",
              ["Aní · LeDodí · VeDodí · Lí",
               "la primera letra de cada palabra",
               "álef · lámed · vav · lámed"],
              os.path.join(OUT, "lamina_4.png"))
    print("ok lamina_4 (el acróstico)")

    # 7 · LA GEMATRÍA (Plantilla C) — verificada letra por letra:
    # אלול = 1+30+6+30 = 67 · בינה = 2+10+50+5 = 67
    C.build_C("67", "GEMATRÍA",
              ["ELUL  =  BINÁ",
               "biná: el entendimiento",
               "volver es entender lo que pasó"],
              os.path.join(OUT, "lamina_7.png"))
    print("ok lamina_7 (67 = Biná)")

    # 9 · LA PREGUNTA / CTA — cierra con una pregunta REAL al lector
    # (directriz de mercadeo) + la ruta corta.
    C.build_C("?", "LA PREGUNTA",
              ["¿A quién le debes tú",
               "el primer paso?",
               "Dilo en los comentarios.",
               "El estudio completo: jashmal.org"],
              os.path.join(OUT, "lamina_9.png"))
    print("ok lamina_9 (pregunta + ruta)")

    if faltan:
        print("\nFALTAN escenas de Mardan (guárdalas y vuelve a correr):")
        for f in faltan:
            print("  ·", f)
    else:
        print(f"\nCarrusel completo (9 láminas) en: {OUT}")


if __name__ == "__main__":
    main()
