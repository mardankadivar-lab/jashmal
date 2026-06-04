#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · Serie del Alfabeto #1 — La Alef (א)  [estilo explicativo]
═══════════════════════════════════════════════════════════════════════════
  Fondo NEGRO puro. Alef en BLANCO (Frank Ruhl Libre).
  Al diseccionarla, SOLO el trazo que se explica se ilumina en DORADO:
    · Yud arriba (10) — aguas superiores
    · Yud abajo  (10) — aguas inferiores
    · Vav medio  (6)  — el puente
  10 + 10 + 6 = 26 = יהוה (el nombre de Dios)

  No usa Kling: el fondo es negro generado por ffmpeg.
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, base64, os, subprocess, sys, re
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SALIDA   = os.path.expanduser("~/Desktop/jashmal-videos/alef_v2_FINAL.mp4")
VOICE_ID = "onwK4e9ZLuTAKqWW03F9"   # Daniel
MODEL    = "eleven_multilingual_v2"

GUION = (
    "La Alef. La primera letra del alfabeto hebreo. "
    "Y la única que no tiene sonido. Es puro silencio. El aliento antes de la palabra. "
    "Su valor es uno. Porque representa al Uno. A Dios. "
    "Pero mira su forma. La Alef no es una sola línea. Son tres letras escondidas. "
    "Una Yud arriba. Las aguas superiores. Lo divino, lo oculto. "
    "Una Yud abajo. Las aguas inferiores. Nuestro mundo. "
    "Y una Vav que las une en el centro. El puente entre el cielo y la tierra. "
    "Diez, más diez, más seis. Veintiséis. "
    "El valor exacto del nombre de Dios. Yud, He, Vav, He. "
    "La primera letra, la del silencio, ya contenía Su nombre. "
    "Más en jashmal punto org."
)

W, H = 720, 1280
WHITE       = (245, 244, 240)
GOLD        = (232, 200, 102)
GOLD_BRIGHT = (255, 226, 140)
TMP = "/tmp/jashmal_alef_v2"
os.makedirs(TMP, exist_ok=True)

LAT_FONT = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
HEB_FONT = os.path.join(os.path.dirname(__file__), "fonts", "FrankRuhlLibre.ttf")

ALEF_SIZE = 540
ALEF_CY   = 470

def heb_rtl(s):
    return re.sub(r'[֐-׿]+', lambda m: m.group(0)[::-1], s)

# ─── Voz ───────────────────────────────────────────────────────────────────
def leer_key():
    env = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    with open(env) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                return line.split("=", 1)[1].strip()
    return ""

def generar_voz():
    key = leer_key()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({"text": GUION, "model_id": MODEL,
        "voice_settings": {"stability": 0.50, "similarity_boost": 0.75, "speed": 0.92}}).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key, "Content-Type": "application/json"})
    print("🎙️  Generando voz...")
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.loads(r.read())
    mp3 = os.path.join(TMP, "voz.mp3")
    with open(mp3, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))
    a = data["alignment"]
    chars, starts, ends = a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]
    palabras = []; word=""; ws=0; we=0
    for ch, st, en in zip(chars, starts, ends):
        if ch == " ":
            if word: palabras.append({"w": word, "start": ws, "end": we})
            word=""
        else:
            if not word: ws=st
            word+=ch; we=en
    if word: palabras.append({"w": word, "start": ws, "end": we})
    dur = ends[-1] if ends else 0
    print(f"   ✅ Voz ({dur:.1f}s, {len(palabras)} palabras)")
    return mp3, palabras, dur

def find_word(palabras, prefix, after=0.0):
    p = prefix.lower()
    for w in palabras:
        if w["start"] >= after and w["w"].lower().rstrip(".,").startswith(p):
            return w
    return None

# ─── Alef ────────────────────────────────────────────────────────────────
def alef_bbox():
    img = Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    f = ImageFont.truetype(HEB_FONT, ALEF_SIZE)
    bb = d.textbbox((0,0),"א",font=f)
    gw, gh = bb[2]-bb[0], bb[3]-bb[1]
    x=(W-gw)//2-bb[0]; y=ALEF_CY-gh//2-bb[1]
    return (x+bb[0],y+bb[1],x+bb[2],y+bb[3]),(x,y)

def draw_alef(color, alpha=255, glow=0, glow_color=None):
    _,(x,y)=alef_bbox()
    f=ImageFont.truetype(HEB_FONT,ALEF_SIZE)
    img=Image.new("RGBA",(W,H),(0,0,0,0))
    if glow:
        g=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(g)
        gd.text((x,y),"א",font=f,fill=(*(glow_color or color),min(alpha,180)))
        g=g.filter(ImageFilter.GaussianBlur(glow))
        img=Image.alpha_composite(img,g)
    d=ImageDraw.Draw(img)
    d.text((x,y),"א",font=f,fill=(*color,alpha))
    return img

def alef_white():
    return draw_alef(WHITE, alpha=255, glow=6, glow_color=(120,120,120))

def stroke_gold(cx, cy, rx, ry, label_heb, value, ldx, ldy):
    """Sobre la Alef blanca, ilumina en dorado SOLO la región del trazo
    (máscara elíptica) y añade etiqueta (letra + valor)."""
    base = alef_white()
    gold = draw_alef(GOLD_BRIGHT, alpha=255, glow=20, glow_color=GOLD)
    mask = Image.new("L",(W,H),0); md=ImageDraw.Draw(mask)
    md.ellipse([cx-rx,cy-ry,cx+rx,cy+ry],fill=255)
    mask = mask.filter(ImageFilter.GaussianBlur(34))
    gold.putalpha(Image.composite(gold.getchannel("A"),Image.new("L",(W,H),0),mask))
    out = Image.alpha_composite(base, gold)
    # etiqueta
    d=ImageDraw.Draw(out)
    hf=ImageFont.truetype(HEB_FONT,76); vf=ImageFont.truetype(LAT_FONT,50)
    lx,ly=cx+ldx, cy+ldy
    halo=Image.new("RGBA",(W,H),(0,0,0,0)); hd=ImageDraw.Draw(halo)
    hd.text((lx,ly),heb_rtl(label_heb),font=hf,fill=(*GOLD_BRIGHT,200))
    halo=halo.filter(ImageFilter.GaussianBlur(7))
    out=Image.alpha_composite(out,halo); d=ImageDraw.Draw(out)
    d.text((lx,ly),heb_rtl(label_heb),font=hf,fill=(*GOLD_BRIGHT,255))
    d.text((lx+70,ly+14),f"+{value}",font=vf,fill=(*GOLD,255))
    return out

# ─── Texto ─────────────────────────────────────────────────────────────────
def png_center(lines, y0, fname, size=64, color=GOLD, glow=14):
    img=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    y=y0
    for ln in lines:
        ln=heb_rtl(ln)
        # fuente: hebrea si tiene letras hebreas, latina si no
        is_heb = bool(re.search(r'[֐-׿]', ln))
        font=ImageFont.truetype(HEB_FONT if is_heb else LAT_FONT, size)
        g=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(g)
        bb=d.textbbox((0,0),ln,font=font); tw=bb[2]-bb[0]
        x=(W-tw)//2-bb[0]
        gd.text((x,y),ln,font=font,fill=(*color,170))
        g=g.filter(ImageFilter.GaussianBlur(glow))
        img=Image.alpha_composite(img,g); d=ImageDraw.Draw(img)
        d.text((x,y),ln,font=font,fill=(*color,255))
        y+=size+16
    img.save(fname)

def png_sub(texto, fname):
    texto=texto.replace(" punto org",".org").replace(" Punto org",".org")
    img=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    font=ImageFont.truetype(LAT_FONT,38)
    pal=texto.split(); lineas=[]; cur=""
    for p in pal:
        t=(cur+" "+p).strip()
        if d.textbbox((0,0),t,font=font)[2] < W-90: cur=t
        else: lineas.append(cur); cur=p
    if cur: lineas.append(cur)
    y=H-235
    for ln in lineas:
        bb=d.textbbox((0,0),ln,font=font); tw=bb[2]-bb[0]
        x=(W-tw)//2-bb[0]
        for ox,oy in [(-2,2),(2,2),(0,3)]:
            d.text((x+ox,y+oy),ln,font=font,fill=(0,0,0,220))
        d.text((x,y),ln,font=font,fill=(238,235,225,255))
        y+=48
    img.save(fname)

# ─── Main ────────────────────────────────────────────────────────────────
def main():
    mp3, palabras, dur = generar_voz()

    w_forma = find_word(palabras,"forma")
    t_forma = w_forma["start"] if w_forma else 13.0
    t_uno   = (find_word(palabras,"uno") or {"start":8.0})["start"]
    t_arr   = (find_word(palabras,"arriba") or {"start":t_forma+2})["start"]
    t_aba   = (find_word(palabras,"abajo")  or {"start":t_forma+5})["start"]
    t_vav   = (find_word(palabras,"vav",after=t_forma) or {"start":t_forma+8})["start"]
    t_26    = (find_word(palabras,"veintis") or {"start":dur-7})["start"]
    t_yhvh  = t_26 + 2.4
    t_end   = dur

    (gx0,gy0,gx1,gy1),_ = alef_bbox()
    gw,gh = gx1-gx0, gy1-gy0
    yud_top=(gx0+int(gw*0.72), gy0+int(gh*0.18))
    vav_mid=(gx0+int(gw*0.52), gy0+int(gh*0.50))
    yud_bot=(gx0+int(gw*0.26), gy0+int(gh*0.82))
    rx,ry=int(gw*0.24), int(gh*0.20)

    print("🖼️  Renderizando...")
    ov=[]  # (png, start, end)

    # Subtítulos
    frases=[]; buf=[]; fs=None
    for p in palabras:
        if fs is None: fs=p["start"]
        buf.append(p["w"])
        if any(p["w"].rstrip().endswith(c) for c in [".","?","!"]):
            frases.append({"t":" ".join(buf),"s":fs,"e":p["end"]}); buf=[]; fs=None
    if buf: frases.append({"t":" ".join(buf),"s":fs,"e":palabras[-1]["end"]})
    for i,fr in enumerate(frases):
        fn=f"{TMP}/sub_{i}.png"; png_sub(fr["t"],fn); ov.append((fn,fr["s"],fr["e"]))

    # Alef blanca (desde el inicio hasta el final)
    fn=f"{TMP}/alef_white.png"; alef_white().save(fn); ov.append((fn,0.0,t_arr))

    # א = 1
    fn=f"{TMP}/eq1.png"; png_center(["א = 1"],770,fn,size=70,color=WHITE,glow=8)
    ov.append((fn,t_uno,t_forma))

    # Trazos dorados (persisten hasta el final)
    fn=f"{TMP}/g_top.png"; stroke_gold(*yud_top,rx,ry,"י",10,ldx=64,ldy=-96).save(fn); ov.append((fn,t_arr,t_end))
    fn=f"{TMP}/g_bot.png"; stroke_gold(*yud_bot,rx,ry,"י",10,ldx=-150,ldy=6).save(fn); ov.append((fn,t_aba,t_end))
    fn=f"{TMP}/g_vav.png"; stroke_gold(*vav_mid,int(rx*1.1),int(ry*1.25),"ו",6,ldx=104,ldy=-26).save(fn); ov.append((fn,t_vav,t_end))

    # 10+10+6=26
    fn=f"{TMP}/eq26.png"; png_center(["10 + 10 + 6 = 26"],780,fn,size=64,color=GOLD_BRIGHT,glow=16)
    ov.append((fn,t_26,t_end))
    # יהוה=26
    fn=f"{TMP}/yhvh.png"; png_center(["יהוה = 26"],885,fn,size=72,color=GOLD_BRIGHT,glow=18)
    ov.append((fn,t_yhvh,t_end))

    print(f"🎬 Componiendo {len(ov)} overlays sobre fondo negro...")
    inputs=["-f","lavfi","-i",f"color=c=black:s={W}x{H}:d={dur:.2f}","-i",mp3]
    for o in ov: inputs+=["-i",o[0]]
    fc="[0:v]format=rgba[base];"; prev="base"
    for k,(fn,st,en) in enumerate(ov):
        idx=k+2; nxt=f"v{k}"
        fc+=f"[{prev}][{idx}:v]overlay=0:0:enable='between(t,{st:.2f},{en:.2f})'[{nxt}];"
        prev=nxt
    fc=fc.rstrip(";")
    cmd=["ffmpeg","-y"]+inputs+["-filter_complex",fc,"-map",f"[{prev}]","-map","1:a",
        "-c:v","libx264","-preset","medium","-crf","19","-pix_fmt","yuv420p",
        "-c:a","aac","-b:a","192k","-shortest",SALIDA]
    r=subprocess.run(cmd,capture_output=True,text=True)
    if r.returncode!=0:
        print("❌ ffmpeg:"); print(r.stderr[-900:]); sys.exit(1)
    print(f"\n✅ VIDEO: {SALIDA}")

if __name__=="__main__":
    main()
