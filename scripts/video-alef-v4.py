#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · Alef #1 — estilo SOFER (escriba) sobre pergamino
═══════════════════════════════════════════════════════════════════════════
  Fondo pergamino claro. Alef en TINTA negra (Frank Ruhl).
  Al explicar la forma, la Alef se vuelve CONTORNO y cada trazo se RELLENA
  en dorado al nombrarse (como tinta que entra en la letra):
    Yud(10) arriba · Yud(10) abajo · Vav(6) centro = 26 = יהוה
  Render cuadro por cuadro (30 fps), vertical 9:16.
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, base64, os, subprocess, sys, re, shutil
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageChops

SALIDA   = os.path.expanduser("~/Desktop/jashmal-videos/alef_v4_FINAL.mp4")
VOICE_ID = "onwK4e9ZLuTAKqWW03F9"
MODEL    = "eleven_multilingual_v2"
FPS      = 30

GUION = (
    "La Alef. La primera letra del alfabeto hebreo. "
    "La única que no tiene sonido. Es puro silencio. "
    "Su valor es uno. Porque representa al Uno. A Dios. "
    "Pero mira su forma. La Alef esconde tres letras. "
    "Una Yud arriba. "
    "Una Yud abajo. "
    "Y una Vav que las une en el centro. "
    "Diez, más diez, más seis. Veintiséis. "
    "El valor exacto del nombre de Dios. Yud, He, Vav, He. "
    "La primera letra ya contenía Su nombre. Más en jashmal punto org."
)

W, H = 720, 1280
PARCH = (244, 240, 230)   # pergamino
INK   = (38, 33, 28)      # tinta
GOLD  = (170, 128, 34)    # dorado profundo (legible sobre claro)
GOLD2 = (150, 112, 28)
TMP    = "/tmp/jashmal_alef_v4"
FRAMES = os.path.join(TMP, "frames")
LAT_FONT = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
HEB_FONT = os.path.join(os.path.dirname(__file__), "fonts", "FrankRuhlLibre.ttf")

ALEF_SIZE = 540
ALEF_CY   = 450

def heb_rtl(s):
    return re.sub(r'[֐-׿]+', lambda m: m.group(0)[::-1], s)

def smooth(x):
    x = max(0.0, min(1.0, x)); return x*x*(3-2*x)

# ─── Voz (reutiliza la cacheada si el guion no cambió) ─────────────────────
def leer_key():
    env = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    with open(env) as f:
        for line in f:
            if line.startswith("ELEVENLABS_API_KEY="):
                return line.split("=", 1)[1].strip()
    return ""

def generar_voz():
    cache_mp3 = os.path.join(TMP, "voz.mp3")
    cache_al  = os.path.join(TMP, "align.json")
    if os.path.exists(cache_mp3) and os.path.exists(cache_al):
        print("🎙️  Usando voz cacheada")
        P = json.load(open(cache_al))
        dur = P[-1]["end"]
        return cache_mp3, P, dur
    key = leer_key()
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{VOICE_ID}/with-timestamps"
    body = json.dumps({"text": GUION, "model_id": MODEL,
        "voice_settings": {"stability": 0.50, "similarity_boost": 0.75, "speed": 0.92}}).encode()
    req = urllib.request.Request(url, data=body, method="POST",
        headers={"xi-api-key": key, "Content-Type": "application/json"})
    print("🎙️  Generando voz...")
    with urllib.request.urlopen(req, timeout=60) as r:
        data = json.loads(r.read())
    with open(cache_mp3, "wb") as f:
        f.write(base64.b64decode(data["audio_base64"]))
    a = data["alignment"]
    chars, st_, en_ = a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]
    P=[]; word=""; ws=0; we=0
    for ch, st, en in zip(chars, st_, en_):
        if ch == " ":
            if word: P.append({"w":word,"start":ws,"end":we})
            word=""
        else:
            if not word: ws=st
            word+=ch; we=en
    if word: P.append({"w":word,"start":ws,"end":we})
    json.dump(P, open(cache_al,"w"))
    dur = en_[-1] if en_ else 0
    print(f"   ✅ Voz ({dur:.1f}s, {len(P)} palabras)")
    return cache_mp3, P, dur

def fw(P, pref, after=0.0):
    p=pref.lower()
    for w in P:
        if w["start"]>=after and w["w"].lower().rstrip(".,").startswith(p): return w["start"]
    return None

# ─── Alef ────────────────────────────────────────────────────────────────
def alef_geom():
    img=Image.new("L",(W,H),0); d=ImageDraw.Draw(img)
    f=ImageFont.truetype(HEB_FONT,ALEF_SIZE)
    bb=d.textbbox((0,0),"א",font=f); gw,gh=bb[2]-bb[0],bb[3]-bb[1]
    x=(W-gw)//2-bb[0]; y=ALEF_CY-gh//2-bb[1]
    return (x+bb[0],y+bb[1],gw,gh),(x,y)

def alef_alpha():
    _,(x,y)=alef_geom()
    f=ImageFont.truetype(HEB_FONT,ALEF_SIZE)
    m=Image.new("L",(W,H),0); d=ImageDraw.Draw(m)
    d.text((x,y),"א",font=f,fill=255)
    return m

def color_from_mask(mask, color):
    lay=Image.new("RGBA",(W,H),(0,0,0,0))
    lay.paste((*color,255),(0,0),mask)
    return lay

def soft_ellipse(cx,cy,rx,ry,blur=8):
    m=Image.new("L",(W,H),0); d=ImageDraw.Draw(m)
    d.ellipse([cx-rx,cy-ry,cx+rx,cy+ry],fill=255)
    return m.filter(ImageFilter.GaussianBlur(blur))

def mask_and(a,b): return Image.composite(a,Image.new("L",(W,H),0),b)
def mask_sub(a,b): return mask_and(a,b.point(lambda v:255-v))

def scale_alpha(mask, k):
    return mask.point(lambda v:int(v*k))

# ─── Texto sobre pergamino ─────────────────────────────────────────────────
def txt_layer(lines, y0, size, color, halo=True):
    img=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    y=y0
    for ln in lines:
        ln=heb_rtl(ln)
        is_heb=bool(re.search(r'[֐-׿]',ln))
        font=ImageFont.truetype(HEB_FONT if is_heb else LAT_FONT,size)
        bb=d.textbbox((0,0),ln,font=font); tw=bb[2]-bb[0]; x=(W-tw)//2-bb[0]
        if halo:
            h=Image.new("RGBA",(W,H),(0,0,0,0)); hd=ImageDraw.Draw(h)
            hd.text((x,y),ln,font=font,fill=(*PARCH,230)); h=h.filter(ImageFilter.GaussianBlur(6))
            img=Image.alpha_composite(img,h); d=ImageDraw.Draw(img)
        d.text((x,y),ln,font=font,fill=(*color,255)); y+=size+16
    return img

def label_layer(letra,value,cx,cy):
    img=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    hf=ImageFont.truetype(HEB_FONT,72); vf=ImageFont.truetype(LAT_FONT,46)
    # halo claro para separar del fondo/letra
    for layf,txt,dx,dy in [(hf,heb_rtl(letra),0,0),(vf,f"+{value}",66,14)]:
        h=Image.new("RGBA",(W,H),(0,0,0,0)); hd=ImageDraw.Draw(h)
        hd.text((cx+dx,cy+dy),txt,font=layf,fill=(*PARCH,230)); h=h.filter(ImageFilter.GaussianBlur(5))
        img=Image.alpha_composite(img,h)
    d=ImageDraw.Draw(img)
    d.text((cx,cy),heb_rtl(letra),font=hf,fill=(*GOLD,255))
    d.text((cx+66,cy+14),f"+{value}",font=vf,fill=(*GOLD2,255))
    return img

def sub_layer(texto):
    texto=texto.replace(" punto org",".org")
    img=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    font=ImageFont.truetype(LAT_FONT,38)
    pal=texto.split(); L=[]; cur=""
    for p in pal:
        t=(cur+" "+p).strip()
        if d.textbbox((0,0),t,font=font)[2]<W-90: cur=t
        else: L.append(cur); cur=p
    if cur: L.append(cur)
    y=H-225
    for ln in L:
        bb=d.textbbox((0,0),ln,font=font); tw=bb[2]-bb[0]; x=(W-tw)//2-bb[0]
        h=Image.new("RGBA",(W,H),(0,0,0,0)); hd=ImageDraw.Draw(h)
        hd.text((x,y),ln,font=font,fill=(*PARCH,235)); h=h.filter(ImageFilter.GaussianBlur(5))
        img=Image.alpha_composite(img,h); d=ImageDraw.Draw(img)
        d.text((x,y),ln,font=font,fill=(*INK,255)); y+=48
    return img

# ─── Main ────────────────────────────────────────────────────────────────
def main():
    if os.path.isdir(FRAMES): shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)
    mp3, P, dur = generar_voz()

    t_forma=fw(P,"forma") or 11
    t_uno  =fw(P,"uno") or 7
    t_arr  =fw(P,"arriba") or t_forma+2
    t_aba  =fw(P,"abajo")  or t_forma+4
    t_vav  =fw(P,"vav",after=t_forma) or t_forma+6
    t_26   =fw(P,"veintis") or dur-7
    t_yhvh =t_26+2.4
    t_recomb=fw(P,"conten") or dur-3.5
    FILL=0.6   # duración del relleno de cada trazo
    OUTL=0.6   # transición lleno→contorno

    (gx,gy,gw,gh),_=alef_geom()
    print("🧩 Precalculando capas...")
    aA=alef_alpha()
    # contorno (anillo): dilatar - erosionar
    dil=aA.filter(ImageFilter.MaxFilter(9)); ero=aA.filter(ImageFilter.MinFilter(9))
    ring=ImageChops.subtract(dil,ero)

    # regiones
    m_top=mask_and(aA, soft_ellipse(gx+int(gw*0.70),gy+int(gh*0.20),int(gw*0.42),int(gh*0.30)))
    m_bot=mask_and(aA, soft_ellipse(gx+int(gw*0.28),gy+int(gh*0.82),int(gw*0.42),int(gh*0.30)))
    m_vav=mask_sub(mask_sub(aA,m_top),m_bot); m_vav=m_vav.point(lambda v:255 if v>90 else 0)

    # capas RGBA reutilizables
    L_ink_fill = color_from_mask(aA, INK)        # Alef sólida en tinta
    L_outline  = color_from_mask(ring, INK)      # solo contorno
    gold_top   = color_from_mask(m_top, GOLD)
    gold_bot   = color_from_mask(m_bot, GOLD)
    gold_vav   = color_from_mask(m_vav, GOLD)

    L_eq1  = txt_layer(["א = 1"],760,70,INK)
    L_eq26 = txt_layer(["10 + 10 + 6 = 26"],800,60,GOLD)
    L_yhvh = txt_layer(["יהוה = 26"],905,72,GOLD)

    # subtítulos
    frases=[]; buf=[]; fs=None
    for p in P:
        if fs is None: fs=p["start"]
        buf.append(p["w"])
        if any(p["w"].rstrip().endswith(c) for c in [".","?","!"]):
            frases.append((" ".join(buf),fs,p["end"])); buf=[]; fs=None
    if buf: frases.append((" ".join(buf),fs,P[-1]["end"]))
    SUBS=[(sub_layer(t),s,e) for (t,s,e) in frases]

    def paste_alpha(base, layer, k):
        if k<=0: return base
        l=layer.copy()
        if k<1: l.putalpha(scale_alpha(l.getchannel("A"),k))
        return Image.alpha_composite(base, l)

    n=int(dur*FPS)+1
    print(f"🎞️  Renderizando {n} cuadros...")
    for i in range(n):
        t=i/FPS
        fr=Image.new("RGBA",(W,H),(*PARCH,255))

        if t<t_forma:
            # Alef sólida en tinta
            fr=paste_alpha(fr,L_ink_fill,1.0)
        elif t<t_recomb:
            # transición lleno→contorno
            q=smooth((t-t_forma)/OUTL)
            fr=paste_alpha(fr,L_ink_fill,1.0-q)
            fr=paste_alpha(fr,L_outline,q)
            # rellenos dorados por trazo
            if t>=t_arr: fr=paste_alpha(fr,gold_top, smooth((t-t_arr)/FILL))
            if t>=t_aba: fr=paste_alpha(fr,gold_bot, smooth((t-t_aba)/FILL))
            if t>=t_vav: fr=paste_alpha(fr,gold_vav, smooth((t-t_vav)/FILL))
            # etiquetas
            if t>=t_arr: fr=Image.alpha_composite(fr, label_layer("י",10, gx+int(gw*0.78)+44, gy-10))
            if t>=t_aba: fr=Image.alpha_composite(fr, label_layer("י",10, gx-150, gy+int(gh*0.84)))
            if t>=t_vav: fr=Image.alpha_composite(fr, label_layer("ו",6,  gx+int(gw)+70, gy+int(gh*0.46)))
        else:
            # recombinar: dorado → tinta sólida
            k=smooth((t-t_recomb)/0.9)
            fr=paste_alpha(fr,gold_top,1.0); fr=paste_alpha(fr,gold_bot,1.0); fr=paste_alpha(fr,gold_vav,1.0)
            fr=paste_alpha(fr,L_ink_fill,k)

        # textos por tiempo
        if t_uno<=t<t_forma: fr=Image.alpha_composite(fr,L_eq1)
        if t_26<=t<t_recomb: fr=Image.alpha_composite(fr,L_eq26)
        if t_yhvh<=t<t_recomb: fr=Image.alpha_composite(fr,L_yhvh)
        for lay,s,e in SUBS:
            if s<=t<e: fr=Image.alpha_composite(fr,lay); break

        fr.convert("RGB").save(f"{FRAMES}/f{i:05d}.png")
        if i%150==0: print(f"   {i}/{n}")

    print("🎬 Codificando...")
    cmd=["ffmpeg","-y","-framerate",str(FPS),"-i",f"{FRAMES}/f%05d.png","-i",mp3,
        "-c:v","libx264","-preset","medium","-crf","19","-pix_fmt","yuv420p",
        "-c:a","aac","-b:a","192k","-shortest",SALIDA]
    r=subprocess.run(cmd,capture_output=True,text=True)
    if r.returncode!=0:
        print("❌ ffmpeg:"); print(r.stderr[-900:]); sys.exit(1)
    print(f"\n✅ VIDEO: {SALIDA}")

if __name__=="__main__":
    main()
