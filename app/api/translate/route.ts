import { NextResponse } from "next/server";
import {
  anthropic,
  buildTranslatePrompt,
  buildSnippetTranslatePrompt,
  TRANSLATE_MODEL,
} from "@/lib/engine/anthropic";
import { checkRateLimit, clientIp } from "@/lib/infra/rateLimit";

export const runtime = "nodejs";
export const maxDuration = 120;

interface TranslateRequest {
  ref?: string;
  /** segmentos en hebreo (los que se muestran). */
  segments?: string[];
  /** traducción inglesa de Sefaria, alineada con los segmentos (referencia de sentido). */
  english?: string[];
  /** idioma destino: "es", "en" o "fa". Default "fa" (compatibilidad con el uso previo). */
  locale?: string;
  /**
   * "passage" (default): traduce desde HEBREO, con `english` como referencia
   * de sentido alineada — uso del estudio (hebreo + persa/español).
   * "snippet": traduce fragmentos de ORIGEN DESCONOCIDO (snippets de
   * búsqueda que Sefaria puede devolver en portugués, alemán, etc.) al
   * idioma de interfaz, sin asumir que el origen es hebreo. Admite locale "en".
   */
  mode?: "passage" | "snippet";
}

// ─── Caché en memoria por ref ────────────────────────────────────
// Evita re-traducir el mismo pasaje (ahorra costo y latencia). En memoria por
// instancia, igual que el rate limit; suficiente para el MVP. Para multi-instancia
// migrar a KV/Upstash.
const CACHE_MAX = 500; // máximo de refs cacheadas (evita crecer sin límite)
const cache = new Map<string, string[]>();

function cacheGet(key: string): string[] | undefined {
  const v = cache.get(key);
  if (v) {
    // refrescar orden de uso (LRU simple)
    cache.delete(key);
    cache.set(key, v);
  }
  return v;
}

function cacheSet(key: string, value: string[]): void {
  if (cache.has(key)) cache.delete(key);
  cache.set(key, value);
  while (cache.size > CACHE_MAX) {
    const oldest = cache.keys().next().value;
    if (oldest === undefined) break;
    cache.delete(oldest);
  }
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

// Extrae el array JSON de la respuesta de Claude, tolerando texto/markdown alrededor.
function parseTranslations(raw: string, expected: number): string[] | null {
  let text = raw.trim();
  // quitar cercas de markdown ```json ... ```
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) text = fence[1].trim();
  // tomar desde el primer [ hasta el último ]
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    const arr = JSON.parse(text.slice(start, end + 1));
    if (!Array.isArray(arr)) return null;
    const out = arr.map((x) => (typeof x === "string" ? x : String(x ?? "")));
    if (out.length !== expected) return null;
    return out;
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

  let body: TranslateRequest;
  try {
    body = (await req.json()) as TranslateRequest;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const segments = Array.isArray(body.segments)
    ? body.segments.filter((s) => typeof s === "string")
    : [];
  const english = Array.isArray(body.english) ? body.english : [];
  const ref = (body.ref ?? "").trim();
  const mode = body.mode === "snippet" ? "snippet" : "passage";
  // En modo "passage" (uso histórico, solo persa/español) el default sigue
  // siendo "fa" para no romper el llamador existente. En modo "snippet"
  // (nuevo) sí puede pedirse "en", porque el origen no se asume hebreo.
  const locale =
    mode === "snippet"
      ? body.locale === "es" ? "es" : body.locale === "en" ? "en" : "fa"
      : body.locale === "es" ? "es" : "fa";

  if (segments.length === 0) {
    return NextResponse.json({ error: "no_segments" }, { status: 400 });
  }

  // Clave de caché: ref + modo + idioma + número de segmentos (un mismo ref
  // siempre trae los mismos segmentos, pero la traducción cambia según modo/idioma).
  const cacheKey = ref ? `${ref}::${mode}::${locale}::${segments.length}` : "";
  if (cacheKey) {
    const cached = cacheGet(cacheKey);
    if (cached) {
      return NextResponse.json({ translations: cached, cached: true });
    }
  }

  // Rate limit propio ("translate:") — separado del de /api/study, para que
  // traducir snippets de búsqueda no consuma la cuota de estudios profundos.
  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`translate:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const targetLangLabel = locale === "es" ? "español" : locale === "en" ? "inglés" : "persa";

  let systemPrompt: string;
  let userPrompt: string;

  if (mode === "snippet") {
    // Fragmentos de origen desconocido (portugués, alemán, inglés, hebreo...):
    // no hay "inglés de referencia" alineado, cada segmento es independiente.
    const numbered = segments.map((seg, i) => `[${i + 1}] ${seg}`).join("\n\n");
    systemPrompt = buildSnippetTranslatePrompt(locale);
    userPrompt = `Número de fragmentos a traducir: ${segments.length}

Traduce cada fragmento al ${targetLangLabel}. Si un fragmento ya está en ${targetLangLabel},
devuélvelo igual. Responde con un array JSON de EXACTAMENTE ${segments.length}
elementos, en el mismo orden.

<fragmentos>
${numbered}
</fragmentos>`;
  } else {
    // Construir el bloque de segmentos numerados con su inglés de referencia.
    const numbered = segments
      .map((seg, i) => {
        const en = english[i] ? `\n  (inglés ref.: ${english[i]})` : "";
        return `[${i + 1}] ${seg}${en}`;
      })
      .join("\n\n");
    systemPrompt = buildTranslatePrompt(locale === "en" ? "fa" : locale);
    userPrompt = `Referencia: ${ref || "(sin referencia)"}
Número de segmentos a traducir: ${segments.length}

Traduce al ${targetLangLabel} CADA UNO de estos ${segments.length} segmentos hebreos. Devuelve
un array JSON con EXACTAMENTE ${segments.length} traducciones, en el mismo orden.

<segmentos>
${numbered}
</segmentos>`;
  }

  try {
    const msg = await anthropic.messages.create({
      model: TRANSLATE_MODEL,
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

    const raw = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("");

    const translations = parseTranslations(raw, segments.length);
    if (!translations) {
      return NextResponse.json({ error: "parse_failed" }, { status: 502 });
    }

    if (cacheKey) cacheSet(cacheKey, translations);
    return NextResponse.json({ translations, cached: false });
  } catch (err) {
    console.error("translate error", err);
    return NextResponse.json({ error: "translate_failed" }, { status: 502 });
  }
}
