#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · "LOT Y SUS HIJAS SIN NOMBRE"  (serie: escándalos del Mashíaj)
═══════════════════════════════════════════════════════════════════════════
  Clon del pipeline de Tamar/Betsabé, adaptado a IMÁGENES ÚNICAS de GPT
  (1.png … 8.png), NO grillas 2×2. Cada imagen llena el cuadro 9:16 con un
  fondo difuminado (así NUNCA recorta los rostros velados de la portada,
  salga cuadrada o vertical de GPT).

  Pipeline:
    1. Voz ElevenLabs (eleven_multilingual_v2 + with-timestamps) → MP3 +
       tiempos por palabra (en caché: LOT_voz_timed.mp3 + LOT_timing.json).
    2. Mapea 21 beats de narración a sus tiempos (la voz manda el corte).
    3. Encaja cada imagen completa → 1350×2400 (cover + fondo difuminado).
    4. Ken Burns (zoompan) por plano, con la duración real de su beat.
    5. Overlays: subtítulos por frase + título/cita por beat.
    6. Pega todo + voz. Vertical 1080×1920, 30fps. Cierre de marca Jashmal.

  ─────────────────────────────────────────────────────────────────────────
  USO (dos pasos):

    A) GENERAR LA VOZ AHORA (no necesita las imágenes):
         python3 scripts/lot-video.py --voz
       → crea el MP3 y cachea los tiempos. Escúchalo para aprobarlo.

    B) RENDER FINAL (cuando las 8 imágenes estén en ~/Desktop/Jashmal_Lot/):
         python3 scripts/lot-video.py
       → reutiliza la voz cacheada y arma el MP4 final con UN comando.
  ═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, urllib.error, base64, os, subprocess, sys, re, unicodedata
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ─────────────────────────────────────────────────────────────────────────
#  ⚙️  VOZ
# ─────────────────────────────────────────────────────────────────────────
#  La SERIE (Tamar 41K + Betsabé) usa la voz oficial "Martin Osborne"
#  (scripts/voz_jashmal.py) para que TODA la serie suene al MISMO narrador.
#  El pedido mencionaba la voz 30Flj57Y61xChp5iKYNE (Daniel-grave). Si Mardan
#  prefiere ESA voz para Lot, descomenta la línea VOICE_OVERRIDE de abajo.
from voz_jashmal import VOICE_ID as SERIE_VOICE_ID, MODEL_V3, V3_SETTINGS

VOICE_OVERRIDE = None                       # ← pon "30Flj57Y61xChp5iKYNE" para la voz del pedido
VOICE_ID = VOICE_OVERRIDE or SERIE_VOICE_ID
MODEL_ID = MODEL_V3                          # eleven_multilingual_v2 (acento latino)

W, H, FPS = 1080, 1920, 30

ROOT     = "/Users/mardan/workspace/jashmal"
ENV      = os.path.join(ROOT, ".env.local")
IMG_DIR  = os.environ.get("LOT_IMG_DIR", os.path.expanduser("~/Desktop/Jashmal_Lot"))  # ← Mardan suelta 1.png … 8.png aquí
OUT_DIR  = os.path.expanduser("~/Desktop/jashmal-videos/Lot")
SALIDA   = os.path.join(OUT_DIR, "LOT_TIKTOK.mp4")
MP3_OUT  = os.path.join(OUT_DIR, "LOT_voz_timed.mp3")
TIMING_JSON = os.path.join(OUT_DIR, "LOT_timing.json")          # caché de tiempos/voz
TMP      = "/tmp/lot_render"
os.makedirs(TMP, exist_ok=True)
os.makedirs(OUT_DIR, exist_ok=True)

# Fuentes (macOS) — idénticas a Tamar/Betsabé para coherencia de marca
FONT_TITLE = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FONT_SUB   = "/System/Library/Fonts/Supplemental/Georgia.ttf"
FONT_SMALL = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"

GOLD       = (232, 200, 102)
GOLD_SOFT  = (245, 238, 210)
RED        = (200, 70, 60)
SHADOW     = (6, 4, 2)

# ── NARRACIÓN (verificada por el Sofer · content/guiones/lot-sin-nombre.md) ──
#   Regla de oro de la voz: NINGÚN «…» (causan pausas raras). El saneador de
#   abajo convierte cualquier «…» o «—» en coma.
GUION = (
    # 1 — GANCHO (img 1: dos mujeres veladas sin rostro)
    "Las dos mujeres más escandalosas de la Torá, no tienen nombre. "
    "Y de las dos, juntas, nace el linaje del Mashíaj. "
    # 2 — SODOMA ARDE (img 2)
    "Sodoma arde. Lot escapa a una cueva con sus dos hijas. "
    # 3 — LA CUEVA (img 3)
    "Ellas creen que el mundo entero se acabó, que son las últimas personas vivas sobre la tierra. "
    # 4 — LAS ÚLTIMAS VIVAS / CONCIBEN (img 4)
    "Para no dejar que la humanidad muera con ellas, emborrachan a su padre y conciben de él. "
    "De la hija mayor nace Moab. De la menor, Amón. "
    # 5 — GIRO / LA LUZ / LAS PALOMAS (img 5)
    "Aquí empieza el escándalo, y el secreto. "
    "El Talmud dice: guedolá averá lishmáh, grande es la transgresión hecha por amor del Cielo. "
    "No buscaban placer, buscaban salvar la vida. "
    "Por eso, del barro más bajo, Dios saca dos palomas. "
    # 6 — MOAB → RUT → DAVID (img 6)
    "De Moab nace Rut, bisabuela del rey David. "
    "De Amón nace Naamá, madre de Rejavam, el rey que heredó el trono de David. "
    # 7 — ANONIMATO + CIERRE / EL ASCENSO (img 7)
    "¿Y por qué la Torá las deja sin nombre? "
    "Porque el vaso que carga la luz más alta no necesita firmar. "
    "La hija que nombró a su hijo con pudor, en secreto, recibió premio del propio Dios. "
    "El anonimato no es castigo: es el velo del Mashíaj. "
    "El linaje del Mashíaj pasa por dos escándalos a propósito, el de Lot y el de Yehudá, "
    "porque la luz más alta baja a buscarse al lugar más bajo. "
    "Yeridá tzórej aliyá. La caída, era el camino. "
    "El estudio completo en jashmal.org."
)
GUION = GUION.replace("…", ", ").replace("—", ", ").replace(" ,", ",").replace(",,", ",")

# ── BEATS (21 planos): la voz salió en ~97s, y ahora son 8 imágenes ÚNICAS
#   (se agregó LA HUIDA = #3). Las 8 aparecen EN ORDEN (1ª aparición 1→8) y
#   luego se REUSAN de forma temática (callbacks) para que NINGÚN still aguante
#   demasiado tiempo (máx ~10.4s) y el cierre tenga un montaje-recap vivo.
#   NUNCA se repite la misma imagen en planos consecutivos (evita el "salto").
#
#   ORDEN NUEVO de las 8 imágenes (archivos N.png en IMG_DIR):
#     1 portada (dos veladas + estrella + Sodoma)   5 las últimas vivas
#     2 Sodoma explota (hongo nuclear)              6 la luz / dos palomas
#     3 LA HUIDA (Lot, esposa→sal, 2 hijas, 2       7 Rut espigando (Moab»David)
#       ángeles, huyendo del hongo al monte) ←NUEVA 8 el ascenso (abismo»corona)
#     4 la cueva
#
#   start_marker: primeras palabras del beat (sin acentos/signos); fija el corte
#                 al timestamp de esa palabra en la voz (la voz manda el ritmo).
#   img:  "1".."8"  → archivo N.png en IMG_DIR.
#   kb:   "in","in_strong","out","up","down".
#   title / title_color (RED se pone en MAYÚSCULAS) · small: cita debajo.
SEGMENTS = [
    {   # P1 — GANCHO: las dos veladas sin rostro  (img 1)  0.0→10.4
        "start_marker": "las dos mujeres mas escandalosas",
        "img": "1", "kb": "in",
        "title": "LAS DOS MUJERES\nSIN NOMBRE", "title_color": RED,
        "small": "Las madres ocultas del Mashíaj",
    },
    {   # P2 — Sodoma explota  (img 2)  10.4→12.4
        "start_marker": "sodoma arde",
        "img": "2", "kb": "in_strong",
        "title": None, "title_color": GOLD,
        "small": "Génesis 19:24-25 · Sodoma arde",
    },
    {   # P3 — LA HUIDA: la esposa mira atrás → sal  (img 3 NUEVA)  12.4→15.4
        "start_marker": "lot escapa a una cueva",
        "img": "3", "kb": "up",
        "title": "«NO MIRES ATRÁS»", "title_color": GOLD,
        "small": "Génesis 19:17-26 · la huida del fuego",
    },
    {   # P4 — la cueva: «no queda nadie en la tierra»  (img 4)  15.4→22.1
        "start_marker": "ellas creen que el mundo",
        "img": "4", "kb": "down",
        "title": "«NO QUEDA NADIE\nEN LA TIERRA»", "title_color": GOLD,
        "small": "Rashi · Génesis 19:31",
    },
    {   # P5 — las últimas vivas / preservar la simiente  (img 5)  22.1→28.3
        "start_marker": "para no dejar que la humanidad",
        "img": "5", "kb": "in",
        "title": "PRESERVAR LA SIMIENTE\nDE LA HUMANIDAD", "title_color": GOLD,
        "small": "Génesis 19:31-38 · Moab y Amón",
    },
    {   # P6 — Moab y Amón nacen (callback cueva)  (img 4)  28.3→33.5
        "start_marker": "de la hija mayor",
        "img": "4", "kb": "in",
        "title": None, "title_color": GOLD,
        "small": None,
    },
    {   # P7 — GIRO: el escándalo y el secreto (callback portada)  (img 1)  33.5→36.6
        "start_marker": "aqui empieza el escandalo",
        "img": "1", "kb": "in",
        "title": None, "title_color": GOLD,
        "small": "aquí empieza el secreto",
    },
    {   # P8 — guedolá averá lishmáh (callback últimas vivas)  (img 5)  36.6→43.6
        "start_marker": "el talmud dice",
        "img": "5", "kb": "up",
        "title": "GUEDOLÁ AVERÁ LISHMÁH\n«gran transgresión, por el Cielo»", "title_color": GOLD,
        "small": "Talmud · Nazir 23b",
    },
    {   # P9 — no buscaban placer, salvar la vida (callback cueva)  (img 4)  43.6→46.9
        "start_marker": "no buscaban placer",
        "img": "4", "kb": "in",
        "title": "NO BUSCABAN PLACER,\nSALVAR LA VIDA", "title_color": GOLD,
        "small": None,
    },
    {   # P10 — del barro más bajo, DOS PALOMAS  (img 6)  46.9→50.9
        "start_marker": "por eso del barro",
        "img": "6", "kb": "up",
        "title": "DEL BARRO MÁS BAJO,\nDOS PALOMAS", "title_color": GOLD,
        "small": "Talmud · Bavá Kamá 38b · «dos palomas»",
    },
    {   # P11 — De Moab » Rut » David  (img 7)  50.9→54.7
        "start_marker": "de moab nace rut",
        "img": "7", "kb": "in",
        "title": "DE MOAB » RUT » DAVID", "title_color": GOLD,
        "small": "Rut · bisabuela del rey David",
    },
    {   # P12 — De Amón » Naamá » Rejavam (callback palomas)  (img 6)  54.7→60.8
        "start_marker": "de amon nace naama",
        "img": "6", "kb": "up",
        "title": None, "title_color": GOLD,
        "small": "Naamá · madre de Rejavam, heredó el trono de David",
    },
    {   # P13 — ¿por qué sin nombre? (el ascenso)  (img 8)  60.8→63.4
        "start_marker": "y por que la tora las deja",
        "img": "8", "kb": "up",
        "title": None, "title_color": GOLD,
        "small": "¿por qué las deja sin nombre?",
    },
    {   # P14 — el vaso no firma (callback portada)  (img 1)  63.4→68.1
        "start_marker": "porque el vaso que carga",
        "img": "1", "kb": "in",
        "title": "EL VASO NO\nNECESITA FIRMAR", "title_color": GOLD,
        "small": None,
    },
    {   # P15 — nombró con pudor = premio (callback Rut)  (img 7)  68.1→74.7
        "start_marker": "la hija que nombro",
        "img": "7", "kb": "in",
        "title": None, "title_color": GOLD,
        "small": "Rashi · Gén 19:37 · nombró con pudor",
    },
    {   # P16 — «es el velo del Mashíaj» (callback portada)  (img 1)  74.7→78.8
        "start_marker": "el anonimato",
        "img": "1", "kb": "in",
        "title": "ES EL VELO\nDEL MASHÍAJ", "title_color": GOLD,
        "small": None,
    },
    {   # P17 — recap: dos escándalos (callback Sodoma)  (img 2)  78.8→82.9
        "start_marker": "el linaje del mashiaj pasa",
        "img": "2", "kb": "in",
        "title": None, "title_color": GOLD,
        "small": "dos escándalos a propósito: Lot · y Yehudá",
    },
    {   # P18 — «el de Lot y el de Yehudá» (callback huida)  (img 3)  82.9→85.6
        "start_marker": "el de lot",
        "img": "3", "kb": "in",
        "title": None, "title_color": GOLD,
        "small": None,
    },
    {   # P19 — la luz más alta baja al lugar más bajo (callback palomas)  (img 6)  85.6→89.4
        "start_marker": "porque la luz mas alta baja",
        "img": "6", "kb": "up",
        "title": None, "title_color": GOLD,
        "small": "la luz más alta baja al lugar más bajo",
    },
    {   # P20 — YERIDÁ TZÓREJ ALIYÁ: el ascenso  (img 8)  89.4→94.3
        "start_marker": "yerida",
        "img": "8", "kb": "up",
        "title": "YERIDÁ TZÓREJ ALIYÁ", "title_color": GOLD,
        "small": "la caída era el camino",
    },
    {   # P21 — CTA: jashmal.org/linaje (callback luz)  (img 6)  94.3→97.15
        "start_marker": "el estudio completo",
        "img": "6", "kb": "up",
        "title": "jashmal.org/linaje", "title_color": GOLD,
        "small": None,
    },
]


def img_path(tag):
    """Ruta de la imagen única N.png en IMG_DIR (tag = '1'..'8')."""
    p = os.path.join(IMG_DIR, f"{tag}.png")
    if os.path.exists(p):
        return p
    # tolerancia: también acepta .jpg/.jpeg/.PNG por si GPT exporta así
    for ext in (".jpg", ".jpeg", ".PNG", ".JPG", ".webp"):
        alt = os.path.join(IMG_DIR, f"{tag}{ext}")
        if os.path.exists(alt):
            return alt
    raise FileNotFoundError(
        f"No encontré la imagen «{tag}» en {IMG_DIR}.\n"
        f"   → Pon las 8 imágenes nombradas 1.png … 8.png en esa carpeta.")


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
#  1. Voz + tiempos por palabra (con caché)
# ─────────────────────────────────────────────────────────────────────────
def cargar_key():
    key = ""
    with open(ENV) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                key = line.split("=", 1)[1].strip()
    if not key:
        print("❌ No encontré ELEVENLABS_API_KEY en .env.local")
        print("   Solución: añade en /Users/mardan/workspace/jashmal/.env.local la línea")
        print("   ELEVENLABS_API_KEY=tu_llave_de_elevenlabs")
        sys.exit(1)
    return key


def generar_voz(force=False):
    # Caché: reusa la voz si ya existe (ahorra créditos al reajustar imágenes).
    if not force and os.path.exists(MP3_OUT) and os.path.exists(TIMING_JSON):
        with open(TIMING_JSON) as f:
            cache = json.load(f)
        print(f"♻️  Reusando voz en caché — {cache['dur']:.2f}s "
              f"(borra {os.path.basename(MP3_OUT)} para regenerar).")
        return MP3_OUT, cache["palabras"], cache["dur"]

    key = cargar_key()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({"text": GUION, "model_id": MODEL_ID,
                       "voice_settings": V3_SETTINGS}).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key, "Content-Type": "application/json"})
    print(f"🎙️  Generando voz ({MODEL_ID} · voz {VOICE_ID}) + timestamps…")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP {e.code}: {e.read().decode(errors='replace')[:600]}")
        if e.code == 401:
            print("   → La ELEVENLABS_API_KEY es inválida o expiró. Revísala en .env.local")
        sys.exit(1)

    with open(MP3_OUT, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))

    al = data["alignment"]
    chars = al["characters"]
    starts = al["character_start_times_seconds"]
    ends = al["character_end_times_seconds"]

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
    with open(TIMING_JSON, "w") as f:
        json.dump({"palabras": palabras, "dur": dur}, f)
    print(f"   ✅ Voz lista — {dur:.2f}s, {len(palabras)} palabras")
    print(f"   🎧 MP3: {MP3_OUT}")
    return MP3_OUT, palabras, dur


# ─────────────────────────────────────────────────────────────────────────
#  2. Mapear beats → tiempos (palabra de inicio de cada beat)
# ─────────────────────────────────────────────────────────────────────────
def mapear_tiempos(palabras, dur):
    seq = [norm(p["w"]) for p in palabras]

    def find_start(marker, after_idx):
        mwords = norm(marker).split()
        n = len(mwords)
        for i in range(after_idx, len(seq) - n + 1):
            if seq[i:i+n] == mwords:
                return i, palabras[i]["start"]
        for i in range(after_idx, len(seq)):
            if seq[i] == mwords[0]:
                return i, palabras[i]["start"]
        return None, None

    cursor = 0
    for s in SEGMENTS:
        idx, t = find_start(s["start_marker"], cursor)
        if idx is None:
            print(f"❌ No pude ubicar el beat: '{s['start_marker']}'"); sys.exit(1)
        s["_idx"] = idx
        s["_start"] = t
        cursor = idx + 1

    for i, s in enumerate(SEGMENTS):
        s["_end"] = SEGMENTS[i+1]["_start"] if i+1 < len(SEGMENTS) else dur
    SEGMENTS[0]["_start"] = 0.0

    print("🗺️  Mapa de planos (inicio→fin):")
    for i, s in enumerate(SEGMENTS, 1):
        print(f"   {i}. {s['_start']:5.2f}→{s['_end']:5.2f}s  img={s['img']}.png  «{s['start_marker'][:34]}»")
    return SEGMENTS


# ─────────────────────────────────────────────────────────────────────────
#  3. Encajar una imagen ÚNICA → 1350×2400 (cover + fondo difuminado)
# ─────────────────────────────────────────────────────────────────────────
def fit_full_image(src, dst):
    """Llena el lienzo 9:16 con la imagen completa. Si la imagen no es 9:16
    (p.ej. cuadrada de GPT), NO recorta los bordes: la 'contiene' centrada y
    rellena el margen con una copia ampliada, oscurecida y difuminada de sí
    misma (efecto cinematográfico). Así los rostros velados NUNCA se cortan."""
    BW, BH = 1350, 2400
    im = Image.open(src).convert("RGB")
    sw, sh = im.size

    # Fondo: la propia imagen ampliada a CUBRIR todo, difuminada y oscurecida.
    cover = max(BW / sw, BH / sh)
    bw, bh = int(sw * cover) + 2, int(sh * cover) + 2
    bg = im.resize((bw, bh), Image.LANCZOS)
    bx, by = (bw - BW) // 2, (bh - BH) // 2
    bg = bg.crop((bx, by, bx + BW, by + BH)).filter(ImageFilter.GaussianBlur(42))
    bg = Image.eval(bg, lambda p: int(p * 0.55))   # oscurecer el fondo

    # Primer plano: la imagen CONTENIDA (entera) y centrada.
    contain = min(BW / sw, BH / sh)
    fw, fh = max(1, int(sw * contain)), max(1, int(sh * contain))
    fg = im.resize((fw, fh), Image.LANCZOS)
    bg.paste(fg, ((BW - fw) // 2, (BH - fh) // 2))
    bg.save(dst, quality=95)
    return dst


# ─────────────────────────────────────────────────────────────────────────
#  4. Clip Ken Burns por plano (zoompan)
# ─────────────────────────────────────────────────────────────────────────
def ken_burns_clip(img_big, kb, dur, dst):
    frames = max(1, int(round(dur * FPS)))
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
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    lines = text.upper().split("\n") if color == RED else text.split("\n")
    fsize = 78
    font = ImageFont.truetype(FONT_TITLE, fsize)
    while max(d.textbbox((0,0), ln, font=font)[2] for ln in lines) > W-90 and fsize > 40:
        fsize -= 3; font = ImageFont.truetype(FONT_TITLE, fsize)
    yend = _draw_multiline(d, lines, font, W//2, 120, (*color, 255), 16, shadow_a=235)
    if small:
        sfont = ImageFont.truetype(FONT_SMALL, 40)
        # auto-encoge la cita si no cabe a una línea
        while d.textbbox((0,0), small, font=sfont)[2] > W-80 and sfont.size > 26:
            sfont = ImageFont.truetype(FONT_SMALL, sfont.size-2)
        _draw_multiline(d, [small], sfont, W//2, yend+14, (*GOLD_SOFT, 235), 0, shadow_a=235)
    img.save(fname)


def png_sub(text, fname):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    txt = text.upper()
    font = ImageFont.truetype(FONT_TITLE, 52)
    words = txt.split(); lines = []; cur = ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textbbox((0,0), t, font=font)[2] < W-110: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    line_h = 64
    block_h = len(lines)*line_h
    top = H - 300 - block_h
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
    solo_voz = "--voz" in sys.argv or "--voice" in sys.argv

    mp3, palabras, dur = generar_voz()
    segs = mapear_tiempos(palabras, dur)

    if solo_voz:
        print("\n✅ VOZ GENERADA. (--voz) No se renderiza el video todavía.")
        print(f"   Cuando pongas 1.png … 8.png en {IMG_DIR}, corre:")
        print("   python3 scripts/lot-video.py")
        return

    # 3-4) Encajar imagen + Ken Burns por plano
    print("🖼️  Encajando imágenes completas (cover + fondo difuminado) + Ken Burns…")
    clips = []
    for i, s in enumerate(segs, 1):
        src = img_path(s["img"])
        big = f"{TMP}/img_{i}.jpg"
        fit_full_image(src, big)
        clip = f"{TMP}/clip_{i}.mp4"
        d = max(0.6, s["_end"] - s["_start"])
        ken_burns_clip(big, s["kb"], d, clip)
        clips.append(clip)
        print(f"   ✅ plano {i} ({d:.2f}s)  {s['img']}.png  /{s['kb']}")

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

    # 5) Overlays de TÍTULOS / CITAS por beat
    overlays = []  # (png, start, end)
    for i, s in enumerate(segs, 1):
        if s["title"]:
            fn = f"{TMP}/title_{i}.png"
            png_title(s["title"], s["title_color"], s["small"], fn)
            overlays.append((fn, s["_start"]+0.20, s["_end"]-0.10))
        elif s.get("small"):
            fn = f"{TMP}/small_{i}.png"
            png_title(" ", s["title_color"], s["small"], fn)
            overlays.append((fn, s["_start"]+0.30, s["_end"]-0.10))

    # 6) Subtítulos sincronizados (por frase)
    frases = frases_de_palabras(palabras)
    for j, fr in enumerate(frases):
        fn = f"{TMP}/sub_{j}.png"
        png_sub(fr["txt"], fn)
        overlays.append((fn, fr["start"], fr["end"]+0.12))

    # ── Overlays POR LOTES (anti-deadlock) ─────────────────────────────────
    BATCH = 12
    n_lotes = (len(overlays) + BATCH - 1) // BATCH
    print(f"🎬 Componiendo {len(overlays)} overlays en {n_lotes} lotes (≤{BATCH}/pasada)…")

    current   = base_video
    lotes_out = []
    for b in range(n_lotes):
        chunk = overlays[b*BATCH:(b+1)*BATCH]
        inputs = ["-i", current]
        for (fn, st, en) in chunk:
            inputs += ["-loop", "1", "-t", f"{en + 0.10:.3f}", "-i", fn]

        fc = ""
        prev = "0:v"
        for k, (fn, st, en) in enumerate(chunk):
            idx  = k + 1
            fout = max(st, en - 0.25)
            fc += (f"[{idx}:v]format=rgba,"
                   f"fade=t=in:st={st:.2f}:d=0.25:alpha=1,"
                   f"fade=t=out:st={fout:.2f}:d=0.25:alpha=1[ov{k}];")
            nxt = f"v{k}"
            fc += f"[{prev}][ov{k}]overlay=0:0:enable='between(t,{st:.2f},{en:.2f})'[{nxt}];"
            prev = nxt
        fc = fc.rstrip(";")

        out_b = f"{TMP}/base_b{b}.mp4"
        cmd = (["ffmpeg", "-y"] + inputs +
               ["-filter_complex", fc, "-map", f"[{prev}]",
                "-c:v", "libx264", "-preset", "fast", "-crf", "14",
                "-pix_fmt", "yuv420p", "-r", str(FPS), out_b])
        print(f"   ▸ lote {b+1}/{n_lotes}: {len(chunk)} overlays → {os.path.basename(out_b)}")
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            print(f"❌ ffmpeg lote {b+1}:"); print(r.stderr[-1200:]); sys.exit(1)
        lotes_out.append(out_b)
        current = out_b

    # ── Mux final: video + voz (sin re-encode de video) ────────────────────
    print("🎧 Muxeando la voz (video copy)…")
    cmd = ["ffmpeg", "-y", "-i", current, "-i", mp3,
           "-map", "0:v", "-map", "1:a",
           "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", SALIDA]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ mux audio:"); print(r.stderr[-1200:]); sys.exit(1)

    for f in lotes_out:
        try: os.remove(f)
        except OSError: pass

    print(f"\n✅ VIDEO LISTO: {SALIDA}")
    pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                         "format=duration", "-of", "csv=p=0", SALIDA],
                        capture_output=True, text=True)
    print(f"   duración (sin cierre): {pr.stdout.strip()}s")

    # ── Cierre de marca Jashmal (outro portada). Video en español → "es". ──
    from jashmal_endcard import append_endcard
    append_endcard(SALIDA, lang="es")
    print(f"\n🎉 MP4 FINAL: {SALIDA}")


if __name__ == "__main__":
    main()
