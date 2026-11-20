import { formatCurrency } from "../types";

export interface CartSummaryProps {
  total: number;
  label?: string;
  shippingNote?: string;
  currencySymbol?: string;
  className?: string;
}

export function CartSummary({
  total,
  label = "TOTAL A PAGAR:",
  shippingNote = "Sin incluir el envío (acordar con el vendedor)",
  currencySymbol = "$",
  className = "",
}: CartSummaryProps) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-roxel-ink">
          {label}
        </span>
        <span className="text-xl sm:text-2xl font-extrabold tabular-nums text-roxel-ink">
          {formatCurrency(total, {
            spaceAfterSymbol: false,
            symbol: currencySymbol,
          })}
        </span>
      </div>

      {shippingNote ? (
        <p className="mt-1.5 text-right text-xs sm:text-sm text-roxel-ink-muted">
          <span className="text-roxel-gold-500 font-bold" aria-hidden="true">
            *
          </span>
          {shippingNote}
        </p>
      ) : null}
    </div>
  );
}
