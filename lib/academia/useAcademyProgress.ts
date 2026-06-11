"use client";

// ═══════════════════════════════════════════════════════════════════════════
// useAcademyProgress — persistencia del progreso en localStorage (sin auth).
// MÍNIMO viable: por dispositivo. Cuando exista progreso por usuario en BD, este
// hook es el único punto a reconectar (read/write → API). El resto del sistema
// (lógica pura, UI) no cambia.
//
// Hidratación SEGURA: arranca con progreso VACÍO y now=0 (igual que el SSR) y
// rehidrata en useEffect → sin desajuste de hidratación. El muro de tiempo usa
// `now` real solo tras montar en el cliente.
// ═══════════════════════════════════════════════════════════════════════════
import { useCallback, useEffect, useMemo, useState } from "react";
import type { FinalProjectStatus } from "@/lib/academia/curriculum";
import { emptyAcademyProgress, type AcademyProgress } from "@/lib/academia/unlock";
import * as A from "@/lib/academia/actions";

const KEY = "jashmal:academia:progress:v1";

function read(): AcademyProgress {
  if (typeof window === "undefined") return emptyAcademyProgress();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyAcademyProgress();
    const p = JSON.parse(raw) as Partial<AcademyProgress>;
    if (!p || !Array.isArray(p.levels)) return emptyAcademyProgress();
    return { userId: typeof p.userId === "string" ? p.userId : "local", levels: p.levels };
  } catch {
    return emptyAcademyProgress();
  }
}
function write(p: AcademyProgress): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* almacenamiento lleno o bloqueado: el flujo sigue, solo no persiste */
  }
}

export interface AcademyActions {
  start: (levelId: string) => void;
  toggleModule: (levelId: string, moduleId: string) => void;
  addJournal: (levelId: string, week: number) => void;
  setQuiz: (levelId: string, quizId: string, score: number) => void;
  setProject: (levelId: string, status: FinalProjectStatus) => void;
  reset: () => void;
}

export function useAcademyProgress(): {
  progress: AcademyProgress;
  now: number;
  hydrated: boolean;
  actions: AcademyActions;
} {
  const [progress, setProgress] = useState<AcademyProgress>(() => emptyAcademyProgress());
  const [now, setNow] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setProgress(read());
    setNow(Date.now());
    setHydrated(true);
  }, []);

  const commit = useCallback((next: AcademyProgress) => {
    setProgress(next);
    write(next);
  }, []);

  const actions = useMemo<AcademyActions>(
    () => ({
      start: (levelId) => commit(A.startLevel(progress, levelId, Date.now())),
      toggleModule: (levelId, moduleId) => commit(A.toggleModule(progress, levelId, moduleId, Date.now())),
      addJournal: (levelId, week) => commit(A.addJournalEntry(progress, levelId, week, "", Date.now())),
      setQuiz: (levelId, quizId, score) => commit(A.setQuizScore(progress, levelId, quizId, score, Date.now())),
      setProject: (levelId, status) => commit(A.setProjectStatus(progress, levelId, status, Date.now())),
      reset: () => commit(A.resetAll(progress.userId)),
    }),
    [progress, commit],
  );

  // `now` solo cuenta tras hidratar (en SSR/primer render es 0 → estado vacío estable).
  return { progress, now: hydrated ? now : 0, hydrated, actions };
}
