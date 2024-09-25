import { useState, useLayoutEffect, useCallback } from "preact/hooks";

export default function createUseSharedState<T>(
  defaultValue: T,
): () => [T, (value: T) => void] {
  const listeners = new Set<(value: T) => void>();
  let initialValue = defaultValue;

  return function useSharedState(): [T, (value: T) => void] {
    const [value, setValue] = useState(initialValue);

    useLayoutEffect(() => {
      listeners.add(setValue);
      return () => listeners.delete(setValue);
    }, []);

    const notifyValue = useCallback((newValue: T) => {
      initialValue = newValue;
      listeners.forEach((callback) => callback(newValue));
    }, []);

    return [value, notifyValue];
  };
}
