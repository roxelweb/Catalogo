import { useId } from "react";
import { CartCheckoutForm, type CartCheckoutFormValues } from "./CartCheckoutForm";
import { CartItemList } from "./CartItemList";
import { CartSummary } from "./CartSummary";
import { CloseButton } from "../ui/CloseButton";
import type { CartCheckoutData, CartItem, SelectOption } from "../types";

export interface CartPanelProps {
  items: CartItem[];
  title?: string;
  titleId?: string;
  onClose?: () => void;
  onQuantityChange?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: (data: CartCheckoutData) => void;
  deliveryOptions?: SelectOption[];
  nameLabel?: string;
  namePlaceholder?: string;
  deliveryLabel?: string;
  deliveryPlaceholder?: string;
  checkoutLabel?: string;
  shippingNote?: string;
  emptyMessage?: string;
  isSubmitting?: boolean;
  className?: string;
}

const DEFAULT_DELIVERY_OPTIONS: SelectOption[] = [
  { value: "retiro", label: "Retiro en punto de entrega" },
  { value: "envio", label: "Envío a domicilio" },
  { value: "acordar", label: "Acordar con el vendedor" },
];

export function CartPanel({
  items,
  title = "TU CARRITO DE COMPRAS",
  titleId,
  onClose,
  onQuantityChange,
  onRemoveItem,
  onCheckout,
  deliveryOptions = DEFAULT_DELIVERY_OPTIONS,
  nameLabel,
  namePlaceholder,
  deliveryLabel,
  deliveryPlaceholder,
  checkoutLabel,
  shippingNote,
  emptyMessage,
  isSubmitting = false,
  className = "",
}: CartPanelProps) {
  const generatedId = useId();
  const resolvedTitleId =
    titleId ?? `roxel-cart-title-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const total = items.reduce(
    (acc, item) => acc + item.unitPrice * item.quantity,
    0,
  );

  const handleCheckoutSubmit = ({
    fullName,
    deliveryMethod,
  }: CartCheckoutFormValues) => {
    onCheckout?.({
      fullName,
      deliveryMethod,
      items,
      total,
    });
  };

  return (
    <div
      className={`flex flex-col bg-roxel-surface-card text-roxel-ink p-5 sm:p-6 ${className}`}
    >
      <div className="flex items-center justify-between gap-4 pb-4">
        <h2
          id={resolvedTitleId}
          className="text-lg sm:text-xl font-bold uppercase tracking-tight text-roxel-ink"
        >
          {title}
        </h2>

        {onClose ? <CloseButton onClick={onClose} /> : null}
      </div>

      <CartItemList
        items={items}
        emptyMessage={emptyMessage}
        onQuantityChange={onQuantityChange}
        onRemoveItem={onRemoveItem}
      />

      <div className="border-t border-roxel-border pt-5 mt-2">
        <CartSummary total={total} shippingNote={shippingNote} />
      </div>

      <CartCheckoutForm
        labelledBy={resolvedTitleId}
        deliveryOptions={deliveryOptions}
        nameLabel={nameLabel}
        namePlaceholder={namePlaceholder}
        deliveryLabel={deliveryLabel}
        deliveryPlaceholder={deliveryPlaceholder}
        checkoutLabel={checkoutLabel}
        disabled={items.length === 0 || isSubmitting}
        onSubmit={handleCheckoutSubmit}
      />
    </div>
  );
}
