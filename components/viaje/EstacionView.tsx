"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Estacion } from "@/lib/content/estaciones";
import EstacionBody from "./EstacionBody";

// Vista completa de una estación: nav superior, hero (número + hebreo +
// traducción + marco reservado para la imagen futura), cuerpo del estudio y
// navegación anterior/siguiente. Estética Jashmal, siempre en oscuro.

export default function EstacionView({
  estacion,
  prev,
  next,
}: {
  estacion: Estacion;
  prev?: Pick<Estacion, "slug" | "numero" | "transliteracion" | "hebreo">;
  next?: Pick<Estacion, "slug" | "numero" | "transliteracion" | "hebreo">;
}) {
  const locale = useLocale();
  const fa = locale === "fa";
  const C = estacion.color;

  // Las estaciones van SIEMPRE en oscuro: el hebreo dorado y el texto pergamino
  // solo se leen bien sobre #05050a (igual que las páginas de misterio).
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }} dir={fa ? "rtl" : "ltr"}>
      {/* NAV superior */}
      <nav
        className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md"
        style={{ background: "rgba(5,5,10,0.9)" }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/viaje" className="font-cinzel text-sm text-gold/70 hover:text-gold">
            ← {fa ? "سفرِ آفرینش" : "El Viaje de la Creación"}
          </Link>
          <span className="font-cinzel text-xs uppercase tracking-widest text-gold/40">
            {estacion.numero} / 14
          </span>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-12">
        {/* HERO */}
        <header className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-[11px] uppercase tracking-[0.4em] text-gold/45">
            {fa ? "ایستگاهِ" : "Estación"} {estacion.numero} {fa ? "از ۱۴" : "de 14"}
          </p>

          {/* Marco reservado para la imagen futura (la generará Mardan en GPT).
              Se ve intencional: marco dorado sutil + degradado + el número
              gigante como sello mientras no hay imagen. */}
          <div
            className="relative mx-auto mb-8 flex aspect-[16/9] w-full max-w-xl items-center justify-center overflow-hidden rounded-2xl border"
            style={{
              borderColor: `${C}55`,
              background: `radial-gradient(120% 120% at 50% 0%, ${C}22 0%, rgba(5,5,10,0.6) 55%, #05050a 100%)`,
              boxShadow: `inset 0 0 60px ${C}18`,
            }}
            data-estacion-image-slot={estacion.slug}
          >
            <span
              className="font-cinzel font-black leading-none"
              style={{
                fontSize: "clamp(80px, 22vw, 150px)",
                color: C,
                opacity: 0.85,
                textShadow: `0 0 44px ${C}, 0 0 16px ${C}99`,
              }}
            >
              {estacion.numero}
            </span>
            <span className="absolute bottom-3 font-cinzel text-[9px] uppercase tracking-[0.3em] text-parchment/25">
              {/* TODO(image): aquí irá la imagen de la estación */}
              {fa ? "تصویرِ ایستگاه — به‌زودی" : "Imagen de la estación — próximamente"}
            </span>
          </div>

          <h1
            className="hebrew mb-3 font-bold leading-tight"
            style={{ fontSize: "clamp(40px, 11vw, 72px)", color: "#fff6e0", textShadow: `0 0 30px ${C}88` }}
          >
            {estacion.hebreo}
          </h1>
          <p className="font-cinzel text-lg tracking-wide text-gold sm:text-xl">
            {estacion.transliteracion}
          </p>
          <p className="mt-1 font-body text-base italic text-parchment/65">
            {estacion.traduccion}
          </p>
        </header>

        {/* CUERPO DEL ESTUDIO */}
        <EstacionBody markdown={estacion.markdown} />

        {/* NAVEGACIÓN anterior / siguiente */}
        <div className="mt-16 grid grid-cols-2 gap-3 border-t border-gold/10 pt-8">
          {prev ? (
            <Link
              href={`/viaje/${prev.slug}`}
              className="group rounded-xl border border-gold/15 px-4 py-3 transition-colors hover:border-gold/40 hover:bg-gold/[0.04]"
            >
              <span className="block font-cinzel text-[10px] uppercase tracking-widest text-gold/40">
                ← {fa ? "ایستگاهِ" : "Estación"} {prev.numero}
              </span>
              <span className="mt-1 flex items-baseline gap-2">
                <span className="hebrew text-lg text-gold/80">{prev.hebreo}</span>
                <span className="font-cinzel text-sm text-parchment/70">{prev.transliteracion}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/viaje/${next.slug}`}
              className="group rounded-xl border border-gold/15 px-4 py-3 text-right transition-colors hover:border-gold/40 hover:bg-gold/[0.04]"
            >
              <span className="block font-cinzel text-[10px] uppercase tracking-widest text-gold/40">
                {fa ? "ایستگاهِ" : "Estación"} {next.numero} →
              </span>
              <span className="mt-1 flex items-baseline justify-end gap-2">
                <span className="font-cinzel text-sm text-parchment/70">{next.transliteracion}</span>
                <span className="hebrew text-lg text-gold/80">{next.hebreo}</span>
              </span>
            </Link>
          ) : (
            <span />
          )}
        </div>

        {/* sello */}
        <div className="mt-14 text-center">
          <Link href="/viaje" className="font-cinzel text-xs uppercase tracking-widest text-gold/50 hover:text-gold">
            {fa ? "← همهٔ ۱۴ ایستگاه" : "← Las 14 estaciones"}
          </Link>
        </div>
      </main>
    </div>
  );
}
