#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Letra Vav (ו) — Voz Martin (ElevenLabs) con timestamps.
Un solo render. Guarda mp3 + alineación de palabras en vav/audio/.
"""
import json, urllib.request, base64, os

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne
MODEL    = "eleven_multilingual_v2"

OUTDIR = "/Users/mardan/Desktop/Claude Jashmal/Marketing/Contenido/jashmal-videos/vav/audio"
ENV    = "/Users/mardan/workspace/jashmal/.env.local"

GUION = (
    "Mira esta letra. Una sola línea recta que baja de arriba hacia abajo. "
    "Es la Vav, y es la letra más silenciosa del alfabeto hebreo… "
    "pero hace el trabajo más importante: conectar. "
    "Su nombre significa gancho, clavo. "
    "Y es la única letra que, sola, significa y. "
    "La que dice: el cielo y la tierra. La luz y la oscuridad. "
    "La primera vez que aparece en la Torá está en la palabra número seis, "
    "uniendo el cielo con la tierra. "
    "Y su número es, justamente, seis: las seis direcciones del mundo entero. "
    "Es un clavo de luz que cose lo de arriba con lo de abajo. "
    "Y aquí está lo tuyo: tú también eres una vav. "
    "Tu vocación no es acumular la luz — es dejarla pasar. "
    "Recibir de lo alto, y entregar abajo. Ser el puente."
)

def key():
    with open(ENV) as f:
        for ln in f:
            if ln.startswith("ELEVENLABS_API_KEY="):
                return ln.split("=", 1)[1].strip()
    raise SystemExit("no key")

def main():
    os.makedirs(OUTDIR, exist_ok=True)
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({
        "text": GUION,
        "model_id": MODEL,
        "voice_settings": {"stability": 0.45, "similarity_boost": 0.75, "style": 0.10, "speed": 0.94},
    }).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key(), "Content-Type": "application/json"})
    print("Generando voz Martin...")
    with urllib.request.urlopen(req, timeout=90) as r:
        data = json.loads(r.read())

    mp3 = os.path.join(OUTDIR, "vav_voz.mp3")
    with open(mp3, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))

    a = data["alignment"]
    chars = a["characters"]
    st = a["character_start_times_seconds"]
    en = a["character_end_times_seconds"]
    words = []; w = ""; ws = we = 0.0
    for ch, s, e in zip(chars, st, en):
        if ch == " ":
            if w: words.append({"w": w, "start": ws, "end": we})
            w = ""
        else:
            if not w: ws = s
            w += ch; we = e
    if w: words.append({"w": w, "start": ws, "end": we})
    dur = en[-1] if en else 0.0

    with open(os.path.join(OUTDIR, "vav_timing.json"), "w") as f:
        json.dump({"duration": dur, "words": words, "text": GUION}, f, ensure_ascii=False, indent=1)

    print(f"OK  dur={dur:.2f}s  palabras={len(words)}")
    print(f"mp3: {mp3}")

if __name__ == "__main__":
    main()
