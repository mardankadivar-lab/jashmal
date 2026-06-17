import Modulo10Map from "@/components/academia/Modulo10Map";

// El mapa del Módulo 10 — las 4 lecciones de J3 · Nombres divinos y Shemá (semanas 46–49).
// Se desbloquea cuando el estudiante completó las lecciones del Módulo 9.
export default function Modulo10MapPage() {
  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <Modulo10Map />
    </div>
  );
}
