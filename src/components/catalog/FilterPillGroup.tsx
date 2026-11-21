export interface FilterPillOption<T extends string> {
  value: T;
  label: string;
}

export interface FilterPillGroupProps<T extends string> {
  label: string;
  options: Array<FilterPillOption<T>>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function FilterPillGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  className = "",
}: FilterPillGroupProps<T>) {
  return (
    <div className={`space-y-2 ${className}`}>
      <p className="text-xs font-bold uppercase tracking-wider text-roxel-ink-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isActive = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(opt.value)}
              className={`roxel-control inline-flex items-center justify-center min-h-8 px-3 py-1 rounded-full text-xs font-medium transition-[color,background-color,transform] duration-150 motion-safe:active:scale-95 touch-manipulation cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-ink ${
                isActive
                  ? "bg-roxel-gold-400 text-roxel-ink font-semibold ring-2 ring-roxel-ink/25"
                  : "bg-roxel-surface-subtle text-roxel-ink hover:bg-roxel-border-subtle"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
