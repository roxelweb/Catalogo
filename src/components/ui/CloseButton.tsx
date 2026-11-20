import type { ButtonHTMLAttributes, Ref } from "react";
import { CloseIcon } from "./Icons";

export interface CloseButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  ref?: Ref<HTMLButtonElement>;
}

export function CloseButton({
  type = "button",
  "aria-label": ariaLabel,
  className = "",
  ref,
  ...props
}: CloseButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel ?? "Cerrar"}
      className={`roxel-control inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-roxel-surface hover:bg-roxel-surface-subtle active:bg-roxel-border-subtle text-roxel-ink border border-roxel-border-subtle shadow-card transition-colors touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-ink disabled:opacity-45 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  );
}
