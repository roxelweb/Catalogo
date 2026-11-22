import { useEffect, useId, useState } from "react";
import type { ProductCategorySection } from "@data/products";
import { useCart, useCatalogFilters, type AddableProduct } from "@hooks";
import { Button } from "@components/ui/Button";
import { CatalogEmptyState } from "./CatalogEmptyState";
import { CatalogFilterPanel } from "./CatalogFilterPanel";
import { CategorySection } from "./CategorySection";
import { FilterButton } from "./FilterButton";
import { ToastNotification } from "@components/ui/ToastNotification";
import { SectionTitle } from "@components/ui/Typography";
import { WhatsAppButton } from "@components/ui/WhatsAppButton";
import type { Product } from "@components/types";

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
    selectedAroma,
    setSelectedAroma,
    availableAromas,
    hasIntensities,
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
    const volumeLabel = selectedVolume
      ? (product.volumes.find(
          (vol) => vol.value === selectedVolume || vol.label === selectedVolume,
        )?.label ?? selectedVolume)
      : product.volumes[0]?.label;
    setToastMessage(
      `${product.brand} • ${product.name}${
        volumeLabel ? ` (${volumeLabel})` : ""
      } agregado al carrito`,
    );
  };

  return (
    <div className={`py-10 sm:py-14 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle id="catalogo" className="mb-6 scroll-mt-28">
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

        <div
          aria-hidden={!filtersOpen}
          inert={!filtersOpen}
          className={`grid transition-[grid-template-rows,opacity,margin] duration-250 ease-out motion-reduce:transition-none ${
            filtersOpen
              ? "grid-rows-[1fr] opacity-100 mb-8"
              : "grid-rows-[0fr] opacity-0 mb-0 pointer-events-none"
          }`}
        >
          <div className="overflow-hidden">
            <CatalogFilterPanel
              id={filterPanelId}
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              selectedGender={selectedGender}
              onGenderChange={setSelectedGender}
              selectedIntensity={selectedIntensity}
              onIntensityChange={setSelectedIntensity}
              availableAromas={availableAromas}
              selectedAroma={selectedAroma}
              onAromaChange={setSelectedAroma}
              showIntensityFilter={hasIntensities && availableAromas.length === 0}
              className="mb-0!"
            />
          </div>
        </div>
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
      </div>

      {showWhatsAppButton ? (
        <div className="sticky bottom-6 z-40 mt-6 px-4 sm:px-6 lg:px-8 flex justify-end pointer-events-none">
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
