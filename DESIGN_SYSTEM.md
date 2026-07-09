# Sistema de Diseño — Comunicación Social ULA NURR

> Basado en el **Manual de Identidad Visual ULA NURR v2** (Sección 06: Paleta de Colores, Sección 09: Aplicaciones Digitales).
> Implementado con **Tailwind CSS v4**, **Astro 5**, **Fraunces + DM Sans**.

---

## 1. Colores Institucionales

### Paleta Principal (Manual §06)

| Muestra | Nombre | HEX | RGB | CMYK | Uso | Proporción |
|---------|--------|-----|-----|------|-----|------------|
| 🟦 | **Azul ULA** (Primario) | `#003E7E` | `0, 62, 126` | `100, 51, 0, 51` | Logotipo, encabezados, elementos principales | 60–70% |
| 🟧 | **Naranja** (Secundario - Acento) | `#F89728` | `248, 151, 40` | `0, 39, 84, 3` | CTAs, destacados, llamadas a la acción | 10–15% |
| 🟩 | **Verde** (Secundario) | `#00B25A` | `0, 178, 90` | `100, 0, 49, 30` | Indicadores positivos, badges, iconos sociales | 10–15% |
| ⬜ | **Gris** (Neutral) | `#6A747B` | `106, 116, 123` | `14, 6, 0, 52` | Texto secundario, elementos neutros | 10–20% |

### Tokens CSS (Tailwind v4 `@theme`)

```css
/* Primary — Azul ULA */
--color-primary: #003E7E;
--color-primary-deep: #002d5e;    /* hover / active oscuro */
--color-primary-light: #2a6fa8;   /* acentos claros */

/* Accent — Naranja (Manual §09 Botones) */
--color-accent: #F89728;           /* CTA normal */
--color-accent-hover: #E08820;     /* CTA hover */
--color-accent-active: #C87818;    /* CTA active */

/* Secondary — Verde */
--color-green: #00B25A;
--color-green-soft: #33c47b;

/* Neutral */
--color-gray: #6A747B;             /* gris neutro */
--color-ink: #07294a;              /* texto principal */
--color-ink-muted: #5c5c5c;        /* texto secundario */
--color-ink-faint: #6A747B;        /* texto terciario / gris */
--color-surface: #fafafa;          /* fondo de página */
--color-surface-elevated: #ffffff; /* fondos elevados (cards) */
```

### Tinted Borders (basados en Azul ULA)

```css
--color-border: rgba(0, 62, 126, 0.08);       /* divider estándar */
--color-border-light: rgba(0, 62, 126, 0.04);  /* divider sutil */
--color-border-strong: rgba(0, 62, 126, 0.15); /* hover state */
```

### Fondos de Sección Temáticos

```css
--color-section-academic: rgba(0, 62, 126, 0.03);    /* sección académica */
--color-section-student-life: rgba(0, 178, 90, 0.04); /* vida estudiantil */
--color-section-portfolio: rgba(248, 151, 40, 0.04);  /* portafolio */
--color-section-admission: rgba(248, 151, 40, 0.06);  /* admisión */
```

---

## 2. Tipografía

### Stack de Fuentes

| Rol | Fuente Primaria | Fallbacks | Equivalente Manual |
|-----|----------------|-----------|-------------------|
| **Display (títulos)** | `Fraunces` (variable) | `Times New Roman, Times, Georgia, serif` | Tex Gyre Termes |
| **Body (cuerpo)** | `DM Sans` (variable) | `Arial, Helvetica, "Helvetica Neue", sans-serif` | Helvetica |

### Escala Modular (cuarta perfecta: ×1.25)

```css
--text-xs: 0.75rem;    /* 12px — captions, metadata */
--text-sm: 0.875rem;   /* 14px — UI secundaria */
--text-base: 1rem;     /* 16px — body text */
--text-lg: 1.25rem;    /* 20px — lead, H3 */
--text-xl: 1.563rem;   /* 25px — small H2 */
--text-2xl: 1.953rem;  /* 31px — H2 */
--text-3xl: 2.441rem;  /* 39px — H1 */
--text-4xl: 3.052rem;  /* 49px — major heading */
--text-5xl: 3.815rem;  /* 61px — display */
--text-6xl: 4.768rem;  /* 76px — hero display */
--text-7xl: 5.96rem;   /* 95px — hero large */
--text-8xl: 7.451rem;  /* 119px — hero massive */
--text-9xl: 9.313rem;  /* 149px — hero extreme */
```

### Jerarquía de Encabezados

| Elemento | Font | Weight | Tamaño | Color | Variación |
|----------|------|--------|--------|-------|-----------|
| **H1** | Fraunces | 700 | `clamp(2rem, 4vw+0.5rem, 3.5rem)` | Primary | `opsz` 72, `SOFT` 60 |
| **H2** | Fraunces | 650 | `clamp(1.5rem, 2.5vw+0.5rem, 2.25rem)` | Primary | `opsz` 48, `SOFT` 50 |
| **H3** | DM Sans | 700 | `1.125rem` | Ink | — |
| **H4-H6** | DM Sans | 600 | `1rem` | Ink | — |

### Utilidades Editoriales (Fraunces)

```css
.font-display-hero     { font-variation-settings: "opsz" 144, "SOFT" 100; letter-spacing: -0.03em; }
.font-display-headline { font-variation-settings: "opsz" 72, "SOFT" 60; }
.font-display-subhead  { font-variation-settings: "opsz" 48, "SOFT" 40; }
```

### Body

```css
body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  letter-spacing: 0.01em;
  color: var(--color-ink);
  background-color: #fcfcfd;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "kern" 1, "liga" 1;
}
```

---

## 3. Sistema de Layout

### Contenedores

| Contexto | Max-Width | Padding Horizontal |
|----------|-----------|-------------------|
| Secciones de página | `1400px` | `px-6 md:px-12 lg:px-16` |
| Tarjetas / contenido | `1200px` | — |
| Navegación | `max-w-7xl` (1280px) | `w-[92%] md:w-[88%] lg:w-[85%]` |
| Footer | `max-w-7xl` | `px-6 md:px-12` |

### Padding de Sección

```css
/* Mobile first */
.py-12 md:py-20   /* secciones estándar */
.py-20 md:py-28   /* secciones destacadas (video) */
.px-6 md:px-12 lg:px-16  /* padding horizontal estándar */
```

### Breakpoints Responsivos

| Prefijo | Min-Width | Notas |
|---------|-----------|-------|
| `xs` | 375px | Teléfonos muy pequeños (custom) |
| `sm` | 640px | Teléfonos grandes |
| `md` | 768px | Tablets |
| `lg` | 1024px | Desktop (nav cambia a horizontal) |
| `xl` | 1280px | Desktop amplio |
| `2xl` | 1536px | Pantallas grandes |

---

## 4. Navegación

### Barra Superior (Floating Nav)

- **Posición**: `fixed top-4 left-1/2 -translate-x-1/2 z-[100]`
- **Ancho**: `w-[92%] md:w-[88%] lg:w-[85%] max-w-7xl`
- **Estilo**: `bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_2px_20px_-6px_rgba(0,0,0,0.06)] rounded-full`
- **Clase CSS**: `.floating-nav`
- **Logo**: Alineado a la izquierda, `h-9 md:h-10`, enlaza a `/`
- **Links desktop**: `text-[10px] md:text-[12px] font-bold tracking-[0.15em] uppercase`
- **Link activo**: `text-primary` con underline dot (`h-0.5 bg-primary rounded-full`)

### Dropdown (Desktop)

- **Trigger**: Botón con `aria-haspopup="true"`, chevron `PhCaretDown` rota 180° en hover
- **Panel**: `.dropdown-panel` con `opacity-0 invisible → opacity-100 visible` en hover/focus-within
- **Contenedor**: `bg-surface-elevated border border-tinted shadow-luma rounded-luma p-3 min-w-[300px]`
- **Items**: Icono `Ph*` tamaño 18 duotone, label `text-sm font-medium`, descripción `text-xs text-ink-faint`
- **Item activo**: `bg-primary/5 text-primary`
- **Navegación teclado**: ArrowDown/ArrowUp entre items, Escape cierra y regresa al trigger

### Menú Móvil (Bottom Sheet)

- **Trigger**: Botón hamburguesa `PhList` (solo < lg)
- **Panel**: `fixed inset-0 z-[150] bg-[rgba(15,23,42,0.4)]`, panel: `h-[85vh] rounded-t-3xl`
- **Animación**: `transform translate-y-full → translate-y-0` con `transition-transform duration-300 ease-out`
- **Acciones rápidas**: Grid 2×2 con icon cards (Buscar, Inscripciones, Contacto, Pénsum, Eventos, WhatsApp)
- **Acordeón**: `.mobile-nav-toggle` con `aria-expanded`, submenú animado con `@keyframes slideDown`
- **Focus trap**: Atrapa Tab/Shift+Tab dentro del panel
- **Cierre**: Click en overlay, botón X, tecla Escape

### Indicador de Sección Activa

- Script `updateNavIndicators()` en `astro:after-swap`
- `swapClasses()` maneja `text-primary` / `text-ink-muted hover:text-primary`
- `manageUnderline()` añade/remueve el dot indicador

---

## 5. Hero Section

### Estructura

- **Fondo**: `bg-primary` con `bg-gradient-to-br from-primary via-primary to-primary-deep`
- **Decoración**: Círculos geométricos (`radial-gradient`), líneas de acento diagonal/horizontal
- **Altura**: `min-h-[60vh] md:min-h-[80vh] lg:min-h-screen` (auto en mobile)
- **Contenido**: `max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16`

### Elementos

| Componente | Clase/Estilo |
|------------|-------------|
| **Eyebrow** | `text-[9px] md:text-[10px] font-bold tracking-[0.4em] uppercase text-white/50` con líneas decorativas |
| **Título H1** | `text-5xl → xl:text-[10rem] font-display font-bold text-white leading-[0.82] tracking-tighter font-display-hero` |
| **Línea 2 (itálica)** | `text-white/35 font-normal italic font-display-hero` |
| **Descripción** | `text-sm md:text-base lg:text-lg text-white/75 max-w-prose font-body` |
| **CTA Primario** | `bg-[#F89728] text-white px-6 py-3 text-sm font-bold tracking-wider uppercase rounded-full shadow-md` |
| **CTA Secundario** | `text-white/70 text-sm font-bold tracking-wider uppercase` con línea animada en hover |
| **Scroll indicator** | `hidden lg:flex text-white/30` — `PhArrowDown` + texto "Scroll" |

### Estados del CTA Primario

| Estado | Fondo | Transform |
|--------|-------|-----------|
| Normal | `#F89728` | — |
| Hover | `#E08820` | `-translate-y-0.5`, `shadow-lg` |
| Active | `#C87818` | `translate-y-0` |

---

## 6. Patrones de Sección

### Temas de Fondo

```astro
<section class="section-academic">   <!-- rgba(0,62,126,0.03) — contenido académico -->
<section class="section-student-life"> <!-- rgba(0,178,90,0.04) — vida estudiantil -->
<section class="section-portfolio">  <!-- rgba(248,151,40,0.04) — portafolio/producción -->
<section class="section-admission">  <!-- rgba(248,151,40,0.06) — admisión -->
```

### ContentBlock

- **Base**: `bg-white border border-tinted rounded-luma p-8 md:p-10`
- **Variantes**: `default` (white), `accent` (bg-primary/5), `info` (bg-surface)
- **Decorative bar**: `::before` pseudo-element — barra vertical izquierda de 3px, gris por defecto, azul en hover
- **Accent line**: `w-10 h-0.5 bg-primary rounded-full` + `w-1.5 h-0.5 bg-accent rounded-full opacity-60`

### PageHeader

- **Fondo**: `bg-gradient-to-b from-surface to-white border-b border-tinted`
- **Padding**: `pt-24 pb-10 md:pt-28 md:pb-14`
- **Breadcrumbs**: `PhHouse` + `PhCaretRight` como separadores
- **Eyebrow**: `text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-slate-400`
- **H1**: `text-4xl md:text-5xl lg:text-6xl font-display font-bold text-ink leading-[1.05] tracking-tighter`
- **Decoración**: Círculos con `radial-gradient` en esquinas (opacidad 0.06/0.04)

---

## 7. Botones y CTAs

### CTA Naranja (Acción Principal)

```html
<a class="inline-flex items-center gap-2 px-6 py-3 bg-[#F89728] text-white text-sm font-bold 
          tracking-wider uppercase rounded-full shadow-md 
          hover:bg-[#E08820] hover:shadow-lg hover:-translate-y-0.5 
          active:bg-[#C87818] active:translate-y-0 
          transition-all duration-300">
```

| Estado | Fondo | Sombra | Transform |
|--------|-------|--------|-----------|
| Normal | `#F89728` | `shadow-md` | — |
| Hover | `#E08820` | `shadow-lg` | `-translate-y-0.5` |
| Active | `#C87818` | — | `translate-y-0` |

*Coincide exactamente con Manual §09 — Aplicaciones Digitales / Botones.*

### CTA Link Secundario

```html
<a class="inline-flex items-center gap-2 text-white/70 text-sm font-bold tracking-wider uppercase 
          hover:text-white transition-colors duration-300 group">
  <span>{text}</span>
  <span class="w-6 h-px bg-white/40 group-hover:w-10 transition-all duration-300"></span>
</a>
```

### Botón Noticias (Nav)

```html
<a class="bg-[#F89728] text-white text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase 
          px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-sm 
          hover:bg-[#E08820] hover:shadow-md hover:-translate-y-0.5 
          active:bg-[#C87818] active:translate-y-0 transition-all duration-300">
```

### .btn-magnetic (Utility)

```css
.btn-magnetic {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.btn-magnetic:hover  { transform: translateY(-2px); box-shadow: var(--shadow-luma); }
.btn-magnetic:active { transform: translateY(0); }
```

---

## 8. Tarjetas (Cards)

### Card Genérica (`.card-content`)

```css
.card-content {
  background: var(--color-surface-elevated);
  border-radius: var(--radius-luma);  /* 1.25rem */
  box-shadow: var(--shadow-luma);     /* 0 2px 10px -2px rgba(0,0,0,0.05), 0 10px 25px -5px rgba(0,0,0,0.03) */
  max-width: 1400px;
}
```

### News Split Card

- **Layout**: Column en mobile (`flex-direction: column`), row en md+ (`flex-direction: row`)
- **Imagen**: `flex: 0 0 55%`, `min-height: 500px` (lg), objeto cubierto, zoom 1.03× en hover
- **Contenido**: `padding: 2rem md:2.5rem lg:3rem` con gap 1.25rem
- **Tag**: `border-left: 2px solid var(--color-primary)` con `padding-left: 0.75rem`

### Quick Access Cards

| Variante | Layout | Clase |
|----------|--------|-------|
| **Mobile** (< 768px) | Grid 2×2 | `.qa-card-mobile` |
| **Tablet** (768–1023) | Grid 4 columnas | `.qa-card-mobile` |
| **Desktop** (≥ 1024px) | Fila horizontal, igual peso | `.qa-card-desktop` |

Estados:
- **Normal**: `bg-surface-elevated border border-tinted rounded-luma`
- **Hover**: `bg-[rgba(0,62,126,0.02)] border-color-strong shadow-luma`
- **Active**: `bg-[rgba(0,62,126,0.04)]`
- **Desktop hover**: Aparición de barra lateral izquierda (`w-0.5 bg-transparent → bg-primary`)

### Artículos Secundarios (News)

- **Grid**: 1 columna mobile, 3 columnas en sm+
- **Divisor**: `border-right: 1px solid rgba(226,232,240,0.6)` entre items
- **Categoría**: `text-[9px] font-bold tracking-[0.25em] uppercase text-primary/70`
- **Título**: `text-base md:text-lg font-display font-bold text-ink → group-hover:text-primary`

---

## 9. Badges y Tags

### Badge Verde (Indicadores Positivos)

```css
.badge-verde {
  display: inline-flex; align-items: center; gap: 0.25rem;
  padding: 0.125rem 0.5rem; border-radius: 9999px;
  background: rgba(0, 178, 90, 0.1); color: #008f48;
  font-size: 0.6875rem; font-weight: 700;
  letter-spacing: 0.05em; text-transform: uppercase;
}
```

### Badge Naranja (Alertas/Destacados)

```css
.badge-naranja {
  display: inline-flex; align-items: center; gap: 0.25rem;
  padding: 0.125rem 0.5rem; border-radius: 9999px;
  background: rgba(248, 151, 40, 0.1); color: #c97a1a;
  font-size: 0.6875rem; font-weight: 700;
  letter-spacing: 0.05em; text-transform: uppercase;
}
```

### News Tag

```css
.news-tag {
  font-size: 10px; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--color-primary);
  border-left: 2px solid var(--color-primary);
  padding-left: 0.75rem;
}
```

---

## 10. Video Section

### Layout

- **Fondo**: Sin fondo de sección específico (transparente sobre surface)
- **Padding**: `py-20 md:py-28`
- **Eyebrow**: `text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase text-slate-400`
- **Título**: `text-2xl md:text-4xl lg:text-5xl font-display font-bold text-ink`
- **Badge**: `text-[10px] font-bold tracking-[0.3em] uppercase text-primary/60`

### Video Player

- **Wrapper**: `.video-player-wrapper` — `aspect-video`, `rounded-luma`, `overflow-hidden`, `shadow-luma`
- **Thumbnail**: YouTube `maxresdefault.jpg`, zoom 1.05× en hover
- **Overlay**: `bg-black/25` — oscurece thumbnail
- **Play Button**: Círculo blanco con `PhPlay fill`, escala 1.1× en hover
- **Fallback**: `bg-gradient-to-br from-primary/20 to-primary-deep/30` si thumbnail falla
- **Duration badge**: `bg-black/60 rounded text-white text-[10px]` en esquina inferior derecha

### Interacción

1. Click Play → oculta thumbnail/overlay/play → muestra iframe YouTube con autoplay
2. Click Cerrar (X) → oculta iframe → restaura thumbnail/overlay/play
3. Soporte teclado: Enter/Space en botones

---

## 11. Footer

### Grid

```css
.footer-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);  /* mobile: 2×2 */
  gap: 2rem 2.5rem;
}
@media (min-width: 768px) {
  .footer-grid { grid-template-columns: repeat(4, 1fr); }  /* desktop: 4 columnas */
}
```

### Columnas

| Columna | Contenido |
|---------|-----------|
| **Brand** | Logo ULA, descripción, iconos sociales (Instagram, X, YouTube) |
| **Contacto** | Email (link), teléfono, horario — con labels `text-[0.6875rem] uppercase letter-spacing` |
| **Admisión** | Links: Proceso, Requisitos, Testimonios, Contacto |
| **Académico** | Links: Currículo, Contenido, Eventos, Investigación |

### Social Icons

```css
.footer-social-icon {
  width: 32px; height: 32px; border-radius: 9999px;
  border: 1px solid rgba(226, 232, 240, 0.5);
  color: var(--color-ink-muted);
  transition: all 0.2s ease;
}
.footer-social-icon:hover {
  color: var(--color-green);                 /* verde en hover */
  border-color: rgba(0, 178, 90, 0.2);
  background: rgba(0, 178, 90, 0.04);
}
```

### Secondary Links

```css
.footer-secondary-links {
  display: flex; flex-wrap: wrap;
  gap: 0.25rem 1.5rem; justify-content: center;
}
.footer-secondary-link {
  font-size: 0.75rem; color: var(--color-ink-faint);
}
.footer-secondary-link:hover { color: var(--color-primary); }
```

### Bottom Bar

```html
<p class="text-center text-[10px] text-slate-400 tracking-wider">
  &copy; 2026 ULA NURR – Comunicación Social. Todos los derechos reservados.
</p>
```

---

## 12. Elementos Flotantes

### Back to Top

- **Posición**: `fixed bottom-6 left-6 md:bottom-8 md:left-8 z-50`
- **Estilo**: `bg-white border border-tinted rounded-full p-3 shadow-luma`
- **Icono**: `PhArrowUp size={20} weight="regular" text-primary`
- **Visibilidad**: `opacity-0 translate-y-4 pointer-events-none` por defecto
- **Visible**: Cuando scroll > 400px — `opacity-100 translate-y-0 pointer-events-auto`
- **Hover**: `-translate-y-1 shadow-luma`
- **Touch target**: `min-w-[44px] min-h-[44px]`

### WhatsApp FAB

- **Posición**: `fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[90]`
- **Visible**: Solo en desktop (`hidden md:flex`)
- **Estilo**: Círculo `bg-[#25D366]` (verde WhatsApp) con `shadow-lg shadow-[#25D366]/30`
- **Tamaño**: `w-14 h-14 md:w-16 md:h-16`
- **Pulse ring**: `absolute inset-0 rounded-full bg-[#25D366] opacity-20 animate-ping`
- **Hover**: `scale-110`
- **Tooltip**: `absolute right-full mr-3` — "Soporte" en `bg-ink text-white text-[10px] font-bold tracking-wider uppercase rounded-luma`
- **Touch target**: Manilla `touch-action: manipulation`

---

## 13. Estados Interactivos

### Resumen de Transiciones

| Elemento | Propiedad | Duración | Easing |
|----------|-----------|----------|--------|
| Nav pills | transform, box-shadow, border-color | 0.3s | ease |
| Cards | box-shadow, border-color, background | 0.3s | ease |
| CTAs | all (background, transform, shadow) | 0.3s | ease |
| News image zoom | transform | 0.7s | cubic-bezier(0.25,0.46,0.45,0.94) |
| Video thumbnail | transform | 0.7s | ease |
| Footer links | color | 0.2s | ease |
| Social icons | all | 0.2s | ease |
| Back to top | all | 0.3s | cubic-bezier(0.34,1.56,0.64,1) |
| Mobile menu panel | transform | 0.3s | ease-out |
| Nav underline indicator | all | 0.2s | ease |
| Dropdown chevron | transform | 0.2s | ease-out |

### Focus Visible

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
  border-radius: 4px;
}
```

### Reduced Motion (`prefers-reduced-motion: reduce`)

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  /* Elementos específicos: nav-pill, access-card, video-thumbnail, hero elements,
     content-block, back-to-top, toc-mobile, toc-link — transition/animation: none */
  .reveal, .stagger-item { opacity: 1 !important; transform: none !important; }
}
```

### High Contrast (`prefers-contrast: high`)

```css
@media (prefers-contrast: high) {
  :root {
    --color-ink-muted: #333333;
    --color-ink-faint: #555555;
  }
  .card-content, .nav-pill, .access-card { border: 2px solid var(--color-ink); }
}
```

### Forced Colors (Windows High Contrast)

```css
@media (forced-colors: active) {
  .nav-pill, .access-card, .btn-magnetic { border: 2px solid ButtonText; }
  .progress-bar { background: Highlight; }
}
```

---

## 14. Sistema de Iconos

### Convención

Este proyecto usa **`phosphor-icons-astro`**. Todos los iconos se importan como componentes Astro con PascalCase y prefijo `Ph`.

### Importación

```astro
---
import { PhClipboardText, PhArrowRight, PhUserPlus, PhClock, PhBooks, PhBookOpen,
         PhMagnifyingGlass, PhList, PhX, PhCaretDown, PhHouse,
         PhInstagramLogo, PhXLogo, PhYoutubeLogo, PhArrowUp, PhArrowDown,
         PhPlay } from 'phosphor-icons-astro';
---
```

### Props

| Prop | Tipo | Descripción |
|------|------|-------------|
| `size` | `number` | Tamaño en px (16, 18, 20, 22, 24) |
| `weight` | `string` | `"thin"`, `"light"`, `"regular"`, `"bold"`, `"fill"`, `"duotone"` |
| `class` | `string` | Tailwind classes para color/tamaño |

### Pesos Comunes por Contexto

| Contexto | Weight |
|----------|--------|
| Navegación y acciones | `duotone` |
| Iconos decorativos pequeños | `light` |
| Botones y links | `regular` o `bold` |
| Play / reproducción | `fill` |

### Mapa de Iconos (DropdownNav)

| Key | Icono |
|-----|-------|
| `eye` | `PhEye` |
| `graduation-cap` | `PhGraduationCap` |
| `book-open-text` | `PhBookOpenText` |
| `gear` | `PhGear` |
| `users` | `PhUsers` |
| `tree-structure` | `PhTreeStructure` |
| `book-open` | `PhBookOpen` |
| `flask` | `PhFlask` |
| `briefcase` | `PhBriefcase` |
| `heart` | `PhHeart` |
| `calendar` | `PhCalendar` |
| `newspaper` | `PhNewspaper` |
| `notebook` | `PhNotebook` |
| `video` | `PhVideo` |
| `file-text` | `PhFileText` |
| `medal` | `PhMedal` |
| `trend-up` | `PhTrendUp` |
| `user-plus` | `PhUserPlus` |

Ver catálogo completo: [phosphoricons.com](https://phosphoricons.com/)

---

## 15. Accesibilidad

### Skip Link

```html
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>
```
```css
.skip-link { position: absolute; top: -100%; left: 50%; transform: translateX(-50%);
  z-index: 9999; background: var(--color-primary); color: white; padding: 0.75rem 1.5rem; }
.skip-link:focus { top: 0; }
```

### Roles y ARIA

| Componente | Rol/Atributo |
|------------|-------------|
| Nav principal | `aria-label="Navegación principal"` |
| Dropdown trigger | `aria-haspopup="true"`, `aria-expanded` |
| Dropdown panel | `aria-label={label}` |
| Menú móvil | `role="dialog"`, `aria-modal="true"`, `aria-label="Menú de navegación"` |
| Link activo | `aria-current="page"` |
| Secciones | `aria-labelledby` con id del título |
| Footer | `role="contentinfo"`, `aria-label="Pie de página"` |
| Video close | `aria-label="Cerrar video"` |
| Video play | `aria-label="Reproducir video"` |
| WhatsApp | `aria-label="Contactar por WhatsApp para soporte"` |
| Back to top | `aria-label="Volver arriba"` |
| Progress bar | `role="progressbar"`, `aria-label="Progreso de scroll"` |

### Navegación Teclado

- **Dropdown**: ArrowDown abre y enfoca primer item; ArrowUp/ArrowDown navega; Escape cierra y regresa al trigger
- **Menú móvil**: Focus trap con Tab/Shift+Tab; Escape cierra
- **Skip link**: Primer foco al cargar página
- **Video play/close**: Enter/Space en botones

### Touch Targets

- Todos los botones: `min-w-[44px] min-h-[44px]` (WCAG 2.5.5)
- Mobile: `-webkit-tap-highlight-color: transparent` en global

---

## 16. Utilidades y Componentes Adicionales

### Máscaras de Desvanecimiento

```css
.fade-mask {
  mask-image: linear-gradient(to bottom, black 0%, black 80%, transparent 100%);
}
.fade-mask-horizontal {
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}
```

### Glow Central

```css
.central-glow {
  background:
    radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0, 62, 126, 0.04) 0%, transparent 70%),
    radial-gradient(ellipse 40% 40% at 30% 70%, rgba(248, 151, 40, 0.03) 0%, transparent 60%);
}
```

### Progress Bar

```css
.reading-progress { position: fixed; top: 0; left: 0; height: 2px;
  background: var(--color-primary); z-index: 200; transform-origin: left; }
.progress-glow { box-shadow: 0 0 12px rgba(0, 62, 126, 0.4), 0 0 32px rgba(0, 62, 126, 0.15); }
```

Implementado con Lenis: `lenis.on('scroll', callback)` → `scaleX(progress)`.

### Tabla de Contenidos (TOC)

- **Sidebar**: `.toc-sidebar` — `position: sticky; top: 7rem; max-height: calc(100vh - 8rem)`
- **Link**: `.toc-link` — transición color, `:hover → color-primary`
- **Link activo**: `.toc-link-active` — `color-primary font-semibold` con barra lateral (`::before` de 3px)
- **Responsive**: Oculto en ≤ 1024px, reemplazado por `<details>` `.toc-mobile`

---

## Convenciones de Nomenclatura

| Tipo | Patrón | Ejemplo |
|------|--------|---------|
| Colores | `--color-{rol}` | `--color-primary`, `--color-accent-hover` |
| Fuentes | `--font-{rol}` | `--font-display`, `--font-body` |
| Tamaños texto | `--text-{escala}` | `--text-xs`, `--text-2xl` |
| Breakpoints | `--breakpoint-{nombre}` | `--breakpoint-xs` |
| Utilidades CSS | `.{nombre}-{variante}` | `.badge-verde`, `.section-academic` |
| Componentes | PascalCase | `HeroSection.astro`, `QuickAccessSection.astro` |
| Iconos | `Ph` + PascalCase | `PhArrowRight`, `PhMagnifyingGlass` |

---

> **Referencias**: `src/styles/global.css` (tokens + utilidades), `src/components/*.astro` (patrones de componentes),
> `AGENTS.md` (convención de iconos), `Manual_Identidad_Visual_ULA_NURR_v2.pdf` (Secciones 06 y 09).
