import { useState } from "react";
import { AddToCartButton } from "./AddToCartButton";
import { ProductDescription, ProductTitle } from "@components/ui/Typography";
import { VolumeBadge } from "./VolumeBadge";
import {
  formatCurrency,
  resolveImageSrc,
  type Product,
  type ProductVolume,
} from "@components/types";

export interface ProductCardProps {
  product: Product;
  selectedVolume?: string;
  defaultSelectedVolume?: string;
  interactiveVolumes?: boolean;
  onVolumeChange?: (volume: string, product: Product) => void;
  onAddToCart?: (product: Product, selectedVolume?: string) => void;
  addToCartLabel?: string;
  className?: string;
}

function getVolumeKey(volume: ProductVolume): string {
  return volume.value ?? volume.label;
}

function resolveInitialVolume(
  volumes: ProductVolume[],
  defaultSelectedVolume: string | undefined,
  isInteractive: boolean,
): string | undefined {
  if (defaultSelectedVolume !== undefined) {
    return defaultSelectedVolume;
  }
  const goldVolume = volumes.find((vol) => vol.variant === "gold");
  if (goldVolume) {
    return getVolumeKey(goldVolume);
  }
  if (isInteractive && volumes[0]) {
    return getVolumeKey(volumes[0]);
  }
  return undefined;
}

export function ProductCard({
  product,
  selectedVolume,
  defaultSelectedVolume,
  interactiveVolumes,
  onVolumeChange,
  onAddToCart,
  addToCartLabel,
  className = "",
}: ProductCardProps) {
  const isInteractive =
    interactiveVolumes ??
    (product.volumes.length > 1 || Boolean(onVolumeChange));

  const [internalVolume, setInternalVolume] = useState<string | undefined>(() =>
    resolveInitialVolume(product.volumes, defaultSelectedVolume, isInteractive),
  );

  const activeVolume =
    selectedVolume !== undefined ? selectedVolume : internalVolume;

  const handleSelectVolume = (volumeKey: string) => {
    if (selectedVolume === undefined) {
      setInternalVolume(volumeKey);
    }
    onVolumeChange?.(volumeKey, product);
  };

  const activeVolumeObj =
    (activeVolume !== undefined
      ? product.volumes.find(
          (vol) => getVolumeKey(vol) === activeVolume || vol.label === activeVolume,
        )
      : undefined) ?? product.volumes[0];

  const displayedPrice =
    typeof activeVolumeObj?.unitPrice === "number" &&
    Number.isFinite(activeVolumeObj.unitPrice)
      ? formatCurrency(activeVolumeObj.unitPrice, { spaceAfterSymbol: true })
      : product.price;

  const hasDiscount =
    typeof activeVolumeObj?.discountPercent === "number" &&
    activeVolumeObj.discountPercent > 0 &&
    typeof activeVolumeObj?.originalPrice === "number" &&
    typeof activeVolumeObj?.unitPrice === "number" &&
    activeVolumeObj.originalPrice > activeVolumeObj.unitPrice;

  const fullProductName = `${product.brand} ${product.name}`;

  return (
    <article
      id={product.id}
      className={`group roxel-card scroll-mt-24 ring-1 ring-roxel-ink/15 flex flex-col bg-roxel-surface-card border border-roxel-border-subtle rounded-xl p-3.5 sm:p-4 shadow-card hover:shadow-card-hover motion-safe:hover:-translate-y-0.5 transition-[box-shadow,transform] duration-200 ${className}`}
    >
      {product.volumes.length > 0 ? (
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          {product.volumes.map((vol) => {
            const volKey = getVolumeKey(vol);
            return (
              <VolumeBadge
                key={volKey}
                label={vol.label}
                variant={vol.variant}
                selected={isInteractive ? activeVolume === volKey : false}
                onSelect={
                  isInteractive ? () => handleSelectVolume(volKey) : undefined
                }
              />
            );
          })}
        </div>
      ) : null}

      <div className="aspect-4/3 w-full flex items-center justify-center mb-3 bg-roxel-surface-card rounded-lg overflow-hidden">
        <img
          src={resolveImageSrc(product.image)}
          alt={product.imageAlt ?? fullProductName}
          width={600}
          height={450}
          loading="lazy"
          decoding="async"
          className="max-h-full max-w-full object-contain transition-transform duration-300 ease-out motion-safe:group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-auto space-y-0.5 mb-3.5">
        <ProductTitle brand={product.brand} name={product.name} />
        <ProductDescription>{product.description}</ProductDescription>
        {displayedPrice ? (
          <div className="flex flex-wrap items-baseline gap-2 pt-1">
            <p className="text-sm font-bold tabular-nums text-roxel-ink">
              {displayedPrice}
            </p>
            {hasDiscount && activeVolumeObj?.originalPrice !== undefined ? (
              <>
                <span className="text-xs tabular-nums text-roxel-ink-muted line-through">
                  {formatCurrency(activeVolumeObj.originalPrice, {
                    spaceAfterSymbol: true,
                  })}
                </span>
                <span className="inline-flex items-center rounded-full bg-roxel-gold-400 px-1.5 py-0.5 text-[11px] font-bold leading-none text-roxel-ink">
                  -{activeVolumeObj.discountPercent}%
                </span>
              </>
            ) : null}
          </div>
        ) : null}
      </div>

      <AddToCartButton
        label={addToCartLabel}
        productName={fullProductName}
        onClick={() => onAddToCart?.(product, activeVolume)}
      />
    </article>
  );
}