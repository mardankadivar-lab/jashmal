"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { LetterData, LetterPart, LetterConnection } from "@/lib/letters/types";
import { pickText } from "@/lib/letters/types";
import LetterGlyph from "./LetterGlyph";
import Reveal from "./Reveal";

const GOLD = "#c9a43e";

// ─────────────────────────────────────────────────────────────────────────
//  MOTOR DE LA EXPERIENCIA INMERSIVA
//  La letra queda FIJA en el centro (sticky) durante todo el scroll. Las capas
//  se revelan por debajo, sobre un velo inferior que las mantiene legibles. En
//  la sección FORMA, la parte que cruza el centro se ILUMINA en el glifo.
//  La letra NUNCA se transforma — solo cambia su luz.
// ─────────────────────────────────────────────────────────────────────────

export default function LetterExperience({ data }: { data: LetterData }) {
  const locale = useLocale();
  const t = useTranslations("letra");
  const fa = locale === "fa";
  const tx = (v: Parameters<typeof pickText>[0]) => pickText(v, locale);

  // Parte del glifo iluminada (solo activa durante la sección FORMA).
  const [activePart, setActivePart] = useState<string | null>(null);
  const formaRef = useRef<HTMLElement | null>(null);
  const formaInView = useRef(false);

  // Si la sección FORMA sale del viewport, apaga la iluminación de partes.
  useEffect(() => {
    const el = formaRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        formaInView.current = e.isIntersecting;
        if (!e.isIntersecting) setActivePart(null);
      },
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const setPart = (id: string) => {
    if (formaInView.current) setActivePart(id);
  };

  return (
    <main
      className="letra-stage relative w-full"
      dir={fa ? "rtl" : "ltr"}
      style={{ fontSize: "100%" }}
    >
      {/* Barra superior mínima — volver a las letras */}
      <div className="fixed inset-x-0 top-0 z-30 flex items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href="/letras"
          className="flex items-center gap-1.5 font-cinzel text-xs tracking-wide"
          style={{ color: "rgba(201,164,62,0.8)" }}
        >
          <span>{fa ? "→" : "←"}</span>
          <span>{t("back")}</span>
        </Link>
        <span className="hebrew text-sm" style={{ color: "rgba(201,164,62,0.55)" }}>
          חַשְׁמַל
        </span>
      </div>

      {/* Velo inferior: mantiene legible cualquier texto cerca del borde de abajo
          mientras la letra flota por encima. */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[5] h-[46vh]"
        style={{
          background:
            "linear-gradient(to top, #05050a 14%, rgba(5,5,10,0.82) 42%, transparent)",
        }}
      />

      {/* LA LETRA — fija en el centro durante todo el viaje. */}
      <div className="pointer-events-none sticky top-0 z-0 flex h-screen items-center justify-center">
        <div
          className="relative flex items-center justify-center"
          style={{ width: "min(52vw, 380px)", aspectRatio: "1 / 1" }}
        >
          {/* Resplandor ambiental detrás de la letra */}
          <div
            className="absolute inset-0 -z-10 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(201,164,62,0.22) 0%, rgba(201,164,62,0.06) 38%, transparent 70%)",
              filter: "blur(8px)",
            }}
          />
          <LetterGlyph slug={data.slug} activePart={activePart} />
        </div>
      </div>

      {/* CONTENIDO — se desliza por encima de la letra (que queda detrás, z-0). */}
      <div className="relative z-10 -mt-[100vh]">
        {/* ── Nivel 1 — La letra en silencio ───────────────────────────── */}
        <Section>
          <Reveal className="text-center">
            <p className="hebrew text-3xl" style={{ color: GOLD }}>
              {data.nameHe}
            </p>
            <h1 className="mt-2 font-cinzel text-2xl tracking-[0.2em]" style={{ color: "#e8e4d8" }}>
              {tx(data.nameTranslit)}
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed" style={{ color: "#b2ac9f" }}>
              {tx(data.level1)}
            </p>
            <p className="mt-10 text-[0.7rem] uppercase tracking-[0.35em]" style={{ color: "rgba(201,164,62,0.5)" }}>
              {t("scroll")}
            </p>
          </Reveal>
        </Section>

        {/* ── Sección A — NOMBRE ────────────────────────────────────────── */}
        <Section>
          <SectionHead he={t("nameHe")} label={t("name")} />
          <Reveal>
            <p className="mx-auto max-w-xl text-center leading-relaxed" style={{ color: "#d8d2c4" }}>
              {tx(data.name.raicesYsignificado)}
            </p>
          </Reveal>
          <TriadGrid
            t={t}
            items={[
              tx(data.name.mundos),
              tx(data.name.almas),
              tx(data.name.divinidad),
            ]}
          />
        </Section>

        {/* ── Sección B — FORMA ─────────────────────────────────────────── */}
        <Section refEl={formaRef}>
          <SectionHead he={t("formHe")} label={t("form")} />
          <Reveal>
            <p className="mx-auto max-w-xl text-center leading-relaxed" style={{ color: "#d8d2c4" }}>
              {tx(data.form.descripcion)}
            </p>
          </Reveal>

          {/* Las partes: cada una, al cruzar el centro, ilumina su trazo. */}
          <div className="mx-auto mt-10 max-w-md space-y-5">
            {data.form.partes.map((p: LetterPart) => (
              <PartBlock
                key={p.svgPathId}
                part={p}
                locale={locale}
                active={activePart === p.svgPathId}
                onCenter={() => setPart(p.svgPathId)}
              />
            ))}
          </div>

          <TriadGrid
            t={t}
            items={[
              tx(data.form.mundos),
              tx(data.form.almas),
              tx(data.form.divinidad),
            ]}
          />
        </Section>

        {/* ── Sección C — NÚMERO ────────────────────────────────────────── */}
        <Section>
          <SectionHead he={t("numberHe")} label={t("number")} />
          <Reveal className="text-center">
            <div
              className="font-cinzel text-7xl"
              style={{ color: GOLD, textShadow: "0 0 30px rgba(201,164,62,0.5)" }}
            >
              {data.number.valor}
            </div>
            <p className="hebrew mx-auto mt-6 max-w-md text-xl leading-relaxed" style={{ color: "#e8e4d8" }}>
              {tx(data.number.guematriaForma)}
            </p>
          </Reveal>
          <TriadGrid
            t={t}
            items={[
              tx(data.number.mundos),
              tx(data.number.almas),
              tx(data.number.divinidad),
            ]}
          />
        </Section>

        {/* ── Sección 5 — Mapa de conocimiento (nodo multidimensional) ──── */}
        <Section>
          <SectionHead he={t("mapHe")} label={t("map")} />
          <Reveal className="text-center">
            <p className="mx-auto mb-10 max-w-md text-sm leading-relaxed" style={{ color: "#b2ac9f" }}>
              {t("mapHint")}
            </p>
            <KnowledgeMap letter={data.letter} t={t} />
          </Reveal>
        </Section>

        {/* ── Sección 6 — Conexiones (senderos al Universo) ─────────────── */}
        <Section>
          <SectionHead he={t("connectionsHe")} label={t("connections")} />
          <Reveal>
            <p className="mx-auto mb-10 max-w-md text-center text-sm leading-relaxed" style={{ color: "#b2ac9f" }}>
              {t("connectionsHint")}
            </p>
          </Reveal>
          <div className="mx-auto max-w-2xl space-y-6">
            {(["tanaj", "talmud", "midrash", "cabala", "jasidut"] as const).map((disc, i) => (
              <ConnectionRow
                key={disc}
                discLabel={t(`disc.${disc}`)}
                items={data.conexiones[disc]}
                locale={locale}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                openLabel={t("openStudy")}
              />
            ))}
          </div>

          {/* Fuentes */}
          <Reveal className="mx-auto mt-16 max-w-xl text-center">
            <p className="font-cinzel text-xs uppercase tracking-[0.3em]" style={{ color: "rgba(201,164,62,0.7)" }}>
              {t("sources")}
            </p>
            <ul className="mt-3 space-y-1 text-xs" style={{ color: "#8f8a7d" }}>
              {data.fuentes.map((f, i) => (
                <li key={i}>{tx(f)}</li>
              ))}
            </ul>
          </Reveal>

          <div className="h-[20vh]" />
        </Section>
      </div>
    </main>
  );
}

// ── Bloque-sección de pantalla completa ──────────────────────────────────
function Section({
  children,
  refEl,
}: {
  children: React.ReactNode;
  refEl?: React.RefObject<HTMLElement | null>;
}) {
  return (
    <section
      ref={refEl as React.RefObject<HTMLElement>}
      className="relative flex min-h-screen flex-col justify-end px-5 pb-[8vh] sm:px-8"
    >
      <div className="mx-auto w-full max-w-3xl">{children}</div>
    </section>
  );
}

// ── Encabezado de sección (hebreo + rótulo) ──────────────────────────────
function SectionHead({ he, label }: { he: string; label: string }) {
  return (
    <Reveal className="mb-7 text-center">
      <p className="hebrew text-2xl" style={{ color: GOLD }}>
        {he}
      </p>
      <h2 className="mt-1 font-cinzel text-sm uppercase tracking-[0.35em]" style={{ color: "#e8e4d8" }}>
        {label}
      </h2>
    </Reveal>
  );
}

// ── Tríada Mundos · Almas · Divinidad ────────────────────────────────────
function TriadGrid({
  t,
  items,
}: {
  t: ReturnType<typeof useTranslations>;
  items: [string, string, string] | string[];
}) {
  const cells = [
    { he: t("worldsHe"), label: t("worlds"), text: items[0] },
    { he: t("soulsHe"), label: t("souls"), text: items[1] },
    { he: t("divinityHe"), label: t("divinity"), text: items[2] },
  ];
  return (
    <div className="mt-12 grid gap-4 sm:grid-cols-3">
      {cells.map((c, i) => (
        <Reveal
          key={i}
          delay={((i % 3) + 1) as 1 | 2 | 3}
          className="rounded-2xl border border-[rgba(201,164,62,0.18)] p-5 text-center"
        >
          <p className="hebrew text-lg" style={{ color: GOLD }}>
            {c.he}
          </p>
          <p className="mt-0.5 font-cinzel text-[0.65rem] uppercase tracking-[0.25em]" style={{ color: "rgba(201,164,62,0.7)" }}>
            {c.label}
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#c9c3b5" }}>
            {c.text}
          </p>
        </Reveal>
      ))}
    </div>
  );
}

// ── Bloque de PARTE (ilumina su trazo al cruzar el centro de pantalla) ───
function PartBlock({
  part,
  locale,
  active,
  onCenter,
}: {
  part: LetterPart;
  locale: string;
  active: boolean;
  onCenter: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Banda delgada en el centro vertical: la parte que la cruza se activa.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) onCenter();
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
    // onCenter es estable por sección
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-2xl border p-5 transition-all duration-500"
      style={{
        borderColor: active ? "rgba(201,164,62,0.55)" : "rgba(201,164,62,0.15)",
        background: active ? "rgba(201,164,62,0.06)" : "transparent",
      }}
    >
      <p
        className="font-cinzel text-xs uppercase tracking-[0.25em]"
        style={{ color: active ? GOLD : "rgba(201,164,62,0.6)" }}
      >
        {pickText(part.label, locale)}
      </p>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#c9c3b5" }}>
        {pickText(part.significado, locale)}
      </p>
    </div>
  );
}

// ── Mapa de conocimiento — la letra como nodo multidimensional ───────────
function KnowledgeMap({
  letter,
  t,
}: {
  letter: string;
  t: ReturnType<typeof useTranslations>;
}) {
  const dims = [t("name"), t("form"), t("number")];
  // Tres satélites alrededor del nodo central (la letra).
  const sats = [
    { x: 200, y: 40 },
    { x: 40, y: 250 },
    { x: 360, y: 250 },
  ];
  return (
    <svg viewBox="0 0 400 300" className="mx-auto w-full max-w-md" style={{ overflow: "visible" }}>
      {sats.map((s, i) => (
        <line
          key={i}
          x1={200}
          y1={150}
          x2={s.x}
          y2={s.y}
          stroke={GOLD}
          strokeWidth={1}
          strokeOpacity={0.35}
        />
      ))}
      {sats.map((s, i) => (
        <g key={`g${i}`}>
          <circle cx={s.x} cy={s.y} r={6} fill={GOLD} opacity={0.85} />
          <text
            x={s.x}
            y={s.y - 14}
            textAnchor="middle"
            fontSize={13}
            fill="#e8e4d8"
            style={{ fontFamily: "var(--font-cinzel)", letterSpacing: "0.15em" }}
          >
            {dims[i]}
          </text>
        </g>
      ))}
      <circle cx={200} cy={150} r={40} fill="none" stroke={GOLD} strokeOpacity={0.4} strokeWidth={1} />
      <text
        x={200}
        y={150}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={48}
        fill={GOLD}
        style={{ fontFamily: "var(--font-hebrew)", filter: "drop-shadow(0 0 12px rgba(201,164,62,0.6))" }}
      >
        {letter}
      </text>
    </svg>
  );
}

// ── Fila de conexiones por disciplina ────────────────────────────────────
function ConnectionRow({
  discLabel,
  items,
  locale,
  delay,
  openLabel,
}: {
  discLabel: string;
  items: LetterConnection[];
  locale: string;
  delay: 1 | 2 | 3;
  openLabel: string;
}) {
  return (
    <Reveal delay={delay}>
      <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-baseline sm:gap-6" style={{ borderColor: "rgba(201,164,62,0.15)" }}>
        <p className="min-w-[7rem] font-cinzel text-xs uppercase tracking-[0.25em]" style={{ color: GOLD }}>
          {discLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {items.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              title={openLabel}
              className="group rounded-full border px-3.5 py-1.5 text-xs transition-all"
              style={{ borderColor: "rgba(201,164,62,0.3)", color: "#d8d2c4" }}
            >
              <span>{pickText(c.titulo, locale)}</span>
              <span className="ml-2 opacity-60">· {pickText(c.fuente, locale)}</span>
            </Link>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
