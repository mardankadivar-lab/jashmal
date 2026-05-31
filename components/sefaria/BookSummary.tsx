"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

interface BookSummaryProps {
  bookId: string;
}

// Tarjeta plegable con el contexto/resumen del libro (de Sefaria + Claude).
export default function BookSummary({ bookId }: BookSummaryProps) {
  const locale = useLocale();
  const t = useTranslations("study");
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setSummary(null);
    setLoading(true);
    setOpen(true);
    fetch("/api/book-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: bookId, locale }),
    })
      .then((r) => r.json())
      .then((d) => {
        if (!cancelled) setSummary(d.summary || "");
      })
      .catch(() => {
        if (!cancelled) setSummary("");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [bookId, locale]);

  if (!loading && !summary) return null;

  return (
    <div className="mb-4 rounded-lg border border-gold/15 bg-gold/[0.03] p-3">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-start"
      >
        <span className="font-cinzel text-xs uppercase tracking-widest text-gold/80">
          {t("aboutBook")}
        </span>
        <span className="text-gold/50">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="mt-2">
          {loading ? (
            <p className="animate-pulse text-sm text-muted">{t("loadingSummary")}</p>
          ) : (
            <p className="text-sm leading-relaxed text-parchment/85">{summary}</p>
          )}
        </div>
      )}
    </div>
  );
}
