import { useMemo } from "react";
import type { ProductCategorySection } from "@data/products";
import type {
  AromaFilter,
  CategoryFilter,
  GenderFilter,
  IntensityFilter,
} from "@hooks";
import { FilterPillGroup, type FilterPillOption } from "./FilterPillGroup";

export interface CatalogFilterPanelProps {
  id: string;
  categories: ProductCategorySection[];
  selectedCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  selectedGender: GenderFilter;
  onGenderChange: (gender: GenderFilter) => void;
  selectedIntensity?: IntensityFilter;
  onIntensityChange?: (intensity: IntensityFilter) => void;
  availableAromas?: string[];
  selectedAroma?: AromaFilter;
  onAromaChange?: (aroma: AromaFilter) => void;
  showIntensityFilter?: boolean;
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
  selectedIntensity = "all",
  onIntensityChange,
  availableAromas = [],
  selectedAroma = "all",
  onAromaChange,
  showIntensityFilter = false,
  className = "",
}: CatalogFilterPanelProps) {
  const categoryOptions = useMemo<Array<FilterPillOption<CategoryFilter>>>(
    () => [
      { value: "all", label: "Todas" },
      ...categories.map((cat) => ({ value: cat.id, label: cat.title })),
    ],
    [categories],
  );

  const aromaOptions = useMemo<Array<FilterPillOption<AromaFilter>>>(
    () => [
      { value: "all", label: "Todos" },
      ...availableAromas.map((aroma) => ({ value: aroma, label: aroma })),
    ],
    [availableAromas],
  );

  return (
    <div
      id={id}
      className={`roxel-panel-in mb-8 rounded-xl border border-roxel-border-subtle bg-roxel-surface-card p-4 sm:p-5 shadow-card space-y-4 ${className}`}
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

      {availableAromas.length > 0 && onAromaChange ? (
        <FilterPillGroup
          label="Aroma"
          options={aromaOptions}
          value={selectedAroma}
          onChange={onAromaChange}
        />
      ) : null}

      {showIntensityFilter && onIntensityChange ? (
        <FilterPillGroup
          label="Intensidad"
          options={INTENSITY_OPTIONS}
          value={selectedIntensity}
          onChange={onIntensityChange}
        />
      ) : null}
    </div>
  );
}
