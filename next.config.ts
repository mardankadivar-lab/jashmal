import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Atajos cortos para campañas de TikTok → redirigen a la landing completa.
  async redirects() {
    return [
      { source: "/358", destination: "/misterio/358", permanent: false },
      { source: "/26",  destination: "/misterio/26",  permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
