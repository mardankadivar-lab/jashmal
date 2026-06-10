#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · Tamar — generador de versiones de narración (SOLO audio)
═══════════════════════════════════════════════════════════════════════════
  Voz CLONADA de Mardan (voice_id 30Flj57Y61xChp5iKYNE).
  Genera 2 versiones v2 (media / alta) y opcionalmente 1 v3 experimental.
  No re-arma el video — solo los MP3 para comparar.
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, urllib.error, base64, os, sys

VOICE_ID = "30Flj57Y61xChp5iKYNE"  # voz clonada de Mardan
OUT_DIR  = os.path.expanduser("~/Desktop/jashmal-videos/Tamar")
ENV      = os.path.join(os.path.dirname(__file__), "..", ".env.local")

# ── Guion base (VERSIÓN MEDIA: tal cual, serio y dramático) ────────────────
GUION_MEDIA = (
    "El mayor escándalo sexual de la Biblia… esconde el nacimiento del Mesías. "
    "Ella se llamaba Tamar. Quedó viuda dos veces. "
    "Y el hombre que debía protegerla… la abandonó. "
    "Sin justicia, hizo lo impensable: se cubrió con un velo y se sentó en el cruce del camino. "
    "Judá la tomó por prostituta. Y le dejó en prenda su sello, su cordón y su bastón. "
    "Cuando la iban a quemar, un ángel acusador escondió las prendas para que ella muriera… "
    "y David jamás naciera. Otro ángel las devolvió. "
    "Mientras los hombres veían un escándalo… el Cielo estaba ocupado creando la luz del Rey Mashíaj. "
    "Nacieron mellizos. Al primero lo llamó Brecha. "
    "Porque por las grietas de este mundo… entra la luz. "
    "Lo que el mundo esconde… Dios lo corona. "
    "Sígueme para la próxima madre del Mashíaj."
)

# ── Guion ALTA: mismo contenido, puntuación más punzante (exclamaciones en
#    los golpes; los puntos suspensivos se quedan para el suspenso). ────────
GUION_ALTA = (
    "¡El MAYOR escándalo sexual de la Biblia… esconde el nacimiento del Mesías! "
    "Ella se llamaba Tamar. ¡Quedó viuda dos veces! "
    "Y el hombre que debía protegerla… ¡la abandonó! "
    "Sin justicia, hizo lo impensable: se cubrió con un velo y se sentó en el cruce del camino. "
    "¡Judá la tomó por prostituta! Y le dejó en prenda su sello, su cordón y su bastón. "
    "Cuando la iban a quemar, ¡un ángel acusador escondió las prendas para que David jamás naciera! "
    "Pero otro ángel las devolvió. "
    "Mientras los hombres veían un escándalo… ¡el Cielo estaba creando la luz del Rey Mashíaj! "
    "Nacieron mellizos. Al primero lo llamó Brecha. "
    "¡Porque por las grietas de este mundo… entra la luz! "
    "Lo que el mundo esconde… ¡Dios lo corona! "
    "Sígueme para la próxima madre del Mashíaj."
)

# ── v3 experimental (eleven_v3): etiquetas de emoción/énfasis embebidas ────
GUION_V3 = (
    "[con energía] ¡El MAYOR escándalo sexual de la Biblia… [enfático] esconde el nacimiento del Mesías! "
    "Ella se llamaba Tamar. [serio] Quedó viuda dos veces. "
    "Y el hombre que debía protegerla… [con dolor] la abandonó. "
    "[determinada] Sin justicia, hizo lo impensable: se cubrió con un velo y se sentó en el cruce del camino. "
    "[enfático] Judá la tomó por prostituta. Y le dejó en prenda su sello, su cordón y su bastón. "
    "[tenso] Cuando la iban a quemar, un ángel acusador escondió las prendas… [casi susurrando] para que David jamás naciera. "
    "[con alivio] Otro ángel las devolvió. "
    "[asombrado] Mientras los hombres veían un escándalo… ¡el Cielo estaba creando la luz del Rey Mashíaj! "
    "Nacieron mellizos. Al primero lo llamó Brecha. "
    "[con reverencia] Porque por las grietas de este mundo… entra la luz. "
    "[poderoso] Lo que el mundo esconde… ¡Dios lo corona! "
    "[invitando] Sígueme para la próxima madre del Mashíaj."
)


def cargar_key():
    key = ""
    with open(ENV) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                key = line.split("=", 1)[1].strip()
    if not key:
        print("❌ No encontré ELEVENLABS_API_KEY en .env.local"); sys.exit(1)
    return key


def generar(key, nombre, texto, model, voice_settings, speed=None, out_name=None):
    """Llama a ElevenLabs (endpoint simple, devuelve MP3 directo en el body)."""
    settings = dict(voice_settings)
    if speed is not None:
        settings["speed"] = speed
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}"
    body = json.dumps({
        "text": texto,
        "model_id": model,
        "voice_settings": settings,
    }).encode()
    req = urllib.request.Request(
        url, data=body, method="POST",
        headers={"xi-api-key": key, "Content-Type": "application/json",
                 "Accept": "audio/mpeg"})
    print(f"🎙️  [{nombre}] modelo={model}  settings={settings}")
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            audio = r.read()
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:500]
        print(f"   ❌ HTTP {e.code}: {detail}")
        return False
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False
    out = os.path.join(OUT_DIR, out_name)
    with open(out, "wb") as f:
        f.write(audio)
    kb = len(audio) / 1024
    print(f"   ✅ Guardado: {out}  ({kb:.0f} KB)")
    return True


def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    key = cargar_key()

    ok_media = generar(
        key, "MEDIA", GUION_MEDIA, "eleven_multilingual_v2",
        {"stability": 0.35, "similarity_boost": 0.80, "style": 0.45,
         "use_speaker_boost": True},
        speed=1.0, out_name="TAMAR_voz_media.mp3")

    ok_alta = generar(
        key, "ALTA", GUION_ALTA, "eleven_multilingual_v2",
        {"stability": 0.22, "similarity_boost": 0.75, "style": 0.62,
         "use_speaker_boost": True},
        speed=1.08, out_name="TAMAR_voz_alta.mp3")

    # v3 experimental — solo si el modelo está disponible para esta cuenta.
    ok_v3 = generar(
        key, "V3-EXPERIMENTAL", GUION_V3, "eleven_v3",
        {"stability": 0.30, "similarity_boost": 0.75, "style": 0.55,
         "use_speaker_boost": True},
        speed=None, out_name="TAMAR_voz_v3.mp3")

    print("\n──────── RESUMEN ────────")
    print(f"MEDIA: {'OK' if ok_media else 'FALLÓ'}")
    print(f"ALTA:  {'OK' if ok_alta else 'FALLÓ'}")
    print(f"V3:    {'OK' if ok_v3 else 'no disponible / falló (opcional)'}")


if __name__ == "__main__":
    main()
