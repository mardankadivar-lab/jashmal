#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Letra Zayin (ז) — Voz Martin (ElevenLabs) con timestamps.
Un solo render. Guarda mp3 + alineación de palabras en ~/jashmal-produccion/zayin/audio/.

GUION: destilado de lib/letters/zayin.ts (verificado por el Sofer).
Límites de honestidad respetados:
  · NO se dice que זַיִן sea palabra bíblica (es hebreo rabínico).
  · NO se presenta zayin↔mazón como etimología (es drash) — se omite.
  · NO se usa la convergencia Siván/día 7 (lectura nuestra, no cita clásica).
  · NO se mencionan senderos del Árbol (Ginsburgh no los asigna).
Una sola idea: la espada que descansa · la corona se gana al soltarla.
"""
import json, urllib.request, base64, os

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne
MODEL    = "eleven_multilingual_v2"

OUTDIR = "/Users/mardan/jashmal-produccion/zayin/audio"
ENV    = "/Users/mardan/workspace/jashmal/.env.local"

GUION = (
    "Mira esta letra. Es una Vav… con una barra encima. "
    "Y esa barra lo cambia todo. "
    "La Vav desciende desde el extremo de su cabeza. "
    "La Zayin desciende desde el centro de su corona. "
    "Míralo otra vez. Un mango con una hoja: es una espada. "
    "Un poste con una diadema: es una corona. "
    "La misma forma. Las dos cosas a la vez. "
    "Su nombre significa arma. Y su número es siete: el número del Shabat. "
    "Y aquí está la paradoja más honda del alfabeto. "
    "La Mishná enseña que en Shabat el hombre no sale con su espada. "
    "Rabí Eliezer dice que las armas son un adorno. "
    "Y los Sabios responden: no son sino vergüenza. "
    "Porque un día las espadas se convertirán en arados. "
    "El día de la letra del arma "
    "es el día en que el arma se queda en casa. "
    "Y ese día no te da descanso: te da más alma. "
    "La corona no se pone desde arriba. Se gana desde abajo. "
    "La corona de la Zayin se gana el día en que sueltas la espada."
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

    mp3 = os.path.join(OUTDIR, "zayin_voz.mp3")
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

    with open(os.path.join(OUTDIR, "zayin_timing.json"), "w") as f:
        json.dump({"duration": dur, "words": words, "text": GUION}, f, ensure_ascii=False, indent=1)

    print(f"OK  dur={dur:.2f}s  palabras={len(words)}")
    print(f"mp3: {mp3}")

if __name__ == "__main__":
    main()
