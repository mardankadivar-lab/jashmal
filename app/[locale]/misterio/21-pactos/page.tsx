"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: 21 PACTOS / EHYÉ = 21 ─────────────────────────────────
// El Nombre Ehyé (אהיה, "Yo Seré", Éx 3:14) suma 21, y la Torá guarda 21 pactos
// que sostienen la realidad. El jidush: 21 pactos = Ehyé = Biná (8ª sefirá desde
// Maljut), en la cadena Ehyé(21) → YHVH(26) → Adonai(65).
// Idioma principal: español. El farsi de contenido erudito está pendiente de
// verificación del Sofer; hasta entonces el toggle cae al español a propósito
// (igual que /tamar). NO se inventa traducción al persa sin pasar por el Sofer.
//
// ⚠️ AVISOS DEL SOFER aplicados en el texto:
//   1) "21 = Ehyé" es JIDUSH cabalístico (sod/remez), no dato literal de la Torá
//      escrita. Se dice "la Cabalá descubre / en clave de sod".
//   2) El pacto davídico: la PROMESA está en 2 Samuel 7, pero la palabra "pacto"
//      (berit) aparece en el Salmo 89. No se dice que 2Sm 7 diga "pacto".
//   3) El "Nuevo Pacto" (Jeremías 31) es la RENOVACIÓN INTERIOR del mismo pacto
//      del Sinaí (Torá en el corazón), no su anulación ni un pacto cristiano.

// ── Los 21 pactos (britot) — texto base verificado por el Sofer ───────────────
interface Pacto {
  n: number;
  nombre: string;
  ref: string;        // texto base (referencia bíblica)
  sefariaRef?: string; // ref para abrir en /estudio (Sefaria), si aplica
  sentido: string;    // una línea de sentido espiritual
  grupo: GrupoKey;
}

type GrupoKey = "creacion" | "patriarcas" | "nacion" | "sacerdocio" | "realeza" | "cosmos" | "humanos" | "renovacion";

const GRUPOS: Record<GrupoKey, { label: string; color: string }> = {
  creacion:   { label: "La creación",   color: "#9ad6a0" },
  patriarcas: { label: "Los patriarcas", color: "#e0a850" },
  nacion:     { label: "La nación",     color: "#c9a43e" },
  sacerdocio: { label: "El sacerdocio", color: "#cfe0ff" },
  realeza:    { label: "La realeza",    color: "#f0d060" },
  cosmos:     { label: "El cosmos",     color: "#a8c4e8" },
  humanos:    { label: "Entre hombres", color: "#c98bd6" },
  renovacion: { label: "La renovación", color: "#1fd8e0" },
};

const PACTOS: Pacto[] = [
  { n: 1, nombre: "Pacto con Noé", ref: "Génesis 9", sefariaRef: "Genesis 9", sentido: "El arcoíris. Dios promete no destruir otra vez toda carne. Sostiene la continuidad de la creación.", grupo: "creacion" },
  { n: 2, nombre: "Pacto con Abraham", ref: "Génesis 15 y 17", sefariaRef: "Genesis 17", sentido: "La circuncisión (Brit Milá): descendencia, tierra y bendición. Elección y misión.", grupo: "patriarcas" },
  { n: 3, nombre: "Pacto con Isaac", ref: "Génesis 26", sefariaRef: "Genesis 26", sentido: "Dios confirma a Isaac el pacto de su padre. La alianza pasa a la siguiente generación.", grupo: "patriarcas" },
  { n: 4, nombre: "Pacto con Jacob", ref: "Génesis 28; Levítico 26:42", sefariaRef: "Genesis 28", sentido: "La promesa se confirma en Jacob: tierra, descendencia y protección. Israel toma forma.", grupo: "patriarcas" },
  { n: 5, nombre: "Pacto del Sinaí", ref: "Éxodo 19–24", sefariaRef: "Exodus 19", sentido: "Dios entrega la Torá y constituye a Israel como nación santa. La gran alianza nacional.", grupo: "nacion" },
  { n: 6, nombre: "Pacto del Shabat", ref: "Éxodo 31:16", sefariaRef: "Exodus 31:16", sentido: "«Pacto perpetuo». La alianza no está solo en la carne o la tierra, sino también en el tiempo.", grupo: "nacion" },
  { n: 7, nombre: "Pacto de sangre del altar", ref: "Éxodo 24:8", sefariaRef: "Exodus 24:8", sentido: "«He aquí la sangre del pacto». La ratificación solemne del Sinaí: el pueblo ligado a la palabra.", grupo: "nacion" },
  { n: 8, nombre: "Pacto sacerdotal", ref: "Números 18:19", sefariaRef: "Numbers 18:19", sentido: "El servicio del altar y la porción de los kohanim. El canal de santidad entre Israel y Dios.", grupo: "sacerdocio" },
  { n: 9, nombre: "Pacto de sal", ref: "Levítico 2:13; Números 18:19; 2 Crónicas 13:5", sefariaRef: "Leviticus 2:13", sentido: "La sal: permanencia, preservación, incorruptibilidad. Lo santo que no se corrompe.", grupo: "sacerdocio" },
  { n: 10, nombre: "Pacto de paz con Pinjás", ref: "Números 25:12-13", sefariaRef: "Numbers 25:12", sentido: "Brit Shalom: el celo purificado se vuelve paz. El juicio transformado en reparación.", grupo: "sacerdocio" },
  { n: 11, nombre: "Pacto con Leví", ref: "Malaquías 2:4-5", sefariaRef: "Malachi 2:4", sentido: "«Mi pacto con él fue de vida y paz». Enseñanza, temor de Dios y pureza del servicio.", grupo: "sacerdocio" },
  { n: 12, nombre: "Pacto davídico", ref: "Promesa en 2 Samuel 7 · llamada «pacto» en Salmo 89", sefariaRef: "II Samuel 7", sentido: "Dios promete a David una casa, un trono y una dinastía. La promesa está en 2 Samuel 7; la palabra «pacto» (berit) aparece en el Salmo 89.", grupo: "realeza" },
  { n: 13, nombre: "Pacto con el día y la noche", ref: "Jeremías 33:20, 25", sefariaRef: "Jeremiah 33:20", sentido: "La estabilidad del orden cósmico. La creación obedece a ritmos fijados por Dios.", grupo: "cosmos" },
  { n: 14, nombre: "Nuevo Pacto", ref: "Jeremías 31:31-34", sefariaRef: "Jeremiah 31:31", sentido: "La Torá escrita en el corazón: la renovación interior del mismo pacto del Sinaí — no su anulación, sino su interiorización.", grupo: "renovacion" },
  { n: 15, nombre: "Pacto con la creación", ref: "Génesis 8:22; Jeremías 33:25", sefariaRef: "Genesis 8:22", sentido: "Siembra y cosecha, frío y calor, día y noche. El mundo se sostiene por una fidelidad constante.", grupo: "cosmos" },
  { n: 16, nombre: "Pacto Abraham–Abimélec", ref: "Génesis 21", sefariaRef: "Genesis 21", sentido: "Un pacto humano de paz y reconocimiento. También entre hombres la palabra obliga.", grupo: "humanos" },
  { n: 17, nombre: "Pacto Isaac–Abimélec", ref: "Génesis 26", sefariaRef: "Genesis 26:28", sentido: "Abimélec reconoce que Dios está con Isaac y busca pacto. La bendición visible produce reconocimiento.", grupo: "humanos" },
  { n: 18, nombre: "Pacto Jacob–Labán", ref: "Génesis 31", sefariaRef: "Genesis 31", sentido: "Establecen un límite entre ambos. No todo pacto es unión cercana: algunos ponen frontera.", grupo: "humanos" },
  { n: 19, nombre: "Pacto David–Jonatán", ref: "1 Samuel 18; 20", sefariaRef: "I Samuel 18", sentido: "Pacto de amor, lealtad y protección. La fidelidad del alma más allá del interés.", grupo: "humanos" },
  { n: 20, nombre: "Pacto con los gabaonitas", ref: "Josué 9", sefariaRef: "Joshua 9", sentido: "Israel hace pacto, aunque fue por engaño. Enseña el peso sagrado de la palabra dada.", grupo: "humanos" },
  { n: 21, nombre: "Pactos de renovación nacional", ref: "Josué 24; 2 Reyes 23; Nehemías 9–10", sefariaRef: "Joshua 24", sentido: "El pueblo renueva su fidelidad a la Torá. El pacto no solo se recibe: se renueva en cada generación.", grupo: "renovacion" },
];

// ── Componentes (idénticos en estilo a /tamar) ────────────────────────────────
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

function PullQuote({ he, es, source }: { he: string; es: string; source: string }) {
  return (
    <Section>
      <div className="my-10 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
        <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
        <p className="mb-1 text-sm italic leading-relaxed text-parchment/80">«{es}»</p>
        <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/50">— {source}</p>
      </div>
    </Section>
  );
}

// Tile oscuro con letra/número hebreo grande (legible en cualquier tema).
function HebrewTile({ he, sub, color }: { he: string; sub: string; color: string }) {
  return (
    <div
      className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
      style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}
    >
      <span
        className="hebrew font-bold leading-none"
        style={{ fontSize: "clamp(56px, 14vw, 78px)", color: "#fff6e0", textShadow: `0 0 22px ${color}, 0 0 8px ${color}` }}
      >
        {he}
      </span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function VeintiunPactosPage() {
  const locale = useLocale();
  const router = useRouter();
  // El contenido erudito de farsi aún no está verificado por el Sofer: hasta
  // entonces esta página se muestra siempre en español, aunque el toggle exista.
  const fa = false;

  const [dark, setDark] = useState(true);
  // Las páginas de misterio van SIEMPRE en oscuro: el hebreo dorado y el texto
  // pergamino solo se leen bien sobre fondo #05050a.
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir="ltr">

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">חַשְׁמַל · Jashmal</Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
              Comenzar estudio →
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── HERO ── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            Éxodo 3:14 · Gematría · Cabalá
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(56px, 16vw, 110px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            אֶהְיֶה
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            El Nombre que vale 21
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Cuando Dios se revela a Moisés se llama a Sí mismo «Yo Seré» — un Nombre
            que suma 21. Y la Torá guarda 21 pactos que sostienen la realidad entera.
            La Cabalá lee, debajo del número, una sola estructura.
          </p>
        </div>

        {/* ── El Nombre Ehyé ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            El Nombre
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              En la zarza, Moisés pregunta a Dios cómo se llama. La respuesta es
              uno de los versículos más altos de la Torá:{" "}
              <span className="hebrew text-gold/90" dir="rtl">אֶהְיֶה אֲשֶׁר אֶהְיֶה</span> —{" "}
              <span className="text-gold/90">«Seré el que Seré»</span> (Éxodo 3:14).
              No dice «Yo soy», sino «Yo <span className="italic">seré</span>»: un Nombre
              de devenir, de despliegue, de algo que todavía se está revelando.
            </p>
            <p>
              El Nombre <span className="hebrew text-gold/90" dir="rtl">אֶהְיֶה</span> (Ehyé)
              tiene una cuenta exacta:
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="אֶהְיֶה" sub="Ehyé · «Yo Seré»" color="#1fd8e0" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <HebrewTile he="21" sub="א1 · ה5 · י10 · ה5" color="#c9a43e" />
          </div>

          <div className="mt-6 text-center">
            <p className="font-cinzel text-sm text-gold/80">
              א (1) + ה (5) + י (10) + ה (5) = 21
            </p>
          </div>
        </Section>

        {/* ── Los 21 pactos ── */}
        <Section>
          <h3 className="mb-3 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Los 21 pactos
          </h3>
          <p className="mx-auto mb-3 max-w-md text-center text-sm leading-relaxed text-muted">
            La Biblia teje pactos divinos, cósmicos, sacerdotales, reales y humanos.
            Juntos forman una red que sostiene toda la realidad — desde la naturaleza
            hasta el corazón del hombre.
          </p>
          <p className="mx-auto mb-8 max-w-md text-center font-cinzel text-[11px] uppercase tracking-widest text-gold/45">
            Toca un pacto para estudiar su texto base
          </p>
        </Section>

        <div className="space-y-2.5">
          {PACTOS.map((p, i) => {
            const g = GRUPOS[p.grupo];
            return (
              <Section key={p.n} delay={Math.min(i, 8) * 35}>
                <button
                  onClick={() => p.sefariaRef && router.push(`/estudio?ref=${encodeURIComponent(p.sefariaRef)}`)}
                  className="group flex w-full items-start gap-4 rounded-2xl border border-gold/15 p-4 text-left transition-all hover:border-gold/40 hover:bg-gold/[0.04]"
                  style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}
                >
                  <span className="hebrew shrink-0 font-bold leading-none"
                    style={{ fontSize: "clamp(26px, 7vw, 34px)", color: dark ? "#fff6e0" : "#3a2a08",
                      textShadow: dark ? `0 0 14px ${g.color}` : "none", minWidth: "1.6em", textAlign: "center" }}>
                    {p.n}
                  </span>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <p className="font-cinzel text-sm font-bold tracking-wide text-parchment/95">
                        {p.nombre}
                      </p>
                      <span className="font-cinzel text-[10px] uppercase tracking-widest"
                        style={{ color: g.color }}>· {g.label}</span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-parchment/70">{p.sentido}</p>
                    <p className="mt-1.5 font-cinzel text-[10px] uppercase tracking-widest text-gold/45 group-hover:text-gold/70">
                      {p.ref}
                    </p>
                  </div>
                </button>
              </Section>
            );
          })}
        </div>

        {/* ── Aviso del Sofer sobre el Nuevo Pacto y el davídico (en el cuerpo) ── */}
        <Section>
          <div className="mt-8 rounded-2xl border border-gold/15 bg-gold/[0.03] p-5">
            <p className="mb-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/55">
              Dos precisiones honestas
            </p>
            <ul className="space-y-2 text-xs leading-relaxed text-parchment/75">
              <li>
                <span className="text-gold/85">El pacto davídico.</span> La promesa de
                la casa y el trono se da en 2 Samuel 7, pero allí no aparece la palabra
                «pacto»: es el Salmo 89 el que la nombra explícitamente como{" "}
                <span className="hebrew text-gold/90" dir="rtl">בְּרִית</span> (berit).
              </li>
              <li>
                <span className="text-gold/85">El «Nuevo Pacto».</span> En Jeremías 31 no
                es un pacto distinto ni la anulación del Sinaí: es la{" "}
                <span className="text-gold/90">renovación interior</span> del mismo pacto
                — la Torá ya no en tablas de piedra, sino escrita en el corazón.
              </li>
            </ul>
          </div>
        </Section>

        {/* ── El jidush: 21 = Ehyé = Biná ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            El jidush · una lectura de sod
          </h3>
        </Section>

        <PullQuote
          he="אֶהְיֶה אֲשֶׁר אֶהְיֶה"
          es="Seré el que Seré."
          source="Éxodo 3:14"
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Aquí viene la conexión profunda — y conviene decirlo con cuidado:{" "}
              <span className="text-gold/90">la Torá escrita no dice que haya «21 pactos
              porque Ehyé vale 21»</span>. Esto no es un dato literal del texto, sino un{" "}
              <span className="text-gold/90">jidush</span> (una novedad de estudio) que la
              Cabalá descubre <span className="italic">en clave de sod</span>, leyendo cómo
              un número, un Nombre y una estructura espiritual reflejan un mismo patrón
              oculto. Así es como la Cabalá suele trabajar.
            </p>
            <p>
              Mirados juntos, los pactos abarcan prácticamente todos los niveles de la
              existencia: la creación, la humanidad, Israel, el sacerdocio, la realeza,
              la tierra, el tiempo, las relaciones humanas, la renovación. Funcionan como
              una <span className="text-gold/90">red que sostiene toda la realidad</span>.
              Y precisamente <span className="hebrew text-gold/90" dir="rtl">אֶהְיֶה</span>{" "}
              es el Nombre de la Fuente de donde toda realidad emerge: «Yo Seré».
            </p>
            <p>
              El Nombre es la raíz; el pacto (<span className="hebrew text-gold/90" dir="rtl">בְּרִית</span>),
              su manifestación. Primero, en la zarza, aparece el Nombre. Después, en el
              Sinaí, aparece el pacto. Ehyé expresa la Voluntad divina; el brit expresa
              cómo esa Voluntad se vuelve estable dentro de la creación.
            </p>
          </div>
        </Section>

        {/* ── La cadena de Nombres ── */}
        <Section>
          <h3 className="mb-3 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La cadena de los Nombres
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted">
            La Cabalá relaciona tres Nombres como tres niveles de revelación, del más
            oculto al más manifiesto. El 21 es el más originario.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="אֶהְיֶה" sub="Ehyé · 21" color="#1fd8e0" />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <HebrewTile he="יהוה" sub="YHVH · 26" color="#c9a43e" />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <HebrewTile he="אֲדֹנָי" sub="Adonai · 65" color="#e0a850" />
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="hebrew text-gold/90" dir="rtl">אֶהְיֶה</span> (21) es la
              raíz oculta, el «Yo Seré» antes de toda manifestación.{" "}
              <span className="hebrew text-gold/90" dir="rtl">יהוה</span> (26) es la
              revelación en el corazón de la realidad.{" "}
              <span className="hebrew text-gold/90" dir="rtl">אֲדֹנָי</span> (65) es la
              Presencia ya descendida al mundo, el Nombre del reino. Si los pactos son las
              «leyes de relación» entre Dios y la creación, son el Ehyé oculto actuando en
              todos los planos.
            </p>
          </div>
        </Section>

        {/* ── Biná: la octava sefirá ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Y los 21 conducen a Biná
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Hay un paso más en el jidush. Si agrupamos los 21 pactos por su naturaleza,
              caen en <span className="text-gold/90">ocho categorías</span>: la creación,
              la humanidad, los patriarcas, la nación, el sacerdocio, la realeza, las
              relaciones humanas, y la renovación interior. Ocho familias de alianza.
            </p>
            <p>
              Y si cuentas las sefirot <span className="text-gold/90">desde abajo</span>,
              empezando en Maljut — Maljut, Yesod, Hod, Nétzaj, Tiféret, Guevurá, Jésed —,
              la octava estación es <span className="text-gold/90">Biná</span>, el Palacio
              del Entendimiento, la Madre Superior que toma el destello de Jojmá y lo
              expande hasta comprenderlo. Jojmá es el punto; Biná es la expansión del punto.
            </p>
            <p>
              El ocho, en el pensamiento judío, es justo lo que trasciende el orden natural
              del siete: el Brit Milá al octavo día, los ocho días de Janucá, Sheminí
              Atzéret. Biná cumple esa función — elevarse por encima de lo inmediato y captar
              el sentido oculto. Y en muchos sistemas cabalísticos el Nombre{" "}
              <span className="hebrew text-gold/90" dir="rtl">אֶהְיֶה</span> está asociado
              precisamente a Biná.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="21" sub="Ehyé · pactos" color="#1fd8e0" />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <HebrewTile he="8" sub="categorías" color="#c9a43e" />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <HebrewTile he="בִּינָה" sub="8ª desde Maljut" color="#e0a850" />
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Para el Arí, Biná es el lugar de la <span className="text-gold/90">teshuvá
              superior</span>: no solo arrepentimiento, sino regresar a la raíz de la
              comprensión. Estudiar todos los pactos es, en sí mismo, ese movimiento:
              desde la multiplicidad de las alianzas hacia la unidad que las origina.
              De la historia hacia el entendimiento. Eso es Biná.
            </p>
          </div>
        </Section>

        {/* ── Síntesis ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              אֶהְיֶה אֲשֶׁר אֶהְיֶה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              Un Nombre, desplegado en toda la realidad
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              «Yo Seré» = 21. Y 21 pactos sostienen el mundo, desde la naturaleza hasta el
              corazón. En clave de sod, todos son el mismo Nombre haciéndose estructura:
              un solo «Seré» divino que entra en la historia y, al comprenderse, retorna a
              Biná.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Ehyé · Éxodo 3:14", ref: "Exodus 3:14" },
                { label: "Pacto de Noé · Génesis 9", ref: "Genesis 9" },
                { label: "Sinaí · Éxodo 19", ref: "Exodus 19" },
                { label: "Nuevo Pacto · Jer 31:31", ref: "Jeremiah 31:31" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Exodus 3:14")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/universo" className="hover:text-gold">Verlo en la Mente Cósmica de Jashmal →</Link>
              <Link href="/misterios" className="hover:text-gold">Más misterios →</Link>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            Cabalá &amp; Filosofía Judía
          </p>
        </div>

      </main>
    </div>
  );
}
