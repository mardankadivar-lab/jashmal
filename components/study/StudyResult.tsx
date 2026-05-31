"use client";

import Inline from "./InteractiveText";

interface StudyResultProps {
  /** Texto del análisis devuelto por Claude (markdown ligero + hyperlinks). */
  text: string;
  onConcept?: (term: string) => void;
  onLetter?: (key: string, label: string) => void;
}

interface Block {
  kind: "h" | "p";
  level: number;
  content: string;
}

// Parser de markdown ligero: títulos (#..), y párrafos. Listas se tratan como párrafos.
function toBlocks(text: string): Block[] {
  const lines = text.split(/\r?\n/);
  const blocks: Block[] = [];
  let buffer: string[] = [];

  const flush = () => {
    if (buffer.length) {
      blocks.push({ kind: "p", level: 0, content: buffer.join(" ").trim() });
      buffer = [];
    }
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flush();
      continue;
    }
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flush();
      blocks.push({
        kind: "h",
        level: Math.min(heading[1].length, 3),
        content: heading[2].replace(/\*+/g, "").trim(),
      });
      continue;
    }
    buffer.push(line);
  }
  flush();
  return blocks;
}

export default function StudyResult({ text, onConcept, onLetter }: StudyResultProps) {
  const blocks = toBlocks(text);

  return (
    <article className="study-prose">
      {blocks.map((b, i) => {
        if (b.kind === "h") {
          const Tag = (`h${b.level}` as "h1" | "h2" | "h3");
          return (
            <Tag key={i}>
              <Inline text={b.content} onConcept={onConcept} onLetter={onLetter} keyPrefix={`h${i}`} />
            </Tag>
          );
        }
        return (
          <p key={i}>
            <Inline text={b.content} onConcept={onConcept} onLetter={onLetter} keyPrefix={`p${i}`} />
          </p>
        );
      })}
    </article>
  );
}
