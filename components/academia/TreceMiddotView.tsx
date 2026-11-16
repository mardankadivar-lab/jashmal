import { Link } from "@/i18n/navigation";
import RichText from "./RichText";
import {
  CIERRE,
  CIERRE_TITULO,
  CLASES,
  ENTRADA,
  FUENTE_ANTES,
  FUENTE_DESPUES,
  HERO,
  LITURGIA,
  NOTA_FINAL,
  RASTREO,
  RASTREO_TITULO,
  REGLAS,
  RESUMEN,
  RESUMEN_CIERRE,
  TRECE_INTRO,
  type Bloque,
  type Clase,
  type Regla,
} from "@/app/[locale]/academia/trece-middot/data";

// ════════════════════════════════════════════════════════════════════════════
//  VISTA de /academia/trece-middot — página SUELTA de la Academia (no es un
//  módulo: no entra en la escalera, no se desbloquea, no pide sesión).
//
//  NO reutiliza EstudioMisterioConPanel a propósito: ese componente está
//  moldeado sobre las seis secciones del método de estudio (targum, mefarshim,
//  pardés…) y esto no es un estudio, es una página de referencia.
//
//  Lo que la vista tiene que lograr de un vistazo: que la CLASIFICACIÓN se vea
//  sin leerlo todo. Por eso aparece tres veces, siempre con la misma marca:
//    · en la leyenda de arriba, con la cuenta de cada grupo (10 · 2 · 2),
//    · en el índice, pegada a cada entrada,
//    · en la cabecera de cada entrada.
//  Y el ítem de la LISTA va aparte del número de ENTRADA, porque las trece
//  reglas son catorce entradas: dos entradas apuntan al mismo ítem (ג).
//
//  Todo el texto sale de ./data.ts (español; el hebreo es apoyo). RichText
//  pinta **negrita** / *itálica* y aísla el hebreo en línea con <bdi>.
// ════════════════════════════════════════════════════════════════════════════

const SECCIONES = [
  { id: "entrada", label: "Entrada" },
  { id: "la-lista", label: "La lista en su fuente" },
  { id: "las-trece", label: "Las trece" },
  { id: "resumen", label: "Resumen de la clasificación" },
  { id: "cierre", label: "Hilel ante los ancianos de Beterá" },
  { id: "rastreo", label: "Por qué no la llamamos guezerá shavá" },
];

const MARCA_CLS: Record<Clase, string> = {
  ley: "border-gold/45 bg-gold/[0.12] text-gold",
  lectura: "border-parchment/40 bg-parchment/[0.09] text-parchment/90",
  caballo: "border-dashed border-gold/45 bg-transparent text-gold/75",
};

function cuenta(clase: Clase): number {
  return REGLAS.filter((r) => r.clase === clase).length;
}

/** Marca de clasificación: la misma píldora en la leyenda, el índice y la entrada. */
function Marca({ clase, size = "sm" }: { clase: Clase; size?: "sm" | "xs" }) {
  return (
    <span
      className={`inline-block shrink-0 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-cinzel uppercase tracking-[0.12em] ${
        size === "xs" ? "text-[9px]" : "text-[10px]"
      } ${MARCA_CLS[clase]}`}
    >
      {CLASES[clase].marca}
    </span>
  );
}

/** Rótulo hebreo + glosa, el patrón de encabezado de la casa. */
function Rubrica({ he, label, id }: { he?: string; label: string; id?: string }) {
  return (
    <div id={id} className="scroll-mt-20 pt-2 text-center">
      {he && (
        <p
          className="hebrew text-2xl text-gold"
          dir="rtl"
          style={{ filter: "drop-shadow(0 0 8px #c9a43e44)" }}
        >
          {he}
        </p>
      )}
      <h2 className="mt-1.5 font-cinzel text-sm uppercase tracking-[0.22em] text-gold/70 sm:text-base">
        {label}
      </h2>
    </div>
  );
}

/** Párrafo suelto o párrafo que abre con rótulo en negrita. */
function BloqueProsa({ b, k }: { b: Bloque; k: string }) {
  const [primero, ...resto] = b.parrafos;
  return (
    <>
      {b.rotulo ? (
        <p>
          <strong className="text-gold/90">
            <RichText text={b.rotulo} keyPrefix={`${k}-rot`} />
          </strong>
          {primero ? " " : null}
          {primero ? <RichText text={primero} keyPrefix={`${k}-p0`} /> : null}
        </p>
      ) : primero ? (
        <p>
          <RichText text={primero} keyPrefix={`${k}-p0`} />
        </p>
      ) : null}
      {resto.map((p, i) => (
        <p key={i}>
          <RichText text={p} keyPrefix={`${k}-p${i + 1}`} />
        </p>
      ))}
    </>
  );
}

/** Una de las catorce entradas. */
function Entrada({ r }: { r: Regla }) {
  return (
    <article
      id={`regla-${r.n}`}
      className="scroll-mt-20 rounded-2xl border border-gold/15 bg-gold/[0.025] px-5 py-6 sm:px-7 sm:py-7"
    >
      {/* cabecera: nº de entrada · ítem de la lista · marca */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/[0.08] font-cinzel text-xs text-gold">
          {r.n}
        </span>
        <span className="font-cinzel text-[10px] uppercase tracking-[0.18em] text-muted/80">
          ítem{" "}
          <span className="hebrew text-gold/75" dir="rtl">
            {r.item}
          </span>{" "}
          de la lista
          {r.itemDoble ? (
            <span className="text-muted/70"> · ese ítem lleva dos reglas</span>
          ) : null}
        </span>
        <span className="ms-auto">
          <Marca clase={r.clase} />
        </span>
      </div>

      {/* título — español primero, hebreo como apoyo */}
      <h3 className="mt-4 font-cinzel text-lg leading-snug text-parchment sm:text-xl">
        {r.titulo}
      </h3>
      {/* El hebreo va pegado al título español (la página es LTR), pero con su
          dirección propia: <bdi> lo aísla sin empujarlo al margen derecho. */}
      <p className="mt-2">
        <bdi dir="rtl" className="hebrew text-xl text-gold/85 sm:text-2xl">
          {r.he}
        </bdi>
      </p>
      <p className="mt-1 text-sm text-muted">
        <RichText text={r.translit} keyPrefix={`tr${r.n}`} />
      </p>

      {/* cuerpo */}
      <div className="study-prose mt-5 text-[1.02rem] leading-relaxed text-parchment/85 sm:text-[1.08rem]">
        {r.bloques.map((b, i) => (
          <BloqueProsa key={i} b={b} k={`r${r.n}b${i}`} />
        ))}
      </div>

      {/* la clasificación, con la marca otra vez al lado del argumento */}
      <div className="mt-5 rounded-xl border border-gold/15 bg-ink/25 px-4 py-4">
        <div className="mb-2 flex items-center gap-2">
          <Marca clase={r.clase} size="xs" />
          <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-muted/70">
            {CLASES[r.clase].glosa}
          </span>
        </div>
        <div className="study-prose text-[0.98rem] leading-relaxed text-parchment/80">
          <BloqueProsa b={r.clasificacion} k={`r${r.n}cl`} />
        </div>
      </div>
    </article>
  );
}

export default function TreceMiddotView() {
  return (
    // dir="ltr" explícito: la página es en español. Bajo /fa el <html> va en
    // RTL, y sin esto el texto español saldría alineado al revés. Mismo
    // criterio que los mapas de módulo de la Academia.
    <div
      dir="ltr"
      className="always-dark relative min-h-screen overflow-hidden"
      style={{ background: "#05050a" }}
    >
      {/* halo dorado de fondo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 14%, rgba(201,164,62,0.10) 0%, rgba(5,5,10,0) 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 py-12 sm:px-6 sm:py-16">
        {/* nav mínima, como en las demás páginas sueltas de la Academia */}
        <div className="mb-10 flex items-center justify-between text-gold/60">
          <Link
            href="/"
            className="hebrew text-xl transition hover:text-gold"
            style={{ filter: "drop-shadow(0 0 8px #c9a43e33)" }}
          >
            חַשְׁמַל
          </Link>
          <Link
            href="/academia"
            className="font-cinzel text-[11px] uppercase tracking-[0.2em] transition hover:text-gold"
          >
            ← Academia
          </Link>
        </div>

        {/* ── Cabecera ──────────────────────────────────────────────────── */}
        <header className="text-center">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/45">
            La Academia · Lectura de referencia
          </p>
          <h1 className="mt-4 font-cinzel text-2xl leading-tight text-parchment sm:text-4xl">
            {HERO.titulo}
          </h1>
          <p
            className="mx-auto mt-5 hebrew max-w-xl text-xl text-gold sm:text-2xl"
            dir="rtl"
            style={{ filter: "drop-shadow(0 0 12px #c9a43e44)" }}
          >
            {HERO.he}
          </p>
          <p className="mt-3 text-sm italic text-muted sm:text-base">{HERO.glosa}</p>
        </header>

        {/* ── A un vistazo: la clasificación, con su cuenta ─────────────── */}
        <section className="mt-12 rounded-2xl border border-gold/20 bg-gold/[0.04] px-5 py-6 sm:px-7">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.28em] text-gold/50">
            De un vistazo · catorce entradas, tres grupos
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {(["ley", "lectura", "caballo"] as Clase[]).map((c) => (
              <div key={c} className="flex items-baseline gap-3">
                <span className="w-9 shrink-0 text-right font-cinzel text-xl text-gold">
                  {cuenta(c)}
                </span>
                <span className="flex flex-wrap items-center gap-2">
                  <Marca clase={c} />
                  <span className="text-sm text-parchment/70">{CLASES[c].glosa}</span>
                </span>
              </div>
            ))}
          </div>
          <p className="mt-5 border-t border-gold/10 pt-4 text-sm leading-relaxed text-muted">
            Las <strong className="text-parchment/85">trece</strong> reglas son{" "}
            <strong className="text-parchment/85">catorce entradas</strong>: dos renglones de la
            lista llevan dos reglas cada uno. El número de entrada y el ítem de la lista van
            siempre por separado.
          </p>
        </section>

        {/* ── Índice ────────────────────────────────────────────────────── */}
        <nav
          id="indice"
          aria-label="Índice de la página"
          className="mt-8 scroll-mt-20 rounded-2xl border border-gold/15 bg-ink/25 px-5 py-6 sm:px-7"
        >
          <p className="font-cinzel text-[10px] uppercase tracking-[0.28em] text-gold/50">
            Índice
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {SECCIONES.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="inline-block rounded-full border border-gold/25 px-3 py-1.5 font-cinzel text-[10px] uppercase tracking-[0.12em] text-gold/80 transition hover:border-gold/60 hover:text-gold"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          <ol className="mt-5 grid gap-1.5 sm:grid-cols-2">
            {REGLAS.map((r) => (
              <li key={r.n}>
                <a
                  href={`#regla-${r.n}`}
                  className="flex items-center gap-2.5 rounded-lg px-2 py-2 transition hover:bg-gold/[0.07]"
                >
                  <span className="w-5 shrink-0 text-right font-cinzel text-[11px] text-gold/70">
                    {r.n}
                  </span>
                  <span className="min-w-0 flex-1 text-[0.9rem] leading-snug text-parchment/85">
                    {r.titulo}
                  </span>
                  <Marca clase={r.clase} size="xs" />
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* ── Entrada ───────────────────────────────────────────────────── */}
        <section className="mt-16">
          <Rubrica id="entrada" he="פְּתִיחָה" label="Entrada" />
          <div className="study-prose mt-7 text-[1.05rem] leading-relaxed text-parchment/85 sm:text-[1.12rem]">
            {ENTRADA.map((p, i) => (
              <p key={i}>
                <RichText text={p} keyPrefix={`en${i}`} />
              </p>
            ))}
          </div>
        </section>

        {/* ── La lista en su fuente ─────────────────────────────────────── */}
        <section className="mt-16">
          <Rubrica id="la-lista" he="הַבָּרַיְתָא" label="La lista en su fuente" />
          <div className="study-prose mt-7 text-[1.05rem] leading-relaxed text-parchment/85 sm:text-[1.12rem]">
            {FUENTE_ANTES.map((p, i) => (
              <p key={i}>
                <RichText text={p} keyPrefix={`fa${i}`} />
              </p>
            ))}
          </div>

          {/* la baraitá como se recita — bloque hebreo, RTL de verdad */}
          <div
            dir="rtl"
            className="mt-6 rounded-2xl border border-gold/20 bg-gold/[0.04] px-4 py-6 sm:px-7"
          >
            <p className="hebrew text-lg leading-loose text-gold/90 sm:text-xl">
              {LITURGIA.intro}
            </p>
            <ol className="mt-4 flex flex-col gap-3">
              {LITURGIA.lineas.map((l) => (
                <li key={l.num} className="flex items-start gap-3">
                  <span className="hebrew mt-0.5 w-9 shrink-0 text-sm text-gold/60">
                    ({l.num})
                  </span>
                  <span className="hebrew flex-1 text-base leading-loose text-parchment/90 sm:text-lg">
                    {l.he}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="study-prose mt-6 text-[1.05rem] leading-relaxed text-parchment/85 sm:text-[1.12rem]">
            {FUENTE_DESPUES.map((p, i) => (
              <p key={i}>
                <RichText text={p} keyPrefix={`fd${i}`} />
              </p>
            ))}
          </div>
        </section>

        {/* ── Las trece (catorce entradas) ──────────────────────────────── */}
        <section className="mt-16">
          <Rubrica id="las-trece" he="שְׁלֹשׁ עֶשְׂרֵה" label="Las trece" />
          <div className="study-prose mt-7 text-[1.05rem] leading-relaxed text-parchment/85 sm:text-[1.12rem]">
            <p>
              <RichText text={TRECE_INTRO} keyPrefix="ti" />
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-6">
            {REGLAS.map((r) => (
              <Entrada key={r.n} r={r} />
            ))}
          </div>

          <div className="mt-6 text-center">
            <a
              href="#indice"
              className="font-cinzel text-[10px] uppercase tracking-[0.2em] text-parchment/45 underline-offset-4 transition hover:text-gold hover:underline"
            >
              ↑ Volver al índice
            </a>
          </div>
        </section>

        {/* ── Resumen de la clasificación ───────────────────────────────── */}
        <section className="mt-16">
          <Rubrica id="resumen" he="סִכּוּם" label="Resumen de la clasificación" />
          <div className="mt-7 flex flex-col gap-4">
            {RESUMEN.map((g) => (
              <div
                key={g.clase}
                className="rounded-2xl border border-gold/15 bg-gold/[0.03] px-5 py-5 sm:px-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-cinzel text-2xl leading-none text-gold">
                    {cuenta(g.clase)}
                  </span>
                  <Marca clase={g.clase} />
                  <strong className="font-cinzel text-sm text-parchment">{g.rotulo}</strong>
                </div>
                <p className="study-prose mt-3 text-[0.99rem] leading-relaxed text-parchment/80">
                  <RichText text={g.texto} keyPrefix={`rs-${g.clase}`} />
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center font-cinzel text-sm text-gold/75">{RESUMEN_CIERRE}</p>
        </section>

        {/* ── El cierre: Hilel ──────────────────────────────────────────── */}
        <section className="mt-16">
          <Rubrica id="cierre" he="חֲתִימָה" label={CIERRE_TITULO} />
          <div className="study-prose mt-7 text-[1.05rem] leading-relaxed text-parchment/85 sm:text-[1.12rem]">
            {CIERRE.map((b, i) => (
              <BloqueProsa key={i} b={b} k={`ci${i}`} />
            ))}
          </div>
        </section>

        {/* ── Por qué no la llamamos guezerá shavá ──────────────────────── */}
        <section className="mt-16">
          <Rubrica id="rastreo" label={RASTREO_TITULO} />
          <div className="study-prose mt-7 text-[1.05rem] leading-relaxed text-parchment/85 sm:text-[1.12rem]">
            {RASTREO.map((p, i) => (
              <p key={i}>
                <RichText text={p} keyPrefix={`ra${i}`} />
              </p>
            ))}
          </div>
        </section>

        {/* ── Nota de cierre ───────────────────────────────────────────── */}
        <div className="mt-14 border-t border-gold/15 pt-6 text-center text-xs leading-relaxed text-muted/80">
          <RichText text={NOTA_FINAL} keyPrefix="nf" />
        </div>

        {/* ── Puentes de salida ────────────────────────────────────────── */}
        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <a
            href="#indice"
            className="font-cinzel text-[11px] uppercase tracking-widest text-parchment/45 underline-offset-4 transition hover:text-gold hover:underline"
          >
            ↑ Volver al índice
          </a>
          <Link
            href="/academia"
            className="font-cinzel text-[11px] uppercase tracking-widest text-parchment/45 underline-offset-4 transition hover:text-gold hover:underline"
          >
            ← Volver a la Academia
          </Link>
        </div>
      </div>
    </div>
  );
}
