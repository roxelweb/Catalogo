export interface ContactPhoneConfig {
  /** Dígitos para enlaces `wa.me` (sin `+`, espacios ni guiones). */
  whatsappPhone: string;
  /** Formato legible para mostrar en la interfaz (ej. `+54 1126-8577`). */
  phoneDisplay: string;
  /** Enlace directo de WhatsApp derivado de `whatsappPhone`. */
  whatsappUrl: string;
}

/**
 * Número comercial por defecto (fallback mientras se conecta con el backend).
 * Modificá este valor o reemplazá `CONTACT_CONFIG` con la respuesta del back.
 */
const DEFAULT_PHONE_DIGITS = "541124935416";

function formatArgentinaPhoneDisplay(digits: string): string {
  const clean = digits.replace(/\D/g, "");
  if (clean.startsWith("54") && clean.length === 10) {
    return `+54 ${clean.slice(2, 6)}-${clean.slice(6)}`;
  }
  return clean ? `+${clean}` : "";
}

/**
 * Construye la configuración de contacto a partir del número recibido desde el backend.
 */
export function createContactPhoneConfig(
  rawPhone: string,
  customDisplay?: string,
): ContactPhoneConfig {
  const whatsappPhone = rawPhone.replace(/\D/g, "");
  return {
    whatsappPhone,
    phoneDisplay: customDisplay ?? formatArgentinaPhoneDisplay(whatsappPhone),
    whatsappUrl: `https://wa.me/${whatsappPhone}`,
  };
}

export const CONTACT_CONFIG: ContactPhoneConfig =
  createContactPhoneConfig(DEFAULT_PHONE_DIGITS);
