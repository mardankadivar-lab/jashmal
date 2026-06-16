"use client";

import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ─────────────────────────────────────────────────────────────────────────
//  ESTUDIO "PRÓXIMAMENTE" — placeholder de los módulos de una serie aún no
//  escritos. Su única misión es que los enlaces internos {{study:…}} del
//  estudio publicado NO queden rotos (404): apuntan a una página válida que
//  anuncia, con honestidad, que el contenido llegará pronto. Cuando el Sofer
//  escriba el módulo, esta página se reemplaza por el estudio real.
// ─────────────────────────────────────────────────────────────────────────
export default function EstudioProximamente({
  he,
  tituloEs,
  tituloFa,
  resumenEs,
  resumenFa,
  serieEs = "Del Enigma del Mashíaj al Ajarít HaYamim",
  serieFa = "از معمای ماشیح تا آخریتِ روزها",
}: {
  he: string;
  tituloEs: string;
  tituloFa: string;
  resumenEs: string;
  resumenFa: string;
  serieEs?: string;
  serieFa?: string;
}) {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = "#05050a";
  const navBg = "rgba(5,5,10,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>
      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/misterio/enigma-mashiaj" className="font-cinzel text-sm text-gold/70 hover:text-gold">
            {fa ? "→ معمای ماشیح" : "← El Enigma del Mashíaj"}
          </Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
              {fa ? "شروع مطالعه" : "Comenzar estudio →"}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-5 py-24 text-center">
        <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/45">
          {fa ? serieFa : serieEs}
        </p>

        <p className="hebrew mb-5 text-5xl font-bold text-gold sm:text-6xl"
          style={{ filter: "drop-shadow(0 0 18px rgba(201,164,62,0.45))" }}>
          {he}
        </p>

        <h1 className="font-cinzel text-2xl font-bold text-parchment/90 sm:text-3xl">
          {fa ? tituloFa : tituloEs}
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted/80">
          {fa ? resumenFa : resumenEs}
        </p>

        {/* Sello "próximamente" */}
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/[0.06] px-5 py-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
          <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-gold/80">
            {fa ? "به‌زودی" : "Próximamente"}
          </span>
        </div>

        <p className="mx-auto mt-6 max-w-sm text-xs leading-relaxed text-muted/55">
          {fa
            ? "این مطالعه بخشی از یک سری در حالِ تدوین است. تا آن زمان، می‌توانید از دروازهٔ سری آغاز کنید."
            : "Este estudio forma parte de una serie en preparación. Mientras tanto, puedes empezar por la puerta de la serie."}
        </p>

        <button
          onClick={() => router.push("/misterio/enigma-mashiaj")}
          className="mt-7 rounded-full border-2 border-gold bg-gold/10 px-7 py-3 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
          style={{ boxShadow: "0 0 20px rgba(201,164,62,0.2)" }}
        >
          {fa ? "بازگشت به معمای ماشیح ←" : "Volver al Enigma del Mashíaj →"}
        </button>

        {/* FOOTER */}
        <div className="mt-20 border-t border-gold/10 pt-8">
          <p className="hebrew text-2xl text-gold/55">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/40">
            {fa ? "کابالا و فلسفهٔ یهودی" : "Cabalá & Filosofía Judía"}
          </p>
        </div>
      </main>
    </div>
  );
}
