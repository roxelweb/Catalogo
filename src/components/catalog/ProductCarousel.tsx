import type { ReactNode } from "react";
import { useCarouselScroll } from "../../hooks";
import { CarouselArrowButton } from "./CarouselArrowButton";
import { ProductCard } from "./ProductCard";
import type { Product } from "../types";

export interface ProductCarouselProps {
  products: Product[];
  ariaLabel?: string;
  ariaLabelledBy?: string;
  onAddToCart?: (product: Product, selectedVolume?: string) => void;
  onVolumeChange?: (volume: string, product: Product) => void;
  renderItem?: (product: Product, index: number) => ReactNode;
  className?: string;
}

export function ProductCarousel({
  products,
  ariaLabel,
  ariaLabelledBy,
  onAddToCart,
  onVolumeChange,
  renderItem,
  className = "",
}: ProductCarouselProps) {
  const {
    trackRef,
    prevBtnRef,
    nextBtnRef,
    canScrollPrev,
    canScrollNext,
    statusText,
    scrollByStep,
  } = useCarouselScroll(products.length);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={`relative ${className}`}
    >
      <div className="pointer-events-none absolute inset-y-0 -inset-x-3 sm:-inset-x-4 z-10 flex items-center justify-between">
        <CarouselArrowButton
          ref={prevBtnRef}
          direction="previous"
          disabled={!canScrollPrev}
          onClick={() => scrollByStep(-1)}
          className="pointer-events-auto"
        />
        <CarouselArrowButton
          ref={nextBtnRef}
          direction="next"
          disabled={!canScrollNext}
          onClick={() => scrollByStep(1)}
          className="pointer-events-auto"
        />
      </div>

      <div
        ref={trackRef}
        tabIndex={0}
        role="group"
        aria-label="Productos"
        className="roxel-carousel-track flex gap-5 overflow-x-auto overflow-y-hidden -mx-3 px-3 -my-6 py-6 scroll-px-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-ink rounded-xl"
      >
        {products.map((product, index) => (
          <div
            key={product.id}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${products.length}`}
            className="snap-start shrink-0 w-[82%] sm:w-[calc((100%-1.25rem)/2)] md:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-3.75rem)/4)]"
          >
            {renderItem ? (
              renderItem(product, index)
            ) : (
              <ProductCard
                product={product}
                onAddToCart={onAddToCart}
                onVolumeChange={onVolumeChange}
                className="h-full"
              />
            )}
          </div>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {statusText}
      </p>
    </div>
  );
}
