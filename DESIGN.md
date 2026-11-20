# DESIGN.md — Sistema de Diseño de Roxel Essence

Este documento define el sistema visual, los tokens, los componentes, las interacciones y las convenciones de accesibilidad y copy de **Roxel Essence** (catálogo de perfumería con carrito persistente y checkout por WhatsApp en `es-AR`).

Es la **fuente de verdad visual** para cualquier agente de IA o persona que cree o modifique interfaz, estilos o contenido en el repositorio.

**Fuentes de verdad en código:**

- Tokens y reglas CSS globales: `src/styles/global.css`
- Componentes de interfaz: `src/components/` (`src/components/index.ts` y `src/components/types.ts`)
- Documento base y enlace de salto: `src/layouts/Layout.astro`
- Activos de marca: `src/assets/logo.svg` y `src/assets/background_texture.webp`

---

## 1. Identidad visual y activos de marca

### Dirección estética: «Ónix, Oro Metálico y Porcelana»

La interfaz combina un marco editorial oscuro y sobrio con un escenario de catálogo luminoso de alto contraste:

- **Marco oscuro atmosférico (`#000000` / `#0C0C0C`)**: utilizado en `Navbar`, `Hero` y `Footer`, así como en controles de navegación y filtrado (`FilterButton`, `CarouselArrowButton`, `VolumeBadge` variante `"dark"`, `Button` variante `"dark"` y notificaciones toast).
- **Escenario claro de catálogo (`#FAFAFA` / `#FFFFFF`)**: superficie neutra `#FAFAFA` para lectura prolongada y tarjetas blancas `#FFFFFF` con bordes sutiles `#E8E8E8` y tinta `#111111`, permitiendo que los frascos de perfume destaquen sin ruido visual.
- **Acentos dorados (`#F1B34C` / `#D3AD62`)**: usados con moderación como señal de marca, llamadas a la acción principales (`AddToCartButton`, `Button` variante `"gold"`), estados activos (volumen seleccionado, filtros activos, menú actual) y detalles tipográficos de marca.
- **Acentos funcionales estrictamente semánticos**:
  - **Celeste hielo (`#B4D7D9`)**: exclusivo del badge contador en `CartButton`.
  - **Verdes WhatsApp (`#1FA851` / `#17883E` / `#126E32`)**: exclusivos de contacto flotante/sticky (`WhatsAppButton`) y checkout (`WhatsAppCheckoutButton`).
  - **Coral / Rojo (`#DC6C6C` / `#B93A3A` / `#FEF2F2`)**: exclusivos de acciones destructivas (`RemoveButton`) y errores de validación en formularios.

### Activos de marca e imágenes

- **Logotipo (`src/assets/logo.svg`)**: monograma vectorial en blanco puro (`fill="#fff"`, `viewBox="0 0 1006 1007"`). Debe usarse **únicamente** sobre fondos oscuros (`#000000` / `#0C0C0C`) o como `favicon` / `apple-touch-icon` en `<head>`. Nunca colocarlo directo sobre superficies claras sin un contenedor oscuro.
- **Textura de fondo (`src/assets/background_texture.webp`)**: textura oscura atmosférica usada exclusivamente en `Hero` (`opacity-80`), suavizada con un velo `bg-roxel-dark-950/45` y un degradado inferior (`h-16 sm:h-24 bg-linear-to-b from-transparent via-roxel-dark-950/60 to-roxel-surface`) para fundir el Hero con el catálogo claro.
- **Fotografía de producto (`ProductCard` y `CartItemRow`)**:
  - En tarjetas (`ProductCard`): contenedor `aspect-[4/3]` con fondo `bg-roxel-surface-card` (`#FFFFFF`), `rounded-lg overflow-hidden`, imagen con `object-contain`, `loading="lazy"` y `decoding="async"` para respetar la silueta de frascos y cutouts sin recortes.
  - En carrito (`CartItemRow`): miniatura `w-24 h-28 sm:w-28 sm:h-32` con borde `border-roxel-border`, `rounded-xl`, `p-2`, fondo `bg-roxel-surface-card` e imagen `object-contain`.

---

## 2. Tokens de color (`@theme` en `src/styles/global.css`)

Tailwind CSS v4 genera utilidades automáticamente a partir de `@theme`. **No usar colores hexadecimales hardcodeados ni escalas genéricas de Tailwind (`amber-*`, `slate-*`, `gray-*`, etc.)**.

### Brand Gold

| Token CSS | Utilidades Tailwind | Valor HEX | Uso semántico real en el diseño |
| :--- | :--- | :--- | :--- |
| `--color-roxel-gold-50` | `*-roxel-gold-50` | `#FDF7EA` | Hover de `<option>` en `SelectField` (`base-select`). |
| `--color-roxel-gold-100` | `*-roxel-gold-100` | `#FBEBD0` | Estado `:checked` de `<option>` en `SelectField`. |
| `--color-roxel-gold-200` | `*-roxel-gold-200` | `#F7D79E` | Tinte dorado claro disponible en la escala de marca. |
| `--color-roxel-gold-300` | `*-roxel-gold-300` | `#F4C46D` | Hover de `CartButton` y enlaces de menú en `Navbar`; texto de `FilterButton` en `CatalogSection` (`text-roxel-gold-300!`). |
| `--color-roxel-gold-400` | `*-roxel-gold-400` | `#F1B34C` | Dorado principal de interacción: `Button variant="gold"`, fondo en reposo y texto hover de `AddToCartButton`, `VolumeBadge` activo/gold, pills de filtro activas, badge contador en `FilterButton`, cap de caret en `SelectField`, borde izquierdo activo en menú `Navbar`, borde del toast (`border-roxel-gold-400/50`), anillo `focus-visible` sobre fondos oscuros. |
| `--color-roxel-gold-500` | `*-roxel-gold-500` | `#D99B30` | Hover de `Button variant="gold"`; asterisco `*` de nota de envío en `CartSummary`. |
| `--color-roxel-gold-600` | `*-roxel-gold-600` | `#B87E1E` | Estado active de `Button variant="gold"`; pulgar (`--scrollbar-thumb`) de barras de scroll estilizadas sobre pista `transparent` (garantiza ≥ 3:1 WCAG 1.4.11 sobre todas las superficies claras `#FAFAFA` / `#FFFFFF` y oscuras `#000000` / `#0C0C0C`). |
| `--color-roxel-gold-700` | `*-roxel-gold-700` | `#8E5F15` | Dorado profundo disponible en la escala de marca. |
| `--color-roxel-gold-metallic` | `*-roxel-gold-metallic` | `#D3AD62` | Subtítulo `ESSENCE` en `BrandWordmark`, ícono en reposo de `CartButton`, enlace activo en menú `Navbar`, hover del botón menú y enlaces en `Footer`, texto del skip link enfocado. |

### Brand Dark / Onyx

| Token CSS | Utilidades Tailwind | Valor HEX | Uso semántico real en el diseño |
| :--- | :--- | :--- | :--- |
| `--color-roxel-dark-950` | `*-roxel-dark-950` | `#000000` | Fondo de `Navbar`, base de `Hero` (incluyendo velo `/45` y degradado `/60`), fondo del skip link enfocado. |
| `--color-roxel-dark-900` | `*-roxel-dark-900` | `#0C0C0C` | Fondo de `Footer`, popover de `Navbar`, `Button variant="dark"`, `FilterButton`, `CarouselArrowButton`, `VolumeBadge` variante `"dark"`, estado hover de `AddToCartButton`, fondo del toast. |
| `--color-roxel-dark-800` | `*-roxel-dark-800` | `#1A1A1A` | Bordes de separación oscuros (`Navbar`, `Footer`), hover de `Button variant="dark"`, `Button variant="ghost"`, `CartButton`, botón de menú, enlaces del menú y redes en `Footer`; active de `AddToCartButton`. |
| `--color-roxel-dark-700` | `*-roxel-dark-700` | `#2E2E2E` | Borde del popover de `Navbar`, estado active de `Button variant="dark"` y `CarouselArrowButton`. |

### Surfaces & Neutrals

| Token CSS | Utilidades Tailwind | Valor HEX | Uso semántico real en el diseño |
| :--- | :--- | :--- | :--- |
| `--color-roxel-surface` | `*-roxel-surface` | `#FAFAFA` | Fondo base del sitio (`body`, `main`), fondo de campos `TextField` y `SelectField`, fondo en reposo de `CloseButton`, color destino del degradado inferior de `Hero`. |
| `--color-roxel-surface-card` | `*-roxel-surface-card` | `#FFFFFF` | Fondo de `ProductCard`, contenedor de imagen en card, panel de filtros, estado vacío, `CartModal`, `CartPanel`, miniatura en `CartItemRow`, `QuantityStepper`, `::picker(select)`. |
| `--color-roxel-surface-subtle` | `*-roxel-surface-subtle` | `#F2F2F2` | Pills de filtro inactivas, hover de `Button variant="outline"`, hover de `CloseButton` y botones de `QuantityStepper`. |
| `--color-roxel-ink` | `*-roxel-ink` | `#111111` | Tinta principal sobre superficies claras y doradas (`Button variant="gold"`, `AddToCartButton` en reposo, `VolumeBadge` activo, pills activas, cap de `SelectField`, títulos y precios); anillo `focus-visible` sobre fondos claros; indicador `option::checkmark`. |
| `--color-roxel-ink-muted` | `*-roxel-ink-muted` | `#595959` | Descripciones de producto (`ProductDescription`), títulos de grupo en panel de filtros, placeholders de `TextField`, `helperText`, `shippingNote` en `CartSummary`, mensajes vacíos (`CartPanel`, catálogo sin resultados). |
| `--color-roxel-ink-inverse` | `*-roxel-ink-inverse` | `#FFFFFF` | Tinta principal sobre fondos oscuros (`BrandWordmark`, `Navbar`, `Footer`, `Button variant="dark"`, `Button variant="ghost"`, `CarouselArrowButton`, `VolumeBadge` dark, toast) y sobre `WhatsAppCheckoutButton` / badge `!` de error. |
| `--color-roxel-ink-inverse-muted` | `*-roxel-ink-inverse-muted` | `#D4D4D4` | `HeroTagline` y textos secundarios del `Footer` (horarios y encabezado de redes sociales). |
| `--color-roxel-border` | `*-roxel-border` | `#D4D4D4` | `SectionDivider`, divisor superior del resumen e ítems en `CartPanel`, borde de `CartModal`, `QuantityStepper`, miniatura en `CartItemRow` y `Button variant="outline"`. |
| `--color-roxel-border-subtle` | `*-roxel-border-subtle` | `#E8E8E8` | Borde de `ProductCard`, panel de filtros, estado vacío, `CloseButton`, separadores internos de `QuantityStepper` y hover de pills de filtro inactivas. |
| `--color-roxel-border-input` | `*-roxel-border-input` | `#595959` | Borde de alto contraste en reposo para `TextField`, `SelectField`, separador de su cap dorado y `::picker(select)`. |

### Functional Accents

| Token CSS | Utilidades Tailwind | Valor HEX | Uso semántico real en el diseño |
| :--- | :--- | :--- | :--- |
| `--color-roxel-badge` | `*-roxel-badge` | `#B4D7D9` | Fondo de la insignia de cantidad en `CartButton`. |
| `--color-roxel-badge-ink` | `*-roxel-badge-ink` | `#111111` | Texto de la insignia de cantidad en `CartButton`. |
| `--color-roxel-whatsapp` | `*-roxel-whatsapp` | `#1FA851` | Base del pulso radar en `WhatsAppButton` (`bg-roxel-whatsapp/45`). *(Nota: `WhatsAppIcon2` usa además un degradado SVG interno `#57D163` → `#23B33A`.)* |
| `--color-roxel-whatsapp-hover` | `*-roxel-whatsapp-hover` | `#17883E` | Token de hover asociado al verde WhatsApp funcional. |
| `--color-roxel-whatsapp-cta` | `*-roxel-whatsapp-cta` | `#17883E` | Fondo de `WhatsAppCheckoutButton` (verde calibrado para contraste WCAG AA con texto blanco). |
| `--color-roxel-whatsapp-cta-hover` | `*-roxel-whatsapp-cta-hover` | `#126E32` | Hover de `WhatsAppCheckoutButton`. |
| `--color-roxel-danger` | `*-roxel-danger` | `#DC6C6C` | Ícono en reposo de `RemoveButton`. |
| `--color-roxel-danger-hover` | `*-roxel-danger-hover` | `#B93A3A` | Hover y foco de `RemoveButton`, borde e ícono `!` de error en `TextField`/`SelectField`, marca `*` de campo requerido y regla `.roxel-field-input:user-invalid`. |
| `--color-roxel-danger-surface` | `*-roxel-danger-surface` | `#FEF2F2` | Fondo hover de `RemoveButton`. |

### Reglas estrictas de emparejamiento y contraste

1. **Sobre dorado (`roxel-gold-400`, `roxel-gold-500`) y celeste (`roxel-badge`)**: usar **siempre** tinta oscura (`text-roxel-ink`, `#111111`). Nunca usar texto blanco sobre dorado.
2. **Sobre oscuro (`roxel-dark-950`, `roxel-dark-900`)**: usar `text-roxel-ink-inverse`, `text-roxel-ink-inverse-muted`, `text-roxel-gold-metallic` o `text-roxel-gold-300`/`400`.
3. **Sobre `roxel-whatsapp-cta` (`#17883E`)**: usar siempre `text-roxel-ink-inverse` (`#FFFFFF`).
4. **Prohibido usar dorados claros/metálicos (`roxel-gold-metallic`, `roxel-gold-300`, `roxel-gold-400`) como color de texto sobre superficies claras (`#FAFAFA` / `#FFFFFF`)**: no cumplen contraste. Si se necesita un detalle dorado sobre blanco (como el asterisco en `CartSummary`), debe ser puramente decorativo (`aria-hidden="true"`).

---

## 3. Tipografía, elevación y formas

### Familias tipográficas (`@theme`)

- `--font-display`: `"Cinzel", "Cormorant Garamond", Georgia, serif`
  - **Uso exclusivo**: palabra principal (`ROXEL`) de `BrandWordmark` en el `Hero`. No usar `font-display` en títulos de sección, tarjetas ni botones.
  - **Nota técnica**: `src/layouts/Layout.astro` actualmente no importa webfonts externas ni `@fontsource`, por lo que en tiempo de ejecución el navegador hace fallback a `Georgia, serif` hasta que se incorpore la carga de `Cinzel` / `Cormorant Garamond`.
- `--font-sans`: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - **Uso**: aplicado en `<body>` (`font-sans antialiased`) para toda la interfaz, encabezados de catálogo, tarjetas, formularios, modales y footer.

### Jerarquía y escala tipográfica

| Rol / Componente | Elemento | Clases exactas |
| :--- | :--- | :--- |
| Wordmark (`BrandWordmark`) | `h1` (span principal) | `font-display text-5xl sm:text-6xl md:text-7xl font-normal tracking-[0.14em] leading-none text-roxel-ink-inverse uppercase` |
| Subtítulo Wordmark | `span` (`ESSENCE`) | `text-xs sm:text-sm font-medium tracking-[0.32em] text-roxel-gold-metallic uppercase` |
| Bajada Hero (`HeroTagline`) | `p` | `text-center text-sm sm:text-base leading-relaxed text-roxel-ink-inverse-muted max-w-2xl mx-auto` |
| Título de sección (`SectionTitle`) | `h2` | `text-center text-2xl sm:text-3xl font-bold tracking-tight text-roxel-ink` |
| Título de categoría (`CategoryTitle`) | `h3` | `text-left text-lg sm:text-xl font-bold text-roxel-ink` |
| Título de producto (`ProductTitle`) | `h4` | `text-sm sm:text-base font-bold leading-snug text-roxel-ink` |
| Descripción (`ProductDescription`) | `p` | `text-xs sm:text-sm text-roxel-ink-muted leading-snug` |
| Precio en card (`ProductCard`) | `p` | `text-sm font-bold text-roxel-ink` |
| Título modal carrito (`CartPanel`) | `h2` | `text-lg sm:text-xl font-bold uppercase tracking-tight text-roxel-ink` |
| Total a pagar (`CartSummary`) | `span` | `text-xl sm:text-2xl font-extrabold uppercase tracking-tight tabular-nums text-roxel-ink` |
| Encabezado Footer (`Footer`) | `h2` | `text-lg sm:text-xl font-bold text-roxel-ink-inverse` |

### Convenciones de formato de texto y datos

- **Números tabulares**: usar `tabular-nums` en el contador de `QuantityStepper`, subtotales de `CartItemRow` y monto total de `CartSummary`.
- **Formato de moneda**: usar siempre `formatCurrency(amount, options)` de `src/components/types.ts` (locale `"es-AR"`, `maximumFractionDigits: 0`, símbolo `"$"`).
  - En tarjetas de producto, subtotales del carrito y líneas del pedido WhatsApp: `spaceAfterSymbol: true` → `$ 51.990`.
  - En `CartSummary` y total del pedido WhatsApp: `spaceAfterSymbol: false` → `$181.990`.
- **Formato de nombres de producto**:
  - En catálogo (`ProductTitle`) y toast: `{brand} • {name}` (separador middot `•`).
  - En carrito (`CartItemRow`) y mensaje de WhatsApp (`buildWhatsAppCheckoutUrl`): `{brand} - {name} - {volume}` (separador guion `-`).

### Sombras (`@theme`) y radios de borde

| Token / Clase | Definición / Uso |
| :--- | :--- |
| `--shadow-card` (`shadow-card`) | `0 2px 10px -2px rgb(0 0 0 / 0.08), 0 1px 3px 0 rgb(0 0 0 / 0.05)` — `ProductCard`, panel de filtros, estado vacío, `QuantityStepper`, `CloseButton`, `WhatsAppCheckoutButton`. |
| `--shadow-card-hover` (`shadow-card-hover`) | `0 8px 20px -4px rgb(0 0 0 / 0.12), 0 2px 6px -1px rgb(0 0 0 / 0.06)` — hover de `ProductCard`, popover de `Navbar`, `CartModal`, `SelectField` `::picker(select)`. |
| `--shadow-fab` (`shadow-fab`) | `0 4px 14px rgb(0 0 0 / 0.24)` — `CarouselArrowButton` y toast flotante. |
| `rounded-full` | `VolumeBadge`, pills de filtro, `FilterButton`, `CarouselArrowButton`, `CloseButton`, `CartButton`, `WhatsAppButton`, `Button` con `pill={true}` (y botones CTA de estado vacío / limpiar filtros). |
| `rounded-xl` | `ProductCard`, panel de filtros, estado vacío, popover de navegación, toast, `WhatsAppCheckoutButton`, miniatura en `CartItemRow`, track del carrusel (anillo de foco). |
| `rounded-lg` | `Button` por defecto, `TextField`, `SelectField`, `QuantityStepper`, `RemoveButton`, enlaces sociales en `Footer`, marco de imagen en `ProductCard`. |
| `rounded-2xl` | `CartModal` cuando se usa con `placement="center"`. |

---

## 4. Layout, espaciado, breakpoints y capas

### Contenedores y estructura vertical (`src/pages/index.astro`)

- **Contenedor estándar**: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8` en `Navbar`, `CatalogSection` y `Footer`.
- **Contenedores acotados**: `max-w-4xl` en el contenido del `Hero`, `max-w-xl` en `CartModal`, `max-w-sm` en `TextField` de nombre dentro de `CartPanel`, `max-w-2xl` en `HeroTagline`.
- **Flujo vertical de página**:
  1. `StoreHeader` (`Navbar` sticky de altura `h-16` / `4rem`, con `border-b border-roxel-dark-800`, logo `h-9 w-9` a la izquierda, `CartButton` + botón menú a la derecha, y `CartModal` acoplado).
  2. `Hero` (`min-h-[calc(100dvh-4rem)]`, `py-20 sm:py-28`, contenido centrado vertical y horizontalmente, `gap-5`).
  3. `<main id="contenido-principal" class="bg-roxel-surface">` con `CatalogSection` (`py-10 sm:py-14`, `#catalogo` con `scroll-mt-20`, barra/panel de filtros, 4 `CategorySection`: `Decants`, `Árabes`, `Testers`, `Extractos` con `py-6 sm:py-8`, separadas por `SectionDivider`, más toast y `WhatsAppButton`).
  4. `Footer` (`#contacto`, `py-10 sm:py-12`, alineación izquierda).

### Breakpoints y grilla responsiva de carrusel (`ProductCarousel`)

El carrusel usa Flexbox horizontal con `gap-4` (`1rem`) y `snap-start shrink-0`:

- **Base (`< 640px`)**: `w-[82%]` (muestra una tarjeta y asoma la siguiente para invitar al scroll horizontal).
- **`sm` (`≥ 640px`)**: 2 tarjetas visibles — `sm:w-[calc((100%-1rem)/2)]`.
- **`md` (`≥ 768px`)**: 3 tarjetas visibles — `md:w-[calc((100%-2rem)/3)]`.
- **`lg` (`≥ 1024px`)**: 4 tarjetas visibles — `lg:w-[calc((100%-3rem)/4)]`.

### Capas (`z-index`) y Top Layer nativo

- `z-10`: contenido del `Hero`, ícono de `WhatsAppButton` sobre su radar, controles `CarouselArrowButton` del carrusel.
- `z-30`: `Navbar` sticky (`sticky top-0`) y contenedor de notificaciones toast (`fixed bottom-24 right-4`).
- `z-40`: `WhatsAppButton` (sticky en `CatalogSection` con `bottom-6` o `fixed right-4 bottom-6` si `floating={true}`).
- `z-50`: enlace de salto `"Saltar al contenido principal"` cuando recibe foco (`focus:fixed focus:top-2 focus:left-2`).
- **Top Layer nativo del navegador** (siempre por encima de cualquier `z-index`): menú popover de `Navbar` (`popover="auto"`) y `CartModal` (`<dialog>.showModal()`).

---

## 5. Movimiento y micro-interacciones

Todo movimiento no esencial en CSS debe ir envuelto en `@media (prefers-reduced-motion: no-preference)`:

- **Botones y controles**: `transition-colors` en botones, links, pills y steppers; `transition-transform hover:scale-105` en `WhatsAppButton`.
- **Tarjetas**: `transition-shadow` de `shadow-card` a `shadow-card-hover`.
- **Carrusel (`ProductCarousel`)**: `scroll-behavior: smooth` en CSS cuando no hay preferencia de movimiento reducido, y `behavior: prefersReducedMotion ? "auto" : "smooth"` en JS (`scrollByStep`).
- **Menú popover (`Navbar`)**: transición de `150ms ease` en `opacity`, `translate` (`0 -0.25rem` → `0 0`), `display` y `overlay` usando `transition-behavior: allow-discrete` y `@starting-style`.
- **Pulso radar de WhatsApp (`.roxel-whatsapp-radar`)**: animación `roxel-whatsapp-radar 5s cubic-bezier(0, 0, 0.2, 1) infinite` (escala `1` → `1.75` con opacidad `0.65` → `0` en el primer `24%` del ciclo; permanece en reposo el resto del intervalo). Si `prefers-reduced-motion: reduce`, queda con `opacity: 0`.
- **Toast de agregado al carrito (`CatalogSection`)**: aparece en `bottom-24 right-4` con `bg-roxel-dark-900 text-roxel-ink-inverse border border-roxel-gold-400/50 shadow-fab` y se limpia automáticamente tras `2600 ms`.

---

## 6. Inventario de componentes y patrones (`src/components/`)

Reutilizar siempre los componentes exportados por `@/components` (`src/components/index.ts`) antes de crear markup equivalente:

### Primitivos, tipografía, formularios e iconos

- **`Button` (`Button.tsx`)**: variantes `"gold"` (por defecto), `"dark"`, `"outline"`, `"ghost"`; tamaños `"sm"` (`min-h-8`), `"md"` (`min-h-10`), `"lg"` (`min-h-11`), `"icon"` (`min-w-10 min-h-10`); soporta `pill`, `fullWidth`, `leftIcon`, `rightIcon`.
- **`Typography` (`Typography.tsx`)**: `BrandWordmark`, `HeroTagline`, `SectionTitle`, `CategoryTitle`, `ProductTitle`, `ProductDescription`, `SectionDivider`.
- **`Icons` (`Icons.tsx`)**: `BaseIcon` (`fill="currentColor"`, `focusable="false"`). Exporta `CartIcon`, `MenuIcon`, `CloseIcon`, `FilterIcon`, `ChevronLeftIcon`, `ChevronRightIcon`, `WhatsAppIcon`, `TikTokIcon`, `InstagramIcon`, `TrashIcon`, `MinusIcon`, `PlusIcon`, `CaretDownIcon`. Además define `WhatsAppIcon2` (ícono multicolor a todo color usado internamente por `WhatsAppButton.tsx`).
- **`TextField` (`TextField.tsx`)**: input accesible de `min-h-12`, soporte `label`, `helperText`, `error` (ícono circular `!` + mensaje en `roxel-danger-hover`), `showRequiredMark`.
- **`SelectField` (`SelectField.tsx`)**: `<select>` nativo con cap visual lateral derecho dorado (`w-11 bg-roxel-gold-400 border-l border-roxel-border-input` + `CaretDownIcon`) y mejora progresiva vía `@supports (appearance: base-select)` con `.roxel-select`.
- **`CloseButton` (`CloseButton.tsx`)**: botón circular claro (`w-9 h-9 sm:w-10 sm:h-10`) para cerrar el panel del carrito.

### Navegación, layout y contacto

- **`StoreHeader` (`StoreHeader.tsx`)**: isla React que conecta `Navbar`, `CartModal` y `useCart` (usa `isHydrated ? itemCount : 0` para evitar mismatches SSR).
- **`Navbar` (`Navbar.tsx`)**: barra sticky oscura con logo a la izquierda, `CartButton` y botón hamburguesa con `popover="auto"` anclado mediante CSS Anchor Positioning (`anchorName` / `anchor(var(--roxel-menu-anchor) bottom)`) con fallback posicional en `top: 4.25rem; right: 1rem`.
- **`Hero` (`Hero.tsx`)**: sección de apertura estática (Astro/HTML sin hidratación JS) con textura oscura, velo, `BrandWordmark` y `HeroTagline`.
- **`Footer` (`Footer.tsx`)**: pie oscuro estático con título, horario, enlace directo a WhatsApp y lista de redes sociales.
- **`WhatsAppButton` (`WhatsAppButton.tsx`)**: botón circular de WhatsApp con `WhatsAppIcon2` y pulso radar. En `CatalogSection` se monta con `floating={false}` dentro de un contenedor `sticky bottom-6 z-40` para que se detenga antes de tapar el `Footer`.

### Catálogo y productos

- **`CatalogSection` (`CatalogSection.tsx`)**: isla React principal del catálogo. Integra `SectionTitle`, `FilterButton`, panel colapsable de filtros (`Categoría`, `Género`, `Intensidad`), botón `Limpiar filtros`, estado vacío con CTA `Ver todos los productos`, listado de `CategorySection`, toast `role="status"` y `WhatsAppButton` sticky.
  - **Pills de filtro**: activas con `bg-roxel-gold-400 text-roxel-ink font-semibold ring-2 ring-roxel-ink/25 underline decoration-2 underline-offset-2` (doble señal visual además del color); inactivas con `bg-roxel-surface-subtle`.
- **`CategorySection` (`CategorySection.tsx`)**: agrupa `CategoryTitle` (con `scroll-mt-20`), `ProductCarousel` y `SectionDivider` condicional.
- **`ProductCarousel` (`ProductCarousel.tsx`)**: track horizontal `.roxel-carousel-track` con `CarouselArrowButton` prev/next superpuestos (`-inset-x-3 sm:-inset-x-4`), `ResizeObserver`, `scrollend` (con fallback debounced `150ms`) y rescate automático de foco si el botón activo queda deshabilitado al llegar al extremo.
- **`ProductCard` (`ProductCard.tsx`)**: tarjeta vertical con selector de `VolumeBadge` arriba, imagen `aspect-[4/3]` al centro, bloque inferior alineado abajo (`mt-auto`) con título, descripción y precio opcional, y `AddToCartButton` al pie.
- **`VolumeBadge` (`VolumeBadge.tsx`)**: pill interactiva (`<button aria-pressed>`) o estática (`<span>`). Variante `"dark"` por defecto; estado seleccionado o variante `"gold"` usa `bg-roxel-gold-400 text-roxel-ink font-semibold ring-2 ring-roxel-ink/25`.
- **`AddToCartButton` (`AddToCartButton.tsx`)**: extiende `Button variant="gold"` con `CartIcon` e inversión de alto contraste en interacción (`hover:bg-roxel-dark-900! hover:text-roxel-gold-400! active:bg-roxel-dark-800!`).
- **`FilterButton` (`FilterButton.tsx`)**: extiende `Button variant="dark" size="sm" pill` (usado con `text-roxel-gold-300!` en `CatalogSection`), `FilterIcon` y contador dorado (`bg-roxel-gold-400 text-roxel-ink`) cuando hay filtros activos.
- **`CarouselArrowButton` (`CarouselArrowButton.tsx`)**: botón circular oscuro (`w-9 h-9 sm:w-10 sm:h-10`) con `shadow-fab`.

### Carrito y checkout

- **`CartButton` (`CartButton.tsx`)**: botón circular con `CartIcon` dorado metálico y contador en esquina superior derecha (`bg-roxel-badge text-roxel-badge-ink`, cap en `"99+"`).
- **`CartModal` (`CartModal.tsx`)**: `<dialog>` nativo (`showModal()`). Por defecto `placement="right"` (drawer lateral `h-dvh w-full max-w-xl`); soporta `placement="center"`. Usa `closedby="any"` más fallback de eventos `pointerdown`/`pointerup` fuera del diálogo para cerrar al clic en backdrop.
- **`CartPanel` (`CartPanel.tsx`)**: cabecera con título `TU CARRITO DE COMPRAS` y `CloseButton`, lista divisoria de `CartItemRow` (o mensaje vacío), `CartSummary`, formulario con `noValidate` (nombre completo y método de entrega validados al `blur` tras edición y al `submit`, enfocando el primer campo inválido) y `WhatsAppCheckoutButton`.
- **`CartItemRow` (`CartItemRow.tsx`)**: fila con miniatura, título `Marca - Nombre - Volumen`, subtotal, `RemoveButton` y `QuantityStepper`.
- **`CartSummary` (`CartSummary.tsx`)**: fila `TOTAL A PAGAR:` + monto en `tabular-nums` y nota de envío al pie.
- **`QuantityStepper` (`QuantityStepper.tsx`)**: grupo con borde y botones `-` / `+` de `min-w-10 min-h-10` con separadores `border-roxel-border-subtle`.
- **`RemoveButton` (`RemoveButton.tsx`)**: botón icono de tacho en `text-roxel-danger` con hover `text-roxel-danger-hover bg-roxel-danger-surface`.
- **`WhatsAppCheckoutButton` (`WhatsAppCheckoutButton.tsx`)**: botón ancho completo `min-h-12 sm:min-h-14 rounded-xl bg-roxel-whatsapp-cta hover:bg-roxel-whatsapp-cta-hover text-roxel-ink-inverse font-bold text-base sm:text-lg`.

---

## 7. Plataforma web, accesibilidad y clases CSS obligatorias

### Clases CSS de `src/styles/global.css`

| Clase CSS | Cuándo aplicarla | Qué resuelve |
| :--- | :--- | :--- |
| `.roxel-control` | En **todo** control interactivo personalizado (botones, inputs, selects, popover). | Garantiza borde visible `1px solid ButtonText` en `@media (forced-colors: active)` (Windows High Contrast). |
| `.roxel-card` | En **toda** tarjeta o contenedor elevado tipo card (`ProductCard`). | Garantiza borde visible `1px solid CanvasText` en `@media (forced-colors: active)`. |
| `.roxel-field-input` | En todo `<input>` y `<select>` de formulario. | `font: inherit; font-size: max(1rem, 1em)` (evita el auto-zoom de iOS al enfocar) y estilo `:user-invalid` tras interacción. |
| `.roxel-carousel-track` | En tracks horizontales de carrusel. | `scroll-snap-type: x mandatory`, `overscroll-behavior-x: contain`, `touch-action: manipulation`, oculta scrollbars y habilita `scroll-behavior: smooth` con motion permitido. |
| `.roxel-nav-popover` | En el `<ul popover="auto">` del menú principal. | Posicionamiento fijo/anclado, límites `100dvh - 5rem` / `100dvw - 2rem` y animación discreta. |
| `.roxel-dialog` | En `<dialog>` modal (`CartModal`). | `overscroll-behavior: contain` en modal y `::backdrop` con `rgb(0 0 0 / 0.5)`. |
| `.roxel-select` | En `<select>` de `SelectField`. | Mejora progresiva `@supports (appearance: base-select)` con picker y opciones estilizadas en tokens Roxel. |
| `.roxel-whatsapp-radar` | En el `<span>` de onda de `WhatsAppButton`. | Animación de radar cada `5s` solo si `prefers-reduced-motion: no-preference`. |

- **Barras de desplazamiento estilizadas (`html`, `.roxel-dialog`, `.roxel-nav-popover`, `.roxel-select::picker(select)`)**:
  - Se aplican dentro de `@media (hover: hover) and (pointer: fine)` para preservar en móvil/táctil los scrollbars flotantes nativos de `0px` sin provocar saltos de layout.
  - Usan `scrollbar-width: thin` y `scrollbar-color: var(--scrollbar-thumb) transparent` con `--color-roxel-gold-600` (`#B87E1E`) como pulgar (contraste ≥ 3:1 WCAG 1.4.11 directo sobre superficies oscuras `#000000`/`#0C0C0C` y claras `#FAFAFA`/`#FFFFFF`), más `scrollbar-gutter: stable` en `html` y `.roxel-dialog` para evitar saltos horizontales al aparecer/desaparecer barras clásicas en escritorio.
  - En `@media (prefers-contrast: more)` restauran `scrollbar-width: auto` con tokens de máximo contraste (21:1: `roxel-dark-950` sobre `roxel-surface-card` en claro/documento, `roxel-ink-inverse` sobre `roxel-dark-950` en popover oscuro).
  - Para navegadores sin `scrollbar-color`, un bloque `@supports not (scrollbar-color: auto)` restablece `scrollbar-width: auto` y aplica el fallback `::-webkit-scrollbar` de `8px` (`12px` en `prefers-contrast: more`) con pista `transparent`. `.roxel-carousel-track` mantiene sus scrollbars ocultas.

### Requisitos de accesibilidad (a11y)

- **Áreas táctiles mínimas**:
  - Botones de icono, flechas del carrusel, `CartButton`, `CloseButton`, `RemoveButton` y botones `-`/`+` de `QuantityStepper`: mínimo `40×40px` (`min-w-10 min-h-10` o `w-9 h-9 sm:w-10 sm:h-10`).
  - Inputs y selects (`TextField`, `SelectField`) y checkout CTA: mínimo `48px` de alto (`min-h-12`).
  - Aplicar `touch-manipulation` en botones y tracks interactivos.
- **Anillos de foco (`focus-visible`)**:
  - Siempre `focus-visible:outline-2`.
  - Sobre fondos claros o dorados: `focus-visible:outline-roxel-ink focus-visible:outline-offset-2`.
  - Sobre fondos oscuros: `focus-visible:outline-roxel-gold-400 focus-visible:outline-offset-2`.
  - Dentro de contenedores con `overflow-hidden` (`QuantityStepper`, popover de menú): usar `focus-visible:outline-offset-[-2px]` para que el contorno no se recorte.
- **Semántica ARIA y regiones vivas**:
  - Enlace skip-to-content en `Layout.astro` apuntando a `#contenido-principal`.
  - Carrusel con `role="region" aria-roledescription="carousel"`, grupo interno `"Productos"` y slides con `role="group" aria-roledescription="slide" aria-label="{i} de {total}"`.
  - Regiones `role="status" aria-live="polite"` para cambios de slide (`sr-only` en `ProductCarousel`) y confirmación de producto agregado al carrito (`CatalogSection`).
  - Formularios con validación al perder foco solo tras edición (`editedRef`) y al enviar, con `aria-invalid`, `aria-describedby` y foco automático al primer campo erróneo.
  - Iconos en `Icons.tsx`: decorativos por defecto (`aria-hidden="true"`); si transmiten información independiente, pasar `title` o `aria-label` para activar `role="img"`.

---

## 8. Voz, tono y copy (`es-AR`)

- **Idioma y localización**: español rioplatense (`<html lang="es">`, formato numérico/moneda `es-AR`).
- **Tono**: transparente, cercano, elegante y directo. Sin tecnicismos ni exageraciones vacías.
- **Tratamiento gramatical**:
  - **Voseo** en mensajes conversacionales, sociales y feedback de validación: *«Seguinos en nuestras redes sociales»*, *«Ingresá tu nombre completo.»*, *«Seleccioná un método de entrega.»*.
  - **Etiquetas y CTAs directos y claros**: *«Nuestro catálogo»*, *«Filtrar»*, *«Limpiar filtros»*, *«Agregar al carrito»*, *«TU CARRITO DE COMPRAS»*, *«TOTAL A PAGAR:»*, *«Pagar por WhatsApp»*, *«Tu carrito está vacío.»*.
- **Consistencia al ampliar el sitio**: toda nueva categoría, modal o página debe mantener esta mezcla de cercanía argentina y precisión comercial.

---

## 9. Reglas de oro para agentes

### Hacer

- Reutilizar componentes de `@/components` (`Button`, `TextField`, `SelectField`, `ProductCard`, etc.) y tipos de `src/components/types.ts`.
- Usar exclusivamente tokens `roxel-*` definidos en `src/styles/global.css`.
- Incluir `.roxel-control` en cada control interactivo nuevo y `.roxel-card` en cada nueva tarjeta.
- Usar APIs nativas del navegador (`<dialog>`, `popover="auto"`, `scroll-snap`) antes de agregar librerías de UI.
- Envolver animaciones nuevas en `@media (prefers-reduced-motion: no-preference)`.
- Usar `tabular-nums` y `formatCurrency()` para todos los importes y contadores.

### No hacer

- **No** hardcodear valores hexadecimales ni usar clases de color genéricas de Tailwind (`bg-amber-400`, `text-gray-600`, `border-zinc-200`, etc.).
- **No** usar `font-display` fuera del wordmark principal `ROXEL`.
- **No** poner texto blanco sobre fondos dorados (`roxel-gold-*`) o sobre `roxel-badge`, ni texto dorado claro sobre superficies blancas/claras.
- **No** colocar `src/assets/logo.svg` (trazo blanco) sobre un fondo claro.
- **No** usar `hover:bg-roxel-*` con sintaxis antigua de `!important` al principio: en Tailwind v4 el modificador `!` va al **final** (ej. `hover:bg-roxel-dark-900!`).
- **No** eliminar el manejo de rescate de foco, `aria-pressed`, `aria-expanded`, `aria-live` o `:user-invalid` al refactorizar componentes.
