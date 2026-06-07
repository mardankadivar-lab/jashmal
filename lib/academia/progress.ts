// ─────────────────────────────────────────────────────────────────────────
// progress.ts — progreso del estudiante en el Módulo 1 (localStorage).
//
// MÍNIMO viable: se guarda en el navegador (por dispositivo). El alumno con
// cuenta (login mágico) ya tiene su camino "guardado" para retomar el flujo;
// la sincronización del progreso de lecciones a la BD por usuario queda como
// mejora futura (no hay tabla de progreso por usuario todavía). Mientras tanto,
// localStorage retoma exactamente donde quedó.
//
// Es client-only: todo está protegido con `typeof window`.
// ─────────────────────────────────────────────────────────────────────────

import { LESSONS } from "./modulo1";

export const M1_KEY = "jashmal:academia:m1:v1";
// Evento que se emite al guardar, para que vistas abiertas (mapa) se refresquen.
export const M1_EVENT = "jashmal:academia:progress";

export type M1Progress = {
  completed: string[]; // slugs completados
  last?: string;       // último slug visitado/completado (para "retomar")
  updatedAt: number;
};

const EMPTY: M1Progress = { completed: [], updatedAt: 0 };

export function readProgress(): M1Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(M1_KEY);
    if (!raw) return EMPTY;
    const p = JSON.parse(raw) as Partial<M1Progress>;
    if (!p || !Array.isArray(p.completed)) return EMPTY;
    const valid = new Set(LESSONS.map((l) => l.slug));
    return {
      completed: p.completed.filter((s): s is string => typeof s === "string" && valid.has(s)),
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

export function markComplete(slug: string): M1Progress {
  const p = readProgress();
  const completed = p.completed.includes(slug) ? p.completed : [...p.completed, slug];
  const next: M1Progress = { completed, last: slug, updatedAt: Date.now() };
  write(next);
  return next;
}

export function setLast(slug: string): void {
  const p = readProgress();
  write({ ...p, last: slug, updatedAt: Date.now() });
}

export function isComplete(slug: string, p?: M1Progress): boolean {
  return (p ?? readProgress()).completed.includes(slug);
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
