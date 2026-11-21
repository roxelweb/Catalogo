import { resolveImageSrc, type SocialLink } from "@components/types";
import type {
  CatalogProduct,
  ProductCategorySection,
} from "./products";
import { getVerifiedSocialProfileUrls, SITE_CONFIG } from "./site";

export interface BuildStoreStructuredDataOptions {
  site?: URL;
  pageTitle: string;
  pageDescription: string;
  categories: ProductCategorySection[];
  phoneDisplay?: string;
  whatsappUrl?: string;
  socialLinks?: readonly SocialLink[];
}

function formatProductSchemaName(product: CatalogProduct): string {
  const baseName = `${product.brand} ${product.name}`;
  switch (product.category) {
    case "decants":
      return `Decant ${baseName}`;
    case "testers":
      return `Tester ${baseName}`;
    case "extractos":
      return `Extracto ${baseName}`;
    case "arabes":
    default:
      return baseName;
  }
}

function resolveAbsoluteUrl(
  pathOrUrl: string,
  origin?: string,
): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  if (!origin) {
    return pathOrUrl;
  }
  return new URL(pathOrUrl, origin).href;
}

export function buildStoreStructuredData({
  site,
  pageTitle,
  pageDescription,
  categories,
  phoneDisplay = SITE_CONFIG.phoneDisplay,
  whatsappUrl = SITE_CONFIG.whatsappUrl,
  socialLinks = SITE_CONFIG.socialLinks,
}: BuildStoreStructuredDataOptions): Record<string, unknown> {
  const origin = site?.origin;
  const orgId = origin ? `${origin}/#organization` : "#organization";
  const websiteId = origin ? `${origin}/#website` : "#website";
  const pageId = origin ? `${origin}/#catalog-page` : "#catalog-page";
  const sameAs = getVerifiedSocialProfileUrls(socialLinks);

  const organizationNode: Record<string, unknown> = {
    "@type": ["OnlineStore", "Organization"],
    "@id": orgId,
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.defaultDescription,
    telephone: phoneDisplay,
    areaServed: {
      "@type": "Country",
      name: SITE_CONFIG.countryName,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      areaServed: SITE_CONFIG.countryCode,
      availableLanguage: ["es-AR", "es"],
      url: whatsappUrl,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [...SITE_CONFIG.openingHours.dayOfWeek],
        opens: SITE_CONFIG.openingHours.opens,
        closes: SITE_CONFIG.openingHours.closes,
      },
    ],
    ...(origin
      ? {
          url: `${origin}/`,
          logo: {
            "@type": "ImageObject",
            url: `${origin}/icon-512.png`,
            width: 512,
            height: 512,
          },
          image: `${origin}${SITE_CONFIG.ogImage}`,
        }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  const websiteNode: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    name: SITE_CONFIG.name,
    inLanguage: SITE_CONFIG.lang,
    publisher: { "@id": orgId },
    ...(origin ? { url: `${origin}/` } : {}),
  };

  let position = 0;
  const itemListElement = categories.flatMap((section) =>
    section.products.map((product) => {
      position += 1;
      const productUrl = origin ? `${origin}/#${product.id}` : undefined;
      const volumesText = product.volumes.map((vol) => vol.label).join(", ");
      const fullDescription = volumesText
        ? `${product.description}. Presentaciones: ${volumesText}.`
        : product.description;

      return {
        "@type": "ListItem",
        position,
        item: {
          "@type": "Product",
          name: formatProductSchemaName(product),
          sku: product.id,
          brand: {
            "@type": "Brand",
            name: product.brand,
          },
          category: section.title,
          description: fullDescription,
          image: resolveAbsoluteUrl(resolveImageSrc(product.image), origin),
          ...(productUrl ? { url: productUrl } : {}),
          offers: {
            "@type": "Offer",
            priceCurrency: SITE_CONFIG.currency,
            price: product.unitPrice,
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            seller: { "@id": orgId },
            ...(productUrl ? { url: productUrl } : {}),
          },
        },
      };
    }),
  );

  const collectionPageNode: Record<string, unknown> = {
    "@type": "CollectionPage",
    "@id": pageId,
    name: pageTitle,
    description: pageDescription,
    inLanguage: SITE_CONFIG.lang,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
    ...(origin ? { url: `${origin}/` } : {}),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: itemListElement.length,
      itemListElement,
    },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organizationNode, websiteNode, collectionPageNode],
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function extractExternalImageOrigins(
  categories: ProductCategorySection[],
): string[] {
  const origins = new Set<string>();

  for (const section of categories) {
    for (const product of section.products) {
      const src = resolveImageSrc(product.image);
      if (!/^https?:\/\//i.test(src)) continue;
      try {
        origins.add(new URL(src).origin);
      } catch {
        // Ignore invalid URLs
      }
    }
  }

  return [...origins];
}
