// ─────────────────────────────────────────────────────────────────────────
//  BUSCADOR GLOBAL — construcción del índice
// ─────────────────────────────────────────────────────────────────────────
//  Este módulo corre SOLO EN EL SERVIDOR, durante el build. Lo consume el
//  route handler estático `app/search-index.json/route.ts`, que Next prerenderiza
//  a un archivo JSON servido por el CDN.
//
//  ¿Por qué así y no importándolo desde el componente? Porque los registros que
//  alimentan el índice son enormes: `estaciones.generated.ts` pesa 144 KB de
//  markdown, las 22 letras traen el estudio completo, los 11 módulos de academia
//  traen sus lecciones enteras. Si el componente del panel importara esto, se
//  arrastraría medio megabyte al navegador. Aquí se destila a título + gancho +
//  término hebreo y sale un JSON de ~90 KB (~25 KB comprimido) que el navegador
//  pide UNA sola vez, y solo cuando el usuario abre la lupa.
//
//  REGLA DE ORO: el índice se arma EXCLUSIVAMENTE de los registros tipados que
//  cura el Sofer. NO consulta /api/brain ni la base del cerebro. Esa base tiene
//  nodos cosechados con nombres en inglés ("Numbers 11", "Genesis 3:15") y una
//  cola de duplicados sin revisar; dejarla fuera es precisamente la razón por la
//  que se eligió este diseño. No la metas buscando "completitud".
//
//  Contenido nuevo: cero. Todo sale de registros que ya existen y ya se publican.
// ─────────────────────────────────────────────────────────────────────────

import { MISTERIOS } from "@/lib/content/misterios";
import { LETTERS } from "@/lib/letters";
import { GEMATRIAS } from "@/lib/nodes/gematrias";
import { ESTACIONES } from "@/lib/content/estaciones";
import { PODCAST_EPISODES } from "@/lib/content/podcast";
import { LESSONS } from "@/lib/academia/modulo1";
import { LESSONS2 } from "@/lib/academia/modulo2";
import { LESSONS3 } from "@/lib/academia/modulo3";
import { LESSONS4 } from "@/lib/academia/modulo4";
import { LESSONS5 } from "@/lib/academia/modulo5";
import { LESSONS6 } from "@/lib/academia/modulo6";
import { LESSONS7 } from "@/lib/academia/modulo7";
import { LESSONS8 } from "@/lib/academia/modulo8";
import { LESSONS9 } from "@/lib/academia/modulo9";
import { LESSONS10 } from "@/lib/academia/modulo10";
import { LESSONS11 } from "@/lib/academia/modulo11";
import esMessages from "@/messages/es.json";
import faMessages from "@/messages/fa.json";
import enMessages from "@/messages/en.json";
import type { SearchDoc, SearchLocale } from "./match";

/**
 * Recorta un gancho largo. El índice se descarga entero al abrir la lupa, así
 * que cada carácter cuenta: guardamos lo justo para que el resultado se
 * entienda de un vistazo, no el párrafo completo.
 */
function short(text: string | undefined, max = 110): string | undefined {
  if (!text) return undefined;
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

/**
 * Descripción secundaria (fa/en): se guarda SOLO si de verdad difiere del
 * español. Varios registros rellenan esos campos copiando el texto español;
 * duplicarlo triplicaría el peso del índice sin añadir ni una coincidencia.
 */
function altShort(text: string | undefined, base: string | undefined): string | undefined {
  if (!text || !base) return short(text);
  return text.trim() === base.trim() ? undefined : short(text);
}

/**
 * Traducción "real" o eco del español. Varios registros rellenan el campo farsi
 * copiando el texto español cuando aún no está traducido; tomar eso por una
 * traducción sería justo la mezcla silenciosa que el proyecto evita.
 */
function isRealTranslation(translated: string | undefined, source: string): boolean {
  return !!translated && translated.trim() !== source.trim();
}

export function buildSearchIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  // ── Misterios (62) ──────────────────────────────────────────────────────
  // Se indexan los TRES idiomas del título y del gancho, para que "Messiah" y
  // "ماشیح" lleguen al mismo estudio. Pero los idiomas en que la PÁGINA existe
  // son es/fa: la política del sitio (components/MisterioTranslationNotice.tsx)
  // es que los misterios no tienen versión en inglés. De ahí sale la etiqueta
  // honesta "solo en español" en los resultados.
  for (const m of MISTERIOS) {
    const langs: SearchLocale[] = ["es"];
    if (isRealTranslation(m.tituloFa, m.titulo) || isRealTranslation(m.ganchoFa, m.gancho)) {
      langs.push("fa");
    }
    docs.push({
      id: `misterio:${m.slug}`,
      kind: "misterio",
      href: `/misterio/${m.slug}`,
      t: { es: m.titulo, fa: m.tituloFa, en: m.tituloEn },
      d: {
        es: short(m.gancho),
        fa: altShort(m.ganchoFa, m.gancho),
        en: altShort(m.ganchoEn, m.gancho),
      },
      he: m.he,
      serie: m.serie,
      extra: [m.slug, ...(m.numero ? [m.numero] : [])],
      langs,
    });
  }

  // ── Letras hebreas (22) ─────────────────────────────────────────────────
  for (const l of Object.values(LETTERS)) {
    const langs: SearchLocale[] = ["es"];
    if (l.level1.fa) langs.push("fa");
    if (l.level1.en) langs.push("en");
    docs.push({
      id: `letra:${l.slug}`,
      kind: "letra",
      href: `/letra/${l.slug}`,
      t: {
        es: `${l.letter} ${l.nameTranslit.es}`,
        fa: l.nameTranslit.fa ? `${l.letter} ${l.nameTranslit.fa}` : undefined,
        en: l.nameTranslit.en ? `${l.letter} ${l.nameTranslit.en}` : undefined,
      },
      d: {
        es: short(l.level1.es),
        fa: altShort(l.level1.fa, l.level1.es),
        en: altShort(l.level1.en, l.level1.es),
      },
      he: l.nameHe,
      serie: "letras",
      extra: [l.slug, l.letter, String(l.value)],
      langs,
    });
  }

  // ── Gematrías ───────────────────────────────────────────────────────────
  for (const g of GEMATRIAS) {
    const langs: SearchLocale[] = ["es"];
    if (isRealTranslation(g.tituloFa, g.titulo)) langs.push("fa");
    if (isRealTranslation(g.tituloEn, g.titulo)) langs.push("en");
    docs.push({
      id: `gematria:${g.num}`,
      kind: "gematria",
      // La galería vive en una sola página; el ancla lleva al número exacto.
      href: `/gematrias#g${g.num}`,
      t: { es: g.titulo, fa: g.tituloFa, en: g.tituloEn },
      d: { es: short(g.sig), fa: altShort(g.sigFa, g.sig), en: altShort(g.sigEn, g.sig) },
      he: g.he,
      serie: "gematria",
      extra: [String(g.num)],
      langs,
    });
  }

  // ── Las 14 Estaciones del Viaje de la Creación ──────────────────────────
  // El propio registro declara que fa/en caen a español por ahora.
  for (const e of ESTACIONES) {
    docs.push({
      id: `estacion:${e.slug}`,
      kind: "estacion",
      href: `/viaje/${e.slug}`,
      t: { es: `${e.transliteracion} — ${e.traduccion}` },
      d: { es: short(e.esencia) },
      he: e.hebreo,
      serie: "viaje",
      extra: [e.slug, String(e.numero)],
      langs: ["es"],
    });
  }

  // ── Academia — lecciones de los 11 módulos ──────────────────────────────
  const MODULOS: { n: number; lessons: { slug: string; title: string }[] }[] = [
    { n: 1, lessons: LESSONS },
    { n: 2, lessons: LESSONS2 },
    { n: 3, lessons: LESSONS3 },
    { n: 4, lessons: LESSONS4 },
    { n: 5, lessons: LESSONS5 },
    { n: 6, lessons: LESSONS6 },
    { n: 7, lessons: LESSONS7 },
    { n: 8, lessons: LESSONS8 },
    { n: 9, lessons: LESSONS9 },
    { n: 10, lessons: LESSONS10 },
    { n: 11, lessons: LESSONS11 },
  ];
  for (const { n, lessons } of MODULOS) {
    for (const l of lessons) {
      docs.push({
        id: `leccion:${n}:${l.slug}`,
        kind: "leccion",
        href: `/academia/modulo-${n}/${l.slug}`,
        t: { es: l.title },
        serie: "academia",
        extra: [l.slug, `modulo ${n}`],
        langs: ["es"],
      });
    }
  }

  // ── Podcast — un episodio existe en el idioma en que se grabó ───────────
  for (const ep of PODCAST_EPISODES) {
    docs.push({
      id: `podcast:${ep.slug}`,
      kind: "podcast",
      href: "/podcast",
      t: { es: ep.title, fa: ep.locale === "fa" ? ep.title : undefined },
      d: { es: short(ep.description) },
      serie: ep.serie,
      extra: [ep.slug],
      langs: [ep.locale],
    });
  }

  // ── Páginas principales ────────────────────────────────────────────────
  // Los rótulos salen de messages/*.json, que ya están traducidos a los tres
  // idiomas: buscar "letters" o "حروف" lleva al índice del alefato.
  const nav = {
    es: esMessages.nav as Record<string, string>,
    fa: faMessages.nav as Record<string, string>,
    en: enMessages.nav as Record<string, string>,
  };
  const PAGINAS: { key: string; href: string }[] = [
    { key: "study", href: "/estudio" },
    { key: "ask", href: "/preguntar" },
    { key: "letters", href: "/letras" },
    { key: "gematria", href: "/gematrias" },
    { key: "mysteries", href: "/misterios" },
    { key: "podcast", href: "/podcast" },
    { key: "atlas", href: "/atlas" },
    { key: "brain", href: "/mente-cosmica" },
    { key: "creation", href: "/creacion" },
    { key: "journey", href: "/viaje" },
    { key: "tree", href: "/arbol" },
    { key: "soulMap", href: "/mapa-del-alma" },
    { key: "soulMirror", href: "/espejo-del-alma" },
    { key: "whatIsKabbalah", href: "/que-es-cabala" },
    { key: "community", href: "/comunidad" },
    { key: "about", href: "/acerca" },
    { key: "myStudies", href: "/mis-estudios" },
  ];
  for (const p of PAGINAS) {
    if (!nav.es[p.key]) continue;
    docs.push({
      id: `pagina:${p.href}`,
      kind: "pagina",
      href: p.href,
      t: { es: nav.es[p.key], fa: nav.fa[p.key], en: nav.en[p.key] },
      extra: [p.href.replace(/^\//, "")],
      // La interfaz sí está traducida a los tres idiomas.
      langs: ["es", "fa", "en"],
    });
  }

  return docs;
}
