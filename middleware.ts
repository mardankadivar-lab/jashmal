import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { esAtajoDeMisterio } from "./lib/content/misterio-atajos";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  // Atajos cortos de los misterios (jashmal.org/137). El middleware de idioma
  // los ignora para que next.config.ts pueda reescribirlos sin que next-intl
  // les añada /es al principio (si no, /137 se volvería /es/137 → 404).
  //
  // La lista sale del catálogo de misterios, no está escrita a mano: ver
  // lib/content/misterio-atajos.ts. Antes era una regex a dedo y cada misterio
  // nuevo se quedaba sin atajo.
  if (esAtajoDeMisterio(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
