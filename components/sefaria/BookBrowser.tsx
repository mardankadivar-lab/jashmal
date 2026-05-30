"use client";

import { useLocale, useTranslations } from "next-intl";
import { CATEGORIES, bookLabel, type BookDef, type CategoryId } from "@/lib/categories";

interface BookBrowserProps {
  category: CategoryId;
  selectedBook: BookDef | null;
  onSelectBook: (b: BookDef) => void;
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
  const books = CATEGORIES[category];

  if (!selectedBook) {
    return (
      <div className="mt-4">
        <p className="mb-2 text-sm text-muted">{t("chooseBook")}</p>
        <div className="flex flex-wrap gap-2">
          {books.map((b) => (
            <button
              key={b.id}
              onClick={() => onSelectBook(b)}
              className="rounded-md border border-gold/20 px-3 py-1.5 text-sm text-parchment/90 transition-all hover:border-gold/60 hover:bg-gold/5"
            >
              <span>{bookLabel(b, locale)}</span>
              <span className="hebrew ms-2 text-gold/70">{b.he}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const units = Array.from({ length: selectedBook.units }, (_, i) =>
    selectedBook.type === "talmud" ? i + (selectedBook.firstDaf ?? 2) : i + 1
  );

  return (
    <div className="mt-4">
      <p className="mb-2 text-sm text-muted">
        {selectedBook.type === "talmud" ? t("chooseDaf") : t("chooseChapter")} ·{" "}
        <span className="text-parchment/80">{bookLabel(selectedBook, locale)}</span>
      </p>
      <div className="flex max-h-44 flex-wrap gap-1.5 overflow-y-auto pe-1">
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
              className="h-8 w-8 rounded-md border border-gold/20 text-xs text-parchment/80 transition-all hover:border-gold/60 hover:bg-gold/5"
            >
              {u}
            </button>
          )
        )}
      </div>
    </div>
  );
}
