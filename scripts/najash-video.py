#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · "Najash y Mashíaj (358)"  — reel vertical 1080×1920
═══════════════════════════════════════════════════════════════════════════
  Mismo motor que Betsabé/Tamar, pero:
    • La VOZ ya existe (najash_voz.mp3 + najash_voz_timing.json) → NO se regenera.
    • Las imágenes son fotos verticales completas (NO grillas 2×2) → cover-scale.
    • Clips animados (Kling reptiliano→serpiente, cobre brillante) insertados como
      video, escalados a vertical.
    • Rótulos HEBREOS con niqqud (RTL real vía libraqm/HarfBuzz + FrankRuhlLibre).
    • Subtítulos en español sincronizados al timing JSON.
    • Transiciones: dip-to-black ~0.5s entre beats (más marcado en beat 2 morph y
      beat 7 transfiguración). Se hornean en cada clip (fade in/out) para NO mover
      la sincronía con el audio (cortes a tope, sin xfade).
    • Render por LOTES de overlays (≤12 por pasada) anti-deadlock.

  Uso:
    python3 scripts/najash-video.py              # render completo
    python3 scripts/najash-video.py --test-labels  # solo hoja de rótulos hebreos
═══════════════════════════════════════════════════════════════════════════
"""
import json, os, subprocess, sys, re, unicodedata
from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1080, 1920, 30

SRC_DIR = "/Users/mardan/Desktop/jashmal-videos/Najash"
MP3     = os.path.join(SRC_DIR, "najash_voz.mp3")
TIMING  = os.path.join(SRC_DIR, "najash_voz_timing.json")
SALIDA  = "/Users/mardan/Desktop/NAJASH_MASHIAJ_REEL.mp4"
TMP     = "/tmp/najash_render"
os.makedirs(TMP, exist_ok=True)

# Fuentes
FONT_HEB   = "/Users/mardan/workspace/jashmal/scripts/fonts/FrankRuhlLibre.ttf"
FONT_TITLE = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FONT_SUB   = "/System/Library/Fonts/Supplemental/Georgia.ttf"
FONT_SMALL = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"

GOLD      = (232, 200, 102)
GOLD_SOFT = (245, 238, 210)
COPPER    = (210, 150, 95)
SHADOW    = (5, 4, 2)

# ─────────────────────────────────────────────────────────────────────────
#  BEATS  (los _start/_end se calculan por marcador; algunos con override)
# ─────────────────────────────────────────────────────────────────────────
#  type: "kb" (imagen fija Ken Burns) | "clip" (mp4 animado)
#  match: substring del nombre de archivo
#  heb: lista de líneas hebreas (cada una se renderiza RTL con niqqud)
#  arrow_line: caso especial najash → mashiaj
#  small: cita/latino debajo
#  brand: True → línea de marca חַשְׁמַל · jashmal.org
# Rutas EXACTAS de las imágenes UPSCALEADAS (sufijo _0/_1/_2). Hardcodeadas
# para garantizar que el render use estos archivos y NUNCA una grilla vieja.
F_GANCHO   = os.path.join(SRC_DIR, "u6748946711_A_single_golden_serpent_coiled_in_deep_darkness_a_b6ff6a08-3798-473e-a2f4-f8273b63989e_0.png")
F_REPTIL   = os.path.join(SRC_DIR, "beat1-2_reptiliano.png")
F_KLING    = os.path.join(SRC_DIR, "kling_20260608_作品_Slow_omino_2174_0.mp4")
F_ARRASTRA = os.path.join(SRC_DIR, "beat2_serpiente_arrastra.png")
F_GEMATRIA = os.path.join(SRC_DIR, "u6748946711_Abstract_kabbalistic_energy_glowing_particles_and_67e16487-6eb4-4dea-b171-3515e6d64682_1.png")
F_DESIERTO = os.path.join(SRC_DIR, "u6748946711_A_vast_empty_desert_under_a_heavy_bronze_sky_a_fa_42eaba9e-7200-4ce9-b965-9889fba388f3_0.png")
F_SERPDES  = os.path.join(SRC_DIR, "u6748946711_Symbolic_scene_of_glowing_fiery_serpent_silhouett_66b00014-8d41-4373-b630-437de5d64815_1.png")
F_COBRE    = os.path.join(SRC_DIR, "u6748946711_A_gleaming_copper_serpent_coiled_around_a_tall_ve_129d3ca6-daa6-4b00-8592-8f8f2e59ba9c_2.mp4")
F_COBREST  = os.path.join(SRC_DIR, "beat6b_cobre_still_from_mp4.png")  # último cuadro del mp4 de cobre (continúa el beat)
F_TRANSFIG = os.path.join(SRC_DIR, "u6748946711_A_copper_serpent_on_a_staff_transfiguring_into_li_0c12a460-7d76-451d-9de2-bb48637d4dab_1.png")
F_CIERRE   = os.path.join(SRC_DIR, "u6748946711_A_serpent_made_of_golden_light_rising_and_dissolv_e3834735-d0fc-45b3-bab4-3a96189abdc4_2.png")

SEGMENTS = [
    {  # 1 — GANCHO
        "name": "gancho", "marker": "que tienen en comun",
        "type": "kb", "path": F_GANCHO,
        "kb": "in", "fin": 0.5, "fout": 0.30,
        "heb": ["נָחָשׁ = 358 = מָשִׁיחַ"], "small": None,
    },
    {  # 2a — VENENO DEL EDÉN: el ser reptiliano erguido
        "name": "reptiliano", "marker": "todo empezo en un jardin",
        "type": "kb", "path": F_REPTIL,
        "kb": "in", "fin": 0.30, "fout": 0.40,
        "heb": [], "small": "Bereshit 3:1",
    },
    {  # 2b — TRANSFORMACIÓN reptiliano → serpiente (Kling)  ★ momento clave
        "name": "morph", "marker": "y la duda se volvio veneno",
        "end_override": 29.4,
        "type": "clip", "path": F_KLING,
        "fin": 0.40, "fout": 0.40,
        "heb": [], "small": None,
    },
    {  # 2c — la serpiente arrastra a la humanidad
        "name": "arrastra", "start_override": 29.4, "marker": "ese veneno arrastro",
        "type": "kb", "path": F_ARRASTRA,
        "kb": "down", "fin": 0.40, "fout": 0.30,
        "heb": [], "small": None,
    },
    {  # 3 — GEMATRÍA
        "name": "gematria", "marker": "en hebreo cada letra",
        "type": "kb", "path": F_GEMATRIA,
        "kb": "in", "fin": 0.30, "fout": 0.30,
        "heb": ["נ50 ח8 ש300 = 358", "מ40 ש300 י10 ח8 = 358"], "small": None,
    },
    {  # 4 — LA PREGUNTA / DESIERTO
        "name": "desierto", "marker": "como puede el destructor",
        "type": "kb", "path": F_DESIERTO,
        "kb": "in", "fin": 0.30, "fout": 0.30,
        "heb": [], "small": None,
    },
    {  # 5 — SERPIENTES DEL DESIERTO
        "name": "serpientes", "marker": "israel marcha por el desierto",
        "type": "kb", "path": F_SERPDES,
        "kb": "up", "fin": 0.30, "fout": 0.30,
        "heb": [], "small": "Bemidbar 21",
    },
    {  # 6a — SERPIENTE DE COBRE ALZADA (animada)
        "name": "cobre_anim", "marker": "haz una serpiente y ponla",
        "end_override": 96.7,
        "type": "clip", "path": F_COBRE,
        "fin": 0.30, "fout": 0.35,
        "heb": ["נְחַשׁ הַנְּחֹשֶׁת"], "small": "Bemidbar 21:8-9",
    },
    {  # 6b — cobre alzada (still derivado del mp4, continúa el beat)
        "name": "cobre_still", "start_override": 96.7, "marker": "el mordido alzaba",
        "type": "kb", "path": F_COBREST,
        "kb": "in", "fin": 0.35, "fout": 0.40,
        "heb": ["נְחַשׁ הַנְּחֹשֶׁת"], "small": "Bemidbar 21:8-9",
    },
    {  # 7 — ¿MATA O DA VIDA? transfiguración cobre → vivo
        "name": "transfig", "marker": "los sabios preguntan",
        "type": "kb", "path": F_TRANSFIG,
        "kb": "in_strong", "fin": 0.45, "fout": 0.45,
        "heb": [], "small": "Mishná Rosh Hashaná 3:8",
    },
    {  # 8 — CIERRE REDENTOR
        "name": "cierre", "marker": "por eso najash y mashiaj",
        "type": "kb", "path": F_CIERRE,
        "kb": "out", "fin": 0.45, "fout": 0.60,
        "heb": [], "arrow_line": True,           # נָחָשׁ → מָשִׁיחַ
        "small": "La misma fuerza, elevada", "brand": True,
    },
]

# ─────────────────────────────────────────────────────────────────────────
#  Texto: normalización + búsqueda de marcadores
# ─────────────────────────────────────────────────────────────────────────
def norm(s):
    s = s.lower()
    s = "".join(c for c in unicodedata.normalize("NFD", s) if unicodedata.category(c) != "Mn")
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]", " ", s)).strip()


def find_path(match, ext=None):
    for f in sorted(os.listdir(SRC_DIR)):
        if match in f and (ext is None or f.lower().endswith(ext)):
            return os.path.join(SRC_DIR, f)
    raise FileNotFoundError(f"No encontré archivo con '{match}' (ext={ext}) en {SRC_DIR}")


# ─────────────────────────────────────────────────────────────────────────
#  RÓTULOS HEBREOS  (RTL real: libraqm + HarfBuzz; niqqud correcto)
# ─────────────────────────────────────────────────────────────────────────
def _text_strip(text, font, color, direction, shadow=True):
    """Strip RGBA ajustado al texto, con sombra. direction: 'rtl'|'ltr'."""
    lang = "he" if direction == "rtl" else None
    tmp = Image.new("RGBA", (10, 10)); dt = ImageDraw.Draw(tmp)
    bb = dt.textbbox((0, 0), text, font=font, direction=direction, language=lang)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    pad = 12
    img = Image.new("RGBA", (tw + pad * 2, th + pad * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    ox0, oy0 = pad - bb[0], pad - bb[1]
    if shadow:
        for dx, dy in [(-3, 3), (3, 3), (0, 4), (3, -1), (-3, -1), (0, 0), (2, 2)]:
            d.text((ox0 + dx, oy0 + dy), text, font=font, fill=(*SHADOW, 235),
                   direction=direction, language=lang)
    d.text((ox0, oy0), text, font=font, fill=(*color, 255),
           direction=direction, language=lang)
    return img


def _arrow_strip(size, color):
    """Flecha dorada apuntando a la IZQUIERDA (flujo najash → mashiaj en RTL)."""
    w = int(size * 1.7); h = int(size * 1.1)
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    cy = h // 2; lw = max(4, size // 14)
    # sombra
    for off in (3, 0):
        col = (*SHADOW, 230) if off else (*color, 255)
        x_sh, y_sh = (off, off)
        d.line([(w - 6 + x_sh, cy + y_sh), (int(size * 0.55) + x_sh, cy + y_sh)],
               fill=col, width=lw)
        head = int(size * 0.55)
        d.polygon([(head + x_sh, cy + y_sh),
                   (head + int(size * 0.42) + x_sh, cy - int(size * 0.30) + y_sh),
                   (head + int(size * 0.42) + x_sh, cy + int(size * 0.30) + y_sh)],
                  fill=col)
    return img


def _compose_line(strips, direction, gap):
    """Pega strips horizontalmente. logical[0] a la DERECHA si direction='rtl'."""
    order = list(reversed(strips)) if direction == "rtl" else list(strips)
    tw = sum(s.width for s in order) + gap * (len(order) - 1)
    th = max(s.height for s in order)
    line = Image.new("RGBA", (tw, th), (0, 0, 0, 0))
    x = 0
    for s in order:
        line.alpha_composite(s, (x, (th - s.height) // 2))
        x += s.width + gap
    return line


def build_label(seg, fname):
    """Construye el overlay de un beat: líneas hebreas (arriba) + cita latina +
    marca. Devuelve True si dibujó algo."""
    rows = []  # cada row: imagen RGBA ya compuesta (línea)
    heb_font = ImageFont.truetype(FONT_HEB, 96)
    heb_font_sm = ImageFont.truetype(FONT_HEB, 80)
    sub_font = ImageFont.truetype(FONT_SMALL, 44)
    brand_heb = ImageFont.truetype(FONT_HEB, 56)
    brand_lat = ImageFont.truetype(FONT_SUB, 48)

    heb_lines = seg.get("heb", [])
    if seg.get("arrow_line"):
        naj = _text_strip("נָחָשׁ", heb_font, GOLD, "rtl")
        arr = _arrow_strip(96, GOLD)
        mas = _text_strip("מָשִׁיחַ", heb_font, GOLD, "rtl")
        rows.append(_compose_line([naj, arr, mas], "rtl", gap=26))
    for ln in heb_lines:
        f = heb_font_sm if len(heb_lines) > 1 else heb_font
        rows.append(_text_strip(ln, f, GOLD, "rtl"))
    if seg.get("small"):
        rows.append(_text_strip(seg["small"], sub_font, GOLD_SOFT, "ltr"))
    if seg.get("brand"):
        bh = _text_strip("חַשְׁמַל", brand_heb, GOLD, "rtl")
        bl = _text_strip(" · jashmal.org", brand_lat, GOLD, "ltr")
        rows.append(_compose_line([bh, bl], "ltr", gap=6))

    if not rows:
        return False

    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    # bloque hebreo/títulos arriba; marca (si hay) se baja al pie
    top = 150
    gap_y = 26
    brand_row = rows.pop() if seg.get("brand") else None
    for r in rows:
        x = (W - r.width) // 2
        img.alpha_composite(r, (x, top))
        top += r.height + gap_y
    if brand_row is not None:
        x = (W - brand_row.width) // 2
        # justo DEBAJO de la caja de subtítulos (borde inferior fijo en H-284):
        # antes la marca quedaba en H-360, dentro del subtítulo, y salía tenue.
        by = H - 235
        # fondo oscuro semitransparente para que la marca se lea sobre el
        # resplandor brillante de la imagen del cierre (antes salía tenue)
        pad_x, pad_y = 46, 22
        pill = Image.new("RGBA", (brand_row.width + pad_x * 2, brand_row.height + pad_y * 2), (0, 0, 0, 0))
        ImageDraw.Draw(pill).rounded_rectangle(
            [0, 0, pill.width - 1, pill.height - 1], radius=pill.height // 2,
            fill=(6, 5, 3, 170))
        img.alpha_composite(pill, (x - pad_x, by - pad_y))
        img.alpha_composite(brand_row, (x, by))
    img.save(fname)
    return True


# ─────────────────────────────────────────────────────────────────────────
#  Subtítulos (español, sincronizados al timing)
# ─────────────────────────────────────────────────────────────────────────
def png_sub(text, fname):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    txt = text.upper()
    font = ImageFont.truetype(FONT_TITLE, 50)
    words = txt.split(); lines = []; cur = ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textbbox((0, 0), t, font=font)[2] < W - 120: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    line_h = 62
    block_h = len(lines) * line_h
    top = H - 300 - block_h
    pad = 26
    d.rectangle([40, top - pad, W - 40, top + block_h + pad - 10], fill=(6, 5, 3, 120))
    y = top
    for ln in lines:
        bb = d.textbbox((0, 0), ln, font=font); tw = bb[2] - bb[0]
        x = (W - tw) // 2 - bb[0]
        for ox, oy in [(-3, 3), (3, 3), (0, 4), (2, -2), (-2, -2)]:
            d.text((x + ox, y + oy), ln, font=font, fill=(*SHADOW, 230))
        d.text((x, y), ln, font=font, fill=(*GOLD_SOFT, 255))
        y += line_h
    img.save(fname)


def frases_de_palabras(palabras):
    frases = []; buf = []; fstart = None
    for p in palabras:
        if fstart is None: fstart = p["start"]
        buf.append(p["w"])
        if any(p["w"].endswith(c) for c in [".", "?", "!", ":"]):
            frases.append({"txt": " ".join(buf), "start": fstart, "end": p["end"]})
            buf = []; fstart = None
    if buf:
        frases.append({"txt": " ".join(buf), "start": fstart, "end": palabras[-1]["end"]})
    return frases


# ─────────────────────────────────────────────────────────────────────────
#  Video: cover-scale + Ken Burns / clips, con fades horneados
# ─────────────────────────────────────────────────────────────────────────
def prescale_cover(src, dst):
    """Imagen completa → lienzo 1350×2400 (cover, recorte centrado)."""
    im = Image.open(src).convert("RGB")
    tw, th = 1350, 2400
    sw, sh = im.size
    scale = max(tw / sw, th / sh)
    nw, nh = int(round(sw * scale)), int(round(sh * scale))
    im = im.resize((nw, nh), Image.LANCZOS)
    x0 = (nw - tw) // 2; y0 = (nh - th) // 2
    im.crop((x0, y0, x0 + tw, y0 + th)).save(dst, quality=95)
    return dst


def _fade_chain(dur, fin, fout):
    f = []
    if fin > 0:  f.append(f"fade=t=in:st=0:d={fin:.2f}")
    if fout > 0: f.append(f"fade=t=out:st={max(0.0,dur-fout):.3f}:d={fout:.2f}")
    return f


def ken_burns_clip(img_big, kb, dur, dst, fin, fout):
    frames = max(1, int(round(dur * FPS)))
    if kb == "in":
        z = "min(zoom+0.0010,1.18)"; x = "iw/2-(iw/zoom/2)"; y = "ih/2-(ih/zoom/2)"
    elif kb == "in_strong":
        z = "min(zoom+0.0016,1.28)"; x = "iw/2-(iw/zoom/2)"; y = "ih/2-(ih/zoom/2)"
    elif kb == "out":
        z = "if(eq(on,0),1.20,max(zoom-0.0009,1.0))"; x = "iw/2-(iw/zoom/2)"; y = "ih/2-(ih/zoom/2)"
    elif kb == "up":
        z = "min(zoom+0.0008,1.14)"; x = "iw/2-(iw/zoom/2)"; y = "ih-(ih/zoom)-(on*1.0)"
    elif kb == "down":
        z = "min(zoom+0.0008,1.14)"; x = "iw/2-(iw/zoom/2)"; y = "0+(on*1.0)"
    else:
        z = "min(zoom+0.0010,1.16)"; x = "iw/2-(iw/zoom/2)"; y = "ih/2-(ih/zoom/2)"
    vf = (f"scale=1350:2400,zoompan=z='{z}':x='{x}':y='{y}':d={frames}:s={W}x{H}:fps={FPS},"
          + ",".join(_fade_chain(dur, fin, fout) + ["format=yuv420p"]))
    cmd = ["ffmpeg", "-y", "-loop", "1", "-i", img_big, "-t", f"{dur:.3f}",
           "-vf", vf, "-r", str(FPS), "-an",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", dst]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ zoompan:"); print(r.stderr[-700:]); sys.exit(1)
    return dst


def clip_from_video(src, dur, dst, fin, fout):
    pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                         "-of", "csv=p=0", src], capture_output=True, text=True)
    try: cdur = float(pr.stdout.strip())
    except ValueError: cdur = dur
    factor = max(0.05, dur / max(0.1, cdur))
    vf = (f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},"
          f"setpts={factor:.4f}*PTS,fps={FPS},"
          + ",".join(_fade_chain(dur, fin, fout) + ["format=yuv420p"]))
    cmd = ["ffmpeg", "-y", "-i", src, "-vf", vf, "-t", f"{dur:.3f}", "-an",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", dst]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ clip animado:"); print(r.stderr[-700:]); sys.exit(1)
    return dst


# ─────────────────────────────────────────────────────────────────────────
def mapear(palabras, dur):
    seq = [norm(p["w"]) for p in palabras]
    def find(marker, after):
        mw = norm(marker).split(); n = len(mw)
        for i in range(after, len(seq) - n + 1):
            if seq[i:i+n] == mw: return i, palabras[i]["start"]
        for i in range(after, len(seq)):
            if seq[i] == mw[0]: return i, palabras[i]["start"]
        return None, None
    cursor = 0
    for s in SEGMENTS:
        idx, t = find(s["marker"], cursor)
        if idx is None:
            print(f"❌ marcador no hallado: {s['marker']}"); sys.exit(1)
        s["_start"] = s.get("start_override", t); cursor = idx + 1
    for i, s in enumerate(SEGMENTS):
        nxt = SEGMENTS[i+1]["_start"] if i+1 < len(SEGMENTS) else dur
        s["_end"] = s.get("end_override", nxt)
    SEGMENTS[0]["_start"] = 0.0
    print("🗺️  Beats:")
    for i, s in enumerate(SEGMENTS, 1):
        print(f"   {i:2d}. {s['_start']:6.2f}→{s['_end']:6.2f}  ({s['_end']-s['_start']:5.2f}s)  {s['name']}")


def test_labels():
    """Hoja de contacto de TODOS los rótulos sobre fondo oscuro, para verificar
    el hebreo (niqqud + RTL + flecha) antes del render."""
    sheet = Image.new("RGB", (W, 300 * len([s for s in SEGMENTS if s.get('heb') or s.get('small') or s.get('arrow_line')])), (12, 10, 18))
    y = 0
    for s in SEGMENTS:
        if not (s.get("heb") or s.get("small") or s.get("arrow_line")): continue
        fn = f"{TMP}/lbl_{s['name']}.png"
        if build_label(s, fn):
            lab = Image.open(fn).convert("RGBA")
            crop = lab.crop((0, 120, W, 120 + 280))
            sheet.paste(Image.alpha_composite(Image.new("RGBA", crop.size, (20, 16, 28, 255)), crop).convert("RGB"), (0, y))
            d = ImageDraw.Draw(sheet)
            d.text((20, y + 6), s["name"], font=ImageFont.truetype(FONT_SUB, 24), fill=(120, 120, 130))
            y += 300
    out = f"{TMP}/labels_sheet.png"; sheet.save(out)
    print("hoja de rótulos:", out)


def main():
    with open(TIMING) as f:
        T = json.load(f)
    palabras, dur = T["palabras"], T["dur"]
    print(f"🎙️  Voz: {dur:.2f}s, {len(palabras)} palabras (cacheada, NO se regenera)")

    if "--test-labels" in sys.argv:
        mapear(palabras, dur); test_labels(); return

    mapear(palabras, dur)

    print("🖼️  Generando clips por beat…")
    clips = []
    for i, s in enumerate(SEGMENTS, 1):
        out = f"{TMP}/beat_{i}.mp4"
        d = max(0.6, s["_end"] - s["_start"])
        src = s.get("path") or find_path(s["match"], s.get("ext"))
        if not os.path.exists(src):
            print(f"❌ archivo NO existe para beat {s['name']}: {src}"); sys.exit(1)
        if s["type"] == "clip":
            clip_from_video(src, d, out, s["fin"], s["fout"])
            print(f"   🎬 {i:2d} {s['name']:12s} CLIP  {d:5.2f}s  ←  {os.path.basename(src)[:40]}")
        else:
            big = f"{TMP}/cover_{i}.jpg"
            prescale_cover(src, big)
            ken_burns_clip(big, s["kb"], d, out, s["fin"], s["fout"])
            print(f"   🌄 {i:2d} {s['name']:12s} KB/{s['kb']:9s} {d:5.2f}s")
        clips.append(out)

    concat = f"{TMP}/concat.txt"
    with open(concat, "w") as f:
        for c in clips: f.write(f"file '{c}'\n")
    base = f"{TMP}/base.mp4"
    r = subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat,
                        "-c", "copy", base], capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ concat:"); print(r.stderr[-700:]); sys.exit(1)

    # ── overlays: rótulos por beat + subtítulos ──
    overlays = []
    for i, s in enumerate(SEGMENTS, 1):
        fn = f"{TMP}/lbl_{i}.png"
        if build_label(s, fn):
            overlays.append((fn, s["_start"] + 0.30, s["_end"] - 0.10))
    for j, fr in enumerate(frases_de_palabras(palabras)):
        fn = f"{TMP}/sub_{j}.png"
        png_sub(fr["txt"], fn)
        overlays.append((fn, fr["start"], fr["end"] + 0.12))

    BATCH = 11
    n_lotes = (len(overlays) + BATCH - 1) // BATCH
    print(f"🎬 {len(overlays)} overlays en {n_lotes} lotes (≤{BATCH}/pasada)…")
    current = base; lotes = []
    for b in range(n_lotes):
        chunk = overlays[b*BATCH:(b+1)*BATCH]
        inputs = ["-i", current]
        for (fn, st, en) in chunk:
            inputs += ["-loop", "1", "-t", f"{en + 0.10:.3f}", "-i", fn]
        fc = ""; prev = "0:v"
        for k, (fn, st, en) in enumerate(chunk):
            idx = k + 1; fout = max(st, en - 0.25)
            fc += (f"[{idx}:v]format=rgba,fade=t=in:st={st:.2f}:d=0.25:alpha=1,"
                   f"fade=t=out:st={fout:.2f}:d=0.25:alpha=1[ov{k}];")
            nxt = f"v{k}"
            fc += f"[{prev}][ov{k}]overlay=0:0:enable='between(t,{st:.2f},{en:.2f})'[{nxt}];"
            prev = nxt
        fc = fc.rstrip(";")
        out_b = f"{TMP}/base_b{b}.mp4"
        cmd = (["ffmpeg", "-y"] + inputs + ["-filter_complex", fc, "-map", f"[{prev}]",
               "-c:v", "libx264", "-preset", "fast", "-crf", "15",
               "-pix_fmt", "yuv420p", "-r", str(FPS), out_b])
        print(f"   ▸ lote {b+1}/{n_lotes}: {len(chunk)} overlays")
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            print(f"❌ lote {b+1}:"); print(r.stderr[-1200:]); sys.exit(1)
        lotes.append(out_b); current = out_b

    print("🎧 Muxeando voz…")
    r = subprocess.run(["ffmpeg", "-y", "-i", current, "-i", MP3,
                        "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                        "-c:a", "aac", "-b:a", "192k", "-shortest", SALIDA],
                       capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ mux:"); print(r.stderr[-1200:]); sys.exit(1)
    for f in lotes:
        try: os.remove(f)
        except OSError: pass

    pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                         "-of", "csv=p=0", SALIDA], capture_output=True, text=True)
    print(f"\n✅ LISTO: {SALIDA}\n   duración: {pr.stdout.strip()}s")

    # ── Beat final ESTÁNDAR: cierre de marca Jashmal (outro portada) ─────────
    # TODOS los videos de Jashmal terminan con la portada. Video en español → "es".
    from jashmal_endcard import append_endcard
    append_endcard(SALIDA, lang="es")


if __name__ == "__main__":
    main()
