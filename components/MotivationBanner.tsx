"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { quoteOfTheDay, quoteText, type Quote } from "@/lib/study/motivation";

// Banda de motivación: una cita de las fuentes sagradas, rota cada día.
// Se muestra al abrir la página, como invitación al estudio.
export default function MotivationBanner() {
  const locale = useLocale();
  const [q, setQ] = useState<Quote | null>(null);

  useEffect(() => {
    setQ(quoteOfTheDay());
  }, []);

  if (!q) return null;

  return (
    <div className="mx-auto mt-6 max-w-2xl px-5 text-center">
      <p className="font-cinzel text-base italic leading-relaxed text-gold-soft sm:text-lg">
        “{quoteText(q, locale)}”
      </p>
      <p className="mt-2 text-xs uppercase tracking-widest text-muted">
        {q.source}
      </p>
    </div>
  );
}
