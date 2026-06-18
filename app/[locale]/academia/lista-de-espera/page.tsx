// app/[locale]/academia/lista-de-espera/page.tsx
// Página pública de lista de espera para la Cohorte 1 — Rosh Hashaná 22 sep 2026.
import { Link } from "@/i18n/navigation";
import CohortCountdown from "@/components/academia/CohortCountdown";
import WaitlistForm from "@/components/academia/WaitlistForm";

export const metadata = {
  title: "Lista de espera · Cohorte 1 · Academia Jashmal",
  description:
    "El Año 1 de la Academia Jashmal arranca el 22 de septiembre 2026 — Rosh Hashaná. Únete a la lista de espera de la Cohorte 1.",
};

export default function ListaDeEsperaPagina() {
  return (
    <div
      className="always-dark relative min-h-screen overflow-hidden"
      style={{ background: "#05050a" }}
    >
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

        {/* hero */}
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
          <p className="mt-2 font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/40">
            Cohorte 1 · Rosh Hashaná 5787
          </p>
        </div>

        {/* cuenta regresiva */}
        <div className="mt-12">
          <CohortCountdown />
        </div>

        {/* separador */}
        <div className="my-12 flex items-center gap-4">
          <span className="h-px flex-1 bg-gold/20" />
          <span className="hebrew text-sm text-gold/50" dir="rtl">
            כְּאוֹר נֹגַהּ הוֹלֵךְ וָאוֹר
          </span>
          <span className="h-px flex-1 bg-gold/20" />
        </div>

        {/* descripción */}
        <div className="space-y-5 rounded-2xl border border-gold/15 bg-gold/[0.03] px-7 py-8">
          <p className="text-base leading-relaxed text-parchment/85">
            El Año 1 de la Academia de Jashmal cubre 52 semanas de estudio guiado — desde ¿qué
            es la Torá? hasta el Sefer Yetzirah. No es un curso en video. Es un currículo de
            lectura real con fuentes verificadas, tareas semanales y un proyecto final.
          </p>
          <p className="text-base leading-relaxed text-parchment/80">
            La Cohorte 1 arranca el 22 de septiembre, Rosh Hashaná — el Año Nuevo hebreo. Todos
            los estudiantes empiezan el mismo día. El estudio en comunidad, como la tradición del
            Jevrutá, es parte del método.
          </p>
          <p className="text-base leading-relaxed text-parchment/80">
            La inscripción abre el 22 de septiembre y cierra el 29 de septiembre. Después, la
            próxima cohorte es en Nisán 5787 (Pésaj 2027).
          </p>
        </div>

        {/* separador */}
        <div className="my-12 h-px w-full bg-gold/15" />

        {/* formulario */}
        <div>
          <p className="mb-2 font-cinzel text-[11px] uppercase tracking-[0.3em] text-gold/50">
            Reserva tu lugar
          </p>
          <h2 className="mb-6 font-cinzel text-xl text-parchment sm:text-2xl">
            Únete a la lista de espera
          </h2>
          <WaitlistForm />
        </div>

        {/* footer */}
        <div className="mt-16 text-center">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-parchment/30">
            52 semanas · 4 módulos · Año 1 completo · jashmal.org
          </p>
        </div>
      </div>
    </div>
  );
}
