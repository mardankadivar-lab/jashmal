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

export default function PageNumeroPi() {
  const locale = useLocale();
  const router = useRouter();
  const fa = locale === "fa";

  const [dark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); }, []);
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";
  const C = "#f0913f";   // ámbar — el círculo del año
  const D = "#e8c05a";   // dorado — el día, la línea de luz
  const A = "#8fb4e8";   // azul — el año que cambia

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

        {/* HERO — la fracción */}
        <div className="mb-12 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            {fa ? "راو گینزبورگ · ۱۳۷، فصلِ ۱۳" : "Rav Ginsburgh · 137, cap. 13"}
          </p>
          <div className="flex flex-wrap items-end justify-center gap-3">
            <Tile he="שָׁנָה" sub={fa ? "سال · ۳۵۵" : "Año · 355"} color={A} size={34} />
            <span className="font-cinzel text-3xl text-gold/40" style={{ paddingBottom: 18 }}>÷</span>
            <Tile he="יוֹם" sub={fa ? "روز · ۱۱۳" : "Día · 113"} color={D} size={34} />
          </div>
          <span className="mt-6 block font-cinzel font-black leading-none"
            style={{ fontSize: "clamp(96px, 28vw, 176px)", color: C,
              textShadow: dark ? `0 0 40px ${C}, 0 0 14px ${C}88` : "none",
              display: "inline-block" }}>
            π
          </span>
          <h2 className="mt-2 font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            {fa ? "عددی پنهان میانِ روز و سال" : "El número escondido entre el día y el año"}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
            {fa
              ? "دو واژه از تقویمِ تورات. یک تقسیم. و کهن‌ترین عددِ هندسه بیرون می‌آید."
              : "Dos palabras del calendario de la Torá. Una división. Y sale el número más antiguo de la geometría."}
          </p>
        </div>

        {/* SECCIÓN 1 — El sueño del Faraón */}
        <Section>
          <h3 className="mb-4 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "دو کس بر یک رود" : "Dos hombres sobre un mismo río"}
          </h3>
          <p className="hebrew mb-4 text-center text-xl leading-relaxed" style={{ color: "#c9a43e", textShadow: dark ? "0 0 10px #c9a43e66" : "none" }}>
            וְהִנֵּה עֹמֵד עַל־הַיְאֹר
          </p>
        </Section>

        <PullQuoteLite
          es="«...y he aquí que estaba de pie sobre el río.»"
          fa="«...و اینک بر رود ایستاده بود.»"
          source={fa ? "بِرِشیت (پیدایش) ۴۱:۱" : "Bereshit (Génesis) 41:1"}
          fa_active={fa} />

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "تورات خوابِ فرعون را دو بار روایت می‌کند، و دو روایت یکی نیستند. نخستین بار (پیدایش ۴۱:۱) می‌گوید فرعون «بر رود» ایستاده بود — عَل هَیئُور. اما وقتی خودِ فرعون خوابش را برای یوسف بازمی‌گوید (پیدایش ۴۱:۱۷)، یک واژه می‌افزاید: שְׂפַת، «کرانه». «اینک بر کرانهٔ رود ایستاده بودم.»"
                : "La Torá cuenta el sueño del Faraón dos veces, y las dos versiones no son iguales. La primera (Génesis 41:1) dice que el Faraón estaba de pie «sobre el río» — al hayeor. Pero cuando el propio Faraón le narra su sueño a Yosef (Génesis 41:17), agrega una palabra: שְׂפַת, «la orilla». «Y he aquí que yo estaba de pie sobre la orilla del río.»"}
            </p>
            <p>
              {fa
                ? "راو گینزبورگ می‌خوانَد: آن رود، رودِ زمان است. ایستادن «بر» رود یعنی بر زمان چیرگی داشتن؛ ایستادن بر «کرانه» یعنی تماشای گذشتنِ آن از بیرون. فرعون نتوانست خود را بر رود تصور کند، پس واژه را افزود تا خواب باورپذیر شود. یوسف — استادِ رؤیاها — همان کسی است که بر رود می‌ایستد."
                : "Rav Ginsburgh lo lee así: ese río es el río del tiempo. Estar de pie «sobre» el río es dominar el tiempo; estar en la «orilla» es verlo pasar desde afuera. El Faraón no lograba imaginarse sobre el río, así que añadió la palabra para que el sueño sonara verosímil. Yosef —el maestro de los sueños— es el que sí se para sobre el río."}
            </p>
            <p>
              {fa
                ? "و شگفتی در عددها است: «اینک بر رود ایستاده بود» (והנה עמד על היאר) برابرِ ۴۹۶ است — همان ارزشِ מַלְכוּת، مَلخوت، «پادشاهی»: بُعدِ فضا، جایگاهِ ایستایِ پادشاه. و «سال» (שָׁנָה) برابرِ ۳۵۵ است، درست مانندِ «فرعون» (פַּרְעֹה) — و ۳۵۵ شمارِ روزهایِ سالِ قمری است. فرعون خودِ زمانِ گردنده است."
                : "Y la sorpresa está en los números: «y he aquí que estaba de pie sobre el río» (והנה עמד על היאר) vale 496 — el mismo valor de מַלְכוּת, Maljut, «reinado»: la dimensión del espacio, la posición estática del rey. Y «año» (שָׁנָה) vale 355, exactamente igual que «Faraón» (פַּרְעֹה) — y 355 es el número de días del año lunar. El Faraón es el tiempo que gira."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 2 — El día y el año */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "روز نمی‌گردد؛ سال می‌گردد" : "El día no cambia; el año sí"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="אוֹר" sub={fa ? "نور · ۲۰۷" : "Luz · 207"} color={D} size={40} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="אֵין סוֹף" sub={fa ? "بی‌کران · ۲۰۷" : "Sin fin · 207"} color={D} size={30} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "«و خدا نور را روز خواند» (پیدایش ۱:۵). در کابالا، روز از نور ساخته شده و نور دگرگون نمی‌شود: אוֹר («نور») برابرِ ۲۰۷ است، و אֵין סוֹף («بی‌کران») نیز برابرِ ۲۰۷. روز همان بُعدِ درونی، ثابت و بی‌پایانِ زمان است — سه نیرویِ خِرَدیِ جان."
                : "«Y Dios llamó a la luz día» (Génesis 1:5). En Cabalá el día está hecho de luz, y la luz no cambia: אוֹר («luz») vale 207, y אֵין סוֹף («sin fin», el Infinito) también vale 207. El día es la dimensión interior, constante e ilimitada del tiempo — los tres poderes intelectuales del alma."}
            </p>
            <p>
              {fa
                ? "سال درست وارونه است. در عبری «سال» (שָׁנָה) و «دگرگونی» (שִׁינוּי) از یک ریشه‌اند. سال همان بُعدِ بیرونی و متغیرِ زمان است — هفت صفتِ احساسیِ جان، که میانِ آشکارگی و تاریکی نوسان می‌کنند. از همین رو یوسف خوابِ فرعون را «سال» تعبیر کرد، نه «روز»: فرعون در فصل‌ها زندگی می‌کرد، در فراوانی و قحطی."
                : "El año es exactamente lo contrario. En hebreo «año» (שָׁנָה) y «cambio» (שִׁינוּי) comparten la misma raíz. El año es la dimensión exterior y cambiante del tiempo — las siete cualidades emotivas del alma, que oscilan entre la revelación y la oscuridad. Por eso Yosef interpretó el sueño del Faraón como «años» y no como «días»: el Faraón vivía en las estaciones, en la abundancia y en el hambre."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 3 — La fracción */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "کسری که π را می‌سازد" : "La fracción que da π"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="יוֹם" sub={fa ? "روز · ۵۶" : "Día · 56"} color={D} size={38} />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <Tile he="שָׁנָה" sub={fa ? "سال · ۳۵۵" : "Año · 355"} color={A} size={38} />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <Tile he="411" sub={fa ? "۳ × ۱۳۷" : "3 × 137"} color={C} size={38} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "نخست جمع: «روز» (יוֹם) برابرِ ۵۶ و «سال» (שָׁנָה) برابرِ ۳۵۵ است. ۵۶ + ۳۵۵ = ۴۱۱ — همان ارزشِ תֹהוּ، «تُهو»، تهیِ آغازینِ پیدایش ۱:۲، و همان ارزشِ יֵשׁ מֵאַיִן، «چیزی از هیچ». و ۴۱۱ برابرِ ۳ × ۱۳۷ است: عددِ کابالا، سه بار."
                : "Primero la suma: «día» (יוֹם) vale 56 y «año» (שָׁנָה) vale 355. 56 + 355 = 411 — el mismo valor de תֹהוּ, tohu, el vacío primordial de Génesis 1:2, y el mismo valor de יֵשׁ מֵאַיִן, «algo de la nada». Y 411 es 3 × 137: el número de la Cabalá, tres veces."}
            </p>
            <p>
              {fa
                ? "اکنون تقسیم. در کابالا هر حرف را می‌توان با نامِ کاملش نوشت (میلوی). «روز» (יום) از یود، واو و مِم ساخته شده؛ نوشته با نامشان — יוד ואו מם — برابرِ ۱۱۳ می‌شود. و همین ۱۱۳ در جایی دیگر از تورات پیدا است: «یا دو روز» (אוֹ יוֹמַיִם، خروج ۲۱:۲۱) نیز دقیقاً ۱۱۳ است."
                : "Ahora la división. En Cabalá cada letra puede escribirse con su nombre completo (milui). «Día» (יום) está hecho de yod, vav y mem; escrito con sus nombres — יוד ואו מם — suma 113. Y ese mismo 113 aparece en otro lugar de la Torá: «o dos días» (אוֹ יוֹמַיִם, Éxodo 21:21) vale también exactamente 113."}
            </p>
          </div>
        </Section>

        <Section>
          <div className="my-9 rounded-2xl border-2 p-7 text-center"
            style={{ borderColor: `${C}66`, background: `${C}0d`, boxShadow: `0 0 30px ${C}22` }}>
            <p className="font-cinzel text-3xl font-black sm:text-4xl" style={{ color: C, textShadow: dark ? `0 0 24px ${C}88` : "none" }}>
              355 / 113 = 3,141592<span className="opacity-45">9…</span>
            </p>
            <p className="mt-3 font-cinzel text-sm tracking-widest text-parchment/70">
              π = 3,141592<span className="opacity-45">6…</span>
            </p>
          </div>
        </Section>

        <Section>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "سال بر روز: ۳۵۵ تقسیم بر ۱۱۳ برابرِ ۳٫۱۴۱۵۹۲۹… است، و π برابرِ ۳٫۱۴۱۵۹۲۶… — یکسان تا ششمین رقمِ اعشار. این تصادف نیست که به‌آسانی بتوان از کنارش گذشت: ۳۵۵/۱۱۳ بهترین تقریبِ کسریِ π با عددهای کمتر از هزار است. ریاضیدانِ چینی، تسو چونگ‌جی، آن را در سدهٔ پنجم یافت؛ اروپا تا سدهٔ شانزدهم به آن نرسید."
                : "El año sobre el día: 355 dividido entre 113 da 3,1415929…, y π es 3,1415926… — idénticos hasta el sexto decimal. No es una coincidencia fácil de descartar: 355/113 es la mejor aproximación fraccionaria de π con números menores que mil. El matemático chino Zu Chongzhi la halló en el siglo V; Europa no llegó a ella hasta el siglo XVI."}
            </p>
            <p>
              {fa
                ? "و هر دو عدد از درون ساخته شده‌اند: ۱۱۳ = ۷² + ۸²، و ۳۵۵ = ۵² + ۶² + ۷² + ۸² + ۹² + ۱۰². ریشه‌هایِ گروهِ نخست ۷ + ۸ = ۱۵ می‌شوند — ارزشِ نامِ الهیِ יָהּ؛ و ریشه‌هایِ گروهِ دوم ۵ + ۶ + ۷ + ۸ + ۹ + ۱۰ = ۴۵ — ارزشِ نامِ הוי׳ه چون با آلِف پُر شود (יוד הא ואו הא)."
                : "Y los dos números están construidos desde adentro: 113 = 7² + 8², y 355 = 5² + 6² + 7² + 8² + 9² + 10². Las raíces del primero suman 7 + 8 = 15 — el valor del Nombre divino יָהּ; las del segundo suman 5 + 6 + 7 + 8 + 9 + 10 = 45 — el valor del Nombre de Dios cuando se escribe en plenitud con álef (יוד הא ואו הא)."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 4 — El cuadrado, el círculo y la línea */}
        <Section>
          <h3 className="mb-5 mt-12 text-center font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            {fa ? "مربع، دایره و خط" : "El cuadrado, el círculo y la línea"}
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Tile he="מָקוֹם" sub={fa ? "مکان · ۱۸۶" : "Espacio · 186"} color="#9a8fd8" size={34} />
            <span className="font-cinzel text-2xl text-gold/40">⊃</span>
            <Tile he="קַו" sub={fa ? "خط · ۱۰۶" : "Línea · 106"} color={D} size={34} />
          </div>
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
            <p>
              {fa
                ? "یکی از نام‌هایِ خدا مָקוֹם است، «مکان» — «او مکانِ جهان است، و جهان مکانِ او نیست». ارزشش ۱۸۶ است، و این دقیقاً جمعِ مربعِ حروفِ نامِ الهیِ יהוה است: ۱۰² + ۵² + ۶² + ۵² = ۱۸۶. و نگاه کن به خودِ واژه: מקום با مِم آغاز و با مِم پایان می‌یابد، و در میانشان קו می‌مانَد — «خط»."
                : "Uno de los Nombres de Dios es מָקוֹם, «el Espacio» — «Él es el espacio del mundo, y el mundo no es Su espacio». Su valor es 186, y eso es exactamente la suma de los cuadrados de las letras del Nombre divino יהוה: 10² + 5² + 6² + 5² = 186. Y mira la palabra misma: מקום empieza con mem y termina con mem, y entre las dos queda קו — «línea»."}
            </p>
            <p>
              {fa
                ? "پس تصویرِ کابالایی چنین است: مربع، فضایِ مطلقِ الهی؛ دایره در درونِ مربع، جهانِ آفریده — سالی که می‌گردد؛ و خطی که دایره را می‌شکافد، پرتوِ نور — روزی که دگرگون نمی‌شود. π دقیقاً نسبتِ میانِ دایره و خطِ قطرِ آن است. یعنی: نسبتِ میانِ زمانی که می‌گذرد و زمانی که می‌مانَد."
                : "La imagen cabalística queda así: el cuadrado es el espacio divino absoluto; el círculo dentro del cuadrado es el universo creado — el año que gira; y la línea que atraviesa el círculo es el rayo de luz — el día que no cambia. π es precisamente la razón entre un círculo y la línea de su diámetro. Es decir: la razón entre el tiempo que pasa y el tiempo que permanece."}
            </p>
            <p>
              {fa
                ? "و اگر مربعی به ضلعِ ۱۱۳ بکشی و دایره‌ای در آن بگنجانی، آنچه از مربع بیرونِ دایره می‌مانَد تقریباً ۲٬۷۴۰ واحد است — ۲۰ × ۱۳۷. عددِ نور، باز هم، در حاشیهٔ خودِ هندسه."
                : "Y si dibujas un cuadrado de lado 113 y encierras en él un círculo, lo que queda del cuadrado por fuera del círculo mide aproximadamente 2.740 unidades — 20 × 137. El número de la luz, otra vez, en el margen mismo de la geometría."}
            </p>
          </div>
        </Section>

        {/* SECCIÓN 5 — Hitbonenut */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.05] to-transparent p-8">
            <p className="hebrew mb-4 text-center text-xl text-gold/70" style={{ textShadow: dark ? "0 0 10px #c9a43e44" : "none" }}>
              הִתְבּוֹנְנוּת
            </p>
            <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir={fa ? "rtl" : "ltr"}>
              <p>
                {fa
                  ? "π عددی است که هرگز پایان نمی‌یابد و هرگز تکرار نمی‌شود. برایِ اندازه‌گیریِ یک دایره — ساده‌ترین شکلِ جهان — به عددی بی‌پایان نیاز داری. زمان نیز چنین است: هر سال به همان‌جا بازمی‌گردد، و هرگز همان نیست."
                  : "π es un número que nunca termina y nunca se repite. Para medir un círculo —la forma más simple del universo— hace falta un número infinito. El tiempo es igual: cada año vuelve al mismo punto, y nunca es el mismo."}
              </p>
              <p>
                {fa
                  ? "تو در کدام بُعدِ زمان زندگی می‌کنی؟ در سال — جایی که همه‌چیز دگرگون می‌شود، فراوانی و قحطی، بالا و پایین؟ یا در روز — آن نورِ ثابتی که زیرِ همهٔ دگرگونی‌ها جاری است؟ فرعون بر کرانه ماند و تنها فصل‌ها را دید. یوسف بر خودِ رود ایستاد."
                  : "¿En qué dimensión del tiempo vives tú? ¿En el año —donde todo cambia, abundancia y hambre, subidas y bajadas? ¿O en el día —esa luz constante que corre por debajo de todos los cambios? El Faraón se quedó en la orilla y solo vio las estaciones. Yosef se paró sobre el río."}
              </p>
              <p>
                {fa
                  ? "و امروز کاری هست: یک بار، پیش از آنکه روز تمام شود، از کرانه به رود قدم بگذار. به‌جایِ آنکه بپرسی «امسال چه بر من گذشت؟»، بپرس «آن نوری که در همهٔ این سال‌ها یکسان مانده چیست؟» همان پرسش، تشووا است."
                  : "Y hoy hay algo que hacer: una vez, antes de que termine el día, pasa de la orilla al río. En vez de preguntar «¿qué me pasó este año?», pregunta «¿qué luz ha sido la misma en todos estos años?». Esa pregunta, ya es teshuvá."}
              </p>
            </div>
          </div>
        </Section>

        {/* SECCIÓN 6 — Síntesis final */}
        <Section>
          <div className="mt-14 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-2xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              נֵצַח יִשְׂרָאֵל לֹא יְשַׁקֵּר
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              {fa ? "«جاودانگیِ اسرائیل دروغ نمی‌گوید»" : "«La Eternidad de Israel no miente»"}
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir={fa ? "rtl" : "ltr"}>
              {fa
                ? "این جمله (شموئل الف ۱۵:۲۹) از زمانِ جاودان سخن می‌گوید، و ارزشِ تمامِ آیه ۱٬۷۷۵ است — یعنی ۵ × ۳۵۵، پنج برابرِ «سال»: زمانِ گذرا. و همان آیه در شمارشِ کوچک دقیقاً ۱۳۷ می‌شود. جاودانگی از همان چیزی ساخته شده که می‌گذرد."
                : "Esta frase (Shmuel I / 1 Samuel 15:29) habla del tiempo eterno, y el valor de todo el versículo es 1.775 — o sea 5 × 355, cinco veces «año»: el tiempo que pasa. Y ese mismo versículo, en cuenta reducida, da exactamente 137. La eternidad está hecha de aquello mismo que transcurre."}
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: fa ? "بِرِشیت ۴۱:۱" : "Bereshit 41:1", ref: "Genesis 41:1" },
                { label: fa ? "بِرِشیت ۱:۵" : "Bereshit 1:5", ref: "Genesis 1:5" },
                { label: fa ? "شِموت ۲۱:۲۱" : "Shemot 21:21", ref: "Exodus 21:21" },
                { label: fa ? "شموئل الف ۱۵:۲۹" : "Shmuel I 15:29", ref: "I Samuel 15:29" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Genesis 41:1")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              {fa ? "مطالعهٔ رودِ زمان در جاشمال ←" : "Estudiar el río del tiempo en Jashmal →"}
            </button>

            <div className="mt-4 font-cinzel text-[10px] uppercase tracking-widest text-muted/45">
              {fa ? "از کتابِ «۱۳۷: معمایِ آفرینش» راو ییتسحاق گینزبورگ، فصلِ ۱۳" : "Del libro «137: The Riddle of Creation» de Rav Yitzchak Ginsburgh, cap. 13"}
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
                ? "دایره بازمی‌گردد؛ خط پیش می‌رود. تقویمِ عبری هر دو را با هم می‌بندد — ماه که می‌گردد و روز که نمی‌گردد — و نسبتشان همان عددی است که هیچ کسری نمی‌تواند به‌تمامی بگیردش. شاید زمان از همین رو ساخته شده: تا آنچه می‌گذرد، بی‌کران را لمس کند."
                : "El círculo vuelve; la línea avanza. El calendario hebreo ata los dos —la luna que gira y el día que no— y su razón es ese número que ninguna fracción alcanza del todo. Quizá por eso está hecho el tiempo: para que lo que pasa toque lo que no termina."}
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
