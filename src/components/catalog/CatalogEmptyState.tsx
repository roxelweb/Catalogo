import { Button } from "@components/ui/Button";

export interface CatalogEmptyStateProps {
  message?: string;
  actionLabel?: string;
  onReset: () => void;
  className?: string;
}

export function CatalogEmptyState({
  message = "No encontramos perfumes que coincidan con los filtros seleccionados.",
  actionLabel = "Ver todos los productos",
  onReset,
  className = "",
}: CatalogEmptyStateProps) {
  return (
    <div
      className={`bg-roxel-surface-card border border-roxel-border-subtle rounded-xl p-10 text-center space-y-4 shadow-card ${className}`}
    >
      <p className="text-sm sm:text-base text-roxel-ink-muted">{message}</p>
      <Button variant="dark" pill onClick={onReset}>
        {actionLabel}
      </Button>
    </div>
  );
}
