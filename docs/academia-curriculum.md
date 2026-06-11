# Jashmal Academia — Sistema de progresión curricular

Rama `academy/curriculum-progression-system`. Convierte la Academia en una
**universidad espiritual/textual**: formación seria, progresiva, bloqueada por
requisitos y tiempo. Eje **separado** de la Comunidad (esta mide aportes/estrellas;
la Academia mide formación). No toca `lib/community/`.

## Los 6 niveles (verificados por el Sofer contra fuentes reales)
Nomenclatura con ancla en Pirkei Avot 5:21 (Mikrá→Mishná→Talmud por edades = etapas
que se desbloquean en secuencia). TALMID es grado formal de yeshiva; los otros 5 son
etapas temáticas propias nombradas con vocabulario auténtico (Avot 1:1, 5:7; Ezra
7:10; Nehemías 8:8).

| # | Nivel | Hebreo | Estado inicial | Duración mín. |
|---|-------|--------|----------------|---------------|
| 1 | TALMID | תַּלְמִיד | **abierto** | 12 sem (84 días) |
| 2 | SHOEL | שׁוֹאֵל | bloqueado | 12 sem |
| 3 | DORESH | דּוֹרֵשׁ | bloqueado | 12 sem |
| 4 | MEVIN | מֵבִין | bloqueado | 12 sem |
| 5 | SOFER | סוֹפֵר | bloqueado | 12 sem |
| 6 | MEKUBAL | מְקוּבָּל | bloqueado | 16 sem |

SOFER y MEKUBAL llevan glosa aclaratoria (no es el escriba ritual; no es ordenación).

## Arquitectura (archivos)
- `lib/academia/curriculum.ts` — modelo de datos (AcademyLevel, AcademyModule,
  Requirement, Quiz, StudentProgress…) + los 6 niveles + las 12 semanas de TALMID.
  Localización honesta con `tri()` (es canónico; fa/en por fases).
- `lib/academia/unlock.ts` — lógica **pura** de desbloqueo (recibe `now` como
  parámetro → testeable): canAccessLevel, canAccessModule, isLevelComplete,
  getMissingRequirements, getMinimumTimeRemaining, statusOf…
- `lib/academia/actions.ts` — constructores puros inmutables del progreso.
- `lib/academia/useAcademyProgress.ts` — persistencia en localStorage (hook).
- Páginas: `/academia` (escalera), `/academia/talmid` (12 semanas),
  `/academia/umbral` (el Umbral, preservado), `/academia/modulo-1/*` (lecciones).
- Componentes: AcademyHome, LevelCard, TalmidDetail, ModuleCard, LangNotice.

## Cómo se bloquean los niveles
Cada nivel define `unlockRequirements: Requirement[]` (DATOS, no UI). Un nivel es
accesible si `initialStatus === "available"` (solo TALMID) o si todos sus requisitos
se cumplen. `statusOf` devuelve completed / available / locked. La escalera muestra
los bloqueados apagados, con candado y "Completa <previo> para desbloquear".

## Cómo se calcula el progreso
`StudentProgress` por nivel: `startedAt`, `completedModules`, `quizScores`,
`journalEntries`, `finalProjectStatus`. `getLevelProgress` deriva % por módulos
obligatorios, días transcurridos y restantes. Persistido en localStorage por
dispositivo (clave `jashmal:academia:progress:v1`).

## Cómo se impide completar TALMID en minutos (la regla dura)
El requisito `time` se evalúa **aparte** de los checkboxes: `daysSince(startedAt, now)
>= 84`. Verificado: un estudiante que marca los 12 módulos + examen 100 + 12 diarios
+ proyecto aprobado **el mismo día** NO completa TALMID — faltan 84 días reales. El
tiempo no se puede saltar.

## Cómo se desbloquea SHOEL
`canUnlockLevel("shoel")` exige (todos): ≥84 días desde el inicio de TALMID · 100%
de módulos obligatorios · examen final ≥80% · ≥12 entradas de diario · proyecto
aprobado · lectura base. Verificado: con 85 días + todo cumplido, TALMID pasa a
"Completado" y SHOEL a "Abierto"; DORESH sigue bloqueado hasta completar SHOEL.

## Qué queda para auth/base de datos
El progreso es por dispositivo (localStorage). Cuando exista progreso por usuario en
BD, el ÚNICO punto a reconectar es `useAcademyProgress` (read/write → API). La lógica
pura y la UI no cambian. El diario, el examen y el proyecto hoy se simulan en un panel
(no son interactivos aún) — su versión real es trabajo posterior.

## QA (COMMIT 7)
es/en/fa ✓ (RTL en farsi, aviso de idioma honesto, sin mezcla silenciosa) ·
escritorio + móvil 390px ✓ (sin overflow) · flujo de progreso ✓ (iniciar, marcar,
persistir, muro de tiempo en ambos sentidos) · build ✓ · misterios:check ✓ ·
i18n:check = deuda editorial conocida (contenido de academia es-only, advertido).
