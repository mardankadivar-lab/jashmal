"use client";

// ─────────────────────────────────────────────────────────────────────────
//  TEJIDO DE ESTUDIOS — render de los hyperlinks internos del motor de estudio
// ─────────────────────────────────────────────────────────────────────────
//  El contenido erudito marca términos cruzables con esta sintaxis:
//    {{study:slug|texto}}   → enlace dorado a /misterio/{slug} (solo si el
//                             misterio está registrado en lib/content/misterios;
//                             si no, se pinta como término dorado destacado SIN
//                             enlace, para no generar un 404).
//    {{letter:slug|texto}}  → enlace dorado a /letra/{slug} (solo si la letra
//                             está registrada en lib/letters; si no, se pinta
//                             como término dorado destacado SIN enlace, para no
//                             generar un 404).
//
//  `renderStudyText(texto)` devuelve un arreglo de nodos React listo para
//  insertar dentro de un <p>. Es seguro: NO interpreta HTML, solo reemplaza la
//  sintaxis {{…}} por <Link> / <span> dorados.
//
//  Panel lateral (SOLO para los 18 misterios que comparten la plantilla
//  EstudioMisterio/EstudioData, ver lib/content/misteriosPanel.ts): si se
//  pasa `onOpenPanel` a `renderStudyText` y el slug de destino de un
//  {{study:…}} está registrado en MISTERIOS_PANEL, el enlace dorado abre el
//  panel (onOpenPanel(slug)) en vez de navegar con <Link>. Para cualquier
//  otro slug — los ~29 misterios a mano y todo {{letter:…}} — el
//  comportamiento no cambia: <Link> de página completa, como siempre.
// ─────────────────────────────────────────────────────────────────────────
import { Fragment, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { getLetter } from "@/lib/letters";
import { getMisterio } from "@/lib/content/misterios";
import { tienePanelMisterio } from "@/lib/content/misteriosPanel";

// {{tipo:slug|texto}}  — capturamos tipo, slug y texto visible.
const TOKEN = /\{\{(study|letter):([^|}]+)\|([^}]+)\}\}/g;

// ── Aislamiento del hebreo en línea ─────────────────────────────────────────
//  Un párrafo en español que lleva una cita en hebreo o arameo dentro tiene dos
//  direcciones a la vez. Los signos NEUTROS —paréntesis, comas, comillas,
//  puntos— no tienen dirección propia: la heredan de lo que tienen al lado. Si
//  una cita hebrea queda pegada a un paréntesis español, el paréntesis se va al
//  lado equivocado y el lector ve «(,נהי» en vez de la cita limpia. Es el fallo
//  clásico del hebreo "invertido".
//
//  <bdi dir="rtl"> aísla el tramo: el hebreo se lee de derecha a izquierda y la
//  puntuación española se queda exactamente donde la escribió el Sofer. NO
//  lleva clase: el aspecto del hebreo en línea de las páginas de misterio no
//  cambia, solo su dirección.
//
//  El tramo incluye los signos que van ENTRE dos palabras hebreas —espacio,
//  maqaf, coma, dos puntos, geresh y gershayim, rectos o hebreos— porque esos
//  pertenecen a la cita. Una coma seguida de español NO entra en el tramo.
const HE_RUN = /[֐-׿יִ-ﭏ](?:[֐-׿יִ-ﭏ  ,:;'"־׳״]*[֐-׿יִ-ﭏ])?/g;

/** Envuelve SOLO los tramos de hebreo/arameo de un texto mixto en <bdi>. */
export function aislarHebreo(text: string, keyBase: string): ReactNode[] {
  if (!/[֐-׿יִ-ﭏ]/.test(text)) return [text];
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(HE_RUN.source, "g");
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      out.push(<Fragment key={`${keyBase}-t${i}`}>{text.slice(last, m.index)}</Fragment>);
    }
    out.push(
      <bdi key={`${keyBase}-h${i}`} dir="rtl">
        {m[0]}
      </bdi>,
    );
    last = m.index + m[0].length;
    i++;
  }
  if (last < text.length) {
    out.push(<Fragment key={`${keyBase}-t${i}`}>{text.slice(last)}</Fragment>);
  }
  return out;
}

const goldLink =
  "font-semibold text-gold underline decoration-gold/30 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold/70";
const goldSpan = "font-semibold text-gold/90";
const goldButton =
  "font-semibold text-gold underline decoration-gold/30 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold/70";

/**
 * Convierte el texto con sintaxis {{study:…}} / {{letter:…}} en nodos React.
 * Los segmentos de texto plano se devuelven tal cual; los tokens se vuelven
 * enlaces dorados (o spans dorados cuando el destino no existe todavía).
 *
 * @param onOpenPanel  callback opcional; si el slug de un {{study:…}} tiene
 *   panel lateral disponible, se pinta como <button> que llama a
 *   onOpenPanel(slug) en vez de <Link>. Solo lo usa EstudioMisterio.tsx.
 */
export function renderStudyText(text: string, onOpenPanel?: (slug: string) => void): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;

  // matchAll necesita un regex global con índice; clonamos para no compartir lastIndex.
  const re = new RegExp(TOKEN.source, "g");
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    const [full, tipo, rawSlug, label] = m;
    if (m.index > last) {
      out.push(
        <Fragment key={`t${key++}`}>{aislarHebreo(text.slice(last, m.index), `t${key}`)}</Fragment>,
      );
    }
    const slug = rawSlug.trim();

    if (tipo === "study") {
      // study: si tiene panel lateral (18 misterios con plantilla común) y nos
      // dieron el callback, abrir panel; si no, comportamiento de siempre.
      if (onOpenPanel && tienePanelMisterio(slug)) {
        out.push(
          <button
            key={`p${key++}`}
            type="button"
            onClick={() => onOpenPanel(slug)}
            className={goldButton}
          >
            {label}
          </button>,
        );
        last = m.index + full.length;
        continue;
      }
      // study: enlazamos solo si el misterio está registrado; si no, span dorado.
      const exists = !!getMisterio(slug);
      out.push(
        exists ? (
          <Link key={`l${key++}`} href={`/misterio/${slug}`} className={goldLink}>
            {label}
          </Link>
        ) : (
          <span key={`s${key++}`} className={goldSpan}>
            {label}
          </span>
        ),
      );
    } else {
      // letter: enlazamos solo si la letra está registrada; si no, span dorado.
      const exists = !!getLetter(slug);
      out.push(
        exists ? (
          <Link key={`l${key++}`} href={`/letra/${slug}`} className={goldLink}>
            {label}
          </Link>
        ) : (
          <span key={`s${key++}`} className={goldSpan}>
            {label}
          </span>
        ),
      );
    }
    last = m.index + full.length;
  }

  if (last < text.length) {
    out.push(<Fragment key={`t${key++}`}>{aislarHebreo(text.slice(last), `t${key}`)}</Fragment>);
  }
  return out;
}
