import { useEffect, useId, useRef } from "react";
import { CartPanel, type CartPanelProps } from "./CartPanel";

export interface CartModalProps extends CartPanelProps {
  open: boolean;
  onClose: () => void;
  placement?: "center" | "right";
}

let supportsDisplayTransition: boolean | undefined;

function canTransitionDisplay(): boolean {
  if (supportsDisplayTransition !== undefined) return supportsDisplayTransition;
  if (
    typeof window === "undefined" ||
    !window.CSS?.supports?.("transition-behavior", "allow-discrete") ||
    !document.body
  ) {
    return false;
  }
  const probe = document.createElement("div");
  probe.style.cssText =
    "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  getComputedStyle(probe).display;
  probe.style.display = "none";
  supportsDisplayTransition = getComputedStyle(probe).display === "block";
  probe.remove();
  return supportsDisplayTransition;
}

function supportsTopLayerExit(): boolean {
  return (
    typeof window !== "undefined" &&
    Boolean(window.CSS?.supports?.("overlay", "auto")) &&
    canTransitionDisplay()
  );
}

async function closeTopLayer(dialog: HTMLDialogElement): Promise<void> {
  if (!dialog.open) return;
  if (!supportsTopLayerExit()) {
    if (dialog.hasAttribute("data-closing")) return;
    dialog.setAttribute("data-closing", "");
    const animations = dialog.getAnimations({ subtree: true });
    if (animations.length > 0) {
      await Promise.race([
        Promise.allSettled(animations.map((a) => a.finished)),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);
    }
    if (!dialog.hasAttribute("data-closing")) return;
    dialog.removeAttribute("data-closing");
  }
  if (dialog.open) {
    dialog.close();
  }
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

    if (open) {
      dialog.removeAttribute("data-closing");
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      void closeTopLayer(dialog);
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.removeAttribute("data-closing");
      dialog.returnValue = "";
      onCloseRef.current();
    };

    const handleCancel = (event: Event) => {
      event.preventDefault();
      void closeTopLayer(dialog);
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);

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
          void closeTopLayer(dialog);
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
      dialog.removeEventListener("cancel", handleCancel);
      removeBackdropListeners?.();
    };
  }, []);

  const handleCloseRequest = () => {
    const dialog = dialogRef.current;
    if (dialog?.open) {
      void closeTopLayer(dialog);
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
      data-placement={placement}
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
