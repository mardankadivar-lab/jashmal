import Modulo4Map from "@/components/academia/Modulo4Map";

// El mapa del Módulo 4 — la escalera de las 5 lecciones de Rashi (S1).
// Se desbloquea cuando el estudiante completó las 4 lecciones del Módulo 3.
export default function Modulo4MapPage() {
  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <Modulo4Map />
    </div>
  );
}
