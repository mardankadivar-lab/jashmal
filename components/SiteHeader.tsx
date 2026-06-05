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
  ["/universo", "nav.brain"],
  ["/atlas", "nav.atlas"],
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
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-baseline gap-2">
          <span className="font-cinzel text-lg tracking-wide text-gold">{t("site.name")}</span>
          <span className="hebrew text-sm text-muted">{t("site.hebrew")}</span>
        </Link>

        {/* Tema siempre visible + botón desplegable (en TODOS los tamaños: web y móvil) */}
        <div className="flex items-center gap-3">
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

        {/* Menú desplegable: tarjeta flotante anclada al lado del botón */}
        {open && (
          <nav className="absolute end-5 top-full z-50 mt-2 w-[min(260px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border border-gold/15 bg-ink/95 shadow-2xl shadow-black/50 backdrop-blur-md">
            <div className="flex flex-col p-2">
              {NAV.map(([href, key]) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 font-cinzel text-sm text-parchment/90 transition-colors hover:bg-gold/10 hover:text-gold"
                >
                  {t(key)}
                </Link>
              ))}
              <div className="mt-1 flex items-center gap-4 border-t border-gold/10 px-3 pb-1 pt-3">
                <ReadingControls />
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        )}
      </div>

      {/* Fondo para cerrar al hacer clic/tocar fuera */}
      {open && (
        <button
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-[57px] z-30 cursor-default"
        />
      )}
    </header>
  );
}
