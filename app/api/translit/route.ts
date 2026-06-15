import { NextResponse } from "next/server";
import { anthropic, buildTranslitPrompt, LIGHT_MODEL } from "@/lib/engine/anthropic";
import { checkRateLimit, clientIp } from "@/lib/infra/rateLimit";
import { gematria, gematriaBreakdown, stripNiqud } from "@/lib/sources/lexicon";

export const runtime = "nodejs";
export const maxDuration = 60;

type Origen = "es" | "en" | "fa";

interface TranslitRequest {
  /** nombre en alfabeto latino o persa */
  nombre?: string;
  /** idioma de origen del nombre */
  origen?: Origen;
  /** idioma de la nota (es/fa/en) */
  locale?: string;
}

interface GrafiaModelo {
  hebreo: string;
  nota?: string;
}

export interface GrafiaSalida {
  /** grafía hebrea (solo consonantes + matres, sin niqud) */
  hebreo: string;
  /** nota corta del modelo (plena/defectiva/raíz bíblica) */
  nota: string;
  /** gematría RECALCULADA en backend con gematria() — no se confía en el modelo */
  gematria: number;
  /** desglose letra · valor */
  desglose: { letter: string; value: number }[];
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

// Extrae el array JSON de la respuesta de Claude, tolerando texto/markdown.
function parseGrafias(raw: string): GrafiaModelo[] | null {
  let text = raw.trim();
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) text = fence[1].trim();
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    const arr = JSON.parse(text.slice(start, end + 1));
    if (!Array.isArray(arr)) return null;
    const out: GrafiaModelo[] = [];
    for (const item of arr) {
      if (item && typeof item === "object" && typeof item.hebreo === "string") {
        out.push({ hebreo: item.hebreo, nota: typeof item.nota === "string" ? item.nota : "" });
      }
    }
    return out.length ? out : null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ error: "origin_not_allowed" }, { status: 403 });
  }
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "missing_api_key" }, { status: 500 });
  }

  let body: TranslitRequest;
  try {
    body = (await req.json()) as TranslitRequest;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const nombre = (body.nombre ?? "").trim().slice(0, 60);
  if (!nombre) {
    return NextResponse.json({ error: "no_name" }, { status: 400 });
  }
  const origen: Origen = ["es", "en", "fa"].includes(body.origen ?? "")
    ? (body.origen as Origen)
    : "es";
  const locale = ["es", "fa", "en"].includes(body.locale ?? "")
    ? (body.locale as string)
    : "es";

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(ip);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const origenNombre =
    origen === "fa" ? "persa" : origen === "en" ? "inglés" : "español";
  const userPrompt = `Nombre: «${nombre}»
Idioma de origen: ${origenNombre}.
Transcríbelo al hebreo según las reglas. Devuelve el array JSON de grafías.`;

  try {
    const msg = await anthropic.messages.create({
      model: LIGHT_MODEL,
      max_tokens: 800,
      system: [
        {
          type: "text",
          text: buildTranslitPrompt(locale),
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [{ role: "user", content: userPrompt }],
    });

    const raw = msg.content.map((b) => (b.type === "text" ? b.text : "")).join("");
    const grafias = parseGrafias(raw);
    if (!grafias) {
      return NextResponse.json({ error: "parse_failed" }, { status: 502 });
    }

    // Calcular la gematría en CÓDIGO (no se confía en el modelo). Dedupe por grafía.
    const vistos = new Set<string>();
    const salida: GrafiaSalida[] = [];
    for (const g of grafias.slice(0, 3)) {
      const hebreo = stripNiqud(g.hebreo).trim();
      if (!hebreo || vistos.has(hebreo)) continue;
      vistos.add(hebreo);
      salida.push({
        hebreo,
        nota: g.nota ?? "",
        gematria: gematria(hebreo),
        desglose: gematriaBreakdown(hebreo),
      });
    }
    if (salida.length === 0) {
      return NextResponse.json({ error: "parse_failed" }, { status: 502 });
    }

    return NextResponse.json({ grafias: salida });
  } catch (err) {
    console.error("translit error", err);
    return NextResponse.json({ error: "translit_failed" }, { status: 502 });
  }
}
