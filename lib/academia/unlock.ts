// ═══════════════════════════════════════════════════════════════════════════
// unlock.ts — JASHMAL ACADEMIA · Lógica PURA de progreso y desbloqueo
// ═══════════════════════════════════════════════════════════════════════════
// Funciones SIN estado ni efectos: reciben el progreso y `now` (epoch ms) como
// parámetros → deterministas y testeables (puedes pasar un `now` futuro para
// simular). La persistencia (localStorage) y la UI viven en otros commits.
//
// REGLA DURA (el corazón del sistema): marcar checkboxes NO basta. El tiempo
// mínimo se valida aparte — aunque el estudiante marque los 12 módulos en un
// día, SHOEL sigue bloqueado hasta cumplir 84 días reales desde startedAt.
//
// Separado de Comunidad: aquí no hay estrellas, jidushim ni rangos comunitarios.
// ═══════════════════════════════════════════════════════════════════════════
import {
  ACADEMY_LEVELS,
  getLevel,
  prevLevel,
  requiredModuleCount,
  type AcademyLevel,
  type Requirement,
  type StudentProgress,
  type FinalProjectStatus,
  type LevelStatus,
} from "@/lib/academia/curriculum";

const DAY_MS = 24 * 60 * 60 * 1000;

// ── Estado global del estudiante: el progreso de cada nivel que ha iniciado ──
// Cada StudentProgress ya lleva su propio `levelId`, así que un array basta
// (sin redundar la clave). `userId = "local"` mientras no haya auth por usuario.
export interface AcademyProgress {
  userId: string;
  levels: StudentProgress[];
}
export const emptyAcademyProgress = (userId = "local"): AcademyProgress => ({ userId, levels: [] });
export function progressForLevel(p: AcademyProgress, levelId: string): StudentProgress | undefined {
  return p.levels.find((x) => x.levelId === levelId);
}

// ── Utilidades puras ─────────────────────────────────────────────────────────
export function daysSince(startedAt: number, now: number): number {
  return Math.floor((now - startedAt) / DAY_MS);
}
const PROJECT_ORDER: FinalProjectStatus[] = ["not_started", "draft", "submitted", "reviewed", "approved"];
export function projectRank(s: FinalProjectStatus): number {
  return Math.max(0, PROJECT_ORDER.indexOf(s));
}
function completedRequiredModules(level: AcademyLevel, lp: StudentProgress): number {
  const req = new Set(level.modules.filter((m) => m.required).map((m) => m.id));
  return lp.completedModules.filter((id) => req.has(id)).length;
}
function finalQuiz(level: AcademyLevel): { id: string; pass: number } | null {
  const m = level.modules.find((mm) => mm.quiz);
  return m?.quiz ? { id: m.quiz.id, pass: m.quiz.passingScore } : null;
}
function levelRequiresProject(level: AcademyLevel): boolean {
  return level.modules.some((m) => m.practices.some((pr) => pr.kind === "study"));
}

// ── ¿Está COMPLETO un nivel? (autónomo: tiempo + módulos + examen + proyecto + diario) ──
// Para TALMID equivale exactamente a los requisitos que SHOEL pide. Para los
// niveles aún resumidos (sin módulos) la completitud se definirá cuando tengan
// contenido; por ahora están bloqueados y no se evalúan en la práctica.
export function isLevelComplete(levelId: string, p: AcademyProgress, now: number): boolean {
  const level = getLevel(levelId);
  if (!level) return false;
  const lp = progressForLevel(p, levelId);
  if (!lp) return false;

  const timeOk = daysSince(lp.startedAt, now) >= level.minDaysRequired; // ← muro de tiempo
  const modulesOk = completedRequiredModules(level, lp) >= requiredModuleCount(level);
  const fq = finalQuiz(level);
  const quizOk = !fq || (lp.quizScores[fq.id] ?? 0) >= fq.pass;
  const projectOk = !levelRequiresProject(level) || lp.finalProjectStatus === "approved";
  const journalOk = lp.journalEntries.length >= level.durationWeeks;

  return timeOk && modulesOk && quizOk && projectOk && journalOk;
}

// ── Evaluar UN requisito de desbloqueo contra el progreso del nivel previo ──
export interface ReqStatus {
  req: Requirement;
  met: boolean;
  current: number;   // valor logrado (días, módulos, nota, entradas, rango…)
  required: number;  // umbral a alcanzar
}
export function evalRequirement(
  req: Requirement,
  prev: AcademyLevel,
  p: AcademyProgress,
  now: number,
): ReqStatus {
  const lp = progressForLevel(p, prev.id);
  switch (req.type) {
    case "time": {
      const required = Number(req.requiredValue);
      const current = lp ? daysSince(lp.startedAt, now) : 0;
      return { req, current, required, met: current >= required };
    }
    case "modules": {
      const required = req.requiredValue === "all" ? requiredModuleCount(prev) : Number(req.requiredValue);
      const current = lp ? completedRequiredModules(prev, lp) : 0;
      return { req, current, required, met: required > 0 ? current >= required : true };
    }
    case "quiz": {
      const required = Number(req.requiredValue);
      const fq = finalQuiz(prev);
      const current = lp && fq ? (lp.quizScores[fq.id] ?? 0) : 0;
      return { req, current, required, met: current >= required };
    }
    case "journal": {
      const required = Number(req.requiredValue);
      const current = lp ? lp.journalEntries.length : 0;
      return { req, current, required, met: current >= required };
    }
    case "project": {
      const required = projectRank(String(req.requiredValue) as FinalProjectStatus);
      const current = lp ? projectRank(lp.finalProjectStatus) : 0;
      return { req, current, required, met: current >= required };
    }
    case "review": {
      // "X-complete" → completar el nivel anterior por entero
      if (req.id.endsWith("-complete")) {
        const met = isLevelComplete(prev.id, p, now);
        return { req, current: met ? 1 : 0, required: 1, met };
      }
      // otro hito cualitativo (p.ej. "lectura base"): derivado de módulos required
      const required = requiredModuleCount(prev);
      const current = lp ? completedRequiredModules(prev, lp) : 0;
      return { req, current, required, met: required > 0 && current >= required };
    }
    default:
      return { req, current: 0, required: 0, met: false };
  }
}

// ── Estado de TODOS los requisitos de un nivel (para la UI: ✓/faltan N) ─────
export function requirementStatuses(levelId: string, p: AcademyProgress, now: number): ReqStatus[] {
  const level = getLevel(levelId);
  if (!level) return [];
  const prev = prevLevel(level);
  if (!prev) return []; // TALMID no se desbloquea: está abierto
  return level.unlockRequirements.map((req) => evalRequirement(req, prev, p, now));
}

// Los requisitos que AÚN faltan (para "te faltan 8 semanas, 5 módulos…").
export function getMissingRequirements(levelId: string, p: AcademyProgress, now: number): Requirement[] {
  return requirementStatuses(levelId, p, now).filter((s) => !s.met).map((s) => s.req);
}

// ── Desbloqueo y acceso ──────────────────────────────────────────────────────
export function canUnlockLevel(levelId: string, p: AcademyProgress, now: number): boolean {
  const level = getLevel(levelId);
  if (!level) return false;
  if (level.unlockRequirements.length === 0) return level.initialStatus === "available";
  return requirementStatuses(levelId, p, now).every((s) => s.met);
}
export function canAccessLevel(levelId: string, p: AcademyProgress, now: number): boolean {
  const level = getLevel(levelId);
  if (!level) return false;
  if (level.initialStatus === "available") return true; // TALMID, siempre
  return canUnlockLevel(levelId, p, now);
}
export function statusOf(levelId: string, p: AcademyProgress, now: number): LevelStatus {
  if (isLevelComplete(levelId, p, now)) return "completed";
  if (canAccessLevel(levelId, p, now)) return "available";
  return "locked";
}

// Un módulo está disponible si su nivel es accesible Y los módulos required de
// semanas anteriores ya están completos (avance secuencial dentro del nivel).
export function canAccessModule(levelId: string, moduleId: string, p: AcademyProgress, now: number): boolean {
  if (!canAccessLevel(levelId, p, now)) return false;
  const level = getLevel(levelId);
  const mod = level?.modules.find((m) => m.id === moduleId);
  if (!level || !mod) return false;
  const lp = progressForLevel(p, levelId);
  if (!lp) return mod.week === 1; // sin progreso, solo la primera semana
  const earlier = level.modules.filter((m) => m.required && m.week < mod.week);
  return earlier.every((m) => lp.completedModules.includes(m.id));
}

// ── Tiempo mínimo que falta para DESBLOQUEAR un nivel (días) ────────────────
// Mide el muro de tiempo del nivel PREVIO (p.ej. SHOEL espera 84 días de TALMID).
export function getMinimumTimeRemaining(levelId: string, p: AcademyProgress, now: number): number {
  const level = getLevel(levelId);
  const prev = level ? prevLevel(level) : undefined;
  if (!prev) return 0;
  const lp = progressForLevel(p, prev.id);
  if (!lp) return prev.minDaysRequired;
  return Math.max(0, prev.minDaysRequired - daysSince(lp.startedAt, now));
}

// ── Resumen del progreso DENTRO de un nivel (para la barra de avance) ────────
export interface LevelProgressView {
  levelId: string;
  status: LevelStatus;
  started: boolean;
  totalRequired: number;
  completed: number;
  pct: number;            // 0–100 por módulos
  daysElapsed: number;
  daysRemaining: number;  // del muro de tiempo del PROPIO nivel
  journalCount: number;
  projectStatus: FinalProjectStatus;
}
export function getLevelProgress(levelId: string, p: AcademyProgress, now: number): LevelProgressView {
  const level = getLevel(levelId);
  const lp = level ? progressForLevel(p, levelId) : undefined;
  const totalRequired = level ? requiredModuleCount(level) : 0;
  const completed = level && lp ? completedRequiredModules(level, lp) : 0;
  const daysElapsed = lp ? daysSince(lp.startedAt, now) : 0;
  const minDays = level?.minDaysRequired ?? 0;
  return {
    levelId,
    status: statusOf(levelId, p, now),
    started: !!lp,
    totalRequired,
    completed,
    pct: totalRequired ? Math.round((completed / totalRequired) * 100) : 0,
    daysElapsed,
    daysRemaining: Math.max(0, minDays - daysElapsed),
    journalCount: lp?.journalEntries.length ?? 0,
    projectStatus: lp?.finalProjectStatus ?? "not_started",
  };
}

// Ids de niveles accesibles ahora mismo (TALMID + los desbloqueados).
export function unlockedLevelIds(p: AcademyProgress, now: number): string[] {
  return ACADEMY_LEVELS.filter((l) => canAccessLevel(l.id, p, now)).map((l) => l.id);
}
