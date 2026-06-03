"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = {
  es: "ES",
  fa: "فا",
  en: "EN",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: string) {
    if (next === locale) return;
    // Mantiene la ruta actual y cambia el locale → cambia TODO (UI + idioma del estudio).
    router.replace(pathname, { locale: next });
  }

  return (
    <div id="tour-language" className="flex items-center gap-1 text-sm">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-muted/50">·</span>}
          <button
            onClick={() => switchTo(l)}
            className={
              l === locale
                ? "text-gold font-semibold"
                : "text-muted hover:text-parchment transition-colors"
            }
            aria-current={l === locale}
          >
            {LABELS[l] ?? l}
          </button>
        </span>
      ))}
    </div>
  );
}
