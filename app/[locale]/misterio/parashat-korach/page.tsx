"use client";

import Link from "next/link";
import { useLocale } from "next-intl";

// ════════════════════════════════════════════════════════════════════════════
//  ÍNDICE — פָּרָשַׁת קֹרַח · Parashat Korach
//  Lista de enseñanzas disponibles para esta parashá.
//  Cada sub-ruta es un estudio completo con método PaRDeS.
// ════════════════════════════════════════════════════════════════════════════

const ENSENANZAS = [
  {
    slug: "ego-espiritual",
    he: "הָאֲנִי הָרוּחָנִי",
    titulo: "El ego espiritual",
    tituloEn: "The Spiritual Ego",
    gancho: "Korach tenía razón en el diagnóstico. Se equivocó en la prescripción.",
    ganchoEn: "Korach was right about the diagnosis. He was wrong about the prescription.",
    numero: "308",
    rom: "קֹרַח · Gematría",
    fuente: "Bamidbar 16:1–18:32",
  },
  {
    slug: "luz-sin-vasija",
    he: "הַנֵּר שֶׁנִּשְׁבַּר",
    titulo: "La Luz sin Vasija",
    tituloEn: "The Light Without a Vessel",
    gancho: "Tenía la llama. No tenía la mecha. Por eso ardió.",
    ganchoEn: "He had the flame. He had no wick. That is why he burned.",
    numero: "250",
    rom: "נֵר · Ner",
    fuente: "Bamidbar 16:2 · Shmuel I 12:3",
  },
];

export default function Page() {
  const locale = useLocale();

  return (
    <main
      className="min-h-screen"
      style={{ background: "#05050a", color: "#e8dcc8" }}
    >
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(5,5,10,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,164,62,0.15)" }}>
        <Link href={`/${locale}`}
          className="font-cinzel text-sm tracking-widest uppercase"
          style={{ color: "#c9a43e" }}>
          ← Jashmal
        </Link>
        <Link href={`/${locale}/misterio`}
          className="font-cinzel text-xs tracking-widest uppercase opacity-60 hover:opacity-100 transition-opacity"
          style={{ color: "#c9a43e" }}>
          Misterios
        </Link>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-16 px-6 text-center">
        {/* Etiqueta de serie */}
        <p className="font-cinzel text-xs tracking-widest uppercase mb-6"
          style={{ color: "#c9a43e", opacity: 0.7 }}>
          Serie «Parashá» · Enseñanzas
        </p>

        {/* Hebreo */}
        <p className="mb-4 text-5xl md:text-6xl"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#c9a43e",
            filter: "drop-shadow(0 0 18px rgba(201,164,62,0.45))",
            direction: "rtl",
          }}>
          פָּרָשַׁת קֹרַח
        </p>

        {/* Título español */}
        <h1 className="font-cinzel text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "#e8dcc8" }}>
          Parashat Korach
        </h1>

        {/* Descripción */}
        <p className="max-w-xl mx-auto text-base md:text-lg leading-relaxed"
          style={{ color: "#c8b89a", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem" }}>
          Bamidbar (Números) 16:1 – 18:32
        </p>

        {/* Separador dorado */}
        <div className="flex items-center justify-center gap-4 mt-10 mb-2">
          <div className="h-px w-24 opacity-40" style={{ background: "#c9a43e" }} />
          <span className="text-lg" style={{ color: "#c9a43e", opacity: 0.6 }}>✦</span>
          <div className="h-px w-24 opacity-40" style={{ background: "#c9a43e" }} />
        </div>

        <p className="font-cinzel text-xs tracking-widest uppercase mt-6"
          style={{ color: "#c9a43e", opacity: 0.5 }}>
          {ENSENANZAS.length} enseñanzas disponibles
        </p>
      </section>

      {/* CARDS */}
      <section className="max-w-3xl mx-auto px-6 pb-24 grid gap-6 md:grid-cols-2">
        {ENSENANZAS.map((e) => (
          <Link
            key={e.slug}
            href={`/${locale}/misterio/parashat-korach/${e.slug}`}
            className="block group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "rgba(201,164,62,0.04)",
              border: "1px solid rgba(201,164,62,0.18)",
            }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 50% 0%, rgba(201,164,62,0.08) 0%, transparent 70%)",
              }}
            />

            <div className="relative p-7">
              {/* Gematría badge */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="font-cinzel text-xs tracking-widest px-2 py-0.5 rounded-full"
                  style={{
                    background: "rgba(201,164,62,0.12)",
                    border: "1px solid rgba(201,164,62,0.3)",
                    color: "#c9a43e",
                  }}
                >
                  {e.numero}
                </span>
                <span className="text-xs opacity-40" style={{ color: "#c9a43e" }}>
                  {e.rom}
                </span>
              </div>

              {/* Hebreo */}
              <p
                className="text-2xl mb-3"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#c9a43e",
                  direction: "rtl",
                  filter: "drop-shadow(0 0 8px rgba(201,164,62,0.3))",
                }}
              >
                {e.he}
              </p>

              {/* Título */}
              <h2
                className="font-cinzel text-xl font-semibold mb-3"
                style={{ color: "#e8dcc8" }}
              >
                {e.titulo}
              </h2>

              {/* Gancho */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{
                  color: "#a09070",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1rem",
                }}
              >
                {e.gancho}
              </p>

              {/* Fuente */}
              <p
                className="font-cinzel text-xs tracking-wide opacity-40"
                style={{ color: "#c9a43e" }}
              >
                {e.fuente}
              </p>

              {/* Flecha */}
              <div
                className="absolute bottom-6 right-6 text-xl opacity-30 group-hover:opacity-70 group-hover:translate-x-1 transition-all duration-300"
                style={{ color: "#c9a43e" }}
              >
                →
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* FOOTER minimal */}
      <footer className="text-center pb-12 px-6">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-16 opacity-20" style={{ background: "#c9a43e" }} />
          <span className="font-cinzel text-xs tracking-widest uppercase opacity-30" style={{ color: "#c9a43e" }}>
            Jashmal · חַשְׁמַל
          </span>
          <div className="h-px w-16 opacity-20" style={{ background: "#c9a43e" }} />
        </div>
      </footer>
    </main>
  );
}
