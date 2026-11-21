import type { SelectOption } from "@components/types";

export const DELIVERY_METHOD_OPTIONS: SelectOption[] = [
  { value: "retiro", label: "Retiro en punto de entrega" },
  { value: "envio-caba-gba", label: "Envío por moto mensajería (CABA / GBA)" },
  { value: "envio-correo", label: "Envío por correo a todo el país" },
  { value: "acordar", label: "Acordar con el vendedor" },
];
