import type { ReactNode } from "react";
import backgroundTexture from "../../assets/background_texture.webp";
import { BrandWordmark, HeroTagline } from "../ui/Typography";
import { resolveImageSrc, type ImageSource } from "../types";

export interface HeroProps {
  brand?: string;
  subtitle?: string;
  tagline?: ReactNode;
  backgroundSrc?: ImageSource;
  className?: string;
}

const DEFAULT_TAGLINE = (
  <>
    Ofrecemos perfumes de calidad a precios accesibles.
    <br className="hidden sm:inline" /> Lo que más nos importa es ofrecerles a
    nuestros clientes perfumes de calidad, accesibilidad y la transparencia en
    la compra.
  </>
);

export function Hero({
  brand = "ROXEL",
  subtitle = "ESSENCE",
  tagline = DEFAULT_TAGLINE,
  backgroundSrc = backgroundTexture,
  className = "",
}: HeroProps) {
  return (
    <section
      className={`relative overflow-hidden min-h-[calc(100svh-4rem)] flex flex-col justify-center bg-roxel-dark-950 text-roxel-ink-inverse ${className}`}
    >
      <img
        src={resolveImageSrc(backgroundSrc)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-80 pointer-events-none select-none"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-roxel-dark-950/45 pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-20 sm:py-28 flex flex-col items-center text-center gap-5">
        <BrandWordmark brand={brand} subtitle={subtitle} />
        <HeroTagline>{tagline}</HeroTagline>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-linear-to-b from-transparent via-roxel-dark-950/60 to-roxel-surface pointer-events-none"
      />
    </section>
  );
}
