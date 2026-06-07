import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";
import { routing, locales, defaultLocale } from "./routing";

// Navegación GLOBAL permisiva (SIN pathnames tipados). La usamos en TODO el
// sitio: mantiene que cualquier <Link href="/lo-que-sea"> y router.push(...)
// acepte rutas de string libre (incluidas /estudio?ref=… y /misterio/[slug]),
// sin que TypeScript las restrinja. Por eso NO le pasamos `routing` (que lleva
// pathnames y volvería el tipado estricto), sino solo los locales.
const navRouting = defineRouting({ locales, defaultLocale });
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(navRouting);

// Navegación LOCALIZADA dedicada (CON pathnames). SOLO para rutas cuyo slug
// cambia por idioma (la Mente Cósmica). <LocalizedLink href="/mente-cosmica">
// genera directamente /es/mente-cosmica, /en/cosmic-mind o /fa/cosmic-mind
// según el idioma activo, sin saltos de redirect.
export const { Link: LocalizedLink, getPathname: getLocalizedPathname } =
  createNavigation(routing);
