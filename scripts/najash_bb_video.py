#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Parashá KI TETZÉ — "El buey y el burro dentro de la serpiente"
Reel vertical 9:16 (1080x1920, 30fps).

Reusa el motor de la Vav (vav_video.py), igual que eikev_video.py:
Ken Burns sobre imágenes fijas + fundidos + rótulos (español arriba, hebreo
debajo y más pequeño, FrankRuhl+raqm — niqqud correcto) + subtítulos
quemados sincronizados a la voz de Martin + end-card oficial del portal.

IMÁGENES: las 8 que hace Mardan con GPT (prompts ya entregados).
Se piden en 9:16 (1080x1920) -> se montan a COVER con Ken Burns.
Si alguna llega en 4:5, cambia PAD_LAMINA a True (lámina sobre negro).

Mapeo 1:1 de escenas a los 8 tiempos de la narración:
   T1   n1   cabeza de serpiente: un burro en un ojo, un buey en el otro
   T2   n2   las dos fuerzas dentro del cuerpo de la serpiente
   T3   n3   el buey (IZQUIERDA — klipá de Esav)
   T4   n4   el burro (DERECHA — klipá de Ishmael)
   T5   n5   el jardín antes: arando juntos bajo el yugo
   T6   n6   el yugo partido
   T7   n7   la klipá: cáscara agrietada que no contiene la luz
   T8   n8   cada bestia en su campo, sendero de luz al amanecer [Mashíaj]

FUENTE VERIFICADA: Megalé Amukot al Vaetjanán, Ofán 71 (así se cita,
NUNCA "sobre Ki Tetzé"); Zohar Beshalaj II 65a; Zohar Balak III 207a;
Kav HaYashar 102:8-9; Devarim 22:10. Informe del Sofer en scratchpad.

USO:
    python3 scripts/najash_bb_voz.py          # 1) voz + timing.json
    # 2) Mardan coloca las 8 imágenes en .../najash-buey-burro/img/ (n1..n8.png)
    python3 scripts/najash_bb_video.py --test-titulos   # 3) revisar rótulos
    python3 scripts/najash_bb_video.py                  # 4) render final
"""
import os, sys, json, shutil, subprocess
from PIL import Image, ImageDraw
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

NDIR   = "/Users/mardan/jashmal-produccion/najash-buey-burro"
SALIDA = os.path.join(NDIR, "KITETZE-buey-burro-reel.mp4")
BUILD  = os.path.join(NDIR, "build")
FRAMES = os.path.join(BUILD, "frames")

# ── Overrides: rutas y assets de este reel ───────────────────────────────
V.IMG    = os.path.join(NDIR, "img")
V.FONTS  = os.path.join(NDIR, "fonts")
V.MP3    = os.path.join(NDIR, "audio", "najash_bb_voz.mp3")
V.TIMING = os.path.join(NDIR, "audio", "najash_bb_timing.json")
V.ENDCARD_PORTAL = os.path.join(NDIR, "jashmal_endcard_portal_ES.png")

V.VAV_END = -1.0     # no se dibuja ninguna letra encima del fondo
V.XF      = 0.6      # fundido entre planos

PAD_LAMINA = False   # True si las imágenes llegan en 4:5 en vez de 9:16
PAD        = 1.10

V.BG_FILES = {
    "cabeza":   "n1.png",   # cabeza de serpiente, un animal en cada ojo
    "cuerpo":   "n2.png",   # las dos fuerzas dentro del cuerpo
    "buey":     "n3.png",   # el buey (izquierda)
    "burro":    "n4.png",   # el burro (derecha)
    "jardin":   "n5.png",   # el jardín antes: arando juntos bajo el yugo
    "yugo":     "n6.png",   # el yugo partido
    "klipa":    "n7.png",   # la cáscara agrietada que no contiene la luz
    "amanecer": "n8.png",   # cada bestia en su campo, sendero de luz
}

# Un plano por tiempo de voz (1:1).
SCENE_KEYS = [
    # (bg_key, z0, z1, pan)
    ("cabeza",   1.00, 1.10, (0,  -35)),   # T1 · acercarse a los ojos
    ("cuerpo",   1.08, 1.00, (0,   30)),   # T2 · abrir: el cuerpo entero
    ("buey",     1.00, 1.09, (-35,  0)),   # T3 · empuje hacia la izquierda
    ("burro",    1.00, 1.09, (35,   0)),   # T4 · empuje hacia la derecha
    ("jardin",   1.08, 1.00, (0,   35)),   # T5 · retroceso: el jardín entero
    ("yugo",     1.00, 1.10, (0,  -25)),   # T6 · cerrar sobre el yugo roto
    ("klipa",    1.02, 1.12, (0,  -20)),   # T7 · empuje lento a la grieta
    ("amanecer", 1.10, 1.00, (0,  -45)),   # T8 · abrir hacia el amanecer
]

# Rótulos: "ESPAÑOL|hebreo|nota"
#   · el ESPAÑOL manda (grande, crema, Cinzel) — la audiencia NO lee hebreo
#   · el hebreo es apoyo secundario (menor, dorado, FrankRuhl+raqm)
#   · la nota es una línea chica en cursiva (Cormorant) — SOLO texto latino
# (texto, y, size, tiempo_de_voz, offset_inicio, duración)
TITLES = [
    ("LA SERPIENTE|נָחָשׁ",            300, 80,  1, 1.2, 4.0),
    ("MEGALÉ AMUKOT||Vaetjanán, Ofán 71 — Cracovia, s. XVII",
                                      300, 62,  2, 2.2, 4.6),
    ("EL BUEY|שׁוֹר|la fuerza de Esav — izquierda",
                                      300, 78,  3, 0.8, 4.0),
    ("EL BURRO|חֲמוֹר|la fuerza de Ishmael — derecha",
                                      300, 78,  4, 0.8, 4.2),
    ("ANTES DEL PECADO||el Megalé Amukot revela",
                                      300, 64,  5, 1.6, 4.6),
    ("NO ARARÁS JUNTOS|יַחְדָּו|Devarim 22:10 — Parashá Ki Tetzé",
                                      300, 62,  6, 4.4, 4.6),
    # la gematría 506+254=760=tzaráat la trae el PROPIO Ofán 71 (no el Zohar)
    ("760 · TZARÁAT|צָרַעַת|Megalé Amukot, Ofán 71",
                                      300, 68,  7, 4.4, 4.6),
    ("EL MASHÍAJ|מָשִׁיחַ|Zejariá 9:9 — Kav HaYashar 102:8",
                                      300, 76,  8, 2.6, 6.4),
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
    hoja = Image.new("RGB", (V.W // 2 * 4, V.H // 2 * 2), V.DARK)
    for i in range(len(V.TITLE_DEFS)):
        im = Image.open(os.path.join(out, f"rotulo-{i+1}.png")).resize((V.W // 2, V.H // 2))
        hoja.paste(im, ((i % 4) * (V.W // 2), (i // 4) * (V.H // 2)))
    hoja.save(os.path.join(out, "rotulos-contacto.png"))
    print(f"\nContacto: {os.path.join(out, 'rotulos-contacto.png')}")


def main():
    faltan = [f for f in V.BG_FILES.values()
              if not os.path.exists(os.path.join(V.IMG, f))]
    if faltan:
        sys.exit("Faltan imágenes en " + V.IMG + ":\n  " + "\n  ".join(faltan) +
                 "\n\n(las 8 imágenes n1..n8.png las genera Mardan con GPT)")

    dur, _ = build_timeline()
    if os.path.isdir(FRAMES):
        shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)

    print("Construyendo capas estáticas (ki tetzé)...")
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
    tmp = os.path.join(BUILD, "najash_bb_noend.mp4")
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
    JE.append_endcard(tmp, lang="es", out_path=SALIDA, hold=2.6, trans=0.6)
    print(f"\nLISTO: {SALIDA}")


if __name__ == "__main__":
    if "--test-titulos" in sys.argv:
        test_titulos()
    else:
        main()
