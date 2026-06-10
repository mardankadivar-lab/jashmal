import { NextResponse } from "next/server";
import { reportReflection } from "@/lib/study/reflections";
import { dbConfigured } from "@/lib/infra/db";
import { checkRateLimit, clientIp } from "@/lib/infra/rateLimit";

export const runtime = "nodejs";

// POST /api/reflections/report → { id } marca una reflexión como reportada.
export async function POST(req: Request) {
  if (!dbConfigured()) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  const ip = clientIp(req);
  const { allowed } = checkRateLimit(`report:${ip}`);
  if (!allowed) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: { id?: number };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const id = Number(body.id);
  if (!Number.isFinite(id)) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }

  try {
    await reportReflection(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("report error", err);
    return NextResponse.json({ error: "report_failed" }, { status: 502 });
  }
}
