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

export default function PageLikuteiMoharanI4() {
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
              onClick={() => router.push("/estudio?ref=Likutei_Moharan.4")}
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
              {fa ? "شَبات · لیکوتِی موهاران ۱:۴" : "Shabbat · Likutei Moharan I:4"}
            </p>
            <p className="hebrew mb-3 font-bold leading-tight"
              style={{ fontSize: "clamp(30px, 7.5vw, 50px)", color: C, textShadow: `0 0 32px ${C}, 0 0 12px ${C}88` }}>
              אָנֹכִי ה׳ אֱלֹהֶיךָ
            </p>
            <h2 className="mb-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
              {fa ? "هر آنچه بر تو می‌گذرد، به سودِ توست" : "Todo lo que te sucede es para tu bien"}
            </h2>
            <p className="font-cinzel text-xs uppercase tracking-widest text-parchment/50">
              {fa ? "ربه نجمن از برسلوو — بر شِموت ۲۰:۲" : "Rebbe Najman de Breslov — sobre Shemot 20:2"}
            </p>

            {/* Tiles אֶחָד = אַהֲבָה */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Tile he="אֶחָד" sub={fa ? "اِخاد · ۱۳" : "Ejad · 13"} color={C} size={48} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>=</span>
              <Tile he="אַהֲבָה" sub={fa ? "اَهاوا · ۱۳" : "Ahavá · 13"} color="#c9a43e" size={48} />
            </div>
          </div>
        </Section>

        {/* ── TEMA CENTRAL ── */}
        <PullQuote
          es="La misma Mano que te bendice es la que aprieta. Havayá y Elokim son Uno."
          fa_text="همان دستی که برکتت می‌دهد، همان است که فشارت می‌دهد. هَوایا و اِلوهیم یکی هستند."
          fa_active={fa}
          color={C}
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "وقتی کسی می‌داند — نه به زبان، بلکه در دَعَتش — که «هر آنچه بر او می‌گذرد به سودِ اوست» (כָּל מְאֹרְעוֹתָיו לְטוֹבָתוֹ)، این آگاهی طعمِ عالَمِ آینده است. امروز بر خوبی «هَتوو وهَمِتیو» (نیکویی که نیکی می‌کند) برکت می‌گوییم و بر تلخی «دَیّانِ اِمِت» (داورِ راستین)؛ اما در آینده همه چیز «هَتوو وهَمِتیو» خواهد بود، و نامِ هَوایا (رحمت) و نامِ اِلوهیم (داوری) یک وحدتِ یگانه خواهند شد."
                : "Cuando una persona sabe —no de labios, sino en su Daat— que «todo lo que le sucede es para su bien» (kol me'orotav letovató), esa consciencia es un anticipo del Mundo Venidero. Hoy bendecimos «HaTov vehaMetiv» (el Bueno que hace el bien) sobre lo bueno, y «Dayán haEmet» (el Juez veraz) sobre lo amargo; pero en el futuro todo será «HaTov vehaMetiv», y el Nombre Havayá (misericordia) y el Nombre Elokim (juicio) serán ajdut ejad, una sola unidad (Pesajim 50a)."}
            </p>
            <p>
              {fa
                ? "و این وحدت جز با بالا بردنِ مَلخوتِ قداست از تبعیدش به دست نمی‌آید — و مَلخوت تنها با «ویدویِ دِوَریم» (اعترافِ گفته‌شده) نزدِ یک تَلمید حَخام به ریشه‌اش بازمی‌گردد. هر خطا یک ترکیبِ حروفِ منفی بر استخوان‌های آدمی حک می‌کند؛ با اعتراف به دهان، آن حروف از استخوان‌ها بیرون می‌آیند و با همان حروف، مَلخوتِ قداست دوباره ساخته می‌شود."
                : "Esa unidad no se alcanza sino elevando Maljut deKedushá de su exilio — y Maljut sólo retorna a su raíz por medio de vidui devarim, la confesión hablada, ante un Talmid Jajam. Cada transgresión graba un tzeruf (combinación de letras) negativo sobre los huesos del hombre; al confesar con la boca, esas letras salen de los huesos, y con esas mismas letras se reconstruye Maljut deKedushá."}
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
                אָנֹכִי ה׳ אֱלֹהֶיךָ אֲשֶׁר הוֹצֵאתִיךָ מֵאֶרֶץ מִצְרַיִם
              </p>
              <p className="font-cormorant text-base italic text-parchment/80">
                {fa
                  ? "«اَنوخی هَوایا اِلوهِیخا، که تو را از سرزمینِ مصر، از خانهٔ بندگان بیرون آوردم.»"
                  : "«Anojí Havayá tu Elokim, que te saqué de la tierra de Egipto, de la casa de esclavos.»"}
              </p>
              <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                — {fa ? "شِموت (خروج) ۲۰:۲" : "Shemot (Éxodo) 20:2"}
              </p>
            </div>

            <div className="mt-6 space-y-3" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  he: "בַּה׳ אֲהַלֵּל דָּבָר, בֵּאלֹהִים אֲהַלֵּל דָּבָר",
                  ref: "Tehilim 56:11",
                  es: "«Con Havayá alabaré la palabra, con Elokim alabaré la palabra» — se alaba igual con el Nombre de la misericordia y con el del juicio",
                  fa: "«با هَوایا سخن را می‌ستایم، با اِلوهیم سخن را می‌ستایم» — با نامِ رحمت و با نامِ داوری، هر دو یکسان ستوده می‌شود",
                },
                {
                  he: "יִהְיֶה ה׳ אֶחָד וּשְׁמוֹ אֶחָד",
                  ref: "Zejaryá 14:9",
                  es: "«Havayá será Uno y Su Nombre Uno» — en el futuro, misericordia y juicio se revelan como una sola unidad",
                  fa: "«هَوایا یکی خواهد بود و نامش یکی» — در آینده، رحمت و داوری یک وحدتِ یگانه آشکار می‌شوند",
                },
                {
                  he: "עַל עַצְמוֹתָם",
                  ref: "Yejezkel 32:27",
                  es: "«Sobre sus huesos» — cada falta graba un tzeruf de letras sobre los huesos del hombre",
                  fa: "«بر استخوان‌هایشان» — هر خطا ترکیبِ حروفی را بر استخوان‌های آدمی حک می‌کند",
                },
                {
                  he: "כָּל עַצְמֹתַי תֹּאמַרְנָה",
                  ref: "Tehilim 35:10",
                  es: "«Todos mis huesos dirán» — la confesión hablada extrae de los huesos las letras grabadas",
                  fa: "«همهٔ استخوان‌هایم خواهند گفت» — اعترافِ گفته‌شده حروفِ حک‌شده را از استخوان‌ها بیرون می‌کشد",
                },
                {
                  he: "אֶת אֲשֶׁר יֶאֱהַב ה׳ יוֹכִיחַ",
                  ref: "Mishlé 3:12",
                  es: "«A quien Havayá ama, reprende» — incluso el juicio es amor",
                  fa: "«هرکه را هَوایا دوست دارد، توبیخ می‌کند» — حتی داوری نیز عشق است",
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
                    ? "ربه نجمن اولین فرمان را نه یک دستور، بلکه یک وعدهٔ آگاهی می‌خواند: «من، هَوایا، اِلوهیمِ تو هستم.» همان دهانی که رحمت است (هَوایا)، همان است که داوری است (اِلوهیم) — و هر دو «اَنوخی» («من») هستند."
                    : "Rebbe Najman lee el primer mandamiento no como una orden sino como una promesa de consciencia: «Yo, Havayá, soy tu Elokim.» La misma Boca que es misericordia (Havayá) es la que es juicio (Elokim) — y ambas son «Anojí» («Yo»)."}
                </p>
                <p>
                  {fa
                    ? "راهِ عملی برای رسیدن به این «دانستن» فلسفی نیست، بلکه رابطه‌ای و گفته‌شده است: به یک استادِ راستین نزدیک شو، او را نگه دار، و آنچه بر دوش می‌کشی را با صدایِ بلند به او بگو. اعترافِ گفته‌شده نزدِ حَخام، همان سازوکارِ عینی است که با آن، داوری همچون عشق آشکار می‌شود. این خودآزاری نیست: بیرون کشیدنِ حروفی است که در استخوان‌ها مانده‌اند و بازگرداندنشان به فرمِ مقدسشان."
                    : "El camino práctico para llegar a saber esto no es filosófico sino relacional y hablado: acercarte a un maestro verdadero, sostenerlo, y decirle en voz alta lo que cargas. La confesión hablada ante el sabio es el mecanismo concreto por el cual el juicio se revela como amor. No es autoflagelación: es sacar de los huesos las letras que allí quedaron grabadas y devolverlas a su forma sagrada."}
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
                    ? "دو نام: هَوایا (י-ה-ו-ה) = رحمت، آنچه از زمان فراتر است. اِلوهیم = داوری و مَلخوت، حضوری که درونِ جهان و زمان فرمان می‌راند. آووداهِ این تورا آن است که این دو نام «وحدتِ یگانه» شوند. و اندامِ این یگانگی، دَعَت است: «اصلِ دَعَت، اتحادِ خیرها و شدت‌هاست» — یعنی میان جِسِد و دین جدایی نینداختن."
                    : "Los dos Nombres: Havayá (י-ה-ו-ה) = rajamim, lo que trasciende el tiempo. Elokim = din y Maljut, la Presencia que gobierna dentro del mundo y del tiempo. La avodá de esta Torá es que ambos Nombres se vuelvan «ajdut ejad». Y el órgano de esa unificación es Daat: «la esencia del Daat es la unión de bondades y severidades» — no dividir entre jésed y din."}
                </p>
                <p>
                  {fa
                    ? "و راز، در گماتریایِ خودِ متن مُهر خورده است:"
                    : "Y el secreto queda sellado en la gematría del propio texto:"}
                </p>
              </div>
              {/* Tabla de gematría */}
              <div className="overflow-hidden rounded-xl border border-gold/15" style={{ background: "rgba(14,12,22,0.8)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: `${C}18` }}>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "کلمه" : "Palabra"}</th>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "معنا" : "Significado"}</th>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "حساب" : "Cálculo"}</th>
                      <th className="p-3 font-cinzel text-xs uppercase tracking-widest text-parchment/50 text-left">{fa ? "ارزش" : "Valor"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { l: "אֶחָד", corr: fa ? "یگانه / وحدت" : "Uno / Unidad", calc: "1+8+4", val: "13" },
                      { l: "אַהֲבָה", corr: fa ? "عشق" : "Amor", calc: "1+5+2+5", val: "13" },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-gold/10">
                        <td className="p-3">
                          <span className="hebrew text-lg font-bold" style={{ color: C }}>{row.l}</span>
                        </td>
                        <td className="p-3 text-xs text-parchment/70">{row.corr}</td>
                        <td className="p-3 font-cinzel text-xs text-parchment/60">{row.calc}</td>
                        <td className="p-3 font-cinzel text-xs font-bold" style={{ color: `${C}cc` }}>{row.val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs italic text-parchment/50" dir={fa ? "rtl" : "ltr"}>
                {fa
                  ? "اِخاد («یگانه») و اَهاوا («عشق») هر دو ارزشِ ۱۳ دارند. معنا دقیق است: وحدتِ هاشم، همان عشقِ اوست؛ به همین سبب حتی توبیخِ او نیز عشق است — «هرکه را دوست دارد، توبیخ می‌کند» (مِشلی ۳:۱۲)."
                  : "Ejad («Uno») y ahavá («amor») comparten el valor 13. El sentido es exacto: la Unidad de HaShem es Su amor; por eso incluso Su reproche es amor — «a quien ama, reprende» (Mishlé 3:12)."}
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
                    ? "اینجا آموزشِ بعل‌شم‌طوو دربارهٔ هَشگاجا پراتیت (تدبیرِ خاص) یکپارچه می‌شود: هیچ برگی از درخت نمی‌افتد مگر به فرمانِ آسمان، و هر چیزی که به آدمی می‌رسد، پیامی است که به او فرستاده شده. ربه نجمن به این ایمان رادیکال‌ترین شکل و سازوکارش را می‌دهد: کافی نیست باور کنی «همه به سودِ من است» (گَم زو لِطووا)؛ ربه می‌خواهد این باور به دَعَت — دانشِ استوار — بدل شود."
                    : "Aquí se integra la enseñanza del Baal Shem Tov sobre hashgajá pratit (providencia particular): no hay hoja que caiga del árbol sin decreto del Cielo, y cada cosa que roza al hombre es un mensaje dirigido a él. Rebbe Najman le da a esa fe su versión más radical y su mecanismo: no basta con creer que «todo es para bien» (gam zu letová); el Rebbe pide que se convierta en Daat, en conocimiento asentado."}
                </p>
                <div className="rounded-xl border p-4" style={{ borderColor: `${C}30`, background: `${C}06` }}>
                  <p className="text-sm font-semibold text-parchment/90" dir={fa ? "rtl" : "ltr"}>
                    {fa
                      ? "کودکِ اندوهگین یا غرقِ در چیزهایِ پوچ، همین که مادرش را می‌بیند، همه چیز را پشتِ سر می‌اندازد و به سویِ او می‌دود — به سویِ ریشه‌اش. تَزَدیک نیز «اِم» است، مادری که اسرائیل را با شیرِ تورایش می‌پروراند. دیدنِ استاد، پیش از یک کلمه، اندوه و میل را شفا می‌دهد."
                      : "El niño triste o absorto en tonterías, apenas ve a su madre, arroja todo detrás de sus hombros y corre hacia ella — hacia su raíz. Así el tzadik es «em», madre que amamanta a Israel con la leche de su Torá. Ver al maestro ya cura la tristeza y el deseo, antes de una sola palabra."}
                  </p>
                </div>
                <p>
                  {fa
                    ? "و ظرافتِ روان‌شناختی: موشه می‌توانست ستایشِ خود را که هر روز در تورا خوانده می‌شود بشنود بی‌آنکه مغرور شود، تنها به سببِ فروتنیِ کاملش — و به همین سبب قدرتِ کفاره داشت. فروتنی زیوری اخلاقی نیست: تواناییِ فنیِ دریافتِ نور بدون تصاحبِ آن است. حَخامی که می‌تواند اعترافت را بشنود بی‌آنکه داوری‌ات کند، همان است که «چون پس‌مانده» (کَه‌شیرَییم) شده — که «اَیین» شده."
                    : "Y el matiz psicológico: Moshé podía oír su propia alabanza leída cada día en la Torá sin envanecerse sólo por su humildad total — y por eso mismo tenía poder para expiar. La humildad no es un adorno moral: es la capacidad técnica de recibir luz sin apropiársela. El sabio que puede oírte confesar sin juzgarte es el que se hizo ka-shirayim, «como sobras» — el que se hizo Ayin."}
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
                    ? "رازِ ژرف: مَلخوت همان حروف (אוֹתִיּוֹת) است، و در هر حرف یک رَتزون (اراده) از اِین سوف پوشیده شده که فرم ندارد. بازگرداندنِ مَلخوت به ریشه‌اش، همان زَرقاست که «به جایی که از آن گرفته شد پرتاب می‌شود.»"
                    : "El secreto más hondo: Maljut son las letras (otiyot), y en cada letra se viste un ratzón (voluntad) del Ein Sof, que no tiene forma. Retornar Maljut a su raíz es la zarka que «se arroja al lugar de donde fue tomada»."}
                </p>
                <div className="rounded-xl border border-gold/15 p-5 space-y-3" style={{ background: "rgba(14,12,22,0.8)" }}>
                  <div dir="rtl" className="text-center">
                    <p className="hebrew text-base font-bold text-gold mb-1">רָצוֹא וָשׁוֹב</p>
                    <p className="font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                      {fa ? "یِخِزکِل ۱:۱۴" : "Yejezkel 1:14"}
                    </p>
                    <p className="mt-2 text-sm italic text-parchment/70" dir={fa ? "rtl" : "ltr"}>
                      {fa
                        ? "«دویدن و بازگشتن» — نابودیِ خود در اِین سوف نمی‌تواند دائمی باشد؛ باید دوید و بازگشت."
                        : "«Correr y volver» — la anulación del yo en el Ein Sof no puede ser permanente; hay que correr y volver."}
                    </p>
                  </div>
                </div>
                <p>
                  {fa
                    ? "به همین سبب موشه = اَیین («خرد از نیستی می‌آید»)، و مرگش کلایمکسِ کابالیستیِ تورا است: در شَبات، در مِنحا، در «رَعَوا دِرَعَوین» (ارادهٔ اراده‌ها) درگذشت — چون تمامِ وجودش را نابود کرده بود. «مقابلِ بِیت پِعور» به خاک سپرده شد: پِعور، آن که «دهان می‌گشاید»، دیگر نتوانست بگشاید، چون موشه مَلخوت را تصحیح کرد؛ و «هیچ‌کس گورش را ندانست» — حتی خودِ موشه — چون در اِین سوف نابود شد."
                    : "Por eso Moshé = Ayin («la sabiduría viene de la Nada»), y su desaparición es el clímax cabalístico de la Torá: murió en Shabat, en Minjá, en el raavá deraavín (la Voluntad de las voluntades), porque había anulado todo su ser. Fue enterrado «frente a Beit Peor»: Peor, el que «abre la boca», ya no pudo abrirla, porque Moshé rectificó a Maljut; y «ningún hombre conoció su sepultura» —ni el propio Moshé— porque se anuló en el Ein Sof (Sotá 14a)."}
                </p>
                <p>
                  {fa
                    ? "و اینجا صدایِ بعل‌هَسولام با زبانِ «هیشتَووتِ هَتزورا» (برابریِ فرم) طنین می‌اندازد: نابودی نمی‌تواند دائمی باشد. رَتزو (دویدن به سویِ اِین سوف، از دست دادنِ دَعَت) بی رَتزوِ شوو (بازگشت به یِش، بازیافتنِ دَعَت) نابودی است، نه خدمت. بزرگی در بازگشت است: تنها هنگامِ بازگشت، آدمی رِشیمو — نقشِ آن وحدت — را با خود می‌آورد، و تازه آنگاه می‌داند که هَوایا و اِلوهیم یکی‌اند: همه چیز خوب است و همه چیز یکی است."
                    : "Y aquí resuena Baal HaSulam con su lenguaje de hishtavut hatzurá (equivalencia de forma): la anulación no puede ser permanente. El ratzó (correr hacia el Ein Sof, perder el Daat) sin el Shov (volver al yesh, recuperar el Daat) sería la aniquilación, no el servicio. La grandeza está en el regreso: sólo al volver, el hombre trae consigo el reshimú —la impronta de aquella unidad— y recién entonces sabe que Havayá y Elokim son Uno: todo es bueno y todo es Uno."}
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
                  es: "Todo lo que hoy te dolió tiene una forma de letra. Cada golpe que no entendiste está escrito, ahora mismo, sobre tus huesos —no como castigo eterno, sino como tzeruf que espera ser dicho. El Rebbe no te pide fingir que lo amargo es dulce. Te pide algo más lento y más verdadero: saberlo.",
                  fa: "هر آنچه امروز به تو درد داد، فرمِ یک حرف دارد. هر ضربه‌ای که نفهمیدی، همین حالا بر استخوان‌هایت نوشته شده — نه چون مجازاتِ ابدی، بلکه چون ترکیبِ حروفی که منتظرِ گفته‌شدن است. ربه از تو نمی‌خواهد وانمود کنی که تلخی شیرین است. چیزی آهسته‌تر و راستین‌تر می‌خواهد: بدانی‌اش.",
                },
                {
                  n: "02",
                  es: "La misma Mano que te sostiene en la bendición es la que aprieta en el juicio, y ambas son Anojí — «Yo». Elokim no es otro dios frente a Havayá: es Su rostro dentro del tiempo, dentro de tu semana, dentro de esta pérdida concreta.",
                  fa: "همان دستی که تو را در برکت نگه می‌دارد، همان است که در داوری فشار می‌دهد، و هر دو «اَنوخی» — «من» — هستند. اِلوهیم خدایی دیگر در برابرِ هَوایا نیست: چهرهٔ اوست درونِ زمان، درونِ هفته‌ات، درونِ همین فقدانِ مشخص.",
                },
                {
                  n: "03",
                  es: "Si no puedes saberlo solo —y casi nunca se puede solo—, el camino no es más pensamiento. Es una boca que habla ante un rostro que escucha. El niño triste ve a su madre y suelta todo. No razona; corre. Tu tristeza, tus deseos, tu palabrería, tu orgullo se disuelven cuando te acercas a alguien que se hizo Ayin y le entregas en voz alta lo que ni a ti mismo te atrevías a nombrar.",
                  fa: "اگر نمی‌توانی تنها بدانی‌اش — و تقریباً هرگز تنها نمی‌شود —، راه، اندیشهٔ بیشتر نیست. دهانی است که در برابرِ رویی شنوا سخن می‌گوید. کودکِ اندوهگین مادرش را می‌بیند و همه چیز را رها می‌کند. استدلال نمی‌کند؛ می‌دود. اندوه، میل، وراجی و غرورت آب می‌شوند وقتی به کسی که «اَیین» شده نزدیک می‌شوی و آنچه را حتی به خود جرأتِ نام‌بردنش نداشتی، با صدایِ بلند به او می‌سپاری.",
                },
                {
                  n: "04",
                  es: "La unificación de los Nombres no ocurre en el cielo. Ocurre en tu regreso. Corre hacia la Nada en la oración encendida —pierde el Daat un instante— pero vuelve. Porque es al volver, con la impronta todavía tibia, cuando por fin sabes que todo era Uno, que todo era bueno, que אֶחָד es אַהֲבָה.",
                  fa: "یگانگیِ نام‌ها در آسمان رخ نمی‌دهد. در بازگشتِ تو رخ می‌دهد. در نمازِ شعله‌ور به سویِ نیستی بدو — دَعَت را لحظه‌ای از دست بده — اما بازگرد. چون هنگامِ بازگشت است، با نقشی که هنوز گرم است، که سرانجام می‌دانی همه چیز یکی بود، همه چیز خوب بود، که אֶחָד همان אַהֲבָה است.",
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
                {fa ? "شَباتِ اعتراف و بازگشت" : "«El Shabbat de la confesión y el regreso»"}
              </p>
            </div>

            <div className="space-y-4" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  n: "1",
                  label: fa ? "هیتبودِدوت — ده دقیقه" : "Hitbodedut — diez minutos",
                  es: "Elige un solo suceso amargo de esta semana —una pérdida, un desprecio, un miedo, una caída propia—. No lo pienses en silencio: eso lo deja grabado en el hueso. Apártate diez minutos en Shabat y háblale a HaShem con tu propia boca, en tu idioma, como un hijo a su padre.",
                  fa: "یک رویدادِ تلخِ این هفته را انتخاب کن — یک فقدان، یک تحقیر، یک ترس، یک لغزشِ خودت. در سکوت به آن نیندیش: این آن را بر استخوان حک می‌کند. ده دقیقه در شَبات کناره بگیر و با دهانِ خودت، به زبانِ خودت، چون فرزندی با پدرش، با هاشم سخن بگو.",
                },
                {
                  n: "2",
                  label: fa ? "اعتراف با صدایِ بلند" : "Confesión en voz alta",
                  es: "Dilo entero —«esto me pasó, esto hice, esto temo»— y termina con una sola frase de Daat: «y sé que también esto, de algún modo que aún no veo, es para mi bien, porque me amas».",
                  fa: "همه‌اش را بگو — «این بر من گذشت، این کردم، از این می‌ترسم» — و با یک جملهٔ دَعَت پایان بده: «و می‌دانم که این نیز، به شیوه‌ای که هنوز نمی‌بینم، به سودِ من است، چون مرا دوست داری».",
                },
                {
                  n: "3",
                  label: fa ? "سه گام به سویِ تَزَدیک" : "Los tres pasos hacia el tzadik",
                  es: "Si tienes un maestro, un rav, un amigo-sabio que se hace «como sobras»: esta semana acércate a él en los tres pasos — velo, sostenlo (tzedaká, aunque sea pequeña), y en el momento justo dile en voz alta una sola cosa verdadera de tu corazón. Ese es el «cruce de caminos» donde se abre tu sendero.",
                  fa: "اگر استادی، یک رَو، یا دوستی-دانا داری که خود را «چون پس‌مانده» می‌کند: این هفته در سه گام به او نزدیک شو — ببینش، نگهش دار (تزداکا، ولو کوچک)، و در لحظهٔ درست، یک چیزِ راستینِ قلبت را با صدایِ بلند به او بگو. آن همان «چهارراهی» است که سِیرت در آن گشوده می‌شود.",
                },
                {
                  n: "4",
                  label: fa ? "بر سرِ سفرهٔ شَبات" : "En la mesa del Shabbat",
                  es: "Al bendecir, ten en mente una intención: «HaTov vehaMetiv al hakol» — el Bueno que hace el bien, sobre todo, como será en el Mundo Venidero. Que este Shabat sea tu anticipo del Mundo Venidero.",
                  fa: "هنگامِ برکت‌گفتن، این نیت را در دل بدار: «هَتوو وهَمِتیو عَل هَکول» — نیکویی که نیکی می‌کند، بر همه چیز، چنان که در عالَمِ آینده خواهد بود. باشد که این شَبات، طعمِ عالَمِ آینده‌ات باشد.",
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
              <span className="ml-2">{fa ? "تبدیلِ سکوتِ درونی به کلامِ گفته‌شده — بیرون کشیدنِ حروف از استخوان" : "convertir el silencio interior en palabra hablada — sacar las letras del hueso"}</span>
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
                    es: "Saber que todo lo que sucede es para bien es ya un sabor del Mundo Venidero, donde Havayá (misericordia) y Elokim (juicio) se revelan como Uno.",
                    fa: "دانستنِ اینکه هر آنچه رخ می‌دهد به سودِ توست، خود طعمی از عالَمِ آینده است — جایی که هَوایا (رحمت) و اِلوهیم (داوری) همچون یکی آشکار می‌شوند.",
                  },
                  {
                    icon: "◇",
                    label: fa ? "بینشِ کلیدی" : "Insight clave",
                    es: "El pecado graba letras sobre los huesos; la confesión hablada ante un sabio-Ayin las extrae y con ellas reconstruye Maljut deKedushá.",
                    fa: "گناه حروفی بر استخوان‌ها حک می‌کند؛ اعترافِ گفته‌شده نزدِ داناییِ-اَیین آن‌ها را بیرون می‌کشد و با آن‌ها مَلخوتِ قداست را بازمی‌سازد.",
                  },
                  {
                    icon: "○",
                    label: fa ? "بینشِ روحانی" : "Insight espiritual",
                    es: "אֶחָד = אַהֲבָה = 13. La Unidad de HaShem es Su amor; por eso incluso Su reproche es amor («a quien ama, reprende»).",
                    fa: "אֶחָד = אַהֲבָה = ۱۳. وحدتِ هاشم همان عشقِ اوست؛ به همین سبب حتی توبیخِ او نیز عشق است («هرکه را دوست دارد، توبیخ می‌کند»).",
                  },
                  {
                    icon: "✦",
                    label: fa ? "کاربرد" : "Aplicación",
                    es: "Habla en voz alta lo que cargas —a HaShem, o ante tu maestro— y séllalo bendiciendo «HaTov vehaMetiv» sobre todo. Corre hacia la Nada, pero vuelve con la impronta: al volver, sabrás que todo era Uno.",
                    fa: "آنچه بر دوش می‌کشی را با صدایِ بلند بگو — به هاشم، یا نزدِ استادت — و آن را با برکتِ «هَتوو وهَمِتیو» بر همه چیز مُهر کن. به سویِ نیستی بدو، اما با نقش بازگرد: هنگامِ بازگشت، خواهی دانست که همه چیز یکی بود.",
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
                  <Tile he="אֶחָד" sub={fa ? "اِخاد · ۱۳" : "Ejad · 13"} color={C} size={38} />
                  <span className="font-cinzel text-2xl" style={{ color: `${C}50` }}>=</span>
                  <Tile he="אַהֲבָה" sub={fa ? "اَهاوا · ۱۳" : "Ahavá · 13"} color="#c9a43e" size={38} />
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

        {/* ── UMBRAL DE NAVEGACIÓN ── */}
        <Section delay={100}>
          <div className="mt-14 text-center">
            <button
              onClick={() => router.push("/estudio?ref=Likutei_Moharan.4")}
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
                { es: "El primer mandamiento — Anojí", fa: "اولین فرمان — اَنوخی", ref: "Exodus 20:2" },
                { es: "Los dos Nombres — Havayá y Elokim", fa: "دو نام — هَوایا و اِلوهیم", ref: "Psalms 56:11" },
                { es: "Correr y volver — ratzó vaShov", fa: "دویدن و بازگشتن — رَتزو وَشوو", ref: "Ezekiel 1:14" },
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
