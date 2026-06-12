#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · "El Misterio del Alef" — reel vertical 1080×1920
═══════════════════════════════════════════════════════════════════════════
  Patrón: idéntico a najash-video.py (PIL + ffmpeg, fuente FrankRuhlLibre).
  Diferencia: NO hay imágenes externas — todas las escenas se generan
  PROGRAMÁTICAMENTE con PIL (fondo oscuro, letras doradas, partículas).

  La VOZ debe generarse primero con scripts/alef-voz.py.

  Escenas:
    1. GANCHO     — "El silencio tiene una forma" + Alef grande dorada
    2. FORMA      — Yud arriba · Vav diagonal · Yud abajo + ecuación 26
    3. NUMERO     — Valor 1 visible + milui 111 revelándose
    4. MILUI      — El nombre completo alef-lamed-peh = 111
    5. CONEXIONES — Palabras del Alef (Anoji, Ejad, Or, Emet, Ahava, Ehye)
    6. CIERRE     — Alef sola, respira. "Todo comenzó en silencio."

  Uso:
    python3 scripts/alef-video.py              # render completo
    python3 scripts/alef-video.py --test-labels  # solo hoja de verificacion
═══════════════════════════════════════════════════════════════════════════
"""
import json, math, os, random, subprocess, sys, re, unicodedata
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H, FPS = 1080, 1920, 30

SRC_DIR = os.path.expanduser("~/Desktop/jashmal-videos/Alef")
MP3     = os.path.join(SRC_DIR, "alef_voz.mp3")
TIMING  = os.path.join(SRC_DIR, "alef_voz_timing.json")
SALIDA  = os.path.expanduser("~/Desktop/ALEF_REEL.mp4")
TMP     = "/tmp/alef_render"
os.makedirs(TMP, exist_ok=True)
os.makedirs(SRC_DIR, exist_ok=True)

# ── Fuentes ────────────────────────────────────────────────────────────────
FONT_HEB   = "/Users/mardan/workspace/jashmal/scripts/fonts/FrankRuhlLibre.ttf"
FONT_TITLE = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
FONT_SUB   = "/System/Library/Fonts/Supplemental/Georgia.ttf"
FONT_SMALL = "/System/Library/Fonts/Supplemental/Georgia Italic.ttf"

# ── Paleta ─────────────────────────────────────────────────────────────────
BG        = (5, 5, 10)         # negro profundo #05050a
GOLD      = (232, 200, 102)    # dorado principal
GOLD_SOFT = (245, 238, 210)    # dorado suave (subtítulos)
GOLD_DIM  = (160, 130, 60)     # dorado tenue (detalles)
SHADOW    = (5, 4, 2)
WHITE     = (248, 245, 238)    # crema blanco

# ── Semilla para que las partículas sean reproducibles ───────────────────
random.seed(137)

# ─────────────────────────────────────────────────────────────────────────
#  GENERACIÓN PROGRAMÁTICA DE IMÁGENES DE FONDO (PIL)
# ─────────────────────────────────────────────────────────────────────────

def _glow_layer(img, cx, cy, r_inner, r_outer, color, alpha_max=90):
    """Añade un halo radial suave centrado en cx,cy."""
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    steps = 24
    for i in range(steps, 0, -1):
        r = int(r_inner + (r_outer - r_inner) * (1 - i / steps))
        alpha = int(alpha_max * (i / steps) ** 2)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r],
                     fill=(*color, alpha))
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def _scatter_particles(draw, n, color, size_range=(1, 3), alpha_range=(30, 140)):
    """Dibuja n partículas dispersas sobre el lienzo."""
    for _ in range(n):
        x  = random.randint(0, W)
        y  = random.randint(0, H)
        sz = random.randint(*size_range)
        al = random.randint(*alpha_range)
        draw.ellipse([x - sz, y - sz, x + sz, y + sz], fill=(*color, al))


def _draw_alef(draw, font_size, cx, cy, color, alpha=255, glow=False):
    """Dibuja el Alef centrado en cx,cy. Devuelve (x, y, w, h)."""
    font = ImageFont.truetype(FONT_HEB, font_size)
    bb   = draw.textbbox((0, 0), "א", font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    x = cx - tw // 2 - bb[0]
    y = cy - th // 2 - bb[1]
    # sombra difusa
    for dx, dy in [(-4, 4), (4, 4), (0, 6), (4, -2), (-4, -2)]:
        draw.text((x + dx, y + dy), "א", font=font, fill=(*SHADOW, 180))
    draw.text((x, y), "א", font=font, fill=(*color, alpha),
              direction="rtl", language="he")
    return x + bb[0], y + bb[1], tw, th


def _hline(draw, y, color=(232, 200, 102), alpha=60, width=1):
    draw.line([(0, y), (W, y)], fill=(*color, alpha), width=width)


def gen_gancho():
    """Escena 1: Alef grande centrada sobre oscuridad total con halos."""
    img  = Image.new("RGBA", (W, H), (*BG, 255))

    # Halo externo
    img = _glow_layer(img, W // 2, H // 2, 180, 620, GOLD, alpha_max=55)
    img = _glow_layer(img, W // 2, H // 2, 80, 280, GOLD, alpha_max=80)

    draw = ImageDraw.Draw(img)
    _scatter_particles(draw, 120, GOLD, size_range=(1, 2), alpha_range=(20, 80))

    # Alef central grande
    font_size = 680
    font = ImageFont.truetype(FONT_HEB, font_size)
    bb   = draw.textbbox((0, 0), "א", font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    x = W // 2 - tw // 2 - bb[0]
    y = H // 2 - th // 2 - bb[1] - 80  # ligeramente arriba del centro
    # sombra múltiple para profundidad
    for dx, dy in [(-6, 6), (6, 6), (0, 9), (5, -3), (-5, -3), (0, 0)]:
        draw.text((x + dx, y + dy), "א", font=font,
                  fill=(*SHADOW, 200), direction="rtl", language="he")
    draw.text((x, y), "א", font=font, fill=(*GOLD, 255),
              direction="rtl", language="he")

    # Línea superior: texto título
    tfont = ImageFont.truetype(FONT_TITLE, 58)
    title = "EL MISTERIO DEL ALEF"
    tbb   = draw.textbbox((0, 0), title, font=tfont)
    tx    = (W - (tbb[2] - tbb[0])) // 2 - tbb[0]
    draw.text((tx, 130), title, font=tfont, fill=(*GOLD_SOFT, 220))

    # Línea fina decorativa
    _hline(draw, 200, GOLD, alpha=80, width=1)

    out = os.path.join(TMP, "bg_gancho.png")
    img.convert("RGB").save(out, quality=95)
    return out


def gen_forma():
    """Escena 2: Alef con los tres trazos identificados (Yud·Vav·Yud)."""
    img  = Image.new("RGBA", (W, H), (*BG, 255))
    img  = _glow_layer(img, W // 2, H // 2, 100, 500, GOLD, alpha_max=40)
    draw = ImageDraw.Draw(img)
    _scatter_particles(draw, 80, GOLD, size_range=(1, 2), alpha_range=(15, 60))

    font_size = 520
    font = ImageFont.truetype(FONT_HEB, font_size)
    bb   = draw.textbbox((0, 0), "א", font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    cx = W // 2
    cy = H // 2 + 60
    x  = cx - tw // 2 - bb[0]
    y  = cy - th // 2 - bb[1]

    # Alef en dorado tenue (base)
    for dx, dy in [(-4, 4), (4, 4), (0, 6)]:
        draw.text((x + dx, y + dy), "א", font=font,
                  fill=(*SHADOW, 180), direction="rtl", language="he")
    draw.text((x, y), "א", font=font, fill=(*GOLD_DIM, 200),
              direction="rtl", language="he")

    # Etiquetas de los tres elementos
    lf = ImageFont.truetype(FONT_HEB, 70)
    vf = ImageFont.truetype(FONT_SMALL, 44)

    # Yud arriba (derecha-arriba en hebreo visual)
    yud_x = cx + int(tw * 0.28)
    yud_y = cy - int(th * 0.34)
    draw.text((yud_x - 20, yud_y - 70), "י", font=lf,
              fill=(*GOLD, 255), direction="rtl", language="he")
    draw.text((yud_x + 50, yud_y - 56), "= 10", font=vf,
              fill=(*GOLD_SOFT, 200))
    # línea conectora punteada
    for k in range(0, 6):
        px = int(yud_x + 10 + k * 8)
        py = int(yud_y - 10 + k * 12)
        draw.ellipse([px - 2, py - 2, px + 2, py + 2], fill=(*GOLD, 80))

    # Vav (centro diagonal)
    vav_x = cx - int(tw * 0.04)
    vav_y = cy - int(th * 0.02)
    draw.text((vav_x - 90, vav_y - 30), "ו", font=lf,
              fill=(*GOLD, 255), direction="rtl", language="he")
    draw.text((vav_x - 155, vav_y + 36), "= 6", font=vf,
              fill=(*GOLD_SOFT, 200))

    # Yud abajo (izquierda-abajo en hebreo visual)
    yudb_x = cx - int(tw * 0.26)
    yudb_y = cy + int(th * 0.32)
    draw.text((yudb_x - 60, yudb_y + 30), "י", font=lf,
              fill=(*GOLD, 255), direction="rtl", language="he")
    draw.text((yudb_x + 28, yudb_y + 44), "= 10", font=vf,
              fill=(*GOLD_SOFT, 200))

    # Ecuación abajo
    ef  = ImageFont.truetype(FONT_TITLE, 52)
    eq  = "10 + 6 + 10 = 26"
    ebb = draw.textbbox((0, 0), eq, font=ef)
    ex  = (W - (ebb[2] - ebb[0])) // 2 - ebb[0]
    draw.text((ex, H - 340), eq, font=ef, fill=(*GOLD_SOFT, 230))
    # Segunda línea: = YHVH
    hf2  = ImageFont.truetype(FONT_HEB, 68)
    heb  = "יהוה"
    hbb  = draw.textbbox((0, 0), heb, font=hf2)
    hx   = (W - (hbb[2] - hbb[0])) // 2 - hbb[0]
    draw.text((hx, H - 270), heb, font=hf2, fill=(*GOLD, 255),
              direction="rtl", language="he")

    out = os.path.join(TMP, "bg_forma.png")
    img.convert("RGB").save(out, quality=95)
    return out


def gen_numero():
    """Escena 3: Valor 1 grande + milui 111 revelado."""
    img  = Image.new("RGBA", (W, H), (*BG, 255))
    img  = _glow_layer(img, W // 2, H // 2 - 100, 60, 400, GOLD, alpha_max=50)
    draw = ImageDraw.Draw(img)
    _scatter_particles(draw, 60, GOLD, size_range=(1, 2), alpha_range=(15, 50))

    # Alef pequeña tenue arriba
    af = ImageFont.truetype(FONT_HEB, 160)
    ab = draw.textbbox((0, 0), "א", font=af)
    ax = W // 2 - (ab[2] - ab[0]) // 2 - ab[0]
    ay = 280 - (ab[3] - ab[1]) // 2 - ab[1]
    draw.text((ax, ay), "א", font=af, fill=(*GOLD_DIM, 160),
              direction="rtl", language="he")

    # Valor 1 — grande y central
    nf  = ImageFont.truetype(FONT_TITLE, 260)
    nb  = draw.textbbox((0, 0), "1", font=nf)
    nx  = W // 2 - (nb[2] - nb[0]) // 2 - nb[0]
    ny  = H // 2 - (nb[3] - nb[1]) // 2 - nb[1] - 120
    for dx, dy in [(-5, 5), (5, 5), (0, 8)]:
        draw.text((nx + dx, ny + dy), "1", font=nf, fill=(*SHADOW, 200))
    draw.text((nx, ny), "1", font=nf, fill=(*GOLD, 255))

    # Label
    lf   = ImageFont.truetype(FONT_SUB, 52)
    lab  = "valor del Alef"
    lbb  = draw.textbbox((0, 0), lab, font=lf)
    lx   = (W - (lbb[2] - lbb[0])) // 2 - lbb[0]
    draw.text((lx, ny + (nb[3] - nb[1]) + 20), lab, font=lf,
              fill=(*GOLD_SOFT, 180))

    # Separador
    _hline(draw, H // 2 + 200, GOLD, alpha=70, width=1)

    # Milui: alef-lamed-peh = 111
    hf  = ImageFont.truetype(FONT_HEB, 88)
    alp = "א  +  ל  +  פ"
    hbb = draw.textbbox((0, 0), alp, font=hf)
    hx  = (W - (hbb[2] - hbb[0])) // 2 - hbb[0]
    draw.text((hx, H // 2 + 240), alp, font=hf, fill=(*GOLD, 240),
              direction="rtl", language="he")

    ef  = ImageFont.truetype(FONT_TITLE, 72)
    eq  = "1 + 30 + 80 = 111"
    ebb = draw.textbbox((0, 0), eq, font=ef)
    ex  = (W - (ebb[2] - ebb[0])) // 2 - ebb[0]
    draw.text((ex, H // 2 + 360), eq, font=ef, fill=(*GOLD_SOFT, 230))

    out = os.path.join(TMP, "bg_numero.png")
    img.convert("RGB").save(out, quality=95)
    return out


def gen_milui():
    """Escena 4: El nombre completo del Alef irradiando chispas."""
    img  = Image.new("RGBA", (W, H), (*BG, 255))
    # Halos múltiples de distintos radios para efecto de irradiación
    for r_in, r_out, am in [(40, 200, 90), (200, 500, 55), (500, 800, 25)]:
        img = _glow_layer(img, W // 2, H // 2, r_in, r_out, GOLD, alpha_max=am)
    draw = ImageDraw.Draw(img)

    # Partículas densas (chispas)
    _scatter_particles(draw, 200, GOLD, size_range=(1, 3), alpha_range=(30, 120))
    # Unas pocas más grandes
    _scatter_particles(draw, 20, GOLD_SOFT, size_range=(2, 5), alpha_range=(50, 180))

    # Nombre completo: alef-lamed-peh grande y centrado
    hf  = ImageFont.truetype(FONT_HEB, 220)
    alp = "אלף"
    hbb = draw.textbbox((0, 0), alp, font=hf)
    hx  = (W - (hbb[2] - hbb[0])) // 2 - hbb[0]
    hy  = H // 2 - (hbb[3] - hbb[1]) // 2 - hbb[1] - 80

    # Sombra brillante (efecto de luz propia)
    for dx, dy in [(-4, 4), (4, 4), (0, 6), (0, 0)]:
        draw.text((hx + dx, hy + dy), alp, font=hf,
                  fill=(*SHADOW, 210), direction="rtl", language="he")
    draw.text((hx, hy), alp, font=hf, fill=(*GOLD, 255),
              direction="rtl", language="he")

    # Transliteración
    tf  = ImageFont.truetype(FONT_SMALL, 60)
    tr  = "Alef"
    tbb = draw.textbbox((0, 0), tr, font=tf)
    tx  = (W - (tbb[2] - tbb[0])) // 2 - tbb[0]
    draw.text((tx, hy + (hbb[3] - hbb[1]) + 30), tr, font=tf,
              fill=(*GOLD_SOFT, 200))

    # Los valores de cada letra
    vf  = ImageFont.truetype(FONT_TITLE, 52)
    vals = [("א", "1", W // 2 + 140), ("ל", "30", W // 2 + 0), ("פ", "80", W // 2 - 140)]
    for let, val, vx in vals:
        vhf = ImageFont.truetype(FONT_HEB, 56)
        draw.text((vx - 14, H // 2 + 200), let, font=vhf,
                  fill=(*GOLD, 220), direction="rtl", language="he")
        draw.text((vx - 10, H // 2 + 264), val, font=vf,
                  fill=(*GOLD_SOFT, 180))

    eq  = "= 111"
    ebb = draw.textbbox((0, 0), eq, font=ImageFont.truetype(FONT_TITLE, 80))
    ex  = (W - (ebb[2] - ebb[0])) // 2 - ebb[0]
    draw.text((ex, H // 2 + 340), eq, font=ImageFont.truetype(FONT_TITLE, 80),
              fill=(*GOLD, 255))

    # Subtexto sobre el 111
    sf  = ImageFont.truetype(FONT_SUB, 44)
    sub = "El uno que se multiplica sin perderse"
    sbb = draw.textbbox((0, 0), sub, font=sf)
    sx  = (W - (sbb[2] - sbb[0])) // 2 - sbb[0]
    draw.text((sx, H // 2 + 460), sub, font=sf, fill=(*GOLD_SOFT, 160))

    out = os.path.join(TMP, "bg_milui.png")
    img.convert("RGB").save(out, quality=95)
    return out


def gen_conexiones():
    """Escena 5: Palabras que nacen del Alef — lista vertical estética."""
    img  = Image.new("RGBA", (W, H), (*BG, 255))
    img  = _glow_layer(img, W // 2, 420, 60, 360, GOLD, alpha_max=50)
    draw = ImageDraw.Draw(img)
    _scatter_particles(draw, 90, GOLD, size_range=(1, 2), alpha_range=(15, 60))

    # Alef central en la parte superior
    af  = ImageFont.truetype(FONT_HEB, 200)
    abb = draw.textbbox((0, 0), "א", font=af)
    ax  = W // 2 - (abb[2] - abb[0]) // 2 - abb[0]
    ay  = 160 - (abb[3] - abb[1]) // 2 - abb[1]
    draw.text((ax, ay), "א", font=af, fill=(*GOLD, 255),
              direction="rtl", language="he")

    # Separador
    _hline(draw, 430, GOLD, alpha=100, width=1)

    # Lista de palabras: (hebreo, transliteración, significado)
    palabras = [
        ("אָנֹכִי", "Anojí",  "Yo soy"),
        ("אֶחָד",   "Ejad",   "Uno"),
        ("אוֹר",    "Or",     "Luz"),
        ("אֱמֶת",   "Emet",   "Verdad"),
        ("אַהֲבָה", "Ahavá",  "Amor"),
        ("אֶהְיֶה", "Ehyé",   "Seré"),
    ]

    hf  = ImageFont.truetype(FONT_HEB, 72)
    tf  = ImageFont.truetype(FONT_SMALL, 38)
    mf  = ImageFont.truetype(FONT_SUB,  36)

    start_y = 490
    row_h   = 230

    for i, (heb, trans, meaning) in enumerate(palabras):
        ry  = start_y + i * row_h

        # Línea divisoria tenue entre filas (excepto primera)
        if i > 0:
            _hline(draw, ry - 18, GOLD_DIM, alpha=35, width=1)

        # Hebreo a la derecha (RTL)
        hbb = draw.textbbox((0, 0), heb, font=hf)
        hx  = W - 80 - (hbb[2] - hbb[0]) - hbb[0]
        draw.text((hx, ry), heb, font=hf, fill=(*GOLD, 230),
                  direction="rtl", language="he")

        # Transliteración centrada
        tbb = draw.textbbox((0, 0), trans, font=tf)
        tx  = (W - (tbb[2] - tbb[0])) // 2 - tbb[0]
        draw.text((tx, ry + 12), trans, font=tf, fill=(*GOLD_SOFT, 180))

        # Significado a la izquierda
        draw.text((80, ry + 12), meaning, font=mf, fill=(*WHITE, 150))

    out = os.path.join(TMP, "bg_conexiones.png")
    img.convert("RGB").save(out, quality=95)
    return out


def gen_cierre():
    """Escena 6: Alef sola, respira, con brand Jashmal abajo."""
    img  = Image.new("RGBA", (W, H), (*BG, 255))
    # Halo más suave, como si respirara
    for r_in, r_out, am in [(100, 350, 70), (350, 700, 35)]:
        img = _glow_layer(img, W // 2, H // 2 - 80, r_in, r_out, GOLD, alpha_max=am)
    draw = ImageDraw.Draw(img)
    _scatter_particles(draw, 100, GOLD, size_range=(1, 2), alpha_range=(20, 70))

    # Alef grande centrada
    font_size = 600
    font = ImageFont.truetype(FONT_HEB, font_size)
    bb   = draw.textbbox((0, 0), "א", font=font)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    x = W // 2 - tw // 2 - bb[0]
    y = H // 2 - th // 2 - bb[1] - 100
    for dx, dy in [(-5, 5), (5, 5), (0, 8), (0, 0)]:
        draw.text((x + dx, y + dy), "א", font=font,
                  fill=(*SHADOW, 200), direction="rtl", language="he")
    draw.text((x, y), "א", font=font, fill=(*GOLD, 255),
              direction="rtl", language="he")

    # Texto final
    cf  = ImageFont.truetype(FONT_TITLE, 50)
    cl  = "Todo comenzó en silencio."
    cbb = draw.textbbox((0, 0), cl, font=cf)
    cx  = (W - (cbb[2] - cbb[0])) // 2 - cbb[0]
    draw.text((cx, H - 380), cl, font=cf, fill=(*GOLD_SOFT, 210))

    out = os.path.join(TMP, "bg_cierre.png")
    img.convert("RGB").save(out, quality=95)
    return out


# ─────────────────────────────────────────────────────────────────────────
#  BEATS
# ─────────────────────────────────────────────────────────────────────────
# marker: primeras palabras significativas de la narración para sincronizar.
# Las imágenes se generan al vuelo con las funciones gen_*() arriba.
SEGMENTS = [
    {   # 1 — GANCHO
        "name": "gancho", "marker": "el silencio tiene",
        "type": "kb", "gen": gen_gancho, "kb": "in_strong",
        "fin": 0.50, "fout": 0.35,
        "heb": ["א"], "small": None,
    },
    {   # 2 — FORMA (Yud·Vav·Yud = 26)
        "name": "forma", "marker": "es tres letras",
        "type": "kb", "gen": gen_forma, "kb": "in",
        "fin": 0.35, "fout": 0.35,
        "heb": ["י + ו + י = 26"], "small": None,
    },
    {   # 3 — NUMERO (valor 1 + milui 111)
        "name": "numero", "marker": "su valor es uno",
        "type": "kb", "gen": gen_numero, "kb": "up",
        "fin": 0.35, "fout": 0.35,
        "heb": [], "small": None,
    },
    {   # 4 — MILUI (nombre completo alef-lamed-peh)
        "name": "milui", "marker": "su nombre completo",
        "type": "kb", "gen": gen_milui, "kb": "in",
        "fin": 0.35, "fout": 0.35,
        "heb": ["אלף = 111"], "small": None,
    },
    {   # 5 — CONEXIONES (palabras del Alef)
        "name": "conexiones", "marker": "del alef nacen",
        "type": "kb", "gen": gen_conexiones, "kb": "down",
        "fin": 0.40, "fout": 0.40,
        "heb": [], "small": None,
    },
    {   # 6 — CIERRE
        "name": "cierre", "marker": "todo comenzo en silencio",
        "type": "kb", "gen": gen_cierre, "kb": "out",
        "fin": 0.50, "fout": 0.70,
        "heb": [], "small": "jashmal.org/alef", "brand": True,
    },
]


# ─────────────────────────────────────────────────────────────────────────
#  TEXTO: normalización y búsqueda de marcadores
# ─────────────────────────────────────────────────────────────────────────
def norm(s):
    s = s.lower()
    s = "".join(c for c in unicodedata.normalize("NFD", s)
                if unicodedata.category(c) != "Mn")
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]", " ", s)).strip()


# ─────────────────────────────────────────────────────────────────────────
#  RÓTULOS HEBREOS (mismo sistema que najash-video.py)
# ─────────────────────────────────────────────────────────────────────────
def _text_strip(text, font, color, direction, shadow=True):
    lang = "he" if direction == "rtl" else None
    tmp  = Image.new("RGBA", (10, 10)); dt = ImageDraw.Draw(tmp)
    bb   = dt.textbbox((0, 0), text, font=font, direction=direction, language=lang)
    tw, th = bb[2] - bb[0], bb[3] - bb[1]
    pad = 12
    img = Image.new("RGBA", (tw + pad * 2, th + pad * 2), (0, 0, 0, 0))
    d   = ImageDraw.Draw(img)
    ox0, oy0 = pad - bb[0], pad - bb[1]
    if shadow:
        for dx, dy in [(-3, 3), (3, 3), (0, 4), (3, -1), (-3, -1), (0, 0), (2, 2)]:
            d.text((ox0 + dx, oy0 + dy), text, font=font, fill=(*SHADOW, 235),
                   direction=direction, language=lang)
    d.text((ox0, oy0), text, font=font, fill=(*color, 255),
           direction=direction, language=lang)
    return img


def _compose_line(strips, direction, gap):
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
    rows     = []
    heb_font = ImageFont.truetype(FONT_HEB, 96)
    heb_sm   = ImageFont.truetype(FONT_HEB, 76)
    sub_font = ImageFont.truetype(FONT_SMALL, 44)
    brand_hb = ImageFont.truetype(FONT_HEB, 56)
    brand_lt = ImageFont.truetype(FONT_SUB, 48)

    for ln in seg.get("heb", []):
        f = heb_sm if len(seg["heb"]) > 1 else heb_font
        rows.append(_text_strip(ln, f, GOLD, "rtl"))

    if seg.get("small"):
        rows.append(_text_strip(seg["small"], sub_font, GOLD_SOFT, "ltr"))

    if seg.get("brand"):
        bh = _text_strip("חַשְׁמַל", brand_hb, GOLD, "rtl")
        bl = _text_strip(" · jashmal.org", brand_lt, GOLD, "ltr")
        rows.append(_compose_line([bh, bl], "ltr", gap=6))

    if not rows:
        return False

    img       = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    top       = 150
    gap_y     = 26
    brand_row = rows.pop() if seg.get("brand") else None

    for r in rows:
        x = (W - r.width) // 2
        img.alpha_composite(r, (x, top))
        top += r.height + gap_y

    if brand_row is not None:
        x     = (W - brand_row.width) // 2
        by    = H - 235
        pad_x, pad_y = 46, 22
        pill  = Image.new("RGBA", (brand_row.width + pad_x * 2,
                                   brand_row.height + pad_y * 2), (0, 0, 0, 0))
        ImageDraw.Draw(pill).rounded_rectangle(
            [0, 0, pill.width - 1, pill.height - 1],
            radius=pill.height // 2, fill=(6, 5, 3, 170))
        img.alpha_composite(pill, (x - pad_x, by - pad_y))
        img.alpha_composite(brand_row, (x, by))

    img.save(fname)
    return True


# ─────────────────────────────────────────────────────────────────────────
#  SUBTÍTULOS (español, sincronizados al timing)
# ─────────────────────────────────────────────────────────────────────────
def png_sub(text, fname):
    img  = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d    = ImageDraw.Draw(img)
    txt  = text.upper()
    font = ImageFont.truetype(FONT_TITLE, 50)
    words = txt.split(); lines = []; cur = ""
    for w in words:
        t = (cur + " " + w).strip()
        if d.textbbox((0, 0), t, font=font)[2] < W - 120: cur = t
        else: lines.append(cur); cur = w
    if cur: lines.append(cur)
    line_h  = 62
    block_h = len(lines) * line_h
    top     = H - 300 - block_h
    pad     = 26
    d.rectangle([40, top - pad, W - 40, top + block_h + pad - 10],
                fill=(6, 5, 3, 120))
    y = top
    for ln in lines:
        bb = d.textbbox((0, 0), ln, font=font); tw = bb[2] - bb[0]
        x  = (W - tw) // 2 - bb[0]
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
        frases.append({"txt": " ".join(buf), "start": fstart,
                       "end": palabras[-1]["end"]})
    return frases


# ─────────────────────────────────────────────────────────────────────────
#  VIDEO: cover-scale + Ken Burns con fades horneados
# ─────────────────────────────────────────────────────────────────────────
def prescale_cover(src, dst):
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
    if fin  > 0: f.append(f"fade=t=in:st=0:d={fin:.2f}")
    if fout > 0: f.append(f"fade=t=out:st={max(0.0, dur - fout):.3f}:d={fout:.2f}")
    return f


def ken_burns_clip(img_big, kb, dur, dst, fin, fout):
    frames = max(1, int(round(dur * FPS)))
    if   kb == "in":
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
    vf = (f"scale=1350:2400,"
          f"zoompan=z='{z}':x='{x}':y='{y}':d={frames}:s={W}x{H}:fps={FPS},"
          + ",".join(_fade_chain(dur, fin, fout) + ["format=yuv420p"]))
    cmd = ["ffmpeg", "-y", "-loop", "1", "-i", img_big, "-t", f"{dur:.3f}",
           "-vf", vf, "-r", str(FPS), "-an",
           "-c:v", "libx264", "-preset", "medium", "-crf", "18",
           "-pix_fmt", "yuv420p", dst]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print("ERROR zoompan:"); print(r.stderr[-700:]); sys.exit(1)
    return dst


# ─────────────────────────────────────────────────────────────────────────
#  MAPEADO DE BEATS al timing de la voz
# ─────────────────────────────────────────────────────────────────────────
def mapear(palabras, dur):
    seq = [norm(p["w"]) for p in palabras]

    def find(marker, after):
        mw = norm(marker).split(); n = len(mw)
        for i in range(after, len(seq) - n + 1):
            if seq[i:i + n] == mw: return i, palabras[i]["start"]
        for i in range(after, len(seq)):
            if seq[i] == mw[0]: return i, palabras[i]["start"]
        return None, None

    cursor = 0
    for s in SEGMENTS:
        idx, t = find(s["marker"], cursor)
        if idx is None:
            print(f"MARCADOR no hallado: '{s['marker']}'")
            # Fallback: distribuir uniformemente
            t = dur * SEGMENTS.index(s) / len(SEGMENTS)
            idx = cursor
        s["_start"] = s.get("start_override", t)
        cursor = idx + 1

    for i, s in enumerate(SEGMENTS):
        nxt = SEGMENTS[i + 1]["_start"] if i + 1 < len(SEGMENTS) else dur
        s["_end"] = s.get("end_override", nxt)

    SEGMENTS[0]["_start"] = 0.0

    print("Beats:")
    for i, s in enumerate(SEGMENTS, 1):
        print(f"  {i:2d}. {s['_start']:6.2f} -> {s['_end']:6.2f}"
              f"  ({s['_end'] - s['_start']:5.2f}s)  {s['name']}")


def test_labels():
    sheet_rows = [s for s in SEGMENTS if s.get("heb") or s.get("small")]
    if not sheet_rows:
        print("No hay rotulos para verificar."); return
    sheet = Image.new("RGB", (W, 300 * len(sheet_rows)), (12, 10, 18))
    y = 0
    for s in sheet_rows:
        fn = f"{TMP}/lbl_{s['name']}.png"
        if build_label(s, fn):
            lab  = Image.open(fn).convert("RGBA")
            crop = lab.crop((0, 120, W, 120 + 280))
            base = Image.new("RGBA", crop.size, (20, 16, 28, 255))
            sheet.paste(Image.alpha_composite(base, crop).convert("RGB"), (0, y))
            d = ImageDraw.Draw(sheet)
            d.text((20, y + 6), s["name"],
                   font=ImageFont.truetype(FONT_SUB, 24), fill=(120, 120, 130))
            y += 300
    out = f"{TMP}/labels_sheet.png"
    sheet.save(out)
    print("Hoja de rotulos:", out)


# ─────────────────────────────────────────────────────────────────────────
#  MAIN
# ─────────────────────────────────────────────────────────────────────────
def main():
    if not os.path.exists(MP3) or not os.path.exists(TIMING):
        print(f"Primero genera la voz: python3 scripts/alef-voz.py")
        print(f"  Esperando: {MP3}")
        print(f"           : {TIMING}")
        sys.exit(1)

    with open(TIMING) as f:
        T = json.load(f)
    palabras, dur = T["palabras"], T["dur"]
    print(f"Voz cargada: {dur:.2f}s, {len(palabras)} palabras")

    if "--test-labels" in sys.argv:
        mapear(palabras, dur); test_labels(); return

    mapear(palabras, dur)

    # ── Generar imágenes de fondo programáticas ──────────────────────────
    print("Generando fondos con PIL...")
    for s in SEGMENTS:
        bg_path = s["gen"]()
        s["_bg"] = bg_path
        print(f"  {s['name']:12s}  ->  {bg_path}")

    # ── Generar clips Ken Burns por beat ─────────────────────────────────
    print("Generando clips por beat...")
    clips = []
    for i, s in enumerate(SEGMENTS, 1):
        out = f"{TMP}/beat_{i}.mp4"
        d   = max(0.6, s["_end"] - s["_start"])
        big = f"{TMP}/cover_{i}.jpg"
        prescale_cover(s["_bg"], big)
        ken_burns_clip(big, s["kb"], d, out, s["fin"], s["fout"])
        print(f"  {i:2d} {s['name']:12s} KB/{s['kb']:9s} {d:5.2f}s")
        clips.append(out)

    # ── Concatenar clips ─────────────────────────────────────────────────
    concat = f"{TMP}/concat.txt"
    with open(concat, "w") as f:
        for c in clips: f.write(f"file '{c}'\n")
    base = f"{TMP}/base.mp4"
    r = subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0",
                        "-i", concat, "-c", "copy", base],
                       capture_output=True, text=True)
    if r.returncode != 0:
        print("ERROR concat:"); print(r.stderr[-700:]); sys.exit(1)

    # ── Overlays: rótulos + subtítulos ──────────────────────────────────
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
    print(f"{len(overlays)} overlays en {n_lotes} lotes (max {BATCH}/pasada)...")
    current = base; lotes = []

    for b in range(n_lotes):
        chunk  = overlays[b * BATCH:(b + 1) * BATCH]
        inputs = ["-i", current]
        for (fn, st, en) in chunk:
            inputs += ["-loop", "1", "-t", f"{en + 0.10:.3f}", "-i", fn]
        fc = ""; prev = "0:v"
        for k, (fn, st, en) in enumerate(chunk):
            idx  = k + 1
            fout = max(st, en - 0.25)
            fc += (f"[{idx}:v]format=rgba,"
                   f"fade=t=in:st={st:.2f}:d=0.25:alpha=1,"
                   f"fade=t=out:st={fout:.2f}:d=0.25:alpha=1[ov{k}];")
            nxt  = f"v{k}"
            fc  += (f"[{prev}][ov{k}]overlay=0:0:"
                    f"enable='between(t,{st:.2f},{en:.2f})'[{nxt}];")
            prev = nxt
        fc = fc.rstrip(";")
        out_b = f"{TMP}/base_b{b}.mp4"
        cmd   = (["ffmpeg", "-y"] + inputs
                 + ["-filter_complex", fc,
                    "-map", f"[{prev}]",
                    "-c:v", "libx264", "-preset", "fast", "-crf", "15",
                    "-pix_fmt", "yuv420p", "-r", str(FPS), out_b])
        print(f"  lote {b + 1}/{n_lotes}: {len(chunk)} overlays")
        r = subprocess.run(cmd, capture_output=True, text=True)
        if r.returncode != 0:
            print(f"ERROR lote {b + 1}:"); print(r.stderr[-1200:]); sys.exit(1)
        lotes.append(out_b); current = out_b

    # ── Mux voz ──────────────────────────────────────────────────────────
    print("Muxeando voz...")
    r = subprocess.run(["ffmpeg", "-y", "-i", current, "-i", MP3,
                        "-map", "0:v", "-map", "1:a",
                        "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                        "-shortest", SALIDA],
                       capture_output=True, text=True)
    if r.returncode != 0:
        print("ERROR mux:"); print(r.stderr[-1200:]); sys.exit(1)

    # Limpiar lotes intermedios
    for f in lotes:
        try: os.remove(f)
        except OSError: pass

    pr = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                         "format=duration", "-of", "csv=p=0", SALIDA],
                        capture_output=True, text=True)
    print(f"\nLISTO: {SALIDA}")
    print(f"  Duracion: {pr.stdout.strip()}s")

    # ── Beat final: portada de marca Jashmal ─────────────────────────────
    sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
    from jashmal_endcard import append_endcard
    append_endcard(SALIDA, lang="es")


if __name__ == "__main__":
    main()
