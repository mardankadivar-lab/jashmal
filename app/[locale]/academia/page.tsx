import AcademyHome from "@/components/academia/AcademyHome";

// /academia ahora muestra el CAMINO de formación (la escalera de 6 niveles).
// El Umbral (la bienvenida) se movió a /academia/umbral, accesible desde
// "Comenzar TALMID". Render dinámico no es necesario: la escalera es estática
// (el progreso del estudiante se lee en el cliente, COMMIT 5).
export default async function AcademiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const rtl = locale === "fa";

  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }} dir={rtl ? "rtl" : "ltr"}>
      <AcademyHome locale={locale} />
    </div>
  );
}
