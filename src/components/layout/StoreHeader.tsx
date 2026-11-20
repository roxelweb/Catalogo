import { useState } from "react";
import { buildWhatsAppCheckoutUrl, useCart } from "../../hooks";
import { CartModal } from "../cart/CartModal";
import { Navbar } from "./Navbar";
import type {
  CartCheckoutData,
  CartItem,
  NavItem,
  SelectOption,
} from "../types";

export interface StoreHeaderProps {
  deliveryOptions?: SelectOption[];
  whatsappPhone?: string;
  initialItems?: CartItem[];
  navItems?: NavItem[];
}

export function StoreHeader({
  deliveryOptions,
  whatsappPhone = "5411268577",
  initialItems,
  navItems,
}: StoreHeaderProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const {
    items,
    itemCount,
    isHydrated,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart({ initialItems });

  const handleCheckout = (data: CartCheckoutData) => {
    const url = buildWhatsAppCheckoutUrl(data, whatsappPhone);
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    clearCart();
    setCartOpen(false);
  };

  return (
    <>
      <Navbar
        cartCount={isHydrated ? itemCount : 0}
        onCartClick={() => setCartOpen(true)}
        navItems={navItems}
      />
      <CartModal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onQuantityChange={updateQuantity}
        onRemoveItem={removeItem}
        deliveryOptions={deliveryOptions}
        onCheckout={handleCheckout}
      />
    </>
  );
}
