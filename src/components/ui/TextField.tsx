import { useId, type InputHTMLAttributes, type Ref } from "react";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  id?: string;
  label: string;
  helperText?: string;
  error?: string;
  showRequiredMark?: boolean;
  containerClassName?: string;
  ref?: Ref<HTMLInputElement>;
}

export function TextField({
  id,
  label,
  helperText,
  error,
  showRequiredMark = false,
  required,
  type = "text",
  containerClassName = "",
  className = "",
  "aria-describedby": ariaDescribedByProp,
  ref,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? `roxel-input-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  const describedBy =
    [ariaDescribedByProp, helperId, errorId].filter(Boolean).join(" ") ||
    undefined;

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      <label
        htmlFor={inputId}
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

      <input
        ref={ref}
        id={inputId}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={`roxel-field-input roxel-control w-full min-h-12 px-3.5 py-2.5 rounded-lg bg-roxel-surface border text-base text-roxel-ink placeholder:text-roxel-ink-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-roxel-ink disabled:opacity-50 disabled:cursor-not-allowed ${
          error ? "border-roxel-danger-hover" : "border-roxel-border-input"
        } ${className}`}
        {...props}
      />

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
