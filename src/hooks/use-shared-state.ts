import { useState, useLayoutEffect, useCallback } from "preact/hooks";

export default function createUseSharedState<T>(
  defaultValue: T,
): () => [T, (value: T) => void] {
  const listeners = new Set<(value: T) => void>();

  return function useSharedState(): [T, (value: T) => void] {
    const [value, setValue] = useState(defaultValue);

    useLayoutEffect(() => {
      listeners.add(setValue);
      return () => listeners.delete(setValue);
    }, []);

    const notifyValue = useCallback((newValue: T) => {
      listeners.forEach((callback) => callback(newValue));
    }, []);

    return [value, notifyValue];
  };
}
