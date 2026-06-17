import Modulo5Map from "@/components/academia/Modulo5Map";

// El mapa del Módulo 5 — la escalera de las 6 lecciones de Pirké Avot (S2).
// Se desbloquea cuando el estudiante completó las 5 lecciones del Módulo 4.
export default function Modulo5MapPage() {
  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <Modulo5Map />
    </div>
  );
}
