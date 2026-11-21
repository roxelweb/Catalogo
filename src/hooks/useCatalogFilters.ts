import { useMemo, useState } from "react";
import type {
  FragranceGender,
  FragranceIntensity,
  ProductCategoryId,
  ProductCategorySection,
} from "@data/products";

export type CategoryFilter = "all" | ProductCategoryId;
export type GenderFilter = "all" | FragranceGender;
export type IntensityFilter = "all" | FragranceIntensity;
export type AromaFilter = "all" | string;

export interface UseCatalogFiltersReturn {
  selectedCategory: CategoryFilter;
  setSelectedCategory: (category: CategoryFilter) => void;
  selectedGender: GenderFilter;
  setSelectedGender: (gender: GenderFilter) => void;
  selectedIntensity: IntensityFilter;
  setSelectedIntensity: (intensity: IntensityFilter) => void;
  selectedAroma: AromaFilter;
  setSelectedAroma: (aroma: AromaFilter) => void;
  availableAromas: string[];
  hasIntensities: boolean;
  activeFiltersCount: number;
  filteredCategories: ProductCategorySection[];
  resetFilters: () => void;
}

export function useCatalogFilters(
  categories: ProductCategorySection[],
): UseCatalogFiltersReturn {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [selectedGender, setSelectedGender] = useState<GenderFilter>("all");
  const [selectedIntensity, setSelectedIntensity] =
    useState<IntensityFilter>("all");
  const [selectedAroma, setSelectedAroma] = useState<AromaFilter>("all");

  const { availableAromas, hasIntensities } = useMemo(() => {
    const aromaSet = new Set<string>();
    let foundIntensity = false;

    for (const category of categories) {
      for (const product of category.products) {
        if (product.intensity) {
          foundIntensity = true;
        }
        if (product.aromas) {
          for (const aroma of product.aromas) {
            const trimmed = aroma.trim();
            if (trimmed) aromaSet.add(trimmed);
          }
        }
      }
    }

    return {
      availableAromas: [...aromaSet].sort((a, b) => a.localeCompare(b, "es")),
      hasIntensities: foundIntensity,
    };
  }, [categories]);

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedGender !== "all" ? 1 : 0) +
    (selectedIntensity !== "all" ? 1 : 0) +
    (selectedAroma !== "all" ? 1 : 0);

  const filteredCategories = useMemo(() => {
    return categories
      .filter(
        (category) =>
          selectedCategory === "all" || category.id === selectedCategory,
      )
      .map((category) => ({
        ...category,
        products: category.products.filter((product) => {
          const matchesGender =
            selectedGender === "all" || product.gender === selectedGender;
          const matchesIntensity =
            selectedIntensity === "all" ||
            product.intensity === selectedIntensity;
          const matchesAroma =
            selectedAroma === "all" ||
            Boolean(product.aromas?.includes(selectedAroma));
          return matchesGender && matchesIntensity && matchesAroma;
        }),
      }))
      .filter((category) => category.products.length > 0);
  }, [
    categories,
    selectedCategory,
    selectedGender,
    selectedIntensity,
    selectedAroma,
  ]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedGender("all");
    setSelectedIntensity("all");
    setSelectedAroma("all");
  };

  return {
    selectedCategory,
    setSelectedCategory,
    selectedGender,
    setSelectedGender,
    selectedIntensity,
    setSelectedIntensity,
    selectedAroma,
    setSelectedAroma,
    availableAromas,
    hasIntensities,
    activeFiltersCount,
    filteredCategories,
    resetFilters,
  };
}
