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

export default function PageLikuteiMoharanI6() {
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
              onClick={() => router.push("/estudio?ref=Likutei_Moharan.6")}
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
              {fa ? "شَبات · لیکوتِی موهاران ۱:۶" : "Shabbat · Likutei Moharan I:6"}
            </p>
            <p className="hebrew mb-3 font-bold leading-tight"
              style={{ fontSize: "clamp(26px, 6.5vw, 46px)", color: C, textShadow: `0 0 32px ${C}, 0 0 12px ${C}88` }}>
              דּוֹם לַה׳
            </p>
            <h2 className="mb-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
              {fa ? "تاجِ آن‌که خاموش می‌مانَد" : "La corona del que calla"}
            </h2>
            <p className="font-cinzel text-xs uppercase tracking-widest text-parchment/50">
              {fa ? "ربه نجمن از برسلوو — بر دِواریم ۳۱:۱۴" : "Rebbe Najman de Breslov — sobre Devarim 31:14"}
            </p>

            {/* Tiles אָדָם = אָלֶף + דֹּם */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Tile he="אָדָם" sub={fa ? "آدام · انسان" : "Adam · hombre"} color={C} size={44} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>=</span>
              <Tile he="אָלֶף" sub={fa ? "آلِف · تاج" : "Álef · corona"} color="#c9a43e" size={44} />
              <span className="font-cinzel text-3xl" style={{ color: `${C}60` }}>+</span>
              <Tile he="דֹּם" sub={fa ? "دُم · خاموشی" : "Dom · silencio"} color="#c9a43e" size={44} />
            </div>
          </div>
        </Section>

        {/* ── TEMA CENTRAL ── */}
        <PullQuote
          es="La sangre y el silencio se escriben con las mismas letras. Entre lo que hierve y lo que calla hay una sola vocal — y en esa distancia se decide si esta hora produce un hombre."
          fa_text="خون و خاموشی با همان حروف نوشته می‌شوند. میانِ آنچه می‌جوشد و آنچه خاموش می‌مانَد تنها یک واکه فاصله است — و در همان فاصله تصمیم گرفته می‌شود که این ساعت انسانی بسازد یا نه."
          fa_active={fa}
          color={C}
        />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "دو گونه حرمت هست. آن‌که در پیِ حرمت می‌دود، به «حرمتِ خدا» نمی‌رسد بلکه به «حرمتِ پادشاهان» — و دربارهٔ آن نوشته است: «و شکوهِ پادشاهان، کاویدنِ کار است» (مِشلی ۲۵:۲). یعنی همه در پیِ او می‌کاوند: «این کیست و چیست که چنین حرمتی می‌گیرد؟» — و با او در می‌افتند. اما آن‌که از حرمت می‌گریزد، حرمتِ الهی می‌یابد، و بر او نوشته است: «شکوهِ خدا، پوشاندنِ کار است»؛ زیرا کاویدن در این حرمت حرام است."
                : "Hay dos honores. Quien persigue el honor no alcanza el honor de Dios sino el «honor de los reyes» — y sobre ese está escrito: «y la gloria de los reyes es cosa que se investiga» (Mishlé 25:2). Es decir: todos investigan tras él, «¿quién es este y cuál es, que recibe semejante honor?», y disputan con él. Pero quien huye del honor alcanza el honor divino, y sobre él está escrito: «la gloria de Dios es cosa que se oculta»; porque sobre ese honor está prohibido investigar."}
            </p>
            <p>
              {fa
                ? "و به این حرمت جز از راهِ تِشووا نمی‌توان رسید. و جانِ تِشووا این است: «چون دشنامِ خود را بشنود، خاموش بمانَد و پاسخ ندهد». زیرا پیش از تِشووا، خونِ حفرهٔ چپِ قلب — جایگاهِ یِتزِر هَرَع — هنوز در تمامِ نیرویش است؛ و درمانش این است که דָּם (خون) را به דֹּם (خاموشی) بگردانَد. یک واکه، و آتشی خاموش می‌شود."
                : "Y a ese honor no se llega sino por teshuvá. Y la esencia de la teshuvá es esta: «cuando escuche su propia humillación, que enmudezca y calle». Porque antes de la teshuvá, la sangre de la cavidad izquierda del corazón —sede del yétzer hará— sigue en pleno vigor; y su remedio es dar vuelta a דָּם (dam, sangre) y convertirla en דֹּם (dom, silencio). Una vocal, y se apaga un incendio."}
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
                כְּבֹד אֱלֹהִים הַסְתֵּר דָּבָר וּכְבֹד מְלָכִים חֲקֹר דָּבָר
              </p>
              <p className="font-cormorant text-base italic text-parchment/80">
                {fa
                  ? "«شکوهِ خدا، پوشاندنِ کار است؛ و شکوهِ پادشاهان، کاویدنِ کار.»"
                  : "«La gloria de Dios es ocultar la cosa; y la gloria de los reyes, investigar la cosa.»"}
              </p>
              <p className="mt-2 font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                — {fa ? "مِشلی (امثال) ۲۵:۲" : "Mishlé (Proverbios) 25:2"}
              </p>
            </div>

            <p className="mt-6 mb-4 text-sm leading-relaxed text-parchment/75" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "ربه نجمن این تورا را چون زنجیری می‌سازد که از یک پرسشِ بسیار عملی آویزان است: وقتی به تو بی‌احترامی می‌کنند، چه می‌کنی؟ حلقه‌هایِ زنجیر چنین‌اند:"
                : "El Rebbe construye esta Torá como una sola cadena colgada de una pregunta muy práctica: ¿qué haces cuando te faltan el respeto? Estos son sus eslabones:"}
            </p>

            <div className="space-y-3" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  he: "לְמַעֵט בִּכְבוֹד עַצְמוֹ וּלְהַרְבּוֹת בִּכְבוֹד הַמָּקוֹם",
                  ref: "Mishlé 25:2 · LM I:6:1",
                  es: "Disminuir el propio honor y aumentar el honor del Lugar. El honor buscado viene con auditoría incluida: quien lo persigue fabrica a sus propios detractores",
                  fa: "کاستن از حرمتِ خویش و افزودن بر حرمتِ مکان. حرمتی که در پیِ آن می‌دوی، بازرسی را با خود می‌آورد: هر که آن را بجوید، منکرانِ خود را می‌سازد",
                },
                {
                  he: "וְעִקַּר הַתְּשׁוּבָה – כְּשֶׁיִּשְׁמַע בִּזְיוֹנוֹ יִדֹּם וְיִשְׁתֹּק",
                  ref: "LM I:6:2",
                  es: "«Y la esencia de la teshuvá es: cuando escuche su propia humillación, que enmudezca y calle.» La teshuvá no empieza en el ayuno — empieza en los tres segundos en que no contestas",
                  fa: "«و جانِ تِشووا این است: چون دشنامِ خود را بشنود، خاموش بمانَد.» تِشووا از روزه آغاز نمی‌شود — از آن سه ثانیه‌ای آغاز می‌شود که پاسخ نمی‌دهی",
                },
                {
                  he: "לֵית כָּבוֹד בְּלֹא כָּ״ף",
                  ref: "Zóhar III 255b · LM I:6:2",
                  es: "«No hay kavod (honor) sin kaf» — y la kaf es Kéter, la Corona: aspecto de אֶהְיֶה («Yo estoy dispuesto a ser») y de la espera (katar, Iyov 36:2)",
                  fa: "«כָּבוֹד بدونِ כָּ״ף نیست» — و کاف همان כֶּתֶר، تاج است: چهرهٔ אֶהְיֶה («من آماده‌ام که باشم») و چهرهٔ انتظار (کاتار، ایوب ۳۶:۲)",
                },
                {
                  he: "שֶׁיַּהֲפֹךְ דַּם לְדֹם",
                  ref: "Tehilim 37:7 · Guitín 7a · LM I:6:2",
                  es: "«Que dé vuelta la sangre y la convierta en silencio.» El rostro oculto de אֶהְיֶה suma דָּם: la humillación es el mismo Nombre mirando al revés",
                  fa: "«خون را بگردانَد و خاموشی کند.» چهرهٔ پنهانِ אֶהְיֶה برابرِ דָּם است: خواری همان نام است که رو برگردانده",
                },
                {
                  he: "תְּשׁוּבָה עַל הַתְּשׁוּבָה הָרִאשׁוֹנָה",
                  ref: "Mishlé 20:9 · Devarim 30:2 · LM I:6:3",
                  es: "Teshuvá sobre la propia teshuvá: no porque la primera fuera falsa, sino porque fue hecha con los ojos de entonces. Por eso el Mundo Venidero es «todo Shabat» — es decir, todo teshuvá",
                  fa: "تِشووا بر تِشووایِ نخستین: نه از آن رو که دروغ بود، بلکه چون با چشمانِ آن روز انجام شد. از این‌روست که عالَمِ آینده «همه شَبات» است — یعنی همه تِشووا",
                },
                {
                  he: "בָּקִי בְּרָצוֹא, בָּקִי בְּשׁוֹב",
                  ref: "Tehilim 139:8 · LM I:6:4, 6:11",
                  es: "Dos peritajes: perito en correr y perito en volver. No pararse cuando subes; no desesperar cuando caes — «y si tiendo mi lecho en el Sheol, ahí estás»",
                  fa: "دو مهارت: مهارت در دویدن و مهارت در بازگشتن. در فراز نایستی؛ در فرود نومید نشوی — «و اگر بسترم را در شِئول بگسترم، آن‌جا هم تویی»",
                },
                {
                  he: "אָדָם – אָלֶ״ף דֹּם",
                  ref: "Yejezkel 1:26 · LM I:6:5",
                  es: "«Adam se escribe álef + dom»: por medio de callar ante Dios se forma la álef, y se hace un hombre capaz de sentarse en el trono. Antes de callar hay sangre; después hay un hombre",
                  fa: "«آدام یعنی آلِف + دُم»: با خاموشی در برابرِ خدا آلِف شکل می‌گیرد، و انسانی ساخته می‌شود که تواندِ نشستن بر تخت را دارد. پیش از خاموشی خون است؛ پس از آن، انسان",
                },
                {
                  he: "לָדוּן אֶת כָּל אָדָם לְכַף זְכוּת",
                  ref: "Vayikrá Rabá 2:5 · LM I:6:15",
                  es: "La pieza que impide que todo esto sea tóxico: juzgar a todos para el platillo del mérito. Se calla porque se le encontró el ángulo al otro — «desde donde él ve, tiene razón». Y esa kaf es la kaf de la Corona",
                  fa: "همان قطعه‌ای که نمی‌گذارد این آموزه زهرآگین شود: همه را به کفهٔ شایستگی داوری کن. خاموش می‌مانی چون زاویهٔ دیگری را یافته‌ای — «از آن‌جا که او می‌بیند، حق دارد». و آن کاف، همان کافِ تاج است",
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
                    ? "حرمتی که در پیِ آن می‌دوی، بازرسی را با خود می‌آورد. اگر حرمت را طلب کنی، مردم ناگزیر می‌کاوند که آیا سزاوارش هستی — و رأی می‌دهند که نیستی. خودِ سازوکارِ حرمتِ طلب‌شده است که منکرانت را می‌سازد. اما حرمتِ الهی زیرِ حکمی دیگر است: کاویدن در آن حرام است. هر که آن را بیابد، بی‌محاکمهٔ عمومی می‌یابدش."
                    : "El honor que persigues viene con auditoría incluida. Si andas cobrando honor, la gente inevitablemente investiga si te lo mereces, y decide que no. Es el mecanismo mismo del honor buscado el que produce a tus detractores. El honor divino, en cambio, está bajo otra ley: sobre él está prohibido investigar. Quien lo recibe, lo recibe sin juicio público."}
                </p>
                <p>
                  {fa
                    ? "و راهِ رسیدن به آن تنها تِشوواست — با تعریفی که آدمی را جا می‌خورانَد: تِشووا نه از توبهٔ زبانی آغاز می‌شود و نه از روزه، بلکه از همان لحظه‌ای که می‌شنوی به تو دشنام می‌دهند و پاسخ نمی‌دهی. زیرا خواری اتفاقی نیست: خوانشِ بیرونیِ یک حالِ درونی است — خونِ هنوز داغ در حفرهٔ چپِ قلب."
                    : "Y el único camino hacia él es la teshuvá — con una definición que desconcierta: la teshuvá no empieza en el arrepentimiento verbal ni en el ayuno, sino en el momento exacto en que oyes que te insultan y no contestas. Porque la humillación no es un accidente: es la lectura externa de un estado interno — la sangre todavía caliente en la cavidad izquierda del corazón."}
                </p>
                <p>
                  {fa
                    ? "و ربه به کسی اجازه نمی‌دهد در تِشووایِ خود ساکن شود: باید بر تِشووا نیز تِشووا کرد. نه از آن رو که نخستین دروغ بود، بلکه چون کوچک بود — با چشمانی که آن روز داشتی. و برایِ چنین راه‌رفتنی دو مهارتِ قرینه لازم است: در فراز نایستی، در فرود نومید نشوی."
                    : "Y el Rebbe no deja que nadie se instale en su propia teshuvá: hay que hacer teshuvá sobre la teshuvá. No porque la primera fuera falsa, sino porque fue pequeña — hecha con los ojos que tenías entonces. Y para caminar así hacen falta dos destrezas simétricas: no quedarte quieto cuando subes, no desesperarte cuando caes."}
                </p>
              </div>
            </div>

            {/* Remez */}
            <div className="mb-8">
              <h4 className="mb-3 font-cinzel text-xs uppercase tracking-[0.25em] text-parchment/50">
                <span className="hebrew mr-2 font-bold" style={{ color: C }}>רֶמֶז</span>
                {fa ? "رِمِز — رمز، حروف و شمارها" : "Remez — alusiones, letras y números"}
              </h4>
              <div className="mb-4 space-y-3 text-sm leading-relaxed text-parchment/80" dir={fa ? "rtl" : "ltr"}>
                <p>
                  {fa
                    ? "نامِ אֶהְיֶה دو چهره دارد. از رو می‌گوید «من خواهم بود». از پشت — به روشِ אֲחוֹרַיִם، هجی‌کردنِ پلکانیِ نام — برابرِ דָּם، خون، می‌شود. همان نام است، چرخیده. و تمامِ تورا در یک حرف کشیده می‌شود: אָלֶף — نقطهٔ بالا (تاج)، وَاوِ میانی (رقیع، همان شرم که رنگِ چهره را می‌گردانَد)، و نقطهٔ پایین (خاموشی)."
                    : "El Nombre אֶהְיֶה tiene dos caras. De frente dice «Yo seré». De espaldas —por el método de ajoraim, el deletreo progresivo del Nombre— suma דָּם, sangre. Es el mismo Nombre, girado. Y toda la Torá se dibuja en una sola letra: la álef — punto de arriba (Kéter), vav en el medio (el firmamento, la vergüenza que cambia el color del rostro), punto de abajo (el silencio)."}
                </p>
              </div>

              {/* Tabla de gematrías verificadas */}
              <div className="overflow-hidden rounded-xl border border-gold/15" style={{ background: "rgba(14,12,22,0.8)" }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ background: `${C}18` }}>
                      <th className="p-3 text-left font-cinzel text-xs uppercase tracking-widest text-parchment/50">{fa ? "محاسبه" : "Cuenta"}</th>
                      <th className="p-3 text-left font-cinzel text-xs uppercase tracking-widest text-parchment/50">{fa ? "شمار" : "Valor"}</th>
                      <th className="p-3 text-left font-cinzel text-xs uppercase tracking-widest text-parchment/50">{fa ? "معنا" : "Sentido"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        l: "אהיה → א · אה · אהי · אהיה",
                        n: "1 + 6 + 16 + 21 = 44",
                        corr: fa
                          ? "אֲחוֹרַיִם ِ اِهیه = ۴۴ = דָּם. خواری، همان نام است که رو برگردانده"
                          : "Ajoraim de Ehyé = 44 = דָּם. La humillación es el mismo Nombre mirando al revés",
                      },
                      {
                        l: "אָלֶף + דָּם",
                        n: "1 + 44 = 45 = אָדָם",
                        corr: fa
                          ? "پیش از خاموشی خون است؛ پس از آن، انسان. عددِ انسان دقیقاً می‌نشیند"
                          : "Antes de callar hay sangre; después hay un hombre. El número del hombre cae exacto",
                      },
                      {
                        l: "יב״ק × 2  ·  קס״א + ס״ג",
                        n: "224 = דֶּרֶךְ",
                        corr: fa
                          ? "دو مهارت (בָּקִי، همان حروفِ יב״ק) رویِ هم، «راه» را می‌سازند: راهی جدا از آن دو نیست"
                          : "Los dos peritajes (bakí, mismas letras que Yabok) sumados son el camino: no hay camino aparte de ellos",
                      },
                      {
                        l: "כָּבוֹד  ·  לֵב",
                        n: "32 = 32",
                        corr: fa
                          ? "طنینی از آنِ ما، نه آموزهٔ ربه: حرمت و قلب یک عددند — و کاف را که برداری، تاج می‌رود"
                          : "Resonancia nuestra, no enseñanza del Rebbe: honor y corazón son el mismo número — y si le quitas la kaf, se va la Corona",
                      },
                    ].map((row, i) => (
                      <tr key={i} className="border-t border-gold/10">
                        <td className="p-3">
                          <span className="hebrew text-base font-bold" style={{ color: C }}>{row.l}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-cinzel text-sm" style={{ color: `${C}cc` }}>{row.n}</span>
                        </td>
                        <td className="p-3 text-xs text-parchment/70">{row.corr}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 text-xs italic text-parchment/50" dir={fa ? "rtl" : "ltr"}>
                {fa
                  ? "همهٔ این شمارها حرف‌به‌حرف بازشماری شده‌اند. یک برابریِ دیگر که متن پیش می‌کشد — «یָמִין برابرِ דֶּרֶךְ» — تنها با מִלּוּי و با כּוֹלֵל بسته می‌شود (۲۲۶ در برابرِ ۲۲۷)؛ قراردادی کهن و رواست، اما قرارداد است، و ما آن را چون برابریِ تمیز عرضه نمی‌کنیم."
                  : "Todos estos números fueron recontados letra por letra. Otra igualdad que el texto propone —«yamín equivale a dérej»— solo cierra con miluy y con kolel (226 frente a 227); es una convención antigua y legítima, pero es una convención, y no la presentamos como igualdad limpia."}
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
                    ? "نخست چیزی که باید بلند گفته شود: این تورا ناراحت‌کننده است. «وقتی خوارت کردند خاموش بمان» به گوشِ امروز مثلِ نسخه‌ای برایِ لگدمال‌شدن می‌آید. و نیست — به دلیلی که خودِ ربه در پایانِ متن می‌گذارد، نه در آغازش."
                    : "Lo primero que hay que decir en voz alta: esta Torá es incómoda. «Cállate cuando te humillen» suena hoy a receta para dejarse pisotear. Y no lo es, por una razón que el propio Rebbe pone al final del texto y no al principio."}
                </p>
                <div className="rounded-xl border p-4" style={{ borderColor: `${C}30`, background: `${C}06` }}>
                  <p className="text-sm font-semibold text-parchment/90" dir={fa ? "rtl" : "ltr"}>
                    {fa
                      ? "خاموشی تنها هنگامی کار می‌کند که بر כַּף זְכוּת سوار باشد — بر داوریِ نیکو. خاموشیِ بی‌آن، کینه‌ای فشرده است؛ و فشردنِ کینه تاج نیست: دیگِ زودپز است."
                      : "El silencio solo funciona si va montado sobre kaf zejut, sobre juzgar favorablemente. Un silencio sin eso es rencor comprimido, y comprimir rencor no es Kéter: es una olla a presión."}
                  </p>
                </div>
                <p>
                  {fa
                    ? "ربه چیزی دشوارتر و در عینِ حال رهاننده‌تر از «تحمل‌کردن» می‌خواهد: بیابی که دیگری از کدام زاویه حق داشت. «از آن‌جا که او ایستاده، آنچه گفت معنا دارد.» در همان لحظه که آن زاویه را می‌یابی، دیگر چیزی برایِ پاسخ‌دادن نمانده — نه از سرکوب، بلکه چون مهماتت تمام شد."
                    : "El Rebbe pide algo más difícil y más liberador que aguantarse: encontrar el ángulo desde el cual el otro tenía razón. «Desde donde él está parado, tiene sentido lo que dijo.» En el instante en que encuentras ese ángulo, ya no hay nada que responder — no porque te reprimas, sino porque se te acabó la munición."}
                </p>
                <p>
                  {fa
                    ? "و چرا خاموشی و نه توضیح؟ چون توضیح‌دادن یعنی گشودنِ پروندهٔ حرمتِ خویش برایِ بازرسی. آن‌که از خود دفاع می‌کند، همان می‌کند که حرمت‌جو می‌کند: نامش را رویِ میز می‌گذارد تا وارسی شود. آن‌که خاموش می‌مانَد، نامش را از رویِ میز برمی‌دارد — و آنچه رویِ میز نیست، کاویده نمی‌شود."
                    : "¿Y por qué el silencio y no la explicación? Porque explicar es abrir el expediente del propio honor a la auditoría. El que se defiende hace exactamente lo mismo que el que persigue el honor: pone su nombre sobre la mesa para que lo examinen. El que calla lo retira de la mesa — y lo que no está sobre la mesa no se puede investigar."}
                </p>
                <p>
                  {fa
                    ? "و صدایِ بعل‌شم‌طوو، اینجا به‌راستی به کار می‌آید: هر آنچه آدمی می‌بیند و می‌شنود، اشاره‌ای است برایِ خدمتِ خودِ او. دشنامی که می‌شنوی سر و صدایِ پس‌زمینه نیست؛ خوانشی تشخیصی است. کسی همین حالا با صدایِ بلند به تو گفت چقدر خون در حفرهٔ چپت باقی مانده."
                    : "Y la voz del Baal Shem Tov aquí aplica de verdad: todo lo que un hombre ve y oye es una indicación para su propio servicio. El insulto que oyes no es ruido ambiental: es lectura diagnóstica. Alguien acaba de decirte en voz alta cuánta sangre te queda en la cavidad izquierda."}
                </p>
                <p>
                  {fa
                    ? "و نکته‌ای که امروز عجیب طنین می‌اندازد: هر که با طلبِ حرمت مخاطب می‌سازد، منکرانِ خود را نیز تولید می‌کند. «این خودش را که می‌داند؟» از کارخانه با بسته می‌آید. همان آیهٔ مِشلی، سه هزار سال بعد."
                    : "Y un detalle que hoy resuena raro: quien construye audiencia buscando honor produce a sus propios detractores. Los comentarios de «¿quién se cree este?» vienen de fábrica, incluidos en el paquete. El mismo versículo de Mishlé, tres mil años después."}
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
                    ? "رازِ این تورا این است که حرمت، مسئله‌ای دربارهٔ «چهره» است. تمامِ بنا بر یک تصویر استوار است: הַסְתָּרַת פָּנִים، پوشیده‌شدنِ چهره. نامِ אֶהְיֶה از رو می‌گوید «من خواهم بود» — همان نامی که خدا از میانِ بوتهٔ سوزان به موشه می‌دهد، آن‌گاه که هنوز قومی در کار نیست. از پشت، همان نام برابرِ דָּם است. پس خواری، کیفری از بیرون نیست: پشتِ گردنِ همان وعده است. و درمان، جنگیدن با دشنام نیست، بلکه گردانیدنِ نام: یک واکه، דָּם به דֹּם، و چهره بازمی‌گردد."
                    : "El secreto de esta Torá es que el honor es un problema de rostro. Todo el edificio descansa sobre una sola imagen: hastarát panim, el ocultamiento del rostro. El Nombre אֶהְיֶה de frente dice «Yo seré» —el mismo Nombre que Dios da a Moshé desde la zarza, cuando el pueblo todavía no existe como pueblo—. De espaldas, ese mismo Nombre suma דָּם. La humillación no es un castigo enviado desde fuera: es la nuca de la promesa. Y el remedio no es pelear con el insulto, sino hacer girar el Nombre: una vocal, דָּם → דֹּם, y el rostro vuelve."}
                </p>
                <div className="rounded-xl border border-gold/15 p-5" style={{ background: "rgba(14,12,22,0.8)" }}>
                  <div dir="rtl" className="text-center">
                    <p className="hebrew mb-1 text-base font-bold text-gold">לֵית כָּבוֹד בְּלֹא כָּ״ף</p>
                    <p className="font-cinzel text-[10px] uppercase tracking-widest text-parchment/40">
                      {fa ? "زوهر ۳:۲۵۵ب — به نقلِ خودِ تورا" : "Zóhar III 255b — citado por la propia Torá"}
                    </p>
                    <p className="mt-2 text-sm italic text-parchment/70" dir={fa ? "rtl" : "ltr"}>
                      {fa
                        ? "«כָּבוֹד بدونِ כָּ״ף نیست.» کاف همان تاج است، و تاج آن است که فرازِ اندیشه است: «در آنچه بر تو پوشیده است، مکاو» (حَگیگا ۱۳الف). حرمتِ الهی و تاج یک قانون دارند: کاویده نمی‌شوند."
                        : "«No hay kavod sin kaf.» La kaf es Kéter, y Kéter es lo que está por encima de la mente: «en lo que te está cubierto, no investigues» (Jaguigá 13a). El honor divino y la Corona comparten la misma ley: la de no ser investigados."}
                    </p>
                  </div>
                </div>
                <p>
                  {fa
                    ? "از این‌روست که پیکرِ انسانی که یِخِزکِل بر سنگِ لاجورد می‌بیند، تن نیست — حرفی است تمام‌شده. אָלֶף آن‌گاه کامل می‌شود که نقطهٔ پایینی خاموشی را بیاموزد. تا آدمی پاسخ می‌دهد، آلِف ناتمام است و آنچه می‌مانَد דָּם است تنها: خونِ بی‌تاج، مادّهٔ بی‌صورت. لحظهٔ خاموشی همان لحظه‌ای است که آن خطِ کم‌بود کشیده می‌شود و דם به אדם بدل می‌گردد."
                    : "Por eso la figura humana que Yejezkel ve sobre el zafiro no es un cuerpo — es una letra terminada. La álef se completa cuando el punto de abajo aprende a callar. Mientras el hombre responde, la álef está incompleta y lo que queda es דָּם solo: sangre sin corona, materia sin forma. El instante del silencio es el instante en que se dibuja el trazo que faltaba y דם se convierte en אדם."}
                </p>
                <p>
                  {fa
                    ? "و آخرین تایِ راز، در نسبتِ موشه–یِهوشوعَ است. خورشید باید ماه را روشن کند؛ آموزگار باید در شاگرد بریزد. اما آیهٔ آغاز می‌گوید: «و مَن او را می‌گمارم» — زیرا «در روزِ مرگ، فرمانروایی نیست» (کوهِلِت ۸:۸): در هنگامِ رفتن، صدیق دیگر توانِ روشن‌کردن ندارد و فرمان به قدوسِ متبارک بازمی‌گردد. سخنی است هم‌زمان ویران‌کننده و آرامش‌بخش: جایی می‌رسد که هیچ آموزگاری نمی‌تواند آنچه دارد به تو بسپارد. تنها خاموشیِ خودت آن را می‌سپارد. هیچ‌کس نمی‌تواند به‌جایِ تو خاموش بمانَد."
                    : "Y el último pliegue está en la relación Moshé–Yehoshúa. El sol debe iluminar a la luna; el maestro debe verter en el discípulo. Pero el versículo de apertura dice: «y Yo lo nombraré» — porque «no hay dominio en el día de la muerte» (Kohélet 8:8): en el momento de la partida, el tzadik ya no tiene fuerza para iluminar y el poder vuelve al Santo Bendito Sea. Es a la vez desolador y consolador: llega un punto en que ningún maestro te puede entregar lo suyo. Solo el silencio propio lo entrega. Nadie puede callar por ti."}
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
                  es: "Piensa en la última vez que alguien dijo algo sobre ti y sentiste ese calor exacto subir desde el pecho hasta la garganta. El impulso de aclarar. La frase perfecta que armaste en la cabeza tres segundos después. Ese calor tiene una dirección: viene del lado izquierdo. No es una metáfora que te piden creer — es una descripción de dónde vives cuando te ofenden.",
                  fa: "به آخرین باری بیندیش که کسی چیزی دربارهٔ تو گفت و تو همان گرمایِ دقیق را حس کردی که از سینه تا گلو بالا می‌آید. انگیزهٔ روشن‌کردن. آن جملهٔ کامل که سه ثانیه بعد در سرت ساختی. آن گرما جهتی دارد: از سمتِ چپ می‌آید. استعاره‌ای نیست که از تو بخواهند باورش کنی — توصیفِ آن جایی است که هنگامِ رنجش در آن زندگی می‌کنی.",
                },
                {
                  n: "02",
                  es: "Y ahora observa lo que el estudio te muestra: ese calor no es tu enemigo. Es tu medida. Alguien acaba de decirte, gratis y sin quererlo, cuánta sangre te queda todavía por convertir. El que te humilló no te está atacando: te está leyendo el termómetro.",
                  fa: "و اکنون بنگر به آنچه این مطالعه نشانت می‌دهد: آن گرما دشمنِ تو نیست. اندازهٔ توست. کسی همین حالا، رایگان و ناخواسته، به تو گفت چه اندازه خون برایِ گرداندن باقی مانده. آن‌که خوارت کرد به تو حمله نمی‌کند: دماسنجت را می‌خوانَد.",
                },
                {
                  n: "03",
                  es: "Hay una distancia de una sola vocal entre lo que hierve y lo que se aquieta. Una vocal. Nada más. Y en esa distancia se decide si esta hora de tu vida produce un hombre o solamente produce sangre.",
                  fa: "میانِ آنچه می‌جوشد و آنچه آرام می‌گیرد، تنها یک واکه فاصله است. یک واکه. همین. و در همان فاصله تصمیم گرفته می‌شود که این ساعتِ زندگی‌ات انسانی بسازد یا تنها خون بسازد.",
                },
                {
                  n: "04",
                  es: "Y lo más difícil de todo el estudio: lo que hoy llamas tu arrepentimiento más sincero, algún día te va a dar vergüenza. No porque hayas mentido — porque vas a ver más. Esa vergüenza futura no es una amenaza: es la única prueba de que estás vivo y en camino. Si tu idea de Dios de hace diez años todavía te parece perfecta, no has caminado.",
                  fa: "و دشوارترین بخشِ این مطالعه: آنچه امروز صادقانه‌ترین توبهٔ خود می‌خوانی، روزی شرمنده‌ات خواهد کرد. نه از آن رو که دروغ گفته‌ای — چون بیشتر خواهی دید. آن شرمِ آینده تهدید نیست: تنها گواهِ آن است که زنده‌ای و در راه. اگر تصوّرت از خدا در ده سالِ پیش هنوز بی‌عیب می‌نماید، راه نرفته‌ای.",
                },
                {
                  n: "05",
                  es: "Y una cosa más, la que duele: nadie va a callar por ti. Ni el maestro más grande, ni el libro más profundo, ni este estudio. En el momento de la verdad —cuando la frase te cae encima y tienes tres segundos— estás solo con una vocal en la mano. ¿Qué parte de ti quiere responder? ¿Y a quién le quiere responder de verdad?",
                  fa: "و یک چیزِ دیگر، همان که درد دارد: هیچ‌کس به‌جایِ تو خاموش نخواهد ماند. نه بزرگ‌ترین آموزگار، نه ژرف‌ترین کتاب، نه این مطالعه. در لحظهٔ حقیقت — وقتی آن جمله بر تو فرود می‌آید و سه ثانیه داری — تنهایی، با یک واکه در دست. کدام بخشِ تو می‌خواهد پاسخ دهد؟ و به‌راستی به چه کسی می‌خواهد پاسخ دهد؟",
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 rounded-xl border border-gold/10 p-5"
                  style={{ background: "rgba(14,12,22,0.7)" }}>
                  <span className="shrink-0 pt-0.5 font-cinzel text-xs font-bold" style={{ color: `${C}60` }}>{item.n}</span>
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
                {fa ? "«آزمایشِ سه ثانیه»" : "«El experimento de los tres segundos»"}
              </p>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-parchment/75" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "این شَبات، سرِ سفره، کسی چیزی خواهد گفت که تو را خواهد خراشید. تذکری از خانواده. تصحیحی در برابرِ دیگران. شوخی‌ای با لبهٔ تیز. می‌دانی که رخ خواهد داد — هر شَبات رخ می‌دهد. وقتی رخ داد، دقیقاً این را انجام بده، به همین ترتیب:"
                : "Este Shabbat, en la mesa, alguien va a decir algo que te roce. Un comentario de familia. Una corrección delante de otros. Un chiste con filo. Sabes que va a pasar — pasa todos los Shabbat. Cuando pase, haz exactamente esto, en este orden:"}
            </p>

            <div className="space-y-4" dir={fa ? "rtl" : "ltr"}>
              {[
                {
                  n: "1",
                  label: fa ? "پاسخ نده" : "No respondas",
                  es: "Ni con palabras, ni con la cara. Cuenta hasta siete por dentro, despacio.",
                  fa: "نه با واژه، نه با چهره. در درون، آهسته تا هفت بشمار.",
                },
                {
                  n: "2",
                  label: fa ? "زاویهٔ دیگری را بجو" : "Busca el ángulo del otro",
                  es: "Mientras cuentas, una sola frase dicha hacia adentro: «desde donde él está parado, tiene sentido lo que dijo». No tienes que creerlo del todo. Tienes que buscarlo. Esa búsqueda es la kaf de kaf zejut — el platillo que inclina hacia el mérito.",
                  fa: "حین شمردن، تنها یک جمله رو به درون: «از آن‌جا که او ایستاده، آنچه گفت معنا دارد». لازم نیست تمامش را باور کنی. باید بجویی‌اش. همان جست‌وجو، کافِ כַּף זְכוּת است — کفه‌ای که به سویِ شایستگی می‌چرخد.",
                },
                {
                  n: "3",
                  label: fa ? "گفت‌وگو را چنان ادامه بده که گویی هیچ نشده" : "Sigue la conversación como si nada",
                  es: "Sin cara de mártir. El silencio que se nota no es silencio: es un reproche disfrazado.",
                  fa: "بی‌چهرهٔ شهید. خاموشی‌ای که دیده شود خاموشی نیست: سرزنشی است در لباسِ دیگر.",
                },
                {
                  n: "4",
                  label: fa ? "پیش از هَودالا، یک سطر" : "Antes de Havdalá, una línea",
                  es: "Cuando se acabe el Shabbat, una línea sola —no un diario, una línea— sobre qué pasó por dentro en esos siete segundos.",
                  fa: "چون شَبات به پایان رسید، تنها یک سطر —نه دفترچه، یک سطر— دربارهٔ آنچه در آن هفت ثانیه در درونت گذشت.",
                },
              ].map((item, i) => (
                <div key={i} className="rounded-xl border p-5" style={{ borderColor: `${C}25`, background: "rgba(14,12,22,0.7)" }}>
                  <div className="flex items-start gap-3">
                    <span className="shrink-0 font-cinzel text-2xl font-bold" style={{ color: C }}>{item.n}</span>
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
              <span className="ml-2">
                {fa ? "خاموشی که بر داوریِ نیکو سوار است — نه فروخوردنِ خشم" : "el silencio montado sobre kaf zejut — no el rencor tragado"}
              </span>
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
                    es: "El honor que persigues llega con auditores incluidos: quien lo busca fabrica a sus propios detractores. El que huye de él recibe el otro, el que nadie puede investigar — porque está bajo la ley de la Corona, y sobre lo cubierto no se pregunta.",
                    fa: "حرمتی که در پیِ آن می‌دوی، بازرسان را با خود می‌آورد: هر که آن را بجوید، منکرانِ خود را می‌سازد. و آن‌که از آن می‌گریزد، دیگری را می‌یابد — همان که کسی نمی‌تواند در آن بکاود، زیرا زیرِ قانونِ تاج است، و از آنچه پوشیده است نمی‌پرسند.",
                  },
                  {
                    icon: "◇",
                    label: fa ? "بینشِ کلیدی" : "Insight clave",
                    es: "La teshuvá no empieza en el ayuno ni en la palabra: empieza en los tres segundos en que oyes tu humillación y no contestas. El precio es una garganta cerrada. La moneda es una sola vocal.",
                    fa: "تِشووا نه از روزه آغاز می‌شود و نه از واژه: از همان سه ثانیه‌ای آغاز می‌شود که خواریِ خود را می‌شنوی و پاسخ نمی‌دهی. بها، گلویی بسته است. سکه، تنها یک واکه.",
                  },
                  {
                    icon: "○",
                    label: fa ? "بینشِ روحانی" : "Insight espiritual",
                    es: "אֶהְיֶה de frente dice «Yo seré»; de espaldas suma דָּם. La humillación no es un castigo enviado desde fuera: es la nuca de la promesa. El mismo Nombre, girado.",
                    fa: "אֶהְיֶה از رو می‌گوید «من خواهم بود»؛ از پشت برابرِ דָּם می‌شود. خواری کیفری از بیرون نیست: پشتِ گردنِ همان وعده است. همان نام، چرخیده.",
                  },
                  {
                    icon: "✦",
                    label: fa ? "کاربرد" : "Aplicación",
                    es: "Pero el silencio sin kaf zejut es rencor comprimido. Busca el ángulo del otro antes de callar — y entonces callar no te cuesta, porque se te acabó la munición.",
                    fa: "امّا خاموشیِ بی‌כַּף זְכוּת کینه‌ای فشرده است. پیش از خاموشی، زاویهٔ دیگری را بجو — آن‌گاه خاموشی برایت گران نیست، چون مهماتت تمام شده.",
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
                  אָלֶ״ף דֹּם — אָדָם
                </p>
                <p className="mt-2 font-cinzel text-xs uppercase tracking-widest text-parchment/50">
                  {fa ? "«پیش از خاموشی خون است؛ پس از آن، انسان»" : "«Antes de callar hay sangre. Después de callar hay un hombre»"}
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
              onClick={() => router.push("/estudio?ref=Likutei_Moharan.6")}
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
                { es: "La gloria de Dios se oculta", fa: "شکوهِ خدا پوشیده است", ref: "Proverbs 25:2" },
                { es: "Enmudece ante Dios", fa: "در برابرِ خدا خاموش بمان", ref: "Psalms 37:7" },
                { es: "La semejanza de un hombre sobre el trono", fa: "شباهتِ انسانی بر تخت", ref: "Ezekiel 1:26" },
                { es: "Llama a Yehoshúa", fa: "یِهوشوعَ را بخوان", ref: "Deuteronomy 31:14" },
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
