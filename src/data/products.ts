import type { Product } from "@components/types";

export type CanonicalProductCategoryId =
  | "decants"
  | "arabes"
  | "testers"
  | "extractos";
export type ProductCategoryId = CanonicalProductCategoryId | (string & {});
export type FragranceGender = "unisex" | "masculino" | "femenino";
export type FragranceIntensity = "intenso" | "suave" | "moderado";

export interface CatalogProduct extends Product {
  category: ProductCategoryId;
  unitPrice: number;
  gender: FragranceGender;
  intensity?: FragranceIntensity;
  aromas?: string[];
}

export interface ProductCategorySection {
  id: ProductCategoryId;
  title: string;
  description?: string;
  products: CatalogProduct[];
}
