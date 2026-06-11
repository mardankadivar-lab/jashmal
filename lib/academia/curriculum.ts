// ═══════════════════════════════════════════════════════════════════════════
// curriculum.ts — JASHMAL ACADEMIA · Modelo de datos del currículo
// ═══════════════════════════════════════════════════════════════════════════
// Sistema de FORMACIÓN académica (universidad espiritual/textual). Es un eje
// SEPARADO de la Comunidad: aquí se avanza por estudio, tiempo mínimo, módulos,
// evaluaciones, diario y proyecto final — NO por estrellas/jidushim. No toca
// lib/community/communityLevels.ts ni la lógica de aportes.
//
// COMMIT 1: solo el MODELO DE DATOS + los datos de los 6 niveles. TALMID lleva
// sus 12 semanas (esqueleto con metadatos sólidos; el contenido rico se expande
// en commits posteriores). Los niveles superiores quedan resumidos y bloqueados.
// La lógica pura de desbloqueo (canAccessLevel…) va en el COMMIT 2 (unlock.ts).
// Aquí NO hay UI ni base de datos.
//
// Nomenclatura verificada por el Sofer (editor-erudito) contra fuentes reales:
// TALMID es grado formal de yeshiva; SHOEL/DORESH/MEVIN/SOFER/MEKUBAL son etapas
// temáticas propias de Jashmal nombradas con vocabulario auténtico de la
// tradición (Pirkei Avot 1:1, 5:7, 5:21, 6:6; Ezra 7:10; Nehemías 8:8). El
// concepto de niveles que se desbloquean en secuencia tiene ancla clásica en
// Avot 5:21 (Mikrá→Mishná→Talmud por edades).
// ═══════════════════════════════════════════════════════════════════════════
import type { Locale } from "@/i18n/routing";
import { tri, type Picked } from "@/lib/i18n/i18nContent";

// ── Texto localizable (política honesta: es obligatorio; fa/en opcionales) ───
// Mismo principio que lib/i18n/content.ts: el español es canónico y respaldo;
// si falta fa/en, tri() marca `missing` para que la UI ponga el badge (nunca
// mezcla silenciosa). Helper `lt()` para escribir cómodo.
export interface LocalizedText {
  es: string;
  fa?: string;
  en?: string;
}
export const lt = (es: string, fa?: string, en?: string): LocalizedText => ({ es, fa, en });
/** Resuelve un LocalizedText al idioma activo con respaldo honesto. */
export function resolveText(locale: Locale, t: LocalizedText): Picked {
  return tri(locale, t.es, t.fa, t.en);
}

// ── Estados ──────────────────────────────────────────────────────────────────
export type LevelStatus = "locked" | "available" | "completed";
export type ModuleStatus = "locked" | "available" | "completed";
export type FinalProjectStatus = "not_started" | "draft" | "submitted" | "reviewed" | "approved";

// ── Requisitos de desbloqueo (DATOS, no hardcodeados en la UI) ──────────────
// type = la dimensión que se mide; requiredValue = el umbral a cumplir.
//   time     → días mínimos desde startedAt (el muro anti-atajo)
//   modules  → nº de módulos obligatorios completados (o "all")
//   quiz     → nota mínima del examen final (0–100)
//   journal  → nº de entradas de diario
//   project  → estado mínimo del proyecto final (p.ej. "approved")
//   review   → hito cualitativo (completar nivel anterior, lectura base…)
export type RequirementType = "time" | "modules" | "quiz" | "journal" | "project" | "review";
export interface Requirement {
  id: string;
  type: RequirementType;
  description: LocalizedText;
  requiredValue: number | string | boolean;
}

// ── Lecturas y prácticas de un módulo ───────────────────────────────────────
export type ReadingKind = "tanakh" | "talmud" | "midrash" | "zohar" | "internal" | "glossary";
export interface Reading {
  id: string;
  kind: ReadingKind;
  ref: string;            // cita exacta (libro cap:vers / folio) o slug interno
  label: LocalizedText;
  required: boolean;
}
export type PracticeKind = "journal" | "exercise" | "reflection" | "study";
export interface Practice {
  id: string;
  kind: PracticeKind;
  prompt: LocalizedText;
}

// ── Evaluación (quiz por módulo o final) ────────────────────────────────────
export interface QuizQuestion {
  id: string;
  prompt: LocalizedText;
  options: LocalizedText[];
  correctIndex: number;
}
export interface Quiz {
  id: string;
  passingScore: number;   // 0–100
  questions: QuizQuestion[];
}

// ── Módulo (una semana) ─────────────────────────────────────────────────────
export interface AcademyModule {
  id: string;
  levelId: string;
  week: number;
  title: LocalizedText;
  description: LocalizedText;
  learningObjectives: LocalizedText[];
  keyConcepts: string[];     // términos del glosario (hebreo/transliterado)
  readings: Reading[];
  practices: Practice[];
  quiz?: Quiz;
  required: boolean;
  estimatedHours: number;
  lessonSlug?: string;       // enlace a una lección rica ya existente (modulo1.ts)
}

// ── Nivel académico ─────────────────────────────────────────────────────────
export interface AcademyLevel {
  id: string;
  rank: number;                 // 1..6
  slug: string;
  name: string;                 // nombre académico (TALMID…), igual en todo idioma
  he: string;                   // hebreo con nikud
  translit: string;
  subtitle: LocalizedText;      // rótulo corto para la tarjeta
  description: LocalizedText;
  glossNote?: LocalizedText;    // glosa aclaratoria (SOFER, MEKUBAL) — verificada por el Sofer
  durationWeeks: number;
  minDaysRequired: number;      // muro de tiempo (días desde startedAt)
  initialStatus: LevelStatus;   // "available" solo TALMID; el resto "locked"
  unlockRequirements: Requirement[]; // qué hay que cumplir para ABRIR este nivel
  modules: AcademyModule[];     // TALMID: 12; niveles superiores: [] (resumidos)
}

// ── Progreso del estudiante (sin auth: localStorage; listo para BD futura) ───
export interface JournalEntry {
  id: string;
  week: number;
  createdAt: number;            // epoch ms — se sella en runtime, NO en estos datos
  text: string;
}
export type QuizScore = number; // 0–100
export interface StudentProgress {
  userId: string;               // "local" mientras no haya auth por usuario
  levelId: string;              // nivel en curso
  startedAt: number;            // epoch ms del inicio del nivel (clave del muro de tiempo)
  completedAt?: number;
  completedModules: string[];   // ids de módulos completados
  quizScores: Record<string, QuizScore>; // por quizId
  journalEntries: JournalEntry[];
  finalProjectStatus: FinalProjectStatus;
  unlockedLevels: string[];     // ids de niveles desbloqueados
}

// ── Constantes de ritmo ─────────────────────────────────────────────────────
const DAYS_PER_WEEK = 7;
const TALMID_WEEKS = 12;            // 3 meses
const TALMID_MIN_DAYS = TALMID_WEEKS * DAYS_PER_WEEK; // 84 días — no se puede antes
const TALMID_PASS = 80;             // nota mínima del examen final

// ═══════════════════════════════════════════════════════════════════════════
//  TALMID — las 12 semanas (esqueleto; contenido rico se expande luego)
// ═══════════════════════════════════════════════════════════════════════════
function mod(
  week: number,
  title: LocalizedText,
  description: LocalizedText,
  objectives: LocalizedText[],
  keyConcepts: string[],
  extra: Partial<AcademyModule> = {},
): AcademyModule {
  return {
    id: `talmid-w${week}`,
    levelId: "talmid",
    week,
    title,
    description,
    learningObjectives: objectives,
    keyConcepts,
    readings: extra.readings ?? [],
    practices: extra.practices ?? [
      { id: `talmid-w${week}-journal`, kind: "journal", prompt: lt("Escribe una entrada de diario sobre lo que aprendiste esta semana y una pregunta que te quedó.") },
    ],
    quiz: extra.quiz,
    required: true,
    estimatedHours: extra.estimatedHours ?? 3,
    lessonSlug: extra.lessonSlug,
  };
}

const TALMID_MODULES: AcademyModule[] = [
  // ── Mes 1 — Fundamentos bíblicos y lenguaje sagrado ──
  mod(1,
    lt("¿Qué es la Torá?"),
    lt("Qué es la Torá y qué es el Tanaj; la diferencia entre Torá escrita y tradición oral; qué significa estudiar con reverencia."),
    [lt("Distinguir Torá escrita de tradición oral"), lt("Entender el estudio como acto de reverencia")],
    ["Bereshit", "Shemot", "mitzvah", "brit", "emunah", "teshuvah"],
    { lessonSlug: "que-es-la-tora", readings: [{ id: "t1r1", kind: "tanakh", ref: "Genesis 1:1", label: lt("El primer versículo de la Torá"), required: true }] },
  ),
  mod(2,
    lt("La estructura de la Biblia hebrea"),
    lt("Torá, Neviim y Ketuvim; qué es una parashá, un capítulo y un versículo; cómo se cita una fuente."),
    [lt("Conocer las tres partes del Tanaj"), lt("Aprender a citar una fuente correctamente")],
    ["Tanaj", "Torá", "Neviim", "Ketuvim", "parashá"],
    { lessonSlug: "que-es-el-tanaj" },
  ),
  mod(3,
    lt("Los personajes fundacionales"),
    lt("Mapa básico de los personajes: Adam, Javá, Nóaj, Abraham, Sará, Itzjak, Rivka, Yaakov, Rajel, Lea, Yosef, Moshé. Aún sin Cabalá profunda."),
    [lt("Ubicar a los personajes fundacionales en su orden"), lt("Reconocer su papel en la narrativa")],
    ["Adam", "Abraham", "Sará", "Yaakov", "Yosef", "Moshé"],
  ),
  mod(4,
    lt("Los temas centrales"),
    lt("Los grandes temas que recorren la Torá: creación, pacto, exilio, retorno, luz, ocultamiento, pecado, reparación y bendición."),
    [lt("Identificar los temas centrales del texto"), lt("Empezar a ver patrones entre relatos")],
    ["creación", "brit (pacto)", "galut (exilio)", "teshuvá (retorno)", "tikún (reparación)"],
  ),
  // ── Mes 2 — Introducción a fuentes y lectura ──
  mod(5,
    lt("¿Qué es el Midrash?"),
    lt("Qué es el Midrash; la diferencia entre pshat (sentido llano) y drash (interpretación); ejemplos simples."),
    [lt("Distinguir pshat de drash"), lt("Leer un midrash sencillo")],
    ["Midrash", "pshat", "drash"],
  ),
  mod(6,
    lt("¿Qué es el Talmud?"),
    lt("Orientación al Talmud: Mishná y Guemará. Solo ubicación, sin entrar todavía en su complejidad."),
    [lt("Distinguir Mishná de Guemará"), lt("Entender qué es una sugya, a grandes rasgos")],
    ["Talmud", "Mishná", "Guemará"],
  ),
  mod(7,
    lt("¿Qué es el Zohar?"),
    lt("Qué es el Zohar y qué es el Sod (el secreto). Advertencia: el Zohar no se estudia sin bases; respeto y gradualidad."),
    [lt("Ubicar el Zohar en la tradición"), lt("Entender por qué el Sod requiere preparación")],
    ["Zohar", "Sod"],
  ),
  mod(8,
    lt("¿Qué es la Cabalá?"),
    lt("Introducción: qué son las sefirot, qué son los mundos, qué es una letra hebrea como canal simbólico. Solo una primera mirada."),
    [lt("Nombrar las sefirot a grandes rasgos"), lt("Entender la letra como canal de consciencia")],
    ["Cabalá", "sefirot", "olamot (mundos)", "otiot (letras)"],
  ),
  // ── Mes 3 — Método Jashmal ──
  mod(9,
    lt("El método PaRDeS"),
    lt("Las cuatro capas de lectura: Pshat, Remez, Drash, Sod. Un ejemplo sencillo aplicado a un versículo."),
    [lt("Reconocer las cuatro capas de PaRDeS"), lt("Aplicar PaRDeS a un versículo simple")],
    ["Pshat", "Remez", "Drash", "Sod", "PaRDeS"],
  ),
  mod(10,
    lt("Cómo estudiar un personaje"),
    lt("Ejemplo con Abraham: Pshat (la historia), Remez (el símbolo), Drash (la enseñanza), Sod (la raíz espiritual)."),
    [lt("Estudiar un personaje por las cuatro capas"), lt("Conectar relato y enseñanza")],
    ["Abraham", "Jésed"],
    { estimatedHours: 4 },
  ),
  mod(11,
    lt("Cómo estudiar un concepto"),
    lt("Ejemplo con un concepto (luz, agua, serpiente, exilio, retorno): conectar Biblia, Midrash y lectura interior."),
    [lt("Rastrear un concepto a través de las fuentes"), lt("Integrar texto y lectura interior")],
    ["or (luz)", "máyim (agua)", "najash (serpiente)"],
    { estimatedHours: 4 },
  ),
  mod(12,
    lt("Proyecto final TALMID"),
    lt("Un estudio básico, con el método Jashmal, de un personaje, un concepto o una letra. Debe incluir: fuente bíblica, explicación simple, glosario, una pregunta, una reflexión personal y una conexión PaRDeS básica."),
    [lt("Producir un primer estudio propio completo"), lt("Aplicar el método de principio a fin")],
    ["proyecto final", "método Jashmal"],
    {
      estimatedHours: 6,
      practices: [
        { id: "talmid-w12-project", kind: "study", prompt: lt("Entrega tu estudio básico: fuente bíblica + explicación + glosario + una pregunta + una reflexión + una conexión PaRDeS.") },
      ],
      quiz: {
        id: "talmid-final",
        passingScore: TALMID_PASS,
        questions: [], // banco de preguntas se llena en un commit posterior
      },
    },
  ),
];

// ═══════════════════════════════════════════════════════════════════════════
//  Requisitos para desbloquear SHOEL (completar TALMID) — como DATOS
// ═══════════════════════════════════════════════════════════════════════════
const UNLOCK_SHOEL: Requirement[] = [
  { id: "shoel-req-time", type: "time", requiredValue: TALMID_MIN_DAYS,
    description: lt(`Mínimo ${TALMID_WEEKS} semanas de estudio desde el inicio de TALMID (no se puede antes, aunque marques todo como hecho).`) },
  { id: "shoel-req-modules", type: "modules", requiredValue: "all",
    description: lt("100% de los módulos obligatorios de TALMID completados.") },
  { id: "shoel-req-quiz", type: "quiz", requiredValue: TALMID_PASS,
    description: lt(`Evaluación final de TALMID aprobada (mínimo ${TALMID_PASS}%).`) },
  { id: "shoel-req-journal", type: "journal", requiredValue: TALMID_WEEKS,
    description: lt(`Diario de estudio con al menos ${TALMID_WEEKS} entradas (una por semana).`) },
  { id: "shoel-req-project", type: "project", requiredValue: "approved",
    description: lt("Proyecto final entregado y aprobado.") },
  { id: "shoel-req-reading", type: "review", requiredValue: true,
    description: lt("Lectura base de TALMID finalizada.") },
];

// Requisito genérico para los niveles aún resumidos: completar el nivel anterior.
function unlockAfter(prevName: string, prevId: string): Requirement[] {
  return [
    { id: `${prevId}-complete`, type: "review", requiredValue: true,
      description: lt(`Completar el nivel ${prevName} con todos sus requisitos.`) },
  ];
}

// ═══════════════════════════════════════════════════════════════════════════
//  LOS 6 NIVELES (contenido fundacional verificado por el Sofer)
// ═══════════════════════════════════════════════════════════════════════════
export const ACADEMY_LEVELS: AcademyLevel[] = [
  {
    id: "talmid",
    rank: 1,
    slug: "talmid",
    name: "TALMID",
    he: "תַּלְמִיד",
    translit: "talmíd",
    subtitle: lt("El que aprende desde cero"),
    description: lt("El primer escalón del camino: aquí se asientan los cimientos, el alfabeto del estudio y el orden de las fuentes. Como en toda yeshiva, antes de preguntar o interpretar, primero se aprende a recibir lo básico con humildad."),
    durationWeeks: TALMID_WEEKS,
    minDaysRequired: TALMID_MIN_DAYS,
    initialStatus: "available",     // ← el ÚNICO abierto al inicio
    unlockRequirements: [],         // TALMID está abierto: no requiere desbloqueo
    modules: TALMID_MODULES,
  },
  {
    id: "shoel",
    rank: 2,
    slug: "shoel",
    name: "SHOEL",
    he: "שׁוֹאֵל",
    translit: "shoél",
    subtitle: lt("El arte de preguntar bien"),
    description: lt("La Mishná elogia a quien «pregunta con pertinencia y responde según la norma» (Pirkei Avot 5:7). En este nivel el estudiante deja de solo recibir y aprende a interrogar el texto, contrastar comentaristas y plantear una investigación honesta."),
    durationWeeks: 12,
    minDaysRequired: 12 * DAYS_PER_WEEK,
    initialStatus: "locked",
    unlockRequirements: UNLOCK_SHOEL,
    modules: [],                    // estructura resumida (se desarrolla más adelante)
  },
  {
    id: "doresh",
    rank: 3,
    slug: "doresh",
    name: "DORESH",
    he: "דּוֹרֵשׁ",
    translit: "dorésh",
    subtitle: lt("El que indaga el sentido"),
    description: lt("«Ezra dispuso su corazón para escudriñar (lidrosh) la Torá del Eterno» (Ezra 7:10). Aquí el estudiante aprende el arte del Midrash: leer los símbolos, hallar los patrones y descubrir las capas que el texto guarda bajo la superficie."),
    durationWeeks: 12,
    minDaysRequired: 12 * DAYS_PER_WEEK,
    initialStatus: "locked",
    unlockRequirements: unlockAfter("SHOEL", "shoel"),
    modules: [],
  },
  {
    id: "mevin",
    rank: 4,
    slug: "mevin",
    name: "MEVIN",
    he: "מֵבִין",
    translit: "mevín",
    subtitle: lt("El que comprende los sistemas"),
    description: lt("«Dando el sentido, y comprendieron (vayavinu) la lectura» (Nehemías 8:8). En este nivel las piezas se vuelven arquitectura: el estudiante discierne cómo se relacionan las sefirot, los mundos, las letras y los niveles del alma — la comprensión que la Cabalá llama Biná."),
    durationWeeks: 12,
    minDaysRequired: 12 * DAYS_PER_WEEK,
    initialStatus: "locked",
    unlockRequirements: unlockAfter("DORESH", "doresh"),
    modules: [],
  },
  {
    id: "sofer",
    rank: 5,
    slug: "sofer",
    name: "SOFER",
    he: "סוֹפֵר",
    translit: "sofér",
    subtitle: lt("El que escribe y transmite"),
    description: lt("Como Ezra «ha-Sofer», erudito que escribía y enseñaba a Israel, en este nivel el estudiante ya no solo recibe: produce estudios propios, organiza fuentes, traduce y comenta."),
    glossNote: lt("Aquí «Sofer» se usa en su sentido bíblico amplio —«erudito letrado», como Ezra ha-Sofer (Ezra 7:6,11)— el que compone y transmite estudio; no el escriba ritual de Sifrei Torá."),
    durationWeeks: 12,
    minDaysRequired: 12 * DAYS_PER_WEEK,
    initialStatus: "locked",
    unlockRequirements: unlockAfter("MEVIN", "mevin"),
    modules: [],
  },
  {
    id: "mekubal",
    rank: 6,
    slug: "mekubal",
    name: "MEKUBAL",
    he: "מְקוּבָּל",
    translit: "mekubál",
    subtitle: lt("El que recibe la tradición"),
    description: lt("«Moshé recibió (kibel) la Torá del Sinaí y la transmitió» (Pirkei Avot 1:1): de esa raíz nace la palabra Mekubal, «el que ha recibido». Es la cima del camino, donde Torá, Zohar, Etz Chaim, Talmud y Midrash se integran con la vida interior — no un punto de llegada rápido, sino el fruto de todo el ascenso."),
    glossNote: lt("«Mekubal» —«el que ha recibido» (raíz de Kabbalá; cf. «Moshé recibió la Torá», Avot 1:1)— marca el ingreso al estudio integrado de la tradición mística, no una ordenación. El camino del Mekubal no termina."),
    durationWeeks: 16,              // avanzado: no debe verse como alcanzable rápido
    minDaysRequired: 16 * DAYS_PER_WEEK,
    initialStatus: "locked",
    unlockRequirements: unlockAfter("SOFER", "sofer"),
    modules: [],
  },
];

// ── Accesores puros (sin estado) ────────────────────────────────────────────
export function getLevel(idOrSlug: string): AcademyLevel | undefined {
  return ACADEMY_LEVELS.find((l) => l.id === idOrSlug || l.slug === idOrSlug);
}
export function getLevelByRank(rank: number): AcademyLevel | undefined {
  return ACADEMY_LEVELS.find((l) => l.rank === rank);
}
export function nextLevel(level: AcademyLevel): AcademyLevel | undefined {
  return getLevelByRank(level.rank + 1);
}
export function prevLevel(level: AcademyLevel): AcademyLevel | undefined {
  return getLevelByRank(level.rank - 1);
}
export function getModule(levelId: string, moduleId: string): AcademyModule | undefined {
  return getLevel(levelId)?.modules.find((m) => m.id === moduleId);
}
/** Total de módulos obligatorios de un nivel (para "100% completado"). */
export function requiredModuleCount(level: AcademyLevel): number {
  return level.modules.filter((m) => m.required).length;
}

export const ACADEMY_FIRST_LEVEL_ID = "talmid";
