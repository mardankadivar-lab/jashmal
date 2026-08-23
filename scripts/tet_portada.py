#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Portada de la letra Tet (ט) — PLANTILLA A oficial, en DOS lienzos:
  · 4:5  (1080x1350)  → feed de Instagram  (pieza principal)
  · 9:16 (1080x1920)  → story / TikTok     (idéntica a la Vav/Zayin)

La ESCENA cinematográfica la hace Mardan en GPT (vasija de luz dorada cerrada,
nubes de tormenta + rayos divinos, mandala — estilo Vav, SIN texto y SIN
tipografía hebrea). Este script SOLO monta el texto encima.

El 9:16 usa build_A tal cual (números históricos exactos). El 4:5 usa el
MISMO layout con el bloque del gancho anclado al pie (y = H-480, como en
9:16 donde 1440 = 1920-480): así la plantilla no se fuerza fuera de lienzo
y sellar() aplica solo la regla de cartela en la firma.

Cómo usarlo:
  1. Mardan guarda su escena limpia (sin texto, 9:16) en:
       ~/jashmal-produccion/tet/img/t8_portada.png
  2. Corre:  python3 scripts/tet_portada.py
  3. Sale:   ~/jashmal-produccion/tet/tet_PORTADA_45.png   (feed)
             ~/jashmal-produccion/tet/tet_PORTADA_916.png  (story)
"""
import os, sys

MARCA = "/Users/mardan/jashmal-produccion/marca-instagram"
sys.path.insert(0, MARCA)
import jashmal_brand as B          # noqa: E402
import plantilla_A_letra as A      # noqa: E402

TDIR   = "/Users/mardan/jashmal-produccion/tet"
ESCENA = os.path.join(TDIR, "img", "t8_portada.png")

# Gancho de UNA idea (verificado por el Sofer): la letra más cerrada
# del alfabeto es la inicial de טוב, "bueno".
KICKER = "EL ALFABETO DE LA LUZ"
GANCHO = ["LA LETRA", "MÁS CERRADA ES"]
REMATE = "«BUENA»"


def build_A_pie(escena, letra_es, letra_heb, kicker, gancho_lineas, salida,
                remate=None):
    """Plantilla A con el gancho anclado al PIE del lienzo actual.
    En 9:16 reproduce exactamente los números oficiales (1920-480 = 1440)."""
    base = B.cargar_escena(escena)
    B.scrim(base, top_frac=0.55, top_alpha=205, head_frac=0.22, head_alpha=170)
    B.texto_centrado(base, 168, kicker, B.cinzel6(46), B.GOLD, spaced=True)
    B.texto_centrado(base, 236, letra_heb, B.heb(78), B.GOLDB)
    B.texto_centrado(base, 300, f"LA {letra_es}".upper(),
                     B.cinzel(150), B.CREAM, glow=14)
    y = B.H - 480
    for ln in gancho_lineas:
        B.texto_centrado(base, y, ln.upper(), B.cinzel(78), B.CREAM, glow=10)
        y += 104
    if remate:
        B.texto_centrado(base, y + 18, remate, B.cinzel(150), B.GOLDB, glow=22)
    B.sellar(base)
    return B.guardar(base, salida)


def main():
    if not os.path.isfile(ESCENA):
        print("Falta la escena cinematográfica de la portada.")
        print(f"Guarda tu imagen de GPT (sin texto, 9:16) en:\n  {ESCENA}")
        print("Luego vuelve a correr este comando.")
        sys.exit(2)

    # 4:5 — feed (pieza principal)
    B.set_lienzo("4:5")
    out45 = build_A_pie(ESCENA, "TET", "ט", KICKER, GANCHO,
                        os.path.join(TDIR, "tet_PORTADA_45.png"), remate=REMATE)
    print("ok", out45)

    # 9:16 — story / TikTok (plantilla oficial intacta)
    B.set_lienzo("9:16")
    out916 = A.build_A(ESCENA, "TET", "ט", KICKER, GANCHO,
                       os.path.join(TDIR, "tet_PORTADA_916.png"), remate=REMATE)
    print("ok", out916)


if __name__ == "__main__":
    main()
