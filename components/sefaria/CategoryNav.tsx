"use client";

import { useLocale } from "next-intl";
import { CATALOG, type CategoryId } from "@/lib/categories";

interface CategoryNavProps {
  selected: CategoryId | null;
  onSelect: (c: CategoryId) => void;
}

export default function CategoryNav({ selected, onSelect }: CategoryNavProps) {
  const locale = useLocale();

  return (
    <div className="flex flex-wrap gap-2">
      {CATALOG.map((g) => (
        <button
          key={g.id}
          onClick={() => onSelect(g.id)}
          className={
            "rounded-full border px-4 py-1.5 font-cinzel text-sm tracking-wide transition-all " +
            (selected === g.id
              ? "border-gold bg-gold/10 text-gold"
              : "border-gold/25 text-muted hover:border-gold/60 hover:text-parchment")
          }
        >
          {locale === "fa" ? (
            <span>{g.fa}</span>
          ) : (
            <span>{g.es}</span>
          )}
        </button>
      ))}
    </div>
  );
}
