import { NextResponse } from "next/server";
import {
  anthropic,
  buildSystemPrompt,
  buildKabbalahStudyPrompt,
  buildConnectionStudyPrompt,
  STUDY_MODEL,
  type StudyMode,
  type ConnectionInfo,
} from "@/lib/engine/anthropic";
import { getEdgeData } from "@/lib/relations/edgeData";
import { checkCitations } from "@/lib/sources/citationCheck";
import type { Mark } from "@/lib/sources/proseMarks";
import { checkRateLimit, clientIp } from "@/lib/infra/rateLimit";
import { gatherSources, formatSourcesForPrompt } from "@/lib/relations/related";

export const runtime = "nodejs";
// 300s (máximo de Vercel Pro): un estudio profundo con 8000 tokens puede tardar
// más de 120s en Opus; si la función muere antes, el estudio se corta a la mitad.
export const maxDuration = 300;

type StudyDepth = "quick" | "deep";

// Texto de la marca que se inserta en la prosa cuando una cita NO pasa la
// verificación. El detalle concreto ("Bereshit Rabbah tiene 100 capítulos") se
// escribe en español; en fa/en se deja la etiqueta sola para no mezclar idiomas.
const REF_MARK: Record<string, string> = {
  es: "referencia sin confirmar",
  fa: "ارجاع تأییدنشده",
  en: "unconfirmed reference",
};

interface StudyRequest {
  mode: StudyMode;
  locale: string;
  depth?: StudyDepth;
  ref?: string;
  hebrewText?: string;
  term?: string;
  letter?: string;
  context?: string;   // "kabbalah" = Árbol de la Vida · "connection" = relación de la Mente Cósmica
  sefiraId?: string;  // id de la sefirá que originó el estudio
  // Estudio contextual de una CONEXIÓN (Mente Cósmica relacional V3):
  // ids de los nodos (para buscar la curaduría del edge en el servidor) +
  // labels localizados (para el prompt) + camino recorrido.
  connection?: {
    fromId: string;
    toId: string;
    fromLabel: string;
    toLabel: string;
    pathLabels?: string[];
  };
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
  // Estudio contextual de una conexión: la relación manda, no el nodo suelto.
  if (body.mode === "concept" && body.context === "connection" && body.connection) {
    const c = body.connection;
    const path =
      c.pathLabels && c.pathLabels.length >= 2
        ? `\nRuta recorrida por el estudiante: ${c.pathLabels.join(" → ")}`
        : "";
    return `Estudia la RELACIÓN entre «${c.fromLabel}» y «${c.toLabel}».
El estudiante llegó a «${c.toLabel}» viajando desde «${c.fromLabel}» en la Mente Cósmica.${path}`;
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
  const { SEFIROT } = await import("@/lib/nodes/sefirot");
  const sefira = isKabbalah ? SEFIROT.find((s) => s.id === body.sefiraId) : null;

  // Modo CONEXIÓN (Mente Cósmica relacional V3): estudiar la relación entre
  // dos nodos. La curaduría del edge se resuelve AQUÍ (servidor = única fuente
  // de verdad); si no existe, el prompt exige un estudio exploratorio honesto.
  const isConnection =
    body.context === "connection" &&
    mode === "concept" &&
    !!body.connection?.fromId &&
    !!body.connection?.toId &&
    !!body.connection?.fromLabel &&
    !!body.connection?.toLabel;
  const connInfo: ConnectionInfo | null = isConnection
    ? {
        fromLabel: String(body.connection!.fromLabel).slice(0, 120),
        toLabel: String(body.connection!.toLabel).slice(0, 120),
        pathLabels: Array.isArray(body.connection!.pathLabels)
          ? body.connection!.pathLabels.slice(0, 8).map((s) => String(s).slice(0, 120))
          : undefined,
      }
    : null;
  const curatedEdge = isConnection
    ? getEdgeData(body.connection!.fromId, body.connection!.toId)
    : null;

  const systemPrompt = isKabbalah && sefira
    ? buildKabbalahStudyPrompt(locale, sefira.he, sefira.es)
    : isConnection && connInfo
      ? buildConnectionStudyPrompt(locale, connInfo, curatedEdge)
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
        // Se guarda EXACTAMENTE lo que se envía: así las posiciones que calcula
        // el verificador siguen valiendo en el texto que tiene el cliente.
        let full = "";
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              full += event.delta.text;
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          // ── El juicio ────────────────────────────────────────────────────
          // El motor propone, el código juzga. Las citas del estudio (Zóhar,
          // Talmud, Tanaj y Midrash) se cotejan contra las tablas locales del
          // repo; el estudio ya se envió entero, así que las marcas viajan en
          // un TRÁILER y el cliente las inserta al cerrar. Solo se marca lo
          // que se COMPRUEBA que falla: ante la duda no se marca nada.
          // Nada de esto puede tumbar el estudio: si falla, no hay tráiler.
          try {
            const t0 = Date.now();
            const cites = checkCitations(full);
            const label = REF_MARK[locale] ?? REF_MARK.es;
            const marks: Mark[] = cites.findings
              .filter((f) => f.verdict === "false")
              .map((f) => ({
                end: f.end,
                note: locale === "es" ? `${label}: ${f.detail}` : label,
              }));
            console.log(
              `[study] ${mode}/${locale} citas detectadas=${cites.findings.length} ` +
                `existen=${cites.existing} falsas=${cites.falsified} ` +
                `no-concluyentes=${cites.inconclusive} | ${Date.now() - t0}ms`
            );
            for (const f of cites.findings) {
              if (f.verdict === "false") {
                console.log(`[study] cita falsa (${f.kind}): «${f.raw}» → ${f.detail}`);
              }
            }
            if (marks.length > 0) {
              controller.enqueue(encoder.encode("\x02" + JSON.stringify({ marks })));
            }
          } catch (err) {
            console.error("study verify error", err);
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
