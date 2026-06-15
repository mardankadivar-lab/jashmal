import { NextResponse } from "next/server";
import { getSession } from "@/lib/community/communitySession";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET → estado de sesión para el cliente (el SiteHeader lo consulta).
// La cookie de sesión es httpOnly, así que el navegador no puede leerla
// directamente: este endpoint la verifica en el servidor y devuelve sólo
// lo necesario para pintar el indicador de "Entrar / Salir".
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      { authenticated: false },
      { headers: { "Cache-Control": "no-store" } },
    );
  }
  return NextResponse.json(
    {
      authenticated: true,
      email: session.email,
      name: session.name,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
