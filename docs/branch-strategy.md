# Estrategia de ramas — Jashmal

Reorganización del proyecto en ramas limpias y separadas por área.
La arquitectura nueva nace desde `develop`, **no** desde `main`.

## Modelo de ramas

| Rama | Rol |
|------|-----|
| `main` | Producción estable. **Congelada** por ahora; solo recibe código probado. |
| `universo` | Trabajo histórico verificado. **Preservada** — base real del proyecto. |
| `backup/universo-before-restructure` | Snapshot de `universo` antes de reorganizar (red de seguridad). |
| `develop` | Integración. Nace desde `universo` con todo el trabajo actual. Todas las ramas de trabajo salen de aquí. |
| `<area>/<tarea>` | Ramas de trabajo. Cada una resuelve **una sola** área. |

Regla de oro: cada rama de trabajo sale de `develop`, se prueba en `develop`,
y solo después de validar pasa a `main`.

## Política de push (evitar ramas vacías en GitHub)

En el remoto solo viven, por ahora:
1. `backup/universo-before-restructure`
2. `develop`
3. `infra/main-architecture`

Las demás ramas se crean y se suben **cuando empezamos a trabajarlas**.

## Las 12 ramas estratégicas (4 fases)

### Fase 1 — Fundamento técnico
1. `infra/main-architecture` — reorganizar carpetas/rutas, base limpia. *(en curso)*
2. `infra/database-schema` — modelo de datos (idiomas, nodos, fuentes, relaciones, estados).
3. `infra/i18n-system` — es · en · fa sin mezcla (routing, locale, fallbacks, SEO).
4. `knowledge/source-library` — arquitectura de fuentes (Torá, Talmud, Midrash, Zohar, Arí, Tanya…).

### Fase 2 — Inteligencia del proyecto
5. `nodes/core-system` — sistema base de nodos (personajes, sefirot, letras, números, libros, temas…).
6. `nodes/contextual-relationships` — relaciones **con contenido propio** (arregla pérdida de contexto en Mente Cósmica).
7. `knowledge/prds-framework` — PaRDeS: Pshat · Remez · Drash · Sod por estudio.
8. `study/contextual-study-pages` — páginas de estudio contextual (nodo A en relación con nodo B).

### Fase 3 — Experiencia mística
9. `study/cosmic-mind-mode` — Mente Cósmica que conserva contexto + breadcrumbs.
10. `visual/hebrew-letter-animations` — letras hebreas animadas (puede avanzar en paralelo).
11. `content/hebrew-letters-series` — estructura editorial de la serie de letras.

### Fase 4 — Escalabilidad
12. `admin/content-editor` — base de CMS interno.

## Dependencias clave
- `database-schema` ← `main-architecture`
- `i18n-system` ← `main-architecture` (+ parcial `database-schema`)
- `source-library` ← `database-schema`
- `core-system` ← `database-schema` + `source-library`
- `contextual-relationships` ← `core-system` + `source-library`
- `prds-framework` ← `source-library` + `core-system`
- `contextual-study-pages` ← `contextual-relationships` + `prds-framework`
- `cosmic-mind-mode` ← `core-system` + `contextual-relationships`
- `hebrew-letter-animations` — en paralelo (no toca i18n ni base de datos)
- `hebrew-letters-series` ← `prds-framework` + `hebrew-letter-animations`
- `content-editor` ← `database-schema` + `core-system` + `source-library` + `i18n-system`

## Mapa de dominios de `lib/` (Fase 1)

`lib/` quedó organizado en 10 dominios:

| Dominio | Contenido |
|---------|-----------|
| `lib/sources/` | sefaria, categories, bookInfo, bookNames, catalog.generated, catalogOverrides, lexicon, lexiconClient, paleo |
| `lib/nodes/` | brainData, brainStore, brainHarvest, graphData, sefirot, hebrewLetters, gilgul, gematrias |
| `lib/relations/` | edgeData, related, hyperlinks, refDetector |
| `lib/study/` | cosmologyStages, cosmologyStudy, sefirotStudy, studyClient, myStudies, userStudies, reflections, motivation |
| `lib/i18n/` | i18nContent, translateClient |
| `lib/engine/` | anthropic, sofer |
| `lib/atlas/` | atlasData, atlasStore, atlasHarvest, atlasGazetteer |
| `lib/community/` | community, communityLevels, communitySession, moderation |
| `lib/content/` | misterios |
| `lib/infra/` | db, rateLimit, email, calendar |

`lib/academia/` y `lib/letters/` ya eran dominios propios y se conservan igual.
Todos los imports usan el alias absoluto `@/lib/<dominio>/<archivo>`.
