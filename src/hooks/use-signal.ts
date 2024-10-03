import { useState, useLayoutEffect, useCallback } from "preact/hooks";

const listeners = new Map<string, Set<() => void>>();

export default function useSignal(id: string): [() => void, number] {
  const [renderCount, setRenderCount] = useState(0);

  useLayoutEffect(() => {
    const callback = () => setRenderCount((count) => count + 1);
    if (!listeners.has(id)) listeners.set(id, new Set());
    listeners.get(id)!.add(callback);
    return () => {
      const callbacks = listeners.get(id);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) listeners.delete(id);
      }
    };
  }, [id]);

  const notify = useCallback(() => {
    listeners.get(id)?.forEach((callback) => callback());
  }, [id]);

  return [notify, renderCount];
}
