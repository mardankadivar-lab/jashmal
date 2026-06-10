#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · "ROPAS DE LUZ" — DEBUT de la serie «La caída necesaria / el Tikún»
═══════════════════════════════════════════════════════════════════════════
  Gancho: «¿Sabías que Adán y Eva nunca pecaron?»  (PUERTA, no tesis).
  Fuente: content/estudio-ropas-de-luz.md (VERIFICADO por el Sofer 2026-06-10).
  Landing: jashmal.org/ropas-de-luz (link corto verificado, 200).

  Clon del motor probado de Lot/Betsabé:
    voz_jashmal (Martin Osborne, acento latino) → MP3 + timestamps por palabra,
    fit_full_image (cover + fondo difuminado) → Ken Burns por plano →
    overlays por lotes (gancho + títulos + subtítulos) → end-card de marca
    con cierre horneado «Comparte y difunde la luz de Dios» vía dip-to-black.

  GUARDARRAÍLES DE HONESTIDAD (del Sofer — obligatorios, ya cumplidos en el guion):
    • El gancho «nunca pecaron» es PUERTA. El video ATERRIZA en: «sí hubo falta —
      pero la falta tenía un lugar en el plan». NUNCA cierra con «no pecaron».
    • Izhbitz NO se menciona como «lo que dice el judaísmo» (de hecho, no se nombra
      como tesis: solo se usa la tensión clásica «pecaron, y aun así…»).
    • NO se dice «la Torá dice luz»: se dice que la variante אור (luz) es la Torá
      PERSONAL de Rabí Meir (drash); el texto oficial dice עור (piel).
    • Sello verificado: נחש=358=משיח  ·  אור(207) vs עור(276)  → el clímax.

  ARCO EMOCIONAL: luz vestida de piel → la serpiente del Edén → pero נחש=משיח →
  la piel, por el trabajo del hombre, vuelve a ser luz. De la sombra a la esperanza.

  USO:
    A) Solo voz (no necesita imágenes):  python3 scripts/ropas-de-luz-video.py --voz
    B) Render final:                     python3 scripts/ropas-de-luz-video.py
       (imágenes en ~/Desktop/Jashmal_RopasDeLuz/ nombradas 1.png … 8.png)
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, urllib.error, base64, os, subprocess, sys, re, unicodedata
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ── VOZ: la MISMA de la serie (Tamar/Betsabé/Lot) — Martin Osborne ──────────
from voz_jashmal import VOICE_ID as SERIE_VOICE_ID, MODEL_V3, V3_SETTINGS

VOICE_ID = SERIE_VOICE_ID                    # "W5JElH3dK1UYYAiHH7uh" (Martin Osborne)
MODEL_ID = MODEL_V3                          # eleven_multilingual_v2 (acento latino)

# Tempo: ligeramente más pausado que Lot (1.2) — este estudio es reverente, no
# de escándalo. 1.08 mantiene la voz de la serie pero deja respirar al misterio.
VOICE_SPEED = 1.08
VOICE_SETTINGS = dict(V3_SETTINGS, speed=VOICE_SPEED)

W, H, FPS = 1080, 1920, 30
MAX_PLANO = 11.0                             # regla de oro: ningún still > 11s

ROOT     = "/Users/mardan/workspace/jashmal"
ENV      = os.path.join(ROOT, ".env.local")
IMG_DIR  = os.environ.get("ROPAS_IMG_DIR", os.path.expanduser("~/Desktop/Jashmal_RopasDeLuz"))
OUT_DIR  = os.path.expanduser("~/Desktop/jashmal-videos/RopasDeLuz")
SALIDA   = os.path.join(OUT_DIR, "ROPAS_DE_LUZ_TIKTOK.mp4")
MP3_OUT  = os.path.join(OUT_DIR, "ROPAS_voz.mp3")
TIMING_JSON = os.path.join(OUT_DIR, "ROPAS_timing.json")
TMP      = "/tmp/ropas_render"
os.makedirs(TMP, exist_ok=True)
os.makedirs(OUT_DIR, exist_ok=True)

# Fuentes (macOS) — idénticas a la serie para coherencia de marca
FONT_TITLE = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FONT_SUB   = "/System/Library/Fonts/Supplemental/Georgia.ttf"
FONT_SMALL = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"

GOLD       = (232, 200, 102)
GOLD_SOFT  = (245, 238, 210)
RED        = (200, 70, 60)
SHADOW     = (6, 4, 2)

# ── OVERLAY DE APERTURA (gancho de retención, fijo 0–2.4s sobre img 1) ───────
HOOK_TEXT  = ["¿SABÍAS QUE", "ADÁN Y EVA NUNCA PECARON?"]
HOOK_END   = 2.4
TITLE_P1_AT = 2.55        # el título de la escena 1 entra DESPUÉS del gancho

# ── NARRACIÓN (verificada por el Sofer · content/estudio-ropas-de-luz.md) ────
#   Regla de la voz: NADA de «…» ni «—» (causan pausas raras) → comas/puntos.
#   El gancho es PUERTA; el cuerpo aterriza en «sí hubo falta, con un lugar en el
#   plan» y cierra en נחש=משיח → la piel vuelve a ser luz.
GUION_BODY = (
    # S1 — portada · el gancho-puerta (ropa de luz)
    "¿Sabías que Adán y Eva nunca pecaron? "
    "Espera, porque la verdad es más profunda. "
    # S2 — ropa de luz (antes de la caída)
    "Antes de la caída, el primer hombre tenía un cuerpo de luz. "
    "En la Torá personal de Rabí Meir, el versículo decía: ropas de LUZ. "
    # S3 — una sola letra: luz vs piel
    "Pero el texto que rige dice: ropas de PIEL. "
    "Una sola letra separa la luz, de la piel. "
    # S4 — la serpiente del Edén / la falta
    "Llega la serpiente. El hombre come del árbol, y sí, hubo una falta real. "
    "La luz no se apagó. Se vistió de piel, y quedó escondida. "
    # S5 — pero la falta tenía un lugar en el plan
    "Pero esa caída no rompió el plan. Lo puso en marcha. "
    "Sin descenso, no hay nada que elevar. "
    # S6 — el clímax: najash = mashíaj = 358
    "Y mira la gematría. Najash, la serpiente, suma trescientos cincuenta y ocho. "
    "Mashíaj, el Mesías, suma lo mismo. "
    # S7 — la piel vuelve a ser luz (el Tikún)
    "La misma fuerza que fue la serpiente del Edén, "
    "rectificada por el trabajo del hombre, es la fuerza del Mesías. "
    # S8 — esperanza / CTA
    "Por eso tu caída no es el final. La piel recuerda que fue luz, y puede volver a serlo. "
    "Para el estudio profundo, visita el link en el caption."
)
# ── CIERRE FINAL (bendición + CTA de compartir) — va SOBRE el end-card ───────
CIERRE_TEXT  = "Comparte y difunde la luz de Dios"          # texto en pantalla
CIERRE_VOZ   = "Comparte, y difunde la luz de Dios."        # lo que dice la voz
CIERRE_MARK  = "comparte"                                   # 1ª palabra (separador)

GUION = (GUION_BODY + " " + CIERRE_VOZ)
GUION = GUION.replace("…", ", ").replace("—", ", ").replace(" ,", ",").replace(",,", ",")

# ── PLANOS (8 beats) ─────────────────────────────────────────────────────────
#   img = nombre de archivo (sin extensión) en IMG_DIR. Algunos beats reutilizan
#   una imagen como callback temático (igual que Lot) para que ningún plano pase
#   de 11s. Ver el README de imágenes al pie para qué imagen va en cada número.
SEGMENTS = [
    {   # P1 — portada · gancho-puerta (img 1: ropa de luz / silueta translúcida)
        "start_marker": "sabias que adan",
        "img": "1", "kb": "in",
        "title": "ROPAS DE LUZ", "title_color": GOLD,
        # Sin hebreo en overlay (Georgia no lo soporta → cajitas).
        "small": "Génesis 3:21 · «kotnot or»: ¿luz o piel?",
        "title_start_at": TITLE_P1_AT,
    },
    {   # P2 — cuerpo de luz / Torá de R. Meir (img 2)
        "start_marker": "antes de la caida",
        "img": "2", "kb": "up",
        "title": "UN CUERPO\nDE LUZ", "title_color": GOLD,
        "small": "«En la Torá de R. Meir: ropas de LUZ» · Bereshit Rabbá 20:12",
    },
    {   # P3 — una sola letra: álef vs áyin (img 3)
        "start_marker": "pero el texto que rige",
        "img": "3", "kb": "in",
        "title": "UNA SOLA LETRA", "title_color": GOLD,
        # Sin hebreo en overlay: álef (luz)=207 vs áyin (piel)=276.
        "small": "luz (con álef) = 207   ·   piel (con áyin) = 276",
    },
    {   # P4 — la serpiente del Edén / la falta real (img 4: serpiente oscura)
        "start_marker": "llega la serpiente",
        "img": "4", "kb": "in_strong",
        "title": "SÍ HUBO\nUNA FALTA", "title_color": RED,
        "small": "la luz no se apagó: se vistió de piel",
    },
    {   # P5 — la caída puso el plan en marcha (img 5: exilio / figura)
        "start_marker": "pero esa caida",
        "img": "5", "kb": "down",
        "title": "EL DESCENSO\nERA EL CAMINO", "title_color": GOLD,
        "small": "yeridá tzórej aliyá · Likkutei Torah, Shir HaShirim 4:2",
    },
    {   # P6 — callback: sin descenso no hay nada que elevar (img 6: chispas)
        "start_marker": "sin descenso",
        "img": "6", "kb": "up",
        "title": "NADA QUE\nELEVAR SIN CAER", "title_color": GOLD,
        "small": "el birur de las chispas · el trabajo del hombre",
    },
    {   # P7 — CLÍMAX: najash = mashíaj = 358 (img 7: serpiente «358»)
        #   OJO: NO usar hebreo con niqqud en el título (Georgia no lo soporta →
        #   salían cajitas). Usamos transliteración latina; el hebreo va horneado
        #   en la imagen (el «358») y en la descripción del post.
        "start_marker": "y mira la gematria",
        "img": "7", "kb": "in",
        "title": "NÁJASH = 358\n= MASHÍAJ", "title_color": GOLD,
        "small": "serpiente = 358 = Mashíaj · la misma fuerza",
    },
    {   # P8 — la piel vuelve a ser luz / el Tikún (img 8: serpiente de luz)
        "start_marker": "la misma fuerza",
        "img": "8", "kb": "up",
        "title": "DE PIEL,\nDE NUEVO LUZ", "title_color": GOLD,
        "small": "rectificada por el trabajo del hombre",
    },
    {   # P9 — esperanza (callback img 5: del exilio a la luz)
        "start_marker": "por eso tu caida",
        "img": "5", "kb": "up",
        "title": "TU CAÍDA NO\nES EL FINAL", "title_color": GOLD,
        "small": "la piel recuerda que fue luz",
    },
    {   # P10 — CTA (img 6: chispas ascendiendo al amanecer)
        "start_marker": "para el estudio profundo",
        "img": "6", "kb": "in",
        "title": "EL ESTUDIO\nPROFUNDO", "title_color": GOLD,
        "small": "El link está en el caption",
    },
]


def img_path(tag):
    p = os.path.join(IMG_DIR, f"{tag}.png")
    if os.path.exists(p):
        return p
    for ext in (".jpg", ".jpeg", ".PNG", ".JPG", ".webp"):
        alt = os.path.join(IMG_DIR, f"{tag}{ext}")
        if os.path.exists(alt):
            return alt
    raise FileNotFoundError(
        f"No encontré la imagen «{tag}» en {IMG_DIR}.\n"
        f"   → Pon las 8 imágenes nombradas 1.png … 8.png en esa carpeta.")


# ── Utilidades de texto ─────────────────────────────────────────────────────
def norm(s):
    s = s.lower()
    s = "".join(c for c in unicodedata.normalize("NFD", s)
                if unicodedata.category(c) != "Mn")
    s = re.sub(r"[^a-z0-9 ]", " ", s)
    return re.sub(r"\s+", " ", s).strip()


# ── 1. Voz + tiempos por palabra (con caché) ────────────────────────────────
def cargar_key():
    key = ""
    with open(ENV) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                key = line.split("=", 1)[1].strip()
    if not key:
        print("❌ No encontré ELEVENLABS_API_KEY en .env.local"); sys.exit(1)
    return key


def generar_voz(force=False):
    if not force and os.path.exists(MP3_OUT) and os.path.exists(TIMING_JSON):
        with open(TIMING_JSON) as f:
            cache = json.load(f)
        print(f"♻️  Reusando voz en caché — {cache['dur']:.2f}s "
              f"(borra {os.path.basename(MP3_OUT)} para regenerar).")
        return MP3_OUT, cache["palabras"], cache["dur"]

    key = cargar_key()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({"text": GUION, "model_id": MODEL_ID,
                       "voice_settings": VOICE_SETTINGS}).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key, "Content-Type": "application/json"})
    print(f"🎙️  Generando voz ({MODEL_ID} · Martin Osborne {VOICE_ID}) + timestamps…")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP {e.code}: {e.read().decode(errors='replace')[:600]}")
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


# ── 2. Mapear beats → tiempos ───────────────────────────────────────────────
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
        s["_idx"] = idx; s["_start"] = t
        cursor = idx + 1

    for i, s in enumerate(SEGMENTS):
        s["_end"] = SEGMENTS[i+1]["_start"] if i+1 < len(SEGMENTS) else dur
    SEGMENTS[0]["_start"] = 0.0

    print("🗺️  Mapa de planos (inicio→fin):")
    max_d = 0.0
    for i, s in enumerate(SEGMENTS, 1):
        d = s["_end"] - s["_start"]; max_d = max(max_d, d)
        flag = "  ⚠️>11s" if d > MAX_PLANO else ""
        print(f"   {i:2d}. {s['_start']:5.2f}→{s['_end']:5.2f}s  ({d:4.1f}s)  "
              f"img={s['img']}  «{s['start_marker'][:28]}»{flag}")
    print(f"   ▸ plano más largo: {max_d:.1f}s  (límite {MAX_PLANO:.0f}s) · total {dur:.1f}s")
    if max_d > MAX_PLANO + 0.5:
        print(f"   ⚠️  Un plano pasa de {MAX_PLANO:.0f}s — considera partirlo con un callback.")
    return SEGMENTS


# ── 3. Encajar imagen ÚNICA → 1350×2400 (cover + fondo difuminado) ──────────
def fit_full_image(src, dst):
    BW, BH = 1350, 2400
    im = Image.open(src).convert("RGB")
    sw, sh = im.size
    cover = max(BW / sw, BH / sh)
    bw, bh = int(sw * cover) + 2, int(sh * cover) + 2
    bg = im.resize((bw, bh), Image.LANCZOS)
    bx, by = (bw - BW) // 2, (bh - BH) // 2
    bg = bg.crop((bx, by, bx + BW, by + BH)).filter(ImageFilter.GaussianBlur(42))
    bg = Image.eval(bg, lambda p: int(p * 0.55))
    contain = min(BW / sw, BH / sh)
    fw, fh = max(1, int(sw * contain)), max(1, int(sh * contain))
    fg = im.resize((fw, fh), Image.LANCZOS)
    bg.paste(fg, ((BW - fw) // 2, (BH - fh) // 2))
    bg.save(dst, quality=95)
    return dst


# ── 4. Clip Ken Burns por plano ─────────────────────────────────────────────
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


# ── 5. Overlays PNG ─────────────────────────────────────────────────────────
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


def png_hook(fname):
    """Gancho de apertura: pregunta grande dorada, fija, con banda oscura central."""
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img)
    f1 = ImageFont.truetype(FONT_TITLE, 70)
    while d.textbbox((0,0), HOOK_TEXT[0], font=f1)[2] > W-90 and f1.size > 44:
        f1 = ImageFont.truetype(FONT_TITLE, f1.size-3)
    # línea 2 puede ser larga → la envolvemos a 2 renglones si hace falta
    f2 = ImageFont.truetype(FONT_TITLE, 72)
    l2 = HOOK_TEXT[1].upper()
    words = l2.split(); lines2 = []; cur = ""
    for w in words:
        t = (cur+" "+w).strip()
        if d.textbbox((0,0), t, font=f2)[2] < W-110: cur = t
        else: lines2.append(cur); cur = w
    if cur: lines2.append(cur)
    while max(d.textbbox((0,0), ln, font=f2)[2] for ln in lines2) > W-90 and f2.size > 44:
        f2 = ImageFont.truetype(FONT_TITLE, f2.size-3)

    bb1 = d.textbbox((0,0), HOOK_TEXT[0], font=f1)
    h1 = bb1[3]-bb1[1]
    h2_each = d.textbbox((0,0), "Ay", font=f2)[3]
    gap = 22
    block = h1 + gap + len(lines2)*(h2_each+10)
    top = int(H*0.34) - block//2
    pad = 46
    bw = max([bb1[2]-bb1[0]] + [d.textbbox((0,0), ln, font=f2)[2] for ln in lines2]) + pad*2
    bx0 = (W - bw)//2
    d.rounded_rectangle([bx0, top-pad, bx0+bw, top+block+pad],
                        radius=34, fill=(6, 4, 3, 172))
    _draw_multiline(d, [HOOK_TEXT[0]], f1, W//2, top, (*GOLD_SOFT, 255), 0, shadow_a=240)
    y2 = top + h1 + gap
    for ln in lines2:
        _draw_multiline(d, [ln], f2, W//2, y2, (*GOLD, 255), 0, shadow_a=240)
        y2 += h2_each + 10
    img.save(fname)


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
        # el subtítulo puede llevar hebreo+gematría largo → envolver a 2 renglones
        words = small.split(); slines = []; cur = ""
        for w in words:
            t = (cur+" "+w).strip()
            if d.textbbox((0,0), t, font=sfont)[2] < W-90: cur = t
            else: slines.append(cur); cur = w
        if cur: slines.append(cur)
        while max(d.textbbox((0,0), ln, font=sfont)[2] for ln in slines) > W-80 and sfont.size > 24:
            sfont = ImageFont.truetype(FONT_SMALL, sfont.size-2)
        yy = yend+14
        for ln in slines:
            _draw_multiline(d, [ln], sfont, W//2, yy, (*GOLD_SOFT, 235), 0, shadow_a=235)
            yy += sfont.size + 10
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


# ── 6. Subtítulos por frase ─────────────────────────────────────────────────
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


# ── 7. CIERRE FINAL: «Comparte y difunde la luz de Dios» sobre el end-card ──
def find_cierre_start(palabras):
    for p in palabras:
        if norm(p["w"]).startswith(CIERRE_MARK):
            return p["start"]
    return None


def bake_cierre_endcard(out_png):
    from jashmal_endcard import ENDCARD_ES, _fit_endcard
    if not os.path.exists(ENDCARD_ES):
        raise FileNotFoundError(f"No encontré la portada de marca: {ENDCARD_ES}")
    fitted = f"{TMP}/endcard_fit.png"
    _fit_endcard(ENDCARD_ES, W, H, fitted)

    im = Image.open(fitted).convert("RGB")
    d = ImageDraw.Draw(im, "RGBA")
    fsize = 62
    font = ImageFont.truetype(FONT_TITLE, fsize)
    words = CIERRE_TEXT.split(); lines = []; cur = ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textbbox((0, 0), t, font=font)[2] < W - 170: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    line_h = fsize + 20
    block = len(lines) * line_h
    top = int(H * 0.805) - block // 2
    y = top
    for ln in lines:
        bb = d.textbbox((0, 0), ln, font=font); tw = bb[2] - bb[0]
        x = (W - tw) // 2 - bb[0]
        for ox, oy in [(-3, 3), (3, 3), (0, 4), (3, -1), (-3, -1), (0, 0)]:
            d.text((x + ox, y + oy), ln, font=font, fill=(*SHADOW, 240))
        d.text((x, y), ln, font=font, fill=(*GOLD, 255))
        y += line_h
    im.save(out_png, quality=95)
    return out_png


def append_cierre_endcard(silent_video, cierre_png, out_path, hold=3.5, trans=0.7):
    out = subprocess.check_output(
        ["ffprobe", "-v", "error", "-select_streams", "v:0",
         "-show_entries", "stream=width,height,r_frame_rate",
         "-show_entries", "format=duration", "-of", "json", silent_video]).decode()
    info = json.loads(out)
    st = info["streams"][0]
    vw, vh = int(st["width"]), int(st["height"])
    num, den = st["r_frame_rate"].split("/")
    fps_i = round(float(num) / float(den))
    vdur = float(info["format"]["duration"])

    offset = max(0.0, vdur - trans)
    outro_len = hold + trans
    fade_out_st = outro_len - trans
    fc = (
        f"[0:v]fps={fps_i},scale={vw}:{vh},setsar=1,format=yuv420p[v0];"
        f"[1:v]fps={fps_i},scale={vw}:{vh},setsar=1,format=yuv420p,"
        f"fade=t=out:st={fade_out_st}:d={trans}[v1];"
        f"[v0][v1]xfade=transition=fadeblack:duration={trans}:offset={offset}[vout]"
    )
    cmd = ["ffmpeg", "-y", "-i", silent_video,
           "-loop", "1", "-t", f"{outro_len}", "-i", cierre_png,
           "-filter_complex", fc, "-map", "[vout]", "-an",
           "-c:v", "libx264", "-profile:v", "high", "-pix_fmt", "yuv420p",
           "-crf", "18", "-preset", "medium", out_path]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ end-card + cierre:"); print(r.stderr[-1200:]); sys.exit(1)
    return out_path, vdur + hold


# ── MAIN ─────────────────────────────────────────────────────────────────────
def main():
    solo_voz = "--voz" in sys.argv or "--voice" in sys.argv

    mp3, palabras, dur = generar_voz()

    cierre_start = find_cierre_start(palabras)
    if cierre_start is None:
        print("❌ No ubiqué el cierre («Comparte…») en la voz."); sys.exit(1)
    body_end = cierre_start
    print(f"✂️  Cuerpo (planos): 0 → {body_end:.2f}s · "
          f"Cierre (end-card): {cierre_start:.2f} → {dur:.2f}s "
          f"({dur - cierre_start:.1f}s de voz «{CIERRE_TEXT}»)")

    segs = mapear_tiempos(palabras, body_end)

    if solo_voz:
        print(f"\n✅ VOZ GENERADA — {dur:.2f}s total "
              f"(cuerpo {body_end:.2f}s + cierre {dur - cierre_start:.2f}s).")
        print(f"   (--voz) No se renderiza el video todavía.")
        print(f"   Cuando 1.png … 8.png estén en {IMG_DIR}, corre:")
        print("   python3 scripts/ropas-de-luz-video.py")
        return

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
        print(f"   ✅ plano {i:2d} ({d:4.1f}s)  {s['img']}  /{s['kb']}")

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

    hook_png = f"{TMP}/hook.png"
    png_hook(hook_png)
    overlays.append((hook_png, 0.0, HOOK_END))

    for i, s in enumerate(segs, 1):
        st0 = s.get("title_start_at", s["_start"] + 0.20)
        if s["title"]:
            fn = f"{TMP}/title_{i}.png"
            png_title(s["title"], s["title_color"], s["small"], fn)
            overlays.append((fn, st0, s["_end"]-0.10))
        elif s.get("small"):
            fn = f"{TMP}/small_{i}.png"
            png_title(" ", s["title_color"], s["small"], fn)
            overlays.append((fn, max(st0, s["_start"]+0.30), s["_end"]-0.10))

    body_palabras = [p for p in palabras if p["start"] < cierre_start - 0.05]
    frases = frases_de_palabras(body_palabras)
    for j, fr in enumerate(frases):
        fn = f"{TMP}/sub_{j}.png"
        png_sub(fr["txt"], fn)
        overlays.append((fn, fr["start"], fr["end"]+0.12))

    BATCH = 12
    n_lotes = (len(overlays) + BATCH - 1) // BATCH
    print(f"🎬 Componiendo {len(overlays)} overlays en {n_lotes} lotes (≤{BATCH}/pasada)…")

    current = base_video
    lotes_out = []
    for b in range(n_lotes):
        chunk = overlays[b*BATCH:(b+1)*BATCH]
        inputs = ["-i", current]
        for (fn, st, en) in chunk:
            inputs += ["-loop", "1", "-t", f"{en + 0.10:.3f}", "-i", fn]

        fc = ""
        prev = "0:v"
        for k, (fn, st, en) in enumerate(chunk):
            idx = k + 1
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

    print("🪧 Componiendo el end-card de marca + cierre…")
    cierre_png = f"{TMP}/endcard_cierre.png"
    bake_cierre_endcard(cierre_png)
    combined = f"{TMP}/combined.mp4"
    append_cierre_endcard(current, cierre_png, combined)

    print("🎧 Muxeando la voz completa (cuerpo + cierre)…")
    cmd = ["ffmpeg", "-y", "-i", combined, "-i", mp3,
           "-filter_complex", "[1:a]apad[a]",
           "-map", "0:v", "-map", "[a]",
           "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest",
           "-movflags", "+faststart", SALIDA]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("❌ mux audio:"); print(r.stderr[-1200:]); sys.exit(1)

    for f in lotes_out:
        try: os.remove(f)
        except OSError: pass

    pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                         "format=duration", "-of", "csv=p=0", SALIDA],
                        capture_output=True, text=True)
    print(f"\n🎉 MP4 FINAL: {SALIDA}")
    print(f"   duración FINAL real: {pr.stdout.strip()}s "
          f"(cuerpo {body_end:.1f}s + cierre/end-card)")


if __name__ == "__main__":
    main()
