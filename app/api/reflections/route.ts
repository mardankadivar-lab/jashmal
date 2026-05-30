import { NextResponse } from "next/server";
import { createReflection, listReflections } from "@/lib/reflections";
import { moderate } from "@/lib/moderation";
import { dbConfigured } from "@/lib/db";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

export const runtime = "nodejs";

const MAX_LEN = 2000;
const MIN_LEN = 2;

// GET /api/reflections?ref=<studyRef> → lista las reflexiones visibles.
export async function GET(req: Request) {
  if (!dbConfigured()) {
    return NextResponse.json({ configured: false, reflections: [] });
  }
  const { searchParams } = new URL(req.url);
  const ref = searchParams.get("ref");
  if (!ref) return NextResponse.json({ error: "missing_ref" }, { status: 400 });

  try {
    const reflections = await listReflections(ref);
    return NextResponse.json({ configured: true, reflections });
  } catch (err) {
    console.error("reflections GET error", err);
    return NextResponse.json({ error: "list_failed" }, { status: 502 });
  }
}

// POST /api/reflections → { ref, locale, body } crea una reflexión moderada.
export async function POST(req: Request) {
  if (!dbConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  // Anti-spam: reutilizamos el limitador por IP.
  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`reflect:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { ref?: string; locale?: string; body?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const ref = (body.ref ?? "").trim();
  const locale = body.locale === "fa" ? "fa" : "es";
  const text = (body.body ?? "").trim();

  if (!ref) return NextResponse.json({ error: "missing_ref" }, { status: 400 });
  if (text.length < MIN_LEN) {
    return NextResponse.json({ error: "too_short" }, { status: 400 });
  }
  if (text.length > MAX_LEN) {
    return NextResponse.json({ error: "too_long" }, { status: 400 });
  }

  // Moderación con Claude antes de publicar.
  const verdict = await moderate(text);
  if (!verdict.ok) {
    return NextResponse.json(
      { error: "rejected", reason: verdict.reason },
      { status: 422 }
    );
  }

  try {
    const reflection = await createReflection(ref, locale, text);
    return NextResponse.json({ reflection });
  } catch (err) {
    console.error("reflections POST error", err);
    return NextResponse.json({ error: "create_failed" }, { status: 502 });
  }
}
