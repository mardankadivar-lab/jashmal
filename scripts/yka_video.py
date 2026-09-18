#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · «Tiempos Sagrados» · YOM KIPUR 5787 · REEL A  —  VERSIÓN 2
«LA PROMESA QUE TE HICISTE» — Kol Nidrei desata los nudos que tú mismo ataste
Vertical 9:16 (1080x1920, 30 fps). Motor: vav_video.py (Ken Burns sobre
imágenes fijas + rótulos PIL + subtítulos quemados sincronizados a la voz
de Martin + end-card oficial del portal).

Publicación: MIÉRCOLES 16 de septiembre (se adelantó el 15-09; antes iba
el domingo 20). Yom Kipur entra el domingo 20 al ponerse el sol.

LA PIEZA NO DEPENDE DEL DÍA EN QUE SE PUBLIQUE: ni un rótulo, ni el
guion, ni la portada dicen «hoy» ni «esta tarde». Todo se ancla al
domingo, así que sirve el miércoles, el jueves o el domingo por la
mañana sin volver a montarla.

Voz REAL medida: 86.10 s  ->  reel con end-card ~88.7 s.
(La versión 1 duraba 102.7 s. Se acortó quitándole la segunda tesis.)
Nada hardcodeado: el timeline sale de audio/yka_timing.json.

════════════════════════════════════════════════════════════════════════
QUÉ CAMBIÓ RESPECTO A LA VERSIÓN 1, Y POR QUÉ
════════════════════════════════════════════════════════════════════════
Mardan rechazó la versión 1: «no está claro el mensaje; empieza de
repente de un lugar». El guion se rehízo entero (razones en yka_voz.py).
Para el montaje, lo que hay que saber es esto:

· SALIERON CINCO PLANOS. Los tiempos del gálbano, el incienso y la
  pelea de los gueonim eran una segunda tesis injertada. Se fueron
  enteros a RESERVA-transgresores.txt, con sus rótulos y sus fuentes.
  Con ellos salen del reel las imágenes a3_cerrojo y a4_once_granos,
  que quedan RESERVADAS para esa pieza futura.
· EL NUDO PASÓ DE ADORNO A ARGUMENTO. Ginsburgh: «anular mis votos
  significa desatar todos los nudos que yo mismo até». Las tres imágenes
  de cuerda que Mardan ya había generado son ahora la columna vertebral.
· LOS DOS PRIMEROS PLANOS VAN SIN RÓTULO, a propósito. La entrada es
  emocional («piensa en una promesa que te hiciste») y un titular en
  Cinzel encima la convertiría en placa de título. Quien mira sin sonido
  tiene el micro-rótulo de arriba (TAG, hasta el segundo 9) y el
  subtítulo quemado. A partir de T3 vuelven los rótulos.

════════════════════════════════════════════════════════════════════════
EL ARGUMENTO ES VISUAL — ATAR · DESATAR · LO QUE SIGUE ATADO
════════════════════════════════════════════════════════════════════════
   T1  el nudo apretado, sobre negro   ] tu promesa
   T2  el mismo, más cerca             ] todos tenemos una
   T3  muro con la última luz del día  ] este domingo, al caer el sol
   T4  tres siluetas ante el resplandor] tres hombres formando tribunal
  ──────── PLACA: NO ES UNA ORACIÓN · כָּל נִדְרֵי · ES UN ACTA ────────
   T6  las tres siluetas, más cerca    ] no desatan tus pecados
  ──────── PLACA: QUÉ ES UNA PROMESA · Números 30:3 ────────
   T8  escalones que suben a la luz    ] eran buenas promesas
   T9  el nudo VENCIDO, cabos sueltos  ] desatar lo que tú mismo ataste
   T10 el nudo APRETADO a la argolla   ] lo que NO desata
   T11 el mismo, más cerca             ] ve a buscarla: hasta el domingo
   T12 el mismo, el más cerca          ] la excepción es la gente

LA PAREJA QUE SOSTIENE LA PIEZA es T9 / T10: la misma cuerda, la misma
luz — una suelta y la otra tensa contra el hierro. Si el espectador solo
se queda con esos dos planos, ya entendió el reel entero.
Y hay un eco deliberado entre el principio y el final: T1-T2 es un nudo
apretado flotando en negro (la promesa que te hiciste a ti mismo) y
T10-T12 es un nudo apretado A UNA ARGOLLA, clavado en piedra (lo que le
debes a otra persona). Se parecen, y la diferencia es el argumento.

════════════════════════════════════════════════════════════════════════
IMÁGENES — SEIS DE LAS OCHO QUE YA EXISTEN (generadas por Mardan)
════════════════════════════════════════════════════════════════════════
  a8_portada_fondo.png       el nudo apretado sobre negro   -> T1 y T2
  a2_ultima_luz.png          muro y el último filo del sol  -> T3
  a1_tres.png                tres siluetas de espaldas      -> T4 y T6
  a5_escalones.png           escalones gastados             -> T8
  a6_nudo_suelto.png         el nudo deshecho               -> T9
  a7_la_que_sigue_atada.png  el nudo atado a la argolla     -> T10, T11, T12

  a3_cerrojo.png       ] NO se usan aquí. Reservadas para el reel de los
  a4_once_granos.png   ] transgresores (RESERVA-transgresores.txt).

a8 era la imagen de PORTADA y ahora abre además el montaje: el primer
fotograma del reel es lo mismo que se vio en el feed. Eso es continuidad,
no repetición. La portada se rehace igual a partir de a8.

Las imágenes vienen a 941x1672, por debajo de 1080x1920: el motor las
sube a 1274x2266 (x1.35). No se nota en un teléfono, pero si alguna vez
se rehacen, pedirlas a 1080x1920 o más.

════════════════════════════════════════════════════════════════════════
GUARDARRAÍLES DEL SOFER QUE ESTE MONTAJE RESPETA
════════════════════════════════════════════════════════════════════════
· Ginsburgh aparece como FUENTE CONTEMPORÁNEA y con su nombre completo
  al pie del rótulo de T9, nunca mezclado con Rashi ni con el Talmud.
· Ningún rótulo dice ni insinúa que Kol Nidrei anule juramentos hechos a
  otras personas. Los tres últimos dicen exactamente lo contrario, con
  fuente: Tur 619 y Mishná Yomá 8:9.
· No hay gematría de כל נדרי: la cuenta es correcta, la interpretación
  es nuestra y no tiene fuente, así que no va a redes.
· No se usa el dato de los 130 lámeds de Vayélej (el Sofer contó 131).
· «Torre que flota en el aire» no aparece: si algún día entra, va
  rotulada como lectura cabalística, no como pshat.
· No se entra por Vaikrá 16 ni se usa léxico de sangre o expiación.

QUÉ SE QUEDÓ FUERA POR FALTA DE SEGUNDOS (y dónde está apuntado)
· Tishrei leído por su raíz aramea como «desatar» y «empezar». Es
  precioso y está verificado, pero metido entre el clímax (T9) y el
  remate (T10) rompía la pieza en dos ideas. Va en el PIE de Instagram,
  que es donde tiene aire. Apuntado también en COPY-REEL-A.
· El doble filo de Jaguigá 1:8 — el problema y la cura comparten imagen.
  Es un reel entero. Apuntado al final de RESERVA-transgresores.txt.

MODO DE EMPLEO
    python3 scripts/yka_voz.py                    # 1) voz (ya corrida)
    python3 scripts/yka_video.py --placas         # 2) las dos placas
    python3 scripts/yka_video.py --test-titulos   # 3) MIRAR los rótulos
    python3 scripts/yka_video.py --test-planos    # 4) MIRAR los encuadres
    python3 scripts/yka_video.py --test-cuadros   # 5) MIRAR cuadros reales
    python3 scripts/yka_video.py                  # 6) montar
"""
import os, sys, json, math, shutil, random, subprocess, unicodedata
from PIL import Image, ImageDraw, ImageFilter
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

NDIR   = "/Users/mardan/jashmal-produccion/yom-kipur"
SALIDA = os.path.join(NDIR, "YOM-KIPUR-A-kol-nidrei-reel.mp4")
BUILD  = os.path.join(NDIR, "build")
FRAMES = os.path.join(BUILD, "framesA")
CLIPS  = os.path.join(NDIR, "clips")
CLIPFR = os.path.join(BUILD, "clipframesA")

USAR_CLIPS = False          # imágenes fijas + Ken Burns
CHECK  = os.path.join(NDIR, "checkA")

V.IMG    = os.path.join(NDIR, "img")
V.FONTS  = os.path.join(NDIR, "fonts")
V.MP3    = os.path.join(NDIR, "audio", "yka_voz.mp3")
V.TIMING = os.path.join(NDIR, "audio", "yka_timing.json")
V.ENDCARD_PORTAL = os.path.join(NDIR, "jashmal_endcard_portal_ES.png")

V.VAV_END = -1.0
V.XF      = 0.50

PW, PH = 1274, 2266

CLIP_SPEC = {}

# clave de plano -> (archivo definitivo, provisional). Las seis imágenes
# que usa esta versión ya existen, así que no hace falta ningún provisional.
BG_SPEC = {
    "nudo":       ("a8_portada_fondo.png",      None),
    "nudo2":      ("a8_portada_fondo.png",      None),
    "luz":        ("a2_ultima_luz.png",         None),
    "tres":       ("a1_tres.png",               None),
    "pl_acta":    ("_placa_acta.png",           None),   # la fabrica este script
    "tres2":      ("a1_tres.png",               None),
    "pl_voto":    ("_placa_voto.png",           None),   # la fabrica este script
    "escalones":  ("a5_escalones.png",          None),
    "suelto":     ("a6_nudo_suelto.png",        None),
    "atada":      ("a7_la_que_sigue_atada.png", None),
    "atada2":     ("a7_la_que_sigue_atada.png", None),
    "atada3":     ("a7_la_que_sigue_atada.png", None),
}

PLACAS = ("pl_acta", "pl_voto")

SCENE_KEYS = [
    # (clave, z0, z1, pan) — Ken Burns lento. El movimiento CUENTA algo en
    # cada plano; no hay zoom decorativo en ninguno.
    ("nudo",       1.02, 1.22, (0,   0)),   # T1 · nos acercamos al nudo: tu promesa
    ("nudo2",      1.26, 1.40, (0,   0)),   # T2 · más cerca todavía: «todos tenemos una»
    ("luz",        1.06, 1.28, (0, 170)),   # T3 · empieza VIENDO el filo de sol
                                            #      y baja hacia la piedra oscura:
                                            #      la luz se va, que es lo que dice
    ("tres",       1.18, 1.04, (0,   0)),   # T4 · se ABRE y aparecen los tres
    ("pl_acta",    1.00, 1.05, (0,   0)),   # T5 · el acta            [placa]
    ("tres2",      1.20, 1.34, (0,  10)),   # T6 · nos acercamos a los tres
    ("pl_voto",    1.00, 1.05, (0,   0)),   # T7 · qué es una promesa [placa]
    ("escalones",  1.04, 1.20, (0, -34)),   # T8 · SUBE: las buenas promesas
    ("suelto",     1.26, 1.02, (0,   0)),   # T9 · se AFLOJA: el plano se abre
    ("atada",      1.00, 1.14, (0,   0)),   # T10 · la que sigue atada, plano entero
    ("atada2",     1.24, 1.38, (0,  30)),   # T11 · baja hacia la argolla
    ("atada3",     1.48, 1.64, (0,  60)),   # T12 · el hierro, muy cerca: cierra
]

# Rótulos "ESPAÑOL|hebreo|nota".  (texto, y, size, tiempo_de_voz, offset, dur)
# T1 y T2 no llevan rótulo: la entrada es emocional y un titular encima la
# volvería una placa de título. T5 y T7 tampoco: las placas SON el rótulo.
# Leídos solos y en orden, los rótulos dicen la pieza entera, remate incluido.
TITLES = [
    # y=640: este rótulo baja a propósito, para no taparle el filo de sol
    # que es justo lo que el plano tiene que enseñar.
    ("ESTE DOMINGO EMPIEZA YOM KIPUR||el día del perdón",
                                                        640, 58, 3, 1.2, 5.2),
    ("NO EMPIEZA CON UN REZO\nEMPIEZA CON UN TRIBUNAL||tres hombres de pie, con luz todavía",
                                                        300, 54, 4, 1.4, 6.4),
    ("NO DESATA TUS PECADOS\nDESATA TUS PROMESAS||las que te hiciste a ti mismo",
                                                        300, 56, 6, 1.0, 5.2),
    ("NO ERAN MALAS PROMESAS\nERAN BUENAS||",             300, 60, 8, 0.6, 3.8),
    ("DESATAR LOS NUDOS\nQUE TÚ MISMO ATASTE||Rav Yitzchak Ginsburgh · maestro contemporáneo",
                                                        300, 58, 9, 1.6, 5.6),
    ("NO TOCA LO QUE LE DEBES\nA OTRA PERSONA||Mishná · Yomá 8:9",
                                                        300, 54, 10, 1.8, 6.2),
    # la nota lleva el plazo: publicado con días de antelación, esto es
    # una tarea que da tiempo a hacer, no una sentencia.
    ("SE ARREGLA YENDO A BUSCARLA||y tienes hasta el domingo",
                                                        300, 58, 11, 0.6, 5.4),
    ("LA EXCEPCIÓN ES LA GENTE||",                       300, 70, 12, 1.5, 3.6),
]

TAG      = "TIEMPOS SAGRADOS · YOM KIPUR"
TAG_IN, TAG_OUT = 0.3, 9.0


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


def _palabras_rtl(img, d, palabras, y, size=112):
    """Dibuja varias palabras hebreas en el orden correcto de lectura:
    la PRIMERA palabra a la DERECHA. PIL no reordena texto bidireccional,
    así que una cadena con espacios puede salir con las palabras al revés.
    Colocándolas a mano, el orden lo decidimos nosotros y se puede
    verificar mirando la placa — que es lo que se hizo."""
    f = V.heb(size)
    anchos = [d.textlength(w, font=f) for w in palabras]
    hueco = size * 0.42
    total = sum(anchos) + hueco * (len(palabras) - 1)
    x = (PW + total) / 2               # borde derecho del bloque
    for w, a in zip(palabras, anchos):
        x -= a
        halo = Image.new("RGBA", (PW, PH), (0, 0, 0, 0))
        ImageDraw.Draw(halo).text((x, y), w, font=f, fill=(*V.GOLDB, 140))
        img.alpha_composite(halo.filter(ImageFilter.GaussianBlur(22)))
        d.text((x, y), w, font=f, fill=(*V.CREAM, 255), features=["kern"])
        x -= hueco


def placa_acta():
    """El corazón del Pshat de la pieza: Kol Nidrei NO es una oración.
    No tiene bendición, no se le pide nada a Dios, y ni siquiera está en
    hebreo — está en arameo, el idioma en que se redactaban los
    contratos. Es un acta de tribunal, y por eso tiene jurisdicción
    limitada, que es adonde va el reel a partir de aquí.

    Todo el contenido termina antes de y=1830: por debajo va la banda de
    subtítulos quemados y el pie quedaría pisado."""
    img = _fondo_placa(seed=19, glow=(PW // 2, 1020, 740, 30))
    d = ImageDraw.Draw(img)

    d.text((PW // 2, 420), "N O   E S   U N A   O R A C I Ó N",
           font=V.cinzel6(44), fill=(*V.GOLD, 230), anchor="ma")

    # כָּל נִדְרֵי — dos palabras, colocadas a mano de derecha a izquierda.
    _palabras_rtl(img, d, ["כָּל", "נִדְרֵי"], 600, size=118)
    d = ImageDraw.Draw(img)

    d.text((PW // 2, 880), "«todas las promesas»", font=V.corm_i(58),
           fill=(*V.GOLD, 235), anchor="ma")

    d.line([(PW // 2 - 300, 1010), (PW // 2 + 300, 1010)],
           fill=(*V.GOLD, 170), width=2)

    d.text((PW // 2, 1030), "E S T Á   E N   A R A M E O",
           font=V.cinzel(80), fill=(*V.CREAM, 255), anchor="ma")
    for j, ln in enumerate(["el idioma en que se escribían",
                            "los contratos"]):
        d.text((PW // 2, 1160 + j * 64), ln, font=V.corm_i(52),
               fill=(*V.GOLD, 235), anchor="ma")

    d.line([(PW // 2 - 220, 1332), (PW // 2 + 220, 1332)],
           fill=(*V.GOLD, 150), width=2)

    d.text((PW // 2, 1396), "E S   U N   A C T A", font=V.cinzel(104),
           fill=(*V.CREAM, 255), anchor="ma")
    d.text((PW // 2, 1548), "sin bendición · sin petición",
           font=V.corm_i(50), fill=(*V.GOLD, 225), anchor="ma")

    d.text((PW // 2, 1660), "M A J Z O R   D E   Y O M   K I P U R",
           font=V.cinzel6(32), fill=(*V.GOLDB, 210), anchor="ma")

    p = os.path.join(V.IMG, "_placa_acta.png")
    img.convert("RGB").save(p)
    return p


def placa_voto():
    """T7 · QUÉ ES UNA PROMESA, con la Torá en la mano.

    Este es el fallo nº3 de la versión 1 corregido: allí nunca se decía
    qué es un voto. Aquí la voz da la glosa llana («lo que sale de tu
    boca, te ata») y la placa pone el versículo literal con su cita
    exacta, que es lo que la gente fotografía y guarda. La firma de la
    casa es «lo fuimos a ver»: sin la cita, esto sería un sermón.

    Números 30:3 — כְּכָל־הַיֹּצֵא מִפִּיו יַעֲשֶׂה — verificado contra
    Sefaria por el Sofer el 15-09-2026 (informe §3.3).

    Todo el contenido termina antes de y=1830: por debajo va la banda de
    subtítulos quemados y el pie quedaría pisado."""
    img = _fondo_placa(seed=31, glow=(PW // 2, 1180, 700, 28))
    d = ImageDraw.Draw(img)

    d.text((PW // 2, 420), "Q U É   E S   U N A   P R O M E S A",
           font=V.cinzel6(44), fill=(*V.GOLD, 230), anchor="ma")

    # El versículo, palabra por palabra de derecha a izquierda. El texto es
    # el masorético exacto que verificó el Sofer: הַיֹּצֵא va con holam sobre
    # la yod (no la grafía plena הַיּוֹצֵא), y se omite solo el maqaf de unión.
    _palabras_rtl(img, d, ["כְּכָל", "הַיֹּצֵא", "מִפִּיו", "יַעֲשֶׂה"], 580, size=92)
    d = ImageDraw.Draw(img)

    for j, ln in enumerate(["«conforme a todo lo que salió",
                            "de su boca, hará»"]):
        d.text((PW // 2, 810 + j * 66), ln, font=V.corm_i(56),
               fill=(*V.GOLD, 235), anchor="ma")

    d.line([(PW // 2 - 300, 1000), (PW // 2 + 300, 1000)],
           fill=(*V.GOLD, 170), width=2)

    d.text((PW // 2, 1060), "L O   Q U E   S A L E   D E   T U   B O C A",
           font=V.cinzel6(46), fill=(*V.GOLD, 235), anchor="ma")
    d.text((PW // 2, 1180), "T E   A T A", font=V.cinzel(118),
           fill=(*V.CREAM, 255), anchor="ma")

    d.line([(PW // 2 - 220, 1420), (PW // 2 + 220, 1420)],
           fill=(*V.GOLD, 150), width=2)

    d.text((PW // 2, 1484), "T O R Á   ·   N Ú M E R O S   3 0 : 3",
           font=V.cinzel6(34), fill=(*V.GOLDB, 215), anchor="ma")

    p = os.path.join(V.IMG, "_placa_voto.png")
    img.convert("RGB").save(p)
    return p


# ═══════════════════════════════════════════════════════════════════════
# PROVISIONALES — para poder montar y aprobar el reel HOY, sin esperar a GPT
# ═══════════════════════════════════════════════════════════════════════
def provisionales():
    """No hace falta ninguno: las ocho imágenes del reel A ya existen.
    Se deja el comando para que el modo de empleo sea el mismo en las dos
    piezas y no haya que recordar cuál lo lleva y cuál no."""
    print("  El reel A no necesita provisionales: las ocho imágenes ya"
          " están en img/.")


def placas():
    os.makedirs(V.IMG, exist_ok=True)
    print("  placa ->", placa_acta())
    print("  placa ->", placa_voto())


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
                     f"Corre primero:  python3 scripts/yka_video.py --placas"
                     f"  y  --provisionales")
    if faltan and verbose:
        print("AVISO — montando con imágenes PROVISIONALES:")
        for real, fb in faltan:
            print(f"   {real:24s} -> por ahora {fb}")
        print("   (los prompts están en PROMPTS-GPT-REEL-A-KOL-NIDREI.txt; cuando Mardan"
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

    print("Construyendo capas estáticas (Yom Kipur · reel A «Kol Nidrei»)...")
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
    tmp = os.path.join(BUILD, "yka_noend.mp4")
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
