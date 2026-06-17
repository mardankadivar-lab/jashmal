import Modulo2Map from "@/components/academia/Modulo2Map";

// El mapa del Módulo 2 — la escalera de las 6 lecciones de las letras vivas.
// Se desbloquea cuando el estudiante completó las 6 lecciones del Módulo 1.
export default function Modulo2MapPage() {
  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <Modulo2Map />
    </div>
  );
}
