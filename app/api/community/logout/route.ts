import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/community/communitySession";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Borra la cookie de sesión (misma cookie que setea /api/community/verify).
// Se invoca con POST desde el menú ("Salir"). Devuelve JSON; el cliente
// recarga para reflejar el estado de visitante.
export async function POST() {
  const res = NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
