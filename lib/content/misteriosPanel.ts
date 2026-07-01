// Registro de misterios que comparten la plantilla EstudioMisterio/EstudioData
// ─────────────────────────────────────────────────────────────────────────
// Solo los 18 misterios que usan el componente compartido
// components/misterio/EstudioMisterio.tsx pueden abrirse en el PANEL LATERAL
// (ver components/misterio/MisterioPanel.tsx). Los otros ~29 misterios (a
// mano, con layout propio) y todo /letra/* siguen navegando a página completa
// vía <Link> (ver lib/content/studyLinks.tsx).
//
// De los 18, se excluyen aquí DOS casos con slug ambiguo (la sub-ruta anidada
// bajo /misterio/parashat-korach/*): su `EstudioData.slug` no coincide con su
// URL real, y hoy ningún contenido los referencia por {{study:…}}. Se dejan
// fuera a propósito para no introducir comportamiento sorpresa; si el Sofer
// llega a enlazarlos, se agregan aquí explícitamente con su propia clave.
//
// Para agregar un misterio nuevo a este registro: 1) confirmar que su
// page.tsx exporta `data` (no solo el default), 2) importarlo aquí, 3)
// añadir la entrada con la MISMA clave que su slug real de URL.

import type { EstudioData } from "@/components/misterio/EstudioMisterio";

import { data as ajaritHayamim } from "@/app/[locale]/misterio/ajarit-hayamim/data";
import { data as danielApocaliptica } from "@/app/[locale]/misterio/daniel-apocaliptica/data";
import { data as despertarDeLoAlto } from "@/app/[locale]/misterio/despertar-de-lo-alto/data";
import { data as elAri } from "@/app/[locale]/misterio/el-ari/data";
import { data as enigmaMashiaj } from "@/app/[locale]/misterio/enigma-mashiaj/data";
import { data as exilioRedencion } from "@/app/[locale]/misterio/exilio-redencion/data";
import { data as finalidadCreacion } from "@/app/[locale]/misterio/finalidad-creacion/data";
import { data as gogUmagog } from "@/app/[locale]/misterio/gog-umagog/data";
import { data as jasidutRedencion } from "@/app/[locale]/misterio/jasidut-redencion/data";
import { data as mashiajJazal } from "@/app/[locale]/misterio/mashiaj-jazal/data";
import { data as olamHaba } from "@/app/[locale]/misterio/olam-haba/data";
import { data as shaarHagilgulim } from "@/app/[locale]/misterio/shaar-hagilgulim/data";
import { data as simienteMesianica } from "@/app/[locale]/misterio/simiente-mesianica/data";
import { data as tercerTemplo } from "@/app/[locale]/misterio/tercer-templo/data";
import { data as tikuneiZohar } from "@/app/[locale]/misterio/tikunei-zohar/data";
import { data as zoharRedencion } from "@/app/[locale]/misterio/zohar-redencion/data";

export const MISTERIOS_PANEL: Record<string, EstudioData> = {
  "ajarit-hayamim": ajaritHayamim,
  "daniel-apocaliptica": danielApocaliptica,
  "despertar-de-lo-alto": despertarDeLoAlto,
  "el-ari": elAri,
  "enigma-mashiaj": enigmaMashiaj,
  "exilio-redencion": exilioRedencion,
  "finalidad-creacion": finalidadCreacion,
  "gog-umagog": gogUmagog,
  "jasidut-redencion": jasidutRedencion,
  "mashiaj-jazal": mashiajJazal,
  "olam-haba": olamHaba,
  "shaar-hagilgulim": shaarHagilgulim,
  "simiente-mesianica": simienteMesianica,
  "tercer-templo": tercerTemplo,
  "tikunei-zohar": tikuneiZohar,
  "zohar-redencion": zoharRedencion,
};

/** true si el slug tiene panel lateral disponible (plantilla EstudioMisterio). */
export function tienePanelMisterio(slug: string): boolean {
  return slug in MISTERIOS_PANEL;
}

export function getMisterioParaPanel(slug: string): EstudioData | undefined {
  return MISTERIOS_PANEL[slug];
}
