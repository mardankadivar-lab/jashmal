import { NextResponse } from "next/server";
import { anthropic } from "@/lib/anthropic";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = "claude-haiku-4-5-20251001";

const LANG: Record<string, string> = {
  es: "español",
  fa: "persa (فارسی) — NO árabe; usa vocabulario y gramática persas",
  en: "English",
};

// POST { word, locale } → { analysis }
// Aplica los métodos hermenéuticos del Zohar: Notarikon, Tzeruf, lectura alternativa,
// palabras ocultas, combinación primera+última letra.
export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`zohar:${ip}`);
  if (!allowed) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  let body: { word?: string; locale?: string };
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const word = (body.word ?? "").trim();
  const locale = ["es","fa","en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  const lang = LANG[locale] ?? LANG.es;

  if (!word) return NextResponse.json({ error: "missing_word" }, { status: 400 });

  const prompt = `Eres un maestro de Cabalá y hermenéutica zohárica. La palabra hebrea a analizar es: ${word}

Aplica los métodos clásicos que el Zóhar usa para desvelar capas ocultas de significado. Para cada método, solo incluye hallazgos que sean REALMENTE significativos y arraigados en la tradición. Si un método no arroja nada relevante para esta palabra específica, omítelo completamente.

**Métodos a aplicar:**

1. **צֵרוּף — Anagrama**
   Reorganiza las letras de ${word} para encontrar otra palabra hebrea con significado profundo.
   Ejemplo: בְּהִבָּרְאָם (Behibaram, Génesis 2:4) → אַבְרָהָם (Abraham) — el universo fue creado por mérito de Abraham.
   Solo incluye si encuentras un anagrama real y significativo.

2. **קְרִיאָה מְחֻלֶּקֶת — División de la palabra**
   Divide ${word} en dos o más sub-palabras que revelen un mensaje.
   Ejemplo: בְּרֵאשִׁית → בָּרָא שִׁית (creó seis [sefirot]) / בְּ-רֵאשִׁית (a través de la sabiduría) / בֵּית רֹאשׁ (la casa es cabeza).
   Muestra 2-4 divisiones significativas si las hay.

3. **מִלִּים נִסְתָּרוֹת — Palabras ocultas**
   ¿Qué palabras importantes están escondidas DENTRO de ${word}?
   Ejemplo: בְּרֵאשִׁית contiene בְּרִית (Brit, alianza) y also the letters ב+ת = בַּת (Bat, hija).
   Lista las palabras ocultas con su significado espiritual.

4. **נוֹטָרִיקוֹן — Acrónimo**
   Dos variantes:
   a) Las letras de ${word} son las iniciales de una frase famosa (de la Biblia, el Talmud o el Zóhar).
   b) La palabra es la inicial/final de cada palabra en una frase bíblica conocida.
   Ejemplo: יהוה es acrónimo de הָיָה-הֹוֶה-וְיִהְיֶה (era, es y será).
   Solo incluye si hay un Notarikon real y conocido en la tradición.

5. **אַתְבַּ״שׁ / צֵרוּף אוֹתִיּוֹת — Primera y última letra**
   Combina la primera y última letra de ${word}. ¿Forman una palabra o símbolo con significado?
   Ejemplo: בְּרֵאשִׁית → ב + ת = בַּת (hija, la Shejiná, la última Hei del Nombre).

Responde en ${lang}. Usa este formato para cada método que tenga hallazgos reales:

## [nombre del método en hebreo] — [nombre en ${lang}]
[explicación del hallazgo con su significado espiritual y fuente si la hay]

Al inicio, pon una línea introductoria breve que contextualice el análisis de ${word}.
Sé preciso, profundo y fiel a las fuentes. No inventes conexiones que no estén en la tradición.`;

  try {
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const analysis = msg.content
      .filter((b) => b.type === "text")
      .map((b) => (b as { text: string }).text)
      .join("\n")
      .trim();

    return NextResponse.json({ analysis, word });
  } catch (err) {
    console.error("zohar-methods error", err);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
