import { useState } from "react";
import { SITE_CONFIG } from "@data/site";
import { buildWhatsAppCheckoutUrl, useCart } from "@hooks";
import { CartModal } from "@components/cart/CartModal";
import { Navbar } from "./Navbar";
import type {
  CartCheckoutData,
  CartItem,
  NavItem,
  SelectOption,
} from "@components/types";

export interface StoreHeaderProps {
  deliveryOptions?: SelectOption[];
  meetingPoints?: string[];
  whatsappPhone?: string;
  initialItems?: CartItem[];
  navItems?: NavItem[];
}

export function StoreHeader({
  deliveryOptions,
  meetingPoints,
  whatsappPhone = SITE_CONFIG.whatsappPhone,
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
        meetingPoints={meetingPoints}
        onCheckout={handleCheckout}
      />
    </>
  );
}
