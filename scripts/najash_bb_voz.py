#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Parashá KI TETZÉ — "El buey y el burro dentro de la serpiente"
Reel 9:16 · Voz Martin (ElevenLabs) con timestamps. UN SOLO render
(with-timestamps). Guarda mp3 + timing.json (palabras + spans de los
8 tiempos) en /Users/mardan/jashmal-produccion/najash-buey-burro/audio/

Español. Sin CapCut. No se nombra la marca ni jashmal.org en el audio.

TODO EL CUERPO ES CONTENIDO VERIFICADO POR EL SOFER
(scratchpad/informe-megale-amukot-najash-shor-jamor.md).

Barreras respetadas (líneas rojas 1-9 del informe):
  · La fuente se cita como "Megalé Amukot ... comentario a Vaetjanán"
    (Ofán 71 va en el rótulo en pantalla). NUNCA "sobre Ki Tetzé/Bereshit".
  · "Antes del pecado estaba permitido arar juntos" SIEMPRE como
    revelación del Megalé Amukot — nunca como midrash ni ley.
  · Derecha = burro (ח, klipá de Ishmael) · Izquierda = buey (ש, klipá
    de Esav). NO invertir.
  · La lectura de LETRAS es del Megalé Amukot; el Zohar solo se cita por
    "cuando se unen..." (Beshalaj 65a) y por el burro del Mashíaj (Balak).
  · Única gematría en voz: שור 506 + חמור 254 = 760 = צרעת (la trae el
    propio Ofán 71). Nada de 358 en el audio (directriz del proyecto).
  · "no mezclar las fuerzas de impureza... para no aumentar su fuerza"
    — formulación textual del ofán, no inventada.
"""
import json, urllib.request, urllib.error, base64, os, sys

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne
MODEL    = "eleven_multilingual_v2"

OUTDIR = "/Users/mardan/jashmal-produccion/najash-buey-burro/audio"
ENV    = "/Users/mardan/workspace/jashmal/.env.local"

# 8 tiempos de la narración — un tiempo por escena (n1..n8), en orden.
# ~200 palabras ≈ 82-86 s de voz + end-card ≈ 88-90 s de reel.
SENTENCES = [
    # T1 · n1 · GANCHO — la cabeza de la serpiente, un animal en cada ojo
    "Dentro de la palabra hebrea para serpiente hay dos animales escondidos. "
    "Y la Torá tiene un mandamiento para que nunca se junten.",

    # T2 · n2 · las dos fuerzas dentro del cuerpo — MA Vaetjanán, Ofán 71
    "Najash: nun, jet, shin. En su comentario a Vaetjanán, el Megalé Amukot "
    "revela: en la serpiente están clavadas dos fuerzas.",

    # T3 · n3 · el buey — IZQUIERDA, klipá de Esav (no invertir)
    "A la izquierda, el buey: la shin de najash. La fuerza caída de Esav.",

    # T4 · n4 · el burro — DERECHA, klipá de Ishmael + la nun alargada
    "A la derecha, el burro: la jet. La fuerza caída de Ishmael. La nun "
    "alargada es la serpiente misma.",

    # T5 · n5 · el jardín antes — jidush del MA, presentado como revelación
    "Y el Megalé Amukot revela más: si Adam no hubiera pecado, estaba "
    "permitido arar con buey y burro juntos. Todas las fuerzas servían al hombre.",

    # T6 · n6 · el yugo partido — formulación textual del ofán + Devarim 22:10
    "Tras el pecado, Dios ordenó no mezclar las fuerzas de impureza, para no "
    "aumentar su fuerza. Y quedó escrito: no ararás con buey y burro juntos.",

    # T7 · n7 · la klipá agrietada — Zohar Beshalaj 65a + gematría del ofán
    "El Zohar advierte: cuando esas dos se unen, el mundo no puede sostenerse "
    "ante ellas. Buey más burro suman setecientos sesenta: tzaráat, la plaga.",

    # T8 · n8 · REMATE — Zohar Balak (burro del Mashíaj) + Kav HaYashar 102:8
    "Pero el mismo versículo esconde el final. Dice el Zohar: el Mashíaj llega "
    "humilde, montado sobre un burro. Y el buey es Mashíaj hijo de Yosef. Las "
    "fuerzas que hoy no se mezclan, al final las cabalga el Mashíaj.",
]

TEXT = " ".join(SENTENCES)


def key():
    with open(ENV) as f:
        for ln in f:
            if ln.startswith("ELEVENLABS_API_KEY="):
                return ln.split("=", 1)[1].strip()
    raise SystemExit("No encontre ELEVENLABS_API_KEY en .env.local")


def main():
    os.makedirs(OUTDIR, exist_ok=True)
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({
        "text": TEXT,
        "model_id": MODEL,
        # speed 1.06: a 1.0 la voz salía en 90.2s y el reel con end-card
        # se pasaba de 90; a 1.06 queda ~85s de voz, ~88s de reel.
        "voice_settings": {"stability": 0.45, "similarity_boost": 0.75,
                           "style": 0.10, "speed": 1.06},
    }).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key(), "Content-Type": "application/json"})
    print("Generando voz Martin (with-timestamps)...")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}: {e.read().decode(errors='replace')[:400]}")

    mp3 = os.path.join(OUTDIR, "najash_bb_voz.mp3")
    with open(mp3, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))

    # Reconstruir palabras desde la alineación por caracteres
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

    # Spans de los 8 tiempos: por conteo exacto de palabras de cada oración.
    scenes, idx = [], 0
    for i, sent in enumerate(SENTENCES):
        nw = len(sent.split())
        seg = words[idx:idx + nw]
        scenes.append({
            "escena": i + 1,
            "start": round(seg[0]["start"], 3),
            "end":   round(seg[-1]["end"], 3),
        })
        idx += nw

    with open(os.path.join(OUTDIR, "najash_bb_timing.json"), "w") as f:
        json.dump({"duration": dur, "words": words, "scenes": scenes, "text": TEXT},
                  f, ensure_ascii=False, indent=1)

    print(f"OK  dur={dur:.2f}s  palabras={len(words)}")
    for s in scenes:
        print(f"  tiempo {s['escena']:>2}  {s['start']:6.2f} -> {s['end']:6.2f}")
    print(f"mp3: {mp3}")


if __name__ == "__main__":
    main()
