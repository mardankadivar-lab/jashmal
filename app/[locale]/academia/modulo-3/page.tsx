import Modulo3Map from "@/components/academia/Modulo3Map";

// El mapa del Módulo 3 — la escalera de las 4 lecciones de la gran narrativa.
// Se desbloquea cuando el estudiante completó las 6 lecciones del Módulo 2.
export default function Modulo3MapPage() {
  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <Modulo3Map />
    </div>
  );
}
