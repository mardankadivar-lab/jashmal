"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, LocalizedLink, useRouter } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import ReadingControls from "./ReadingControls";

// Cada ítem: ruta + clave de traducción. Agrupados en secciones temáticas
// para que el menú no sea una lista plana de 13 enlaces.
type Item = [href: string, key: string];
type Group = { titleKey: string; items: Item[] };

const GROUPS: Group[] = [
  {
    titleKey: "nav.groupStudy",
    items: [
      ["/estudio", "nav.study"],
      ["/mis-estudios", "nav.myStudies"],
    ],
  },
  {
    titleKey: "nav.groupExplore",
    items: [
      ["/letras", "nav.letters"],
      ["/gematrias", "nav.gematria"],
      ["/misterios", "nav.mysteries"],
      ["/atlas", "nav.atlas"],
      ["/mente-cosmica", "nav.brain"],
    ],
  },
  {
    titleKey: "nav.groupJourney",
    items: [
      ["/creacion", "nav.creation"],
      ["/viaje", "nav.journey"],
      ["/arbol", "nav.tree"],
    ],
  },
  {
    titleKey: "nav.groupLearn",
    items: [
      ["/que-es-cabala", "nav.whatIsKabbalah"],
      ["/acerca", "nav.about"],
    ],
  },
];

// Comunidad va suelta (sin micro-encabezado) como destino único y destacado.
const COMMUNITY: Item = ["/comunidad", "nav.community"];

type SessionState =
  | { status: "loading" }
  | { status: "guest" }
  | { status: "auth"; name: string | null; email: string };

const ITEM_CLS =
  "rounded-lg px-3 py-2 font-cinzel text-sm text-parchment/90 transition-colors hover:bg-gold/10 hover:text-gold";

function NavItem({ href, label, onClick }: { href: string; label: string; onClick: () => void }) {
  // La Mente Cósmica tiene URL localizada (/cosmic-mind en en/fa): usa la
  // navegación localizada para generar la URL correcta por idioma sin redirect.
  if (href === "/mente-cosmica") {
    return (
      <LocalizedLink href="/mente-cosmica" onClick={onClick} className={ITEM_CLS}>
        {label}
      </LocalizedLink>
    );
  }
  return (
    <Link href={href} onClick={onClick} className={ITEM_CLS}>
      {label}
    </Link>
  );
}

export default function SiteHeader() {
  const t = useTranslations();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [session, setSession] = useState<SessionState>({ status: "loading" });

  // cerrar con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Estado de sesión: la cookie es httpOnly, así que preguntamos al backend.
  useEffect(() => {
    let alive = true;
    fetch("/api/community/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        setSession(
          d?.authenticated
            ? { status: "auth", name: d.name ?? null, email: d.email }
            : { status: "guest" },
        );
      })
      .catch(() => alive && setSession({ status: "guest" }));
    return () => {
      alive = false;
    };
  }, []);

  async function logout() {
    try {
      await fetch("/api/community/logout", { method: "POST" });
    } catch {}
    setSession({ status: "guest" });
    setOpen(false);
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-ink/80 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Link href="/" onClick={() => setOpen(false)} className="flex items-baseline gap-2">
          <span className="font-cinzel text-lg tracking-wide text-gold">{t("site.name")}</span>
          <span className="hebrew text-sm text-muted">{t("site.hebrew")}</span>
        </Link>

        {/* Tema siempre visible + botón desplegable (web y móvil) */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
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

        {/* Menú desplegable: tarjeta flotante. Altura limitada a la pantalla
            (la cabecera mide ~57px); la lista hace scroll interno y el pie de
            Cuenta + Idioma queda SIEMPRE fijo, nunca empujado fuera de vista. */}
        {open && (
          <nav className="absolute end-5 top-full z-50 mt-2 flex max-h-[calc(100vh-80px)] w-[min(300px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-gold/15 bg-ink/95 shadow-2xl shadow-black/50 backdrop-blur-md">
            {/* Zona con scroll: secciones de navegación */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-2">
              {GROUPS.map((g) => (
                <div key={g.titleKey} className="mb-1.5 last:mb-0">
                  <p className="px-3 pb-1 pt-2 font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold/55">
                    {t(g.titleKey)}
                  </p>
                  <div className="flex flex-col">
                    {g.items.map(([href, key]) => (
                      <NavItem key={href} href={href} label={t(key)} onClick={() => setOpen(false)} />
                    ))}
                  </div>
                </div>
              ))}

              {/* Comunidad: destino destacado, sin micro-encabezado */}
              <div className="mt-1 border-t border-gold/10 pt-1.5">
                <NavItem
                  href={COMMUNITY[0]}
                  label={t(COMMUNITY[1])}
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>

            {/* PIE FIJO — Cuenta + Idioma. Fuera del scroll, siempre visible. */}
            <div className="shrink-0 border-t border-gold/15 bg-ink/95 p-2">
              {/* Cuenta */}
              <p className="px-3 pb-1 pt-1 font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold/55">
                {t("nav.account")}
              </p>
              <div className="px-3 pb-2">
                {session.status === "loading" && (
                  <span className="text-sm text-muted/60">···</span>
                )}
                {session.status === "guest" && (
                  <Link
                    href="/comunidad"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-gold/30 px-3 py-1.5 font-cinzel text-sm text-gold transition-colors hover:bg-gold/10"
                  >
                    <span aria-hidden="true">✦</span>
                    {t("nav.signIn")}
                  </Link>
                )}
                {session.status === "auth" && (
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-1.5 text-sm text-parchment/90">
                      <span aria-hidden="true" className="text-gold">●</span>
                      <span className="truncate" title={session.email}>
                        {session.name || session.email}
                      </span>
                    </span>
                    <button
                      onClick={logout}
                      className="shrink-0 rounded-md border border-gold/20 px-2.5 py-1 text-xs text-muted transition-colors hover:border-gold/50 hover:text-gold"
                    >
                      {t("nav.signOut")}
                    </button>
                  </div>
                )}
              </div>

              {/* Idioma + controles de lectura — siempre accesible */}
              <div className="flex items-center justify-between gap-3 border-t border-gold/10 px-3 pb-1 pt-2.5">
                <span className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-gold/55">
                  {t("nav.language")}
                </span>
                <div className="flex items-center gap-3">
                  <ReadingControls />
                  <LanguageSwitcher />
                </div>
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
