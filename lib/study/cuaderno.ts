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

// Marca local de que ya se hizo la migración inicial ("merge up") tras detectar
// sesión: subir lo anónimo a la cuenta una sola vez por sesión de hidratación.
const SYNCED_KEY = "jashmal_cuaderno_synced_v1";

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
  pushNote(note);
  return note;
}

/** Borra la nota de un versículo. */
export function deleteNote(ref: string, verse: number): void {
  const rest = listNotes().filter((n) => !(n.ref === ref && n.verse === verse));
  writeAll(NOTES_KEY, rest);
  notify();
  pushDeleteNote(ref, verse);
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
  // Si la fusión absorbió resaltados previos, esos rangos ya no existen tal cual
  // en el servidor: bórralos por rango antes de subir el nuevo resaltado fusionado.
  if (overlapping.length > 0) {
    pushDeleteHighlightRange(ref, verse, side, start, end);
  }
  writeAll(HL_KEY, [...others, ...untouched, merged]);
  notify();
  pushHighlight(merged);
  return merged;
}

/** Borra un resaltado por id. */
export function deleteHighlight(id: string): void {
  const target = listHighlights().find((h) => h.id === id);
  writeAll(HL_KEY, listHighlights().filter((h) => h.id !== id));
  notify();
  if (target) {
    pushDeleteHighlightRange(target.ref, target.verse, target.side, target.start, target.end);
  }
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
  pushDeleteHighlightRange(ref, verse, side, lo, hi);
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

// ─────────────────────────────────────────────────────────────────────────
// SINCRONIZACIÓN CON LA CUENTA (FASE 1 sync) — opcional y NO intrusiva.
//
// El modo anónimo no cambia: todo lo de arriba sigue escribiendo en localStorage
// igual que antes. Estas funciones AÑADEN, de forma fire-and-forget, un espejo
// en la cuenta del usuario logueado vía /api/cuaderno:
//   · push*  — al guardar/borrar local, empuja el cambio al servidor (si hay
//              sesión; si es anónimo el endpoint responde {anon:true} y no hace
//              nada). Nunca lanza ni bloquea la UI.
//   · hydrateCuaderno() — al montar el visor: GET del cuaderno de la cuenta,
//              fusiona servidor↔local (dedup por clave natural, gana el más
//              reciente) y, la primera vez con sesión, SUBE lo local existente
//              ("merge up") para no perder lo anotado en anónimo.
//
// El cliente NO conoce la cookie (httpOnly). Sabe si hay sesión por la respuesta
// del GET: `anon:false` ⇒ hay sesión. Mismo método que usa Mis Estudios.
// ─────────────────────────────────────────────────────────────────────────

function postJSON(body: unknown): void {
  if (typeof window === "undefined") return;
  try {
    void fetch("/api/cuaderno", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => {});
  } catch {
    /* noop */
  }
}

function deleteQuery(params: Record<string, string | number>): void {
  if (typeof window === "undefined") return;
  try {
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) qs.set(k, String(v));
    void fetch(`/api/cuaderno?${qs.toString()}`, { method: "DELETE" }).catch(() => {});
  } catch {
    /* noop */
  }
}

function pushNote(n: VerseNote): void {
  postJSON({ kind: "note", ref: n.ref, verse: n.verse, text: n.text, updatedAt: n.updatedAt });
}
function pushDeleteNote(ref: string, verse: number): void {
  deleteQuery({ kind: "note", ref, verse });
}
function pushHighlight(h: Highlight): void {
  postJSON({
    kind: "highlight",
    ref: h.ref,
    verse: h.verse,
    side: h.side,
    start: h.start,
    end: h.end,
    color: h.color,
    updatedAt: h.createdAt,
  });
}
function pushDeleteHighlightRange(
  ref: string,
  verse: number,
  side: VerseSide,
  start: number,
  end: number,
): void {
  deleteQuery({ kind: "highlight", ref, verse, side, start, end });
}

// Escribe la lista local SIN re-empujar al servidor (para la hidratación, que ya
// trae datos del servidor: no queremos un bucle de pushes).
function writeNotesSilent(list: VerseNote[]): void {
  writeAll(NOTES_KEY, list);
}
function writeHighlightsSilent(list: Highlight[]): void {
  writeAll(HL_KEY, list);
}

type ServerNote = { ref: string; verse: number; text: string; updatedAt: string };
type ServerHighlight = {
  ref: string; verse: number; side: VerseSide; start: number; end: number;
  color: HighlightColor; updatedAt: string;
};

// Clave natural de un resaltado (idéntica en local y servidor, sin el id volátil).
function hlNatural(h: { ref: string; verse: number; side: string; start: number; end: number; color: string }): string {
  return `${h.ref}|${h.verse}|${h.side}|${h.start}|${h.end}|${h.color}`;
}

let hydrating = false;
let hydrated = false;
let accountSynced = false; // true cuando hydrate detectó sesión → guardado en la cuenta

/** ¿El cuaderno está ligado a una cuenta (hay sesión)? Para UI ("sincronizado"). */
export function isCuadernoSynced(): boolean {
  return accountSynced;
}

/**
 * Sincroniza el cuaderno con la cuenta. Idempotente y segura en anónimo.
 *  1. GET /api/cuaderno → si `anon` o no hay datos, no hace nada (modo local).
 *  2. Con sesión: fusiona NOTAS por (ref,verse) — gana updatedAt más nuevo — y
 *     RESALTADOS por clave natural (unión: un resaltado existe o no).
 *  3. "Merge up": lo que está SOLO en local se sube al servidor (una vez).
 * Tras fusionar, reescribe localStorage y emite el evento para re-renderizar.
 * Devuelve true si hubo sesión (y por tanto sincronizó), false si anónimo.
 */
export async function hydrateCuaderno(force = false): Promise<boolean> {
  if (typeof window === "undefined") return false;
  if (hydrating) return hydrated;
  if (hydrated && !force) return true;
  hydrating = true;
  try {
    const res = await fetch("/api/cuaderno", { cache: "no-store" });
    const data = (await res.json()) as {
      ok?: boolean; anon?: boolean; notes?: ServerNote[]; highlights?: ServerHighlight[];
    };
    if (!data || data.anon) {
      // Sesión cerrada: limpiar la marca para que un futuro login vuelva a subir.
      accountSynced = false;
      try { window.localStorage.removeItem(SYNCED_KEY); } catch { /* noop */ }
      return false;
    }
    accountSynced = true;

    const serverNotes = Array.isArray(data.notes) ? data.notes : [];
    const serverHls = Array.isArray(data.highlights) ? data.highlights : [];
    const localNotes = listNotes();
    const localHls = listHighlights();

    const firstSync = (() => {
      try { return window.localStorage.getItem(SYNCED_KEY) !== "1"; } catch { return true; }
    })();

    // ── NOTAS: fusión por (ref,verse), gana el updatedAt más reciente ───────
    const noteMap = new Map<string, VerseNote>();
    const noteKey = (n: { ref: string; verse: number }) => `${n.ref}|${n.verse}`;
    for (const s of serverNotes) {
      noteMap.set(noteKey(s), { ref: s.ref, verse: s.verse, text: s.text, updatedAt: s.updatedAt });
    }
    const notesToPush: VerseNote[] = [];
    for (const l of localNotes) {
      const k = noteKey(l);
      const onServer = noteMap.get(k);
      if (!onServer) {
        noteMap.set(k, l);
        if (firstSync) notesToPush.push(l); // existe solo local → subir
      } else if (new Date(l.updatedAt).getTime() > new Date(onServer.updatedAt).getTime()) {
        noteMap.set(k, l);
        notesToPush.push(l); // local más nuevo → gana y se sube
      }
    }

    // ── RESALTADOS: unión por clave natural ────────────────────────────────
    const hlMap = new Map<string, Highlight>();
    for (const s of serverHls) {
      const nat = hlNatural(s);
      hlMap.set(nat, {
        id: genId(),
        ref: s.ref, verse: s.verse, side: s.side, start: s.start, end: s.end,
        color: s.color, createdAt: s.updatedAt,
      });
    }
    const hlsToPush: Highlight[] = [];
    for (const l of localHls) {
      const nat = hlNatural(l);
      if (!hlMap.has(nat)) {
        hlMap.set(nat, l);
        if (firstSync) hlsToPush.push(l); // existe solo local → subir
      }
    }

    // Reescribir local con la fusión (sin re-empujar todo).
    writeNotesSilent([...noteMap.values()]);
    writeHighlightsSilent([...hlMap.values()]);
    notify();

    // "Merge up": subir lo que faltaba en el servidor (fire-and-forget).
    for (const n of notesToPush) pushNote(n);
    for (const h of hlsToPush) pushHighlight(h);

    try { window.localStorage.setItem(SYNCED_KEY, "1"); } catch { /* noop */ }
    hydrated = true;
    return true;
  } catch {
    return false; // sin red / error → modo local, sin romper nada
  } finally {
    hydrating = false;
  }
}
