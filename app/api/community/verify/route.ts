import { NextResponse } from "next/server";
import { consumeLoginToken, upsertUser } from "@/lib/community/community";
import { createSessionToken, SESSION_COOKIE, SESSION_MAXAGE } from "@/lib/community/communitySession";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET ?token=... → canjea el enlace mágico, crea/halla el usuario, abre sesión.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token") ?? "";
  const email = await consumeLoginToken(token);
  if (!email) {
    return NextResponse.redirect(new URL("/es/comunidad?error=enlace", url.origin));
  }
  const user = await upsertUser(email);
  if (!user) {
    return NextResponse.redirect(new URL("/es/comunidad?error=db", url.origin));
  }
  const session = createSessionToken({ userId: user.id, email: user.email, name: user.name });
  const res = NextResponse.redirect(new URL("/es/comunidad", url.origin));
  res.cookies.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAXAGE,
  });
  return res;
}
