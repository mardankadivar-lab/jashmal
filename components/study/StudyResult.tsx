"use client";

import { useLocale } from "next-intl";
import { parseHyperlinks } from "@/lib/hyperlinks";
import InlineText from "./InlineText";

interface StudyResultProps {
  text: string;
  onConcept?: (term: string) => void;
  onLetter?: (key: string, label: string) => void;
  onRef?: (ref: string) => void;
}

interface Block { kind: "h" | "p"; level: number; content: string; }

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
    if (!line) { flush(); continue; }
    const heading = line.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      flush();
      blocks.push({ kind: "h", level: Math.min(heading[1].length, 3), content: heading[2].replace(/\*+/g, "").trim() });
      continue;
    }
    buffer.push(line);
  }
  flush();
  return blocks;
}

// El umbral "Sigue el hilo" (הֶמְשֵׁךְ). Tolera niqud y variantes de escritura.
// Es lo único hebreo que detectamos aquí: marca el final del CONTENIDO de estudio.
const HEMSHEKH = /הֶ?מְ?שֵ?ׁ?ךְ?/;

// Micro-rótulo del umbral en los tres idiomas de la interfaz (es / fa / en).
const THRESHOLD_LABEL: Record<string, string> = {
  es: "El estudio cerró aquí · sigue el hilo",
  fa: "مطالعه اینجا بسته شد · رشته را دنبال کن",
  en: "The study sealed here · follow the thread",
};

// Cada pregunta-puente del umbral es un enlace {{study:…}} / {{letter:…}}. En vez
// de depender de cómo el modelo separó las líneas (podrían fundirse en un solo
// párrafo), extraemos cada enlace como su propio chip — y descartamos la prosa
// suelta entre enlaces, porque el umbral SOLO tiende puentes.
type Bridge =
  | { type: "letter"; key: string; label: string }
  | { type: "study"; term: string; label: string };

function bridgesFrom(blocks: Block[]): Bridge[] {
  const text = blocks.map((b) => b.content).join("\n");
  return parseHyperlinks(text).filter(
    (t): t is Bridge => t.type === "letter" || t.type === "study"
  );
}

export default function StudyResult({ text, onConcept, onLetter, onRef }: StudyResultProps) {
  const locale = useLocale();
  const rtl = locale === "fa";
  const blocks = toBlocks(text);

  // Localizamos el umbral: el heading cuyo título contiene הֶמְשֵׁךְ. Todo lo que
  // viene DESPUÉS deja de ser estudio y pasa a ser navegación (no más <h2>).
  const headingIdx = blocks.findIndex(
    (b) => b.kind === "h" && HEMSHEKH.test(b.content)
  );
  const bridges = headingIdx >= 0 ? bridgesFrom(blocks.slice(headingIdx + 1)) : [];
  // Solo tratamos como umbral si de verdad hay puentes (enlaces). Si encontramos
  // el título pero ningún enlace (caso degenerado), renderizamos normal para no
  // tragarnos contenido en pantalla.
  const hasThreshold = headingIdx >= 0 && bridges.length > 0;
  const studyBlocks = hasThreshold ? blocks.slice(0, headingIdx) : blocks;

  return (
    <article className="study-prose">
      {studyBlocks.map((b, i) => {
        if (b.kind === "h") {
          const Tag = (`h${b.level}` as "h1" | "h2" | "h3");
          return (
            <Tag key={i}>
              <InlineText text={b.content} onConcept={onConcept} onLetter={onLetter} onRef={onRef} keyPrefix={`h${i}`} />
            </Tag>
          );
        }
        return (
          <p key={i}>
            <InlineText text={b.content} onConcept={onConcept} onLetter={onLetter} onRef={onRef} keyPrefix={`p${i}`} />
          </p>
        );
      })}

      {hasThreshold && (
        <nav className="study-threshold" dir={rtl ? "rtl" : "ltr"} aria-label={THRESHOLD_LABEL[locale] ?? THRESHOLD_LABEL.es}>
          {/* (1) Separador/umbral dorado: marca que el estudio cerró y quedó sellado. */}
          <div className="study-threshold__rule">
            <span className="study-threshold__seal" aria-hidden="true">חֲתִימָה</span>
          </div>
          {/* (2) Micro-rótulo en el idioma del usuario. */}
          <p className="study-threshold__label">
            {THRESHOLD_LABEL[locale] ?? THRESHOLD_LABEL.es}
            <span aria-hidden="true">{rtl ? " ←" : " →"}</span>
          </p>
          {/* (3) Preguntas-puente como CHIPS dorados clicables (reusa gold-link). */}
          <ul className="study-threshold__chips">
            {bridges.map((b, i) =>
              b.type === "letter" ? (
                <li key={`bridge-${i}`} className="study-threshold__chip">
                  <button
                    type="button"
                    className="gold-link"
                    onClick={() => onLetter?.(b.key, b.label)}
                  >
                    {b.label}
                  </button>
                </li>
              ) : (
                <li key={`bridge-${i}`} className="study-threshold__chip">
                  <button
                    type="button"
                    className="gold-link"
                    onClick={() => onConcept?.(b.term)}
                  >
                    {b.label}
                  </button>
                </li>
              )
            )}
          </ul>
        </nav>
      )}
    </article>
  );
}
