#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SHAMATI 18 — podcast de dos voces (Martin + Ourania) con ElevenLabs v3.

Por qué v3 y no el multilingual_v2 de los reels: esto es una CONVERSACIÓN.
v3 reacciona al contexto del turno anterior y acepta marcas de tono.
Los reels se quedan en v2 porque ahí necesito with-timestamps exacto
para sincronizar subtítulos y cortes — v3 es más expresivo pero más variable.

Límite de v3: 5.000 caracteres por llamada. El episodio son ~13.400,
así que se graba por TRAMOS cortados en frontera de sección (nunca a
mitad de idea) y se unen con un respiro corto.

Uso:
    python3 shamati18_voz.py --tramo 1     # graba solo el tramo 1 (prueba)
    python3 shamati18_voz.py               # graba todos y une
"""
import json, os, re, sys, subprocess, urllib.request, urllib.error

GUION = "/Users/mardan/jashmal-produccion/podcast/shamati-18/GUION.md"
OUT   = "/Users/mardan/jashmal-produccion/podcast/shamati-18/audio"
ENV   = "/Users/mardan/workspace/jashmal/.env.local"

VOZ_A = "W5JElH3dK1UYYAiHH7uh"   # Martin Osborne — el que estudió el texto
VOZ_B = "E6Ovvm45Mr8G306dTM7t"   # Ourania — la que pregunta y empuja
MODELO = "eleven_v3"
LIMITE = 4800                     # margen bajo el tope de 5.000

# ── TONOS ────────────────────────────────────────────────────────────
# Se aplican por fragmento ÚNICO del turno, no por índice: si el Sofer
# reordena el guion, los tonos siguen cayendo donde deben.
# Deliberadamente POCOS: v3 sobre-actúa si se le marca todo. Solo los
# giros reales del episodio.
TONOS = {
    "¿Cómo que no está?":                         "[surprised]",
    "¿Del agravio? ¿No de las lágrimas?":         "[surprised]",
    "Espera. ¿Quién llora ahí?":                  "[curious]",
    "¿Dios tiene una habitación para llorar?":    "[surprised]",
    "Eso es durísimo":                            "[serious]",
    "Eso es peor que esconderse":                 "[serious]",
    "Infinitamente peor":                         "[serious]",
    "Eso cierra el círculo":                      "[thoughtful]",
    "Y un detalle que me dejó helado":            "[thoughtful]",
    "La misma palabra. Pantalla.":                "[quietly]",
    "Yo me quedo con la habitación":              "[warm]",
    "Hasta la próxima.":                          "[warm]",
}


def llave():
    with open(ENV) as f:
        for ln in f:
            if ln.startswith("ELEVENLABS"):
                return ln.split("=", 1)[1].strip().strip('"').strip("'")
    sys.exit("No encontré ELEVENLABS_API_KEY en .env.local")


def leer_turnos():
    """Devuelve [(seccion, 'A'|'B', texto), ...] en orden."""
    turnos, seccion = [], "0"
    for ln in open(GUION, encoding="utf-8"):
        if ln.startswith("# FUENTES VERIFICADAS"):
            break                                  # el aparato crítico no se graba
        m = re.match(r"^## (\d+) ·", ln)
        if m:
            seccion = m.group(1); continue
        m = re.match(r"^\*\*([AB]):\*\*\s*(.+)$", ln.strip())
        if m:
            turnos.append((seccion, m.group(1), m.group(2).strip()))
    return turnos


def con_tono(texto):
    for clave, tag in TONOS.items():
        if clave in texto:
            return f"{tag} {texto}"
    return texto


def hacer_tramos(turnos):
    """Corta PREFERENTEMENTE en frontera de sección, pero nunca se pasa del
    límite de v3: si una sección sola ya no cabe, corta en el turno anterior.
    (Bug real: la sección 3 es larga y el tramo 1 salió en 5.279 car., por
    encima del tope de 5.000 — el corte por sección no basta por sí solo.)"""
    tramos, actual, n, sec_actual = [], [], 0, None
    for sec, quien, txt in turnos:
        t = con_tono(txt)
        cambia_seccion = sec != sec_actual
        no_cabe = n + len(t) > LIMITE
        if actual and no_cabe:
            # se corta sí o sí; que caiga en cambio de sección es un bonus
            tramos.append(actual); actual, n = [], 0
        elif actual and cambia_seccion and n > LIMITE * 0.6:
            # frontera natural y ya vamos servidos: mejor cortar aquí
            tramos.append(actual); actual, n = [], 0
        sec_actual = sec
        actual.append({"text": t, "voice_id": VOZ_A if quien == "A" else VOZ_B})
        n += len(t)
    if actual:
        tramos.append(actual)
    return tramos


def grabar(inputs, destino, key):
    body = json.dumps({"inputs": inputs, "model_id": MODELO}).encode()
    req = urllib.request.Request(
        "https://api.elevenlabs.io/v1/text-to-dialogue",
        data=body, headers={"xi-api-key": key, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=900) as r:
            open(destino, "wb").write(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"ERROR {e.code}: {e.read()[:500].decode('utf8','replace')}")
    return os.path.getsize(destino)


def main():
    os.makedirs(OUT, exist_ok=True)
    key = llave()
    turnos = leer_turnos()
    tramos = hacer_tramos(turnos)

    total = sum(len(t["text"]) for tr in tramos for t in tr)
    print(f"turnos: {len(turnos)} · tramos: {len(tramos)} · caracteres: {total}")
    for i, tr in enumerate(tramos, 1):
        print(f"  tramo {i}: {len(tr)} turnos, {sum(len(t['text']) for t in tr)} car.")

    solo = None
    if "--tramo" in sys.argv:
        solo = int(sys.argv[sys.argv.index("--tramo") + 1])

    hechos = []
    for i, tr in enumerate(tramos, 1):
        if solo and i != solo:
            continue
        dest = os.path.join(OUT, f"tramo{i}.mp3")
        print(f"grabando tramo {i}…", flush=True)
        print(f"  ok — {grabar(tr, dest, key)} bytes")
        hechos.append(dest)

    if solo:
        print("Tramo de prueba listo. Verifica y corre sin --tramo para el resto.")
        return

    # unir con medio segundo de respiro entre tramos
    lista = os.path.join(OUT, "lista.txt")
    sil = os.path.join(OUT, "sil.mp3")
    subprocess.run(["ffmpeg","-v","error","-f","lavfi","-i",
                    "anullsrc=r=44100:cl=mono","-t","0.5","-y",sil], check=True)
    with open(lista,"w") as f:
        for i,d in enumerate(hechos):
            if i: f.write(f"file '{sil}'\n")
            f.write(f"file '{d}'\n")
    final = "/Users/mardan/jashmal-produccion/podcast/shamati-18/es-shamati-18.mp3"
    subprocess.run(["ffmpeg","-v","error","-f","concat","-safe","0","-i",lista,
                    "-c:a","libmp3lame","-b:a","96k","-y",final], check=True)
    dur = subprocess.run(["ffprobe","-v","error","-show_entries","format=duration",
                          "-of","default=nw=1:nk=1",final],
                         capture_output=True, text=True).stdout.strip()
    print(f"\nLISTO: {final}\nduración: {float(dur):.1f} s ({float(dur)/60:.1f} min)")


if __name__ == "__main__":
    main()
