"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

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

function Tile({ he, sub, color, size = 56 }: { he: string; sub: string; color: string; size?: number }) {
  return (
    <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
      style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}>
      <span className="hebrew font-bold leading-none"
        style={{ fontSize: `${size}px`, color: "#fff6e0", textShadow: `0 0 20px ${color}, 0 0 7px ${color}` }}>{he}</span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

function PullQuoteLite({ es, fa, source, fa_active }: { es: string; fa: string; source: string; fa_active: boolean }) {
  return (
    <Section>
      <div className="my-9 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6 text-center">
        <p className="text-lg italic leading-relaxed text-parchment/90" dir={fa_active ? "rtl" : "ltr"}>
          {fa_active ? `«${fa}»` : `«${es}»`}
        </p>
        <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-gold/50">— {source}</p>
      </div>
    </Section>
  );
}

// Fila del mapeo: overtono → letra del Nombre → Mundo / sefirá.
function OvertoneRow({ frac, interval, letter, world, color, fa }:
  { frac: string; interval: string; letter: string; world: string; color: string; fa: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border px-4 py-3"
      style={{ borderColor: `${color}55`, background: "rgba(14,12,22,0.6)" }}>
      <span className="font-cinzel text-lg font-bold tabular-nums" style={{ color, minWidth: 42 }}>{frac}</span>
      <span className="hebrew text-3xl leading-none" style={{ color: "#fff6e0", textShadow: `0 0 12px ${color}`, minWidth: 34, textAlign: "center" }}>{letter}</span>
      <span className="flex-1 text-xs leading-snug text-parchment/80" dir={fa ? "rtl" : "ltr"}>
        <span style={{ color }}>{interval}</span> · {world}
      </span>
    </div>
  );
}

export default function PageMusicaDeLaCreacion() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#e8b84a";       // ámbar: el canto, la música
  const S = "#6d7bf0";       // azul-violeta: la cuerda / la física
  const E = "#5ad1a0";       // verde: la naturaleza / Elokim

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* NAV */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/misterios" className="font-cinzel text-sm text-gold/70 hover:text-gold">← {fa ? "اسرار" : "Misterios"}</Link>
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

        {/* HERO — la serie armónica 1 + ½ + ⅓ + ¼ + ⅕ = 137/60 */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۱۵" : "Rav Ginsburgh · 137, cap. 15"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 font-cinzel text-2xl text-gold/70 sm:text-3xl">
            <span>1</span><span className="text-gold/30">+</span>
            <span>½</span><span className="text-gold/30">+</span>
            <span>⅓</span><span className="text-gold/30">+</span>
            <span>¼</span><span className="text-gold/30">+</span>
            <span>⅕</span>
          </div>
          <span className="mt-5 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(72px, 22vw, 148px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            137<span style={{ color: "#c9a43e" }}>/</span>60
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "موسیقیِ آفرینش" : "La música de la creación"}
          </h2>
          <p className="mt-3 text-sm text-muted">
            {fa ? "پنجمین عددِ هماهنگ — نوری که در یک تار پنهان است" : "El quinto número armónico — la luz escondida en una cuerda"}
          </p>
        </div>

        {/* SECCIÓN 1 — Una cuerda, muchos sonidos */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "یک تار، صداهایِ بسیار" : "Una cuerda, muchos sonidos"}
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "وقتی یک تارِ ویولن را می‌نوازی، گمان می‌کنی یک نوا می‌شنوی. اما آن تار همزمان نه‌تنها در تمامِ درازای خود می‌لرزد (نوایِ بنیادین)، بلکه در نیم، ثلث، ربع و خمسِ خود نیز — و هر بخش، صدایی بلندتر می‌سازد که رویِ نوایِ اصلی سوار می‌شود. به این صداهایِ همزمان «هماهنگ‌ها» یا «اورتون‌ها» می‌گویند. آنچه یک ساز را از دیگری بازمی‌شناسانَد، همین اورتون‌هاست، نه خودِ نتِ اصلی."
                : "Cuando pulsas la cuerda de un violín, crees oír un solo sonido. Pero esa cuerda vibra a la vez no solo en toda su longitud (el tono fundamental), sino también en su mitad, su tercio, su cuarto y su quinto —y cada trozo produce un sonido más agudo que se monta sobre el principal. A esos sonidos simultáneos se les llama «armónicos» u «overtones». Lo que te permite distinguir un violín de una flauta tocando la misma nota son justamente esos armónicos, no la nota en sí."}
            </p>
            <p>
              {fa
                ? "این هماهنگ‌ها یک رشتهٔ ریاضی می‌سازند: ۱ + ۱/۲ + ۱/۳ + ۱/۴ + ۱/۵ … به آن «سریِ هماهنگ» می‌گویند. اگر پنج جملهٔ نخست را جمع کنی و رویِ یک مخرجِ مشترک بیاوری، شگفتی رخ می‌دهد: ۶۰/۶۰ + ۳۰/۶۰ + ۲۰/۶۰ + ۱۵/۶۰ + ۱۲/۶۰ = ۱۳۷/۶۰. پنجمین عددِ هماهنگ دقیقاً ۱۳۷/۶۰ است — همان عددی که بر نور و ماده حکم می‌راند."
                : "Esos armónicos forman una serie matemática: 1 + ½ + ⅓ + ¼ + ⅕ … se le llama «serie armónica». Si sumas los cinco primeros términos y los llevas a un denominador común, aparece el asombro: 60/60 + 30/60 + 20/60 + 15/60 + 12/60 = 137/60. El quinto número armónico es exactamente 137/60 —el mismo número que gobierna la luz y la materia."}
            </p>
          </div>
        </Section>

        <PullQuoteLite
          es="Cada nota que oyes esconde una escalera de sonidos que no oyes."
          fa="هر نتی که می‌شنوی، نردبانی از صداهایی را پنهان می‌کند که نمی‌شنوی."
          source={fa ? "سریِ هماهنگ" : "La serie armónica"}
          fa_active={fa} />

        {/* SECCIÓN 2 — 137/60: Cabalá sobre halajá */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "۱۳۷/۶۰ — کابالا بر هلاخا" : "137/60 — Cabalá sobre halajá"}
          </h3>
          <div className="mb-6 flex flex-wrap items-end justify-center gap-2.5">
            <Tile he="קַבָּלָה" sub="137" color={C} size={30} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 20 }}>/</span>
            <Tile he="הֲלָכָה" sub="60" color={E} size={30} />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "«کابالا» (קַבָּלָה) برابرِ ۱۳۷ است. و «هلاخا» (הֲלָכָה، شریعتِ عملیِ یهود) دقیقاً برابرِ ۶۰. پس پنجمین عددِ هماهنگ — ۱۳۷/۶۰ — همان کابالا بر هلاخاست: پیوندِ دو رویِ تورات."
                : "«Cabalá» (קַבָּלָה) vale 137. Y «halajá» (הֲלָכָה, la ley práctica judía) vale exactamente 60. Así que el quinto número armónico —137/60— es literalmente Cabalá sobre halajá: la unión de las dos caras de la Torá."}
            </p>
            <p>
              {fa
                ? "و اینجا زیبایی ریاضی است: رشته‌های همانند به یک عددِ محدود همگرا می‌شوند، اما سریِ هماهنگ — برخلافِ انتظار — به بی‌نهایت واگرا می‌شود. کابالا نیز چنین است: بُعدِ پنهانِ تورات، بی‌کران و بی‌مرز؛ حال آنکه هلاخا، رویِ آشکار، محدود و مشخص است. کسرِ ۱۳۷/۶۰ هر دو را در یک نقطه به هم می‌بندد — بی‌نهایت و محدود، با هم."
                : "Y aquí está la belleza matemática: series parecidas convergen a un número finito, pero la serie armónica —contra toda intuición— diverge al infinito. Así es la Cabalá: la cara oculta de la Torá, infinita y sin borde; mientras que la halajá, la cara revelada, es finita y precisa. La fracción 137/60 ata ambas en un solo punto —lo infinito y lo finito, a la vez."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — Las cuatro letras del Nombre en los armónicos */}
        <Section>
          <h3 className="mb-2 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "چهار حرفِ نام در اورتون‌ها" : "Las cuatro letras del Nombre en los armónicos"}
          </h3>
          <p className="mb-6 text-center text-xs text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "تونِ بنیادین = اِلوهیم (طبیعت)؛ اورتون‌هایش = چهار حرفِ نامِ یهوه در چهار جهان"
              : "El tono fundamental = Elokim (la naturaleza); sus armónicos = las cuatro letras del Nombre יהוה en los cuatro Mundos"}
          </p>
          <div className="space-y-2.5">
            <OvertoneRow frac="⅕" letter="י" color={S} fa={fa}
              interval={fa ? "ثلثِ بزرگ" : "tercera mayor"}
              world={fa ? "اَتسیلوت · حکمت (خوخما)" : "Atzilut · sabiduría (Jojmá)"} />
            <OvertoneRow frac="¼" letter="ה" color={S} fa={fa}
              interval={fa ? "چهارمِ بزرگ" : "cuarta mayor"}
              world={fa ? "بریئا · فهم (بینا)" : "Beriá · entendimiento (Biná)"} />
            <OvertoneRow frac="⅓" letter="ו" color={S} fa={fa}
              interval={fa ? "پنجمِ بزرگ" : "quinta mayor"}
              world={fa ? "یِتسیرا · زیبایی (تیفئرت)" : "Yetzirá · belleza (Tiféret)"} />
            <OvertoneRow frac="½" letter="ה" color={S} fa={fa}
              interval={fa ? "اکتاوِ نخست" : "primera octava"}
              world={fa ? "عَسیّا · ملکوت (مَلخوت)" : "Asiyá · reino (Maljut)"} />
            <div className="flex items-center gap-3 rounded-xl border-2 px-4 py-3"
              style={{ borderColor: `${E}88`, background: `${E}12` }}>
              <span className="font-cinzel text-lg font-bold" style={{ color: E, minWidth: 42 }}>1</span>
              <span className="hebrew text-2xl leading-none" style={{ color: "#fff6e0", textShadow: `0 0 12px ${E}`, minWidth: 34, textAlign: "center" }}>אֱלֹהִים</span>
              <span className="flex-1 text-xs leading-snug text-parchment/85" dir={fa ? "rtl" : "ltr"}>
                <span style={{ color: E }}>{fa ? "تونِ بنیادین" : "tono fundamental"}</span> · {fa ? "طبیعت = ۸۶" : "naturaleza = 86"}
              </span>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "کهن‌ترین متنِ کابالا، سِفِر یِتسیرا، آفرینش را در چهار «جهانِ» فرودآینده می‌بیند که با چهار حرفِ نامِ خدا (יהוה) متناظرند. راو گینزبورگ نشان می‌دهد که همین چهار جهان دقیقاً بر چهار اورتونِ نخست منطبق‌اند. و تونِ بنیادین — نتِ پایه‌ای که همه رویش سوارند — همان «اِلوهیم» (אֱלֹהִים) است: نامی که برابرِ ۸۶ است، درست مانندِ «هَطِبَع» (הַטֶּבַע، طبیعت). اِلوهیم خدایِ نهفته در قوانینِ طبیعت است، صدایِ پایه‌ای که در سراسرِ آفرینش طنین می‌اندازد."
                : "El texto más antiguo de la Cabalá, el Séfer Yetzirá, ve la creación como cuatro «Mundos» que descienden y corresponden a las cuatro letras del Nombre de Dios (יהוה). Rav Ginsburgh muestra que esos cuatro Mundos calzan exactamente sobre los cuatro primeros armónicos. Y el tono fundamental —la nota base sobre la que todos se montan— es «Elokim» (אֱלֹהִים): el Nombre que vale 86, igual que «ha-téva» (הַטֶּבַע, la naturaleza). Elokim es el Dios escondido en las leyes de la naturaleza, el sonido de base que resuena por toda la creación."}
            </p>
            <p>
              {fa
                ? "پس آنچه گوش می‌شنود، «تصویرِ اِلوهیم» است: نتِ طبیعت با اورتون‌هایش. و هرکس گوشِ آموزش‌دیده داشته باشد، می‌تواند در همین جهان، اورتون‌های نامِ یهوه را بشنود — پروردگارِ نهفته در پسِ پردهٔ طبیعت."
                : "De modo que lo que oye el oído es «la imagen de Elokim»: la nota de la naturaleza con sus armónicos. Y quien tenga el oído entrenado puede oír, ya en este mundo, los armónicos del Nombre יהוה —la Providencia escondida detrás del velo de la naturaleza."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 4 — El universo es una cuerda que vibra */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.05] to-transparent p-8">
            <p className="hebrew mb-4 text-center text-xl text-gold/70" style={{ textShadow: dark ? "0 0 10px #c9a43e44" : "none" }}>
              שִׁיר חָדָשׁ
            </p>
            <h3 className="mb-5 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
              {fa ? "جهان، تاری است که می‌لرزد" : "El universo es una cuerda que vibra"}
            </h3>
            <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              <p>
                {fa
                  ? "قرن‌ها بعد، فیزیک به همین نتیجه رسید. نظریهٔ ریسمان می‌گوید که بنیادی‌ترین اجزایِ جهان نه نقطه‌اند و نه ذرّه، بلکه ریسمان‌هایی بی‌نهایت ریز که می‌لرزند — و هر ذرّه، فقط یک «نتِ» متفاوت از همان ریسمان است. الکترون یک بسامد است، فوتون بسامدی دیگر. یعنی به‌راستی: تمامِ ماده، موسیقی است. جهان یک وترِ کیهانی است که می‌نوازد."
                  : "Siglos después, la física llegó a lo mismo. La teoría de cuerdas dice que los componentes más básicos del universo no son puntos ni partículas, sino cuerdas ínfimas que vibran —y cada partícula es solo una «nota» distinta de esa misma cuerda. El electrón es una frecuencia, el fotón es otra. Es decir, literalmente: toda la materia es música. El universo es un acorde cósmico que suena."}
              </p>
              <p>
                {fa
                  ? "و اگر آفرینش یک سرود است، آنگاه راهِ بازگشت به خدا نیز سرود است. «دعا» (תְּפִלָּה) برابرِ ۵۱۵ است — درست همانندِ «سرود» (שִׁירָה). حکیمان می‌آموزند که نیایش، نردبانِ یعقوب است: نردبانی که از این جهان تا آسمان بالا می‌رود، پله‌پله چون اورتون‌های یک نت."
                  : "Y si la creación es un canto, entonces el camino de regreso a Dios también es canto. «Oración» (תְּפִלָּה) vale 515 —exactamente lo mismo que «canto» (שִׁירָה). Los sabios enseñan que rezar es la escalera de Jacob: una escalera que sube de este mundo hasta el cielo, peldaño a peldaño como los armónicos de una nota."}
              </p>
              <p>
                {fa
                  ? "و آنگاه که تورات و علم سرانجام به هم می‌رسند — نتِ طبیعت و اورتون‌های الهی، در یک هارمونی — سرودی نو زاده می‌شود: «شیر حاداش» (שִׁיר חָדָשׁ). عددش ۸۲۲ است، یعنی ۶ × ۱۳۷: در هر یک از شش حرفش، ۱۳۷ طنین می‌اندازد."
                  : "Y cuando la Torá y la ciencia por fin se encuentran —la nota de la naturaleza y los armónicos divinos, en una sola armonía— nace un canto nuevo: «shir jadash» (שִׁיר חָדָשׁ). Su número es 822, es decir 6 × 137: en cada una de sus seis letras resuena el 137."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 5 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              137 / 60
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "نوری که در یک تار پنهان است" : "La luz escondida en una cuerda"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "پنج هماهنگِ نخست جمع می‌شوند و ۱۳۷/۶۰ می‌شوند — کابالا بر هلاخا. تونِ بنیادین اِلوهیم است (طبیعت = ۸۶) و اورتون‌هایش چهار حرفِ نامِ یهوه‌اند. فیزیک همان را یافت: جهان از ریسمان‌هایی ساخته شده که می‌لرزند. و دعا (۵۱۵) همان سرود (۵۱۵) است: نردبانی که با آواز به سویِ خدا بالا می‌رود."
                : "Los cinco primeros armónicos se suman y dan 137/60 —Cabalá sobre halajá. El tono fundamental es Elokim (naturaleza = 86) y sus armónicos son las cuatro letras del Nombre יהוה. La física halló lo mismo: el universo está hecho de cuerdas que vibran. Y la oración (515) es el canto (515): una escalera que sube hacia Dios cantando."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بِرِشیت ۱:۳ · نور" : "Bereshit 1:3 · la luz", ref: "Genesis 1:3" },
                { label: fa ? "مزامیر ۹۶:۱ · سرودِ نو" : "Salmos 96:1 · canto nuevo", ref: "Psalms 96:1" },
                { label: fa ? "بِرِشیت ۲۸:۱۲ · نردبانِ یعقوب" : "Bereshit 28:12 · escalera de Jacob", ref: "Genesis 28:12" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 1:3")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ آفرینش در جاشمال ←" : "Estudiar la creación en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۱۵" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 15"}
            </div>

            <div className="mt-5 flex justify-center font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterios" className="hover:text-gold">{fa ? "همهٔ اسرار ←" : "Todos los misterios →"}</Link>
            </div>
          </div>
        </Section>

        {/* CIERRE CONTEMPLATIVO */}
        <Section>
          <div className="mt-14 text-center">
            <p className="mx-auto max-w-lg text-sm italic leading-relaxed text-parchment/70" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "شاید همین است رازِ آفرینش: خدا جهان را نگفت، بلکه آن را نواخت. یک نت زد، و هر ذرّه، هر ستاره، هر جانی، اورتونی از آن نتِ نخست است. و تو نیز نتی هستی. کارِ توست که خود را کوک کنی — تا نوایت با آن سرودِ بزرگ هماهنگ شود."
                : "Quizá ese es el secreto de la creación: Dios no dijo el mundo, lo tocó. Pulsó una nota, y cada partícula, cada estrella, cada alma es un armónico de esa primera nota. Y tú también eres una nota. Tu tarea es afinarte —para que tu sonido entre en armonía con el gran canto."}
            </p>
          </div>
        </Section>

        {/* FOOTER */}
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
