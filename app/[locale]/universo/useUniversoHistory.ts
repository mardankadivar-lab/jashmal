"use client";

// ─────────────────────────────────────────────────────────────────────────
// useUniversoHistory — PILA de navegación del Universo (descarga de memoria
// espacial). Registra los nodos visitados como un historial estilo navegador:
//   · visit(id)  → entra a un nodo (trunca el "adelante" y lo apila)
//   · back()     → retrocede un paso (devuelve el id anterior)
//   · forward()  → avanza un paso (devuelve el id siguiente)
//   · jumpTo(i)  → salta a una posición concreta de la migaja
//   · clear()    → vacía el historial (al salir / cambiar de modo)
// El componente NO posee la selección; solo la RECUERDA. La página sigue siendo
// la fuente de verdad de `selected`; aquí se lee la migaja y los destinos ←/→.
// ─────────────────────────────────────────────────────────────────────────

import { useReducer, useCallback } from "react";

type Hist = { stack: string[]; index: number };

type Action =
  | { type: "visit"; id: string }
  | { type: "back" }
  | { type: "forward" }
  | { type: "jump"; index: number }
  | { type: "clear" };

function reducer(h: Hist, a: Action): Hist {
  switch (a.type) {
    case "visit": {
      // ya estamos en ese nodo → no duplica
      if (h.index >= 0 && h.stack[h.index] === a.id) return h;
      // entrar a un nodo nuevo TRUNCA el "adelante" (como un navegador)
      const stack = h.stack.slice(0, h.index + 1);
      stack.push(a.id);
      return { stack, index: stack.length - 1 };
    }
    case "back":
      return h.index > 0 ? { stack: h.stack, index: h.index - 1 } : h;
    case "forward":
      return h.index < h.stack.length - 1 ? { stack: h.stack, index: h.index + 1 } : h;
    case "jump":
      return a.index >= 0 && a.index < h.stack.length ? { stack: h.stack, index: a.index } : h;
    case "clear":
      return { stack: [], index: -1 };
    default:
      return h;
  }
}

export type UniversoHistory = {
  stack: string[];
  index: number;
  current: string | null;
  canBack: boolean;
  canForward: boolean;
  peekBack: string | null;
  peekForward: string | null;
  visit: (id: string) => void;
  back: () => void;
  forward: () => void;
  jumpTo: (index: number) => void;
  clear: () => void;
};

export function useUniversoHistory(): UniversoHistory {
  const [hist, dispatch] = useReducer(reducer, { stack: [], index: -1 });

  const visit = useCallback((id: string) => dispatch({ type: "visit", id }), []);
  const back = useCallback(() => dispatch({ type: "back" }), []);
  const forward = useCallback(() => dispatch({ type: "forward" }), []);
  const jumpTo = useCallback((index: number) => dispatch({ type: "jump", index }), []);
  const clear = useCallback(() => dispatch({ type: "clear" }), []);

  const { stack, index } = hist;
  const canBack = index > 0;
  const canForward = index >= 0 && index < stack.length - 1;

  return {
    stack,
    index,
    current: index >= 0 ? stack[index] ?? null : null,
    canBack,
    canForward,
    peekBack: canBack ? stack[index - 1] : null,
    peekForward: canForward ? stack[index + 1] : null,
    visit,
    back,
    forward,
    jumpTo,
    clear,
  };
}
