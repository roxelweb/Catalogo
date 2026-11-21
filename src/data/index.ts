export {
  ALL_PRODUCTS,
  ARABES_PRODUCTS,
  CATALOG_CATEGORIES,
  DECANTS_PRODUCTS,
  EXTRACTOS_PRODUCTS,
  PERFUME_IMAGES,
  TESTERS_PRODUCTS,
  type CatalogProduct,
  type FragranceGender,
  type FragranceIntensity,
  type ProductCategoryId,
  type ProductCategorySection,
} from "./products";
export { DELIVERY_METHOD_OPTIONS, MOCK_CART_ITEMS } from "./cart";
export {
  CONTACT_CONFIG,
  createContactPhoneConfig,
  type ContactPhoneConfig,
} from "./contact";
export {
  buildStoreStructuredData,
  extractExternalImageOrigins,
  serializeJsonLd,
  type BuildStoreStructuredDataOptions,
} from "./seo";
export { getVerifiedSocialProfileUrls, SITE_CONFIG } from "./site";
