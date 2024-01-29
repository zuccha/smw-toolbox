import { StateUpdater, useCallback, useEffect, useState } from "preact/hooks";

type Callback = () => void;
const listeners = new Map<string, Set<Callback>>();

const Storage = {
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
  },
};

const isSettingUpdater = <T>(
  maybeSettingUpdater: unknown
): maybeSettingUpdater is (prevSetting: T) => void => {
  return typeof maybeSettingUpdater === "function";
};

export default function useSetting<T>(
  id: string,
  initialState: T,
  parse: (maybeT: unknown) => T
): [T, StateUpdater<T>] {
  const [setting, setSetting] = useState(() =>
    Storage.load(id, initialState, parse)
  );

  useEffect(() => {
    if (!listeners.has(id)) listeners.set(id, new Set());
    const callback = () => setSetting(Storage.load(id, initialState, parse));
    listeners.get(id)!.add(callback);
    return () => {
      listeners.get(id)?.delete(callback);
      if (listeners.get(id)?.size === 0) listeners.delete(id);
    };
  }, [id, initialState, parse]);

  const saveSettingAndNotify = useCallback(
    (nextSettingOrUpdateSetting: T | ((prevSetting: T) => void)) => {
      const nextSetting = isSettingUpdater(nextSettingOrUpdateSetting)
        ? nextSettingOrUpdateSetting(Storage.load(id, initialState, parse))
        : nextSettingOrUpdateSetting;

      Storage.save(id, nextSetting);
      listeners.get(id)?.forEach((callback) => callback());
    },
    [id]
  );

  return [setting, saveSettingAndNotify];
}
