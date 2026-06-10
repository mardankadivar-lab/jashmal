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

// ── Puerta 2 (Mardan): la cola de aprobación ──────────────────────────────
// Las revelaciones que PASARON al Sofer (status 'sofer_review') y esperan el
// visto final de Mardan para encender la estrella del estudiante.
export type ReviewRow = {
  id: string;
  text: string;
  connects_to: string | null;
  score: number;
  sofer_verdict: string | null;
  sofer_notes: string | null;
  created: string;
  user_id: string;
  name: string | null;
  email: string;
};

export async function listSoferReview(): Promise<ReviewRow[]> {
  const sql = getSql();
  if (!sql) return [];
  return (await sql`
    SELECT s.id, s.text, s.connects_to, s.score, s.sofer_verdict, s.sofer_notes, s.created,
           s.user_id, u.name, u.email
    FROM community_submissions s
    JOIN community_users u ON u.id = s.user_id
    WHERE s.status = 'sofer_review'
    ORDER BY s.created ASC
  `) as ReviewRow[];
}

export type SubmissionFull = ReviewRow & { status: string; node_id: string | null };

export async function getSubmissionById(id: string): Promise<SubmissionFull | null> {
  const sql = getSql();
  if (!sql) return null;
  const rows = (await sql`
    SELECT s.id, s.text, s.connects_to, s.score, s.sofer_verdict, s.sofer_notes, s.created,
           s.user_id, s.status, s.node_id, u.name, u.email
    FROM community_submissions s
    JOIN community_users u ON u.id = s.user_id
    WHERE s.id = ${id}
  `) as SubmissionFull[];
  return rows[0] ?? null;
}

// Mardan APRUEBA: marca el envío 'approved', guarda el nodo creado y su nota.
export async function approveSubmissionRow(id: string, nodeId: string, note?: string): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`
    UPDATE community_submissions
       SET status = 'approved', node_id = ${nodeId}, mardan_notes = ${note ?? null}
     WHERE id = ${id}
  `;
}

// Mardan RECHAZA (tras el Sofer): marca 'rejected' y guarda su nota.
export async function rejectSubmissionRow(id: string, note?: string): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`
    UPDATE community_submissions
       SET status = 'rejected', mardan_notes = ${note ?? null}
     WHERE id = ${id}
  `;
}

// Suma una estrella al estudiante y su "luz" (score de conexiones confirmadas).
export async function incrementUserStats(userId: string, addLight: number): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`
    UPDATE community_users
       SET stars = stars + 1, light = light + ${Math.max(0, Math.floor(addLight))}
     WHERE id = ${userId}
  `;
}

// Revierte (al retirar/archivar una estrella): resta una estrella y su luz, sin bajar de 0.
export async function decrementUserStats(userId: string, subLight: number): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`
    UPDATE community_users
       SET stars = GREATEST(0, stars - 1),
           light = GREATEST(0, light - ${Math.max(0, Math.floor(subLight))})
     WHERE id = ${userId}
  `;
}
