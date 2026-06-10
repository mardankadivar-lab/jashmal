import { NextResponse } from "next/server";
import { anthropic, LIGHT_MODEL } from "@/lib/engine/anthropic";
import { checkRateLimit, clientIp } from "@/lib/infra/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = LIGHT_MODEL;

const LANG: Record<string, string> = {
  es: "español",
  fa: "persa (فارسی) — NO árabe; usa vocabulario y gramática persas",
  en: "English",
};

// POST { word, gematria, locale } → { connections }
// Encuentra palabras y conceptos hebreos con el mismo valor numérico,
// revelando las conexiones kabbalisticas ocultas (método de Rav Ginsburgh).
export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`gematria:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { word?: string; gematria?: number; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const word = (body.word ?? "").trim();
  const gematria = body.gematria ?? 0;
  const locale = ["es","fa","en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  const lang = LANG[locale] ?? LANG.es;

  if (!word || gematria < 1) {
    return NextResponse.json({ error: "missing_params" }, { status: 400 });
  }

  const prompt = `Eres un maestro de guematría kabbalística en la tradición de Rav Itzjak Ginsburgh.
La palabra hebrea es: ${word} (גִּימַטְרִיָּה = ${gematria})

Tu tarea: descubrir las conexiones numéricas ocultas de esta palabra.

Encuentra 5-7 palabras, nombres, frases o conceptos hebreos con el mismo valor numérico absoluto ${gematria}. Para cada uno:
1. Da la palabra en hebreo
2. Su significado
3. Explica por qué esta equivalencia numérica es espiritualmente significativa — qué unidad oculta revela

Busca especialmente:
- Conexiones PARADÓJICAS o SORPRENDENTES (como Mashíaj=358=Najash) que revelan rectificación
- Conexiones con los 4 miluim del Nombre YHVH (72, 63, 45, 52) si aplica
- Conexiones con nombres de Dios, sefirot o partzufim
- Palabras relacionadas a través del valor colel (גִּימַטְרִיָּה ± 1) si el hallazgo es significativo
- Frases bíblicas cuya guematría sea ${gematria}

Además, si es relevante, menciona:
- El valor AT-BASH de ${word} y qué revela
- El valor ordinal total de ${word} y si se conecta con algo significativo

Responde en ${lang}. Para cada conexión, usa este formato exacto:
**[palabra en hebreo]** (gematría: ${gematria}) — [significado] → [por qué es revelador]

Al final, añade una síntesis de 2-3 líneas sobre el patrón numérico que une todos estos conceptos.

Sé preciso. Solo incluye equivalencias que realmente tengan ese valor. No inventes.`;

  try {
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 900,
      messages: [{ role: "user", content: prompt }],
    });

    const connections = msg.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

    return NextResponse.json({ connections, gematria, word });
  } catch (err) {
    console.error("gematria-connections error", err);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
