#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
JASHMAL · PILOTO "Gematría del día" — pipeline de automatización.
============================================================================
Objetivo: HANDS-OFF en producción, con APROBACIÓN HUMANA antes de publicar.
ESTE SCRIPT NUNCA PUBLICA. Solo deja todo listo en una BANDEJA DE APROBACIÓN
para que Mardan lo revise y publique a mano (o, más adelante, lo empuje como
BORRADOR PROGRAMADO a Metricool cuando el conector esté conectado).

Qué hace, de una corrida:
  1. Lee el banco verificado por el Sofer (banco-gematria.ts) vía _banco_dump.mjs.
  2. Elige la SIGUIENTE gematría no usada (registro de usadas en estado.json).
  3. Renderiza la lámina 9:16 on-brand (plantilla C oficial: número dorado
     gigante sobre negro #05050a, marco + sello lamed + firma jashmal.org),
     reutilizando el renderizador de marca (marca-instagram/plantilla_C_gematria).
  4. Genera caption + hashtags en español (del insight y el término del banco;
     NO inventa datos nuevos).
  5. Deposita TODO en la bandeja: bandeja/AAAA-MM-DD/ con la imagen .png,
     caption.txt y resumen.md. Y agrega una línea al digest.md.
  6. (Opcional, apagado) Deja preparada —pero SIN ejecutar— la función que
     empujaría la lámina como borrador programado a Metricool.

Uso:
    python3 scripts/pilot_gematria_diaria.py            # corrida normal
    python3 scripts/pilot_gematria_diaria.py --dry-run  # no escribe estado
    python3 scripts/pilot_gematria_diaria.py --id luz-secreto-207   # forzar una

Salida:  ~/jashmal-produccion/piloto-gematria/bandeja/AAAA-MM-DD/
============================================================================
"""
import os
import sys
import json
import subprocess
import unicodedata
import argparse
from datetime import datetime
from PIL import Image, ImageDraw

# ── Rutas ───────────────────────────────────────────────────────────────────
REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROD = "/Users/mardan/jashmal-produccion"
MARCA = os.path.join(PROD, "marca-instagram")
PILOTO = os.path.join(PROD, "piloto-gematria")
BANCO_TS = os.path.join(PILOTO, "banco-gematria.ts")
ESTADO = os.path.join(PILOTO, "estado.json")
BANDEJA = os.path.join(PILOTO, "bandeja")
DIGEST = os.path.join(BANDEJA, "digest.md")
DUMPER = os.path.join(REPO, "scripts", "_banco_dump.mjs")

# Renderizador oficial de marca (plantilla C · gematría). Se reutiliza tal cual.
sys.path.insert(0, MARCA)
import plantilla_C_gematria as C  # noqa: E402
import jashmal_brand as B  # noqa: E402

FIRMA_URL = "jashmal.org"


# ── Utilidades ───────────────────────────────────────────────────────────────
def _wrap_px(texto, font, maxw):
    """Parte un texto en líneas que CABEN en maxw píxeles con esa fuente.
    Mide el ancho real (no cuenta caracteres) para que nunca se desborde."""
    d = ImageDraw.Draw(Image.new("RGBA", (4, 4)))
    palabras, lineas, actual = texto.split(), [], ""
    for w in palabras:
        test = (actual + " " + w).strip()
        if d.textlength(test, font=font) <= maxw:
            actual = test
        else:
            if actual:
                lineas.append(actual)
            actual = w
    if actual:
        lineas.append(actual)
    return lineas


def cargar_banco():
    """Vuelca banco-gematria.ts a JSON con el ayudante de Node."""
    if not os.path.isfile(BANCO_TS):
        crear_stub_banco()
    out = subprocess.run(
        ["node", DUMPER, BANCO_TS], capture_output=True, text=True
    )
    if out.returncode != 0:
        print("ERROR al leer el banco:", out.stderr, file=sys.stderr)
        sys.exit(1)
    return json.loads(out.stdout or "[]")


def crear_stub_banco():
    """Red de seguridad: si el banco real no existe todavía, crea un stub
    temporal con 2 gematrías clásicas CORRECTAS para probar el flujo.
    El banco REAL lo llena y verifica el editor-erudito (el Sofer)."""
    os.makedirs(PILOTO, exist_ok=True)
    stub = '''// STUB TEMPORAL autogenerado por el pipeline para probar el flujo.
// El banco REAL lo llena y VERIFICA el editor-erudito (el Sofer). No publicar
// como definitivo. Estas 2 entradas sí son gematrías clásicas correctas.
export type GematriaEntry = {
  id: string; termino: string; hebreo: string; translit: string;
  gematria: number;
  equivalencias: { palabra: string; hebreo: string; translit: string; valor: number }[];
  insight: string; fuente: string;
};
export const bancoGematria: GematriaEntry[] = [
  { id: "amor-ejad-13", termino: "Amor", hebreo: "אהבה", translit: "ahavá",
    gematria: 13,
    equivalencias: [{ palabra: "Uno", hebreo: "אחד", translit: "ejad", valor: 13 }],
    insight: "Amor (ahavá) y Uno (ejad) valen 13: amar es revelar que dos son uno.",
    fuente: "Clásico: ahavá = ejad = 13." },
  { id: "vida-jai-18", termino: "Vida", hebreo: "חי", translit: "jai",
    gematria: 18, equivalencias: [],
    insight: "'Vivo' (jai) suma 18, el número de la vida; por eso se da caridad en múltiplos de 18.",
    fuente: "Clásico: jai = 18." },
];
export default bancoGematria;
'''
    with open(BANCO_TS, "w", encoding="utf-8") as f:
        f.write(stub)
    print("[stub] Banco no existía; creé un stub temporal en", BANCO_TS)


def cargar_estado():
    if os.path.isfile(ESTADO):
        with open(ESTADO, encoding="utf-8") as f:
            return json.load(f)
    return {"usadas": [], "historial": []}


def guardar_estado(estado):
    os.makedirs(PILOTO, exist_ok=True)
    with open(ESTADO, "w", encoding="utf-8") as f:
        json.dump(estado, f, ensure_ascii=False, indent=2)


def elegir_siguiente(banco, estado, forzar_id=None):
    """La SIGUIENTE gematría no usada, en orden del banco. Si se agotan, avisa."""
    if forzar_id:
        for e in banco:
            if e["id"] == forzar_id:
                return e
        print("No encontré el id forzado:", forzar_id, file=sys.stderr)
        sys.exit(1)
    usadas = set(estado.get("usadas", []))
    for e in banco:
        if e["id"] not in usadas:
            return e
    return None


# ── Render de la lámina (reutiliza plantilla C oficial) ──────────────────────
def render_lamina(entry, salida):
    """Compone la lámina de gematría reutilizando build_C de la marca:
       kicker "GEMATRÍA" · palabra hebrea (RTL correcto) · número gigante ·
       término en español + equivalencia + insight (líneas)."""
    num = entry["gematria"]
    equivs = entry.get("equivalencias", [])
    f64 = B.corm(64)
    maxw = B.W - 220          # ancho seguro dentro del marco
    CAP = 6                   # tope de líneas para no chocar con la firma

    # Titular: la ECUACIÓN gemátrica (punchy, on-brand), del banco.
    if equivs:
        eq = equivs[0]
        titular = f"{entry['translit']}  =  {eq['translit']}  =  {num}"
    else:
        titular = f"{entry['translit']}  =  {num}"

    lineas = _wrap_px(titular, f64, maxw)

    # "Gustito" del insight (el insight COMPLETO va en el caption). Se recorta
    # a lo que quepa sin desbordar; si sobra, cierra con "…".
    insight_lineas = _wrap_px(entry["insight"], f64, maxw)
    room = CAP - len(lineas)
    if len(insight_lineas) > room:
        insight_lineas = insight_lineas[:max(room, 0)]
        if insight_lineas:
            insight_lineas[-1] = insight_lineas[-1].rstrip(" .,;:") + " …"
    lineas += insight_lineas

    sub_abajo = lineas[:CAP]

    # El hebreo (palabra lógica) va como apoyo. El renderizador de marca lo
    # reordena a RTL visual con bidi (jashmal_brand.heb_shape) al dibujarlo.
    return C.build_C(
        protagonista=str(num),
        sub_arriba="GEMATRÍA",
        sub_abajo=sub_abajo,
        salida=salida,
        glifo_heb=entry["hebreo"],
    )


# ── Caption + hashtags (del banco; NO inventa datos) ─────────────────────────
BASE_HASHTAGS = [
    "#jashmal", "#cabala", "#kabbalah", "#gematria", "#torah",
    "#misticajudia", "#hebreo", "#sabiduria", "#espiritualidad", "#jashmalorg",
]


def _slug_tag(termino):
    t = "".join(c for c in unicodedata.normalize("NFD", termino.lower())
                if unicodedata.category(c) != "Mn")
    t = "".join(c for c in t if c.isalnum())
    return "#" + t if t else None


def build_caption(entry):
    termino = entry["termino"]
    num = entry["gematria"]
    equivs = entry.get("equivalencias", [])
    partes = []

    # Gancho: término + número.
    partes.append(f"✦ {termino.upper()}  ·  {num} ✦")
    partes.append("")

    # Cuerpo: el insight verificado (tal cual del banco).
    partes.append(entry["insight"])
    partes.append("")

    # Equivalencia explícita si la hay.
    if equivs:
        eq = equivs[0]
        partes.append(f"{termino} ({entry['hebreo']}) = {eq['palabra']} "
                      f"({eq['hebreo']}) = {num}")
        partes.append("")

    # Llamada al estudio (sin comercial: solo invita a profundizar).
    partes.append("Estudia la gematría completa en jashmal.org")
    partes.append("")

    # Hashtags (marca + término específico), sin duplicar.
    tags = list(BASE_HASHTAGS)
    tt = _slug_tag(termino)
    if tt and tt not in tags:
        tags.insert(3, tt)
    partes.append(" ".join(tags))

    return "\n".join(partes)


# ── Metricool: PREPARADO PERO APAGADO (no hay conector en la sesión) ─────────
def push_borrador_metricool(png_path, caption, fecha):
    """[APAGADO A PROPÓSITO] Empujaría la lámina como BORRADOR PROGRAMADO a
    Metricool (nunca publicación directa). NO se llama en esta corrida.

    Estado actual (2026-07): NO hay conector de Metricool disponible en la
    sesión de Claude (verificado con ToolSearch "metricool"). Por eso hoy la
    aprobación es por CARPETA (bandeja) + publicación MANUAL de Mardan.

    Cuando se conecte Metricool, este es el enganche a implementar:
      1. Subir la imagen (png_path) al media/library de Metricool.
      2. Crear un post en estado BORRADOR/PROGRAMADO (autoPublish = false),
         red = Instagram, texto = caption, fecha sugerida = fecha + hora óptima
         (audiencia LatAm, ~19:00 AST según analytics de IG).
      3. Devolver la URL del borrador para que Mardan lo apruebe en Metricool.
    NUNCA poner autoPublish=true: la regla del proyecto es aprobación humana."""
    raise NotImplementedError(
        "Metricool no está conectado. Aprobación por bandeja + publicación "
        "manual. Ver comentario de esta función para el enganche futuro."
    )


# ── Depósito en la bandeja de aprobación ─────────────────────────────────────
def depositar(entry, fecha):
    carpeta = os.path.join(BANDEJA, fecha)
    os.makedirs(carpeta, exist_ok=True)

    png = os.path.join(carpeta, f"gematria-{entry['id']}.png")
    render_lamina(entry, png)

    caption = build_caption(entry)
    with open(os.path.join(carpeta, "caption.txt"), "w", encoding="utf-8") as f:
        f.write(caption + "\n")

    resumen = f"""# Gematría del día · {fecha}

**Estado:** BORRADOR EN BANDEJA — pendiente de aprobación de Mardan. NADA se publicó.

| Campo | Valor |
|---|---|
| Término | {entry['termino']} |
| Hebreo | {entry['hebreo']} ({entry['translit']}) |
| Gematría | **{entry['gematria']}** |
| Equivalencias | {', '.join(f"{e['palabra']} {e['hebreo']}={e['valor']}" for e in entry.get('equivalencias', [])) or '—'} |
| Fuente (Sofer) | {entry['fuente']} |
| id del banco | `{entry['id']}` |

## Insight
{entry['insight']}

## Lámina
![lámina](./gematria-{entry['id']}.png) — formato 9:16, plantilla C oficial (número dorado sobre negro, marco + sello lamed + firma {FIRMA_URL}).

## Caption listo para pegar
```
{caption}
```

## Cómo publicar (manual, por ahora)
1. Revisa que el número, el hebreo y el insight sean correctos (ya vienen del banco verificado por el Sofer).
2. Sube `gematria-{entry['id']}.png` a Instagram (@jashmal_kabbalah).
3. Pega el contenido de `caption.txt`.
4. Publica cuando quieras (sugerido: tarde-noche AST).

_Metricool todavía no está conectado; cuando lo esté, este paso se vuelve “aprobar el borrador programado” en un clic._
"""
    with open(os.path.join(carpeta, "resumen.md"), "w", encoding="utf-8") as f:
        f.write(resumen)

    return carpeta, png, caption


def append_digest(entry, fecha, carpeta):
    os.makedirs(BANDEJA, exist_ok=True)
    nuevo = not os.path.isfile(DIGEST)
    with open(DIGEST, "a", encoding="utf-8") as f:
        if nuevo:
            f.write("# Bandeja diaria · Gematría del día\n\n")
            f.write("Cada línea es un borrador PENDIENTE de tu aprobación. "
                    "Nada se publica solo.\n\n")
            f.write("| Fecha | Gematría | Valor | Estado | Carpeta |\n")
            f.write("|---|---|---|---|---|\n")
        eqs = entry.get("equivalencias", [])
        eqtxt = f" = {eqs[0]['palabra']}" if eqs else ""
        f.write(f"| {fecha} | {entry['termino']} ({entry['hebreo']}){eqtxt} "
                f"| {entry['gematria']} | ⏳ pendiente "
                f"| `{os.path.relpath(carpeta, BANDEJA)}/` |\n")


# ── Main ─────────────────────────────────────────────────────────────────────
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true",
                    help="Genera todo pero NO marca la entrada como usada.")
    ap.add_argument("--id", help="Forzar una gematría por su id del banco.")
    ap.add_argument("--fecha", help="Forzar fecha AAAA-MM-DD (por defecto hoy).")
    args = ap.parse_args()

    fecha = args.fecha or datetime.now().strftime("%Y-%m-%d")

    banco = cargar_banco()
    if not banco:
        print("El banco está vacío. El Sofer debe llenarlo. Nada que hacer.")
        return
    estado = cargar_estado()

    entry = elegir_siguiente(banco, estado, forzar_id=args.id)
    if entry is None:
        usadas = len(estado.get("usadas", []))
        print(f"✔ Banco AGOTADO: ya se usaron las {usadas} gematrías del banco.")
        print("  El Sofer debe agregar más al banco. El pipeline para y avisa.")
        return

    carpeta, png, caption = depositar(entry, fecha)
    append_digest(entry, fecha, carpeta)

    if not args.dry_run and not args.id:
        estado.setdefault("usadas", []).append(entry["id"])
        estado.setdefault("historial", []).append(
            {"fecha": fecha, "id": entry["id"], "gematria": entry["gematria"]}
        )
        guardar_estado(estado)

    restantes = len(banco) - len(estado.get("usadas", []))
    print("──────────────────────────────────────────────")
    print(f"✔ Gematría del día lista EN BANDEJA (no publicada): {entry['termino']} = {entry['gematria']}")
    print(f"  Carpeta : {carpeta}")
    print(f"  Imagen  : {png}")
    print(f"  Caption : {os.path.join(carpeta, 'caption.txt')}")
    print(f"  Resumen : {os.path.join(carpeta, 'resumen.md')}")
    print(f"  Digest  : {DIGEST}")
    print(f"  Quedan {restantes} gematrías sin usar en el banco.")
    print("  Metricool: NO conectado → aprobación por carpeta + publicación manual.")
    print("──────────────────────────────────────────────")


if __name__ == "__main__":
    main()
