import { NextResponse } from "next/server";
import { dbConfigured } from "@/lib/db";
import { harvestFromStudy } from "@/lib/brainHarvest";
import type { BNode } from "@/lib/brainData";

export const runtime = "nodejs";

function originAllowed(req: Request): boolean {
  const allowed = (process.env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) return true;
  const origin = req.headers.get("origin");
  if (!origin) return true;
  return allowed.includes(origin);
}

// POST /api/brain/harvest  { mode, subject, url?, text }
// Cosecha (en segundo plano, disparada por el cliente al terminar un estudio):
// convierte el estudio en sinapsis/conexiones 'pending' para que el Sofer apruebe.
export async function POST(req: Request) {
  if (!originAllowed(req)) {
    return NextResponse.json({ ok: false, reason: "origin" }, { status: 403 });
  }
  if (!dbConfigured()) {
    return NextResponse.json({ ok: false, reason: "no_db" });
  }

  let body: { mode?: string; subject?: string; url?: string; text?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, reason: "invalid_body" }, { status: 400 });
  }

  const subject = (body.subject ?? "").toString().trim();
  const text = (body.text ?? "").toString();
  if (!subject || subject.length > 120 || !text || text.length < 80) {
    return NextResponse.json({ ok: false, reason: "insufficient" });
  }

  // categoría/nivel del sujeto (mejor estimación; el Sofer lo ajusta)
  let subjectCat = "tanakh";
  const subjectLevel: BNode["level"] = 3;
  if (body.mode === "letter" || body.mode === "concept") subjectCat = "kabbalah";

  try {
    const res = await harvestFromStudy({
      subjectId: subject,
      subjectLabel: subject,
      subjectCat,
      subjectLevel,
      url: body.url ? String(body.url).slice(0, 200) : undefined,
      text,
    });
    return NextResponse.json({ ok: true, ...res });
  } catch {
    return NextResponse.json({ ok: false, reason: "error" });
  }
}
