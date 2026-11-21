import { useId } from "react";
import { ProductCarousel } from "./ProductCarousel";
import { CategoryTitle, SectionDivider } from "@components/ui/Typography";
import type { Product } from "@components/types";

export interface CategorySectionProps {
  title: string;
  description?: string;
  products: Product[];
  id?: string;
  showDivider?: boolean;
  onAddToCart?: (product: Product, selectedVolume?: string) => void;
  onVolumeChange?: (volume: string, product: Product) => void;
  className?: string;
}

export function CategorySection({
  title,
  products,
  id,
  showDivider = true,
  onAddToCart,
  onVolumeChange,
  className = "",
}: CategorySectionProps) {
  const generatedId = useId();
  const headingId = id ?? `roxel-category-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <section aria-labelledby={headingId} className={`py-6 sm:py-8 ${className}`}>
      <CategoryTitle id={headingId} className="mb-4 scroll-mt-28">
        {title}
      </CategoryTitle>

      <ProductCarousel
        products={products}
        ariaLabelledBy={headingId}
        onAddToCart={onAddToCart}
        onVolumeChange={onVolumeChange}
      />

      {showDivider ? <SectionDivider className="mt-10 mb-0" /> : null}
    </section>
  );
}
