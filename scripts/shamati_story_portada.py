#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
PORTADAS de story de Instagram para los episodios de Shamati, en el formato
de la del 27 (scripts/shamati27_story.py): imagen de Mardan a sangre, velo
oscuro degradado arriba (título) y abajo (marca).

Cada episodio tiene su desplazamiento vertical `dy` (px, positivo = baja la
imagen), MEDIDO sobre el brillo por filas: el sujeto no debe quedar bajo el
título (250-600). Lo que queda descubierto se rellena de negro de la casa.

Uso:  python3 shamati_story_portada.py 28-29     (o 30-31, 33-1, 33-2, 33-3, todos)
"""
import os, sys
from PIL import Image, ImageDraw, ImageFilter

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, "/Users/mardan/jashmal-produccion/marca-instagram")
import jashmal_brand as B
from shamati27_story import degradado, texto_con_sombra

P = "/Users/mardan/jashmal-produccion/podcast"
W, H = 1080, 1920

EPISODIOS = {
    "28-29": dict(dir=f"{P}/shamati-28-29/story", foto="paloma-reflejo.png", dy=0,
                  titulo=["HICISTE ALGO BUENO.", "DE NOCHE VISTE", "QUE ERA PARA QUE TE VIERAN."],
                  marca="SHAMATI 28 Y 29 · BAAL HASULAM"),
    "30-31": dict(dir=f"{P}/shamati-30-31/story", foto="algarrobo.png", dy=150,
                  titulo=["TRABAJAS TODO EL DÍA", "Y SIENTES QUE", "NADA QUEDA EN PIE"],
                  marca="SHAMATI 30 Y 31 · BAAL HASULAM"),
    "32": dict(dir=f"{P}/shamati-32/story", foto="urna-suertes.png", dy=240,
               titulo=["EMPEZASTE POR INTERÉS", "Y TE DIERON MÁS.", "«NO TE LO MERECES»"],
               marca="SHAMATI 32 · BAAL HASULAM"),
    "33-1": dict(dir=f"{P}/shamati-33/parte-1/story", foto="manto-labrador.png", dy=190,
                 titulo=["SI ÉL ES BUENO,", "¿POR QUÉ ESTO?"],
                 marca="SHAMATI 33 · PARTE 1 DE 3 · BAAL HASULAM"),
    "33-2": dict(dir=f"{P}/shamati-33/parte-2/story", foto="huso-dos-hebras.png", dy=360,
                 titulo=["UNA FRASE AJENA", "SE TE QUEDÓ ADENTRO.", "¿TAMBIÉN ES TUYA?"],
                 marca="SHAMATI 33 · PARTE 2 DE 3 · BAAL HASULAM"),
    "33-3": dict(dir=f"{P}/shamati-33/parte-3/story", foto="vasija-rueda.png", dy=70,
                 titulo=["LO HACES TODO BIEN", "Y NO SIENTES ALEGRÍA"],
                 marca="SHAMATI 33 · PARTE 3 DE 3 · BAAL HASULAM"),
    "34-1": dict(dir=f"{P}/shamati-34/parte-1/story", foto="farol-apagado.png", dy=130,
                 titulo=["SE FUE LA LUZ", "Y POR FIN LA VISTE"],
                 marca="SHAMATI 34 · PARTE 1 DE 2 · BAAL HASULAM"),
    "34-2": dict(dir=f"{P}/shamati-34/parte-2/story", foto="silla-vacia.png", dy=200,
                 titulo=["TE OÍSTE DECIR", "«ESTE MUNDO", "NO TIENE DUEÑO»"],
                 marca="SHAMATI 34 · PARTE 2 DE 2 · BAAL HASULAM"),
    "35-1": dict(dir=f"{P}/shamati-35/parte-1/story", foto="chancleta-orilla.png", dy=0,
                 titulo=["EL MAR SE LO TRAGA TODO,", "Y LO DEVUELVE"],
                 marca="SHAMATI 35 · PARTE 1 DE 2 · BAAL HASULAM"),
    "35-2": dict(dir=f"{P}/shamati-35/parte-2/story", foto="album-fotos.png", dy=0,
                 titulo=["FOTOS VIEJAS UN DOMINGO:", "LA VIDA QUE", "TOMAS PRESTADA"],
                 marca="SHAMATI 35 · PARTE 2 DE 2 · BAAL HASULAM"),
    # Apunte 37, en tres partes. Las imágenes son grabado dorado sobre negro,
    # no fotografía: el tercio de arriba ya viene limpio y casi no hay que
    # bajarlas. Los `dy` están MEDIDOS sobre el brillo por filas del fondo ya
    # escalado a 1080x1920 — es lo único que decide si el título cae encima
    # del objeto:
    #   p1 la balanza empieza a dar luz en y=500 y el título termina en 482:
    #      60 px de aire para que no se rocen.
    #   p2 las cabras no aparecen hasta y=650: no hay nada que bajar.
    #   p3 el haz de la carta entra en y=400, dentro del título; 120 px lo
    #      mandan por debajo y del resto se encarga el velo degradado.
    "37-1": dict(dir=f"{P}/shamati-37/parte-1/story", foto="balanza-pan-copa.png", dy=60,
                 titulo=["NADIE TE OBLIGÓ", "A ENTENDER"],
                 marca="SHAMATI 37 · PARTE 1 DE 3 · BAAL HASULAM"),
    "37-2": dict(dir=f"{P}/shamati-37/parte-2/story", foto="dos-suertes.png", dy=0,
                 titulo=["REZABAS PORQUE", "NO TE QUEDABA OTRA.", "¿Y AHORA QUE SÍ?"],
                 marca="SHAMATI 37 · PARTE 2 DE 3 · BAAL HASULAM"),
    "37-3": dict(dir=f"{P}/shamati-37/parte-3/story", foto="carta-sellada.png", dy=120,
                 titulo=["LAS DOS SALIDAS", "CUESTAN"],
                 marca="SHAMATI 37 · PARTE 3 DE 3 · BAAL HASULAM"),
}


def fondo(ruta, dy):
    im = Image.open(ruta).convert("RGB")
    esc = max(W / im.width, H / im.height)
    im = im.resize((round(im.width * esc), round(im.height * esc)), Image.LANCZOS)
    x0, y0 = (im.width - W) // 2, (im.height - H) // 2
    im = im.crop((x0, y0, x0 + W, y0 + H))
    lienzo = Image.new("RGB", (W, H), (5, 5, 10))
    if dy > 0:
        # Fundido del borde superior: si la imagen trae luz hasta arriba
        # (el haz de la urna del 32), al bajarla quedaba una línea recta.
        mask = Image.new("L", (W, H), 255)
        dm = ImageDraw.Draw(mask)
        rampa = 260
        for y in range(rampa):
            dm.line([(0, y), (W, y)], fill=int(255 * (y / rampa) ** 1.6))
        lienzo.paste(im, (0, dy), mask)
    else:
        lienzo.paste(im, (0, dy))
    return lienzo


def capa_texto(cfg, con_velos=True):
    c = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    if con_velos:
        c.alpha_composite(degradado(600, 800, 185, arriba=True))
        c.alpha_composite(degradado(1620, 1360, 238, arriba=False))
    d = ImageDraw.Draw(c)
    f6 = B.cinzel6(34)
    k = "PODCAST · JASHMAL"
    texto_con_sombra(c, ((W - d.textlength(k, font=f6)) / 2, 272), k, f6, B.GOLD)
    y = 344
    for ln in cfg["titulo"]:
        f = B.cinzel(62)
        while d.textlength(ln, font=f) > W - 120 and f.size > 34:
            f = B.cinzel(f.size - 2)
        texto_con_sombra(c, ((W - d.textlength(ln, font=f)) / 2, y), ln, f, B.CREAM)
        y += f.size + 14
    if y > 620:
        sys.exit(f"Título demasiado alto (termina en y={y})")
    # Sombra difusa detrás de la marca: algunas imágenes (cuerda del huso,
    # surcos del labrador) siguen siendo claras en esa franja.
    halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(halo).rounded_rectangle([150, 1462, W - 150, 1582], 60, fill=(5, 5, 10, 200))
    c.alpha_composite(halo.filter(ImageFilter.GaussianBlur(22)))
    fe = B.cinzel6(27)
    e = cfg["marca"]
    while d.textlength(e, font=fe) > W - 140 and fe.size > 20:
        fe = B.cinzel6(fe.size - 1)
    texto_con_sombra(c, ((W - d.textlength(e, font=fe)) / 2, 1478), e, fe, (170, 148, 100), 4)
    fi = B.corm_i(42)
    s = "jashmal.org"
    texto_con_sombra(c, ((W - d.textlength(s, font=fi)) / 2, 1516), s, fi, B.GOLD, 4)
    return c, y


def hacer(clave):
    cfg = EPISODIOS[clave]
    c = fondo(os.path.join(cfg["dir"], cfg["foto"]), cfg["dy"]).convert("RGBA")
    capa, y = capa_texto(cfg)
    c.alpha_composite(capa)
    out = os.path.join(cfg["dir"], f"portada-story-shamati{clave}.png")
    c.convert("RGB").save(out)
    print(f"OK {clave} → {out} (título hasta y={y})")
    return out


if __name__ == "__main__":
    claves = list(EPISODIOS) if sys.argv[1:] in ([], ["todos"]) else sys.argv[1:]
    for k in claves:
        hacer(k)
