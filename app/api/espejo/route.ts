import { anthropic, buildEspejoPrompt, STUDY_MODEL } from "@/lib/engine/anthropic";
import { checkRateLimit, clientIp } from "@/lib/infra/rateLimit";
import { rasgoById, ESPEJO_BACHYA, type RasgoTema } from "@/lib/content/autoconocimiento";

export const runtime = "nodejs";
export const maxDuration = 300;

interface EspejoRequest {
  locale?: string;
  /** id del rasgo dominante calculado en el cliente (de los datos verificados) */
  dominanteId?: RasgoTema["id"];
  /** id del rasgo secundario (opcional) */
  secundarioId?: RasgoTema["id"] | null;
}

const VALID_IDS = ["R1", "R2", "R3", "R4", "R5", "R6", "R7", "R8"];

function originAllowed(req: Request): boolean {
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) return true;
  const origin = req.headers.get("origin");
  if (!origin) return true;
  return allowed.includes(origin);
}

// Bloque del corpus VERIFICADO para un rasgo: la IA SOLO puede citar esto.
function rasgoBlock(r: RasgoTema): string {
  return `  • ${r.titulo}
    Fuente real: ${r.fuente} (Sefaria: ${r.fuenteRef})
    Cita aramea verbatim: «${r.citaHe}»
    Midá de trabajo: ${r.mida}
    Pregunta-espejo: ${r.espejo}
    Opuesto-luminoso (la meta): ${r.opuesto}`;
}

function buildUserPrompt(dom: RasgoTema, sec: RasgoTema | null): string {
  const secBlock = sec
    ? `\n\nRASGO SECUNDARIO (de los datos):\n${rasgoBlock(sec)}`
    : "\n\n(No hay rasgo secundario claro.)";
  return `La persona respondió un cuestionario de autorreflexión sobre sí misma (conducta y rasgos físicos auto-descritos, SIN foto). El cálculo de Jashmal arrojó este rasgo dominante y secundario. Estos son los ÚNICOS rasgos y las ÚNICAS fuentes que puedes citar — son el corpus verificado por el Sofer; no inventes ni añadas otras citas, folios ni gematrías.

RASGO DOMINANTE (de los datos):
${rasgoBlock(dom)}${secBlock}

Cierre obligatorio (Rabbeinu Bachya, verbatim, ${ESPEJO_BACHYA.fuente}):
«${ESPEJO_BACHYA.citaHe}» — ${ESPEJO_BACHYA.es}

Compón la "lectura del alma": una lectura APROXIMADA y personalizada, en segunda persona, siguiendo EXACTAMENTE la estructura y todas las reglas de tu marco. Es un espejo, no un veredicto.`;
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return new Response(JSON.stringify({ error: "origin_not_allowed" }), { status: 403 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: "missing_api_key" }), { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return new Response(JSON.stringify({ error: "rate_limited" }), { status: 429 });
  }

  let body: EspejoRequest;
  try {
    body = (await req.json()) as EspejoRequest;
  } catch {
    return new Response(JSON.stringify({ error: "invalid_body" }), { status: 400 });
  }

  const locale = ["es", "fa", "en"].includes(body.locale ?? "")
    ? (body.locale as string)
    : "es";

  if (!body.dominanteId || !VALID_IDS.includes(body.dominanteId)) {
    return new Response(JSON.stringify({ error: "no_dominante" }), { status: 400 });
  }
  const dom = rasgoById(body.dominanteId);
  const sec =
    body.secundarioId && VALID_IDS.includes(body.secundarioId) && body.secundarioId !== body.dominanteId
      ? rasgoById(body.secundarioId)
      : null;

  const systemPrompt = buildEspejoPrompt(locale);
  const userPrompt = buildUserPrompt(dom, sec);

  // STREAMING: la lectura puede ser larga (sobre todo en farsi). Igual patrón
  // que /api/study para evitar timeouts en la función serverless.
  try {
    const stream = anthropic.messages.stream({
      model: STUDY_MODEL,
      max_tokens: 4000,
      system: [
        {
          type: "text",
          text: systemPrompt,
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: userPrompt }],
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
        } catch (err) {
          console.error("espejo stream error", err);
          controller.enqueue(encoder.encode("\x01error"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    console.error("espejo setup error", err);
    return new Response(JSON.stringify({ error: "espejo_failed" }), { status: 502 });
  }
}
