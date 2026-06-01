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

  const prompt = `Eres un maestro de Cabalá y hermenéutica zohárica. La palabra o nombre hebreo a analizar es: ${word}

Aplica los métodos clásicos que el Zóhar usa para desvelar capas ocultas de significado. Para cada método, solo incluye hallazgos que sean REALMENTE significativos y arraigados en la tradición. Si un método no arroja nada relevante para esta palabra específica, omítelo completamente.

**Métodos a aplicar:**

1. **צֵרוּף — Anagrama**
   Reorganiza las letras de ${word} para encontrar otra palabra hebrea con significado profundo.
   Ejemplo clásico: בְּהִבָּרְאָם (Behibaram, Génesis 2:4) → אַבְרָהָם (Abraham).
   Solo incluye si encuentras un anagrama real y significativo en la tradición.

2. **קְרִיאָה מְחֻלֶּקֶת — División de la palabra**
   Divide ${word} en dos o más sub-palabras que revelen un mensaje.
   Ejemplo: בְּרֵאשִׁית → בָּרָא שִׁית (creó seis sefirot) / בְּ-רֵאשִׁית (a través de la sabiduría) / בֵּית רֹאשׁ (la casa es cabeza).
   Muestra 2-4 divisiones significativas si las hay.

3. **מִלִּים נִסְתָּרוֹת — Palabras ocultas**
   ¿Qué palabras importantes están escondidas dentro de ${word}?
   Ejemplo: בְּרֵאשִׁית contiene בְּרִית (alianza); ב+ת = בַּת (hija, la Shejiná).

4. **נוֹטָרִיקוֹן — Acrónimo**
   Las letras de ${word} como iniciales de una frase bíblica/talmúdica/zohárica famosa, o viceversa.
   Ejemplo: יהוה = הָיָה הֹוֶה וְיִהְיֶה (era, es y será).
   Solo incluye si hay un Notarikon real conocido en la tradición.

5. **אוֹתִיּוֹת רִאשׁוֹנָה וְאַחֲרוֹנָה — Primera y última letra**
   Combina la primera y última letra de ${word}. ¿Forman una palabra con significado espiritual?
   Ejemplo: בְּרֵאשִׁית → ב + ת = בַּת (hija, la última Hei del Nombre).

6. **שֵׁם הַוָיָ'ה נִסְתָּר — El Nombre YHVH oculto**
   Examina si las letras יהוה aparecen dentro de ${word} en orden (aunque no sean consecutivas).
   También: ¿hay alguna relación entre ${word} y alguno de los cuatro miluim del Nombre
   (Av=72, Sag=63, Mah=45, Ban=52)? ¿O alguna letra del Nombre está "grabada" en la estructura
   de la palabra de forma que los cabalistas hayan señalado?
   Ejemplo: en אַבְרָהָם la הֵא es la 5ª letra del Nombre que Dios añadió a Avram.
   Solo incluye si hay una conexión real documentada en la tradición zohárica o luriánica.

7. **שִׁינּוּי הַשֵּׁם — Transformación del nombre**
   Si ${word} es un nombre bíblico que Dios cambió (o que está relacionado con un cambio de nombre),
   analiza la transformación de letras y su significado cabalístico profundo.

   Modelo de análisis (aplícalo si es relevante para ${word}):
   — ¿Qué letra(s) se añadieron o quitaron, y cuál es su valor numérico?
   — ¿Qué revela ese cambio sobre la elevación espiritual del alma?
   — Caso paradigmático del Zóhar (Lej Lejá):
     שָׂרַי perdió su יוד (=10). Esa Yud "se dividió" en dos הֵא (5+5=10).
     Una הֵא fue al nombre אַבְרָם → אַבְרָהָם (elevación al mundo de Atzilut).
     La otra הֵא reemplazó la יוד final de שָׂרַי → שָׂרָה.
     La יוד que salió de שָׂרַי subió ante el Trono y esperó hasta nacer en יִצְחָק,
     quien lleva la יוד del pacto de la circuncisión incrustada en su nombre.
   — Si ${word} es יִצְחָק: explica cómo la Yud de Sarai vive en él y su conexión con la Brit Milá.
   — Cita las fuentes exactas del Zóhar, Midrash o Etz Jaim donde esto se explica.
   Solo incluye este apartado si ${word} es efectivamente un nombre con transformación documentada.

Responde en ${lang}. Usa este formato para cada método que tenga hallazgos reales:

## [nombre del método en hebreo] — [nombre en ${lang}]
[explicación del hallazgo con su significado espiritual y fuente exacta si la hay]

Al inicio, una línea introductoria que contextualice el análisis de ${word}.
Sé preciso, profundo y fiel a las fuentes. No inventes conexiones que no estén en la tradición.`;

  try {
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1200,
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
