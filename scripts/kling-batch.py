#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
═══════════════════════════════════════════════════════════════════════════
  JASHMAL · Generador de videos en lote con Kling AI
═══════════════════════════════════════════════════════════════════════════

  Qué hace:
    1. Lee tus claves de Kling desde .env.local
    2. Genera un video por cada concepto de la lista CONCEPTOS (abajo)
    3. Espera a que cada uno termine (2-5 min cada uno)
    4. Los descarga a ~/Desktop/jashmal-videos/

  Cómo usarlo:
    1. Edita la lista CONCEPTOS abajo (añade o quita los que quieras)
    2. En la Terminal:  python3 scripts/kling-batch.py
    3. Espera. Los videos caen en ~/Desktop/jashmal-videos/

  Seguridad de costos:
    - MAX_VIDEOS limita cuántos genera por corrida (no más de eso)
    - Cada video consume créditos de tu cuenta Kling
═══════════════════════════════════════════════════════════════════════════
"""

import jwt, time, os, json, urllib.request, urllib.error, sys

# ─────────────────────────────────────────────────────────────────────────
#  ⚙️  CONFIGURACIÓN
# ─────────────────────────────────────────────────────────────────────────

MAX_VIDEOS = 5          # 🛡️ Tope de seguridad: nunca genera más de esto por corrida
MODEL      = "kling-v1-6"  # Modelo de Kling
MODE       = "std"      # "std" (más barato) o "pro" (más calidad, más caro)
ASPECT     = "9:16"     # 9:16 vertical (TikTok), 16:9 horizontal, 1:1 cuadrado
DURATION   = "5"        # "5" o "10" segundos

OUTPUT_DIR = os.path.expanduser("~/Desktop/jashmal-videos")

# ─────────────────────────────────────────────────────────────────────────
#  🎬  CONCEPTOS A GENERAR
#  Edita esta lista. Cada concepto: nombre del archivo + prompt visual.
#  Para empezar barato, deja solo 1. Añade más cuando estés conforme.
# ─────────────────────────────────────────────────────────────────────────

CONCEPTOS = [
    {
        "nombre": "ejad_ahava_yhvh",
        "prompt": (
            "Cinematic photorealistic dark cosmic void, two luminous golden spheres "
            "slowly floating toward each other across infinite darkness, each surrounded "
            "by softly glowing golden particles and sacred light. As they approach, "
            "golden light threads connect them. The atmosphere is deeply contemplative "
            "and divine, like witnessing a cosmic truth. Warm amber and gold tones, "
            "slight lens flare, slow cinematic push-in camera movement, mystical and "
            "sacred mood, no text, no people."
        ),
    },
    # ─── Conceptos anteriores (comentados para no regenerar) ───
    # {
    #     "nombre": "358_mashiaj_najash",
    #     "prompt": (
    #         "Cinematic photorealistic desert at night, vast starry sky with the "
    #         "Milky Way, a dramatic beam of moonlight breaking through dark clouds. "
    #         "In the center a large stone splitting in two, brilliant golden light "
    #         "bursting from the glowing crack, golden dust swirling. On the left a "
    #         "glowing amber sphere with a coiling serpent silhouette; on the right a "
    #         "glowing golden sphere with a standing human figure silhouette. Mystical, "
    #         "sacred, epic atmosphere, slow cinematic camera push-in."
    #     ),
    # },
]

# ─────────────────────────────────────────────────────────────────────────
#  🔧  MOTOR (no necesitas tocar nada de aquí para abajo)
# ─────────────────────────────────────────────────────────────────────────

BASE = "https://api.klingai.com"

def cargar_claves():
    """Lee las claves de Kling desde .env.local"""
    env_path = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    keys = {}
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line.startswith("KLING_") and "=" in line:
                k, v = line.split("=", 1)
                keys[k] = v.strip()
    ak = keys.get("KLING_ACCESS_KEY", "")
    sk = keys.get("KLING_SECRET_KEY", "")
    if not ak or not sk:
        print("❌ Faltan las claves de Kling en .env.local")
        sys.exit(1)
    return ak, sk

def hacer_token(ak, sk):
    """Genera el token JWT que Kling pide para autenticar"""
    payload = {"iss": ak, "exp": int(time.time()) + 1800, "nbf": int(time.time()) - 5}
    return jwt.encode(payload, sk, algorithm="HS256", headers={"alg": "HS256", "typ": "JWT"})

def post_json(url, token, body):
    data = json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, method="POST", headers={
        "Authorization": f"Bearer {token}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

def get_json(url, token):
    req = urllib.request.Request(url, method="GET", headers={
        "Authorization": f"Bearer {token}", "Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())

def descargar(url, destino):
    urllib.request.urlretrieve(url, destino)

def generar_video(concepto, ak, sk):
    """Crea la tarea, espera, descarga. Devuelve la ruta del archivo o None."""
    nombre = concepto["nombre"]
    print(f"\n🎬 [{nombre}] Enviando a Kling...")

    token = hacer_token(ak, sk)
    body = {
        "model_name": MODEL, "mode": MODE, "aspect_ratio": ASPECT,
        "duration": DURATION, "prompt": concepto["prompt"],
        "cfg_scale": 0.5,
    }
    try:
        resp = post_json(f"{BASE}/v1/videos/text2video", token, body)
    except urllib.error.HTTPError as e:
        print(f"   ❌ Error al enviar: {e.code} — {e.read().decode()[:200]}")
        return None

    if resp.get("code") != 0:
        print(f"   ❌ Kling rechazó: {resp.get('message')}")
        return None

    task_id = resp["data"]["task_id"]
    print(f"   ⏳ Tarea creada ({task_id[:12]}...). Generando, esto tarda 2-5 min...")

    # Esperar a que termine (polling cada 15s, máximo 10 min)
    for intento in range(40):
        time.sleep(15)
        token = hacer_token(ak, sk)  # refrescar token por si expira
        try:
            q = get_json(f"{BASE}/v1/videos/text2video/{task_id}", token)
        except Exception as e:
            print(f"   ⚠️ Reintentando consulta... ({e})")
            continue

        estado = q.get("data", {}).get("task_status", "")
        if estado == "succeed":
            videos = q["data"]["task_result"]["videos"]
            url = videos[0]["url"]
            destino = os.path.join(OUTPUT_DIR, f"{nombre}.mp4")
            print(f"   ⬇️  Descargando...")
            descargar(url, destino)
            print(f"   ✅ LISTO: {destino}")
            return destino
        elif estado == "failed":
            print(f"   ❌ Falló: {q.get('data', {}).get('task_status_msg', 'sin detalle')}")
            return None
        else:
            mins = (intento + 1) * 15 // 60
            secs = (intento + 1) * 15 % 60
            print(f"   ⏳ Procesando... ({mins}m{secs:02d}s)")

    print("   ⏱️ Se agotó el tiempo de espera (10 min). Revisa en klingai.com")
    return None

def main():
    print("═" * 60)
    print("  JASHMAL · Generador de videos Kling en lote")
    print("═" * 60)

    if len(CONCEPTOS) > MAX_VIDEOS:
        print(f"⚠️ Tienes {len(CONCEPTOS)} conceptos pero el tope es {MAX_VIDEOS}.")
        print(f"   Solo se generarán los primeros {MAX_VIDEOS}.")
    lista = CONCEPTOS[:MAX_VIDEOS]

    print(f"\n📋 Se generarán {len(lista)} video(s):")
    for c in lista:
        print(f"   · {c['nombre']}")
    print(f"\n💾 Se guardarán en: {OUTPUT_DIR}")
    print(f"⚙️  Modelo: {MODEL} · {MODE} · {ASPECT} · {DURATION}s")

    ak, sk = cargar_claves()
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    resultados = []
    for c in lista:
        ruta = generar_video(c, ak, sk)
        resultados.append((c["nombre"], ruta))

    print("\n" + "═" * 60)
    print("  RESUMEN")
    print("═" * 60)
    for nombre, ruta in resultados:
        estado = "✅" if ruta else "❌"
        print(f"  {estado} {nombre}")
    listos = sum(1 for _, r in resultados if r)
    print(f"\n  {listos}/{len(resultados)} videos generados en {OUTPUT_DIR}")
    print("═" * 60)

if __name__ == "__main__":
    main()
