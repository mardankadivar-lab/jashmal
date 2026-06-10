#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · CIERRE DE MARCA  (beat final ESTÁNDAR de todos los videos)
═══════════════════════════════════════════════════════════════════════════
  REGLA DE MARCA (Mardan, 2026-06-07): TODOS los videos de Jashmal terminan
  con la portada de Jashmal como outro. Refuerza la marca en cada pieza.

      • Videos en ESPAÑOL  -> jashmal_endcard_ES_clean.png
      • Videos en INGLÉS   -> jashmal_endcard_big.png (se reescala/recorta
                              al tamaño exacto del video)

  El outro entra con transición DIP-TO-BLACK (consistente con las demás
  transiciones), se mantiene fijo ~3.5s y hace fade-out al final. Va en
  SILENCIO (la voz ya terminó); el audio se extiende con silencio.

  USO desde cualquier script de video (el último paso, después de armar el
  video con voz):

      from jashmal_endcard import append_endcard
      append_endcard(SALIDA, lang="es")   # sobrescribe SALIDA con el cierre

  o en una sola línea desde la terminal:

      python3 scripts/jashmal_endcard.py /ruta/al/video.mp4 es
═══════════════════════════════════════════════════════════════════════════
"""
import os, sys, json, subprocess, tempfile

# ── Portadas de marca (assets) ───────────────────────────────────────────
VIDEOS_DIR  = os.path.expanduser("~/Desktop/jashmal-videos")
ENDCARD_ES  = os.path.join(VIDEOS_DIR, "jashmal_endcard_ES_clean.png")   # ES, sin botón
ENDCARD_EN  = os.path.expanduser("~/Desktop/jashmal_endcard_big.png")     # EN (1290×2406)

# ── Parámetros del beat (estándar) ───────────────────────────────────────
HOLD  = 3.5    # segundos que la portada se mantiene fija
TRANS = 0.7    # duración del dip-to-black (entrada) y del fade-out (salida)


def _probe(video_path):
    """Devuelve (W, H, fps, duración_video) del stream de video."""
    out = subprocess.check_output([
        "ffprobe", "-v", "error", "-select_streams", "v:0",
        "-show_entries", "stream=width,height,r_frame_rate,duration",
        "-show_entries", "format=duration",
        "-of", "json", video_path
    ]).decode()
    data = json.loads(out)
    st = data["streams"][0]
    W, H = int(st["width"]), int(st["height"])
    num, den = st["r_frame_rate"].split("/")
    fps = float(num) / float(den)
    dur = st.get("duration")
    if dur is None or dur == "N/A":
        dur = data["format"]["duration"]
    return W, H, fps, float(dur)


def _fit_endcard(src_png, W, H, dst_png):
    """Reescala la portada para CUBRIR WxH y recorta centrado al tamaño exacto."""
    from PIL import Image
    im = Image.open(src_png).convert("RGB")
    sw, sh = im.size
    scale = max(W / sw, H / sh)
    nw, nh = round(sw * scale), round(sh * scale)
    im = im.resize((nw, nh), Image.LANCZOS)
    left, top = (nw - W) // 2, (nh - H) // 2
    im = im.crop((left, top, left + W, top + H))
    im.save(dst_png)


def append_endcard(video_path, lang="es", out_path=None, hold=HOLD, trans=TRANS):
    """
    Añade la portada de Jashmal como outro al final de `video_path`.

      lang     : "es" -> portada española · "en" -> portada inglesa.
      out_path : destino. Si es None, SOBRESCRIBE `video_path`.
      hold     : segundos que la portada se mantiene fija (def. 3.5).
      trans    : dip-to-black de entrada y fade-out de salida (def. 0.7).

    Mantiene H264 1080-vertical + AAC. El outro va en silencio.
    """
    lang = lang.lower()
    src_endcard = ENDCARD_ES if lang.startswith("es") else ENDCARD_EN
    if not os.path.exists(src_endcard):
        raise FileNotFoundError(f"No se encontró la portada: {src_endcard}")

    W, H, fps, dur = _probe(video_path)
    fps_i = round(fps)
    offset = max(0.0, dur - trans)
    outro_len = hold + trans            # imagen total: trans (entrada) + hold visible
    fade_out_st = outro_len - trans     # fade-out arranca en los últimos `trans`

    tmpdir = tempfile.mkdtemp(prefix="jashmal_endcard_")
    fit_png = os.path.join(tmpdir, "endcard_fit.png")
    _fit_endcard(src_endcard, W, H, fit_png)

    final_out = out_path or video_path
    tmp_out = os.path.join(tmpdir, "out.mp4")

    fc = (
        f"[0:v]fps={fps_i},scale={W}:{H},setsar=1,format=yuv420p[v0];"
        f"[1:v]fps={fps_i},scale={W}:{H},setsar=1,format=yuv420p,"
        f"fade=t=out:st={fade_out_st}:d={trans}[v1];"
        f"[v0][v1]xfade=transition=fadeblack:duration={trans}:offset={offset}[vout];"
        f"[0:a]apad[aout]"
    )
    cmd = [
        "ffmpeg", "-y",
        "-i", video_path,
        "-loop", "1", "-t", f"{outro_len}", "-i", fit_png,
        "-filter_complex", fc,
        "-map", "[vout]", "-map", "[aout]",
        "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
        "-crf", "18", "-preset", "medium",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest", "-movflags", "+faststart",
        tmp_out,
        "-loglevel", "error", "-stats",
    ]
    subprocess.run(cmd, check=True)

    # Reemplaza el destino (atómico-ish) sólo si ffmpeg produjo el archivo
    os.replace(tmp_out, final_out)
    print(f"✓ Cierre de marca ({lang}) añadido -> {final_out}  ({dur + outro_len:.1f}s)")
    return final_out


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Uso: python3 jashmal_endcard.py <video.mp4> [es|en] [out.mp4]")
        sys.exit(1)
    vp = sys.argv[1]
    lg = sys.argv[2] if len(sys.argv) > 2 else "es"
    op = sys.argv[3] if len(sys.argv) > 3 else None
    append_endcard(vp, lang=lg, out_path=op)
