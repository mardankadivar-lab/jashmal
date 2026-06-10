import type { Metadata } from "next";
import { Cinzel, EB_Garamond, Frank_Ruhl_Libre, Vazirmatn } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { routing, type Locale } from "@/i18n/routing";
import { localizedMetadata } from "@/lib/i18n/seo";
import GlobalTutor from "@/components/GlobalTutor";
import "../globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

// Cuerpo de lectura: EB Garamond — Garamond clásico pero diseñado para leerse
// a tamaño de texto (mucho más legible que Cormorant en cuerpo).
const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

// Texto hebreo: Frank Ruhl Libre, la serif hebrea clásica de los libros sagrados.
const frankRuhl = Frank_Ruhl_Libre({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-hebrew",
  display: "swap",
});

const vazir = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazir",
  display: "swap",
});

// SEO por idioma: título y descripción salen de messages/ (traducido en es/en/fa)
// vía el helper oficial. Antes era estático y solo en español para los 3 idiomas.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL("https://jashmal.org"),
    ...(await localizedMetadata(locale as Locale)),
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === "fa" ? "rtl" : "ltr";
  const baseFont = locale === "fa" ? "font-vazir" : "font-body";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* Anti-parpadeo: aplica el tema guardado antes de pintar. Claro por defecto. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{if(localStorage.getItem('jashmal-theme')==='dark')d.classList.add('dark');}catch(e){}try{var sz=localStorage.getItem('jashmal-textsize'),m={sm:'100%',md:'112.5%',lg:'128%',xl:'145%'};if(sz&&m[sz])d.style.fontSize=m[sz];}catch(e){}try{if(localStorage.getItem('jashmal-studymode')==='1')d.classList.add('study-mode');}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${cinzel.variable} ${garamond.variable} ${frankRuhl.variable} ${vazir.variable} ${baseFont} bg-ink text-parchment min-h-screen`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
          <GlobalTutor />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
