import {
  useEffect,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type Ref,
} from "react";
import { CART_ITEM_ADDED_EVENT, useHydrated } from "@hooks";
import { CartIcon } from "@components/ui/Icons";

const BURST_RAY_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;

export interface CartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  count?: number;
  ref?: Ref<HTMLButtonElement>;
}

export function CartButton({
  count = 0,
  type = "button",
  "aria-label": ariaLabel,
  className = "",
  ref,
  ...props
}: CartButtonProps) {
  const isHydrated = useHydrated();
  const safeCount = Math.max(0, count);
  const formattedCount = safeCount > 99 ? "99+" : String(safeCount);
  const resolvedAriaLabel =
    ariaLabel ??
    `Carrito de compras, ${safeCount} ${safeCount === 1 ? "producto" : "productos"}`;

  const [burstKey, setBurstKey] = useState(0);
  const hasInitializedRef = useRef(false);
  const prevCountRef = useRef(safeCount);
  const lastEventAtRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleItemAdded = () => {
      lastEventAtRef.current = performance.now();
      setBurstKey((prev) => prev + 1);
    };

    window.addEventListener(CART_ITEM_ADDED_EVENT, handleItemAdded);
    return () => {
      window.removeEventListener(CART_ITEM_ADDED_EVENT, handleItemAdded);
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      prevCountRef.current = safeCount;
      return;
    }

    if (safeCount > prevCountRef.current) {
      const triggeredRecently =
        lastEventAtRef.current !== null &&
        performance.now() - lastEventAtRef.current < 150;
      if (!triggeredRecently) {
        setBurstKey((prev) => prev + 1);
      }
    }

    prevCountRef.current = safeCount;
  }, [isHydrated, safeCount]);

  return (
    <button
      ref={ref}
      type={type}
      aria-label={resolvedAriaLabel}
      className={`roxel-control relative inline-flex items-center justify-center min-w-10 min-h-10 p-2 rounded-full text-roxel-gold-metallic hover:text-roxel-gold-300 hover:bg-roxel-dark-800 transition-colors touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-gold-400 ${className}`}
      {...props}
    >
      <CartIcon className="w-6 h-6" />
      <span
        aria-hidden="true"
        className="absolute -top-0.5 -right-0.5 inline-flex items-center justify-center pointer-events-none"
      >
        {burstKey > 0 ? (
          <span
            key={`burst-${burstKey}`}
            className="absolute inset-0 pointer-events-none"
          >
            {BURST_RAY_ANGLES.map((angle) => (
              <span
                key={angle}
                className="roxel-cart-burst-ray"
                style={{ "--ray-angle": `${angle}deg` } as CSSProperties}
              />
            ))}
          </span>
        ) : null}
        <span
          key={`badge-${burstKey}`}
          className={`roxel-cart-badge ${burstKey > 0 ? "roxel-cart-badge-pop" : ""} relative inline-flex items-center justify-center min-w-5 h-5 px-1 rounded-full bg-roxel-badge text-roxel-badge-ink text-[11px] font-bold leading-none tabular-nums`}
        >
          {formattedCount}
        </span>
      </span>
    </button>
  );
}
