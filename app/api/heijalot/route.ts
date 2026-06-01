import { NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";
import { SEFIROT } from "@/lib/sefirot";

export const runtime = "nodejs";
export const maxDuration = 30;

const HAIKU = "claude-haiku-4-5-20251001";

const LANG: Record<string, string> = {
  es: "español",
  fa: "persa (فارسی) — NO árabe; usa vocabulario y gramática persas",
  en: "English",
};

// POST { path: string[], locale } → { explanation }
// "path" = array de IDs de sefirá desde la más externa hasta la más interna
// Ej. ["keter", "chochmah"] = Jojmá dentro de Kéter
export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }
  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`heijalot:${ip}`);
  if (!allowed) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: { path?: string[]; locale?: string };
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const path = body.path ?? [];
  const locale = ["es","fa","en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  const lang = LANG[locale] ?? LANG.es;

  if (path.length < 2) {
    return NextResponse.json({ error: "need_at_least_2" }, { status: 400 });
  }

  const sefirot = path.map((id) => SEFIROT.find((s) => s.id === id));
  if (sefirot.some((s) => !s)) {
    return NextResponse.json({ error: "unknown_sefira" }, { status: 400 });
  }

  const outerName = sefirot[sefirot.length - 2]!.he + " (" + sefirot[sefirot.length - 2]!.es + ")";
  const innerName = sefirot[sefirot.length - 1]!.he + " (" + sefirot[sefirot.length - 1]!.es + ")";
  const fullPath = sefirot.map((s) => s!.he + " (" + s!.es + ")").join(" → ");
  const depth = path.length - 1;

  const prompt = `Eres un maestro en la tradición del Arí z"l, la literatura de los Heijalot y la Cabalá
luriánica. El estudiante ha penetrado ${depth} nivel(es) de profundidad en el Árbol de la Vida.

Camino recorrido (de afuera hacia adentro): ${fullPath}

Cámara actual: ${innerName} DENTRO DE ${outerName} — nivel ${depth} del Héijal (הֵיכַל).

Explica en ${lang} con estos apartados y títulos en hebreo:

**הֵיכַל — La Cámara**
¿Qué es este Héijal específico según la tradición de los Heijalot (Heijalot Rabbati / Heijalot Zutarti)?
¿Qué ángeles, fuerzas o corrientes de luz habitan esta cámara?

**כְּלִי — El Vaso**
¿Qué cualidad de ${innerName.split(" (")[0]} se amplifica y refina al estar DENTRO DE ${outerName.split(" (")[0]}?
¿Cómo transforma esto la conciencia del meditador?

**אוֹר — La Luz**
¿Qué luz divina específica corresponde a esta combinación sefirótica?
Desde la perspectiva luriánica (Etz Jaim, Shaarim del Arí), ¿qué proceso de tikún ocurre aquí?

**מְקוֹרוֹת — Fuentes**
Cita 2-3 pasajes del Zohar, Heijalot o Torá que iluminen específicamente ESTA combinación.
Sé preciso con capítulo y versículo.

Sé específico a ESTA combinación — no genérico. El estudiante está meditando activamente.`;

  try {
    const msg = await anthropic.messages.create({
      model: HAIKU,
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    });
    const explanation = msg.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n").trim();
    return NextResponse.json({ explanation });
  } catch (err) {
    console.error("heijalot error", err);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
