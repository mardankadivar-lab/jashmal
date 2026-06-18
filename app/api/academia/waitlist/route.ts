// ─────────────────────────────────────────────────────────────────────────
// app/api/academia/waitlist/route.ts
//
// POST { email, locale } → inscribe en lista de espera de la Cohorte 1.
// Sin auth requerida — endpoint público.
// ─────────────────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { createWaitlistEntry } from "@/lib/academia/waitlistDb";

// Regex básico de email — RFC 5322 simplificado.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: { email?: unknown; locale?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const locale = typeof body.locale === "string" ? body.locale.trim() : "es";

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const result = await createWaitlistEntry(email, locale);

  if (!result.ok) {
    if (result.error === "duplicate") {
      return NextResponse.json({ ok: false, error: "duplicate" }, { status: 409 });
    }
    if (result.error === "db_unavailable") {
      return NextResponse.json({ ok: false, error: "db_unavailable" }, { status: 503 });
    }
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
