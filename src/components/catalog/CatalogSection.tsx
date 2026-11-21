import { useEffect, useId, useState } from "react";
import type { ProductCategorySection } from "../../data/products";
import { useCart, useCatalogFilters, type AddableProduct } from "../../hooks";
import { Button } from "../ui/Button";
import { CatalogEmptyState } from "./CatalogEmptyState";
import { CatalogFilterPanel } from "./CatalogFilterPanel";
import { CategorySection } from "./CategorySection";
import { FilterButton } from "./FilterButton";
import { ToastNotification } from "../ui/ToastNotification";
import { SectionTitle } from "../ui/Typography";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import type { Product } from "../types";

export interface CatalogSectionProps {
  categories: ProductCategorySection[];
  title?: string;
  showWhatsAppButton?: boolean;
  whatsappPhone?: string;
  className?: string;
}

export function CatalogSection({
  categories,
  title = "Nuestro catálogo",
  showWhatsAppButton = true,
  whatsappPhone,
  className = "",
}: CatalogSectionProps) {
  const { addProduct } = useCart();

  const rawId = useId();
  const filterPanelId = `roxel-filters-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const {
    selectedCategory,
    setSelectedCategory,
    selectedGender,
    setSelectedGender,
    selectedIntensity,
    setSelectedIntensity,
    activeFiltersCount,
    filteredCategories,
    resetFilters,
  } = useCatalogFilters(categories);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(""), 2600);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleAddToCart = (product: Product, selectedVolume?: string) => {
    addProduct(product as AddableProduct, selectedVolume);
    setToastMessage(
      `${product.brand} • ${product.name}${
        selectedVolume ? ` (${selectedVolume})` : ""
      } agregado al carrito`,
    );
  };

  return (
    <div
      className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 ${className}`}
    >
      <SectionTitle id="catalogo" className="mb-6 scroll-mt-20">
        {title}
      </SectionTitle>

      <search aria-label="Filtrar catálogo">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <FilterButton
            isOpen={filtersOpen}
            aria-controls={filterPanelId}
            activeCount={activeFiltersCount}
            onClick={() => setFiltersOpen((prev) => !prev)}
            className="text-roxel-gold-300!"
          />

          {activeFiltersCount > 0 ? (
            <Button
              variant="outline"
              size="sm"
              pill
              onClick={resetFilters}
            >
              Limpiar filtros
            </Button>
          ) : null}
        </div>

        {filtersOpen ? (
          <CatalogFilterPanel
            id={filterPanelId}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedGender={selectedGender}
            onGenderChange={setSelectedGender}
            selectedIntensity={selectedIntensity}
            onIntensityChange={setSelectedIntensity}
          />
        ) : null}
      </search>

      {filteredCategories.length > 0 ? (
        <div>
          {filteredCategories.map((category, index) => (
            <CategorySection
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              products={category.products}
              showDivider={index < filteredCategories.length - 1}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <CatalogEmptyState onReset={resetFilters} />
      )}

      <ToastNotification message={toastMessage} />

      {showWhatsAppButton ? (
        <div className="sticky bottom-6 z-40 mt-6 flex justify-end pointer-events-none">
          <WhatsAppButton
            phoneNumber={whatsappPhone}
            floating={false}
            className="pointer-events-auto"
          />
        </div>
      ) : null}
    </div>
  );
}
