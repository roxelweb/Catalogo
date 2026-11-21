import { useRef, useState, type FormEvent } from "react";
import { SelectField } from "@components/ui/SelectField";
import { TextField } from "@components/ui/TextField";
import { WhatsAppCheckoutButton } from "./WhatsAppCheckoutButton";
import type { SelectOption } from "@components/types";

export interface CartCheckoutFormValues {
  fullName: string;
  deliveryMethod: string;
}

export interface CartCheckoutFormProps {
  labelledBy?: string;
  deliveryOptions: SelectOption[];
  meetingPoints?: string[];
  nameLabel?: string;
  namePlaceholder?: string;
  deliveryLabel?: string;
  deliveryPlaceholder?: string;
  checkoutLabel?: string;
  disabled?: boolean;
  onSubmit: (values: CartCheckoutFormValues) => void;
  className?: string;
}

interface FormErrors {
  fullName?: string;
  deliveryMethod?: string;
}

const validateFullName = (value: string) =>
  value.trim().length > 0 ? undefined : "Ingresá tu nombre completo.";

const validateDeliveryMethod = (value: string) =>
  value.trim().length > 0 ? undefined : "Seleccioná un método de entrega.";

export function CartCheckoutForm({
  labelledBy,
  deliveryOptions,
  meetingPoints,
  nameLabel = "Nombre completo",
  namePlaceholder = "Ingrese su nombre",
  deliveryLabel = "Método de entrega",
  deliveryPlaceholder = "Seleccione una opción",
  checkoutLabel = "Pagar por WhatsApp",
  disabled = false,
  onSubmit,
  className = "",
}: CartCheckoutFormProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const deliverySelectRef = useRef<HTMLSelectElement>(null);
  const editedRef = useRef<{ fullName: boolean; deliveryMethod: boolean }>({
    fullName: false,
    deliveryMethod: false,
  });

  const [fullName, setFullName] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleNameChange = (value: string) => {
    setFullName(value);
    editedRef.current.fullName = true;
    if (errors.fullName && !validateFullName(value)) {
      setErrors((prev) => ({ ...prev, fullName: undefined }));
    }
  };

  const handleNameBlur = () => {
    if (!editedRef.current.fullName) return;
    setErrors((prev) => ({ ...prev, fullName: validateFullName(fullName) }));
  };

  const handleDeliveryChange = (value: string) => {
    setDeliveryMethod(value);
    editedRef.current.deliveryMethod = true;
    if (errors.deliveryMethod && !validateDeliveryMethod(value)) {
      setErrors((prev) => ({ ...prev, deliveryMethod: undefined }));
    }
  };

  const handleDeliveryBlur = () => {
    if (!editedRef.current.deliveryMethod) return;
    setErrors((prev) => ({
      ...prev,
      deliveryMethod: validateDeliveryMethod(deliveryMethod),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabled) return;

    const nameError = validateFullName(fullName);
    const deliveryError = validateDeliveryMethod(deliveryMethod);

    if (nameError || deliveryError) {
      setErrors({ fullName: nameError, deliveryMethod: deliveryError });
      if (nameError) {
        nameInputRef.current?.focus();
      } else {
        deliverySelectRef.current?.focus();
      }
      return;
    }

    setErrors({});
    onSubmit({
      fullName: fullName.trim(),
      deliveryMethod,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby={labelledBy}
      noValidate
      className={`mt-6 space-y-5 ${className}`}
    >
      <TextField
        ref={nameInputRef}
        label={nameLabel}
        name="fullName"
        placeholder={namePlaceholder}
        autoComplete="name"
        enterKeyHint="next"
        required
        value={fullName}
        error={errors.fullName}
        onChange={(e) => handleNameChange(e.target.value)}
        onBlur={handleNameBlur}
        containerClassName="max-w-sm"
      />

      <SelectField
        ref={deliverySelectRef}
        label={deliveryLabel}
        name="deliveryMethod"
        placeholder={deliveryPlaceholder}
        options={deliveryOptions}
        helperText={
          meetingPoints && meetingPoints.length > 0
            ? `Puntos de encuentro: ${meetingPoints.join(" · ")}`
            : undefined
        }
        required
        value={deliveryMethod}
        error={errors.deliveryMethod}
        onChange={(e) => handleDeliveryChange(e.target.value)}
        onBlur={handleDeliveryBlur}
      />

      <div className="pt-2">
        <WhatsAppCheckoutButton
          type="submit"
          label={checkoutLabel}
          disabled={disabled}
        />
      </div>
    </form>
  );
}
