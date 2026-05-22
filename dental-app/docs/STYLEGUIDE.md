# Guía de estilo — DS Dental Aesthetics

Sistema de diseño alineado con la marca institucional y buenas prácticas WCAG 2.1 AA.

## Paleta de color

| Token | Hex | Uso |
|-------|-----|-----|
| Slate | `#4A5568` | Texto secundario, UI |
| Slate Dark | `#374151` | Títulos, footer, texto principal |
| Gold | `#C5A021` | Acentos, CTAs, focus |
| Gold Dark | `#A68A1A` | Hover, enlaces |
| White | `#FFFFFF` | Fondos de tarjetas |
| Background Warm | `#F8F6F0` | Secciones alternas |

**Contraste:** Texto principal sobre blanco usa Slate Dark. Botones primarios usan texto Slate Dark sobre fondo Gold.

## Tipografía

- Familia: **Inter** (400, 500, 600, 700)
- Escala fluida con `clamp()` en h1–h3
- Cuerpo: 16px base, line-height 1.75

## Espaciado y layout

- Contenedor máximo: `lg` (1200px)
- Mobile-first: estilos base en `xs`, escala en `sm` / `md`
- Grid y Flexbox (MUI Grid v2)

## Componentes

| Componente | Uso |
|------------|-----|
| `BrandLogo` | Header, admin |
| `LazyImage` | Imágenes con lazy load y skeleton |
| `PageSection` | Secciones semánticas |
| `SkipLink` | Accesibilidad teclado |

## Interacción

- **Touch targets:** mínimo 44×44 px
- **Focus visible:** anillo dorado (`tokens.focusRing`)
- **Transiciones:** 150–400 ms; respeto a `prefers-reduced-motion`
- **FAB móvil:** Reservar cita (solo &lt; md)

## Accesibilidad

- `lang="es"` en HTML
- Landmarks: `header`, `main`, `footer`, `nav`, `section`
- `aria-current="page"` en navegación activa
- Diálogos: `role="dialog"`, `aria-modal`, `aria-labelledby`
- Skip link al contenido principal

## Responsive

| Breakpoint | Ancho |
|------------|-------|
| xs | 0 |
| sm | 600px |
| md | 900px |
| lg | 1200px |

## Archivos de tema

- `src/theme/brand.ts` — colores
- `src/theme/tokens.ts` — espaciado, focus, elevación
- `src/theme/theme.ts` — tema MUI
- `src/theme/globalStyles.tsx` — estilos globales
