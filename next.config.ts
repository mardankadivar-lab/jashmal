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
      { source: "/tamar", destination: "/es/misterio/tamar" },
      { source: "/habakuk", destination: "/es/misterio/habakuk" },
      { source: "/bilaam", destination: "/es/misterio/bilaam" },
      { source: "/137", destination: "/es/misterio/137" },
      { source: "/entrelazamiento", destination: "/es/misterio/entrelazamiento" },
      { source: "/sanador", destination: "/es/misterio/sanador" },
      { source: "/refael", destination: "/es/misterio/refael" },
      { source: "/serpiente-de-cobre", destination: "/es/misterio/serpiente-de-cobre" },
      { source: "/refua", destination: "/es/misterio/refua" },
      { source: "/21-pactos", destination: "/es/misterio/21-pactos" },
      { source: "/universo", destination: "/es/universo" },
    ];
  },
  async redirects() {
    // "/cerebro" y "/grafo" eran nombres viejos del universo. Redirigen (301) a
    // /universo para no romper enlaces compartidos ni el SEO.
    return [
      { source: "/grafo", destination: "/universo", permanent: true },
      { source: "/es/grafo", destination: "/es/universo", permanent: true },
      { source: "/fa/grafo", destination: "/fa/universo", permanent: true },
      { source: "/en/grafo", destination: "/en/universo", permanent: true },
      { source: "/cerebro", destination: "/universo", permanent: true },
      { source: "/es/cerebro", destination: "/es/universo", permanent: true },
      { source: "/fa/cerebro", destination: "/fa/universo", permanent: true },
      { source: "/en/cerebro", destination: "/en/universo", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
