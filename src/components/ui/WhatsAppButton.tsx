import { SITE_CONFIG } from "../../data/site";
import { WhatsAppIcon2 } from "./Icons";

export interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  href?: string;
  floating?: boolean;
  ariaLabel?: string;
  className?: string;
}

function buildWhatsAppUrl(phoneNumber: string, message?: string): string {
  const digits = phoneNumber.replace(/\D/g, "");
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function WhatsAppButton({
  phoneNumber = SITE_CONFIG.whatsappPhone,
  message,
  href,
  floating = true,
  ariaLabel = "Contactar por WhatsApp",
  className = "",
}: WhatsAppButtonProps) {
  const targetHref = href ?? buildWhatsAppUrl(phoneNumber, message);
  const positionClass = floating ? "fixed right-4 bottom-6 z-40" : "relative";

  return (
    <a
      href={targetHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`roxel-control inline-flex items-center justify-center w-15 h-15 sm:w-14 sm:h-14 p-0 rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-ink touch-manipulation ${positionClass} ${className}`}
    >
      <span
        aria-hidden="true"
        className="roxel-whatsapp-radar pointer-events-none absolute inset-0 rounded-full bg-roxel-whatsapp/45"
      />
      <WhatsAppIcon2 className="relative z-10 size-full drop-shadow-md" />
    </a>
  );
}
