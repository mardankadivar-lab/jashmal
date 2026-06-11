import { getSession } from "@/lib/community/communitySession";
import { getUmbral } from "@/lib/academia/umbral";
import UmbralWizard from "@/components/academia/UmbralWizard";

// El Umbral es el INGRESO a TALMID (la bienvenida para quien nunca ha estudiado).
// Vivía en /academia; con la escalera de niveles, /academia muestra el camino y
// el Umbral se accede desde "Comenzar TALMID". El flujo del wizard NO cambia.
export const dynamic = "force-dynamic";

export default async function UmbralPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getUmbral(locale);
  const rtl = locale === "fa";

  // Si ya hay sesión, el estudiante ya tiene cuenta: no le pedimos el correo
  // otra vez en la Pantalla 4 (su camino ya está guardado).
  const session = await getSession();
  const alreadySaved = Boolean(session);

  return (
    <div className="always-dark" style={{ background: "#05050a" }}>
      <UmbralWizard content={content} locale={locale} rtl={rtl} alreadySaved={alreadySaved} />
    </div>
  );
}
