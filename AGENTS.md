# AGENTS.md — Roxel Essence

Tienda y catálogo web de **Roxel Essence** (perfumes decants, árabes, testers y extractos) con carrito persistente en navegador y cierre de pedido por WhatsApp (`es-AR`).
Este archivo resume las convenciones técnicas y operativas del repositorio para cualquier agente que trabaje en él.

## Sistema de diseño (`DESIGN.md`)

- **Lectura obligatoria**: leé [DESIGN.md](./DESIGN.md) antes de crear o modificar cualquier componente visual, estilo, token de diseño, icono o texto de interfaz.
- Usá exclusivamente los tokens `roxel-*` definidos mediante `@theme` en `src/styles/global.css` (sin colores hexadecimales hardcodeados ni escalas genéricas de Tailwind).
- Reutilizá los componentes exportados desde `@/components` (`src/components/index.ts`) y aplicá `.roxel-control` en controles interactivos y `.roxel-card` en tarjetas para mantener soporte de alto contraste (`forced-colors: active`).

## Stack técnico y entorno

- **Framework**: Astro `^7.4.13` con integración React (`@astrojs/react` `^7.1.9`, React `^19.3.1`).
- **Estilos**: Tailwind CSS `^4.3.5` mediante el plugin `@tailwindcss/vite` y configuración directa en `src/styles/global.css` con `@theme` (no existe `tailwind.config.*`).
- **Lenguaje**: TypeScript en modo estricto (`astro/tsconfigs/strict`, `jsxImportSource: "react"`).
- **Gestor de paquetes y runtime**: **`pnpm`** (`pnpm-lock.yaml`) y Node.js `>=22.23.4`. Usá siempre `pnpm` en lugar de `npm` o `yarn`.

## Estructura del proyecto y alias de importación

- `src/assets/` — Activos procesados por Astro/Vite (`logo.svg`, `background_texture.webp`).
- `src/components/` — Biblioteca de componentes React y tipos compartidos (`index.ts`, `types.ts`).
- `src/data/` — Catálogo de productos (`products.ts`), opciones de entrega y datos de ejemplo del carrito (`cart.ts`).
- `src/hooks/` — Hooks reutilizables de estado e hidratación (`useCart.ts`, `useLocalStorage.ts`, `useHydrated.ts`).
- `src/layouts/` — Layouts Astro (`Layout.astro` con skip link y metadatos base).
- `src/pages/` — Páginas Astro (`index.astro`).
- `src/styles/` — Hoja global `global.css` con tokens `@theme` y utilidades `.roxel-*`.
- `public/` — Archivos estáticos servidos tal cual (`favicon.ico`, `favicon.svg`).

**Alias configurados en `tsconfig.json`:** `@/*`, `@assets/*`, `@components/*`, `@data/*`, `@hooks/*`, `@layouts/*` y `@styles/*`.
Cuando importes desde páginas o entre módulos externos, usá los barrel exports (`@/components`, `@/data`, `@/hooks`); dentro de cada carpeta (`src/components/`, `src/hooks/`, `src/data/`), respetá los imports relativos para evitar dependencias circulares.

## Arquitectura de islas y estado compartido

- **Astro Islands**: mantené estáticos (sin directiva `client:*`) los componentes puramente presentacionales como `Hero` y `Footer`. Hidratá únicamente las islas que requieren interactividad (`StoreHeader` y `CatalogSection` utilizan `client:load` en `src/pages/index.astro`).
- **Carrito sincronizado entre islas**: `useCart` (`src/hooks/useCart.ts`) se apoya en `useLocalStorage` (`src/hooks/useLocalStorage.ts`), implementado con `useSyncExternalStore` sobre la clave `roxel:cart:v1`. Sincroniza múltiples islas en la misma ventana vía `CustomEvent("local-storage:<key>")` y entre pestañas vía el evento `storage`, valida el esquema con `sanitizeCartItems` y mantiene respaldo en memoria si `localStorage` falla (cuota llena o modo privado estricto).
- **Prevención de hydration mismatch**: cualquier valor leído de `localStorage` que se muestre en el render inicial SSR/cliente (como `cartCount` en `StoreHeader`) debe protegerse con `useHydrated()` (ej. `isHydrated ? itemCount : 0`).

## Convenciones de código, componentes y datos

- **React 19**: pasá `ref` como prop normal (`ref?: Ref<...>`). No uses `React.forwardRef`.
- **IDs únicos accesibles**: generá IDs con `useId()` sanitizado (`rawId.replace(/[^a-zA-Z0-9_-]/g, "")`) para atributos `id`, `aria-controls`, `popoverTarget` y CSS `anchorName`.
- **Imágenes**: tipá las fuentes con `ImageSource = string | { src: string }` y resolvé siempre su URL con `resolveImageSrc()` (`src/components/types.ts`) para soportar tanto imports estáticos de Astro como URLs remotas.
- **Moneda**: formateá importes exclusivamente con `formatCurrency()` (`src/components/types.ts`, locale `es-AR`).
- **Datos del dominio**: el catálogo vive en `src/data/products.ts` (`CATALOG_CATEGORIES`, `CatalogProduct`, `ProductCategoryId`, `FragranceGender`, `FragranceIntensity`); los métodos de entrega y mocks de carrito viven en `src/data/cart.ts`.
- **Checkout y contacto por WhatsApp**: `buildWhatsAppCheckoutUrl()` en `src/hooks/useCart.ts` arma el enlace `wa.me` con el resumen del pedido.
  > **Advertencia de mantenimiento:** el número telefónico por defecto (`5411268577` / `+54 1126-8577`) está declarado en 4 archivos (`src/components/StoreHeader.tsx`, `src/components/Footer.tsx`, `src/components/WhatsAppButton.tsx` y `src/hooks/useCart.ts`). Si cambia el número comercial, actualizalo en todos ellos o centralizalo en `src/data/`.
- **Sin dependencias UI innecesarias**: priorizá las APIs nativas del navegador ya adoptadas en el proyecto (`<dialog>`, `popover="auto"`, CSS Anchor Positioning, `appearance: base-select`, `scroll-snap`).
- **Sintaxis de Tailwind CSS v4**: el modificador `!important` se escribe al **final** de la clase (ej. `text-roxel-gold-300!`, `hover:bg-roxel-dark-900!`), no al principio.

## Comandos y verificación

- `pnpm build` — Compila el sitio de producción en `./dist/` y valida el bundling de Astro/Vite.
- `pnpm astro check` — Ejecuta el chequeo de tipos en archivos `.astro` y TypeScript (verificá previamente si `@astrojs/check` está instalado; como alternativa para `.ts`/`.tsx`, ejecutá `pnpm exec tsc --noEmit`).
- `pnpm preview` — Sirve localmente la build generada en `./dist/`.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
