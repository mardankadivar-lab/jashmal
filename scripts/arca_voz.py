#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Misterio — "El Arca que no ocupaba lugar"
מקום ארון אינו מן המדה  (Bavá Batrá 99a; Meguilá 10b)

Voz Martin (ElevenLabs) con timestamps. Un solo render.
Guarda mp3 + timing.json (palabras + spans de las 9 escenas) en
/Users/mardan/jashmal-produccion/arca-no-ocupa-lugar/audio/

Español. Sin CapCut. No se nombra la marca en el audio.
Guión APROBADO por Mardan (2026-07-19), se graba TAL CUAL.
"""
import json, urllib.request, urllib.error, base64, os, sys

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne
MODEL    = "eleven_multilingual_v2"

OUTDIR = "/Users/mardan/jashmal-produccion/arca-no-ocupa-lugar/audio"
ENV    = "/Users/mardan/workspace/jashmal/.env.local"

# 9 tiempos de la narracion (una imagen/placeholder por tiempo, en orden)
SENTENCES = [
    "El objeto más sagrado del judaísmo… no ocupaba espacio.",

    "El Arca del Pacto vivía en el Lugar Santísimo. Y los sabios del Talmud "
    "hicieron algo peligroso: sacaron la cuenta.",

    "La cámara medía veinte codos de ancho. El Arca, dos codos y medio. Y el "
    "texto dice que quedaban diez codos libres… a cada lado.",

    "Diez, más el Arca, más diez. Veintidós codos y medio. Dentro de un cuarto "
    "de veinte.",

    "Sobra exactamente dos codos y medio. El ancho preciso del Arca. Es como si "
    "el Arca… no se contara.",

    "Los sabios no dijeron que cabía por milagro. Dijeron algo más hondo: el "
    "Arca estaba plenamente presente, pero no ocupaba lugar.",

    "En la creación, Dios se contrae para hacerle sitio al mundo. Aquí ocurre lo "
    "contrario: la Presencia está tan entera, que el espacio deja de ser la medida.",

    "Lo sagrado no obedece la aritmética de la escasez.",

    "¿Y si lo más importante de tu vida tampoco se mide por el lugar que ocupa?",
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
        "voice_settings": {"stability": 0.45, "similarity_boost": 0.75,
                           "style": 0.10, "speed": 0.95},
    }).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key(), "Content-Type": "application/json"})
    print("Generando voz Martin (with-timestamps)...")
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}: {e.read().decode(errors='replace')[:400]}")

    mp3 = os.path.join(OUTDIR, "arca_voz.mp3")
    with open(mp3, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))

    # Reconstruir palabras desde la alineacion por caracteres
    a = data["alignment"]
    chars, st, en = a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]
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

    # Spans de las 9 escenas: por conteo exacto de palabras de cada oracion.
    scenes, idx = [], 0
    for i, sent in enumerate(SENTENCES):
        nw = len(sent.split())
        seg = words[idx:idx + nw]
        scenes.append({
            "img": f"{i+1}.png",
            "start": round(seg[0]["start"], 3),
            "end":   round(seg[-1]["end"], 3),
        })
        idx += nw

    with open(os.path.join(OUTDIR, "arca_timing.json"), "w") as f:
        json.dump({"duration": dur, "words": words, "scenes": scenes, "text": TEXT},
                  f, ensure_ascii=False, indent=1)

    print(f"OK  dur={dur:.2f}s  palabras={len(words)}")
    for s in scenes:
        print(f"  {s['img']:>6}  {s['start']:6.2f} -> {s['end']:6.2f}")
    print(f"mp3: {mp3}")


if __name__ == "__main__":
    main()
