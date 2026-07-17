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

export default function PageLikuteiMoharanI5() {
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
              onClick={() => router.push("/estudio?ref=Likutei_Moharan.5")}
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
              {fa ? "شَبات · لیکوتِی موهاران ۱:۵" : "Shabbat · Likutei Moharan I:5"}
            </p>
            <p className="hebrew mb-3 font-bold leading-tight"
              style={{ fontSize: "clamp(26px, 6.5vw, 46px)", color: C, textShadow: `0 0 32px ${C}, 0 0 12px ${C}88` }}>
              בַּחֲצֹצְרוֹת וְקוֹל שׁוֹפָר
            </p>
            <h2 className="mb-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
              {fa ? "صدایی که رعد می‌شود و حکم را درهم می‌شکند" : "La voz que se vuelve trueno y quiebra el decreto"}
            </h2>
            <p className="font-cinzel text-xs uppercase tracking-widest text-parchment/50">
              {fa ? "ربه نجمن از برسلوو — بر تِهیلیم ۹۸:۶" : "Rebbe Najman de Breslov — sobre Tehilim 98:6"}
            </p>

            {/* Tiles תֵּבֵל = תָּו + לֵב (notaricón) */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Tile he="תֵּבֵל" sub={fa ? "تِوِل · جهان" : "Tevel · mundo"} color={C} size={44} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>=</span>
              <Tile he="תָּו" sub={fa ? "تاو · نشان" : "Tav · marca"} color="#c9a43e" size={44} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>+</span>
              <Tile he="לֵב" sub={fa ? "لِو · قلب" : "Lev · corazón"} color="#c9a43e" size={44} />
            </div>
          </div>
        </Section>

        {/* ── TEMA CENTRAL ── */}
        <PullQuote
          es="No son trompetas de metal: es tu voz. Dicha con fuerza pura, vuelve como trueno que endereza el corazón."
          fa_text="این کرنایِ فلزی نیست: صدایِ توست. اگر با نیرویی پاک گفته شود، همچون رعدی بازمی‌گردد که قلب را راست می‌کند."
          fa_active={fa}
          color={C}
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "هر انسان باید بگوید: «تمامِ جهان تنها به خاطرِ من آفریده شد» (سنهدرین ۳۷الف). پس بر من است که در هر لحظه به کاستیِ جهان بنگرم و برای اصلاحش دعا کنم. اما دعا دو گونه است: پیش از آنکه حکم (گِزَر دین) مُهر شود، به شیوهٔ معمول دعا می‌کنیم؛ و پس از مُهرِ حکم، باید دعا را در «ماآمار» — یک روایت — بپوشانیم، تا فرشتگانِ سِتَمگرِ ایستاده در چپ آن را نفهمند و مانع نشوند (دانیال ۴:۱۴)."
                : "Cada persona debe decir: «Todo el mundo fue creado solo por mí» (Sanhedrín 37a). Por eso está obligada a mirar la falta del mundo y a orar por su reparación. Pero la plegaria tiene dos tiempos: antes de que el decreto (gzar din) sea sellado, se reza en el orden habitual; después de sellado, hay que vestir la plegaria en un maamar —un relato— para que los ángeles acusadores «a la izquierda» no la entiendan ni la bloqueen (Daniel 4:14)."}
            </p>
            <p>
              {fa
                ? "و نشانهٔ اینکه در کدام زمان ایستاده‌ای، شادیِ توست هنگامِ انجامِ میتزوا. هر جا نتوانی شادمان شوی، همان‌جا حکم فرود آمده. اما شادی در قلب می‌زید (تِهیلیم ۴:۸)، و قلب تا کژیِ خود (עַקְמוּמִיּוּת) را راست نکند، نمی‌تواند شاد شود. و آنچه کژیِ قلب را راست می‌کند، «رعد» است (بِراخوت ۵۹الف) — و رعد، همان صدایی است که انسان با نیرو در دعا بیرون می‌دهد."
                : "Y la señal de en qué tiempo estás es tu alegría al cumplir la mitzvá. Donde no logras alegrarte, ahí cayó el decreto. Pero la alegría vive en el corazón (Tehilim 4:8), y el corazón no puede alegrarse hasta enderezar su torcedura (akmumiyut). Y lo que endereza la torcedura del corazón es el trueno (Berajot 59a) — y el trueno es la voz que el hombre saca con fuerza en la plegaria."}
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
                בַּחֲצֹצְרוֹת וְקוֹל שׁוֹפָר הָרִיעוּ לִפְנֵי הַמֶּלֶךְ ה׳
              </p>
              <p className="font-cormorant text-base italic text-parchment/80">
                {fa
                  ? "«با کرناها و آوایِ شوفار، در پیشگاهِ پادشاه، هَوایا، بانگ برآورید.»"
                  : "«Con trompetas y el sonido del shofar, clamad ante el Rey, HaShem.»"}
              </p>
              <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                — {fa ? "تِهیلیم ۹۸:۶" : "Tehilim (Salmos) 98:6"}
              </p>
            </div>

            <p className="mt-6 mb-4 text-sm leading-relaxed text-parchment/75" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "ربه نجمن این تورا را با استخوان‌بندیِ پنهانِ همین مزمور می‌بافد (۹۸:۶–۹). هفت زیربخش (۵:۱–۵:۷) این زنجیره را می‌گشایند:"
                : "El Rebbe teje esta Torá con el esqueleto secreto del mismo salmo (98:6–9). Sus siete sub-secciones (5:1–5:7) despliegan esta cadena:"}
            </p>

            <div className="space-y-3" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  he: "כָּל הָעוֹלָם לֹא נִבְרָא אֶלָּא בִּשְׁבִילִי",
                  ref: "Sanhedrín 37a · LM I:5:1",
                  es: "«Todo el mundo fue creado solo por mí» — por eso debo orar por la falta del mundo. Dos plegarias: antes del decreto, directa; después, vestida en un relato",
                  fa: "«تمامِ جهان تنها به خاطرِ من آفریده شد» — پس باید برای کاستیِ جهان دعا کنم. دو دعا: پیش از حکم، مستقیم؛ پس از آن، پوشیده در روایت",
                },
                {
                  he: "שְׂכַר מִצְוָה מִצְוָה",
                  ref: "Avot 4:2 · LM I:5:2",
                  es: "«La recompensa de una mitzvá es una mitzvá» — quien sirve por el gozo mismo, sin querer paga, ve el espejo claro (זֶה); quien sirve por la paga, el opaco (כֹּה)",
                  fa: "«پاداشِ میتزوا، میتزواست» — آن‌که برای شادیِ خودِ خدمت خدمت می‌کند، آینهٔ روشن (זֶה) را می‌بیند؛ آن‌که برای پاداش، آینهٔ تار (כֹּה) را",
                },
                {
                  he: "לֹא נִבְרְאוּ רְעָמִים אֶלָּא לְפַשֵּׁט עַקְמוּמִיּוּת שֶׁבַּלֵּב",
                  ref: "Berajot 59a · LM I:5:3",
                  es: "«Los truenos solo fueron creados para enderezar la torcedura del corazón» — y el trueno es la voz de la plegaria que golpea las nubes de la mente",
                  fa: "«رعدها تنها برای راست‌کردنِ کژیِ قلب آفریده شدند» — و رعد، صدایِ دعاست که ابرهایِ ذهن را می‌کوبد",
                },
                {
                  he: "חָמֵץ → מַצָּה",
                  ref: "Zohar III 252a · LM I:5:4",
                  es: "Vaciar la mente del jametz —sabidurías ajenas, pensamientos extraños— y volverlo matzá: «rompe la caña de la ḥet y hazla he»",
                  fa: "تهی‌کردنِ ذهن از خامِتز —حکمت‌های بیگانه، اندیشه‌های نامحرم— و بازگرداندنش به مَتزا: «نیِ حِت را بشکن و آن را هِی کن»",
                },
                {
                  he: "מַיִם רַבִּים לֹא יוּכְלוּ לְכַבּוֹת אֶת הָאַהֲבָה",
                  ref: "Shir haShirim 8:7 · LM I:5:5",
                  es: "Unir las guevurot (severidades) con los jasadim (bondades), temor con amor: «muchas aguas no pueden apagar el amor»",
                  fa: "پیوندِ گِوورُت (شدت‌ها) با حَسادیم (مهرها)، ترس با عشق: «آب‌هایِ بسیار نمی‌توانند عشق را خاموش کنند»",
                },
                {
                  he: "רֵאשִׁית חָכְמָה יִרְאַת ה׳",
                  ref: "Tehilim 111:10 · LM I:5:6–7",
                  es: "En el relato de Rabá bar bar Janá: el temor precede a todo («el barco lo precedió»), y la voz liberada abre el salmo entero — trueno, corazón, alegría, tzaddikim",
                  fa: "در حکایتِ رَبا بَربَر حَنا: ترس بر همه چیز پیشی می‌گیرد («کشتی پیش افتاد»)، و صدایِ آزادشده تمامِ مزمور را می‌گشاید — رعد، قلب، شادی، تزَدیقیم",
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
                    ? "انسان موظف است برای اصلاحِ تمامِ جهان دعا کند. اما دعا دو زمان دارد. تا حکم مُهر نشده، مستقیم دعا می‌کنی. همین‌که مُهر شد، دعایِ آشکار دیگر بالا نمی‌رود: باید آن را در روایتی به‌ظاهر بی‌گناه بپوشانی، تا نیروهایِ سِتَمگر بازش نشناسند و سدِ راهش نشوند."
                    : "El hombre está obligado a orar por la reparación del mundo entero. Pero la plegaria tiene dos tiempos. Mientras el decreto no ha sido sellado, se reza directo. Una vez sellado, la plegaria abierta ya no sube: hay que envolverla en un relato aparentemente inocente, para que las fuerzas acusadoras no la reconozcan ni la bloqueen."}
                </p>
                <p>
                  {fa
                    ? "و از کجا بدانی در کدام زمانی؟ از شادی‌ات هنگامِ میتزوا: اگر در میتزوایی نتوانی شاد شوی، همان‌جا حکم فرود آمده. اما پیش‌شرطِ آن شادی، قلبی راست‌شده است — و آنچه قلب را راست می‌کند، صدایِ رعدآسایِ دعایی است که با نیرویی پاک، از ذهنی بی‌خامِتز و ترسی راستین، گفته شود."
                    : "¿Y cómo saber en qué tiempo estás? Por tu alegría al cumplir las mitzvot: si no puedes alegrarte en cierta mitzvá, allí cayó el decreto. La condición previa de esa alegría es un corazón enderezado — y lo que endereza el corazón es la voz-trueno de una plegaria dicha con fuerza pura, desde una mente sin jametz y un temor verdadero."}
                </p>
              </div>
            </div>

            {/* Remez */}
            <div className="mb-8">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>רֶמֶז</span>
                {fa ? "رِمِز — رمز و نمادها" : "Remez — alusiones y correspondencias"}
              </h4>
              <div className="mb-4 space-y-3 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                <p>
                  {fa
                    ? "زنجیرهٔ صدا ← رعد ← قلب یک زنجیرهٔ سِفیروت است: صدا از پایین برمی‌خیزد و «جمجمهٔ مغز» را می‌کوبد (خُخما/بینا)، و از آن ضربه، «سپیدیِ مغز» (لِوانون، شیرِ هَشیریم ۴:۱۵) قطره‌قطره فرومی‌ریزد. رعدِ حاصل، «گِوورا از جانبِ اسحاق» است — و شوفار، «قوچِ اسحاق» (زوهر ۳:۲۳۵ب)."
                    : "La cadena voz → trueno → corazón es una cadena de sefirot: la voz sube desde abajo y golpea «el cráneo de la mente» (Jojmá/Biná), y de ese golpe desciende gota a gota la «blancura de la mente» (Levanón, Shir haShirim 4:15). El trueno resultante es «guevurá del lado de Itzjak» — y el shofar es «el carnero de Itzjak» (Zohar III 235b)."}
                </p>
                <p>
                  {fa
                    ? "و اصلاحِ قلب از یک حرف می‌گذرد: نیِ (קָנֶה) حِت (ח) را بشکن و آن را هِی (ה) کن — خامِتز (חָמֵץ) را مَتزا (מַצָּה) کن؛ تنها تفاوت، پایِ بستهٔ ح در برابرِ گشودگیِ ה است. رازِ متن در «نُتاریکون» (سرواژه‌ها) مُهر خورده، نه در عدد:"
                    : "Y la reparación del corazón pasa por una letra: rompe la caña (קָנֶה) de la ḥet (ח) y hazla he (ה) — vuelve el jametz (חָמֵץ) en matzá (מַצָּה); la sola diferencia es la pierna cerrada de la ḥet frente a la abertura de la he. El secreto del texto queda sellado en notaricón (acrósticos), no en número:"}
                </p>
              </div>
              {/* Tabla de notaricón */}
              <div className="overflow-hidden rounded-xl border border-gold/15" style={{ background: "rgba(14,12,22,0.8)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: `${C}18` }}>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "کلمه" : "Palabra"}</th>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "ترکیب" : "Composición"}</th>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "معنا" : "Sentido"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        l: "תֵּבֵל",
                        comp: "תָּו + לֵב",
                        corr: fa ? "«نشان» + «قلب»: رعد چون نشانی بر قلب حک می‌شود (یِخِزکِل ۹:۴)" : "«marca» + «corazón»: el trueno se graba como marca en el corazón (Yejezkel 9:4)",
                      },
                      {
                        l: "נָבִיא",
                        comp: "יָבֹא בְרִנָּה נֹשֵׂא אֲלֻמּוֹתָיו",
                        corr: fa ? "سرواژه‌هایِ تِهیلیم ۱۲۶:۶ — همان حروفِ «نبی»؛ پاداشِ دور = آینهٔ تار" : "iniciales de Tehilim 126:6 — las letras de «profeta»; la paga a lo lejos = espejo opaco",
                      },
                      {
                        l: "אגל\"א",
                        comp: "אַתָּה גִּבּוֹר לְעוֹלָם אֲדֹנָי",
                        corr: fa ? "نامِ گِوورُت (زوهر) — «تو تا ابد نیرومندی، اَدونای»: نیرویی که مردگان را زنده می‌کند" : "Nombre de las guevurot (Zohar) — «Tú eres poderoso para siempre, Adonai»: la fuerza que resucita",
                      },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-gold/10">
                        <td className="p-3">
                          <span className="hebrew text-lg font-bold" style={{ color: C }}>{row.l}</span>
                        </td>
                        <td className="p-3">
                          <span className="hebrew text-sm" style={{ color: `${C}cc` }}>{row.comp}</span>
                        </td>
                        <td className="p-3 text-xs text-parchment/70">{row.corr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs italic text-parchment/50" dir={fa ? "rtl" : "ltr"}>
                {fa
                  ? "این تورا با «نُتاریکون» و ترکیبِ حروف کار می‌کند، نه با گماتریایِ عددی — به همین سبب هیچ عددی به آن نمی‌افزاییم که متن نمی‌طلبد."
                  : "Esta Torá trabaja con notaricón y composición de letras, no con gematría numérica — por eso no añadimos ningún número que el texto no reclama."}
              </p>
            </div>

            {/* Drash */}
            <div className="mb-8">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>דְּרָשׁ</span>
                {fa ? "دراش — آموزشِ عملی و صدایِ جسیدی" : "Drash — enseñanza práctica y voz jasídica"}
              </h4>
              <div className="space-y-4 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                <p>
                  {fa
                    ? "اینجا قلبِ جسیدیسمِ بعل‌شم‌طوو می‌تپد: خدا را برای خودِ شادیِ خدمت خدمت کن، نه برای مزد. ربه دو جان را در یک انسانِ دیندار تمیز می‌دهد: آن که «برای گرفتنِ مزد در عالَمِ آینده» عمل می‌کند — و اگر مزد را از او بگیرند، دیگر عمل نمی‌کند — و آن که چنان در میتزوا می‌سوزد که هر پاداشی را پس می‌زند، چون عالَمِ آینده‌اش هم‌اکنون درونِ همان میتزواست. اولی خدا را از دور می‌بیند، تار؛ دومی از نزدیک، روشن."
                    : "Aquí late el corazón del jasidismo del Baal Shem Tov: sirve a Dios por el gozo mismo del servicio, no por la paga. El Rebbe distingue dos almas dentro de un mismo hombre religioso: la que cumple «para cobrar en el Mundo Venidero» —y que, si le quitaran la paga, no cumpliría— y la que arde tanto en la mitzvá que rechaza toda recompensa, porque su Mundo Venidero ya está dentro de la mitzvá. La primera ve a Dios de lejos, opaco; la segunda, de cerca, nítido."}
                </p>
                <div className="rounded-xl border p-4" style={{ borderColor: `${C}30`, background: `${C}06` }}>
                  <p className="text-sm font-semibold text-parchment/90" dir={fa ? "rtl" : "ltr"}>
                    {fa
                      ? "«اگر ذهنت آسیب ندیده بود، هرگز به شنیدنِ نزاعِ میانِ تزَدیقیم نمی‌رسیدی» — سر و صدایِ ستیزی که بیرون می‌شنوی، در حقیقت توبیخی است رو به قطرهٔ لکه‌دارِ ذهنِ خودت. جهانِ بیرون تو را از درون می‌خوانَد."
                      : "«Si tu mente no estuviera dañada, no habrías llegado a oír las disputas entre los tzaddikim.» El ruido del conflicto que percibes afuera es en realidad una reprensión dirigida a la gota manchada de tu propia mente. El mundo exterior te está leyendo por dentro."}
                  </p>
                </div>
                <p>
                  {fa
                    ? "و وارونگیِ جسیدیِ شگفت: نزاع‌هایِ میانِ صدیقان، پیامی برای توست — دعوتی به بازگشت از خامِتز به مَتزا، «از مرگ به زندگی» (مِشلی ۱۵:۳۱)."
                    : "Y el vuelco jasídico asombroso: las peleas entre los justos son un mensaje para ti — una invitación a volver del jametz a la matzá, «de la muerte a la vida» (Mishlé 15:31)."}
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
                    ? "ربه تمامِ تورا را با زوهر می‌بافد: صدایی که ابرها را می‌یابد و رعد می‌شود (زوهر ۳:۲۳۵ب)، قوچِ اسحاق، «مَتزوتایِ صدیقان بر ضدِ سیترا آخرا». اما عصبِ لوریانی/زوهری، همان «شیتوف» است — درآمیختنِ گِوورُت در حَسادیم. گِوورایِ تنها، داوریِ محض است، حکم، مرگ؛ اما همین گِوورا چون درونِ حِسِد پوشیده شود، رعدی آشکارگر می‌شود که ویران نمی‌کند، بلکه می‌گشاید."
                    : "El Rebbe teje toda la Torá con el Zohar: la voz que encuentra las nubes y se vuelve trueno (Zohar III 235b), el carnero de Itzjak, el «matzutá de los tzaddikim contra la Sitra Ajra». Pero el nervio luriano/zóhari es el shituf — el acoplamiento de guevurot en jasadim. La guevurá sola es juicio puro, decreto, muerte; encerrada dentro del jésed se vuelve trueno revelador que no destruye sino que abre."}
                </p>
                <div className="rounded-xl border border-gold/15 p-5 space-y-3" style={{ background: "rgba(14,12,22,0.8)" }}>
                  <div dir="rtl" className="text-center">
                    <p className="hebrew text-base font-bold text-gold mb-1">אַתָּה גִּבּוֹר לְעוֹלָם אֲדֹנָי</p>
                    <p className="font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                      {fa ? "אגל\"א · دومین برکتِ عَمیدا" : "אגל\"א · 2ª bendición de la Amidá"}
                    </p>
                    <p className="mt-2 text-sm italic text-parchment/70" dir={fa ? "rtl" : "ltr"}>
                      {fa
                        ? "«تو تا ابد نیرومندی، اَدونای» — «تو مردگان را زنده می‌کنی»: نیرویی که، اگر خوب مهار شود، قلب را با راست‌کردنش زنده می‌کند."
                        : "«Tú eres poderoso para siempre, Adonai» — «Tú resucitas a los muertos»: la fuerza que, bien contenida, resucita el corazón enderezándolo."}
                    </p>
                  </div>
                </div>
                <p>
                  {fa
                    ? "و به زبانِ بعل‌هَسولام: «خواستنِ گرفتن برای گرفتن» (مزدِ عالَمِ آینده) وارونه می‌شود به «گرفتن برای دادن» — شادی در خودِ میتزوا همان لحظه‌ای است که «کلی» دیگر از خدا مزد نمی‌طلبد و به شادیِ خودِ او درمی‌آید: «یِسمَح یسرائل بعوسایو» (تِهیلیم ۱۴۹:۲)."
                    : "Y en clave de Baal HaSulam: el «querer recibir para recibir» (paga del Olam Habá) se invierte en «recibir para dar» — el gozo en la mitzvá misma es el instante en que el keli deja de cobrarle a Dios y entra en Su propia alegría: «Yismaj Israel be'Osav» (Tehilim 149:2)."}
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
                  es: "Tu plegaria no es un pedido que sube y espera respuesta. Es una voz física que, si sale de una mente limpia y un temor verdadero, golpea el cielo del cráneo y regresa como trueno sobre tu propio corazón. No rezas para que algo cambie allá; rezas y el trueno cambia algo aquí: endereza lo torcido dentro de ti.",
                  fa: "دعایِ تو درخواستی نیست که بالا برود و منتظرِ پاسخ بماند. صدایی فیزیکی است که، اگر از ذهنی پاک و ترسی راستین بیرون آید، آسمانِ جمجمه را می‌کوبد و همچون رعدی بر قلبِ خودت بازمی‌گردد. دعا نمی‌کنی تا چیزی آن‌جا دگرگون شود؛ دعا می‌کنی و رعد چیزی را این‌جا دگرگون می‌کند: کژی‌ات را راست می‌کند.",
                },
                {
                  n: "02",
                  es: "La señal de que estás listo no es la solemnidad: es la alegría. Si puedes alegrarte cumpliendo, el decreto todavía no cayó sobre esa parte de ti. Donde no logras alegrarte, ahí duele el juicio. Tu gozo es un instrumento de diagnóstico del alma.",
                  fa: "نشانهٔ آمادگی‌ات وقار نیست: شادی است. اگر بتوانی در انجامِ میتزوا شاد شوی، حکم هنوز بر آن بخش از تو فرود نیامده. هر جا نتوانی شاد شوی، همان‌جا داوری درد می‌کند. شادیِ تو ابزارِ تشخیصِ جان است.",
                },
                {
                  n: "03",
                  es: "Vaciar el jametz no es un rito de Pésaj: es soltar, por un instante, el cálculo y el provecho. Las sabidurías ajenas, los miedos prestados, los pensamientos que no son tuyos — todo eso apaga la voz. Cuando la mente queda sin jametz, la voz sale limpia, y solo una voz limpia se vuelve trueno.",
                  fa: "تهی‌کردنِ خامِتز آیینِ پِسَح نیست: رهاکردنِ محاسبه و سود است، برایِ یک لحظه. حکمت‌های بیگانه، ترس‌هایِ عاریتی، اندیشه‌هایی که از آنِ تو نیستند — همه صدا را خاموش می‌کنند. وقتی ذهن بی‌خامِتز شود، صدا پاک بیرون می‌آید، و تنها صدایِ پاک رعد می‌شود.",
                },
                {
                  n: "04",
                  es: "Y cuando el decreto ya está sellado y la puerta directa se cerró, no todo está perdido — hay una segunda puerta. Se entra vistiendo la plegaria en un relato. Cuando ya no puedes pedir de frente, cuentas una historia; y dentro de la historia, escondida de los acusadores, va la súplica entera. El temor va primero; el amor lo sale a buscar, como el dueño busca lo que perdió.",
                  fa: "و هنگامی که حکم مُهر شده و درِ مستقیم بسته است، همه چیز از دست نرفته — دری دوم هست. با پوشاندنِ دعا در روایتی وارد می‌شوی. وقتی دیگر نمی‌توانی رو در رو بخواهی، حکایتی می‌گویی؛ و درونِ حکایت، پنهان از سِتَمگران، تمامِ نیایش می‌رود. ترس نخست می‌آید؛ عشق به جست‌وجویش بیرون می‌رود، چنان که صاحب گمشده‌اش را می‌جوید.",
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
                {fa ? "شَباتِ صدا و شادی" : "«El Shabbat de la voz y la alegría»"}
              </p>
            </div>

            <div className="space-y-4" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  n: "1",
                  label: fa ? "یک برکت را برگزین" : "Elige una sola berajá",
                  es: "Elige una sola berajá o tefilá de este Shabbat — el Kidush, Lejá Dodí, o una sola línea del Shemá. Una, no muchas.",
                  fa: "یک برکت یا دعایِ این شَبات را برگزین — کیدوش، لِخا دودی، یا تنها یک سطر از شِمَع. یکی، نه بسیار.",
                },
                {
                  n: "2",
                  label: fa ? "خامِتز را تهی کن" : "Vacía el jametz",
                  es: "Antes de empezar, respira y suelta por un minuto los pensamientos de cálculo y provecho, los miedos prestados. Que la mente quede vacía para que la voz salga limpia.",
                  fa: "پیش از آغاز، نفسی بکش و برایِ یک دقیقه اندیشه‌هایِ محاسبه و سود و ترس‌هایِ عاریتی را رها کن. ذهن را تهی کن تا صدا پاک بیرون آید.",
                },
                {
                  n: "3",
                  label: fa ? "با صدایِ بلند، با تنِ واقعی" : "Dila en voz alta, con cuerpo",
                  es: "Dila en voz alta, con fuerza corporal real, buscando una sola cosa: no la recompensa, sino el gozo de estar diciéndola. Que la voz salga como quien quiere que truene.",
                  fa: "آن را با صدایِ بلند بگو، با نیرویِ تنیِ واقعی، در جست‌وجویِ تنها یک چیز: نه پاداش، بلکه شادیِ گفتنش. صدا را چنان بیرون بده که گویی می‌خواهی رعد شود.",
                },
                {
                  n: "4",
                  label: fa ? "بپرس: آیا شاد شدم؟" : "Pregúntate: ¿pude alegrarme?",
                  es: "Al terminar, en silencio: «¿pude alegrarme aquí?». Esa respuesta te dice sobre qué parte de tu semana pesa el decreto — y sobre cuál ya eres libre.",
                  fa: "در پایان، در سکوت: «آیا این‌جا توانستم شاد شوم؟». آن پاسخ به تو می‌گوید حکم بر کدام بخش از هفته‌ات سنگینی می‌کند — و بر کدام، هم‌اکنون آزادی.",
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
                {fa ? "مِیدا برای کار کردن:" : "Midá a trabajar:"}
              </span>
              <span className="ml-2">{fa ? "خدمت برای خودِ شادیِ خدمت — نه برای مزد" : "servir por el gozo mismo del servicio — no por la paga"}</span>
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
                    es: "La Torá 5 no habla de trompetas de metal: habla de tu voz. Dicha con fuerza pura, golpea las nubes de la mente y vuelve trueno que endereza la torcedura del corazón — y solo un corazón derecho puede alegrarse.",
                    fa: "تورایِ ۵ از کرنایِ فلزی سخن نمی‌گوید: از صدایِ تو می‌گوید. اگر با نیرویی پاک گفته شود، ابرهایِ ذهن را می‌کوبد و رعدی می‌شود که کژیِ قلب را راست می‌کند — و تنها قلبِ راست می‌تواند شاد شود.",
                  },
                  {
                    icon: "◇",
                    label: fa ? "بینشِ کلیدی" : "Insight clave",
                    es: "La alegría de servir por la mitzvá misma —y no por la paga— es a la vez diagnóstico (te dice dónde cayó el decreto) y llave (te introduce en la alegría de Dios).",
                    fa: "شادیِ خدمت برای خودِ میتزوا —نه برای مزد— هم تشخیص است (به تو می‌گوید حکم کجا فرود آمده) و هم کلید (تو را به شادیِ خدا درمی‌آورد).",
                  },
                  {
                    icon: "○",
                    label: fa ? "بینشِ روحانی" : "Insight espiritual",
                    es: "Guevurá dentro de jésed: la severidad, encerrada en el amor, no mata — resucita. Ese es el Nombre אגל\"א, «Tú resucitas a los muertos».",
                    fa: "گِوورا درونِ حِسِد: شدت، پوشیده در عشق، نمی‌کُشد — زنده می‌کند. این همان نامِ אגל\"א است، «تو مردگان را زنده می‌کنی».",
                  },
                  {
                    icon: "✦",
                    label: fa ? "کاربرد" : "Aplicación",
                    es: "Cuando el decreto ya está sellado, queda la puerta escondida de los justos: vestir la súplica en un relato. Temor primero, amor que lo busca. Saca tu voz con cuerpo, y que truene.",
                    fa: "وقتی حکم مُهر شده، درِ پنهانِ صدیقان می‌ماند: پوشاندنِ نیایش در روایتی. ترس نخست، عشقی که آن را می‌جوید. صدایت را با تن بیرون بده، و بگذار رعد شود.",
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
                <p className="hebrew text-2xl font-bold" style={{ color: C, textShadow: `0 0 16px ${C}66` }}>
                  וְרַעַם גְּבוּרוֹתָיו
                </p>
                <p className="mt-2 font-cinzel text-xs uppercase tracking-widest text-parchment/50">
                  {fa ? "«و رعدِ نیروهایش» — ایوب ۲۶:۱۴" : "«Y el trueno de Sus poderes» — Iyov 26:14"}
                </p>
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

        {/* ── UMBRAL DE NAVEGACIÓN ── */}
        <Section delay={100}>
          <div className="mt-14 text-center">
            <button
              onClick={() => router.push("/estudio?ref=Likutei_Moharan.5")}
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
                { es: "El trueno que endereza el corazón", fa: "رعدی که قلب را راست می‌کند", ref: "Berakhot 59a" },
                { es: "Con trompetas y shofar — el salmo", fa: "با کرناها و شوفار — مزمور", ref: "Psalms 98:6" },
                { es: "La recompensa de una mitzvá es una mitzvá", fa: "پاداشِ میتزوا، میتزواست", ref: "Pirkei Avot 4:2" },
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
