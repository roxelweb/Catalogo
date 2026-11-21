import type { ButtonHTMLAttributes, Ref } from "react";
import { TrashIcon } from "@components/ui/Icons";

export interface RemoveButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  itemName?: string;
  ref?: Ref<HTMLButtonElement>;
}

export function RemoveButton({
  itemName,
  type = "button",
  "aria-label": ariaLabel,
  className = "",
  ref,
  ...props
}: RemoveButtonProps) {
  const defaultLabel = itemName ? `Eliminar ${itemName}` : "Eliminar";

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel ?? defaultLabel}
      className={`roxel-control inline-flex items-center justify-center min-w-10 min-h-10 p-2 rounded-lg text-roxel-danger hover:text-roxel-danger-hover hover:bg-roxel-danger-surface transition-colors touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-danger-hover disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <TrashIcon className="w-5 h-5" />
    </button>
  );
}
