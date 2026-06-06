// ─────────────────────────────────────────────────────────────────────────
// community.ts — la base de datos de la COMUNIDAD (Fase 1 del sistema de
// jidushim de estudiantes). Usa la misma Neon Postgres del cerebro.
//   · community_users        — las cuentas (login por enlace mágico)
//   · community_login_tokens — enlaces mágicos de un solo uso
//   · community_submissions  — las revelaciones que envían los estudiantes
// Todo es idempotente (CREATE TABLE IF NOT EXISTS) y nunca rompe la lectura.
// ─────────────────────────────────────────────────────────────────────────
import { getSql } from "./db";
import { randomBytes, randomUUID } from "crypto";

export type SubmissionStatus = "pending" | "sofer_review" | "approved" | "rejected";

// Crea las tablas la primera vez (lazy, en producción donde hay DATABASE_URL).
export async function ensureCommunityTables(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS community_users (
      id      TEXT PRIMARY KEY,
      email   TEXT UNIQUE NOT NULL,
      name    TEXT,
      level   TEXT NOT NULL DEFAULT 'talmid',   -- talmid|shoel|javer|maguid|jajam|mekubal
      stars   INT  NOT NULL DEFAULT 0,          -- jidushim aceptados
      light   INT  NOT NULL DEFAULT 0,          -- "luz total" (suma de scores)
      created TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS community_login_tokens (
      token   TEXT PRIMARY KEY,
      email   TEXT NOT NULL,
      expires TIMESTAMPTZ NOT NULL,
      used    BOOLEAN NOT NULL DEFAULT false,
      created TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
  await sql`
    CREATE TABLE IF NOT EXISTS community_submissions (
      id            TEXT PRIMARY KEY,
      user_id       TEXT NOT NULL REFERENCES community_users(id),
      study_ref     TEXT,                         -- de qué estudio salió
      text          TEXT NOT NULL,                -- la revelación del estudiante
      connects_to   TEXT,                         -- a qué concepto la conecta (sugerido)
      status        TEXT NOT NULL DEFAULT 'pending',
      sofer_verdict TEXT,                          -- aceptar|arreglar|rechazar
      sofer_notes   TEXT,                          -- respuesta del Sofer (Puerta 1)
      mardan_notes  TEXT,                          -- nota de Mardan (Puerta 2)
      node_id       TEXT,                          -- nodo creado al aprobar (galaxia comunidad)
      score         INT NOT NULL DEFAULT 0,        -- nº de conexiones confirmadas por el Sofer
      created       TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
}

// ── Usuarios ──────────────────────────────────────────────────────────────
export type CommunityUser = { id: string; email: string; name: string | null; level: string; stars: number; light: number };

export async function upsertUser(email: string, name?: string): Promise<CommunityUser | null> {
  const sql = getSql();
  if (!sql) return null;
  const e = email.trim().toLowerCase();
  const rows = (await sql`
    INSERT INTO community_users (id, email, name)
    VALUES (${randomUUID()}, ${e}, ${name ?? null})
    ON CONFLICT (email) DO UPDATE SET name = COALESCE(community_users.name, EXCLUDED.name)
    RETURNING id, email, name, level, stars, light
  `) as CommunityUser[];
  return rows[0] ?? null;
}

export async function getUserByEmail(email: string): Promise<CommunityUser | null> {
  const sql = getSql();
  if (!sql) return null;
  const rows = (await sql`SELECT id, email, name, level, stars, light FROM community_users WHERE email = ${email.trim().toLowerCase()}`) as CommunityUser[];
  return rows[0] ?? null;
}

// ── Enlace mágico (login sin contraseña) ──────────────────────────────────
// Genera un token de un solo uso (válido 30 min) y lo guarda. El correo se
// envía desde la ruta /api/auth (con Resend); aquí solo vive la BD.
export async function createLoginToken(email: string): Promise<string | null> {
  const sql = getSql();
  if (!sql) return null;
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + 30 * 60 * 1000); // 30 min
  await sql`INSERT INTO community_login_tokens (token, email, expires) VALUES (${token}, ${email.trim().toLowerCase()}, ${expires.toISOString()})`;
  return token;
}

// Canjea un token: si es válido y no usado, lo marca usado y devuelve el email.
export async function consumeLoginToken(token: string): Promise<string | null> {
  const sql = getSql();
  if (!sql) return null;
  const rows = (await sql`
    UPDATE community_login_tokens SET used = true
    WHERE token = ${token} AND used = false AND expires > now()
    RETURNING email
  `) as Array<{ email: string }>;
  return rows[0]?.email ?? null;
}

// ── Envíos (revelaciones) ─────────────────────────────────────────────────
export async function createSubmission(input: {
  userId: string; text: string; studyRef?: string; connectsTo?: string;
}): Promise<string | null> {
  const sql = getSql();
  if (!sql) return null;
  const id = randomUUID();
  await sql`
    INSERT INTO community_submissions (id, user_id, text, study_ref, connects_to)
    VALUES (${id}, ${input.userId}, ${input.text}, ${input.studyRef ?? null}, ${input.connectsTo ?? null})
  `;
  return id;
}

// Guarda el veredicto del Sofer (Puerta 1) sobre un envío.
export async function updateSoferVerdict(
  id: string,
  v: { verdict: string; score: number; notes: string; status: SubmissionStatus },
): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`
    UPDATE community_submissions
       SET sofer_verdict = ${v.verdict}, score = ${v.score}, sofer_notes = ${v.notes}, status = ${v.status}
     WHERE id = ${id}
  `;
}
