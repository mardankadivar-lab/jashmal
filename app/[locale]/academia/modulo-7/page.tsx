import Modulo7Map from "@/components/academia/Modulo7Map";

// El mapa del Módulo 7 — la escalera de las 2 lecciones de los Profetas (S4).
// Se desbloquea cuando el estudiante completó las 5 lecciones del Módulo 6.
export default function Modulo7MapPage() {
  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <Modulo7Map />
    </div>
  );
}
