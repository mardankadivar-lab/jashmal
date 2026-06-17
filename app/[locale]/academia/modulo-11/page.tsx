import Modulo11Map from "@/components/academia/Modulo11Map";

// El mapa del Módulo 11 — la escalera de las 3 lecciones del Sefer Yetzirah (J4).
// Se desbloquea cuando el estudiante completó las 4 lecciones del Módulo 10.
export default function Modulo11MapPage() {
  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <Modulo11Map />
    </div>
  );
}
