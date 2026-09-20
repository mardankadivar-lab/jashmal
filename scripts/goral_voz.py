#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · EL GORAL — «La cara que no ves» (Agag · David · el dado)
Voz de Martin para el reel vertical. UN SOLO render with-timestamps.

════════════════════════════════════════════════════════════════════════
FUENTE ÚNICA
════════════════════════════════════════════════════════════════════════
~/jashmal-produccion/goral-agag-david/FUENTES-VERIFICADAS.md
Dictamen del Sofer, 19-09-2026, todo traído de Sefaria en sesión.
El guion producido es GUION.md, VARIANTE B (elegida por Mardan).

  Ester 3:7   — «הפיל פור הוא הגורל», y el texto traduce pur -> goral.
                Fue en NISÁN. (No en Yom Kipur: trampa 1 del dictamen.)
  Ester 3:1   — Hamán «ha-Agagí», de la casa de Agag.
  Shmuel I 15:8-9 — Shaúl captura vivo a Agag y lo perdona.
  Ester Rabá 7:11 — la suerte sube mes por mes; en Tishrei la frena
                «זכות שופר וכיפור ורגלים». Ésta es la puerta limpia a
                Yom Kipur, y va AL REVÉS de la trampa 1.
  אגג = 1+3+3 = 7   ·   דוד = 4+6+4 = 14      (verificado letra a letra)

════════════════════════════════════════════════════════════════════════
LAS SEIS REGLAS DE TONO (2026-09-19) — esta es la pieza de prueba
════════════════════════════════════════════════════════════════════════
1. MENOS COSAS   -> 10 frases. Hester Panim tuvo 16; la Yud, 21.
                    Una idea (la cara oculta), una fuente (Ester 3:7),
                    un giro (7 -> 14). Seis movimientos.
2. REPETIR 3 VECES la idea central:
     T1  «algo que no elegiste»
     T3  «lo que ves arriba nunca es todo lo que hay»
     T10 «tiene una cara que todavía no has visto»
3. HABLAR, NO ANUNCIAR -> «Mira un dado cuando cae.» · «Voltéalas.» ·
   «te lo digo porque es verdad». Cero cátedra picada.
4. UN SOLO NÚMERO -> el espectador VE 7 y 14 en los puntos del dado.
   El 21 del cálculo NO se dice ni se escribe en ningún sitio.
5. SILENCIO TRAS EL GIRO -> 1,5 s de negro. NO se genera aquí: lo
   inserta goral_video.py partiendo el mp3 al final de T6.
6. CERRAR CON LO MISMO QUE ABRIÓ -> T10 repite T1, ya resuelto.

COROLARIO — EL OBJETO EXPLICA SOLO. Nadie necesita gematría para
entender un dado. Todo el mundo ya sabe que hay una cara que no ve y
acepta que las opuestas suman siete. Por eso el número se VE y no se
lee, y el narrador nunca explica aritmética.

════════════════════════════════════════════════════════════════════════
NEUTRALIDAD DE FECHA — REGLA DURA DE ESTA PIEZA
════════════════════════════════════════════════════════════════════════
Kol Nidrei decía «esta tarde empieza Yom Kipur» y caducaba al día
siguiente. Hester Panim traía el mismo defecto («Este domingo, al caer
el sol...»). AQUÍ NO.

PROHIBIDO EN EL AUDIO: hoy · mañana · esta noche · esta tarde ·
esta semana · al caer el sol · empieza · comienza · este domingo.

Ester Rabá 7:11 no necesita fecha: T9 dice «el mes en que cae el día
del perdón», que es verdad en septiembre y en marzo. El reel publicado
dentro de seis meses funciona idéntico.
La referencia de temporada vive SOLO en el caption, que se reescribe.
Hay un test automático abajo: `python3 goral_voz.py --auditar`.

════════════════════════════════════════════════════════════════════════
CORRECCIÓN 2026-09-19 (gerencia) — T7
════════════════════════════════════════════════════════════════════════
Decía: «Catorce, en hebreo, se escribe David.»  ->  ES FALSO.
Catorce en hebreo se escribe יד (yod-dálet). דוד no es «catorce
escrito», es una palabra que VALE catorce.
Ahora dice: «Y David, en hebreo, vale exactamente catorce.»
Es la frase correcta y además es la que el dictamen recomienda en §1.3
(liderar con el VALOR, que es inmune al orden de las letras).

════════════════════════════════════════════════════════════════════════
AUDIENCIA (medida el 14-09-2026)
════════════════════════════════════════════════════════════════════════
7.144 seguidores. Israel 0,5 %. México 14,3 · RD 14,0 · Argentina 10,9
· EE.UU. 10,4 · Venezuela 10,2. El 57 % tiene 45 años o más.
Latinoamericanos, adultos, serios, SIN formación judía.
  · La única palabra hebrea del reel es «pur», y cae en el segundo ~24
    ya traducida en el mismo aliento («pur, la suerte»).
  · Los números van con letras para que la voz no los deletree.
  · No se nombra «jashmal.org» en el audio: va en el end-card.

Voz Martin (W5JElH3dK1UYYAiHH7uh, eleven_multilingual_v2). Nunca CapCut.
Todo en español, nunca farsi.

Salida: audio/goral_voz.mp3 + audio/goral_timing.json
"""
import json, urllib.request, urllib.error, base64, os, sys, re

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne
MODEL    = "eleven_multilingual_v2"

OUTDIR = "/Users/mardan/jashmal-produccion/goral-agag-david/audio"
ENV    = "/Users/mardan/workspace/jashmal/.env.local"

# 10 frases = los 6 movimientos de GUION.md (variante B).
# El plano de cada una va entre corchetes; el mapa vive en goral_video.py.
SENTENCES = [
    # ── MOV. 1 · LA EXPERIENCIA QUE EL ESPECTADOR YA TIENE ──────────
    # T1 · segunda persona, cero vocabulario, sin rótulo.          [d1]
    "Piensa en algo que decidió tu vida y que tú no elegiste: "
    "una fecha, una llamada, un papel que salió.",

    # ── MOV. 2 · EL OBJETO QUE EXPLICA SOLO ─────────────────────────
    # T2 · imperativo corto. Sin rótulo (segundo plano).           [d2]
    "Mira un dado cuando cae.",

    # T3 · el ÚNICO dato técnico del reel, y ya lo sabe.           [d2]
    #      Aquí vuelve la idea central por primera vez.
    "Lo que ves arriba nunca es todo lo que hay: "
    "la cara de abajo completa siete, siempre.",

    # ── MOV. 3 · LA ESCENA ──────────────────────────────────────────
    # T4 · pur traducido EN EL MISMO ALIENTO (regla de entrada 3).
    #      El rótulo dice NISÁN: vacuna contra la trampa 1.        [d3]
    "En el libro de Ester, un hombre sortea el día en que va a borrar "
    "a un pueblo entero: no eligió la fecha, le salió "
    "— pur, la suerte, dice el texto.",

    # ── MOV. 4 · EL GIRO ────────────────────────────────────────────
    # T5 · Agag llega justo cuando hace falta, no antes.           [d4]
    #      Entra el rótulo LECTURA PROPIA y no se va hasta T8.
    "Y él venía de la casa de un rey llamado Agag: "
    "tres letras que valen uno, tres y tres — siete.",

    # T6 · EL GIRO. «como se voltean tres dados» = se confiesa que
    #      esto es convención de dados, no tradición judía
    #      (trampa 3). El 21 NO se dice.              [d5 -> d6 CORTE SECO]
    "Voltéalas, como se voltean tres dados: catorce "
    "— y eso no es casualidad, es obligatorio: "
    "el reverso de Agag es forzosamente su doble.",

    # ──────────── 1,5 s DE NEGRO — lo inserta goral_video.py ────────

    # ── MOV. 5 · EL NOMBRE DEBAJO ───────────────────────────────────
    # T7 · CORREGIDO. El valor es inmune al orden de las letras;
    #      por eso el argumento fuerte va delante (§1.3).          [d7]
    "Y David, en hebreo, vale exactamente catorce.",

    # T8 · LA CONFESIÓN. Es lo que vuelve la pieza inatacable, y va
    #      ANTES de que nadie lo encuentre. Las letras se reordenan
    #      EN PANTALLA mientras se dice esto.               [d7 -> d8]
    "Son las mismas tres letras de debajo, reordenadas "
    "— te lo digo porque es verdad, y porque no hay otra palabra "
    "que hacer con ellas.",

    # ── MOV. 6 · CERRAR DONDE ABRIÓ ─────────────────────────────────
    # T9 · la puerta a Yom Kipur, SIN FECHA. Ester Rabá 7:11.
    #      Dice lo CONTRARIO de la trampa 1: la suerte no pudo caer.
    #                                                    [d3 reusado]
    "Y el midrash cuenta que esa suerte fue probando mes por mes, "
    "y que hubo uno donde no pudo caer: "
    "el mes en que cae el día del perdón.",

    # T10 · el círculo cierra: misma frase de T1, ya resuelta.     [d9]
    "Eso que decidió tu vida y que tú no elegiste "
    "tiene una cara que todavía no has visto.",
]

TEXT = " ".join(SENTENCES)

# Deícticos que caducan la pieza. Si alguno aparece, el script NO corre.
PROHIBIDOS = [
    "hoy", "mañana", "esta noche", "esta tarde", "esta semana",
    "al caer el sol", "este domingo", "este lunes", "este mes",
    "este año", "empieza", "comienza", "estos días", "ahora mismo",
]


def auditar(verbose=True):
    """Falla si el audio contiene una sola referencia que caduque."""
    bajo = TEXT.lower()
    hallados = [p for p in PROHIBIDOS
                if re.search(r"\b" + re.escape(p) + r"\b", bajo)]
    if verbose:
        print("AUDITORÍA DE NEUTRALIDAD DE FECHA")
        print(f"  términos vigilados : {len(PROHIBIDOS)}")
        print(f"  encontrados        : {len(hallados)}")
        if hallados:
            for h in hallados:
                print(f"    ✗ «{h}»")
        else:
            print("  ✅ LIMPIO — el audio no caduca. Sirve en marzo igual.")
    return hallados


def key():
    with open(ENV) as f:
        for ln in f:
            if ln.startswith("ELEVENLABS_API_KEY="):
                return ln.split("=", 1)[1].strip()
    raise SystemExit("No encontre ELEVENLABS_API_KEY en .env.local")


def main():
    malos = auditar(verbose=False)
    if malos:
        sys.exit("ABORTADO — el texto contiene deícticos de fecha: "
                 + ", ".join(malos) + "\nEl audio no puede caducar. "
                 "Corrige SENTENCES antes de gastar créditos.")

    os.makedirs(OUTDIR, exist_ok=True)
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({
        "text": TEXT,
        "model_id": MODEL,
        "voice_settings": {"stability": 0.45, "similarity_boost": 0.75,
                           "style": 0.10, "speed": 1.04},
    }).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key(), "Content-Type": "application/json"})
    print("Generando voz Martin (with-timestamps, un solo golpe)...")
    try:
        with urllib.request.urlopen(req, timeout=240) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}: {e.read().decode(errors='replace')[:400]}")

    mp3 = os.path.join(OUTDIR, "goral_voz.mp3")
    with open(mp3, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))

    a = data["alignment"]
    chars = a["characters"]
    st = a["character_start_times_seconds"]
    en = a["character_end_times_seconds"]
    words, w, ws, we = [], "", 0.0, 0.0
    for ch, s, e in zip(chars, st, en):
        if ch == " ":
            if w:
                words.append({"w": w, "start": ws, "end": we})
            w = ""
        else:
            if not w:
                ws = s
            w += ch
            we = e
    if w:
        words.append({"w": w, "start": ws, "end": we})
    dur = en[-1] if en else 0.0

    scenes, idx = [], 0
    for i, sent in enumerate(SENTENCES):
        nw = len(sent.split())
        seg = words[idx:idx + nw]
        scenes.append({"escena": i + 1,
                       "start": round(seg[0]["start"], 3),
                       "end":   round(seg[-1]["end"], 3)})
        idx += nw

    with open(os.path.join(OUTDIR, "goral_timing.json"), "w") as f:
        json.dump({"duration": dur, "words": words, "scenes": scenes,
                   "text": TEXT}, f, ensure_ascii=False, indent=1)

    print(f"OK  dur={dur:.2f}s  palabras={len(words)}")
    for s in scenes:
        print(f"  T{s['escena']:>2}  {s['start']:6.2f} -> {s['end']:6.2f}"
              f"  ({s['end']-s['start']:5.2f}s)")
    print(f"\n  + 1,5 s de negro tras T6  ->  reel ~{dur+1.5+2.6:.1f}s con end-card")
    print(f"mp3: {mp3}")
    auditar()


def contar():
    tot, frases = 0, 0
    for i, s in enumerate(SENTENCES, 1):
        n = len(s.split())
        tot += n
        frases += 1
        print(f"  T{i:>2}  {n:>3} palabras  ~{n/2.37:5.1f} s   {s[:54]}...")
    print(f"\n  TOTAL {tot} palabras en {frases} frases  (techo duro: 10)")
    voz = tot / 2.37
    print(f"  ->  ~{voz:.1f} s de voz  +1,5 s negro  +2,6 s end-card"
          f"  ->  reel ~{voz+1.5+2.6:.1f} s")
    print(f"  ->  una idea nueva cada {voz/frases:.1f} s"
          f"   (Hester Panim: 5,7 s — ahí estuvo el fallo)")
    print()
    auditar()


if __name__ == "__main__":
    if "--contar" in sys.argv:
        contar()
    elif "--auditar" in sys.argv:
        sys.exit(1 if auditar() else 0)
    else:
        main()
