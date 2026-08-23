#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Letra Tet (ט) — Voz Martin (ElevenLabs) con timestamps.
Un solo render. Guarda mp3 + alineación de palabras en ~/jashmal-produccion/tet/audio/.

GUION: destilado de https://jashmal.org/es/letra/tet (verificado por el Sofer).
Límites de honestidad respetados:
  · NO se dice que טֵית aparezca en el Tanaj (la página lo declara).
  · NO se presenta tet↔9 meses como cita clásica: el guion solo EVOCA el
    vientre como imagen ("nueve meses guarda el vientre…"), que es el drash
    declarado de la página, sin atribuirlo a fuente.
  · NO se usa la convergencia 9ª letra ↔ Yesod (lectura nuestra) ni טת=409.
Una sola idea: la letra más cerrada es la inicial de "bueno" ·
el bien más grande es el que está guardado.
Arco: paradoja → tres versículos sin tet → la luz escondida →
Rabí Akiva de noche → el Zohar y el bien sellado → cierre.
"""
import json, urllib.request, base64, os

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne
MODEL    = "eleven_multilingual_v2"

OUTDIR = "/Users/mardan/jashmal-produccion/tet/audio"
ENV    = "/Users/mardan/workspace/jashmal/.env.local"

GUION = (
    "Mira esta letra. Es la más cerrada de todo el alfabeto. "
    "Una vasija cuyo borde se dobla hacia adentro, "
    "como si abrazara algo que no quiere mostrar. "
    "Y aquí está la paradoja: esta letra, la más hermética, "
    "es la inicial de Tov: bueno. "
    "La Torá crea cielos, tierra, oscuridad y luz. "
    "Tres versículos enteros, sin escribir una sola Tet. "
    "Y cuando por fin la escribe, es para decir que la luz era buena. "
    "El Talmud enseña que esa luz del primer día, "
    "con la que se veía de un extremo al otro del mundo, fue escondida. "
    "¿Para quién? Para los justos, en el porvenir. "
    "Rabí Akiva lo convirtió en hábito: "
    "todo lo que hace el Misericordioso, para bien lo hace. "
    "Y lo dijo de noche, en un campo, después de que le negaran posada. "
    "En el Zohar, la Tet pide que el mundo sea creado con ella. "
    "Y el Creador le responde: tu bien está sellado dentro de ti. "
    "Nueve meses guarda el vientre lo que más ama, antes de mostrarlo. "
    "Hay bienes que se te muestran… y hay bienes que se te guardan."
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

    mp3 = os.path.join(OUTDIR, "tet_voz.mp3")
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

    with open(os.path.join(OUTDIR, "tet_timing.json"), "w") as f:
        json.dump({"duration": dur, "words": words, "text": GUION}, f, ensure_ascii=False, indent=1)

    print(f"OK  dur={dur:.2f}s  palabras={len(words)}")
    print(f"mp3: {mp3}")

if __name__ == "__main__":
    main()
