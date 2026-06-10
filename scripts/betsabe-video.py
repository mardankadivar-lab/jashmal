#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · "Las madres del Mashíaj #3 — BAT-SHEVA (Betsabé)"  (VOZ V3)
═══════════════════════════════════════════════════════════════════════════
  Clon del pipeline de Tamar (scripts/tamar-video.py). Mismo motor:
    1. Genera la voz V3 (eleven_v3 + with-timestamps) -> MP3 + tiempos/palabra.
       (Las etiquetas [con energía], [enfático]… se filtran; los subtítulos
        usan el TEXTO BASE sin etiquetas.)
    2. Mapea 8 segmentos de narración a sus tiempos (palabra de inicio).
    3. Recorta el mejor cuadrante de cada grilla 2×2 -> 1080×1920.
    4. Ken Burns (zoompan) por plano, con la duración de su segmento.
    5. Overlays: subtítulos por frase + textos en pantalla por segmento.
    6. Pega todo + audio V3. Vertical 1080×1920, 30fps, solo la voz.

  DESPUÉS de este script, para Shabat:
    bash scripts/shabat_close.sh ~/Desktop/jashmal-videos/Betsabe/BETSABE_TIKTOK.mp4
  (añade la menorá "Shabat Shalom" reutilizable al final).

  NARRATIVA VERIFICADA por el editor-erudito (Sofer). Marco reverente:
  NO glorifica el pecado; es el descenso más oscuro de David y su TIKÚN.
  "De la herida nace el Templo." El último sabor es luz/redención.

  Uso:  python3 scripts/betsabe-video.py
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, urllib.error, base64, os, subprocess, sys, re, unicodedata
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ─────────────────────────────────────────────────────────────────────────
#  ⚙️  CONFIGURACIÓN
# ─────────────────────────────────────────────────────────────────────────
# Voz: configuración FIJA y compartida (scripts/voz_jashmal.py) — UN solo lugar
# para que la voz NO cambie entre videos. Para ajustarla, edita voz_jashmal.py.
from voz_jashmal import VOICE_ID, MODEL_V3, V3_SETTINGS

W, H, FPS = 1080, 1920, 30

ROOT     = "/Users/mardan/workspace/jashmal"
ENV      = os.path.join(ROOT, ".env.local")
# Coloca aquí las 8 grillas 2×2 de Bat-Sheva (mismo patrón que Tamar).
IMG_DIR  = "/Users/mardan/Desktop/Claude Jashmal/Marketing/images /Betsabe"
OUT_DIR  = os.path.expanduser("~/Desktop/jashmal-videos/Betsabe")
SALIDA   = os.path.join(OUT_DIR, "BETSABE_REEL.mp4")
MP3_OUT  = os.path.join(OUT_DIR, "BETSABE_voz_v3_timed.mp3")
TIMING_JSON = os.path.join(OUT_DIR, "BETSABE_timing.json")  # caché de tiempos/voz
TMP      = "/tmp/betsabe_render"
os.makedirs(TMP, exist_ok=True)
os.makedirs(OUT_DIR, exist_ok=True)

# Fuentes (macOS) — idénticas a Tamar para coherencia de marca
FONT_TITLE = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FONT_SUB   = "/System/Library/Fonts/Supplemental/Georgia.ttf"
FONT_SMALL = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"

GOLD       = (232, 200, 102)
GOLD_SOFT  = (245, 238, 210)
RED        = (200, 70, 60)
SHADOW     = (6, 4, 2)

# ── Texto del REEL (~2:15) — VOZ (modelo latino multilingual_v2, SIN etiquetas)
#   Versión APROBADA por Mardan: gancho del «Viajero» + voz nueva. Prosa limpia,
#   con comas en vez de «…» (los puntos suspensivos causan pausas/tartamudeos).
#   El saneamiento de abajo fuerza esa regla por si quedara algún «…».
GUION_V3 = (
    # Beat 1 — GANCHO: el Viajero sin rostro (clip animado de apertura).
    "¿Quién se acostó de verdad con Bat-Sheva aquella noche? ¿El rey David, o un viajero sin rostro que nadie vio entrar? "
    # Beat 2 — marco cósmico: la Sitra Ajrá ataca el linaje del redentor.
    "Es la historia de una madre del Mashíaj. Y hay una guerra oculta: cuando el Cielo forja la chispa del redentor, la Sitra Ajrá, el Otro Lado, ataca el linaje para apagar esa luz. "
    # Beat 3 — Tamar/Péretz: la luz se forja en lo oscuro; el linaje nace de la brecha.
    "Pero mira: mientras Yehudá caía con Tamar, Dios ya creaba la luz del Mashíaj. La luz se forja en lo oscuro; por eso el linaje nace de una brecha, y se llama Péretz: el que rompe. "
    # Beat 4 — guerra: los reyes salen, pero David se queda.
    "Era tiempo de guerra y los reyes salían al frente. Pero David se quedó en Jerusalén. "
    # Beat 5 — azotea, la mujer, concibió.
    "Al atardecer subió a la azotea, vio a una mujer bañándose, mandó por ella, y concibió. "
    # Beat 6 — para ocultarlo: Urías al frente a morir.
    "Para ocultarlo hizo algo peor: envió a su esposo Urías a morir al frente, y con él cayeron más soldados de Israel. "
    # Beat 7 — Natán: la parábola del rico, el pobre y la corderita.
    "Dios envió al profeta Natán, que cuenta un cuento: un viajero llega a un hombre rico, y el rico le roba al pobre su única corderita para servírsela. "
    # Beat 8a — el viajero (Talmud): viajero → huésped → dueño.
    "Detente en el viajero. El Talmud revela quién es: el mal entra primero como viajero, luego como huésped, y al fin se hace dueño de la casa. "
    # Beat 8b — glosa: es el yétzer hará.
    "Es el yétzer hará, la inclinación al mal disfrazada de visita. "
    # Beat 9 — ¿de quién era el niño? + ACLARACIÓN de seguridad.
    "Y la pregunta estremece: ese primer hijo, ¿de quién era? ¿De David, o del Viajero? Entiéndelo bien: el niño era de David, sangre de su sangre. No es duda de carne, es secreto de espíritu: fue concebido bajo el dominio del Otro Lado, y por eso murió. "
    # Beat 10 — doble filo: culpa («pequé») y defensa («se equivoca»).
    "Y aquí el doble filo: el texto no esconde la culpa, fue malo a los ojos de Dios, y David confiesa: pequé, y a la vez los sabios enseñan: quien dice que David pecó, se equivoca. David cae, y David vuelve. "
    # Beat 11-12 — de la grieta sanada nace Shlomó; el Eterno lo amó; trono eterno.
    "Y de esa grieta sanada, con Bat-Sheva ya su esposa, nace Shlomó: y el Eterno lo amó. De él vendrá el trono eterno: el linaje del Mashíaj. "
    # Beat 13 — CTA (la voz NO dice la serie ni la ruta; esas van SOLO en pantalla).
    "Sígueme y comparte, para seguir el linaje del Mashíaj."
)
# Regla de oro de la voz nueva: NINGÚN «…». Cualquier punto suspensivo → coma.
GUION_V3 = GUION_V3.replace("…", ", ").replace(" ,", ",").replace(",,", ",")

# ── Beats del REEL: cada uno mapea a UNA imagen/clip + rótulo en pantalla. ──
#   Las grillas son 2×2 → usa SIEMPRE un cuadrante (TL/TR/BL/BR), NUNCA "C"
#   (centrar parte 4 celdas). Los clips ("clip": True) ignoran crop/kb.
#   crop: "TL","TR","BL","BR"  ·  kb: "in","out","up","down","in_strong"
#   ACLARACIÓN de seguridad → "safety": True + "safety_text".
# ── MAPEO POR CONTENIDO (revisado 2026-06-07) ─────────────────────────────
#   Cada beat usa un asset con NOMBRE-CONTENIDO (no «PLANO#»), verificado a ojo:
#     GANCHO.mp4  = pareja + Viajero sin rostro     (clip de apertura v2)
#     SOMBRA.png  = encapuchado siniestro            (Viajero/Sitra Ajrá/yétzer)
#     CIUDAD.png  = ciudades/templo/ciudad celestial (luz, trono, Mashíaj)
#     LECHO.png   = figura reclinada / sala desolada (David se quedó / muerte)
#     CORDERA.png = mesa del rico + el cordero        (parábola de Natán)
#     PROFETA.png = profeta reprende al rey de rodillas (Natán → David: «pequé»)
#     BANAR.mp4   = baño en tina con vapor            (clip, reverente)
#     VIAJERO.mp4 = encapuchado tendiendo la mano     (clip del yétzer)
#     TESHUVA.mp4 = orante arrodillado en la luz      (clip: David vuelve)
#     TRONO.mp4   = ciudad celestial con haz divino   (clip del trono eterno)
#   SIN repeticiones de cuadrante: SOMBRA usa sus 4 cuadrantes (TL/TR/BR/BL) y
#   CIUDAD 3 (BR/TL/TR). ⚑ El beat 6 (Urías) NO tiene imagen propia → FLAG.
SEGMENTS = [
    {  # 1 — GANCHO: la pareja + el Viajero sin rostro (clip de apertura v2).
        "start_marker": "quien se acosto",
        "img": "GANCHO", "clip": True, "kb": "in",
        "title": None, "title_color": GOLD,
        "small": "Madres del Mashíaj  ·  #3",   # serie SOLO en pantalla (no voz)
    },
    {  # 2 — marco cósmico: la Sitra Ajrá (el Otro Lado) ataca → encapuchado.
        "start_marker": "es la historia",
        "img": "SOMBRA", "crop": "TL", "kb": "in",
        "title": "SITRA AJRÁ\n«EL OTRO LADO»", "title_color": RED,
        "small": "Cabalá · la fuerza que ataca el linaje",
    },
    {  # 3 — Péretz: la luz se forja en lo oscuro → haz de luz en tinieblas.
        "start_marker": "pero mira",
        "img": "CIUDAD", "crop": "BR", "kb": "in",
        "title": "PÉRETZ\n«EL QUE ROMPE»", "title_color": GOLD,
        "small": "Génesis 38:29 · la luz nace de la brecha",
    },
    {  # 4 — era tiempo de guerra, pero David se quedó (en su lecho).
        "start_marker": "era tiempo de guerra",
        "img": "LECHO", "crop": "TL", "kb": "in",
        "title": "ERA TIEMPO DE GUERRA\nY DAVID SE QUEDÓ", "title_color": GOLD,
        "small": "2 Samuel 11:1",
    },
    {  # 5 — al atardecer; vio a una mujer bañándose; concibió (clip del baño).
        "start_marker": "al atardecer subio",
        "img": "BANAR", "clip": True, "kb": "down",
        "title": None, "title_color": GOLD,
        "small": "2 Samuel 11:2 · vio a una mujer bañándose",
    },
    {  # 6 — para ocultarlo, algo peor: Urías al frente a morir.
        #   ⚑ FLAG: NO hay imagen de batalla/Urías. LECHO/BL es un PLACEHOLDER
        #   sombrío (figura caída en sala desolada). Reemplazar con imagen propia
        #   (ver prompt de MidJourney en el reporte de gerencia).
        "start_marker": "para ocultarlo hizo",
        "img": "LECHO", "crop": "BL", "kb": "in",
        "title": "PARA OCULTARLO,\nALGO PEOR", "title_color": RED,
        "small": "2 Samuel 11:14-17 · Urías cae en el frente",
    },
    {  # 7 — Natán: la parábola del rico, el pobre y la corderita.
        "start_marker": "dios envio al profeta",
        "img": "CORDERA", "crop": "TL", "kb": "up",
        "title": "EL RICO = DAVID\nLA CORDERITA = BAT-SHEVA", "title_color": GOLD,
        "small": "2 Samuel 12:1-4 · la parábola de Natán",
    },
    {  # 8a — el viajero (Talmud): viajero → huésped → dueño (clip del yétzer).
        "start_marker": "detente en el viajero",
        "img": "VIAJERO", "clip": True, "kb": "in",
        "title": "PRIMERO VIAJERO,\nLUEGO HUÉSPED,\nAL FIN DUEÑO", "title_color": RED,
        "small": "Talmud · Suká 52b",
    },
    {  # 8b — glosa: es el yétzer hará, la inclinación al mal (encapuchado).
        "start_marker": "es el yetzer hara",
        "img": "SOMBRA", "crop": "TR", "kb": "in",
        "title": "YÉTZER HARÁ\nLA INCLINACIÓN AL MAL", "title_color": GOLD,
        "small": "«disfrazada de visita»",
    },
    {  # 9a — ¿de quién era el niño? (sombra del Otro Lado) + caja de ACLARACIÓN.
        "start_marker": "y la pregunta estremece",
        "img": "SOMBRA", "crop": "BR", "kb": "in",
        "title": None, "title_color": GOLD, "small": None,
        "safety": True,
        "safety_text": ("El niño es hijo biológico de David. «El Viajero» es el "
                        "yétzer hará —la inclinación al mal—, NO un hombre. La "
                        "pregunta es espiritual, no de paternidad."),
    },
    {  # 9b — «bajo el dominio del Otro Lado, y por eso murió»; la caja sigue.
        "start_marker": "entiendelo bien",
        "img": "SOMBRA", "crop": "BL", "kb": "down",
        "title": None, "title_color": GOLD, "small": None,
        "safety": True,
        "safety_text": ("El niño es hijo biológico de David. «El Viajero» es el "
                        "yétzer hará —la inclinación al mal—, NO un hombre. La "
                        "pregunta es espiritual, no de paternidad."),
    },
    {  # 10a — culpa: «fue malo a los ojos de Dios» · «pequé» (Natán reprende).
        "start_marker": "y aqui el doble filo",
        "img": "PROFETA", "crop": "TR", "kb": "in",
        "title": "«FUE MALO A LOS\nOJOS DE DIOS»", "title_color": RED,
        "small": "2 Samuel 11:27 · y David: «pequé» (12:13)",
    },
    {  # 10b — defensa: «quien dice que David pecó, se equivoca» (clip: David ora).
        "start_marker": "y a la vez los sabios",
        "img": "TESHUVA", "clip": True, "kb": "in",
        "title": "«QUIEN DICE QUE DAVID\nPECÓ, SE EQUIVOCA»", "title_color": GOLD,
        "small": "Talmud · Shabat 56a",
    },
    {  # 11 — de la grieta sanada nace Shlomó; y el Eterno lo amó (ciudad dorada).
        "start_marker": "y de esa grieta sanada",
        "img": "CIUDAD", "crop": "TL", "kb": "up",
        "title": "«Y EL ETERNO\nLO AMÓ»", "title_color": GOLD,
        "small": "2 Samuel 12:24 · nace Shlomó",
    },
    {  # 12 — el trono eterno: el linaje del Mashíaj (clip: ciudad celestial).
        "start_marker": "de el vendra el trono",
        "img": "TRONO", "clip": True, "kb": "in",
        "title": "EL TRONO ETERNO\nEL LINAJE DEL MASHÍAJ", "title_color": GOLD,
        "small": "Mashíaj ben David",
    },
    {  # 13 — CTA + ruta (serie y ruta SOLO en pantalla, la voz NO las dice).
        "start_marker": "sigueme y comparte",
        "img": "CIUDAD", "crop": "TR", "kb": "in",
        "title": "MADRES DEL MASHÍAJ · #3\njashmal.org/linaje", "title_color": GOLD,
        "small": "Sigue el hilo del linaje",
    },
]

# Archivos completos. Mantén el MISMO prefijo de Midjourney que Tamar para que
# el estilo (sepia, grabado s.XIX) salga idéntico. Cada PLANO# es un trozo del
# nombre de archivo que identifica la grilla (puedes usar el hash de MJ).
PREFIX = "u6748946711_Vintage_19th-century_steel_engraving_on_aged_sepia__"
def img_path(tag):
    for f in os.listdir(IMG_DIR):
        if tag in f and f.lower().endswith(".png"):
            return os.path.join(IMG_DIR, f)
    raise FileNotFoundError(
        f"No encontré imagen con tag '{tag}' en {IMG_DIR}.\n"
        f"   → Renombra la grilla 2×2 de ese plano para que su nombre CONTENGA '{tag}'.\n"
        f"     Ej: {PREFIX}{tag}.png")


def clip_path(tag):
    """Devuelve el .mp4 (clip animado de Midjourney) cuyo nombre contiene el tag,
    o None si no hay clip para ese plano (→ se usará la imagen estática)."""
    for f in os.listdir(IMG_DIR):
        if tag in f and f.lower().endswith(".mp4"):
            return os.path.join(IMG_DIR, f)
    return None


def clip_from_video(src, dur, dst):
    """Ajusta un clip animado a 1080×1920 y a la duración del segmento, estirando
    el tiempo (setpts) para que la animación corra UNA vez, suave y sin saltos de
    loop. Llena el encuadre vertical (escala+recorte centrado)."""
    pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                         "-of", "csv=p=0", src], capture_output=True, text=True)
    try:
        cdur = float(pr.stdout.strip())
    except ValueError:
        cdur = dur
    factor = max(0.05, dur / max(0.1, cdur))   # PTS: >1 ralentiza · <1 acelera
    vf = (f"scale={W}:{H}:force_original_aspect_ratio=increase,"
          f"crop={W}:{H},setpts={factor:.4f}*PTS,fps={FPS},format=yuv420p")
    cmd = ["ffmpeg", "-y", "-i", src, "-vf", vf, "-t", f"{dur:.3f}", "-an",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", dst]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ ffmpeg clip animado:"); print(r.stderr[-700:]); sys.exit(1)
    return dst


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
    # Caché: si ya generamos la voz y sus tiempos, reusarlos (ahorra créditos de
    # ElevenLabs al reajustar imágenes). Borra el MP3 o el JSON para regenerar.
    if os.path.exists(MP3_OUT) and os.path.exists(TIMING_JSON):
        with open(TIMING_JSON) as f:
            cache = json.load(f)
        print(f"♻️  Reusando voz V3 en caché — {cache['dur']:.2f}s "
              f"(borra {os.path.basename(MP3_OUT)} para regenerar).")
        return MP3_OUT, cache["palabras"], cache["dur"]
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
    print(f"   ✅ Voz V3 lista — {dur:.2f}s, {len(palabras)} palabras (en caché)")
    return MP3_OUT, palabras, dur


# ─────────────────────────────────────────────────────────────────────────
#  2. Mapear segmentos -> tiempos (palabra de inicio de cada segmento)
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
            print(f"❌ No pude ubicar el segmento: '{s['start_marker']}'"); sys.exit(1)
        s["_idx"] = idx
        s["_start"] = t
        cursor = idx + 1

    for i, s in enumerate(SEGMENTS):
        s["_end"] = SEGMENTS[i+1]["_start"] if i+1 < len(SEGMENTS) else dur
    SEGMENTS[0]["_start"] = 0.0

    print("🗺️  Mapa de planos (inicio→fin):")
    for i, s in enumerate(SEGMENTS, 1):
        print(f"   {i}. {s['_start']:5.2f}→{s['_end']:5.2f}s  img={s['img']}  «{s['start_marker'][:32]}»")
    return SEGMENTS


# ─────────────────────────────────────────────────────────────────────────
#  3. Recortar el mejor cuadrante de cada grilla 2×2 -> lienzo 1080×1920
# ─────────────────────────────────────────────────────────────────────────
def recortar_cuadrante(src, crop, dst, off_x=0.0, off_y=0.0):
    """Recorta un cuadrante de la grilla 2×2 y lo enmarca a 9:16.

    off_x / off_y  ∈ [-1, 1]  desplazan el encuadre 9:16 dentro del cuadrante
    cuando hay margen que recortar (NO cuando el lado ya cabe entero):
      off_x < 0  →  mueve el recorte a la IZQUIERDA (revela lo que estaba a la
                    izquierda del centro; p.ej. la cabeza de David en PLANO1).
      off_x > 0  →  a la derecha.
      off_y < 0  →  hacia ARRIBA · off_y > 0 → hacia ABAJO (revela el suelo,
                    p.ej. la corderita de PLANO4 si quedara baja).
    0 = comportamiento centrado de siempre (no cambia los planos que ya estaban
    bien). El offset se aplica solo sobre el eje que efectivamente se recorta y
    se satura para no salirse de la imagen."""
    im = Image.open(src).convert("RGB")
    gw, gh = im.size
    hw, hh = gw // 2, gh // 2
    boxes = {
        "TL": (0, 0, hw, hh), "TR": (hw, 0, gw, hh),
        "BL": (0, hh, hw, gh), "BR": (hw, hh, gw, gh),
        "C":  (gw//4, gh//4, gw*3//4, gh*3//4),
    }
    quad = im.crop(boxes.get(crop, boxes["C"]))
    qw, qh = quad.size
    target = W / H
    if qw / qh > target:
        nw = int(qh * target); margin = qw - nw
        x0 = margin // 2 + int(round(off_x * (margin / 2)))
        x0 = max(0, min(margin, x0))
        quad = quad.crop((x0, 0, x0+nw, qh))
    else:
        nh = int(qw / target); margin = qh - nh
        y0 = margin // 2 + int(round(off_y * (margin / 2)))
        y0 = max(0, min(margin, y0))
        quad = quad.crop((0, y0, qw, y0+nh))
    quad = quad.resize((1350, 2400), Image.LANCZOS)
    quad.save(dst, quality=95)
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
    while max(d.textbbox((0,0), ln, font=font)[2] for ln in lines) > W-90 and fsize > 44:
        fsize -= 3; font = ImageFont.truetype(FONT_TITLE, fsize)
    yend = _draw_multiline(d, lines, font, W//2, 120, (*color, 255), 16, shadow_a=235)
    if small:
        sfont = ImageFont.truetype(FONT_SMALL, 40)
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


def png_safety(body, fname):
    """Caja de ACLARACIÓN (sensibilidad religiosa): panel semitransparente con
    borde dorado en el tercio superior. Legible y SOBRIO (no dramático). Sella
    que «el Viajero» = yétzer hará y que la paternidad del niño es de David."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    hfont = ImageFont.truetype(FONT_TITLE, 50)
    bfont = ImageFont.truetype(FONT_SUB, 43)
    header = "ACLARACIÓN"
    maxw = W - 220
    words = body.split(); lines = []; cur = ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textbbox((0, 0), t, font=bfont)[2] <= maxw: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    line_h = 58
    pad = 38
    hb = d.textbbox((0, 0), header, font=hfont); hh = hb[3] - hb[1]
    panel_h = pad + hh + 24 + len(lines) * line_h + pad
    x0, x1 = 64, W - 64
    y0 = 168; y1 = y0 + panel_h
    d.rectangle([x0, y0, x1, y1], fill=(8, 6, 3, 210), outline=(*GOLD, 255), width=3)
    hx = (W - (hb[2] - hb[0])) // 2 - hb[0]
    d.text((hx, y0 + pad - 6), header, font=hfont, fill=(*GOLD, 255))
    y = y0 + pad + hh + 24
    for ln in lines:
        bb = d.textbbox((0, 0), ln, font=bfont); tw = bb[2] - bb[0]
        x = (W - tw) // 2 - bb[0]
        for ox, oy in [(-2, 2), (2, 2), (0, 3)]:
            d.text((x + ox, y + oy), ln, font=bfont, fill=(0, 0, 0, 205))
        d.text((x, y), ln, font=bfont, fill=(*GOLD_SOFT, 255))
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
    mp3, palabras, dur = generar_voz_v3()
    segs = mapear_tiempos(palabras, dur)

    print("🖼️  Planos: clips (GANCHO·BANAR·VIAJERO·TESHUVA·TRONO) + Ken Burns (resto)…")
    clips = []
    for i, s in enumerate(segs, 1):
        clip = f"{TMP}/clip_{i}.mp4"
        d = max(0.6, s["_end"] - s["_start"])
        cpath = clip_path(s["img"]) if s.get("clip") else None
        if cpath:
            clip_from_video(cpath, d, clip)
            print(f"   🎬 plano {i} ({d:.2f}s)  CLIP animado  ←  {os.path.basename(cpath)}")
        else:
            src = img_path(s["img"])
            big = f"{TMP}/quad_{i}.jpg"
            recortar_cuadrante(src, s["crop"], big,
                               off_x=s.get("off_x", 0.0), off_y=s.get("off_y", 0.0))
            ken_burns_clip(big, s["kb"], d, clip)
            print(f"   ✅ plano {i} ({d:.2f}s)  {s['crop']}/{s['kb']}"
                  f"  off=({s.get('off_x',0):+.2f},{s.get('off_y',0):+.2f})")
        clips.append(clip)

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

    overlays = []  # (png, start, end)
    for i, s in enumerate(segs, 1):
        if s.get("safety"):
            fn = f"{TMP}/safety_{i}.png"
            png_safety(s["safety_text"], fn)
            # la caja entra rápido y se queda casi todo el beat (disclaimer legible)
            overlays.append((fn, s["_start"]+0.15, s["_end"]-0.05))
        elif s["title"]:
            fn = f"{TMP}/title_{i}.png"
            png_title(s["title"], s["title_color"], s["small"], fn)
            overlays.append((fn, s["_start"]+0.20, s["_end"]-0.10))
        elif s.get("small"):
            fn = f"{TMP}/small_{i}.png"
            png_title(" ", s["title_color"], s["small"], fn)
            overlays.append((fn, s["_start"]+0.30, s["_end"]-0.10))

    frases = frases_de_palabras(palabras)
    for j, fr in enumerate(frases):
        fn = f"{TMP}/sub_{j}.png"
        png_sub(fr["txt"], fn)
        overlays.append((fn, fr["start"], fr["end"]+0.12))

    # ── Aplicación de overlays POR LOTES (anti-deadlock) ───────────────────
    #   ANTES: UN solo ffmpeg con los ~53 overlays encadenados ([v0]→…→[v52])
    #   y ~53 inputs «-loop 1» simultáneos. Ese filtergraph gigante con tantos
    #   inputs infinitos hacía que ffmpeg se deadlockeara (0% CPU, dormido).
    #   AHORA: se aplican en lotes de BATCH overlays por pasada; cada pasada
    #   escribe un mp4 intermedio que la siguiente vuelve a abrir como base.
    #   Grafo pequeño por pasada = SIN cuelgues. Al final se muxea la voz
    #   cacheada (copy de video, sin re-encode) y se borran los intermedios.
    BATCH = 12
    n_lotes = (len(overlays) + BATCH - 1) // BATCH
    print(f"🎬 Componiendo {len(overlays)} overlays en {n_lotes} lotes "
          f"(≤{BATCH} por pasada, anti-deadlock)…")

    current   = base_video      # base de la 1ª pasada = el concat sin overlays
    lotes_out = []              # mp4 intermedios (se borran al final)
    for b in range(n_lotes):
        chunk = overlays[b*BATCH:(b+1)*BATCH]
        inputs = ["-i", current]
        for (fn, st, en) in chunk:
            inputs += ["-loop", "1", "-t", f"{en + 0.10:.3f}", "-i", fn]

        fc = ""
        prev = "0:v"            # input 0 = la base de esta pasada
        for k, (fn, st, en) in enumerate(chunk):
            idx  = k + 1        # los overlays de la pasada empiezan en el input 1
            fout = max(st, en - 0.25)
            fc += (f"[{idx}:v]format=rgba,"
                   f"fade=t=in:st={st:.2f}:d=0.25:alpha=1,"
                   f"fade=t=out:st={fout:.2f}:d=0.25:alpha=1[ov{k}];")
            nxt = f"v{k}"
            fc += f"[{prev}][ov{k}]overlay=0:0:enable='between(t,{st:.2f},{en:.2f})'[{nxt}];"
            prev = nxt
        fc = fc.rstrip(";")

        out_b = f"{TMP}/base_b{b}.mp4"
        # SIN audio y SIN -shortest: el único stream mapeado [prev] sigue al
        # input 0 (la base, full-length) → la pasada dura lo que dura la base,
        # aunque los overlays-imagen sean cortos. Re-encode a crf alto (poca
        # pérdida generacional en este sepia oscuro).
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

    # ── Mux final: video con overlays + voz CACHEADA (sin re-encode de video) ─
    print("🎧 Muxeando la voz cacheada (video copy, sin re-encode)…")
    cmd = ["ffmpeg", "-y", "-i", current, "-i", mp3,
           "-map", "0:v", "-map", "1:a",
           "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest", SALIDA]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ mux audio:"); print(r.stderr[-1200:]); sys.exit(1)

    # ── Limpieza de intermedios de los lotes ───────────────────────────────
    for f in lotes_out:
        try: os.remove(f)
        except OSError: pass

    print(f"\n✅ VIDEO V3 LISTO: {SALIDA}")
    pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                         "format=duration", "-of", "csv=p=0", SALIDA],
                        capture_output=True, text=True)
    print(f"   duración: {pr.stdout.strip()}s")

    # ── Beat final ESTÁNDAR: cierre de marca Jashmal (outro portada) ─────────
    # TODOS los videos de Jashmal terminan con la portada. Video en español → "es".
    from jashmal_endcard import append_endcard
    append_endcard(SALIDA, lang="es")

    print("   Para Shabat (añade la menorá):")
    print(f"   bash {ROOT}/scripts/shabat_close.sh '{SALIDA}'")


if __name__ == "__main__":
    main()
