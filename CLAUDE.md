# CLAUDE.md — Proyecto Jashmal (חַשְׁמַל)

## Qué es
Jashmal es un proyecto de estudio, investigación y divulgación de
Cabalá y filosofía judía. El sitio web es una herramienta de estudio
interactiva con Claude como motor de análisis en el backend.
Nombre: del jashmal de Yejezkel 1:4 — jash (silencio) + mal (habla).

## Stack técnico
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS
- Desplegado en Vercel
- Repo: github.com/mardankadivar/jashmal
- Dominio: jashmal.com

## Idiomas (CRÍTICO)
- Solo DOS idiomas de interfaz: Español (es) y Farsi/Persa (fa).
- NO incluir inglés en la interfaz.
- Farsi requiere layout RTL completo (dir="rtl") y fuente Vazirmatn.
- El usuario hace switch de idioma y TODO cambia: interfaz + el idioma
  en que Claude devuelve el estudio (no traducción en paralelo).
- Los textos fuente (Sefaria) se muestran en hebreo; el ANÁLISIS sale
  en el idioma elegido (es o fa).

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
- Deploy: git push (Vercel redespliega automático)

## Variables de entorno (.env.local — NO commitear)
- ANTHROPIC_API_KEY=...
- ALLOWED_ORIGINS=https://jashmal.com,https://www.jashmal.com