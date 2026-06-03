import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { type NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

// Rutas cortas de TikTok: el middleware de locale las ignora para que
// next.config.ts pueda reescribirlas sin añadir /es al principio.
const TIKTOK_ROUTES = /^\/(26|358|linaje)$/;

export default function middleware(req: NextRequest) {
  if (TIKTOK_ROUTES.test(req.nextUrl.pathname)) {
    return NextResponse.next();
  }
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
