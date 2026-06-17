import Modulo6Map from "@/components/academia/Modulo6Map";

// El mapa del Módulo 6 — la escalera de las 5 lecciones de la Torá oral (S3).
// Se desbloquea cuando el estudiante completó las 6 lecciones del Módulo 5.
export default function Modulo6MapPage() {
  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <Modulo6Map />
    </div>
  );
}
