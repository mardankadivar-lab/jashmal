// ─────────────────────────────────────────────────────────────────────────
// progress.ts — progreso del estudiante en el Módulo 1 (localStorage).
//
// ESTADOS:
//   locked    → lección no accesible todavía
//   available → accesible (la anterior está al menos vista o es la primera)
//   seen      → el estudiante llegó al sello (חֲתִימָה) de la lección
//   completed → la tarea fue entregada (marca el verdadero "terminar")
//
// El mapa muestra:
//   seen      → borde dorado (outline)
//   completed → relleno dorado
//
// Es client-only: todo está protegido con `typeof window`.
// ─────────────────────────────────────────────────────────────────────────

import { LESSONS } from "./modulo1";

export const M1_KEY = "jashmal:academia:m1:v2"; // v2 — agrega campo `seen`
const M1_KEY_V1 = "jashmal:academia:m1:v1";     // clave anterior (migración)
// Evento que se emite al guardar, para que vistas abiertas (mapa) se refresquen.
export const M1_EVENT = "jashmal:academia:progress";

export type LessonEstado = "locked" | "available" | "seen" | "completed";

export type M1Progress = {
  completed: string[]; // slugs con tarea entregada
  seen: string[];      // slugs donde el estudiante llegó al sello
  last?: string;       // último slug visitado (para "retomar")
  updatedAt: number;
};

const EMPTY: M1Progress = { completed: [], seen: [], updatedAt: 0 };

// Migrar datos de v1 (solo `completed`) al nuevo formato v2.
function migrateFromV1(): M1Progress | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(M1_KEY_V1);
    if (!raw) return null;
    const p = JSON.parse(raw) as { completed?: string[]; last?: string; updatedAt?: number };
    if (!p || !Array.isArray(p.completed)) return null;
    const valid = new Set(LESSONS.map((l) => l.slug));
    const completed = p.completed.filter(
      (s): s is string => typeof s === "string" && valid.has(s),
    );
    return {
      completed,
      seen: completed, // los ya completados también se consideran vistos
      last: typeof p.last === "string" ? p.last : undefined,
      updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : 0,
    };
  } catch {
    return null;
  }
}

export function readProgress(): M1Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(M1_KEY);
    if (!raw) {
      const migrated = migrateFromV1();
      if (migrated) {
        write(migrated);
        return migrated;
      }
      return EMPTY;
    }
    const p = JSON.parse(raw) as Partial<M1Progress>;
    if (!p || !Array.isArray(p.completed)) return EMPTY;
    const valid = new Set(LESSONS.map((l) => l.slug));
    return {
      completed: p.completed.filter((s): s is string => typeof s === "string" && valid.has(s)),
      seen: Array.isArray(p.seen)
        ? p.seen.filter((s): s is string => typeof s === "string" && valid.has(s))
        : [],
      last: typeof p.last === "string" ? p.last : undefined,
      updatedAt: typeof p.updatedAt === "number" ? p.updatedAt : 0,
    };
  } catch {
    return EMPTY;
  }
}

function write(p: M1Progress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(M1_KEY, JSON.stringify(p));
    window.dispatchEvent(new Event(M1_EVENT));
  } catch {
    /* almacenamiento lleno o bloqueado: el flujo sigue, solo no persiste */
  }
}

// Marcar como vista (el estudiante llegó al sello). No sobreescribe "completed".
export function markSeen(slug: string): M1Progress {
  const p = readProgress();
  const seen = p.seen.includes(slug) ? p.seen : [...p.seen, slug];
  const next: M1Progress = { ...p, seen, last: slug, updatedAt: Date.now() };
  write(next);
  return next;
}

// Marcar como completada (tarea entregada). También marca como vista.
export function markComplete(slug: string): M1Progress {
  const p = readProgress();
  const completed = p.completed.includes(slug) ? p.completed : [...p.completed, slug];
  const seen = p.seen.includes(slug) ? p.seen : [...p.seen, slug];
  const next: M1Progress = { completed, seen, last: slug, updatedAt: Date.now() };
  write(next);
  return next;
}

export function setLast(slug: string): void {
  const p = readProgress();
  write({ ...p, last: slug, updatedAt: Date.now() });
}

export function isSeen(slug: string, p?: M1Progress): boolean {
  return (p ?? readProgress()).seen.includes(slug);
}

export function isComplete(slug: string, p?: M1Progress): boolean {
  return (p ?? readProgress()).completed.includes(slug);
}

// Estado completo de una lección para el mapa.
export function getLessonEstado(slug: string, lessonN: number, p?: M1Progress): LessonEstado {
  const prog = p ?? readProgress();
  if (prog.completed.includes(slug)) return "completed";
  if (prog.seen.includes(slug)) return "seen";
  if (lessonN === 1) return "available";
  const prev = LESSONS[lessonN - 2]; // lessonN es 1-based
  if (prev && (prog.seen.includes(prev.slug) || prog.completed.includes(prev.slug))) {
    return "available";
  }
  return "locked";
}

// Primer slug NO completado, en orden — "la próxima piedra". null si están todas.
export function nextOpenSlug(p?: M1Progress): string | null {
  const prog = p ?? readProgress();
  const open = LESSONS.find((l) => !prog.completed.includes(l.slug));
  return open ? open.slug : null;
}

export function allComplete(p?: M1Progress): boolean {
  const prog = p ?? readProgress();
  return LESSONS.every((l) => prog.completed.includes(l.slug));
}

// Verifica si todos los slugs de un módulo están completados.
// Usado por los mapas de módulos superiores para comprobar si el módulo anterior está cerrado.
export function isModuleComplete(moduleSlugList: string[], p?: M1Progress): boolean {
  const prog = p ?? readProgress();
  return moduleSlugList.every((slug) => prog.completed.includes(slug));
}
