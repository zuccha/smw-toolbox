type Callback<T> = (value: T) => void;

const listeners = new Map<string, Set<Callback<any>>>();

const Storage = {
  clear: (): void => {
    localStorage.clear();
    window.location.reload();
  },

  load: <T>(id: string, defaultValue: T, parse: (maybeT: unknown) => T): T => {
    try {
      const stringOrNull = localStorage.getItem(id);
      return stringOrNull === null
        ? defaultValue
        : parse(JSON.parse(stringOrNull));
    } catch {
      localStorage.removeItem(id);
      return defaultValue;
    }
  },

  save: <T>(id: string, value: T): void => {
    localStorage.setItem(id, JSON.stringify(value));
    listeners.get(id)?.forEach((callback) => callback(value));
  },

  subscribe: <T>(id: string, callback: Callback<T>): (() => void) => {
    if (!listeners.has(id)) listeners.set(id, new Set());
    listeners.get(id)!.add(callback);

    return () => {
      listeners.get(id)?.delete(callback);
      if (listeners.get(id)?.size === 0) listeners.delete(id);
    };
  },
};

export default Storage;
