import { defineRouting } from "next-intl/routing";

// Idiomas: Español (default), Farsi/Persa e Inglés (añadido para mayor alcance
// y como respaldo cuando el Farsi no carga).
export const locales = ["es", "fa", "en"] as const;
export const defaultLocale = "es" as const;

// PATHNAMES LOCALIZADOS por idioma.
// La Mente Cósmica vive internamente en la ruta /mente-cosmica (la carpeta
// app/[locale]/mente-cosmica/ NO se renombra), pero la URL pública cambia por
// idioma para que en inglés sea limpia:
//   es → /mente-cosmica   ·   en → /cosmic-mind   ·   fa → /cosmic-mind
// El middleware de next-intl reescribe /en/cosmic-mind ↔ la ruta interna y
// redirige /en/mente-cosmica → /en/cosmic-mind automáticamente (una sola URL
// canónica por idioma, sin 404).
export const pathnames = {
  "/mente-cosmica": {
    es: "/mente-cosmica",
    en: "/cosmic-mind",
    fa: "/cosmic-mind",
  },
  // El Viaje de Creación: la carpeta interna es /creacion, pero la URL pública
  // se localiza por idioma → es: /creacion · en: /creation · fa: /creation.
  // El middleware redirige /en/creacion → /en/creation (una sola URL canónica).
  "/creacion": {
    es: "/creacion",
    en: "/creation",
    fa: "/creation",
  },
} as const;

// Routing CANÓNICO (con pathnames): lo usan el middleware y la navegación
// localizada dedicada (LocalizedLink en i18n/navigation.ts).
export const routing = defineRouting({
  locales,
  defaultLocale,
  pathnames,
});

export type Locale = (typeof locales)[number];
