#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Pone "שבת שלום / Shabat Shalom" sutil sobre la menorá de Midjourney → tarjeta de cierre.
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, glob

SRC = max(glob.glob(os.path.expanduser("~/Downloads/*menorah*.png")) +
          glob.glob(os.path.expanduser("~/Downloads/*Temple_menorah*.png")), key=os.path.getmtime)
OUTDIR = os.path.expanduser("~/Desktop/jashmal-videos/_shabat")
os.makedirs(OUTDIR, exist_ok=True)

img = Image.open(SRC).convert("RGB").resize((1080, 1920), Image.LANCZOS)
# guarda también versión LIMPIA (sin texto) por si Mardan la prefiere
img.save(os.path.join(OUTDIR, "SHABAT_card_mj_clean.png"), "PNG")

GOLD = (216, 180, 100)
F_HEB = ImageFont.truetype("/System/Library/Fonts/Supplemental/NewPeninimMT.ttc", 92, index=0)
F_LAT = ImageFont.truetype("/System/Library/Fonts/Supplemental/Didot.ttc", 42)

# leve oscurecido en la franja inferior para asentar el texto (no tapa la menorá)
veil = Image.new("L", (1080, 1920), 0)
vd = ImageDraw.Draw(veil)
for i in range(1480, 1920):
    a = int(150 * (i - 1480) / (1920 - 1480))
    vd.line([(0, i), (1080, i)], fill=a)
img = Image.composite(Image.new("RGB", (1080, 1920), (3, 3, 7)), img, veil)

d = ImageDraw.Draw(img)
def center(y, text, font, track=0):
    if track == 0:
        w = d.textlength(text, font=font); x = 540 - w / 2
        d.text((x + 2, y + 3), text, font=font, fill=(0, 0, 0))      # sombra
        d.text((x, y), text, font=font, fill=GOLD)
    else:
        ws = [d.textlength(c, font=font) for c in text]
        total = sum(ws) + track * (len(text) - 1); x = 540 - total / 2
        for c, w in zip(text, ws):
            d.text((x + 1, y + 2), c, font=font, fill=(0, 0, 0))
            d.text((x, y), c, font=font, fill=GOLD); x += w + track

center(1560, "שבת שלום"[::-1], F_HEB)
center(1672, "SHABAT SHALOM", F_LAT, track=9)

out = os.path.join(OUTDIR, "SHABAT_card_mj.png")
img.save(out, "PNG")
print("fuente:", os.path.basename(SRC))
print("guardado:", out)
