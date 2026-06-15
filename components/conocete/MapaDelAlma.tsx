"use client";

import { useMemo, useState } from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { gematria, gematriaBreakdown, stripNiqud } from "@/lib/sources/lexicon";
import { tri } from "@/lib/i18n/i18nContent";
import TranslationBadge from "@/components/TranslationBadge";
import {
  MESES,
  MAPA_REGLA_DE_ORO,
  MAPA_DISCLAIMER,
  MAPA_GEMATRIA_TEXTO,
  MAPA_MADRE_NOTA,
  type MesHebreo,
} from "@/lib/content/autoconocimiento";

// ─── Etiquetas de UI por idioma (es obligatorio; fa con texto del Sofer donde
//     existe; en queda como TODO y cae al español marcado con tri()). ──────────
const UI = {
  he: "מַרְאָה",
  title: { es: "Mapa del Alma", fa: "نقشهٔ روح", en: null as string | null },
  intro: {
    es: "Tu nombre y tu mes de nacimiento como mapa simbólico de tu avodá — la materia prima de tu trabajo, nunca tu destino.",
    fa: "نام و ماهِ تولّدِ تو همچون نقشه‌ای نمادین برای عَبودای تو — مادهٔ خامِ کارَت، نه سرنوشتَت.",
    en: null as string | null,
  },
  reglaLabel: { es: "Regla de oro", fa: "قاعدهٔ زرّین", en: null as string | null },
  nameLabel: { es: "Tu nombre en hebreo", fa: "نامِ تو به عبری", en: null as string | null },
  namePlaceholder: { es: "מַרְדְּכַי", fa: "מַרְדְּכַי", en: "מַרְדְּכַי" },
  motherLabel: { es: "Nombre de la madre (opcional)", fa: "نامِ مادر (اختیاری)", en: null as string | null },
  monthLabel: { es: "Mes hebreo de nacimiento", fa: "ماهِ عبریِ تولّد", en: null as string | null },
  monthPick: { es: "Elige un mes…", fa: "ماهی را برگزین…", en: null as string | null },
  rootLabel: { es: "Raíz / sello del nombre", fa: "ریشه / مُهرِ نام", en: null as string | null },
  hardLabel: { es: "Datos del versículo", fa: "داده‌های آیه", en: null as string | null },
  hardSub: { es: "Sefer Yetzirah cap. 5 (versión Gra-Arí)", fa: "سفر یِتزیرا، فصل ۵", en: null as string | null },
  interpLabel: { es: "Interpretación · tradición", fa: "تفسیر · سنّت", en: null as string | null },
  signo: { es: "Signo", fa: "برج", en: null as string | null },
  letra: { es: "Letra simple", fa: "حرفِ ساده", en: null as string | null },
  sentido: { es: "Sentido / conducto", fa: "حس / مجرا", en: null as string | null },
  tendencia: { es: "Tendencia del alma", fa: "گرایشِ روح", en: null as string | null },
  tikun: { es: "Pregunta de tikún", fa: "پرسشِ تیکون", en: null as string | null },
  tribuNota: {
    es: "La asociación mes ↔ tribu se omite: es tradición posterior con variantes, no un dato canónico.",
    fa: "پیوندِ ماه ↔ قبیله حذف شده است: سنّتی متأخّر با گونه‌هاست، نه داده‌ای قطعی.",
    en: null as string | null,
  },
  disclaimerLabel: { es: "Antes de leer", fa: "پیش از خواندن", en: null as string | null },
};

function L(locale: Locale, field: { es: string; fa: string | null; en: string | null }) {
  return tri(locale, field.es, field.fa, field.en);
}

export default function MapaDelAlma() {
  const locale = useLocale() as Locale;
  const fa = locale === "fa";
  const [nombre, setNombre] = useState("");
  const [madre, setMadre] = useState("");
  const [mesN, setMesN] = useState<number | null>(null);

  const consonantes = useMemo(() => stripNiqud(nombre), [nombre]);
  const valor = useMemo(() => (consonantes ? gematria(nombre) : 0), [nombre, consonantes]);
  const desglose = useMemo(() => (consonantes ? gematriaBreakdown(nombre) : []), [nombre, consonantes]);
  const mes: MesHebreo | null = useMemo(
    () => (mesN ? MESES.find((m) => m.n === mesN) ?? null : null),
    [mesN],
  );

  const acento = mes?.color ?? "#c9a43e";
  const reglaOro = tri(locale, MAPA_REGLA_DE_ORO.es, MAPA_REGLA_DE_ORO.fa, MAPA_REGLA_DE_ORO.en);
  const disclaimer = tri(locale, MAPA_DISCLAIMER.es, MAPA_DISCLAIMER.fa, MAPA_DISCLAIMER.en);
  const gemTexto = tri(locale, MAPA_GEMATRIA_TEXTO.es, MAPA_GEMATRIA_TEXTO.fa, MAPA_GEMATRIA_TEXTO.en);
  const madreNota = tri(locale, MAPA_MADRE_NOTA.es, MAPA_MADRE_NOTA.fa, MAPA_MADRE_NOTA.en);

  return (
    <main className="mx-auto max-w-3xl px-5 pb-28 pt-10" dir={fa ? "rtl" : "ltr"}>
      {/* Volver */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-cinzel text-sm text-gold/70 transition-colors hover:text-gold"
        >
          <span>{fa ? "→" : "←"}</span>
          <span className="hebrew">חַשְׁמַל</span>
          <span>· Jashmal</span>
        </Link>
      </div>

      {/* Encabezado */}
      <header className="mb-8 text-center">
        <p
          className="hebrew mb-2 text-4xl text-gold/85"
          style={{ filter: "drop-shadow(0 0 14px rgba(201,164,62,0.45))" }}
        >
          {UI.he}
        </p>
        <h1 className="font-cinzel text-2xl font-bold tracking-wide text-parchment sm:text-3xl">
          {L(locale, UI.title).value}
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
          {L(locale, UI.intro).value}
        </p>
      </header>

      {/* REGLA DE ORO — fija, arriba */}
      <section
        className="mb-6 overflow-hidden rounded-2xl border border-gold/30 bg-gold/[0.06] p-5"
      >
        <p className="mb-2 font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/70">
          {L(locale, UI.reglaLabel).value}
        </p>
        {reglaOro.missing && (
          <div className="mb-2">
            <TranslationBadge available={reglaOro.available} />
          </div>
        )}
        <p
          className="text-sm leading-relaxed text-parchment/90"
          dir={reglaOro.shownIn === "fa" ? "rtl" : "ltr"}
        >
          {reglaOro.value}
        </p>
      </section>

      {/* ENTRADAS */}
      <section className="mb-8 space-y-5 rounded-2xl border border-gold/15 bg-ink/40 p-5">
        {/* Nombre en hebreo */}
        <div>
          <label className="mb-1.5 block font-cinzel text-xs uppercase tracking-widest text-gold/70">
            {L(locale, UI.nameLabel).value}
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            dir="rtl"
            lang="he"
            placeholder={L(locale, UI.namePlaceholder).value}
            className="hebrew w-full rounded-xl border border-gold/25 bg-ink/60 px-4 py-3 text-2xl text-parchment placeholder:text-muted/40 focus:border-gold/60 focus:outline-none"
          />
        </div>

        {/* Nombre de la madre — opcional, con nota devocional */}
        <div>
          <label className="mb-1.5 block font-cinzel text-xs uppercase tracking-widest text-gold/70">
            {L(locale, UI.motherLabel).value}
          </label>
          <input
            value={madre}
            onChange={(e) => setMadre(e.target.value)}
            dir="rtl"
            lang="he"
            placeholder="חַוָּה"
            className="hebrew w-full rounded-xl border border-gold/20 bg-ink/60 px-4 py-2.5 text-xl text-parchment placeholder:text-muted/40 focus:border-gold/50 focus:outline-none"
          />
          <p className="mt-2 text-xs italic leading-relaxed text-muted/80" dir={madreNota.shownIn === "fa" ? "rtl" : "ltr"}>
            {madreNota.value}
            {madreNota.missing && <TranslationBadge className="ms-2" available={madreNota.available} />}
          </p>
        </div>

        {/* Mes hebreo */}
        <div>
          <label className="mb-1.5 block font-cinzel text-xs uppercase tracking-widest text-gold/70">
            {L(locale, UI.monthLabel).value}
          </label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {MESES.map((m) => {
              const sel = mesN === m.n;
              return (
                <button
                  key={m.n}
                  type="button"
                  onClick={() => setMesN(sel ? null : m.n)}
                  className={
                    "flex flex-col items-center rounded-xl border px-2 py-2.5 transition-all " +
                    (sel ? "border-gold/70" : "border-gold/20 hover:border-gold/50")
                  }
                  style={{ background: sel ? `${m.color}1f` : "rgba(14,12,22,0.5)" }}
                >
                  <span className="hebrew text-lg leading-none text-parchment">{m.he}</span>
                  <span className="mt-1 text-[10px] uppercase tracking-wide text-muted">{m.nombre}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* RAÍZ / SELLO DEL NOMBRE (gematría) */}
      {consonantes && (
        <section
          className="mb-6 overflow-hidden rounded-2xl border border-gold/30 bg-ink/60 p-5"
        >
          <p className="mb-3 font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/70">
            {L(locale, UI.rootLabel).value}
          </p>
          <div className="flex flex-col items-center">
            <span
              className="font-cinzel font-black leading-none text-gold"
              style={{ fontSize: "clamp(48px, 13vw, 80px)", textShadow: "0 0 24px rgba(201,164,62,0.5)" }}
            >
              {valor}
            </span>
            <span className="hebrew mt-1 text-2xl text-parchment/90" dir="rtl">
              {consonantes}
            </span>
            {/* Desglose letra · valor */}
            {desglose.length > 0 && (
              <div className="mt-3 flex flex-wrap justify-center gap-1.5" dir="rtl">
                {desglose.map((d, i) => (
                  <span
                    key={i}
                    className="inline-flex items-baseline gap-1 rounded-md border border-gold/20 bg-gold/[0.05] px-2 py-0.5"
                  >
                    <span className="hebrew text-base text-parchment">{d.letter}</span>
                    <span className="text-[11px] text-gold/70">{d.value}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Texto honesto de la gematría */}
          <p
            className="mt-4 text-sm leading-relaxed text-muted"
            dir={gemTexto.shownIn === "fa" ? "rtl" : "ltr"}
          >
            {gemTexto.value}
            {gemTexto.missing && <TranslationBadge className="ms-2" available={gemTexto.available} />}
          </p>
        </section>
      )}

      {/* TARJETA DEL MAZAL DEL MES */}
      {mes && (
        <section
          className="overflow-hidden rounded-2xl border bg-ink/70 p-0"
          style={{ borderColor: `${acento}66` }}
        >
          {/* Cabecera con glow del color del mes */}
          <div className="relative px-6 pt-7 pb-5 text-center">
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-32"
              style={{ background: `radial-gradient(ellipse at top, ${acento}33 0%, transparent 70%)` }}
            />
            <p
              className="hebrew relative text-4xl text-parchment"
              style={{ textShadow: `0 0 18px ${acento}99` }}
            >
              {mes.he}
            </p>
            <p className="relative mt-1 font-cinzel text-sm uppercase tracking-[0.3em]" style={{ color: acento }}>
              {mes.nombre}
            </p>
          </div>

          {/* ── DATOS DUROS (del versículo) ── */}
          <div className="border-t border-gold/10 px-6 py-5">
            <div className="mb-3 flex items-baseline justify-between gap-2">
              <span className="font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/80">
                {L(locale, UI.hardLabel).value}
              </span>
              <span className="text-[10px] italic text-muted/70">{L(locale, UI.hardSub).value}</span>
            </div>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <DatoDuro label={L(locale, UI.signo).value}>
                <span className="hebrew text-xl text-parchment">{mes.signoHe}</span>
                <span className="mt-0.5 block text-xs text-muted">{mes.signoEs}</span>
              </DatoDuro>
              <DatoDuro label={L(locale, UI.letra).value}>
                <span className="hebrew text-3xl" style={{ color: acento }}>{mes.letra}</span>
                <span className="mt-0.5 block text-xs text-muted">{mes.letraNombre}</span>
              </DatoDuro>
              <DatoDuro label={L(locale, UI.sentido).value}>
                {mes.sentidoHe !== "—" && <span className="hebrew text-xl text-parchment">{mes.sentidoHe}</span>}
                <span className={"block text-xs text-muted" + (mes.sentidoHe !== "—" ? " mt-0.5" : "")}>
                  {mes.sentidoEs}
                </span>
              </DatoDuro>
            </dl>
          </div>

          {/* ── INTERPRETACIÓN / TRADICIÓN (en cursiva, rotulada) ── */}
          <div
            className="border-t border-gold/10 px-6 py-5"
            style={{ background: "rgba(0,0,0,0.25)" }}
          >
            <span className="mb-3 block font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/55">
              {L(locale, UI.interpLabel).value}
            </span>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted/60">{L(locale, UI.tendencia).value}</p>
                <p className="mt-1 text-sm italic leading-relaxed text-parchment/85">{mes.tendencia}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted/60">{L(locale, UI.tikun).value}</p>
                <p className="mt-1 text-sm italic leading-relaxed" style={{ color: acento }}>
                  {mes.tikun}
                </p>
              </div>
            </div>
            {/* Nota sobre la tribu OMITIDA */}
            <p className="mt-4 border-t border-gold/10 pt-3 text-[11px] leading-relaxed text-muted/60">
              {L(locale, UI.tribuNota).value}
            </p>
          </div>
        </section>
      )}

      {/* DISCLAIMER — fijo, visible al pie */}
      <section className="mt-8 rounded-2xl border border-gold/15 bg-ink/30 p-5">
        <p className="mb-2 font-cinzel text-[11px] uppercase tracking-[0.25em] text-gold/55">
          {L(locale, UI.disclaimerLabel).value}
        </p>
        <p className="text-xs leading-relaxed text-muted" dir={disclaimer.shownIn === "fa" ? "rtl" : "ltr"}>
          {disclaimer.value}
        </p>
        {disclaimer.missing && (
          <div className="mt-2">
            <TranslationBadge available={disclaimer.available} />
          </div>
        )}
      </section>
    </main>
  );
}

function DatoDuro({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-gold/15 bg-ink/50 px-3 py-3 text-center">
      <p className="mb-1.5 text-[10px] uppercase tracking-widest text-gold/60">{label}</p>
      {children}
    </div>
  );
}
