#!/usr/bin/env python3
# Tarjeta de cierre "Shabat Shalom" con menorá — estética Jashmal.
# Reutilizable para los videos del Shabat. 1080x1920 (TikTok/Reels).
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import random, os

S = 2                      # supersample para antialias
W, H = 1080*S, 1920*S
GOLD        = (201,164,62)   # #c9a43e
GOLD_BRIGHT = (232,198,112)
FLAME       = (255,206,120)
FLAME_CORE  = (255,242,206)
BG          = (5,5,10)       # #05050a
cX = W//2

def load(paths, size, index=0):
    for p in paths:
        try:
            return ImageFont.truetype(p, size, index=index)
        except Exception:
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

F_HEB  = load(["/System/Library/Fonts/Supplemental/NewPeninimMT.ttc",
               "/System/Library/Fonts/Supplemental/Times New Roman.ttf"], 150*S)
F_HEB_SM = load(["/System/Library/Fonts/Supplemental/NewPeninimMT.ttc",
                 "/System/Library/Fonts/Supplemental/Times New Roman.ttf"], 34*S)
F_LAT  = load(["/System/Library/Fonts/Supplemental/Didot.ttc",
               "/System/Library/Fonts/Supplemental/Baskerville.ttc",
               "/System/Library/Fonts/Supplemental/Georgia.ttf"], 60*S)
F_BRAND= load(["/System/Library/Fonts/Supplemental/Didot.ttc",
               "/System/Library/Fonts/Supplemental/Georgia.ttf"], 30*S)

img = Image.new("RGB", (W, H), BG)

# ── campo estelar tenue ──
rnd = random.Random(7)
sd = ImageDraw.Draw(img)
for _ in range(160):
    x, y = rnd.randint(0, W), rnd.randint(0, H)
    r = rnd.randint(1, 2*S); a = rnd.randint(8, 26)
    sd.ellipse([x-r, y-r, x+r, y+r], fill=(8+a, 8+int(a*0.85), 12+int(a*0.4)))

# ── resplandor dorado radial detrás de la menorá ──
gm = Image.new("L", (W, H), 0)
gd = ImageDraw.Draw(gm)
gcy = int(H*0.42)
for i in range(64, 0, -1):
    rx = int(W*0.62*i/64); ry = int(W*0.72*i/64)
    gd.ellipse([cX-rx, gcy-ry, cX+rx, gcy+ry], fill=int(64*(i/64)**2.2))
gm = gm.filter(ImageFilter.GaussianBlur(38*S))
gold_layer = Image.new("RGBA", (W, H), (150,112,42,0)); gold_layer.putalpha(gm)
img = Image.alpha_composite(img.convert("RGBA"), gold_layer).convert("RGB")

# ── glow de las llamas (capa difusa) ──
lampY = int(H*0.385)
baseY = int(H*0.585)
dxs = [int(W*0.085)*k for k in (1,2,3)]
lampxs = [cX]
for dx in dxs:
    lampxs += [cX-dx, cX+dx]
glowL = Image.new("RGBA", (W, H), (0,0,0,0))
gl = ImageDraw.Draw(glowL)
for lx in lampxs:
    fy = lampY - 34*S
    gl.ellipse([lx-40*S, fy-52*S, lx+40*S, fy+34*S], fill=(255,196,96,120))
glowL = glowL.filter(ImageFilter.GaussianBlur(18*S))
img = Image.alpha_composite(img.convert("RGBA"), glowL).convert("RGB")

# ── menorá (oro) ──
d = ImageDraw.Draw(img)
LW = 13*S
# tallo central
d.line([(cX, lampY), (cX, baseY)], fill=GOLD, width=LW)
# brazos = arcos de cuarto de elipse (3 por lado), todos llegan a lampY
for dx in dxs:
    bbox = [cX-dx, 2*lampY-baseY, cX+dx, baseY]
    d.arc(bbox, 0,   90,  fill=GOLD, width=LW)   # brazo derecho: derecha→abajo
    d.arc(bbox, 90,  180, fill=GOLD, width=LW)   # brazo izquierdo: abajo→izquierda
# base (pie de la menorá)
d.line([(cX, baseY), (cX, baseY+50*S)], fill=GOLD, width=LW)
d.line([(cX-70*S, baseY+78*S), (cX+70*S, baseY+78*S)], fill=GOLD, width=LW+4*S)
d.line([(cX-44*S, baseY+50*S), (cX+44*S, baseY+50*S)], fill=GOLD, width=LW)

# copas + llamas
for lx in lampxs:
    d.rounded_rectangle([lx-19*S, lampY-9*S, lx+19*S, lampY+7*S], radius=6*S, fill=GOLD_BRIGHT)
    fy = lampY - 30*S
    d.ellipse([lx-10*S, fy-24*S, lx+10*S, fy+12*S], fill=FLAME)
    d.ellipse([lx-4*S,  fy-13*S, lx+4*S,  fy+8*S],  fill=FLAME_CORE)

# ── textos ──
def center_text(draw, y, text, font, fill, track=0):
    if track == 0:
        bb = draw.textbbox((0,0), text, font=font)
        w = bb[2]-bb[0]
        draw.text((cX - w//2 - bb[0], y), text, font=font, fill=fill)
    else:
        # letter-spacing manual (para mayúsculas elegantes)
        widths = [draw.textlength(ch, font=font) for ch in text]
        total = sum(widths) + track*(len(text)-1)
        x = cX - total/2
        for ch, w in zip(text, widths):
            draw.text((x, y), ch, font=font, fill=fill)
            x += w + track

# Hebreo "שבת שלום" — invertido para RTL correcto en PIL
heb = "שבת שלום"[::-1]
center_text(d, int(H*0.135), heb, F_HEB, GOLD_BRIGHT)
# Latino elegante en mayúsculas con tracking
center_text(d, int(H*0.66), "SHABAT SHALOM", F_LAT, GOLD, track=10*S)
# marca abajo (hebreo sin nikud para que no se rompa al invertir)
center_text(d, int(H*0.915), "חשמל"[::-1], F_HEB_SM, (188,156,92), track=2*S)
center_text(d, int(H*0.945), "J A S H M A L", F_BRAND, (172,142,84), track=8*S)

# ── downscale con antialias ──
out = img.resize((1080, 1920), Image.LANCZOS)
os.makedirs("/Users/mardan/Desktop/jashmal-videos/_shabat", exist_ok=True)
p1 = "/Users/mardan/Desktop/jashmal-videos/_shabat/SHABAT_SHALOM_card.png"
out.save(p1, "PNG")
print("guardado:", p1)
