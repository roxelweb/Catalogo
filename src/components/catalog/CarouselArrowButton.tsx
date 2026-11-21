import type { ButtonHTMLAttributes, Ref } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@components/ui/Icons";

export interface CarouselArrowButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  direction: "previous" | "next";
  ref?: Ref<HTMLButtonElement>;
}

export function CarouselArrowButton({
  direction,
  type = "button",
  "aria-label": ariaLabel,
  className = "",
  ref,
  ...props
}: CarouselArrowButtonProps) {
  const defaultLabel = direction === "previous" ? "Anterior" : "Siguiente";

  return (
    <button
      ref={ref}
      type={type}
      aria-label={ariaLabel ?? defaultLabel}
      className={`roxel-control inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-roxel-dark-900 hover:bg-roxel-dark-800 active:bg-roxel-dark-700 text-roxel-ink-inverse shadow-fab transition-[color,background-color,opacity,transform] duration-150 motion-safe:hover:enabled:scale-105 motion-safe:active:enabled:scale-95 touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-gold-400 disabled:opacity-35 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {direction === "previous" ? (
        <ChevronLeftIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      ) : (
        <ChevronRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      )}
    </button>
  );
}
