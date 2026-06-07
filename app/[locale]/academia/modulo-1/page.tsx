import Modulo1Map from "@/components/academia/Modulo1Map";

// El mapa del Módulo 1 — la escalera de las 6 lecciones. Siempre oscuro, como
// el resto de la Academia. El progreso vive en el cliente (localStorage).
export default function Modulo1MapPage() {
  return (
    <div className="always-dark min-h-screen" style={{ background: "#05050a" }}>
      <Modulo1Map />
    </div>
  );
}
