import type { ReactNode } from "react";
import backgroundTextureDesktop from "@assets/background_texture_desktop.webp";
import backgroundTextureMobile from "@assets/background_texture_mobile.png";
import heroLogo from "@assets/Logotipo Roxel Essence Elegante.png";
import { HeroTagline } from "@components/ui/Typography";
import { resolveImageSrc, type ImageSource } from "@components/types";

export interface HeroProps {
  brand?: string;
  subtitle?: string;
  logoSrc?: ImageSource;
  logoAlt?: string;
  tagline?: ReactNode;
  backgroundSrc?: ImageSource;
  mobileBackgroundSrc?: ImageSource;
  className?: string;
}

const DEFAULT_TAGLINE = (
  <>
    Descubrí perfumes árabes, decants, testers y extractos de calidad a precios
    accesibles.
    <br className="hidden sm:inline" /> Nos importa ofrecerte variedad,
    cercanía y transparencia en cada compra.
  </>
);

export function Hero({
  brand = "ROXEL",
  subtitle = "ESSENCE",
  logoSrc = heroLogo,
  logoAlt,
  tagline = DEFAULT_TAGLINE,
  backgroundSrc = backgroundTextureDesktop,
  mobileBackgroundSrc = backgroundTextureMobile,
  className = "",
}: HeroProps) {
  const resolvedLogoAlt =
    logoAlt ??
    (brand === "ROXEL" && subtitle === "ESSENCE"
      ? "Roxel Essence — Perfumes árabes, decants, testers y extractos"
      : [brand, subtitle].filter(Boolean).join(" ") || "Roxel Essence");

  return (
    <section
      className={`relative overflow-hidden min-h-[calc(100svh-4rem)] flex flex-col justify-center bg-roxel-dark-950 text-roxel-ink-inverse ${className}`}
    >
      <picture>
        <source
          media="(min-width: 640px)"
          srcSet={resolveImageSrc(backgroundSrc)}
        />
        <img
          src={resolveImageSrc(mobileBackgroundSrc)}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none select-none"
        />
      </picture>

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-roxel-dark-950/20 pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center text-center gap-5">
        <h1 className="m-0 roxel-hero-logo">
          <img
            src={resolveImageSrc(logoSrc)}
            alt={resolvedLogoAlt}
            width={2109}
            height={746}
            decoding="async"
            fetchPriority="high"
            draggable={false}
            className="w-72 sm:w-96 md:w-[28rem] max-w-full h-auto object-contain select-none"
          />
        </h1>
        <HeroTagline className="roxel-hero-tagline">{tagline}</HeroTagline>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-linear-to-b from-transparent via-roxel-dark-950/60 to-roxel-surface pointer-events-none"
      />
    </section>
  );
}
