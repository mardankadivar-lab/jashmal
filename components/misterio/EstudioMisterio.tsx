"use client";

import { Children, Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";
import { renderStudyText } from "@/lib/content/studyLinks";

// ════════════════════════════════════════════════════════════════════════════
//  ESTUDIO DE MISTERIO — plantilla compartida de la serie
//  "Del Enigma del Mashíaj al Ajarít HaYamim".
//
//  Calca al 100% la estructura visual del Estudio 0 (la Puerta,
//  app/[locale]/misterio/enigma-mashiaj/page.tsx): NAV → HERO (ecuación de
//  gematría) → 6 secciones en hebreo (Targum · Mefarshim · PaRDeS · Hitbonenut ·
//  Maasé · Jatimá) → umbral הֶמְשֵׁךְ con chips dorados → CTA → FOOTER.
//
//  El contenido lo escribe y verifica el Sofer (Desktop/Contenido/
//  Mashiaj-AjaritHaYamim/study-NN-*.md). Cada página de /misterio/<slug> pasa
//  ese contenido como datos a este componente. El voseo de la sección Maasé se
//  normaliza a español neutro (haz/elige/da/di/empieza/tú) ANTES de montarlo.
//
//  Idioma del análisis: español (trilingüe diferido; el chrome —nav/CTA— es es/fa).
// ════════════════════════════════════════════════════════════════════════════

// ── Sección con aparición al hacer scroll ──────────────────────────────────────
function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.12 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="transition-all duration-1000"
      style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ── Encabezado de sección (hebreo grande + subtítulo Cinzel) ────────────────────
function SectionHead({ he, title }: { he: string; title: string }) {
  return (
    <>
      <p className="hebrew mb-3 text-3xl text-gold" style={{ filter: "drop-shadow(0 0 10px rgba(201,164,62,0.5))" }}>
        {he}
      </p>
      <h2 className="mb-6 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">{title}</h2>
    </>
  );
}

// ── Párrafo de cuerpo que entiende {{study:…}} / {{letter:…}} ────────────────────
//  Acepta texto plano y/o elementos (p. ej. un <span> de etiqueta «Rashi:»).
//  Los trozos de texto se pasan por el parser de hyperlinks; los elementos
//  React se dejan intactos.
function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-sm leading-relaxed text-parchment/80 ${className}`}>
      {Children.toArray(children).map((child, i) =>
        typeof child === "string"
          ? <Fragment key={i}>{renderStudyText(child)}</Fragment>
          : child,
      )}
    </p>
  );
}

// ── Cita hebrea (versículo-ancla) ───────────────────────────────────────────────
function PullQuote({ he, es, source }: { he: string; es: string; source: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref}
      className="my-10 rounded-2xl border border-gold/20 bg-gold/[0.04] p-6 transition-all duration-1000"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)" }}>
      <p className="hebrew mb-4 text-right text-lg leading-relaxed text-gold/80">{he}</p>
      <p className="mb-1 text-sm italic leading-relaxed text-parchment/70">{`"${es}"`}</p>
      <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/40">— {source}</p>
    </div>
  );
}

// ── Glosa para el lector (recuadro tenue) ───────────────────────────────────────
function Glosa({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 rounded-xl border-s-2 border-gold/25 bg-white/[0.02] p-4 text-xs leading-relaxed text-parchment/60">
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  TIPOS DE DATOS DEL ESTUDIO
// ─────────────────────────────────────────────────────────────────────────────

// Cita hebrea con fuente (versículo-ancla).
export interface Cita {
  he: string;
  es: string;
  source: string;
  // rótulo opcional sobre la cita (ej. "Versículo-ancla I — Bereshit 49:1")
  label?: string;
}

// Hero del estudio. Tres modos posibles:
//  - "par":    dos palabras hebreas con un "=" y su valor (como el Estudio 0).
//  - "numero": un solo número/gematría grande (ej. Bereshit = 913).
//  - "frase":  sin gematría; solo la frase-gancho destacada (ej. Daniel).
export interface Hero {
  serielabel: string;        // "Serie «…» · Estudio N — …"  (es)
  serielabelFa: string;      // idem en farsi
  he: string;                // término hebreo central del título
  titulo: string;            // título es
  tituloFa: string;          // título fa
  ganchoEs: string;          // subtítulo/gancho es
  ganchoFa: string;          // subtítulo/gancho fa
  // gematría (modo "par"):
  par?: {
    a: { he: string; rom: string; color?: "gold" | "red" };
    b: { he: string; rom: string; color?: "gold" | "red" };
    valor: string;           // ej. "45"
  };
  // gematría (modo "numero"):
  numero?: { valor: string; rom: string };  // ej. { valor: "913", rom: "Bereshit" }
  // marco conceptual (modo "dimensiones"): tres pilares dorados en vez de
  // gematría. Lo usa el Estudio 0 (Persona · Conciencia colectiva · Estado de
  // conciencia). Cada pilar lleva su rótulo es/fa.
  dimensiones?: Array<{ es: string; fa: string }>;
}

// Bloque de párrafo del cuerpo: puede llevar una etiqueta dorada (ej. "Rashi.").
export interface Parrafo {
  etiqueta?: string;  // "Rashi (רַשִׁ\"י)." — se pinta en Cinzel dorado
  texto: string;      // resto del párrafo (entiende {{study:…}}/{{letter:…}})
}

export interface SubBloque {
  // sub-encabezado en Cinzel dorado dentro de PaRDeS (ej. "פְּשָׁט — Pshat")
  head: string;
  parrafos: string[];
}

// Caja dorada destacada (la "fórmula" de cierre del Sod, etc.).
export interface CajaDestacada {
  titulo: string;     // texto principal (Cinzel dorado)
  cuerpo?: string;    // texto secundario opcional
}

export interface EstudioData {
  slug: string;
  hero: Hero;
  // 1. Targum
  targum: {
    citas: Cita[];
    parrafos: string[];
  };
  // 2. Mefarshim
  mefarshim: {
    parrafos: Parrafo[];
    glosa?: string;   // texto de la glosa (HTML simple no; texto plano)
  };
  // 2b. הַבְחָנָה — Desambiguación (OPCIONAL). Sección que aclara "qué NO es /
  //     qué SÍ es" un término. La usa el Estudio 0 (Enigma del Mashíaj); los
  //     demás estudios la omiten y la sección no se pinta.
  habchana?: {
    intro?: string;          // párrafo introductorio en itálica tenue
    parrafos: string[];      // párrafos de cuerpo (entienden {{study:…}})
    tituloNo?: string;       // encabezado de la lista "qué NO es" (Cinzel dorado)
    listaNo?: string[];      // viñetas de "qué NO es"
    tituloSi?: string;       // encabezado de la lista "qué SÍ es"
    listaSi?: string[];      // viñetas de "qué SÍ es"
    cierre?: string[];       // párrafos de cierre tras las listas
  };
  // 3. PaRDeS
  pardes: {
    subbloques: SubBloque[];
    caja?: CajaDestacada;   // caja dorada de cierre (la fórmula)
  };
  // 4. Hitbonenut
  hitbonenut: {
    intro: string;
    parrafos: Parrafo[];   // cada uno con su pregunta en etiqueta
  };
  // 5. Maasé
  maase: {
    intro: string;
    etiqueta?: string;     // frase en negrita-dorado que abre la acción
    texto: string;
  };
  // 6. Jatimá
  jatima: {
    items: Parrafo[];      // idea/insight/aplicación, etiqueta + texto
  };
  // Umbral הֶמְשֵׁךְ — chips clicables {{study:…}}
  hemshej: string[];
  // CTA — versículo para "Estudiar en Jashmal" (ref de Sefaria URL-encoded)
  ctaRef?: string;         // ej. "Genesis 49:10" -> se encodea
}

// ─────────────────────────────────────────────────────────────────────────────
//  COMPONENTE
// ─────────────────────────────────────────────────────────────────────────────

export default function EstudioMisterio({ data }: { data: EstudioData }) {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  // Las páginas de misterio van SIEMPRE en oscuro.
  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = "#05050a";
  const navBg = "rgba(5,5,10,0.9)";
  const C = "#c9a43e";

  const h = data.hero;
  const ctaHref = data.ctaRef
    ? `/estudio?ref=${encodeURIComponent(data.ctaRef)}`
    : "/estudio";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* NAV — vuelve a la puerta de la serie (Estudio 0) */}
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

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <div className="mb-14 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? h.serielabelFa : h.serielabel}
          </p>

          <p className="hebrew mb-4 text-5xl font-bold text-gold sm:text-6xl"
            style={{ filter: "drop-shadow(0 0 18px rgba(201,164,62,0.5))" }}>
            {h.he}
          </p>

          <h1 className="font-cinzel text-2xl font-bold text-parchment/90 sm:text-3xl">
            {fa ? h.tituloFa : h.titulo}
          </h1>

          {/* La ecuación-gancho de gematría (modo "par") */}
          {h.par && (
            <div className="mt-7 flex items-center justify-center gap-5">
              <div className="text-center">
                <p
                  className={`hebrew text-4xl font-bold ${h.par.a.color === "red" ? "text-red-400" : "text-gold"}`}
                  style={{ filter: `drop-shadow(0 0 10px ${h.par.a.color === "red" ? "rgba(220,80,80,0.5)" : "rgba(201,164,62,0.6)"})` }}
                >
                  {h.par.a.he}
                </p>
                <p className={`mt-1 font-cinzel text-[10px] uppercase tracking-widest ${h.par.a.color === "red" ? "text-red-400/60" : "text-gold/50"}`}>
                  {h.par.a.rom}
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-cinzel text-xl text-gold/30">=</span>
                <span className="font-cinzel text-xs text-gold/40">{h.par.valor}</span>
              </div>
              <div className="text-center">
                <p
                  className={`hebrew text-4xl font-bold ${h.par.b.color === "red" ? "text-red-400" : "text-gold"}`}
                  style={{ filter: `drop-shadow(0 0 10px ${h.par.b.color === "red" ? "rgba(220,80,80,0.5)" : "rgba(201,164,62,0.6)"})` }}
                >
                  {h.par.b.he}
                </p>
                <p className={`mt-1 font-cinzel text-[10px] uppercase tracking-widest ${h.par.b.color === "red" ? "text-red-400/60" : "text-gold/50"}`}>
                  {h.par.b.rom}
                </p>
              </div>
            </div>
          )}

          {/* La ecuación-gancho de gematría (modo "numero", un solo valor) */}
          {h.numero && (
            <div className="mt-7 flex flex-col items-center gap-1">
              <p className="font-cinzel font-black leading-none text-gold"
                style={{ fontSize: "56px", textShadow: "0 0 22px rgba(201,164,62,0.5)" }}>
                {h.numero.valor}
              </p>
              <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/50">{h.numero.rom}</p>
            </div>
          )}

          {/* Marco conceptual (modo "dimensiones"): tres pilares dorados */}
          {h.dimensiones && (
            <div className="mt-7 flex flex-wrap items-stretch justify-center gap-3">
              {h.dimensiones.map((d, i) => (
                <Fragment key={i}>
                  {i > 0 && (
                    <span className="self-center font-cinzel text-lg text-gold/25">·</span>
                  )}
                  <div className="rounded-2xl border border-gold/20 bg-gold/[0.05] px-4 py-3 text-center">
                    <p className="font-cinzel text-sm font-bold text-gold"
                      style={{ filter: "drop-shadow(0 0 8px rgba(201,164,62,0.4))" }}>
                      {fa ? d.fa : d.es}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          )}

          <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted/80">
            {fa ? h.ganchoFa : h.ganchoEs}
          </p>
        </div>

        {/* ── 1. תַּרְגּוּם — Traducción ──────────────────────────────────────── */}
        <Section>
          <SectionHead he="תַּרְגּוּם" title="Traducción" />

          {data.targum.citas.map((c, i) => (
            <div key={i}>
              {c.label && (
                <P className="mb-3 mt-8 font-cinzel text-gold/70">{c.label}</P>
              )}
              <PullQuote he={c.he} es={c.es} source={c.source} />
            </div>
          ))}

          <div className="space-y-5">
            {data.targum.parrafos.map((t, i) => (
              <P key={i}>{t}</P>
            ))}
          </div>
        </Section>

        {/* ── 2. מְפָרְשִׁים — Comentaristas clásicos ────────────────────────── */}
        <Section>
          <div className="mt-16">
            <SectionHead he="מְפָרְשִׁים" title="Comentaristas clásicos" />
          </div>

          <div className="space-y-5">
            {data.mefarshim.parrafos.map((p, i) => (
              <P key={i}>
                {p.etiqueta ? <span className="font-cinzel text-gold/80">{p.etiqueta}</span> : null}
                {p.etiqueta ? " " : null}
                {p.texto}
              </P>
            ))}
          </div>

          {data.mefarshim.glosa && (
            <Glosa>
              <p>{renderStudyText(data.mefarshim.glosa)}</p>
            </Glosa>
          )}
        </Section>

        {/* ── 2b. הַבְחָנָה — Desambiguación (opcional; solo si el estudio la trae) ── */}
        {data.habchana && (
          <Section>
            <div className="mt-16">
              <SectionHead he="הַבְחָנָה" title="Desambiguación · qué NO es / qué SÍ es" />
            </div>

            {data.habchana.intro && (
              <P className="mb-6 text-xs italic text-parchment/55">{data.habchana.intro}</P>
            )}

            <div className="space-y-5">
              {data.habchana.parrafos.map((t, i) => (
                <P key={i}>{t}</P>
              ))}
            </div>

            {/* Dos columnas conceptuales: lo que NO es / lo que SÍ es */}
            {(data.habchana.listaNo?.length || data.habchana.listaSi?.length) && (
              <div className="my-8 grid gap-4 sm:grid-cols-2">
                {data.habchana.listaNo?.length ? (
                  <div className="rounded-2xl border border-red-400/20 bg-red-400/[0.04] p-5">
                    <p className="mb-3 font-cinzel text-xs uppercase tracking-widest text-red-400/70">
                      {data.habchana.tituloNo ?? "Lo que NO es"}
                    </p>
                    <ul className="space-y-3">
                      {data.habchana.listaNo.map((li, i) => (
                        <li key={i} className="text-sm leading-relaxed text-parchment/75">
                          <span className="me-2 text-red-400/60">✕</span>
                          {renderStudyText(li)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {data.habchana.listaSi?.length ? (
                  <div className="rounded-2xl border border-gold/25 bg-gold/[0.05] p-5">
                    <p className="mb-3 font-cinzel text-xs uppercase tracking-widest text-gold/70">
                      {data.habchana.tituloSi ?? "Lo que SÍ es"}
                    </p>
                    <ul className="space-y-3">
                      {data.habchana.listaSi.map((li, i) => (
                        <li key={i} className="text-sm leading-relaxed text-parchment/80">
                          <span className="me-2 text-gold/70">✓</span>
                          {renderStudyText(li)}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}

            {data.habchana.cierre?.length ? (
              <div className="space-y-5">
                {data.habchana.cierre.map((t, i) => (
                  <P key={i}>{t}</P>
                ))}
              </div>
            ) : null}
          </Section>
        )}

        {/* ── 3. פרד״ס — PaRDeS ──────────────────────────────────────────────── */}
        <Section>
          <div className="mt-16">
            <SectionHead he="פרד״ס" title="PaRDeS" />
          </div>

          <div className="space-y-5">
            {data.pardes.subbloques.map((sb, i) => (
              <Fragment key={i}>
                <P className={`${i === 0 ? "" : "mt-6 "}font-cinzel text-gold/80`}>{sb.head}</P>
                {sb.parrafos.map((t, j) => (
                  <P key={j}>{t}</P>
                ))}
              </Fragment>
            ))}
          </div>

          {data.pardes.caja && (
            <div className="my-8 rounded-2xl border border-gold/30 bg-gold/[0.06] p-6 text-center">
              <p className="font-cinzel text-base font-bold leading-relaxed text-gold">
                {data.pardes.caja.titulo}
              </p>
              {data.pardes.caja.cuerpo && (
                <p className="mt-3 text-sm leading-relaxed text-parchment/75">
                  {data.pardes.caja.cuerpo}
                </p>
              )}
            </div>
          )}
        </Section>

        {/* ── 4. הִתְבּוֹנְנוּת — Hitbonenut ──────────────────────────────────── */}
        <Section>
          <div className="mt-16">
            <SectionHead he="הִתְבּוֹנְנוּת" title="Hitbonenut · contemplación" />
          </div>
          <P className="mb-6 text-xs italic text-parchment/55">
            {data.hitbonenut.intro}
          </P>

          <div className="space-y-5">
            {data.hitbonenut.parrafos.map((p, i) => (
              <P key={i}>
                {p.etiqueta ? <span className="font-cinzel text-gold/80">{p.etiqueta}</span> : null}
                {p.etiqueta ? " " : null}
                {p.texto}
              </P>
            ))}
          </div>
        </Section>

        {/* ── 5. מַעֲשֶׂה — Maasé (voseo normalizado a neutro) ────────────────── */}
        <Section>
          <div className="mt-16">
            <SectionHead he="מַעֲשֶׂה" title="Maasé · acción" />
          </div>
          <P className="mb-6 text-xs italic text-parchment/55">
            {data.maase.intro}
          </P>

          <div className="rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
            <P>
              {data.maase.etiqueta ? <span className="font-cinzel text-gold/80">{data.maase.etiqueta}</span> : null}
              {data.maase.etiqueta ? " " : null}
              {data.maase.texto}
            </P>
          </div>
        </Section>

        {/* ── 6. חֲתִימָה — Jatimá (el sello) ─────────────────────────────────── */}
        <Section>
          <div className="mt-16">
            <SectionHead he="חֲתִימָה" title="Jatimá · el sello" />
          </div>

          <ul className="space-y-4">
            {data.jatima.items.map((it, i) => (
              <li key={i}>
                <P>
                  {it.etiqueta ? <span className="font-cinzel text-gold/80">{it.etiqueta}</span> : null}
                  {it.etiqueta ? " " : null}
                  {it.texto}
                </P>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── UMBRAL DE NAVEGACIÓN — הֶמְשֵׁךְ (Sigue el hilo) ────────────────── */}
        <Section delay={80}>
          <div className="mt-20 border-t border-gold/15 pt-10">
            <div className="mb-6 text-center">
              <p className="hebrew text-2xl text-gold/70" style={{ filter: "drop-shadow(0 0 8px rgba(201,164,62,0.4))" }}>
                הֶמְשֵׁךְ
              </p>
              <p className="mt-1 font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold/45">
                Sigue el hilo
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {data.hemshej.map((chip, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gold/20 bg-white/[0.02] px-5 py-4 text-sm leading-relaxed text-parchment/80 transition-colors hover:border-gold/40 hover:bg-gold/[0.04]"
                >
                  {renderStudyText(chip)}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── CTA — estudiar en el motor ─────────────────────────────────────── */}
        <Section delay={100}>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "این بخشی از یک سری است" : "Esto es parte de una serie"}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted/70">
              {fa
                ? "جاشمال یک موتورِ مطالعهٔ تعاملی است. هر متن مقدس را برگزینید و Claude — با روشِ پردِس — آن را برای شما تحلیل می‌کند."
                : "Jashmal es un motor de estudio interactivo. Elige cualquier texto sagrado y Claude — con el método PaRDeS — lo analiza en profundidad."}
            </p>
            <button
              onClick={() => router.push(ctaHref)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ عمیق در جاشمال ←" : "Estudiar en Jashmal →"}
            </button>
          </div>
        </Section>

        {/* ── FOOTER ─────────────────────────────────────────────────────────── */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60" style={{ filter: `drop-shadow(0 0 8px ${C}55)` }}>חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/40">
            {fa ? "کابالا و فلسفهٔ یهودی" : "Cabalá & Filosofía Judía"}
          </p>
        </div>

      </main>
    </div>
  );
}
