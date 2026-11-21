import {
  formatCurrency,
  type NavItem,
  type ProductVolume,
  type SelectOption,
  type SocialLink,
} from "@components/types";
import {
  getDatosTienda,
  isContentfulConfigured,
  type Contacto,
  type Perfume,
  type PresentacionPerfume,
} from "@lib/contentful";
import { DELIVERY_METHOD_OPTIONS } from "./cart";
import { CONTACT_CONFIG, createContactPhoneConfig } from "./contact";
import type {
  CatalogProduct,
  FragranceGender,
  ProductCategoryId,
  ProductCategorySection,
} from "./products";
import { SITE_CONFIG } from "./site";

export interface StoreContactData {
  schedule: string;
  whatsappPhone: string;
  phoneDisplay: string;
  whatsappUrl: string;
  socialLinks: SocialLink[];
}

export interface StoreData {
  heroDescription?: string;
  categories: ProductCategorySection[];
  navItems: NavItem[];
  deliveryOptions: SelectOption[];
  meetingPoints: string[];
  contact: StoreContactData;
}

interface NormalizedCategoryMeta {
  id: ProductCategoryId;
  title: string;
  description?: string;
  order: number;
}

const CANONICAL_CATEGORIES: Record<string, NormalizedCategoryMeta> = {
  decant: {
    id: "decants",
    title: "Decants",
    description:
      "Fraccionados originales para probar cada fragancia antes de elegir tu frasco completo.",
    order: 0,
  },
  decants: {
    id: "decants",
    title: "Decants",
    description:
      "Fraccionados originales para probar cada fragancia antes de elegir tu frasco completo.",
    order: 0,
  },
  arabe: {
    id: "arabes",
    title: "Árabes",
    description:
      "Fragancias orientales intensas y duraderas de casas como Lattafa, Afnan y Armaf.",
    order: 1,
  },
  arabes: {
    id: "arabes",
    title: "Árabes",
    description:
      "Fragancias orientales intensas y duraderas de casas como Lattafa, Afnan y Armaf.",
    order: 1,
  },
  tester: {
    id: "testers",
    title: "Testers",
    description:
      "Presentaciones de probador con la misma fragancia original a un precio más accesible.",
    order: 2,
  },
  testers: {
    id: "testers",
    title: "Testers",
    description:
      "Presentaciones de probador con la misma fragancia original a un precio más accesible.",
    order: 2,
  },
  extracto: {
    id: "extractos",
    title: "Extractos",
    description:
      "Alta concentración aromática con mayor fijación y estela prolongada.",
    order: 3,
  },
  extractos: {
    id: "extractos",
    title: "Extractos",
    description:
      "Alta concentración aromática con mayor fijación y estela prolongada.",
    order: 3,
  },
};

function stripAccents(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function slugify(value: string): string {
  return stripAccents(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeCategory(rawCategory: string): NormalizedCategoryMeta {
  const trimmed = rawCategory.trim();
  const key = stripAccents(trimmed).toLowerCase();
  const canonical = CANONICAL_CATEGORIES[key];
  if (canonical) return canonical;

  const fallbackId = slugify(trimmed) || "otros";
  return {
    id: fallbackId,
    title: trimmed || "Otros",
    order: 99,
  };
}

function normalizeGender(rawGender: string): FragranceGender {
  const key = stripAccents(rawGender).toLowerCase().trim();
  if (key.startsWith("masculin") || key.startsWith("hombre")) {
    return "masculino";
  }
  if (key.startsWith("femenin") || key.startsWith("mujer")) {
    return "femenino";
  }
  return "unisex";
}

function normalizeSocialUrl(
  platform: "tiktok" | "instagram",
  rawValue: string,
): string | null {
  const trimmed = rawValue.trim();
  if (!trimmed) return null;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  const handle = trimmed.replace(/^@+/, "").replace(/^\/+/, "");
  if (!handle) return null;

  if (platform === "tiktok") {
    return `https://www.tiktok.com/@${handle}`;
  }
  return `https://www.instagram.com/${handle}`;
}

function mapPresentationsToVolumes(
  presentations: PresentacionPerfume[],
): ProductVolume[] {
  return presentations.map((p) => {
    const hasDiscount =
      p.enOferta && p.porcentajeDescuento > 0 && p.precio > p.precioFinal;

    return {
      label: p.mililitros.trim() || "Único",
      value: p.id,
      variant: hasDiscount ? "gold" : "dark",
      unitPrice: p.precioFinal,
      ...(hasDiscount
        ? {
            originalPrice: p.precio,
            discountPercent: p.porcentajeDescuento,
          }
        : {}),
    };
  });
}

function mapPerfumesToCategories(perfumes: Perfume[]): ProductCategorySection[] {
  const categoryMap = new Map<
    ProductCategoryId,
    { meta: NormalizedCategoryMeta; products: CatalogProduct[] }
  >();

  for (const perfume of perfumes) {
    const presentationsByCategory = new Map<
      ProductCategoryId,
      { meta: NormalizedCategoryMeta; items: PresentacionPerfume[] }
    >();

    for (const pres of perfume.presentaciones) {
      const meta = normalizeCategory(pres.categoria);
      const existing = presentationsByCategory.get(meta.id);
      if (existing) {
        existing.items.push(pres);
      } else {
        presentationsByCategory.set(meta.id, { meta, items: [pres] });
      }
    }

    for (const { meta, items } of presentationsByCategory.values()) {
      const volumes = mapPresentationsToVolumes(items);
      const defaultVolume =
        volumes.find((vol) => vol.variant === "gold") ?? volumes[0];
      const unitPrice = defaultVolume?.unitPrice ?? 0;

      const product: CatalogProduct = {
        id: `${meta.id}-${perfume.id}`,
        category: meta.id,
        brand: perfume.marca,
        name: perfume.nombre,
        description: perfume.descripcion,
        gender: normalizeGender(perfume.genero),
        aromas: perfume.aromas,
        unitPrice,
        price: formatCurrency(unitPrice, { spaceAfterSymbol: true }),
        image: perfume.imagen,
        imageAlt: `Perfume ${perfume.marca} ${perfume.nombre}`.trim(),
        volumes,
      };

      const section = categoryMap.get(meta.id);
      if (section) {
        section.products.push(product);
      } else {
        categoryMap.set(meta.id, { meta, products: [product] });
      }
    }
  }

  return [...categoryMap.values()]
    .sort((a, b) => {
      if (a.meta.order !== b.meta.order) {
        return a.meta.order - b.meta.order;
      }
      return a.meta.title.localeCompare(b.meta.title, "es");
    })
    .map(({ meta, products }) => ({
      id: meta.id,
      title: meta.title,
      ...(meta.description ? { description: meta.description } : {}),
      products,
    }));
}

function buildNavItems(categories: ProductCategorySection[]): NavItem[] {
  return [
    ...categories.map((cat) => ({
      label: cat.title,
      href: `#${cat.id}`,
    })),
    { label: "Contacto", href: "#contacto" },
  ];
}

function buildDeliveryOptions(metodosEntrega: string[]): SelectOption[] {
  const cleaned = metodosEntrega.map((m) => m.trim()).filter(Boolean);
  if (cleaned.length === 0) {
    return DELIVERY_METHOD_OPTIONS;
  }

  return cleaned.map((label, index) => ({
    value: slugify(label) || `entrega-${index + 1}`,
    label,
  }));
}

function buildContactData(contacto: Contacto): StoreContactData {
  const rawWhatsapp = contacto.whatsapp.trim();
  const phoneConfig = rawWhatsapp
    ? createContactPhoneConfig(rawWhatsapp, rawWhatsapp)
    : CONTACT_CONFIG;

  const socialLinks: SocialLink[] = [];
  const tiktokUrl = normalizeSocialUrl("tiktok", contacto.tiktok);
  if (tiktokUrl) {
    socialLinks.push({ platform: "tiktok", href: tiktokUrl, label: "TikTok" });
  }
  const instagramUrl = normalizeSocialUrl("instagram", contacto.instagram);
  if (instagramUrl) {
    socialLinks.push({
      platform: "instagram",
      href: instagramUrl,
      label: "Instagram",
    });
  }

  return {
    schedule: contacto.diasYHorarios.trim() || SITE_CONFIG.schedule,
    whatsappPhone: phoneConfig.whatsappPhone,
    phoneDisplay: phoneConfig.phoneDisplay,
    whatsappUrl: phoneConfig.whatsappUrl,
    socialLinks:
      socialLinks.length > 0 ? socialLinks : [...SITE_CONFIG.socialLinks],
  };
}

function getFallbackStoreData(): StoreData {
  return {
    categories: [],
    navItems: [],
    deliveryOptions: DELIVERY_METHOD_OPTIONS,
    meetingPoints: [],
    contact: {
      schedule: SITE_CONFIG.schedule,
      whatsappPhone: SITE_CONFIG.whatsappPhone,
      phoneDisplay: SITE_CONFIG.phoneDisplay,
      whatsappUrl: SITE_CONFIG.whatsappUrl,
      socialLinks: [...SITE_CONFIG.socialLinks],
    },
  };
}

export async function loadStoreData(): Promise<StoreData> {
  if (!isContentfulConfigured()) {
    console.warn(
      "[contentful] Variables de entorno no configuradas; usando catálogo vacío de respaldo.",
    );
    return getFallbackStoreData();
  }

  try {
    const datos = await getDatosTienda();
    const categories = mapPerfumesToCategories(datos.perfumes);

    return {
      heroDescription: datos.descripcionInicio.trim() || undefined,
      categories,
      navItems: buildNavItems(categories),
      deliveryOptions: buildDeliveryOptions(datos.contacto.metodosEntrega),
      meetingPoints: datos.contacto.puntosEncuentro
        .map((p) => p.trim())
        .filter(Boolean),
      contact: buildContactData(datos.contacto),
    };
  } catch (error) {
    console.warn(
      "[contentful] No se pudieron obtener los datos desde Contentful; usando respaldo local.",
      error,
    );
    return getFallbackStoreData();
  }
}
