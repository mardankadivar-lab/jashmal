#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · EL GORAL — «La cara que no ves» · Reel vertical 9:16 (1080x1920, 30fps)

Reusa el motor de la Vav (vav_video.py) como reeh_video.py y eikev_video.py:
Ken Burns sobre imágenes fijas + fundidos + rótulos + subtítulos quemados
sincronizados a la voz de Martin + end-card oficial del portal.

IMÁGENES: las 9 que hizo Mardan con GPT (ver PROMPTS_GPT.txt) -> d1..d9,
en img/. Llegan a 941x1672 = 0,5628 de proporción; 1080/1920 = 0,5625.
La diferencia es del 0,05 %, así que el COVER no recorta nada visible
(0,5 px por lado). No hace falta lámina con bandas: PAD_LAMINA = False.
Las alternativas descartadas viven en img/alternativas/ y los originales
de ChatGPT en img/originales/. NO SE BORRAN.

════════════════════════════════════════════════════════════════════════
LO QUE ESTE MONTAJE HACE Y EL MOTOR DE LA VAV NO HACÍA
════════════════════════════════════════════════════════════════════════
El motor base funde SIEMPRE entre planos y no sabe de silencios. Esta
pieza necesita cuatro cosas que no existían, así que `compose` está
reescrito aquí (V.compose se sustituye al final del módulo):

1. FUNDIDO POR FRONTERA, no global.
   XF_AT da la duración del fundido de cada corte. El de d5 -> d6 vale
   0.0: es CORTE SECO. Es el volteo del dado; un fundido lo ablanda y
   se pierde el golpe.

2. EL SILENCIO DE 1,5 s (regla 5 de tono).
   La voz sale de ElevenLabs de un solo golpe, sin huecos. Aquí se
   PARTE el mp3 al final de T6, se le inyecta 1,5 s de silencio y se
   desplazan +1,5 s todos los tiempos posteriores (palabras incluidas,
   para que los subtítulos no se desincronicen). En el hueco hay un
   plano negro de verdad, sin scrim, sin rótulo y sin subtítulo.

3. LAS LETRAS QUE SE REORDENAN EN PANTALLA.
   Es la condición que puso el Sofer para que el jidush sea honesto
   (trampas 2 y 14): si la animación hiciera aparecer דוד de golpe,
   la imagen mentiría aunque la voz no. Aquí la ו VIAJA del extremo al
   centro mientras Martin dice «reordenadas», y el movimiento se ve.
   Las posiciones se anclan a las tres caras vacías de d7, por eso ese
   plano va SIN Ken Burns (z0 = z1 = 1.0, pan 0): si la imagen se
   moviera, las letras no quedarían clavadas en las caras.

4. EL RÓTULO DE ESQUINA «LECTURA PROPIA · Mardan Kadivar».
   Entra en T5 y sale con T8. Es un rótulo distinto de los centrados
   (arriba del todo, chico, dorado) para que pueda convivir con ellos
   sin taparlos. Si este rótulo falta, la pieza NO SE PUBLICA.

════════════════════════════════════════════════════════════════════════
ORDEN DE LAS LETRAS HEBREAS — decisión de diseño, leer antes de tocar
════════════════════════════════════════════════════════════════════════
El hebreo se lee de derecha a izquierda; los dados de d4 están en fila
de izquierda a derecha con 1 · 3 · 3. Si se pintara א sobre el dado de
un punto (el de la izquierda), un lector de hebreo vería גגא, que no es
Agag. Y no se puede mover el א al dado derecho, porque ese muestra tres
puntos y el א vale uno: la imagen mentiría.

SOLUCIÓN: sobre los DADOS no se pinta ninguna letra. Los dados enseñan
sólo sus puntos — que es justo la tesis de la pieza, el número se VE.
La palabra אֲגָג se escribe entera y bien, de derecha a izquierda, en el
rótulo centrado de T5.

En d7 no hay puntos que contradigan nada (las caras están vacías), así
que ahí sí se pintan las tres letras y se respeta el orden hebreo:
   inicio  ד  ד  ו   (leído RTL: ו-ד-ד, lo que quedó debajo)
   final   ד  ו  ד   (leído RTL: ד-ו-ד = David)
La ו salta del extremo derecho al centro y el ד del centro ocupa su
sitio. Un solo intercambio, visible, y דוד es palíndromo: se lee David
en los dos sentidos, así que el plano final no depende del idioma del
que mira.

════════════════════════════════════════════════════════════════════════
EL 21 NO EXISTE EN ESTA PIEZA
════════════════════════════════════════════════════════════════════════
Regla 4: un solo número por reel. El espectador ve SIETE y CATORCE, y
los ve en los puntos del dado. El 21 del cálculo (3 caras x 7) no se
dice, no se rotula y no se escribe. Si alguien lo añade, rompe la regla
que motivó toda la pieza.

USO:
    python3 scripts/goral_voz.py                    # 1) voz + timing.json
    python3 scripts/goral_video.py --test-titulos   # 2) revisar rótulos
    python3 scripts/goral_video.py --test-letras    # 3) revisar el reordenamiento
    python3 scripts/goral_video.py                  # 4) render final
"""
import os, sys, json, shutil, subprocess
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

EDIR   = "/Users/mardan/jashmal-produccion/goral-agag-david"
SALIDA = os.path.join(EDIR, "GORAL-la-cara-que-no-ves-reel.mp4")
BUILD  = os.path.join(EDIR, "build")
FRAMES = os.path.join(BUILD, "frames")

V.IMG    = os.path.join(EDIR, "img")
V.FONTS  = os.path.join(EDIR, "fonts")
V.MP3    = os.path.join(EDIR, "audio", "goral_voz.mp3")
V.TIMING = os.path.join(EDIR, "audio", "goral_timing.json")
V.ENDCARD_PORTAL = os.path.join(EDIR, "jashmal_endcard_portal_ES.png")

V.VAV_END = -1.0      # no se dibuja ninguna letra suelta sobre el fondo
XF        = 0.6       # fundido por defecto
PAUSA     = 1.5       # el silencio de la regla 5
COLA      = 1.5       # cola tras T10 para que la mano del cierre respire

# ── Las tres caras vacías de d7, en fracción de la imagen ────────────────
# Medidas sobre el PNG de 941x1672: caras centradas en x = 188 / 470 / 750
# y en y = 785. Con z = 1 y pan 0 el cover es 1:1, así que la fracción se
# traduce directamente a pantalla.
CARAS_X = (0.200, 0.500, 0.800)
CARAS_Y = 0.470


# ═══════════════════════════════════════════════════════════════════════
# PLANOS — 11, incluido el negro. Un plano NO es un tiempo de voz:
# T6 se parte en dos (el volteo y las caras), y T2+T3 comparten uno.
# ═══════════════════════════════════════════════════════════════════════
V.BG_FILES = {
    "mano_papel": "d1.png",   # la mano con el papel doblado        [T1]
    "dado_cae":   "d2.png",   # el dado cayendo                     [T2+T3]
    "suertes":    "d3.png",   # la mano que echa suertes            [T4]
    "tres_133":   "d4.png",   # tres dados: 1 · 3 · 3               [T5]
    "volteo":     "d5.png",   # el volteo, motion blur              [T6a]
    "tres_644":   "d6.png",   # las caras de abajo: 6 · 4 · 4       [T6b]
    "negro":      "d6.png",   # marcador; el plano se pinta negro   [pausa]
    "placa":      "d7.png",   # tres caras vacías, para las letras  [T7+T8a]
    "arpa":       "d8.png",   # el arpa                             [T8b]
    "suertes2":   "d3.png",   # la misma tirada, alejándonos        [T9]
    "cierre":     "d9.png",   # la mano con el dado volteado        [T10]
}

# (clave, z0, z1, pan)  — pan en píxeles del prescale
PLANOS = [
    ("mano_papel", 1.00, 1.09, (0,  20)),   # entrar despacio al papel
    ("dado_cae",   1.12, 1.00, (0, -25)),   # abrir: el dado se asienta
    ("suertes",    1.00, 1.08, (-35, 0)),   # deriva lateral sobre la mesa
    ("tres_133",   1.00, 1.06, (0,   0)),   # empuje mínimo: se cuentan puntos
    ("volteo",     1.06, 1.14, (0,   0)),   # tensión hacia el golpe
    ("tres_644",   1.00, 1.05, (0,   0)),   # reposo: se cuentan otra vez
    ("negro",      1.00, 1.00, (0,   0)),   # EL SILENCIO
    ("placa",      1.00, 1.00, (0,   0)),   # SIN Ken Burns: las letras se clavan
    ("arpa",       1.00, 1.08, (0, -20)),   # subida suave
    ("suertes2",   1.10, 1.00, (25,  0)),   # retroceso: nos alejamos
    ("cierre",     1.02, 1.10, (0,  15)),   # la mano, cierre
]
IDX_NEGRO = 6
IDX_PLACA = 7

# Fundido de cada frontera (10 fronteras para 11 planos)
XF_AT = [XF, XF, XF, XF,
         0.0,        # 5) d5 -> d6  CORTE SECO. El volteo. No tocar.
         0.35,       # 6) a negro
         0.35,       # 7) del negro
         XF, XF, XF]


# ═══════════════════════════════════════════════════════════════════════
# RÓTULOS CENTRADOS — "ESPAÑOL|hebreo|nota"
#   · el español manda: la audiencia NO lee hebreo
#   · el hebreo es apoyo secundario
#   · la nota lleva la fuente exacta
# (texto, y, size, tiempo_de_voz, offset, duración)
# ═══════════════════════════════════════════════════════════════════════
TITLES = [
    # T3 · el único dato técnico. Sin fuente: es convención de dados.
    ("LAS CARAS OPUESTAS SUMAN SIETE||",              290, 62, 3, 1.2, 4.6),

    # T4 · LA VACUNA CONTRA LA TRAMPA 1. El rótulo dice NISÁN.
    #      Hamán NO echó la suerte en Yom Kipur: Ester 3:7 dice Nisán,
    #      y cualquiera con una Meguilá lo desmiente en diez segundos.
    ("EN EL MES DE NISÁN|פּוּר · הַגּוֹרָל|Ester 3:7 — «echó pur, que es la suerte»",
                                                      270, 66, 4, 1.6, 5.4),

    # T5 · la palabra Agag escrita entera y BIEN (de derecha a izquierda).
    #      Sobre los dados no va ninguna letra: ver la nota de arriba.
    ("AGAG|אֲגָג|Shmuel I 15:8 — rey de Amalek, capturado vivo",
                                                      270, 78, 5, 1.4, 4.4),

    # T9 · la puerta limpia a Yom Kipur, SIN FECHA.
    #      Dice lo contrario de la trampa 1: la suerte NO pudo caer.
    ("ESTER RABÁ 7:11||«el mérito del shofar, del Kipur y de las fiestas»",
                                                      270, 58, 9, 1.8, 5.6),
]

# Numerales grandes: el 7 y el 14, y nada más. NUNCA el 21.
# (texto, tiempo_de_voz, offset, duración)
NUMEROS = [
    ("7",  5, 5.2, 2.4),    # al final de T5, sobre los dados 1·3·3
    ("14", 6, 5.6, 4.2),    # en T6, ya sobre las caras 6·4·4
]

# Rótulo de esquina: entra en T5, sale con T8. Trampa 14.
JIDUSH_DESDE, JIDUSH_HASTA = 5, 8


# ═══════════════════════════════════════════════════════════════════════
# Fondos
# ═══════════════════════════════════════════════════════════════════════
def prescale(path):
    """Cover a 9:16. Las imágenes ya vienen en 0,5628 contra 0,5625 del
    lienzo: el recorte es de medio píxel, nada del sujeto se pierde."""
    im = Image.open(path).convert("RGB")
    iw, ih = im.size
    tw, th = int(V.W * 1.18), int(V.H * 1.18)
    s = max(tw / iw, th / ih)
    return im.resize((round(iw * s), round(ih * s)), Image.LANCZOS)


def title_layer(text, letra=False, y=300, size=76, color=V.CREAM):
    partes = (text.split("|") + ["", ""])[:3]
    es, heb_txt, nota = partes
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    spaced = " ".join(list(es)) if len(es) <= 10 else es
    f = V._fit_font(spaced, size, V.W - 130)
    d.text((V.W // 2 + 3, y + 3), spaced, font=f, fill=(0, 0, 0, 170), anchor="ma")
    d.text((V.W // 2, y), spaced, font=f, fill=(*color, 255), anchor="ma")
    yy = d.textbbox((V.W // 2, y), spaced, font=f, anchor="ma")[3]

    if heb_txt:
        yy += 38
        d.line([(V.W // 2 - 78, yy), (V.W // 2 + 78, yy)], fill=(*V.GOLD, 190), width=2)
        hf = V.heb(int(size * 0.86))   # FrankRuhl + raqm -> niqqud y RTL correctos
        d.text((V.W // 2 + 2, yy + 34), heb_txt, font=hf,
               fill=(0, 0, 0, 170), anchor="ma", features=["kern"])
        d.text((V.W // 2, yy + 32), heb_txt, font=hf,
               fill=(*V.GOLDB, 255), anchor="ma", features=["kern"])
        yy = d.textbbox((V.W // 2, yy + 32), heb_txt, font=hf, anchor="ma")[3]

    if nota:
        yy += 32
        d.line([(V.W // 2 - 78, yy), (V.W // 2 + 78, yy)], fill=(*V.GOLD, 170), width=2)
        nf = V.corm_i(42)
        d.text((V.W // 2 + 2, yy + 32), nota, font=nf, fill=(0, 0, 0, 180), anchor="ma")
        d.text((V.W // 2, yy + 30), nota, font=nf, fill=(*V.GOLDB, 255), anchor="ma")
    return img


def num_layer(txt):
    """El numeral grande y dorado, debajo de los dados. Sólo 7 y 14."""
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    y = 1210
    glow = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    dg = ImageDraw.Draw(glow)
    f = V.cinzel(168)
    dg.text((V.W // 2, y), txt, font=f, fill=(*V.GOLDB, 150), anchor="ma")
    img = Image.alpha_composite(img, glow.filter(ImageFilter.GaussianBlur(22)))
    d = ImageDraw.Draw(img)
    d.text((V.W // 2 + 3, y + 4), txt, font=f, fill=(0, 0, 0, 190), anchor="ma")
    d.text((V.W // 2, y), txt, font=f, fill=(*V.GOLDB, 255), anchor="ma")
    return img


def jidush_layer():
    """Rótulo de esquina. Sin esto la pieza no se publica (trampa 14)."""
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    f = V.corm_i(40)
    txt = "lectura propia · Mardan Kadivar"
    y = 112
    d.text((V.W // 2 + 2, y + 2), txt, font=f, fill=(0, 0, 0, 190), anchor="ma")
    d.text((V.W // 2, y), txt, font=f, fill=(*V.GOLD, 235), anchor="ma")
    bb = d.textbbox((V.W // 2, y), txt, font=f, anchor="ma")
    d.line([(bb[0] - 34, y + 26), (bb[0] - 10, y + 26)], fill=(*V.GOLD, 170), width=2)
    d.line([(bb[2] + 10, y + 26), (bb[2] + 34, y + 26)], fill=(*V.GOLD, 170), width=2)
    return img


# ═══════════════════════════════════════════════════════════════════════
# LAS LETRAS QUE SE REORDENAN — el corazón honesto de la pieza
# ═══════════════════════════════════════════════════════════════════════
# Orden hebreo (derecha a izquierda). Slots en pantalla: 0 izq, 1 centro,
# 2 der.  Inicio: ו en el slot derecho -> se lee ו-ד-ד (lo que quedó
# debajo de los dados).  Final: ו en el centro -> ד-ו-ד = David.
SLOT_INI = {"vav": 2, "dalet_a": 1, "dalet_b": 0}
SLOT_FIN = {"vav": 1, "dalet_a": 2, "dalet_b": 0}
GLIFO    = {"vav": "ו", "dalet_a": "ד", "dalet_b": "ד"}


def _letra_png(ch, size=250):
    cap = Image.new("RGBA", (size * 2, size * 2), (0, 0, 0, 0))
    f = V.heb(size)
    glow = Image.new("RGBA", cap.size, (0, 0, 0, 0))
    ImageDraw.Draw(glow).text((size, size), ch, font=f,
                              fill=(*V.GOLDB, 190), anchor="mm")
    cap = Image.alpha_composite(cap, glow.filter(ImageFilter.GaussianBlur(18)))
    d = ImageDraw.Draw(cap)
    d.text((size + 3, size + 3), ch, font=f, fill=(0, 0, 0, 200), anchor="mm")
    d.text((size, size), ch, font=f, fill=(*V.CREAM, 255), anchor="mm")
    return cap


def letras_layer(p_fade, p_swap, cache):
    """p_fade 0->1 entrada de las tres letras; p_swap 0->1 el intercambio."""
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    if p_fade <= 0:
        return img
    e = V.smooth(max(0.0, min(1.0, p_swap)))
    yb = CARAS_Y * V.H
    for nombre, ch in GLIFO.items():
        x0 = CARAS_X[SLOT_INI[nombre]] * V.W
        x1 = CARAS_X[SLOT_FIN[nombre]] * V.W
        x  = x0 + (x1 - x0) * e
        # arco: la letra que viaja se levanta un poco, para que se VEA
        arco = -120 * (4 * e * (1 - e)) if x0 != x1 else 0.0
        cap = cache[nombre]
        a = int(255 * V.smooth(max(0.0, min(1.0, p_fade))))
        c2 = cap.copy()
        c2.putalpha(cap.getchannel("A").point(lambda v: int(v * a / 255)))
        img.alpha_composite(c2, (round(x - cap.width / 2),
                                 round(yb + arco - cap.height / 2)))
    return img


def david_layer():
    """«DAVID = 14» bajo la placa, ya reordenada.

    OJO: NO escribir «דוד = 14» en una sola cadena. El motor bidi la
    reordena y en pantalla sale «14 = דוד», que para un lector de
    español se lee al revés. Además la audiencia no lee hebreo, así que
    manda el español y el hebreo va debajo, pequeño y solo."""
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    y = 1150
    f = V.cinzel(72)
    d.text((V.W // 2 + 3, y + 3), "DAVID = 14", font=f,
           fill=(0, 0, 0, 190), anchor="ma")
    d.text((V.W // 2, y), "DAVID = 14", font=f, fill=(*V.CREAM, 255), anchor="ma")
    yy = d.textbbox((V.W // 2, y), "DAVID = 14", font=f, anchor="ma")[3] + 26
    d.line([(V.W // 2 - 70, yy), (V.W // 2 + 70, yy)], fill=(*V.GOLD, 180), width=2)
    hf = V.heb(64)
    d.text((V.W // 2 + 2, yy + 26), "דָּוִד", font=hf, fill=(0, 0, 0, 180),
           anchor="ma", features=["kern"])
    d.text((V.W // 2, yy + 24), "דָּוִד", font=hf, fill=(*V.GOLDB, 255),
           anchor="ma", features=["kern"])
    return img


# ═══════════════════════════════════════════════════════════════════════
# Subtítulos: cortar por puntuación, nunca a mitad de idea
# ═══════════════════════════════════════════════════════════════════════
def build_phrases(words):
    phrases, buf, s = [], [], None
    for wd in words:
        w = wd["w"].rstrip()
        if s is None:
            s = wd["start"]
        buf.append(wd)
        txt = " ".join(x["w"] for x in buf)
        fin = any(w.endswith(c) for c in [".", "?", "!", "…", ":", ";"])
        coma_larga = w.endswith(",") and len(txt) >= 58
        if fin or coma_larga or len(txt) >= 82:
            phrases.append((txt, s, wd["end"]))
            buf, s = [], None
    if buf:
        phrases.append((" ".join(x["w"] for x in buf), s, buf[-1]["end"]))
    return phrases


V.prescale      = prescale
V.title_layer   = title_layer
V.build_phrases = build_phrases


# ═══════════════════════════════════════════════════════════════════════
# El silencio: partir el mp3 y desplazar todos los tiempos
# ═══════════════════════════════════════════════════════════════════════
def audio_con_pausa(tj):
    """Inserta PAUSA segundos de silencio al final de T6 y devuelve el
    timing ya desplazado. La voz sale de ElevenLabs sin huecos; el
    silencio de la regla 5 se fabrica aquí."""
    corte = tj["scenes"][5]["end"]          # final de T6, el giro
    src, out = V.MP3, os.path.join(EDIR, "audio", "goral_voz_pausa.mp3")
    sil = os.path.join(BUILD, "_silencio.wav")
    a   = os.path.join(BUILD, "_a.wav")
    b   = os.path.join(BUILD, "_b.wav")
    R = lambda c: subprocess.run(c, check=True,
                                 stdout=subprocess.DEVNULL,
                                 stderr=subprocess.DEVNULL)
    R(["ffmpeg", "-y", "-v", "error", "-i", src, "-t", f"{corte}", a])
    R(["ffmpeg", "-y", "-v", "error", "-i", src, "-ss", f"{corte}", b])
    R(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i",
       "anullsrc=r=44100:cl=mono", "-t", f"{PAUSA + COLA}", sil])
    lista = os.path.join(BUILD, "_lista.txt")
    # el silencio de COLA va al final; el de PAUSA, en medio
    silp = os.path.join(BUILD, "_silp.wav")
    silc = os.path.join(BUILD, "_silc.wav")
    R(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i",
       "anullsrc=r=44100:cl=mono", "-t", f"{PAUSA}", silp])
    R(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i",
       "anullsrc=r=44100:cl=mono", "-t", f"{COLA}", silc])
    with open(lista, "w") as f:
        for p in (a, silp, b, silc):
            f.write(f"file '{p}'\n")
    R(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
       "-i", lista, "-c:a", "libmp3lame", "-b:a", "192k", out])
    V.MP3 = out

    def sh(t):
        # OJO con el signo: `corte` ES el final exacto de la última palabra
        # de T6. Con `t > corte - 1e-6` esa palabra se desplazaba también, y
        # su subtítulo se quedaba escrito encima del negro — que es justo lo
        # que la regla 5 prohíbe. El epsilon va hacia el otro lado para que
        # T6 termine donde termina y el hueco quede limpio.
        return t + PAUSA if t > corte + 1e-6 else t
    for w in tj["words"]:
        w["start"], w["end"] = sh(w["start"]), sh(w["end"])
    for s in tj["scenes"]:
        s["start"], s["end"] = sh(s["start"]), sh(s["end"])
    tj["duration"] = sh(tj["duration"]) + COLA
    tj["_corte"] = corte
    return tj


# ═══════════════════════════════════════════════════════════════════════
# Línea de tiempo: los 11 planos, derivados del timing (nada a mano)
# ═══════════════════════════════════════════════════════════════════════
def build_timeline():
    tj = json.load(open(V.TIMING))
    tj = audio_con_pausa(tj)
    S  = tj["scenes"]
    dur = tj["duration"]
    corte = tj["_corte"]          # final de T6 (antes de desplazar)

    # el corte seco cae en la palabra «catorce» de T6: ahí se revelan
    # las caras de abajo. Si no se encuentra, a mitad del tiempo.
    t6a, t6b = S[5]["start"], S[5]["end"]
    seco = (t6a + t6b) / 2
    for w in tj["words"]:
        if w["w"].strip(".,:;—").lower() == "catorce" and t6a <= w["start"] <= t6b:
            seco = w["start"] - 0.12
            break

    b = [
        0.0,               # P1  d1        T1
        S[1]["start"],     # P2  d2        T2 + T3
        S[3]["start"],     # P3  d3        T4
        S[4]["start"],     # P4  d4        T5
        S[5]["start"],     # P5  d5        T6a  el volteo
        seco,              # P6  d6        T6b  CORTE SECO
        corte,             # P7  NEGRO     el silencio (corte = fin de T6)
        corte + PAUSA,     # P8  d7        T7 + T8a  las letras
        0.0,               # P9  d8        T8b   (se calcula abajo)
        S[8]["start"],     # P10 d3        T9
        S[9]["start"],     # P11 d9        T10
        dur,
    ]
    # el paso de la placa al arpa: 1,2 s después de que acabe el
    # reordenamiento, para que la palabra «David» se quede en el aire
    reord = None
    for w in tj["words"]:
        if w["w"].strip(".,:;—").lower() == "reordenadas":
            reord = w
            break
    fin_swap = (reord["end"] + 0.45) if reord else (S[7]["start"] + 3.4)
    # b[8] es el ARRANQUE DE P9 (el arpa). Ojo con los índices: b tiene 12
    # valores para 11 planos, así que el inicio del plano N está en b[N-1].
    # Tocar b[9] aquí pisaba el plano de T9 y dejaba P8/P9 en cero.
    # El remate (ד-ו-ד + «DAVID = 14») es LO que el espectador se lleva.
    # Con 1,2 s no daba tiempo ni a leerlo: se le dan 2,4 s en pantalla
    # antes de pasar al arpa.
    b[8] = min(max(fin_swap + 2.4, b[7] + 2.5), b[9] - 1.0)

    V.SCENES = [(b[i], k, z0, z1, pan)
                for i, (k, z0, z1, pan) in enumerate(PLANOS)]
    V.TITLE_DEFS = [(txt, False, y, sz,
                     S[t - 1]["start"] + off, S[t - 1]["start"] + off + d)
                    for (txt, y, sz, t, off, d) in TITLES]
    ctxextra = {
        "bounds": b,
        "nums": [(num_layer(txt), S[t - 1]["start"] + off,
                  S[t - 1]["start"] + off + d) for (txt, t, off, d) in NUMEROS],
        "jidush": (jidush_layer(),
                   S[JIDUSH_DESDE - 1]["start"] - 0.2,
                   S[JIDUSH_HASTA - 1]["end"] + 0.3),
        "letras_cache": {k: _letra_png(v) for k, v in GLIFO.items()},
        "t_letras": b[IDX_PLACA],
        "t_swap0": (reord["start"] - 0.15) if reord else S[7]["start"] + 1.4,
        "t_swap1": fin_swap,
        "david": david_layer(),
        "dur": dur,
    }
    return tj, ctxextra


# ═══════════════════════════════════════════════════════════════════════
# Compositor propio (sustituye a V.compose)
# ═══════════════════════════════════════════════════════════════════════
NEGRO = None


def _bg(ctx, i, t):
    if i == IDX_NEGRO:
        return Image.new("RGB", (V.W, V.H), (0, 0, 0))
    st, en = ctx["bounds"][i], ctx["bounds"][i + 1]
    _, k, z0, z1, pan = V.SCENES[i]
    return V.kenburns(ctx["uniq"][k], (t - st) / max(0.01, en - st), z0, z1, pan)


def compose(t, ctx):
    b = ctx["bounds"]
    i = 0
    for j in range(len(V.SCENES)):
        if t >= b[j]:
            i = j
    base = _bg(ctx, i, t).convert("RGBA")

    # fundido a la frontera siguiente, con la duración de ESA frontera
    if i + 1 < len(V.SCENES):
        xf = XF_AT[i]
        en = b[i + 1]
        if xf > 0 and t > en - xf:
            nxt = _bg(ctx, i + 1, en).convert("RGBA")
            base = Image.blend(base, nxt, V.smooth((t - (en - xf)) / xf))

    if i != IDX_NEGRO:
        base = Image.alpha_composite(base, ctx["scrim"])

    # las letras sobre la placa
    if i == IDX_PLACA:
        pf = (t - ctx["t_letras"] - 0.35) / 0.9
        ps = (t - ctx["t_swap0"]) / max(0.25, ctx["t_swap1"] - ctx["t_swap0"])
        base = Image.alpha_composite(
            base, letras_layer(pf, ps, ctx["letras_cache"]))
        if t > ctx["t_swap1"]:
            fa = V.smooth(min(1.0, (t - ctx["t_swap1"]) / 0.5))
            l2 = ctx["david"].copy()
            l2.putalpha(ctx["david"].getchannel("A").point(
                lambda v: int(v * fa)))
            base = Image.alpha_composite(base, l2)

    for lay, ti, to in ctx["titles"]:
        if ti <= t < to:
            fa = min(V.smooth((t - ti) / 0.5), V.smooth((to - t) / 0.5))
            l2 = lay.copy()
            l2.putalpha(lay.getchannel("A").point(lambda v: int(v * fa)))
            base = Image.alpha_composite(base, l2)

    for lay, ti, to in ctx["nums"]:
        if ti <= t < to:
            fa = min(V.smooth((t - ti) / 0.45), V.smooth((to - t) / 0.45))
            l2 = lay.copy()
            l2.putalpha(lay.getchannel("A").point(lambda v: int(v * fa)))
            base = Image.alpha_composite(base, l2)

    lay, ti, to = ctx["jidush"]
    if ti <= t < to and i != IDX_NEGRO:
        fa = min(V.smooth((t - ti) / 0.6), V.smooth((to - t) / 0.6))
        l2 = lay.copy()
        l2.putalpha(lay.getchannel("A").point(lambda v: int(v * fa)))
        base = Image.alpha_composite(base, l2)

    for lay, s, e in ctx["subs"]:
        if s <= t < e:
            base = Image.alpha_composite(base, lay)
            break
    return base.convert("RGB")


# ═══════════════════════════════════════════════════════════════════════
def _ctx(tj, extra):
    uniq = {}
    for _, k, *_r in V.SCENES:
        if k not in uniq:
            uniq[k] = prescale(os.path.join(V.IMG, V.BG_FILES[k]))
    ctx = {
        "uniq": uniq, "scrim": V.make_scrim(),
        "titles": [(title_layer(t, v, y, sz), ti, to)
                   for (t, v, y, sz, ti, to) in V.TITLE_DEFS],
        "subs": [(V.sub_layer(t), s, e)
                 for (t, s, e) in build_phrases(tj["words"])],
    }
    ctx.update(extra)
    return ctx


def test_titulos():
    tj, extra = build_timeline()
    out = os.path.join(EDIR, "check")
    os.makedirs(out, exist_ok=True)
    for i, (txt, _, y, sz, ti, to) in enumerate(V.TITLE_DEFS, 1):
        base = Image.new("RGBA", (V.W, V.H), (*V.DARK, 255))
        base = Image.alpha_composite(base, title_layer(txt, False, y, sz))
        base = Image.alpha_composite(base, jidush_layer())
        p = os.path.join(out, f"rotulo-{i}.png")
        base.convert("RGB").save(p)
        print(f"  {p}  [{ti:.1f}->{to:.1f}]  {txt}")
    for txt, t, off, d in NUMEROS:
        base = Image.new("RGBA", (V.W, V.H), (*V.DARK, 255))
        base = Image.alpha_composite(base, num_layer(txt))
        base.convert("RGB").save(os.path.join(out, f"numero-{txt}.png"))
        print(f"  {out}/numero-{txt}.png")
    hoja = Image.new("RGB", (V.W // 3 * 3, V.H // 3 * 2), V.DARK)
    fichas = [f"rotulo-{i}.png" for i in range(1, len(TITLES) + 1)] + \
             [f"numero-{t}.png" for t, *_ in NUMEROS]
    for i, nm in enumerate(fichas):
        im = Image.open(os.path.join(out, nm)).resize((V.W // 3, V.H // 3))
        hoja.paste(im, ((i % 3) * (V.W // 3), (i // 3) * (V.H // 3)))
    hoja.save(os.path.join(out, "rotulos-contacto.png"))
    print(f"\nContacto: {out}/rotulos-contacto.png")


def test_letras():
    """Seis instantes del reordenamiento, para comprobar que se VE."""
    tj, extra = build_timeline()
    out = os.path.join(EDIR, "check")
    os.makedirs(out, exist_ok=True)
    cache = extra["letras_cache"]
    placa = prescale(os.path.join(V.IMG, "d7.png"))
    fondo = V.kenburns(placa, 0.0, 1.0, 1.0, (0, 0)).convert("RGBA")
    for i, ps in enumerate([0.0, 0.2, 0.4, 0.6, 0.8, 1.0]):
        im = Image.alpha_composite(fondo.copy(), V.make_scrim())
        im = Image.alpha_composite(im, letras_layer(1.0, ps, cache))
        if ps >= 1.0:
            im = Image.alpha_composite(im, extra["david"])
        im = Image.alpha_composite(im, jidush_layer())
        im.convert("RGB").save(os.path.join(out, f"letras-{i}.png"))
    hoja = Image.new("RGB", (V.W // 3 * 3, V.H // 3 * 2), V.DARK)
    for i in range(6):
        im = Image.open(os.path.join(out, f"letras-{i}.png")).resize(
            (V.W // 3, V.H // 3))
        hoja.paste(im, ((i % 3) * (V.W // 3), (i // 3) * (V.H // 3)))
    hoja.save(os.path.join(out, "letras-contacto.png"))
    print(f"Contacto del reordenamiento: {out}/letras-contacto.png")
    print(f"  swap: {extra['t_swap0']:.2f}s -> {extra['t_swap1']:.2f}s")


def main():
    faltan = [f for f in sorted(set(V.BG_FILES.values()))
              if not os.path.exists(os.path.join(V.IMG, f))]
    if faltan:
        sys.exit("Faltan imágenes en " + V.IMG + ":\n  " + "\n  ".join(faltan))
    os.makedirs(BUILD, exist_ok=True)

    tj, extra = build_timeline()
    dur = extra["dur"]
    if os.path.isdir(FRAMES):
        shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)

    ctx = _ctx(tj, extra)
    print("PLANOS")
    for i, (st, k, *_r) in enumerate(V.SCENES):
        xf = XF_AT[i] if i < len(XF_AT) else 0.0
        marca = "  <-- CORTE SECO" if xf == 0.0 and i < len(XF_AT) else ""
        etq = "NEGRO (silencio 1,5 s)" if i == IDX_NEGRO else V.BG_FILES[k]
        print(f"  P{i+1:>2}  {st:6.2f} -> {ctx['bounds'][i+1]:6.2f}"
              f"  {etq:<24} xf={xf:.2f}{marca}")

    n = int(dur * V.FPS) + 1
    print(f"\nRender {n} cuadros ({dur:.1f}s)...")
    for fi in range(n):
        compose(fi / V.FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 200 == 0:
            print(f"  {fi}/{n}")

    print("Codificando (voz sola, sin música)...")
    tmp = os.path.join(BUILD, "goral_noend.mp4")
    cmd = ["ffmpeg", "-y", "-v", "error", "-framerate", str(V.FPS),
           "-i", f"{FRAMES}/f%05d.png", "-i", V.MP3,
           "-c:v", "libx264", "-preset", "slow", "-crf", "18",
           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest",
           "-movflags", "+faststart", tmp]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-1500:]); sys.exit(1)

    print("Añadiendo el end-card oficial del portal...")
    import jashmal_endcard as JE
    JE.ENDCARD_ES = V.ENDCARD_PORTAL
    JE.append_endcard(tmp, lang="es", out_path=SALIDA, hold=2.6, trans=0.6)
    print(f"\nLISTO: {SALIDA}")


if __name__ == "__main__":
    if "--test-titulos" in sys.argv:
        test_titulos()
    elif "--test-letras" in sys.argv:
        test_letras()
    else:
        main()
