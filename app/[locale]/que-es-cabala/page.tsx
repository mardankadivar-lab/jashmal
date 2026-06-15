"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ─────────────────────────────────────────────────────────────────────────
//  ¿QUÉ ES LA CABALÁ? — página fundacional de LECTURA (ensayo).
//  No es un misterio (no va en lib/content/misterios.ts); es una página de
//  introducción honesta. Estética Jashmal: fondo #05050a, oro #c9a43e,
//  títulos Cinzel, cuerpo Cormorant/EB Garamond, dark forzado, RTL para fa.
//
//  Idioma: el texto canónico está en español (verificado por el Sofer). El
//  farsi queda pendiente; mientras tanto cae al español.
//  TODO(fa): traducción pendiente — Mardan/Sofer
// ─────────────────────────────────────────────────────────────────────────

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="transition-all duration-1000"
      style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

export default function PageQueEsCabala() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  // Esta página fundacional se lee SIEMPRE en oscuro: las letras hebreas
  // doradas y el texto pergamino solo lucen bien sobre #05050a.
  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = "#05050a";
  const navBg = "rgba(5,5,10,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">← {fa ? "خانه" : "Inicio"}</Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
              {fa ? "شروع مطالعه" : "Comenzar estudio →"}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* HERO */}
        <header className="mb-14 text-center">
          <p className="hebrew mb-4 text-5xl font-bold leading-none"
            style={{ color: "#fff6e0", textShadow: "0 0 26px #c9a43e, 0 0 9px #c9a43e" }}>
            קַבָּלָה
          </p>
          <h1 className="font-cinzel text-3xl font-bold text-gold sm:text-4xl"
            style={{ textShadow: "0 0 22px rgba(201,164,62,0.4)" }}>
            {fa ? "کابالا چیست؟" : "¿Qué es la Cabalá?"}
          </h1>
          <p className="mx-auto mt-4 max-w-md font-cormorant text-lg italic text-parchment/70" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "نه چیزی که اختراع می‌شود، بلکه چیزی که دریافت می‌گردد."
              : "No es algo que se inventa; es algo que se recibe."}
          </p>
        </header>

        {/* I — La palabra «recibir» */}
        <Section>
          <h2 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {/* TODO(fa): traducción pendiente — Mardan/Sofer */}
            {fa ? "۱ · واژهٔ «دریافت کردن»" : "I · La palabra «recibir»"}
          </h2>
          <div className="space-y-5 text-[15px] leading-loose text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              La palabra hebrea <span className="hebrew text-gold/90">קַבָּלָה</span> (<em>Kabalá</em>)
              viene de la raíz <span className="hebrew">ק־ב־ל</span>, «recibir». No es algo que se inventa;
              es algo que se recibe: la tradición transmitida de maestro a discípulo, como una llama que
              pasa de vela a vela.
            </p>
          </div>
        </Section>

        {/* II — Qué ES la Cabalá */}
        <Section>
          <h2 className="mb-4 mt-14 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {/* TODO(fa): traducción pendiente — Mardan/Sofer */}
            {fa ? "۲ · کابالا چه هست" : "II · Qué ES la Cabalá"}
          </h2>
          <div className="space-y-5 text-[15px] leading-loose text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              El judaísmo lee sus textos en cuatro niveles a la vez:{" "}
              <span className="hebrew text-gold/90">פַּרְדֵּ"ס</span> (<em>PaRDeS</em>) — «huerto»,
              acrónimo de <strong className="text-parchment/95">Pshat</strong> (sentido simple),{" "}
              <strong className="text-parchment/95">Remez</strong> (alusión),{" "}
              <strong className="text-parchment/95">Drash</strong> (interpretación) y{" "}
              <strong className="text-parchment/95">Sod</strong> (secreto). La Cabalá es ese cuarto nivel:
              el <span className="text-gold/90">Sod</span>, el alma mística de la Torá. No es un libro aparte;
              es la dimensión más íntima de la misma Torá.
            </p>
            <p>
              Su objetivo no es curiosidad: es transformación. Pregunta quién es el Creador, cómo de un
              Infinito surgió un mundo finito, cuál es la estructura oculta de la realidad. Ofrece un mapa:
              las <span className="text-gold/90">Sefirot</span> (diez canales por los que la luz infinita se
              hace mundo), el <span className="text-gold/90">Tzimtzum</span> (la «contracción» por la que el
              Infinito hizo espacio para que existiera algo distinto de Él), y sobre todo el{" "}
              <span className="text-gold/90">Tikún</span> (la «reparación»: el mundo está quebrado y la tarea
              del ser humano es repararlo y acercar su alma a su origen).
            </p>
            <p>
              Nombres centrales: el <span className="text-gold/90">Zohar</span> (la obra clásica, atribuida a
              Rabí Shimón bar Yojai); el <span className="text-gold/90">Arizal</span> (Rabí Itzjak Luria,
              1534–1572, que reformuló toda la Cabalá); el <em>Etz Jaim</em> («Árbol de Vida», donde su
              discípulo Rabí Jaim Vital puso por escrito sus enseñanzas); y{" "}
              <span className="text-gold/90">Baal HaSulam</span> (Rabí Yehudá Ashlag, que la tradujo al lector
              moderno).
            </p>
            <div className="rounded-xl border border-gold/15 bg-gold/[0.04] p-5">
              <p className="text-[14px] leading-relaxed text-parchment/80">
                El Talmud (<span className="text-gold/90">Jaguigá 14b</span>) cuenta que cuatro sabios
                «entraron al Pardés»: Ben Azzai murió, Ben Zoma perdió la razón, Ajer se volvió hereje, y solo
                Rabí Akivá entró y salió en paz. La enseñanza no es «aléjate», sino «acércate con preparación,
                humildad y guía».
              </p>
            </div>
          </div>
        </Section>

        {/* III — Qué NO es */}
        <Section>
          <h2 className="mb-4 mt-14 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {/* TODO(fa): traducción pendiente — Mardan/Sofer */}
            {fa ? "۳ · کابالا چه نیست" : "III · Qué NO es"}
          </h2>
          <div className="space-y-5 text-[15px] leading-loose text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              No es magia, brujería ni adivinación; no sirve para «manifestar» deseos materiales. No es la
              «cábala» de las pulseras rojas y las celebridades —un fenómeno comercial que tomó prestado un
              nombre sagrado—. No es numerología supersticiosa: la gematría es una herramienta de estudio
              dentro de un marco, no un oráculo. No es una religión aparte ni un atajo místico que salta el
              estudio y la ética: está enraizada en la Torá, la <span className="text-gold/90">halajá</span>{" "}
              (la ley y práctica, el «cómo se camina») y el refinamiento del carácter. No es solo para
              «iluminados», pero pide humildad, contexto y guía.
            </p>
          </div>
        </Section>

        {/* IV — El enfoque de Jashmal */}
        <Section>
          <h2 className="mb-4 mt-14 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {/* TODO(fa): traducción pendiente — Mardan/Sofer */}
            {fa ? "۴ · رویکردِ خشمل" : "IV · El enfoque de Jashmal"}
          </h2>
          <div className="space-y-5 text-[15px] leading-loose text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              El nombre Jashmal (<span className="hebrew text-gold/90">חַשְׁמַל</span>) viene de
              Yejezkel/Ezequiel 1:4, donde en el centro del fuego aparece «como el resplandor del jashmal» — la
              tradición lo lee como <em>jash</em> (silencio) + <em>mal</em> (habla). Somos honestos (citamos
              fuentes exactas y verificamos), profundos sin diluir, accesibles sin vulgarizar. Jashmal no
              muestra conocimiento; lo revela.
            </p>
          </div>
        </Section>

        {/* CTA */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: "0 0 12px #c9a43e88" }}>
              חַשְׁמַל
            </p>
            <p className="mx-auto mb-6 max-w-md font-cormorant text-lg italic text-parchment/80">
              {fa
                ? "خشمل دانش را نشان نمی‌دهد؛ آن را آشکار می‌کند."
                : "Jashmal no muestra conocimiento; lo revela."}
            </p>
            <button
              onClick={() => router.push("/estudio")}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "آغازِ مطالعه ←" : "Comenzar a estudiar →"}
            </button>
            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterios" className="hover:text-gold">{fa ? "اسرار ←" : "Misterios →"}</Link>
            </div>
          </div>
        </Section>

        {/* FOOTER */}
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
