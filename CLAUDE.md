# CLAUDE.md — Proyecto Jashmal (חַשְׁמַל)

## Qué es
Jashmal es un proyecto de estudio, investigación y divulgación de
Cabalá y filosofía judía. El sitio web es una herramienta de estudio
interactiva con Claude como motor de análisis en el backend.
Nombre: del jashmal de Yejezkel 1:4 — jash (silencio) + mal (habla).

## Modelo de trabajo — Gerencia (CEO) y departamentos
Mardan NO es técnico. Habla en español con UNA sola voz: la gerencia.
La sesión principal (con quien Mardan conversa) ACTÚA COMO CEO/orquestador:
recibe el pedido, lo descompone y lo reparte a los departamentos correctos,
y le devuelve a Mardan el resultado ya integrado. Mardan no asigna tarea por
tarea a cada agente; le habla al CEO y el CEO reparte.

Departamentos (subagentes en `.claude/agents/`):
- **infraestructura** — código, Next.js, Vercel, deploy, API, seguridad de llaves,
  rendimiento, bugs.
- **mercadeo** — estrategia, posicionamiento, embudos, monetización, SEO, audiencia.
- **community-manager** — producción de TikTok/Instagram, guiones, portadas,
  hashtags, voz ElevenLabs, edición de video.
- **editor-erudito** — escribe y VERIFICA estudios, gematrías, misterios, fuentes;
  método PaRDeS; guardián de la exactitud religiosa.

Reglas de gerencia:
- Para cada pedido de Mardan, decide qué departamento(s) intervienen y delega con
  el subagente correspondiente (Task tool). Si toca a varios, coordínalos en orden
  lógico (ej. editor-erudito verifica el contenido → community-manager lo convierte
  en video → infraestructura lo publica en el sitio).
- Todo contenido erudito pasa por **editor-erudito** ANTES de publicarse o difundirse.
  NUNCA se publica una gematría o fuente sin verificar.
- Resume a Mardan en español simple: qué se hizo, qué departamento lo hizo, y qué
  sigue. Pide permiso antes de publicar/enviar algo público.

## Stack técnico
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Desplegado en Vercel
- Repo: github.com/mardankadivar-lab/jashmal
- Dominio: jashmal.org

## Idiomas (CRÍTICO)
- TRES idiomas de interfaz: Español (es), Farsi/Persa (fa) e Inglés (en).
  (Decisión de Mardan 2026-06-03: el inglés SE QUEDA en el selector de idioma.)
- Farsi requiere layout RTL completo (dir="rtl") y fuente Vazirmatn.
- El usuario hace switch de idioma y TODO cambia: interfaz + el idioma
  en que Claude devuelve el estudio (no traducción en paralelo).
- Los textos fuente (Sefaria) se muestran en hebreo; el ANÁLISIS sale
  en el idioma elegido (es, fa o en).

## Tipografía y estética
- Fuentes: Cinzel (títulos), Cormorant Garamond (cuerpo/hebreo),
  Vazirmatn (farsi).
- Fondo oscuro (#05050a), acentos dorados (#c9a43e).
- Animación de partículas "Nitzotzot" (Canvas API) en el hero.

## Arquitectura del motor de estudio
- Sefaria API: se llama DIRECTO desde el navegador (soporta CORS).
  - Textos: https://www.sefaria.org/api/texts/{ref}?context=0
  - Topics: https://www.sefaria.org/api/topics
  - Autocompletado (lupa): https://www.sefaria.org/api/name/{q}
- Claude API: SIEMPRE a través del backend (app/api/study/route.ts)
  para proteger la ANTHROPIC_API_KEY. Nunca exponer la key en cliente.
- Rate limiting en la API route (ej. 6 estudios/hora por IP).
- En producción subir max_tokens a 4000-8000 para estudios profundos.

## Categorías de texto
Torah, Talmud, Midrash, Kabbalah, Chasidut.
Navegación: Categoría → Libro → Capítulo/Folio → (rango de versículos).
Talmud usa Daf + Amud (a/b).

## Estructura del análisis (system prompt)
En este orden exacto, con títulos en hebreo:
1. תַּרְגּוּם — Traducción del pasaje
2. מְפָרְשִׁים — Comentaristas clásicos: Rashi, Ramban, Ibn Ezra,
   Abarbanel, Malbim (cada uno con su voz)
3. פרד״ס — PRDS: Pshat, Remez, Drash, Sod (con Baal HaSulam en Sod)
4. חֲסִידוּת — Implicaciones jasídicas (Baal Shem Tov)
5. הִתְבּוֹנְנוּת — Síntesis: mensaje profundo y sencillo
REGLAS: citar fuentes exactas (libro cap:versículo, folio del Talmud,
Zohar, Midrash). Ser profundo, no breve.

## Estudio de letras hebreas
Marco de Rav Yitzchak Ginsburgh ("The Hebrew Letters: Channels of
Creative Consciousness"): forma, nombre, valor/gematría, canal de
consciencia, apariciones en la Torá, síntesis.

## Hyperlinks internos (tejido de estudios)
El motor marca términos cruzables con esta sintaxis:
- {{letter:bet|texto}}  → abre un estudio de esa letra
- {{study:término|texto}} → abre un estudio enfocado en ese concepto
El frontend convierte esa sintaxis en enlaces dorados clicables.

## Audio (Fase 2)
ElevenLabs para el podcast. Voice ID: 30Flj57Y61xChp5iKYNE.
Botón "generar audio" toma el estudio → MP3.

## Skill relacionado
kabbalah-sefaria-research (skill de IA que conecta a Sefaria y aplica
el método PRDS). El system prompt del sitio debe mantenerse alineado
con este skill.

## Principio del proyecto
"Comercial llega tarde a propósito." Primero autoridad y estudio
honesto; monetización (donaciones, membresía, productos) después.

## Comandos del proyecto
- Dev: npm run dev
- Build: npm run build
- Deploy: MANUAL con Vercel CLI → `vercel --prod --yes` (el `git push` NO
  publica solo; no hay deploy automático desde GitHub). Siempre: `git push`
  para guardar en GitHub Y `vercel --prod` para publicar en jashmal.org.
  Ver historial con `vercel ls`.

## Variables de entorno (.env.local — NO commitear)
- ANTHROPIC_API_KEY=...
- ALLOWED_ORIGINS=https://jashmal.org,https://www.jashmal.org