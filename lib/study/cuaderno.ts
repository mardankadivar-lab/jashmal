// ─────────────────────────────────────────────────────────────────────────
//  cuaderno.ts — "Cuaderno de estudio" del lado del CLIENTE (FASE 1).
//
//  Anotaciones personales mientras se estudia, SIN cuenta: todo vive en
//  localStorage del navegador, privado por dispositivo. Dos capacidades:
//
//    1. Notas al margen (por versículo) — una nota de texto atada a un
//       versículo concreto del texto fuente.
//    2. Resaltados / subrayados — un rango de la cadena del versículo
//       (inicio/fin de carácter + color) que se re-aplica al recargar.
//
//  El ancla es estable: `ref` del texto fuente (ej. "Numbers 16") + índice de
//  versículo (0-based, igual que `segments` en SefariaTextResult) + qué cara
//  del versículo (hebreo `he` o traducción `tr`). Los offsets de un resaltado
//  son relativos a la CADENA del versículo (unidad estable que no cambia entre
//  recargas), no al DOM, así que sobreviven a re-renders y cambios de layout.
//
//  Nada de esto toca el backend ni ninguna API. Privado y local.
// ─────────────────────────────────────────────────────────────────────────

export type HighlightColor = "gold" | "sky" | "sage";

/** Qué cara del versículo: hebreo original o traducción. */
export type VerseSide = "he" | "tr";

export interface VerseNote {
  /** ref base del texto fuente, ej. "Numbers 16". */
  ref: string;
  /** índice del versículo (0-based) dentro de segments. */
  verse: number;
  /** texto de la nota. */
  text: string;
  /** ISO de última edición. */
  updatedAt: string;
}

export interface Highlight {
  /** id estable para borrar/togglear. */
  id: string;
  ref: string;
  verse: number;
  side: VerseSide;
  /** offset de carácter inicial dentro de la cadena del versículo (inclusive). */
  start: number;
  /** offset de carácter final dentro de la cadena del versículo (exclusivo). */
  end: number;
  color: HighlightColor;
  createdAt: string;
}

const NOTES_KEY = "jashmal_notes_v1";
const HL_KEY = "jashmal_highlights_v1";

// ── Utilidades de almacenamiento (a prueba de cuota llena / SSR) ──────────

function readAll<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const arr = JSON.parse(raw) as T[];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function writeAll<T>(key: string, list: T[]): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(list));
  } catch {
    /* cuota llena u otro fallo: el cuaderno nunca debe romper la app */
  }
}

/** Avisa a los componentes montados de que el cuaderno cambió (misma pestaña). */
function notify(): void {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(new Event("jashmal:cuaderno"));
  } catch {
    /* noop */
  }
}

// ── NOTAS ─────────────────────────────────────────────────────────────────

/** Todas las notas (sin filtrar). */
export function listNotes(): VerseNote[] {
  return readAll<VerseNote>(NOTES_KEY);
}

/** Notas de un texto fuente concreto, ordenadas por versículo. */
export function notesForRef(ref: string): VerseNote[] {
  return listNotes()
    .filter((n) => n.ref === ref)
    .sort((a, b) => a.verse - b.verse);
}

/** La nota de un versículo concreto (o null si no hay). */
export function noteFor(ref: string, verse: number): VerseNote | null {
  return listNotes().find((n) => n.ref === ref && n.verse === verse) ?? null;
}

/**
 * Guarda (crea o actualiza) la nota de un versículo. Si el texto queda vacío,
 * borra la nota. Devuelve la nota resultante (o null si se borró).
 */
export function saveNote(ref: string, verse: number, text: string): VerseNote | null {
  const trimmed = text.trim();
  const all = listNotes();
  const rest = all.filter((n) => !(n.ref === ref && n.verse === verse));
  if (!trimmed) {
    writeAll(NOTES_KEY, rest);
    notify();
    return null;
  }
  const note: VerseNote = { ref, verse, text: trimmed, updatedAt: new Date().toISOString() };
  writeAll(NOTES_KEY, [...rest, note]);
  notify();
  return note;
}

/** Borra la nota de un versículo. */
export function deleteNote(ref: string, verse: number): void {
  const rest = listNotes().filter((n) => !(n.ref === ref && n.verse === verse));
  writeAll(NOTES_KEY, rest);
  notify();
}

// ── RESALTADOS ──────────────────────────────────────────────────────────

/** Todos los resaltados (sin filtrar). */
export function listHighlights(): Highlight[] {
  return readAll<Highlight>(HL_KEY);
}

/** Resaltados de una cara concreta (he/tr) de un versículo de un texto. */
export function highlightsFor(ref: string, verse: number, side: VerseSide): Highlight[] {
  return listHighlights()
    .filter((h) => h.ref === ref && h.verse === verse && h.side === side)
    .sort((a, b) => a.start - b.start);
}

/** Cuántos resaltados tiene un texto fuente entero (para el contador). */
export function highlightCountForRef(ref: string): number {
  return listHighlights().filter((h) => h.ref === ref).length;
}

function genId(): string {
  return `hl_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Añade un resaltado. Si el nuevo rango solapa con resaltados existentes de la
 * MISMA cara, los fusiona en uno solo (evita capas superpuestas frágiles) y
 * adopta el color nuevo. Devuelve el resaltado resultante.
 */
export function addHighlight(input: {
  ref: string;
  verse: number;
  side: VerseSide;
  start: number;
  end: number;
  color: HighlightColor;
}): Highlight | null {
  const { ref, verse, side, color } = input;
  let start = Math.min(input.start, input.end);
  let end = Math.max(input.start, input.end);
  if (end <= start) return null;

  const all = listHighlights();
  const same = all.filter((h) => h.ref === ref && h.verse === verse && h.side === side);
  const others = all.filter((h) => !(h.ref === ref && h.verse === verse && h.side === side));

  // Fusionar con los que solapan o tocan el rango nuevo.
  const overlapping = same.filter((h) => h.start <= end && h.end >= start);
  const untouched = same.filter((h) => !(h.start <= end && h.end >= start));
  for (const h of overlapping) {
    start = Math.min(start, h.start);
    end = Math.max(end, h.end);
  }

  const merged: Highlight = {
    id: genId(),
    ref,
    verse,
    side,
    start,
    end,
    color,
    createdAt: new Date().toISOString(),
  };
  writeAll(HL_KEY, [...others, ...untouched, merged]);
  notify();
  return merged;
}

/** Borra un resaltado por id. */
export function deleteHighlight(id: string): void {
  writeAll(HL_KEY, listHighlights().filter((h) => h.id !== id));
  notify();
}

/**
 * Quita cualquier resaltado que solape un rango (para el botón "quitar
 * resaltado" cuando el usuario selecciona texto ya resaltado).
 */
export function clearHighlightsInRange(
  ref: string,
  verse: number,
  side: VerseSide,
  start: number,
  end: number,
): void {
  const lo = Math.min(start, end);
  const hi = Math.max(start, end);
  writeAll(
    HL_KEY,
    listHighlights().filter(
      (h) => !(h.ref === ref && h.verse === verse && h.side === side && h.start < hi && h.end > lo),
    ),
  );
  notify();
}

// ── RESUMEN (para el contador "Mis apuntes" de ESTE estudio) ──────────────

export interface CuadernoSummary {
  notes: number;
  highlights: number;
}

export function summaryForRef(ref: string): CuadernoSummary {
  return {
    notes: notesForRef(ref).length,
    highlights: highlightCountForRef(ref),
  };
}
