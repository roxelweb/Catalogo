import type { ButtonHTMLAttributes, Ref } from "react";
import { CartIcon } from "../ui/Icons";

export interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number;
  ref?: Ref<HTMLButtonElement>;
}

export function CartButton({
  count = 0,
  type = "button",
  "aria-label": ariaLabel,
  className = "",
  ref,
  ...props
}: CartButtonProps) {
  const safeCount = Math.max(0, count);
  const formattedCount = safeCount > 99 ? "99+" : String(safeCount);
  const resolvedAriaLabel =
    ariaLabel ??
    `Carrito de compras, ${safeCount} ${safeCount === 1 ? "producto" : "productos"}`;

  return (
    <button
      ref={ref}
      type={type}
      aria-label={resolvedAriaLabel}
      className={`roxel-control relative inline-flex items-center justify-center min-w-10 min-h-10 p-2 rounded-full text-roxel-gold-metallic hover:text-roxel-gold-300 hover:bg-roxel-dark-800 transition-colors touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-gold-400 ${className}`}
      {...props}
    >
      <CartIcon className="w-6 h-6" />
      <span
        aria-hidden="true"
        className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-roxel-badge text-roxel-badge-ink text-[11px] font-bold leading-none"
      >
        {formattedCount}
      </span>
    </button>
  );
}
