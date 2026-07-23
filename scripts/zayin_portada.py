#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Portada de la letra Zayin (ז) — PLANTILLA A oficial.
Calcada del montaje de texto de la Vav (mismo kicker, mismas posiciones,
misma tipografía Cinzel, mismo sello dorado del grid) pero con la ז.

La ESCENA cinematográfica la hace Mardan en GPT (espada=corona, pilar de luz
coronado, nubes de tormenta arriba, mandala abajo — estilo Vav). Este script
SOLO monta el texto encima. Las imágenes viejas de Zain (fuego plano) NO se usan.

Cómo usarlo:
  1. Mardan guarda su escena limpia (sin texto) en:
       ~/jashmal-produccion/zayin/portada-scenes/zayin_escena.png
  2. Corre:  python3 scripts/zayin_portada.py
  3. Sale:   ~/jashmal-produccion/zayin/zayin_PORTADA.png
"""
import os, sys

MARCA = "/Users/mardan/jashmal-produccion/marca-instagram"
sys.path.insert(0, MARCA)
import plantilla_A_letra as A  # noqa: E402

ZDIR   = "/Users/mardan/jashmal-produccion/zayin"
ESCENA = os.path.join(ZDIR, "portada-scenes", "zayin_escena.png")
SALIDA = os.path.join(ZDIR, "zayin_PORTADA.png")

# Gancho de UNA idea (verificado por el Sofer): la letra-arma que también es corona.
KICKER = "EL ALFABETO DE LA LUZ"
GANCHO = ["LA LETRA", "QUE ES ESPADA"]
REMATE = "Y CORONA"


def main():
    os.makedirs(os.path.dirname(ESCENA), exist_ok=True)
    if not os.path.isfile(ESCENA):
        print("Falta la escena cinematográfica de la Zayin.")
        print(f"Guarda tu imagen de GPT (sin texto, 9:16) en:\n  {ESCENA}")
        print("Luego vuelve a correr este comando.")
        sys.exit(2)
    out = A.build_A(
        escena=ESCENA,
        letra_es="ZAYIN",
        letra_heb="ז",
        kicker=KICKER,
        gancho_lineas=GANCHO,
        remate=REMATE,
        salida=SALIDA,
    )
    print("ok", out)


if __name__ == "__main__":
    main()
