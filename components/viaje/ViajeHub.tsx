"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ESTACIONES } from "@/lib/content/estaciones";

// Hub del viaje: las 14 estaciones en orden de DESCENSO (Ein Sof arriba →
// Participación Humana abajo), unidas por un hilo dorado. Cada tarjeta es
// clicable a su estudio y muestra número + hebreo + transliteración +
// traducción + una línea de esencia. Estética Jashmal, siempre oscuro.

export default function ViajeHub() {
  const locale = useLocale();
  const fa = locale === "fa";

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }} dir={fa ? "rtl" : "ltr"}>
      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">
        {/* Encabezado */}
        <header className="mb-14 text-center">
          <p className="mb-4 font-cinzel text-[11px] uppercase tracking-[0.4em] text-gold/45">
            {fa ? "کابالا لوریانیِ آریزال" : "Cabalá luriana del Arizal"}
          </p>
          <h1 className="font-cinzel text-3xl font-bold text-gold sm:text-4xl" style={{ textShadow: "0 0 30px rgba(201,164,62,0.4)" }}>
            {fa ? "سفرِ آفرینش" : "El Viaje de la Creación"}
          </h1>
          <p className="hebrew mx-auto mt-3 text-2xl text-parchment/70">
            אֵין סוֹף ← אָדָם
          </p>
          <p className="mx-auto mt-5 max-w-lg font-body text-base leading-relaxed text-parchment/65">
            {fa
              ? "چهارده ایستگاه از بی‌نهایت تا دستانِ تو — نزولِ نور از این‌سوف تا جهانِ ما، و وظیفه‌ای که برای تو ماند."
              : "Catorce estaciones, desde el Infinito hasta tus manos — el descenso de la luz desde el Ein Sof hasta nuestro mundo, y la tarea que quedó en ti."}
          </p>
        </header>

        {/* El descenso */}
        <ol className="relative space-y-4">
          {/* hilo dorado vertical */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-6 top-6 w-px"
            style={{
              insetInlineStart: "1.65rem",
              background: "linear-gradient(to bottom, rgba(201,164,62,0.05), rgba(201,164,62,0.4), rgba(201,164,62,0.05))",
            }}
          />
          {ESTACIONES.map((e) => (
            <li key={e.slug} className="relative">
              <Link
                href={`/viaje/${e.slug}`}
                className="group flex items-start gap-4 rounded-2xl border border-gold/12 bg-ink/40 p-4 transition-all hover:border-gold/40 hover:bg-gold/[0.04]"
              >
                {/* nodo del número */}
                <span
                  className="relative z-10 flex h-[3.3rem] w-[3.3rem] shrink-0 items-center justify-center rounded-full border-2 font-cinzel text-lg font-bold"
                  style={{
                    borderColor: `${e.color}99`,
                    color: e.color,
                    background: "#05050a",
                    boxShadow: `0 0 18px ${e.color}33`,
                  }}
                >
                  {e.numero}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
                    <span className="hebrew text-xl font-bold text-gold transition-colors group-hover:text-gold-soft">
                      {e.hebreo}
                    </span>
                    <span className="font-cinzel text-sm tracking-wide text-parchment/80">
                      {e.transliteracion}
                    </span>
                  </span>
                  <span className="mt-0.5 block font-body text-sm italic text-parchment/55">
                    {e.traduccion}
                  </span>
                  <span className="mt-1.5 block font-body text-[0.95rem] leading-snug text-parchment/75">
                    {e.esencia}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>

        {/* sello */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            {fa ? "کابالا و فلسفهٔ یهودی" : "Cabalá & Filosofía Judía"}
          </p>
        </div>
      </main>
    </div>
  );
}
