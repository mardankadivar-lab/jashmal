#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · Pipeline de video completo para TikTok
═══════════════════════════════════════════════════════════════════════════
  Toma un video de fondo + un guion, y produce el video final con:
    · Voz (ElevenLabs) con tiempos exactos de cada palabra
    · Subtítulos sincronizados (lo que dice la voz, aparece abajo)
    · Letras hebreas animadas con su gematría (aparecen una por una)
    · Todo pegado sobre el video de fondo, en loop

  Uso:  python3 scripts/video-completo.py
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, base64, os, subprocess, sys
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# ─────────────────────────────────────────────────────────────────────────
#  ⚙️  CONFIGURACIÓN
# ─────────────────────────────────────────────────────────────────────────
VIDEO_FONDO = os.path.expanduser("~/Desktop/jashmal-videos/358_mashiaj_najash.mp4")
SALIDA      = os.path.expanduser("~/Desktop/jashmal-videos/358_FINAL.mp4")
VOICE_ID    = "onwK4e9ZLuTAKqWW03F9"   # Daniel — voz masculina profunda y autoritaria
MODEL       = "eleven_multilingual_v2"

# Guion. Nota: "Háshmal" para que la voz pronuncie /kh/ y no "Yei".
GUION = (
    "Mashíaj. El Mesías. "
    "Najash. La serpiente del Edén. "
    "Dos opuestos. El mismo número. "
    "Trescientos cincuenta y ocho. "
    "¿Coincidencia? La Cabalá enseña que no. "
    "La misma energía que produce el caos, dirigida hacia arriba, produce la redención. "
    "El Mesías no destruye la oscuridad. La transforma. "
    "¿Cómo discernir cuál es cuál? "
    "La respuesta. En jashmal punto org."
)

# Animaciones de gematría hebrea: cuándo (palabra que las dispara) y qué mostrar.
# Cada letra: (letra, valor). El sistema las hace aparecer una por una.
GEMATRIA = {
    "Mashíaj": {"letras": [("מ",40),("שׁ",300),("י",10),("ח",8)], "total":358, "color":(232,200,102)},
    "Najash":  {"letras": [("נ",50),("ח",8),("שׁ",300)], "total":358, "color":(224,90,90)},
}

W, H = 720, 1280
HEB_FONT = None  # se busca abajo
LAT_FONT = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
TMP = "/tmp/jashmal_video"
os.makedirs(TMP, exist_ok=True)

# ─────────────────────────────────────────────────────────────────────────
#  Buscar una fuente hebrea
# ─────────────────────────────────────────────────────────────────────────
def buscar_fuente_hebrea():
    # ArialHB renderiza hebreo correctamente (verificado)
    for c in ["/System/Library/Fonts/ArialHB.ttc",
              "/System/Library/Fonts/Supplemental/Arial.ttf",
              "/System/Library/Fonts/Supplemental/Times New Roman.ttf"]:
        if os.path.exists(c):
            return c
    return LAT_FONT

# ─────────────────────────────────────────────────────────────────────────
#  1. Generar voz + tiempos
# ─────────────────────────────────────────────────────────────────────────
def generar_voz():
    key=""
    with open(os.path.join(os.path.dirname(__file__),"..",".env.local")) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                key=line.split("=",1)[1].strip()
    url=f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body=json.dumps({"text":GUION,"model_id":MODEL,
        "voice_settings":{"stability":0.55,"similarity_boost":0.75,"speed":0.92}}).encode()
    req=urllib.request.Request(url,data=body,method="POST",
        headers={"xi-api-key":key,"Content-Type":"application/json"})
    print("🎙️  Generando voz con ElevenLabs...")
    with urllib.request.urlopen(req,timeout=60) as r:
        data=json.loads(r.read())
    mp3=os.path.join(TMP,"voz.mp3")
    with open(mp3,"wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))
    # Reconstruir palabras con tiempos
    align=data["alignment"]
    chars=align["characters"]; starts=align["character_start_times_seconds"]
    ends=align["character_end_times_seconds"]
    palabras=[]; word=""; ws=0; we=0
    for ch,st,en in zip(chars,starts,ends):
        if ch in " ":
            if word: palabras.append({"w":word,"start":ws,"end":we})
            word=""
        else:
            if not word: ws=st
            word+=ch; we=en
    if word: palabras.append({"w":word,"start":ws,"end":we})
    dur=ends[-1] if ends else 0
    print(f"   ✅ Voz lista ({dur:.1f}s, {len(palabras)} palabras)")
    return mp3, palabras, dur

# ─────────────────────────────────────────────────────────────────────────
#  2. Generar PNGs de overlays
# ─────────────────────────────────────────────────────────────────────────
def limpiar_subtitulo(texto):
    """Arregla cómo se MUESTRA el texto (sin cambiar lo que dice la voz)."""
    t = texto
    t = t.replace(" punto org", ".org").replace(" Punto org", ".org")
    t = t.replace("jashmal", "jashmal").replace("Jashmal", "jashmal")
    return t

def png_subtitulo(texto, fname):
    """Subtítulo abajo (lo que dice la voz)."""
    texto = limpiar_subtitulo(texto)
    img=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    font=ImageFont.truetype(LAT_FONT,42)
    # Ajuste a 2 líneas si es largo
    palabras=texto.split(); lineas=[]; cur=""
    for p in palabras:
        t=(cur+" "+p).strip()
        if d.textbbox((0,0),t,font=font)[2] < W-80: cur=t
        else: lineas.append(cur); cur=p
    if cur: lineas.append(cur)
    y=H-260
    for ln in lineas:
        bb=d.textbbox((0,0),ln,font=font); tw=bb[2]-bb[0]
        x=(W-tw)//2-bb[0]
        for ox,oy in [(-2,2),(2,2),(0,3),(2,-1),(-2,-1)]:
            d.text((x+ox,y+oy),ln,font=font,fill=(8,6,3,200))
        d.text((x,y),ln,font=font,fill=(245,240,225,255))
        y+=54
    img.save(fname)

def png_letra_gematria(letra, valor, color, fname):
    """Una letra hebrea con su valor numérico encima — caja individual."""
    bw,bh=150,200
    img=Image.new("RGBA",(bw,bh),(0,0,0,0)); d=ImageDraw.Draw(img)
    hfont=ImageFont.truetype(HEB_FONT,110)
    vfont=ImageFont.truetype(LAT_FONT,40)
    # Valor arriba
    vb=d.textbbox((0,0),f"+{valor}",font=vfont); vw=vb[2]-vb[0]
    d.text(((bw-vw)//2,6),f"+{valor}",font=vfont,fill=(*color,255))
    # Letra
    lb=d.textbbox((0,0),letra,font=hfont); lw=lb[2]-lb[0]
    lx=(bw-lw)//2-lb[0]
    # glow
    glow=Image.new("RGBA",(bw,bh),(0,0,0,0)); gd=ImageDraw.Draw(glow)
    gd.text((lx,55),letra,font=hfont,fill=(*color,200))
    glow=glow.filter(ImageFilter.GaussianBlur(8))
    img=Image.alpha_composite(img,glow); d=ImageDraw.Draw(img)
    for ox,oy in [(-2,2),(2,2),(0,3)]:
        d.text((lx+ox,55+oy),letra,font=hfont,fill=(8,6,3,180))
    d.text((lx,55),letra,font=hfont,fill=(255,245,210,255))
    img.save(fname)

def png_total(total, color, fname):
    """= 358 grande."""
    img=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    font=ImageFont.truetype(LAT_FONT,130)
    txt=f"= {total}"
    glow=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(glow)
    bb=d.textbbox((0,0),txt,font=font); tw=bb[2]-bb[0]
    x=(W-tw)//2-bb[0]; y=360
    gd.text((x,y),txt,font=font,fill=(*color,200))
    glow=glow.filter(ImageFilter.GaussianBlur(16))
    img=Image.alpha_composite(img,glow); d=ImageDraw.Draw(img)
    for ox,oy in [(-3,3),(3,3),(0,4)]:
        d.text((x+ox,y+oy),txt,font=font,fill=(8,6,3,200))
    d.text((x,y),txt,font=font,fill=(*color,255))
    img.save(fname)

# ─────────────────────────────────────────────────────────────────────────
#  3. MAIN
# ─────────────────────────────────────────────────────────────────────────
def main():
    global HEB_FONT
    HEB_FONT=buscar_fuente_hebrea()
    print(f"🔤 Fuente hebrea: {os.path.basename(HEB_FONT)}")

    if not os.path.exists(VIDEO_FONDO):
        print(f"❌ No existe el video de fondo: {VIDEO_FONDO}"); sys.exit(1)

    mp3, palabras, dur = generar_voz()

    # Agrupar palabras en frases (por puntuación) para subtítulos
    frases=[]; buf=[]; fstart=None
    for p in palabras:
        if fstart is None: fstart=p["start"]
        buf.append(p["w"]);
        if any(p["w"].endswith(c) for c in [".","?","!",":"]):
            frases.append({"txt":" ".join(buf),"start":fstart,"end":p["end"]})
            buf=[]; fstart=None
    if buf: frases.append({"txt":" ".join(buf),"start":fstart,"end":palabras[-1]["end"]})

    # Generar PNGs de subtítulos
    overlays=[]  # cada uno: (png, start, end, x, y)
    for i,fr in enumerate(frases):
        fn=f"{TMP}/sub_{i}.png"; png_subtitulo(fr["txt"],fn)
        overlays.append((fn, fr["start"], fr["end"], 0, 0))

    # Generar animaciones de gematría: buscar palabra disparadora
    for trigger, info in GEMATRIA.items():
        # Encontrar cuándo se dice esa palabra
        hit=None
        for p in palabras:
            if trigger.lower().rstrip(".,").startswith(p["w"].lower().rstrip(".,")[:5]) and \
               p["w"].lower().rstrip(".,")[:4]==trigger.lower()[:4]:
                hit=p; break
        if not hit:
            print(f"   ⚠️ No encontré '{trigger}' en la voz"); continue
        t0=hit["start"]
        # Cada letra aparece escalonada, centradas horizontalmente
        n=len(info["letras"]); box_w=150; gap=8
        total_w=n*box_w+(n-1)*gap
        x0=(W-total_w)//2
        letter_end=t0+2.8  # las letras quedan visibles ~2.8s
        for j,(letra,valor) in enumerate(info["letras"]):
            fn=f"{TMP}/gem_{trigger}_{j}.png"
            png_letra_gematria(letra,valor,info["color"],fn)
            lx=x0+j*(box_w+gap); ly=420
            start=t0+0.15+j*0.28   # aparecen una por una
            overlays.append((fn,start,letter_end,lx,ly))
        # Total = 358
        fn=f"{TMP}/gem_{trigger}_total.png"; png_total(info["total"],info["color"],fn)
        overlays.append((fn, t0+0.15+n*0.28, letter_end, 0, 0))

    print(f"🎬 Componiendo {len(overlays)} overlays sobre el video...")

    # Construir filtro ffmpeg
    inputs=["-stream_loop","-1","-i",VIDEO_FONDO,"-i",mp3]
    for ov in overlays: inputs+=["-i",ov[0]]
    fc=f"[0:v]trim=duration={dur:.2f},setpts=PTS-STARTPTS[base];"
    prev="base"
    for k,(fn,st,en,x,y) in enumerate(overlays):
        idx=k+2
        nxt=f"v{k}"
        fc+=f"[{prev}][{idx}:v]overlay={x}:{y}:enable='between(t,{st:.2f},{en:.2f})'[{nxt}];"
        prev=nxt
    fc=fc.rstrip(";")
    cmd=["ffmpeg","-y"]+inputs+["-filter_complex",fc,
         "-map",f"[{prev}]","-map","1:a",
         "-c:v","libx264","-preset","medium","-crf","20","-pix_fmt","yuv420p",
         "-c:a","aac","-b:a","192k","-shortest",SALIDA]
    r=subprocess.run(cmd,capture_output=True,text=True)
    if r.returncode!=0:
        print("❌ Error ffmpeg:"); print(r.stderr[-800:]); sys.exit(1)
    print(f"\n✅ VIDEO FINAL LISTO: {SALIDA}")

if __name__=="__main__":
    main()
