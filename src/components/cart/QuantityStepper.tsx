import { useState } from "react";
import { MinusIcon, PlusIcon } from "@components/ui/Icons";

export interface QuantityStepperProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (nextValue: number) => void;
  itemName?: string;
  disabled?: boolean;
  className?: string;
}

function clampValue(val: number, min: number, max?: number): number {
  const lower = Math.max(min, val);
  return max !== undefined ? Math.min(max, lower) : lower;
}

export function QuantityStepper({
  value,
  defaultValue = 1,
  min = 1,
  max,
  step = 1,
  onChange,
  itemName,
  disabled = false,
  className = "",
}: QuantityStepperProps) {
  const [internalValue, setInternalValue] = useState<number>(() =>
    clampValue(defaultValue, min, max),
  );

  const isControlled = value !== undefined;
  const currentValue = clampValue(
    isControlled ? value : internalValue,
    min,
    max,
  );

  const updateValue = (nextRaw: number) => {
    const next = clampValue(nextRaw, min, max);
    if (!isControlled) {
      setInternalValue(next);
    }
    if (next !== currentValue) {
      onChange?.(next);
    }
  };

  const canDecrease = !disabled && currentValue > min;
  const canIncrease =
    !disabled && (max === undefined || currentValue < max);

  return (
    <div
      role="group"
      aria-label={itemName ? `Cantidad de ${itemName}` : "Cantidad"}
      className={`inline-flex items-center rounded-lg border border-roxel-border bg-roxel-surface-card shadow-card overflow-hidden ${className}`}
    >
      <button
        type="button"
        disabled={!canDecrease}
        onClick={() => updateValue(currentValue - step)}
        aria-label={
          itemName
            ? `Disminuir cantidad de ${itemName}`
            : "Disminuir cantidad"
        }
        className="roxel-control inline-flex items-center justify-center min-w-10 min-h-10 px-2.5 text-roxel-ink hover:bg-roxel-gold-400 active:bg-roxel-gold-500 disabled:hover:bg-transparent border-r border-roxel-border-subtle transition-colors touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:-2px focus-visible:outline-roxel-ink disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <MinusIcon className="w-3.5 h-3.5" />
      </button>

      <span className="min-w-12 px-3 text-center text-sm font-bold text-roxel-ink tabular-nums select-none">
        {currentValue}
      </span>

      <button
        type="button"
        disabled={!canIncrease}
        onClick={() => updateValue(currentValue + step)}
        aria-label={
          itemName
            ? `Aumentar cantidad de ${itemName}`
            : "Aumentar cantidad"
        }
        className="roxel-control inline-flex items-center justify-center min-w-10 min-h-10 px-2.5 text-roxel-ink hover:bg-roxel-gold-400 active:bg-roxel-gold-500 disabled:hover:bg-transparent border-l border-roxel-border-subtle transition-colors touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:-2px focus-visible:outline-roxel-ink disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <PlusIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
