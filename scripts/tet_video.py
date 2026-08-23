#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Letra Tet (ט) — Video vertical 9:16 (1080x1920, 30fps).
Clona el molde de la Zayin (zayin_video.py) reusando el motor de la Vav
(vav_video.py): Ken Burns + fundidos + títulos + subtítulos quemados
sincronizados a la voz de Martin + end-card oficial del portal dorado.

IMÁGENES: las 7 que hace Mardan con GPT (cinematográficas, SIN texto ni
tipografía hebrea), guardadas en ~/jashmal-produccion/tet/img/ como
t1.png … t7.png. La ט aparece SOLO como glifo del script (FrankRuhl).

Mapeo de las escenas a los beats de la narración (voz 75.88s):
   0.00–4.33   t1  la vasija de luz cerrada     «Mira esta letra… la más cerrada»
   4.33–10.08  t2  el borde que se dobla        «una vasija cuyo borde se dobla hacia adentro»
  10.08–18.10  t1  la vasija de luz             «la paradoja: es la inicial de Tov, bueno»
  18.10–31.07  t3  la creación (Génesis 1)      «cielos, tierra… tres versículos sin Tet… la luz era buena»
  31.07–43.51  t4  la luz escondida (tesoro)    «fue escondida… para los justos, en el porvenir»
  43.51–54.88  t5  Akiva de noche en el campo   «todo lo que hace el Misericordioso, para bien lo hace»
  54.88–65.69  t6  el bien sellado (Zohar)      «tu bien está sellado dentro de ti»
  65.69–70.89  t7  el vientre / la gestación    «nueve meses guarda el vientre lo que más ama»
  70.89–fin    t1  la vasija de luz             «hay bienes que se te muestran… y bienes que se te guardan»
"""
import os, sys, shutil, subprocess
from PIL import Image, ImageDraw
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

TDIR   = "/Users/mardan/jashmal-produccion/tet"
SALIDA = os.path.join(TDIR, "tet_FINAL.mp4")
FRAMES = os.path.join(TDIR, "build", "frames")

# ── Overrides: rutas y assets de la Tet ──────────────────────────────────
V.IMG    = os.path.join(TDIR, "img")
V.FONTS  = os.path.join(TDIR, "fonts")
V.MP3    = os.path.join(TDIR, "audio", "tet_voz.mp3")
V.TIMING = os.path.join(TDIR, "audio", "tet_timing.json")
V.ENDCARD_PORTAL = os.path.join(TDIR, "jashmal_endcard_portal_ES.png")

V.BG_FILES = {
    "glifo":    "t0.png",   # la ט de Mardan: oro grabado, silueta FrankRuhl fiel
    "letra":    "t1.png",   # la vasija de luz cerrada (la Tet encarnada)
    "vasija":   "t2.png",   # el borde invertido, primer plano
    "creacion": "t3.png",   # Génesis 1: cielos, tierra, oscuridad y luz
    "luz":      "t4.png",   # la luz escondida / el tesoro guardado
    "akiva":    "t5.png",   # el sabio de noche en el campo, lámpara mínima
    "sellado":  "t6.png",   # el bien sellado (Zohar) — cofre/puertas de luz
    "vientre":  "t7.png",   # la semilla de luz gestándose en lo oscuro
}

# (start, bg, z0, z1, pan) — Ken Burns suave, cortes en los beats de la voz
V.SCENES = [
    (0.00,  "glifo",    1.00, 1.08, (0, -40)),
    (4.33,  "vasija",   1.08, 1.00, (0,  40)),
    (10.08, "letra",    1.00, 1.07, (0,  30)),
    (18.10, "creacion", 1.07, 1.00, (0, -40)),
    (31.07, "luz",      1.00, 1.07, (0,  40)),
    (43.51, "akiva",    1.07, 1.00, (0, -30)),
    (54.88, "sellado",  1.00, 1.07, (0,  30)),
    (65.69, "vientre",  1.06, 1.00, (0, -40)),
    (70.89, "glifo",    1.00, 1.06, (0,  30)),
]

# La ט no se dibuja animada (eso era el trazo de la Vav): entra como glifo
# estático en los títulos. Las escenas de Mardan no llevan tipografía.
V.VAV_END = -1.0

# (texto, glifo_ט, y, size, t_in, t_out) — en los valles entre frases
V.TITLE_DEFS = [
    ("LA TET",                 False, 250, 82,  1.6,  4.1),
    ("LA INICIAL DE «BUENO»",  False, 340, 64, 14.7, 17.6),
    ("TRES VERSÍCULOS SIN TET", False, 340, 60, 22.3, 25.9),
    ("LA LUZ ESCONDIDA",       False, 340, 68, 36.9, 42.5),
    ("TODO ES PARA BIEN",      False, 340, 68, 46.2, 49.5),
    ("EL BIEN SELLADO",        False, 340, 68, 62.5, 65.1),
    ("EL BIEN GUARDADO",       True,  250, 78, 73.3, 75.8),
]


def title_layer(text, letra=True, y=300, size=76, color=V.CREAM):
    """Igual que el motor de la Vav, pero el glifo hebreo es ט, no ו."""
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    yy = y
    if letra:
        vf = V.heb(150)
        d.text((V.W // 2 + 3, yy + 3), "ט", font=vf, fill=(0, 0, 0, 150), anchor="ma")
        d.text((V.W // 2, yy), "ט", font=vf, fill=(*V.GOLDB, 255), anchor="ma")
        yy += 185
    spaced = " ".join(list(text)) if len(text) <= 10 else text
    f = V._fit_font(spaced, size, V.W - 130)
    d.text((V.W // 2 + 3, yy + 3), spaced, font=f, fill=(0, 0, 0, 160), anchor="ma")
    d.text((V.W // 2, yy), spaced, font=f, fill=(*color, 255), anchor="ma")
    return img


def build_phrases(words):
    """Como el motor de la Vav pero afinado a este guion:
      · cupo de 62 caracteres (con 46-56 el remate «…la luz era buena» se
        partía justo antes de 'buena')
      · la COMA también corta, pero solo cuando la frase ya lleva ≥38
        caracteres: así «Una vasija cuyo borde se dobla hacia adentro,»
        corta en la coma y no en mitad de la cláusula — y «fue escondida.»
        queda sola, que es justo el golpe dramático."""
    phrases, buf, s = [], [], None
    for wd in words:
        w = wd["w"]
        if s is None:
            s = wd["start"]
        buf.append(wd)
        txt = " ".join(x["w"] for x in buf)
        corta = (any(w.rstrip().endswith(c) for c in [".", "?", "!", "…", ":"])
                 or (w.rstrip().endswith(",") and len(txt) >= 38)
                 or len(txt) >= 62)
        if corta:
            phrases.append((txt, s, wd["end"]))
            buf, s = [], None
    if buf:
        phrases.append((" ".join(x["w"] for x in buf), s, buf[-1]["end"]))
    return phrases


V.title_layer = title_layer
V.build_phrases = build_phrases


def faltan_imagenes():
    faltan = [fn for fn in V.BG_FILES.values()
              if not os.path.isfile(os.path.join(V.IMG, fn))]
    if faltan:
        print("Faltan las escenas de Mardan (GPT, 9:16, sin texto).")
        print(f"Guárdalas en {V.IMG}/ con estos nombres y vuelve a correr:")
        for f in sorted(faltan):
            print("  ·", f)
        return True
    return False


def main():
    if faltan_imagenes():
        sys.exit(2)
    if os.path.isdir(FRAMES):
        shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)
    print("Construyendo capas estáticas (tet)...")
    ctx = V.build_static()
    n = int(ctx["dur"] * V.FPS) + 1
    print(f"Render {n} cuadros ({ctx['dur']:.1f}s)...")
    for fi in range(n):
        V.compose(fi / V.FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 150 == 0:
            print(f"  {fi}/{n}")
    print("Codificando...")
    tmp = os.path.join(TDIR, "build", "tet_noend.mp4")
    cmd = ["ffmpeg", "-y", "-framerate", str(V.FPS), "-i", f"{FRAMES}/f%05d.png",
           "-i", V.MP3, "-c:v", "libx264", "-preset", "slow", "-crf", "18",
           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest",
           "-movflags", "+faststart", tmp]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-1200:]); sys.exit(1)
    print("Añadiendo end-card oficial...")
    import jashmal_endcard as JE
    JE.ENDCARD_ES = V.ENDCARD_PORTAL
    JE.append_endcard(tmp, lang="es", out_path=SALIDA)
    print(f"\nLISTO: {SALIDA}")


if __name__ == "__main__":
    main()
