"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { LESSONS7 } from "@/lib/academia/modulo7";
import { readProgress, isModuleComplete } from "@/lib/academia/progress";

const M7_SLUGS = LESSONS7.map((l) => l.slug);

export default function JaverInicioPagina() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [m7Done, setM7Done] = useState(false);

  useEffect(() => {
    const done = isModuleComplete(M7_SLUGS);
    setM7Done(done);
    setReady(true);
    if (!done) {
      router.replace("/academia/modulo-7");
    }
  }, [router]);

  if (!ready) {
    return (
      <div className="always-dark flex min-h-screen items-center justify-center" style={{ background: "#05050a" }}>
        <div className="h-8 w-8 animate-pulse rounded-full bg-gold/20" />
      </div>
    );
  }

  if (!m7Done) return null;

  return <JaverInicioView />;
}

function JaverInicioView() {
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
          <Link href="/academia/shoel-completo" className="font-cinzel text-[11px] uppercase tracking-[0.2em] transition hover:text-gold">
            ← SHOEL completo
          </Link>
        </div>

        {/* título hebreo principal */}
        <div className="text-center">
          <p
            className="hebrew text-6xl text-gold sm:text-7xl"
            dir="rtl"
            style={{ filter: "drop-shadow(0 0 20px #c9a43e66)" }}
          >
            חָבֵר
          </p>
          <p className="mt-3 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/55">
            El compañero de estudio
          </p>
        </div>

        {/* mensaje de transición */}
        <div className="mt-12 rounded-2xl border border-gold/20 bg-gold/[0.04] px-7 py-8">
          <p className="text-base leading-relaxed text-parchment/90 sm:text-lg">
            Dejaste de solo preguntar. Ahora te sientas a estudiar junto al texto.
          </p>
          <p className="mt-4 text-base leading-relaxed text-parchment/80 sm:text-lg">
            En TALMID aprendiste a leer. En SHOEL aprendiste a preguntar. Ahora el grado JAVER
            te enseña algo diferente: a sentarte con el texto como si fuera un compañero vivo —
            a hacer Jevrutá, el estudio en pareja con el texto y los comentaristas.
          </p>
          <p className="mt-4 text-base leading-relaxed text-parchment/80 sm:text-lg">
            En JAVER trabajarás con el Midrash que lee entre líneas, con el Nombre que une todo,
            con la dimensión interior de lo que hasta ahora estudió en superficie.
            El trabajo interior empieza aquí.
          </p>
        </div>

        {/* separador */}
        <div className="my-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-gold/20" />
          <span className="hebrew text-sm text-gold/50" dir="rtl">כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר</span>
          <span className="h-px flex-1 bg-gold/20" />
        </div>

        {/* la herramienta central */}
        <div className="rounded-2xl border border-gold/25 bg-gold/[0.05] px-6 py-7 text-center">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-gold/50">
            La herramienta central del nivel JAVER
          </p>
          <p className="mt-3 hebrew text-2xl text-gold" dir="rtl" style={{ filter: "drop-shadow(0 0 10px #c9a43e44)" }}>
            חֶבְרוּתָא
          </p>
          <p className="mt-2 font-cinzel text-sm uppercase tracking-widest text-gold/60">
            Jevrutá · El estudio en pareja
          </p>
          <p className="mt-4 text-sm leading-relaxed text-parchment/80">
            El texto no se estudia solo. En Jevrutá, tú y el texto se sientan frente a frente —
            el texto habla, tú respondes, el texto te corrige, tú vuelves a preguntar.
            Los comentaristas son los otros compañeros en la sala. Nadie estudia sin ellos.
          </p>
        </div>

        {/* CTA Cohorte 1 */}
        <div className="mt-12 text-center space-y-4">
          <p className="font-cinzel text-xs uppercase tracking-[0.2em] text-gold/55">
            La Cohorte 1 arranca el 22 de septiembre — Rosh Hashaná.
          </p>
          <Link
            href="/academia/lista-de-espera"
            className="inline-block rounded-full border-2 border-gold bg-gold/10 px-10 py-4 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20 hover:shadow-[0_0_24px_rgba(201,164,62,0.30)]"
          >
            Unirme a la lista de espera →
          </Link>
        </div>

        {/* puente de vuelta */}
        <div className="mt-10 text-center">
          <Link
            href="/academia/shoel-completo"
            className="font-cinzel text-[11px] uppercase tracking-widest text-parchment/45 underline-offset-4 transition hover:text-gold hover:underline"
          >
            ← Volver al cierre de SHOEL
          </Link>
        </div>
      </div>
    </div>
  );
}
