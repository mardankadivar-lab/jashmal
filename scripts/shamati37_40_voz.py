#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SHAMATI 37 a 40 — la tanda completa, con la receta de siempre.

Seis episodios: el apunte 37 («Un artículo para Púrim») es el más largo del
libro y va EN TRES PARTES, igual que se hizo con el 33; el 38, el 39 y el 40
van cada uno en una pieza.

Cada episodio son dos llamadas a ElevenLabs y un pegado:
  · la LECTURA del apunte (voz Martin, eleven_v4, una sola llamada),
  · el GUION del estudio (ídem),
  · y el armado: 2 s de pausa tras la lectura, fundido de salida de 2,5 s y
    1,5 s de cola. Es la misma receta desde el apunte 22; no se cambia sin
    motivo, porque el oído de quien sigue el podcast ya la conoce.

Un script para los seis en vez de seis scripts casi idénticos: lo único que
cambia entre episodios son las rutas, y tenerlas en una tabla evita que se
desincronicen.

Uso:
    python3 scripts/shamati37_40_voz.py --contar              # mide TODO sin gastar un crédito
    python3 scripts/shamati37_40_voz.py --apunte 38           # genera y arma el 38
    python3 scripts/shamati37_40_voz.py --apunte 37 --parte 2 # genera y arma el 37, parte 2
    python3 scripts/shamati37_40_voz.py --apunte 39 --solo-armar   # solo pega los MP3 ya hechos

Antes de gastar créditos conviene correr `--contar`: si una pieza se pasa del
tope de 10.000 caracteres, la llamada falla y hay que rehacer el texto, no el
audio.
"""
import argparse, base64, json, os, re, subprocess, sys, urllib.request, urllib.error

RAIZ = "/Users/mardan/jashmal-produccion/podcast"
ENV = "/Users/mardan/workspace/jashmal/.env.local"
VOZ_MARTIN = "W5JElH3dK1UYYAiHH7uh"
MODELO = "eleven_v4"
TOPE = 10000
PALABRAS_POR_MINUTO = 139  # medido sobre los episodios ya publicados

# apunte → partes (None = una sola pieza)
TANDA = {37: [1, 2, 3], 38: None, 39: None, 40: None}


def piezas(apunte, parte):
    """Carpeta, nombre de la lectura y sufijo de los mp3 de un episodio."""
    if parte:
        base = f"{RAIZ}/shamati-{apunte}/parte-{parte}"
        return base, f"{base}/LECTURA-ARTICULO-{apunte}-PARTE-{parte}.txt", f"{apunte}-parte{parte}"
    base = f"{RAIZ}/shamati-{apunte}"
    return base, f"{base}/LECTURA-ARTICULO-{apunte}.txt", f"{apunte}"


def todas():
    for apunte, partes in TANDA.items():
        for parte in (partes or [None]):
            yield apunte, parte


def llave():
    for ln in open(ENV):
        if ln.startswith("ELEVENLABS"):
            return ln.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("No encontré ELEVENLABS_API_KEY en .env.local")


def normalizar(texto):
    """Las líneas con solo «...» son las pausas del guion: así las oye la voz."""
    return re.sub(r"\n\s*\.\.\.\s*\n", "\n\n... \n\n", texto.strip())


def tts(texto, mp3, ali):
    t = normalizar(texto)
    if len(t) > TOPE:
        sys.exit(f"{len(t)} caracteres: excede el tope {TOPE}. No llamo a la API.")
    print(f"  {len(t)} caracteres · {MODELO} -> {os.path.basename(mp3)}")
    req = urllib.request.Request(
        f"https://api.elevenlabs.io/v1/text-to-speech/{VOZ_MARTIN}"
        f"/with-timestamps?output_format=mp3_44100_128",
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


def contar():
    total = 0
    faltan = []
    for apunte, parte in todas():
        base, f_lec, _ = piezas(apunte, parte)
        etiqueta = f"{apunte}" + (f" p{parte}" if parte else "")
        for f in (f_lec, f"{base}/GUION.md"):
            if not os.path.exists(f):
                faltan.append(f)
                continue
            t = normalizar(open(f, encoding="utf-8").read())
            total += len(t)
            pal = len(t.split())
            print(f"{etiqueta:7s} {os.path.basename(f)[:34]:34s} {len(t):5d} car · "
                  f"{pal:4d} palabras · ~{pal / PALABRAS_POR_MINUTO:4.1f} min · "
                  f"{'OK' if len(t) <= TOPE else 'EXCEDE EL TOPE'}")
    print(f"\nTotal a narrar: {total} caracteres.")
    if faltan:
        print("\nTodavía no están escritos:")
        for f in faltan:
            print(f"  · {f}")


def produce(apunte, parte, solo_armar):
    base, f_lec, suf = piezas(apunte, parte)
    audio = f"{base}/audio"
    os.makedirs(audio, exist_ok=True)
    lec = f"{audio}/lectura-articulo-{suf}-eleven_v4.mp3"
    est = f"{audio}/es-shamati-{suf}-eleven_v4.mp3"
    print(f"Apunte {apunte}" + (f", parte {parte}" if parte else ""))
    if not solo_armar:
        tts(open(f_lec, encoding="utf-8").read(), lec,
            f"{audio}/lectura-articulo-{suf}-eleven_v4.alineacion.json")
        tts(open(f"{base}/GUION.md", encoding="utf-8").read(), est,
            f"{audio}/es-shamati-{suf}-eleven_v4.alineacion.json")
    out = f"{base}/SHAMATI-{suf.upper()}-episodio-completo.mp3"
    d = dur(est)
    subprocess.check_call([
        "ffmpeg", "-y", "-loglevel", "error", "-i", lec, "-i", est,
        "-filter_complex",
        f"[0:a]apad=pad_dur=2[a];[1:a]afade=t=out:st={d - 2.5:.2f}:d=2.5,"
        f"apad=pad_dur=1.5[b];[a][b]concat=n=2:v=0:a=1[o]",
        "-map", "[o]", "-c:a", "libmp3lame", "-b:a", "128k", "-ar", "44100", out])
    print(f"OK {out}  {dur(out):.1f} s  ({dur(out) / 60:.1f} min)\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--contar", action="store_true", help="mide sin gastar créditos")
    ap.add_argument("--apunte", type=int, choices=sorted(TANDA))
    ap.add_argument("--parte", type=int, choices=[1, 2, 3])
    ap.add_argument("--solo-armar", action="store_true")
    a = ap.parse_args()

    if a.contar:
        return contar()
    if not a.apunte:
        sys.exit("Dime qué apunte: --apunte 37 [--parte 2], o usa --contar.")
    partes = TANDA[a.apunte]
    if partes and not a.parte:
        sys.exit(f"El apunte {a.apunte} va en partes {partes}: falta --parte.")
    if not partes and a.parte:
        sys.exit(f"El apunte {a.apunte} va en una sola pieza: sobra --parte.")
    produce(a.apunte, a.parte, a.solo_armar)


main()
