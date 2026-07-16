#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Letra Vav (ו) — v2 con las IMÁGENES DE MARDAN (9 PNGs, rayo de luz).
Reusa el MISMO audio de Martin + timestamps + subtítulos del motor vav_video.py.
La Vav no se dibuja encima: el rayo de las imágenes ES la Vav.
Mapeo de los 9 cuadros a los beats de la narración (voz 56.9s):

  0.0–4.8   m01  rayo con silueta sutil y círculos en el suelo   «Mira esta letra…»
  4.8–14.0  m03  rayo con corona de nubes                        «Es la Vav… conectar»
 14.0–19.0  m05  rayo golpeando tierra agrietada                 «gancho, clavo»
 19.0–26.0  m02  rayo de la estrella al mar/paisaje              «el cielo y la tierra»
 26.0–32.5  m06  espiral de luz descendiendo a la ciudad         «palabra número seis… uniendo»
 32.5–38.2  m09  geometría sagrada (cubo/estrella)               «las seis direcciones»
 38.2–43.8  m08  galaxia→tierra→copa→dos personas unidas         «clavo de luz que cose»
 43.8–51.8  m04  el rayo se vuelve figura humana                 «tú también eres una vav»
 51.8–fin   m07  rayo llenando el vacío circular                 «recibir… entregar… el puente»
"""
import os, sys, shutil, subprocess
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

VAVDIR = "/Users/mardan/jashmal_vav_work"
SALIDA = os.path.join(VAVDIR, "vav_FINAL_v2.mp4")
FRAMES = os.path.join(VAVDIR, "build", "frames_v2")

# ── Overrides: imágenes de Mardan ────────────────────────────────────────
V.IMG = os.path.join(VAVDIR, "img_mardan")
V.BG_FILES = {f"m0{i}": f"m0{i}.png" for i in range(1, 10)}

# (start, bg, z0, z1, pan)
V.SCENES = [
    (0.0,  "m01", 1.00, 1.08, (0, -40)),
    (4.8,  "m03", 1.08, 1.00, (0,  30)),
    (14.0, "m05", 1.00, 1.08, (0,  50)),
    (19.0, "m02", 1.06, 1.00, (0, -30)),
    (26.0, "m06", 1.00, 1.07, (0,  50)),
    (32.5, "m09", 1.05, 1.00, (0,   0)),
    (38.2, "m08", 1.00, 1.06, (0,  40)),
    (43.8, "m04", 1.06, 1.00, (0, -40)),
    (51.8, "m07", 1.00, 1.06, (0,  30)),
]
V.VAV_END = -1.0   # sin Vav dibujada encima: el rayo de la imagen es la Vav

V.TITLE_DEFS = [
    ("LA VAV",           False, 300, 82, 5.2, 13.6),
    ("GANCHO · CLAVO",   False, 340, 70, 15.0, 18.7),
    ("SEIS DIRECCIONES", False, 340, 66, 34.2, 38.0),
    ("TÚ ERES UNA VAV",  False, 330, 68, 45.6, 49.6),
    ("SÉ EL PUENTE",     True,  250, 82, 54.3, 56.9),
]

def main():
    if os.path.isdir(FRAMES): shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)
    print("Construyendo capas estáticas (v2)...")
    ctx = V.build_static()
    n = int(ctx["dur"]*V.FPS)+1
    print(f"Render {n} cuadros ({ctx['dur']:.1f}s)...")
    for fi in range(n):
        V.compose(fi/V.FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 150 == 0: print(f"  {fi}/{n}")
    print("Codificando...")
    tmp = os.path.join(VAVDIR, "build", "vav_v2_noend.mp4")
    cmd = ["ffmpeg", "-y", "-framerate", str(V.FPS), "-i", f"{FRAMES}/f%05d.png",
           "-i", V.MP3, "-c:v", "libx264", "-preset", "slow", "-crf", "18",
           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest",
           "-movflags", "+faststart", tmp]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0: print(r.stderr[-1200:]); sys.exit(1)
    print("Añadiendo end-card oficial...")
    import jashmal_endcard as JE
    JE.ENDCARD_ES = V.ENDCARD_PORTAL
    JE.append_endcard(tmp, lang="es", out_path=SALIDA)
    print(f"\nLISTO: {SALIDA}")

if __name__ == "__main__":
    main()
