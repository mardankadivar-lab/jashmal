"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: LOT Y SUS HIJAS SIN NOMBRE ────────────────────────────
// "La corona nació en Sodoma" — Génesis 19:30-38 leído con Nazir 23b
// (guedolá averá lishmáh) y Bavá Kamá 38b (las dos palomas: Rut y Naamá), con el
// Sod de las nitzotzot. Contenido verificado por el Sofer (editor-erudito).
// Idioma principal: español (el video de TikTok es en español).
// TODO(fa): el farsi de esta página está pendiente de traducción verificada.

// ── Las dos hijas sin nombre → las dos naciones → las dos madres ──────────────
interface Hija {
  he: string;
  name: string;
  sentido: string;
  color: string;
}

const HIJAS: Hija[] = [
  {
    he: "הַבְּכִירָה",
    name: "La mayor → Moab → Rut",
    sentido:
      "La Torá no le da nombre: solo «la mayor». De ella nace Moab; de Moab desciende Rut la moabita, bisabuela del Rey David.",
    color: "#c9a43e",
  },
  {
    he: "הַצְּעִירָה",
    name: "La menor → Amón → Naamá",
    sentido:
      "Tampoco tiene nombre: solo «la menor». Nombró a su hijo con pudor; de Amón viene Naamá la amonita, madre de Rejavam, que heredó el trono de David.",
    color: "#e0a850",
  },
];

// ── Componentes (idénticos en estilo a /misterio/betsabe) ─────────────────────
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
export default function LotPage() {
  const router = useRouter();
  const [dark, setDark] = useState(true);
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
            Génesis 19:30–38 · Talmud · Sod
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(44px, 13vw, 92px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            לוֹט
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            Las dos hijas sin nombre
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            Las dos mujeres de las que nace el linaje del Rey David no tienen nombre en
            la Torá. Y lo que hicieron rompió todo tabú. Sin embargo, del barro más bajo
            —una cueva, tras el fin de un mundo— el Cielo sacó la corona del Mashíaj.
          </p>
        </div>

        {/* ── La historia ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La historia
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Sodoma arde. Lot huye con su esposa y sus dos hijas; los ángeles los
              arrancan del juicio. La esposa mira atrás y queda{" "}
              <span className="text-gold/90">convertida en estatua de sal</span> (Génesis 19:26).
              Solo quedan tres: un padre anciano y dos hijas, refugiados en una cueva en el monte.
            </p>
            <p>
              Las hijas creen que el mundo entero se acabó —que son{" "}
              <span className="hebrew text-gold/90" dir="rtl">וְאִישׁ אֵין בָּאָרֶץ</span>, «y no hay
              hombre en la tierra» (Génesis 19:31), las últimas personas vivas—. Para que la
              humanidad no muera con ellas, embriagan a su padre y conciben de él{" "}
              <span className="text-gold/80">«para preservar simiente»</span>{" "}
              (<span className="hebrew" dir="rtl">וּנְחַיֶּה...זָרַע</span>, 19:32). De la mayor nace
              Moab; de la menor, Ben-Amí, padre de Amón (19:37-38).
            </p>
          </div>
        </Section>

        {/* ── Las dos sin nombre ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            Las dos sin nombre
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted">
            En todo el relato, la Torá <span className="text-gold/80">nunca</span> las nombra. Solo
            las llama «la mayor» y «la menor». Esos son los únicos «nombres» que reciben las dos
            mujeres de las que, en línea recta, brotará el Mashíaj.
          </p>
        </Section>

        <div className="space-y-4">
          {HIJAS.map((p, i) => (
            <Section key={p.he} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <span className="hebrew shrink-0 font-bold leading-none"
                  style={{ fontSize: "clamp(30px, 8vw, 44px)", color: dark ? "#fff6e0" : "#3a2a08",
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

        {/* ── Pshat: el peso ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            פְּשָׁט · El peso de lo que pasó
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              No doremos la píldora. En su sentido llano, lo que ocurre en esa cueva es un
              tabú absoluto: incesto entre un padre y sus hijas. La Torá no lo esconde —lo
              cuenta con todas sus letras (Génesis 19:30-38)—. Jashmal tampoco lo esquiva: un
              estudio honesto sostiene el peso <span className="text-gold/90">antes</span> de
              buscar la luz.
            </p>
            <p>
              Lo que viene ahora <span className="text-gold/90">no anula</span> la dureza del
              relato: lo lee más hondo.
            </p>
          </div>
        </Section>

        {/* ── La luz escondida ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            La luz escondida
          </h3>

          <div className="mb-8 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Nota de honestidad
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              Lo que sigue es lectura del Talmud y el Midrash, marcada como tal. Las hijas no
              buscaban placer: el propio texto dice que creían que <span className="text-gold/85">no
              quedaba nadie en la tierra</span>. Chazal lee su acto desde la intención, no desde
              el escándalo.
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Talmud enseña un principio temible:{" "}
              <span className="hebrew text-gold/90" dir="rtl">גְּדוֹלָה עֲבֵרָה לִשְׁמָהּ</span>{" "}
              —<span className="text-gold/90">guedolá averá lishmáh</span>, «grande es la
              transgresión hecha por amor del Cielo»— y trae como ejemplo justamente a las hijas
              de Lot (Nazir 23b). No buscaban placer; buscaban salvar la vida. Por eso, del barro
              más bajo, el Cielo saca <span className="text-gold/90">dos palomas</span>.
            </p>
            <p>
              El Talmud lo dice con esa misma imagen: de las hijas de Lot saldrían{" "}
              <span className="text-gold/90">«dos buenas palomas»</span> —
              <span className="hebrew" dir="rtl">רוּת הַמּוֹאֲבִיָּה וְנַעֲמָה הָעַמּוֹנִית</span>—
              «Rut la moabita y Naamá la amonita» (Bavá Kamá 38b). De Moab desciende{" "}
              <span className="text-gold/90">Rut</span>, bisabuela del Rey David (Rut 4:13-22). De
              Amón viene <span className="text-gold/90">Naamá</span>, madre de Rejavam, el rey que
              heredó el trono de David (I Reyes 14:21,31). La corona de Israel… nació en Sodoma.
            </p>
          </div>
        </Section>

        <PullQuote
          he="שְׁתֵּי פְרֵידוֹת טוֹבוֹת... רוּת הַמּוֹאֲבִיָּה וְנַעֲמָה הָעַמּוֹנִית"
          es="Dos buenas palomas tengo para sacar de ellos: Rut la moabita y Naamá la amonita."
          source="Talmud, Bavá Kamá 38b"
        />

        {/* ── El anonimato ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            El anonimato
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Queda una pregunta: ¿por qué la Torá las deja sin nombre? El texto da una pista. La
              hija menor llamó a su hijo «Ben-Amí» —con pudor, en{" "}
              <span className="hebrew text-gold/90" dir="rtl">לָשׁוֹן נְקִיָּה</span>, «lenguaje
              recatado»—, mientras la mayor lo llamó «Moab» («de mi padre»), sin recato. Y los
              Sabios enseñan que <span className="text-gold/90">por ese pudor</span> la descendencia
              de la menor recibió, más tarde, una protección especial (Rashi a Génesis 19:37;
              Bavá Kamá 38b).
            </p>
            <p className="text-parchment/70">
              <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
                Lectura de Jashmal (drash):
              </span>{" "}
              el vaso que carga la luz más alta no necesita firmar. El anonimato de estas mujeres
              no es castigo: es el <span className="text-gold/85">velo</span> del Mashíaj, que baja
              a buscarse en lo escondido. <span className="italic">(Síntesis homilética nuestra,
              sobre la base verificada del pudor de la hija menor — no es cita literal.)</span>
            </p>
          </div>
        </Section>

        {/* ── Sod ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · La chispa en el lugar más bajo
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Aquí el vuelco que define a toda esta serie. La Cabalá lee una ley del mundo: la luz
              más alta cae al lugar más bajo y espera ser rescatada. Son las{" "}
              <span className="text-gold/90">nitzotzot</span>, las chispas santas atrapadas dentro
              de las <span className="italic">klipot</span>. El linaje del Redentor no baja del
              cielo limpio: se <span className="text-gold/90">rescata</span> desde abajo, desde los
              lugares que el mundo querría tapar.
            </p>
            <p>
              Y no es un accidente aislado: la línea del Mashíaj atraviesa{" "}
              <span className="text-gold/90">DOS escándalos a propósito</span> —el de Lot (→ Moab
              → Rut) y el de Yehudá con Tamar (→ Péretz)—. El propio Talmud los discute en la{" "}
              <span className="text-gold/90">misma página</span> (Nazir 23b). Dos veces, la realeza
              eterna se planta en el lodo, porque{" "}
              <span className="hebrew text-gold/90" dir="rtl">יְרִידָה צוֹרֶךְ עֲלִיָּה</span>{" "}
              —<span className="text-gold/90">yeridá tzórej aliyá</span>, el descenso es para el
              ascenso— (principio jasídico del Baal Shem Tov). La caída era el camino.
            </p>
            <p className="font-cinzel text-base text-gold/90">
              Lot → Moab → Rut → Casa de David → el Mashíaj.
            </p>
            <p>
              Junto a Tamar, Rut, Naamá y Betsabé, las hijas de Lot son raíz de las{" "}
              <span className="text-gold/90">madres del Mashíaj desde el lugar más imposible</span>.
            </p>
          </div>

          {/* Sello de la serie: נחש = 358 = משיח */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="נָחָשׁ" sub="Serpiente · 358" color="#b06a3c" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <HebrewTile he="מָשִׁיחַ" sub="Mashíaj · 358" color="#c9a43e" />
          </div>
          <p className="mx-auto mt-6 max-w-md text-center text-sm leading-relaxed text-muted">
            La misma fuerza que parece arrastrar hacia abajo, elevada y reparada, es la fuerza que
            redime. De la cueva más oscura, tras el fin de un mundo, brota la corona.
          </p>
        </Section>

        {/* ── PaRDeS ── */}
        <Section>
          <h3 className="mb-6 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            פרד״ס · Las cuatro lecturas
          </h3>
          <div className="space-y-4">
            {[
              {
                he: "פְּשָׁט", name: "Pshat",
                txt: "Tras Sodoma, en una cueva, las dos hijas de Lot —sin nombre— conciben de su padre creyendo que no queda nadie vivo. Nacen Moab y Amón (Génesis 19:30-38).",
              },
              {
                he: "רֶמֶז", name: "Remez",
                txt: "El anonimato insinúa el ocultamiento: el vaso que carga la luz más alta no firma. «La mayor» y «la menor» son los únicos nombres de quienes engendran la realeza.",
              },
              {
                he: "דְּרָשׁ", name: "Drash",
                txt: "«Grande es la transgresión por amor del Cielo» (guedolá averá lishmáh, Nazir 23b): los Sabios leen el acto desde la intención de salvar la vida, no desde el escándalo. La menor, por su pudor, es recompensada (Bavá Kamá 38b).",
              },
              {
                he: "סוֹד", name: "Sod",
                txt: "Las nitzotzot caídas en la klipá. La luz del Mashíaj se rescata desde el lugar más bajo. Yeridá tzórej aliyá: el descenso (de Lot y de Yehudá, misma sugyá en Nazir 23b) es el método con que el Or Ein Sof se hace habitable abajo.",
              },
            ].map((r) => (
              <div key={r.name} className="flex items-start gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <span className="hebrew shrink-0 text-2xl font-bold text-gold/80" dir="rtl"
                  style={{ textShadow: "0 0 12px #c9a43e66" }}>
                  {r.he}
                </span>
                <div className="flex-1">
                  <p className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold/70">
                    {r.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85">{r.txt}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Síntesis ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              יְרִידָה צוֹרֶךְ עֲלִיָּה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              La corona nació en Sodoma
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              Dos mujeres sin nombre, en una cueva, tras el fin de su mundo. El escándalo más
              grande de la Torá escondía a propósito el manantial de la realeza. Lo que el mundo
              señalaría como lo más bajo, el Cielo lo convirtió en la raíz del Redentor. El
              descenso… era el camino.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Las hijas de Lot · Génesis 19", ref: "Genesis 19" },
                { label: "Guedolá averá lishmáh · Nazir 23b", ref: "Nazir 23b" },
                { label: "Las dos palomas · Bavá Kamá 38b", ref: "Bava Kamma 38b" },
                { label: "Moab → David · Rut 4", ref: "Ruth 4" },
                { label: "Naamá · 1 Reyes 14:21", ref: "I Kings 14:21" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 19")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            {/* Hemshej — umbral «Sigue el hilo» */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/linaje" className="hover:text-gold">Las madres del Mashíaj →</Link>
              <Link href="/misterio/tamar" className="hover:text-gold">Tamar: el velo que escondía al Mesías →</Link>
              <Link href="/misterio/betsabe" className="hover:text-gold">Betsabé: el viajero que se quedó →</Link>
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
