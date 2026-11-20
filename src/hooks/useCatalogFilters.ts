import { useMemo, useState } from "react";
import type {
  FragranceGender,
  FragranceIntensity,
  ProductCategoryId,
  ProductCategorySection,
} from "../data/products";

export type CategoryFilter = "all" | ProductCategoryId;
export type GenderFilter = "all" | FragranceGender;
export type IntensityFilter = "all" | FragranceIntensity;

export interface UseCatalogFiltersReturn {
  selectedCategory: CategoryFilter;
  setSelectedCategory: (category: CategoryFilter) => void;
  selectedGender: GenderFilter;
  setSelectedGender: (gender: GenderFilter) => void;
  selectedIntensity: IntensityFilter;
  setSelectedIntensity: (intensity: IntensityFilter) => void;
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

  const activeFiltersCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedGender !== "all" ? 1 : 0) +
    (selectedIntensity !== "all" ? 1 : 0);

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
          return matchesGender && matchesIntensity;
        }),
      }))
      .filter((category) => category.products.length > 0);
  }, [categories, selectedCategory, selectedGender, selectedIntensity]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedGender("all");
    setSelectedIntensity("all");
  };

  return {
    selectedCategory,
    setSelectedCategory,
    selectedGender,
    setSelectedGender,
    selectedIntensity,
    setSelectedIntensity,
    activeFiltersCount,
    filteredCategories,
    resetFilters,
  };
}
