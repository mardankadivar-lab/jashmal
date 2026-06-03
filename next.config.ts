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
    ];
  },
};

export default withNextIntl(nextConfig);
