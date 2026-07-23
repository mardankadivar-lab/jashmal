#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Letra Zayin (ז) — Video vertical 9:16 (1080x1920, 30fps).
Clona el molde del video v2 de la Vav (vav_video_v2.py) reusando su motor
(vav_video.py): Ken Burns + fundidos + títulos + subtítulos quemados
sincronizados a la voz de Martin + end-card oficial del portal dorado.

IMÁGENES: las 7 que hizo Mardan con GPT (ya en 9:16, 941x1672). No se genera
ni se dibuja ninguna imagen — la letra vive en las fotos, no se sobrepone.

Mapeo de las 12 escenas a los beats de la narración (voz 70.45s):
   0.00–7.36   z1_letra       la ז de luz            «Mira esta letra… una Vav con una barra»
   7.36–14.95  z7_trazo       línea + travesaño      «la Vav desde el extremo · la Zayin desde el centro»
  14.95–18.02  z5_espada      espada en reposo       «un mango con una hoja: es una espada»
  18.02–24.38  z6_corona      corona sobre pilar     «un poste con una diadema: es una corona»
  24.38–30.36  z4_seis_siete  6 llamas + 7ª estrella «su número es siete: el número del Shabat»
  30.36–38.26  z5_espada      espada en reposo       «en Shabat el hombre no sale con su espada»
  38.26–46.88  z2_septimodia  velas, luz entre nubes «Eliezer: adorno · Sabios: no son sino vergüenza»
  46.88–54.81  z3_mazon       trigo y panes          «las espadas se convertirán en arados»
  54.81–60.84  z4_seis_siete  la 7ª estrella         «no te da descanso: te da más alma»
  60.84–66.18  z6_corona      la corona              «la corona se gana desde abajo»
  66.18–fin    z1_letra       la ז de luz            «se gana el día en que sueltas la espada»
"""
import os, sys, shutil, subprocess
from PIL import Image, ImageDraw
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

ZDIR   = "/Users/mardan/jashmal-produccion/zayin"
SALIDA = os.path.join(ZDIR, "zayin_FINAL.mp4")
FRAMES = os.path.join(ZDIR, "build", "frames")

# ── Overrides: rutas y assets de la Zayin ────────────────────────────────
V.IMG    = os.path.join(ZDIR, "img")
V.FONTS  = os.path.join(ZDIR, "fonts")
V.MP3    = os.path.join(ZDIR, "audio", "zayin_voz.mp3")
V.TIMING = os.path.join(ZDIR, "audio", "zayin_timing.json")
V.ENDCARD_PORTAL = os.path.join(ZDIR, "jashmal_endcard_portal_ES.png")

V.BG_FILES = {
    "letra":   "z1_letra.png",
    "septimo": "z2_septimodia.png",
    "mazon":   "z3_mazon.png",
    "seis7":   "z4_seis_siete.png",
    "espada":  "z5_espada.png",
    "corona":  "z6_corona.png",
    "trazo":   "z7_trazo.png",
}

# (start, bg, z0, z1, pan) — Ken Burns suave
V.SCENES = [
    (0.00,  "letra",   1.00, 1.08, (0, -40)),
    (7.36,  "trazo",   1.08, 1.00, (0,  40)),
    (14.95, "espada",  1.00, 1.07, (0,  30)),
    (18.02, "corona",  1.07, 1.00, (0, -40)),
    (24.38, "seis7",   1.00, 1.07, (0,  50)),
    (30.36, "espada",  1.06, 1.00, (0, -30)),
    (38.26, "septimo", 1.00, 1.07, (0,  40)),
    (46.88, "mazon",   1.07, 1.00, (0,  30)),
    (54.81, "seis7",   1.00, 1.06, (0, -50)),
    (60.84, "corona",  1.06, 1.00, (0, -30)),
    (66.18, "letra",   1.00, 1.07, (0,  30)),
]

# La letra NO se dibuja encima: la ז de las imágenes de Mardan ES la letra.
V.VAV_END = -1.0

V.TITLE_DEFS = [
    ("LA ZAYIN",         False, 300, 82,  4.5,  6.9),
    ("ESPADA · CORONA",  False, 340, 70, 20.4, 24.1),
    ("SIETE · SHABAT",   False, 340, 70, 28.3, 30.0),
    ("EL ARMA DESCANSA", False, 330, 66, 52.4, 54.4),
    # Sin glifo dibujado: la ז gigante de la imagen de Mardan ES la letra —
    # sobreponerle una ז pequeña la duplicaba. y=250 deja libre la corona.
    ("SUELTA LA ESPADA", False, 250, 82, 67.9, 70.4),
]


def title_layer(text, letra=True, y=300, size=76, color=V.CREAM):
    """Igual que el motor de la Vav, pero el glifo hebreo es ז, no ו."""
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    yy = y
    if letra:
        vf = V.heb(150)
        d.text((V.W // 2 + 3, yy + 3), "ז", font=vf, fill=(0, 0, 0, 150), anchor="ma")
        d.text((V.W // 2, yy), "ז", font=vf, fill=(*V.GOLDB, 255), anchor="ma")
        yy += 185
    spaced = " ".join(list(text)) if len(text) <= 10 else text
    f = V._fit_font(spaced, size, V.W - 130)
    d.text((V.W // 2 + 3, yy + 3), spaced, font=f, fill=(0, 0, 0, 160), anchor="ma")
    d.text((V.W // 2, yy), spaced, font=f, fill=(*color, 255), anchor="ma")
    return img


def build_phrases(words):
    """
    Igual que el motor de la Vav pero con un cupo de 62 caracteres (en vez de
    46): con 46 el remate se partía en dos rótulos ('…en que sueltas' /
    'la espada.'), que es justo la frase que no se puede romper.
    """
    phrases, buf, s = [], [], None
    for wd in words:
        w = wd["w"]
        if s is None:
            s = wd["start"]
        buf.append(wd)
        txt = " ".join(x["w"] for x in buf)
        if any(w.rstrip().endswith(c) for c in [".", "?", "!", "…", ":"]) or len(txt) >= 62:
            phrases.append((txt, s, wd["end"]))
            buf, s = [], None
    if buf:
        phrases.append((" ".join(x["w"] for x in buf), s, buf[-1]["end"]))
    return phrases


V.title_layer = title_layer
V.build_phrases = build_phrases


def main():
    if os.path.isdir(FRAMES):
        shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)
    print("Construyendo capas estáticas (zayin)...")
    ctx = V.build_static()
    n = int(ctx["dur"] * V.FPS) + 1
    print(f"Render {n} cuadros ({ctx['dur']:.1f}s)...")
    for fi in range(n):
        V.compose(fi / V.FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 150 == 0:
            print(f"  {fi}/{n}")
    print("Codificando...")
    tmp = os.path.join(ZDIR, "build", "zayin_noend.mp4")
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
