"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { ZOHAR_GROUPS, type ZoharParasha } from "@/lib/catalogOverrides";
import type { RichBook } from "@/lib/catalogOverrides";

interface ZoharNavigatorProps {
  onSelectParasha: (book: RichBook) => void;
}

export default function ZoharNavigator({ onSelectParasha }: ZoharNavigatorProps) {
  const locale = useLocale();
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  function label(p: { label: string; labelFa: string }): string {
    return locale === "fa" ? p.labelFa : p.label;
  }

  function handleParasha(p: ZoharParasha) {
    onSelectParasha({
      id: p.id,
      label: p.label,
      he: p.he,
      type: "chapters",
      units: p.units,
    });
  }

  return (
    <div className="mt-3 space-y-1.5">
      {ZOHAR_GROUPS.map((g) => (
        <div key={g.id} className="rounded-md border border-gold/15">
          {/* Cabecera del grupo — acordeón */}
          <button
            onClick={() => setOpenGroup(openGroup === g.id ? null : g.id)}
            className="flex w-full items-center justify-between px-3 py-2 text-start text-sm transition-colors hover:bg-gold/5"
          >
            <span className="font-cinzel tracking-wide text-gold/90">
              {label(g)}
            </span>
            <span className="flex items-center gap-2">
              <span className="hebrew text-xs text-gold/50">{g.he}</span>
              <span className="text-gold/40 text-xs">{openGroup === g.id ? "▲" : "▼"}</span>
            </span>
          </button>

          {/* Parashot dentro del grupo */}
          {openGroup === g.id && (
            <div className="flex flex-wrap gap-2 border-t border-gold/10 p-2.5">
              {g.parashot.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleParasha(p)}
                  className={
                    "flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs transition-all " +
                    (p.special
                      ? "border-gold/50 bg-gold/10 text-gold hover:border-gold hover:bg-gold/20"
                      : "border-gold/20 text-parchment/80 hover:border-gold/50 hover:bg-gold/5 hover:text-parchment")
                  }
                >
                  <span>{label(p)}</span>
                  <span className="hebrew text-[10px] text-gold/50">{p.he}</span>
                  <span className="text-gold/30 text-[9px]">{p.units}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
