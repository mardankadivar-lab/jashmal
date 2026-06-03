import { NextResponse } from "next/server";
import { anthropic, buildSystemPrompt, buildKabbalahStudyPrompt, STUDY_MODEL, type StudyMode } from "@/lib/anthropic";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";
import { gatherSources, formatSourcesForPrompt } from "@/lib/related";

export const runtime = "nodejs";
// 300s (máximo de Vercel Pro): un estudio profundo con 8000 tokens puede tardar
// más de 120s en Opus; si la función muere antes, el estudio se corta a la mitad.
export const maxDuration = 300;

type StudyDepth = "quick" | "deep";

interface StudyRequest {
  mode: StudyMode;
  locale: string;
  depth?: StudyDepth;
  ref?: string;
  hebrewText?: string;
  term?: string;
  letter?: string;
  context?: string;   // "kabbalah" = modo cabalístico desde el Árbol de la Vida
  sefiraId?: string;  // id de la sefirá que originó el estudio
}

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

function buildUserPrompt(body: StudyRequest, sourcesBlock: string): string {
  if (body.mode === "letter") {
    return `Estudia la letra hebrea: ${body.letter ?? body.term ?? ""}.`;
  }
  if (body.mode === "concept") {
    return `Estudia en profundidad el concepto: ${body.term ?? ""}.`;
  }
  const sources = sourcesBlock ? `\n\n<fuentes>${sourcesBlock}\n</fuentes>` : "";
  return `Referencia: ${body.ref ?? "(sin referencia)"}

Texto fuente (hebreo):
${body.hebrewText ?? ""}

Analiza este pasaje según la estructura indicada.${sources}`;
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: "origin_not_allowed" }, { status: 403 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: StudyRequest;
  try {
    body = (await req.json()) as StudyRequest;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const mode: StudyMode = body.mode ?? "text";
  const locale = ["es", "fa", "en"].includes(body.locale ?? "")
    ? (body.locale as string)
    : "es";
  const depth: StudyDepth = body.depth === "deep" ? "deep" : "quick";

  // Modo profundo: recolectar fuentes reales de Sefaria.
  let sourcesBlock = "";
  let sourcesUsed = 0;
  if (depth === "deep" && mode === "text" && body.ref) {
    try {
      const sources = await gatherSources(body.ref);
      sourcesUsed = sources.length;
      sourcesBlock = formatSourcesForPrompt(sources);
    } catch (err) {
      console.error("gatherSources error", err);
    }
  }

  const withSources = sourcesBlock.length > 0;
  // Margen amplio para que la sección final "Sigue el hilo" no se trunque.
  const maxTokens = withSources ? 8000 : 7500;

  // Modo cabalístico (viene del Árbol de la Vida) o modo estándar PaRDeS
  const isKabbalah = body.context === "kabbalah" && !!body.sefiraId && mode === "text";
  const { SEFIROT } = await import("@/lib/sefirot");
  const sefira = isKabbalah ? SEFIROT.find((s) => s.id === body.sefiraId) : null;

  const systemPrompt = isKabbalah && sefira
    ? buildKabbalahStudyPrompt(locale, sefira.he, sefira.es)
    : buildSystemPrompt(mode, locale, withSources);
  const userPrompt = buildUserPrompt(body, sourcesBlock);

  // --- STREAMING: el texto aparece progresivamente mientras Claude genera. ---
  // Esto evita el timeout en Farsi/textos largos (el modelo puede tardar 90-120s).
  try {
    const stream = anthropic.messages.stream({
      model: STUDY_MODEL,
      max_tokens: maxTokens,
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
    // El primer chunk lleva metadatos (depth, sourcesUsed) codificados en JSON
    // separado del texto con el separador \x00 (null byte).
    const meta = JSON.stringify({ depth, sourcesUsed });

    const readable = new ReadableStream({
      async start(controller) {
        // Primer chunk: metadatos
        controller.enqueue(encoder.encode(meta + "\x00"));
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
          console.error("study stream error", err);
          // Enviar error al cliente
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
        "X-Accel-Buffering": "no", // desactiva buffering en nginx/Vercel
      },
    });
  } catch (err) {
    console.error("study setup error", err);
    return NextResponse.json({ error: "study_failed" }, { status: 502 });
  }
}
