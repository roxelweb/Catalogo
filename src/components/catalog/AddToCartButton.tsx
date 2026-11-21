import { Button, type ButtonProps } from "@components/ui/Button";
import { CartIcon } from "@components/ui/Icons";

export interface AddToCartButtonProps
  extends Omit<ButtonProps, "variant" | "leftIcon" | "children"> {
  label?: string;
  productName?: string;
}

export function AddToCartButton({
  label = "Agregar al carrito",
  productName,
  fullWidth = true,
  "aria-label": ariaLabel,
  className = "",
  ...props
}: AddToCartButtonProps) {
  const resolvedAriaLabel =
    ariaLabel ?? (productName ? `${label}: ${productName}` : undefined);

  return (
    <Button
      variant="gold"
      size="md"
      fullWidth={fullWidth}
      leftIcon={
        <CartIcon className="w-4 h-4 shrink-0 transition-transform duration-200 motion-safe:group-hover/cta:scale-110" />
      }
      aria-label={resolvedAriaLabel}
      className={`group/cta hover:bg-roxel-dark-900! hover:text-roxel-gold-400! active:bg-roxel-dark-800! active:text-roxel-gold-400! ${className}`}
      {...props}
    >
      <span>{label}</span>
    </Button>
  );
}
