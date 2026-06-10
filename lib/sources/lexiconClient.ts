// Cliente del léxico hebreo.
import type { ClassicLexicon } from "./lexicon";

export interface LexiconResponse {
  classic: ClassicLexicon;
  paleo: string;
  mystic: string;
}

export async function requestLexicon(
  word: string,
  locale: string
): Promise<LexiconResponse> {
  const res = await fetch("/api/lexicon", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ word, locale }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.error ?? `http_${res.status}`);
  }
  return (await res.json()) as LexiconResponse;
}
