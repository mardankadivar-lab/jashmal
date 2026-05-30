import { NextResponse } from "next/server";
import { anthropic, buildSystemPrompt, STUDY_MODEL, type StudyMode } from "@/lib/anthropic";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

interface StudyRequest {
  mode: StudyMode;
  locale: string;
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

function buildUserPrompt(body: StudyRequest): string {
  if (body.mode === "letter") {
    return `Estudia la letra hebrea: ${body.letter ?? body.term ?? ""}.`;
  }
  if (body.mode === "concept") {
    return `Estudia en profundidad el concepto: ${body.term ?? ""}.`;
  }
  return `Referencia: ${body.ref ?? "(sin referencia)"}

Texto fuente (hebreo):
${body.hebrewText ?? ""}

Analiza este pasaje según la estructura indicada.`;
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
  const locale = body.locale === "fa" ? "fa" : "es";

  try {
    const message = await anthropic.messages.create({
      model: STUDY_MODEL,
      max_tokens: 4000,
      system: [
        {
          type: "text",
          text: buildSystemPrompt(mode, locale),
          // El system prompt es estable → prompt caching ahorra tokens y latencia.
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: buildUserPrompt(body) }],
    });

    const study = message.content
      .map((block) => (block.type === "text" ? block.text : ""))
      .join("\n")
      .trim();

    return NextResponse.json({ study });
  } catch (err) {
    console.error("study error", err);
    return NextResponse.json({ error: "study_failed" }, { status: 502 });
  }
}
