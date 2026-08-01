#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Parashá EIKEV — "El talón" · Reel vertical 9:16 (1080x1920, 30fps).

Reusa el motor de la Vav (vav_video.py), igual que jet_video.py:
Ken Burns sobre imágenes fijas + fundidos + rótulos (español arriba, hebreo
debajo y más pequeño) + subtítulos quemados sincronizados a la voz de Martin
+ end-card oficial del portal.

IMÁGENES: las 10 que hace Mardan con GPT (ver PROMPTS-GPT-EIKEV.md).
Se piden ya en 9:16 (1080x1920) -> se montan a COVER con Ken Burns.
Si alguna llega en 4:5, cambia PAD_LAMINA a True y se monta como lámina
centrada sobre negro (como en la Jet), sin recortar nada del dibujo.

Mapeo de escenas a los 11 tiempos de la narración (voz 77.6 s):
   T1              e1   serpiente enroscada en el talón del orante
   T2              e2   el jardín: la cabeza fuera de alcance
   T3              e3   la mano recién nacida agarrando el talón
   T4              e4   dos talones: uno con chispa (172 / 182)
   T5              e5   la yud — la chispa mínima que sostiene
   T6              e6   el jinete de polvo, la noche del vado
   T7              e7   la columna de polvo hasta el Trono
   T8              e8   el eje: cabeza arriba, talón abajo
   T9 + T10        e9   el pie sobre las llamitas (mitzvot livianas)
   T11             e10  la tierra que pasa por el fuego  [LECTURA PROPIA]

USO:
    python3 scripts/eikev_voz.py            # 1) voz + timing.json
    # 2) Mardan coloca las 10 imágenes en .../eikev-talon/img/ como e1..e10.png
    python3 scripts/eikev_video.py --test-titulos   # 3) revisar rótulos (PNG)
    python3 scripts/eikev_video.py                  # 4) render final
"""
import os, sys, json, shutil, subprocess
from PIL import Image, ImageDraw
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")
import vav_video as V

EDIR   = "/Users/mardan/jashmal-produccion/eikev-talon"
SALIDA = os.path.join(EDIR, "EIKEV-talon-reel.mp4")
BUILD  = os.path.join(EDIR, "build")
FRAMES = os.path.join(BUILD, "frames")

# ── Overrides: rutas y assets de Eikev ───────────────────────────────────
V.IMG    = os.path.join(EDIR, "img")
V.FONTS  = os.path.join(EDIR, "fonts")
V.MP3    = os.path.join(EDIR, "audio", "eikev_voz.mp3")
V.TIMING = os.path.join(EDIR, "audio", "eikev_timing.json")
V.ENDCARD_PORTAL = os.path.join(EDIR, "jashmal_endcard_portal_ES.png")

V.VAV_END = -1.0     # no se dibuja ninguna letra encima del fondo
V.XF      = 0.6      # fundido entre planos

PAD_LAMINA = False   # True si las imágenes llegan en 4:5 en vez de 9:16
PAD        = 1.10

V.BG_FILES = {
    "orante":   "e1.png",    # serpiente enroscada en el talón, hombre en pie
    "jardin":   "e2.png",    # la serpiente a ras de suelo, la cabeza inalcanzable
    "nacer":    "e3.png",    # mano de recién nacido agarrando un talón
    "cuenta":   "e4.png",    # dos talones de luz, uno con una chispa
    "yud":      "e5.png",    # la chispa mínima que sostiene el pie
    "jinete":   "e6.png",    # el acusador cabalgando sobre polvo, de noche
    "trono":    "e7.png",    # la columna de polvo subiendo hasta el Trono
    "eje":      "e8.png",    # cabeza arriba, talón abajo — el eje vertical
    "pisar":    "e9.png",    # el pie sobre pequeñas llamas doradas
    "brasa":    "e10.png",   # la tierra que pasa por el fuego  [jidush]
}

# Un plano por tiempo de voz. T9 y T10 comparten plano (e9), por eso el
# índice 9 de los límites se descarta en build_bounds().
SCENE_KEYS = [
    # (bg_key, z0, z1, pan)
    ("orante", 1.00, 1.09, (0,  -40)),   # T1  · el gancho: acercarse al talón
    ("jardin", 1.08, 1.00, (0,   35)),   # T2  · abrir: la cabeza queda arriba
    ("nacer",  1.00, 1.10, (0,   30)),   # T3  · empuje a la manita
    ("cuenta", 1.00, 1.08, (0,  -25)),   # T4  · la cuenta
    ("yud",    1.02, 1.12, (0,  -20)),   # T5  · empuje lentísimo a la chispa
    ("jinete", 1.08, 1.00, (0,   40)),   # T6  · retroceso: aparece el jinete
    ("trono",  1.00, 1.10, (0,  -70)),   # T7  · subida: la columna asciende
    ("eje",    1.00, 1.06, (0,   60)),   # T8  · barrido de cabeza a talón
    ("pisar",  1.00, 1.09, (0,   25)),   # T9+T10 · el pie sobre las llamitas
    ("brasa",  1.00, 1.12, (0,  -30)),   # T11 · [LECTURA PROPIA]
]

# Rótulos: "ESPAÑOL|hebreo|nota"
#   · el ESPAÑOL manda (grande, crema, Cinzel)
#   · el hebreo es apoyo secundario (menor, dorado) — la audiencia NO lee hebreo
#   · la nota es una línea chica en cursiva (Cormorant), para matizar
# (texto, y, size, tiempo_de_voz, offset_inicio, duración)
TITLES = [
    ("EL TALÓN|עֵקֶב",                300, 84,  2, 1.0, 4.2),
    ("LA DIFERENCIA: UNA YUD",       300, 66,  4, 3.6, 3.6),
    ("LA YUD DE YAAKOV|יַעֲקֹב",         300, 72,  5, 3.4, 3.4),
    ("EL POLVO DEL ACUSADOR",        300, 64,  6, 2.6, 3.8),
    ("HASTA EL TRONO DE GLORIA",     300, 60,  7, 3.0, 3.6),
    ("LO QUE PISAMOS",               300, 80,  9, 1.4, 3.6),
    # OBLIGATORIO: el jidush de Mardan va marcado en pantalla como lectura propia.
    ("LECTURA PROPIA||no es una cita — es un jidush de Jashmal",
                                     296, 68, 11, 0.5, 6.6),
]


# ── Fondos ────────────────────────────────────────────────────────────────
def prescale(path):
    """9:16 a cover (por defecto) o lámina 4:5 centrada sobre negro."""
    im = Image.open(path).convert("RGB")
    iw, ih = im.size
    if not PAD_LAMINA:
        tw, th = int(V.W * 1.18), int(V.H * 1.18)
        s = max(tw / iw, th / ih)
        return im.resize((round(iw * s), round(ih * s)), Image.LANCZOS)
    cw = round(iw * PAD)
    ch = round(cw / V.ASP)
    if ch < ih * PAD:
        ch = round(ih * PAD)
        cw = round(ch * V.ASP)
    canvas = Image.new("RGB", (cw, ch), V.DARK)
    canvas.paste(im, ((cw - iw) // 2, (ch - ih) // 2))
    return canvas


# ── Rótulos: español grande arriba, hebreo pequeño debajo ────────────────
def title_layer(text, letra=False, y=300, size=76, color=V.CREAM):
    partes = (text.split("|") + ["", ""])[:3]
    es, heb_txt, nota = partes
    img = Image.new("RGBA", (V.W, V.H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    spaced = " ".join(list(es)) if len(es) <= 10 else es
    f = V._fit_font(spaced, size, V.W - 130)
    d.text((V.W // 2 + 3, y + 3), spaced, font=f, fill=(0, 0, 0, 170), anchor="ma")
    d.text((V.W // 2, y), spaced, font=f, fill=(*color, 255), anchor="ma")

    # Base real del texto ya dibujado (anchor "ma"), no la caja desde el origen:
    # medirla desde (0,0) dejaba el filete encima de las letras.
    yy = d.textbbox((V.W // 2, y), spaced, font=f, anchor="ma")[3]

    if heb_txt:
        yy += 40
        d.line([(V.W // 2 - 78, yy), (V.W // 2 + 78, yy)], fill=(*V.GOLD, 190), width=2)
        # Hebreo: FrankRuhl + raqm -> el niqqud y el RTL salen correctos
        hf = V.heb(int(size * 0.86))
        d.text((V.W // 2 + 2, yy + 34), heb_txt, font=hf,
               fill=(0, 0, 0, 170), anchor="ma", features=["kern"])
        d.text((V.W // 2, yy + 32), heb_txt, font=hf,
               fill=(*V.GOLDB, 255), anchor="ma", features=["kern"])
        yy = d.textbbox((V.W // 2, yy + 32), heb_txt, font=hf, anchor="ma")[3]

    if nota:
        yy += 34
        d.line([(V.W // 2 - 78, yy), (V.W // 2 + 78, yy)], fill=(*V.GOLD, 170), width=2)
        nf = V.corm_i(46)
        d.text((V.W // 2 + 2, yy + 32), nota, font=nf,
               fill=(0, 0, 0, 180), anchor="ma")
        d.text((V.W // 2, yy + 30), nota, font=nf,
               fill=(*V.GOLDB, 255), anchor="ma")
    return img


# ── Subtítulos: cortar por puntuación, nunca a mitad de idea ─────────────
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


V.prescale     = prescale
V.title_layer  = title_layer
V.build_phrases = build_phrases


# ── Tiempos derivados del timing.json (nada hardcodeado) ─────────────────
def build_timeline():
    tj = json.load(open(V.TIMING))
    dur = tj["duration"]
    starts = [s["start"] for s in tj["scenes"]]     # 11 tiempos de voz
    # límites contiguos: 12 valores para 11 tiempos
    b = [0.0] + starts[1:] + [dur]
    # T9 y T10 comparten plano -> se descarta el límite que abre T10 (índice 9)
    bounds = b[:9] + b[10:]                          # 11 valores -> 10 planos
    assert len(bounds) == len(SCENE_KEYS) + 1, (len(bounds), len(SCENE_KEYS))
    V.SCENES = [(bounds[i], k, z0, z1, pan)
                for i, (k, z0, z1, pan) in enumerate(SCENE_KEYS)]
    # Rótulos anclados al comienzo de su tiempo de voz
    V.TITLE_DEFS = [(txt, False, y, sz,
                     starts[t - 1] + off, starts[t - 1] + off + d)
                    for (txt, y, sz, t, off, d) in TITLES]
    return dur, starts


# ── Prueba visual de los rótulos (sin necesidad de las imágenes) ─────────
def test_titulos():
    build_timeline()
    out = os.path.join(EDIR, "check")
    os.makedirs(out, exist_ok=True)
    for i, (txt, _, y, sz, ti, to) in enumerate(V.TITLE_DEFS, 1):
        base = Image.new("RGBA", (V.W, V.H), (*V.DARK, 255))
        base = Image.alpha_composite(base, title_layer(txt, False, y, sz))
        p = os.path.join(out, f"rotulo-{i}.png")
        base.convert("RGB").save(p)
        print(f"  {p}   [{ti:.1f}s -> {to:.1f}s]  {txt}")
    # contacto: los 7 rótulos en una sola lámina
    hoja = Image.new("RGB", (V.W // 2 * 4, V.H // 2 * 2), V.DARK)
    for i in range(len(V.TITLE_DEFS)):
        im = Image.open(os.path.join(out, f"rotulo-{i+1}.png")).resize((V.W // 2, V.H // 2))
        hoja.paste(im, ((i % 4) * (V.W // 2), (i // 4) * (V.H // 2)))
    hoja.save(os.path.join(out, "rotulos-contacto.png"))
    print(f"\nContacto: {os.path.join(out, 'rotulos-contacto.png')}")


def main():
    faltan = [f for f in V.BG_FILES.values()
              if not os.path.exists(os.path.join(V.IMG, f))]
    if faltan:
        sys.exit("Faltan imágenes en " + V.IMG + ":\n  " + "\n  ".join(faltan) +
                 "\n\nVer PROMPTS-GPT-EIKEV.md")

    dur, _ = build_timeline()
    if os.path.isdir(FRAMES):
        shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)

    print("Construyendo capas estáticas (eikev)...")
    ctx = V.build_static()
    for i, (st, k, *_ ) in enumerate(V.SCENES):
        print(f"  plano {i+1:>2}  {st:6.2f} -> {ctx['bounds'][i+1]:6.2f}  {k}")
    n = int(ctx["dur"] * V.FPS) + 1
    print(f"Render {n} cuadros ({ctx['dur']:.1f}s)...")
    for fi in range(n):
        V.compose(fi / V.FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 150 == 0:
            print(f"  {fi}/{n}")

    print("Codificando (voz sola, sin música)...")
    tmp = os.path.join(BUILD, "eikev_noend.mp4")
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
    else:
        main()
