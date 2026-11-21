# Roxel Essence

Tienda y catálogo web para **Roxel Essence** (perfumes decants, árabes, testers y extractos), diseñada para explorar fragancias por categoría, armar un pedido en el carrito y enviarlo directamente por WhatsApp.

## Características principales

- **Catálogo por categorías**: Secciones para *Decants*, *Árabes*, *Testers* y *Extractos* con carruseles horizontales responsivos y navegación por flechas y teclado.
- **Filtros dinámicos**: Filtrado combinado por categoría, género e intensidad, con contador de filtros activos y reinicio rápido.
- **Selección de volumen**: Soporte para múltiples presentaciones por producto (por ejemplo `100 ml`, `150 ml`, `200 ml`) directamente desde cada tarjeta.
- **Carrito persistente y pedido por WhatsApp**:
  - Guardado automático en `localStorage` (`roxel:cart:v1`), sincronizado entre componentes y pestañas.
  - Control de cantidades, eliminación de ítems, selección de método de entrega y resumen con totales en pesos argentinos (`es-AR`).
  - Generación automática del mensaje de pedido hacia WhatsApp (`wa.me`) junto con botón de contacto directo.
- **SEO y rendimiento**: Sitio estático con Astro Islands (solo se hidratan los bloques interactivos), datos estructurados JSON-LD, Open Graph, `sitemap.xml`, `robots.txt`, `site.webmanifest` y página `404`.
- **Accesibilidad**: Navegación por teclado, etiquetas ARIA, respeto a `prefers-reduced-motion` y soporte para modo de alto contraste (`forced-colors: active`).

## Stack tecnológico

- **Framework**: Astro (`^7.4.13`) + React (`^19.3.1`)
- **Estilos**: Tailwind CSS v4 (`^4.3.5`) con tokens propios `roxel-*` en [src/styles/global.css](src/styles/global.css)
- **Lenguaje**: TypeScript en modo estricto
- **Gestor de paquetes y runtime**: `pnpm` y Node.js `>=22.23.4`

## Estructura del proyecto

```text
/
├── public/                 # Favicons, íconos PWA, og-image.jpg y site.webmanifest
├── src/
│   ├── assets/             # Logotipo y texturas responsive (desktop/mobile)
│   ├── components/
│   │   ├── cart/           # Carrito, ítems, stepper de cantidad y checkout por WhatsApp
│   │   ├── catalog/        # Catálogo, categorías, carrusel, filtros y tarjetas de producto
│   │   ├── layout/         # Navbar, menú móvil, Hero y Footer
│   │   ├── ui/             # Botones, campos de formulario, tipografía, iconos y notificaciones
│   │   ├── index.ts        # Exportaciones públicas (@/components)
│   │   └── types.ts        # Tipos e utilidades compartidas
│   ├── data/
│   │   ├── cart.ts         # Métodos de entrega y datos de ejemplo del carrito
│   │   ├── contact.ts      # Número comercial de WhatsApp (preparado para conectar al backend)
│   │   ├── products.ts     # Catálogo de productos y categorías
│   │   ├── seo.ts          # Generación de JSON-LD y orígenes de imágenes
│   │   └── site.ts         # Metadatos generales, horarios y redes sociales
│   ├── hooks/              # Estado del carrito, filtros, scroll del carrusel e hidratación
│   ├── layouts/            # Layout base (Layout.astro)
│   ├── pages/              # index.astro, 404.astro, sitemap.xml.ts y robots.txt.ts
│   └── styles/             # Tokens @theme y utilidades CSS globales
├── .env.example            # Variables de entorno para despliegue
├── DESIGN.md               # Guía del sistema de diseño
└── tsconfig.json           # Alias de rutas (@/*, @assets/*, @components/*, etc.)
```

## Configuración

### 1. Variables de entorno

Copiá `.env.example` a `.env` antes de compilar para producción:

```env
SITE_URL=https://tu-dominio.com.ar
PUBLIC_GOOGLE_SITE_VERIFICATION=
```

- `SITE_URL`: URL pública del sitio (sin barra final). Habilita `canonical`, `og:url`, `sitemap.xml` y la referencia al sitemap en `robots.txt`.
- `PUBLIC_GOOGLE_SITE_VERIFICATION`: Token opcional para Google Search Console.

### 2. Datos editables del comercio

- **Teléfono de WhatsApp**: [src/data/contact.ts](src/data/contact.ts) (`DEFAULT_PHONE_DIGITS` y `createContactPhoneConfig`).
- **Nombre, descripción, horarios y redes sociales**: [src/data/site.ts](src/data/site.ts).
- **Productos, precios y volúmenes**: [src/data/products.ts](src/data/products.ts).
- **Métodos de entrega**: [src/data/cart.ts](src/data/cart.ts).

## Comandos

| Comando | Descripción |
| :--- | :--- |
| `pnpm install` | Instala las dependencias del proyecto |
| `pnpm dev` | Inicia el servidor de desarrollo local (`localhost:4321`) |
| `pnpm build` | Compila el sitio estático de producción en `./dist/` |
| `pnpm preview` | Previsualiza localmente la build generada en `./dist/` |
