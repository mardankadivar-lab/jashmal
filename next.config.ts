import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async rewrites() {
    // Atajos TikTok: la URL en el navegador QUEDA como /26 o /358
    // (rewrite interno, no redirect). El middleware los ignora para que
    // next-intl no añada /es antes de que lleguen aquí.
    return [
      { source: "/358", destination: "/es/misterio/358" },
      { source: "/26",  destination: "/es/misterio/26"  },
      { source: "/linaje", destination: "/es/misterio/linaje" },
      { source: "/habakuk", destination: "/es/misterio/habakuk" },
      { source: "/bilaam", destination: "/es/misterio/bilaam" },
      { source: "/137", destination: "/es/misterio/137" },
      { source: "/entrelazamiento", destination: "/es/misterio/entrelazamiento" },
      { source: "/sanador", destination: "/es/misterio/sanador" },
      { source: "/refael", destination: "/es/misterio/refael" },
      { source: "/serpiente-de-cobre", destination: "/es/misterio/serpiente-de-cobre" },
      { source: "/refua", destination: "/es/misterio/refua" },
      { source: "/cerebro", destination: "/es/cerebro" },
    ];
  },
  async redirects() {
    // "grafo" era el nombre técnico viejo del cerebro. Redirige (301) al nuevo
    // /cerebro para no romper enlaces compartidos ni el SEO.
    return [
      { source: "/grafo", destination: "/cerebro", permanent: true },
      { source: "/es/grafo", destination: "/es/cerebro", permanent: true },
      { source: "/fa/grafo", destination: "/fa/cerebro", permanent: true },
      { source: "/en/grafo", destination: "/en/cerebro", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
