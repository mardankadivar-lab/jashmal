# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  voz_jashmal.py — CONFIGURACIÓN FIJA de la voz de Jashmal (ElevenLabs)
═══════════════════════════════════════════════════════════════════════════
  UN SOLO lugar para la voz. Todos los videos narrativos (betsabe, tamar y los
  futuros) IMPORTAN de aquí, para que la voz NUNCA vuelva a cambiar sola entre
  un video y otro.

  ⚙️  ¿Quieres ajustar la voz en TODOS los videos a la vez?
      Cambia los valores AQUÍ (y solo aquí). Los scripts los heredan.

  Voz OFICIAL elegida por Mardan (2026-06-06): la ENÉRGICA.
═══════════════════════════════════════════════════════════════════════════
"""

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # voz OFICIAL "Martin Osborne" (voz pro, 2026-06-07)
MODEL_V3 = "eleven_multilingual_v2"   # acento LATINO (eleven_v3 imponía el "z" de España)

# ── Configuración FIJA de la voz narrativa de Jashmal ──────────────────────
#   Voz OFICIAL "Martin Osborne" (voz profesional) — elegida por Mardan 2026-06-07.
#   stability 0.50 → estable · style 0.35 → natural con emoción · speed 1.0 → no apresurado
#   NOTA: limpiar "…" → "," en el texto antes de generar (los "…" causan pausas exageradas).
V3_SETTINGS = {
    "stability": 0.50,
    "similarity_boost": 0.75,
    "style": 0.35,
    "use_speaker_boost": True,
    "speed": 1.0,
}
