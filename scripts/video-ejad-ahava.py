#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · Video #2 — Ejad + Ahavá = YHVH (13 + 13 = 26)
═══════════════════════════════════════════════════════════════════════════
  Pipeline completo:
    1. Genera voz con ElevenLabs (tiempos por palabra)
    2. Renderiza letras hebreas animadas con gematría
    3. Subtítulos sincronizados
    4. Pega todo sobre el video de fondo con FFmpeg
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, base64, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ─────────────────────────────────────────────────────────────────────────
#  ⚙️  CONFIGURACIÓN
# ─────────────────────────────────────────────────────────────────────────
VIDEO_FONDO = os.path.expanduser("~/Desktop/jashmal-videos/ejad_ahava_yhvh.mp4")
SALIDA      = os.path.expanduser("~/Desktop/jashmal-videos/ejad_ahava_FINAL.mp4")
VOICE_ID    = "onwK4e9ZLuTAKqWW03F9"   # Daniel — voz masculina profunda
MODEL       = "eleven_multilingual_v2"

# Guion hablado (pronunciación fonética para la voz en español)
GUION = (
    "En hebreo, Uno y Amor tienen el mismo número. "
    "Ejad. Uno. Vale trece. "
    "Ahavá. Amor. También trece. "
    "¿Coincidencia? La Cabalá dice que no. Súmalos. "
    "Trece más trece: veintiséis. "
    "Y veintiséis es el valor exacto del nombre de Dios. "
    "Yud, He, Vav, He. "
    "Dios es Uno. Dios es Amor. Y la suma de los dos es Su nombre. "
    "Más en jashmal punto org."
)

# Gematría a animar: (palabra disparadora → letras con valores)
# אחד = 1+8+4 = 13 | אהבה = 1+5+2+5 = 13 | יהוה = 10+5+6+5 = 26
GEMATRIA = {
    "Ejad": {
        "letras": [("א",1), ("ח",8), ("ד",4)],
        "total": 13,
        "color": (232, 200, 102),   # dorado
    },
    "Ahavá": {
        "letras": [("א",1), ("ה",5), ("ב",2), ("ה",5)],
        "total": 13,
        "color": (232, 200, 102),   # dorado
    },
}

# Reveal especial: 13 + 13 = 26 = יהוה
REVEAL_TRIGGER = "veintiséis"   # palabra que dispara el reveal final
REVEAL_COLOR   = (255, 235, 150) # dorado brillante

W, H = 720, 1280
HEB_FONT = None
LAT_FONT = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
TMP = "/tmp/jashmal_v2"
os.makedirs(TMP, exist_ok=True)

# ─────────────────────────────────────────────────────────────────────────
#  Fuente hebrea
# ─────────────────────────────────────────────────────────────────────────
def buscar_fuente_hebrea():
    for c in ["/System/Library/Fonts/ArialHB.ttc",
              "/System/Library/Fonts/Supplemental/Arial.ttf",
              "/System/Library/Fonts/Supplemental/Times New Roman.ttf"]:
        if os.path.exists(c):
            return c
    return LAT_FONT

# ─────────────────────────────────────────────────────────────────────────
#  1. Voz + tiempos (ElevenLabs)
# ─────────────────────────────────────────────────────────────────────────
def leer_key():
    env = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    with open(env) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                return line.split("=", 1)[1].strip()
    return ""

def generar_voz():
    key = leer_key()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({
        "text": GUION, "model_id": MODEL,
        "voice_settings": {"stability": 0.50, "similarity_boost": 0.75, "speed": 0.90},
    }).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key, "Content-Type": "application/json"})
    print("🎙️  Generando voz con ElevenLabs...")
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.loads(r.read())
    mp3 = os.path.join(TMP, "voz.mp3")
    with open(mp3, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))
    align = data["alignment"]
    chars = align["characters"]
    starts = align["character_start_times_seconds"]
    ends   = align["character_end_times_seconds"]
    palabras = []; word = ""; ws = 0; we = 0
    for ch, st, en in zip(chars, starts, ends):
        if ch == " ":
            if word: palabras.append({"w": word, "start": ws, "end": we})
            word = ""
        else:
            if not word: ws = st
            word += ch; we = en
    if word: palabras.append({"w": word, "start": ws, "end": we})
    dur = ends[-1] if ends else 0
    print(f"   ✅ Voz lista ({dur:.1f}s, {len(palabras)} palabras)")
    return mp3, palabras, dur

# ─────────────────────────────────────────────────────────────────────────
#  2. Renderizado de overlays
# ─────────────────────────────────────────────────────────────────────────
def limpiar(texto):
    return texto.replace(" punto org", ".org").replace(" Punto org", ".org")

def png_subtitulo(texto, fname):
    texto = limpiar(texto)
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype(LAT_FONT, 42)
    palabras = texto.split(); lineas = []; cur = ""
    for p in palabras:
        t = (cur + " " + p).strip()
        if d.textbbox((0, 0), t, font=font)[2] < W - 80: cur = t
        else: lineas.append(cur); cur = p
    if cur: lineas.append(cur)
    y = H - 260
    for ln in lineas:
        bb = d.textbbox((0, 0), ln, font=font); tw = bb[2] - bb[0]
        x = (W - tw) // 2 - bb[0]
        for ox, oy in [(-2, 2), (2, 2), (0, 3), (2, -1), (-2, -1)]:
            d.text((x+ox, y+oy), ln, font=font, fill=(8, 6, 3, 200))
        d.text((x, y), ln, font=font, fill=(245, 240, 225, 255))
        y += 54
    img.save(fname)

def png_letra(letra, valor, color, fname):
    bw, bh = 150, 200
    img = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    hfont = ImageFont.truetype(HEB_FONT, 110)
    vfont = ImageFont.truetype(LAT_FONT, 40)
    vb = d.textbbox((0, 0), f"+{valor}", font=vfont); vw = vb[2] - vb[0]
    d.text(((bw - vw)//2, 6), f"+{valor}", font=vfont, fill=(*color, 255))
    lb = d.textbbox((0, 0), letra, font=hfont); lw = lb[2] - lb[0]
    lx = (bw - lw)//2 - lb[0]
    glow = Image.new("RGBA", (bw, bh), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.text((lx, 55), letra, font=hfont, fill=(*color, 200))
    glow = glow.filter(ImageFilter.GaussianBlur(8))
    img = Image.alpha_composite(img, glow); d = ImageDraw.Draw(img)
    for ox, oy in [(-2, 2), (2, 2), (0, 3)]:
        d.text((lx+ox, 55+oy), letra, font=hfont, fill=(8, 6, 3, 180))
    d.text((lx, 55), letra, font=hfont, fill=(255, 245, 210, 255))
    img.save(fname)

def png_ecuacion(fname):
    """13 + 13 = 26 y יהוה en grande, centrado.
    PIL no respeta RTL, así que renderizamos יהוה letra por letra de derecha a izquierda:
    י (Yud) a la derecha, ה (He) final a la izquierda."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    font_num = ImageFont.truetype(LAT_FONT, 90)
    font_heb = ImageFont.truetype(HEB_FONT, 100)
    color = REVEAL_COLOR

    # Línea 1: "13 + 13 = 26" — texto latino, centrado normal
    txt_num = "13 + 13 = 26"
    y_num = 340
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    bb = d.textbbox((0, 0), txt_num, font=font_num); tw = bb[2] - bb[0]
    x = (W - tw)//2 - bb[0]
    gd.text((x, y_num), txt_num, font=font_num, fill=(*color, 180))
    glow = glow.filter(ImageFilter.GaussianBlur(14))
    img = Image.alpha_composite(img, glow); d = ImageDraw.Draw(img)
    for ox, oy in [(-2, 2), (2, 2), (0, 3)]:
        d.text((x+ox, y_num+oy), txt_num, font=font_num, fill=(8, 6, 3, 180))
    d.text((x, y_num), txt_num, font=font_num, fill=(*color, 255))

    # Línea 2: יהוה — renderizamos cada letra individualmente RTL
    # Orden visual de izquierda a derecha: ה ו ה י  (se lee de derecha: י ה ו ה)
    letras_yhvh = ["י", "ה", "ו", "ה"]   # orden hebreo (derecha a izquierda)
    y_heb = 470
    # Calcular ancho total para centrar el bloque
    anchos = []
    for ltr in letras_yhvh:
        bb = d.textbbox((0, 0), ltr, font=font_heb)
        anchos.append(bb[2] - bb[0])
    gap_heb = 12
    total_w = sum(anchos) + gap_heb * (len(letras_yhvh) - 1)
    # Empezar desde la derecha: primer letra (Yud) va al extremo derecho del bloque
    x_right = (W + total_w) // 2   # borde derecho del bloque centrado
    cur_x = x_right
    for ltr, aw in zip(letras_yhvh, anchos):
        cur_x -= aw
        bb = d.textbbox((0, 0), ltr, font=font_heb)
        lx = cur_x - bb[0]
        glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow)
        gd.text((lx, y_heb), ltr, font=font_heb, fill=(*color, 200))
        glow = glow.filter(ImageFilter.GaussianBlur(12))
        img = Image.alpha_composite(img, glow); d = ImageDraw.Draw(img)
        for ox, oy in [(-2, 2), (2, 2), (0, 3)]:
            d.text((lx+ox, y_heb+oy), ltr, font=font_heb, fill=(8, 6, 3, 180))
        d.text((lx, y_heb), ltr, font=font_heb, fill=(*color, 255))
        cur_x -= gap_heb

    img.save(fname)

# ─────────────────────────────────────────────────────────────────────────
#  3. Main
# ─────────────────────────────────────────────────────────────────────────
def main():
    global HEB_FONT
    HEB_FONT = buscar_fuente_hebrea()
    print(f"🔤 Fuente hebrea: {os.path.basename(HEB_FONT)}")

    if not os.path.exists(VIDEO_FONDO):
        print(f"❌ No existe el video de fondo: {VIDEO_FONDO}")
        print("   Primero genera el fondo con kling-batch.py")
        sys.exit(1)

    mp3, palabras, dur = generar_voz()

    # Agrupar en frases para subtítulos
    frases = []; buf = []; fstart = None
    for p in palabras:
        if fstart is None: fstart = p["start"]
        buf.append(p["w"])
        if any(p["w"].rstrip().endswith(c) for c in [".", "?", "!", ":"]):
            frases.append({"txt": " ".join(buf), "start": fstart, "end": p["end"]})
            buf = []; fstart = None
    if buf: frases.append({"txt": " ".join(buf), "start": fstart, "end": palabras[-1]["end"]})

    overlays = []  # (png_path, t_start, t_end, x, y)

    # Subtítulos
    for i, fr in enumerate(frases):
        fn = f"{TMP}/sub_{i}.png"
        png_subtitulo(fr["txt"], fn)
        overlays.append((fn, fr["start"], fr["end"], 0, 0))

    # Letras de gematría por trigger
    for trigger, info in GEMATRIA.items():
        hit = None
        trigger_prefix = trigger.lower()[:4]
        for p in palabras:
            if p["w"].lower().rstrip(".,").startswith(trigger_prefix):
                hit = p; break
        if not hit:
            print(f"   ⚠️ No encontré '{trigger}' en la voz, saltando")
            continue
        t0 = hit["start"]
        n = len(info["letras"])
        box_w = 150; gap = 8
        total_w = n * box_w + (n - 1) * gap
        x0 = (W - total_w) // 2
        letter_end = t0 + 2.5
        for j, (letra, valor) in enumerate(info["letras"]):
            fn = f"{TMP}/gem_{trigger}_{j}.png"
            png_letra(letra, valor, info["color"], fn)
            # RTL: j=0 (primera letra hebrea) va a la derecha → posición (n-1-j)
            lx = x0 + (n - 1 - j) * (box_w + gap); ly = 400
            overlays.append((fn, t0 + 0.15 + j * 0.28, letter_end, lx, ly))

    # Reveal final: 13 + 13 = 26 = יהוה
    reveal_hit = None
    for p in palabras:
        if p["w"].lower().startswith("veintis"):
            reveal_hit = p; break
    if reveal_hit:
        fn = f"{TMP}/reveal_ecuacion.png"
        png_ecuacion(fn)
        overlays.append((fn, reveal_hit["start"] - 0.1, reveal_hit["end"] + 3.5, 0, 0))
        print(f"   ✨ Reveal de ecuación en t={reveal_hit['start']:.2f}s")
    else:
        print("   ⚠️ No encontré 'veintiséis' para el reveal final")

    print(f"🎬 Componiendo {len(overlays)} overlays...")

    inputs = ["-stream_loop", "-1", "-i", VIDEO_FONDO, "-i", mp3]
    for ov in overlays:
        inputs += ["-i", ov[0]]

    fc = f"[0:v]trim=duration={dur:.2f},setpts=PTS-STARTPTS[base];"
    prev = "base"
    for k, (fn, st, en, x, y) in enumerate(overlays):
        idx = k + 2
        nxt = f"v{k}"
        fc += f"[{prev}][{idx}:v]overlay={x}:{y}:enable='between(t,{st:.2f},{en:.2f})'[{nxt}];"
        prev = nxt
    fc = fc.rstrip(";")

    cmd = ["ffmpeg", "-y"] + inputs + [
        "-filter_complex", fc,
        "-map", f"[{prev}]", "-map", "1:a",
        "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-shortest", SALIDA,
    ]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ Error ffmpeg:"); print(r.stderr[-800:]); sys.exit(1)
    print(f"\n✅ VIDEO FINAL: {SALIDA}")

if __name__ == "__main__":
    main()
