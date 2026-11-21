import type { VolumeVariant } from "@components/types";

export interface VolumeBadgeProps {
  label: string;
  variant?: VolumeVariant;
  selected?: boolean;
  onSelect?: () => void;
  className?: string;
}

export function VolumeBadge({
  label,
  variant = "dark",
  selected = false,
  onSelect,
  className = "",
}: VolumeBadgeProps) {
  const isGold = onSelect ? selected : variant === "gold";

  const colorClasses = isGold
    ? "bg-roxel-gold-400 text-roxel-ink font-semibold"
    : "bg-roxel-dark-900 text-roxel-ink-inverse font-medium";

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={`roxel-control inline-flex items-center justify-center min-h-6 min-w-6 px-2.5 py-0.5 rounded-full text-xs leading-tight transition-[color,background-color,transform] duration-150 motion-safe:active:scale-95 touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-ink ${colorClasses} ${className}`}
      >
        {label}
      </button>
    );
  }

  return (
    <span
      className={`inline-flex items-center justify-center min-h-6 px-2.5 py-0.5 rounded-full text-xs leading-tight ${colorClasses} ${className}`}
    >
      {label}
    </span>
  );
}
