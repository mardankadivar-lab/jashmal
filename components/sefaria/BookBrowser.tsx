"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  getGroup,
  bookLabel,
  subLabel,
  type CatBook,
  type CategoryId,
} from "@/lib/sources/categories";
import BookSummary from "./BookSummary";
import ZoharNavigator from "./ZoharNavigator";
import EtzChaimNavigator from "./EtzChaimNavigator";
import ParshaWorkNavigator from "./ParshaWorkNavigator";
import { parshaWorkOf } from "@/lib/sources/catalogOverrides";
import { CATEGORY_NOTES, workNotice, tri } from "@/lib/sources/categoryNotes";

interface BookBrowserProps {
  category: CategoryId;
  selectedBook: CatBook | null;
  onSelectBook: (b: CatBook) => void;
  onSelectUnit: (unit: number, amud?: "a" | "b") => void;
}

export default function BookBrowser({
  category,
  selectedBook,
  onSelectBook,
  onSelectUnit,
}: BookBrowserProps) {
  const locale = useLocale();
  const t = useTranslations("study");
  const group = getGroup(category);
  // Subcategoría abierta (acordeón). Por defecto la primera.
  const [openSub, setOpenSub] = useState<number>(0);

  if (!group) return null;

  // ---- Navegador especial del Zohar (por parashot agrupadas por libro) ----
  if (selectedBook?.id === "Zohar") {
    return (
      <div className="mt-4">
        <p className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="hebrew text-gold/80">זֹהַר</span>
          <span>{locale === "fa" ? "یک پاراشا را انتخاب کنید" : locale === "en" ? "Choose a parashah" : "Elige una parashá"}</span>
        </p>
        <ZoharNavigator onSelectParasha={(book) => onSelectBook(book as CatBook)} />
      </div>
    );
  }

  // ---- Navegador especial de Etz Chaim (51 secciones → portal → capítulo) ----
  if (selectedBook?.id === "Sefer Etz Chaim") {
    return (
      <div className="mt-4">
        <BookSummary bookId={selectedBook.id} />
        <p className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="hebrew text-gold/80">עֵץ חַיִּים</span>
          <span>{locale === "fa" ? "یک شعار یا دروازه را انتخاب کنید" : locale === "en" ? "Choose a Shaar or Gate" : "Elige un Shaar o Portal"}</span>
        </p>
        <EtzChaimNavigator onSelectSection={(book) => onSelectBook(book as CatBook)} />
      </div>
    );
  }

  // ---- Navegador de obras complejas por secciones con nombre ----------------
  // Obras cuyo TOC es un grupo de secciones con nombre: las dos jasídicas por
  // parashá (Ben Porat Yosef, Me'or Einayim) y las siete de filosofía judía
  // (Moré Nevujim, Jovot haLevavot, Emunot veDeot, Séfer haIkarim, Dérej
  // Hashem, Netivot Olam, Néfesh haJaim). Cada una queda como UN solo chip; al
  // abrirlo se muestra el navegador genérico con su estructura.
  //
  // Antes esto era un `if` por obra aquí dentro. Ahora el registro vive en
  // PARSHA_WORKS (catalogOverrides.ts): añadir una obra NO toca este archivo.
  // Se decide por el refTemplate, no por el id: el chip del catálogo no lo
  // trae y toda sección reportada por el navegador sí. Hacía falta porque los
  // capítulos de Shemoná Perakim cuelgan del libro mismo, así que esa sección
  // reporta «Eight Chapters» — el id del libro — y comparar ids la devolvía
  // al navegador en un bucle.
  const work = parshaWorkOf(selectedBook?.id);
  if (work && !selectedBook?.refTemplate) {
    return (
      <div className="mt-4">
        <BookSummary bookId={work.bookId} />
        <WorkNotice bookId={work.bookId} locale={locale} />
        <p className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="hebrew text-gold/80">{work.he}</span>
          <span>{locale === "fa" ? "یک بخش را انتخاب کنید" : locale === "en" ? "Choose a section" : "Elige una sección"}</span>
        </p>
        <ParshaWorkNavigator
          bookId={work.bookId}
          groups={work.groups}
          defaultOpenGroup={work.defaultOpenGroup}
          onSelectSection={(book) => onSelectBook(book as CatBook)}
        />
      </div>
    );
  }

  // ---- Nodo de una de esas obras ya elegido ---------------------------------
  // Los nodos se reportan con id "{Libro}, {refTitle}". Si el nodo es de
  // profundidad 1 (units 1) no hay capítulos que elegir: en vez de una rejilla
  // con un único "1", un botón que abre la sección entera. Si el nodo SÍ tiene
  // capítulos (un portal, un tratado, un netiv), se deja caer hacia la rejilla
  // de capítulos de siempre, que está más abajo.
  if (work && selectedBook && selectedBook.units <= 1) {
    return (
      <div className="mt-4">
        <BookSummary bookId={work.bookId} />
        <WorkNotice bookId={work.bookId} locale={locale} />
        <p className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="text-parchment/80">{selectedBook.label}</span>
          <span className="hebrew text-gold/60">{selectedBook.he}</span>
        </p>
        <button
          onClick={() => onSelectUnit(1)}
          className="rounded-md border border-gold/50 bg-gold/10 px-4 py-2 text-sm text-gold transition-all hover:border-gold hover:bg-gold/20"
        >
          {locale === "fa" ? "مطالعهٔ این بخش به‌طور کامل" : "Estudiar esta sección completa"}
        </button>
      </div>
    );
  }

  // ---- Selección de capítulo/daf de un libro ya elegido ----
  if (selectedBook) {
    const units = Array.from({ length: selectedBook.units }, (_, i) =>
      selectedBook.type === "talmud" ? i + (selectedBook.firstDaf ?? 2) : i + 1
    );
    return (
      <div className="mt-4">
        {/* El resumen es de la OBRA, no de la sección: una sección de obra
            compleja ("Netivot Olam, Netiv Hatorah") no tiene ficha propia. */}
        <BookSummary bookId={work ? work.bookId : selectedBook.id} />
        <WorkNotice bookId={selectedBook.id} locale={locale} />
        <p className="mb-2 flex flex-wrap items-center gap-2 text-sm text-muted">
          <span>
            {selectedBook.type === "talmud" ? t("chooseDaf") : t("chooseChapter")} ·{" "}
            <span className="text-parchment/80">{bookLabel(selectedBook, locale)}</span>
          </span>
          <span className="hebrew text-gold/60">{selectedBook.he}</span>
        </p>
        <div className="flex max-h-52 flex-wrap gap-1.5 overflow-y-auto pe-1">
          {units.map((u) =>
            selectedBook.type === "talmud" ? (
              <span key={u} className="flex">
                <button
                  onClick={() => onSelectUnit(u, "a")}
                  className="rounded-s-md border border-gold/20 px-2 py-1 text-xs text-parchment/80 transition-all hover:border-gold/60 hover:bg-gold/5"
                >
                  {u}
                  {t("amudA")}
                </button>
                <button
                  onClick={() => onSelectUnit(u, "b")}
                  className="rounded-e-md border border-s-0 border-gold/20 px-2 py-1 text-xs text-parchment/80 transition-all hover:border-gold/60 hover:bg-gold/5"
                >
                  {u}
                  {t("amudB")}
                </button>
              </span>
            ) : (
              <button
                key={u}
                onClick={() => onSelectUnit(u)}
                className="h-8 min-w-8 rounded-md border border-gold/20 px-1 text-xs text-parchment/80 transition-all hover:border-gold/60 hover:bg-gold/5"
              >
                {u}
              </button>
            )
          )}
        </div>
      </div>
    );
  }

  // ---- Selección de libro ----
  const hasSubs = group.subs.length > 1 || group.subs[0]?.sub !== null;

  const nota = CATEGORY_NOTES[category];
  const notaTexto = tri(nota, locale);

  return (
    <div className="mt-4">
      {/* La frase que encabeza la estantería. Va A LA VISTA, antes de la lista
          de obras: en filosofía judía es la salvaguarda contra el peor error
          posible aquí —leer el Moré como si probara un punto cabalístico—, y
          una salvaguarda escondida en una nota al pie no salvaguarda nada. */}
      {notaTexto && (
        <div className="mb-4 rounded-md border border-gold/20 bg-gold/5 px-3.5 py-3">
          <p className="text-sm leading-relaxed text-parchment/85">{notaTexto}</p>
          {nota?.he && (
            <p className="hebrew mt-2 text-xs leading-relaxed text-gold/55">{nota.he}</p>
          )}
        </div>
      )}
      <p className="mb-2 text-sm text-muted">{t("chooseBook")}</p>

      {hasSubs ? (
        // Categoría con subcategorías (acordeón): Tanaj, Mishná, Talmud
        <div className="space-y-1.5">
          {group.subs.map((s, i) => (
            <div key={i} className="rounded-md border border-gold/15">
              <button
                onClick={() => setOpenSub(openSub === i ? -1 : i)}
                className="flex w-full items-center justify-between px-3 py-2 text-start text-sm transition-colors hover:bg-gold/5"
              >
                <span className="font-cinzel tracking-wide text-gold/90">
                  {subLabel(s.sub, locale)}
                </span>
                <span className="hebrew text-xs text-gold/50">{s.subHe}</span>
              </button>
              {openSub === i && (
                <div className="flex flex-wrap gap-2 border-t border-gold/10 p-2.5">
                  {s.books.map((b) => (
                    <BookChip key={b.id} b={b} locale={locale} onSelect={onSelectBook} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        // Categoría plana: Midrash, Cabalá, Jasidut
        <div className="flex max-h-72 flex-wrap gap-2 overflow-y-auto pe-1">
          {group.subs[0]?.books.map((b) => (
            <BookChip key={b.id} b={b} locale={locale} onSelect={onSelectBook} />
          ))}
        </div>
      )}
    </div>
  );
}

/** La frase de advertencia de una obra, si la tiene. Una sola línea, visible
 * sin desplegar nada: es lo que impide leer el libro por lo que no es. */
function WorkNotice({ bookId, locale }: { bookId: string; locale: string }) {
  const texto = tri(workNotice(bookId) ?? undefined, locale);
  if (!texto) return null;
  return (
    <p className="mb-3 border-s-2 border-gold/40 ps-3 text-xs leading-relaxed text-parchment/70">
      {texto}
    </p>
  );
}

function BookChip({
  b,
  locale,
  onSelect,
}: {
  b: CatBook;
  locale: string;
  onSelect: (b: CatBook) => void;
}) {
  return (
    <button
      onClick={() => onSelect(b)}
      // flex + gap, no `ms-2`: el margen lógico se resuelve contra la
      // dirección del PROPIO elemento, y como el hebreo es RTL se iba al lado
      // contrario. Por eso se leía «Génesis (Bereshit)בראשית», pegado, en las
      // siete estanterías. El gap del contenedor no depende de la dirección
      // de los hijos.
      className="flex flex-wrap items-center gap-x-2 rounded-md border border-gold/20 px-3 py-1.5 text-start text-sm text-parchment/90 transition-all hover:border-gold/60 hover:bg-gold/5"
    >
      <span>{bookLabel(b, locale)}</span>
      <span className="hebrew text-gold/70">{b.he}</span>
    </button>
  );
}
