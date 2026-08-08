"use client";

// ─────────────────────────────────────────────────────────────────────────
//  BUSCADOR GLOBAL — la lupa del sitio
// ─────────────────────────────────────────────────────────────────────────
//  Problema que resuelve: alguien entra a jashmal.org, quiere leer sobre Koraj
//  y no tiene por dónde empezar. El menú tiene 20 destinos y ninguno dice
//  "Koraj". Esta lupa busca en el CONTENIDO PROPIO de Jashmal (misterios,
//  letras, gematrías, lecciones, estaciones, episodios) y, cuando no hay nada
//  nuestro sobre el tema, lo dice y tiende el puente a los textos de Sefaria.
//
//  Se monta UNA sola vez, en app/[locale]/layout.tsx (mismo patrón que
//  GlobalTutor), para cubrir las ~120 páginas del sitio — incluidas las de
//  misterio y letra, que NO llevan SiteHeader.
//
//  Dos puertas de entrada, un solo panel:
//    · el icono de lupa del SiteHeader dispara el evento `jashmal:buscar`
//    · el botón flotante que aparece en las páginas SIN cabecera
//    · (y Cmd+K / Ctrl+K en escritorio, desde cualquier página)
//
//  CARGA DIFERIDA: el índice (~90 KB) se pide con fetch la PRIMERA vez que se
//  abre el panel, no al cargar la página. Es la diferencia entre un sitio que
//  sigue rápido y uno que arrastra el catálogo entero en cada visita.
// ─────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Link, useRouter } from "@/i18n/navigation";
import {
  searchDocs,
  docTitle,
  docDesc,
  docHasLocale,
  type SearchDoc,
  type SearchKind,
  type SearchResult,
} from "@/lib/search/match";
import { OPEN_SEARCH_EVENT } from "@/lib/search/events";

const LOCALES = ["es", "fa", "en"];

// Páginas que NO llevan lupa: tienen su propio buscador (la Mente Cósmica
// busca conceptos en el grafo, el Atlas busca lugares bíblicos) o son panel
// interno. Meter una segunda lupa encima sería confuso.
const SIN_BUSCADOR = new Set(["mente-cosmica", "cosmic-mind", "atlas", "admin"]);

// Páginas que YA montan SiteHeader: ahí la lupa vive en la cabecera, así que
// el botón flotante sobraría. En todas las demás (misterios, letras, academia,
// viaje…) el botón flotante es la única puerta visible.
const CON_CABECERA = new Set([
  "", "estudio", "preguntar", "mis-estudios", "mapa-del-alma",
  "espejo-del-alma", "podcast", "acerca", "buscar", "arbol", "letras",
]);

/** Rutas cuyo pathname cambia por idioma (ver i18n/routing.ts). */
const PATHNAMES_LOCALIZADOS: Record<string, Record<string, string>> = {
  "/mente-cosmica": { es: "/mente-cosmica", en: "/cosmic-mind", fa: "/cosmic-mind" },
  "/creacion": { es: "/creacion", en: "/creation", fa: "/creation" },
};

function localizedHref(href: string, locale: string): string {
  return PATHNAMES_LOCALIZADOS[href]?.[locale] ?? href;
}

/** Primer segmento de la ruta, ya sin el prefijo de idioma. */
function firstSegment(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length && LOCALES.includes(parts[0])) parts.shift();
  return parts[0] ?? "";
}

// El índice se guarda a nivel de módulo: se descarga una vez por sesión, aunque
// el usuario abra y cierre el panel veinte veces.
let indexCache: SearchDoc[] | null = null;
let indexPromise: Promise<SearchDoc[]> | null = null;

function loadIndex(): Promise<SearchDoc[]> {
  if (indexCache) return Promise.resolve(indexCache);
  if (!indexPromise) {
    indexPromise = fetch("/search-index.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((docs: SearchDoc[]) => {
        indexCache = docs;
        return docs;
      })
      .catch(() => {
        indexPromise = null; // permite reintentar en la próxima apertura
        return [];
      });
  }
  return indexPromise;
}

const KIND_KEY: Record<SearchKind, string> = {
  misterio: "kindMisterio",
  letra: "kindLetra",
  gematria: "kindGematria",
  leccion: "kindLeccion",
  estacion: "kindEstacion",
  podcast: "kindPodcast",
  pagina: "kindPagina",
};

export default function BuscadorGlobal() {
  const t = useTranslations("buscador");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const seg = firstSegment(pathname ?? "");

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState<SearchDoc[] | null>(null);
  const [cargando, setCargando] = useState(false);
  const [activo, setActivo] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listaRef = useRef<HTMLUListElement>(null);

  const habilitado = !SIN_BUSCADOR.has(seg);
  const isFa = locale === "fa";

  const abrir = useCallback(() => {
    setOpen(true);
    if (!indexCache) {
      setCargando(true);
      loadIndex().then((d) => {
        setDocs(d);
        setCargando(false);
      });
    } else {
      setDocs(indexCache);
    }
  }, []);

  const cerrar = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActivo(0);
  }, []);

  // Cmd+K / Ctrl+K desde cualquier página, y el evento del icono del header.
  useEffect(() => {
    if (!habilitado) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (o) return false;
          abrir();
          return true;
        });
      }
    };
    const onEvent = () => abrir();
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_SEARCH_EVENT, onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_SEARCH_EVENT, onEvent);
    };
  }, [habilitado, abrir]);

  // Al abrir: foco en el campo y bloqueo del scroll de fondo (importante en
  // móvil, donde el panel ocupa la pantalla completa).
  useEffect(() => {
    if (!open) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = previo;
      window.clearTimeout(id);
    };
  }, [open]);

  const resultados: SearchResult[] = useMemo(() => {
    if (!docs || !query.trim()) return [];
    return searchDocs(docs, query, 12);
  }, [docs, query]);

  useEffect(() => {
    setActivo(0);
  }, [query]);

  const hrefSefaria = `/buscar?q=${encodeURIComponent(query.trim())}`;

  const irA = useCallback(
    (href: string) => {
      cerrar();
      router.push(href);
    },
    [cerrar, router],
  );

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      cerrar();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActivo((i) => Math.min(i + 1, resultados.length - 1));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActivo((i) => Math.max(i - 1, 0));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const hit = resultados[activo];
      // Sin resultados propios, Enter lleva a los textos de Sefaria: la
      // búsqueda nunca termina en un callejón sin salida.
      if (hit) irA(localizedHref(hit.doc.href, locale));
      else if (query.trim()) irA(hrefSefaria);
    }
  }

  // Mantiene a la vista la fila resaltada al navegar con el teclado.
  useEffect(() => {
    const el = listaRef.current?.children[activo] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [activo]);

  if (!habilitado) return null;

  const conConsulta = query.trim().length > 0;
  const sinResultados = conConsulta && !cargando && resultados.length === 0;

  return (
    <>
      {/* Botón flotante — solo donde no hay cabecera con lupa. */}
      {!CON_CABECERA.has(seg) && !open && (
        <button
          type="button"
          onClick={abrir}
          aria-label={t("open")}
          className="fixed bottom-5 start-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-ink/85 text-lg text-gold shadow-lg shadow-black/40 backdrop-blur-md transition-colors hover:border-gold/60 hover:bg-gold/10"
        >
          <span aria-hidden="true">⌕</span>
        </button>
      )}

      {open && (
        <div
          dir={isFa ? "rtl" : "ltr"}
          className="fixed inset-0 z-[70] flex items-start justify-center"
        >
          {/* Fondo: cierra al tocar fuera */}
          <button
            aria-label={t("close")}
            onClick={cerrar}
            className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
          />

          {/* Panel. En móvil ocupa la pantalla completa; en escritorio es una
              tarjeta centrada cerca del borde superior. */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={t("title")}
            className="relative flex h-full w-full flex-col overflow-hidden border-gold/20 bg-ink/95 shadow-2xl shadow-black/60 backdrop-blur-md sm:mt-[8vh] sm:h-auto sm:max-h-[74vh] sm:w-[min(620px,92vw)] sm:rounded-2xl sm:border"
          >
            {/* Campo de búsqueda */}
            <div className="flex shrink-0 items-center gap-3 border-b border-gold/15 px-4 py-3.5">
              <span aria-hidden="true" className="text-lg text-gold/60">⌕</span>
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t("placeholder")}
                autoComplete="off"
                dir={isFa ? "rtl" : "ltr"}
                className="min-w-0 flex-1 bg-transparent text-base text-parchment outline-none placeholder:text-muted/60"
              />
              <button
                type="button"
                onClick={cerrar}
                className="shrink-0 rounded-md border border-gold/20 px-2 py-1 font-cinzel text-[10px] uppercase tracking-widest text-muted transition-colors hover:border-gold/50 hover:text-gold"
              >
                {t("close")}
              </button>
            </div>

            {/* Cuerpo */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              {!conConsulta && (
                <p className="px-5 py-8 text-center text-sm leading-relaxed text-muted">
                  {t("hint")}
                </p>
              )}

              {conConsulta && cargando && (
                <p className="px-5 py-8 text-center text-sm text-muted">{t("loading")}</p>
              )}

              {resultados.length > 0 && (
                <ul ref={listaRef} className="py-2">
                  {resultados.map((r, i) => {
                    const d = r.doc;
                    const titulo = docTitle(d, locale);
                    const desc = docDesc(d, locale);
                    const traducido = docHasLocale(d, locale);
                    return (
                      <li key={d.id}>
                        <Link
                          href={localizedHref(d.href, locale)}
                          onClick={cerrar}
                          onMouseEnter={() => setActivo(i)}
                          className={`block border-s-2 px-5 py-3 transition-colors ${
                            i === activo
                              ? "border-gold bg-gold/10"
                              : "border-transparent hover:bg-gold/5"
                          }`}
                        >
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span className="font-cinzel text-[9px] uppercase tracking-[0.18em] text-gold/60">
                              {t(KIND_KEY[d.kind])}
                            </span>
                            {d.he && (
                              <span dir="rtl" className="hebrew text-xs text-muted/70">
                                {d.he}
                              </span>
                            )}
                            {/* Aviso honesto: la ficha se encontró, pero el
                                estudio no existe en el idioma activo. Mismo
                                criterio que MisterioTranslationNotice. Se dice
                                en qué idiomas SÍ está, en vez de asumir que
                                siempre es "solo español". */}
                            {!traducido && (
                              <span className="rounded-full border border-gold/25 px-1.5 py-px text-[9px] text-gold/60">
                                {d.langs.length === 1 && d.langs[0] === "es"
                                  ? t("onlySpanish")
                                  : t("onlyIn", {
                                      langs: d.langs.map((l) => l.toUpperCase()).join(" · "),
                                    })}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-[15px] leading-snug text-parchment">
                            {titulo}
                          </p>
                          {desc && (
                            <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted">
                              {desc}
                            </p>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Sin contenido propio: se dice claro y se ofrece Sefaria. */}
              {sinResultados && (
                <div className="px-5 py-8 text-center">
                  <p className="text-sm leading-relaxed text-parchment/90">
                    {t("noneTitle", { q: query.trim() })}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {t("noneHelp")}
                  </p>
                  <button
                    type="button"
                    onClick={() => irA(hrefSefaria)}
                    className="mt-4 inline-block rounded-md border border-gold/50 px-4 py-2 font-cinzel text-sm text-gold transition-colors hover:bg-gold/10"
                  >
                    {t("searchTexts")}
                  </button>
                </div>
              )}
            </div>

            {/* Pie: puente permanente a los textos de Sefaria */}
            {conConsulta && resultados.length > 0 && (
              <button
                type="button"
                onClick={() => irA(hrefSefaria)}
                className="shrink-0 border-t border-gold/15 px-5 py-3 text-start text-xs text-muted transition-colors hover:bg-gold/5 hover:text-gold"
              >
                {t("alsoTexts", { q: query.trim() })}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
