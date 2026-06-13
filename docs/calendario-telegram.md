# Calendario editorial — Telegram @jashmal_kabbalah (خشمل)

> Canal 100% en **farsi**, público persa. Proyecto: **خشمل** (con خ).
> Formato fijo de post: **imagen + caption en farsi + link** a `jashmal.org/fa/اسرار/{slug}`.
> Nada se publica sin la aprobación de Mardan. Todo dato erudito (gematría/fuente)
> pasa antes por el **Sofer (editor-erudito)**.
> Responsable de producción: Community Manager. Aprobación final: Mardan.

---

## 0. Nota crítica sobre las URLs (para no romper links)

- La ruta pública en farsi es **`/fa/اسرار/{slug}`** (next-intl reescribe el segmento
  `misterio` → `اسرار` en farsi). El **slug interno se queda en latín** (ej. `ropas-de-luz`,
  `137`, `358`, `nudo-de-la-fe`). Esto está confirmado en `i18n/routing.ts`.
- Ejemplo correcto de link en un post: `https://jashmal.org/fa/اسرار/nudo-de-la-fe`
- **No inventar slugs.** Los slugs válidos están en `lib/content/misterios.ts`.

---

## 1. Ritmo y horarios fijos

**Husos horarios:** Mardan vive en **República Dominicana (AST = UTC−4)**.
El público está en **Irán (IRST = UTC+3:30)**. Irán va **7 horas y 30 minutos adelante** de RD.

Para público persa, las mejores franjas de Telegram son **la tarde-noche de Irán**
(salida del trabajo, después de cenar). Tres slots fijos por semana (con un 4º opcional):

| Slot | Día (Irán) | Hora Irán (IRST) | Hora Mardan (AST) | Por qué esa franja |
|------|-----------|------------------|-------------------|--------------------|
| **A — El Misterio de la semana** | Domingo* | **21:00** | **13:30** (1:30 pm) | Domingo es día laboral en Irán; pico nocturno de Telegram. Abre la semana con la pieza fuerte. |
| **B — Gematría / Letra** | Martes | **21:00** | **13:30** (1:30 pm) | Mitad de semana, mismo horario nocturno: crea el "hábito de las 21:00". |
| **C — Hilo de la Fe / Serie** | Jueves | **20:30** | **13:00** (1:00 pm) | Jueves por la noche en Irán es como "viernes" para nosotros: empieza el fin de semana (viernes es festivo). Buen momento para algo contemplativo. |
| **D — Reflexión corta (opcional)** | Viernes | **13:00** | **05:30** (5:30 am) | Viernes = día de descanso en Irán; mediodía es relajado, ideal para una cita/reflexión breve. *El horario 5:30 am para Mardan no es práctico → este slot se programa con anticipación o se omite si no hay herramienta de programación.* |

\* **Sobre el "Domingo":** en el calendario iraní la semana empieza el sábado y el viernes
es el día de descanso. El "domingo 21:00 IRST" es plena tarde-noche laboral en Irán.

**Recomendación de ritmo de arranque:** empezar con **3 posts/semana** (slots A, B, C)
durante el primer mes. La consistencia (siempre a las **21:00 hora de Irán = 1:30 pm de Mardan**)
importa más que la cantidad. Subir al 4º slot solo cuando haya material de sobra y, de
preferencia, usando una herramienta de programación para no madrugar.

**Regla de oro del horario:** los slots A y B caen **1:30 pm hora de Mardan** — cómodo para
producir/aprobar en la mañana y publicar al mediodía. Mantener SIEMPRE la misma hora: el
público persa aprende "a las 9 de la noche hay خشمل".

---

## 2. Mezcla de contenido (rotación repetible)

Patrón semanal fijo — cada slot tiene un "tipo" y la audiencia aprende qué esperar:

| Slot | Tipo | Qué es | De dónde sale |
|------|------|--------|---------------|
| **A — یکشنبه (Dom)** | **رازِ هفته** — Misterio de la semana | Un misterio del catálogo que "brilla solo": un gancho, una idea, un link. | Los ~24 misterios de `lib/content/misterios.ts` (serie `dos-filos`, `gematria`, `sanidad`). |
| **B — سه‌شنبه (Mar)** | **گِماتریا / حرف** — Gematría o letra | Un número que asombra (137, 358, 26, 248…) o una letra hebrea (Álef ya está; las 22 vienen). | Misterios serie `gematria` + letras (`lib/letters/`). |
| **C — پنج‌شنبه (Jue)** | **مسیرِ ایمان** — Hilo de la Fe (la Serie) | La Serie de la Fe presentada como **ruta de estudio (مسیر مطالعه)**: 4 escalones en orden. | Serie `fe`: nudo-de-la-fe → emunah → en-que-consiste → abraham. |
| **D — جمعه (Vie, opc.)** | **تأمّلِ کوتاه** — Reflexión corta | Una cita breve, una pregunta, una imagen sola con 2 líneas. Sin link "duro" o link suave. | Una frase de cualquier misterio ya publicado. |

**Cuando lleguen los videos en farsi (voz de Mardan):** el video reemplaza la imagen en
el slot que mejor le calce (normalmente el **slot A**, la pieza fuerte de la semana). Un
video con la voz de Mardan + subtítulos farsi rinde mucho más que una imagen — cuando exista,
va al frente.

**La Serie de la Fe como "ancla":** se promueve como una **مسیر مطالعه (ruta de estudio)** —
una secuencia que el lector recorre en orden. Esto da una razón para volver cada jueves
("la semana que viene, el segundo escalón"). Es nuestra mejor herramienta de retención.

---

## 3. Plan concreto — próximas 4 semanas

> Arranca destacando la **Serie de la Fe** como ruta. Los captions-gancho de abajo
> salen de los `ganchoFa` ya verificados por el Sofer en `lib/content/misterios.ts`
> (resumidos a 1 línea). Cualquier gematría nueva o frase que NO esté en ese archivo
> va marcada **[verificar Sofer]** antes de publicar.

**Leyenda de fechas:** se cuenta desde la primera semana de arranque. Ajustar a la fecha
real de inicio que apruebe Mardan. Hora siempre **21:00 IRST = 13:30 AST** (slots A/B) y
**20:30 IRST = 13:00 AST** (slot C).

### Semana 1 — "Presentamos la Ruta de la Fe"

| Día | Slot | Tipo | Pieza | Link | Caption-gancho (farsi, 1 línea) |
|-----|------|------|-------|------|----------------------------------|
| Dom | A | Misterio | **گِرِهِ ایمان** (El Nudo de la Fe) | `/fa/اسرار/nudo-de-la-fe` | خدا چهره‌اش را به موسی نشان نداد — یک گره نشانش داد. 🧵 |
| Mar | B | Gematría | **۱۳۷ — معمای آفرینش** | `/fa/اسرار/137` | قبالا = ۱۳۷. و ثابتِ نور در فیزیک ۱/۱۳۷ است. اتفاقی؟ |
| Jue | C | **Ruta de la Fe (presentación)** | Serie completa (4 escalones) | `/fa/اسرار/nudo-de-la-fe` | یک مسیرِ مطالعه در چهار گام: ایمان از کجا آغاز می‌شود؟ امشب، گامِ نخست. |

### Semana 2 — "Segundo escalón de la Fe + el doble filo"

| Día | Slot | Tipo | Pieza | Link | Caption-gancho (farsi, 1 línea) |
|-----|------|------|-------|------|----------------------------------|
| Dom | A | Misterio | **ماشیح و مار** (358) | `/fa/اسرار/358` | رهاننده و مارِ عدن یک عدد دارند: ۳۵۸. کابالا ۸۰۰ سال است این را می‌داند. |
| Mar | B | Gematría | **یگانگی و عشق** (26) | `/fa/اسرار/26` | اِچاد (یک) و اَهاوا (عشق) برابرند: ۲۶ — نامِ خدا. |
| Jue | C | **Ruta de la Fe — gam 2** | **ایمان (Emunah)** | `/fa/اسرار/emunah` | ۶۱۳ فرمان، و حَبَقوق همه را بر یک پایه نهاد: «عادل به ایمانش زنده است». |

### Semana 3 — "Tercer escalón + el linaje escondido"

| Día | Slot | Tipo | Pieza | Link | Caption-gancho (farsi, 1 línea) |
|-----|------|------|-------|------|----------------------------------|
| Dom | A | Misterio | **تبارِ ممنوعِ ماشیح** (el linaje) | `/fa/اسرار/linaje` | ماشیح از فروافتاده‌ترین جاها فرود می‌آید. سایه، وارونه، نور است. |
| Mar | B | Gematría | **درهم‌تنیدگیِ جان‌ها** (137) | `/fa/اسرار/entrelazamiento` | عشق (۴۲ بار) + ترس (۹۵ بار) = ۱۳۷. در بستنِ اسحاق، درهم‌تنیده. |
| Jue | C | **Ruta de la Fe — gam 3** | **ایمان از چه ساخته شده؟** | `/fa/اسرار/en-que-consiste` | باور می‌گوید «او پابرجاست»؛ توکّل می‌افزاید «پس بر او می‌افتم». |

### Semana 4 — "Cuarto escalón: Abraham + sanación"

| Día | Slot | Tipo | Pieza | Link | Caption-gancho (farsi, 1 línea) |
|-----|------|------|-------|------|----------------------------------|
| Dom | A | Misterio | **مارِ مفرغین** (la serpiente de cobre, 358) | `/fa/اسرار/serpiente-de-cobre` | درمان درست به شکلِ بیماری بود. مار = ماشیح = ۳۵۸. |
| Mar | B | Gematría | **رفائل — «خدا شفا می‌دهد»** (311) | `/fa/اسرار/refael` | رفائل (=۳۱۱): فرشته‌ای که نامش می‌گوید «خدا شفا می‌دهد». |
| Jue | C | **Ruta de la Fe — gam 4 (cierre)** | **ابراهیم — پدرِ ایمان** (248) | `/fa/اسرار/abraham` | نخستین کسی که تورات درباره‌اش گفت «ایمان آورد». یک حرف، ۲۴۳ را ۲۴۸ می‌کند. |

> **Después de la semana 4:** la Ruta de la Fe queda completa. Reiniciar el ciclo
> con una nueva serie ancla (ej. "تبارِ ماشیح / la línea del Mashíaj": tamar → lot →
> yehuda → betsabe → chispas-en-las-naciones), que ya tiene 5 piezas en farsi listas.

---

## 4. Buenas prácticas del canal

### Longitud y forma del caption
- **Gancho:** 1–2 líneas que choquen o intriguen (ya las tenemos en `ganchoFa`).
- **Cuerpo:** 2–4 líneas máximo. Mardan: "la gente lee algo y en 5 minutos lo olvida" →
  **una idea por post**, nada de saturar.
- **Límite técnico:** el caption de Telegram (con la imagen) corta a **1024 caracteres**;
  la API route ya trunca y añade el link al final. Apuntar a **400–700 caracteres** para
  que respire.
- **Una sola llamada a la acción (CTA)** al final, ej.:
  `👈 ادامهٔ این راز در خشمل: jashmal.org/fa/اسرار/{slug}`

### Hashtags (en farsi, 3–5 por post)
Fijos de marca + 1–2 temáticos del post:
- Marca (siempre): `#خشمل` `#کابالا` `#حکمت_یهودی`
- Temáticos (según el post): `#گِماتریا` `#ماشیح` `#ایمان` `#زوهر` `#تورات` `#عرفان`
  `#حروف_عبری` `#شفا`
- **Ejemplo de bloque:** `#خشمل #کابالا #ایمان #گِماتریا`
- No más de 5; en Telegram los hashtags sirven para búsqueda interna y aspecto, no para
  alcance viral como en Instagram.

### CTA y ruteo al sitio
- **Cada post lleva a UNA ruta** de `jashmal.org/fa/اسرار/{slug}` — nunca a la home genérica.
- El slot C (Ruta de la Fe) puede además invitar a "guardar el canal / activar notificaciones"
  para no perderse el próximo escalón → esto sube la retención.

### Frecuencia
- **3 posts/semana** el primer mes (Dom, Mar, Jue), siempre a la misma hora.
- Subir al 4º (Vie) solo con material de sobra y, si es posible, programado (no a las 5:30 am).
- Nunca más de 1 post/día: el canal no debe sentirse como spam.

### Cómo medir el crecimiento
Llevar una hoja simple semanal (Mardan o el CM):
1. **Suscriptores:** número total y **nuevos esta semana** (lo da Telegram en la vista de canal).
2. **Vistas por post:** el "ojito" 👁 bajo cada post. Comparar misterio vs gematría vs
   serie → qué tipo engancha más.
3. **Clics al sitio:** envolver los links con un parámetro UTM, ej.
   `jashmal.org/fa/اسرار/137?utm_source=telegram&utm_medium=post&utm_campaign=gematria`
   → así Vercel/analytics distingue el tráfico que viene del canal. **[coordinar con
   infraestructura para confirmar que el sitio registra UTMs.]**
4. **Reenvíos / "compartidos":** un post muy reenviado = gancho ganador → repetir esa fórmula.
- **Meta de arranque (primer mes):** ritmo sostenido sin fallar un solo slot + identificar
  los 2–3 ganchos que más vistas/reenvíos generan.

### Reglas no negociables
- Nada se publica sin **aprobación explícita de Mardan**.
- Toda gematría o fuente nueva (que no esté ya verificada en `lib/content/misterios.ts`)
  pasa por el **Sofer** antes de salir.
- El nombre del proyecto en persa es **خشمل** (con خ), nunca جشمل.
- Una idea por post. El "comercial llega tarde": primero el estudio asombra, luego ruteamos.

---

## 5. Resumen para producción (checklist por post)

1. Elegir pieza del calendario (slot + slug correcto de `lib/content/misterios.ts`).
2. Imagen oscuro-dorado, estética grabado vintage (verificar visualmente antes de mostrar).
3. Caption farsi: gancho (de `ganchoFa`) + 2–4 líneas + CTA + 3–5 hashtags. **خشمل con خ.**
4. Link `jashmal.org/fa/اسرار/{slug}` (con UTM si está habilitado).
5. Si hay gematría/frase nueva → marcar y pasar al Sofer.
6. Mostrar a Mardan para aprobar.
7. Publicar a la **hora fija** (21:00 IRST / 13:30 AST) vía `/api/telegram`.
