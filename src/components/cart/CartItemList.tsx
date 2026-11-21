import { CartItemRow } from "./CartItemRow";
import type { CartItem } from "@components/types";

export interface CartItemListProps {
  items: CartItem[];
  emptyMessage?: string;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  className?: string;
}

export function CartItemList({
  items,
  emptyMessage = "Tu carrito está vacío.",
  onQuantityChange,
  onRemoveItem,
  className = "",
}: CartItemListProps) {
  if (items.length === 0) {
    return (
      <p className={`py-10 text-center text-sm text-roxel-ink-muted ${className}`}>
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className={`divide-y divide-roxel-border list-none m-0 p-0 ${className}`}>
      {items.map((item) => (
        <li key={item.id}>
          <CartItemRow
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemoveItem}
          />
        </li>
      ))}
    </ul>
  );
}
