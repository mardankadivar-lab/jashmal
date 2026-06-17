// ─────────────────────────────────────────────────────────────────────────
// academiaDb.ts — tablas de TAREAS y EXPOSITIVOS de la Academia Jashmal.
// Modelo: lib/community/community.ts + lib/infra/db.ts.
//   · academia_tareas        — tareas semanales cortas (150-300 palabras)
//   · academia_expositivos   — expositivos mensuales (1.500-2.500 palabras)
// Todo es idempotente (CREATE TABLE IF NOT EXISTS).
// El userId es el email del estudiante (de communitySession.ts).
// ─────────────────────────────────────────────────────────────────────────
import { getSql } from "@/lib/infra/db";
import { randomUUID } from "crypto";

// ── Tipos ──────────────────────────────────────────────────────────────────

export type TareaStatus = "entregada" | "revisada" | "aprobada";
export type ExpositivoStatus =
  | "entregado"
  | "sofer_revision"
  | "aprobado"
  | "destacado"
  | "rechazado";

export type AcademiaTarea = {
  id: string;
  user_id: string;
  semana: number;
  lesson_slug: string;
  texto: string;
  palabras: number;
  status: TareaStatus;
  sofer_notas: string | null;
  created: string;
};

export type AcademiaExpositivo = {
  id: string;
  user_id: string;
  numero: number;
  nivel: string;
  titulo: string;
  texto: string;
  palabras: number;
  status: ExpositivoStatus;
  sofer_notas: string | null;
  mardan_notas: string | null;
  created: string;
};

// ── Crear tablas (lazy, idempotente) ──────────────────────────────────────

export async function ensureAcademiaTables(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS academia_tareas (
      id           TEXT PRIMARY KEY,
      user_id      TEXT NOT NULL,
      semana       INT  NOT NULL,
      lesson_slug  TEXT NOT NULL,
      texto        TEXT NOT NULL,
      palabras     INT  NOT NULL DEFAULT 0,
      status       TEXT NOT NULL DEFAULT 'entregada',
      sofer_notas  TEXT,
      created      TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS academia_expositivos (
      id           TEXT PRIMARY KEY,
      user_id      TEXT NOT NULL,
      numero       INT  NOT NULL,
      nivel        TEXT NOT NULL DEFAULT 'talmid',
      titulo       TEXT NOT NULL,
      texto        TEXT NOT NULL,
      palabras     INT  NOT NULL DEFAULT 0,
      status       TEXT NOT NULL DEFAULT 'entregado',
      sofer_notas  TEXT,
      mardan_notas TEXT,
      created      TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
}

// ── Utilidad: contar palabras ─────────────────────────────────────────────

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// ── Tareas semanales ──────────────────────────────────────────────────────

export async function submitTarea(
  userId: string,
  semana: number,
  lessonSlug: string,
  texto: string,
): Promise<AcademiaTarea | null> {
  const sql = getSql();
  if (!sql) return null;
  const id = randomUUID();
  const palabras = countWords(texto);
  const rows = (await sql`
    INSERT INTO academia_tareas (id, user_id, semana, lesson_slug, texto, palabras)
    VALUES (${id}, ${userId}, ${semana}, ${lessonSlug}, ${texto}, ${palabras})
    RETURNING id, user_id, semana, lesson_slug, texto, palabras, status, sofer_notas, created
  `) as AcademiaTarea[];
  return rows[0] ?? null;
}

export async function getTareasByUser(userId: string): Promise<AcademiaTarea[]> {
  const sql = getSql();
  if (!sql) return [];
  return (await sql`
    SELECT id, user_id, semana, lesson_slug, texto, palabras, status, sofer_notas, created
    FROM academia_tareas
    WHERE user_id = ${userId}
    ORDER BY semana ASC
  `) as AcademiaTarea[];
}

export async function getTareaByUserAndSemana(
  userId: string,
  semana: number,
): Promise<AcademiaTarea | null> {
  const sql = getSql();
  if (!sql) return null;
  const rows = (await sql`
    SELECT id, user_id, semana, lesson_slug, texto, palabras, status, sofer_notas, created
    FROM academia_tareas
    WHERE user_id = ${userId} AND semana = ${semana}
    LIMIT 1
  `) as AcademiaTarea[];
  return rows[0] ?? null;
}

export async function updateTareaStatus(
  id: string,
  status: TareaStatus,
  soferNotas?: string,
): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`
    UPDATE academia_tareas
       SET status = ${status}, sofer_notas = ${soferNotas ?? null}
     WHERE id = ${id}
  `;
}

// Todas las tareas con el email del estudiante (para admin).
export type TareaAdminRow = AcademiaTarea & { email: string; name: string | null };

export async function listAllTareas(): Promise<TareaAdminRow[]> {
  const sql = getSql();
  if (!sql) return [];
  // JOIN contra community_users si existe; fallback a solo tareas si no.
  return (await sql`
    SELECT t.id, t.user_id, t.semana, t.lesson_slug, t.texto, t.palabras,
           t.status, t.sofer_notas, t.created,
           COALESCE(u.email, t.user_id) AS email,
           u.name
    FROM academia_tareas t
    LEFT JOIN community_users u ON u.email = t.user_id
    ORDER BY t.created DESC
  `) as TareaAdminRow[];
}

// ── Expositivos mensuales ─────────────────────────────────────────────────

export async function submitExpositivo(
  userId: string,
  numero: number,
  nivel: string,
  titulo: string,
  texto: string,
): Promise<AcademiaExpositivo | null> {
  const sql = getSql();
  if (!sql) return null;
  const id = randomUUID();
  const palabras = countWords(texto);
  const rows = (await sql`
    INSERT INTO academia_expositivos (id, user_id, numero, nivel, titulo, texto, palabras)
    VALUES (${id}, ${userId}, ${numero}, ${nivel}, ${titulo}, ${texto}, ${palabras})
    RETURNING id, user_id, numero, nivel, titulo, texto, palabras, status, sofer_notas, mardan_notas, created
  `) as AcademiaExpositivo[];
  return rows[0] ?? null;
}

export async function getExpositivosByUser(userId: string): Promise<AcademiaExpositivo[]> {
  const sql = getSql();
  if (!sql) return [];
  return (await sql`
    SELECT id, user_id, numero, nivel, titulo, texto, palabras, status, sofer_notas, mardan_notas, created
    FROM academia_expositivos
    WHERE user_id = ${userId}
    ORDER BY numero ASC
  `) as AcademiaExpositivo[];
}

export async function updateExpositivoStatus(
  id: string,
  status: ExpositivoStatus,
  notas: string | undefined,
  tipo: "sofer" | "mardan",
): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  if (tipo === "sofer") {
    await sql`
      UPDATE academia_expositivos
         SET status = ${status}, sofer_notas = ${notas ?? null}
       WHERE id = ${id}
    `;
  } else {
    await sql`
      UPDATE academia_expositivos
         SET status = ${status}, mardan_notas = ${notas ?? null}
       WHERE id = ${id}
    `;
  }
}

// Todos los expositivos con email del estudiante (para admin).
export type ExpositivoAdminRow = AcademiaExpositivo & { email: string; name: string | null };

export async function listAllExpositivos(): Promise<ExpositivoAdminRow[]> {
  const sql = getSql();
  if (!sql) return [];
  return (await sql`
    SELECT e.id, e.user_id, e.numero, e.nivel, e.titulo, e.texto, e.palabras,
           e.status, e.sofer_notas, e.mardan_notas, e.created,
           COALESCE(u.email, e.user_id) AS email,
           u.name
    FROM academia_expositivos e
    LEFT JOIN community_users u ON u.email = e.user_id
    ORDER BY e.created DESC
  `) as ExpositivoAdminRow[];
}
