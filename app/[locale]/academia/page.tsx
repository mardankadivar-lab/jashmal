import { getSession } from "@/lib/community/communitySession";
import { getUmbral } from "@/lib/academia/umbral";
import UmbralWizard from "@/components/academia/UmbralWizard";

// La sesión depende de la cookie → render dinámico.
export const dynamic = "force-dynamic";

export default async function AcademiaPage({
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
    // Siempre oscuro: el Umbral es la primera cara de Jashmal, debe ser dramático.
    <div className="always-dark" style={{ background: "#05050a" }}>
      <UmbralWizard content={content} locale={locale} rtl={rtl} alreadySaved={alreadySaved} />
    </div>
  );
}
