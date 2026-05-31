// Helper de cliente para llamar al motor de estudio (API route protegida).
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

export async function requestStudy(body: StudyClientRequest): Promise<StudyResponse> {
  const res = await fetch("/api/study", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new StudyError(data?.error ?? `http_${res.status}`);
  }

  const data = await res.json();
  return {
    study: data.study as string,
    depth: data.depth,
    sourcesUsed: data.sourcesUsed,
  };
}
