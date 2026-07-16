#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · Letra Vav (ו) — Video vertical 9:16 (1080x1920, 30fps).
Fondos nano_banana_pro (grabado dorado) con Ken Burns + la Vav dibujándose
como una línea de luz que baja + títulos en español + subtítulos quemados
sincronizados a la voz de Martin. Cierra con el end-card oficial de Jashmal.
"""
import os, sys, json, subprocess, shutil, math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

# Directorio de trabajo ESTABLE (el Desktop sincronizado borraba archivos a mitad de proceso)
VAVDIR = "/Users/mardan/jashmal_vav_work"
IMG    = os.path.join(VAVDIR, "img")
FONTS  = os.path.join(VAVDIR, "fonts")
AUDIO  = os.path.join(VAVDIR, "audio")
BUILD  = os.path.join(VAVDIR, "build")
FRAMES = os.path.join(BUILD, "frames")
SALIDA = os.path.join(VAVDIR, "vav_FINAL.mp4")
MP3    = os.path.join(AUDIO, "vav_voz.mp3")
TIMING = os.path.join(AUDIO, "vav_timing.json")
ENDCARD_PORTAL = os.path.join(VAVDIR, "jashmal_endcard_portal_ES.png")
sys.path.insert(0, "/Users/mardan/workspace/jashmal/scripts")

W, H, FPS = 1080, 1920, 30
ASP = W / H
GOLD, GOLDB = (201, 164, 62), (240, 210, 120)
CREAM, DARK = (245, 239, 224), (5, 5, 10)

def F(name, s): return ImageFont.truetype(os.path.join(FONTS, name), s)
def cinzel(s):  return F("Cinzel-700.ttf", s)
def cinzel6(s): return F("Cinzel-600.ttf", s)
def corm_i(s):  return F("Cormorant-600-italic.ttf", s)
def heb(s):     return F("FrankRuhlLibre.ttf", s)
def smooth(x):
    x = max(0.0, min(1.0, x)); return x*x*(3-2*x)

BG_FILES = {"shaft": "01_shaft.png", "clavo": "02_clavo.png",
            "cielo": "03_cielotierra.png", "seis": "04_seisdir.png",
            "conducto": "05_conducto.png"}

# (start, bg_key, z0, z1, pan)
SCENES = [
    (0.0,  "shaft",    1.00, 1.06, (0, -40)),
    (14.0, "clavo",    1.06, 1.00, (0,  30)),
    (19.0, "cielo",    1.00, 1.07, (0,  60)),
    (32.5, "seis",     1.05, 1.00, (0,   0)),
    (38.2, "shaft",    1.00, 1.06, (0,  40)),
    (43.8, "conducto", 1.06, 1.00, (0, -50)),
]
XF = 0.7
VAV_END = 14.0          # la escena 1 (Vav dibujada) termina aquí
TITLE_DEFS = [
    ("LA VAV",           False, 300, 82, 5.2, 13.6),
    ("GANCHO · CLAVO",   False, 340, 70, 15.0, 18.7),
    ("SEIS DIRECCIONES", False, 340, 66, 34.2, 38.0),
    ("TÚ ERES UNA VAV",  False, 330, 68, 45.6, 49.6),
    ("SÉ EL PUENTE",     True,  250, 82, 54.3, 56.9),
]

def prescale(path):
    im = Image.open(path).convert("RGB"); bw, bh = im.size
    tw, th = int(W*1.18), int(H*1.18); s = max(tw/bw, th/bh)
    return im.resize((round(bw*s), round(bh*s)), Image.LANCZOS)

def kenburns(pre, t01, z0, z1, pan=(0, 0)):
    pw, ph = pre.size; base_h = min(ph, pw/ASP)
    z = z0 + (z1-z0)*smooth(t01); ch = base_h/z; cw = ch*ASP
    cx = pw/2 + pan[0]*smooth(t01); cy = ph/2 + pan[1]*smooth(t01)
    left = max(0, min(pw-cw, cx-cw/2)); top = max(0, min(ph-ch, cy-ch/2))
    return pre.crop((round(left), round(top), round(left+cw), round(top+ch))).resize((W, H), Image.LANCZOS)

def make_scrim():
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gb = Image.new("L", (1, H), 0); top = int(H*0.58)
    for y in range(H): gb.putpixel((0, y), 0 if y < top else int(210*(y-top)/(H-top)))
    b1 = Image.new("RGBA", (W, H), (3, 3, 8, 255)); b1.putalpha(gb.resize((W, H))); img.alpha_composite(b1)
    gt = Image.new("L", (1, H), 0); bot = int(H*0.30)
    for y in range(H): gt.putpixel((0, y), int(150*(1-y/bot)) if y < bot else 0)
    b2 = Image.new("RGBA", (W, H), (3, 3, 8, 255)); b2.putalpha(gt.resize((W, H))); img.alpha_composite(b2)
    return img

def _fit_font(text, size, maxw):
    f = cinzel(size)
    while size > 30:
        f = cinzel(size)
        w = ImageDraw.Draw(Image.new("RGBA", (4, 4))).textlength(text, font=f)
        if w <= maxw: break
        size -= 3
    return f

def title_layer(text, vav=True, y=300, size=76, color=CREAM):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img); yy = y
    if vav:
        vf = heb(150)
        d.text((W//2+3, yy+3), "ו", font=vf, fill=(0, 0, 0, 150), anchor="ma")
        d.text((W//2, yy), "ו", font=vf, fill=(*GOLDB, 255), anchor="ma"); yy += 185
    spaced = " ".join(list(text)) if len(text) <= 10 else text
    f = _fit_font(spaced, size, W-130)
    d.text((W//2+3, yy+3), spaced, font=f, fill=(0, 0, 0, 160), anchor="ma")
    d.text((W//2, yy), spaced, font=f, fill=(*color, 255), anchor="ma")
    return img

def build_vav():
    size = 1150; f = heb(size)
    tmp = Image.new("RGBA", (W, H), (0, 0, 0, 0)); dt = ImageDraw.Draw(tmp)
    bb = dt.textbbox((0, 0), "ו", font=f); gw, gh = bb[2]-bb[0], bb[3]-bb[1]
    x = (W-gw)//2 - bb[0]; y_top = 560; y = y_top - bb[1]
    full = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0)); dg = ImageDraw.Draw(glow)
    dg.text((x, y), "ו", font=f, fill=(*GOLDB, 200)); glow = glow.filter(ImageFilter.GaussianBlur(26))
    full = Image.alpha_composite(full, glow)
    core = Image.new("RGBA", (W, H), (0, 0, 0, 0)); dc = ImageDraw.Draw(core)
    dc.text((x, y), "ו", font=f, fill=(*GOLDB, 255)); full = Image.alpha_composite(full, core)
    return full, y_top, y_top+gh

def vav_reveal(full, y_top, y_bot, p):
    if p <= 0: return Image.new("RGBA", (W, H), (0, 0, 0, 0))
    cut = y_top + (y_bot-y_top)*p
    mask = Image.new("L", (W, H), 0); md = ImageDraw.Draw(mask)
    md.rectangle([0, 0, W, int(cut)], fill=255); mask = mask.filter(ImageFilter.GaussianBlur(20))
    out = full.copy(); a = out.getchannel("A")
    out.putalpha(Image.composite(a, Image.new("L", (W, H), 0), mask))
    if p < 0.995:
        head = Image.new("RGBA", (W, H), (0, 0, 0, 0)); hd = ImageDraw.Draw(head)
        hd.ellipse([W//2-70, int(cut)-70, W//2+70, int(cut)+70], fill=(*GOLDB, 220))
        out = Image.alpha_composite(out, head.filter(ImageFilter.GaussianBlur(30)))
    return out

def build_phrases(words):
    phrases, buf, s = [], [], None
    for wd in words:
        w = wd["w"]
        if s is None: s = wd["start"]
        buf.append(wd); txt = " ".join(x["w"] for x in buf)
        if any(w.rstrip().endswith(c) for c in [".", "?", "!", "…", ":"]) or len(txt) >= 46:
            phrases.append((txt, s, wd["end"])); buf, s = [], None
    if buf: phrases.append((" ".join(x["w"] for x in buf), s, buf[-1]["end"]))
    return phrases

def sub_layer(texto):
    texto = texto.replace("…", "...").strip()
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(img); f = cinzel6(50)
    pal = texto.split(); L, cur = [], ""
    for p in pal:
        t = (cur+" "+p).strip()
        if d.textbbox((0, 0), t, font=f)[2] < W-150: cur = t
        else: L.append(cur); cur = p
    if cur: L.append(cur)
    lh = 66; y = H-300-(len(L)-1)*lh
    for ln in L:
        for ox, oy in [(-2, 2), (2, 2), (0, 3), (0, 0)]:
            d.text((W//2+ox, y+oy), ln, font=f, fill=(0, 0, 0, 220), anchor="ma")
        d.text((W//2, y), ln, font=f, fill=(*CREAM, 255), anchor="ma"); y += lh
    return img

# ── Contexto estático + compositor de un cuadro ──────────────────────────
def build_static():
    tj = json.load(open(TIMING)); dur = tj["duration"]; words = tj["words"]
    uniq = {}
    for _, k, *_ in SCENES:
        if k not in uniq: uniq[k] = prescale(os.path.join(IMG, BG_FILES[k]))
    ctx = {
        "dur": dur, "uniq": uniq, "scrim": make_scrim(),
        "titles": [(title_layer(t, v, y, sz), ti, to) for (t, v, y, sz, ti, to) in TITLE_DEFS],
        "subs": [(sub_layer(t), s, e) for (t, s, e) in build_phrases(words)],
        "bounds": [s for s, *_ in SCENES] + [dur],
    }
    vf, vy0, vy1 = build_vav(); ctx["vav"] = (vf, vy0, vy1)
    return ctx

def _scene_bg(ctx, i, t):
    st, en = ctx["bounds"][i], ctx["bounds"][i+1]
    _, k, z0, z1, pan = SCENES[i]
    return kenburns(ctx["uniq"][k], (t-st)/max(0.01, en-st), z0, z1, pan)

def compose(t, ctx):
    i = 0
    for j in range(len(SCENES)):
        if t >= ctx["bounds"][j]: i = j
    base = _scene_bg(ctx, i, t).convert("RGBA")
    en = ctx["bounds"][i+1]
    if i+1 < len(SCENES) and t > en-XF:
        base = Image.blend(base, _scene_bg(ctx, i+1, en).convert("RGBA"), smooth((t-(en-XF))/XF))
    base = Image.alpha_composite(base, ctx["scrim"])
    if t < VAV_END:
        vf, vy0, vy1 = ctx["vav"]; layer = vav_reveal(vf, vy0, vy1, smooth((t-0.4)/4.2))
        if t > 4.8:
            puls = 0.85+0.15*(0.5+0.5*math.sin((t-4.8)*1.4))
            layer.putalpha(layer.getchannel("A").point(lambda v: int(v*puls)))
        if t > VAV_END-XF:
            fo = 1-smooth((t-(VAV_END-XF))/XF)
            layer.putalpha(layer.getchannel("A").point(lambda v: int(v*fo)))
        base = Image.alpha_composite(base, layer)
    for lay, ti, to in ctx["titles"]:
        if ti <= t < to:
            fa = min(smooth((t-ti)/0.5), smooth((to-t)/0.5))
            l2 = lay.copy(); l2.putalpha(lay.getchannel("A").point(lambda v: int(v*fa)))
            base = Image.alpha_composite(base, l2)
    for lay, s, e in ctx["subs"]:
        if s <= t < e: base = Image.alpha_composite(base, lay); break
    return base.convert("RGB")

def main():
    if os.path.isdir(FRAMES): shutil.rmtree(FRAMES)
    os.makedirs(FRAMES, exist_ok=True)
    print("Construyendo capas estáticas..."); ctx = build_static()
    n = int(ctx["dur"]*FPS)+1
    print(f"Render {n} cuadros ({ctx['dur']:.1f}s)...")
    for fi in range(n):
        compose(fi/FPS, ctx).save(f"{FRAMES}/f{fi:05d}.png")
        if fi % 150 == 0: print(f"  {fi}/{n}")
    print("Codificando...")
    tmp = os.path.join(BUILD, "vav_noend.mp4")
    cmd = ["ffmpeg", "-y", "-framerate", str(FPS), "-i", f"{FRAMES}/f%05d.png",
           "-i", MP3, "-c:v", "libx264", "-preset", "slow", "-crf", "18",
           "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-shortest",
           "-movflags", "+faststart", tmp]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0: print(r.stderr[-1200:]); sys.exit(1)
    print("Añadiendo end-card oficial...")
    import jashmal_endcard as JE
    JE.ENDCARD_ES = ENDCARD_PORTAL   # usar la copia estable del portal dorado
    JE.append_endcard(tmp, lang="es", out_path=SALIDA)
    print(f"\nLISTO: {SALIDA}")

if __name__ == "__main__":
    main()
