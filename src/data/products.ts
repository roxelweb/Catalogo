import { formatCurrency, type Product } from "../components/types";

export const PERFUME_IMAGES = {
  // DummyJSON Fragrances CDN (studio product cutouts)
  noirCutout:
    "https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp",
  goldCutout:
    "https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp",
  floralCutout:
    "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp",
  freshCutout:
    "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp",

  // Unsplash perfume photography
  amberBlackBottle:
    "https://images.unsplash.com/photo-1584841247175-4d766cefa018?auto=format&fit=crop&w=600&q=80",
  classicGlassBottle:
    "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80",
  minimalWhiteBottle:
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=600&q=80",
  collectionBottles:
    "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=600&q=80",
  amberEssenceDropper:
    "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=600&q=80",

  // Pexels perfume photography
  elegantGlassBottle:
    "https://images.pexels.com/photos/36389336/pexels-photo-36389336.jpeg?auto=compress&cs=tinysrgb&w=600",
  minimalPerfumeBottle:
    "https://images.pexels.com/photos/15096784/pexels-photo-15096784.jpeg?auto=compress&cs=tinysrgb&w=600",
  fragranceLineup:
    "https://images.pexels.com/photos/18656841/pexels-photo-18656841.jpeg?auto=compress&cs=tinysrgb&w=600",
  luxuryPerfumeDisplay:
    "https://images.pexels.com/photos/7703038/pexels-photo-7703038.jpeg?auto=compress&cs=tinysrgb&w=600",
} as const;

export type ProductCategoryId = "decants" | "arabes" | "testers" | "extractos";
export type FragranceGender = "unisex" | "masculino" | "femenino";
export type FragranceIntensity = "intenso" | "suave" | "moderado";

export interface CatalogProduct extends Product {
  category: ProductCategoryId;
  unitPrice: number;
  gender: FragranceGender;
  intensity: FragranceIntensity;
}

export interface ProductCategorySection {
  id: ProductCategoryId;
  title: string;
  products: CatalogProduct[];
}

export const DECANTS_PRODUCTS: CatalogProduct[] = [
  {
    id: "decant-9pm-elixir",
    category: "decants",
    brand: "9pm",
    name: "Elixir",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 51990,
    price: formatCurrency(51990, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.amberBlackBottle,
    imageAlt: "Perfume 9pm Elixir en frasco ámbar oscuro",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "decant-rayhaan-lion",
    category: "decants",
    brand: "Rayhaan",
    name: "Lion",
    description: "Perfume intenso, masculino",
    gender: "masculino",
    intensity: "intenso",
    unitPrice: 35000,
    price: formatCurrency(35000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.noirCutout,
    imageAlt: "Perfume Rayhaan Lion en botella negra",
    volumes: [
      { label: "100 ml", variant: "gold" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "decant-rayhaan-aquatica",
    category: "decants",
    brand: "Rayhaan",
    name: "Aquatica",
    description: "Perfume suave, femenino",
    gender: "femenino",
    intensity: "suave",
    unitPrice: 60000,
    price: formatCurrency(60000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.freshCutout,
    imageAlt: "Perfume Rayhaan Aquatica en botella fresca",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "decant-lataffa-emaan",
    category: "decants",
    brand: "Lataffa",
    name: "Emaan",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 48500,
    price: formatCurrency(48500, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.classicGlassBottle,
    imageAlt: "Perfume Lataffa Emaan en frasco de vidrio clásico",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "decant-afnan-9am-dive",
    category: "decants",
    brand: "Afnan",
    name: "9am Dive",
    description: "Perfume suave, unisex",
    gender: "unisex",
    intensity: "suave",
    unitPrice: 44000,
    price: formatCurrency(44000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.elegantGlassBottle,
    imageAlt: "Perfume Afnan 9am Dive en botella transparente",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "decant-armaf-club-de-nuit",
    category: "decants",
    brand: "Armaf",
    name: "Club de Nuit Intense",
    description: "Perfume intenso, masculino",
    gender: "masculino",
    intensity: "intenso",
    unitPrice: 55000,
    price: formatCurrency(55000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.luxuryPerfumeDisplay,
    imageAlt: "Perfume Armaf Club de Nuit Intense",
    volumes: [
      { label: "105 ml", variant: "gold" },
      { label: "200 ml", variant: "dark" },
    ],
  },
];

export const ARABES_PRODUCTS: CatalogProduct[] = [
  {
    id: "arabe-lataffa-hayaati-black",
    category: "arabes",
    brand: "Lataffa",
    name: "Hayaati Black",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 46000,
    price: formatCurrency(46000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.noirCutout,
    imageAlt: "Perfume Lataffa Hayaati Black",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "arabe-lataffa-hayaati-gold",
    category: "arabes",
    brand: "Lataffa",
    name: "Hayaati Gold",
    description: "Perfume intenso, masculino",
    gender: "masculino",
    intensity: "intenso",
    unitPrice: 49500,
    price: formatCurrency(49500, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.goldCutout,
    imageAlt: "Perfume Lataffa Hayaati Gold",
    volumes: [{ label: "100 ml", variant: "gold" },  { label: "150 ml", variant: "dark" },],
  },
  {
    id: "arabe-lataffa-mayar",
    category: "arabes",
    brand: "Lataffa",
    name: "Mayar",
    description: "Perfume suave, femenino",
    gender: "femenino",
    intensity: "suave",
    unitPrice: 47000,
    price: formatCurrency(47000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.floralCutout,
    imageAlt: "Perfume Lataffa Mayar",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "arabe-9pm-elixir",
    category: "arabes",
    brand: "9pm",
    name: "Elixir",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 51990,
    price: formatCurrency(51990, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.amberEssenceDropper,
    imageAlt: "Perfume árabe 9pm Elixir",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "arabe-lataffa-khamrah",
    category: "arabes",
    brand: "Lataffa",
    name: "Khamrah",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 58000,
    price: formatCurrency(58000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.amberBlackBottle,
    imageAlt: "Perfume Lataffa Khamrah",
    volumes: [{ label: "100 ml", variant: "gold" }],
  },
  {
    id: "arabe-lataffa-yara",
    category: "arabes",
    brand: "Lataffa",
    name: "Yara",
    description: "Perfume suave, femenino",
    gender: "femenino",
    intensity: "suave",
    unitPrice: 45500,
    price: formatCurrency(45500, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.minimalWhiteBottle,
    imageAlt: "Perfume Lataffa Yara",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
];

export const TESTERS_PRODUCTS: CatalogProduct[] = [
  {
    id: "tester-9pm-elixir",
    category: "testers",
    brand: "9pm",
    name: "Elixir",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 42000,
    price: formatCurrency(42000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.amberBlackBottle,
    imageAlt: "Tester 9pm Elixir",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "tester-rayhaan-lion",
    category: "testers",
    brand: "Rayhaan",
    name: "Lion",
    description: "Perfume intenso, masculino",
    gender: "masculino",
    intensity: "intenso",
    unitPrice: 31000,
    price: formatCurrency(31000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.noirCutout,
    imageAlt: "Tester Rayhaan Lion",
    volumes: [{ label: "100 ml", variant: "gold" }],
  },
  {
    id: "tester-rayhaan-aquatica",
    category: "testers",
    brand: "Rayhaan",
    name: "Aquatica",
    description: "Perfume suave, femenino",
    gender: "femenino",
    intensity: "suave",
    unitPrice: 49000,
    price: formatCurrency(49000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.freshCutout,
    imageAlt: "Tester Rayhaan Aquatica",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "tester-lataffa-emaan",
    category: "testers",
    brand: "Lataffa",
    name: "Emaan",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 41500,
    price: formatCurrency(41500, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.minimalPerfumeBottle,
    imageAlt: "Tester Lataffa Emaan",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "tester-alhambra-tobacco-touch",
    category: "testers",
    brand: "Maison Alhambra",
    name: "Tobacco Touch",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 43000,
    price: formatCurrency(43000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.collectionBottles,
    imageAlt: "Tester Maison Alhambra Tobacco Touch",
    volumes: [
      { label: "80 ml", variant: "dark" },
      { label: "100 ml", variant: "dark" },
    ],
  },
];

export const EXTRACTOS_PRODUCTS: CatalogProduct[] = [
  {
    id: "extracto-lataffa-hayaati-black",
    category: "extractos",
    brand: "Lataffa",
    name: "Hayaati Black",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 64000,
    price: formatCurrency(64000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.noirCutout,
    imageAlt: "Extracto Lataffa Hayaati Black",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "extracto-lataffa-hayaati-gold",
    category: "extractos",
    brand: "Lataffa",
    name: "Hayaati Gold",
    description: "Perfume intenso, masculino",
    gender: "masculino",
    intensity: "intenso",
    unitPrice: 68000,
    price: formatCurrency(68000, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.goldCutout,
    imageAlt: "Extracto Lataffa Hayaati Gold",
    volumes: [{ label: "100 ml", variant: "gold" }],
  },
  {
    id: "extracto-lataffa-mayar",
    category: "extractos",
    brand: "Lataffa",
    name: "Mayar",
    description: "Perfume suave, femenino",
    gender: "femenino",
    intensity: "suave",
    unitPrice: 62500,
    price: formatCurrency(62500, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.floralCutout,
    imageAlt: "Extracto Lataffa Mayar",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "extracto-9pm-elixir",
    category: "extractos",
    brand: "9pm",
    name: "Elixir",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 69990,
    price: formatCurrency(69990, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.fragranceLineup,
    imageAlt: "Extracto 9pm Elixir",
    volumes: [
      { label: "100 ml", variant: "dark" },
      { label: "150 ml", variant: "dark" },
    ],
  },
  {
    id: "extracto-haramain-amber-oud-gold",
    category: "extractos",
    brand: "Al Haramain",
    name: "Amber Oud Gold",
    description: "Perfume intenso, unisex",
    gender: "unisex",
    intensity: "intenso",
    unitPrice: 79500,
    price: formatCurrency(79500, { spaceAfterSymbol: true }),
    image: PERFUME_IMAGES.luxuryPerfumeDisplay,
    imageAlt: "Extracto Al Haramain Amber Oud Gold",
    volumes: [
      { label: "60 ml", variant: "gold" },
      { label: "120 ml", variant: "dark" },
    ],
  },
];

export const CATALOG_CATEGORIES: ProductCategorySection[] = [
  { id: "decants", title: "Decants", products: DECANTS_PRODUCTS },
  { id: "arabes", title: "Árabes", products: ARABES_PRODUCTS },
  { id: "testers", title: "Testers", products: TESTERS_PRODUCTS },
  { id: "extractos", title: "Extractos", products: EXTRACTOS_PRODUCTS },
];

export const ALL_PRODUCTS: CatalogProduct[] = CATALOG_CATEGORIES.flatMap(
  (section) => section.products,
);
