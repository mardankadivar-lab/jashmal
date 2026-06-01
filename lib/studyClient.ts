// Cliente del motor de estudio — lee la respuesta en streaming para que el
// texto aparezca progresivamente (evita timeouts en Farsi y textos largos).
import type { StudyMode } from "./anthropic";

export type StudyDepth = "quick" | "deep";

export interface StudyClientRequest {
  mode: StudyMode;
  locale: string;
  depth?: StudyDepth;
  ref?: string;
  hebrewText?: string;
  term?: string;
  letter?: string;
  context?: string;    // "kabbalah" = modo cabalístico
  sefiraId?: string;  // id de la sefirá de origen
}

export interface StudyResponse {
  study: string;
  depth?: StudyDepth;
  sourcesUsed?: number;
}

export class StudyError extends Error {
  code: string;
  constructor(code: string) {
    super(code);
    this.code = code;
  }
}

/**
 * Solicita un estudio al motor de Claude.
 * @param onChunk  Callback opcional llamado con el texto ACUMULADO en cada chunk
 *                 → permite mostrar el texto progresivamente en la UI.
 */
export async function requestStudy(
  body: StudyClientRequest,
  onChunk?: (accumulated: string) => void
): Promise<StudyResponse> {
  const res = await fetch("/api/study", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // Errores antes de iniciar el stream (validación, rate limit, etc.)
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new StudyError(data?.error ?? `http_${res.status}`);
  }

  const reader = res.body?.getReader();
  if (!reader) throw new StudyError("no_stream");

  const decoder = new TextDecoder();
  let meta: { depth?: StudyDepth; sourcesUsed?: number } = {};
  let study = "";
  let metaParsed = false;
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    if (!metaParsed) {
      // El primer chunk contiene los metadatos JSON terminados en \x00
      const nullIdx = buffer.indexOf("\x00");
      if (nullIdx !== -1) {
        try {
          meta = JSON.parse(buffer.slice(0, nullIdx));
        } catch {
          /* metadatos malformados — los ignoramos */
        }
        buffer = buffer.slice(nullIdx + 1);
        metaParsed = true;
      }
    }

    if (metaParsed) {
      // Detectar señal de error del servidor
      if (buffer.includes("\x01error")) {
        throw new StudyError("study_failed");
      }
      study += buffer;
      buffer = "";
      onChunk?.(study);
    }
  }

  // Flush del decoder
  const tail = decoder.decode();
  if (tail) {
    study += tail;
    onChunk?.(study);
  }

  if (!study.trim()) throw new StudyError("study_failed");

  return { study, depth: meta.depth, sourcesUsed: meta.sourcesUsed };
}
