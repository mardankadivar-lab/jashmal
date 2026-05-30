import { defineRouting } from "next-intl/routing";

// Solo DOS idiomas: Español (default) y Farsi/Persa. NO inglés en la interfaz.
export const routing = defineRouting({
  locales: ["es", "fa"],
  defaultLocale: "es",
});

export type Locale = (typeof routing.locales)[number];
