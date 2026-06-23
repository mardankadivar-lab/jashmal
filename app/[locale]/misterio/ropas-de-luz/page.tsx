"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: DE ROPAS DE LUZ A PIEL DE SERPIENTE ───────────────────
// "La caída necesaria para el Tikún" — Génesis 3:21 (כָּתְנוֹת עוֹר / אוֹר) leído
// con Bereshit Rabbá 20:12 (la Torá de R. Meir), Bereshit Rabbá 9:7 (el yétzer
// hará "muy bueno"), Likkutei Torah Shir HaShirim 4:2 (yeridá tzórej aliyá),
// la Ruptura de los Recipientes (Sefer Etz Chaim 9:1) y el birur de las chispas
// (Tanya, Likutei Amarim 37). Contenido verificado por el Sofer (editor-erudito).
// Idioma principal: español (el video de TikTok es en español).
//
// GUARDARRAÍLES DE HONESTIDAD (del Sofer — respetados en el render):
//  · El gancho "Adán y Eva nunca pecaron" es PUERTA, no tesis. El estudio aterriza
//    en "sí hubo falta — pero la falta tenía un lugar en el plan". Nunca se presenta
//    "no pecaron" como conclusión.
//  · La lectura de Izhbitz (Mei HaShiloach) va SIEMPRE etiquetada como minoritaria
//    y controvertida; NO como halajá ni visión normativa.
//  · La variante "kotnot OR (luz)" es de la Torá personal de R. Meir (drash); el
//    texto masorético normativo dice עוֹר (piel).
//  · Cita "Tikunei Zohar 122b:5" (formato Sefaria), NO "Tikun 57".
// FARSI: traducción verificada por el Sofer (rutina i18n). El español es canónico
//   y queda INTACTO; el farsi se renderiza vía ternario {fa ? … : …}. Datos sagrados
//   (hebreo, gematrías, citas, refs) copiados EXACTOS en ambos idiomas.

// ── Las cuatro lecturas de la palabra עוֹר / אוֹר ─────────────────────────────
interface Lectura {
  he: string;
  name: string;
  nameFa: string;
  sentido: string;
  sentidoFa: string;
  color: string;
}

const LECTURAS: Lectura[] = [
  {
    he: "אוֹר",
    name: "Luz · 207 · con álef",
    nameFa: "نور · ۲۰۷ · با الِف",
    sentido:
      "La «ropa de luz»: el cuerpo translúcido de Adam HaRishón antes de la falta, conservado en la Torá personal de Rabí Meir (Bereshit Rabbá 20:12). No es el texto normativo, sino la memoria de lo que se perdió.",
    sentidoFa:
      "«جامهٔ نور»: تنِ شفّافِ آدَم هاریشون (نخستین انسان) پیش از هبوط، که در تورای شخصیِ رَبّی مِئیر نگاه داشته شده است (بِرِشیت رَبّا ۲۰:۱۲). این متنِ هنجارین نیست، بلکه یادِ آن چیزی است که از دست رفت.",
    color: "#f0d060",
  },
  {
    he: "עוֹר",
    name: "Piel · 276 · con áyin",
    nameFa: "پوست · ۲۷۶ · با عَین",
    sentido:
      "La «ropa de piel»: el cuerpo denso, mortal, opaco que el alma viste tras la caída (Génesis 3:21, texto masorético). La luz no se apagó — se vistió. Está debajo, esperando volverse transparente.",
    sentidoFa:
      "«جامهٔ پوست»: تنِ چگال، میرا و کدِر که روان پس از هبوط بر تن می‌کند (پیدایش ۳:۲۱، متنِ مَسوری). نور خاموش نشد — جامه پوشید. زیرِ آن است، چشم‌به‌راهِ آن‌که دوباره شفّاف شود.",
    color: "#cf8c52",
  },
];

// ── Componentes (idénticos en estilo a /misterio/lot y /misterio/betsabe) ─────
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

function PullQuote({ he, es, fa, source, fa_active }: { he: string; es: string; fa: string; source: string; fa_active: boolean }) {
  return (
    <Section>
      <div className="my-10 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
        <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
        <p className="mb-1 text-sm italic leading-relaxed text-parchment/80" dir={fa_active ? "rtl" : "ltr"}>«{fa_active ? fa : es}»</p>
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
export default function RopasDeLuzPage() {
  const router = useRouter();
  const locale = useLocale();
  const fa = locale === "fa";
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">חַשְׁמַל · Jashmal</Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
              {fa ? "شروع مطالعه" : "Comenzar estudio →"}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── HERO ── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "پیدایش ۳:۲۱ · میدراش · سود" : "Génesis 3:21 · Midrash · Sod"}
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(40px, 12vw, 84px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            כָּתְנוֹת עוֹר
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "از جامهٔ نور تا پوستِ مار" : "De Ropas de Luz a Piel de Serpiente"}
          </h2>
          <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/55">
            {fa ? "هبوطِ لازم برایِ تیکون" : "La caída necesaria para el Tikún"}
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "تنها یک حرف، «جامهٔ نور» (אוֹר) را از «جامهٔ پوست» (עוֹר) جدا می‌کند. هبوط، نور را به پوست پوشاند — اما آن را خاموش نکرد. کارِ انسان آن است که دوباره پوستِ مار را به جامهٔ نور بدل کند."
              : <>Una sola letra separa la «ropa de luz» (אוֹר) de la «ropa de piel» (עוֹר).
                La caída vistió a la luz con piel — pero no la apagó. El trabajo del hombre
                es convertir, de nuevo, la piel de serpiente en ropa de luz.</>}
          </p>
        </div>

        {/* ── Advertencia del Sofer (puerta, no tesis) ── */}
        <Section>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4" dir={fa ? "rtl" : "ltr"}>
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              {fa ? "پیش از آغاز — یادداشتِ صداقت" : "Antes de empezar — nota de honestidad"}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              {fa
                ? <>«آیا می‌دانستی که آدم و حوّا هرگز گناه نکردند؟» یک{" "}
                  <span className="text-gold/85">دروازه</span> است، نه نتیجه. حقیقتِ
                  صادقانهٔ این مطالعه برعکس و ژرف‌تر است:{" "}
                  <span className="text-gold/90">آری، خطایی واقعی رخ داد — اما آن خطا
                  جایی در نقشه داشت.</span>{" "}
                  سنّتِ اکثریت از یک گناه سخن می‌گوید. آنچه ما نشان می‌دهیم این است که
                  حتّیٰ همان گناه در چیزی بزرگ‌تر بلعیده شد.</>
                : <>«¿Sabías que Adán y Eva nunca pecaron?» es una{" "}
                  <span className="text-gold/85">puerta</span>, no la conclusión. La verdad
                  honesta de este estudio es la contraria y más profunda:{" "}
                  <span className="text-gold/90">sí hubo una falta real — pero esa falta
                  tenía un lugar en el plan.</span>{" "}
                  La tradición mayoritaria habla de un pecado. Lo que mostramos es que
                  incluso ese pecado fue absorbido por algo más grande.</>}
            </p>
          </div>
        </Section>

        {/* ── El versículo y su doble lectura ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "תַּרְגּוּם · آیه و خوانشِ دوگانه‌اش" : "תַּרְגּוּם · El versículo y su doble lectura"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? <>پس از هبوط، تورا می‌گوید که خدا برای آدم و همسرش{" "}
                  <span className="hebrew text-gold/90" dir="rtl">כָּתְנוֹת עוֹר</span>{" "}
                  —<span className="text-gold/90">کُتنوت عُر</span>، «جامه‌هایِ پوست»— ساخت و
                  آنان را پوشاند (پیدایش ۳:۲۱). متنِ هنجارین این واژه را با{" "}
                  <span className="text-gold/90">عَین (ע)</span> می‌نویسد: עוֹר = <span className="italic">پوست،
                  چرم</span>.</>
                : <>Tras la caída, la Torá dice que Dios hizo para Adam y su mujer{" "}
                  <span className="hebrew text-gold/90" dir="rtl">כָּתְנוֹת עוֹר</span>{" "}
                  —<span className="text-gold/90">kotnot ʿor</span>, «ropas de piel»— y los
                  vistió (Génesis 3:21). El texto normativo escribe esa palabra con{" "}
                  <span className="text-gold/90">áyin (ע)</span>: עוֹר = <span className="italic">piel,
                  cuero</span>.</>}
            </p>
            <p>
              {fa
                ? <>امّا خوانشی دوم هست، نگاه‌داشته در یک منبعِ کلاسیک، که همان واژه با{" "}
                  <span className="text-gold/90">الِف (א)</span> نوشته می‌شود:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">אוֹר</span> = <span className="italic">نور</span>.
                  <span className="hebrew text-gold/90" dir="rtl"> כָּתְנוֹת אוֹר</span> = «جامه‌هایِ نور».
                  تنها یک حرف، پوست را از نور جدا می‌کند. این محورِ تمامِ این راز است.</>
                : <>Pero existe una segunda lectura, conservada en una fuente clásica, donde la
                  misma palabra se escribe con <span className="text-gold/90">álef (א)</span>:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">אוֹר</span> = <span className="italic">luz</span>.
                  <span className="hebrew text-gold/90" dir="rtl"> כָּתְנוֹת אוֹר</span> = «ropas de LUZ».
                  Una sola letra separa la piel de la luz. Ese es el eje del misterio entero.</>}
            </p>
          </div>
        </Section>

        {/* ── Las dos ropas ── */}
        <Section>
          <h3 className="mb-6 mt-16 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "دو جامه" : "Las dos ropas"}
          </h3>
          <p className="mx-auto mb-8 max-w-md text-center text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? <>همان واژه، با یک حرف تفاوت. تنِ نوری که انسان پیش از هبوط داشت، و تنِ
                پوستی که روان پس از آن در آن پیچیده شد. نور ناپدید نشد: <span className="text-gold/80">جامه پوشید</span>.</>
              : <>La misma palabra, una letra de diferencia. El cuerpo de luz que el hombre
                tuvo antes de la falta, y el cuerpo de piel con que el alma quedó envuelta
                después. La luz no desapareció: quedó <span className="text-gold/80">vestida</span>.</>}
          </p>
        </Section>

        <div className="space-y-4">
          {LECTURAS.map((p, i) => (
            <Section key={p.he} delay={i * 60}>
              <div className="flex items-center gap-4 rounded-2xl border border-gold/15 p-5" dir={fa ? "rtl" : "ltr"}
                style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <span className="hebrew shrink-0 font-bold leading-none"
                  style={{ fontSize: "clamp(34px, 9vw, 50px)", color: dark ? "#fff6e0" : "#3a2a08",
                    textShadow: dark ? `0 0 16px ${p.color}` : "none" }}>
                  {p.he}
                </span>
                <div className="flex-1">
                  <p className="font-cinzel text-sm font-bold tracking-wide" style={{ color: p.color }}>
                    {fa ? p.nameFa : p.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85">{fa ? p.sentidoFa : p.sentido}</p>
                </div>
              </div>
            </Section>
          ))}
        </div>

        {/* ── Mefarshim: la Torá de Rabí Meir ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "מְפָרְשִׁים · تورایِ رَبّی مِئیر" : "מְפָרְשִׁים · La Torá de Rabí Meir"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? <>سرچشمهٔ این بازیِ واژگانی{" "}
                  <span className="text-gold/90">بِرِشیت رَبّا ۲۰:۱۲</span> است. میدراش می‌گوید
                  که در تورای شخصیِ رَبّی مِئیر، تَنّایِ سدهٔ دوم، نوشته یافتند{" "}
                  <span className="hebrew text-gold/90" dir="rtl">כָּתְנוֹת אוֹר</span> —«جامه‌هایِ
                  نور»، با الِف— و نه با عَین. می‌افزاید که آن جامه‌هایِ آدَم هاریشون «صاف چون ناخن و
                  زیبا چون مروارید» بودند.</>
                : <>La fuente del juego de palabras es{" "}
                  <span className="text-gold/90">Bereshit Rabbá 20:12</span>. El midrash dice
                  que en la Torá personal de Rabí Meir, el tana del siglo II, hallaron escrito{" "}
                  <span className="hebrew text-gold/90" dir="rtl">כָּתְנוֹת אוֹר</span> —«ropas de
                  luz», con álef— y no con áyin. Añade que esas vestiduras de Adam HaRishón eran
                  «lisas como una uña y bellas como perlas».</>}
            </p>
            <p className="text-parchment/70">
              {fa
                ? <><span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
                  صداقتِ متنی:
                </span>{" "}
                  متنِ مَسوری که در هر کنیسه حاکم است עוֹر (پوست) می‌گوید. خوانشِ
                  אוֹר (نور) نسخهٔ کانونیِ تورا <span className="text-gold/85">نیست</span>: گونه‌ای است
                  که سنّت آن را گرامی داشت، درست از آن رو که <span className="italic">اشاره</span>{" "}
                  می‌کند به آنچه از دست رفت. میدراش تورا را تصحیح نمی‌کند — درونِ حرف، یادِ تنِ
                  نور را می‌خوانَد. این <span className="text-gold/85">دِراش</span> است، نه پِشاط.</>
                : <><span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
                  Honestidad textual:
                </span>{" "}
                  el texto masorético que rige en toda sinagoga dice עוֹר (piel). La lectura
                  אוֹר (luz) <span className="text-gold/85">no</span> es la versión canónica de la
                  Torá: es una variante atesorada por la tradición justamente porque <span className="italic">insinúa</span>{" "}
                  lo que se perdió. El midrash no corrige la Torá — lee, dentro de la letra, la
                  memoria del cuerpo de luz. Esto es <span className="text-gold/85">drash</span>, no pshat.</>}
            </p>
          </div>
        </Section>

        <PullQuote
          he="בְּתוֹרָתוֹ שֶׁל רַבִּי מֵאִיר מָצְאוּ כָּתוּב כָּתְנוֹת אוֹר"
          es="En la Torá de Rabí Meir hallaron escrito «kotnot or» (ropas de luz)."
          fa="در تورایِ رَبّی مِئیر نوشته یافتند «کُتنوت اور» (جامه‌هایِ نور)."
          source="Midrash, Bereshit Rabbá 20:12"
          fa_active={fa}
        />

        {/* ── Rashi + la mutación luz → piel ── */}
        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? <><span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">رَش'י (پِشاط):</span>{" "}
                  وفادار به خوانشِ ساده، «جامه‌هایِ پوست» را پوشاکی مادّی شرح می‌دهد —
                  پناهی برای تنی که اکنون آسیب‌پذیر، میرا و در برابرِ سرما و شرم برهنه است. جامهٔ پوست{" "}
                  <span className="text-gold/90">پیامدِ</span> هبوط است: پیش‌تر انسان نیازی به پوشش
                  نداشت؛ اکنون دارد.</>
                : <><span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Rashi (pshat):</span>{" "}
                  fiel a la lectura llana, explica las «ropas de piel» como prendas físicas —
                  protección para un cuerpo que ahora es vulnerable, mortal, expuesto al frío y a
                  la vergüenza. La vestimenta de piel es <span className="text-gold/90">consecuencia</span>{" "}
                  de la caída: antes el hombre no necesitaba cubrirse; ahora sí.</>}
            </p>
            <p>
              {fa
                ? <><span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">گذارِ نور ← پوست (سود):</span>{" "}
                  برای کابالا، آیه دگرگونیی هستی‌شناختی را وصف می‌کند، نه تعویضِ جامه. پیش از
                  <span className="italic"> جِت</span> (خطا) انسان{" "}
                  <span className="text-gold/90">تنی از نور</span> داشت (<span className="italic">گوف
                  شِل اور</span>)؛ پس از خطا، روان در یک{" "}
                  <span className="text-gold/90">تنِ پوست</span> «پیچیده» شد (<span className="italic">گوف شِل
                  عُر</span>): چگال، میرا، کدِر. پوست نفیِ نور نیست — جامهٔ آن است. و جامه می‌تواند شفّاف شود.</>
                : <><span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">El paso luz → piel (sod):</span>{" "}
                  para la Cabalá, el versículo describe una mutación ontológica, no un cambio de
                  guardarropa. Antes del <span className="italic">jet</span> (la falta) el ser humano
                  tenía un <span className="text-gold/90">cuerpo de luz</span> (<span className="italic">guf
                  shel or</span>); tras la falta, el alma quedó «envuelta» en un{" "}
                  <span className="text-gold/90">cuerpo de piel</span> (<span className="italic">guf shel
                  ʿor</span>): denso, mortal, opaco. La piel no es la negación de la luz — es su{" "}
                  <span className="text-gold/90">ropa</span>. Y una ropa puede volverse transparente.</>}
            </p>
          </div>
        </Section>

        {/* ── Remez: la gematría ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "רֶמֶז · اشارهٔ حرف‌ها" : "רֶמֶז · La insinuación de las letras"}
          </h3>

          <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="אוֹר" sub={fa ? "نور · ۲۰۷ · الِف" : "Luz · 207 · álef"} color="#f0d060" />
            <span className="font-cinzel text-2xl text-gold/40">→</span>
            <HebrewTile he="עוֹר" sub={fa ? "پوست · ۲۷۶ · عَین" : "Piel · 276 · áyin"} color="#cf8c52" />
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? <>تنها تفاوتِ نور و پوست، تعویضِ{" "}
                  <span className="text-gold/90">الِف (א = ۱)</span> با{" "}
                  <span className="text-gold/90">عَین (ע = ۷۰)</span> است. الِف یگانگی است، دَمِ
                  خاموش، ریشهٔ نورِ پنهان. عَین در لغت یعنی{" "}
                  <span className="text-gold/90">«چشم»</span>: ادراکی که سطح‌ها را می‌بیند، که به
                  «نیک و بد» می‌نگرد، که از برهنگیِ خود آگاه می‌شود.</>
                : <>La única diferencia entre la luz y la piel es el cambio de{" "}
                  <span className="text-gold/90">álef (א = 1)</span> por{" "}
                  <span className="text-gold/90">áyin (ע = 70)</span>. El álef es la unidad, el
                  aliento silencioso, la raíz de la luz oculta. El áyin significa, literalmente,{" "}
                  <span className="text-gold/90">«ojo»</span>: la percepción que ve superficies, que
                  mira «lo bueno y lo malo», que se vuelve consciente de estar desnuda.</>}
            </p>
            <p>
              {fa
                ? <>خوردن از درختِ شناختِ نیک و بد، در کلیدِ رِمِز، تعویضِ{" "}
                  <span className="hebrew text-gold/90">א</span>ـیِ نور با{" "}
                  <span className="hebrew text-gold/90">ע</span>ـیِ چشمی بود که به ظاهرها داوری می‌کند.
                  هبوط لحظه‌ای است که انسان از <span className="italic">بودنِ</span> نور بازماند تا
                  به <span className="italic">نگریستنِ</span> جهان آغاز کند.{" "}
                  <span className="text-parchment/55">(گیماتریاها محاسبه و توسط سوفِر راستی‌آزمایی شده‌اند.)</span></>
                : <>Comer del Árbol del Conocimiento del bien y del mal fue, en clave de remez,
                  cambiar la <span className="hebrew text-gold/90">א</span> de la luz por el{" "}
                  <span className="hebrew text-gold/90">ע</span> del ojo que juzga apariencias. La
                  caída es el momento en que el hombre dejó de <span className="italic">ser</span> luz
                  para empezar a <span className="italic">mirar</span> el mundo.{" "}
                  <span className="text-parchment/55">(Gematrías calculadas y verificadas por el Sofer.)</span></>}
            </p>
          </div>
        </Section>

        {/* ── Drash + Sod: el descenso que tiene un lugar bueno ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "דְּרָשׁ · هبوط جایی دارد" : "דְּרָשׁ · El descenso tiene un lugar"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? <>وعظ به اندیشه‌ای ناخوشایند دل می‌زند: <span className="text-gold/90">تاریکی
                  کارکردی دارد</span>. دربارهٔ آیهٔ «و اینک، بسیار نیکو بود» (<span className="italic">طُوْو
                  مِئُد</span>، پیدایش ۱:۳۱)، میدراشِ بِرِشیت رَبّا ۹:۷ می‌گوید که «بسیار نیکو»{" "}
                  <span className="text-gold/90">یِتْصِر هاراع</span> است —گرایش به بدی— زیرا بی آن
                  نیرو «انسان نه خانه می‌ساخت، نه زن می‌گرفت، نه فرزند می‌آورد، نه داد‌و‌ستد می‌کرد».</>
                : <>El homilético se atreve a una idea incómoda: <span className="text-gold/90">lo oscuro
                  tiene una función</span>. Sobre el verso «y he aquí, era muy bueno» (<span className="italic">tov
                  meod</span>, Gén. 1:31), el midrash de Bereshit Rabbá 9:7 dice que «muy bueno» es el{" "}
                  <span className="text-gold/90">yétzer hará</span> —la inclinación al mal— porque sin
                  esa fuerza «el hombre no construiría casa, ni se casaría, ni engendraría, ni haría
                  comercio».</>}
            </p>
            <p>
              {fa
                ? <>نه از آن رو که بدی نیک باشد، بلکه از آن رو که <span className="text-gold/90">بی نیرویِ
                  هبوط، بی میل، بی اصطکاک، نه سازندگی هست، نه جهان، نه کارِ انسان</span>. اینجا، در منبعی
                  کلاسیک و راستی‌آزموده، بذرِ تمامِ اندیشه نهفته است: هبوط تنها کیفر نیست — موتورِ{" "}
                  <span className="italic">عَبودا</span> است. صدای{" "}
                  <span className="text-gold/90">بَعَل شِم طوو</span> اینجا درمی‌آمیزد: هر فرودی، فرازی
                  پنهان در خود دارد.</>
                : <>No porque el mal sea bueno, sino porque <span className="text-gold/90">sin una fuerza
                  de descenso, de deseo, de fricción, no hay construcción, no hay mundo, no hay trabajo
                  del hombre</span>. Aquí está, en fuente clásica y verificada, la semilla de toda la
                  idea: el descenso no es solo castigo — es el motor del <span className="italic">avodá</span>.
                  La voz del <span className="text-gold/90">Baal Shem Tov</span> se integra aquí: toda
                  bajada lleva escondida una subida.</>}
            </p>
          </div>
        </Section>

        {/* ── Sod: yeridá tzórej aliyá ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "סוֹד · هبوط برایِ فراز است" : "סוֹד · El descenso es para el ascenso"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? <>سطحِ رازورانه نامی فنی دارد:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">יְרִידָה צוֹרֶךְ עֲלִיָּה</span>{" "}
                  —<span className="text-gold/90">یِریدا تْصورِخ عَلیّا</span>، «هبوط برایِ فراز
                  است»—. این جمله‌ای پراکنده نیست: لفظاً در لیکوטِی תورا، شیر هَشیریم ۴:۲ (از اَلتِر
                  رِبِّهٔ خَبَّد) نوشته شده است.</>
                : <>El nivel místico tiene un nombre técnico:{" "}
                  <span className="hebrew text-gold/90" dir="rtl">יְרִידָה צוֹרֶךְ עֲלִיָּה</span>{" "}
                  —<span className="text-gold/90">yeridá tzórej aliyá</span>, «el descenso es para el
                  ascenso»—. No es una frase suelta: está escrita, literalmente, en Likkutei Torah,
                  Shir HaShirim 4:2 (del Alter Rebbe de Chabad).</>}
            </p>
            <p>
              {fa
                ? <>روان از تختِ نورانی به تنی از پوست فرود می‌آید{" "}
                  <span className="text-gold/90">تا بالاتر از آنچه پیش از فرود بود برآید</span>.
                  شمعی افروخته در اتاقی که خود روشن است نزدیک به ناپیداست؛ همان شمع در تاریکیِ تام،
                  همه‌چیز است. روان دقیقاً از آن رو به تاریکی فرود می‌آید که تنها از آنجا می‌تواند نوری
                  بیفروزد که در بالا ناممکن بود.</>
                : <>El alma baja del trono luminoso a un cuerpo de piel{" "}
                  <span className="text-gold/90">para subir más alto de lo que estaba antes de bajar</span>.
                  Una vela encendida en una habitación ya iluminada casi no se nota; la misma vela en
                  plena oscuridad lo es todo. El alma desciende a la oscuridad precisamente porque solo
                  desde ahí puede encender una luz que arriba era imposible.</>}
            </p>
          </div>
        </Section>

        <PullQuote
          he="וזהו ירידה צורך עליה ע״י תשובה לעלות לעלוי זה... דייקא בגלות וירידה בגוף גשמי"
          es="Y esto es: «el descenso es para el ascenso», mediante la teshuvá, para elevarse a esta elevación… precisamente en el exilio y en el descenso al cuerpo material."
          fa="و این است: «هبوط برایِ فراز است»، به‌واسطهٔ تِشووا، برای برآمدن به این فراز… دقیقاً در تبعید و در فرود به تنِ مادّی."
          source="Likkutei Torah, Shir HaShirim 4:2"
          fa_active={fa}
        />

        {/* ── Jashmal · El doble filo ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "חַשְׁמַל · لبهٔ دوگانه" : "חַשְׁמַל · El doble filo"}
          </h3>

          <div className="mb-8 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4" dir={fa ? "rtl" : "ltr"}>
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              {fa ? "دو خوانش — باید آن‌ها را تفکیک کرد تا دروغ نگوییم" : "Dos lecturas — hay que distinguirlas para no mentir"}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              {fa
                ? <>گیراندازِ «هرگز گناه نکردند» همچون تحریکی آغازین کار می‌کند. پاسخِ صادقانه
                  «گناه نکردند» نیست. پاسخ این است: <span className="text-gold/85">«گناه کردند — و با
                  این‌همه، خطایشان جایی در چیزی بزرگ‌تر از خودشان داشت.»</span></>
                : <>El gancho «nunca pecaron» funciona como provocación de entrada. La respuesta honesta
                  no es «no pecaron». La respuesta es: <span className="text-gold/85">«pecaron — y aun así,
                  su falta tenía un sitio en algo más grande que ellos.»</span></>}
            </p>
          </div>

          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? <><span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/60">
                  خوانشِ (الف) · پِشاط / کلاسیک:
                </span>{" "}
                  سنّتِ اکثریت روشن است: <span className="text-gold/90">آری، جِت بود</span>{" "}
                  —خطایی واقعی—. انسان نافرمانی کرد؛ پیامدی بود. امّا همان هبوط{" "}
                  <span className="text-gold/90">تیکون را ممکن ساخت</span>: کارِ بازآفرینی که هدفِ تمامِ
                  تاریخِ بشری است. بی عَدَنِ از دست رفته بازگشتی به عَدَن نیست؛ بی تبعید رهایی نیست؛ بی
                  هبوط چیزی برای فرازآوردن نیست. هبوط نقشه را باطل نمی‌کند:{" "}
                  <span className="text-gold/90">آن را به راه می‌اندازد</span>. این حقیقتِ مرکزیِ مطالعه است.</>
                : <><span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/60">
                  Lectura (a) · pshat / clásica:
                </span>{" "}
                  la tradición mayoritaria es clara: <span className="text-gold/90">sí fue un jet</span>{" "}
                  —una falta real—. El hombre desobedeció; hubo consecuencia. Pero esa misma caída{" "}
                  <span className="text-gold/90">habilitó el Tikún</span>: el trabajo de reparación que es
                  el propósito de toda la historia humana. Sin Edén perdido no hay regreso al Edén; sin
                  exilio no hay redención; sin descenso no hay nada que elevar. La caída no anula el plan:{" "}
                  <span className="text-gold/90">lo pone en marcha</span>. Esta es la verdad central del estudio.</>}
            </p>
            <p className="text-parchment/70">
              {fa
                ? <><span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
                  خوانشِ (ب) · رادیکالِ ایژبیتس — اقلّی و مناقشه‌برانگیز:
                </span>{" "}
                  <span className="text-gold/85">مِی هَشیلوآخ</span> (رَبّی مُردِخای یوسِف لاینِر از
                  ایژبیتس، سدهٔ نوزدهم)، دربارهٔ پیدایش ۲:۱۷ می‌خوانَد که «گناه جز به اندازهٔ فهمِ خودِ او
                  نبود، چون پوسته‌هایِ سیر، و نه بیش‌تر». از منظرِ عنایتِ نهایی، بزرگیِ «گناه» به پوسته‌ای
                  نازک فرومی‌کاهد.</>
                : <><span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
                  Lectura (b) · radical de Izhbitz — minoritaria y controvertida:
                </span>{" "}
                  el <span className="text-gold/85">Mei HaShiloach</span> (Rabí Mordejai Yosef Leiner de
                  Izhbitz, s. XIX) lee, sobre Gén. 2:17, que «el pecado no fue sino según su propio
                  entendimiento, como las cáscaras del ajo, y no más». Vista desde la Providencia última,
                  la magnitud del «pecado» se reduce a una cáscara fina.</>}
            </p>
          </div>

          <div className="mt-6 rounded-xl border border-gold/15 bg-black/20 px-5 py-4" dir={fa ? "rtl" : "ltr"}>
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              {fa ? "هشدارِ سوفِر، بی پرده" : "Advertencia del Sofer, sin rodeos"}
            </p>
            <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-parchment/70">
              {fa
                ? <>
                  <li>
                    · ایژبیتس خوانشی <span className="text-gold/85">اقلّی، رازورانه و
                    مناقشه‌برانگیز</span> است. بسیاری از مراجع آن را با احتیاط خواندند.
                  </li>
                  <li>
                    · <span className="text-gold/85">هَلاخا نیست. دیدگاهِ هنجارینِ یهودیت
                    نیست.</span> یهودیتِ اکثریت با نیرو اختیارِ آزاد و مسئولیت در برابرِ گناه را تأیید می‌کند.
                  </li>
                  <li>
                    · آن را چنان‌که هست عرضه می‌کنیم: نگاهی <span className="italic">سود</span>یِ
                    افراطی که زاویه‌ای از راز را می‌تابانَد بی آن‌که خوانشِ کلاسیک را باطل کند.
                  </li>
                </>
                : <>
                  <li>
                    · Izhbitz es una lectura <span className="text-gold/85">minoritaria, mística y
                    controvertida</span>. Muchas autoridades la leyeron con cautela.
                  </li>
                  <li>
                    · <span className="text-gold/85">NO es halajá. NO es la visión normativa del
                    judaísmo.</span> El judaísmo mayoritario afirma con fuerza el libre albedrío y la
                    responsabilidad por el pecado.
                  </li>
                  <li>
                    · La presentamos como lo que es: una mirada <span className="italic">sod</span>{" "}
                    extrema, que ilumina un ángulo del misterio sin cancelar la lectura clásica.
                  </li>
                </>}
            </ul>
          </div>

          <p className="mt-6 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? <>لبهٔ دوگانه: پِشاط می‌گوید «گناه کردند»؛ ایژبیتس می‌گوید «خطایشان پوسته‌ای درونِ
                نقشهٔ خدا بود». حقیقتِ خَشمَل در <span className="text-gold/90">تنش</span>{" "}
                میانِ این دو زندگی می‌کند، نه در نفیِ هیچ‌یک.</>
              : <>El doble filo: el pshat dice «pecaron»; Izhbitz dice «su falta era una cáscara dentro del
                plan de Dios». La verdad de Jashmal vive en la <span className="text-gold/90">tensión</span>{" "}
                entre los dos, no en negar ninguno.</>}
          </p>
        </Section>

        {/* ── Sod luriano: las chispas y el Tikún ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "סוֹד · جرقّه‌ها و تیکونِ لوریانی" : "סוֹד · Las chispas y el Tikún luriano"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? <>برای دریافتنِ چراییِ لزومِ هبوط، باید به سطحِ کیهانی فرود آمد. پیش از انسان، فاجعه‌ای
                  رخ داد: نورِ بی‌کران برای ظرف‌ها (<span className="italic">کِلیم</span>) که می‌بایست آن
                  را در بر گیرند بسیار تند بود، و آن‌ها{" "}
                  <span className="text-gold/90">شکستند</span>. این{" "}
                  <span className="hebrew text-gold/90" dir="rtl">שַׁעַר שְׁבִירַת הַכֵּלִים</span> است —
                  دروازهٔ شکستنِ ظرف‌ها، دروازهٔ ۹ از عِتص حَییمِ آریزال (سِفِر عِتص حَییم ۹:۱)، همان که سایت
                  پیش‌تر در{" "}
                  <Link href="/mente-cosmica" className="text-gold underline-offset-2 hover:underline">/ذهن-کیهانی</Link> نقشه می‌کند.</>
                : <>Para entender por qué la caída es necesaria, hay que bajar al nivel cósmico. Antes del
                  hombre hubo un cataclismo: la luz infinita era demasiado intensa para los recipientes
                  (<span className="italic">kelim</span>) que debían contenerla, y estos se{" "}
                  <span className="text-gold/90">rompieron</span>. Es el{" "}
                  <span className="hebrew text-gold/90" dir="rtl">שַׁעַר שְׁבִירַת הַכֵּלִים</span> —el
                  Portal de la Ruptura de los Recipientes, el Portal 9 del Etz Chaim del Arizal (Sefer
                  Etz Chaim 9:1), el mismo que el sitio ya mapea en{" "}
                  <Link href="/mente-cosmica" className="text-gold underline-offset-2 hover:underline">/mente-cósmica</Link>.</>}
            </p>
            <p>
              {fa
                ? <>با شکستنِ ظرف‌ها، <span className="text-gold/90">جرقّه‌هایِ نورِ ایزدی
                  (نیتْصوتْصوت) فروافتادند</span> و در{" "}
                  <span className="italic">کِلیپوت</span> —پوسته‌ها، مادّه و تاریکی— گرفتار شدند. نورِ
                  مقدّس پراکنده، اسیر و پنهان در پست‌ترین جایِ هستی ماند.</>
                : <>Al romperse los recipientes, <span className="text-gold/90">chispas de luz divina
                  (nitzotzot) cayeron</span> y quedaron atrapadas en las{" "}
                  <span className="italic">kelipot</span> —las cáscaras, lo material y lo oscuro—. La luz
                  santa quedó dispersa, prisionera, escondida en lo más bajo de la existencia.</>}
            </p>
            <p>
              {fa
                ? <>هدفِ تمامِ تاریخ، <span className="text-gold/90">بیرور</span> است: برکشیدنِ آن جرقّه‌ها و
                  بازگرداندنشان به ریشه. این کار را که می‌کند؟{" "}
                  <span className="text-gold/90">انسان</span> — به‌واسطهٔ میتْصووت‌ها، نیّت
                  (<span className="italic">کَوّانا</span>) و عملِ به‌کارگیریِ مادّه برای غایتی مقدّس. هر بار
                  که کسی چیزی از این جهان را برمی‌گیرد و آن را به‌سویِ مقدّس می‌گردانَد،{" "}
                  <span className="text-gold/90">جرقّه‌ای فروافتاده را برمی‌کشد</span>. این است تیکون.</>
                : <>El propósito de toda la historia es el <span className="text-gold/90">birur</span>:
                  extraer esas chispas y devolverlas a su raíz. ¿Quién hace ese trabajo?{" "}
                  <span className="text-gold/90">El hombre</span> — mediante las mitzvot, la intención
                  (<span className="italic">kavaná</span>) y el acto de usar lo material para un fin
                  santo. Cada vez que alguien toma algo de este mundo y lo dirige a lo sagrado,{" "}
                  <span className="text-gold/90">eleva una chispa caída</span>. Eso es el Tikún.</>}
            </p>
            <p>
              {fa
                ? <>اینجا دایره بسته می‌شود: جرقّه‌ها در شکستن فروافتادند؛ انسان آن‌ها را با کارِ خود در
                  تبعید برمی‌کشد؛ و هبوطِ آدم —که او را به تنِ پوست، به مادّه کشاند— درست همان است که{" "}
                  <span className="text-gold/90">انسان را در جایی می‌نشانَد که جرقّه‌ها هستند</span>. از تختی
                  در آسمان نمی‌توان جرقّه‌ها را از زمین برچید. باید فرود آمد.</>
                : <>Aquí se cierra el círculo: las chispas cayeron en la Ruptura; el hombre las eleva con su
                  trabajo en el exilio; y la caída de Adán —que lo arrastró al cuerpo de piel, a lo
                  material— es precisamente lo que <span className="text-gold/90">pone al hombre en el sitio
                  donde están las chispas</span>. No se pueden recoger chispas del suelo desde un trono en
                  el cielo. Hay que bajar.</>}
            </p>
          </div>
        </Section>

        <PullQuote
          he="...תְּלוּיָה בְּמַעֲשֵׂינוּ וַעֲבוֹדָתֵנוּ כָּל זְמַן מֶשֶׁךְ הַגָּלוּת"
          es="…la revelación de la Luz del Ein Sof en este mundo material depende de nuestras acciones y nuestro trabajo (avodá) durante todo el tiempo del exilio."
          fa="…آشکارشدنِ نورِ اِین سوف در این جهانِ مادّی، در تمامِ مدّتِ تبعید، به اعمال و کارِ ما (عَبودا) بسته است."
          source="Tania, Likutei Amarim 37"
          fa_active={fa}
        />

        {/* ── PaRDeS ── */}
        <Section>
          <h3 className="mb-6 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "פרד״ס · چهار خوانش" : "פרד״ס · Las cuatro lecturas"}
          </h3>
          <div className="space-y-4">
            {[
              {
                he: "פְּשָׁט", name: "Pshat",
                txt: "Génesis 3 narra una transgresión real: Dios prohíbe el fruto (Gén. 2:17), el hombre y la mujer comen (Gén. 3:6), y hay consecuencia: expulsión, mortalidad, trabajo, y las ropas de piel como signo de la nueva condición. En el pshat hubo pecado. No lo disimulamos.",
                txtFa: "پیدایش ۳ تخطّیی واقعی را روایت می‌کند: خدا میوه را نهی می‌کند (پیدایش ۲:۱۷)، مرد و زن می‌خورند (پیدایش ۳:۶)، و پیامدی هست: راندگی، میرایی، کار، و جامه‌هایِ پوست همچون نشانهٔ وضعِ تازه. در پِشاط گناهی بود. آن را پنهان نمی‌کنیم.",
              },
              {
                he: "רֶמֶז", name: "Remez",
                txt: "Una sola letra: אוֹר (luz, 207, con álef) frente a עוֹר (piel, 276, con áyin). Cambiar la álef de la luz por el áyin del «ojo» que juzga apariencias es dejar de ser luz para empezar a mirar el mundo.",
                txtFa: "تنها یک حرف: אוֹר (نور، ۲۰۷، با الِف) در برابرِ עוֹר (پوست، ۲۷۶، با عَین). تعویضِ الِفِ نور با عَینِ «چشمی» که به ظاهرها داوری می‌کند، بازماندن از بودنِ نور است برای آغازِ نگریستن به جهان.",
              },
              {
                he: "דְּרָשׁ", name: "Drash",
                txt: "Lo oscuro tiene una función: el yétzer hará es «muy bueno» (Bereshit Rabbá 9:7), porque sin la fuerza de descenso el hombre no construye nada. El Baal Shem Tov: toda bajada lleva escondida una subida.",
                txtFa: "تاریکی کارکردی دارد: یِتْصِر هاراع «بسیار نیکو» است (بِرِشیت رَبّا ۹:۷)، زیرا بی نیرویِ هبوط انسان هیچ نمی‌سازد. بَعَل شِم طوو: هر فرودی فرازی پنهان در خود دارد.",
              },
              {
                he: "סוֹד", name: "Sod",
                txt: "Yeridá tzórej aliyá: el descenso es para el ascenso (Likkutei Torah, Shir HaShirim 4:2). El alma baja al cuerpo de piel para encender una luz imposible arriba — reflejo, en pequeño, de la Ruptura de los Recipientes y del birur de las chispas.",
                txtFa: "یِریدا تْصورِخ عَلیّا: هبوط برایِ فراز است (لیکوטِی תورا، شیر هَشیریم ۴:۲). روان به تنِ پوست فرود می‌آید تا نوری بیفروزد که در بالا ناممکن است — بازتابی، در مقیاسِ خُرد، از شکستنِ ظرف‌ها و بیرورِ جرقّه‌ها.",
              },
            ].map((r) => (
              <div key={r.name} className="flex items-start gap-4 rounded-2xl border border-gold/15 p-5" dir={fa ? "rtl" : "ltr"}
                style={{ background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                <span className="hebrew shrink-0 text-2xl font-bold text-gold/80" dir="rtl"
                  style={{ textShadow: "0 0 12px #c9a43e66" }}>
                  {r.he}
                </span>
                <div className="flex-1">
                  <p className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold/70">
                    {r.name}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85">{fa ? r.txtFa : r.txt}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Hitbonenut ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "הִתְבּוֹנְנוּת · تأمّل" : "הִתְבּוֹנְנוּת · Contemplación"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? <>بر تصویری درنگ کن: روان زمانی <span className="text-gold/90">جامهٔ نور</span> داشت، و
                  اکنون <span className="text-gold/90">جامهٔ پوست</span> بر تن دارد. همان روان. نور گم
                  نشد — جامه پوشید. زیرِ آن است، چشم‌به‌راه.</>
                : <>Detente en una imagen: el alma tuvo una vez <span className="text-gold/90">ropa de
                  luz</span>, y ahora lleva <span className="text-gold/90">ropa de piel</span>. La misma
                  alma. La luz no se perdió — se vistió. Está debajo, esperando.</>}
            </p>
            <p>
              {fa
                ? <>چند بار هبوطِ خودم را —خطاهایم، فرودهایم— تنها چون{" "}
                  <span className="italic">پوست</span> خوانده‌ام: شرم، شکست، کیفر؟ و اگر زیرِ آن پوست
                  نوری باشد که تنها از همان پایین می‌توان افروخت؟ میدراش می‌گوید نیرویِ تاریک «بسیار نیکو»
                  است زیرا بی آن انسان هیچ نمی‌سازد. من چه ساخته‌ام دقیقاً <span className="italic">به‌سببِ</span>{" "}
                  آن‌که ناچار شدم بجنگم، فرود آیم، خطا کنم و دوباره برآیم؟</>
                : <>¿Cuántas veces he leído mi propia caída —mis errores, mis descensos— solo como{" "}
                  <span className="italic">piel</span>: vergüenza, fracaso, castigo? ¿Y si debajo de esa
                  piel hubiera una luz que solo desde ahí abajo se puede encender? El midrash dice que la
                  fuerza oscura es «muy buena» porque sin ella el hombre no construye nada. ¿Qué he
                  construido yo precisamente <span className="italic">por</span> haber tenido que luchar,
                  bajar, equivocarme y volver a subir?</>}
            </p>
            <p>
              {fa
                ? <>این الگو در هر مقیاس تکرار می‌شود: کیهان فرومی‌افتد (شکستن)، روان فرومی‌افتد (به تن)،
                  انسان فرومی‌افتد (عَدَن). و در هر سه، هبوط پایانِ داستان نیست —{" "}
                  <span className="text-gold/90">آغازِ کار</span> است.</>
                : <>El patrón se repite en todas las escalas: el cosmos cae (Ruptura), el alma cae (al
                  cuerpo), el hombre cae (Edén). Y en las tres, la caída no es el final de la historia —
                  es el <span className="text-gold/90">comienzo del trabajo</span>.</>}
            </p>
          </div>
        </Section>

        {/* ── Maasé ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "מַעֲשֶׂה · کنش" : "מַעֲשֶׂה · Acción"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? <><span className="text-gold/90">امروز، آگاهانه یک جرقّه را برکش.</span> یکی از کنش‌هایِ
                  مادّیِ روزت را برگیر —خوردن، کار، خرج‌کردن، آسودن، یک گفتگو— و درست پیش از انجامش، در ذهنت
                  بگو: <span className="italic">«این را برای برکشیدنِ جرقّه‌ای که اینجاست انجام می‌دهم.»</span>{" "}
                  عملی عادی را به عملِ <span className="italic">بیرور</span> بدل کن. این، در مقیاسی خُرد،
                  تمامِ عَبودایِ انسان است: نه گریز از مادّه، بلکه <span className="text-gold/90">فرود به آن
                  برای برکشیدنش</span>.</>
                : <><span className="text-gold/90">Eleva una chispa, hoy, conscientemente.</span> Toma una
                  acción material de tu día —comer, trabajar, gastar dinero, descansar, una conversación—
                  y, justo antes de hacerla, di en tu mente: <span className="italic">«Esto lo hago para
                  elevar la chispa que hay aquí.»</span> Convierte un acto ordinario en un acto de{" "}
                  <span className="italic">birur</span>. Esa es, en miniatura, toda la avodá del hombre:
                  no huir de lo material, sino <span className="text-gold/90">bajar a ello para elevarlo</span>.</>}
            </p>
            <p>
              {fa
                ? <>و یک <span className="italic">میدا</span> برای این هفته:{" "}
                  <span className="text-gold/90">بازخوانیِ یک هبوطِ خودی</span>. خطایی تازه را برگزین و
                  به‌جایِ ماندن در پوست (احساسِ گناه)، آگاهانه نوری را بجوی که آن هبوط به تو امکانِ افروختنش
                  داد. نه برای توجیهِ خطا —خطا واقعی است— بلکه برای به‌کار گرفتنش به سودِ فرازِ خودت.</>
                : <>Y una <span className="italic">midá</span> para esta semana:{" "}
                  <span className="text-gold/90">reinterpretar un descenso propio</span>. Elige un error
                  reciente y, en vez de quedarte en la piel (la culpa), busca deliberadamente la luz que ese
                  descenso te permitió encender. No para justificar la falta —la falta es real— sino para
                  ponerla a trabajar a favor de tu ascenso.</>}
            </p>
          </div>
        </Section>

        {/* ── Jatimá · El sello ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center" dir={fa ? "rtl" : "ltr"}>
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              חֲתִימָה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "پوستی که به یاد دارد نور بود" : "La piel que recuerda que fue luz"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              {fa
                ? <>تنها یک حرف، «جامه‌هایِ نور» (אוֹר، الِف) را از «جامه‌هایِ پوست» (עוֹר، عَین) جدا
                  می‌کند. هبوط، نور را به پوست پوشاند — اما آن را خاموش نکرد. هبوط شکستِ نقشه نیست:{" "}
                  <span className="text-parchment/80">خودِ نقشه است</span>. نمی‌گوییم آدم و حوّا گناه
                  نکردند. می‌گوییم خطایشان —واقعی، با پیامدهایِ واقعی— جایی در چیزی بی‌نهایت بزرگ‌تر داشت.
                  تبعید برایِ رهایی است. هبوط برایِ تیکون است.</>
                : <>Una sola letra separa las «ropas de luz» (אוֹר, álef) de las «ropas de piel» (עוֹר,
                  áyin). La caída vistió a la luz con piel — pero no la apagó. El descenso no es el fracaso
                  del plan: <span className="text-parchment/80">es el plan</span>. No decimos que Adán y Eva
                  no pecaron. Decimos que su falta —real, con consecuencias reales— tenía un lugar en algo
                  infinitamente más grande. El exilio es para la redención. La caída es para el Tikún.</>}
            </p>

            {/* Sello de la serie: נחש = 358 = משיח */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <HebrewTile he="נָחָשׁ" sub={fa ? "مار · ۳۵۸" : "Serpiente · 358"} color="#b06a3c" />
              <span className="font-cinzel text-2xl text-gold/40">=</span>
              <HebrewTile he="מָשִׁיחַ" sub={fa ? "ماشیح · ۳۵۸" : "Mashíaj · 358"} color="#c9a43e" />
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              {fa
                ? <>همان نیرویی که، مهارناشده، مارِ عَدَن بود، —رستگار و برکشیده به‌دستِ کارِ انسان— نیرویِ
                  ماشیح است. پوستِ مار، به‌واسطهٔ عَبودا، دوباره جامهٔ نور می‌شود.</>
                : <>La misma fuerza que, descontrolada, fue la serpiente del Edén, es —rectificada, elevada
                  por el trabajo del hombre— la fuerza del Mashíaj. La piel de serpiente, por el avodá,
                  vuelve a ser ropa de luz.</>}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "Ropas de piel · Génesis 3:21", labelFa: "جامه‌هایِ پوست · پیدایش ۳:۲۱", ref: "Genesis 3:21" },
                { label: "Ropas de luz · Bereshit Rabbá 20:12", labelFa: "جامه‌هایِ نور · بِرِشیت رَبّا ۲۰:۱۲", ref: "Bereshit Rabbah 20:12" },
                { label: "El yétzer «muy bueno» · Bereshit Rabbá 9:7", labelFa: "یِتْصِر «بسیار نیکو» · بِرِشیت رَبّا ۹:۷", ref: "Bereshit Rabbah 9:7" },
                { label: "Yeridá tzórej aliyá · Likkutei Torah", labelFa: "یِریدا تْصورِخ عَلیّا · لیکوטِی תورا", ref: "Likutei Torah, Shir HaShirim 4:2" },
                { label: "La avodá del exilio · Tania 37", labelFa: "عَبودایِ تبعید · تانیا ۳۷", ref: "Tanya, Part One; Likkutei Amarim 37" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {fa ? t.labelFa : t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 3:21")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "این راز را در خَشمَل مطالعه کن →" : "Estudiar este misterio en Jashmal →"}
            </button>

            {/* Hemshej — umbral «Sigue el hilo» (puentes hacia otros estudios) */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/358" className="hover:text-gold">{fa ? "نَحَش = ماشیح = ۳۵۸ →" : "Najash = Mashíaj = 358 →"}</Link>
              <Link href="/misterio/serpiente-de-cobre" className="hover:text-gold">{fa ? "مارِ مسین →" : "La serpiente de cobre →"}</Link>
              <Link href="/misterio/linaje" className="hover:text-gold">{fa ? "تبارِ ممنوعِ ماشیح →" : "El linaje prohibido del Mashíaj →"}</Link>
            </div>
          </div>
        </Section>

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
