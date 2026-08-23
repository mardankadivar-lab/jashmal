#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Misterio "Las Cinco Luces y su revelación en el Mashíaj"
Reel 9:16 · Voz Martin (ElevenLabs) con timestamps. UN SOLO render
(with-timestamps). Guarda mp3 + timing.json (palabras + spans de los
8 tiempos) en /Users/mardan/jashmal-produccion/cinco-luces/audio/

Español. Sin CapCut. No se nombra la marca ni jashmal.org en el audio.

TODO EL CUERPO ES CONTENIDO VERIFICADO POR EL SOFER
(scratchpad/estudio-cinco-luces.md — bloque PARA REDES).

Barreras respetadas (QUÉ NO DECIR del Sofer + directrices de mercadeo):
  · Gancho-paradoja en la PRIMERA frase (nada de atmósfera).
  · "la tradición la nombra de cinco maneras" — NUNCA "los cabalistas
    hablan de cinco luces" (el quinteto es mapa de Jashmal).
  · NADA de 358 / serpiente en el audio (directriz del proyecto).
  · NADA de "la Yejidá es el alma del Mashíaj" como cita textual.
  · NO se usa "¿dónde guardó la luz? en la Torá" (no localizado).
  · Mashíaj como MISTERIO (destinatario de una luz), no teología.
  · Cierre invita a GUARDAR (el público guarda).
Fuentes en voz: Jaguigá 12a (Adam de extremo a extremo, guardada para
los justos) · Pesikta Rabbati 36 (la luz del Mashíaj, bajo el Trono,
para él y su generación) · Baal HaSulam TES II (makif = asegurada) ·
Besht en Meor Einayim, Pinjás (la parte de la estatura).
"""
import json, urllib.request, urllib.error, base64, os, sys

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne
MODEL    = "eleven_multilingual_v2"

OUTDIR = "/Users/mardan/jashmal-produccion/cinco-luces/audio"
ENV    = "/Users/mardan/workspace/jashmal/.env.local"

# 8 tiempos de la narración — un tiempo por escena (l1..l8), en orden.
# ~205 palabras ≈ 82-86 s de voz + end-card ≈ 88-90 s de reel.
SENTENCES = [
    # T1 · l1 · GANCHO-PARADOJA — imposibilidad concreta, primera frase
    "La Torá nombra la luz cinco veces antes de que exista el sol. "
    "El sol llega recién al cuarto día. ¿Qué luz es esa? "
    "La tradición la nombra de cinco maneras.",

    # T2 · l2 · OR YASHAR — desciende (kav "como un conducto delgado")
    "La primera: or yashar, la luz directa. Baja del Infinito "
    "como un conducto delgado. Un regalo que nadie ganó.",

    # T3 · l3 · OR JOZER — retorna (masaj: rechazo del que nace luz)
    "La segunda: or jozer, la luz que retorna. La vasija rechaza recibir "
    "solo para sí, y de ese rechazo nace una luz que sube.",

    # T4 · l4 · OR PNIMÍ — habita ("la luz vestida en la vasija")
    "La tercera: or pnimí, la luz interior. La que ya cupo. "
    "La que ya habita en ti.",

    # T5 · l5 · OR MAKIF — rodea porque no cabe ("hearah betujá")
    "La cuarta: or makif, la luz que te rodea porque no cabe. "
    "Y no se va: está asegurada. Terminará entrando.",

    # T6 · l6 · OR HAGANUZ — guardada (Jaguigá 12a)
    "Y la quinta: or haganuz, la luz guardada. Con ella, dice el Talmud, "
    "Adam veía de un extremo del mundo al otro. "
    "Guardada para los justos del porvenir.",

    # T7 · l7 · EL HALLAZGO — Pesikta Rabbati 36 (el midrash lo dice solo)
    "¿Para quién? Un midrash antiguo, la Pesikta Rabbati, responde "
    "con nombre propio: es la luz del Mashíaj. Guardada bajo el Trono "
    "de la Gloria, para él y su generación.",

    # T8 · l8 · CIERRE — Besht (estatura) + makif→pnimí + CTA guardar
    "Y el Baal Shem Tov enseñó: cada alma construye la parte de esa "
    "estatura que le pertenece. La luz que hoy te rodea, un día te "
    "habita. Guarda este estudio: la quinta luz tiene destinatario.",
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
        # speed 1.10: a 1.05 la voz salió en 88.5s y el reel con end-card
        # se pasaba de 90; a 1.10 queda ~84s de voz, ~87s de reel.
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

    mp3 = os.path.join(OUTDIR, "luces_voz.mp3")
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

    with open(os.path.join(OUTDIR, "luces_timing.json"), "w") as f:
        json.dump({"duration": dur, "words": words, "scenes": scenes, "text": TEXT},
                  f, ensure_ascii=False, indent=1)

    print(f"OK  dur={dur:.2f}s  palabras={len(words)}")
    for s in scenes:
        print(f"  tiempo {s['escena']:>2}  {s['start']:6.2f} -> {s['end']:6.2f}")
    print(f"mp3: {mp3}")


if __name__ == "__main__":
    main()
