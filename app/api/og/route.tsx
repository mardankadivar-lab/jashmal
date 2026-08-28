// ─────────────────────────────────────────────────────────────────────────
//  IMAGEN DE COMPARTIR (Open Graph) — generada por código, no es un asset
// ─────────────────────────────────────────────────────────────────────────
//  Antes, un enlace de Jashmal pegado en WhatsApp salía como un rectángulo
//  gris. Esta ruta dibuja al vuelo una tarjeta 1200×630 con la estética de la
//  marca (fondo #05050a, dorado #c9a43e, Cinzel) y el título del estudio
//  encima. Una sola ruta sirve a TODAS las páginas: el título viaja en la URL.
//
//    /api/og?t=Título&he=עִבְרִית&n=358&l=es
//
//  Las fuentes se traen de Google Fonts en caliente y quedan cacheadas. Si la
//  descarga falla, la tarjeta se dibuja igual con la fuente por defecto, y las
//  líneas en hebreo/farsi se omiten en vez de mostrar cuadritos vacíos.
// ─────────────────────────────────────────────────────────────────────────
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const ANCHO = 1200;
const ALTO = 630;
const TINTA = "#05050a";
const ORO = "#c9a43e";
const PERGAMINO = "#e8dcc8";

const UN_MES = 60 * 60 * 24 * 30;
// UA antigua: Google Fonts responde con woff/ttf. El motor de la imagen lee
// ttf, otf y woff — pero NO woff2, que es lo que sirve a un navegador moderno.
const UA_VIEJO =
  "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko";

/**
 * Descarga una fuente de Google Fonts. `texto` recorta el archivo a los glifos
 * que de verdad se pintan (mucho más liviano y evita subsets equivocados).
 * Devuelve null si algo falla: la tarjeta se dibuja igual con la fuente de casa.
 */
async function fuenteGoogle(
  familia: string,
  peso: number,
  texto?: string,
): Promise<ArrayBuffer | null> {
  try {
    const sub = texto ? `&text=${encodeURIComponent(texto)}` : "";
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=${encodeURIComponent(familia)}:wght@${peso}${sub}`,
      { headers: { "User-Agent": UA_VIEJO }, next: { revalidate: UN_MES } },
    );
    if (!css.ok) return null;
    const hoja = await css.text();
    const m = hoja.match(/src:\s*url\((https:[^)]+)\)\s*format\('(?:truetype|opentype|woff)'\)/);
    if (!m) return null;
    const archivo = await fetch(m[1], { next: { revalidate: UN_MES } });
    if (!archivo.ok) return null;
    return await archivo.arrayBuffer();
  } catch {
    return null;
  }
}

// ── Derecha-a-izquierda ──────────────────────────────────────────────────
//  El motor que dibuja la tarjeta (satori) NO reordena el texto RTL: lo pinta
//  de izquierda a derecha y el hebreo/farsi sale al revés. Se invierte a mano
//  ANTES de pintar, y así queda en el orden visual correcto.
//    · Hebreo: por grafemas (así el niqud viaja pegado a su letra).
//    · Farsi:  por palabras (dentro de cada palabra el enlazado ya es correcto).
function invierteGrafemas(s: string): string {
  try {
    const seg = new Intl.Segmenter("he", { granularity: "grapheme" });
    return [...seg.segment(s)].map((g) => g.segment).reverse().join("");
  } catch {
    return [...s].reverse().join("");
  }
}

function inviertePalabras(s: string): string {
  return s.trim().split(/\s+/).reverse().join(" ");
}

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const titulo = (q.get("t") || "Jashmal").slice(0, 140);
  // Hebreo SIN niqud: el motor de la imagen no coloca bien los puntos vocálicos
  // y una vocalización torcida en una tarjeta pública sería un error de fondo.
  // Las consonantes solas se leen limpio y no pueden salir mal puntuadas.
  const hebreo = (q.get("he") || "")
    .replace(/[\u0591-\u05C7]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 60);
  const numero = (q.get("n") || "").slice(0, 8);
  const locale = q.get("l") === "fa" ? "fa" : q.get("l") === "en" ? "en" : "es";
  const rtl = locale === "fa";

  const MARCA = "JASHMAL.ORG";
  // Glifos que hay que pedir a cada fuente (subset mínimo).
  const glifosLatinos = rtl ? `${MARCA}${numero}` : `${MARCA}${numero}${titulo}`;

  const [cinzel, frankRuhl, vazir] = await Promise.all([
    fuenteGoogle("Cinzel", 600, glifosLatinos),
    hebreo ? fuenteGoogle("Frank Ruhl Libre", 500, hebreo) : Promise.resolve(null),
    rtl ? fuenteGoogle("Vazirmatn", 600, titulo) : Promise.resolve(null),
  ]);

  const fonts: { name: string; data: ArrayBuffer; weight: 500 | 600; style: "normal" }[] = [];
  if (cinzel) fonts.push({ name: "Cinzel", data: cinzel, weight: 600, style: "normal" });
  if (frankRuhl) fonts.push({ name: "FrankRuhl", data: frankRuhl, weight: 500, style: "normal" });
  if (vazir) fonts.push({ name: "Vazirmatn", data: vazir, weight: 600, style: "normal" });

  // Si una fuente no cargó, NO se pasa `fontFamily` (undefined rompe el motor):
  // se dibuja con la fuente por defecto en vez de fallar la imagen entera.
  const ff = (nombre: string, cargada: unknown) => (cargada ? { fontFamily: nombre } : {});
  // Título: farsi → Vazirmatn; español/inglés → Cinzel.
  const fuenteTitulo = rtl ? ff("Vazirmatn", vazir) : ff("Cinzel", cinzel);
  const fuenteMarca = ff("Cinzel", cinzel);

  // Con la fuente por defecto (latina) el hebreo saldría en cuadritos: mejor no pintarlo.
  const pintaHebreo = Boolean(hebreo && frankRuhl);
  // En farsi sin Vazirmatn, el título saldría ilegible: cae al nombre de la marca.
  const tituloVisible = rtl && !vazir ? "Jashmal" : rtl ? inviertePalabras(titulo) : titulo;

  const tamTitulo = tituloVisible.length > 78 ? 52 : tituloVisible.length > 46 ? 62 : 74;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: TINTA,
          position: "relative",
        }}
      >
        {/* Halo dorado tenue detrás del texto */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: ANCHO,
            height: ALTO,
            display: "flex",
            backgroundImage:
              "radial-gradient(circle at 50% 42%, rgba(201,164,62,0.20) 0%, rgba(201,164,62,0.05) 38%, rgba(5,5,10,0) 68%)",
          }}
        />

        {/* Marco fino dorado */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            width: ANCHO - 56,
            height: ALTO - 56,
            display: "flex",
            border: `1px solid rgba(201,164,62,0.28)`,
          }}
        />

        {/* Contenido */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 96px",
            textAlign: "center",
          }}
        >
          {pintaHebreo && (
            <div
              style={{
                display: "flex",
                ...ff("FrankRuhl", frankRuhl),
                fontSize: 42,
                color: ORO,
                opacity: 0.85,
                marginBottom: 26,
                direction: "rtl",
              }}
            >
              {invierteGrafemas(hebreo)}
            </div>
          )}

          {numero && (
            <div
              style={{
                display: "flex",
                ...fuenteMarca,
                fontSize: 26,
                letterSpacing: 6,
                color: ORO,
                opacity: 0.75,
                marginBottom: 18,
              }}
            >
              {numero}
            </div>
          )}

          <div
            style={{
              display: "flex",
              ...fuenteTitulo,
              fontSize: tamTitulo,
              lineHeight: 1.18,
              color: PERGAMINO,
              maxWidth: 980,
              direction: rtl ? "rtl" : "ltr",
            }}
          >
            {tituloVisible}
          </div>
        </div>

        {/* Pie: marca */}
        <div
          style={{
            position: "absolute",
            bottom: 58,
            left: 0,
            width: ANCHO,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              ...fuenteMarca,
              fontSize: 22,
              letterSpacing: 10,
              color: ORO,
            }}
          >
            JASHMAL.ORG
          </div>
        </div>
      </div>
    ),
    {
      width: ANCHO,
      height: ALTO,
      ...(fonts.length ? { fonts } : {}),
      headers: {
        // La tarjeta solo depende de la URL: se puede cachear con fuerza.
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
