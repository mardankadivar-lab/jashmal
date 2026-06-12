"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import MisterioLangToggle from "@/components/MisterioLangToggle";

// ── Página de misterio: LAS CHISPAS DEL MASHÍAJ EN LAS NACIONES ───────────────
// "Mashíaj mi-bajútz" — las nitzotzot kedoshot que cayeron entre las naciones
// (shevirat ha-kelim, las 288 / רפ"ח chispas) y por qué el linaje y la fuerza del
// Mashíaj se nutren de gerim y justos venidos de afuera: Tamar, Rajav, Rut, Naamá,
// Bityá, Yitró, Rabbi Akiva, Shemaiá y Avtalión, los descendientes de Hamán,
// Onkelos, Ovadiá. Contenido escrito y VERIFICADO por el Sofer (editor-erudito):
// 15 fuentes confirmadas en Sefaria + gematrías calculadas letra por letra.
// Idioma principal: español.
//
// GUARDARRAÍLES DE HONESTIDAD (del Sofer — respetados en el render):
//  · Se distingue SIEMPRE pshat (texto) / agadá-midrash (homilía) / sod (cábala).
//  · "Rajav se casó con Yehoshúa" es AGADÁ talmúdica (Meguilá 14b), no pshat.
//  · "Rabbi Akiva descendía de Sísera" es TRADICIÓN de Rav Nissim Gaon, no Talmud
//    literal (el Talmud dice "descendientes de Sísera enseñaron Torá" sin nombrarlo).
//  · "Nerón se convirtió" (Guitín 56a) es agadá con verdad teológica, no crónica.
//  · Las 288 chispas y el juego מְרַחֶפֶת = מֵת + רפ"ח = 728 están verificados
//    matemáticamente; la puerta exacta del Etz Jaim queda como "por verificar".
//  · Se separa Bat-Sheva (Betsabé, del linaje) de Bityá bat Paró (hija del faraón).
// TODO(fa): el farsi de esta página está pendiente de traducción verificada.

// ── Las figuras: chispas recogidas de afuera ──────────────────────────────────
interface Figura {
  he: string;
  nombre: string;
  origen: string;
  texto: string;
  estatus: "pshat" | "agadá" | "tradición";
  color: string;
}

// Grupo A — las forasteras del linaje real (de quienes desciende David / Mashíaj)
const LINAJE: Figura[] = [
  {
    he: "תָּמָר",
    nombre: "Tamar",
    origen: "Cananea · el primer eslabón",
    texto:
      "Se disfraza y concibe de Yehudá a Péretz, ancestro directo de David (Bereshit 38; Rut 4:18–22). Caso paradigmático de averá lishmá, «transgresión por el Cielo»: «Tamar se prostituyó — y salieron de ella reyes y profetas» (Nazir 23b).",
    estatus: "pshat",
    color: "#cf8c52",
  },
  {
    he: "רָחָב",
    nombre: "Rajav",
    origen: "Cananea de Jericó",
    texto:
      "La mesonera/ramera que esconde a los espías y confiesa al Dios de Israel (Yehoshúa 2). La agadá añade que se convirtió y se casó con Yehoshúa, y de ella descendieron ocho profetas-kohanim —entre ellos Yirmiá— y la profetisa Juldá (Meguilá 14b).",
    estatus: "agadá",
    color: "#d8a24a",
  },
  {
    he: "רוּת",
    nombre: "Rut",
    origen: "Moabita · bisabuela de David",
    texto:
      "«…y Yishai engendró a David» (Rut 4:21–22). Contra «no entrará moabita en la congregación» (Devarim 23:4), la halajá resuelve moaví velo moavit (el varón, no la mujer; Yevamot 76b). El Mashíaj entra por el ojo de una aguja. Y Moab nace de Lot.",
    estatus: "pshat",
    color: "#e0a850",
  },
  {
    he: "נַעֲמָה",
    nombre: "Naamá",
    origen: "Amonita · madre de Rejavam",
    texto:
      "Esposa de Shelomó y madre de Rejavam (I Reyes 14:21): toda la continuación de la casa de David pasa por una amonita. La segunda «polluela buena»: Moab y Amón —las dos naciones nacidas de Lot— aportan cada una una mujer al tronco mesiánico (Bava Kama 38b).",
    estatus: "pshat",
    color: "#dcae46",
  },
  {
    he: "בִּתְיָה",
    nombre: "Bityá bat Paró",
    origen: "Hija del faraón · cría al redentor",
    texto:
      "Saca a Moshé del río (Shemot 2:5–10). El Talmud la llama «Yehudiá» porque «renegó de la idolatría» de la casa de su padre (Meguilá 13a). La criadora del redentor de Israel es una conversa de la casa real egipcia. (No confundir con Bat-Sheva / Betsabé.)",
    estatus: "agadá",
    color: "#cf8c52",
  },
];

// Grupo B — los maestros venidos de la sangre del enemigo
const MAESTROS: Figura[] = [
  {
    he: "יִתְרוֹ",
    nombre: "Yitró",
    origen: "Sacerdote de Midián · suegro de Moshé",
    texto:
      "El sacerdote idólatra que reconoce a Dios y da a Moshé el sistema de jueces — y la parashá de la entrega de la Torá lleva su nombre. Yitró huyó del plan del faraón y mereció que sus descendientes se sentaran en la Cámara de Piedra Tallada, el Sanedrín (Sotá 11a; Sanhedrín 104a).",
    estatus: "agadá",
    color: "#d8a24a",
  },
  {
    he: "רַבִּי עֲקִיבָא",
    nombre: "Rabbi Akiva",
    origen: "Hijo de conversos · padre de la Torá Oral",
    texto:
      "Pastor analfabeto que llegó a ser el sabio más grande de su generación, y quien proclamó a Bar Kojba «este es el rey Mashíaj» (Yerushalmi Taanit 4:5). La tradición de que descendía de Sísera, el general cananeo, viene de Rav Nissim Gaon — el Talmud dice «descendientes de Sísera enseñaron Torá» sin nombrarlo.",
    estatus: "tradición",
    color: "#caa23f",
  },
  {
    he: "שְׁמַעְיָה וְאַבְטַלְיוֹן",
    nombre: "Shemaiá y Avtalión",
    origen: "Descendientes de Sanjeriv",
    texto:
      "Los dos maestros directos de Hilel el Anciano descendían, según el Talmud, de Sanjeriv (Senaquerib), el rey asirio que arrasó las diez tribus (Guitín 57b). Los descendientes del destructor enseñan la Torá Oral a Israel.",
    estatus: "agadá",
    color: "#b89a4e",
  },
  {
    he: "בְּנֵי הָמָן",
    nombre: "Los descendientes de Hamán",
    origen: "El archienemigo amalecita",
    texto:
      "«De los descendientes de Hamán estudiaron Torá en Bnei Brak» (Guitín 57b; Sanhedrín 96b). El enemigo cuya simiente la Torá manda borrar produce eruditos — en la misma ciudad de Rabbi Akiva.",
    estatus: "agadá",
    color: "#9a6a8e",
  },
  {
    he: "אוּנְקְלוֹס",
    nombre: "Onkelos el converso",
    origen: "Sobrino de Tito",
    texto:
      "El sobrino del destructor del Templo se convierte y produce el Targum Onkelos, la traducción aramea canónica que se lee hasta hoy (Guitín 57a). De la casa de Tito: el intérprete oficial de la Torá.",
    estatus: "agadá",
    color: "#cf8c52",
  },
  {
    he: "עוֹבַדְיָה",
    nombre: "Ovadiá el profeta",
    origen: "Edomita converso",
    texto:
      "«Ovadiá era un ger edomita» (Sanhedrín 39b, R. Meir). El único libro profético dedicado a la caída de Edom lo escribe un edomita convertido: «del propio bosque sale el mango del hacha».",
    estatus: "agadá",
    color: "#b06a3c",
  },
];

const ETIQUETA: Record<Figura["estatus"], { label: string; color: string }> = {
  pshat: { label: "Pshat · texto", color: "#8fd6a6" },
  agadá: { label: "Agadá · tradición talmúdica", color: "#e0c060" },
  tradición: { label: "Tradición posterior", color: "#cf8c52" },
};

// ── Componentes (idénticos en estilo a /misterio/ropas-de-luz y /misterio/lot) ─
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

function PullQuote({ he, es, source }: { he: string; es: string; source: string }) {
  return (
    <Section>
      <div className="my-10 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
        <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
        <p className="mb-1 text-sm italic leading-relaxed text-parchment/80">«{es}»</p>
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
        style={{ fontSize: "clamp(40px, 11vw, 64px)", color: "#fff6e0", textShadow: `0 0 22px ${color}, 0 0 8px ${color}` }}
      >
        {he}
      </span>
      <span className="mt-2 font-cinzel text-xs uppercase tracking-widest" style={{ color }}>{sub}</span>
    </div>
  );
}

function FiguraCard({ f, delay }: { f: Figura; delay: number }) {
  const tag = ETIQUETA[f.estatus];
  return (
    <Section delay={delay}>
      <div className="flex items-start gap-4 rounded-2xl border border-gold/15 p-5"
        style={{ background: "rgba(255,255,255,0.02)" }}>
        <span className="hebrew shrink-0 font-bold leading-none"
          style={{ fontSize: "clamp(26px, 7vw, 40px)", color: "#fff6e0", textShadow: `0 0 16px ${f.color}` }}>
          {f.he}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
            <p className="font-cinzel text-sm font-bold tracking-wide" style={{ color: f.color }}>{f.nombre}</p>
            <span className="font-cinzel text-[10px] uppercase tracking-widest" style={{ color: tag.color }}>
              {tag.label}
            </span>
          </div>
          <p className="mt-0.5 font-cinzel text-[11px] uppercase tracking-[0.2em] text-gold/45">{f.origen}</p>
          <p className="mt-2 text-sm leading-relaxed text-parchment/85">{f.texto}</p>
        </div>
      </div>
    </Section>
  );
}

// ── Página en FARSI (رندر شده وقتی locale === "fa") ──────────────────────────
// محتوای راستی‌آزمایی‌شده توسط سوفر (سردبیر-عالم). گماتریاها حرف‌به‌حرف محاسبه شده:
//   מְרַחֶפֶת = ۷۲۸ = מֵת (۴۴۰) + רפ״ח (۲۸۸)؛ נחש = משיח = ۳۵۸؛ אור = ۲۰۷؛
//   עור = ۲۷۶؛ דוד = ۱۴؛ רות = ۶۰۶ (+۷ = ۶۱۳). منابع در سفاریا تأیید شد.
function ChispasFarsi() {
  const bg = "#05050a";
  const navBg = "rgba(5,5,10,0.9)";
  const router = useRouter();

  function Sec({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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

  function PQ({ he, fa, source }: { he: string; fa: string; source: string }) {
    return (
      <Sec>
        <div className="my-10 rounded-2xl border border-gold/25 bg-gold/[0.05] p-6">
          <p className="hebrew mb-3 text-right text-lg leading-relaxed text-gold/85" dir="rtl">{he}</p>
          <p className="mb-1 text-sm italic leading-relaxed text-parchment/80" dir="rtl">«{fa}»</p>
          <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/50">— {source}</p>
        </div>
      </Sec>
    );
  }

  // برچسب وضعیت متنی (پشاط / اَگادا / سنت)
  const TAG: Record<string, { label: string; color: string }> = {
    pshat: { label: "پَشاط · متن", color: "#8fd6a6" },
    agada: { label: "اَگادا · سنت تلمودی", color: "#e0c060" },
    sonnat: { label: "سنت متأخر", color: "#cf8c52" },
  };

  // گروه الف — زنان بیگانه‌ی نسَب سلطنتی (که داوود/مَشیَح از آن‌ها برمی‌آید)
  const LINAJE = [
    {
      he: "תָּמָר", nombre: "تامار", origen: "کنعانی · نخستین حلقه", estatus: "pshat", color: "#cf8c52",
      texto: "خود را پنهان می‌کند و از یهودا، پِرِص — جدِّ مستقیم داوود — را باردار می‌شود (پیدایش ۳۸؛ روت ۴:۱۸–۲۲). نمونه‌ی برجسته‌ی «گناه برای آسمان» (عَوِرا لِشما): «تامار زنا کرد — و از او پادشاهان و پیامبران برآمدند» (نازیر ۲۳b).",
    },
    {
      he: "רָחָב", nombre: "راحاب", origen: "کنعانیِ اَریحا", estatus: "agada", color: "#d8a24a",
      texto: "مِهمان‌دار/روسپی که جاسوسان را پنهان می‌کند و به خدای اسرائیل اعتراف می‌آورد (یهوشع ۲). اَگادا می‌افزاید که او گرویده شد و با یهوشع ازدواج کرد، و از او هشت پیامبر-کوهِن — از جمله اِرمیا — و حولدای نبیه برآمدند (مِگیلا ۱۴b).",
    },
    {
      he: "רוּת", nombre: "روت", origen: "موآبی · جده‌ی بزرگ داوود", estatus: "pshat", color: "#e0a850",
      texto: "«…و یَسای، داوود را پدید آورد» (روت ۴:۲۱–۲۲). در برابر «موآبی به جماعت درنیاید» (تثنیه ۲۳:۴)، هَلاخا چنین می‌گشاید: «موآوی، نه موآویت» (مرد، نه زن؛ یِواموت ۷۶b). مَشیَح از سوراخ سوزن می‌گذرد. و موآب از لوط زاده می‌شود.",
    },
    {
      he: "נַעֲמָה", nombre: "نَعَما", origen: "عَمّونی · مادر رِحَبعام", estatus: "pshat", color: "#dcae46",
      texto: "همسر شِلومو و مادر رِحَبعام (اول پادشاهان ۱۴:۲۱): تمام ادامه‌ی خاندان داوود از یک زن عَمّونی می‌گذرد. «جوجه‌ی نیکِ» دوم: موآب و عَمّون — دو ملتِ زاده از لوط — هر یک زنی به تنه‌ی مَشیَحی می‌بخشند (بابا قَما ۳۸b).",
    },
    {
      he: "בִּתְיָה", nombre: "بیتیا دختر فرعون", origen: "دختر فرعون · نجات‌دهنده را می‌پرورد", estatus: "agada", color: "#cf8c52",
      texto: "موشه را از رود بیرون می‌کشد (خروج ۲:۵–۱۰). تلمود او را «یِهودیا» می‌نامد چون «از بت‌پرستیِ» خاندان پدرش روی برگرداند (مِگیلا ۱۳a). پرورنده‌ی نجات‌دهنده‌ی اسرائیل، گرویده‌ای از خاندان سلطنتی مصر است. (با بَتشِوَع/بَتشِبا اشتباه نشود.)",
    },
  ];

  // گروه ب — استادانی که از خونِ دشمن برآمدند
  const MAESTROS = [
    {
      he: "יִתְרוֹ", nombre: "یِترو", origen: "کاهن مِدیان · پدرزن موشه", estatus: "agada", color: "#d8a24a",
      texto: "کاهن بت‌پرستی که خدا را می‌شناسد و نظام داوران را به موشه می‌بخشد — و پاراشای اعطای تورا نام او را دارد. یِترو از نقشه‌ی فرعون گریخت و سزاوار شد که نوادگانش در لِشکَتِ هَگَزیت، یعنی سنهِدرین، بنشینند (سوطا ۱۱a؛ سنهِدرین ۱۰۴a).",
    },
    {
      he: "רַבִּי עֲקִיבָא", nombre: "ربی عَکیوا", origen: "فرزند گرویدگان · پدر تورای شفاهی", estatus: "sonnat", color: "#caa23f",
      texto: "چوپانی بی‌سواد که بزرگ‌ترین حکیم نسل خود شد و بَر کوخوا را «این است پادشاه مَشیَح» خواند (یروشلمی تَعَنیت ۴:۵). سنتِ این‌که او از سیسِرا، سردار کنعانی، نسب می‌برد از رَو نیسیم گائون است — تلمود می‌گوید «نوادگان سیسِرا تورا آموختند» بی آنکه او را نام ببرد.",
    },
    {
      he: "שְׁמַעְיָה וְאַבְטַלְיוֹן", nombre: "شِمَعیا و اَبطَلیون", origen: "نوادگان سَنحِریو", estatus: "agada", color: "#b89a4e",
      texto: "دو استاد مستقیم هیلِلِ پیر، بنا بر تلمود، از سَنحِریو (سِناخِریب) نسب می‌بردند، همان پادشاه آشوری که ده سبط را برانداخت (گیطین ۵۷b). نوادگانِ ویرانگر، تورای شفاهی را به اسرائیل می‌آموزند.",
    },
    {
      he: "בְּנֵי הָמָן", nombre: "نوادگان هامان", origen: "دشمن دیرینِ عَمالیقی", estatus: "agada", color: "#9a6a8e",
      texto: "«از نوادگان هامان در بنی‌بَرَق تورا آموختند» (گیطین ۵۷b؛ سنهِدرین ۹۶b). دشمنی که تورا فرمان می‌دهد نسلش را محو کنند، عالمانی پدید می‌آورد — در همان شهرِ ربی عَکیوا.",
    },
    {
      he: "אוּנְקְלוֹס", nombre: "اونکِلوسِ گرویده", origen: "خواهرزاده‌ی تیتوس", estatus: "agada", color: "#cf8c52",
      texto: "خواهرزاده‌ی ویرانگرِ معبد می‌گرود و تَرگوم اونکِلوس را پدید می‌آورد، همان ترجمه‌ی آرامیِ معتبر که تا امروز خوانده می‌شود (گیطین ۵۷a). از خاندان تیتوس: مترجم رسمی تورا.",
    },
    {
      he: "עוֹבַדְיָה", nombre: "عوبَدیای نبی", origen: "اَدومیِ گرویده", estatus: "agada", color: "#b06a3c",
      texto: "«عوبَدیا یک گِرِ اَدومی بود» (سنهِدرین ۳۹b، به نقل ربی مئیر). تنها کتاب نبوّتی که به سقوط اَدوم اختصاص دارد را یک اَدومیِ گرویده می‌نویسد: «دسته‌ی تبر از خودِ همان جنگل برمی‌آید».",
    },
  ];

  function FiguraCard({ f, delay }: { f: typeof LINAJE[number]; delay: number }) {
    const tag = TAG[f.estatus];
    return (
      <Sec delay={delay}>
        <div className="flex items-start gap-4 rounded-2xl border border-gold/15 p-5"
          style={{ background: "rgba(255,255,255,0.02)" }} dir="rtl">
          <span className="hebrew shrink-0 font-bold leading-none"
            style={{ fontSize: "clamp(26px, 7vw, 40px)", color: "#fff6e0", textShadow: `0 0 16px ${f.color}` }}>
            {f.he}
          </span>
          <div className="flex-1 text-right">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <p className="text-sm font-bold tracking-wide" style={{ color: f.color }}>{f.nombre}</p>
              <span className="font-cinzel text-[10px] uppercase tracking-widest" style={{ color: tag.color }}>
                {tag.label}
              </span>
            </div>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-gold/45">{f.origen}</p>
            <p className="mt-2 text-sm leading-relaxed text-parchment/85" dir="rtl">{f.texto}</p>
          </div>
        </div>
      </Sec>
    );
  }

  return (
    <div className="always-dark min-h-screen" style={{ background: bg, fontFamily: "Vazirmatn, sans-serif" }} dir="rtl">

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">חַשְׁמַל · خَشمَل</Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 text-xs text-gold transition-all hover:border-gold hover:bg-gold/10">
              شروع مطالعه ←
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── هیرو / Hero ── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            پِسَحیم ۸۷b · میدراش · سود
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(40px, 12vw, 84px)", color: "#fdf4dd",
              textShadow: "0 0 24px #c9a43e88" }}>
            נִיצוֹצוֹת
          </h1>
          <h2 className="text-xl font-bold text-parchment/90 sm:text-2xl">
            جرقه‌های مَشیَح در میان ملت‌ها
          </h2>
          <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold/55">
            מְשִׁיחַ מִבַּחוּץ — مَشیَحی که از بیرون می‌آید
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
            خونِ مَشیَح «خالص» نیست: از روتِ موآبی، راحابِ کنعانی و نَعَمای عَمّونی فرود می‌آید.
            پس از شکستن ظرف‌ها، بلندترین جرقه‌ها به پایین‌ترین جا افتادند — در میان ملت‌ها —
            و رستگاری، گردآوریِ آن‌هاست. گرویده، جرقه‌ای است که به خانه بازمی‌گردد.
          </p>
        </div>

        {/* ── یادداشت صادقانه‌ی سوفر ── */}
        <Sec>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="text-[10px] uppercase tracking-widest text-gold/55">
              پیش از آغاز — یادداشت صادقانه
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75" dir="rtl">
              در این مطالعه همواره میان <span className="text-gold/85">پَشاط</span> (آنچه متن می‌گوید)،{" "}
              <span className="text-gold/85">اَگادا</span> (سنت هِمیلیتیکِ تلمود) و{" "}
              <span className="text-gold/85">سود</span> (کابالای لوریانی) تفاوت می‌گذاریم.
              این‌که «راحاب با یهوشع ازدواج کرد» یا «از نِرون ربی مئیر برآمد»{" "}
              <span className="text-gold/90">اَگادا</span> است — حقیقتی الهیاتی، نه گزارشِ تاریخی —؛
              و این‌که «ربی عَکیوا از سیسِرا نسب می‌برد» یک{" "}
              <span className="text-gold/90">سنتِ متأخر</span> است، نه تلمودِ صریح. این را در هر چهره نشان می‌دهیم.
            </p>
          </div>
        </Sec>

        {/* ── תַּרְגּוּם ── */}
        <Sec>
          <h3 className="mb-2 text-sm uppercase tracking-[0.3em] text-gold/60">
            תַּרְגּוּם · متن‌های ریشه‌ای
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              دو متن کل مطالعه را نگه می‌دارند. نخستین، <span className="text-gold/90">دلیلِ تبعید</span>
              را می‌دهد: تنها مجازات نیست، بلکه <span className="text-gold/90">بذرافشانی</span> است.
            </p>
          </div>
        </Sec>

        <PQ
          he="לֹא הִגְלָה הַקָּדוֹשׁ בָּרוּךְ הוּא אֶת יִשְׂרָאֵל לְבֵין הָאוּמּוֹת אֶלָּא כְּדֵי שֶׁיִּתּוֹסְפוּ עֲלֵיהֶם גֵּרִים"
          fa="قدّوسِ متبارک، اسرائیل را در میان ملت‌ها تبعید نکرد مگر برای آنکه گرویدگان بدیشان افزوده شوند."
          source="تلمود، پِسَحیم ۸۷b (پشتوانه: هوشِع ۲:۲۵)"
        />

        <Sec>
          <p className="mb-2 text-sm leading-relaxed text-parchment/85" dir="rtl">
            دومین، در کوچک‌ترین قالب، تمام آموزه است: دو پرنده‌ی کوچکِ گران‌بها که در دلِ دو ملتِ
            محکوم نگاه داشته شده‌اند.
          </p>
        </Sec>

        <PQ
          he="שְׁתֵּי פְּרִידוֹת טוֹבוֹת יֵשׁ לִי לְהוֹצִיא מֵהֶן — רוּת הַמּוֹאֲבִיָּה וְנַעֲמָה הָעַמּוֹנִית"
          fa="دو جوجه‌ی نیک دارم که از ایشان [موآب و عَمّون] بیرون آورم: روتِ موآبی و نَعَمای عَمّونی."
          source="تلمود، بابا قَما ۳۸b"
        />

        <Sec>
          <p className="text-sm leading-relaxed text-parchment/70" dir="rtl">
            <span className="text-[11px] uppercase tracking-widest text-gold/50">صداقت متنی:</span>{" "}
            تلمود <span className="hebrew text-gold/85" dir="rtl">פְּרִידוֹת</span>{" "}
            (پِریدوت، «جوجه‌ها») می‌گوید، نه «کبوترها» آن‌گونه که گاه از حافظه نقل می‌شود.
            مروارید در گِل است.
          </p>
        </Sec>

        {/* ── زنان بیگانه‌ی نسَب ── */}
        <Sec>
          <h3 className="mb-2 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            הַדְּמֻיּוֹת · زنان بیگانه‌ی نسَب
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted" dir="rtl">
            چهار تن از پنج حلقه‌ی زنانه‌ی نسَب سلطنتی از بیرون می‌آیند یا از پیوندهای نامتعارف.
            این نقصی نیست که سنت تحمّلش کند: این خودِ سازوکارِ رستگاری است.
          </p>
        </Sec>

        <div className="space-y-4">
          {LINAJE.map((f, i) => <FiguraCard key={f.nombre} f={f} delay={i * 50} />)}
        </div>

        {/* ── استادانِ برآمده از دشمن ── */}
        <Sec>
          <h3 className="mb-2 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            הַגֵּרִים · استادانِ برآمده از دشمن
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted" dir="rtl">
            نه تنها نسَب: خودِ تورا نیز از بیرون تغذیه می‌شود. از خونِ سیسِرا، سَنحِریو،
            هامان و تیتوس، استادانِ اسرائیل برمی‌آیند.
          </p>
        </Sec>

        <div className="space-y-4">
          {MAESTROS.map((f, i) => <FiguraCard key={f.nombre} f={f} delay={i * 50} />)}
        </div>

        {/* ── סוֹד · شکستن ظرف‌ها و ۲۸۸ جرقه ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · شکستن ظرف‌ها و ۲۸۸ جرقه
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              برای فهم اینکه چرا جرقه‌ها <span className="text-gold/90">بیرون</span>اند، باید به سطح
              کیهانی فرود آییم. پیش از جهانِ ما، عالمِ تُهو بود که نورهایش برای ظرف‌هایش بیش از حد
              شدید بودند. ظرف‌ها شکستند —{" "}
              <span className="hebrew text-gold/90" dir="rtl">שְׁבִירַת הַכֵּלִים</span>— و پاره‌هایشان،
              آکنده از جرقه‌های نورِ مقدس، به قلمروِ <span className="italic">کِلیپوت</span> (پوسته‌ها)
              فرو افتادند. این‌ها همان{" "}
              <span className="text-gold/90">רפ״ח נִיצוֹצִין — ۲۸۸ جرقه‌اند</span> (آریزال، عِتس حَییم).
            </p>
            <p>
              آریزال این را در خودِ تورا می‌خواند، در «و روحِ خدا بر آب‌ها می‌جنبید (<span className="italic">مِراحِفِت</span>)»
              (پیدایش ۱:۲). واژه‌ی <span className="hebrew text-gold/90" dir="rtl">מְרַחֶפֶת</span>{" "}
              به <span className="hebrew text-gold/90" dir="rtl">מֵת</span> («مُرد») به‌علاوه‌ی{" "}
              <span className="hebrew text-gold/90" dir="rtl">רפ״ח</span> (۲۸۸) تجزیه می‌شود:
              همان در آیه‌ی دوم رمزگذاری شده که <span className="text-gold/90">۲۸۸ جرقه مُردند</span>.
            </p>
          </div>

          <div className="my-8 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#dcae4699", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #dcae4633" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,11vw,64px)", color: "#fff6e0", textShadow: "0 0 22px #dcae46, 0 0 8px #dcae46" }}>מְרַחֶפֶת</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#dcae46" }}>می‌جنبید · ۷۲۸</span>
            </div>
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#b06a3c99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #b06a3c33" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,11vw,64px)", color: "#fff6e0", textShadow: "0 0 22px #b06a3c, 0 0 8px #b06a3c" }}>מֵת</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#b06a3c" }}>مُرد · ۴۴۰</span>
            </div>
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
              style={{ borderColor: "#f0d06099", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #f0d06033" }}>
              <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,11vw,64px)", color: "#fff6e0", textShadow: "0 0 22px #f0d060, 0 0 8px #f0d060" }}>רפ״ח</span>
              <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#f0d060" }}>۲۸۸ جرقه</span>
            </div>
          </div>
          <p className="text-center text-xs leading-relaxed text-parchment/55" dir="rtl">
            ۴۴۰ + ۲۸۸ = ۷۲۸. حساب دقیقاً بسته می‌شود. (گماتریاها توسط سوفر راستی‌آزمایی شد.)
          </p>
        </Sec>

        {/* ── בֵּרוּר ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            בֵּרוּר · چرا جرقه‌ها بیرون می‌افتند
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              رسالت اسرائیل در تاریخ، <span className="text-gold/90">بِرور</span> است: جدا کردن،
              گردآوردن و بالا بردنِ آن ۲۸۸ جرقه به سوی ریشه‌شان. هر میتسوا، هر عملِ قداست با نیّت
              (<span className="italic">کَوانا</span>)، جرقه‌ای را از پوسته بیرون می‌کشد.
            </p>
            <p>
              و اینجا منطق لوریانی کارد را می‌چرخاند: <span className="text-gold/90">فرود به‌اندازه‌ی
              بلندی است</span>. هرچه ریشه‌ی یک جرقه بلندتر، با شکستن ظرف عمیق‌تر فرو می‌افتد. از همین رو
              مقدّس‌ترین جرقه‌ها در پایین‌ترین جاها آرمیده‌اند — ملت‌ها، پوسته‌ها، اقوامِ دشمن. از اینجا
              پِسَحیم ۸۷b معنای کامل می‌یابد: خدا اسرائیل را تبعید کرد{" "}
              <span className="text-gold/90">تا گرویدگان افزوده شوند</span> — تبعید، خودِ عملیاتِ نجات است.
              یهودیِ پراکنده، گردآورنده‌ی جرقه‌هاست؛{" "}
              <span className="hebrew text-gold/90" dir="rtl">גֵּר</span> (گرویده){" "}
              <span className="text-gold/90">جرقه‌ای است که به خانه بازمی‌گردد</span>.
            </p>
            <p>
              از این‌رو مَشیَح از زنان بیگانه می‌گذرد. والاترین بُعدِ او — مرتبه‌ی{" "}
              <span className="hebrew text-gold/90" dir="rtl">יְחִידָה</span> (یِحیدا)، جانی که با خدا
              یکی است — همان است که <span className="italic">دورترین</span> افتاد: به موآب (روت)، به عَمّون
              (نَعَما)، به کنعان (راحاب، تامار)، به مصر (بیتیا). جانِ مَشیَح از جرقه‌هایی که از بیرون
              آورده می‌شوند ساخته می‌شود، از طریق زنانی که مرز را درمی‌نوردند. مروارید در لجن است
              چون والاترین نور همان‌جا افتاد. این همان فرودِ{" "}
              <Link href="/misterio/linaje" className="text-gold underline-offset-2 hover:underline">نسَب ممنوعِ مَشیَح</Link> است.
            </p>
          </div>
        </Sec>

        <PQ
          he="לֵית אֲתַר פָּנוּי מִנֵּיהּ"
          fa="هیچ جایی از او تهی نیست — حتی پوسته، حتی ملتِ دشمن: در هر فرود، جرقه‌ای در انتظار است."
          source="تیکونی زوهر ۵۷ · از طریق بَعل شِم طوو"
        />

        {/* ── פרד״ס ── */}
        <Sec>
          <h3 className="mb-6 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            פרד״ס · چهار قرائت
          </h3>
          <div className="space-y-4">
            {[
              {
                he: "פְּשָׁט", name: "پَشاط",
                txt: "متن‌ها بی‌پرده می‌گویند: داوود از روتِ موآبی فرود می‌آید (روت ۴)؛ دودمان از طریق نَعَمای عَمّونی ادامه می‌یابد (اول پادشاهان ۱۴:۲۱). این متن است، نه افسانه.",
              },
              {
                he: "רֶמֶז", name: "رِمِز",
                txt: "דָּוִד (داوود) = ۱۴ = دو بار هفت، مُهرِ پایانیِ نسَب‌نامه (روت ۴:۱۸–۲۲). רוּת (روت) = ۶۰۶؛ با ۷ میتسوای بنی‌نوحی که هنگام گرویدن پذیرفت = ۶۱۳، شمارِ میتسواهای تورا (رمزی سنتی).",
              },
              {
                he: "דְּרָשׁ", name: "دِراش",
                txt: "«دو جوجه‌ی نیک» (بابا قَما ۳۸b): موآب و عَمّون، زاده از زنای لوط، ملت‌هایی نفرین‌شده، به‌خاطر دو زن دست‌نخورده نگاه داشته می‌شوند. میدراش، نسَب‌نامه را به الهیات بدل می‌کند.",
              },
              {
                he: "סוֹד", name: "سود",
                txt: "بَعل هَسولام: تمام آفرینش، گرداندنِ راتسون لِکَبِل (میل به دریافت، ریشه‌ی پوسته) به راتسون لِهَشپیع (میل به بخشیدن) است. گرویده موردِ حدّی است: میلی «خالص»، از دورترین کرانه‌ی ظرفِ شکسته، که سراسر به سوی بخشیدن چرخیده است.",
              },
            ].map((r) => (
              <div key={r.name} className="flex items-start gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: "rgba(255,255,255,0.02)" }} dir="rtl">
                <span className="hebrew shrink-0 text-2xl font-bold text-gold/80" dir="rtl"
                  style={{ textShadow: "0 0 12px #c9a43e66" }}>
                  {r.he}
                </span>
                <div className="flex-1 text-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-gold/70">{r.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85" dir="rtl">{r.txt}</p>
                </div>
              </div>
            ))}
          </div>
        </Sec>

        {/* ── הִתְבּוֹנְנוּת ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            הִתְבּוֹנְנוּת · تأمل
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              مَشیَح نمی‌آید تا پاکان را <span className="italic">پاداش</span> دهد. می‌آید تا{" "}
              <span className="text-gold/90">پراکنده را گرد آورد</span>. و آنچه دورتر پراکنده شد،
              گران‌بهاترین است.
            </p>
            <p>
              به زندگیِ خودت با همین عدسی بنگر. جرقه‌هایت در پست‌ترین جاهای تو هستند: در آنچه
              ناشایست‌ترینِ خود می‌پنداری، در کسان و قوم‌هایی که غریزه‌ات کنارشان می‌گذارد. دختر فرعون،
              روسپیِ اَریحا، زنِ موآبی، خواهرزاده‌ی تیتوس، نواده‌ی هامان: هیچ‌کدام «از آنِ» این‌جا نبودند،
              و همه نوری را که کم بود برداشتند.
            </p>
            <p>
              تفاوتِ میان پوسته و جرقه در جایگاه نیست — در این است که میل رو به کجا می‌چرخد. کدام
              بخش‌های خود، کدام کسان را «بیرون» انگاشته‌ای؟ دقیقاً همان‌جا، آنچه مَشیَح برای
              گردآوردنش آمد، در انتظار است.
            </p>
          </div>
        </Sec>

        {/* ── מַעֲשֶׂה ── */}
        <Sec>
          <h3 className="mb-4 mt-16 text-sm uppercase tracking-[0.3em] text-gold/60">
            מַעֲשֶׂה · عمل
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85" dir="rtl">
            <p>
              <span className="text-gold/90">یک بِرورِ مشخص، همین امروز:</span> یک چیزِ «پست» یا کنارگذاشته
              را برگزین — کاری فروتنانه، کسی که معمولاً نادیده‌اش می‌گیری — و آن را با یک برکت یا نیّتی
              آگاهانه بالا ببر. جرقه‌ای از «سهمِ خودت در جهان» را گرد آور (تَنیا ۳۷).
            </p>
            <p>
              <span className="text-gold/90">به یک «بیرونی» احترام بگذار:</span> تورا در ۳۶ جا فرمان می‌دهد
              گِر را دوست بدار (بابا مِتسیعا ۵۹b)، پرتکرارترین حکم در تمام تورا. امروز یکی را به‌جا آور:
              با یک گرویده یا غریبه با همان احترامی رفتار کن که تلمود به اونکِلوس و روت داد.
            </p>
            <p>
              <span className="text-gold/90">داوری‌ای را بازبین:</span> کسی را که «اصلاح‌ناپذیر» انگاشته‌ای
              بیاب و آن داوری را یک روز معلق بگذار. نواده‌ی هامان تورا آموخت؛ دشمنِ تو می‌تواند نوری را که
              تو کم داری، حمل کند.
            </p>
          </div>
        </Sec>

        {/* ── חֲתִימָה ── */}
        <Sec>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: "0 0 12px #c9a43e88" }}>
              חֲתִימָה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              جرقه‌ای که به خانه بازمی‌گردد
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              نیروی مَشیَح از آنچه <span className="text-parchment/80">بیرون</span> بود تغذیه می‌شود.
              بلندترین جرقه‌ها (۲۸۸ · רפ״ח) به پایین‌ترین جا افتادند — در میان ملت‌ها — و رستگاری،
              گردآوریِ آن‌هاست. از این‌رو نسَب از تامار، راحاب، روت، نَعَما و بیتیا می‌گذرد، و نوادگانِ
              سیسِرا، سَنحِریو، هامان و تیتوس، استادانِ اسرائیل را پدید می‌آورند. تبعید تنها مجازات نیست:
              <span className="text-parchment/80"> بذرافشانی</span> است.
            </p>

            {/* مُهر سری: נחש = ۳۵۸ = משיח */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#b06a3c99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #b06a3c33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,10vw,56px)", color: "#fff6e0", textShadow: "0 0 16px #b06a3c" }}>נָחָשׁ</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#b06a3c" }}>نَحاش · مار · ۳۵۸</span>
              </div>
              <span className="font-cinzel text-2xl text-gold/40">=</span>
              <div className="inline-flex flex-col items-center rounded-2xl border-2 px-6 py-4"
                style={{ borderColor: "#c9a43e99", background: "rgba(14,12,22,0.96)", boxShadow: "0 0 24px #c9a43e33" }}>
                <span className="hebrew font-bold leading-none" style={{ fontSize: "clamp(40px,10vw,56px)", color: "#fff6e0", textShadow: "0 0 16px #c9a43e" }}>מָשִׁיחַ</span>
                <span className="mt-2 text-xs uppercase tracking-widest" style={{ color: "#c9a43e" }}>مَشیَح · مسیح · ۳۵۸</span>
              </div>
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted" dir="rtl">
              همان حسابی که فرود را می‌سنجد، رستگاری را نیز می‌سنجد: مَشیَح تا ریشه‌ی فرود فرو می‌رود —
              تا ملت‌ها، تا لجن — تا والاترین نور را از همان‌جا بیرون بکشد.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "تبعید همچون بذرافشانی · پِسَحیم ۸۷b", ref: "Pesachim 87b" },
                { label: "دو جوجه · بابا قَما ۳۸b", ref: "Bava Kamma 38b" },
                { label: "روت، جده‌ی بزرگ داوود · روت ۴", ref: "Ruth 4" },
                { label: "راحاب و پیامبران · مِگیلا ۱۴b", ref: "Megillah 14b" },
                { label: "استادانِ بیرون · گیطین ۵۷b", ref: "Gittin 57b" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Ruth 4")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              ← مطالعه‌ی این راز در خَشمَل
            </button>

            {/* הֶמְשֵׁךְ — ادامه‌ی مسیر */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/linaje" className="hover:text-gold">← نسَب ممنوع</Link>
              <Link href="/misterio/lot" className="hover:text-gold">← راز لوط</Link>
              <Link href="/misterio/tamar" className="hover:text-gold">← راز تامار</Link>
              <Link href="/misterio/358" className="hover:text-gold">← نَحاش = مَشیَح = ۳۵۸</Link>
            </div>
          </div>
        </Sec>

        {/* Footer */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            کابالا و فلسفه‌ی یهودی
          </p>
        </div>

      </main>
    </div>
  );
}

// ── Página ────────────────────────────────────────────────────────────────────
export default function ChispasEnLasNacionesPage() {
  const locale = useLocale();
  const router = useRouter();
  const [dark, setDark] = useState(true);
  useEffect(() => { document.documentElement.classList.add("dark"); setDark(true); }, []);

  if (locale === "fa") return <ChispasFarsi />;
  const bg = dark ? "#05050a" : "#f1ebdd";
  const navBg = dark ? "rgba(5,5,10,0.9)" : "rgba(241,235,221,0.9)";

  return (
    <div className={`${dark ? "always-dark" : ""} min-h-screen`} style={{ background: bg }} dir="ltr">

      {/* Nav */}
      <nav className="sticky top-0 z-40 border-b border-gold/10 px-5 py-3 backdrop-blur-md" style={{ background: navBg }}>
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link href="/" className="font-cinzel text-sm text-gold/70 hover:text-gold">חַשְׁמַל · Jashmal</Link>
          <div className="flex items-center gap-3">
            <MisterioLangToggle />
            <button onClick={() => router.push("/estudio")}
              className="rounded-full border border-gold/30 px-4 py-1.5 font-cinzel text-xs uppercase tracking-widest text-gold transition-all hover:border-gold hover:bg-gold/10">
              Comenzar estudio →
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-2xl px-5 pb-24 pt-16">

        {/* ── HERO ── */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-cinzel text-xs uppercase tracking-[0.4em] text-gold/50">
            Pesajim 87b · Midrash · Sod
          </p>
          <h1 className="hebrew mb-3 font-bold leading-none"
            style={{ fontSize: "clamp(40px, 12vw, 84px)", color: dark ? "#fdf4dd" : "#6e4f12",
              textShadow: dark ? "0 0 24px #c9a43e88" : "none" }}>
            נִיצוֹצוֹת
          </h1>
          <h2 className="font-cinzel text-xl font-bold text-parchment/90 sm:text-2xl">
            Las chispas del Mashíaj en las naciones
          </h2>
          <p className="mt-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/55">
            מְשִׁיחַ מִבַּחוּץ — el Mashíaj que viene de afuera
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
            La sangre del Mashíaj no es «pura»: desciende de Rut la moabita, Rajav la cananea,
            Naamá la amonita. Tras la rotura de los vasos, las chispas más altas cayeron más
            bajo —entre las naciones— y la redención es recogerlas. El converso es una chispa
            que vuelve a casa.
          </p>
        </div>

        {/* ── Nota de honestidad del Sofer ── */}
        <Section>
          <div className="mb-16 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4">
            <p className="font-cinzel text-[10px] uppercase tracking-widest text-gold/55">
              Antes de empezar — nota de honestidad
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-parchment/75">
              En este estudio distinguimos siempre <span className="text-gold/85">pshat</span> (lo
              que dice el texto), <span className="text-gold/85">agadá</span> (la tradición
              homilética del Talmud) y <span className="text-gold/85">sod</span> (la cábala
              luriánica). Que «Rajav se casó con Yehoshúa» o que «de Nerón salió Rabbi Meir» son{" "}
              <span className="text-gold/90">agadá</span> —verdad teológica, no crónica histórica—;
              que «Rabbi Akiva descendía de Sísera» es una <span className="text-gold/90">tradición
              posterior</span>, no Talmud literal. Lo señalamos en cada figura.
            </p>
          </div>
        </Section>

        {/* ── Tárgum: los textos-raíz ── */}
        <Section>
          <h3 className="mb-2 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            תַּרְגּוּם · Los textos-raíz
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Dos textos sostienen todo el estudio. El primero da la <span className="text-gold/90">razón
              del exilio</span>: no es solo castigo, es <span className="text-gold/90">siembra</span>.
            </p>
          </div>
        </Section>

        <PullQuote
          he="לֹא הִגְלָה הַקָּדוֹשׁ בָּרוּךְ הוּא אֶת יִשְׂרָאֵל לְבֵין הָאוּמּוֹת אֶלָּא כְּדֵי שֶׁיִּתּוֹסְפוּ עֲלֵיהֶם גֵּרִים"
          es="No exilió el Santo, bendito sea, a Israel entre las naciones sino para que se les agregaran conversos."
          source="Talmud, Pesajim 87b (apoyo: Hoshea 2:25)"
        />

        <Section>
          <p className="mb-2 text-sm leading-relaxed text-parchment/85">
            El segundo, en miniatura, es toda la doctrina: dos pequeñas aves preciosas guardadas
            dentro de dos naciones enteras condenadas.
          </p>
        </Section>

        <PullQuote
          he="שְׁתֵּי פְּרִידוֹת טוֹבוֹת יֵשׁ לִי לְהוֹצִיא מֵהֶן — רוּת הַמּוֹאֲבִיָּה וְנַעֲמָה הָעַמּוֹנִית"
          es="Dos preciosas polluelas tengo que extraer de ellos [Moab y Amón]: Rut la moabita y Naamá la amonita."
          source="Talmud, Bava Kama 38b"
        />

        <Section>
          <p className="text-sm leading-relaxed text-parchment/70">
            <span className="font-cinzel text-[11px] uppercase tracking-widest text-gold/50">Honestidad textual:</span>{" "}
            el Talmud dice <span className="hebrew text-gold/85" dir="rtl">פְּרִידוֹת</span>{" "}
            (peridot, «polluelas»), no «palomas» como a veces se cita de memoria. La perla está en el barro.
          </p>
        </Section>

        {/* ── Las forasteras del linaje ── */}
        <Section>
          <h3 className="mb-2 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            הַדְּמֻיּוֹת · Las forasteras del linaje
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            Cuatro de los cinco eslabones femeninos del linaje real vienen de afuera o de uniones
            irregulares. No es un defecto que la tradición tolere: es el mecanismo de la redención.
          </p>
        </Section>

        <div className="space-y-4">
          {LINAJE.map((f, i) => <FiguraCard key={f.nombre} f={f} delay={i * 50} />)}
        </div>

        {/* ── Los maestros venidos del enemigo ── */}
        <Section>
          <h3 className="mb-2 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            הַגֵּרִים · Los maestros venidos del enemigo
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted">
            No solo el linaje: también la Torá misma se nutre de afuera. De la sangre de Sísera,
            Sanjeriv, Hamán y Tito salen los maestros de Israel.
          </p>
        </Section>

        <div className="space-y-4">
          {MAESTROS.map((f, i) => <FiguraCard key={f.nombre} f={f} delay={i * 50} />)}
        </div>

        {/* ── El hilo cabalístico: la rotura y las 288 chispas ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            סוֹד · La rotura de los vasos y las 288 chispas
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              Para entender por qué las chispas están <span className="text-gold/90">afuera</span>, hay
              que bajar al nivel cósmico. Antes de nuestro mundo hubo el mundo del Tohu, cuyas luces
              eran demasiado intensas para sus vasos. Los vasos se rompieron —{" "}
              <span className="hebrew text-gold/90" dir="rtl">שְׁבִירַת הַכֵּלִים</span>— y sus fragmentos,
              cargados de chispas de luz santa, cayeron al dominio de las{" "}
              <span className="italic">kelipot</span> (las cáscaras). Son las{" "}
              <span className="text-gold/90">רפ״ח נִיצוֹצִין — las 288 chispas</span> (Arizal, Etz Jaim).
            </p>
            <p>
              El Arizal lo lee dentro de la Torá misma, en «y el espíritu de Dios revoloteaba (<span className="italic">merajéfet</span>)
              sobre las aguas» (Bereshit 1:2). La palabra <span className="hebrew text-gold/90" dir="rtl">מְרַחֶפֶת</span>{" "}
              se descompone en <span className="hebrew text-gold/90" dir="rtl">מֵת</span> («murió») más{" "}
              <span className="hebrew text-gold/90" dir="rtl">רפ״ח</span> (288): ya en el segundo versículo
              está cifrado que <span className="text-gold/90">murieron las 288 chispas</span>.
            </p>
          </div>

          <div className="my-8 flex flex-wrap items-center justify-center gap-3">
            <HebrewTile he="מְרַחֶפֶת" sub="revoloteaba · 728" color="#dcae46" />
            <span className="font-cinzel text-2xl text-gold/40">=</span>
            <HebrewTile he="מֵת" sub="murió · 440" color="#b06a3c" />
            <span className="font-cinzel text-2xl text-gold/40">+</span>
            <HebrewTile he="רפ״ח" sub="288 chispas" color="#f0d060" />
          </div>
          <p className="text-center text-xs leading-relaxed text-parchment/55">
            440 + 288 = 728. La cuenta cierra exacta. (Gematrías verificadas por el Sofer.)
          </p>
        </Section>

        {/* ── Birur: por qué caen afuera ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            בֵּרוּר · Por qué las chispas caen afuera
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              La misión de Israel en la historia es el <span className="text-gold/90">birur</span>:
              separar, recoger y elevar esas 288 chispas de vuelta a su raíz. Cada mitzvá, cada acto de
              santidad con intención (<span className="italic">kavaná</span>), extrae una chispa de la cáscara.
            </p>
            <p>
              Y aquí la lógica luriánica gira el cuchillo: <span className="text-gold/90">la caída es
              proporcional a la altura</span>. Cuanto más elevada es la raíz de una chispa, más profundo
              cae al romperse el vaso. Por eso las chispas más santas yacen en los lugares más bajos —
              las naciones, las cáscaras, los pueblos enemigos. De ahí cobra sentido pleno Pesajim 87b:
              Dios exilió a Israel <span className="text-gold/90">para que se agreguen conversos</span> —
              el exilio es la operación de rescate—. El judío disperso es recolector de chispas; el{" "}
              <span className="hebrew text-gold/90" dir="rtl">גֵּר</span> (converso) es{" "}
              <span className="text-gold/90">una chispa que vuelve a casa</span>.
            </p>
            <p>
              Por eso el Mashíaj pasa por las forasteras. Su dimensión más alta —el nivel{" "}
              <span className="hebrew text-gold/90" dir="rtl">יְחִידָה</span> (Yejidá), el alma que es uno
              con Dios— es la que cayó <span className="italic">más</span> lejos: a Moab (Rut), a Amón
              (Naamá), a Cnáan (Rajav, Tamar), a Egipto (Bityá). El alma del Mashíaj se ensambla con
              chispas traídas desde el exterior, a través de mujeres que cruzan la frontera. La perla
              está en el lodo porque allí cayó la luz más alta. Es el mismo descenso del{" "}
              <Link href="/misterio/linaje" className="text-gold underline-offset-2 hover:underline">linaje prohibido del Mashíaj</Link>.
            </p>
          </div>
        </Section>

        <PullQuote
          he="לֵית אֲתַר פָּנוּי מִנֵּיהּ"
          es="No hay lugar vacío de Él — ni siquiera la cáscara, ni la nación enemiga: en cada descenso hay una chispa esperando."
          source="Tikunei Zohar 57 · vía el Baal Shem Tov"
        />

        {/* ── PaRDeS ── */}
        <Section>
          <h3 className="mb-6 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            פרד״ס · Las cuatro lecturas
          </h3>
          <div className="space-y-4">
            {[
              {
                he: "פְּשָׁט", name: "Pshat",
                txt: "Los textos lo dicen sin rodeos: David desciende de Rut la moabita (Rut 4); la dinastía sigue por Naamá la amonita (I Reyes 14:21). Es texto, no leyenda.",
              },
              {
                he: "רֶמֶז", name: "Remez",
                txt: "דָּוִד (David) = 14 = dos veces siete, el cierre de la genealogía (Rut 4:18–22). רוּת (Rut) = 606; con las 7 mitzvot que aceptó al convertirse = 613, las mitzvot de la Torá (remez tradicional).",
              },
              {
                he: "דְּרָשׁ", name: "Drash",
                txt: "«Dos polluelas buenas» (Bava Kama 38b): Moab y Amón, nacidos del incesto de Lot, naciones malditas, son preservadas enteras por causa de dos mujeres. El midrash convierte la genealogía en teología.",
              },
              {
                he: "סוֹד", name: "Sod",
                txt: "Baal HaSulam: la creación entera es voltear el ratzón lekabel (deseo de recibir, raíz de la cáscara) en ratzón lehashpiá (deseo de dar). El ger es el caso límite: un deseo «puro», del extremo más alejado del vaso roto, vuelto por entero hacia el dar.",
              },
            ].map((r) => (
              <div key={r.name} className="flex items-start gap-4 rounded-2xl border border-gold/15 p-5"
                style={{ background: "rgba(255,255,255,0.02)" }}>
                <span className="hebrew shrink-0 text-2xl font-bold text-gold/80" dir="rtl"
                  style={{ textShadow: "0 0 12px #c9a43e66" }}>
                  {r.he}
                </span>
                <div className="flex-1">
                  <p className="font-cinzel text-xs font-bold uppercase tracking-widest text-gold/70">{r.name}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-parchment/85">{r.txt}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── Hitbonenut ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            הִתְבּוֹנְנוּת · Contemplación
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              El Mashíaj no viene a <span className="italic">premiar</span> a los puros. Viene a{" "}
              <span className="text-gold/90">reunir lo disperso</span>. Y lo que se dispersó más lejos
              es lo más precioso.
            </p>
            <p>
              Mira tu propia vida con esta lente. Tus chispas están en tus lugares más bajos: en lo que
              crees lo más indigno de ti, en las personas y los pueblos que tu instinto descarta. La
              hija del faraón, la ramera de Jericó, la moabita, el sobrino de Tito, el descendiente de
              Hamán: ninguno «pertenecía», y todos resultaron portar la luz que faltaba.
            </p>
            <p>
              La diferencia entre la cáscara y la chispa no está en el lugar — está en hacia dónde se
              vuelve el deseo. ¿Qué partes de ti, qué personas, has dado por «afuera»? Ahí, exactamente
              ahí, espera lo que el Mashíaj vino a recoger.
            </p>
          </div>
        </Section>

        {/* ── Maasé ── */}
        <Section>
          <h3 className="mb-4 mt-16 font-cinzel text-sm uppercase tracking-[0.3em] text-gold/60">
            מַעֲשֶׂה · Acción
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-parchment/85">
            <p>
              <span className="text-gold/90">Un birur concreto, hoy:</span> elige una sola cosa «baja» o
              descartada —una tarea humilde, una persona que sueles ignorar— y elévala con una bendición
              o una intención consciente. Recoge una chispa de tu propia «porción del mundo» (Tania 37).
            </p>
            <p>
              <span className="text-gold/90">Honra a un «de afuera»:</span> la Torá ordena amar al ger en
              36 lugares (Bava Metziá 59b), lo más repetido de toda la Torá. Hoy, cumple uno: trata a un
              converso o a un extraño con el honor que el Talmud dio a Onkelos y a Rut.
            </p>
            <p>
              <span className="text-gold/90">Revisa un juicio:</span> identifica a alguien que hayas
              descartado como «irredimible» y suspende ese juicio por un día. El descendiente de Hamán
              enseñó Torá; tu enemigo puede portar tu luz que falta.
            </p>
          </div>
        </Section>

        {/* ── Jatimá · El sello ── */}
        <Section>
          <div className="mt-16 rounded-2xl border border-gold/20 bg-gradient-to-b from-gold/[0.06] to-transparent p-8 text-center">
            <p className="hebrew mb-3 text-3xl text-gold" style={{ textShadow: dark ? "0 0 12px #c9a43e88" : "none" }}>
              חֲתִימָה
            </p>
            <h3 className="mb-3 font-cinzel text-base font-bold text-parchment/90">
              La chispa que vuelve a casa
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              La fuerza del Mashíaj se nutre de lo que estaba <span className="text-parchment/80">afuera</span>.
              Las chispas más altas (288 · רפ״ח) cayeron más bajo —entre las naciones— y la redención es
              recogerlas. Por eso el linaje pasa por Tamar, Rajav, Rut, Naamá y Bityá, y los
              descendientes de Sísera, Sanjeriv, Hamán y Tito producen los maestros de Israel. El exilio
              no es solo castigo: es <span className="text-parchment/80">siembra</span>.
            </p>

            {/* Sello de la serie: נחש = 358 = משיח */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
              <HebrewTile he="נָחָשׁ" sub="Serpiente · 358" color="#b06a3c" />
              <span className="font-cinzel text-2xl text-gold/40">=</span>
              <HebrewTile he="מָשִׁיחַ" sub="Mashíaj · 358" color="#c9a43e" />
            </div>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted">
              La misma cuenta que mide la caída mide la redención: el Mashíaj baja hasta la raíz del
              descenso —hasta las naciones, hasta el lodo— para sacar de ahí la luz más alta.
            </p>

            <div className="mb-6 flex flex-wrap justify-center gap-2">
              {[
                { label: "El exilio como siembra · Pesajim 87b", ref: "Pesachim 87b" },
                { label: "Las dos polluelas · Bava Kama 38b", ref: "Bava Kamma 38b" },
                { label: "Rut, bisabuela de David · Rut 4", ref: "Ruth 4" },
                { label: "Rajav y los profetas · Meguilá 14b", ref: "Megillah 14b" },
                { label: "Los maestros de afuera · Guitín 57b", ref: "Gittin 57b" },
              ].map((t, i) => (
                <button key={i} onClick={() => router.push(`/estudio?ref=${encodeURIComponent(t.ref)}`)}
                  className="rounded-full border border-gold/25 px-4 py-1.5 font-cinzel text-xs text-gold/70 transition-all hover:border-gold hover:bg-gold/10 hover:text-gold">
                  {t.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => router.push(`/estudio?ref=${encodeURIComponent("Ruth 4")}&context=kabbalah`)}
              className="rounded-full border-2 border-gold bg-gold/10 px-8 py-3.5 font-cinzel text-sm font-bold uppercase tracking-widest text-gold transition-all hover:bg-gold/20"
              style={{ boxShadow: "0 0 20px rgba(201,164,62,0.25)" }}
            >
              Estudiar este misterio en Jashmal →
            </button>

            {/* Hemshej — umbral «Sigue el hilo» */}
            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 font-cinzel text-[11px] uppercase tracking-widest text-gold/50">
              <Link href="/misterio/linaje" className="hover:text-gold">El linaje prohibido →</Link>
              <Link href="/misterio/lot" className="hover:text-gold">El misterio de Lot →</Link>
              <Link href="/misterio/tamar" className="hover:text-gold">El misterio de Tamar →</Link>
              <Link href="/misterio/358" className="hover:text-gold">Najash = Mashíaj = 358 →</Link>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-16 border-t border-gold/10 pt-8 text-center">
          <p className="hebrew text-2xl text-gold/60">חַשְׁמַל</p>
          <p className="mt-1 font-cinzel text-xs uppercase tracking-widest text-muted/50">
            Cabalá &amp; Filosofía Judía
          </p>
        </div>

      </main>
    </div>
  );
}
