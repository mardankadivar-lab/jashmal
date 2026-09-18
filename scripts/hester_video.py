#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · «Tiempos Sagrados» · HESTER PANIM — el Rostro oculto
Parashá Haazinú · reel vertical 9:16 (1080x1920, 30 fps).
Publicación: DOMINGO 20 DE SEPTIEMBRE, 11:00 AM (AST) — unas horas antes
de que entre Yom Kipur al atardecer, para que corra solo durante el ayuno.

Motor: vav_video.py (Ken Burns sobre imágenes fijas + rótulos PIL +
subtítulos quemados sincronizados a la voz de Martin + end-card oficial
del portal). Nada hardcodeado: el timeline sale de audio/hester_timing.json.

Voz REAL medida: 86.94 s  ->  reel con end-card ~89.5 s.

════════════════════════════════════════════════════════════════════════
⚠️  MONTADO CON IMÁGENES PROVISIONALES — ESTO NO SE PUBLICA ASÍ
════════════════════════════════════════════════════════════════════════
Las ocho imágenes definitivas NO EXISTEN todavía:
   h1.png · h2.png · h3.png · h4.png · h5.png · h6.png · h7.png · h8.png
Sus prompts YA están entregados a Mardan en
   ~/jashmal-produccion/hester-panim/PROMPTS_GPT.txt
y las hace él con GPT (zona suya: desde aquí no se toca).

Mientras tanto, en img/ están los provisionales (_prov_h*.png) que
fabrica este mismo script: geometría sobre negro, paleta correcta, SIN
el grabado de marca. Imitan la COMPOSICIÓN de cada plano definitivo
—dónde cae la luz, cuánto negro hay, por dónde entra el sujeto— para que
el ritmo y la legibilidad de los rótulos se puedan juzgar de verdad hoy.
Llevan marca de agua «IMAGEN PROVISIONAL».

CUANDO LLEGUEN LAS DEFINITIVAS: se guardan con esos ocho nombres exactos
en img/ y se vuelve a correr `python3 scripts/hester_video.py`. Nada más.
Ni el guion, ni los tiempos, ni los rótulos cambian.

════════════════════════════════════════════════════════════════════════
EL ARGUMENTO ES VISUAL — SE ENTIENDE SIN SONIDO
════════════════════════════════════════════════════════════════════════
   T1  h1 · solo ante una ventana sin luz    ] pediste algo de verdad
   T2  h1 · la misma, más cerca              ] y no pasó nada   ← sin rótulo
   T3  h2 · la figura encapuchada de espaldas] hoy empieza Yom Kipur
   T4  h2 · más cerca de la capucha vacía    ] EL ROSTRO ESCONDIDO
   T5  h3 · un velo detrás de otro velo      ] «esconder esconderé»
   T6  h3 · avanzando entre los dos velos    ] la línea del Baal Shem Tov
   T7  h5 · la reina con el rostro en sombra ] ¿dónde está Ester?
  ──────── PLACA: הַסְתֵּר · אֶסְתֵּר · LA MISMA RAÍZ ────────
   T9  h5 · la corona, más cerca             ] el único libro sin el Nombre
   T10 h4 · el rollo en dos columnas         ] un hueco en el medio
   T11 h4 · bajando por el hueco central     ] la frase sigue del otro lado
   T12 h6 · la cabeza alzada al cielo cerrado] «veré cuál será su fin»
  ──────── PLACA: «HASTA» · IBN EZRA ────────
   T14 h7 · las puertas con la rendija       ] los ojos no se cierran
   T15 h8 · la misma figura, la luz de frente] «Tu rostro buscaré»

LOS TRES HILOS QUE COSEN LA PIEZA, y por eso el reparto no es arbitrario:
  · h2 → h8 es la MISMA figura, mismo manto, mismo paisaje: lo único que
    cambia es de dónde viene la luz. El reel se cierra sobre sí mismo y
    dice sin palabras la tesis entera: el sol siempre estuvo ahí.
  · el ROSTRO nunca se ve — ni una vez, en ningún plano. Es el tema.
  · el VACÍO va cambiando de signo: hueco de la capucha (T4) → hueco
    entre los velos (T5) → hueco en medio del renglón (T10-T11) → rendija
    entre las puertas (T14). El mismo vacío, y al final sale luz por él.

Leídos solos y en orden, los rótulos dicen la enseñanza entera. Los dos
primeros planos van SIN rótulo (regla de la casa): la entrada es un
recuerdo del espectador y un titular en Cinzel encima la convertiría en
una placa de título. Quien mira sin sonido ya tiene el micro-rótulo de
arriba y el subtítulo quemado.

El hebreo en pantalla son SIEMPRE palabras o frases cortas de fuente,
compuestas aquí con FrankRuhl (raqm: niqud y RTL correctos) — nunca
pedidas a un generador de imagen, que inventa las letras y descoloca los
puntos vocálicos. Por eso los prompts de las ocho imágenes piden
expresamente «sin texto, sin letras».

════════════════════════════════════════════════════════════════════════
GUARDARRAÍLES QUE ESTE MONTAJE RESPETA
════════════════════════════════════════════════════════════════════════
1. Ninguna placa ni rótulo dice «ladrillo sobre ladrillo» ni dibuja la
   forma del Canto del Mar. La placa del rollo (y la imagen h4) muestran
   la forma REAL de Haazinú: el hueco en el medio (Shulján Aruj YD 275:5).
2. Cero gematría en pantalla. La única permitida por el encargo
   (סתר 660 / אסתר 661) quedó fuera por la regla de una sola tesis.
3. La palabra «Purim» no aparece ni en voz ni en pantalla. Ester entra
   como llave del ocultamiento, no como tema.
4. Ningún rótulo insinúa culpa, castigo ni mérito personal. Y ninguno
   promete que el espectador vaya a sentir algo.
5. La Neilá no aparece en el reel (no hay fuente clásica que la ligue al
   hester panim). Vive en la descripción, marcada como lectura nuestra.

MODO DE EMPLEO
    python3 scripts/hester_voz.py                    # 1) voz (ya corrida)
    python3 scripts/hester_video.py --placas         # 2) las dos placas
    python3 scripts/hester_video.py --provisionales  # 3) fondos provisionales
    python3 scripts/hester_video.py --test-titulos   # 4) MIRAR los rótulos
    python3 scripts/hester_video.py --test-planos    # 5) MIRAR los encuadres
    python3 scripts/hester_video.py --test-cuadros   # 6) MIRAR cuadros reales
    python3 scripts/hester_video.py                  # 7) montar
"""
import os, sys, json, shutil, random, subprocess
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

NDIR   = "/Users/mardan/jashmal-produccion/hester-panim"
SALIDA = os.path.join(NDIR, "HESTER-PANIM-rostro-escondido-reel.mp4")
BUILD  = os.path.join(NDIR, "build")
FRAMES = os.path.join(BUILD, "frames")
CHECK  = os.path.join(NDIR, "check")

V.IMG    = os.path.join(NDIR, "img")
V.FONTS  = os.path.join(NDIR, "fonts")
V.MP3    = os.path.join(NDIR, "audio", "hester_voz.mp3")
V.TIMING = os.path.join(NDIR, "audio", "hester_timing.json")
V.ENDCARD_PORTAL = os.path.join(NDIR, "jashmal_endcard_portal_ES.png")

V.VAV_END = -1.0     # ninguna letra dibujada encima del fondo
V.XF      = 0.55     # fundido entre planos: largo, la pieza es lenta

PW, PH = 1274, 2266  # resolución nativa de las placas (= 1080x1920 x 1.18)

# clave de plano -> (archivo definitivo, provisional mientras no exista)
BG_SPEC = {
    "ventana":   ("h1.png", "_prov_h1.png"),
    "ventana2":  ("h1.png", "_prov_h1.png"),
    "capucha":   ("h2.png", "_prov_h2.png"),
    "capucha2":  ("h2.png", "_prov_h2.png"),
    "velos":     ("h3.png", "_prov_h3.png"),
    "velos2":    ("h3.png", "_prov_h3.png"),
    "reina":     ("h5.png", "_prov_h5.png"),
    "pl_raiz":   ("_placa_raiz.png",  None),   # la fabrica este script
    "reina2":    ("h5.png", "_prov_h5.png"),
    "rollo":     ("h4.png", "_prov_h4.png"),
    "rollo2":    ("h4.png", "_prov_h4.png"),
    "cielo":     ("h6.png", "_prov_h6.png"),
    "pl_hasta":  ("_placa_hasta.png", None),   # la fabrica este script
    "puertas":   ("h7.png", "_prov_h7.png"),
    "luz":       ("h8.png", "_prov_h8.png"),
}

PLACAS = ("pl_raiz", "pl_hasta")

# (clave, z0, z1, pan) — Ken Burns lento. El movimiento de cámara CUENTA:
# se abre donde hay que mostrar el vacío y se acerca donde hay que
# señalarlo. Nada de movimientos vistosos: la pieza es contemplativa.
SCENE_KEYS = [
    ("ventana",   1.04, 1.16, (0,   0)),  # T1 · nos acercamos a la espalda
    ("ventana2",  1.20, 1.30, (0, -24)),  # T2 · seguimos, hacia la ventana
    ("capucha",   1.26, 1.06, (0,  18)),  # T3 · se ABRE: aparece la figura
    ("capucha2",  1.10, 1.30, (0, -30)),  # T4 · y subimos a la capucha vacía
    ("velos",     1.02, 1.14, (0,   0)),  # T5 · entramos al primer velo
    ("velos2",    1.18, 1.34, (0,   0)),  # T6 · y seguimos hacia el segundo
    ("reina",     1.24, 1.08, (0,  20)),  # T7 · se abre sobre el salón
    ("pl_raiz",   1.00, 1.05, (0,   0)),  # T8 · la raíz          [placa]
    ("reina2",    1.10, 1.28, (0, -26)),  # T9 · nos acercamos a la corona
    ("rollo",     1.02, 1.12, (0,   0)),  # T10 · el rollo entero
    ("rollo2",    1.22, 1.34, (0,  34)),  # T11 · bajamos POR el hueco
    ("cielo",     1.16, 1.02, (0, -20)),  # T12 · se abre hacia el cielo
    ("pl_hasta",  1.00, 1.05, (0,   0)),  # T13 · el «hasta»      [placa]
    ("puertas",   1.20, 1.06, (0,   0)),  # T14 · se abre: la rendija
    ("luz",       1.04, 1.24, (0, -18)),  # T15 · entramos en la luz
]

# Rótulos "ESPAÑOL|hebreo|nota".  (texto, y, size, tiempo_de_voz, offset, dur)
# T1 y T2 NO llevan rótulo (la entrada es un recuerdo, no un titular).
# T8 y T13 tampoco: las placas SON el rótulo.
TITLES = [
    ("HOY EMPIEZA YOM KIPUR||el día del perdón · el más serio del año",
                                                      300, 60,  3, 1.4, 5.2),
    # OJO con la nota: «hester panim» es el TÉRMINO de la tradición, no una
    # cita literal de 32:20 (el versículo dice «אַסְתִּירָה פָנַי»). La nota lo
    # deja explícito para no dar por escrito algo que el texto no dice.
    ("EL ROSTRO ESCONDIDO|הֶסְתֵּר פָּנִים|"
     "hester panim · Devarim 32:20: «esconderé Mi rostro»",
                                                      280, 66,  4, 3.2, 4.8),
    ("«ESCONDER ESCONDERÉ»|הַסְתֵּר אַסְתִּיר|lo dice dos veces · Devarim 31:18",
                                                      280, 58,  5, 0.5, 3.0),
    ("SI SABES QUE ESTÁ ESCONDIDO\nYA NO ESTÁ DEL TODO ESCONDIDO||"
     "Baal Shem Tov · Keter Shem Tov 1:55",           300, 52,  6, 2.3, 5.2),
    ("¿DÓNDE ESTÁ ESTER\nEN LA TORÁ?||la pregunta del Talmud · Julín 139b",
                                                      300, 62,  7, 0.5, 3.4),
    # el "\n" es a mano: sin él partía en «…SIN EL / NOMBRE», que deja
    # una línea huérfana de una palabra.
    ("EL ÚNICO LIBRO\nSIN EL NOMBRE||en todo el libro de Ester, Dios no es nombrado",
                                                      300, 56,  9, 0.5, 4.2),
    ("SETENTA LÍNEAS\nCON UN HUECO EN EL MEDIO||Shulján Aruj · Yoré Deá 275:5",
                                                      300, 58, 10, 0.9, 4.6),
    ("EN EL MEDIO, NO AL FINAL||del otro lado la frase sigue",
                                                      300, 62, 11, 0.4, 3.2),
    ("«VERÉ CUÁL SERÁ SU FIN»|אֶרְאֶה מָה אַחֲרִיתָם|el versículo no termina en el ocultamiento",
                                                      280, 56, 12, 1.5, 4.4),
    ("EL ROSTRO SE ESCONDE\nLOS OJOS NO SE CIERRAN||Ramban: «veré» = «descenderé y veré»",
                                                      300, 58, 14, 0.2, 3.5),
    ("«TU ROSTRO BUSCARÉ»|אֶת פָּנֶיךָ אֲבַקֵּשׁ|Salmo 27:8 · se dice dos veces al día en estos días",
                                                      280, 62, 15, 0.7, 4.4),
    ("GUARDA ESTE ESTUDIO||",                         320, 74, 15, 6.2, 3.0),
]

# Micro-rótulo permanente arriba. En ESPAÑOL: la audiencia no lee hebreo y
# «hester panim» en el segundo 1 no le dice nada a nadie. Se queda hasta
# que la voz ha nombrado el tema y el rótulo grande lo ha puesto en
# pantalla (segundo ~21), y entonces se va.
TAG      = "TIEMPOS SAGRADOS · EL ROSTRO ESCONDIDO"
TAG_IN, TAG_OUT = 0.3, 21.5


# ═══════════════════════════════════════════════════════════════════════
# FONDO COMÚN DE PLACAS Y PROVISIONALES
# ═══════════════════════════════════════════════════════════════════════
def _fondo_placa(seed=7, glow=None):
    """Negro con grano finísimo y una viñeta dorada muy tenue. Sin esto la
    placa se ve como un PowerPoint; con esto respira como el resto."""
    img = Image.new("RGB", (PW, PH), (6, 6, 12))
    if glow:
        gx, gy, gr, gi = glow
        cap = Image.new("L", (PW, PH), 0)
        ImageDraw.Draw(cap).ellipse([gx - gr, gy - gr, gx + gr, gy + gr], fill=gi)
        cap = cap.filter(ImageFilter.GaussianBlur(gr * 0.55))
        oro = Image.new("RGB", (PW, PH), (150, 112, 34))
        img = Image.composite(oro, img, cap)
    rnd = random.Random(seed)
    px = img.load()
    for _ in range(46000):
        x, y = rnd.randrange(PW), rnd.randrange(PH)
        r, g, b = px[x, y]
        n = rnd.randint(4, 16)
        px[x, y] = (min(255, r + n), min(255, g + n), min(255, b + n))
    return img.convert("RGBA")


def _tint(cap, rgb):
    l = Image.new("RGBA", (PW, PH), (*rgb, 255)); l.putalpha(cap); return l
def _crema(cap):  return _tint(cap, (238, 232, 210))
def _calido(cap): return _tint(cap, (255, 200, 118))
def _frio(cap):   return _tint(cap, (128, 138, 156))


def _wrap(d, text, font, maxw):
    lineas, cur = [], ""
    for p in text.split():
        t = (cur + " " + p).strip()
        if d.textlength(t, font=font) <= maxw or not cur:
            cur = t
        else:
            lineas.append(cur); cur = p
    if cur:
        lineas.append(cur)
    return lineas


# ═══════════════════════════════════════════════════════════════════════
# PLACAS TIPOGRÁFICAS — el sello de dato verificado, y lo que se guarda
# ═══════════════════════════════════════════════════════════════════════
def _letras_rtl(img, d, letras, y, size=150, gap=54, color=None):
    """Dibuja letras hebreas SUELTAS de derecha a izquierda, una por una.

    Se hace así, y no con un d.text() de la cadena entera, por una razón
    medida: con letras sueltas separadas por espacios PIL puede invertir
    el orden, y aquí el orden ES el argumento (la raíz ס־ת־ר). Letra por
    letra, el orden lo decidimos nosotros y no hay nada que se pueda dar
    vuelta. Las palabras COMPLETAS con niqud sí van de una pieza: ahí
    FrankRuhl + raqm resuelven bien el RTL y los puntos vocálicos."""
    f = V.heb(size)
    col = color or V.GOLDB
    anchos = [d.textlength(l, font=f) + gap for l in letras]
    x = (PW + sum(anchos)) / 2      # borde derecho: el hebreo empieza aquí
    centros = []
    for l, w in zip(letras, anchos):
        x -= w
        cx = x + w / 2
        centros.append(cx)
        d.text((cx, y), l, font=f, fill=(*col, 255), anchor="ma",
               features=["kern"])
    fp = V.cinzel(46)
    for a, b in zip(centros, centros[1:]):
        d.text(((a + b) / 2, y + size * 0.30), "·", font=fp,
               fill=(*V.GOLD, 190), anchor="ma")


def placa_raiz():
    """EL CORAZÓN DE LA PIEZA, y la placa que se guarda.

    Talmud, Julín 139b: «¿De dónde está Ester en la Torá? — "וְאָנֹכִי
    הַסְתֵּר אַסְתִּיר"». הַסְתֵּר (esconder) y אֶסְתֵּר (Ester) comparten la raíz
    ס־ת־ר. El nombre de la heroína ES la palabra «escondido».

    Se muestran las dos palabras una sobre otra, con su transcripción y
    su significado debajo, y la raíz común en medio. La audiencia no lee
    hebreo: lo que tiene que VER es que las dos palabras se parecen y que
    las tres letras del medio son las mismas. Por eso la raíz va en
    crema, más grande, y las dos palabras en oro.

    Cero gematría aquí: la única permitida (660/661) quedó fuera de la
    pieza por la regla de una sola tesis. Esto es morfología, no número,
    y es MÁS fuerte, porque lo afirma el Talmud y no nosotros."""
    img = _fondo_placa(seed=11, glow=(PW // 2, 980, 820, 30))
    d = ImageDraw.Draw(img)

    # ⚠ ZONA SEGURA DE LAS PLACAS: todo el contenido vive entre y=320 y
    # y=1600. Por debajo de ahí va la banda de subtítulos quemados (la
    # primera línea de una tarjeta de dos cae en el cuadro a y≈1554, que
    # en coordenadas de placa es ≈1727), y el Ken Burns llega a z=1.05,
    # que recorta otros ~46 px por arriba y por abajo. Medido, no
    # estimado: la primera versión de esta placa tenía el pie de fuente
    # en y=1840 y la voz se lo comía.
    d.text((PW // 2, 330), "L A   M I S M A   R A Í Z",
           font=V.cinzel6(40), fill=(*V.GOLD, 230), anchor="ma")

    # ── הַסְתֵּר · «esconder»  (palabra completa: RTL + niqud de una pieza)
    hf = V.heb(118)
    d.text((PW // 2, 420), "הַסְתֵּר", font=hf, fill=(*V.GOLDB, 255),
           anchor="ma", features=["kern"])
    d.text((PW // 2, 590), "H A S T É R", font=V.cinzel(56),
           fill=(*V.CREAM, 255), anchor="ma")
    d.text((PW // 2, 665), "«esconder»", font=V.corm_i(46),
           fill=(*V.GOLD, 235), anchor="ma")

    # ── אֶסְתֵּר · Ester
    d.text((PW // 2, 770), "אֶסְתֵּר", font=hf, fill=(*V.GOLDB, 255),
           anchor="ma", features=["kern"])
    d.text((PW // 2, 940), "E S T E R", font=V.cinzel(56),
           fill=(*V.CREAM, 255), anchor="ma")
    d.text((PW // 2, 1015), "el nombre de la reina", font=V.corm_i(46),
           fill=(*V.GOLD, 235), anchor="ma")

    d.line([(PW // 2 - 280, 1105), (PW // 2 + 280, 1105)],
           fill=(*V.GOLD, 170), width=2)

    # ── la raíz compartida, letra por letra y de derecha a izquierda
    d.text((PW // 2, 1140), "L A S   M I S M A S   T R E S   L E T R A S",
           font=V.cinzel6(34), fill=(*V.GOLD, 225), anchor="ma")
    _letras_rtl(img, d, ["ס", "ת", "ר"], 1210, size=120, gap=64,
                color=V.CREAM)

    d.text((PW // 2, 1420), "EL NOMBRE DE ESTER", font=V.cinzel(52),
           fill=(*V.CREAM, 255), anchor="ma")
    d.text((PW // 2, 1488), "ES LA PALABRA «ESCONDIDO»", font=V.cinzel(52),
           fill=(*V.CREAM, 255), anchor="ma")
    d.text((PW // 2, 1568), "T A L M U D  ·  J U L Í N   1 3 9 b",
           font=V.cinzel6(30), fill=(*V.GOLDB, 210), anchor="ma")

    p = os.path.join(V.IMG, "_placa_raiz.png")
    img.convert("RGB").save(p)
    return p


def placa_hasta():
    """EL GIRO, y la razón de ser de la pieza.

    Ibn Ezra sobre «אֶרְאֶה מָה אַחֲרִיתָם» (Devarim 32:20) registra dos
    lecturas y RECHAZA la fatalista («escondo Mi rostro porque ya veo
    cómo terminan»). La que llama correcta es: «עַד שֶׁאֶרְאֶה מָה יַעֲשׂוּ
    בַּצַּר לָהֶם» — «HASTA que vea qué harán en su angustia».

    Toda la placa existe para una sola palabra: «hasta». Un «hasta» tiene
    final. Por eso está sola, enorme y en crema, y todo lo demás a su
    alrededor es pequeño. Es lo que el espectador tiene que llevarse si
    solo se lleva una cosa.

    Y NO dice que el ocultamiento vaya a terminar pronto, ni que el
    espectador vaya a sentir algo: dice que el versículo es una palabra
    de tiempo y no una sentencia. Eso es lo que está en la fuente."""
    img = _fondo_placa(seed=23, glow=(PW // 2, 860, 860, 34))
    d = ImageDraw.Draw(img)

    # Esta placa dice UNA palabra. Todo lo demás está a su servicio y en
    # cuerpo pequeño. (La frase del Ramban —«el rostro se esconde, los
    # ojos no se cierran»— vivía aquí en la primera versión y se quitó:
    # es exactamente el rótulo del plano siguiente, T14, y repetirla con
    # tres segundos de diferencia la desgastaba. Ahora la placa prepara
    # ese rótulo en vez de gastarlo.)
    d.text((PW // 2, 360), "E L   O C U L T A M I E N T O",
           font=V.cinzel6(40), fill=(*V.GOLD, 225), anchor="ma")
    d.text((PW // 2, 434), "T I E N E   U N",
           font=V.cinzel6(40), fill=(*V.GOLD, 225), anchor="ma")

    # La palabra sola, con halo: es el centro de gravedad de la placa.
    halo = Image.new("L", (PW, PH), 0)
    ImageDraw.Draw(halo).ellipse([PW // 2 - 380, 530, PW // 2 + 380, 840],
                                 fill=46)
    img.alpha_composite(_calido(halo.filter(ImageFilter.GaussianBlur(90))))
    d = ImageDraw.Draw(img)
    d.text((PW // 2 + 4, 566), "«HASTA»", font=V.cinzel(160),
           fill=(0, 0, 0, 170), anchor="ma")
    d.text((PW // 2, 560), "«HASTA»", font=V.cinzel(160),
           fill=(*V.CREAM, 255), anchor="ma")

    # עַד שֶׁאֶרְאֶה — dos palabras con niqud, de una pieza (raqm hace el RTL)
    d.text((PW // 2, 780), "עַד שֶׁאֶרְאֶה", font=V.heb(96),
           fill=(*V.GOLDB, 255), anchor="ma", features=["kern"])

    d.line([(PW // 2 - 280, 950), (PW // 2 + 280, 950)],
           fill=(*V.GOLD, 170), width=2)

    fq = V.corm_i(54)
    y = 1000
    for ln in _wrap(d, "«hasta que vea qué harán en su angustia»", fq, PW - 260):
        d.text((PW // 2, y), ln, font=fq, fill=(*V.CREAM, 255), anchor="ma")
        y += 72

    y += 90
    for t in ("N O   E S   U N A   S E N T E N C I A",
              "E S   U N   P L A Z O"):
        d.text((PW // 2, y), t, font=V.cinzel6(44),
               fill=(*V.GOLDB, 240), anchor="ma")
        y += 96

    d.text((PW // 2, 1500), "I B N   E Z R A  ·  D E V A R I M   3 2 : 2 0",
           font=V.cinzel6(32), fill=(*V.GOLDB, 210), anchor="ma")

    p = os.path.join(V.IMG, "_placa_hasta.png")
    img.convert("RGB").save(p)
    return p


def placas():
    os.makedirs(V.IMG, exist_ok=True)
    print("  placa ->", placa_raiz())
    print("  placa ->", placa_hasta())


# ═══════════════════════════════════════════════════════════════════════
# PROVISIONALES — para montar y aprobar HOY, sin esperar a las imágenes
# ═══════════════════════════════════════════════════════════════════════
def _prov(nombre, seed, glow, forma):
    """Cada provisional imita la COMPOSICIÓN del plano definitivo: dónde
    cae la luz, cuánto negro hay, por dónde entra el sujeto. Así el ritmo
    y la legibilidad de los rótulos se pueden juzgar de verdad. Llevan
    marca de agua: NUNCA se publica un reel con estos."""
    img = _fondo_placa(seed=seed, glow=glow)
    cap = Image.new("L", (PW, PH), 0)
    dd = ImageDraw.Draw(cap)

    if forma == "ventana":      # h1 · ventana alta y fría + figura pequeña
        dd.rounded_rectangle([PW // 2 - 150, 560, PW // 2 + 150, 1180],
                             radius=150, fill=92)
        img.alpha_composite(_frio(cap.filter(ImageFilter.GaussianBlur(34))))
        fig = Image.new("L", (PW, PH), 0)
        ImageDraw.Draw(fig).rounded_rectangle(
            [PW // 2 - 80, 1360, PW // 2 + 80, 1820], radius=80, fill=150)
        img.alpha_composite(_tint(fig.filter(ImageFilter.GaussianBlur(20)),
                                  (14, 14, 20)))

    elif forma == "capucha":    # h2 · figura de espaldas, luz DETRÁS
        luz = Image.new("L", (PW, PH), 0)
        dl = ImageDraw.Draw(luz)
        for i in range(5):
            x = PW // 2 + (i - 2) * 210
            dl.polygon([(x - 28, 420), (x + 28, 420),
                        (x + 140, 1500), (x - 140, 1500)], fill=70)
        img.alpha_composite(_calido(luz.filter(ImageFilter.GaussianBlur(56))))
        dd.polygon([(PW // 2, 780), (PW // 2 + 330, 2100),
                    (PW // 2 - 330, 2100)], fill=255)
        dd.ellipse([PW // 2 - 150, 700, PW // 2 + 150, 1000], fill=255)
        img.alpha_composite(_tint(cap.filter(ImageFilter.GaussianBlur(10)),
                                  (8, 8, 13)))

    elif forma == "velos":      # h3 · un velo detrás de otro, luz al fondo
        fondo = Image.new("L", (PW, PH), 0)
        ImageDraw.Draw(fondo).ellipse(
            [PW // 2 - 220, 1000, PW // 2 + 220, 1440], fill=150)
        img.alpha_composite(_calido(fondo.filter(ImageFilter.GaussianBlur(120))))
        for i, (x0, x1, a) in enumerate([(240, PW - 240, 58),
                                         (410, PW - 410, 40)]):
            v = Image.new("L", (PW, PH), 0)
            ImageDraw.Draw(v).rounded_rectangle(
                [x0, 520 + i * 200, x1, 1860 - i * 190], radius=40, fill=a)
            img.alpha_composite(_crema(v.filter(ImageFilter.GaussianBlur(26))))

    elif forma == "rollo":      # h4 · dos columnas con el HUECO en medio
        for lado in (-1, 1):
            for fila in range(14):
                y = 640 + fila * 78
                x0 = PW // 2 + lado * 70
                x1 = PW // 2 + lado * 430
                dd.rounded_rectangle([min(x0, x1), y, max(x0, x1), y + 22],
                                     radius=11, fill=130)
        img.alpha_composite(_calido(cap.filter(ImageFilter.GaussianBlur(9))))

    elif forma == "reina":      # h5 · la corona es lo único que brilla
        dd.arc([PW // 2 - 190, 700, PW // 2 + 190, 900], 190, 350, fill=230,
               width=26)
        for i in range(5):
            x = PW // 2 + (i - 2) * 86
            dd.ellipse([x - 17, 706 + abs(i - 2) * 26, x + 17,
                        740 + abs(i - 2) * 26], fill=240)
        img.alpha_composite(_calido(cap.filter(ImageFilter.GaussianBlur(13))))
        fig = Image.new("L", (PW, PH), 0)
        ImageDraw.Draw(fig).polygon([(PW // 2, 900), (PW // 2 + 300, 2050),
                                     (PW // 2 - 300, 2050)], fill=255)
        img.alpha_composite(_tint(fig.filter(ImageFilter.GaussianBlur(14)),
                                  (10, 10, 16)))

    elif forma == "cielo":      # h6 · franja de oro ARRIBA que ella no ve
        fr = Image.new("L", (PW, PH), 0)
        ImageDraw.Draw(fr).rounded_rectangle([90, 250, PW - 90, 300],
                                             radius=25, fill=170)
        img.alpha_composite(_calido(fr.filter(ImageFilter.GaussianBlur(40))))
        dd.polygon([(PW // 2, 1420), (PW // 2 + 210, 2130),
                    (PW // 2 - 210, 2130)], fill=255)
        dd.ellipse([PW // 2 - 92, 1290, PW // 2 + 92, 1470], fill=255)
        img.alpha_composite(_tint(cap.filter(ImageFilter.GaussianBlur(16)),
                                  (12, 12, 18)))

    elif forma == "puertas":    # h7 · dos hojas y la RENDIJA de luz
        rend = Image.new("L", (PW, PH), 0)
        ImageDraw.Draw(rend).rounded_rectangle(
            [PW // 2 - 26, 430, PW // 2 + 26, 1900], radius=26, fill=255)
        img.alpha_composite(_calido(rend.filter(ImageFilter.GaussianBlur(52))))
        img.alpha_composite(_crema(rend.filter(ImageFilter.GaussianBlur(6))))
        for lado in (-1, 1):
            x0 = PW // 2 + lado * 56
            x1 = PW // 2 + lado * 520
            dd.rounded_rectangle([min(x0, x1), 420, max(x0, x1), 1910],
                                 radius=30, fill=255)
        img.alpha_composite(_tint(cap.filter(ImageFilter.GaussianBlur(5)),
                                  (16, 13, 10)))

    elif forma == "luz":        # h8 · la MISMA figura, la luz de FRENTE
        luz = Image.new("L", (PW, PH), 0)
        ImageDraw.Draw(luz).ellipse(
            [PW // 2 - 560, 480, PW // 2 + 560, 1700], fill=120)
        img.alpha_composite(_calido(luz.filter(ImageFilter.GaussianBlur(150))))
        borde = Image.new("L", (PW, PH), 0)
        db = ImageDraw.Draw(borde)
        db.polygon([(PW // 2, 780), (PW // 2 + 330, 2100),
                    (PW // 2 - 330, 2100)], fill=255)
        db.ellipse([PW // 2 - 150, 700, PW // 2 + 150, 1000], fill=255)
        img.alpha_composite(_calido(borde.filter(ImageFilter.GaussianBlur(30))))
        dd.polygon([(PW // 2, 810), (PW // 2 + 300, 2100),
                    (PW // 2 - 300, 2100)], fill=255)
        dd.ellipse([PW // 2 - 128, 730, PW // 2 + 128, 985], fill=255)
        img.alpha_composite(_tint(cap.filter(ImageFilter.GaussianBlur(8)),
                                  (10, 9, 14)))

    d = ImageDraw.Draw(img)
    # Muy abajo, por debajo de la banda de subtítulos, para no estorbar.
    d.text((PW // 2, PH - 78), "IMAGEN PROVISIONAL", font=V.cinzel6(26),
           fill=(*V.GOLD, 105), anchor="ma")
    p = os.path.join(V.IMG, nombre)
    img.convert("RGB").save(p)
    return p


def provisionales():
    os.makedirs(V.IMG, exist_ok=True)
    for n, s, g, f in [
        ("_prov_h1.png",  3, (PW // 2,  880, 620, 14), "ventana"),
        ("_prov_h2.png",  5, (PW // 2,  900, 820, 24), "capucha"),
        ("_prov_h3.png",  7, (PW // 2, 1200, 700, 16), "velos"),
        ("_prov_h4.png",  9, (PW // 2, 1120, 760, 22), "rollo"),
        ("_prov_h5.png", 11, (PW // 2,  820, 640, 20), "reina"),
        ("_prov_h6.png", 13, (PW // 2,  400, 780, 16), "cielo"),
        ("_prov_h7.png", 15, (PW // 2, 1160, 700, 20), "puertas"),
        ("_prov_h8.png", 17, (PW // 2, 1000, 900, 30), "luz"),
    ]:
        print("  provisional ->", _prov(n, s, g, f))


# ═══════════════════════════════════════════════════════════════════════
# RÓTULOS
# ═══════════════════════════════════════════════════════════════════════
def _fit_wrap(d, text, size, maxw, maxlines=2):
    """Baja el cuerpo hasta que el rótulo quepa. Un "\\n" en el texto
    fuerza el corte: sirve para las frases de dos mitades («el rostro se
    esconde / los ojos no se cierran»), donde las dos tienen que pesar lo
    mismo y no puede una quedar en cursiva pequeña."""
    duro = [t.strip() for t in text.split("\n")]
    while size > 34:
        f = V.cinzel(size)
        L = []
        for t in duro:
            L += _wrap(d, t, f, maxw)
        if len(L) <= max(maxlines, len(duro)):
            return f, L
        size -= 4
    f = V.cinzel(size)
    L = []
    for t in duro:
        L += _wrap(d, t, f, maxw)
    return f, L


def title_layer(text, letra=False, y=300, size=76, color=V.CREAM):
    """Español grande (Cinzel, crema) · hebreo debajo (FrankRuhl con raqm:
    niqud y RTL correctos) · nota al pie (Cormorant cursiva). Placa oscura
    difuminada detrás para que se lea sobre cualquier fondo."""
    es, heb_txt, nota = (text.split("|") + ["", ""])[:3]
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    f, lineas = _fit_wrap(d, es, size, V.W - 150, maxlines=2)
    lh = int(f.size * 1.24)
    yy = y
    for ln in lineas:
        d.text((V.W // 2 + 3, yy + 3), ln, font=f, fill=(0, 0, 0, 175), anchor="ma")
        d.text((V.W // 2, yy), ln, font=f, fill=(*color, 255), anchor="ma")
        yy += lh
    yy = yy - lh + int(f.size * 1.05)

    if heb_txt:
        yy += 34
        d.line([(V.W // 2 - 78, yy), (V.W // 2 + 78, yy)], fill=(*V.GOLD, 190), width=2)
        hf = V.heb(int(size * 0.80))
        d.text((V.W // 2 + 2, yy + 34), heb_txt, font=hf,
               fill=(0, 0, 0, 170), anchor="ma", features=["kern"])
        d.text((V.W // 2, yy + 32), heb_txt, font=hf,
               fill=(*V.GOLDB, 255), anchor="ma", features=["kern"])
        yy = d.textbbox((V.W // 2, yy + 32), heb_txt, font=hf, anchor="ma")[3]

    if nota:
        yy += 30
        d.line([(V.W // 2 - 78, yy), (V.W // 2 + 78, yy)], fill=(*V.GOLD, 170), width=2)
        nf = V.corm_i(46)
        for ln in _wrap(d, nota, nf, V.W - 220):
            d.text((V.W // 2 + 2, yy + 32), ln, font=nf, fill=(0, 0, 0, 185), anchor="ma")
            d.text((V.W // 2, yy + 30), ln, font=nf, fill=(*V.GOLDB, 255), anchor="ma")
            yy += 58

    bb = img.getbbox()
    if bb:
        pad = 70
        caja = (max(0, bb[0] - pad), max(0, bb[1] - pad),
                min(V.W, bb[2] + pad), min(V.H, bb[3] + pad))
        m = Image.new("L", (V.W, V.H), 0)
        ImageDraw.Draw(m).rounded_rectangle(caja, radius=90, fill=155)
        m = m.filter(ImageFilter.GaussianBlur(58))
        plate = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
        plate.putalpha(m)
        img = Image.alpha_composite(plate, img)
    return img


def tag_layer():
    """El micro-rótulo de arriba, en español. Quien ve el reel sin sonido
    sabe el tema en el segundo 1."""
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    f = V.cinzel6(32)
    w = d.textlength(TAG, font=f)
    d.line([(V.W // 2 - w / 2 - 46, 152), (V.W // 2 - w / 2 - 18, 152)],
           fill=(*V.GOLD, 200), width=2)
    d.line([(V.W // 2 + w / 2 + 18, 152), (V.W // 2 + w / 2 + 46, 152)],
           fill=(*V.GOLD, 200), width=2)
    d.text((V.W // 2 + 2, 139), TAG, font=f, fill=(0, 0, 0, 190), anchor="ma")
    d.text((V.W // 2, 137), TAG, font=f, fill=(*V.GOLDB, 240), anchor="ma")
    return img


def build_phrases(words):
    """Corta por puntuación; nunca a mitad de idea."""
    phrases, buf, s = [], [], None
    for wd in words:
        w = wd["w"].rstrip()
        if s is None:
            s = wd["start"]
        buf.append(wd)
        txt = " ".join(x["w"] for x in buf)
        corta = (any(w.endswith(c) for c in [".", "?", "!", "…", ":", ";"])
                 or (w.endswith(",") and len(txt) >= 34)
                 or len(txt) >= 58)
        if corta:
            phrases.append((txt, s, wd["end"]))
            buf, s = [], None
    if buf:
        phrases.append((" ".join(x["w"] for x in buf), s, buf[-1]["end"]))
    return phrases


def prescale(path):
    im = Image.open(path).convert("RGB")
    iw, ih = im.size
    tw, th = int(V.W * 1.18), int(V.H * 1.18)
    s = max(tw / iw, th / ih)
    return im.resize((round(iw * s), round(ih * s)), Image.LANCZOS)


V.prescale      = prescale
V.title_layer   = title_layer
V.build_phrases = build_phrases


# ═══════════════════════════════════════════════════════════════════════
# MONTAJE
# ═══════════════════════════════════════════════════════════════════════
def _scene_bg(ctx, i, t):
    st, en = ctx["bounds"][i], ctx["bounds"][i + 1]
    _, k, z0, z1, pan = V.SCENES[i]
    return V.kenburns(ctx["uniq"][k], (t - st) / max(0.01, en - st), z0, z1, pan)


V._scene_bg = _scene_bg


def build_static():
    tj = json.load(open(V.TIMING))
    dur, words = tj["duration"], tj["words"]
    uniq = {}
    for _, k, *_ in V.SCENES:
        if k not in uniq:
            uniq[k] = prescale(os.path.join(V.IMG, V.BG_FILES[k]))
    return {
        "dur": dur, "uniq": uniq, "scrim": V.make_scrim(),
        "titles": [(title_layer(t, v, y, sz), ti, to)
                   for (t, v, y, sz, ti, to) in V.TITLE_DEFS],
        "subs": [(V.sub_layer(t), s0, e0) for (t, s0, e0) in build_phrases(words)],
        "bounds": [s0 for s0, *_ in V.SCENES] + [dur],
        "vav": None,          # V.VAV_END = -1.0: nunca se dibuja letra encima
        "tag": tag_layer(),
    }


def resolver_fondos(verbose=True):
    faltan = []
    V.BG_FILES = {}
    for k, (real, fb) in BG_SPEC.items():
        if os.path.isfile(os.path.join(V.IMG, real)):
            V.BG_FILES[k] = real
        elif fb and os.path.isfile(os.path.join(V.IMG, fb)):
            V.BG_FILES[k] = fb
            if real not in [f for f, _ in faltan]:
                faltan.append((real, fb))
        else:
            sys.exit(f"Falta {real} en {V.IMG} y no hay provisional.\n"
                     f"Corre primero:  python3 scripts/hester_video.py --placas"
                     f"  y  --provisionales")
    if faltan and verbose:
        print("AVISO — montando con imágenes PROVISIONALES:")
        for real, fb in faltan:
            print(f"   {real:22s} -> por ahora {fb}")
        print("   (los prompts ya están con Mardan en PROMPTS_GPT.txt; cuando"
              "\n    guarde los archivos con esos nombres exactos, volver a correr)")
    return faltan


def build_timeline():
    tj = json.load(open(V.TIMING))
    dur = tj["duration"]
    starts = [s["start"] for s in tj["scenes"]]
    bounds = [0.0] + starts[1:] + [dur]
    assert len(bounds) == len(SCENE_KEYS) + 1, (len(bounds), len(SCENE_KEYS))
    V.SCENES = [(bounds[i], k, z0, z1, pan)
                for i, (k, z0, z1, pan) in enumerate(SCENE_KEYS)]
    V.TITLE_DEFS = [(txt, False, y, sz,
                     starts[t - 1] + off, starts[t - 1] + off + d)
                    for (txt, y, sz, t, off, d) in TITLES]
    return dur, starts


# El compositor de vav_video no conoce el micro-rótulo de arriba.
_compose_base = V.compose
def compose(t, ctx):
    base = _compose_base(t, ctx).convert("RGBA")
    if TAG_IN <= t < TAG_OUT:
        fa = min(V.smooth((t - TAG_IN) / 0.5), V.smooth((TAG_OUT - t) / 0.5))
        l = ctx["tag"].copy()
        l.putalpha(ctx["tag"].getchannel("A").point(lambda v: int(v * fa)))
        base = Image.alpha_composite(base, l)
    return base.convert("RGB")


def test_titulos():
    build_timeline()
    os.makedirs(CHECK, exist_ok=True)
    tag = tag_layer()
    for i, (txt, _, y, sz, ti, to) in enumerate(V.TITLE_DEFS, 1):
        base = Image.new("RGBA", (V.W, V.H), (*V.DARK, 255))
        base = Image.alpha_composite(base, title_layer(txt, False, y, sz))
        if ti < TAG_OUT:
            base = Image.alpha_composite(base, tag)
        base.convert("RGB").save(os.path.join(CHECK, f"rotulo-{i}.png"))
        print(f"  rotulo-{i}.png  [{ti:5.1f}s -> {to:5.1f}s]  {txt[:60]}")
    cols, n = 4, len(V.TITLE_DEFS)
    filas = (n + cols - 1) // cols
    hoja = Image.new("RGB", (V.W // 2 * cols, V.H // 2 * filas), V.DARK)
    for i in range(n):
        im = Image.open(os.path.join(CHECK, f"rotulo-{i+1}.png")).resize((V.W // 2, V.H // 2))
        hoja.paste(im, ((i % cols) * (V.W // 2), (i // cols) * (V.H // 2)))
    hoja.save(os.path.join(CHECK, "rotulos-contacto.png"))
    print(f"\nContacto: {os.path.join(CHECK, 'rotulos-contacto.png')}")


def test_planos():
    """Hoja de contacto con el ENCUADRE real de cada plano (inicio y fin),
    para ver con los ojos que la cámara cuenta lo que debe."""
    resolver_fondos()
    build_timeline()
    os.makedirs(CHECK, exist_ok=True)
    ctx = build_static()
    n = len(V.SCENES)
    hoja = Image.new("RGB", (V.W // 4 * n, V.H // 4 * 2), V.DARK)
    for i, (st, k, *_r) in enumerate(V.SCENES):
        en = ctx["bounds"][i + 1]
        for j, t in enumerate((st, en - 0.05)):
            fr = _scene_bg(ctx, i, t).resize((V.W // 4, V.H // 4))
            hoja.paste(fr, (i * (V.W // 4), j * (V.H // 4)))
    p = os.path.join(CHECK, "planos-contacto.png")
    hoja.save(p)
    print(f"Planos (fila 1 = inicio, fila 2 = fin): {p}")


def test_cuadros():
    """Fotogramas REALES del reel montado (fondo + rótulo + subtítulo), que
    es lo único que prueba de verdad que se entiende sin sonido."""
    resolver_fondos(verbose=False)
    build_timeline()
    os.makedirs(CHECK, exist_ok=True)
    ctx = build_static()
    tj = json.load(open(V.TIMING))
    marcas = [s["start"] + (s["end"] - s["start"]) * 0.60 for s in tj["scenes"]]
    n = len(marcas)
    hoja = Image.new("RGB", (V.W // 4 * 8, V.H // 4 * 2), V.DARK)
    for i, t in enumerate(marcas):
        fr = compose(t, ctx)
        fr.save(os.path.join(CHECK, f"cuadro-T{i+1}.png"))
        hoja.paste(fr.resize((V.W // 4, V.H // 4)),
                   ((i % 8) * (V.W // 4), (i // 8) * (V.H // 4)))
        print(f"  cuadro-T{i+1}.png  t={t:5.2f}s")
    p = os.path.join(CHECK, "cuadros-contacto.png")
    hoja.save(p)
    print(f"\nContacto de cuadros reales: {p}")


def main():
    resolver_fondos()
    dur, _ = build_timeline()
    if os.path.isdir(FRAMES):
        shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)

    print("Construyendo capas estáticas (Hester Panim · el rostro escondido)...")
    ctx = build_static()
    for i, (st, k, *_) in enumerate(V.SCENES):
        print(f"  plano {i+1:>2}  {st:6.2f} -> {ctx['bounds'][i+1]:6.2f}  {k}")
    n = int(ctx["dur"] * V.FPS) + 1
    print(f"Render {n} cuadros ({ctx['dur']:.1f}s)...")
    for fi in range(n):
        compose(fi / V.FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 150 == 0:
            print(f"  {fi}/{n}")

    print("Codificando (voz sola, sin música)...")
    tmp = os.path.join(BUILD, "hester_noend.mp4")
    r = subprocess.run(
        ["ffmpeg", "-y", "-v", "error", "-framerate", str(V.FPS),
         "-i", f"{FRAMES}/f%05d.png", "-i", V.MP3,
         "-c:v", "libx264", "-preset", "slow", "-crf", "18",
         "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest",
         "-movflags", "+faststart", tmp], capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stderr[-1500:]); sys.exit(1)

    print("Añadiendo el end-card oficial del portal...")
    import jashmal_endcard as JE
    JE.ENDCARD_ES = V.ENDCARD_PORTAL
    JE.append_endcard(tmp, lang="es", out_path=SALIDA, hold=2.0, trans=0.6)
    print(f"\nLISTO: {SALIDA}")


if __name__ == "__main__":
    if   "--placas"        in sys.argv: placas()
    elif "--provisionales" in sys.argv: provisionales()
    elif "--test-titulos"  in sys.argv: test_titulos()
    elif "--test-planos"   in sys.argv: test_planos()
    elif "--test-cuadros"  in sys.argv: test_cuadros()
    else: main()
