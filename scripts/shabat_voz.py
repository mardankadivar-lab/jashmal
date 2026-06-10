#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Genera "Shabat Shalom" con la voz clonada de Mardan (ElevenLabs) — tono sereno.
import json, urllib.request, urllib.error, os, sys

VOICE_ID = "30Flj57Y61xChp5iKYNE"
ENV = os.path.join(os.path.dirname(__file__), "..", ".env.local")
OUT = os.path.expanduser("~/Desktop/jashmal-videos/_shabat/shabat_shalom_voz.mp3")

def cargar_key():
    with open(ENV) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                return line.split("=", 1)[1].strip()
    sys.exit("❌ No encontré ELEVENLABS_API_KEY en .env.local")

key = cargar_key()
body = json.dumps({
    "text": "[con reverencia] Shabat Shalom.",
    "model_id": "eleven_v3",   # MISMO modelo que la narración del video (timbre igual)
    "voice_settings": {"stability": 0.35, "similarity_boost": 0.75,
                       "style": 0.45, "use_speaker_boost": True},
}).encode()
req = urllib.request.Request(
    f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}", data=body, method="POST",
    headers={"xi-api-key": key, "Content-Type": "application/json", "Accept": "audio/mpeg"})
os.makedirs(os.path.dirname(OUT), exist_ok=True)
try:
    with urllib.request.urlopen(req, timeout=120) as r:
        audio = r.read()
except urllib.error.HTTPError as e:
    sys.exit(f"❌ HTTP {e.code}: {e.read().decode(errors='replace')[:300]}")
open(OUT, "wb").write(audio)
print(f"✅ OK {OUT}  ({len(audio)//1024} KB)")
