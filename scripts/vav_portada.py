#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Portada/thumbnail 1080x1920 de la letra Vav (español primero, ו de apoyo)."""
import os
from PIL import Image, ImageDraw, ImageFilter
import vav_video as V

OUT = "/Users/mardan/jashmal_vav_work/vav_PORTADA.png"

ctx = V.build_static()
base = V.compose(4.7, ctx).convert("RGBA")   # héroe: shaft + Vav dorada dibujada

# scrim extra para el texto (arriba y abajo)
d = ImageDraw.Draw(base)

def text_c(y, s, font, color, glow=0, spaced=False):
    if spaced and len(s) <= 30:
        s = " ".join(list(s))
    if glow:
        g = Image.new("RGBA", base.size, (0, 0, 0, 0)); gd = ImageDraw.Draw(g)
        gd.text((V.W//2, y), s, font=font, fill=(*color, 180), anchor="ma")
        gb = g.filter(ImageFilter.GaussianBlur(glow)); base.alpha_composite(gb)
    dd = ImageDraw.Draw(base)
    dd.text((V.W//2+3, y+3), s, font=font, fill=(0, 0, 0, 170), anchor="ma")
    dd.text((V.W//2, y), s, font=font, fill=(*color, 255), anchor="ma")

# refuerzo de scrim inferior para el gancho
grad = Image.new("L", (1, V.H), 0)
top = int(V.H*0.60)
for y in range(V.H):
    grad.putpixel((0, y), 0 if y < top else int(200*(y-top)/(V.H-top)))
blk = Image.new("RGBA", base.size, (3, 3, 8, 255)); blk.putalpha(grad.resize(base.size))
base.alpha_composite(blk)

# kicker superior
text_c(150, "EL ALFABETO DE LA LUZ", V.cinzel6(44), V.GOLD, spaced=True)
text_c(214, "ו", V.heb(70), V.GOLDB)

# gancho inferior (una idea)
text_c(1420, "LA ÚNICA LETRA", V.cinzel(78), V.CREAM, glow=10)
# «Y» en dorado
line2 = "QUE SIGNIFICA"
text_c(1522, line2, V.cinzel(78), V.CREAM, glow=10)
# la «Y» grande dorada como remate
text_c(1636, "«Y»", V.cinzel(150), V.GOLDB, glow=22)

# marca inferior
text_c(1852, "jashmal.org", V.corm_i(46), V.GOLD)

base.convert("RGB").save(OUT)
print("ok", OUT)
