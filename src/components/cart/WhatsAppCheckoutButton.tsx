import type { ButtonHTMLAttributes, Ref } from "react";
import { WhatsAppIcon } from "../ui/Icons";

export interface WhatsAppCheckoutButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label?: string;
  ref?: Ref<HTMLButtonElement>;
}

export function WhatsAppCheckoutButton({
  label = "Pagar por WhatsApp",
  type = "submit",
  className = "",
  ref,
  ...props
}: WhatsAppCheckoutButtonProps) {
  return (
    <button
      ref={ref}
      type={type}
      className={`roxel-control w-full min-h-12 sm:min-h-14 px-6 py-3 rounded-xl bg-roxel-whatsapp-cta hover:bg-roxel-dark-900 hover:text-roxel-gold-400 active:bg-roxel-dark-800 text-roxel-ink-inverse font-bold text-base sm:text-lg shadow-card inline-flex items-center justify-center gap-3 transition-[color,background-color,transform] duration-150 motion-safe:active:enabled:scale-[0.99] touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-ink disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      <WhatsAppIcon className="w-6 h-6 shrink-0" />
      <span>{label}</span>
    </button>
  );
}
