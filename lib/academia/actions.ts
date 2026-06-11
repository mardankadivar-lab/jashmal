// ═══════════════════════════════════════════════════════════════════════════
// actions.ts — JASHMAL ACADEMIA · Constructores PUROS del progreso
// ═══════════════════════════════════════════════════════════════════════════
// Funciones inmutables: reciben el progreso y devuelven uno NUEVO (no mutan).
// No tocan localStorage ni React — esa capa vive en useAcademyProgress (client).
// `now` se pasa desde fuera (epoch ms) para mantener la pureza.
// ═══════════════════════════════════════════════════════════════════════════
import type { FinalProjectStatus, StudentProgress } from "@/lib/academia/curriculum";
import { emptyAcademyProgress, type AcademyProgress } from "@/lib/academia/unlock";

function newLevelProgress(userId: string, levelId: string, now: number): StudentProgress {
  return {
    userId,
    levelId,
    startedAt: now,
    completedModules: [],
    quizScores: {},
    journalEntries: [],
    finalProjectStatus: "not_started",
    unlockedLevels: [],
  };
}

// Aplica una transformación al progreso de UN nivel (creándolo si hace falta).
function patchLevel(
  p: AcademyProgress,
  levelId: string,
  now: number,
  fn: (lp: StudentProgress) => StudentProgress,
): AcademyProgress {
  const exists = p.levels.some((l) => l.levelId === levelId);
  const levels = exists
    ? p.levels.map((l) => (l.levelId === levelId ? fn(l) : l))
    : [...p.levels, fn(newLevelProgress(p.userId, levelId, now))];
  return { ...p, levels };
}

/** Inicia un nivel: fija startedAt = now (el reloj del muro de tiempo arranca aquí). */
export function startLevel(p: AcademyProgress, levelId: string, now: number): AcademyProgress {
  if (p.levels.some((l) => l.levelId === levelId)) return p; // ya iniciado: no reinicia el reloj
  return patchLevel(p, levelId, now, (lp) => lp);
}

/** Alterna un módulo como completado / no completado. */
export function toggleModule(p: AcademyProgress, levelId: string, moduleId: string, now: number): AcademyProgress {
  return patchLevel(p, levelId, now, (lp) => {
    const has = lp.completedModules.includes(moduleId);
    return {
      ...lp,
      completedModules: has
        ? lp.completedModules.filter((id) => id !== moduleId)
        : [...lp.completedModules, moduleId],
    };
  });
}

/** Añade una entrada de diario (una por semana). */
export function addJournalEntry(
  p: AcademyProgress,
  levelId: string,
  week: number,
  text: string,
  now: number,
): AcademyProgress {
  return patchLevel(p, levelId, now, (lp) => ({
    ...lp,
    journalEntries: [...lp.journalEntries, { id: `j-${week}-${lp.journalEntries.length}`, week, createdAt: now, text }],
  }));
}

/** Registra la nota de una evaluación. */
export function setQuizScore(p: AcademyProgress, levelId: string, quizId: string, score: number, now: number): AcademyProgress {
  return patchLevel(p, levelId, now, (lp) => ({ ...lp, quizScores: { ...lp.quizScores, [quizId]: score } }));
}

/** Cambia el estado del proyecto final. */
export function setProjectStatus(p: AcademyProgress, levelId: string, status: FinalProjectStatus, now: number): AcademyProgress {
  return patchLevel(p, levelId, now, (lp) => ({ ...lp, finalProjectStatus: status }));
}

/** Borra todo el progreso (volver a empezar). */
export function resetAll(userId = "local"): AcademyProgress {
  return emptyAcademyProgress(userId);
}
