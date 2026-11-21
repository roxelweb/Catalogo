import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { CloseIcon, MenuIcon } from "@components/ui/Icons";
import type { NavItem } from "@components/types";

export interface NavMenuPopoverProps {
  navItems: NavItem[];
  onMenuClick?: () => void;
  className?: string;
}

type AnchorCSSProperties = CSSProperties & {
  anchorName?: string;
  "--roxel-menu-anchor"?: string;
};

const supportsPopover = () =>
  typeof HTMLElement !== "undefined" &&
  Object.hasOwn(HTMLElement.prototype, "popover");

export function NavMenuPopover({
  navItems,
  onMenuClick,
  className = "",
}: NavMenuPopoverProps) {
  const rawId = useId();
  const safeId = rawId.replace(/[^a-zA-Z0-9_-]/g, "");
  const menuId = `roxel-nav-menu-${safeId}`;
  const menuAnchor = `--roxel-menu-${safeId}`;

  const popoverRef = useRef<HTMLUListElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | undefined>(() =>
    navItems.find((item) => item.current)?.href,
  );

  useEffect(() => {
    const syncWithHash = () => {
      const currentHash = window.location.hash;
      if (currentHash && navItems.some((item) => item.href === currentHash)) {
        setActiveHref(currentHash);
      }
    };

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => {
      window.removeEventListener("hashchange", syncWithHash);
    };
  }, [navItems]);

  useEffect(() => {
    const popoverEl = popoverRef.current;
    if (!popoverEl) return;

    const handleToggle = (event: Event) => {
      const newState = (event as ToggleEvent).newState;
      setMenuOpen(newState === "open");
    };

    popoverEl.addEventListener("toggle", handleToggle);
    return () => {
      popoverEl.removeEventListener("toggle", handleToggle);
    };
  }, []);

  const closeMenu = () => {
    const popoverEl = popoverRef.current;
    if (!popoverEl) return;

    if (supportsPopover() && typeof popoverEl.hidePopover === "function") {
      try {
        popoverEl.hidePopover();
      } catch {
        // Already closed
      }
    } else {
      popoverEl.classList.remove(":popover-open");
      setMenuOpen(false);
    }
  };

  const handleMenuButtonClick = () => {
    onMenuClick?.();

    const popoverEl = popoverRef.current;
    if (!popoverEl) return;

    if (!supportsPopover()) {
      setMenuOpen((prev) => {
        const next = !prev;
        popoverEl.classList.toggle(":popover-open", next);
        return next;
      });
    }
  };

  return (
    <nav
      aria-label="Principal"
      className={`relative flex items-center ${className}`}
    >
      <button
        type="button"
        popoverTarget={menuId}
        popoverTargetAction="toggle"
        aria-controls={menuId}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        onClick={handleMenuButtonClick}
        style={{ anchorName: menuAnchor } as AnchorCSSProperties}
        className="roxel-control inline-flex items-center justify-center min-w-10 min-h-10 p-2 rounded-lg text-roxel-ink-inverse hover:text-roxel-gold-metallic hover:bg-roxel-dark-800 transition-colors touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-gold-400"
      >
        {menuOpen ? (
          <CloseIcon className="w-6 h-6" />
        ) : (
          <MenuIcon className="w-6 h-6" />
        )}
      </button>

      <ul
        id={menuId}
        ref={popoverRef}
        popover="auto"
        style={{ "--roxel-menu-anchor": menuAnchor } as AnchorCSSProperties}
        className="roxel-nav-popover roxel-control w-56 rounded-xl bg-roxel-dark-900 text-roxel-ink-inverse border border-roxel-dark-700 shadow-card-hover py-2 m-0 list-none"
      >
        {navItems.map((item) => {
          const isCurrent =
            activeHref !== undefined
              ? activeHref === item.href
              : Boolean(item.current);

          return (
            <li key={`${item.href}-${item.label}`}>
              <a
                href={item.href}
                aria-current={isCurrent ? "page" : undefined}
                onClick={() => {
                  setActiveHref(item.href);
                  closeMenu();
                }}
                className={`block px-4 py-2.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-roxel-gold-400 ${
                  isCurrent
                    ? "border-l-2 border-roxel-gold-400 bg-roxel-dark-800 text-roxel-gold-metallic font-semibold"
                    : "border-l-2 border-transparent text-roxel-ink-inverse hover:bg-roxel-dark-800 hover:text-roxel-gold-300"
                }`}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
