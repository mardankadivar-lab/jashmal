#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · "Las madres del Mashíaj — TAMAR"  (re-render con VOZ V3)
═══════════════════════════════════════════════════════════════════════════
  Re-arma el TikTok completo de Tamar usando la voz V3 (modelo eleven_v3 con
  etiquetas de emoción). Re-sincroniza subtítulos y cortes de plano al NUEVO
  audio (timestamps por palabra del endpoint /with-timestamps).

  Pipeline:
    1. Genera la voz V3 (eleven_v3 + with-timestamps) -> MP3 + tiempos/palabra.
       (Las etiquetas [con energía], [enfático]… se filtran al reconstruir
        palabras; los subtítulos usan el TEXTO BASE sin etiquetas.)
    2. Mapea los 8 segmentos de narración a sus tiempos (palabra de inicio).
    3. Recorta el mejor cuadrante de cada grilla 2×2 -> 1080×1920.
    4. Ken Burns (zoompan) por plano, con la duración de su segmento.
    5. Overlays: subtítulos por frase + textos en pantalla por segmento.
    6. Pega todo + audio V3. Vertical 1080×1920, 30fps, solo la voz.

  La PORTADA no se toca (TAMAR_COVER.jpg). Sobrescribe TAMAR_TIKTOK.mp4.

  Uso:  python3 scripts/tamar-video.py
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, urllib.error, base64, os, subprocess, sys, re, unicodedata
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ─────────────────────────────────────────────────────────────────────────
#  ⚙️  CONFIGURACIÓN
# ─────────────────────────────────────────────────────────────────────────
# Voz: configuración FIJA y compartida (scripts/voz_jashmal.py) — la misma para
# todos los videos. Para ajustarla, edita voz_jashmal.py.
from voz_jashmal import VOICE_ID, MODEL_V3, V3_SETTINGS

W, H, FPS = 1080, 1920, 30

ROOT     = "/Users/mardan/workspace/jashmal"
ENV      = os.path.join(ROOT, ".env.local")
IMG_DIR  = "/Users/mardan/Desktop/Claude Jashmal/Marketing/images /Tamar"   # ojo: "images " con espacio
OUT_DIR  = os.path.expanduser("~/Desktop/jashmal-videos/Tamar")
SALIDA   = os.path.join(OUT_DIR, "TAMAR_TIKTOK.mp4")
MP3_OUT  = os.path.join(OUT_DIR, "TAMAR_voz_v3_timed.mp3")
TMP      = "/tmp/tamar_render"
os.makedirs(TMP, exist_ok=True)
os.makedirs(OUT_DIR, exist_ok=True)

# Fuentes (macOS)
FONT_TITLE = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"   # títulos grandes
FONT_SUB   = "/System/Library/Fonts/Supplemental/Georgia.ttf"        # subtítulos
FONT_SMALL = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf" # fuentes (Talmud…)

GOLD       = (232, 200, 102)
GOLD_SOFT  = (245, 238, 210)
RED        = (200, 70, 60)
SHADOW     = (6, 4, 2)

# ── Texto v3 (con etiquetas de emoción) — VOZ ──────────────────────────────
GUION_V3 = (
    "[con energía] ¡El MAYOR escándalo sexual de la Biblia… [enfático] esconde el nacimiento del Mesías! "
    "Ella se llamaba Tamar. [serio] Quedó viuda dos veces. "
    "Y el hombre que debía protegerla… [con dolor] la abandonó. "
    "[determinada] Sin justicia, hizo lo impensable: se cubrió con un velo y se sentó en el cruce del camino. "
    "[enfático] Judá la tomó por prostituta. Y le dejó en prenda su sello, su cordón y su bastón. "
    "[tenso] Cuando la iban a quemar, un ángel acusador escondió las prendas… [casi susurrando] para que David jamás naciera. "
    "[con alivio] Otro ángel las devolvió. "
    "[asombrado] Mientras los hombres veían un escándalo… ¡el Cielo estaba creando la luz del Rey Mashíaj! "
    "Nacieron mellizos. Al primero lo llamó Fares, que significa Brecha. "
    "[con reverencia] Porque por las grietas de este mundo… entra la luz. "
    "[poderoso] Lo que el mundo esconde… ¡Dios lo corona! "
    "[invitando] Sígueme para la próxima madre del Mashíaj."
)

# ── 8 segmentos: cada uno mapea a UNA imagen + texto en pantalla. ──────────
#   - "start_marker": las primeras palabras del segmento (texto BASE, sin
#     etiquetas, sin signos). Se usan para hallar el tiempo de inicio del plano.
#   - "img": archivo de la grilla 2×2.
#   - "crop": qué cuadrante recortar -> "TL","TR","BL","BR" (o "C" centro).
#   - "kb": dirección Ken Burns -> "in","out","up","down".
#   - "title"/"title_color": texto grande arriba (None = sin título).
#   - "small": texto chico debajo del título (fuente / cita).
#   - "sub": el subtítulo de narración (lo que se oye), se muestra abajo.
SEGMENTS = [
    {  # 1 — gancho
        "start_marker": "el mayor escandalo sexual",
        "img": "94920119", "crop": "TR", "kb": "in",
        "title": "EL MAYOR ESCÁNDALO\nDE LA BIBLIA", "title_color": RED, "small": None,
        "sub": "El mayor escándalo sexual de la Biblia… esconde el nacimiento del Mesías.",
    },
    {  # 2 — viuda
        "start_marker": "ella se llamaba tamar",
        "img": "bc60f42b", "crop": "TL", "kb": "out",
        "title": None, "title_color": GOLD, "small": None,
        "sub": "Ella se llamaba Tamar. Quedó viuda dos veces. Y el hombre que debía protegerla… la abandonó.",
    },
    {  # 3 — cruce / Enaim
        "start_marker": "sin justicia hizo lo impensable",
        "img": "08f6aa6b", "crop": "BL", "kb": "down",
        "title": None, "title_color": GOLD, "small": None,
        "sub": "Sin justicia, hizo lo impensable: se cubrió con un velo y se sentó en el cruce del camino.",
    },
    {  # 4 — prendas
        "start_marker": "juda la tomo por prostituta",
        "img": "c0e1b2b0", "crop": "TL", "kb": "in",
        "title": "el SELLO · el CORDÓN · el BASTÓN", "title_color": GOLD, "small": None,
        "sub": "Judá la tomó por prostituta. Y le dejó en prenda su sello, su cordón y su bastón.",
    },
    {  # 5 — PICO: ángeles peleando
        "start_marker": "cuando la iban a quemar",
        "img": "cb246fa0", "crop": "BL", "kb": "in_strong",
        "title": "UN ÁNGEL QUISO\nBORRAR AL MESÍAS", "title_color": RED, "small": "Talmud · Sotá 10b",
        "sub": "Cuando la iban a quemar, un ángel acusador escondió las prendas para que ella muriera… y David jamás naciera. Otro ángel las devolvió.",
    },
    {  # 6 — árbol / luz
        "start_marker": "mientras los hombres veian",
        "img": "c70cd824", "crop": "TR", "kb": "up",
        "title": None, "title_color": GOLD, "small": "Bereshit Rabá 85:1",
        "sub": "Mientras los hombres veían un escándalo… el Cielo estaba ocupado creando la luz del Rey Mashíaj.",
    },
    {  # 7 — grieta dorada
        "start_marker": "nacieron mellizos",
        "img": "441841fc", "crop": "BL", "kb": "down",
        "title": "FARES (Peretz) · «brecha»\n» Rey David » Mashíaj", "title_color": GOLD, "small": None,
        "sub": "Nacieron mellizos. Al primero lo llamó Fares, que significa Brecha. Porque por las grietas de este mundo… entra la luz.",
    },
    {  # 8 — cierre: mujer + estrella
        "start_marker": "lo que el mundo esconde",
        "img": "86831578", "crop": "BR", "kb": "in",
        "title": "Escríbelo en tu navegador »\njashmal.org/tamar", "title_color": GOLD, "small": None,
        "sub": "Lo que el mundo esconde… Dios lo corona. Sígueme para la próxima madre del Mashíaj.",
    },
]

# Archivos completos (prefijo común de Midjourney)
PREFIX = "u6748946711_Vintage_19th-century_steel_engraving_on_aged_sepia__"
def img_path(tag):
    for f in os.listdir(IMG_DIR):
        if tag in f and f.lower().endswith(".png"):
            return os.path.join(IMG_DIR, f)
    raise FileNotFoundError(f"No encontré imagen con tag {tag} en {IMG_DIR}")


# ─────────────────────────────────────────────────────────────────────────
#  Utilidades de texto
# ─────────────────────────────────────────────────────────────────────────
def norm(s):
    """minúsculas, sin acentos, sin signos — para comparar palabras."""
    s = s.lower()
    s = "".join(c for c in unicodedata.normalize("NFD", s)
                if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


# ─────────────────────────────────────────────────────────────────────────
#  1. Voz V3 + tiempos por palabra (filtrando etiquetas [..])
# ─────────────────────────────────────────────────────────────────────────
def cargar_key():
    key = ""
    with open(ENV) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                key = line.split("=", 1)[1].strip()
    if not key:
        print("❌ No encontré ELEVENLABS_API_KEY en .env.local"); sys.exit(1)
    return key


def generar_voz_v3():
    key = cargar_key()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({"text": GUION_V3, "model_id": MODEL_V3,
                       "voice_settings": V3_SETTINGS}).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key, "Content-Type": "application/json"})
    print("🎙️  Generando voz V3 (eleven_v3 + timestamps)…")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP {e.code}: {e.read().decode(errors='replace')[:600]}"); sys.exit(1)

    with open(MP3_OUT, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))

    al = data["alignment"]
    chars = al["characters"]
    starts = al["character_start_times_seconds"]
    ends = al["character_end_times_seconds"]

    # Reconstruir palabras, IGNORANDO el contenido dentro de corchetes [..].
    palabras = []
    word = ""; ws = we = 0.0; in_tag = False
    for ch, st, en in zip(chars, starts, ends):
        if ch == "[":
            in_tag = True
            if word:
                palabras.append({"w": word, "start": ws, "end": we}); word = ""
            continue
        if ch == "]":
            in_tag = False
            continue
        if in_tag:
            continue
        if ch.isspace():
            if word:
                palabras.append({"w": word, "start": ws, "end": we}); word = ""
        else:
            if not word: ws = st
            word += ch; we = en
    if word:
        palabras.append({"w": word, "start": ws, "end": we})

    dur = ends[-1] if ends else 0.0
    print(f"   ✅ Voz V3 lista — {dur:.2f}s, {len(palabras)} palabras")
    return MP3_OUT, palabras, dur


# ─────────────────────────────────────────────────────────────────────────
#  2. Mapear segmentos -> tiempos (palabra de inicio de cada segmento)
# ─────────────────────────────────────────────────────────────────────────
def mapear_tiempos(palabras, dur):
    seq = [norm(p["w"]) for p in palabras]   # palabras normalizadas en orden

    def find_start(marker, after_idx):
        """Devuelve (idx_palabra, t_start) de la primera palabra del marker,
           buscando a partir de after_idx."""
        mwords = norm(marker).split()
        n = len(mwords)
        for i in range(after_idx, len(seq) - n + 1):
            if seq[i:i+n] == mwords:
                return i, palabras[i]["start"]
        # Fallback: match de la primera palabra sola
        for i in range(after_idx, len(seq)):
            if seq[i] == mwords[0]:
                return i, palabras[i]["start"]
        return None, None

    cursor = 0
    for s in SEGMENTS:
        idx, t = find_start(s["start_marker"], cursor)
        if idx is None:
            print(f"❌ No pude ubicar el segmento: '{s['start_marker']}'"); sys.exit(1)
        s["_idx"] = idx
        s["_start"] = t
        cursor = idx + 1

    # El fin de cada plano = inicio del siguiente; el último termina en dur.
    for i, s in enumerate(SEGMENTS):
        s["_end"] = SEGMENTS[i+1]["_start"] if i+1 < len(SEGMENTS) else dur
    # El primer plano empieza en 0 (no en la primera palabra) para no dejar negro.
    SEGMENTS[0]["_start"] = 0.0

    print("🗺️  Mapa de planos (inicio→fin):")
    for i, s in enumerate(SEGMENTS, 1):
        print(f"   {i}. {s['_start']:5.2f}→{s['_end']:5.2f}s  img={s['img']}  «{s['start_marker'][:32]}»")
    return SEGMENTS


# ─────────────────────────────────────────────────────────────────────────
#  3. Recortar el mejor cuadrante de cada grilla 2×2 -> lienzo 1080×1920
# ─────────────────────────────────────────────────────────────────────────
def recortar_cuadrante(src, crop, dst):
    im = Image.open(src).convert("RGB")
    gw, gh = im.size
    hw, hh = gw // 2, gh // 2
    boxes = {
        "TL": (0, 0, hw, hh), "TR": (hw, 0, gw, hh),
        "BL": (0, hh, hw, gh), "BR": (hw, hh, gw, gh),
        "C":  (gw//4, gh//4, gw*3//4, gh*3//4),
    }
    quad = im.crop(boxes.get(crop, boxes["C"]))
    # Encajar en 9:16 (1080×1920) con "cover" (recorte central, sin barras).
    qw, qh = quad.size
    target = W / H
    if qw / qh > target:           # demasiado ancho -> recortar lados
        nw = int(qh * target); x0 = (qw - nw)//2
        quad = quad.crop((x0, 0, x0+nw, qh))
    else:                           # demasiado alto -> recortar arriba/abajo
        nh = int(qw / target); y0 = (qh - nh)//2
        quad = quad.crop((0, y0, qw, y0+nh))
    # Sobre-escala para que el zoompan no muestre bordes: render a 1350×2400.
    quad = quad.resize((1350, 2400), Image.LANCZOS)
    quad.save(dst, quality=95)
    return dst


# ─────────────────────────────────────────────────────────────────────────
#  4. Clip Ken Burns por plano (zoompan)
# ─────────────────────────────────────────────────────────────────────────
def ken_burns_clip(img_big, kb, dur, dst):
    frames = max(1, int(round(dur * FPS)))
    # zoompan trabaja sobre la imagen escalada; output 1080×1920.
    if kb == "in":
        z = "min(zoom+0.0010,1.18)"; x = "iw/2-(iw/zoom/2)"; y = "ih/2-(ih/zoom/2)"
    elif kb == "in_strong":
        z = "min(zoom+0.0018,1.30)"; x = "iw/2-(iw/zoom/2)"; y = "ih/2-(ih/zoom/2)"
    elif kb == "out":
        z = "if(eq(on,0),1.18,max(zoom-0.0010,1.0))"; x = "iw/2-(iw/zoom/2)"; y = "ih/2-(ih/zoom/2)"
    elif kb == "up":
        z = "min(zoom+0.0008,1.14)"; x = "iw/2-(iw/zoom/2)"; y = "ih-(ih/zoom)-(on*1.0)"
    elif kb == "down":
        z = "min(zoom+0.0008,1.14)"; x = "iw/2-(iw/zoom/2)"; y = "0+(on*1.0)"
    else:
        z = "min(zoom+0.0010,1.16)"; x = "iw/2-(iw/zoom/2)"; y = "ih/2-(ih/zoom/2)"

    vf = (f"scale=1350:2400,"
          f"zoompan=z='{z}':x='{x}':y='{y}':d={frames}:s={W}x{H}:fps={FPS},"
          f"format=yuv420p")
    cmd = ["ffmpeg", "-y", "-loop", "1", "-i", img_big, "-t", f"{dur:.3f}",
           "-vf", vf, "-r", str(FPS), "-an",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
           dst]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ ffmpeg zoompan:"); print(r.stderr[-700:]); sys.exit(1)
    return dst


# ─────────────────────────────────────────────────────────────────────────
#  5. Overlays PNG (títulos arriba, subtítulos abajo)
# ─────────────────────────────────────────────────────────────────────────
def _draw_multiline(d, lines, font, cx, top, fill, line_gap, shadow=True, shadow_a=235):
    y = top
    for ln in lines:
        bb = d.textbbox((0, 0), ln, font=font); tw = bb[2]-bb[0]
        x = cx - tw//2 - bb[0]
        if shadow:
            for ox, oy in [(-3,3),(3,3),(0,4),(3,-1),(-3,-1),(0,0)]:
                d.text((x+ox, y+oy), ln, font=font, fill=(*SHADOW, shadow_a))
        d.text((x, y), ln, font=font, fill=fill)
        y += (bb[3]-bb[1]) + line_gap
    return y


def png_title(text, color, small, fname):
    """Título grande arriba + (opcional) cita chica debajo."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    lines = text.upper().split("\n") if color == RED else text.split("\n")
    # Tamaño según longitud de la línea más larga
    fsize = 78
    font = ImageFont.truetype(FONT_TITLE, fsize)
    while max(d.textbbox((0,0), ln, font=font)[2] for ln in lines) > W-90 and fsize > 44:
        fsize -= 3; font = ImageFont.truetype(FONT_TITLE, fsize)
    yend = _draw_multiline(d, lines, font, W//2, 120, (*color, 255), 16, shadow_a=235)
    if small:
        sfont = ImageFont.truetype(FONT_SMALL, 40)
        _draw_multiline(d, [small], sfont, W//2, yend+14, (*GOLD_SOFT, 235), 0, shadow_a=235)
    img.save(fname)


def png_sub(text, fname):
    """Subtítulo de narración, abajo, en mayúsculas doradas suaves."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    txt = text.upper()
    font = ImageFont.truetype(FONT_TITLE, 52)
    # Envolver a líneas de ancho W-110
    words = txt.split(); lines = []; cur = ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textbbox((0,0), t, font=font)[2] < W-110: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    # Caja inferior; altura según nº de líneas
    line_h = 64
    block_h = len(lines)*line_h
    top = H - 300 - block_h
    # Panel semitransparente para legibilidad
    pad = 28
    d.rectangle([40, top-pad, W-40, top+block_h+pad-10], fill=(6, 5, 3, 120))
    y = top
    for ln in lines:
        bb = d.textbbox((0,0), ln, font=font); tw = bb[2]-bb[0]
        x = (W-tw)//2 - bb[0]
        for ox, oy in [(-3,3),(3,3),(0,4),(2,-2),(-2,-2)]:
            d.text((x+ox, y+oy), ln, font=font, fill=(*SHADOW, 230))
        d.text((x, y), ln, font=font, fill=(*GOLD_SOFT, 255))
        y += line_h
    img.save(fname)


# ─────────────────────────────────────────────────────────────────────────
#  6. Subtítulos por frase (sincronizados a la voz)
# ─────────────────────────────────────────────────────────────────────────
def frases_de_palabras(palabras):
    frases = []; buf = []; fstart = None
    for p in palabras:
        if fstart is None: fstart = p["start"]
        buf.append(p["w"])
        if any(p["w"].endswith(c) for c in [".", "?", "!", ":", "…"]):
            frases.append({"txt": " ".join(buf), "start": fstart, "end": p["end"]})
            buf = []; fstart = None
    if buf:
        frases.append({"txt": " ".join(buf), "start": fstart, "end": palabras[-1]["end"]})
    return frases


# ─────────────────────────────────────────────────────────────────────────
#  MAIN
# ─────────────────────────────────────────────────────────────────────────
def main():
    # 1) Voz V3 + tiempos
    mp3, palabras, dur = generar_voz_v3()

    # 2) Mapa de planos
    segs = mapear_tiempos(palabras, dur)

    # 3-4) Recortar + Ken Burns de cada plano
    print("🖼️  Recortando cuadrantes + Ken Burns…")
    clips = []
    for i, s in enumerate(segs, 1):
        src = img_path(s["img"])
        big = f"{TMP}/quad_{i}.jpg"
        recortar_cuadrante(src, s["crop"], big)
        clip = f"{TMP}/clip_{i}.mp4"
        d = max(0.6, s["_end"] - s["_start"])
        ken_burns_clip(big, s["kb"], d, clip)
        clips.append(clip)
        print(f"   ✅ plano {i} ({d:.2f}s)  {s['crop']}/{s['kb']}")

    # Concatenar planos
    concat_txt = f"{TMP}/concat.txt"
    with open(concat_txt, "w") as f:
        for c in clips:
            f.write(f"file '{c}'\n")
    base_video = f"{TMP}/base.mp4"
    r = subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0",
                        "-i", concat_txt, "-c", "copy", base_video],
                       capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ concat:"); print(r.stderr[-700:]); sys.exit(1)

    # 5) Overlays de TÍTULOS por segmento (con leve fade-in/out vía enable)
    overlays = []  # (png, start, end)
    for i, s in enumerate(segs, 1):
        if s["title"]:
            fn = f"{TMP}/title_{i}.png"
            png_title(s["title"], s["title_color"], s["small"], fn)
            # el título aparece ~0.25s después del corte y dura casi todo el plano
            overlays.append((fn, s["_start"]+0.20, s["_end"]-0.10))
        elif s["small"]:
            # solo cita chica (ej. Bereshit Rabá) -> usar png_title sin título
            fn = f"{TMP}/small_{i}.png"
            png_title(" ", s["title_color"], s["small"], fn)
            overlays.append((fn, s["_start"]+0.30, s["_end"]-0.10))

    # 6) Subtítulos sincronizados (por frase)
    frases = frases_de_palabras(palabras)
    for j, fr in enumerate(frases):
        fn = f"{TMP}/sub_{j}.png"
        png_sub(fr["txt"], fn)
        # margen para que cada subtítulo dure su frase completa
        overlays.append((fn, fr["start"], fr["end"]+0.12))

    print(f"🎬 Componiendo {len(overlays)} overlays sobre el video base…")

    # Construir filtro ffmpeg.
    #  IMPORTANTE: cada PNG entra como -loop 1 (stream de VIDEO con duración),
    #  no como imagen estática de 1 frame. Sobre una imagen estática el
    #  fade-alpha por tiempo NO actúa y el overlay sale invisible (verificado).
    #  Con loop, el PNG corre de t=0 a t=en alineado al timeline del base, y los
    #  fades en tiempo ABSOLUTO (st / en-0.25) sí funcionan. El enable recorta la
    #  ventana visible. Orden de inputs: [0]=base, [1..N]=PNGs, [N+1]=audio.
    inputs = ["-i", base_video]
    for (fn, st, en) in overlays:
        inputs += ["-loop", "1", "-t", f"{en + 0.10:.3f}", "-i", fn]
    audio_idx = len(overlays) + 1
    inputs += ["-i", mp3]

    fc = ""
    prev = "0:v"
    for k, (fn, st, en) in enumerate(overlays):
        idx = k + 1
        fout = max(st, en - 0.25)
        # PNG loopeado: su t=0 coincide con t=0 del base -> fades en tiempo
        # absoluto del timeline. enable activa/desactiva la ventana.
        fc += (f"[{idx}:v]format=rgba,"
               f"fade=t=in:st={st:.2f}:d=0.25:alpha=1,"
               f"fade=t=out:st={fout:.2f}:d=0.25:alpha=1[ov{k}];")
        nxt = f"v{k}"
        fc += f"[{prev}][ov{k}]overlay=0:0:enable='between(t,{st:.2f},{en:.2f})'[{nxt}];"
        prev = nxt
    fc = fc.rstrip(";")

    cmd = ["ffmpeg", "-y"] + inputs + ["-filter_complex", fc,
           "-map", f"[{prev}]", "-map", f"{audio_idx}:a",
           "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-pix_fmt", "yuv420p",
           "-c:a", "aac", "-b:a", "192k", "-r", str(FPS), "-shortest", SALIDA]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ ffmpeg overlays:"); print(r.stderr[-1200:]); sys.exit(1)

    print(f"\n✅ VIDEO V3 LISTO: {SALIDA}")
    # Probe final
    pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                         "format=duration", "-of", "csv=p=0", SALIDA],
                        capture_output=True, text=True)
    print(f"   duración: {pr.stdout.strip()}s")

    # ── Beat final ESTÁNDAR: cierre de marca Jashmal (outro portada) ─────────
    # TODOS los videos de Jashmal terminan con la portada. Video en español → "es".
    from jashmal_endcard import append_endcard
    append_endcard(SALIDA, lang="es")


if __name__ == "__main__":
    main()
