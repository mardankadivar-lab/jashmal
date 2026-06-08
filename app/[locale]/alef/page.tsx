import type { Metadata } from "next";
import AlefScrollytelling from "@/components/letra/AlefScrollytelling";

export const metadata: Metadata = {
  title: "Alef — Sacred Form",
  description: "A pinned scrollytelling revelation of the Hebrew letter Alef.",
};

export default function AlefPage() {
  return <AlefScrollytelling />;
}
