import { Button, type ButtonProps } from "../ui/Button";
import { CartIcon } from "../ui/Icons";

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
      leftIcon={<CartIcon className="w-4 h-4 shrink-0" />}
      aria-label={resolvedAriaLabel}
      className={`hover:bg-roxel-dark-900! hover:text-roxel-gold-400! active:bg-roxel-dark-800! ${className}`}
      {...props}
    >
      <span>{label}</span>
    </Button>
  );
}
