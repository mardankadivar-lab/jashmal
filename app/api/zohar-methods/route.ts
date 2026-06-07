import { NextResponse } from "next/server";
import { anthropic, LIGHT_MODEL } from "@/lib/anthropic";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 30;

// Sonnet: métodos del Zóhar + gematría con fuentes exactas. Mejor rigor que
// Haiku para no fabricar folios/cálculos, sin el costo de Opus.
const MODEL = LIGHT_MODEL;

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
   Si ${word} es un nombre bíblico que recibió una transformación divina (o está vinculado a una),
   analiza las letras añadidas/quitadas y su significado cabalístico.

   Casos documentados en el Zóhar y la tradición — aplica el que corresponda a ${word}:

   • אַבְרָם → אַבְרָהָם: Dios añade ה (Hei=5) del Nombre. Zohar Lej Lejá.
   • שָׂרַי → שָׂרָה: La יוד (=10) de Sarai se "divide" en dos הֵא (5+5). Una va a Avram,
     la otra reemplaza la Yud. La Yud sube al Trono y espera hasta nacer en יִצְחָק
     como sello de la Brit Milá. Zohar Lej Lejá.
   • יִצְחָק: lleva la Yud de Sarai incrustada — es el alma del pacto. Zohar Vayera.
   • יַעֲקֹב → יִשְׂרָאֵל: añade א-ל, reorganiza. Zohar Vayishlaj 170a.
   • הוֹשֵׁעַ → יְהוֹשֻׁעַ: Moshé añade י (Yud) del Nombre para protegerle de los espías.
     Talmud Sotá 34b; Zohar Shelaj.
   • אֵלִיָּהוּ / אֵלִיָּה: La ו (Vav) le fue retirada como depósito por acusar a Israel
     ("abandonaron Tu alianza" — Reyes I 19:14); le fue restituida en Pinjás.
     Zohar Pinjás 226b. Enseña que acusar al pueblo tiene consecuencias en el nombre.
   • בֶּן אוֹנִי → בִּנְיָמִין: Rachel nombra desde el dolor; Yaakov eleva a gloria.
     Zohar Vayishlaj.
   • צָפְנַת פַּעְנֵחַ: nombre egipcio de Yosef — el Zohar lo descifra letra por letra.
     Zohar Miketz.

   Para ${word}: identifica cuál de estos casos aplica (o si hay otro caso relevante),
   explica la mecánica exacta de las letras y lo que revela sobre el alma de ese personaje.
   Cita las fuentes exactas (Zóhar parashá/folio, Midrash, Talmud o Etz Jaim).
   Solo incluye este apartado si ${word} tiene efectivamente una transformación documentada.

8. **שְׁאֵלָה וּתְשׁוּבָה — Pregunta y Respuesta oculta dentro del Nombre**
   El Zóhar tiene un método especial para los nombres divinos y palabras clave:
   encuentra dentro de ellas una PREGUNTA y su RESPUESTA fusionadas.

   Caso paradigmático (Zóhar Bereishit 1b, Parashat Bereishit):
   El versículo de Isaías 40:26 pregunta: "מִי בָרָא אֵלֶּה" — ¿Quién (מִי) creó estos (אֵלֶּה)?
   El Zóhar revela que esa pregunta y su respuesta están fundidas en el nombre אֱלֹהִים:
   — מִי (Quién = 50) = Biná, el mundo oculto, las 50 puertas de la comprensión, lo incognoscible
   — אֵלֶּה (Estos = 36) = el mundo revelado, las sefirot manifiestas, la creación
   — מִי (50) + אֵלֶּה (36) = 86 = אֱלֹהִים ✓ (la guematría confirma la unión)
   El nombre divino ES la pregunta abrazada por la respuesta: lo oculto (מִי) se une a lo revelado (אֵלֶּה).
   Cuando Biná "descendió" a unirse con el mundo de abajo, su nombre se hizo אֱלֹהִים.

   Aplica este método a ${word}:
   — ¿Contiene ${word} una pregunta y respuesta teológica oculta?
   — ¿Puede dividirse en dos conceptos opuestos/complementarios cuya unión revele un misterio?
   — ¿La guematría de las partes confirma la división (como מִי+אֵלֶּה=אֱלֹהִים)?
   — ¿Hay algún versículo bíblico donde este nombre aparezca en un contexto que ilumine esa tensión?
   Solo incluye si encuentras una dialéctica real documentada en el Zóhar o la tradición cabalística.

Responde en ${lang}. Usa este formato para cada método que tenga hallazgos reales:

## [nombre del método en hebreo] — [nombre en ${lang}]
[explicación del hallazgo con su significado espiritual y fuente exacta si la hay]

Al inicio, una línea introductoria que contextualice el análisis de ${word}.
Sé preciso, profundo y fiel a las fuentes. No inventes conexiones que no estén en la tradición.`;

  try {
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 1400,
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
