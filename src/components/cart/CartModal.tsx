import { useEffect, useId, useRef } from "react";
import { CartPanel, type CartPanelProps } from "./CartPanel";

export interface CartModalProps extends CartPanelProps {
  open: boolean;
  onClose: () => void;
  placement?: "center" | "right";
}

export function CartModal({
  open,
  onClose,
  placement = "right",
  titleId,
  className = "",
  ...panelProps
}: CartModalProps) {
  const generatedId = useId();
  const resolvedTitleId =
    titleId ??
    `roxel-cart-modal-title-${generatedId.replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const dialogRef = useRef<HTMLDialogElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onCloseRef.current();
    };

    dialog.addEventListener("close", handleClose);

    // Fallback for browsers lacking <dialog closedby="any">
    let removeBackdropListeners: (() => void) | undefined;
    if (
      typeof HTMLDialogElement !== "undefined" &&
      !("closedBy" in HTMLDialogElement.prototype)
    ) {
      let pressedOutside = false;
      const isOutside = (e: PointerEvent) => {
        const rect = dialog.getBoundingClientRect();
        return (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        );
      };

      const handlePointerDown = (e: PointerEvent) => {
        pressedOutside = isOutside(e);
      };
      const handlePointerUp = (e: PointerEvent) => {
        if (pressedOutside && isOutside(e)) {
          dialog.close();
        }
        pressedOutside = false;
      };

      dialog.addEventListener("pointerdown", handlePointerDown);
      dialog.addEventListener("pointerup", handlePointerUp);
      removeBackdropListeners = () => {
        dialog.removeEventListener("pointerdown", handlePointerDown);
        dialog.removeEventListener("pointerup", handlePointerUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
      removeBackdropListeners?.();
    };
  }, []);

  const handleCloseRequest = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      dialog.close();
    } else {
      onClose();
    }
  };

  const placementClasses =
    placement === "right"
      ? "m-0 ml-auto h-dvh max-h-dvh w-full max-w-xl bg-roxel-surface-card text-roxel-ink p-0 shadow-card-hover border-0 sm:border-l sm:border-roxel-border overflow-y-auto"
      : "m-auto w-[calc(100%-2rem)] max-w-xl max-h-[90dvh] rounded-2xl bg-roxel-surface-card text-roxel-ink p-0 shadow-card-hover border border-roxel-border overflow-y-auto";

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={resolvedTitleId}
      {...({ closedby: "any" } as Record<string, string>)}
      className={`roxel-dialog ${placementClasses} ${className}`}
    >
      <CartPanel
        {...panelProps}
        titleId={resolvedTitleId}
        onClose={handleCloseRequest}
        className="min-h-full"
      />
    </dialog>
  );
}
