/**
 * Nombre del evento con el que cualquier botón del sitio abre el buscador
 * global. Vive en su propio módulo (en vez de en el componente) para que el
 * SiteHeader pueda dispararlo sin importar el panel entero.
 *
 * Emitir:   window.dispatchEvent(new Event(OPEN_SEARCH_EVENT))
 * Escuchar: components/BuscadorGlobal.tsx
 */
export const OPEN_SEARCH_EVENT = "jashmal:buscar";
