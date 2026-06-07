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
      { source: "/enoch", destination: "/es/misterio/enoch" },
    ];
  },
  async redirects() {
    // Rutas viejas de la "Mente Cósmica": "/grafo" y "/cerebro" fueron nombres
    // previos, y "/universo" fue la ruta anterior. TODAS redirigen de forma
    // permanente a /mente-cosmica para no romper enlaces compartidos, marcadores
    // ni el SEO. redirects() corre ANTES del middleware de next-intl, así que
    // cada locale (/es, /fa, /en) salta directo, sin doble salto.
    return [
      { source: "/universo", destination: "/mente-cosmica", permanent: true },
      { source: "/es/universo", destination: "/es/mente-cosmica", permanent: true },
      { source: "/fa/universo", destination: "/fa/mente-cosmica", permanent: true },
      { source: "/en/universo", destination: "/en/mente-cosmica", permanent: true },
      { source: "/grafo", destination: "/mente-cosmica", permanent: true },
      { source: "/es/grafo", destination: "/es/mente-cosmica", permanent: true },
      { source: "/fa/grafo", destination: "/fa/mente-cosmica", permanent: true },
      { source: "/en/grafo", destination: "/en/mente-cosmica", permanent: true },
      { source: "/cerebro", destination: "/mente-cosmica", permanent: true },
      { source: "/es/cerebro", destination: "/es/mente-cosmica", permanent: true },
      { source: "/fa/cerebro", destination: "/fa/mente-cosmica", permanent: true },
      { source: "/en/cerebro", destination: "/en/mente-cosmica", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
