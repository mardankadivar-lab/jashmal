import type { Metadata } from "next";
import ViajeHub from "@/components/viaje/ViajeHub";

export const metadata: Metadata = {
  title: "El Viaje de la Creación — 14 estaciones · Jashmal",
  description:
    "Catorce estaciones de la Cabalá luriana del Arizal, desde el Ein Sof (el Infinito) hasta la Participación Humana. El descenso de la luz hasta nuestro mundo.",
};

export default function ViajePage() {
  return <ViajeHub />;
}
