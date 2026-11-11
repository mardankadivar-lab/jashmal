#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SHAMATI 36 — «Cuáles son los tres cuerpos en el hombre» (apunte 36).
Lectura del artículo + monólogo (Martin, ElevenLabs eleven_v4), UNA llamada por
pieza, y armado del episodio completo. Misma receta que el 35: 2 s de pausa tras
la lectura, fundido de salida de 2,5 s y 1,5 s de cola.

Este apunte va en UNA sola parte (el 35 iba en dos).

Decisiones de Mardan, 11 de noviembre de 2026:
  · El pasaje duro del último párrafo («los malvados… morirán sin sabiduría»)
    va TAL CUAL, sin suavizar. El guion lo lee y lo encuadra después.
  · «salvarse» → «librarse» APROBADO (hebreo lehinatzel: rescatar, escapar de).
    Ya aplicado en LECTURA-ARTICULO-36.txt; articulo-36-crudo.txt no se toca.

Uso:
    python3 scripts/shamati36_voz.py                # lectura + monólogo + episodio
    python3 scripts/shamati36_voz.py --solo-armar   # solo une los MP3 ya hechos
    python3 scripts/shamati36_voz.py --contar       # mide sin gastar créditos
"""
import argparse, base64, json, os, re, subprocess, sys, urllib.request, urllib.error

RAIZ = "/Users/mardan/jashmal-produccion/podcast/shamati-36"
ENV = "/Users/mardan/workspace/jashmal/.env.local"
VOZ_MARTIN = "W5JElH3dK1UYYAiHH7uh"
MODELO = "eleven_v4"
TOPE = 10000


def llave():
    for ln in open(ENV):
        if ln.startswith("ELEVENLABS"):
            return ln.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("No encontré ELEVENLABS_API_KEY en .env.local")


def normalizar(texto):
    return re.sub(r"\n\s*\.\.\.\s*\n", "\n\n... \n\n", texto.strip())


def tts(texto, mp3, ali):
    t = normalizar(texto)
    if len(t) > TOPE:
        sys.exit(f"{len(t)} caracteres: excede el tope {TOPE}")
    print(f"{len(t)} caracteres · {MODELO} -> {mp3}")
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOZ_MARTIN}/with-timestamps?output_format=mp3_44100_128",
        data=json.dumps({"text": t, "model_id": MODELO}).encode(),
        headers={"xi-api-key": llave(), "Content-Type": "application/json"},
    )
    try:
        r = json.load(urllib.request.urlopen(req, timeout=900))
    except urllib.error.HTTPError as e:
        sys.exit(f"HTTP {e.code}: {e.read().decode()[:500]}")
    open(mp3, "wb").write(base64.b64decode(r["audio_base64"]))
    json.dump(r.get("alignment"), open(ali, "w"))


def dur(f):
    return float(subprocess.check_output(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration",
         "-of", "csv=p=0", f]).decode())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--solo-armar", action="store_true")
    ap.add_argument("--contar", action="store_true")
    a = ap.parse_args()

    AUDIO = f"{RAIZ}/audio"
    os.makedirs(AUDIO, exist_ok=True)
    f_lec = f"{RAIZ}/LECTURA-ARTICULO-36.txt"
    f_gui = f"{RAIZ}/GUION.md"
    lec = f"{AUDIO}/lectura-articulo-36-eleven_v4.mp3"
    est = f"{AUDIO}/es-shamati-36-eleven_v4.mp3"

    if a.contar:
        for f in (f_lec, f_gui):
            t = normalizar(open(f, encoding="utf-8").read())
            pal = len(t.split())
            print(f"{os.path.basename(f):28s} {len(t):5d} car · {pal:4d} palabras "
                  f"· ~{pal/139:.1f} min · {'OK' if len(t) <= TOPE else 'EXCEDE'}")
        return

    if not a.solo_armar:
        tts(open(f_lec, encoding="utf-8").read(), lec,
            f"{AUDIO}/lectura-articulo-36-eleven_v4.alineacion.json")
        tts(open(f_gui, encoding="utf-8").read(), est,
            f"{AUDIO}/es-shamati-36-eleven_v4.alineacion.json")

    out = f"{RAIZ}/SHAMATI-36-episodio-completo.mp3"
    d = dur(est)
    subprocess.check_call([
        "ffmpeg", "-y", "-loglevel", "error", "-i", lec, "-i", est,
        "-filter_complex",
        f"[0:a]apad=pad_dur=2[a];[1:a]afade=t=out:st={d-2.5:.2f}:d=2.5,"
        f"apad=pad_dur=1.5[b];[a][b]concat=n=2:v=0:a=1[o]",
        "-map", "[o]", "-c:a", "libmp3lame", "-b:a", "128k", "-ar", "44100", out])
    print("OK", out, f"{dur(out):.1f} s  ({dur(out)/60:.1f} min)")


main()
