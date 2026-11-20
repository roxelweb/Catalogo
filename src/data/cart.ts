import type { CartItem, SelectOption } from "../components/types";
import { PERFUME_IMAGES } from "./products";

export const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: "cart-9pm-elixir-100ml",
    productId: "decant-9pm-elixir",
    brand: "9 pm",
    name: "Elixir",
    volume: "100 ml",
    unitPrice: 51990,
    quantity: 1,
    image: PERFUME_IMAGES.amberBlackBottle,
    imageAlt: "9 pm - Elixir - 100 ml",
  },
  {
    id: "cart-rayhaan-aquatica-150ml",
    productId: "decant-rayhaan-aquatica",
    brand: "Rayhaan",
    name: "Aquatica",
    volume: "150 ml",
    unitPrice: 60000,
    quantity: 1,
    image: PERFUME_IMAGES.freshCutout,
    imageAlt: "Rayhaan - Aquatica - 150 ml",
  },
  {
    id: "cart-rayhaan-lion-150ml",
    productId: "decant-rayhaan-lion",
    brand: "Rayhaan",
    name: "Lion",
    volume: "150 ml",
    unitPrice: 35000,
    quantity: 2,
    image: PERFUME_IMAGES.noirCutout,
    imageAlt: "Rayhaan - Lion - 150 ml",
  },
];

export const DELIVERY_METHOD_OPTIONS: SelectOption[] = [
  { value: "retiro", label: "Retiro en punto de entrega" },
  { value: "envio-caba-gba", label: "Envío por moto mensajería (CABA / GBA)" },
  { value: "envio-correo", label: "Envío por correo a todo el país" },
  { value: "acordar", label: "Acordar con el vendedor" },
];
