import TalmidDetail from "@/components/academia/TalmidDetail";

// /academia/talmid — el detalle del nivel TALMID: las 12 semanas. La escalera
// (/academia) enlaza aquí con "Comenzar TALMID"; desde aquí se entra al Umbral
// y a cada lección guiada.
export default async function TalmidPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const rtl = locale === "fa";

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }} dir={rtl ? "rtl" : "ltr"}>
      <TalmidDetail locale={locale} />
    </div>
  );
}
