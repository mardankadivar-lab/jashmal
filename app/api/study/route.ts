import { NextResponse } from "next/server";
import type Anthropic from "@anthropic-ai/sdk";
import { anthropic, buildSystemPrompt, STUDY_MODEL, type StudyMode } from "@/lib/anthropic";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";
import { gatherSources, formatSourcesForPrompt } from "@/lib/related";

export const runtime = "nodejs";
// El modo profundo (RAG) descarga muchas fuentes y puede tardar 1-2 min.
export const maxDuration = 120;

type StudyDepth = "quick" | "deep";

interface StudyRequest {
  mode: StudyMode;
  locale: string;
  depth?: StudyDepth; // "quick" (memoria) o "deep" (RAG con fuentes reales)
  ref?: string; // referencia citable (ej. "Genesis 1:1")
  hebrewText?: string; // texto fuente en hebreo
  term?: string; // concepto (mode "concept")
  letter?: string; // letra (mode "letter")
}

function originAllowed(req: Request): boolean {
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  // En desarrollo, sin lista configurada, permitimos.
  if (allowed.length === 0) return true;

  const origin = req.headers.get("origin");
  if (!origin) return true; // peticiones same-origin del propio Next no siempre traen Origin
  return allowed.includes(origin);
}

function buildUserPrompt(body: StudyRequest, sourcesBlock: string): string {
  if (body.mode === "letter") {
    return `Estudia la letra hebrea: ${body.letter ?? body.term ?? ""}.`;
  }
  if (body.mode === "concept") {
    return `Estudia en profundidad el concepto: ${body.term ?? ""}.`;
  }

  const sources = sourcesBlock
    ? `\n\n<fuentes>${sourcesBlock}\n</fuentes>`
    : "";

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
  const locale = ["es","fa","en"].includes(body.locale ?? "") ? (body.locale as string) : "es";
  const depth: StudyDepth = body.depth === "deep" ? "deep" : "quick";

  // Modo profundo: recolectar fuentes reales de Sefaria (solo para estudio de texto).
  let sourcesBlock = "";
  let sourcesUsed = 0;
  if (depth === "deep" && mode === "text" && body.ref) {
    try {
      const sources = await gatherSources(body.ref);
      sourcesUsed = sources.length;
      sourcesBlock = formatSourcesForPrompt(sources);
    } catch (err) {
      console.error("gatherSources error", err);
      // Si falla la recolección, seguimos en modo memoria (no rompemos el estudio).
    }
  }

  const withSources = sourcesBlock.length > 0;
  // En modo profundo damos más espacio a la respuesta.
  const maxTokens = withSources ? 6000 : 4000;

  try {
    const message = await anthropic.messages.create({
      model: STUDY_MODEL,
      max_tokens: maxTokens,
      system: [
        {
          type: "text",
          text: buildSystemPrompt(mode, locale, withSources),
          // El system prompt es estable → prompt caching ahorra tokens y latencia.
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: buildUserPrompt(body, sourcesBlock) }],
    });

    const study = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n");

    return NextResponse.json({ study, depth, sourcesUsed });
  } catch (err) {
    console.error("study error", err);
    return NextResponse.json({ error: "study_failed" }, { status: 502 });
  }
}
