// ─────────────────────────────────────────────────────────────────────────
// communitySession.ts — sesión del estudiante (cookie firmada, sin librerías).
// La cookie lleva {userId, email, name, exp} firmada con HMAC-SHA256 usando
// COMMUNITY_SESSION_SECRET. httpOnly + secure en producción.
// ─────────────────────────────────────────────────────────────────────────
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.COMMUNITY_SESSION_SECRET || "dev-insecure-change-me";
export const SESSION_COOKIE = "jashmal_session";
export const SESSION_MAXAGE = 60 * 60 * 24 * 30; // 30 días

export type Session = { userId: string; email: string; name: string | null; exp: number };

function sign(body: string): string {
  return createHmac("sha256", SECRET).update(body).digest("base64url");
}

export function createSessionToken(s: Omit<Session, "exp">): string {
  const payload: Session = { ...s, exp: Math.floor(Date.now() / 1000) + SESSION_MAXAGE };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function verifySessionToken(token: string | undefined): Session | null {
  if (!token) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const s = JSON.parse(Buffer.from(body, "base64url").toString()) as Session;
    return s.exp >= Math.floor(Date.now() / 1000) ? s : null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const c = await cookies();
  return verifySessionToken(c.get(SESSION_COOKIE)?.value);
}
