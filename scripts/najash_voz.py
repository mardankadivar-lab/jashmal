#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Genera la VOZ del video "Najash y Mashíaj" (358) con la voz oficial de Jashmal.
Usa la configuración FIJA y compartida de scripts/voz_jashmal.py (Martin Osborne).
Guarda el MP3 + un JSON con los timestamps de palabras (para el ensamblaje del CEO).
"""
import json, urllib.request, urllib.error, os, sys, base64
sys.path.insert(0, os.path.dirname(__file__))
from voz_jashmal import VOICE_ID, MODEL_V3, V3_SETTINGS

ENV = os.path.join(os.path.dirname(__file__), "..", ".env.local")
OUT_DIR = os.path.expanduser("~/Desktop/jashmal-videos/Najash")
MP3_OUT = os.path.join(OUT_DIR, "najash_voz.mp3")
TIMING_JSON = os.path.join(OUT_DIR, "najash_voz_timing.json")

# NARRACIÓN COMPLETA (del guion /tmp/najash_guion.md) — limpia, sin "…"
GUION = (
    "¿Qué tienen en común la serpiente que envenenó al mundo y el Mesías que "
    "viene a sanarlo? El mismo número. Trescientos cincuenta y ocho. Y no es una "
    "casualidad. La Cabalá lo sabe desde hace ochocientos años.\n\n"
    "Todo empezó en un jardín. La serpiente, najash, fue la criatura más astuta "
    "del campo. Con una sola pregunta sembró la duda, y la duda se volvió veneno. "
    "Ese veneno arrastró a toda la humanidad fuera del Edén.\n\n"
    "En hebreo cada letra es un número. Najash, la serpiente: nun cincuenta, jet "
    "ocho, shin trescientos. Suman trescientos cincuenta y ocho. Ahora Mashíaj, el "
    "Mesías: cuarenta, trescientos, diez, ocho. Trescientos cincuenta y ocho. La "
    "serpiente y el redentor pesan exactamente lo mismo.\n\n"
    "¿Cómo puede el destructor tener el mismo número que el salvador? ¿La caída y "
    "la redención hablando con una sola voz? Para responderlo hay que salir del "
    "jardín y entrar en el desierto.\n\n"
    "Israel marcha por el desierto y se queja contra el Cielo. Entonces llegan "
    "serpientes ardientes. Muerden, y el veneno mata. El pueblo, aterrado, suplica. "
    "Y Dios le da a Moshé una orden que parece imposible.\n\n"
    "Haz una serpiente y ponla sobre un asta. Y todo el que sea mordido, que la "
    "mire, y vivirá. Moshé forjó una serpiente de cobre, nejash nejóshet, y la "
    "levantó en alto. El mordido alzaba los ojos hacia la misma forma que lo había "
    "herido, y sanaba.\n\n"
    "Los Sabios preguntan: ¿acaso una serpiente mata, o una serpiente da vida? Y "
    "responden: ni una cosa ni la otra. Cuando Israel alzaba los ojos a lo Alto y "
    "entregaba su corazón a su Padre en los Cielos, sanaba. La misma fuerza que "
    "envenenó, levantada hacia el Cielo, se convirtió en cura.\n\n"
    "Por eso najash y Mashíaj son el mismo número. No son dos fuerzas opuestas, son "
    "la misma fuerza en dos direcciones. El veneno del Edén, alzado y reparado, es "
    "la cura del mundo. La serpiente redimida es el Mashíaj. Trescientos cincuenta y "
    "ocho que cae, y trescientos cincuenta y ocho que levanta."
)


def cargar_key():
    with open(ENV) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                return line.split("=", 1)[1].strip()
    sys.exit("❌ No encontré ELEVENLABS_API_KEY en .env.local")


def main():
    key = cargar_key()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({"text": GUION, "model_id": MODEL_V3,
                       "voice_settings": V3_SETTINGS}).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key, "Content-Type": "application/json"})
    print("🎙️  Generando voz (Martin Osborne · eleven_multilingual_v2)…")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"❌ HTTP {e.code}: {e.read().decode(errors='replace')[:600]}")

    os.makedirs(OUT_DIR, exist_ok=True)
    with open(MP3_OUT, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))

    al = data["alignment"]
    chars = al["characters"]
    starts = al["character_start_times_seconds"]
    ends = al["character_end_times_seconds"]
    palabras = []
    word = ""; ws = we = 0.0
    for ch, st, en in zip(chars, starts, ends):
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
    print(f"✅ Voz lista — {MP3_OUT}")
    print(f"   Duración: {dur:.2f}s · {len(palabras)} palabras · {os.path.getsize(MP3_OUT)//1024} KB")


if __name__ == "__main__":
    main()
