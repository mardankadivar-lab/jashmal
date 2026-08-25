#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Ki Tavó — "La bendición que se invierte"
Reel 9:16 · Voz Martin (ElevenLabs) con timestamps. UN SOLO render
(with-timestamps). Guarda mp3 + timing.json (palabras + spans de los
8 tiempos) en /Users/mardan/jashmal-produccion/ki-tavo/audio/

Español. Sin CapCut. No se nombra la marca ni jashmal.org en el audio.

TODO EL CUERPO ES CONTENIDO VERIFICADO POR EL SOFER
(scratchpad/estudio-ki-tavo-simja.md — bloque PARA REDES).

Barreras respetadas (QUÉ NO DECIR del Sofer + directrices vigentes):
  · Gancho-paradoja en la PRIMERA frase (nada de atmósfera).
  · Tono DIAGNÓSTICO COMPASIVO, nunca amenazante: no "Dios te castiga",
    sino "la abundancia recibida como deuda se agria sola".
  · La alegría NO se presenta como emoción obligatoria: brota del
    reconocimiento del regalo (bikurim), no de un mandato de sonreír.
  · NADA de 358 / serpiente. NADA de Arizal como cita directa (si se
    usara, solo "lo recoge la Mishná Berurá" — en este guion no entra).
  · Alter Rebe: no entra en el audio (solo sería "cuentan los jasidim").
  · Ramban NO se cita sobre 28:47 (no tiene comentario ahí).
  · Cierre invita a GUARDAR.
Fuentes en voz: Devarim 28:47 (con alegría… por la abundancia de todo) ·
Rashi a 28:47 ("mientras aún tenías todo") · Or HaJaim a 28:47 (no
dejaste de servir: dejaste la alegría) · Moed Katán 9b (mismas palabras,
dos oídos) · Baal HaSulam, Hakdamá al Zohar §10–11 (una luz, dos
vasijas) · Devarim 26:10–11 (bikurim: "esto Tú me lo diste" +
"y te alegrarás en todo el bien").
"""
import json, urllib.request, urllib.error, base64, os, sys

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne
MODEL    = "eleven_multilingual_v2"

OUTDIR = "/Users/mardan/jashmal-produccion/ki-tavo/audio"
ENV    = "/Users/mardan/workspace/jashmal/.env.local"

# 8 tiempos de la narración — un tiempo por escena (k1..k8), en orden
# (mapa FIJO de gerencia — PROMPTS_GPT.txt).
# ~194 palabras ≈ 85 s de voz + end-card ≈ 88 s de reel.
# (calibración real: 224 palabras salieron en 98 s -> 2.29 palabras/s)
SENTENCES = [
    # T1 · k1 · GANCHO-PARADOJA — la mesa abundante, el comensal sombrío
    "Las noventa y ocho maldiciones de la Torá no caen sobre quien "
    "dejó de servir a Dios. Caen sobre quien siguió sirviendo, "
    "sin alegría.",

    # T2 · k2 · MEROV KOL — la copa que rebosa y se agria (28:47)
    "Y el versículo dice dónde nacen: no serviste con alegría, "
    "por la abundancia de todo. No en la falta. "
    "Dentro de la abundancia.",

    # T3 · k3 · LA CARGA — el cofre radiante cargado como roca
    "Rashi lo resume: mientras aún lo tenías todo. Y el Or HaJaim "
    "precisa: no dejaste de servir. Dejaste la alegría. "
    "Cargabas el regalo como una deuda.",

    # T4 · k4 · MOED KATÁN 9B — la misma corriente en dos oídos
    "En el Talmud, dos sabios bendicen a un joven: que siembres "
    "y no coseches. Él oye maldición. Su padre descifra: "
    "que engendres hijos, y no los entierres. "
    "Mismas palabras. Dos oídos.",

    # T5 · k5 · EL SOD — dos copas bajo el mismo rayo (Baal HaSulam)
    "El secreto: bendición y maldición no son dos luces. "
    "Son una luz en dos vasijas. Recibida como regalo, une. "
    "Recibida como derecho, se agria sola.",

    # T6 · k6 · LA MEDICINA — bikurim: "esto Tú me lo diste" (26:10)
    "Y la medicina está una página antes: las primicias. "
    "El agricultor alza su canasta y declara: esto Tú me lo diste.",

    # T7 · k7 · Y TE ALEGRARÁS — la mesa sencilla, iluminada (26:11)
    "Y el versículo siguiente: y te alegrarás en todo el bien. "
    "La alegría no se fabrica: brota cuando lo tuyo vuelve "
    "a ser regalo.",

    # T8 · k8 · CIERRE — lo derramado sube + CTA guardar
    "Nombra hoy una cosa buena que ya tienes: esto me fue dado. "
    "Guarda este estudio: la abundancia reconocida no se agria.",
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
        # speed 1.10 (calibración de luces_voz: ~190 palabras -> ~80 s)
        "voice_settings": {"stability": 0.45, "similarity_boost": 0.75,
                           "style": 0.10, "speed": 1.10},
    }).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key(), "Content-Type": "application/json"})
    print("Generando voz Martin (with-timestamps)...")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}: {e.read().decode(errors='replace')[:400]}")

    mp3 = os.path.join(OUTDIR, "kitavo_voz.mp3")
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

    with open(os.path.join(OUTDIR, "kitavo_timing.json"), "w") as f:
        json.dump({"duration": dur, "words": words, "scenes": scenes, "text": TEXT},
                  f, ensure_ascii=False, indent=1)

    print(f"OK  dur={dur:.2f}s  palabras={len(words)}")
    for s in scenes:
        print(f"  tiempo {s['escena']:>2}  {s['start']:6.2f} -> {s['end']:6.2f}")
    print(f"mp3: {mp3}")


if __name__ == "__main__":
    main()
