import { defineRouting } from "next-intl/routing";

// Idiomas: Español (default), Farsi/Persa e Inglés (añadido para mayor alcance
// y como respaldo cuando el Farsi no carga).
export const routing = defineRouting({
  locales: ["es", "fa", "en"],
  defaultLocale: "es",
  // El español (default) no lleva prefijo: jashmal.org/estudio en vez de /es/estudio.
  // El farsi mantiene su prefijo: jashmal.org/fa/estudio.
  localePrefix: "as-needed",
});

export type Locale = (typeof routing.locales)[number];
