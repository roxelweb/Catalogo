import type { MouseEvent } from "react";
import logoImg from "@assets/logo.svg";
import { CartButton } from "@components/cart/CartButton";
import { resolveImageSrc, type ImageSource, type NavItem } from "@components/types";

export interface NavbarProps {
  logoSrc?: ImageSource;
  logoHref?: string;
  logoAlt?: string;
  cartCount?: number;
  onCartClick?: () => void;
  navItems?: NavItem[];
  className?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [{ label: "Contacto", href: "#contacto" }];

export function Navbar({
  logoSrc = logoImg,
  logoHref = "/",
  logoAlt = "Roxel Essence — Inicio",
  cartCount = 0,
  onCartClick,
  navItems = DEFAULT_NAV_ITEMS,
  className = "",
}: NavbarProps) {
  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      typeof window !== "undefined" &&
      logoHref === "/" &&
      window.location.pathname === "/"
    ) {
      event.preventDefault();
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    }
  };

  return (
    <header
      className={`sticky top-0 z-30 w-full bg-roxel-dark-950 text-roxel-ink-inverse border-b border-roxel-dark-800 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <a
          href={logoHref}
          onClick={handleLogoClick}
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

        <CartButton count={cartCount} onClick={onCartClick} />
      </div>

      {navItems.length > 0 ? (
        <nav
          aria-label="Categorías y contacto"
          className="w-full bg-roxel-dark-900 border-t border-roxel-dark-800/80"
        >
          <ul className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 sm:gap-x-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-block text-xs sm:text-sm font-medium text-roxel-gold-300 hover:text-roxel-gold-200 transition-colors rounded-sm px-1 py-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-gold-400"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
