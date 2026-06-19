"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

function Section({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.1 });
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

function Tile({ he, sub, color, size = 52 }: { he: string; sub: string; color: string; size?: number }) {
  return (
    <div className="inline-flex flex-col items-center rounded-2xl border-2 px-5 py-4"
      style={{ borderColor: `${color}99`, background: "rgba(14,12,22,0.96)", boxShadow: `0 0 24px ${color}33` }}>
      <span className="hebrew font-bold leading-none"
        style={{ fontSize: `${size}px`, color: "#fff6e0", textShadow: `0 0 20px ${color}, 0 0 7px ${color}` }}>
        {he}
      </span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

function SectionHeader({ he, es, fa, fa_active, color }: { he: string; es: string; fa: string; fa_active: boolean; color: string }) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="hebrew text-2xl font-bold" style={{ color, textShadow: `0 0 10px ${color}66` }}>{he}</span>
      <div className="h-px flex-1 opacity-20" style={{ background: color }} />
      <span className="font-cinzel text-xs uppercase tracking-[0.3em]" style={{ color: `${color}99` }}>
        {fa_active ? fa : es}
      </span>
    </div>
  );
}

function PullQuote({ es, fa_text, fa_active, color }: { es: string; fa_text: string; fa_active: boolean; color: string }) {
  return (
    <Section>
      <div className="my-9 rounded-2xl border p-6 text-center"
        style={{ borderColor: `${color}40`, background: `${color}08` }}>
        <p className="text-lg italic leading-relaxed text-parchment/90" dir={fa_active ? "rtl" : "ltr"}>
          {fa_active ? `«${fa_text}»` : `«${es}»`}
        </p>
      </div>
    </Section>
  );
}

export default function PageLikuteiMoharanI1() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const C = "#e8945a"; // ámbar de vela de Shabbat

  useEffect(() => { document.documentElement.classList.add("dark"); }, []);

  const bg = "#05050a";
  const navBg = "rgba(5,5,10,0.9)";

  return (
    <div className="always-dark min-h-screen" style={{ background: bg }} dir={fa ? "rtl" : "ltr"}>

      {/* ── NAV ── */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/misterios" className="font-cinzel text-sm text-gold/70 hover:text-gold">
            {fa ? "← همهٔ مطالعات شَبات" : "← Todos los estudios"}
          </Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button
              onClick={() => router.push("/estudio?ref=Likutey_Moharan.1")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
              {fa ? "شروع مطالعه ←" : "Comenzar estudio →"}
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── HERO ── */}
        <Section>
          <div className="mb-12 text-center">
            <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em]" style={{ color: `${C}88` }}>
              {fa ? "شَبات · لیکوتِی موهاران ۱:۱" : "Shabbat · Likutei Moharan I:1"}
            </p>
            <p className="hebrew mb-3 font-bold leading-tight"
              style={{ fontSize: "clamp(32px, 8vw, 52px)", color: C, textShadow: `0 0 32px ${C}, 0 0 12px ${C}88` }}>
              אַשְׁרֵי תְמִימֵי דָרֶךְ
            </p>
            <h2 className="mb-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
              {fa ? "حنی که دعایت را می‌شنواند" : "El jen que hace que tu oración sea escuchada"}
            </h2>
            <p className="font-cinzel text-xs uppercase tracking-widest text-parchment/50">
              {fa ? "ربه نجمن از برسلوو — درباره تهیلیم ۱۱۹:۱" : "Rebbe Najman de Breslov — sobre Tehilim 119:1"}
            </p>

            {/* Tiles ח + נ = חֵן */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Tile he="ח" sub={fa ? "جِت · خورشید" : "Jet · Sol"} color={C} size={56} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>+</span>
              <Tile he="נ" sub={fa ? "نون · ماه" : "Nun · Luna"} color="#c9a43e" size={56} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>=</span>
              <Tile he="חֵן" sub={fa ? "فیض · ۵۸" : "Jen · 58"} color={C} size={56} />
            </div>
          </div>
        </Section>

        {/* ── TEMA CENTRAL ── */}
        <PullQuote
          es="La luna no tiene luz propia. Solo la que recibe del sol."
          fa_text="ماه نور ذاتی ندارد. تنها نوری که از خورشید دریافت می‌کند."
          fa_active={fa}
          color={C}
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "کسی که تورا را با قدرت مطالعه می‌کند (بِکواج)، حَن (فیض) به دست می‌آورد — و این فیض است که دعایش را می‌شنواند. در دلِ اسرائیل، وقتی تورا خوانده می‌شود، «یَعَلَت چِن» — ظبیهٔ فیض — بر مطالعان می‌تابد و کلماتشان را به قلبِ دیگران نقش می‌کند."
                : "El que estudia Torá con fuerza (b'kóaj) adquiere jen — gracia — y esa gracia hace que su oración sea escuchada. En Israel, cuando se estudia Torá, la «yaálat jen» — la gacela de gracia (Mishlei 5:19) — irradia sobre los estudiantes y sus palabras se graban en el corazón del otro."}
            </p>
          </div>
        </Section>

        {/* ── SECCIÓN: TRADUCCIÓN ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="תַּרְגּוּם" es="Traducción" fa="ترجمه" fa_active={fa} color={C} />

            <div className="rounded-2xl border p-6 text-center"
              style={{ borderColor: `${C}30`, background: `${C}06` }}>
              <p className="hebrew mb-3 text-xl font-bold leading-relaxed" style={{ color: C }}>
                אַשְׁרֵי תְמִימֵי דָרֶךְ, הַהוֹלְכִים בְּתוֹרַת ה׳
              </p>
              <p className="font-cormorant text-base italic text-parchment/80">
                {fa
                  ? "«خوشا به حالِ یکپارچگانِ راه، آنان که در تورایِ خداوند می‌روند.»"
                  : "«Dichosos los de camino íntegro (temimei dárej), los que andan en la Torá de Hashem.»"}
              </p>
              <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                — {fa ? "تهیلیم ۱۱۹:۱" : "Tehilim 119:1"}
              </p>
            </div>

            <div className="mt-6 space-y-3" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  he: "אַיֶּלֶת אֲהָבִים וְיַעֲלַת חֵן",
                  ref: "Mishlei 5:19",
                  es: "«Cierva de amores, gacela de gracia» — la Torá eleva jen sobre quienes la estudian (Eruvin 54b)",
                  fa: "«آهوبرهٔ عشق‌ها، و آهوی فیض» — تورا حَن را بر مطالعانش می‌افزاید (اِروین ۵۴ب)",
                },
                {
                  he: "חָכְמַת אָדָם תָּאִיר פָּנָיו",
                  ref: "Kohelet 8:1",
                  es: "«La sabiduría del hombre ilumina su rostro»",
                  fa: "«دانشِ آدمی، رویش را روشن می‌کند»",
                },
                {
                  he: "לִפְנֵי שֶׁמֶשׁ יִנּוֹן שְׁמוֹ",
                  ref: "Tehilim 72:17",
                  es: "«Ante el sol perdurará su nombre» — Rashi: lashón maljut, lenguaje de realeza",
                  fa: "«پیش از خورشید، نامش ماندگار است» — راشی: لشون مَلخوت",
                },
                {
                  he: "וְהִתְוִיתָ תָּו",
                  ref: "Yejezkel 9:4",
                  es: "«Y marcarás una tav» — la gracia graba un lugar en el corazón",
                  fa: "«و تاو را نشان می‌زنی» — فیض مکانی در قلب حک می‌کند",
                },
                {
                  he: "דִּבְרֵי חֲכָמִים בְּנַחַת נִשְׁמָעִים",
                  ref: "Kohelet 9:17",
                  es: "«Las palabras de los sabios se oyen con najat» — calma que nace del jen grabado",
                  fa: "«کلماتِ دانایان با آرامش شنیده می‌شوند» — آرامشی که از حنِ حک‌شده می‌زاید",
                },
              ].map((v, i) => (
                <div key={i} className="rounded-xl border border-gold/10 p-4"
                  style={{ background: "rgba(14,12,22,0.7)" }}>
                  <p className="hebrew mb-1 text-base font-bold" style={{ color: `${C}cc` }}>{v.he}</p>
                  <p className="text-xs text-parchment/70">{fa ? v.fa : v.es}</p>
                  <p className="mt-1 font-cinzel text-[10px] uppercase tracking-widest text-parchment/35">— {v.ref}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: PaRDeS ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="פרד״ס" es="PaRDeS" fa="پَردِس" fa_active={fa} color={C} />

            {/* Pshat */}
            <div className="mb-8">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>פְּשָׁט</span>
                {fa ? "پشاط — معنایِ آشکار" : "Pshat — lectura literal"}
              </h4>
              <div className="space-y-3 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                <p>
                  {fa
                    ? "ربه نجمن یک زنجیرهٔ علت و معلولِ روحانی آموزش می‌دهد: هر چیزی یک سِجِل (دانشِ درونی) دارد — جرقه‌ای از خردِ الهی. آوودایِ یهودی این است که آن سجل را در هر چیزی ببیند و به آن بپیوندد."
                    : "Rebbe Najman enseña una cadena de causa-efecto espiritual: cada cosa tiene un sejel interior — una chispa de sabiduría divina. La avodá del judío es mirar (lehistakel) ese sejel en todo lo que encuentra y ligarse a él."}
                </p>
                <p>
                  {fa
                    ? "اما آن نور بیش از حد بزرگ است برای دریافتِ مستقیم: به ظرفی نیاز دارد — مَلخوت (ماه که نورِ خود ندارد). آنچه آن ظرف را پر می‌کند، تورایی است که با قدرت خوانده می‌شود (بِکواج). نتیجه: دعا پذیرفته می‌شود."
                    : "Pero esa luz es demasiado grande para recibirla directamente: necesita un recipiente, la Maljut (la luna que no brilla por sí). Lo que carga ese recipiente es la Torá estudiada con fuerza (b'kóaj). El resultado: la plegaria es aceptada."}
                </p>
                <p className="rounded-xl border border-gold/10 p-4 text-center italic" style={{ background: `${C}08` }}>
                  {fa
                    ? "کسی که تورا را با قدرت مطالعه می‌کند، فیض به دست می‌آورد — و فیض است که دعایش را می‌شنواند."
                    : "El que estudia Torá con fuerza adquiere gracia, y la gracia hace que sus oraciones — ante Dios y ante los hombres — sean escuchadas."}
                </p>
              </div>
            </div>

            {/* Remez */}
            <div className="mb-8">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>רֶמֶז</span>
                {fa ? "رِمِز — رمز و نمادها" : "Remez — alusiones y correspondencias"}
              </h4>
              <p className="mb-4 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                {fa
                  ? "قلبِ رِمِزِ این تورا، یک معماریِ حروف است — نه اعداد. ربه نجمن کلمات می‌سازد، نه اعداد جمع می‌کند:"
                  : "El corazón remez de esta Torá es una arquitectura de letras — no de números. Rebbe Najman compone palabras, no suma valores:"}
              </p>
              {/* Tabla de letras */}
              <div className="overflow-hidden rounded-xl border border-gold/15" style={{ background: "rgba(14,12,22,0.8)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: `${C}18` }}>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "حرف/کلمه" : "Letra / palabra"}</th>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "معادل" : "Corresponde a"}</th>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "ارزش" : "Valor"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { l: "ח", name: fa ? "جِت" : "Jet", corr: fa ? "جوخما / خورشید / حیات" : "Jojmá / Sol / jiut (vitalidad)", val: "8" },
                      { l: "נ", name: fa ? "نون" : "Nun", corr: fa ? "مَلخوت / ماه" : "Maljut / Luna", val: "50" },
                      { l: "חֵן", name: fa ? "حَن" : "Jen", corr: fa ? "فیض (ح+ن)" : "Gracia (ח+נ)", val: "58" },
                      { l: "ת", name: fa ? "تاو" : "Tav", corr: fa ? "حک کردن / نشانه‌گذاری" : "Grabar / marcar", val: "400" },
                      { l: "נַחַת", name: fa ? "ناحَت" : "Najat", corr: fa ? "آرامش (חֵן + ת)" : "Calma (חֵן + ת)", val: "458" },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-gold/10">
                        <td className="p-3">
                          <span className="hebrew text-lg font-bold" style={{ color: C }}>{row.l}</span>
                          <span className="ml-2 font-cinzel text-[10px] text-parchment/40">{row.name}</span>
                        </td>
                        <td className="p-3 text-xs text-parchment/70">{row.corr}</td>
                        <td className="p-3 font-cinzel text-xs font-bold" style={{ color: `${C}cc` }}>{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs italic text-parchment/50" dir={fa ? "rtl" : "ltr"}>
                {fa
                  ? "نکتهٔ سوفِر: ربه نجمن استدلالش را بر ارزشِ عددی استوار نمی‌کند — استدلالش ترکیبِ حروف است. ارزشِ عددی تنها یک تأییدِ زیباست."
                  : "Nota del Sofer: Rebbe Najman no apoya su enseñanza en los valores numéricos — su argumento es de composición de letras. La gematría es solo una corroboración elegante."}
              </p>
            </div>

            {/* Drash */}
            <div className="mb-8">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>דְּרָשׁ</span>
                {fa ? "دراش — آموزشِ عملی" : "Drash — enseñanza práctica y voz Breslov"}
              </h4>
              <div className="space-y-4 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                <p>
                  {fa
                    ? "یِتسِر هارا (تمایلِ بد) صرفاً «وسوسه» نیست: این یک دیوانگیِ بالینیِ نفس است. ربه نجمن از سوتا ۳الف نقل می‌کند: «انسان گناه نمی‌کند مگر آنکه روحِ احمقانه‌ای (رواج شتوت) در او وارد شود.»"
                    : "El yétzer hará no es solo «tentación»: es locura clínica del alma. Rebbe Najman cita Sotá 3a: «el hombre no peca a menos que entre en él un rúaj shtut — un espíritu de necedad»."}
                </p>
                <p>
                  {fa
                    ? "و این تصویر هم ترسناک است هم لطیف: همان‌طور که دیوانگان را باید نگه داشت و طلسم‌هایی با نام‌های مقدس آویزانشان کرد، تورا «عصاها و نام‌ها» (مَکلوت و شِموت) است که با آن رواجِ شتوت از درونِ آدم بیرون رانده می‌شود."
                    : "La imagen es feroz y tierna a la vez: como a los locos hay que sujetarlos y colgarles amuletos con Nombres sagrados, así la Torá es «varas y Nombres» (maklot u-shemot) con que se golpea y se expulsa al rúaj shtut de adentro de la persona."}
                </p>
                <div className="rounded-xl border p-4" style={{ borderColor: `${C}30`, background: `${C}06` }}>
                  <p className="text-sm font-semibold text-parchment/90" dir={fa ? "rtl" : "ltr"}>
                    {fa
                      ? "ظریف‌ترین نکته: یِتسِر هارا ابتدا خود را به شکلِ میتسوا در می‌آورد — «شعلهٔ سفیدِ آتش». تو را به انجامِ کاری تشویق می‌کند که مقدس به نظر می‌رسد. «هرچند شعله سفید باشد، باز هم فرشته‌ای ویرانگر است.»"
                      : "El toque más sutil, puro Najman: al inicio el yétzer hará se disfraza de mitzvá — «una chispa de llama blanca». Te empuja a hacer algo que parece santo. «Aunque la llama sea blanca, sigue siendo un ángel destructor.»"}
                  </p>
                </div>
                <p>
                  {fa
                    ? "صدایِ بعل‌شم‌طوو به طبیعت درمی‌آید: «عَوودا بِگَشمیوت» — عبادت از طریقِ مادی. «جستجوی سجِل در هر چیز» ربه دقیقاً همان راهِ بِشت است: در هر شیء، برخورد، یا دشواری جرقه‌ای از خردِ الهی منتظرِ ارتقاست."
                    : "La voz del Baal Shem Tov se integra naturalmente: avodá be-gashmiut — servir a Dios desde lo material. El «buscar el sejel en cada cosa» del Rebbe es exactamente el camino del Besht: en cada objeto, encuentro, dificultad, hay una chispa de sabiduría divina esperando ser elevada."}
                </p>
              </div>
            </div>

            {/* Sod */}
            <div className="mb-2">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>סוֹד</span>
                {fa ? "سود — بُعدِ باطنی" : "Sod — dimensión esotérica"}
              </h4>
              <div className="space-y-4 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                <p>
                  {fa
                    ? "رازِ تمامِ این تورا، یِخود (اتحادِ) جوخما و مَلخوت است — خورشید و ماه، ح و נ:"
                    : "El secreto de toda esta Torá es el yijud (unión) de Jojmá y Maljut — del sol y la luna, de la ח y la נ:"}
                </p>
                <div className="rounded-xl border border-gold/15 p-5 space-y-3" style={{ background: "rgba(14,12,22,0.8)" }}>
                  <div dir="rtl" className="text-center">
                    <p className="hebrew text-base font-bold text-gold mb-1">דְּלֵית לָהּ מִגַּרְמָהּ כְּלוּם</p>
                    <p className="font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                      {fa ? "زوهر ۱:۲۳۸الف (وَیِحی)" : "Zohar I:238a (Vayejí)"}
                    </p>
                    <p className="mt-2 text-sm italic text-parchment/70" dir={fa ? "rtl" : "ltr"}>
                      {fa
                        ? "«هیچ چیزی از خودش ندارد» — ماهِ مَلخوت، ظرفِ محض است: تمامِ نورش از بالا می‌آید."
                        : "«No tiene nada de sí misma» — la luna / Maljut es el recipiente puro: toda su luz viene de arriba."}
                    </p>
                  </div>
                </div>
                <p>
                  {fa
                    ? "هدف: «اورِ هَلواانا کِاورِ هَحاما» — «نورِ ماه چون نورِ خورشید» (یِشَعیاهو ۳۰:۲۶) — تیکونِ مسیحایی که در آن مَلخوت/شِخینا به‌طور کامل دریافت می‌کند و بدون کاستی می‌درخشد."
                    : "La meta es «or ha-levaná ke'or ha-jamá» — «la luz de la luna como la del sol» (Yeshayá 30:26) — el tikún mesiánico en que la Maljut/Shejiná recibe plenamente y resplandece sin merma."}
                </p>
                <p>
                  {fa
                    ? "بعل‌هَسولام (رَو یِهودا اَشلاگ) در همین کلید آموزش می‌دهد: تمامِ آفرینش، کلی (ظرف = مَلخوت) است که تنها محتوایش نورِ دهنده است؛ آووداه تبدیلِ «میلِ دریافت برای خود» به «دریافت برای بخشیدن» است. یِخودِ ח-נ که در حَن متولد می‌شود، دقیقاً همان ظرفی است که از گرفتن برای خود دست می‌کشد."
                    : "Baal HaSulam (Rav Yehudá Ashlag) enseña en esta misma clave: toda la Creación es el kli (recipiente = Maljut) cuyo único contenido es la luz del Dador; la avodá es convertir el «deseo de recibir para sí» en «recibir para dar». El yijud ח-נ que nace en jen es precisamente el recipiente que deja de tomar para sí y se vuelve transparente a la luz."}
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: HITBONENUT ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="הִתְבּוֹנְנוּת" es="Hitbonenut — Contemplación" fa="هیتبونِنوت — تأمل" fa_active={fa} color={C} />

            <div className="space-y-4" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  n: "01",
                  es: "Mi oración no se «rechaza» por arriba; se cae por falta de jen. Cuando algo que pido —a Dios o a una persona— «no entra», no es que el otro sea duro: es que a mis palabras les falta gracia. La pregunta no es «¿por qué no me escuchan?» sino «¿de dónde saco jen?».",
                  fa: "دعایم از بالا «رد» نمی‌شود؛ بلکه از کمبودِ حَن سقوط می‌کند. وقتی چیزی که می‌خواهم «وارد نمی‌شود»، دیگری سخت‌دل نیست: کلماتم فیض ندارند. سؤال این نیست «چرا نمی‌شنوند؟» بلکه «از کجا حَن به دست آورم؟»",
                },
                {
                  n: "02",
                  es: "El jen no se finge, se gana en la casa de estudio. El patrón es nítido: Torá b'kóaj → la luna recibe del sol → nace jen → la palabra se graba (tav) → najat → es oída. La gracia es el subproducto natural de haberme ligado al sejel interior de las cosas.",
                  fa: "حَن تظاهر نمی‌شود، در خانهٔ مطالعه به دست می‌آید. الگو روشن است: تورا بِکواج ← ماه از خورشید دریافت می‌کند ← حَن متولد می‌شود ← کلمه حک می‌شود (تاو) ← ناحَت ← شنیده می‌شود.",
                },
                {
                  n: "03",
                  es: "Mi pecado es una forma de locura pasajera, no mi identidad. «Un rúaj shtut entró en él.» El mal en mí no es yo — es un espíritu de necedad que se metió y puede ser expulsado. No soy un malvado; soy alguien temporalmente fuera de juicio, y la Torá es la vara que me devuelve la cordura.",
                  fa: "گناهم نوعی دیوانگیِ گذراست، نه هویتم. «روحِ احمقانه‌ای در او داخل شد.» بدیِ درونم من نیستم — روحی است که وارد شده و می‌توان بیرونش راند. من بدکار نیستم؛ کسی هستم موقتاً بی‌تعادل، و تورا عصایی است که عقل را باز می‌گرداند.",
                },
                {
                  n: "04",
                  es: "Cuidado con la luz blanca. Lo que más me descarrila a veces se viste de mitzvá. La inspiración intensa, el «fuego blanco», no garantiza santidad. El alma íntegra (tam) no es la más encendida: es la que mira el sejel y se deja corregir por la Torá.",
                  fa: "مراقبِ نورِ سفید باش. گاهی آنچه بیشتر منحرفم می‌کند لباسِ میتسوا می‌پوشد. الهامِ شدید، «آتشِ سفید»، قداست را تضمین نمی‌کند. نفسِ یکپارچه (تام) پرشورترین نیست: آن است که سجل را می‌بیند و می‌گذارد تورا تصحیحش کند.",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-gold/10 p-5"
                  style={{ background: "rgba(14,12,22,0.7)" }}>
                  <span className="font-cinzel text-xs font-bold shrink-0 pt-0.5" style={{ color: `${C}60` }}>{item.n}</span>
                  <p className="text-sm leading-relaxed text-parchment/80">{fa ? item.fa : item.es}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: MAASÉ ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="מַעֲשֶׂה" es="Maasé — Acción para este Shabbat" fa="مَعَسه — عملِ این شَبات" fa_active={fa} color={C} />

            <div className="mb-5 rounded-2xl border p-5 text-center"
              style={{ borderColor: `${C}40`, background: `${C}08` }}>
              <p className="font-cinzel text-sm font-bold" style={{ color: C }}>
                {fa ? "شَبات سجل و حَن" : "«El Shabbat del sejel y del jen»"}
              </p>
            </div>

            <div className="space-y-4" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  n: "1",
                  label: fa ? "پیش از ورودِ شَبات" : "Antes de la entrada del Shabbat",
                  es: "Dedica diez minutos a Torá b'kóaj — estudio con fuerza, en voz alta y con esfuerzo, aunque sea de un solo versículo o una mishná. No leer por encima: masticar hasta que ilumine. Esa es la nun recibiendo del sol.",
                  fa: "ده دقیقه به تورا بِکواج بپرداز — مطالعه با قدرت، با صدایِ بلند و با تلاش، ولو یک آیه یا یک میشنا باشد. از روی سطح نخوان: جَوید تا روشن شوی. آن نون است که از خورشید دریافت می‌کند.",
                },
                {
                  n: "2",
                  label: fa ? "بر سرِ سفرهٔ شَبات" : "En la mesa del Shabbat",
                  es: "Elige una sola cosa —un alimento, el rostro de un comensal, una dificultad de la semana— y practica lehistakel ba-sejel: pregúntate en silencio «¿qué chispa de sabiduría divina esconde esto?». Eleva esa chispa con una bendición consciente.",
                  fa: "یک چیز انتخاب کن —یک غذا، چهرهٔ یک میهمان، دشواریِ هفته— و لِهیستَکِل بَسِجِل را تمرین کن: در سکوت از خود بپرس «چه جرقه‌ای از خردِ الهی در این پنهان است؟» آن جرقه را با یک برکتِ آگاهانه ارتقا ده.",
                },
                {
                  n: "3",
                  label: fa ? "یک درخواست با حَن" : "Una petición con jen",
                  es: "Antes de pedir algo a alguien este Shabbat (o a Hashem en tu tefilá), haz una pausa de un instante para cargar la palabra de gracia: habla b'najat — con calma, sin aspereza. Observa cómo cambia la recepción.",
                  fa: "پیش از درخواست از کسی در این شَبات (یا از هاشم در نمازت)، یک لحظه مکث کن تا کلمه را با فیض بارگذاری کنی: بِناحات صحبت کن — با آرامش، بدون تندی. ببین چگونه پذیرشِ آن تغییر می‌کند.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border p-5" style={{ borderColor: `${C}25`, background: "rgba(14,12,22,0.7)" }}>
                  <div className="flex items-start gap-3">
                    <span className="font-cinzel text-2xl font-bold shrink-0" style={{ color: C }}>{item.n}</span>
                    <div>
                      <p className="mb-1 font-cinzel text-xs font-bold uppercase tracking-widest" style={{ color: `${C}bb` }}>{item.label}</p>
                      <p className="text-sm leading-relaxed text-parchment/80">{fa ? item.fa : item.es}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-gold/10 p-4 text-center text-sm text-parchment/60" dir={fa ? "rtl" : "ltr"}>
              <span className="font-cinzel text-xs uppercase tracking-widest" style={{ color: `${C}80` }}>
                {fa ? "مידا برای کار کردن:" : "Midá a trabajar:"}
              </span>
              <span className="ml-2">{fa ? "تبدیلِ تندی (کاپدانوت) به ناحات — آرامشی که در قلبِ دیگری جای می‌گیرد" : "cambiar la aspereza (kapdanut) por najat — la suavidad que graba lugar en el corazón del otro"}</span>
            </div>
          </div>
        </Section>

        {/* ── SECCIÓN: JATIMÁ ── */}
        <Section delay={100}>
          <div className="mt-14">
            <SectionHeader he="חֲתִימָה" es="El Sello — Síntesis de cierre" fa="حَتیما — مُهرِ ختم" fa_active={fa} color={C} />

            <div className="rounded-2xl border-2 p-7" style={{ borderColor: `${C}50`, background: `${C}07` }}>
              <div className="space-y-5" dir={fa ? "rtl" : "ltr"}>
                {[
                  {
                    icon: "◈",
                    label: fa ? "ایدهٔ اصلی" : "Idea principal",
                    es: "La Torá estudiada con fuerza une la «luna» (Maljut/נ) con el «sol» (Jojmá/ח), y de esa unión nace el חֵן (jen) que hace que toda plegaria y petición sea aceptada.",
                    fa: "تورایی که با قدرت مطالعه می‌شود «ماه» (مَلخوت/נ) را با «خورشید» (جوخما/ח) متحد می‌کند، و از این اتحاد חֵן (حَن) متولد می‌شود که هر دعا و درخواستی را می‌شنواند.",
                  },
                  {
                    icon: "◇",
                    label: fa ? "بینشِ کلیدی" : "Insight clave",
                    es: "Una oración no se cae por dureza ajena, sino por falta de gracia propia — y la gracia se gana ligándose al sejel interior de cada cosa, no fingiéndola.",
                    fa: "دعا از سختیِ دیگری نمی‌افتد، بلکه از کمبودِ فیضِ خود — و فیض با پیوند به سجلِ درونیِ هر چیز به دست می‌آید، نه با تظاهر.",
                  },
                  {
                    icon: "○",
                    label: fa ? "بینشِ روحانی" : "Insight espiritual",
                    es: "El pecado es un rúaj shtut, una locura prestada; la Torá es la vara con Nombres sagrados que la expulsa y devuelve la cordura del alma.",
                    fa: "گناه یک رواجِ شتوت است، دیوانگیِ عاریه‌ای؛ تورا عصایی با نام‌های مقدس است که آن را بیرون می‌راند و سلامتِ نفس را باز می‌گرداند.",
                  },
                  {
                    icon: "✦",
                    label: fa ? "کاربرد" : "Aplicación",
                    es: "Estudia un poco con fuerza, mira la chispa de sabiduría en una sola cosa, y habla b'najat — con calma que graba lugar en el corazón.",
                    fa: "کمی با قدرت مطالعه کن، جرقهٔ خرد را در یک چیز ببین، و بِناحات صحبت کن — با آرامشی که در قلب جای می‌گیرد.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="shrink-0 text-lg" style={{ color: C }}>{item.icon}</span>
                    <div>
                      <span className="font-cinzel text-xs font-bold uppercase tracking-widest" style={{ color: `${C}99` }}>{item.label}</span>
                      <p className="mt-1 text-sm leading-relaxed text-parchment/85">{fa ? item.fa : item.es}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Frase final */}
              <div className="mt-7 border-t border-gold/15 pt-6 text-center">
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Tile he="חֵן" sub={fa ? "فیض · ۵۸" : "Jen · 58"} color={C} size={40} />
                  <span className="font-cinzel text-2xl" style={{ color: `${C}50` }}>+</span>
                  <Tile he="ת" sub={fa ? "تاو · ۴۰۰" : "Tav · 400"} color="#c9a43e" size={40} />
                  <span className="font-cinzel text-2xl" style={{ color: `${C}50` }}>=</span>
                  <Tile he="נַחַת" sub={fa ? "آرامش · ۴۵۸" : "Najat · 458"} color={C} size={40} />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ── CIERRE DE SHABBAT ── */}
        <Section delay={200}>
          <div className="mt-16 text-center">
            {/* Separador */}
            <div className="mb-10 flex items-center gap-4">
              <div className="h-px flex-1 opacity-20" style={{ background: C }} />
              <span className="hebrew text-sm" style={{ color: `${C}60` }}>שַׁבָּת</span>
              <div className="h-px flex-1 opacity-20" style={{ background: C }} />
            </div>

            {/* Menorá */}
            <div className="mb-6">
              <Image
                src="/images/menora-shabat.png"
                alt={fa ? "مِنورایِ شَبات" : "Menorá de Shabbat"}
                width={280}
                height={280}
                className="mx-auto opacity-90"
                style={{ filter: `drop-shadow(0 0 24px ${C}66)` }}
              />
            </div>

            <p className="hebrew font-bold"
              style={{ fontSize: "clamp(36px, 10vw, 56px)", color: C, textShadow: `0 0 30px ${C}, 0 0 10px ${C}99` }}>
              שַׁבָּת שָׁלוֹם
            </p>
            <p className="mt-2 font-cinzel text-base uppercase tracking-[0.35em] text-parchment/60">
              {fa ? "شَبات شالوم" : "Shabbat Shalom"}
            </p>
          </div>
        </Section>

        {/* ── BOTONES DE NAVEGACIÓN ── */}
        <Section delay={100}>
          <div className="mt-14 text-center">
            <button
              onClick={() => router.push("/estudio?ref=Likutey_Moharan.1")}
              className="mb-6 rounded-full border-2 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest transition-all hover:scale-105"
              style={{
                borderColor: C, color: C, background: `${C}12`,
                boxShadow: `0 0 20px ${C}33`,
              }}>
              {fa ? "مطالعهٔ این متن در جاشمال ←" : "Estudiar este texto en Jashmal →"}
            </button>

            {/* Chips de temas */}
            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { es: "Torá — estudio con fuerza", fa: "تورا — مطالعه با قدرت", ref: "Proverbs 5:19" },
                { es: "Oración — tefilá", fa: "دعا — تِفیلا", ref: "Psalms 119:1" },
                { es: "Gracia — jen", fa: "فیض — חֵן", ref: "Ecclesiastes 9:17" },
              ].map((chip, i) => (
                <button key={i}
                  onClick={() => router.push(`/estudio?ref=${encodeURIComponent(chip.ref)}`)}
                  className="rounded-full border px-4 py-1.5 font-cinzel text-xs transition-all hover:scale-105"
                  style={{ borderColor: `${C}40`, color: `${C}cc`, background: `${C}08` }}>
                  {fa ? chip.fa : chip.es}
                </button>
              ))}
            </div>

            <Link href="/misterios"
              className="font-cinzel text-sm hover:text-gold/80"
              style={{ color: "rgba(201,164,62,0.5)" }}>
              {fa ? "← همهٔ مطالعات" : "← Todos los estudios"}
            </Link>
          </div>
        </Section>

        {/* ── FOOTER ── */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl" style={{ color: `${C}70` }}>חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            {fa ? "کابالا و فلسفهٔ یهودی" : "Cabalá & Filosofía Judía"}
          </p>
        </div>

      </main>
    </div>
  );
}
