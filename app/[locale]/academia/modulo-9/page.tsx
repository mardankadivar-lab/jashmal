import Modulo9Map from "@/components/academia/Modulo9Map";

// El mapa del Módulo 9 — la escalera de las 5 lecciones de J2 (semanas 41–45).
// Se desbloquea cuando el estudiante completó las 6 lecciones del Módulo 8.
export default function Modulo9MapPage() {
  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <Modulo9Map />
    </div>
  );
}
