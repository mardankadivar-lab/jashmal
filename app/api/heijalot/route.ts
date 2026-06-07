import { NextResponse } from "next/server";
import { anthropic, LIGHT_MODEL } from "@/lib/anthropic";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";
import { SEFIROT } from "@/lib/sefirot";

export const runtime = "nodejs";
export const maxDuration = 30;

// Sonnet: contenido cabalístico luriánico con citas exactas (Zóhar/Etz Jaim).
// Salida corta; Sonnet da mejor rigor que Haiku sin el costo de Opus.
const HAIKU = LIGHT_MODEL;

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

  // Extraer nombres sin paréntesis para el prompt
  const innerShort = innerName.split(" (")[0];
  const outerShort = outerName.split(" (")[0];

  const prompt = `Eres un maestro de Cabalá luriánica. El estudiante ha penetrado al nivel ${depth} del Árbol de la Vida.

Camino completo: ${fullPath}
Cámara actual: ${innerShort} DENTRO DE ${outerShort} — Héijal nivel ${depth}.

PRINCIPIO FUNDAMENTAL: No preguntes "¿qué ES ${innerShort}?" — pregunta "¿cómo se MANIFIESTA ${innerShort} dentro de ${outerShort}?"
Porque la esencia de las sefirot superiores es incognoscible. Solo podemos estudiar su función, sus emanaciones, sus vestiduras y sus subdivisiones.

Responde en ${lang} con estos apartados (títulos en hebreo):

**הִתְגַּלּוּת — La Manifestación**
¿Cómo se manifiesta ${innerShort} dentro de ${outerShort}?
¿Cuál es su FUNCIÓN específica en esta cámara? ¿Qué emana desde aquí?
(Evita decir "es" — di "aquí ${innerShort} actúa como...", "desde esta cámara fluye...")

**הַשְׁתַּלְשְׁלוּת — La Concatenación**
¿Cómo desciende la luz de ${outerShort} y se refina en ${innerShort}?
¿Qué proceso de Tzimtzum, Kav o Shevirat ha-Kelim ocurre en este nivel específico?
(Basa en Etz Jaim: Shaar ${depth >= 3 ? "ha-Partzufim" : depth >= 2 ? "ha-Nekudim" : "ha-Akudim"})

**הַכְּלִי וְהָאוֹר — El Vaso y la Luz**
¿Qué cualidad de ${innerShort} actúa como vaso para la luz de ${outerShort}?
¿Qué pregunta contemplativa nos abre esta combinación?
Usa la tabla del método práctico: si ${outerShort} es voluntad/estructura/amor, ¿qué ocurre cuando ${innerShort} la recibe?

**הַמַּלְכוּת — La Transición**
Si seguimos descendiendo: ¿en qué se convierte la Maljut de ${innerShort} dentro de ${outerShort}?
¿Hacia dónde fluye la emanación siguiente?
(Recuerda el principio: Maljut del superior = Kéter del inferior)

**מְקוֹרוֹת — Fuentes**
1 cita exacta del Zohar (volumen/parashá/folio) y 1 del Etz Jaim (Shaar y capítulo) que iluminen ESTA combinación específica.

Sé específico a esta cámara — no genérico. Evita definiciones; muestra procesos vivos.`;

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
