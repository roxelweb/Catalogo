export type ImageSource = string | { src: string };

export function resolveImageSrc(source: ImageSource): string {
  return typeof source === "string" ? source : source.src;
}

export type VolumeVariant = "dark" | "gold";

export interface ProductVolume {
  label: string;
  value?: string;
  variant?: VolumeVariant;
  /** Precio final (con descuento aplicado si corresponde) para esta presentación. */
  unitPrice?: number;
  /** Precio regular antes de descuento, si la presentación está en oferta. */
  originalPrice?: number;
  /** Porcentaje de descuento activo (ej. 15 para 15% OFF). */
  discountPercent?: number;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  description: string;
  image: ImageSource;
  imageAlt?: string;
  volumes: ProductVolume[];
  price?: string;
}

export interface NavItem {
  label: string;
  href: string;
  current?: boolean;
}

export interface SocialLink {
  platform: "tiktok" | "instagram" | "whatsapp";
  href: string;
  label?: string;
}

export interface CartItem {
  id: string;
  productId?: string;
  brand: string;
  name: string;
  volume?: string;
  unitPrice: number;
  quantity: number;
  image: ImageSource;
  imageAlt?: string;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface CartCheckoutData {
  fullName: string;
  deliveryMethod: string;
  items: CartItem[];
  total: number;
}

export function formatCurrency(
  amount: number,
  options: { spaceAfterSymbol?: boolean; locale?: string; symbol?: string } = {},
): string {
  const {
    spaceAfterSymbol = false,
    locale = "es-AR",
    symbol = "$",
  } = options;
  const formatted = new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${symbol}${spaceAfterSymbol ? " " : ""}${formatted}`;
}
