#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Shabat — Likutei Moharan I:5 "La voz que se vuelve trueno"
Reel vertical 9:16 (1080x1920, 30fps). Ken Burns suave por imagen + crossfades
suaves entre planos, sincronizado a la voz de Martin. Cierra con el end-card
oficial del portal dorado.

Las imagenes de Mardan YA traen su titulo en Cinzel -> NO se sobrepone ningun
texto. Se dejan limpias. Sin musica (no hay lecho de la serie): solo la voz.
"""
import os, sys, json, subprocess, shutil
from PIL import Image, ImageDraw
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")

DIR    = "/Users/mardan/jashmal-produccion/lm-i5"
IMG    = os.path.join(DIR, "img")
MP3    = os.path.join(DIR, "audio", "lm_i5_voz.mp3")
TIMING = os.path.join(DIR, "audio", "lm_i5_timing.json")
BUILD  = os.path.join(DIR, "build")
FRAMES = os.path.join(BUILD, "frames")
SALIDA = os.path.join(DIR, "LM-I5-reel.mp4")
ENDCARD_PORTAL = os.path.join(DIR, "jashmal_endcard_portal_ES.png")

W, H, FPS = 1080, 1920, 30
ASP = W / H
XF = 0.55   # crossfade entre planos

# Ken Burns por imagen: (z0, z1, pan_x, pan_y) — alterna acercar / alejar
KB = [
    (1.00, 1.08, 0, -45),   # 1 portada  — acerca, sube
    (1.08, 1.00, 0,  40),   # 2          — aleja, baja
    (1.00, 1.09, 0,  40),   # 3 trueno   — acerca (empuje)
    (1.08, 1.00, 0, -40),   # 4 corazon  — aleja
    (1.00, 1.07, 0,  35),   # 5 puerta   — acerca lento
]


def smooth(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)


def prescale(path):
    im = Image.open(path).convert("RGB")
    bw, bh = im.size
    tw, th = int(W * 1.20), int(H * 1.20)
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


def build_static():
    tj = json.load(open(TIMING))
    dur = tj["duration"]
    scenes = tj["scenes"]
    # bounds contiguos: cada imagen desde el inicio de su oracion al de la siguiente
    starts = [s["start"] for s in scenes]
    bounds = [0.0] + starts[1:] + [dur]
    pres = [prescale(os.path.join(IMG, s["img"])) for s in scenes]
    return {"dur": dur, "bounds": bounds, "pres": pres}


def scene_bg(ctx, i, t):
    st, en = ctx["bounds"][i], ctx["bounds"][i + 1]
    z0, z1, px, py = KB[i]
    return kenburns(ctx["pres"][i], (t - st) / max(0.01, en - st), z0, z1, (px, py))


def compose(t, ctx):
    n = len(ctx["pres"])
    i = 0
    for j in range(n):
        if t >= ctx["bounds"][j]:
            i = j
    base = scene_bg(ctx, i, t).convert("RGB")
    en = ctx["bounds"][i + 1]
    if i + 1 < n and t > en - XF:
        nxt = scene_bg(ctx, i + 1, en).convert("RGB")
        base = Image.blend(base, nxt, smooth((t - (en - XF)) / XF))
    return base


def main():
    if os.path.isdir(FRAMES):
        shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)
    print("Preparando imagenes...")
    ctx = build_static()
    n = int(ctx["dur"] * FPS) + 1
    print(f"Render {n} cuadros ({ctx['dur']:.1f}s)...")
    for fi in range(n):
        compose(fi / FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 150 == 0:
            print(f"  {fi}/{n}")
    print("Codificando (voz sola, sin musica)...")
    tmp = os.path.join(BUILD, "lm_i5_noend.mp4")
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
