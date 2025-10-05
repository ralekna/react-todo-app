import { useEffect } from "react";

/**
 * A custom hook that persists a value to localStorage and rehydrates it on mount.
 * @param key
 * @param value
 * @param setValueCallback
 */
export function usePersistence<T>(
  key: string,
  value: T,
  setValueCallback: (value: T) => void,
) {
  useEffect(() => {
    try {
      if (window.localStorage?.getItem(key)) {
        const rehydratedData = JSON.parse(
          window.localStorage.getItem(key) || "null",
        );
        if (rehydratedData !== null) {
          setValueCallback(rehydratedData);
        }
      }
    } catch (e) {
      console.error("Failed to load state from localStorage", e);
    }
  }, [key, setValueCallback]);

  useEffect(() => {
    try {
      window.localStorage?.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Failed to load state [${key}] from localStorage`, e);
    }
  }, [key, value]);

  return [] as const;
}
