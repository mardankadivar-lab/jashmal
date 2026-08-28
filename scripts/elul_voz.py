#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Serie «Tiempos Sagrados» · Estudio 1 — ELUL
Reel "El nombre escondido" · 9:16 · Voz Martin (ElevenLabs) con
timestamps. UN SOLO render (with-timestamps). Guarda mp3 + timing.json
(palabras + spans de los 8 tiempos) en
/Users/mardan/jashmal-produccion/tiempos-sagrados/elul/audio/

Español. Sin CapCut. No se nombra "jashmal.org" en el audio, y la marca
se pronuncia "Khashmal" (aquí no se nombra en absoluto).

TODO EL CUERPO SALE DEL ESTUDIO YA VERIFICADO POR EL SOFER
(app/[locale]/misterio/elul/data.ts). Nada añadido, nada inventado.

Fuentes que sostienen cada frase:
  T2 · Shir HaShirim 6:3 — אֲנִי לְדוֹדִי וְדוֹדִי לִי, acróstico אלול
  T3 · Shir HaShirim 2:16 — דּוֹדִי לִי וַאֲנִי לוֹ (el orden inverso)
  T4 · Malbim a Shir HaShirim 6:3 — "מתחלת": es ELLA la que empieza
  T5 · Likutei Torá, Re'eh 32b — la parábola del Rey en el campo
  T6 · Tur, Oraj Jaim 581 (citando Pirkei deRabí Eliezer) — el tercer
       ascenso de Moshé: 40 días de Rosh Jodesh Elul a Yom Kipur
  T7 · Sefer Yetzirá (Gra) 5 — la letra del mes es la yud; sentido מַעֲשֶׂה
  T8 · Maasé del estudio — dar el primer paso; la medida es la yud

BARRERAS:
  · Nada de "casi nadie lo sabe" como afirmación sobre terceros: se dice
    "nadie te lo enseñó", que es sobre el oyente, no una estadística.
  · No se dice que el mes SE LLAME así por el verso (es notarikón, no
    etimología). Se dice que el nombre está escondido / que la tradición
    eligió esa versión. Esa distinción la exige el aviso del Sofer.
  · No entra la gematría 67 = Biná (va en el carrusel, no en el reel:
    un gancho, una idea).
  · No entran las cuatro yudim = 40 (eso es el reel de reserva).
  · Cierre invita a GUARDAR y a hacer UNA cosa hoy.
"""
import json, urllib.request, urllib.error, base64, os, sys

VOICE_ID = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne
MODEL    = "eleven_multilingual_v2"

OUTDIR = "/Users/mardan/jashmal-produccion/tiempos-sagrados/elul/audio"
ENV    = "/Users/mardan/workspace/jashmal/.env.local"

# 8 tiempos — un tiempo por escena (e1..e8), en orden.
# Calibración de kitavo_voz (speed 1.10): 194 palabras -> 87.3 s
# es decir ~2.22 palabras/s. Aquí ~186 palabras -> ~84 s de voz
# + end-card (2.0 s) ≈ 86 s de reel. Dentro de la ventana 60-90 s.
SENTENCES = [
    # T1 · e1 · GANCHO (los primeros 3 s lo deciden todo)
    "El nombre de este mes está escondido dentro de un verso de amor. "
    "Y nadie te lo enseñó.",

    # T2 · e2 · EL ACRÓSTICO — Shir HaShirim 6:3
    "Cantar de los Cantares: yo soy de mi Amado, y mi Amado es mío. "
    "La primera letra de cada palabra: álef, lámed, vav, lámed. Elul.",

    # T3 · e3 · EL ESPEJO — Shir HaShirim 2:16
    "Pero el mismo libro las trae al revés: "
    "mi Amado es mío, y yo soy suyo. Ahí empieza Él.",

    # T4 · e4 · LA ELECCIÓN — Malbim a 6:3
    "La tradición tenía las dos, y para nombrar el mes eligió esta. "
    "El Malbim lo dice sobre el versículo: es ella la que empieza. "
    "Yo primero.",

    # T5 · e5 · EL REY EN EL CAMPO — Likutei Torá, Re'eh 32b
    "Por eso la parábola: todo el año el Rey está en su palacio, tras "
    "guardias y protocolos. En Elul sale al campo. "
    "Pero no toca a tu puerta.",

    # T6 · e6 · EL PLAZO — Tur, Oraj Jaim 581
    "Y no es un ánimo: es un plazo. Cuarenta días desde que Moshé sube "
    "al monte hasta que baja con las segundas tablas: Yom Kipur.",

    # T7 · e7 · LA LETRA DEL MES — Sefer Yetzirá 5
    "La letra del mes, según el Sefer Yetzirá, es la yud: la más pequeña "
    "del alfabeto. Y su sentido es acción.",

    # T8 · e8 · CIERRE — el Maasé del estudio + CTA guardar
    "Hoy escoge una relación pendiente y da tú el primer paso, sin "
    "esperar respuesta. El tamaño del gesto no importa. Que exista, sí. "
    "Guarda esto.",
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

    mp3 = os.path.join(OUTDIR, "elul_voz.mp3")
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

    with open(os.path.join(OUTDIR, "elul_timing.json"), "w") as f:
        json.dump({"duration": dur, "words": words, "scenes": scenes,
                   "text": TEXT}, f, ensure_ascii=False, indent=1)

    print(f"OK  dur={dur:.2f}s  palabras={len(words)}")
    for s in scenes:
        print(f"  tiempo {s['escena']:>2}  {s['start']:6.2f} -> {s['end']:6.2f}")
    print(f"mp3: {mp3}")


def contar():
    """Sin llamar a la API: estima la duración por conteo de palabras."""
    tot = 0
    for i, s in enumerate(SENTENCES, 1):
        n = len(s.split())
        tot += n
        print(f"  T{i}  {n:>3} palabras  ~{n/2.22:5.1f} s   {s[:58]}...")
    print(f"\n  TOTAL {tot} palabras  ->  ~{tot/2.22:.1f} s de voz"
          f"  ->  reel ~{tot/2.22 + 2.0:.1f} s con end-card")


if __name__ == "__main__":
    if "--contar" in sys.argv:
        contar()
    else:
        main()
