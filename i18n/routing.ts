import { defineRouting } from "next-intl/routing";

// Idiomas: Español (default), Farsi/Persa e Inglés (añadido para mayor alcance
// y como respaldo cuando el Farsi no carga).
export const routing = defineRouting({
  locales: ["es", "fa", "en"],
  defaultLocale: "es",
});

export type Locale = (typeof routing.locales)[number];
