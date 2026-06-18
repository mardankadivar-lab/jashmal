import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Jashmal — חשמל",
    short_name: "Jashmal",
    description: "Cabalá & Filosofía Judía — Estudio profundo con IA",
    start_url: "/es",
    display: "standalone",
    background_color: "#05050a",
    theme_color: "#05050a",
    orientation: "portrait",
    lang: "es",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable-512-v2.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    categories: ["education", "lifestyle"],
  };
}
