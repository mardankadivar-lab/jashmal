"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: TAMAR ─────────────────────────────────────────────────
// El ZOOM a Tamar (la panorámica de las cuatro madres vive en /linaje).
// Idioma principal: español (el video de TikTok es en español).
// TODO(fa): el farsi de esta página está pendiente de traducción verificada.
//   Mientras tanto, el toggle de idioma cae al español a propósito; NO se
//   inventa traducción al persa de contenido erudito sin pasar por el Sofer.

// ── Las prendas en prenda (Génesis 38:18) ─────────────────────────────────────
interface Prenda {
  he: string;
  name: string;
  sentido: string;
  color: string;
}

const PRENDAS: Prenda[] = [
  {
    he: "חוֹתָם",
    name: "El sello",
    sentido: "Su identidad, su firma personal. Lo que lo nombra ante el mundo.",
    color: "#c9a43e",
  },
  {
    he: "פְּתִיל",
    name: "El cordón",
    sentido: "El hilo del que pendía el sello. Lo que ata el nombre al cuerpo.",
    color: "#e0a850",
  },
  {
    he: "מַטֶּה",
    name: "El bastón",
    sentido: "Su autoridad, su cetro. La vara del jefe de Yehudá — y de la realeza que vendría.",
    color: "#f0d060",
  },
];

// ── Componentes (idénticos en estilo a /linaje) ───────────────────────────────
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

// Tile oscuro con letra hebrea grande (legible en cualquier tema).
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
export default function TamarPage() {
  const locale = useLocale();
  const router = useRouter();
  // El contenido erudito de farsi aún no está verificado por el Sofer: hasta
  // entonces esta página se muestra siempre en español, aunque el toggle exista.
  const fa = false;

  const [dark, setDark] = useState(true);
  // Las páginas de misterio van SIEMPRE en oscuro: las letras hebreas doradas y
  // el texto pergamino solo se leen bien sobre fondo #05050a.
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
            Génesis 38 · Talmud · Midrash
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(56px, 16vw, 110px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            תָּמָר
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            El velo que escondía al Mesías
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            El mayor escándalo de la Torá esconde, en su mismo centro, el nacimiento
            de la línea del Mashíaj. Lo que el mundo quería tapar, el Cielo lo coronaba.
          </p>
        </div>

        {/* ── La historia ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La historia
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Tamar enviuda dos veces. Se casa con Er, el primogénito de Yehudá, y muere.
              Por la ley del levirato pasa a Onán, el segundo hijo — y también muere.
              Queda un tercer hijo, Shelá, pero Yehudá tiene miedo y no se lo entrega:
              la abandona, viuda y sin descendencia, en casa de su padre.
            </p>
            <p>
              Tamar entiende que jamás le darán a Shelá. Entonces hace algo audaz hasta el
              límite: se quita las ropas de viuda, se cubre con un velo y se sienta en el
              cruce del camino, en un lugar llamado <span className="text-gold/90">Enaim</span>.
              Yehudá la toma por prostituta y se acerca. Como no lleva el pago consigo, ella
              le pide una prenda: su <span className="text-gold/90">sello</span>, su{" "}
              <span className="text-gold/90">cordón</span> y su{" "}
              <span className="text-gold/90">bastón</span> (Génesis 38:18).
            </p>
            <p>
              De esa unión queda embarazada de mellizos. Meses después, cuando se sabe
              que la viuda está encinta, Yehudá ordena que la quemen. Y aquí gira toda
              la historia.
            </p>
          </div>
        </Section>

        {/* ── Las tres prendas ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Las tres prendas
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted">
            No pidió oro. Pidió las tres cosas que probarían quién era el padre.
            La identidad entera de Yehudá quedó en sus manos.
          </p>
        </Section>

        <div className="space-y-4">
          {PRENDAS.map((p, i) => (
            <Section key={p.he} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <span className="hebrew shrink-0 font-bold leading-none"
                  style={{ fontSize: "clamp(40px, 11vw, 54px)", color: dark ? "#fff6e0" : "#3a2a08",
                    textShadow: dark ? `0 0 16px ${p.color}` : "none" }}>
                  {p.he}
                </span>
                <div className="flex-1">
                  <p className="font-cinzel text-sm font-bold tracking-wide" style={{ color: p.color }}>
                    {p.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85">{p.sentido}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>

        {/* ── La confesión de Yehudá ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La confesión
          </h3>
        </Section>

        <PullQuote
          he="צָדְקָה מִמֶּנִּי"
          es="Ella es más justa que yo."
          source="Génesis 38:26"
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Cuando Tamar le envía sus propias prendas — sin acusarlo, dejándolo decidir —
              Yehudá reconoce todo en público: צָדְקָה מִמֶּנִּי, «ella es más justa que yo».
              Es uno de los actos de confesión más altos de la Torá: un líder admitiendo
              su falta ante todos.
            </p>
            <p>
              Pero el Talmud (Sotá 10b) lee מִמֶּנִּי con un doble filo. No solo significa
              «más justa <span className="text-gold/90">que yo</span>», sino también
              «esto vino <span className="text-gold/90">de Mí</span>» — como si una Voz
              Divina firmara la escena: el embarazo escandaloso fue decreto del Cielo.
            </p>
          </div>
        </Section>

        {/* ── La batalla cósmica ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La batalla en lo alto
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Talmud (Sotá 10b) cuenta lo que pasaba en el mundo invisible mientras
              Tamar iba al fuego. El ángel acusador, <span className="text-gold/90">Samael</span>,
              escondió las prendas para que ella no pudiera probar nada, muriera quemada —
              y así <span className="text-gold/90">David jamás naciera</span>.
            </p>
            <p>
              Pero el ángel <span className="text-gold/90">Gabriel</span> las devolvió a su
              lugar. La prueba reapareció, Yehudá confesó, y la línea quedó a salvo.
              El nacimiento del Mashíaj se decidió, literalmente, entre dos ángeles.
            </p>
          </div>
        </Section>

        {/* ── El secreto del Cielo ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            El secreto del Cielo
          </h3>
        </Section>

        <PullQuote
          he="וְהַקָּדוֹשׁ בָּרוּךְ הוּא הָיָה עוֹסֵק בּוֹרֵא אוֹרוֹ שֶׁל מֶלֶךְ הַמָּשִׁיחַ"
          es="…y el Santo, bendito sea, estaba ocupado creando la luz del Rey Mashíaj."
          source="Bereshit Rabá 85:1 (R. Shmuel bar Najman)"
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Midrash (Bereshit Rabá 85:1), en nombre de Rabí Shmuel bar Najman, dice
              algo desconcertante: mientras los hombres veían en Enaim un escándalo, arriba
              «el Santo, bendito sea, estaba ocupado creando la luz del Rey Mashíaj».
            </p>
            <p>
              Los dos planos corren a la vez. Abajo: vergüenza, sospecha, una mujer camino
              de la hoguera. Arriba: Dios encendiendo la luz del Redentor. La misma escena,
              dos lecturas opuestas — y la verdadera es la de arriba.
            </p>
          </div>
        </Section>

        {/* ── La audacia santa ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La audacia santa
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              De Tamar aprenden los Sabios una ley del alma (Sotá 10b · Berajot 43b):
              prefería <span className="text-gold/90">arrojarse al fuego</span> antes que
              avergonzar a Yehudá en público. Pudo haber gritado «¡el padre eres tú!» y
              salvarse al instante. No lo hizo.
            </p>
            <p>
              Solo le mandó las prendas, en privado, para que él decidiera por sí mismo si
              confesaba. Le dejó la dignidad de reconocer su falta. Esa delicadeza, en el
              borde mismo de la muerte, es parte de por qué de ella sale la realeza.
            </p>
          </div>
        </Section>

        {/* ── Los mellizos: Péretz ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La brecha y el amanecer
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="פֶּרֶץ" sub="Péretz · «Brecha»" color="#c9a43e" />
            <span className="font-cinzel text-2xl text-gold/40">·</span>
            <HebrewTile he="זֶרַח" sub="Zéraj · «Amanecer»" color="#e0a850" />
          </div>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Nacen mellizos (Génesis 38:29-30). Al primero que rompe paso lo llaman{" "}
              <span className="text-gold/90">Péretz</span> (פֶּרֶץ) — «el que abre la
              brecha», el que rompe las barreras. Al otro, <span className="text-gold/90">Zéraj</span>,
              «amanecer».
            </p>
            <p>
              Y de Péretz arranca la cuenta que la Torá guarda hasta el final del libro de
              Rut (4:18-22): Péretz → … → Obed → Yishai → <span className="text-gold/90">David</span>.
              De David, el Mashíaj. La línea de la realeza nace, a propósito, de la brecha.
            </p>
            <p className="font-cinzel text-base text-gold/90">
              Péretz (la brecha) → … → David → el Mashíaj.
            </p>
          </div>
        </Section>

        {/* ── El Sod ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · El secreto
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La Cabalá lee aquí una ley del mundo: la luz más alta cae al lugar más bajo
              y espera ser rescatada. Son las <span className="text-gold/90">nitzotzot</span>,
              las chispas santas escondidas dentro de lo que parece impuro. El linaje del
              Mesías se teje, a propósito, con los hilos que el mundo querría esconder.
            </p>
            <p>
              Por eso esta serie lleva un sello que vuelve una y otra vez: la gematría de{" "}
              <span className="hebrew text-gold/90" dir="rtl">נָחָשׁ</span> (serpiente) es{" "}
              <span className="text-gold/90">358</span> — el mismo número de{" "}
              <span className="hebrew text-gold/90" dir="rtl">מָשִׁיחַ</span> (Mashíaj). La
              fuerza que hace caer, elevada, es la misma que redime.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="נָחָשׁ" sub="Serpiente · 358" color="#b06a3c" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <HebrewTile he="מָשִׁיחַ" sub="Mashíaj · 358" color="#c9a43e" />
          </div>
        </Section>

        {/* ── Síntesis ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              אוֹרוֹ שֶׁל מָשִׁיחַ
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              Lo que el mundo esconde, Dios lo corona
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              Mientras los hombres veían un escándalo, el Cielo encendía la luz del Mashíaj.
              El velo de Tamar no escondía un pecado: escondía al Redentor. Lo que el mundo
              tapa, Dios lo levanta y lo pone en el trono.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Tamar · Génesis 38", ref: "Genesis 38" },
                { label: "«Más justa que yo» · Gn 38:26", ref: "Genesis 38:26" },
                { label: "Sotá 10b", ref: "Sotah 10b" },
                { label: "Péretz → David · Rut 4:18", ref: "Ruth 4:18" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 38")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/linaje" className="hover:text-gold">Ver a las cuatro madres del Mashíaj →</Link>
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
