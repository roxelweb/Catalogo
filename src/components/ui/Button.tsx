import type { ButtonHTMLAttributes, ReactNode, Ref } from "react";

export type ButtonVariant = "gold" | "dark" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  pill?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  gold: "bg-roxel-gold-400 hover:bg-roxel-gold-500 active:bg-roxel-gold-600 text-roxel-ink focus-visible:outline-roxel-ink",
  dark: "bg-roxel-dark-900 hover:bg-roxel-dark-800 active:bg-roxel-dark-700 text-roxel-ink-inverse focus-visible:outline-roxel-gold-400",
  outline:
    "bg-transparent border border-roxel-border text-roxel-ink hover:bg-roxel-surface-subtle focus-visible:outline-roxel-ink",
  ghost:
    "bg-transparent text-roxel-ink-inverse hover:bg-roxel-dark-800 focus-visible:outline-roxel-gold-400",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "min-h-8 px-3 py-1.5 text-xs",
  md: "min-h-10 px-4 py-2 text-sm",
  lg: "min-h-11 px-6 py-2.5 text-base",
  icon: "min-w-10 min-h-10 p-2",
};

export function Button({
  variant = "gold",
  size = "md",
  fullWidth = false,
  pill = false,
  leftIcon,
  rightIcon,
  type = "button",
  className = "",
  children,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={`roxel-control inline-flex items-center justify-center gap-2 font-semibold transition-colors touch-manipulation cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-45 disabled:cursor-not-allowed ${
        VARIANT_CLASSES[variant]
      } ${SIZE_CLASSES[size]} ${pill ? "rounded-full" : "rounded-lg"} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
}
