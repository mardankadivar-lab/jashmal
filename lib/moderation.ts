import { anthropic } from "./anthropic";

// Moderación de reflexiones del Beit Midrash. Dos capas:
//   1. Pre-filtro determinista (rápido, no depende de la IA): spam evidente.
//   2. Juicio de Claude (Haiku), estricto y FAIL-CLOSED: ante duda o error,
//      se rechaza para revisión, nunca se aprueba por defecto.

const MOD_MODEL = "claude-haiku-4-5-20251001";

export interface ModerationResult {
  ok: boolean;
  reason?: string;
}

// --- Capa 1: pre-filtro determinista ---

// URLs / enlaces (spam): el Beit Midrash no necesita enlaces externos.
const URL_RE = /(https?:\/\/|www\.|\b[a-z0-9-]+\.(com|net|org|ru|xyz|info|biz|shop)\b)/i;

// Palabras de spam comercial frecuentes.
const SPAM_RE = /\b(viagra|cialis|casino|crypto|bitcoin|forex|porn|xxx|sexo|loan|prestamo|seo|followers|seguidores)\b/i;

// Groserías/insultos evidentes (ES + EN). Lista mínima; Claude cubre el resto.
const PROFANITY_RE =
  /\b(mierda|puta|puto|pendejo|cabron|cabrón|idiota|imbecil|imbécil|estupido|estúpido|maric|joder|co[ñn]o|gilipollas|fuck|shit|bitch|asshole|cunt|bastard|retard)\b/i;

function deterministicReject(text: string): string | null {
  if (URL_RE.test(text)) return "links_not_allowed";
  if (SPAM_RE.test(text)) return "spam";
  if (PROFANITY_RE.test(text)) return "profanity";
  return null;
}

// --- Capa 2: juicio de Claude ---

const SYSTEM = `Eres el moderador del Beit Midrash de Jashmal, un espacio de
estudio de Torá y Cabalá. Decides si una reflexión de un estudiante es apropiada
para publicarse.

APRUEBA: reflexiones sinceras, preguntas, dudas, desacuerdos respetuosos,
interpretaciones personales, citas de fuentes (aunque el texto sagrado mencione
temas fuertes), expresiones de fe o de lucha espiritual.

RECHAZA: insultos o groserías, odio hacia personas o grupos, obscenidad,
spam o publicidad, enlaces, ataques personales, contenido sexual explícito,
o texto sin relación alguna con el estudio (trolling, texto sin sentido).

Responde ÚNICAMENTE con un JSON en una línea, sin texto adicional, sin markdown:
{"ok": true} si es apropiado, o {"ok": false, "reason": "<motivo breve>"} si no.
El campo "ok" debe ser un booleano JSON real (true/false), nunca una cadena.`;

function parseVerdict(raw: string): ModerationResult | null {
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end <= start) return null;
  try {
    const parsed = JSON.parse(raw.slice(start, end + 1));
    // Aprobar SOLO si ok es exactamente el booleano true (evita el caso
    // Boolean("false") === true cuando el modelo devuelve un string).
    const approved = parsed.ok === true;
    return { ok: approved, reason: typeof parsed.reason === "string" ? parsed.reason : undefined };
  } catch {
    return null;
  }
}

export async function moderate(text: string): Promise<ModerationResult> {
  // Capa 1: bloqueo determinista de spam/groserías evidentes.
  const hard = deterministicReject(text);
  if (hard) return { ok: false, reason: hard };

  // Sin clave no podemos juzgar el resto → fail-closed.
  if (!process.env.ANTHROPIC_API_KEY) {
    return { ok: false, reason: "moderation_unavailable" };
  }

  // Capa 2: juicio de Claude.
  try {
    const msg = await anthropic.messages.create({
      model: MOD_MODEL,
      max_tokens: 80,
      system: SYSTEM,
      messages: [{ role: "user", content: text }],
    });
    const raw = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();
    const verdict = parseVerdict(raw);
    // Si no pudimos interpretar la respuesta, rechazamos (fail-closed).
    if (!verdict) return { ok: false, reason: "unparseable_verdict" };
    return verdict;
  } catch {
    // Error de la API → rechazamos para revisión manual, nunca aprobamos.
    return { ok: false, reason: "moderation_error" };
  }
}
