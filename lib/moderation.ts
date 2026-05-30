import { anthropic } from "./anthropic";

// Moderación de reflexiones con Claude (modelo rápido y económico).
// Jashmal es un espacio de estudio respetuoso: filtramos odio, obscenidad,
// spam, ataques personales y contenido fuera de lugar — pero SIN censurar el
// estudio legítimo (una cita del Talmud o un tema teológico fuerte es válido).

const MOD_MODEL = "claude-haiku-4-5-20251001";

export interface ModerationResult {
  ok: boolean;
  reason?: string;
}

const SYSTEM = `Eres el moderador del Beit Midrash de Jashmal, un espacio de
estudio de Torá y Cabalá. Evalúas reflexiones de estudiantes antes de publicarlas.

APRUEBA: reflexiones sinceras, preguntas, dudas, desacuerdos respetuosos,
interpretaciones personales, citas de fuentes (aunque mencionen temas fuertes
propios del texto sagrado), expresiones de fe o de lucha espiritual.

RECHAZA solo: odio o insultos hacia personas o grupos, obscenidad gratuita,
spam o publicidad, enlaces sospechosos, ataques personales, contenido sexual
explícito, o texto sin ninguna relación con el estudio (trolling).

Ante la duda, APRUEBA: este es un espacio de búsqueda honesta, no de censura.

Responde SOLO con JSON válido: {"ok": true} si es apropiado, o
{"ok": false, "reason": "<motivo breve>"} si debe rechazarse.`;

export async function moderate(text: string): Promise<ModerationResult> {
  // Sin API key configurada, no bloqueamos (pero la API route exige la key igual).
  if (!process.env.ANTHROPIC_API_KEY) return { ok: true };

  try {
    const msg = await anthropic.messages.create({
      model: MOD_MODEL,
      max_tokens: 100,
      system: SYSTEM,
      messages: [{ role: "user", content: text }],
    });
    const raw = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    const json = raw.slice(raw.indexOf("{"), raw.lastIndexOf("}") + 1);
    const parsed = JSON.parse(json) as ModerationResult;
    return { ok: Boolean(parsed.ok), reason: parsed.reason };
  } catch {
    // Si la moderación falla, pecamos de cautos y rechazamos para revisión manual.
    return { ok: false, reason: "moderation_error" };
  }
}
