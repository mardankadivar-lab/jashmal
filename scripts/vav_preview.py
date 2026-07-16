#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Contact sheet de cuadros clave del video Vav (usa compose() del módulo)."""
import sys
from PIL import Image
import vav_video as V

ctx = V.build_static()
TS = [2.6, 4.5, 8.0, 16.5, 24.0, 30.0, 35.5, 41.0, 47.0, 55.5]
th = []
for t in TS:
    im = V.compose(t, ctx); im.thumbnail((300, 533)); th.append((t, im))
pad, cw, chh = 12, 300, 533
Wm = len(th)*(cw+pad)+pad; Hm = chh+pad*2+22
sheet = Image.new("RGB", (Wm, Hm), (15, 15, 20))
from PIL import ImageDraw
d = ImageDraw.Draw(sheet); x = pad
for t, im in th:
    sheet.paste(im, (x, pad)); d.text((x+6, chh+pad+2), f"t={t}s", fill=(200, 180, 120)); x += cw+pad
out = "/private/tmp/claude-501/-Users-mardan-workspace-jashmal/b985216c-5e97-4392-828c-142f80a12a78/scratchpad/vav_preview.png"
sheet.save(out); print("ok", out)
