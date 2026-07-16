#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · "EL TERCER TEMPLO — LA SÍNTESIS" (Serie Mashíaj, cap. 3)
═══════════════════════════════════════════════════════════════════════════
  Reel vertical ~80-90s sincronizado de UN SOLO golpe (sin CapCut):
   1) voz Martin Osborne (ElevenLabs, with-timestamps) — voz_jashmal.py
   2) los tiempos de la voz definen la duración de cada escena
   3) 8 imágenes (img/) con Ken Burns + overlays (build/overlay_N.png, ya
      hechos: Cinzel + hebreo con niqqud) + end-card de marca (build/endcard.png)
   4) mux de la voz completa sobre el video → tercer-templo_v1.mp4

  La voz dice "Khashmal" y NO dice la URL (regla de la serie). Solo ESPAÑOL.
  Uso:  python3 scripts/tercer-templo-video.py            (render completo)
        python3 scripts/tercer-templo-video.py --voz       (solo voz + tiempos)
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, urllib.error, base64, os, subprocess, sys, re, unicodedata

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from voz_jashmal import VOICE_ID, MODEL_V3 as MODEL_ID, V3_SETTINGS

VOICE_SETTINGS = dict(V3_SETTINGS, speed=1.12)   # un punto más ágil que 1.0 para reel
W, H, FPS = 1080, 1920, 30

ROOT   = "/Users/mardan/workspace/jashmal"
ENV    = os.path.join(ROOT, ".env.local")
PROJ   = os.path.expanduser("~/Desktop/jashmal-videos/tercer-templo")
IMGDIR = os.path.join(PROJ, "img")
BUILD  = os.path.join(PROJ, "build")
SALIDA = os.path.join(PROJ, "tercer-templo_v1.mp4")
MP3    = os.path.join(PROJ, "audio", "tercer-templo_voz.mp3")
TIMING = os.path.join(PROJ, "audio", "tercer-templo_timing.json")
TMP    = "/tmp/tt_render"
os.makedirs(TMP, exist_ok=True); os.makedirs(os.path.dirname(MP3), exist_ok=True)

# ── NARRACIÓN (verificada por el Sofer · content/guiones/tercer-templo.md) ──
#   TTS-friendly: sin «», sin …, sin —, sin URL. Brand = "Khashmal".
S = [
 ("01_portada.png",        "overlay_1.png", "in",
  "El Tercer Templo esconde una contradicción de dos mil años. "
  "Un sabio dice que el hombre lo construye con sus manos. "
  "Otro, que baja entero, ya terminado, desde el Cielo. ¿Quién tiene razón? Los dos."),
 ("02_dos_direcciones.png","overlay_2.png", "out",
  "Toda la serie giró sobre dos despertares: uno sube desde abajo, el hombre que merece; "
  "otro baja desde arriba, la gracia de Dios. El Tercer Templo es donde los dos se tocan."),
 ("03_rashi.png",          "overlay_3.png", "in",
  "Rashi enseña que el Templo ya está construido y perfeccionado en lo Alto, "
  "y vendrá desde los Cielos. La redención que baja."),
 ("04_rambam.png",         "overlay_4.png", "out",
  "Pero el Rambam dice lo contrario: el Rey Mashíaj construye el Templo con manos humanas. "
  "Ya lo dijo el profeta: el Retoño edificará la Casa de Dios."),
 ("05_dos_manos.png",      "overlay_5.png", "in",
  "No se contradicen. Un solo verso los une: el lugar que Tú hiciste, "
  "el Santuario que Tus manos establecieron. El hombre hace; Dios fija. "
  "Los dos primeros Templos cayeron porque se hicieron solo desde abajo. "
  "El Tercero une las dos fuerzas, y no caerá jamás."),
 ("06_sinai.png",          "overlay_6.png", "out",
  "Ya pasó una vez. En el Sinaí, Dios dijo: que los de abajo suban, "
  "y los de arriba bajen, y Yo empiezo. E Israel respondió: naasé venishmá. "
  "Haremos, y escucharemos."),
 ("07_betojam.png",        "overlay_7.png", "in",
  "Y aquí está el sello. La Torá dice: moraré betojam. "
  "No en el edificio: en ellos, en cada persona. "
  "Dios no quiere una casa. Quiere morar en ti. El Tercer Templo eres tú."),
 ("08_cierre.png",         "overlay_8.png", "in",
  "Empieza hoy una obra cuyo final no dependa solo de ti. "
  "Levanta los muros con tu esfuerzo, y confía el fuego a lo Alto. "
  "Haz como si todo dependiera de ti; confía como si todo dependiera de Él. "
  "El estudio completo te espera en Khashmal."),
]
CIERRE_VOZ  = "Comparte, y difunde la luz de Dios."
CIERRE_MARK = "comparte"
# End-card OFICIAL de marca (portal dorado + lamed de luz + JASHMAL.ORG) — TODOS los videos cierran con esta.
ENDCARD = os.path.expanduser("~/Desktop/jashmal-videos/jashmal_endcard_portal_ES.png")

# marcador = primeras palabras distintivas de cada escena
MARKERS = ["el tercer templo esconde", "toda la serie giro", "rashi ensena que el templo",
           "pero el rambam dice", "no se contradicen", "ya paso una vez",
           "y aqui esta el sello", "empieza hoy una obra"]

GUION = " ".join(seg[3] for seg in S) + " " + CIERRE_VOZ
GUION = GUION.replace("…", ", ").replace("—", ", ").replace(" ,", ",").replace(",,", ",")


def norm(s):
    s = "".join(c for c in unicodedata.normalize("NFD", s.lower())
                if unicodedata.category(c) != "Mn")
    return re.sub(r"\s+", " ", re.sub(r"[^a-z0-9 ]", " ", s)).strip()


def cargar_key():
    with open(ENV) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                return line.split("=", 1)[1].strip()
    sys.exit("❌ No encontré ELEVENLABS_API_KEY en .env.local")


def generar_voz(force=False):
    if not force and os.path.exists(MP3) and os.path.exists(TIMING):
        c = json.load(open(TIMING))
        print(f"♻️  Voz en caché — {c['dur']:.2f}s (borra el mp3 para regenerar).")
        return c["palabras"], c["dur"]
    key = cargar_key()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({"text": GUION, "model_id": MODEL_ID,
                       "voice_settings": VOICE_SETTINGS}).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key, "Content-Type": "application/json"})
    print(f"🎙️  Generando voz Martin Osborne ({MODEL_ID})…")
    try:
        with urllib.request.urlopen(req, timeout=180) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"❌ HTTP {e.code}: {e.read().decode(errors='replace')[:500]}")
    open(MP3, "wb").write(base64.b64decode(data["audio_base64"]))
    al = data["alignment"]
    chars, st, en = al["characters"], al["character_start_times_seconds"], al["character_end_times_seconds"]
    palabras = []; word = ""; ws = we = 0.0
    for ch, a, b in zip(chars, st, en):
        if ch.isspace():
            if word: palabras.append({"w": word, "start": ws, "end": we}); word = ""
        else:
            if not word: ws = a
            word += ch; we = b
    if word: palabras.append({"w": word, "start": ws, "end": we})
    dur = en[-1] if en else 0.0
    json.dump({"palabras": palabras, "dur": dur}, open(TIMING, "w"))
    print(f"   ✅ Voz lista — {dur:.2f}s, {len(palabras)} palabras · {MP3}")
    return palabras, dur


def find_time(palabras, marker, after):
    seq = [norm(p["w"]) for p in palabras]
    mw = norm(marker).split(); n = len(mw)
    for i in range(after, len(seq) - n + 1):
        if seq[i:i+n] == mw:
            return i, palabras[i]["start"]
    for i in range(after, len(seq)):
        if seq[i] == mw[0]:
            return i, palabras[i]["start"]
    return None, None


def kb_expr(direction):
    if direction == "in":
        return "min(zoom+0.0006,1.12)", "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"
    return "if(eq(on,0),1.12,max(zoom-0.0006,1.001))", "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"


def build_scene(img, overlay, direction, dur, dst, fade_in_black=False, fade_out_black=False):
    frames = max(1, int(round(dur * FPS)))
    z, x, y = kb_expr(direction)
    bg = (f"[0:v]scale=2160:3840:force_original_aspect_ratio=increase,crop=2160:3840,"
          f"zoompan=z='{z}':x='{x}':y='{y}':d={frames}:s={W}x{H}:fps={FPS},setsar=1")
    extra = ""
    if fade_in_black:  extra += f",fade=t=in:st=0:d=0.4"
    if fade_out_black: extra += f",fade=t=out:st={max(0,dur-0.5):.3f}:d=0.5"
    fc = (f"{bg}{extra}[bg];"
          f"[1:v]format=rgba,fade=t=in:st=0.3:d=0.7:alpha=1[ov];"
          f"[bg][ov]overlay=0:0,format=yuv420p[v]")
    cmd = ["ffmpeg","-y","-loop","1","-t",f"{dur:.3f}","-i",img,
           "-loop","1","-t",f"{dur:.3f}","-i",overlay,
           "-filter_complex",fc,"-map","[v]","-r",str(FPS),
           "-c:v","libx264","-preset","medium","-crf","18","-pix_fmt","yuv420p",
           "-t",f"{dur:.3f}",dst]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: sys.exit("❌ ffmpeg escena:\n" + r.stderr[-900:])


def build_endcard(dur, dst):
    fc = (f"[0:v]scale={W}:{H},setsar=1,fade=t=in:st=0:d=0.5,"
          f"fade=t=out:st={max(0,dur-0.6):.3f}:d=0.6,format=yuv420p[v]")
    cmd = ["ffmpeg","-y","-loop","1","-t",f"{dur:.3f}","-i",ENDCARD,
           "-filter_complex",fc,"-map","[v]","-r",str(FPS),
           "-c:v","libx264","-preset","medium","-crf","18","-pix_fmt","yuv420p",
           "-t",f"{dur:.3f}",dst]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: sys.exit("❌ ffmpeg endcard:\n" + r.stderr[-900:])


def main():
    palabras, dur = generar_voz()
    # tiempos de inicio de cada escena
    starts = []; cur = 0
    for m in MARKERS:
        idx, t = find_time(palabras, m, cur)
        if idx is None: sys.exit(f"❌ No ubiqué el beat: '{m}'")
        starts.append(t); cur = idx + 1
    starts[0] = 0.0
    _, cierre_t = find_time(palabras, CIERRE_MARK, cur)
    if cierre_t is None: sys.exit("❌ No ubiqué el cierre (Comparte…)")

    bounds = starts + [cierre_t]            # fin de escena 8 = inicio del cierre
    print("🗺️  Mapa de escenas:")
    for i in range(8):
        print(f"   {i+1}. {bounds[i]:5.2f}→{bounds[i+1]:5.2f}s  ({bounds[i+1]-bounds[i]:4.1f}s)  {S[i][0]}")
    print(f"   end-card (cierre): {cierre_t:5.2f}→{dur:5.2f}s  ({dur-cierre_t:.1f}s)")

    if "--voz" in sys.argv or "--voice" in sys.argv:
        print(f"\n✅ Solo voz — {dur:.2f}s. Corre sin --voz para renderizar.")
        return

    print("🎬 Renderizando escenas (Ken Burns + overlays)…")
    clips = []
    for i, (img, ov, d, _txt) in enumerate(S):
        dseg = max(0.8, bounds[i+1] - bounds[i])
        dst = f"{TMP}/scene_{i+1}.mp4"
        build_scene(os.path.join(IMGDIR, img), os.path.join(BUILD, ov), d, dseg, dst,
                    fade_in_black=(i == 0))
        clips.append(dst); print(f"   ✅ escena {i+1} ({dseg:.1f}s)")
    ec = f"{TMP}/scene_9.mp4"
    ec_dur = max(4.2, (dur - cierre_t) + 1.4)   # bendición + reposo de marca
    build_endcard(ec_dur, ec); clips.append(ec)
    print(f"   ✅ end-card oficial portal ({ec_dur:.1f}s)")

    concat = f"{TMP}/concat.txt"
    open(concat, "w").write("".join(f"file '{c}'\n" for c in clips))
    base = f"{TMP}/base.mp4"
    r = subprocess.run(["ffmpeg","-y","-f","concat","-safe","0","-i",concat,"-c","copy",base],
                       capture_output=True, text=True)
    if r.returncode: sys.exit("❌ concat:\n" + r.stderr[-700:])

    print("🎧 Muxeando la voz de Martin…")
    r = subprocess.run(["ffmpeg","-y","-i",base,"-i",MP3,
        "-filter_complex","[1:a]apad[a]","-map","0:v","-map","[a]",
        "-c:v","copy","-c:a","aac","-b:a","192k","-shortest",
        "-movflags","+faststart",SALIDA], capture_output=True, text=True)
    if r.returncode: sys.exit("❌ mux:\n" + r.stderr[-900:])

    pr = subprocess.run(["ffprobe","-v","error","-show_entries","format=duration",
                         "-of","csv=p=0",SALIDA], capture_output=True, text=True)
    print(f"\n🎉 LISTO: {SALIDA}  ({float(pr.stdout.strip()):.1f}s, con voz Martin)")


if __name__ == "__main__":
    main()
