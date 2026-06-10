// Cliente del motor de estudio — lee la respuesta en streaming para que el
// texto aparezca progresivamente (evita timeouts en Farsi y textos largos).
import type { StudyMode } from "./anthropic";
import { saveStudyHistory } from "./myStudies";

export type StudyDepth = "quick" | "deep";

export interface StudyClientRequest {
  mode: StudyMode;
  locale: string;
  depth?: StudyDepth;
  ref?: string;
  hebrewText?: string;
  term?: string;
  letter?: string;
  context?: string;    // "kabbalah" = modo cabalístico · "connection" = relación de la Mente Cósmica
  sefiraId?: string;  // id de la sefirá de origen
  // Estudio contextual de una conexión (Mente Cósmica relacional V3):
  connection?: {
    fromId: string;
    toId: string;
    fromLabel: string;
    toLabel: string;
    pathLabels?: string[];
  };
  saveTitle?: string; // título legible para "Mis Estudios" (no se envía a la API)
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

  // Alimentar el cerebro: cosecha en segundo plano (no bloquea ni rompe el estudio).
  // Cada estudio con cross-links {{...}} se convierte en sinapsis/conexiones 'pending'.
  try {
    const subject =
      body.mode === "letter"
        ? body.letter || body.term
        : body.mode === "concept"
          ? // estudio de CONEXIÓN: los hallazgos se acreditan al nodo destino real
            // (no a un nodo fantasma "X en relación con Y")
            body.connection?.toLabel || body.term
          : body.ref;
    if (subject && study) {
      // "Mis Estudios": guardar el estudio (localStorage siempre; servidor si
      // hay sesión) para poder VOLVER a él sin regenerarlo. Nunca rompe el flujo.
      try {
        saveStudyHistory({
          mode: body.mode,
          ref: subject,
          title: body.saveTitle || subject,
          content: study,
          lang: body.locale,
        });
      } catch { /* el historial nunca debe afectar al usuario */ }

      void fetch("/api/brain/harvest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: body.mode, subject, text: study }),
      }).catch(() => {});

      // Alimentar el Atlas vivo: si el estudio menciona una localidad bíblica
      // (Jerusalén, Hebrón, Sinaí…), se enciende como nodo en /atlas y este crece.
      // Mismo principio que el cerebro: en segundo plano, idempotente, sin bloquear.
      void fetch("/api/atlas/harvest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, text: study }),
      }).catch(() => {});
    }
  } catch {
    /* la cosecha nunca debe afectar al usuario */
  }

  return { study, depth: meta.depth, sourcesUsed: meta.sourcesUsed };
}
