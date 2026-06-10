import { getSql } from "@/lib/infra/db";

// Capa de datos del Beit Midrash: reflexiones que los estudiantes comparten
// bajo un estudio concreto (study_ref). Anónimas y públicas en la v1.

export interface Reflection {
  id: number;
  study_ref: string;
  locale: string;
  body: string;
  created_at: string;
}

let schemaReady = false;

async function ensureSchema(): Promise<void> {
  if (schemaReady) return;
  const sql = getSql();
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS reflections (
      id          BIGSERIAL PRIMARY KEY,
      study_ref   TEXT NOT NULL,
      locale      TEXT NOT NULL,
      body        TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
      status      TEXT NOT NULL DEFAULT 'visible',
      reports     INT  NOT NULL DEFAULT 0
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_reflections_ref
    ON reflections (study_ref, created_at DESC)
  `;
  schemaReady = true;
}

/** Lista las reflexiones visibles de un estudio (más recientes primero). */
export async function listReflections(studyRef: string, limit = 50): Promise<Reflection[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureSchema();
  const rows = (await sql`
    SELECT id, study_ref, locale, body, created_at
    FROM reflections
    WHERE study_ref = ${studyRef} AND status = 'visible'
    ORDER BY created_at DESC
    LIMIT ${limit}
  `) as Reflection[];
  return rows;
}

/** Inserta una reflexión ya moderada y aprobada. */
export async function createReflection(
  studyRef: string,
  locale: string,
  body: string
): Promise<Reflection | null> {
  const sql = getSql();
  if (!sql) return null;
  await ensureSchema();
  const rows = (await sql`
    INSERT INTO reflections (study_ref, locale, body)
    VALUES (${studyRef}, ${locale}, ${body})
    RETURNING id, study_ref, locale, body, created_at
  `) as Reflection[];
  return rows[0] ?? null;
}

/** Marca una reflexión como reportada; la oculta al superar un umbral. */
export interface AdminReflection extends Reflection {
  status: string;
  reports: number;
}

/** Admin: todas las reflexiones (incluidas las ocultas), recientes primero. */
export async function adminListAll(): Promise<AdminReflection[]> {
  const sql = getSql();
  if (!sql) return [];
  await ensureSchema();
  const rows = await sql`
    SELECT id, study_ref, locale, body, created_at, status, reports
    FROM reflections
    ORDER BY created_at DESC
    LIMIT 300
  `;
  return rows as AdminReflection[];
}

/** Admin: borra una reflexión definitivamente. */
export async function deleteReflection(id: number): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await ensureSchema();
  await sql`DELETE FROM reflections WHERE id = ${id}`;
}

/** Admin: restaura una reflexión oculta. */
export async function restoreReflection(id: number): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await ensureSchema();
  await sql`UPDATE reflections SET status = 'visible', reports = 0 WHERE id = ${id}`;
}

export async function reportReflection(id: number): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await ensureSchema();
  await sql`
    UPDATE reflections
    SET reports = reports + 1,
        status = CASE WHEN reports + 1 >= 3 THEN 'hidden' ELSE status END
    WHERE id = ${id}
  `;
}
