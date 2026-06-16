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
// ─────────────────────────────────────────────────────────────────────────
import { Fragment, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { getLetter } from "@/lib/letters";
import { getMisterio } from "@/lib/content/misterios";

// {{tipo:slug|texto}}  — capturamos tipo, slug y texto visible.
const TOKEN = /\{\{(study|letter):([^|}]+)\|([^}]+)\}\}/g;

const goldLink =
  "font-semibold text-gold underline decoration-gold/30 underline-offset-2 transition-colors hover:text-gold hover:decoration-gold/70";
const goldSpan = "font-semibold text-gold/90";

/**
 * Convierte el texto con sintaxis {{study:…}} / {{letter:…}} en nodos React.
 * Los segmentos de texto plano se devuelven tal cual; los tokens se vuelven
 * enlaces dorados (o spans dorados cuando el destino no existe todavía).
 */
export function renderStudyText(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;

  // matchAll necesita un regex global con índice; clonamos para no compartir lastIndex.
  const re = new RegExp(TOKEN.source, "g");
  let m: RegExpExecArray | null;

  while ((m = re.exec(text)) !== null) {
    const [full, tipo, rawSlug, label] = m;
    if (m.index > last) {
      out.push(<Fragment key={`t${key++}`}>{text.slice(last, m.index)}</Fragment>);
    }
    const slug = rawSlug.trim();

    if (tipo === "study") {
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
    out.push(<Fragment key={`t${key++}`}>{text.slice(last)}</Fragment>);
  }
  return out;
}
