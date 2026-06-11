# Rediseño visual de Mente Cósmica

Rama `visual/cosmic-mind-redesign`. Estética base:
**"Particle cosmos on a void — violet pulse against infinite black"**, adaptada a Jashmal.

## Regla visual (decisión de Mardan)
- **Base** = void negro absoluto (`#000000`).
- **Autoridad** = violeta `#8052ff` — pulso de vida, foco, selección, ruta activa.
- **Información** = colores semánticos por categoría (Torá, Sefirot, Zohar…), conservados
  pero **subordinados** (más sobrios, −28% saturación). NO se eliminan: son información.
- Estado activo = violeta dominante · inactivo = blanco/gris muy tenue ·
  relacionado = categoría a baja opacidad · ámbar/lichen = solo cuando aportan significado.

## Dónde vive el sistema
Todo el tuning visual está centralizado en
[`app/[locale]/mente-cosmica/theme.ts`](../app/[locale]/mente-cosmica/theme.ts):
`PALETTE`, `CATEGORY_ACCENTS` (sobria), `SCENE`, `BLOOM`, `CFG`, `STARFIELD`, `NEBULAE`,
`NODE` (pulso), `FIBERS` (conexiones), `PERF` (rendimiento), `PANEL`. El look se ajusta
ahí, no en las 2.100 líneas de `page.tsx`.

## Commits
1. **theme** — extraer constantes visuales a `theme.ts` (sin cambio visual).
2. **void** — fondo negro absoluto; estrellas/nebulosas retintadas a blanco-violeta.
3. **pulse** — nodo activo con núcleo violeta `#8052ff`, halo sutil, respiración lenta;
   categorías sobrias.
4. **fibers** — ruta activa y pulsos de viaje en violeta; reposo casi invisible;
   ámbar solo con significado (hilo a la Torá, comparaciones).
5. **perf** — sprite de clic invisible no se dibuja (−~232 draws/frame); tope de dpr
   (2 / 1.5 móvil); calidad móvil (partículas al 55%, sin AA); `prefers-reduced-motion`
   dentro del canvas. Cero dependencias nuevas.
6. **consola** — panel y tooltips como instrumento: negro, hairline blanco, radius 24px,
   sin sombras, CTA violeta; colores de categoría intactos (vienen de `style`).
7. **qa** — este documento + verificación final.

## Resultados de QA
| Verificación | Resultado |
|---|---|
| `/es/mente-cosmica` | ✓ void negro, leyenda negra, lang=es |
| `/en/cosmic-mind` (slug localizado) | ✓ sin 404, UI en inglés, lang=en |
| `/fa/cosmic-mind` | ✓ RTL (leyenda a la derecha), lang=fa, dir=rtl |
| Escritorio | ✓ panel anclado abajo-izquierda |
| Móvil (390px) | ✓ bottom-sheet; fibras violetas sobre el void |
| Selección / conexiones / ruta activa | ✓ Abraham: 20 fibras violetas; CTA violeta |
| Panel contextual (valores computados) | ✓ fondo `rgba(0,0,0,0.9)`, borde `white/0.1`, radius 24px, sombra `none`, CTA borde `#8052ff/0.55` |
| `prefers-reduced-motion` | implementado (apaga auto-rotación, respiraciones, electrones); query válida en runtime. Prueba manual: activar "Reducir movimiento" en el SO |
| `npm run build` | ✓ exit 0 |
| `npm run misterios:check` | ✓ "Todo enlazado" |
| `npm run i18n:check` | deuda editorial conocida (61 huecos EN) — no es fallo técnico |

## Nota
El botón "✦ Expandir" (el Sofer investiga un tema) se dejó en cian secundario para
distinguirlo del CTA "Estudiar" (violeta) — son acciones distintas. Ajustable si se prefiere.
Pendiente menor: algunos acentos `✦` decorativos del modo Gilgul siguen en ámbar (semántico
del linaje de almas).
