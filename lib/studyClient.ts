// Helper de cliente para llamar al motor de estudio (API route protegida).
import type { StudyMode } from "./anthropic";

export interface StudyClientRequest {
  mode: StudyMode;
  locale: string;
  ref?: string;
  hebrewText?: string;
  term?: string;
  letter?: string;
}

export class StudyError extends Error {
  code: string;
  constructor(code: string) {
    super(code);
    this.code = code;
  }
}

export async function requestStudy(body: StudyClientRequest): Promise<string> {
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
  return data.study as string;
}
