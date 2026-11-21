import { QuantityStepper } from "./QuantityStepper";
import { RemoveButton } from "./RemoveButton";
import { formatCurrency, resolveImageSrc, type CartItem } from "../types";

export interface CartItemRowProps {
  item: CartItem;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemove?: (id: string) => void;
  minQuantity?: number;
  maxQuantity?: number;
  subtotalLabel?: string;
  currencySymbol?: string;
  className?: string;
}

export function CartItemRow({
  item,
  onQuantityChange,
  onRemove,
  minQuantity = 1,
  maxQuantity,
  subtotalLabel = "Subtotal:",
  currencySymbol = "$",
  className = "",
}: CartItemRowProps) {
  const fullTitle = `${item.brand} - ${item.name}${
    item.volume ? ` - ${item.volume}` : ""
  }`;
  const subtotal = item.unitPrice * item.quantity;

  return (
    <div className={`flex gap-4 py-5 ${className}`}>
      <div className="w-24 h-28 sm:w-28 sm:h-32 shrink-0 rounded-xl border border-roxel-border bg-roxel-surface-card p-2 flex items-center justify-center overflow-hidden">
        <img
          src={resolveImageSrc(item.image)}
          alt={item.imageAlt ?? fullTitle}
          width={112}
          height={128}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="text-sm sm:text-base font-bold text-roxel-ink leading-snug">
              {fullTitle}
            </p>
            <p className="mt-1.5 text-sm text-roxel-ink">
              {subtotalLabel}{" "}
              <strong className="font-bold tabular-nums">
                {formatCurrency(subtotal, {
                  spaceAfterSymbol: true,
                  symbol: currencySymbol,
                })}
              </strong>
            </p>
          </div>

          <RemoveButton
            itemName={fullTitle}
            onClick={() => onRemove?.(item.id)}
            className="-mt-1 -mr-1 shrink-0"
          />
        </div>

        <div className="flex justify-end">
          <QuantityStepper
            value={item.quantity}
            min={minQuantity}
            max={maxQuantity}
            itemName={fullTitle}
            onChange={(qty) => onQuantityChange?.(item.id, qty)}
          />
        </div>
      </div>
    </div>
  );
}
