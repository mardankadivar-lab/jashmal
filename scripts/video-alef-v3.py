#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · Alef #1 — versión animada (la forma SE ABRE)
═══════════════════════════════════════════════════════════════════════════
  Render cuadro por cuadro (30 fps). Fondo negro, Alef BLANCA (Frank Ruhl).
  Al explicar la forma, la Alef se ABRE: la Yud de arriba y la de abajo se
  separan del cuerpo (la Vav), brillan en dorado, y al final se recombinan.
    Yud(10) + Yud(10) + Vav(6) = 26 = יהוה
═══════════════════════════════════════════════════════════════════════════
"""
import json, urllib.request, base64, os, subprocess, sys, re, shutil
from PIL import Image, ImageDraw, ImageFont, ImageFilter

SALIDA   = os.path.expanduser("~/Desktop/jashmal-videos/alef_v3_FINAL.mp4")
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
WHITE       = (246, 245, 242)
GOLD        = (232, 200, 102)
GOLD_BRIGHT = (255, 226, 140)
TMP   = "/tmp/jashmal_alef_v3"
FRAMES= os.path.join(TMP, "frames")
LAT_FONT = "/System/Library/Fonts/Supplemental/Georgia Bold.ttf"
HEB_FONT = os.path.join(os.path.dirname(__file__), "fonts", "FrankRuhlLibre.ttf")

ALEF_SIZE = 540
ALEF_CY   = 460

def heb_rtl(s):
    return re.sub(r'[֐-׿]+', lambda m: m.group(0)[::-1], s)

def smooth(x):
    x = max(0.0, min(1.0, x))
    return x * x * (3 - 2 * x)

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
    chars, st_, en_ = a["characters"], a["character_start_times_seconds"], a["character_end_times_seconds"]
    P = []; word=""; ws=0; we=0
    for ch, st, en in zip(chars, st_, en_):
        if ch == " ":
            if word: P.append({"w": word, "start": ws, "end": we})
            word=""
        else:
            if not word: ws=st
            word+=ch; we=en
    if word: P.append({"w": word, "start": ws, "end": we})
    dur = en_[-1] if en_ else 0
    print(f"   ✅ Voz ({dur:.1f}s, {len(P)} palabras)")
    return mp3, P, dur

def fw(P, pref, after=0.0):
    p = pref.lower()
    for w in P:
        if w["start"] >= after and w["w"].lower().rstrip(".,").startswith(p):
            return w["start"]
    return None

# ─── Alef y máscaras ────────────────────────────────────────────────────────
def alef_geom():
    img = Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    f = ImageFont.truetype(HEB_FONT, ALEF_SIZE)
    bb = d.textbbox((0,0),"א",font=f)
    gw, gh = bb[2]-bb[0], bb[3]-bb[1]
    x=(W-gw)//2-bb[0]; y=ALEF_CY-gh//2-bb[1]
    return (x+bb[0],y+bb[1],gw,gh),(x,y)

def render_alef(color, alpha=255, glow=0, glow_color=None):
    _,(x,y)=alef_geom()
    f=ImageFont.truetype(HEB_FONT,ALEF_SIZE)
    img=Image.new("RGBA",(W,H),(0,0,0,0))
    if glow:
        g=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(g)
        gd.text((x,y),"א",font=f,fill=(*(glow_color or color),min(alpha,170)))
        g=g.filter(ImageFilter.GaussianBlur(glow)); img=Image.alpha_composite(img,g)
    d=ImageDraw.Draw(img); d.text((x,y),"א",font=f,fill=(*color,alpha))
    return img

def alef_alpha():
    return render_alef(WHITE, 255).getchannel("A")

def soft_ellipse(cx, cy, rx, ry, blur=10):
    m = Image.new("L",(W,H),0); d=ImageDraw.Draw(m)
    d.ellipse([cx-rx,cy-ry,cx+rx,cy+ry],fill=255)
    return m.filter(ImageFilter.GaussianBlur(blur))

def mask_and(a, b):
    return Image.composite(a, Image.new("L",(W,H),0), b)

def mask_sub(a, b):
    inv = b.point(lambda v: 255 - v)
    return mask_and(a, inv)

def piece_img(src, mask, glow_color):
    """Recorta src por mask y le añade un glow propio."""
    img = src.copy()
    img.putalpha(mask_and(src.getchannel("A"), mask))
    g = Image.new("RGBA",(W,H),(0,0,0,0))
    g.paste((*glow_color,150), (0,0), img.getchannel("A"))
    g = g.filter(ImageFilter.GaussianBlur(18))
    return Image.alpha_composite(g, img)

# ─── Texto ─────────────────────────────────────────────────────────────────
def txt_layer(lines, y0, size, color, glow=14):
    img=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    y=y0
    for ln in lines:
        ln=heb_rtl(ln)
        is_heb=bool(re.search(r'[֐-׿]',ln))
        font=ImageFont.truetype(HEB_FONT if is_heb else LAT_FONT, size)
        g=Image.new("RGBA",(W,H),(0,0,0,0)); gd=ImageDraw.Draw(g)
        bb=d.textbbox((0,0),ln,font=font); tw=bb[2]-bb[0]; x=(W-tw)//2-bb[0]
        gd.text((x,y),ln,font=font,fill=(*color,170)); g=g.filter(ImageFilter.GaussianBlur(glow))
        img=Image.alpha_composite(img,g); d=ImageDraw.Draw(img)
        d.text((x,y),ln,font=font,fill=(*color,255)); y+=size+16
    return img

def label_layer(letra, value, cx, cy):
    img=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    hf=ImageFont.truetype(HEB_FONT,72); vf=ImageFont.truetype(LAT_FONT,48)
    d.text((cx,cy),heb_rtl(letra),font=hf,fill=(*GOLD_BRIGHT,255))
    d.text((cx+66,cy+14),f"+{value}",font=vf,fill=(*GOLD,255))
    return img

def sub_layer(texto):
    texto=texto.replace(" punto org",".org")
    img=Image.new("RGBA",(W,H),(0,0,0,0)); d=ImageDraw.Draw(img)
    font=ImageFont.truetype(LAT_FONT,38)
    pal=texto.split(); L=[]; cur=""
    for p in pal:
        t=(cur+" "+p).strip()
        if d.textbbox((0,0),t,font=font)[2] < W-90: cur=t
        else: L.append(cur); cur=p
    if cur: L.append(cur)
    y=H-225
    for ln in L:
        bb=d.textbbox((0,0),ln,font=font); tw=bb[2]-bb[0]; x=(W-tw)//2-bb[0]
        for ox,oy in [(-2,2),(2,2),(0,3)]:
            d.text((x+ox,y+oy),ln,font=font,fill=(0,0,0,220))
        d.text((x,y),ln,font=font,fill=(238,235,225,255)); y+=48
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
    t_recomb = (fw(P,"contenía") or fw(P,"conten") or dur-3.5)
    SEP = 0.7  # duración de cada separación

    (gx,gy,gw,gh),_ = alef_geom()
    print("🧩 Precalculando piezas...")
    aA = alef_alpha()
    m_top = mask_and(aA, soft_ellipse(gx+int(gw*0.70), gy+int(gh*0.20), int(gw*0.40), int(gh*0.30)))
    m_bot = mask_and(aA, soft_ellipse(gx+int(gw*0.28), gy+int(gh*0.82), int(gw*0.40), int(gh*0.30)))
    m_vav = mask_sub(mask_sub(aA, m_top), m_bot)
    # endurecer: la Vav debe quedar sólida, sin bordes translúcidos (fantasma)
    m_vav = m_vav.point(lambda v: 255 if v > 90 else 0)

    # glow claro/cálido (NO gris — el gris ensuciaba el recombine)
    white_full = render_alef(WHITE, 255, glow=6, glow_color=(210,205,188))
    gold_full  = render_alef(GOLD_BRIGHT, 255)

    # piezas doradas
    pc_top = piece_img(gold_full, m_top, GOLD)
    pc_bot = piece_img(gold_full, m_bot, GOLD)
    pc_vav = piece_img(gold_full, m_vav, GOLD)

    # restos blancos según qué piezas ya salieron (estados monotónicos)
    def white_remainder(extracted):
        msk = aA
        if "t" in extracted: msk = mask_sub(msk, m_top)
        if "b" in extracted: msk = mask_sub(msk, m_bot)
        if "v" in extracted: msk = mask_sub(msk, m_vav)
        wf = white_full.copy(); wf.putalpha(mask_and(white_full.getchannel("A"), msk))
        return wf
    REM = {st: white_remainder(st) for st in [frozenset(), frozenset("t"),
            frozenset("tb"), frozenset("tbv")]}

    # offsets de separación
    OFF_TOP = (int(gw*0.38), -int(gh*0.40))
    OFF_BOT = (-int(gw*0.38),  int(gh*0.40))
    OFF_VAV = (0, 0)

    # capas de texto fijas
    L_eq1  = txt_layer(["א = 1"], 760, 70, WHITE, glow=8)
    L_eq26 = txt_layer(["10 + 10 + 6 = 26"], 800, 62, GOLD_BRIGHT, glow=16)
    L_yhvh = txt_layer(["יהוה = 26"], 900, 72, GOLD_BRIGHT, glow=18)

    # subtítulos por frase
    frases=[]; buf=[]; fs=None
    for p in P:
        if fs is None: fs=p["start"]
        buf.append(p["w"])
        if any(p["w"].rstrip().endswith(c) for c in [".","?","!"]):
            frases.append((" ".join(buf),fs,p["end"])); buf=[]; fs=None
    if buf: frases.append((" ".join(buf),fs,P[-1]["end"]))
    SUBS=[(sub_layer(t),s,e) for (t,s,e) in frases]

    n = int(dur*FPS)+1
    print(f"🎞️  Renderizando {n} cuadros...")
    for i in range(n):
        t = i/FPS
        fr = Image.new("RGBA",(W,H),(0,0,0,255))

        recombining = t >= t_recomb
        if recombining:
            # recombinar: piezas vuelven y todo se vuelve Alef blanca
            k = smooth((t - t_recomb)/0.9)
            ext = frozenset("tbv")
            # interpolar offsets hacia 0 y fundir blanco encima
            for pc, off, mc in [(pc_top,OFF_TOP,m_top),(pc_bot,OFF_BOT,m_bot),(pc_vav,OFF_VAV,m_vav)]:
                ox,oy=int(off[0]*(1-k)), int(off[1]*(1-k))
                lay=Image.new("RGBA",(W,H),(0,0,0,0)); lay.paste(pc,(ox,oy),pc)
                fr=Image.alpha_composite(fr,lay)
            wf=white_full.copy()
            a=wf.getchannel("A").point(lambda v:int(v*k))
            wf.putalpha(a); fr=Image.alpha_composite(fr,wf)
        else:
            extracted=set()
            if t>=t_arr: extracted.add("t")
            if t>=t_aba: extracted.add("b")
            if t>=t_vav: extracted.add("v")
            st=frozenset(c for c in "tbv" if c in extracted)
            fr=Image.alpha_composite(fr, REM[st])
            # piezas extraídas con su offset animado
            def draw_piece(pc, off, trig):
                k=smooth((t-trig)/SEP)
                ox,oy=int(off[0]*k), int(off[1]*k)
                lay=Image.new("RGBA",(W,H),(0,0,0,0)); lay.paste(pc,(ox,oy),pc)
                return Image.alpha_composite(fr2[0], lay)
            fr2=[fr]
            if "v" in extracted: fr2[0]=draw_piece(pc_vav,OFF_VAV,t_vav)
            if "t" in extracted: fr2[0]=draw_piece(pc_top,OFF_TOP,t_arr)
            if "b" in extracted: fr2[0]=draw_piece(pc_bot,OFF_BOT,t_aba)
            fr=fr2[0]
            # etiquetas (en la posición separada de cada pieza)
            if "t" in extracted:
                k=smooth((t-t_arr)/SEP)
                fr=Image.alpha_composite(fr, label_layer("י",10,
                    gx+int(gw*0.70)+int(OFF_TOP[0]*k)+40, gy+int(gh*0.10)+int(OFF_TOP[1]*k)))
            if "b" in extracted:
                k=smooth((t-t_aba)/SEP)
                fr=Image.alpha_composite(fr, label_layer("י",10,
                    gx+int(gw*0.10)+int(OFF_BOT[0]*k)-30, gy+int(gh*0.78)+int(OFF_BOT[1]*k)))
            if "v" in extracted:
                fr=Image.alpha_composite(fr, label_layer("ו",6, gx+int(gw*0.62)+120, gy+int(gh*0.46)))

        # textos por tiempo
        if t_uno<=t<t_forma: fr=Image.alpha_composite(fr,L_eq1)
        if t>=t_26 and not recombining: fr=Image.alpha_composite(fr,L_eq26)
        if t>=t_yhvh and not recombining: fr=Image.alpha_composite(fr,L_yhvh)
        # subtítulo
        for lay,s,e in SUBS:
            if s<=t<e: fr=Image.alpha_composite(fr,lay); break

        fr.convert("RGB").save(f"{FRAMES}/f{i:05d}.png")
        if i % 120 == 0: print(f"   {i}/{n}")

    print("🎬 Codificando con ffmpeg...")
    cmd=["ffmpeg","-y","-framerate",str(FPS),"-i",f"{FRAMES}/f%05d.png","-i",mp3,
        "-c:v","libx264","-preset","medium","-crf","19","-pix_fmt","yuv420p",
        "-c:a","aac","-b:a","192k","-shortest",SALIDA]
    r=subprocess.run(cmd,capture_output=True,text=True)
    if r.returncode!=0:
        print("❌ ffmpeg:"); print(r.stderr[-900:]); sys.exit(1)
    print(f"\n✅ VIDEO: {SALIDA}")

if __name__=="__main__":
    main()
