"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LESSONS11 } from "@/lib/academia/modulo11";
import { isModuleComplete } from "@/lib/academia/progress";

const M11_SLUGS = LESSONS11.map((l) => l.slug);

export default function MaguidInicioPagina() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [m11Done, setM11Done] = useState(false);

  useEffect(() => {
    const done = isModuleComplete(M11_SLUGS);
    setM11Done(done);
    setReady(true);
    if (!done) {
      router.replace("/academia/modulo-11");
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="always-dark flex min-h-screen items-center justify-center" style={{ background: "#05050a" }}>
        <div className="h-8 w-8 animate-pulse rounded-full bg-gold/20" />
      </div>
    );
  }

  if (!m11Done) return null;

  return <MaguidInicioView />;
}

function MaguidInicioView() {
  return (
    <div className="always-dark relative min-h-screen overflow-hidden" style={{ background: "#05050a" }}>
      {/* gradiente de fondo */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 18%, rgba(201,164,62,0.10) 0%, rgba(5,5,10,0) 65%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl px-6 py-16">
        {/* nav mínima */}
        <div className="mb-12 flex items-center justify-between text-gold/60">
          <Link href="/" className="hebrew text-xl transition hover:text-gold" style={{ filter: "drop-shadow(0 0 8px #c9a43e33)" }}>
            חַשְׁמַל
          </Link>
          <Link href="/academia/javer-completo" className="font-cinzel text-[11px] uppercase tracking-[0.2em] transition hover:text-gold">
            ← JAVER completo
          </Link>
        </div>

        {/* título hebreo principal */}
        <div className="text-center">
          <p
            className="hebrew text-6xl text-gold sm:text-7xl"
            dir="rtl"
            style={{ filter: "drop-shadow(0 0 20px #c9a43e66)" }}
          >
            מַגִּיד
          </p>
          <p className="mt-3 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/55">
            El narrador
          </p>
        </div>

        {/* subtítulo */}
        <div className="mt-4 text-center">
          <p className="font-cinzel text-sm uppercase tracking-[0.3em] text-gold/70">
            El Año 2 — La narración de las capas profundas
          </p>
        </div>

        {/* mensaje de transición */}
        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/[0.04] px-7 py-8">
          <p className="text-base leading-relaxed text-parchment/90 sm:text-lg">
            En MAGUID entras al Zohar, al Jasidut y a la Cabalá luriánica completa. La preparación del Año 1 fue el cimiento. Aquí empieza la construcción.
          </p>
          <p className="mt-4 text-base leading-relaxed text-parchment/80 sm:text-lg">
            En TALMID aprendiste a leer el alefato y reconociste el cosmos que habita en cada letra. En SHOEL aprendiste a preguntar con Rashi y a escuchar la voz profética. En JAVER te sentaste junto al texto como compañero, trabajaste el alma con el Mussar, y cruzaste el umbral del Sefer Yetzirah.
          </p>
          <p className="mt-4 text-base leading-relaxed text-parchment/80 sm:text-lg">
            El MAGUID narra las capas que el estudiante del Año 1 ya puede escuchar pero aún no nombrar. Aquí los textos hablan en cuatro voces simultáneas. Aquí la Cabalá luriánica revela el árbol completo. Aquí el Baal Shem Tov enseña a servir con alegría. El que llega aquí no llega vacío.
          </p>
        </div>

        {/* separador */}
        <div className="my-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-gold/20" />
          <span className="hebrew text-sm text-gold/50" dir="rtl">כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר</span>
          <span className="h-px flex-1 bg-gold/20" />
        </div>

        {/* lo que viene en MAGUID */}
        <div className="rounded-2xl border border-gold/25 bg-gold/[0.05] px-6 py-7 text-center">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/50">
            El horizonte del Año 2
          </p>
          <div className="mt-5 flex flex-col gap-3 text-left">
            {[
              { he: "זֹהַר", label: "Zohar", desc: "El libro del esplendor — la fuente del Sod" },
              { he: "חֲסִידוּת", label: "Jasidut", desc: "El Baal Shem Tov y el servicio con alegría" },
              { he: "עֵץ חַיִּים", label: "Etz Jaim", desc: "El árbol de la vida luriánico — cuatro mundos, diez sefirot" },
              { he: "מִדְרָשׁ", label: "Midrash avanzado", desc: "La lectura entre líneas — el texto que expande el texto" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 rounded-xl border border-gold/12 bg-ink/20 px-4 py-3">
                <span className="hebrew text-xl text-gold/60" dir="rtl">{item.he}</span>
                <div>
                  <p className="font-cinzel text-[11px] uppercase tracking-widest text-gold/60">{item.label}</p>
                  <p className="mt-0.5 text-xs text-muted/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* botón de entrada — módulos en preparación */}
        <div className="mt-12 text-center">
          <div className="inline-block rounded-full border border-gold/25 bg-gold/[0.04] px-10 py-4 font-cinzel text-sm uppercase tracking-widest text-gold/50">
            Empezar MAGUID →
          </div>
          <p className="mt-3 text-xs text-muted">Los módulos de MAGUID se están preparando.</p>
        </div>

        {/* puente de vuelta */}
        <div className="mt-10 text-center">
          <Link
            href="/academia/javer-completo"
            className="font-cinzel text-[11px] uppercase tracking-widest text-parchment/45 underline-offset-4 transition hover:text-gold hover:underline"
          >
            ← Volver al cierre de JAVER
          </Link>
        </div>
      </div>
    </div>
  );
}
