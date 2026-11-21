import type { SocialLink } from "@components/types";
import { CONTACT_CONFIG } from "./contact";

export const SITE_CONFIG = {
  name: "Roxel Essence",
  defaultTitle: "Roxel Essence | Perfumes Árabes, Decants, Testers y Extractos",
  defaultDescription:
    "Perfumes árabes, decants, testers y extractos en Roxel Essence: Lattafa, Armaf, Afnan, Rayhaan y más. Envíos a CABA, GBA y todo el país. Pedí por WhatsApp.",
  lang: "es-AR",
  ogLocale: "es_AR",
  countryCode: "AR",
  countryName: "Argentina",
  currency: "ARS",
  themeColor: "#000000",
  ogImage: "/og-image.jpg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt:
    "Roxel Essence — Catálogo de perfumes árabes, decants, testers y extractos",
  whatsappPhone: CONTACT_CONFIG.whatsappPhone,
  phoneDisplay: CONTACT_CONFIG.phoneDisplay,
  whatsappUrl: CONTACT_CONFIG.whatsappUrl,
  schedule: "Lunes a viernes de 9 a 20hs",
  openingHours: {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "20:00",
  },
  socialLinks: [
    { platform: "tiktok", href: "https://www.tiktok.com", label: "TikTok" },
    {
      platform: "instagram",
      href: "https://www.instagram.com",
      label: "Instagram",
    },
  ] satisfies SocialLink[],
} as const;

/**
 * Devuelve únicamente enlaces sociales que apuntan a un perfil específico
 * (excluye URLs raíz genéricas como https://www.instagram.com/ hasta que se configure el perfil real).
 */
export function getVerifiedSocialProfileUrls(
  links: readonly SocialLink[],
): string[] {
  const verified: string[] = [];

  for (const link of links) {
    try {
      const parsed = new URL(link.href);
      if (parsed.pathname && parsed.pathname !== "/") {
        verified.push(parsed.href);
      }
    } catch {
      // Ignore malformed URLs
    }
  }

  return verified;
}
