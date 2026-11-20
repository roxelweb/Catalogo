import type { ReactNode } from "react";

export interface BrandWordmarkProps {
  brand?: string;
  subtitle?: string;
  as?: "h1" | "h2" | "p" | "div";
  className?: string;
}

export function BrandWordmark({
  brand = "ROXEL",
  subtitle = "ESSENCE",
  as: Component = "h1",
  className = "",
}: BrandWordmarkProps) {
  return (
    <Component className={`inline-flex flex-col items-center select-none ${className}`}>
      <span className="font-display text-5xl sm:text-6xl md:text-7xl font-normal tracking-[0.14em] leading-none text-roxel-ink-inverse uppercase">
        {brand}
      </span>
      {subtitle ? (
        <span className="self-end mt-1.5 mr-1 text-xs sm:text-sm font-medium tracking-[0.32em] text-roxel-gold-metallic uppercase">
          {subtitle}
        </span>
      ) : null}
    </Component>
  );
}

export interface HeroTaglineProps {
  children: ReactNode;
  className?: string;
}

export function HeroTagline({ children, className = "" }: HeroTaglineProps) {
  return (
    <p
      className={`text-center text-sm sm:text-base leading-relaxed text-roxel-ink-inverse-muted max-w-2xl mx-auto ${className}`}
    >
      {children}
    </p>
  );
}

export interface SectionTitleProps {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}

export function SectionTitle({
  children,
  as: Component = "h2",
  id,
  className = "",
}: SectionTitleProps) {
  return (
    <Component
      id={id}
      className={`text-center text-2xl sm:text-3xl font-bold tracking-tight text-roxel-ink ${className}`}
    >
      {children}
    </Component>
  );
}

export interface CategoryTitleProps {
  children: ReactNode;
  as?: "h2" | "h3" | "h4";
  id?: string;
  className?: string;
}

export function CategoryTitle({
  children,
  as: Component = "h3",
  id,
  className = "",
}: CategoryTitleProps) {
  return (
    <Component
      id={id}
      className={`text-left text-lg sm:text-xl font-bold text-roxel-ink ${className}`}
    >
      {children}
    </Component>
  );
}

export interface ProductTitleProps {
  brand: string;
  name: string;
  as?: "h3" | "h4" | "p";
  className?: string;
}

export function ProductTitle({
  brand,
  name,
  as: Component = "h4",
  className = "",
}: ProductTitleProps) {
  return (
    <Component
      className={`text-sm sm:text-base font-bold leading-snug text-roxel-ink ${className}`}
    >
      {brand} • {name}
    </Component>
  );
}

export interface ProductDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function ProductDescription({
  children,
  className = "",
}: ProductDescriptionProps) {
  return (
    <p className={`text-xs sm:text-sm text-roxel-ink-muted leading-snug ${className}`}>
      {children}
    </p>
  );
}

export interface SectionDividerProps {
  className?: string;
}

export function SectionDivider({ className = "" }: SectionDividerProps) {
  return (
    <hr
      className={`h-[2.5px] w-full rounded-full border-0 bg-linear-to-r from-roxel-gold-400/0 via-roxel-gold-400 to-roxel-gold-700/0 forced-colors:h-0 forced-colors:border-t forced-colors:border-[CanvasText] my-8 ${className}`}
    />
  );
}
