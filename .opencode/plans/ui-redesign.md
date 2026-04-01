# ULA Social Communication - UI Redesign Plan

## Design Direction: Editorial Academic

**Aesthetic**: Refined editorial design inspired by academic publications and modern university branding. Combines sophisticated typography with generous whitespace, subtle textures, and purposeful color accents. Think "university meets high-end editorial" — authoritative yet approachable.

**Tone**: Refined, academic, editorial with subtle warmth
**Differentiation**: Distinctive serif display font paired with geometric sans, asymmetric compositions, layered depth with subtle textures

---

## 1. Typography System

### Fonts (replace Inter)
- **Display**: `Fraunces` (Google Fonts) — soft serif with character, perfect for academic headings
- **Body**: `Satoshi` (Fontshare CDN) — clean geometric sans for readability

### Font Loading (Layout.astro)
```html
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet" />
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap" rel="stylesheet" />
```

### Theme Tokens
```css
--font-display: "Fraunces", serif;
--font-body: "Satoshi", sans-serif;
```

---

## 2. Color System

### New Palette
| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#005daa` | ULA brand blue (keep) |
| `primary-deep` | `#003d6e` | Darker accents, hover states |
| `primary-light` | `#3a8fd4` | Light accents, highlights |
| `accent` | `#e8734a` | Warm accent for CTAs, highlights |
| `accent-soft` | `#f4a07b` | Soft warm backgrounds |
| `surface` | `#fafafa` | Page background |
| `surface-elevated` | `#ffffff` | Card backgrounds |
| `ink` | `#0a0a0a` | Primary text |
| `ink-muted` | `#5c5c5c` | Secondary text |
| `ink-faint` | `#9a9a9a` | Tertiary text, borders |
| `border` | `rgba(0,0,0,0.06)` | Subtle borders |

### Page Background
Change from pure white to warm off-white (`#f5f5f3`) for depth and warmth.

---

## 3. Global CSS Changes (src/styles/global.css)

### Key Changes
- Replace `transition: all` with explicit properties (guidelines violation)
- Add `:focus-visible` states globally
- Add `-webkit-tap-highlight-color: transparent`
- Add `::selection` styling
- Add `scroll-behavior: smooth`
- Add `.access-card` class for QuickAccess section
- Add `.nav-pill` class (rename from `.glass-pill`)
- Add `.fade-mask-horizontal` for horizontal masking
- Add `overscroll-behavior: contain` for mobile menu
- Improve card shadows with layered approach
- Add card content overlay gradient for depth
- Add video player inner glow effect

### Reduced Motion
- Add `animation-duration: 0.01ms` for all elements
- Keep existing overrides

---

## 4. Layout.astro Changes

### Add
```html
<html class="light" lang="es">
```
- Add `theme-color` meta: `<meta name="theme-color" content="#f5f5f3" />`
- Add Satoshi + Fraunces font links (replace Inter)
- Add `color-scheme: light` to html
- Add `overflow-x: hidden` to body class

### Remove
- Inter font link
- Inline tailwind config (not needed with Tailwind v4 + @theme)

---

## 5. HeroSection.astro Redesign

### Visual Changes
- Replace `.hero-bg-circle` with larger, more organic gradient shapes
- Add diagonal flow with offset text alignment
- Add subtle decorative line element
- Use Fraunces for heading with italic accent word
- Add micro text elements (e.g., "NÚCLEO UNIVERSITARIO RAFAEL RANGEL" as eyebrow)

### Structure
```
Section: layered-card, add subtle texture background

Eyebrow: text-[10px] tracking-[0.4em] uppercase, ink-faint

H1: Fraunces, 5rem-10rem, with "Social" in italic
    Keep char-based animation

Subtitle: Satoshi, increased weight contrast

CTA: accent color background option, or keep primary with shadow
```

### Add Decorative Elements
- Thin horizontal rule above/below heading
- Small geometric accent shapes
- Subtle noise texture overlay

---

## 6. NewsSection.astro Redesign

### Visual Changes
- Asymmetric layout: image takes 60%, text 40% on desktop
- Add floating label/tag element overlapping image edge
- Add subtle border accent line
- Use Fraunces for section heading
- Add date/category metadata

### Structure
```
Two-column layout on desktop:
  Left: Image (60%) with overlay gradient
  Right: Text content (40%) with accent border-left

Mobile: Stack with image on top
```

---

## 7. VideoSection.astro Redesign

### Visual Changes
- Darker, more cinematic presentation
- Add subtle vignette effect
- Play button: larger, with animated ring pulse
- Add video duration badge
- Use accent color for play button hover

### Structure
```
Header: Centered with badge and heading

Video Player:
  - Add aspect-ratio container
  - Gradient overlay from bottom
  - Play button with pulse ring animation
  - Duration badge in corner
  - Title overlay on hover

Footer text: Centered, light weight
```

---

## 8. QuickAccessSection.astro Redesign

### Visual Changes
- Replace glass-pill cards with `.access-card` style
- Add icon background circles
- Add hover icon rotation effect
- Use grid with asymmetric sizing (one card spans 2 cols)
- Add section number indicator

### Structure
```
Header: Section number + title

Desktop Grid (2 cols):
  Card 1: Normal
  Card 2: Normal
  Card 3: Normal
  Card 4: Normal

  Each card: icon in circle + text

Mobile: Horizontal scroll with snap
```

---

## 9. FloatingNav.astro Redesign

### Visual Changes
- Replace `.glass-pill` with `.nav-pill`
- Add active state indicator (dot next to current section)
- Add subtle connecting line between items
- Tooltip labels on hover

### Structure
```
Vertical stack with:
  - Connecting line (thin vertical rule)
  - Nav pills with icons
  - Active indicator dot
```

---

## 10. TopNav.astro Redesign

### Visual Changes
- Refine spacing and proportions
- Add hover underline animation for links
- Mobile menu: slide-in with backdrop blur
- Add keyboard support (Escape to close)

### Mobile Menu Fixes
- Add `overscroll-behavior: contain` to panel
- Add `aria-hidden` toggle
- Add keyboard event listener (Escape key)
- Add `role="dialog"` and `aria-modal="true"`
- Focus trap within menu when open

---

## 11. Footer.astro Redesign

### Visual Changes
- Add subtle top border gradient
- Use Fraunces for footer heading
- Add social icons with hover effects
- Campus Online badge: refine with pulse animation

### Structure
```
4-column grid (desktop):
  Col 1: Logo + description
  Col 2: Academia links
  Col 3: Social links
  Col 4: CTA button + hours

Bottom bar: Copyright + legal
```

---

## 12. Animations.js Enhancements

### New Animations
- Hero: staggered char reveal with slight rotation
- Scroll: parallax on background elements
- Cards: scale + fade with slight overshoot
- Progress bar: smooth scrub

### Fixes
- Add `prefers-reduced-motion` check before initializing Lenis smooth scroll
- Use `transform` and `opacity` only (no layout properties)
- Add proper cleanup on ScrollTrigger instances
- Magnetic buttons: check for reduced motion

### Mobile Menu Animation
- Add GSAP animation for mobile menu slide
- Animate menu items stagger on open

---

## 13. Accessibility Fixes (Web Guidelines)

### Priority Fixes
1. **Focus states**: Add `:focus-visible` styles to all interactive elements
2. **Keyboard nav**: Add `onKeyDown` handlers for mobile menu (Escape to close)
3. **Image dimensions**: Add `width` and `height` to all `<img>` tags
4. **ARIA**: Add `aria-expanded` toggle on mobile menu button
5. **Semantic HTML**: Ensure all buttons use `<button>`, links use `<a>`
6. **Touch targets**: Ensure minimum 44x44px touch targets
7. **Safe areas**: Add `env(safe-area-inset-*)` padding for notched devices
8. **Overscroll**: Add `overscroll-behavior: contain` to mobile menu panel
9. **Heading hierarchy**: Ensure proper h1 → h2 → h3 flow
10. **Text wrapping**: Add `text-wrap: balance` to headings

---

## 14. Performance Optimizations

- Add `loading="lazy"` to below-fold images (already done)
- Add `fetchpriority="high"` to hero image if added
- Add `content-visibility: auto` to sections (already done)
- Preconnect to font domains (already done)
- Virtualize any lists > 50 items (not applicable)

---

## Implementation Order

1. **Foundation**: global.css + Layout.astro (fonts, colors, base styles)
2. **Hero**: HeroSection.astro (most visible section)
3. **Content sections**: NewsSection, VideoSection, QuickAccessSection
4. **Navigation**: FloatingNav, TopNav (including mobile menu fixes)
5. **Footer**: Footer.astro
6. **Animations**: animations.js enhancements
7. **Accessibility**: Audit and fix remaining issues
8. **Testing**: Build and verify

---

## Files to Modify

| File | Changes |
|------|---------|
| `src/styles/global.css` | Complete rewrite with new design system |
| `src/layouts/Layout.astro` | Font links, meta tags, remove inline config |
| `src/components/HeroSection.astro` | New typography, decorative elements |
| `src/components/NewsSection.astro` | Asymmetric layout, new styling |
| `src/components/VideoSection.astro` | Cinematic presentation |
| `src/components/QuickAccessSection.astro` | New card design |
| `src/components/FloatingNav.astro` | Refined pills, active state |
| `src/components/TopNav.astro` | Mobile menu fixes, hover states |
| `src/components/Footer.astro` | Refined layout |
| `src/scripts/animations.js` | Enhanced animations, accessibility |
