#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PORTADA de story de Instagram para Shamati 27 («El Señor es excelso, y los
inferiores lo verán»). Mismo formato que la del 23-24 (shamati23_24_story.py):
PODCAST · JASHMAL / pregunta / imagen / SHAMATI · BAAL HASULAM / jashmal.org.

Diferencia: la imagen de Mardan (barranco con el haz de luz) es a sangre,
ocupa todo el alto. El haz entra por arriba, justo detrás del título, así que
en vez de un rectángulo se usa un degradado suave: el título se lee y la luz
sigue bajando por detrás.

LAYOUT (1080x1920):
      0 – 250   zona muerta (nombre, foto, X, barra de progreso)
    250 – 600   PODCAST · JASHMAL + título
   ~1260 – 1430 la persona en el fondo del barranco (medido)
   1480 – 1575  marca
   1580 – 1920  zona muerta (responder, compartir)
"""
import os, sys
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, "/Users/mardan/jashmal-produccion/marca-instagram")
import jashmal_brand as B

STORY = "/Users/mardan/jashmal-produccion/podcast/shamati-27/story"
FOTO = os.path.join(STORY, "barranco-luz.png")
OUT = os.path.join(STORY, "portada-story-shamati27.png")
W, H = 1080, 1920

TITULO = ["TE DESPRECIAN", "Y NO LO ELEGISTE.", "¿ESO ES HUMILDAD?"]


def fondo():
    im = Image.open(FOTO).convert("RGB")
    esc = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * esc), round(im.height * esc)), Image.LANCZOS)
    x0, y0 = (im.width - W) // 2, (im.height - H) // 2
    return im.crop((x0, y0, x0 + W, y0 + H))


def degradado(y_lleno, y_fin, alfa, arriba=True):
    """Velo negro que va de `alfa` a 0 entre y_lleno e y_fin."""
    c = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(c)
    for y in range(H):
        if arriba:
            a = alfa if y <= y_lleno else (alfa * max(0, (y_fin - y)) / (y_fin - y_lleno) if y < y_fin else 0)
        else:
            a = alfa if y >= y_lleno else (alfa * max(0, (y - y_fin)) / (y_lleno - y_fin) if y > y_fin else 0)
        d.line([(0, y), (W, y)], fill=(5, 5, 10, int(a)))
    return c


def texto_con_sombra(base, xy, txt, font, color, radio=6):
    sombra = Image.new("RGBA", base.size, (0, 0, 0, 0))
    ImageDraw.Draw(sombra).text(xy, txt, font=font, fill=(0, 0, 0, 230))
    sombra = sombra.filter(ImageFilter.GaussianBlur(radio))
    base.alpha_composite(sombra)
    ImageDraw.Draw(base).text(xy, txt, font=font, fill=color)


def main():
    c = fondo().convert("RGBA")
    c.alpha_composite(degradado(560, 760, 175, arriba=True))
    c.alpha_composite(degradado(1600, 1440, 200, arriba=False))
    d = ImageDraw.Draw(c)

    f6 = B.cinzel6(34)
    k = "PODCAST · JASHMAL"
    texto_con_sombra(c, ((W - d.textlength(k, font=f6)) / 2, 272), k, f6, B.GOLD)

    y = 344
    for ln in TITULO:
        f = B.cinzel(62)
        while d.textlength(ln, font=f) > W - 120 and f.size > 34:
            f = B.cinzel(f.size - 2)
        texto_con_sombra(c, ((W - d.textlength(ln, font=f)) / 2, y), ln, f, B.CREAM)
        y += f.size + 14

    fe = B.cinzel6(27)
    e = "SHAMATI 27 · BAAL HASULAM"
    texto_con_sombra(c, ((W - d.textlength(e, font=fe)) / 2, 1478), e, fe, (170, 148, 100), 4)
    fi = B.corm_i(42)
    s = "jashmal.org"
    texto_con_sombra(c, ((W - d.textlength(s, font=fi)) / 2, 1516), s, fi, B.GOLD, 4)

    c.convert("RGB").save(OUT)
    print("OK →", OUT, "· título termina en y =", y)


if __name__ == "__main__":
    main()
