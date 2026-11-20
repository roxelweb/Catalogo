import { useCallback, useRef, useSyncExternalStore } from "react";

export interface UseLocalStorageOptions<T> {
  /** Valida o normaliza el valor parseado desde localStorage ante esquemas corruptos o antiguos. */
  sanitize?: (rawParsed: unknown, fallback: T) => T;
}

// Caché en memoria por clave para mantener referencias estables entre snapshots de useSyncExternalStore
const memoryCache = new Map<
  string,
  { raw: string; parsed: unknown; sanitize?: unknown }
>();

// Respaldo en memoria cuando localStorage lanza errores (cuota llena o modo privado estricto)
const memoryFallback = new Map<string, unknown>();

function getSnapshot<T>(
  key: string,
  fallback: T,
  sanitize?: (rawParsed: unknown, fallback: T) => T,
): T {
  if (typeof window === "undefined") return fallback;

  if (memoryFallback.has(key)) {
    return memoryFallback.get(key) as T;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return fallback;
    }

    const cached = memoryCache.get(key);
    if (cached && cached.raw === raw && cached.sanitize === sanitize) {
      return cached.parsed as T;
    }

    const parsedRaw: unknown = JSON.parse(raw);
    let value: T;

    if (sanitize) {
      value = sanitize(parsedRaw, fallback);
    } else if (Array.isArray(fallback) && !Array.isArray(parsedRaw)) {
      value = fallback;
    } else {
      value = parsedRaw as T;
    }

    memoryCache.set(key, { raw, parsed: value, sanitize });
    return value;
  } catch {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignorar errores de cuota/modo privado al limpiar una entrada corrupta
    }
    memoryCache.delete(key);
    return fallback;
  }
}

/**
 * Hook de sincronización reactiva con `localStorage` usando `useSyncExternalStore`.
 * - Sincroniza entre islas independientes de Astro en la misma ventana y entre pestañas.
 * - Soporta validación opcional (`options.sanitize`) y método `remove` tipado.
 * - Mantiene un respaldo en memoria si `localStorage` no está disponible o supera la cuota.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options?: UseLocalStorageOptions<T>,
) {
  const initialValueRef = useRef<T>(initialValue);
  const sanitizeRef = useRef(options?.sanitize);
  sanitizeRef.current = options?.sanitize;

  const subscribe = useCallback(
    (callback: () => void) => {
      if (typeof window === "undefined") return () => {};

      const handleStorage = (e: StorageEvent) => {
        if (e.key === null) {
          memoryCache.clear();
          memoryFallback.clear();
          callback();
        } else if (e.key === key) {
          memoryCache.delete(key);
          memoryFallback.delete(key);
          callback();
        }
      };

      const handleCustom = () => {
        callback();
      };

      window.addEventListener("storage", handleStorage);
      window.addEventListener(`local-storage:${key}`, handleCustom);

      return () => {
        window.removeEventListener("storage", handleStorage);
        window.removeEventListener(`local-storage:${key}`, handleCustom);
      };
    },
    [key],
  );

  const readSnapshot = useCallback(
    () => getSnapshot<T>(key, initialValueRef.current, sanitizeRef.current),
    [key],
  );
  const getServerSnapshot = useCallback(() => initialValueRef.current, []);

  const value = useSyncExternalStore(subscribe, readSnapshot, getServerSnapshot);

  const remove = useCallback(() => {
    if (typeof window === "undefined") return;

    memoryCache.delete(key);
    memoryFallback.delete(key);

    try {
      window.localStorage.removeItem(key);
    } catch {
      // Ignorar si localStorage está bloqueado en este entorno
    }

    window.dispatchEvent(new CustomEvent(`local-storage:${key}`));
  }, [key]);

  const set = useCallback(
    (updater: T | ((prev: T) => T)) => {
      if (typeof window === "undefined") return;

      const fallback = initialValueRef.current;
      const sanitize = sanitizeRef.current;
      const current = getSnapshot<T>(key, fallback, sanitize);
      const next =
        typeof updater === "function"
          ? (updater as (prev: T) => T)(current)
          : updater;

      if (next === null || next === undefined) {
        remove();
        return;
      }

      const validatedNext = sanitize ? sanitize(next, fallback) : next;

      try {
        const serialized = JSON.stringify(validatedNext);
        window.localStorage.setItem(key, serialized);
        memoryFallback.delete(key);
        memoryCache.set(key, {
          raw: serialized,
          parsed: validatedNext,
          sanitize,
        });
      } catch (err) {
        memoryCache.delete(key);
        memoryFallback.set(key, validatedNext);
        console.error(`Error guardando en localStorage [${key}]:`, err);
      }

      window.dispatchEvent(new CustomEvent(`local-storage:${key}`));
    },
    [key, remove],
  );

  return [value, set, remove] as const;
}
