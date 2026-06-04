"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import ReadingControls from "./ReadingControls";

const NAV: [string, string][] = [
  ["/estudio", "nav.study"],
  ["/letras", "nav.letters"],
  ["/misterios", "nav.mysteries"],
  ["/gematrias", "nav.gematria"],
  ["/creacion", "nav.creation"],
  ["/arbol", "nav.tree"],
  ["/grafo", "nav.brain"],
  ["/acerca", "nav.about"],
];

export default function SiteHeader() {
  const t = useTranslations();
  const [open, setOpen] = useState(false);

  // cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-baseline gap-2">
          <span className="font-cinzel text-lg tracking-wide text-gold">{t("site.name")}</span>
          <span className="hebrew text-sm text-muted">{t("site.hebrew")}</span>
        </Link>

        {/* Menú en línea (escritorio) */}
        <nav className="hidden items-center gap-5 text-sm lg:flex">
          {NAV.map(([href, key]) => (
            <Link key={href} href={href} className="text-muted transition-colors hover:text-parchment">
              {t(key)}
            </Link>
          ))}
          <ReadingControls />
          <LanguageSwitcher />
          <ThemeToggle />
        </nav>

        {/* Controles + hamburguesa (móvil/tablet) */}
        <div className="flex items-center gap-3 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gold/25 text-gold transition-colors hover:bg-gold/10"
          >
            <span className="relative block h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-0.5 w-5 bg-current transition-all duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {/* Panel desplegable (móvil/tablet) */}
      {open && (
        <>
          {/* fondo para cerrar al tocar fuera */}
          <button
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[57px] z-30 cursor-default lg:hidden"
          />
          <nav className="relative z-40 border-t border-gold/10 bg-ink/95 backdrop-blur-md lg:hidden">
            <div className="mx-auto flex max-w-5xl flex-col px-5 py-2">
              {NAV.map(([href, key]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="border-b border-gold/[0.06] py-3 font-cinzel text-sm text-parchment/90 transition-colors hover:text-gold"
                >
                  {t(key)}
                </Link>
              ))}
              <div className="flex items-center gap-4 py-3">
                <ReadingControls />
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
