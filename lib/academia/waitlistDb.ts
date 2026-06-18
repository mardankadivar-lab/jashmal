// ─────────────────────────────────────────────────────────────────────────
// waitlistDb.ts — lista de espera para la Cohorte 1 de la Academia Jashmal.
// Tabla: academia_waitlist
// Idempotente (CREATE TABLE IF NOT EXISTS).
// ─────────────────────────────────────────────────────────────────────────
import { getSql } from "@/lib/infra/db";
import { randomUUID } from "crypto";

// ── Tipo ──────────────────────────────────────────────────────────────────

export type WaitlistEntry = {
  id: string;
  email: string;
  locale: string;
  created: string;
};

// ── Crear tabla (lazy, idempotente) ───────────────────────────────────────

export async function ensureWaitlistTable(): Promise<void> {
  const sql = getSql();
  if (!sql) return;
  await sql`
    CREATE TABLE IF NOT EXISTS academia_waitlist (
      id      TEXT PRIMARY KEY,
      email   TEXT NOT NULL UNIQUE,
      locale  TEXT NOT NULL DEFAULT 'es',
      created TIMESTAMPTZ NOT NULL DEFAULT now()
    )`;
}

// ── Insertar entrada ──────────────────────────────────────────────────────

export async function createWaitlistEntry(
  email: string,
  locale: string,
): Promise<{ ok: true } | { ok: false; error: "duplicate" | "invalid" | "db_unavailable" }> {
  const sql = getSql();
  if (!sql) return { ok: false, error: "db_unavailable" };

  await ensureWaitlistTable();

  const id = randomUUID();
  try {
    await sql`
      INSERT INTO academia_waitlist (id, email, locale)
      VALUES (${id}, ${email.toLowerCase().trim()}, ${locale})
    `;
    return { ok: true };
  } catch (err: unknown) {
    // Postgres unique violation code: 23505
    if (
      err &&
      typeof err === "object" &&
      "code" in err &&
      (err as { code: string }).code === "23505"
    ) {
      return { ok: false, error: "duplicate" };
    }
    throw err;
  }
}

// ── Contar inscritos ──────────────────────────────────────────────────────

export async function getWaitlistCount(): Promise<number> {
  const sql = getSql();
  if (!sql) return 0;
  await ensureWaitlistTable();
  const rows = (await sql`SELECT COUNT(*)::int AS n FROM academia_waitlist`) as {
    n: number;
  }[];
  return rows[0]?.n ?? 0;
}
