#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · YOM KIPUR 5787 · PORTADAS de los dos reels
1080 x 1920 cada una.

FÓRMULA DE LA CASA (la que hizo pegar la portada de LM I:3):
  sujeto vivo + mucho negro + motivo tenue + marco Cinzel dorado.

DIFERENCIA CON LAS PORTADAS ANTERIORES — el texto va ABAJO.
En Rosh Hashaná el titular iba arriba porque el sujeto estaba en la mitad
inferior del fotograma. Aquí es al revés: los dos fondos (a8 y f7) se
pidieron con el sujeto ARRIBA y el tercio inferior vacío, justamente para
poder montar el rótulo sin taparlo. Así que el velo denso va abajo y el
titular se apoya sobre negro limpio.

TEXTO — español primero, siempre; la audiencia no lee hebreo. Sin hebreo
en ninguna de las dos: en miniatura no se lee y roba sitio al titular.

Los dos titulares nombran el tema en la propia portada, para quien no
sepa nada de judaísmo, y prometen una anomalía comprobable —no
esoterismo—: «no es una oración, es un tribunal» y «la Torá nunca dice
ayunar».

USO:  python3 scripts/yk_portadas.py          # las dos que pueda
      python3 scripts/yk_portadas.py --a      # solo Kol Nidrei
      python3 scripts/yk_portadas.py --b      # solo Cinco
"""
import os, sys
from PIL import Image, ImageDraw
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

NDIR = "/Users/mardan/jashmal-produccion/yom-kipur"
V.FONTS = os.path.join(NDIR, "fonts")
IMG  = os.path.join(NDIR, "img")

W, H = 1080, 1920
ANTETIT = "T I E M P O S   S A G R A D O S  ·  Y O M   K I P U R"

PIEZAS = {
    "a": dict(
        fondo="a8_portada_fondo.png",
        salida="YOM-KIPUR-A-portada.png",
        # VERSIÓN 2. La portada es lo PRIMERO que ve un desconocido en el
        # feed, así que obedece la misma regla que el reel: primero la
        # experiencia que ya tiene, y el nombre litúrgico al pie. La v1
        # decía «KOL NIDREI / NO ES UNA ORACIÓN / ES UN TRIBUNAL», que
        # nombraba en el segundo cero algo que nadie conoce.
        titulo=["UNA PROMESA", "QUE TE HICISTE", "Y NO CUMPLISTE"],
        oro=2,                       # la línea que gana el pulso visual
        bajada="El día más serio del año judío empieza desatándola",
        nota="Kol Nidrei · Yom Kipur",
    ),
    "b": dict(
        fondo="f7_portada_fondo.png",
        salida="YOM-KIPUR-B-portada.png",
        # VERSIÓN 2, por la misma razón: entra por el cuerpo del que mira.
        titulo=["HAY ALGO EN TI", "QUE NO TIENE PAREJA"],
        oro=1,
        bajada="Todo en tu cuerpo viene de a dos. Menos una cosa.",
        nota="Las cinco almas de Yom Kipur",
    ),
}


def portada(clave):
    p = PIEZAS[clave]
    fondo = os.path.join(IMG, p["fondo"])
    if not os.path.isfile(fondo):
        print(f"  [{clave}] falta {p['fondo']} en img/ — se salta")
        return None

    base = Image.open(fondo).convert("RGB")
    iw, ih = base.size
    s = max(W / iw, H / ih)
    base = base.resize((round(iw * s), round(ih * s)), Image.LANCZOS)
    base = base.crop(((base.width - W) // 2, (base.height - H) // 2,
                      (base.width - W) // 2 + W, (base.height - H) // 2 + H))
    img = base.convert("RGBA")

    # Velo general suave + velo denso SOLO en la mitad de abajo, que es
    # donde se apoya el titular. Arriba se deja respirar el sujeto.
    img.alpha_composite(Image.new("RGBA", (W, H), (4, 4, 9, 96)))
    grad = Image.new("L", (1, H))
    for y in range(H):
        t = max(0.0, (y - H * 0.34) / (H * 0.40))
        grad.putpixel((0, y), int(190 * min(1.0, t)))
    velo = Image.new("RGBA", (W, H), (3, 3, 8, 255))
    velo.putalpha(grad.resize((W, H)))
    img.alpha_composite(velo)

    d = ImageDraw.Draw(img)

    # marco de marca
    d.rectangle([(38, 38), (W - 38, H - 38)], outline=(*V.GOLD, 130), width=3)

    # antetítulo de la serie
    d.text((W // 2, 118), ANTETIT, font=V.cinzel6(30),
           fill=(*V.GOLD, 225), anchor="ma")
    d.line([(W // 2 - 150, 174), (W // 2 + 174 - 174, 174)],
           fill=(*V.GOLD, 150), width=2)
    d.line([(W // 2 - 150, 174), (W // 2 + 150, 174)],
           fill=(*V.GOLD, 150), width=2)

    # ── TITULAR, apoyado sobre el negro de abajo
    y = 1150 if len(p["titulo"]) == 3 else 1250
    for i, ln in enumerate(p["titulo"]):
        f = V._fit_font(ln, 112, W - 190)
        color = V.GOLDB if i == p["oro"] else V.CREAM
        d.text((W // 2 + 4, y + 4), ln, font=f, fill=(0, 0, 0, 200), anchor="ma")
        d.text((W // 2, y), ln, font=f, fill=(*color, 255), anchor="ma")
        y += int(f.size * 1.16)

    # ── bajada
    y += 30
    d.line([(W // 2 - 96, y), (W // 2 + 96, y)], fill=(*V.GOLD, 170), width=2)
    y += 32
    for ln in _wrap(d, p["bajada"], V.corm_i(48), W - 220):
        d.text((W // 2 + 2, y + 2), ln, font=V.corm_i(48),
               fill=(0, 0, 0, 190), anchor="ma")
        d.text((W // 2, y), ln, font=V.corm_i(48),
               fill=(*V.CREAM, 240), anchor="ma")
        y += 58
    y += 16
    d.text((W // 2, y), p["nota"], font=V.corm_i(42),
           fill=(*V.GOLD, 225), anchor="ma")

    # firma
    d.text((W // 2, H - 104), "jashmal.org", font=V.corm_i(40),
           fill=(*V.GOLD, 215), anchor="ma")

    out = os.path.join(NDIR, p["salida"])
    img.convert("RGB").save(out, quality=96)
    print("  portada ->", out)
    return out


def _wrap(d, text, font, maxw):
    lineas, cur = [], ""
    for w in text.split():
        t = (cur + " " + w).strip()
        if d.textlength(t, font=font) <= maxw or not cur:
            cur = t
        else:
            lineas.append(cur); cur = w
    if cur:
        lineas.append(cur)
    return lineas


if __name__ == "__main__":
    claves = [c for c in ("a", "b") if f"--{c}" in sys.argv] or ["a", "b"]
    for c in claves:
        portada(c)
