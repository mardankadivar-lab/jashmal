import { NextResponse } from "next/server";
import { ensureCommunityTables, createLoginToken } from "@/lib/community/community";
import { sendMagicLink } from "@/lib/infra/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST { email } → genera un enlace mágico y lo envía por correo.
export async function POST(req: Request) {
  let email = "";
  try {
    email = (await req.json())?.email ?? "";
  } catch {
    /* body inválido */
  }
  email = String(email).trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Correo inválido" }, { status: 400 });
  }
  await ensureCommunityTables();
  const token = await createLoginToken(email);
  if (!token) {
    return NextResponse.json({ ok: false, error: "Base de datos no disponible" }, { status: 500 });
  }
  const origin = new URL(req.url).origin;
  const link = `${origin}/api/community/verify?token=${encodeURIComponent(token)}`;
  const r = await sendMagicLink(email, link);
  if (!r.ok) {
    return NextResponse.json({ ok: false, error: r.error ?? "No se pudo enviar el correo" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
