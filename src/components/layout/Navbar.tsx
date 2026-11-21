import logoImg from "../../assets/logo.svg";
import { CartButton } from "../cart/CartButton";
import { NavMenuPopover } from "./NavMenuPopover";
import { resolveImageSrc, type ImageSource, type NavItem } from "../types";

export interface NavbarProps {
  logoSrc?: ImageSource;
  logoHref?: string;
  logoAlt?: string;
  cartCount?: number;
  onCartClick?: () => void;
  navItems?: NavItem[];
  onMenuClick?: () => void;
  className?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: "Decants", href: "#decants" },
  { label: "Árabes", href: "#arabes" },
  { label: "Testers", href: "#testers" },
  { label: "Extractos", href: "#extractos" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar({
  logoSrc = logoImg,
  logoHref = "/",
  logoAlt = "Roxel Essence — Inicio",
  cartCount = 0,
  onCartClick,
  navItems = DEFAULT_NAV_ITEMS,
  onMenuClick,
  className = "",
}: NavbarProps) {
  return (
    <header
      className={`sticky top-0 z-30 w-full bg-roxel-dark-950 text-roxel-ink-inverse border-b border-roxel-dark-800 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a
          href={logoHref}
          className="inline-flex items-center shrink-0 rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-gold-400"
        >
          <img
            src={resolveImageSrc(logoSrc)}
            alt={logoAlt}
            width={36}
            height={36}
            decoding="async"
            className="h-9 w-9 object-contain"
          />
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <CartButton count={cartCount} onClick={onCartClick} />

          <NavMenuPopover navItems={navItems} onMenuClick={onMenuClick} />
        </div>
      </div>
    </header>
  );
}
