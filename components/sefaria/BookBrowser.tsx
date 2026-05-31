"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  getGroup,
  bookLabel,
  subLabel,
  type CatBook,
  type CategoryId,
} from "@/lib/categories";

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

  // ---- Selección de capítulo/daf de un libro ya elegido ----
  if (selectedBook) {
    const units = Array.from({ length: selectedBook.units }, (_, i) =>
      selectedBook.type === "talmud" ? i + (selectedBook.firstDaf ?? 2) : i + 1
    );
    return (
      <div className="mt-4">
        <p className="mb-2 text-sm text-muted">
          {selectedBook.type === "talmud" ? t("chooseDaf") : t("chooseChapter")} ·{" "}
          <span className="text-parchment/80">{bookLabel(selectedBook, locale)}</span>
          <span className="hebrew ms-2 text-gold/60">{selectedBook.he}</span>
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

  return (
    <div className="mt-4">
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
      className="rounded-md border border-gold/20 px-3 py-1.5 text-sm text-parchment/90 transition-all hover:border-gold/60 hover:bg-gold/5"
    >
      <span>{bookLabel(b, locale)}</span>
      <span className="hebrew ms-2 text-gold/70">{b.he}</span>
    </button>
  );
}
