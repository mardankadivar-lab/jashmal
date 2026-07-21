#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Misterio — "El Arca que no ocupaba lugar"
מקום ארון אינו מן המדה  (Bavá Batrá 99a; Meguilá 10b)

Reel vertical 9:16 (1080x1920, 30fps) con las 6 IMAGENES FINALES de Mardan
(estilo diagrama sagrado dorado, ∞=0). Ken Burns suave + crossfades,
sincronizado a la voz de Martin. Cierra con la end-card oficial del portal.

Mapeo narrativo (6 imagenes a lo largo de 72s de voz):
  00 portada ∞      0.00 -> 5.41   (hook C arriba + "el objeto mas sagrado…")
  01 camara 20      5.41 -> 24.39  ("…sacaron la cuenta" + "la camara media 20")
  02 suma imposible 24.39-> 39.86  ("10+2½+10 = 22½ en 20" + "sobra 2½…")
  03 arca desaparece39.86-> 49.37  ("no por milagro… presente pero sin ocupar")
  04 eje / presencia49.37-> 61.93  ("Dios se contrae… el espacio deja de medir")
  05 ∞ = 0          61.93-> 72.17  ("lo sagrado no obedece la escasez" + cierre)

Las imagenes YA traen numeros y "∞=0" quemados. Reglas de subtitulo:
  - imagen 02 (suma): SUPRIMIR subtitulos (duplican/chocan con los numeros).
  - imagen 03 (arca): BAJAR subtitulos al pie (no tapar el "20").
  - resto: subtitulos al pie normal.
El hook C va en el TERCIO SUPERIOR (para no tapar el simbolo ∞ de la portada).
Voz sola (sin musica). No se edita ninguna imagen.
"""
import os, sys, json, subprocess, shutil
from PIL import Image, ImageDraw, ImageFont
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")

DIR    = "/Users/mardan/jashmal-produccion/arca-no-ocupa-lugar"
IMG    = os.path.join(DIR, "img-final")
FONTS  = os.path.join(DIR, "fonts")
MP3    = os.path.join(DIR, "audio", "arca_voz.mp3")
TIMING = os.path.join(DIR, "audio", "arca_timing.json")
BUILD  = os.path.join(DIR, "build")
FRAMES = os.path.join(BUILD, "frames")
SALIDA = os.path.join(DIR, "ARCA-reel-FINAL.mp4")
ENDCARD_PORTAL = os.path.join(DIR, "jashmal_endcard_portal_ES.png")

W, H, FPS = 1080, 1920, 30
ASP = W / H
XF = 0.55

CREAM = (238, 232, 214)
GOLD2 = (232, 205, 130)

CINZEL700 = os.path.join(FONTS, "Cinzel-700.ttf")
CORM600   = os.path.join(FONTS, "Cormorant-600.ttf")

HOOK = "Cabía en un cuarto…\nsin ocupar lugar en él."
HOOK_IN, HOOK_HOLD, HOOK_OUT = 0.5, 2.3, 0.6

# (archivo, tiempo de inicio). El fin de cada uno = inicio del siguiente; el
# ultimo termina en la duracion del audio.
IMAGES = [
    ("00_portada_infinito_cero.png",  0.00),
    ("01_camara_20.png",              5.41),
    ("02_suma_imposible_22.png",     24.39),
    ("03_arca_desaparece.png",       39.86),
    ("04_eje_presencia.png",         49.37),
    ("05_infinito_cero_sentido.png", 61.93),
]
# Ken Burns por imagen (z0, z1, pan_x, pan_y) — todo suave; 01 es larga -> push lento
KB = [
    (1.00, 1.05, 0, -25),   # portada ∞  — acerca leve
    (1.00, 1.06, 0,  25),   # camara 20  — push lento (19s)
    (1.05, 1.00, 0, -22),   # suma       — aleja (revela la cuenta)
    (1.00, 1.06, 0,  22),   # arca       — acerca al centro que se disuelve
    (1.05, 1.00, 0, -20),   # eje        — aleja (abre el Kav)
    (1.00, 1.05, 0,  18),   # ∞=0        — acerca lento al punto de luz
]
# modo de subtitulo por imagen: 0 normal, 1 suprimir, 2 bajar al pie
SUBMODE = [0, 0, 1, 2, 0, 0]


def F(path, sz):
    return ImageFont.truetype(path, sz)


def smooth(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)


def prescale(path):
    im = Image.open(path).convert("RGB")
    bw, bh = im.size
    tw, th = int(W * 1.16), int(H * 1.16)
    s = max(tw / bw, th / bh)
    return im.resize((round(bw * s), round(bh * s)), Image.LANCZOS)


def kenburns(pre, t01, z0, z1, pan):
    pw, ph = pre.size
    base_h = min(ph, pw / ASP)
    z = z0 + (z1 - z0) * smooth(t01)
    ch = base_h / z
    cw = ch * ASP
    cx = pw / 2 + pan[0] * smooth(t01)
    cy = ph / 2 + pan[1] * smooth(t01)
    left = max(0, min(pw - cw, cx - cw / 2))
    top = max(0, min(ph - ch, cy - ch / 2))
    return pre.crop((round(left), round(top), round(left + cw), round(top + ch))).resize((W, H), Image.LANCZOS)


def build_ctx():
    tj = json.load(open(TIMING))
    dur = tj["duration"]
    words = tj["words"]
    starts = [s for _, s in IMAGES]
    bounds = starts + [dur]
    pres = [prescale(os.path.join(IMG, f)) for f, _ in IMAGES]
    # chunks de subtitulos (>=3 palabras o corte en puntuacion, max 6)
    chunks, cur = [], []
    for wd in words:
        cur.append(wd)
        last = wd["w"]
        if (len(cur) >= 3 and last.endswith((".", "?", ":", "…"))) or len(cur) >= 6:
            chunks.append({"txt": " ".join(x["w"] for x in cur),
                           "start": cur[0]["start"], "end": cur[-1]["end"]})
            cur = []
    if cur:
        chunks.append({"txt": " ".join(x["w"] for x in cur),
                       "start": cur[0]["start"], "end": cur[-1]["end"]})
    return {"dur": dur, "bounds": bounds, "pres": pres, "chunks": chunks}


def img_index_at(ctx, t):
    n = len(ctx["pres"])
    i = 0
    for j in range(n):
        if t >= ctx["bounds"][j]:
            i = j
    return i


def scene_bg(ctx, i, t):
    st, en = ctx["bounds"][i], ctx["bounds"][i + 1]
    z0, z1, px, py = KB[i]
    return kenburns(ctx["pres"][i], (t - st) / max(0.01, en - st), z0, z1, (px, py))


def wrap(draw, text, font, maxw):
    words, lines, cur = text.split(), [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if draw.textlength(t, font=font) <= maxw:
            cur = t
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def draw_center(draw, lines, font, cy, fill, lh=1.18):
    sizes = [draw.textbbox((0, 0), ln, font=font) for ln in lines]
    hs = [b[3] - b[1] for b in sizes]
    total = sum(hs) + int(font.size * (lh - 1)) * (len(lines) - 1)
    y = cy - total / 2
    for ln, h in zip(lines, hs):
        w = draw.textlength(ln, font=font)
        x = (W - w) / 2
        draw.text((x, y), ln, font=font, fill=fill)
        y += h + int(font.size * (lh - 1))


def _faded(layer, a):
    r, g, b, al = layer.split()
    al = al.point(lambda p: int(p * a))
    return Image.merge("RGBA", (r, g, b, al))


def overlay(base, t, ctx):
    im = base.convert("RGBA")
    d = ImageDraw.Draw(im, "RGBA")
    idx = img_index_at(ctx, t)
    hook_end = HOOK_IN + HOOK_HOLD + HOOK_OUT

    # HOOK de apertura — tercio SUPERIOR (no tapa el ∞ de la portada)
    if t <= hook_end:
        if t < HOOK_IN:
            a = smooth(t / HOOK_IN)
        elif t < HOOK_IN + HOOK_HOLD:
            a = 1.0
        else:
            a = 1 - smooth((t - HOOK_IN - HOOK_HOLD) / HOOK_OUT)
        layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        ld.rectangle([0, int(H * 0.10), W, int(H * 0.34)], fill=(0, 0, 0, 120))
        draw_center(ld, HOOK.split("\n"), F(CINZEL700, 66), int(H * 0.22),
                    (232, 205, 130, 255), lh=1.28)
        im.alpha_composite(_faded(layer, a))

    # SUBTITULOS sincronizados
    if t > hook_end - 0.2 and SUBMODE[idx] != 1:
        cy = int(H * 0.885) if SUBMODE[idx] == 2 else int(H * 0.805)
        fsub = F(CORM600, 54)
        for ch in ctx["chunks"]:
            if ch["start"] <= t <= ch["end"] + 0.12:
                lines = wrap(d, ch["txt"], fsub, int(W * 0.80))
                lh = int(fsub.size * 1.16)
                bh = len(lines) * lh + 40
                layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
                ld = ImageDraw.Draw(layer)
                ld.rectangle([70, cy - bh // 2, W - 70, cy + bh // 2], fill=(0, 0, 0, 120))
                draw_center(ld, lines, fsub, cy, (238, 232, 214, 255), lh=1.16)
                im.alpha_composite(layer)
                break
    return im.convert("RGB")


def compose(t, ctx):
    i = img_index_at(ctx, t)
    base = scene_bg(ctx, i, t).convert("RGB")
    en = ctx["bounds"][i + 1]
    if i + 1 < len(ctx["pres"]) and t > en - XF:
        nxt = scene_bg(ctx, i + 1, en).convert("RGB")
        base = Image.blend(base, nxt, smooth((t - (en - XF)) / XF))
    return overlay(base, t, ctx)


def main():
    if os.path.isdir(FRAMES):
        shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)
    print("Preparando imagenes finales...")
    ctx = build_ctx()
    n = int(ctx["dur"] * FPS) + 1
    print(f"Render {n} cuadros ({ctx['dur']:.1f}s)...")
    for fi in range(n):
        compose(fi / FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 150 == 0:
            print(f"  {fi}/{n}")
    print("Codificando (voz sola)...")
    tmp = os.path.join(BUILD, "arca_final_noend.mp4")
    cmd = ["ffmpeg", "-y", "-framerate", str(FPS), "-i", f"{FRAMES}/f%05d.png",
           "-i", MP3, "-c:v", "libx264", "-preset", "slow", "-crf", "18",
           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest",
           "-movflags", "+faststart", tmp]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-1500:]); sys.exit(1)
    print("Anadiendo end-card oficial del portal...")
    import jashmal_endcard as JE
    JE.ENDCARD_ES = ENDCARD_PORTAL
    JE.append_endcard(tmp, lang="es", out_path=SALIDA, hold=2.5, trans=0.6)
    print(f"\nLISTO: {SALIDA}")


if __name__ == "__main__":
    main()
