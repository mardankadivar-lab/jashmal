// ─────────────────────────────────────────────────────────────────────────
//  SEO POR IDIOMA — camino oficial i18n (sin inventar texto)
// ─────────────────────────────────────────────────────────────────────────
//  Compone el <title>/<meta description>/OpenGraph desde messages/ (que ya está
//  traducido en es/en/fa). NO inventa traducciones: reutiliza site.name,
//  hero.tagline y hero.description. Si una página quiere su propio título, lo
//  pasa en `opts.title` y hereda la plantilla "%s · Jashmal" del layout raíz.
//
//  Uso en el layout raíz:           return await localizedMetadata(locale);
//  Uso en una página concreta:      return await localizedMetadata(locale, {
//                                       title: t("misterios.title"),
//                                       description: t("misterios.subtitle"),
//                                     });
// ─────────────────────────────────────────────────────────────────────────
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";

export async function localizedMetadata(
  locale: Locale,
  opts: { title?: string; description?: string } = {},
): Promise<Metadata> {
  const t = await getTranslations({ locale });
  const siteName = t("site.name");
  const fullTitle = `${siteName} — ${t("hero.tagline")}`;
  const description = opts.description ?? t("hero.description");
  const ogTitle = opts.title ?? fullTitle;

  return {
    // Página: título plano (hereda la plantilla del raíz). Raíz: default + plantilla.
    title: opts.title ? opts.title : { default: fullTitle, template: `%s · ${siteName}` },
    description,
    openGraph: { title: ogTitle, description, siteName, locale, type: "website" },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  };
}
