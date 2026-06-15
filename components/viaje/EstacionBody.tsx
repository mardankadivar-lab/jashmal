"use client";

import React from "react";
import EstacionInline from "./EstacionInline";

// ─────────────────────────────────────────────────────────────────────────
//  Render del cuerpo markdown de una estación con la estética Jashmal.
//  El cuerpo trae 7 secciones "## <hebreo> — <subtítulo>":
//    תַּרְגּוּם · מְפָרְשִׁים · פרד״ס · הִתְבּוֹנְנוּת · מַעֲשֶׂה · חֲתִימָה · הֶמְשֵׁךְ
//  La última (הֶמְשֵׁךְ) NO es una sección de estudio: es el UMBRAL de
//  navegación (chips dorados hacia otras estaciones) y se pinta distinto.
//
//  Solo soportamos el subconjunto de markdown que usan las estaciones:
//  encabezados ##, párrafos, citas (>), listas (- ), **negrita**/*cursiva* y
//  los enlaces {{…}}. Es deliberadamente pequeño y predecible (sin dependencias).
// ─────────────────────────────────────────────────────────────────────────

interface Section {
  hebrew: string;   // título hebreo (antes del " — ")
  subtitle: string; // subtítulo en español (después del " — ")
  raw: string;      // cuerpo de la sección (sin el encabezado)
}

function splitSections(md: string): Section[] {
  const parts = md.split(/^##\s+/m).filter((p) => p.trim());
  return parts.map((p) => {
    const nl = p.indexOf("\n");
    const headerLine = (nl === -1 ? p : p.slice(0, nl)).trim();
    const raw = nl === -1 ? "" : p.slice(nl + 1).trim();
    // "תַּרְגּוּם — El umbral" → hebrew / subtitle
    const m = headerLine.split(/\s+—\s+/);
    return {
      hebrew: m[0]?.trim() ?? headerLine,
      subtitle: m.slice(1).join(" — ").trim(),
      raw,
    };
  });
}

// Convierte el cuerpo de una sección en bloques (párrafos / citas / listas).
type Block =
  | { kind: "p"; text: string }
  | { kind: "quote"; lines: string[] }
  | { kind: "ul"; items: string[] };

function toBlocks(raw: string): Block[] {
  const blocks: Block[] = [];
  const lines = raw.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    // Cita en bloque: líneas consecutivas que empiezan con ">".
    if (line.trimStart().startsWith(">")) {
      const lns: string[] = [];
      while (i < lines.length && (lines[i].trimStart().startsWith(">") || !lines[i].trim())) {
        if (lines[i].trim()) lns.push(lines[i].replace(/^\s*>\s?/, ""));
        else if (lns.length && i + 1 < lines.length && lines[i + 1].trimStart().startsWith(">")) {
          lns.push(""); // línea en blanco DENTRO de la cita
        } else break;
        i++;
      }
      blocks.push({ kind: "quote", lines: lns });
      continue;
    }
    // Lista: líneas consecutivas que empiezan con "- ".
    if (/^\s*-\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\s*-\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*-\s+/, ""));
        i++;
      }
      blocks.push({ kind: "ul", items });
      continue;
    }
    // Párrafo: hasta una línea en blanco.
    const buf: string[] = [];
    while (i < lines.length && lines[i].trim() && !lines[i].trimStart().startsWith(">") && !/^\s*-\s+/.test(lines[i])) {
      buf.push(lines[i]);
      i++;
    }
    blocks.push({ kind: "p", text: buf.join(" ") });
  }
  return blocks;
}

function Blocks({ raw, kp }: { raw: string; kp: string }) {
  const blocks = toBlocks(raw);
  return (
    <>
      {blocks.map((b, i) => {
        const key = `${kp}-b${i}`;
        if (b.kind === "quote") {
          return (
            <blockquote
              key={key}
              className="my-6 rounded-2xl border border-gold/25 bg-gold/[0.05] px-6 py-5 text-center"
            >
              {b.lines.map((l, j) =>
                l ? (
                  <p
                    key={`${key}-${j}`}
                    className="text-[1.05rem] italic leading-relaxed text-parchment/90"
                  >
                    <EstacionInline text={l} keyPrefix={`${key}-${j}`} />
                  </p>
                ) : (
                  <div key={`${key}-${j}`} className="h-2" />
                )
              )}
            </blockquote>
          );
        }
        if (b.kind === "ul") {
          return (
            <ul key={key} className="my-4 space-y-2.5 ps-1">
              {b.items.map((it, j) => (
                <li key={`${key}-${j}`} className="flex gap-3 leading-relaxed text-parchment/85">
                  <span className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full bg-gold/60" aria-hidden />
                  <span>
                    <EstacionInline text={it} keyPrefix={`${key}-${j}`} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={key} className="my-4 leading-[1.85] text-parchment/85">
            <EstacionInline text={b.text} keyPrefix={key} />
          </p>
        );
      })}
    </>
  );
}

// El UMBRAL de navegación (הֶמְשֵׁךְ): los ítems de la lista son los puentes.
function Umbral({ raw }: { raw: string }) {
  const items = toBlocks(raw).flatMap((b) => (b.kind === "ul" ? b.items : []));
  return (
    <div className="mt-14 border-t border-gold/15 pt-8">
      <p className="mb-5 text-center font-cinzel text-xs uppercase tracking-[0.35em] text-gold/55">
        הֶמְשֵׁךְ · Sigue el hilo
      </p>
      <div className="space-y-3">
        {items.map((it, i) => (
          <p
            key={i}
            className="rounded-xl border border-gold/15 bg-ink/40 px-5 py-3.5 text-center leading-relaxed text-parchment/80"
          >
            <EstacionInline text={it} keyPrefix={`umbral-${i}`} />
          </p>
        ))}
      </div>
    </div>
  );
}

export default function EstacionBody({ markdown }: { markdown: string }) {
  const sections = splitSections(markdown);
  return (
    <div className="font-body text-[1.075rem]">
      {sections.map((s, i) => {
        const isUmbral = /הֶמְשֵׁךְ/.test(s.hebrew);
        if (isUmbral) return <Umbral key={i} raw={s.raw} />;
        return (
          <section key={i} className="mt-12 first:mt-0">
            <h2 className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="hebrew text-2xl font-bold text-gold" style={{ textShadow: "0 0 14px rgba(201,164,62,0.45)" }}>
                {s.hebrew}
              </span>
              {s.subtitle && (
                <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold/55">
                  {s.subtitle}
                </span>
              )}
            </h2>
            <div className="mb-5 h-px w-16 bg-gold/30" />
            <Blocks raw={s.raw} kp={`s${i}`} />
          </section>
        );
      })}
    </div>
  );
}
