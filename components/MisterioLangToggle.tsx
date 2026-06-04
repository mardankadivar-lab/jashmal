"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

// Selector ES ⇄ FA para las páginas de misterio (su contenido es solo es/fa).
export default function MisterioLangToggle() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const langs: [string, string][] = [["es", "ES"], ["fa", "فا"]];
  return (
    <div className="flex items-center gap-1.5 font-cinzel text-xs">
      {langs.map(([l, label], i) => (
        <span key={l} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-gold/30">·</span>}
          <button
            onClick={() => { if (l !== locale) router.replace(pathname, { locale: l }); }}
            className={l === locale ? "text-gold font-semibold" : "text-gold/50 transition-colors hover:text-gold"}
            aria-current={l === locale}
          >
            {label}
          </button>
        </span>
      ))}
    </div>
  );
}
