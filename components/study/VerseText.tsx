"use client";

import React, { useRef } from "react";
import type { HighlightColor, VerseSide, Highlight } from "@/lib/study/cuaderno";
import type { WordAnchor, WordMenuAnchorEvt } from "@/components/sefaria/ClickableHebrew";

// ─────────────────────────────────────────────────────────────────────────
//  VerseText — un versículo del texto fuente, con dos capacidades del cuaderno
//  superpuestas a la lectura, SIN ruido:
//
//   · Resaltado: re-aplica los rangos guardados (offsets sobre la CADENA del
//     versículo, no el DOM) envolviéndolos en <mark>. Al SELECCIONAR texto
//     (arrastrar), avisa al padre con el rango en offsets de cadena para abrir
//     el mini-menú de colores.
//   · Léxico (solo hebreo): un CLIC simple sobre una palabra abre el léxico,
//     igual que antes. La distinción clic-vs-selección es la clave del diseño:
//       - selección con texto (rango no colapsado) → resaltar (no abre léxico)
//       - clic simple (selección colapsada) → léxico
//
//  Para el hebreo seguimos partiendo en palabras pulsables; pero ahora el texto
//  es SELECCIONABLE (antes tenía user-select:none, lo que impedía resaltar).
// ─────────────────────────────────────────────────────────────────────────

const COLOR_CLASS: Record<HighlightColor, string> = {
  // Tintes suaves coherentes con la identidad: dorado/ámbar + dos fríos tenues.
  gold: "bg-gold/25 text-parchment",
  sky: "bg-sky-300/20 text-parchment",
  sage: "bg-emerald-300/15 text-parchment",
};

export interface SelectionInfo {
  side: VerseSide;
  verse: number;
  start: number;
  end: number;
  /** posición en pantalla para anclar el mini-menú. */
  x: number;
  y: number;
  /** ¿el rango ya solapa un resaltado existente? (para ofrecer "quitar"). */
  hasExisting: boolean;
}

interface VerseTextProps {
  text: string;
  verse: number;
  side: VerseSide;
  highlights: Highlight[];
  /** clases del párrafo (hebreo grande / traducción). */
  className?: string;
  dir?: "rtl" | "ltr";
  /** solo hebreo: partir en palabras pulsables para el léxico. */
  clickableWords?: boolean;
  onWord?: (anchor: WordAnchor) => void;
  onWordMenu?: (anchor: WordMenuAnchorEvt) => void;
  /** se llama al soltar una selección con texto dentro de este versículo. */
  onSelect?: (info: SelectionInfo) => void;
}

// Construye los tramos [resaltado / normal] a partir de la cadena + highlights.
type Span = { start: number; end: number; color: HighlightColor | null };

function buildSpans(text: string, highlights: Highlight[]): Span[] {
  if (highlights.length === 0) return [{ start: 0, end: text.length, color: null }];
  // Puntos de corte (clamp al largo actual del versículo por seguridad).
  const pts = new Set<number>([0, text.length]);
  for (const h of highlights) {
    pts.add(Math.max(0, Math.min(h.start, text.length)));
    pts.add(Math.max(0, Math.min(h.end, text.length)));
  }
  const sorted = [...pts].sort((a, b) => a - b);
  const spans: Span[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i];
    const end = sorted[i + 1];
    if (end <= start) continue;
    const mid = (start + end) / 2;
    const cover = highlights.find((h) => h.start <= mid && h.end >= mid);
    spans.push({ start, end, color: cover ? cover.color : null });
  }
  return spans;
}

export default function VerseText({
  text,
  verse,
  side,
  highlights,
  className,
  dir,
  clickableWords = false,
  onWord,
  onWordMenu,
  onSelect,
}: VerseTextProps) {
  const rootRef = useRef<HTMLParagraphElement>(null);

  // Estado del long-press (igual que ClickableHebrew, para el menú contextual).
  const lpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lpFired = useRef(false);
  const lpStart = useRef<{ x: number; y: number } | null>(null);

  const spans = buildSpans(text, highlights);

  // ── Detección de selección → offset de cadena (estable) ─────────────────
  // Mapea un (nodo, offset) del DOM a un offset absoluto dentro de `text`
  // recorriendo los nodos de texto del contenedor en orden. Como todo el texto
  // visible del versículo proviene de `text` (sin adornos), la suma de longitudes
  // de los nodos de texto reconstruye exactamente la cadena del versículo.
  function domOffsetToString(node: Node, offset: number): number | null {
    const root = rootRef.current;
    if (!root) return null;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let acc = 0;
    let cur: Node | null = walker.nextNode();
    while (cur) {
      if (cur === node) return acc + offset;
      acc += (cur.textContent ?? "").length;
      cur = walker.nextNode();
    }
    return null;
  }

  function readSelection(clientX: number, clientY: number): void {
    if (!onSelect) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    const root = rootRef.current;
    if (!root) return;
    // La selección debe estar contenida en ESTE versículo.
    if (!root.contains(range.startContainer) || !root.contains(range.endContainer)) return;
    const a = domOffsetToString(range.startContainer, range.startOffset);
    const b = domOffsetToString(range.endContainer, range.endOffset);
    if (a === null || b === null) return;
    const start = Math.min(a, b);
    const end = Math.max(a, b);
    if (end - start < 1) return;
    const hasExisting = highlights.some((h) => h.start < end && h.end > start);
    onSelect({ side, verse, start, end, x: clientX, y: clientY, hasExisting });
  }

  // ── Clic de palabra (léxico) — solo si NO hubo selección ────────────────
  function handleWordClick(e: React.MouseEvent, word: string) {
    if (lpFired.current) {
      lpFired.current = false;
      return;
    }
    // Si hay una selección con texto, esto fue un arrastre, no un clic: no léxico.
    const sel = window.getSelection();
    if (sel && !sel.isCollapsed && (sel.toString().trim().length > 0)) return;
    if (!onWord) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    onWord({ word, x: r.left + r.width / 2, y: r.bottom, top: r.top });
  }

  function handleWordRight(e: React.MouseEvent, word: string) {
    if (!onWordMenu) return;
    e.preventDefault();
    onWordMenu({ word, x: e.clientX, y: e.clientY });
  }

  function handleTouchStart(e: React.TouchEvent, word: string) {
    if (!onWordMenu) return;
    lpFired.current = false;
    const touch = e.touches[0];
    lpStart.current = { x: touch.clientX, y: touch.clientY };
    lpTimer.current = setTimeout(() => {
      lpFired.current = true;
      onWordMenu({ word, x: touch.clientX, y: touch.clientY });
      try { navigator.vibrate?.(12); } catch { /* noop */ }
    }, 450);
  }
  function handleTouchMove(e: React.TouchEvent) {
    if (!lpStart.current) return;
    const touch = e.touches[0];
    if (Math.abs(touch.clientX - lpStart.current.x) > 10 || Math.abs(touch.clientY - lpStart.current.y) > 10) {
      if (lpTimer.current) clearTimeout(lpTimer.current);
    }
  }
  function handleTouchEnd(clientX: number, clientY: number) {
    if (lpTimer.current) clearTimeout(lpTimer.current);
    lpStart.current = null;
    // En móvil, una selección de texto también dispara touchend.
    setTimeout(() => readSelection(clientX, clientY), 0);
  }

  // Renderiza un tramo de texto. En hebreo pulsable lo parte en palabras-botón;
  // si no, texto plano. El <mark> envuelve el tramo resaltado.
  function renderSpan(span: Span, spanIdx: number): React.ReactNode {
    const slice = text.slice(span.start, span.end);
    const inner = clickableWords ? renderClickable(slice, span.start) : slice;
    if (span.color) {
      return (
        <mark
          key={`sp-${spanIdx}`}
          className={`rounded-[3px] ${COLOR_CLASS[span.color]}`}
          // El <mark> nativo trae fondo amarillo del navegador; lo neutralizamos.
          style={{ backgroundColor: undefined }}
        >
          {inner}
        </mark>
      );
    }
    return <React.Fragment key={`sp-${spanIdx}`}>{inner}</React.Fragment>;
  }

  // Parte un tramo hebreo en palabras pulsables (léxico), conservando espacios.
  function renderClickable(slice: string, _base: number): React.ReactNode {
    const tokens = slice.split(/(\s+|־)/);
    return tokens.map((tok, i) => {
      if (!tok) return null;
      if (/^\s+$/.test(tok) || tok === "־" || !/[א-ת]/.test(tok)) {
        return <React.Fragment key={i}>{tok}</React.Fragment>;
      }
      return (
        <span
          key={i}
          role="button"
          tabIndex={0}
          onClick={(e) => handleWordClick(e, tok)}
          onContextMenu={(e) => handleWordRight(e, tok)}
          onTouchStart={(e) => handleTouchStart(e, tok)}
          onTouchMove={handleTouchMove}
          onTouchEnd={(e) => {
            const t = e.changedTouches[0];
            handleTouchEnd(t?.clientX ?? 0, t?.clientY ?? 0);
          }}
          className="cursor-pointer rounded transition-colors hover:bg-gold/15 hover:text-gold-soft"
          title={tok}
        >
          {tok}
        </span>
      );
    });
  }

  return (
    <p
      ref={rootRef}
      dir={dir}
      className={className}
      style={{ WebkitUserSelect: "text", userSelect: "text" }}
      onMouseUp={(e) => readSelection(e.clientX, e.clientY)}
    >
      {spans.map((sp, i) => renderSpan(sp, i))}
    </p>
  );
}
