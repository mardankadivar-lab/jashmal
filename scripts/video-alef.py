#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · Serie del Alfabeto #1 — La Alef (א)
═══════════════════════════════════════════════════════════════════════════
  Forma, nombre y número:
    · Alef = 1 (Dios es Uno)
    · Nombre completo אלף = 1+30+80 = 111
    · Forma = Yud arriba (10) + Yud abajo (10) + Vav en medio (6) = 26
    · 26 = יהוה (el nombre de Dios)

  Efecto clave: la Alef se atenúa y se ENCIENDEN SUS PROPIOS TRAZOS
  (máscara elíptica sobre la Alef brillante) al mencionar cada letra.
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, base64, os, subprocess, sys, re
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# PIL no hace BiDi: invierte cada secuencia de letras hebreas para que se
# muestren de derecha a izquierda (Yud a la derecha en יהוה, Alef en אלף).
def heb_rtl(s):
    return re.sub(r'[֐-׿]+', lambda m: m.group(0)[::-1], s)

VIDEO_FONDO = os.path.expanduser("~/Desktop/jashmal-videos/alef_fondo.mp4")
SALIDA      = os.path.expanduser("~/Desktop/jashmal-videos/alef_FINAL.mp4")
VOICE_ID    = "onwK4e9ZLuTAKqWW03F9"   # Daniel — voz profunda
MODEL       = "eleven_multilingual_v2"

GUION = (
    "La primera letra del alfabeto hebreo esconde el nombre de Dios. "
    "Alef. Vale uno. Porque Dios es uno. "
    "Pero si escribes su nombre completo, Alef, Lámed, Pei, suma ciento once. "
    "Y mira su forma. La Alef no es una sola línea. "
    "Es una Yud arriba. "
    "Una Yud abajo. "
    "Y una Vav que las une en el centro. "
    "Diez, más diez, más seis. Veintiséis. "
    "El mismo número del nombre de Dios. Yud, He, Vav, He. "
    "La primera letra ya contenía Su nombre. Más en jashmal punto org."
)

W, H = 720, 1280
GOLD        = (232, 200, 102)
GOLD_BRIGHT = (255, 240, 180)
TMP = "/tmp/jashmal_alef"
os.makedirs(TMP, exist_ok=True)

LAT_FONT = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
HEB_FONT = "/System/Library/Fonts/ArialHB.ttc"

# Geometría de la Alef en pantalla (centro del glifo y tamaño)
ALEF_SIZE = 460
ALEF_CY   = 470   # centro vertical de la Alef

# ─────────────────────────────────────────────────────────────────────────
#  Voz
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
    print("🎙️  Generando voz...")
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.loads(r.read())
    mp3 = os.path.join(TMP, "voz.mp3")
    with open(mp3, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))
    a = data["alignment"]
    chars, starts, ends = a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]
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
    print(f"   ✅ Voz ({dur:.1f}s, {len(palabras)} palabras)")
    return mp3, palabras, dur

def find_word(palabras, prefix, after=0.0):
    """Primera palabra cuyo inicio (sin puntuación) coincide, tras 'after' seg."""
    p = prefix.lower()
    for w in palabras:
        if w["start"] >= after and w["w"].lower().rstrip(".,").startswith(p):
            return w
    return None

# ─────────────────────────────────────────────────────────────────────────
#  Renderizado de la Alef
# ─────────────────────────────────────────────────────────────────────────
def alef_bbox():
    """Devuelve (x0,y0,x1,y1) del glifo Alef centrado en pantalla."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    f = ImageFont.truetype(HEB_FONT, ALEF_SIZE)
    bb = d.textbbox((0, 0), "א", font=f)
    gw, gh = bb[2] - bb[0], bb[3] - bb[1]
    x = (W - gw) // 2 - bb[0]
    y = ALEF_CY - gh // 2 - bb[1]
    return (x + bb[0], y + bb[1], x + bb[2], y + bb[3]), (x, y)

def draw_alef(color, glow_color, glow_radius, alpha=255):
    """Alef full-frame con glow. Devuelve imagen RGBA."""
    _, (x, y) = alef_bbox()
    f = ImageFont.truetype(HEB_FONT, ALEF_SIZE)
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    # glow
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow)
    gd.text((x, y), "א", font=f, fill=(*glow_color, min(alpha, 200)))
    glow = glow.filter(ImageFilter.GaussianBlur(glow_radius))
    img = Image.alpha_composite(img, glow)
    # cuerpo
    d = ImageDraw.Draw(img)
    d.text((x, y), "א", font=f, fill=(*color, alpha))
    return img

def alef_dim():
    return draw_alef(GOLD, GOLD, 14, alpha=70)

def alef_full_bright():
    return draw_alef(GOLD_BRIGHT, GOLD, 26, alpha=255)

def stroke_glow(cx, cy, rx, ry, label_heb, value, label_dx, label_dy):
    """Enciende una región de la Alef brillante usando máscara elíptica,
    compuesta sobre la Alef tenue. Añade etiqueta (letra hebrea + valor)."""
    base = alef_dim()
    bright = draw_alef(GOLD_BRIGHT, GOLD_BRIGHT, 22, alpha=255)
    # máscara elíptica suave
    mask = Image.new("L", (W, H), 0)
    md = ImageDraw.Draw(mask)
    md.ellipse([cx - rx, cy - ry, cx + rx, cy + ry], fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(38))
    bright.putalpha(Image.composite(bright.getchannel("A"), Image.new("L", (W, H), 0), mask))
    out = Image.alpha_composite(base, bright)

    # etiqueta: letra hebrea + valor, junto al trazo
    d = ImageDraw.Draw(out)
    hf = ImageFont.truetype(HEB_FONT, 70)
    vf = ImageFont.truetype(LAT_FONT, 52)
    lx, ly = cx + label_dx, cy + label_dy
    # halo de la letra
    halo = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    hd = ImageDraw.Draw(halo)
    hd.text((lx, ly), label_heb, font=hf, fill=(*GOLD_BRIGHT, 200))
    halo = halo.filter(ImageFilter.GaussianBlur(6))
    out = Image.alpha_composite(out, halo)
    d = ImageDraw.Draw(out)
    d.text((lx, ly), label_heb, font=hf, fill=(*GOLD_BRIGHT, 255))
    d.text((lx + 78, ly + 10), f"+{value}", font=vf, fill=(*GOLD, 255))
    return out

# ─────────────────────────────────────────────────────────────────────────
#  Overlays de texto (full-frame)
# ─────────────────────────────────────────────────────────────────────────
def png_text_center(lines, y0, fname, size=64, color=GOLD, glow=14, hebrew=False):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype(HEB_FONT if hebrew else LAT_FONT, size)
    y = y0
    for ln in lines:
        ln = heb_rtl(ln)  # corrige el orden RTL de las letras hebreas
        glw = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        gd = ImageDraw.Draw(glw)
        bb = d.textbbox((0, 0), ln, font=font); tw = bb[2] - bb[0]
        x = (W - tw) // 2 - bb[0]
        gd.text((x, y), ln, font=font, fill=(*color, 180))
        glw = glw.filter(ImageFilter.GaussianBlur(glow))
        img = Image.alpha_composite(img, glw); d = ImageDraw.Draw(img)
        for ox, oy in [(-2, 2), (2, 2), (0, 3)]:
            d.text((x+ox, y+oy), ln, font=font, fill=(8, 6, 3, 170))
        d.text((x, y), ln, font=font, fill=(*color, 255))
        y += size + 14
    img.save(fname)

def png_subtitulo(texto, fname):
    texto = texto.replace(" punto org", ".org").replace(" Punto org", ".org")
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    font = ImageFont.truetype(LAT_FONT, 40)
    palabras = texto.split(); lineas = []; cur = ""
    for p in palabras:
        t = (cur + " " + p).strip()
        if d.textbbox((0, 0), t, font=font)[2] < W - 90: cur = t
        else: lineas.append(cur); cur = p
    if cur: lineas.append(cur)
    y = H - 250
    for ln in lineas:
        bb = d.textbbox((0, 0), ln, font=font); tw = bb[2] - bb[0]
        x = (W - tw) // 2 - bb[0]
        for ox, oy in [(-2, 2), (2, 2), (0, 3), (2, -1), (-2, -1)]:
            d.text((x+ox, y+oy), ln, font=font, fill=(8, 6, 3, 200))
        d.text((x, y), ln, font=font, fill=(245, 240, 225, 255))
        y += 50
    img.save(fname)

# ─────────────────────────────────────────────────────────────────────────
#  Main
# ─────────────────────────────────────────────────────────────────────────
def main():
    if not os.path.exists(VIDEO_FONDO):
        print(f"❌ Falta el fondo: {VIDEO_FONDO}\n   Genera con kling-batch.py")
        sys.exit(1)

    mp3, palabras, dur = generar_voz()

    # ── triggers ──
    w_forma   = find_word(palabras, "forma")
    w_complet = find_word(palabras, "completo")
    w_arriba  = find_word(palabras, "arriba")
    w_abajo   = find_word(palabras, "abajo")
    w_vav     = find_word(palabras, "vav", after=(w_forma["start"] if w_forma else 0))
    w_26      = find_word(palabras, "veintis")

    t_forma  = w_forma["start"]  if w_forma  else 12.0
    t_compl  = w_complet["start"] if w_complet else 7.0
    t_arriba = w_arriba["start"] if w_arriba else t_forma + 2.0
    t_abajo  = w_abajo["start"]  if w_abajo  else t_forma + 4.0
    t_vav    = w_vav["start"]    if w_vav    else t_forma + 6.0
    t_26     = w_26["start"]     if w_26     else dur - 6.0
    t_yhvh   = t_26 + 2.4
    t_end    = dur

    # ── geometría de los trazos sobre la Alef ──
    (gx0, gy0, gx1, gy1), _ = alef_bbox()
    gw, gh = gx1 - gx0, gy1 - gy0
    # Posiciones aproximadas (se afinan viendo el resultado):
    # Yud arriba = trazo superior-derecho; Yud abajo = inferior-izquierdo;
    # Vav = diagonal central.
    yud_top = (gx0 + int(gw * 0.70), gy0 + int(gh * 0.20))
    vav_mid = (gx0 + int(gw * 0.50), gy0 + int(gh * 0.50))
    yud_bot = (gx0 + int(gw * 0.30), gy0 + int(gh * 0.80))
    rx, ry = int(gw * 0.26), int(gh * 0.22)

    print("🖼️  Renderizando overlays...")
    overlays = []  # (png, t_start, t_end)

    # Subtítulos por frase
    frases = []; buf = []; fs = None
    for p in palabras:
        if fs is None: fs = p["start"]
        buf.append(p["w"])
        if any(p["w"].rstrip().endswith(c) for c in [".", "?", "!"]):
            frases.append({"txt": " ".join(buf), "start": fs, "end": p["end"]}); buf = []; fs = None
    if buf: frases.append({"txt": " ".join(buf), "start": fs, "end": palabras[-1]["end"]})
    for i, fr in enumerate(frases):
        fn = f"{TMP}/sub_{i}.png"; png_subtitulo(fr["txt"], fn)
        overlays.append((fn, fr["start"], fr["end"]))

    # 1) Alef brillante (hero) 0 → forma
    fn = f"{TMP}/alef_hero.png"; alef_full_bright().save(fn)
    overlays.append((fn, 0.0, t_forma))

    # =1 bajo la Alef (desde "uno")
    w_uno = find_word(palabras, "uno")
    fn = f"{TMP}/eq1.png"; png_text_center(["א = 1"], 760, fn, size=72, hebrew=True)
    overlays.append((fn, (w_uno["start"] if w_uno else 4.0), t_compl))

    # Nombre completo 111 (desde "completo" → forma)
    fn = f"{TMP}/name111.png"
    png_text_center(["אלף", "1 + 30 + 80 = 111"], 740, fn, size=58, hebrew=True)
    overlays.append((fn, t_compl, t_forma))

    # 2) Alef tenue de base durante la forma
    fn = f"{TMP}/alef_dim.png"; alef_dim().save(fn)
    overlays.append((fn, t_forma, t_end))

    # 3) Trazos que se encienden (persisten hasta el final)
    fn = f"{TMP}/glow_top.png"
    stroke_glow(*yud_top, rx, ry, "י", 10, label_dx=70, label_dy=-90).save(fn)
    overlays.append((fn, t_arriba, t_end))

    fn = f"{TMP}/glow_bot.png"
    stroke_glow(*yud_bot, rx, ry, "י", 10, label_dx=-150, label_dy=10).save(fn)
    overlays.append((fn, t_abajo, t_end))

    fn = f"{TMP}/glow_vav.png"
    stroke_glow(*vav_mid, int(rx*1.15), int(ry*1.25), "ו", 6, label_dx=110, label_dy=-30).save(fn)
    overlays.append((fn, t_vav, t_end))

    # 4) Reveal 10+10+6=26
    fn = f"{TMP}/eq26.png"; png_text_center(["10 + 10 + 6 = 26"], 770, fn, size=66, color=GOLD_BRIGHT, glow=16)
    overlays.append((fn, t_26, t_end))

    # 5) יהוה = 26
    fn = f"{TMP}/yhvh.png"; png_text_center(["יהוה = 26"], 880, fn, size=72, color=GOLD_BRIGHT, glow=18, hebrew=True)
    overlays.append((fn, t_yhvh, t_end))

    print(f"🎬 Componiendo {len(overlays)} overlays...")
    inputs = ["-stream_loop", "-1", "-i", VIDEO_FONDO, "-i", mp3]
    for ov in overlays: inputs += ["-i", ov[0]]
    fc = f"[0:v]trim=duration={dur:.2f},setpts=PTS-STARTPTS,scale={W}:{H}[base];"
    prev = "base"
    for k, (fn, st, en) in enumerate(overlays):
        idx = k + 2; nxt = f"v{k}"
        fc += f"[{prev}][{idx}:v]overlay=0:0:enable='between(t,{st:.2f},{en:.2f})'[{nxt}];"
        prev = nxt
    fc = fc.rstrip(";")
    cmd = ["ffmpeg", "-y"] + inputs + ["-filter_complex", fc,
        "-map", f"[{prev}]", "-map", "1:a",
        "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-shortest", SALIDA]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ ffmpeg:"); print(r.stderr[-900:]); sys.exit(1)
    print(f"\n✅ VIDEO: {SALIDA}")

if __name__ == "__main__":
    main()
