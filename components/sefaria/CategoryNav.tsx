"use client";

import { useTranslations } from "next-intl";
import { CATEGORY_ORDER, type CategoryId } from "@/lib/categories";

interface CategoryNavProps {
  selected: CategoryId | null;
  onSelect: (c: CategoryId) => void;
}

export default function CategoryNav({ selected, onSelect }: CategoryNavProps) {
  const t = useTranslations("categories");

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORY_ORDER.map((c) => (
        <button
          key={c}
          onClick={() => onSelect(c)}
          className={
            "rounded-full border px-4 py-1.5 font-cinzel text-sm tracking-wide transition-all " +
            (selected === c
              ? "border-gold bg-gold/10 text-gold"
              : "border-gold/25 text-muted hover:border-gold/60 hover:text-parchment")
          }
        >
          {t(c)}
        </button>
      ))}
    </div>
  );
}
