---
name: criterio-diseno-web-ux
description: Reglas accionables de dirección de arte, diseño UX/UI nivel Awwwards y front-end creativo para estudioinception.com. Usar siempre antes de diseñar, maquetar, estilar o auditar cualquier pantalla, sección, componente o animación del sitio.
---

# Criterio de Diseño Web y UX — Estudio Inception

**Brújula de marca (tono):** **Preciso · Profundo · Onírico**.
Toda decisión visual, tipográfica, de interacción o de código debe pasar este filtro: si se siente genérico, recargado o ruidoso, se elimina.

---

## 1. Jerarquía visual

- **Un único punto focal por pantalla/sección.** Ninguna sección puede tener dos elementos compitiendo por el primer impacto.
- **Orden de lectura obligatorio por sección:** definir explícitamente qué se ve `1º` (ancla visual o titular), `2º` (subtítulo, métrica o tarjeta principal) y `3º` (CTA o detalle técnico).
- **Herramientas permitidas para jerarquizar:** tamaño, peso, contraste, color de acento, espacio en blanco, posición y movimiento. Prohibido usar bordes gruesos, cajas de colores saturados o sombras pesadas para forzar jerarquía.
- **Regla de respiración:** el espacio vacío es parte activa del diseño.
  - Padding vertical mínimo por sección: `120px` en desktop (`>= 1024px`), `80px` en tablet, `64px` en móvil.
  - Máximo **una idea principal** por sección.
- **Sistema de espaciado base 8px:** usar exclusivamente múltiplos de `8px` (`8, 16, 24, 32, 48, 64, 96, 120, 160`).
- **Grilla estructural:** `12` columnas en desktop (`gap: 24px`), `8` en tablet (`gap: 20px`), `4` en móvil (`gap: 16px`), con márgenes laterales fluidos (`clamp(20px, 5vw, 80px)`) y ancho máximo de contenedor `1320px`.

---

## 2. Jerarquía tipográfica

- **Máximo 2 familias tipográficas:**
  1. **Display / Títulos:** `Space Grotesk` — elegida por su geometría técnica, proporciones arquitectónicas y carácter contemporáneo que refuerza la precisión del estudio.
  2. **Cuerpo / UI:** `Inter` (con fallback `system-ui, sans-serif`) — elegida por su neutralidad, apertura de ojo y legibilidad impecable en párrafos, etiquetas y microcopy técnico.
- **Máximo 3 pesos en todo el sitio:** `400` (Regular), `500` (Medium) y `700` (Bold). Prohibido usar `300`, `600`, `800` o `900`.
- **Escala modular fluida con `clamp()` (ratio ~1.25–1.333):**
  - `--text-display`: `clamp(2.75rem, 6vw, 5.25rem)` (line-height: `1.02`, letter-spacing: `-0.03em`)
  - `--text-h1`: `clamp(2.25rem, 4.5vw, 4rem)` (line-height: `1.06`, letter-spacing: `-0.025em`)
  - `--text-h2`: `clamp(1.75rem, 3vw, 2.75rem)` (line-height: `1.12`, letter-spacing: `-0.02em`)
  - `--text-h3`: `clamp(1.25rem, 1.8vw, 1.625rem)` (line-height: `1.2`, letter-spacing: `-0.01em`)
  - `--text-lead`: `clamp(1.0625rem, 1.3vw, 1.25rem)` (line-height: `1.55`)
  - `--text-body`: `1rem` (line-height: `1.65`)
  - `--text-small`: `0.875rem` (line-height: `1.5`)
  - `--text-caption`: `0.75rem` (line-height: `1.4`, letter-spacing: `0.06em`, uppercase para etiquetas técnicas)
- **Ancho de línea de lectura:** limitar bloques de texto a `55ch–75ch` (`max-width: 62ch`).
- **Regla absoluta para títulos:** los títulos principales van en **MAYÚSCULAS** (`text-transform: uppercase`) y **NO llevan degradados de color, sombras de texto ni efectos extraños**. Su impacto nace únicamente de la familia tipográfica, el tamaño, el peso, el contraste y **una sola palabra o frase clave en color de acento**.

---

## 3. Color

- **Base visual:** modo oscuro profundo y elegante, coherente con la estética onírica y nocturna de *Inception*.
- **Paleta minimalista en variables CSS (tokens):**
  - `--bg-base`: `#030712` (fondo principal negro profundo / obsidiana)
  - `--bg-surface`: `#090D18` (superficie de tarjetas y bloques)
  - `--bg-elevated`: `#0F1629` (superficies en hover o modales)
  - `--text-primary`: `#FEFFFA` (blanco nítido, contraste > 17:1 sobre `--bg-base`)
  - `--text-secondary`: `#94A3B8` (contraste > 7:1 sobre `--bg-base`, cumple WCAG AA)
  - `--border-subtle`: `rgba(254, 255, 250, 0.08)`
  - `--accent`: `#3B82F6` (azul eléctrico técnico; contraste > 5.2:1 sobre `#030712`)
  - `--accent-soft`: `rgba(59, 130, 246, 0.14)`
- **Reglas de uso:**
  - Contraste mínimo **WCAG AA (`4.5:1`)** en todo texto de cuerpo y `3:1` en texto grande o elementos de UI.
  - El color de acento debe ocupar **menos del 10% de la superficie visible**. Se reserva para: palabra clave del titular, CTA principal, indicadores activos y destellos sutiles.

---

## 4. Principios de UX

- **Regla de los 5 segundos:** en la primera pantalla sin scrollear, cualquier visitante entiende qué hace el estudio, para quién trabaja y cuál es la acción principal.
- **Un CTA principal por pantalla.** Los CTAs secundarios deben ser visualmente discretos (estilo ghost o enlace con flecha).
- **Navegación simple:** máximo `5–6` ítems en el header (`Servicios`, `Proceso`, `Proyectos`, `Estudio`, `Contacto` + botón de CTA).
- **Estados interactivos obligatorios:** todos los links, botones y tarjetas interactivas deben definir estados `:hover`, `:focus-visible` (outline de `2px` en `--accent` con `offset: 3px`) y `:active` (`scale(0.98)`).
- **Mobile-first real:** el diseño móvil no es una versión apilada a la fuerza del desktop; tiene composición propia, tipografía proporcionada, áreas táctiles mínimas de `44x44px` y navegación accesible con una mano.
- **Accesibilidad:** HTML5 semántico (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`), un único `<h1>` por página, `alt` descriptivo en imágenes (o `aria-hidden="true"` en elementos puramente decorativos como el tótem 3D), navegación completa por teclado.
- **Rendimiento:** objetivo `LCP < 2.5s`, `CLS ≈ 0`. Animar exclusivamente `transform`, `opacity` y `filter` puntual (blur de entrada/salida). Fuentes locales con `@fontsource` o `font-display: swap`.

---

## 5. Principios de movimiento

- **Propósito:** el movimiento comunica jerarquía espacial y continuidad narrativa; nunca decora sin sentido.
- **Transiciones con profundidad y fluidez:**
  - Las secciones y bloques entran combinando desplazamiento en Y (`24px–40px -> 0`), escala sutil (`0.97 -> 1`) para simular eje Z, y **leve motion blur** (`filter: blur(4px) -> blur(0px)`) que se resuelve al llegar a su posición.
  - Parallax suave y contenido entre capas (`yPercent` sutil, nunca mareante).
- **Curvas y tiempos:**
  - Easing principal: `cubic-bezier(0.16, 1, 0.3, 1)` (expo out suave).
  - Duraciones: `0.6s` a `1.2s`.
  - Stagger en grillas y listas: `0.07s` a `0.1s` entre elementos.
- **Scroll suave:** integrar **Lenis** sincronizado con **GSAP + ScrollTrigger**.
- **Destellos de luz sutiles bordeando contenedores y tarjetas:**
  - Implementar un brillo perimetral que recorre el borde usando `@property --glow-angle` + `conic-gradient` + máscara CSS (`mask-composite: exclude`).
  - Baja opacidad en reposo (`0.18–0.28`), rotación lenta (`8s–12s` linear) e intensificación suave en `:hover` (`0.55–0.7`).
  - Debe percibirse como un **reflejo metálico/arquitectónico**, jamás como neón saturado.
- **Accesibilidad de movimiento:** envolver transiciones, Lenis, parallax y giros automáticos con `@media (prefers-reduced-motion: reduce)` y chequeo JS `window.matchMedia('(prefers-reduced-motion: reduce)')` para mostrar el estado final nítido sin animaciones.

---

## 6. Reglas del Hero

- **Titular:** máximo **1 o 2 renglones** en `--text-display`, con **una única palabra en `--accent`**.
- **Soporte y acción:** debajo del titular, **una sola línea de apoyo** (`--text-lead`, máx. `12–16` palabras) y **un CTA principal** (opcionalmente un enlace secundario discreto al lado).
- **Elemento visual representativo (Tótem de Inception):**
  - Un **trompo 3D girando** (Three.js o escena SVG/CSS 3D ligera de alto detalle según presupuesto de carga) con iluminación sutil en tonos grafito y reflejo `--accent`.
  - Rotación fluida y continua, con leve inclinación/reacción al movimiento del mouse y al scroll.
  - Rol estrictamente simbólico y decorativo (`aria-hidden="true"`): **nunca debe competir en contraste ni tapar el titular**.
- **Prohibido en el Hero:** párrafos largos, listas de bullets, múltiples badges apilados o más de un mensaje.

---

## 7. Anti-patrones (prohibido)

- Degradados en texto (`background-clip: text`).
- Sombras pesadas o difusas de colores (`box-shadow` tipo neón).
- Más de 2 familias tipográficas o más de 3 pesos.
- Carruseles automáticos que roban el control al usuario.
- Animaciones que bloquean el scroll o retrasan la lectura del contenido principal.
- Parallax agresivo o mareante.
- Popups intrusivos, banners de descuento o chat-bots flotantes invasivos.
- Íconos genéricos de stock sin coherencia de trazo.
- Secciones con más de una idea principal.
- Texto sobre imágenes sin overlay/contraste verificado (>= 4.5:1).

---

## 8. Checklist de calidad "nivel Awwwards"

Antes de dar por terminado cualquier entregable, auditar cada punto:

- [ ] **Jerarquía clara:** ¿Se identifica en 1 segundo el punto focal de cada sección y el orden 1º -> 2º -> 3º?
- [ ] **Regla de los 5 segundos:** ¿Se entiende en el Hero qué hace el estudio, para quién y cuál es el siguiente paso?
- [ ] **Tipografía limpia:** ¿Solo Space Grotesk + Inter, máx. 3 pesos, `clamp()` fluido y cero degradados en títulos?
- [ ] **Color y contraste:** ¿Base oscura `#07080B`, acento `< 10%` de superficie y contraste >= 4.5:1 en todo texto?
- [ ] **Destellos elegantes:** ¿Las tarjetas tienen borde con destello sutil estilo reflejo (no neón)?
- [ ] **Tótem en Hero:** ¿El trompo gira fluido, reacciona sutilmente y respeta el protagonismo del titular?
- [ ] **Movimiento con profundidad:** ¿Hay fluidez (Lenis + GSAP), escala/Z sutil y leve motion blur que resuelve limpio?
- [ ] **Rendimiento:** ¿LCP < 2.5s, CLS ≈ 0 y sin errores en consola?
- [ ] **Accesibilidad:** ¿Foco visible en teclado, semántica HTML correcta y `prefers-reduced-motion` funcional?
- [ ] **Coherencia de tono:** ¿El resultado transmite **Preciso · Profundo · Onírico** de principio a fin?
