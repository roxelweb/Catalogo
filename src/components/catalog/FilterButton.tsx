import { Button, type ButtonProps } from "@components/ui/Button";
import { FilterIcon } from "@components/ui/Icons";

export interface FilterButtonProps
  extends Omit<ButtonProps, "variant" | "pill" | "leftIcon" | "children"> {
  label?: string;
  activeCount?: number;
  isOpen?: boolean;
}

export function FilterButton({
  label = "Filtrar",
  activeCount,
  isOpen,
  className = "",
  ...props
}: FilterButtonProps) {
  return (
    <Button
      variant="dark"
      size="sm"
      pill
      aria-expanded={isOpen}
      leftIcon={<FilterIcon className="w-3.5 h-3.5 shrink-0" />}
      className={`px-4 py-2 text-xs sm:text-sm ${className}`}
      {...props}
    >
      <span>{label}</span>
      {typeof activeCount === "number" && activeCount > 0 ? (
        <span className="ml-0.5 inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full bg-roxel-gold-400 text-roxel-ink text-[11px] font-bold leading-none">
          {activeCount}
        </span>
      ) : null}
    </Button>
  );
}
