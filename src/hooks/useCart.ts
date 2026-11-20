import { useCallback, useMemo } from "react";
import {
  formatCurrency,
  type CartCheckoutData,
  type CartItem,
  type ImageSource,
  type Product,
} from "../components/types";
import { useHydrated } from "./useHydrated";
import { useLocalStorage } from "./useLocalStorage";

export const CART_STORAGE_KEY = "roxel:cart:v1";

const EMPTY_CART: CartItem[] = [];

export interface UseCartOptions {
  storageKey?: string;
  initialItems?: CartItem[];
  maxQuantityPerItem?: number;
}

export type AddCartItemInput = Omit<CartItem, "id" | "quantity"> & {
  id?: string;
  quantity?: number;
};

export type AddableProduct = Product & {
  unitPrice?: number;
};

export interface UseCartReturn {
  items: CartItem[];
  itemCount: number;
  total: number;
  isEmpty: boolean;
  isHydrated: boolean;
  addItem: (input: AddCartItemInput) => void;
  addProduct: (
    product: AddableProduct,
    selectedVolume?: string,
    quantity?: number,
  ) => void;
  updateQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string, removeOnZero?: boolean) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  hasItem: (id: string) => boolean;
  getItemQuantity: (id: string) => number;
}

export function buildCartItemId(productId: string, volume?: string): string {
  const normalizedVolume = volume?.trim().toLowerCase();
  return normalizedVolume ? `${productId}::${normalizedVolume}` : productId;
}

function isValidImageSource(image: unknown): image is ImageSource {
  if (typeof image === "string") return image.length > 0;
  if (image !== null && typeof image === "object") {
    const src = (image as { src?: unknown }).src;
    return typeof src === "string" && src.length > 0;
  }
  return false;
}

export function sanitizeCartItems(raw: unknown): CartItem[] {
  if (!Array.isArray(raw)) return [];

  const sanitized: CartItem[] = [];

  for (const entry of raw) {
    if (entry === null || typeof entry !== "object") continue;
    const candidate = entry as Record<string, unknown>;

    if (typeof candidate.id !== "string" || candidate.id.trim().length === 0) {
      continue;
    }
    if (
      typeof candidate.brand !== "string" ||
      typeof candidate.name !== "string"
    ) {
      continue;
    }
    if (
      typeof candidate.unitPrice !== "number" ||
      !Number.isFinite(candidate.unitPrice) ||
      candidate.unitPrice < 0
    ) {
      continue;
    }
    if (
      typeof candidate.quantity !== "number" ||
      !Number.isFinite(candidate.quantity)
    ) {
      continue;
    }
    const quantity = Math.floor(candidate.quantity);
    if (quantity < 1) continue;

    if (!isValidImageSource(candidate.image)) continue;

    const item: CartItem = {
      id: candidate.id,
      brand: candidate.brand,
      name: candidate.name,
      unitPrice: candidate.unitPrice,
      quantity,
      image: candidate.image,
    };

    if (
      typeof candidate.productId === "string" &&
      candidate.productId.trim().length > 0
    ) {
      item.productId = candidate.productId;
    }
    if (
      typeof candidate.volume === "string" &&
      candidate.volume.trim().length > 0
    ) {
      item.volume = candidate.volume;
    }
    if (
      typeof candidate.imageAlt === "string" &&
      candidate.imageAlt.trim().length > 0
    ) {
      item.imageAlt = candidate.imageAlt;
    }

    sanitized.push(item);
  }

  return sanitized;
}

export function parsePriceString(price?: string): number {
  if (!price) return 0;
  const digits = price.replace(/\D/g, "");
  if (!digits) return 0;
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function buildWhatsAppCheckoutUrl(
  data: CartCheckoutData,
  phoneNumber = "5411268577",
): string {
  const digits = phoneNumber.replace(/\D/g, "");
  const lines = data.items.map((item) => {
    const title = `${item.brand} - ${item.name}${
      item.volume ? ` - ${item.volume}` : ""
    }`;
    const subtotal = formatCurrency(item.unitPrice * item.quantity, {
      spaceAfterSymbol: true,
    });
    return `- ${item.quantity}x ${title} (${subtotal})`;
  });

  const message = [
    "Hola! Quiero realizar el siguiente pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatCurrency(data.total, { spaceAfterSymbol: false })}`,
    `Nombre: ${data.fullName}`,
    `Método de entrega: ${data.deliveryMethod}`,
  ].join("\n");

  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function clampQuantity(qty: number, max?: number): number {
  const integer = Math.max(1, Math.floor(qty));
  return max !== undefined ? Math.min(max, integer) : integer;
}

export function useCart(options: UseCartOptions = {}): UseCartReturn {
  const {
    storageKey = CART_STORAGE_KEY,
    initialItems = EMPTY_CART,
    maxQuantityPerItem,
  } = options;

  const isHydrated = useHydrated();
  const [items, setItems, removeStorage] = useLocalStorage<CartItem[]>(
    storageKey,
    initialItems,
    { sanitize: sanitizeCartItems },
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items],
  );

  const isEmpty = items.length === 0;

  const addItem = useCallback(
    (input: AddCartItemInput) => {
      const resolvedId =
        input.id ??
        buildCartItemId(
          input.productId ?? `${input.brand}-${input.name}`,
          input.volume,
        );
      const qtyToAdd = clampQuantity(input.quantity ?? 1, maxQuantityPerItem);

      setItems((prev) => {
        const existingIndex = prev.findIndex((item) => item.id === resolvedId);
        if (existingIndex === -1) {
          const newItem: CartItem = {
            id: resolvedId,
            productId: input.productId,
            brand: input.brand,
            name: input.name,
            volume: input.volume,
            unitPrice: Math.max(0, input.unitPrice),
            quantity: qtyToAdd,
            image: input.image,
            imageAlt: input.imageAlt,
          };
          return [...prev, newItem];
        }

        return prev.map((item, idx) =>
          idx === existingIndex
            ? {
                ...item,
                quantity: clampQuantity(
                  item.quantity + qtyToAdd,
                  maxQuantityPerItem,
                ),
              }
            : item,
        );
      });
    },
    [maxQuantityPerItem, setItems],
  );

  const addProduct = useCallback(
    (product: AddableProduct, selectedVolume?: string, quantity = 1) => {
      const volume = selectedVolume ?? product.volumes[0]?.label;
      const unitPrice =
        typeof product.unitPrice === "number" &&
        Number.isFinite(product.unitPrice)
          ? product.unitPrice
          : parsePriceString(product.price);

      addItem({
        id: buildCartItemId(product.id, volume),
        productId: product.id,
        brand: product.brand,
        name: product.name,
        volume,
        unitPrice,
        quantity,
        image: product.image,
        imageAlt: product.imageAlt,
      });
    },
    [addItem],
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (!Number.isFinite(quantity) || quantity <= 0) {
        setItems((prev) => prev.filter((item) => item.id !== id));
        return;
      }

      const clamped = clampQuantity(quantity, maxQuantityPerItem);
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, quantity: clamped } : item,
        ),
      );
    },
    [maxQuantityPerItem, setItems],
  );

  const increment = useCallback(
    (id: string) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: clampQuantity(
                  item.quantity + 1,
                  maxQuantityPerItem,
                ),
              }
            : item,
        ),
      );
    },
    [maxQuantityPerItem, setItems],
  );

  const decrement = useCallback(
    (id: string, removeOnZero = false) => {
      setItems((prev) => {
        const next: CartItem[] = [];
        for (const item of prev) {
          if (item.id !== id) {
            next.push(item);
            continue;
          }
          const decremented = item.quantity - 1;
          if (decremented <= 0) {
            if (!removeOnZero) {
              next.push({ ...item, quantity: 1 });
            }
          } else {
            next.push({ ...item, quantity: decremented });
          }
        }
        return next;
      });
    },
    [setItems],
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setItems],
  );

  const clearCart = useCallback(() => {
    removeStorage();
  }, [removeStorage]);

  const hasItem = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items],
  );

  const getItemQuantity = useCallback(
    (id: string) => items.find((item) => item.id === id)?.quantity ?? 0,
    [items],
  );

  return {
    items,
    itemCount,
    total,
    isEmpty,
    isHydrated,
    addItem,
    addProduct,
    updateQuantity,
    increment,
    decrement,
    removeItem,
    clearCart,
    hasItem,
    getItemQuantity,
  };
}
