#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Serie «Tiempos Sagrados» · Estudio 1 — ELUL
Reel "El nombre escondido" · vertical 9:16 (1080x1920, 30 fps).
Patrón kitavo_video.py / luces_video.py.

Motor: vav_video.py — Ken Burns sobre imágenes fijas + fundidos +
rótulos (español grande arriba, hebreo pequeño debajo, FrankRuhl+raqm
para que el niqqud salga bien) + subtítulos quemados sincronizados a la
voz de Martin + end-card oficial del portal dorado.

IMÁGENES: las 8 las hace MARDAN con GPT. Los briefs exactos están en
  ~/jashmal-produccion/tiempos-sagrados/elul/PROMPTS_GPT.txt
Este departamento NO genera imágenes. Se piden en 9:16 (1080x1920) y se
guardan como e1.png .. e8.png en .../elul/img/
Si alguna llega en 4:5, poner PAD_LAMINA = True.

Mapa FIJO de escenas (1 plano por tiempo de voz):
   T1  e1  manos sobre un pergamino en penumbra; cuatro chispas doradas
           se encienden sobre el renglón          (el nombre escondido)
   T2  e2  las cuatro chispas se desprenden y se alinean en una columna
           de luz                                  (el acróstico)
   T3  e3  dos corrientes en espejo sobre agua negra, una arranca de
           arriba y la otra de abajo               (6:3 frente a 2:16)
   T4  e4  un valle oscuro: el PRIMER hilo de luz sube desde abajo, y
           solo después baja la respuesta          (es ella la que empieza)
   T5  e5  el Rey coronado de pie en el campo de trigo; el palacio
           cerrado al fondo; el labrador encorvado, sin levantar la vista
   T6  e6  el monte con el sendero de escalones de luz que sube
   T7  e7  un único punto de luz suspendido en la oscuridad; de él nace
           toda la luz del encuadre                (la yud = acción)
   T8  e8  el mismo labrador de e5, ahora ERGUIDO, caminando hacia la luz
           del campo al amanecer                   (contraste exacto)

TIEMPOS REALES medidos del mp3 (audio/elul_timing.json):
  voz 76.25 s -> reel con end-card ~78.8 s. Nada hardcodeado: el
  timeline se deriva del timing.json en build_timeline().

FUENTES (todas del estudio verificado, app/[locale]/misterio/elul/data.ts):
  Shir HaShirim 6:3 · 2:16 · Malbim a 6:3 · Likutei Torá Re'eh 32b ·
  Tur Oraj Jaim 581 (Pirkei deRabí Eliezer) · Sefer Yetzirá (Gra) 5.

USO:
    python3 scripts/elul_voz.py                    # 1) voz + timing.json  [YA HECHO]
    # 2) Mardan coloca e1..e8.png en .../elul/img/
    python3 scripts/elul_video.py --test-titulos   # 3) revisar rótulos
    python3 scripts/elul_video.py                  # 4) render final

CORTE CORTO («El Rey en el campo», ~35 s, para el 1 de septiembre):
    python3 scripts/elul_video.py --corte-rey
  Recorta el reel ya renderizado entre T5 y T8 y le pega el end-card.
  Necesita el reel largo hecho primero.
"""
import os, sys, json, shutil, subprocess
from PIL import Image, ImageDraw
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

NDIR   = "/Users/mardan/jashmal-produccion/tiempos-sagrados/elul"
SALIDA = os.path.join(NDIR, "ELUL-nombre-escondido-reel.mp4")
CORTE  = os.path.join(NDIR, "ELUL-rey-en-el-campo-corto.mp4")
BUILD  = os.path.join(NDIR, "build")
FRAMES = os.path.join(BUILD, "frames")

# ── Overrides: rutas y assets de este reel ───────────────────────────────
V.IMG    = os.path.join(NDIR, "img")
V.FONTS  = os.path.join(NDIR, "fonts")
V.MP3    = os.path.join(NDIR, "audio", "elul_voz.mp3")
V.TIMING = os.path.join(NDIR, "audio", "elul_timing.json")
V.ENDCARD_PORTAL = os.path.join(NDIR, "jashmal_endcard_portal_ES.png")

V.VAV_END = -1.0     # no se dibuja ninguna letra encima del fondo
V.XF      = 0.6      # fundido entre planos

PAD_LAMINA = False   # True si las imágenes llegan en 4:5 en vez de 9:16
PAD        = 1.10

V.BG_FILES = {
    "pergamino": "e1.png",   # las cuatro chispas sobre el renglón
    "columna":   "e2.png",   # las cuatro iniciales en columna de luz
    "espejo":    "e3.png",   # las mismas palabras, al revés
    "primero":   "e4.png",   # el primer hilo sube desde abajo
    "rey":       "e5.png",   # el Rey en el campo / el labrador cabizbajo
    "monte":     "e6.png",   # los cuarenta escalones de luz
    "yud":       "e7.png",   # el punto suspendido = acción
    "amanecer":  "e8.png",   # el labrador erguido, caminando a la luz
}

# Un plano por tiempo de voz (1:1). El movimiento IMITA la idea:
SCENE_KEYS = [
    # (bg_key, z0, z1, pan)
    ("pergamino", 1.00, 1.10, (0,   0)),  # T1 · acercarse a lo escondido
    ("columna",   1.00, 1.09, (0, -35)),  # T2 · subir con la columna de luz
    ("espejo",    1.08, 1.00, (0,   0)),  # T3 · abrir: ver los dos a la vez
    ("primero",   1.00, 1.10, (0, -30)),  # T4 · subir con el primer hilo
    ("rey",       1.09, 1.00, (0,   0)),  # T5 · abrir: el campo entero
    ("monte",     1.00, 1.10, (0, -40)),  # T6 · subir el monte
    ("yud",       1.12, 1.00, (0,   0)),  # T7 · cerrar sobre el punto
    ("amanecer",  1.00, 1.09, (0, -35)),  # T8 · subir con el que se levanta
]

# Rótulos: "ESPAÑOL|hebreo|nota"
#   · el ESPAÑOL manda (grande, crema, Cinzel) — la audiencia NO lee hebreo
#   · el hebreo es apoyo secundario (menor, dorado, FrankRuhl+raqm)
#   · la nota es una línea chica en cursiva (Cormorant) — SOLO texto latino
# Todo el hebreo de abajo está copiado VERBATIM del estudio verificado.
# מתחלת va SIN niqqud a propósito: el estudio lo trae sin vocalizar y no
# se inventa una vocalización que el Sofer no revisó.
# (texto, y, size, tiempo_de_voz, offset_inicio, duración)
TITLES = [
    ("EL NOMBRE ESCONDIDO|אֱלוּל|Elul 5786",
                                      300, 66,  1, 0.5, 4.0),
    ("«YO SOY DE MI AMADO»|אֲנִי לְדוֹדִי וְדוֹדִי לִי|Cantar de los Cantares 6:3",
                                      300, 56,  2, 0.8, 5.2),
    ("LAS MISMAS PALABRAS, AL REVÉS|דּוֹדִי לִי וַאֲנִי לוֹ|Cantar de los Cantares 2:16",
                                      300, 50,  3, 0.6, 4.4),
    ("«ES ELLA LA QUE EMPIEZA»|מתחלת|Malbim a Shir HaShirim 6:3",
                                      300, 58,  4, 0.8, 4.8),
    ("EL REY ESTÁ EN EL CAMPO|הַמֶּלֶךְ בַּשָּׂדֶה|Likutei Torá, Re'eh 32b",
                                      300, 58,  5, 0.8, 5.0),
    ("CUARENTA DÍAS|עֲלֵה אֵלַי הָהָרָה|Tur, Oraj Jaim 581",
                                      300, 66,  6, 0.8, 4.6),
    ("LA LETRA DEL MES: ACCIÓN|מַעֲשֶׂה|Sefer Yetzirá 5 — la yud, la más pequeña",
                                      300, 56,  7, 0.6, 4.4),
    ("TÚ DAS EL PRIMER PASO|אֲנִי לְדוֹדִי|Elul — 40 días hasta Yom Kipur",
                                      300, 60,  8, 0.6, 4.8),
]


# ── Fondos ────────────────────────────────────────────────────────────────
def prescale(path):
    """9:16 a cover (por defecto) o lámina 4:5 centrada sobre negro."""
    im = Image.open(path).convert("RGB")
    iw, ih = im.size
    if not PAD_LAMINA:
        tw, th = int(V.W * 1.18), int(V.H * 1.18)
        s = max(tw / iw, th / ih)
        return im.resize((round(iw * s), round(ih * s)), Image.LANCZOS)
    cw = round(iw * PAD)
    ch = round(cw / V.ASP)
    if ch < ih * PAD:
        ch = round(ih * PAD)
        cw = round(ch * V.ASP)
    canvas = Image.new("RGB", (cw, ch), V.DARK)
    canvas.paste(im, ((cw - iw) // 2, (ch - ih) // 2))
    return canvas


# ── Rótulos: español grande arriba, hebreo pequeño debajo, nota al pie ───
def title_layer(text, letra=False, y=300, size=76, color=V.CREAM):
    partes = (text.split("|") + ["", ""])[:3]
    es, heb_txt, nota = partes
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    spaced = " ".join(list(es)) if len(es) <= 10 else es
    f = V._fit_font(spaced, size, V.W - 130)
    d.text((V.W // 2 + 3, y + 3), spaced, font=f, fill=(0, 0, 0, 170), anchor="ma")
    d.text((V.W // 2, y), spaced, font=f, fill=(*color, 255), anchor="ma")
    yy = d.textbbox((V.W // 2, y), spaced, font=f, anchor="ma")[3]

    if heb_txt:
        yy += 40
        d.line([(V.W // 2 - 78, yy), (V.W // 2 + 78, yy)], fill=(*V.GOLD, 190), width=2)
        # Hebreo: FrankRuhl + raqm -> el niqqud y el RTL salen correctos
        hf = V.heb(int(size * 0.86))
        d.text((V.W // 2 + 2, yy + 34), heb_txt, font=hf,
               fill=(0, 0, 0, 170), anchor="ma", features=["kern"])
        d.text((V.W // 2, yy + 32), heb_txt, font=hf,
               fill=(*V.GOLDB, 255), anchor="ma", features=["kern"])
        yy = d.textbbox((V.W // 2, yy + 32), heb_txt, font=hf, anchor="ma")[3]

    if nota:
        yy += 34
        d.line([(V.W // 2 - 78, yy), (V.W // 2 + 78, yy)], fill=(*V.GOLD, 170), width=2)
        nf = V.corm_i(46)
        d.text((V.W // 2 + 2, yy + 32), nota, font=nf,
               fill=(0, 0, 0, 180), anchor="ma")
        d.text((V.W // 2, yy + 30), nota, font=nf,
               fill=(*V.GOLDB, 255), anchor="ma")
    return img


# ── Subtítulos: cortar por puntuación, nunca a mitad de idea ─────────────
def build_phrases(words):
    phrases, buf, s = [], [], None
    for wd in words:
        w = wd["w"].rstrip()
        if s is None:
            s = wd["start"]
        buf.append(wd)
        txt = " ".join(x["w"] for x in buf)
        fin = any(w.endswith(c) for c in [".", "?", "!", "…", ":", ";"])
        coma_larga = w.endswith(",") and len(txt) >= 58
        if fin or coma_larga or len(txt) >= 82:
            phrases.append((txt, s, wd["end"]))
            buf, s = [], None
    if buf:
        phrases.append((" ".join(x["w"] for x in buf), s, buf[-1]["end"]))
    return phrases


V.prescale      = prescale
V.title_layer   = title_layer
V.build_phrases = build_phrases


# ── Tiempos derivados del timing.json (nada hardcodeado) ─────────────────
def build_timeline():
    tj = json.load(open(V.TIMING))
    dur = tj["duration"]
    starts = [s["start"] for s in tj["scenes"]]     # 8 tiempos de voz
    bounds = [0.0] + starts[1:] + [dur]             # 9 valores -> 8 planos
    assert len(bounds) == len(SCENE_KEYS) + 1, (len(bounds), len(SCENE_KEYS))
    V.SCENES = [(bounds[i], k, z0, z1, pan)
                for i, (k, z0, z1, pan) in enumerate(SCENE_KEYS)]
    # Rótulos anclados al comienzo de su tiempo de voz
    V.TITLE_DEFS = [(txt, False, y, sz,
                     starts[t - 1] + off, starts[t - 1] + off + d)
                    for (txt, y, sz, t, off, d) in TITLES]
    return dur, starts


# ── Prueba visual de los rótulos (sin necesidad de las imágenes) ─────────
def test_titulos():
    build_timeline()
    out = os.path.join(NDIR, "check")
    os.makedirs(out, exist_ok=True)
    for i, (txt, _, y, sz, ti, to) in enumerate(V.TITLE_DEFS, 1):
        base = Image.new("RGBA", (V.W, V.H), (*V.DARK, 255))
        base = Image.alpha_composite(base, title_layer(txt, False, y, sz))
        p = os.path.join(out, f"rotulo-{i}.png")
        base.convert("RGB").save(p)
        print(f"  {p}   [{ti:.1f}s -> {to:.1f}s]  {txt}")
    # contacto: los 8 rótulos en una sola lámina
    cols = 4
    filas = (len(V.TITLE_DEFS) + cols - 1) // cols
    hoja = Image.new("RGB", (V.W // 2 * cols, V.H // 2 * filas), V.DARK)
    for i in range(len(V.TITLE_DEFS)):
        im = Image.open(os.path.join(out, f"rotulo-{i+1}.png")).resize((V.W // 2, V.H // 2))
        hoja.paste(im, ((i % cols) * (V.W // 2), (i // cols) * (V.H // 2)))
    hoja.save(os.path.join(out, "rotulos-contacto.png"))
    print(f"\nContacto: {os.path.join(out, 'rotulos-contacto.png')}")


# ── Corte corto «El Rey en el campo» (para el 1 de septiembre) ───────────
def corte_rey():
    """Recorta T5..T8 del reel largo -> pieza de ~35 s con su end-card."""
    if not os.path.exists(SALIDA):
        sys.exit("Primero hay que renderizar el reel largo:\n"
                 "  python3 scripts/elul_video.py")
    tj = json.load(open(V.TIMING))
    ini = tj["scenes"][4]["start"] - 0.4      # arranca en T5 (el Rey)
    fin = tj["duration"]
    tmp = os.path.join(BUILD, "elul_corte_noend.mp4")
    r = subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-ss", f"{ini:.3f}", "-i", SALIDA,
         "-t", f"{fin - ini:.3f}", "-c:v", "libx264", "-preset", "slow",
         "-crf", "18", "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k",
         "-movflags", "+faststart", tmp], capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-1500:]); sys.exit(1)
    import jashmal_endcard as JE
    JE.ENDCARD_ES = V.ENDCARD_PORTAL
    JE.append_endcard(tmp, lang="es", out_path=CORTE, hold=2.0, trans=0.6)
    print(f"LISTO (corte corto, ~{fin - ini + 2.6:.0f} s): {CORTE}")


def main():
    faltan = [f for f in V.BG_FILES.values()
              if not os.path.exists(os.path.join(V.IMG, f))]
    if faltan:
        sys.exit("Faltan imágenes en " + V.IMG + ":\n  " + "\n  ".join(faltan) +
                 "\n\n(las 8 imágenes e1..e8.png las genera Mardan con GPT;\n"
                 " briefs en " + os.path.join(NDIR, "PROMPTS_GPT.txt") + ")")

    dur, _ = build_timeline()
    if os.path.isdir(FRAMES):
        shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)

    print("Construyendo capas estáticas (Elul)...")
    ctx = V.build_static()
    for i, (st, k, *_ ) in enumerate(V.SCENES):
        print(f"  plano {i+1:>2}  {st:6.2f} -> {ctx['bounds'][i+1]:6.2f}  {k}")
    n = int(ctx["dur"] * V.FPS) + 1
    print(f"Render {n} cuadros ({ctx['dur']:.1f}s)...")
    for fi in range(n):
        V.compose(fi / V.FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 150 == 0:
            print(f"  {fi}/{n}")

    print("Codificando (voz sola, sin música)...")
    tmp = os.path.join(BUILD, "elul_noend.mp4")
    cmd = ["ffmpeg", "-y", "-v", "error", "-framerate", str(V.FPS),
           "-i", f"{FRAMES}/f%05d.png", "-i", V.MP3,
           "-c:v", "libx264", "-preset", "slow", "-crf", "18",
           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest",
           "-movflags", "+faststart", tmp]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-1500:]); sys.exit(1)

    print("Añadiendo el end-card oficial del portal...")
    import jashmal_endcard as JE
    JE.ENDCARD_ES = V.ENDCARD_PORTAL
    # hold=2.0: la voz dura 76.3 s -> con end-card el reel queda ~78.8 s
    JE.append_endcard(tmp, lang="es", out_path=SALIDA, hold=2.0, trans=0.6)
    print(f"\nLISTO: {SALIDA}")


if __name__ == "__main__":
    if "--test-titulos" in sys.argv:
        test_titulos()
    elif "--corte-rey" in sys.argv:
        corte_rey()
    else:
        main()
