#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · «Tiempos Sagrados» · YOM KIPUR 5787 · REEL B  —  VERSIÓN 2
«CINCO» — la Torá nunca dice «ayunar»
Vertical 9:16 (1080x1920, 30 fps). Motor: vav_video.py (Ken Burns sobre
imágenes fijas + rótulos PIL + subtítulos quemados sincronizados a la voz
de Martin + end-card oficial del portal).

Publicación: miércoles 16 de septiembre, 9:00 AM (AST).
Voz REAL medida: 89.63 s  ->  reel con end-card ~92.2 s.
Nada hardcodeado: el timeline sale de audio/ykb_timing.json.

════════════════════════════════════════════════════════════════════════
⚠️  AVISO GORDO — ESTE REEL ESTÁ MONTADO CON IMÁGENES PROVISIONALES
════════════════════════════════════════════════════════════════════════
Las seis imágenes definitivas de esta pieza NO EXISTEN todavía:
   f1_rollo.png · f2_cinco_lamparas.png · f3_cinco_marcas.png
   f4_pares.png · f5_la_unica.png · f6_halitos.png
En img/ solo están los provisionales (_prov_*.png) que fabrica este
mismo script: son composiciones geométricas sobre negro, correctas de
paleta pero SIN el grabado de marca. El montaje corre igual y sirve para
aprobar guion, ritmo y rótulos — pero ESTO NO SE PUBLICA ASÍ.

Las imágenes las hace Mardan con GPT (zona suya, no se toca desde aquí).
Los prompts están escritos y listos en PROMPTS-GPT-REEL-B-CINCO.txt.
Cuando guarde los seis archivos con esos nombres exactos en img/, se
vuelve a correr `python3 scripts/ykb_video.py` y quedan incrustadas.

════════════════════════════════════════════════════════════════════════
QUÉ CAMBIÓ RESPECTO A LA VERSIÓN 1
════════════════════════════════════════════════════════════════════════
El guion se rehízo: la pieza abría por una anomalía de texto («la Torá
nunca dice ayunar») que no le decía a un desconocido por qué debía
importarle. Ahora abre por su cuerpo. Las razones completas están en
ykb_voz.py. Para el montaje, lo que cambia es esto:

· HAY TRECE PLANOS, no doce.
· EL REPARTO DE IMÁGENES SE REORDENÓ, y queda mejor encajado que antes:
   - f4_pares (dos manos en espejo) pasa al PLANO 1. Es literalmente lo
     que dice la voz: «mírate las manos».
   - f5_la_unica (el punto solo en el vacío) aparece TRES veces: T2
     abre la pregunta, T9 la contesta con nombre, T13 cierra. Es la
     columna vertebral visual de la pieza.
   - f1_rollo cae ahora justo donde la voz dice «la Torá», que es donde
     siempre debió estar. En la versión 1 abría el reel sin que nadie
     hubiera nombrado la Torá todavía.
· T1 y T2 VAN SIN RÓTULO, igual que en el reel A: la entrada es una
  orden física y un titular encima la convertiría en placa de título.

════════════════════════════════════════════════════════════════════════
EL ARGUMENTO ES VISUAL — SE ENTIENDE SIN SONIDO
════════════════════════════════════════════════════════════════════════
   T1  dos manos en espejo           ] mírate las manos: todo de a dos
   T2  UN SOLO PUNTO en el vacío     ] menos una cosa  ← se abre la pregunta
   T3  cinco lámparas encendidas     ] este domingo empieza Yom Kipur
   T4  rollo cerrado, frío           ] la Torá nunca dice «ayunar»
   T5  el mismo rollo, más cerca     ] dice: «afligirán sus almas»
  ──────── PLACA: LOS CINCO VERSÍCULOS, CONTADOS UNO POR UNO ────────
   T7  cinco marcas talladas         ] de ahí salen las cinco
  ──────── PLACA: LOS CINCO NOMBRES DEL ALMA ────────
   T9  VUELVE el punto solo          ] Yejidá  ← se paga la pregunta
   T10 cinco hálitos subiendo        ] cinco oraciones
  ──────── PLACA: צוֹם = קוֹל = 136 ────────
   T12 los hálitos otra vez          ] el remate
   T13 el punto solo, por última vez ] la nota honesta + guarda esto

El punto solo (T2 → T9 → T13) es el hilo: pregunta, respuesta, sello.
Leídos solos y en orden, los rótulos dicen la enseñanza entera. El único
hebreo en pantalla son palabras SUELTAS (נַפְשֹׁתֵיכֶם, יְחִידָה) y las dos
gematrías: compuestas aquí con FrankRuhl letra por letra, nunca pedidas
a un generador de imagen, que inventa las letras y descoloca el niqud.

Ninguna imagen reusa nada de Rosh Hashaná ni de Elul. Y ninguna se cruza
con el juego del REEL A, que tiene su propio motivo: el nudo.

════════════════════════════════════════════════════════════════════════
GUARDARRAÍLES DEL SOFER QUE ESTE MONTAJE RESPETA
════════════════════════════════════════════════════════════════════════
1. En ningún rótulo ni placa se empareja una abstención concreta con un
   nivel concreto del alma. La placa de los nombres es una lista, no una
   tabla de correspondencias.
2. El mapeo «cinco oraciones = cinco niveles del alma» no aparece: ni en
   voz ni en pantalla, y nunca atribuido al Arizal, que no lo dice.
3. Al Arizal solo se le atribuye lo verificado: aflicciones ↔ oraciones
   y צום = קול (placa T11, con su fuente al pie).
4. El eslabón «cinco abstenciones ↔ cinco nombres» va rotulado como
   lectura nuestra en T13, en pantalla y en voz.

MODO DE EMPLEO
    python3 scripts/ykb_voz.py                    # 1) voz (ya corrida)
    python3 scripts/ykb_video.py --placas         # 2) las tres placas
    python3 scripts/ykb_video.py --provisionales  # 3) fondos provisionales
    python3 scripts/ykb_video.py --test-titulos   # 4) MIRAR los rótulos
    python3 scripts/ykb_video.py --test-cuadros   # 5) MIRAR cuadros reales
    python3 scripts/ykb_video.py                  # 6) montar
"""
import os, sys, json, math, shutil, random, subprocess, unicodedata
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

NDIR   = "/Users/mardan/jashmal-produccion/yom-kipur"
SALIDA = os.path.join(NDIR, "YOM-KIPUR-B-cinco-almas-reel.mp4")
BUILD  = os.path.join(NDIR, "build")
FRAMES = os.path.join(BUILD, "framesB")
CLIPS  = os.path.join(NDIR, "clips")
CLIPFR = os.path.join(BUILD, "clipframesB")

# Este reel va con IMÁGENES FIJAS + Ken Burns (camino barato), no con
# clips de Higgsfield: son siete planos quietos y contemplativos, y el
# movimiento de cámara lento les sienta mejor que el metraje generado.
USAR_CLIPS = False
CHECK  = os.path.join(NDIR, "checkB")

V.IMG    = os.path.join(NDIR, "img")
V.FONTS  = os.path.join(NDIR, "fonts")
V.MP3    = os.path.join(NDIR, "audio", "ykb_voz.mp3")
V.TIMING = os.path.join(NDIR, "audio", "ykb_timing.json")
V.ENDCARD_PORTAL = os.path.join(NDIR, "jashmal_endcard_portal_ES.png")

V.VAV_END = -1.0     # ninguna letra dibujada encima del fondo
V.XF      = 0.50     # fundido entre planos

PW, PH = 1274, 2266  # resolución nativa de las placas (= 1080x1920 x 1.18)

CLIP_SPEC = {}       # sin clips en esta pieza

# clave de plano -> (archivo definitivo, provisional mientras no exista)
BG_SPEC = {
    "pares":      ("f4_pares.png",          "_prov_pares.png"),
    "unica":      ("f5_la_unica.png",       "_prov_unica.png"),
    "lamparas":   ("f2_cinco_lamparas.png", "_prov_lamparas.png"),
    "rollo":      ("f1_rollo.png",          "_prov_rollo.png"),
    "rollo2":     ("f1_rollo.png",          "_prov_rollo.png"),
    "pl_versos":  ("_placa_versiculos.png", None),   # la fabrica este script
    "marcas":     ("f3_cinco_marcas.png",   "_prov_marcas.png"),
    "pl_nombres": ("_placa_nombres.png",    None),   # la fabrica este script
    "unica2":     ("f5_la_unica.png",       "_prov_unica.png"),
    "halitos":    ("f6_halitos.png",        "_prov_halitos.png"),
    "pl_136":     ("_placa_136.png",        None),   # la fabrica este script
    "halitos2":   ("f6_halitos.png",        "_prov_halitos.png"),
    "unica3":     ("f5_la_unica.png",       "_prov_unica.png"),
}

PLACAS = ("pl_versos", "pl_nombres", "pl_136")

SCENE_KEYS = [
    # (clave, z0, z1, pan) — Ken Burns lento; nada de movimientos vistosos.
    ("pares",      1.12, 1.00, (0,   0)),   # T1 · se ABRE: las dos manos
    ("unica",      1.30, 1.04, (0,   0)),   # T2 · se ABRE hacia el punto, que
                                            #      queda solo en el vacío
    ("lamparas",   1.02, 1.16, (0,  20)),   # T3 · situar el día
    ("rollo",      1.14, 1.02, (0,  18)),   # T4 · la Torá: la palabra que no está
    ("rollo2",     1.24, 1.34, (0, -20)),   # T5 · más cerca: «sus almas»
    ("pl_versos",  1.00, 1.05, (0,   0)),   # T6 · la prueba           [placa]
    ("marcas",     1.18, 1.04, (0,  20)),   # T7 · de ahí salen las cinco
    ("pl_nombres", 1.00, 1.04, (0,   0)),   # T8 · los cinco nombres   [placa]
    ("unica2",     1.04, 1.26, (0,   0)),   # T9 · VUELVE el punto, y nos
                                            #      acercamos: ahora tiene nombre
    ("halitos",    1.04, 1.20, (0, -30)),   # T10 · cinco oraciones: sube
    ("pl_136",     1.00, 1.05, (0,   0)),   # T11 · la gematría        [placa]
    ("halitos2",   1.20, 1.36, (0, -40)),   # T12 · el remate: sigue subiendo
    ("unica3",     1.02, 1.22, (0,   0)),   # T13 · el punto solo, por última vez
]

# Rótulos "ESPAÑOL|hebreo|nota".  (texto, y, size, tiempo_de_voz, offset, dur)
# T1 y T2 NO llevan rótulo: la entrada es una orden física («mírate las
# manos») y un titular en Cinzel encima la volvería una placa de título.
# Quien mira sin sonido tiene el micro-rótulo de arriba y el subtítulo.
# T6, T8 y T11 tampoco: las placas SON el rótulo.
TITLES = [
    ("ESTE DOMINGO EMPIEZA YOM KIPUR||el día del perdón · se ayuna veinticinco horas",
                                                        300, 54, 3, 1.6, 5.6),
    ("LA TORÁ NUNCA DICE\n«AYUNAR»||y ese día lo manda cinco veces",
                                                        300, 62, 4, 1.6, 5.0),
    ("«AFLIGIRÁN SUS ALMAS»|נַפְשֹׁתֵיכֶם|almas, en plural",
                                                        300, 60, 5, 0.8, 4.2),
    ("DE AHÍ SALEN\nLAS CINCO ABSTENCIONES||Talmud · Yomá 76a",
                                                        300, 58, 7, 0.3, 2.6),
    ("MENOS UNA|יְחִידָה|Yejidá, «la única»",              300, 70, 9, 0.8, 5.2),
    ("CINCO ORACIONES||el Arizal · Safed, siglo XVI",   300, 68, 10, 1.0, 7.6),
    ("CINCO BOCAS SE CIERRAN\nPARA QUE CINCO VOCES SE ABRAN||",
                                                        300, 54, 12, 0.2, 3.4),
    ("ESTO ES LECTURA NUESTRA\nY LO DECIMOS||verificado: los cinco versículos · los cinco nombres · el Arizal",
                                                        300, 52, 13, 0.4, 5.0),
    ("GUARDA ESTE ESTUDIO||",                           300, 76, 13, 6.2, 2.6),
]

# Rótulo pequeño permanente arriba: quien mira sin sonido sabe el tema en
# el segundo 1. La voz dice «Yom Kipur» en el 2,4.
TAG      = "TIEMPOS SAGRADOS · YOM KIPUR"
TAG_IN, TAG_OUT = 0.3, 10.4


# ═══════════════════════════════════════════════════════════════════════
# PLACAS TIPOGRÁFICAS  (T4 y T7) — tipografía sobre negro, generada de cero
# ═══════════════════════════════════════════════════════════════════════
def _racimos(palabra):
    """Parte una palabra hebrea en [consonante + sus niqud], para poder
    dibujarla letra por letra sin que se pierdan los puntos vocálicos."""
    out = []
    for ch in palabra:
        if unicodedata.combining(ch) and out:
            out[-1] += ch
        else:
            out.append(ch)
    return out


def _fondo_placa(seed=7, glow=None):
    """Negro con grano finísimo y una viñeta dorada muy tenue. Sin esto la
    placa se ve como un PowerPoint; con esto respira como el resto del reel."""
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


def _fila_hebrea(img, d, letras, ytop, fh_size=136, fn_size=52):
    """Dibuja una palabra hebrea letra por letra de DERECHA a IZQUIERDA con
    su valor numérico debajo y los «+» entre las cifras.

    Se hace así, y no con un d.text() de la palabra entera, por dos razones:
    los generadores de imagen inventan las letras hebreas, y PIL con una
    cadena RTL larga puede invertir el orden. Letra por letra, el orden lo
    decidimos nosotros. Y los «+» son imprescindibles: la audiencia no lee
    hebreo, y sin ellos «40 6 90» no se ve como una suma."""
    fh, fn = V.heb(fh_size), V.cinzel(fn_size)
    anchos = [max(d.textlength(l, font=fh), d.textlength(n, font=fn)) + 76
              for l, n in letras]
    x = (PW + sum(anchos)) / 2          # borde derecho: el hebreo empieza aquí
    centros = []
    for (l, n), w in zip(letras, anchos):
        x -= w
        cx = x + w / 2
        centros.append(cx)
        halo = Image.new("RGBA", (PW, PH), (0, 0, 0, 0))
        ImageDraw.Draw(halo).text((cx, ytop), l, font=fh,
                                  fill=(*V.GOLDB, 150), anchor="ma")
        img.alpha_composite(halo.filter(ImageFilter.GaussianBlur(22)))
        d.text((cx, ytop), l, font=fh, fill=(*V.CREAM, 255), anchor="ma",
               features=["kern"])
        d.text((cx, ytop + 196), n, font=fn, fill=(*V.GOLDB, 255), anchor="ma")
    fp = V.cinzel(36)
    for a, b in zip(centros, centros[1:]):
        d.text(((a + b) / 2, ytop + 206), "+", font=fp,
               fill=(*V.GOLD, 200), anchor="ma")


def placa_versiculos():
    """SELLO DE DATO VERIFICADO (a). Los cinco versículos, citados uno por
    uno, para que se pueda ir a comprobarlos. Es la placa que más se
    guarda de la pieza, junto con la de los nombres: una lista de cinco
    referencias no se retiene de una pasada.

    Fuente del cinco: Talmud, Yomá 76a (Rav Jisdá). Los cinco versículos
    los verificó el Sofer uno por uno contra Sefaria el 14-09-2026: los
    cinco dicen וְעִנִּיתֶם אֶת נַפְשֹׁתֵיכֶם / תְּעַנּוּ אֶת נַפְשֹׁתֵיכֶם."""
    img = _fondo_placa(seed=13, glow=(PW // 2, 1180, 760, 30))
    d = ImageDraw.Draw(img)

    # OJO: todo el contenido termina antes de y=1830. Por debajo va la
    # banda de subtítulos quemados, y si una placa baja más, el pie de
    # fuente queda pisado por la voz (comprobado en checkB/cuadro-T6).
    d.text((PW // 2, 360), "F U I M O S   A   C O N T A R L O S",
           font=V.cinzel6(40), fill=(*V.GOLD, 230), anchor="ma")

    citas = ["BAMIDBAR 29:7", "VAIKRÁ 23:27", "VAIKRÁ 23:32",
             "VAIKRÁ 16:31", "VAIKRÁ 16:29"]
    f = V.cinzel(62)
    y = 580
    for c in citas:
        d.text((PW // 2 + 2, y + 3), c, font=f, fill=(0, 0, 0, 170), anchor="ma")
        d.text((PW // 2, y), c, font=f, fill=(*V.CREAM, 255), anchor="ma")
        y += 128

    d.line([(PW // 2 - 300, 1268), (PW // 2 + 300, 1268)],
           fill=(*V.GOLD, 170), width=2)

    d.text((PW // 2, 1324), "L O S   C I N C O   D I C E N",
           font=V.cinzel6(42), fill=(*V.GOLD, 235), anchor="ma")
    d.text((PW // 2, 1414), "«SUS ALMAS»", font=V.cinzel(104),
           fill=(*V.CREAM, 255), anchor="ma")

    # Una sola palabra hebrea: sin riesgo de que se invierta el orden.
    hb = V.heb(92)
    d.text((PW // 2, 1566), "נַפְשֹׁתֵיכֶם", font=hb, fill=(*V.GOLDB, 255),
           anchor="ma", features=["kern"])

    d.text((PW // 2, 1730), "almas, en plural", font=V.corm_i(54),
           fill=(*V.GOLD, 235), anchor="ma")
    d.text((PW // 2, 1826), "T A L M U D  ·  Y O M Á   7 6 a",
           font=V.cinzel6(34), fill=(*V.GOLDB, 210), anchor="ma")

    p = os.path.join(V.IMG, "_placa_versiculos.png")
    img.convert("RGB").save(p)
    return p


def placa_nombres():
    """ESTRUCTURA ENUMERABLE. Los cinco nombres del alma con la definición
    del Midrash, que es lo que el espectador vuelve a leer.

    SIN HEBREO a propósito: la audiencia no lo lee y aquí hay cinco filas;
    el hebreo las volvería ilegibles. El hebreo vive en las otras dos
    placas, donde ES el argumento.

    NÉFESH: el Midrash lo define como «esta es la sangre» (de Devarim
    12:23). Se usa la glosa del estudio —«la que se confunde con el
    cuerpo»— y se OMITE la palabra: el léxico de sangre activa en la
    audiencia nueva un guion que no es el nuestro. Omitir no es falsear.

    YEJIDÁ va destacada en crema y con más cuerpo: es el corazón del reel.
    Y NO hay ninguna columna de correspondencias: emparejar un nombre con
    una abstención concreta está prohibido por el Sofer."""
    img = _fondo_placa(seed=17, glow=(PW // 2, 1500, 700, 28))
    d = ImageDraw.Draw(img)

    d.text((PW // 2, 300), "L O S   C I N C O   N O M B R E S",
           font=V.cinzel6(40), fill=(*V.GOLD, 230), anchor="ma")
    d.text((PW // 2, 376), "D E L   A L M A",
           font=V.cinzel6(40), fill=(*V.GOLD, 230), anchor="ma")

    filas = [
        ("NÉFESH",  "la que se confunde con el cuerpo",      False),
        ("RÚAJ",    "«porque sube y baja»",                  False),
        ("NESHAMÁ", "el entendimiento",                      False),
        ("JAYÁ",    "«todos los miembros mueren, y ella vive»", False),
        ("YEJIDÁ",  "«la única que está sola en el cuerpo»", True),
    ]
    y = 560
    for nombre, defi, destacada in filas:
        fn = V.cinzel(74 if destacada else 60)
        col = V.CREAM if destacada else V.GOLDB
        d.text((PW // 2 + 2, y + 3), nombre, font=fn, fill=(0, 0, 0, 170), anchor="ma")
        d.text((PW // 2, y), nombre, font=fn, fill=(*col, 255), anchor="ma")
        fd = V.corm_i(46)
        for j, ln in enumerate(_wrap(d, defi, fd, PW - 220)):
            d.text((PW // 2, y + 96 + j * 54), ln, font=fd,
                   fill=(*V.GOLD, 235), anchor="ma")
        y += 258

    d.text((PW // 2, 1820), "M I D R A S H  ·  B E R E S H I T   R A B Á   1 4 : 9",
           font=V.cinzel6(30), fill=(*V.GOLDB, 210), anchor="ma")

    p = os.path.join(V.IMG, "_placa_nombres.png")
    img.convert("RGB").save(p)
    return p


def placa_136():
    """SELLO DE DATO VERIFICADO (b).  צוֹם (ayuno) = 136 = קוֹל (voz).

    Recalculado letra por letra por el Sofer: צ90+ו6+ם40 = 136 y
    ק100+ו6+ל30 = 136. La equivalencia es del Arizal (Sháar HaKavanot,
    Derushei Yom HaKipurim), y eso SÍ se le atribuye porque está
    verificado en fuente primaria — a diferencia del mapeo de las cinco
    oraciones con los niveles del alma, que no aparece en esta pieza."""
    img = _fondo_placa(seed=29, glow=(PW // 2, 1140, 780, 32))
    d = ImageDraw.Draw(img)

    d.text((PW // 2, 300), "C A D A   L E T R A   V A L E   U N   N Ú M E R O",
           font=V.cinzel6(36), fill=(*V.GOLD, 225), anchor="ma")

    # ── צוֹם = 136  (ayuno)
    _fila_hebrea(img, d, [("צ", "90"), ("וֹ", "6"), ("ם", "40")], 470)
    d = ImageDraw.Draw(img)
    d.text((PW // 2, 790), "T Z O M   =   1 3 6", font=V.cinzel(88),
           fill=(*V.CREAM, 255), anchor="ma")
    d.text((PW // 2, 912), "«ayuno»", font=V.corm_i(54),
           fill=(*V.GOLD, 235), anchor="ma")

    d.line([(PW // 2 - 290, 1024), (PW // 2 + 290, 1024)],
           fill=(*V.GOLD, 170), width=2)

    # ── קוֹל = 136  (voz)
    _fila_hebrea(img, d, [("ק", "100"), ("וֹ", "6"), ("ל", "30")], 1110)
    d = ImageDraw.Draw(img)
    d.text((PW // 2, 1430), "K O L   =   1 3 6", font=V.cinzel(88),
           fill=(*V.CREAM, 255), anchor="ma")
    d.text((PW // 2, 1552), "«voz»", font=V.corm_i(54),
           fill=(*V.GOLD, 235), anchor="ma")

    d.text((PW // 2, 1660), "E L   M I S M O   N Ú M E R O",
           font=V.cinzel6(44), fill=(*V.GOLDB, 240), anchor="ma")
    d.text((PW // 2, 1758), "recalculado letra por letra",
           font=V.corm_i(44), fill=(*V.GOLD, 220), anchor="ma")
    d.text((PW // 2, 1850), "A R I Z A L  ·  S H Á A R   H A K A V A N O T",
           font=V.cinzel6(30), fill=(*V.GOLDB, 210), anchor="ma")

    p = os.path.join(V.IMG, "_placa_136.png")
    img.convert("RGB").save(p)
    return p


# ═══════════════════════════════════════════════════════════════════════
# PROVISIONALES — para poder montar y aprobar el reel HOY, sin esperar a GPT
# ═══════════════════════════════════════════════════════════════════════
def _prov(nombre, seed, glow, forma=None):
    """Fondo provisional para poder montar y APROBAR el reel hoy, sin
    esperar a que Mardan genere las imágenes. Cada provisional imita la
    COMPOSICIÓN del plano definitivo (dónde cae la luz, cuánto negro hay)
    para que el ritmo y la legibilidad de los rótulos se puedan juzgar de
    verdad. Llevan marca de agua: nunca se publica un reel con estos."""
    img = _fondo_placa(seed=seed, glow=glow)
    cap = Image.new("L", (PW, PH), 0)
    dd = ImageDraw.Draw(cap)
    if forma == "rollo":                      # un vertical solo, centrado
        dd.rounded_rectangle([PW // 2 - 96, 760, PW // 2 + 96, 1480],
                             radius=90, fill=130)
        img.alpha_composite(_calido(cap.filter(ImageFilter.GaussianBlur(46))))
    elif forma == "cinco_puntos":             # cinco llamas en fila
        for i in range(5):
            cx = PW // 2 + (i - 2) * 190
            dd.ellipse([cx - 34, 1340, cx + 34, 1418], fill=210)
        img.alpha_composite(_calido(cap.filter(ImageFilter.GaussianBlur(26))))
    elif forma == "cinco_marcas":             # cinco incisiones verticales
        for i in range(5):
            cx = PW // 2 + (i - 2) * 132
            dd.rounded_rectangle([cx - 13, 980, cx + 13, 1300], radius=13, fill=185)
        img.alpha_composite(_calido(cap.filter(ImageFilter.GaussianBlur(14))))
    elif forma == "pares":                    # dos formas en espejo
        for sgn in (-1, 1):
            cx = PW // 2 + sgn * 270
            dd.ellipse([cx - 130, 1010, cx + 130, 1330], fill=150)
        img.alpha_composite(_calido(cap.filter(ImageFilter.GaussianBlur(40))))
    elif forma == "unica":                    # UN punto diminuto y nada más
        dd.ellipse([PW // 2 - 15, 1118, PW // 2 + 15, 1148], fill=255)
        img.alpha_composite(_crema(cap.filter(ImageFilter.GaussianBlur(7))))
        halo = Image.new("L", (PW, PH), 0)
        ImageDraw.Draw(halo).ellipse([PW // 2 - 110, 1023, PW // 2 + 110, 1243],
                                     fill=54)
        img.alpha_composite(_calido(halo.filter(ImageFilter.GaussianBlur(76))))
    elif forma == "halitos":                  # cinco hilos que suben
        for i in range(5):
            cx = PW // 2 + (i - 2) * 150
            dd.rounded_rectangle([cx - 9, 900 + i * 40, cx + 9, 1560],
                                 radius=9, fill=120)
        img.alpha_composite(_calido(cap.filter(ImageFilter.GaussianBlur(30))))
    d = ImageDraw.Draw(img)
    # Muy abajo, por debajo de la banda de subtítulos, para no estorbar.
    d.text((PW // 2, PH - 78), "IMAGEN PROVISIONAL", font=V.cinzel6(26),
           fill=(*V.GOLD, 105), anchor="ma")
    p = os.path.join(V.IMG, nombre)
    img.convert("RGB").save(p)
    return p


def _tint(cap, rgb):
    l = Image.new("RGBA", (PW, PH), (*rgb, 255)); l.putalpha(cap); return l
def _azul(cap):   return _tint(cap, (60, 78, 118))
def _crema(cap):  return _tint(cap, (238, 232, 210))
def _calido(cap): return _tint(cap, (255, 200, 118))


def provisionales():
    os.makedirs(V.IMG, exist_ok=True)
    for n, s, g, f in [
        ("_prov_rollo.png",    3,  (PW // 2, 1120, 620, 26), "rollo"),
        ("_prov_lamparas.png", 5,  (PW // 2, 1390, 700, 30), "cinco_puntos"),
        ("_prov_marcas.png",   7,  (PW // 2, 1140, 640, 26), "cinco_marcas"),
        ("_prov_pares.png",    9,  (PW // 2, 1170, 720, 24), "pares"),
        ("_prov_unica.png",    11, (PW // 2, 1130, 900, 14), "unica"),
        ("_prov_halitos.png",  13, (PW // 2, 1240, 680, 28), "halitos"),
    ]:
        print("  provisional ->", _prov(n, s, g, f))


def placas():
    os.makedirs(V.IMG, exist_ok=True)
    print("  placa ->", placa_versiculos())
    print("  placa ->", placa_nombres())
    print("  placa ->", placa_136())


# ═══════════════════════════════════════════════════════════════════════
# RÓTULOS
# ═══════════════════════════════════════════════════════════════════════
def _wrap(d, text, font, maxw):
    linhas, cur = [], ""
    for p in text.split():
        t = (cur + " " + p).strip()
        if d.textlength(t, font=font) <= maxw or not cur:
            cur = t
        else:
            linhas.append(cur); cur = p
    if cur:
        linhas.append(cur)
    return linhas


def _fit_wrap(d, text, size, maxw, maxlines=2):
    """Baja el cuerpo hasta que el rótulo quepa en maxlines. Los rótulos
    largos del reel 2 se encogían a ilegible; aquí parten línea.
    Un "\n" en el texto fuerza el corte: sirve para las frases de dos
    mitades («no es para castigarse / es para entender»), donde las dos
    tienen que pesar lo mismo y no puede una quedar en cursiva pequeña."""
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
    """Español grande (Cinzel, crema, con salto de línea) · hebreo debajo
    (FrankRuhl con raqm: niqud y RTL correctos) · nota al pie (Cormorant
    cursiva). Placa oscura difuminada detrás para que se lea sobre
    cualquier fondo."""
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
    """El micro-rótulo de arriba. Nombra el tema en el segundo 1 para quien
    ve el reel sin sonido."""
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    f = V.cinzel6(34)
    w = d.textlength(TAG, font=f)
    d.line([(V.W // 2 - w / 2 - 46, 152), (V.W // 2 - w / 2 - 18, 152)],
           fill=(*V.GOLD, 200), width=2)
    d.line([(V.W // 2 + w / 2 + 18, 152), (V.W // 2 + w / 2 + 46, 152)],
           fill=(*V.GOLD, 200), width=2)
    d.text((V.W // 2 + 2, 139), TAG, font=f, fill=(0, 0, 0, 190), anchor="ma")
    d.text((V.W // 2, 137), TAG, font=f, fill=(*V.GOLDB, 240), anchor="ma")
    return img


def build_phrases(words):
    """Corta por puntuación; nunca a mitad de idea. Las frases del guion son
    cortas a propósito, así que casi siempre cae una frase por tarjeta."""
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
# MOTOR DE CLIPS — reparto de tramos, ralentizado y extracción
# ═══════════════════════════════════════════════════════════════════════
def _dur_clip(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries",
                        "format=duration", "-of", "default=nw=1:nk=1", path],
                       capture_output=True, text=True)
    return float(r.stdout.strip())


def plan_clips(bounds):
    """Reparte el metraje de cada clip entre los planos que lo usan.

    Devuelve {grupo: {"src", "natural", "ratio", "objetivo",
                      "tramos": {clave: inicio_en_el_clip_ralentizado}}}

    La regla: un clip NUNCA se acelera y NUNCA se congela. Si los planos
    que lo usan piden más metraje del que tiene, se RALENTIZA con setpts
    lo justo para cubrirlos (son travellings muy lentos: no se nota). Si
    piden menos, se deja a velocidad natural y sobra cola.
    """
    grupos = {}
    for i, (k, *_rest) in enumerate(SCENE_KEYS):
        if k not in CLIP_SPEC:
            continue
        src, g = CLIP_SPEC[k]
        d = bounds[i + 1] - bounds[i]
        grupos.setdefault(g, {"src": src, "planos": []})["planos"].append((k, d))

    plan = {}
    for g, info in grupos.items():
        path = os.path.join(CLIPS, info["src"])
        if not os.path.isfile(path):
            sys.exit(f"Falta el clip {path}")
        natural = _dur_clip(path)
        n = len(info["planos"])
        # metraje pedido + el hueco entre tramos + un colchón de cola para
        # que el fundido al plano siguiente nunca se quede sin fotograma
        pedido = sum(d for _, d in info["planos"]) + HUECO_TRAMOS * (n - 1) + 0.35
        objetivo = max(pedido, natural)
        ratio = objetivo / natural
        tramos, cursor = {}, 0.0
        for k, d in info["planos"]:
            tramos[k] = cursor
            cursor += d + HUECO_TRAMOS
        # Si hay UN SOLO tramo, se usa el clip desde el principio.
        # Si hay DOS, el segundo se empuja hasta el FINAL del clip para que
        # el travelling haya avanzado de verdad entre un plano y otro.
        if n == 2:
            k2, d2 = info["planos"][1]
            tramos[k2] = max(tramos[k2], objetivo - d2 - 0.30)
        plan[g] = {"src": info["src"], "path": path, "natural": natural,
                   "objetivo": objetivo, "ratio": ratio, "tramos": tramos,
                   "planos": info["planos"]}
    return plan


def preparar_clips(plan, verbose=True):
    """Extrae cada clip a fotogramas JPEG a 30 fps, ya ralentizado.

    Se hace por fotogramas y no leyendo el vídeo al vuelo porque el
    compositor pide instantes sueltos y en desorden (los fundidos miran
    hacia delante); con una carpeta de fotogramas eso es un acceso directo
    y el render es reproducible."""
    os.makedirs(CLIPFR, exist_ok=True)
    for g, p in plan.items():
        d = os.path.join(CLIPFR, g)
        n_esperados = int(p["objetivo"] * V.FPS) + 2
        if os.path.isdir(d) and len(os.listdir(d)) >= n_esperados:
            p["dir"], p["n"] = d, len(os.listdir(d))
            if verbose:
                print(f"  {p['src']:18s} ya extraído ({p['n']} cuadros)")
            continue
        if os.path.isdir(d):
            shutil.rmtree(d)
        os.makedirs(d)
        # Cuando la ralentización es fuerte, duplicar fotogramas se ve como
        # TIRÓN. Medido en el clip de la puerta (x1,63): la mitad de los
        # cuadros salían congelados. Con interpolación de movimiento bajan a
        # cero y el travelling avanza parejo, sin deformar los bordes.
        # Por debajo de ese umbral NO se interpola: la cadencia de 24 fps es
        # la que da el aire de cine, y suavizarla lo volvería vídeo casero.
        interpolar = p["ratio"] >= UMBRAL_INTERPOLAR
        paso_fps = (f"minterpolate=fps={V.FPS}:mi_mode=mci:mc_mode=aobmc:"
                    f"me_mode=bidir:vsbmc=1") if interpolar else f"fps={V.FPS}"
        vf = (f"setpts={p['ratio']:.6f}*PTS,{paso_fps},"
              f"scale={V.W}:{V.H}:force_original_aspect_ratio=increase,"
              f"crop={V.W}:{V.H}")
        if verbose:
            print(f"  {p['src']:18s} {p['natural']:.2f}s -> {p['objetivo']:.2f}s "
                  f"(x{p['ratio']:.3f})"
                  f"{'  + interpolación de movimiento' if interpolar else ''}"
                  f"  extrayendo...")
        r = subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", p["path"],
                            "-vf", vf, "-q:v", "2", f"{d}/c%05d.jpg"],
                           capture_output=True, text=True)
        if r.returncode != 0:
            print(r.stderr[-1200:]); sys.exit(1)
        p["dir"], p["n"] = d, len(os.listdir(d))
        if verbose:
            print(f"  {p['src']:18s} {p['n']} cuadros en {d}")
    return plan


def _clip_frame(ctx, clave, t_rel):
    """Fotograma del clip para el plano `clave`, a t_rel segundos de que
    empiece ese plano."""
    g = CLIP_SPEC[clave][1]
    p = ctx["clips"][g]
    idx = int(round((p["tramos"][clave] + max(0.0, t_rel)) * V.FPS)) + 1
    idx = max(1, min(p["n"], idx))
    return Image.open(os.path.join(p["dir"], f"c{idx:05d}.jpg")).convert("RGB")


def _scene_bg(ctx, i, t):
    """Fondo de un plano. Clip -> fotograma del clip (sin Ken Burns, ya trae
    su movimiento). Placa tipográfica -> Ken Burns sobre el PNG, como antes."""
    st, en = ctx["bounds"][i], ctx["bounds"][i + 1]
    _, k, z0, z1, pan = V.SCENES[i]
    if ctx.get("clips") and k in CLIP_SPEC:
        return _clip_frame(ctx, k, t - st)
    return V.kenburns(ctx["uniq"][k], (t - st) / max(0.01, en - st), z0, z1, pan)


V._scene_bg = _scene_bg


def build_static():
    """Como el de vav_video, pero solo pre-escala las PLACAS: los planos de
    clip no tienen PNG que pre-escalar."""
    tj = json.load(open(V.TIMING))
    dur, words = tj["duration"], tj["words"]
    uniq = {}
    for _, k, *_ in V.SCENES:
        if k in uniq:
            continue
        if USAR_CLIPS and k in CLIP_SPEC:
            continue
        uniq[k] = prescale(os.path.join(V.IMG, V.BG_FILES[k]))
    ctx = {
        "dur": dur, "uniq": uniq, "scrim": V.make_scrim(),
        "titles": [(title_layer(t, v, y, sz), ti, to)
                   for (t, v, y, sz, ti, to) in V.TITLE_DEFS],
        "subs": [(V.sub_layer(t), s0, e0) for (t, s0, e0) in build_phrases(words)],
        "bounds": [s0 for s0, *_ in V.SCENES] + [dur],
        "vav": None,          # V.VAV_END = -1.0: nunca se dibuja letra encima
        "tag": tag_layer(),
    }
    if USAR_CLIPS:
        ctx["clips"] = preparar_clips(plan_clips(ctx["bounds"]))
    return ctx


def resolver_fondos(verbose=True):
    """Con USAR_CLIPS solo hacen falta las dos placas tipográficas; los
    otros cinco planos salen de los clips. Sin clips, se exige todo el
    juego de PNG (definitivos o provisionales), que es el camino antiguo."""
    faltan = []
    V.BG_FILES = {}
    necesarios = {k: v for k, v in BG_SPEC.items()
                  if (k in PLACAS or not USAR_CLIPS)}
    for k, (real, fb) in necesarios.items():
        if os.path.isfile(os.path.join(V.IMG, real)):
            V.BG_FILES[k] = real
        elif fb and os.path.isfile(os.path.join(V.IMG, fb)):
            V.BG_FILES[k] = fb
            if real not in [f for f, _ in faltan]:
                faltan.append((real, fb))
        else:
            sys.exit(f"Falta {real} en {V.IMG} y no hay provisional.\n"
                     f"Corre primero:  python3 scripts/ykb_video.py --placas"
                     f"  y  --provisionales")
    if faltan and verbose:
        print("AVISO — montando con imágenes PROVISIONALES:")
        for real, fb in faltan:
            print(f"   {real:24s} -> por ahora {fb}")
        print("   (los prompts están en PROMPTS-GPT-REEL-B-CINCO.txt; cuando Mardan"
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


# El compositor de vav_video no conoce el micro-rótulo de arriba; se le
# añade envolviendo compose().
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
        print(f"  rotulo-{i}.png  [{ti:5.1f}s -> {to:5.1f}s]  {txt}")
    cols, n = 3, len(V.TITLE_DEFS)
    filas = (n + cols - 1) // cols
    hoja = Image.new("RGB", (V.W // 2 * cols, V.H // 2 * filas), V.DARK)
    for i in range(n):
        im = Image.open(os.path.join(CHECK, f"rotulo-{i+1}.png")).resize((V.W // 2, V.H // 2))
        hoja.paste(im, ((i % cols) * (V.W // 2), (i // cols) * (V.H // 2)))
    hoja.save(os.path.join(CHECK, "rotulos-contacto.png"))
    print(f"\nContacto: {os.path.join(CHECK, 'rotulos-contacto.png')}")


def test_planos():
    """Hoja de contacto con el ENCUADRE real de cada plano (inicio y fin),
    para ver con los ojos que la cámara cuenta lo que debe y que los dos
    tramos del mismo clip son de verdad distintos."""
    resolver_fondos()
    build_timeline()
    os.makedirs(CHECK, exist_ok=True)
    ctx = build_static()
    hoja = Image.new("RGB", (V.W // 3 * 7, V.H // 3 * 2), V.DARK)
    for i, (st, k, *_r) in enumerate(V.SCENES):
        en = ctx["bounds"][i + 1]
        for j, t in enumerate((st, en - 0.05)):
            fr = _scene_bg(ctx, i, t).resize((V.W // 3, V.H // 3))
            hoja.paste(fr, (i * (V.W // 3), j * (V.H // 3)))
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
    marcas = [s["start"] + (s["end"] - s["start"]) * 0.55 for s in tj["scenes"]]
    hoja = Image.new("RGB", (V.W // 3 * 7, V.H // 3), V.DARK)
    for i, t in enumerate(marcas):
        fr = compose(t, ctx)
        fr.save(os.path.join(CHECK, f"cuadro-T{i+1}.png"))
        hoja.paste(fr.resize((V.W // 3, V.H // 3)), (i * (V.W // 3), 0))
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

    print("Construyendo capas estáticas (Yom Kipur · reel B «Cinco»)...")
    ctx = build_static()
    for i, (st, k, *_) in enumerate(V.SCENES):
        print(f"  plano {i+1}  {st:6.2f} -> {ctx['bounds'][i+1]:6.2f}  {k}")
    n = int(ctx["dur"] * V.FPS) + 1
    print(f"Render {n} cuadros ({ctx['dur']:.1f}s)...")
    for fi in range(n):
        compose(fi / V.FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 150 == 0:
            print(f"  {fi}/{n}")

    print("Codificando (voz sola, sin música)...")
    tmp = os.path.join(BUILD, "ykb_noend.mp4")
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
