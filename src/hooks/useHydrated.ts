import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Devuelve `false` durante SSR y la hidratación inicial, y `true` en el cliente.
 * Usa `useSyncExternalStore` para evitar re-renders innecesarios con `useEffect` + `setState`.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}
