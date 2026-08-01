#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Parashá EIKEV — "El talón" · Reel 9:16
Voz Martin (ElevenLabs) con timestamps. UN SOLO render (with-timestamps).
Guarda mp3 + timing.json (palabras + spans de los 11 tiempos) en
/Users/mardan/jashmal-produccion/eikev-talon/audio/

Español. Sin CapCut. No se nombra la marca en el audio.

TODO EL CUERPO ES CONTENIDO VERIFICADO POR EL SOFER
(/Users/mardan/workspace/jashmal/scratchpad/eikev-talon-verificacion.md).
El tiempo 11 es el JIDUSH DE MARDAN y va marcado en pantalla como
"LECTURA PROPIA" — nunca en boca del Zohar.

Barreras respetadas (puntos 1-10 del informe del Sofer):
  · No se dice "ceniza" atribuida al Zohar.  El Zohar dice avak (polvo).
  · No se dice "del talón" en la lucha.       Las fuentes dicen "sus pies".
  · Yaakov ELEVÓ el polvo, no lo produjo.     (Zohar Vayishlaj 5:88 + Julín 91a)
  · Bereshit 3:15 se cuenta desde el LÍMITE DE LA SERPIENTE (Ramban/Radak),
    nunca con "la simiente de la mujer" señalando a una persona.
  · Nada de najash = mashíaj = 358.  Nada de "172 significa X".
  · Nada de gematría entre עפר y אפר.  Nada de "el talón es Maljut".
"""
import json, urllib.request, urllib.error, base64, os, sys

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne
MODEL    = "eleven_multilingual_v2"

OUTDIR = "/Users/mardan/jashmal-produccion/eikev-talon/audio"
ENV    = "/Users/mardan/workspace/jashmal/.env.local"

# 11 tiempos de la narración — una escena por tiempo, en orden.
# ~194 palabras ≈ 86-90 s de voz + end-card 3,5 s ≈ 90-93 s de reel.
SENTENCES = [
    # T1 · GANCHO — Mishná Berajot 5:1 (VERIFICADA)
    "La Mishná dice algo que suena imposible: aunque una serpiente esté "
    "enroscada en tu talón, no interrumpes la oración.",

    # T2 · Bereshit 3:15 desde el límite de la serpiente (Ramban, VERIFICADA)
    "¿Por qué el talón? Desde el jardín, a la serpiente le quedó un solo "
    "blanco. La cabeza no la alcanza.",

    # T3 · Radak: solo una mordida abajo + Bereshit 25:26 (VERIFICADAS)
    "Solo una mordida, abajo. Y ahí nace Yaakov, agarrado del talón de Esav.",

    # T4 · Gematría calculada: 172 / 182 / 10 (VERIFICADA)
    "Ekev, talón, vale ciento setenta y dos. Yaakov, ciento ochenta y dos. "
    "La diferencia es diez: una yud.",

    # T5 · Zohar Bereshit 18:202 — "la yud de Yaakov" (VERIFICADA)
    "La letra más pequeña. Un talón, más una chispa. Y el Zohar la nombra: "
    "la yud de Yaakov.",

    # T6 · Zohar Vayishlaj 5:87-88 — el acusador cabalga sobre el avak (VERIFICADA)
    "De noche, junto al río, el acusador llega cabalgando sobre polvo: el "
    "polvo quemado, dice el Zohar, el que jamás da fruto.",

    # T7 · Julín 91a — hasta el Trono de Gloria. ELEVÓ, no produjo. (VERIFICADA)
    "Y el Talmud: el polvo de sus pies subió hasta el Trono de Gloria. "
    "Yaakov no lo produjo: lo elevó.",

    # T8 · Ramban a Devarim 7:12 (VERIFICADA — pieza clave)
    "Y eso es la parashá. El Ramban: la cabeza es el comienzo; el talón, el final.",

    # T9 · Rashi a Devarim 7:12 (VERIFICADA literal)
    "Rashi: las mitzvot livianas son las que pisamos con el talón. Justo "
    "donde muerde la serpiente.",

    # T10 · Remate del núcleo verificado
    "Levantar lo que pisamos: esa es la pelea.",

    # T11 · JIDUSH DE MARDAN — marcado en voz Y en pantalla como lectura propia
    "Y una lectura mía, no de las fuentes: la tierra de la que estamos "
    "hechos, al pasar por el fuego del alma, ya no es la misma.",
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
                           "style": 0.10, "speed": 1.0},
    }).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key(), "Content-Type": "application/json"})
    print("Generando voz Martin (with-timestamps)...")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}: {e.read().decode(errors='replace')[:400]}")

    mp3 = os.path.join(OUTDIR, "eikev_voz.mp3")
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

    # Spans de los 11 tiempos: por conteo exacto de palabras de cada oración.
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

    with open(os.path.join(OUTDIR, "eikev_timing.json"), "w") as f:
        json.dump({"duration": dur, "words": words, "scenes": scenes, "text": TEXT},
                  f, ensure_ascii=False, indent=1)

    print(f"OK  dur={dur:.2f}s  palabras={len(words)}")
    for s in scenes:
        print(f"  tiempo {s['escena']:>2}  {s['start']:6.2f} -> {s['end']:6.2f}")
    print(f"mp3: {mp3}")


if __name__ == "__main__":
    main()
