export interface ToastNotificationProps {
  message: string;
  className?: string;
}

export function ToastNotification({
  message,
  className = "",
}: ToastNotificationProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed bottom-24 right-4 z-30 max-w-xs sm:max-w-sm ${className}`}
    >
      {message ? (
        <div className="pointer-events-auto rounded-xl bg-roxel-dark-900 text-roxel-ink-inverse border border-roxel-gold-400/50 px-4 py-2.5 text-xs sm:text-sm font-medium shadow-fab">
          {message}
        </div>
      ) : null}
    </div>
  );
}
