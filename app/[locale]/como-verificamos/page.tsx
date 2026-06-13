"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ─────────────────────────────────────────────────────────────────────────
//  /como-verificamos — "Cómo verificamos"
// ─────────────────────────────────────────────────────────────────────────
//  La página de confianza de Jashmal. Explica, con HONESTIDAD y sin exagerar,
//  el proceso REAL de verificación: gematrías letra por letra, fuentes cotejadas
//  contra Sefaria, distinción pshat / derash / sod, "los dos filos", lo no
//  verificable no se publica, y la aprobación final de la gerencia (Mardan).
//
//  REGLA DURA DE HONESTIDAD: NO afirmamos que un rabino humano certificado
//  revise cada palabra. NO inventamos credenciales. El "Sofer" es el rol de
//  verificación del proyecto (editor-erudito), apoyado en herramientas y en las
//  fuentes primarias, con aprobación humana de la gerencia antes de publicar.
//
//  Trilingüe: es (canónico) · fa (RTL, Vazirmatn) · en. El contenido se
//  selecciona por locale; el español es el respaldo si faltara alguno.
// ─────────────────────────────────────────────────────────────────────────

const GOLD = "#c9a43e";

interface Paso {
  he: string;
  titulo: string;
  texto: string;
}

interface Copy {
  dir: "ltr" | "rtl";
  font: string;
  kicker: string;
  h1: string;
  he: string;
  lead: string;
  pasosTitulo: string;
  pasos: Paso[];
  noClaimTitulo: string;
  noClaim: string;
  cierreTitulo: string;
  cierre: string;
  cta: string;
  volver: string;
  startStudy: string;
}

const COPY: Record<Locale, Copy> = {
  // ── ESPAÑOL (canónico) ───────────────────────────────────────────────────
  es: {
    dir: "ltr",
    font: "var(--font-body), serif",
    kicker: "La promesa de Jashmal",
    h1: "Cómo verificamos",
    he: "אֱמֶת",
    lead:
      "En Jashmal, la confianza viene antes que todo. Un solo dato falso —una gematría que no cuadra, una fuente que no dice lo que decimos— rompería justo lo que queremos construir. Por eso cada estudio pasa por un proceso de verificación antes de publicarse. Aquí lo explicamos tal cual es, sin adornos.",
    pasosTitulo: "El proceso, paso a paso",
    pasos: [
      {
        he: "גִּימַטְרִיָּה",
        titulo: "Cada gematría se calcula letra por letra",
        texto:
          "Cuando un estudio dice que una palabra «suma» cierto número, ese número se calcula sumando el valor de cada letra hebrea, una por una, y se vuelve a comprobar. No publicamos una equivalencia numérica sin haberla recontado. Si una igualdad solo cuadra usando un sistema de cálculo particular (por ejemplo, sumando el «kolel» —el +1 del conjunto—), lo decimos en el propio estudio, no lo escondemos.",
      },
      {
        he: "מְקוֹרוֹת",
        titulo: "Cada fuente se coteja contra el texto original",
        texto:
          "Las citas se verifican contra Sefaria, la biblioteca abierta de textos judíos, con su referencia exacta: libro capítulo:versículo, folio del Talmud (daf y amud, a/b), pasaje del Zohar o del Midrash. Si decimos «Berajot 7a» o «Zohar, Achrei Mot 50:305», es porque fuimos a ese lugar y leímos que dice lo que afirmamos. Cuando algo se cita de memoria o de una tradición sin localización exacta, se marca como tal.",
      },
      {
        he: "פְּשָׁט · דְּרָשׁ",
        titulo: "Distinguimos siempre el nivel de lectura",
        texto:
          "No es lo mismo lo que el texto dice de forma llana (pshat) que una lectura homilética (derash/midrash) o una interpretación mística (sod, cabalística). Un mismo versículo puede tener las cuatro lecturas del PaRDeS, y cada una tiene su peso. Cuando una afirmación es interpretación —y no el sentido simple del texto— lo decimos con todas las letras: «en clave de sod», «tradición clásica de gematría», «lectura del Zohar». Nunca presentamos una lectura mística como si fuera el dato literal de la Torá.",
      },
      {
        he: "שְׁנֵי פִּיּוֹת",
        titulo: "Aplicamos «los dos filos» con honestidad",
        texto:
          "Muchos textos admiten lecturas divergentes, y a veces opuestas. En vez de elegir la cómoda y callar la otra, mostramos los dos filos (שְׁנֵי פִּיּוֹת): la lectura que eleva y la que advierte. Donde los sabios discrepan, decimos que discrepan, y de quién es cada voz (Rashi, Ramban, el Arizal, Baal HaSulam…). Preferimos una pregunta honesta a una respuesta falsamente cerrada.",
      },
      {
        he: "סָפֵק",
        titulo: "Lo que no se puede verificar, no se publica",
        texto:
          "Si una gematría no cuadra, si una fuente no aparece donde debería, o si una afirmación no se puede comprobar, hay dos caminos: o no se publica, o se publica marcada explícitamente como duda o como tradición no verificada. Preferimos decir «esto no lo podemos confirmar» antes que afirmar de más. La duda honesta vale más que la certeza inventada.",
      },
      {
        he: "אִשּׁוּר",
        titulo: "La gerencia aprueba antes de publicar",
        texto:
          "Ningún estudio sale al sitio de forma automática. Después de la verificación, la dirección del proyecto lo revisa y da el visto bueno final. Es el último filtro humano: nada se publica sin esa aprobación.",
      },
    ],
    noClaimTitulo: "Lo que NO afirmamos",
    noClaim:
      "Seamos claros sobre los límites. La verificación de Jashmal se apoya en las fuentes primarias (Sefaria) y en el cálculo directo de cada gematría, bajo la responsabilidad editorial del proyecto y con aprobación humana antes de publicar. No afirmamos que un tribunal rabínico ni un rabino certificado revise y selle cada palabra, ni nos atribuimos credenciales que no tenemos. Lo que prometemos es el método: comprobar, citar con exactitud, distinguir el nivel de lectura y no publicar lo que no se sostiene. Si alguna vez encuentras un error, queremos saberlo: corregirlo es parte del mismo método.",
    cierreTitulo: "Por qué importa",
    cierre:
      "El estudio honesto es el corazón del proyecto. La técnica, el diseño y la difusión vienen después y están al servicio de eso. Preferimos crecer despacio sobre cimientos firmes que rápido sobre arena. Esa es la fe (אֱמוּנָה) aplicada a nuestro propio trabajo: firmeza, fidelidad, lo que sostiene.",
    cta: "Ver los Misterios",
    volver: "← Volver",
    startStudy: "Comenzar estudio →",
  },

  // ── FARSI (RTL) ────────────────────────────────────────────────────────────
  fa: {
    dir: "rtl",
    font: "Vazirmatn, sans-serif",
    kicker: "وعدهٔ خَشمَل",
    h1: "چگونه تأیید می‌کنیم",
    he: "אֱמֶת",
    lead:
      "در خَشمَل، اعتماد پیش از هر چیز است. یک دادهٔ نادرست — گیماتریایی که جور درنمی‌آید، منبعی که آنچه می‌گوییم را نمی‌گوید — همان چیزی را که می‌خواهیم بسازیم درهم می‌شکند. به همین دلیل هر مطالعه پیش از انتشار از یک فرایندِ تأیید می‌گذرد. اینجا آن را همان‌گونه که هست شرح می‌دهیم، بی هیچ آرایه.",
    pasosTitulo: "فرایند، گام به گام",
    pasos: [
      {
        he: "גִּימַטְרִיָּה",
        titulo: "هر گیماتریا حرف‌به‌حرف محاسبه می‌شود",
        texto:
          "وقتی مطالعه‌ای می‌گوید واژه‌ای عددی را «جمع می‌زند»، آن عدد با جمعِ ارزشِ هر حرفِ عبری، یک‌به‌یک، به‌دست می‌آید و دوباره بررسی می‌شود. هیچ برابریِ عددی را بدون شمارشِ دوباره منتشر نمی‌کنیم. اگر برابری‌ای تنها با یک شیوهٔ محاسبهٔ خاص جور دربیاید (مثلاً با افزودنِ «کولِل» — همان +۱ مجموعه)، آن را در خودِ مطالعه می‌گوییم، پنهانش نمی‌کنیم.",
      },
      {
        he: "מְקוֹרוֹת",
        titulo: "هر منبع با متنِ اصلی سنجیده می‌شود",
        texto:
          "نقل‌قول‌ها در برابرِ سِفاریا — کتابخانهٔ بازِ متون یهودی — با ارجاعِ دقیق سنجیده می‌شوند: کتاب باب:آیه، برگِ تلمود (دَف و عَمود، الف/ب)، بندِ زوهر یا میدراش. اگر می‌گوییم «بِراخوت ۷الف» یا «زوهر، آحَری موت ۵۰:۳۰۵»، از آن روست که به همان‌جا رفته‌ایم و خوانده‌ایم که همان را می‌گوید که ما می‌گوییم. آنچه از حافظه یا از سنتی بی‌ارجاعِ دقیق نقل شود، همان‌گونه نشانه‌گذاری می‌شود.",
      },
      {
        he: "פְּשָׁט · דְּרָשׁ",
        titulo: "همواره سطحِ قرائت را از هم جدا می‌کنیم",
        texto:
          "آنچه متن به‌سادگی می‌گوید (پشاط) با قرائتِ تمثیلی (دِراش/میدراش) یا تأویلِ عرفانی (سود، کابالایی) یکی نیست. یک آیه می‌تواند هر چهار قرائتِ پَردِس را داشته باشد و هر کدام جای خود را دارند. هرگاه گزاره‌ای تأویل باشد — نه معنای سادهٔ متن — آن را آشکارا می‌گوییم: «در کلیدِ سود»، «سنتِ کلاسیکِ گیماتریا»، «قرائتِ زوهر». هرگز یک قرائتِ عرفانی را به‌جای دادهٔ لفظیِ تورات جا نمی‌زنیم.",
      },
      {
        he: "שְׁנֵי פִּיּוֹת",
        titulo: "«دو لبه» را با صداقت به‌کار می‌بریم",
        texto:
          "بسیاری از متن‌ها قرائت‌های واگرا و گاه متضاد را برمی‌تابند. به‌جای گزینشِ قرائتِ راحت و خاموش‌ماندن دربارهٔ دیگری، دو لبه (שְׁנֵי פִּיּוֹת) را نشان می‌دهیم: قرائتی که برمی‌کشد و قرائتی که هشدار می‌دهد. آنجا که حکیمان اختلاف دارند، می‌گوییم که اختلاف دارند و هر صدا از آنِ کیست (راشی، رَمبان، آریزال، بَعل هَسولام…). یک پرسشِ صادقانه را بر پاسخی دروغین و بسته ترجیح می‌دهیم.",
      },
      {
        he: "סָפֵק",
        titulo: "آنچه تأییدپذیر نیست، منتشر نمی‌شود",
        texto:
          "اگر گیماتریایی جور درنیاید، اگر منبعی آنجا که باید نباشد، یا اگر گزاره‌ای بررسی‌پذیر نباشد، دو راه هست: یا منتشر نمی‌شود، یا با نشانه‌گذاریِ صریح به‌عنوان تردید یا سنتِ تأییدنشده منتشر می‌شود. «این را نمی‌توانیم تأیید کنیم» را بر ادعای افزون ترجیح می‌دهیم. تردیدِ صادقانه از یقینِ ساختگی ارزشمندتر است.",
      },
      {
        he: "אִשּׁוּר",
        titulo: "گردانندگی پیش از انتشار تأیید می‌کند",
        texto:
          "هیچ مطالعه‌ای خودکار روی سایت نمی‌رود. پس از تأیید، مدیریتِ پروژه آن را بازبینی می‌کند و تأییدِ نهایی را می‌دهد. این آخرین صافیِ انسانی است: هیچ چیز بی این تأیید منتشر نمی‌شود.",
      },
    ],
    noClaimTitulo: "آنچه ادعا نمی‌کنیم",
    noClaim:
      "دربارهٔ مرزها روشن باشیم. تأییدِ خَشمَل بر منابعِ نخستین (سِفاریا) و بر محاسبهٔ مستقیمِ هر گیماتریا تکیه دارد، زیرِ مسئولیتِ ویرایشیِ پروژه و با تأییدِ انسانی پیش از انتشار. ادعا نمی‌کنیم که دادگاهی ربّانی یا خاخامی دارای گواهی هر واژه را بازبینی و مُهر می‌کند، و اعتباری را که نداریم به خود نمی‌بندیم. آنچه وعده می‌دهیم روش است: بررسی، ارجاعِ دقیق، تفکیکِ سطحِ قرائت، و منتشر‌نکردنِ آنچه استوار نیست. اگر روزی خطایی یافتی، می‌خواهیم بدانیم: اصلاحِ آن بخشی از همین روش است.",
    cierreTitulo: "چرا اهمیت دارد",
    cierre:
      "مطالعهٔ صادقانه قلبِ این پروژه است. فن، طراحی و نشر پس از آن می‌آیند و در خدمتِ آن‌اند. ترجیح می‌دهیم آهسته بر بنیادی استوار رشد کنیم تا تند بر شن. این همان ایمان (אֱמוּנָה) است که بر کارِ خودمان به‌کار می‌بندیم: استواری، وفاداری، آنچه نگاه می‌دارد.",
    cta: "دیدنِ اسرار",
    volver: "بازگشت →",
    startStudy: "شروع مطالعه ←",
  },

  // ── INGLÉS ───────────────────────────────────────────────────────────────
  en: {
    dir: "ltr",
    font: "var(--font-body), serif",
    kicker: "The Jashmal promise",
    h1: "How we verify",
    he: "אֱמֶת",
    lead:
      "At Jashmal, trust comes before everything. A single false claim — a gematria that doesn't add up, a source that doesn't say what we say it does — would break the very thing we are trying to build. That's why every study goes through a verification process before it's published. Here is how it actually works, with no embellishment.",
    pasosTitulo: "The process, step by step",
    pasos: [
      {
        he: "גִּימַטְרִיָּה",
        titulo: "Every gematria is computed letter by letter",
        texto:
          "When a study says a word \"adds up\" to a number, that number is calculated by summing the value of each Hebrew letter, one by one, and then checked again. We don't publish a numerical equivalence without recounting it. If an equality only works using a particular counting method (for example, adding the \"kolel\" — the +1 of the set), we say so within the study itself; we don't hide it.",
      },
      {
        he: "מְקוֹרוֹת",
        titulo: "Every source is checked against the original text",
        texto:
          "Citations are verified against Sefaria, the open library of Jewish texts, with their exact reference: book chapter:verse, Talmud folio (daf and amud, a/b), passage of the Zohar or Midrash. If we say \"Berakhot 7a\" or \"Zohar, Achrei Mot 50:305,\" it's because we went there and read that it says what we claim. When something is quoted from memory or from a tradition without an exact location, it is marked as such.",
      },
      {
        he: "פְּשָׁט · דְּרָשׁ",
        titulo: "We always distinguish the level of reading",
        texto:
          "What the text says plainly (pshat) is not the same as a homiletic reading (derash/midrash) or a mystical interpretation (sod, Kabbalistic). One verse can carry all four readings of PaRDeS, and each has its own weight. When a claim is interpretation — and not the plain sense of the text — we say so outright: \"in the key of sod,\" \"classical gematria tradition,\" \"a reading of the Zohar.\" We never present a mystical reading as if it were the literal datum of the Torah.",
      },
      {
        he: "שְׁנֵי פִּיּוֹת",
        titulo: "We apply \"the two edges\" honestly",
        texto:
          "Many texts admit divergent, sometimes opposite, readings. Rather than picking the comfortable one and staying silent about the other, we show both edges (שְׁנֵי פִּיּוֹת): the reading that elevates and the one that warns. Where the sages disagree, we say they disagree, and whose voice is whose (Rashi, Ramban, the Arizal, Baal HaSulam…). We prefer an honest question to a falsely settled answer.",
      },
      {
        he: "סָפֵק",
        titulo: "What can't be verified isn't published",
        texto:
          "If a gematria doesn't add up, if a source isn't where it should be, or if a claim can't be checked, there are two paths: either it isn't published, or it's published explicitly marked as a doubt or as an unverified tradition. We'd rather say \"we can't confirm this\" than overclaim. Honest doubt is worth more than invented certainty.",
      },
      {
        he: "אִשּׁוּר",
        titulo: "Management approves before publishing",
        texto:
          "No study goes live automatically. After verification, the project's direction reviews it and gives the final approval. It's the last human filter: nothing is published without it.",
      },
    ],
    noClaimTitulo: "What we do NOT claim",
    noClaim:
      "Let's be clear about the limits. Jashmal's verification rests on the primary sources (Sefaria) and on the direct calculation of each gematria, under the project's editorial responsibility and with human approval before publishing. We do not claim that a rabbinic court or a certified rabbi reviews and seals every word, nor do we attribute to ourselves credentials we don't have. What we promise is the method: check, cite exactly, distinguish the level of reading, and not publish what doesn't hold. If you ever find an error, we want to know: correcting it is part of the same method.",
    cierreTitulo: "Why it matters",
    cierre:
      "Honest study is the heart of the project. The technology, the design, and the outreach come after, and they serve it. We'd rather grow slowly on firm ground than fast on sand. That is faith (אֱמוּנָה) applied to our own work: firmness, faithfulness, that which holds.",
    cta: "See the Mysteries",
    volver: "← Back",
    startStudy: "Begin study →",
  },
};

export default function ComoVerificamosPage() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const c = COPY[locale] ?? COPY.es;
  const fa = locale === "fa";

  return (
    <div
      className="always-dark min-h-screen"
      style={{ background: "#05050a", fontFamily: c.font }}
      dir={c.dir}
    >
      {/* Nav */}
      <nav
        className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md"
        style={{ background: "rgba(5,5,10,0.9)" }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">
            חַשְׁמַל · {fa ? "خَشمَل" : "Jashmal"}
          </Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button
              onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              {c.startStudy}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">
        {/* Hero */}
        <div className="mb-14 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {c.kicker}
          </p>
          <p
            className="hebrew mb-3 text-5xl font-bold leading-none text-gold"
            style={{ textShadow: `0 0 22px ${GOLD}88` }}
          >
            {c.he}
          </p>
          <h1 className="font-cinzel text-2xl font-bold tracking-wide text-parchment sm:text-3xl">
            {c.h1}
          </h1>
          <p
            className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted"
            dir={c.dir}
          >
            {c.lead}
          </p>
        </div>

        {/* Pasos del proceso */}
        <h2 className="mb-6 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
          {c.pasosTitulo}
        </h2>
        <ol className="space-y-4">
          {c.pasos.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-4 rounded-2xl border border-gold/15 p-5"
              style={{ background: "rgba(255,255,255,0.02)" }}
            >
              <span
                className="hebrew shrink-0 text-xl font-bold text-gold/80"
                dir="rtl"
                style={{ textShadow: `0 0 12px ${GOLD}66` }}
              >
                {p.he}
              </span>
              <div className="flex-1" dir={c.dir}>
                <h3 className="font-cinzel text-[13px] font-bold uppercase tracking-wide text-gold/85">
                  {String(i + 1).padStart(2, "0")} · {p.titulo}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-parchment/85">{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Lo que NO afirmamos — el guardarraíl de honestidad */}
        <div className="mt-10 rounded-2xl border border-gold/25 bg-gold/[0.04] p-6" dir={c.dir}>
          <h2 className="font-cinzel text-[13px] font-bold uppercase tracking-widest text-gold/75">
            {c.noClaimTitulo}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-parchment/80">{c.noClaim}</p>
        </div>

        {/* Cierre — por qué importa */}
        <div className="mt-8 text-center" dir={c.dir}>
          <h2 className="font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {c.cierreTitulo}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] italic leading-relaxed text-muted">
            {c.cierre}
          </p>
        </div>

        {/* CTA a los misterios */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => router.push("/misterios")}
            className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
            style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
          >
            {c.cta}
          </button>
          <Link
            href="/"
            className="font-cinzel text-xs uppercase tracking-widest text-gold/60 transition-colors hover:text-gold"
          >
            {c.volver}
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            {fa ? "کابالا و فلسفهٔ یهودی" : "Cabalá & Filosofía Judía"}
          </p>
        </div>
      </main>
    </div>
  );
}
