import { useId, type Ref, type SelectHTMLAttributes } from "react";
import { CaretDownIcon } from "./Icons";
import type { SelectOption } from "@components/types";

export interface SelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  id?: string;
  label: string;
  options: SelectOption[];
  placeholder?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  showRequiredMark?: boolean;
  containerClassName?: string;
  ref?: Ref<HTMLSelectElement>;
}

export function SelectField({
  id,
  label,
  options,
  placeholder,
  helperText,
  error,
  fullWidth = false,
  showRequiredMark = false,
  required,
  value,
  defaultValue,
  containerClassName = "",
  className = "",
  "aria-describedby": ariaDescribedByProp,
  ref,
  ...props
}: SelectFieldProps) {
  const generatedId = useId();
  const selectId = id ?? `roxel-select-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;

  const describedBy =
    [ariaDescribedByProp, helperId, errorId].filter(Boolean).join(" ") ||
    undefined;

  const resolvedDefaultValue =
    value === undefined ? (defaultValue ?? (placeholder ? "" : undefined)) : undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label
        htmlFor={selectId}
        className="text-sm sm:text-base font-bold text-roxel-ink"
      >
        {label}
        {required && showRequiredMark ? (
          <span className="ml-1 text-roxel-danger-hover" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {helperText ? (
        <span id={helperId} className="text-xs text-roxel-ink-muted">
          {helperText}
        </span>
      ) : null}

      <div
        className={`relative ${
          fullWidth ? "w-full" : "w-full sm:w-auto sm:min-w-64"
        }`}
      >
        <select
          ref={ref}
          id={selectId}
          required={required}
          value={value}
          defaultValue={resolvedDefaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`roxel-select roxel-field-input roxel-control appearance-none w-full min-h-12 pl-3.5 pr-14 py-2.5 rounded-lg bg-roxel-surface border text-base text-roxel-ink cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-ink disabled:opacity-50 disabled:cursor-not-allowed ${
            error ? "border-roxel-danger-hover" : "border-roxel-border-input"
          } ${className}`}
          {...props}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-[1px] right-[1px] w-11 flex items-center justify-center rounded-r-[7px] bg-roxel-gold-400 border-l border-roxel-border-input text-roxel-ink"
        >
          <CaretDownIcon className="w-4 h-4" />
        </span>
      </div>

      {error ? (
        <p
          id={errorId}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-roxel-danger-hover"
        >
          <span
            aria-hidden="true"
            className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-roxel-danger-hover text-roxel-ink-inverse text-[10px] font-bold shrink-0"
          >
            !
          </span>
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}
