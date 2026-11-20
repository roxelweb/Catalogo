import { useMemo } from "react";
import type { ProductCategorySection } from "../../data/products";
import type {
  CategoryFilter,
  GenderFilter,
  IntensityFilter,
} from "../../hooks";
import { FilterPillGroup, type FilterPillOption } from "./FilterPillGroup";

export interface CatalogFilterPanelProps {
  id: string;
  categories: ProductCategorySection[];
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  selectedGender: GenderFilter;
  onGenderChange: (gender: GenderFilter) => void;
  selectedIntensity: IntensityFilter;
  onIntensityChange: (intensity: IntensityFilter) => void;
  className?: string;
}

const GENDER_OPTIONS: Array<FilterPillOption<GenderFilter>> = [
  { value: "all", label: "Todos" },
  { value: "unisex", label: "Unisex" },
  { value: "masculino", label: "Masculino" },
  { value: "femenino", label: "Femenino" },
];

const INTENSITY_OPTIONS: Array<FilterPillOption<IntensityFilter>> = [
  { value: "all", label: "Todas" },
  { value: "intenso", label: "Intenso" },
  { value: "suave", label: "Suave" },
  { value: "moderado", label: "Moderado" },
];

export function CatalogFilterPanel({
  id,
  categories,
  selectedCategory,
  onCategoryChange,
  selectedGender,
  onGenderChange,
  selectedIntensity,
  onIntensityChange,
  className = "",
}: CatalogFilterPanelProps) {
  const categoryOptions = useMemo<Array<FilterPillOption<CategoryFilter>>>(
    () => [
      { value: "all", label: "Todas" },
      ...categories.map((cat) => ({ value: cat.id, label: cat.title })),
    ],
    [categories],
  );

  return (
    <div
      id={id}
      className={`mb-8 rounded-xl border border-roxel-border-subtle bg-roxel-surface-card p-4 sm:p-5 shadow-card space-y-4 ${className}`}
    >
      <FilterPillGroup
        label="Categoría"
        options={categoryOptions}
        value={selectedCategory}
        onChange={onCategoryChange}
      />

      <FilterPillGroup
        label="Género"
        options={GENDER_OPTIONS}
        value={selectedGender}
        onChange={onGenderChange}
      />

      <FilterPillGroup
        label="Intensidad"
        options={INTENSITY_OPTIONS}
        value={selectedIntensity}
        onChange={onIntensityChange}
      />
    </div>
  );
}
