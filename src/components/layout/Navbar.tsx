import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);
  const rawId = useId();
  const menuId = `roxel-mobile-nav-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, [menuOpen]);

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
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
      ref={headerRef}
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

        <div className="flex items-center gap-2">
          <CartButton count={cartCount} onClick={onCartClick} />

          {navItems.length > 0 ? (
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={menuId}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setMenuOpen((prev) => !prev)}
              className={`sm:hidden roxel-control inline-flex items-center justify-center min-w-10 min-h-10 p-2 rounded-lg transition-colors touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-gold-400 ${
                menuOpen
                  ? "bg-roxel-dark-800 text-roxel-gold-300"
                  : "text-roxel-ink-inverse hover:text-roxel-gold-300 hover:bg-roxel-dark-800"
              }`}
            >
              <span
                aria-hidden="true"
                className={`relative flex w-6 h-6 items-center justify-center transition-[rotate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                  menuOpen ? "rotate-90" : "rotate-0"
                }`}
              >
                <span
                  className={`absolute h-0.5 w-5 rounded-full bg-current transition-[translate,rotate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    menuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5 rotate-0"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 rounded-full bg-current transition-[scale,opacity] duration-200 ease-out motion-reduce:transition-none ${
                    menuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-5 rounded-full bg-current transition-[translate,rotate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                    menuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5 rotate-0"
                  }`}
                />
              </span>
            </button>
          ) : null}
        </div>
      </div>

      {navItems.length > 0 ? (
        <nav
          id={menuId}
          aria-label="Categorías y contacto"
          data-open={menuOpen ? "true" : "false"}
          className="roxel-mobile-nav absolute top-full inset-x-0 z-30 shadow-card-hover border-b border-roxel-dark-800 sm:block sm:static sm:shadow-none sm:border-b-0 w-full bg-roxel-dark-900 border-t border-roxel-dark-800/80"
        >
          <div className="roxel-mobile-nav-inner">
            <ul className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 sm:py-2.5 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-y-1 sm:gap-x-8 sm:gap-y-1.5">
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  style={{ "--item-index": index } as CSSProperties}
                  className="roxel-mobile-nav-item w-full sm:w-auto text-center"
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex sm:inline-block items-center justify-center min-h-10 sm:min-h-0 text-sm font-medium text-roxel-gold-300 hover:text-roxel-gold-200 transition-colors rounded-sm px-3 py-2 sm:px-1 sm:py-0.5 focus-visible:outline-2 focus-visible:outline-offset-[-2px] sm:focus-visible:outline-offset-2 focus-visible:outline-roxel-gold-400"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
