#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · Alef — generador de VOZ (ElevenLabs)
═══════════════════════════════════════════════════════════════════════════
  Genera el MP3 de narración + JSON de timestamps de palabras.
  Guarda todo en ~/Desktop/jashmal-videos/Alef/.
  Usa la voz oficial de Jashmal (Martin Osborne) definida en voz_jashmal.py.

  Uso:
    python3 scripts/alef-voz.py
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, urllib.error, os, sys, base64
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from voz_jashmal import VOICE_ID, MODEL_V3, V3_SETTINGS

ENV     = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env.local")
OUT_DIR = os.path.expanduser("~/Desktop/jashmal-videos/Alef")
MP3_OUT = os.path.join(OUT_DIR, "alef_voz.mp3")
TIMING  = os.path.join(OUT_DIR, "alef_voz_timing.json")

# ─── GUION — narración ceremonial, pausada, como una revelación ─────────────
# Tono: grave, sagrado. No religioso kitsch. ~60-70 segundos.
# Las comas reemplazan los puntos suspensivos para evitar pausas exageradas.
GUION = (
    "El silencio tiene una forma. "
    "Se llama Alef.\n\n"
    "Es la primera letra del alfabeto hebreo. "
    "La única que no emite sonido. "
    "No es un vacío, es una presencia.\n\n"
    "Mira su forma: no es una sola línea. "
    "Es tres letras escondidas dentro de una. "
    "Una Yud arriba. "
    "Una Yud abajo. "
    "Una Vav diagonal que las sostiene en el centro.\n\n"
    "Diez, más diez, más seis. "
    "Veintiséis. "
    "El valor exacto del Nombre de Dios. "
    "La Alef ya contenía el Nombre antes de que el mundo supiera hablar.\n\n"
    "Su valor es uno. Pero su nombre completo, Alef, escrito con todas sus letras, "
    "vale ciento once. "
    "El uno que se multiplica a sí mismo sin perder su unidad.\n\n"
    "Y del Alef nacen las palabras que sostienen el mundo. "
    "Anojí, Yo soy. "
    "Ejad, Uno. "
    "Or, Luz. "
    "Emet, Verdad. "
    "Ahavá, Amor. "
    "Ehyé, Seré.\n\n"
    "Todo comenzó en silencio. "
    "Todo comenzó en el Alef."
)


def cargar_key():
    with open(ENV) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                return line.split("=", 1)[1].strip()
    sys.exit("No encontre ELEVENLABS_API_KEY en .env.local")


def main():
    key = cargar_key()
    os.makedirs(OUT_DIR, exist_ok=True)

    url  = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({
        "text": GUION,
        "model_id": MODEL_V3,
        "voice_settings": V3_SETTINGS,
    }).encode()
    req = urllib.request.Request(url, data=body, method="POST",
          headers={"xi-api-key": key, "Content-Type": "application/json"})

    print(f"Generando voz para el Alef (Martin Osborne, eleven_multilingual_v2)...")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}: {e.read().decode(errors='replace')[:600]}")

    # Guardar MP3
    with open(MP3_OUT, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))

    # Construir lista de palabras con timestamps
    al     = data["alignment"]
    chars  = al["characters"]
    starts = al["character_start_times_seconds"]
    ends   = al["character_end_times_seconds"]

    palabras = []
    word = ""; ws = we = 0.0
    for ch, st, en in zip(chars, starts, ends):
        if ch.isspace():
            if word:
                palabras.append({"w": word, "start": ws, "end": we})
                word = ""
        else:
            if not word: ws = st
            word += ch; we = en
    if word:
        palabras.append({"w": word, "start": ws, "end": we})

    dur = ends[-1] if ends else 0.0
    with open(TIMING, "w") as f:
        json.dump({"palabras": palabras, "dur": dur}, f)

    print(f"Listo: {MP3_OUT}")
    print(f"  Duracion: {dur:.2f}s  |  {len(palabras)} palabras  |  {os.path.getsize(MP3_OUT)//1024} KB")
    print(f"  Timing:   {TIMING}")


if __name__ == "__main__":
    main()
