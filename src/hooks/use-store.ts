import { StateUpdater, useCallback, useEffect, useState } from "preact/hooks";
import { z } from "zod";
import Storage from "../store/storage";

const isUpdater = <T>(
  maybeSettingUpdater: unknown,
): maybeSettingUpdater is (prevSetting: T) => void => {
  return typeof maybeSettingUpdater === "function";
};

export default function useStore<T>(
  id: string,
  initialValue: T,
  parse: (maybeT: unknown) => T,
): [T, (prev: StateUpdater<T>) => void] {
  const [value, setValue] = useState(() =>
    Storage.load(id, initialValue, parse),
  );

  useEffect(() => {
    setValue(Storage.load(id, initialValue, parse));
    const callback = (nextValue: T) => setValue(nextValue);
    return Storage.subscribe(id, callback);
  }, [id, initialValue, parse]);

  const saveValue = useCallback(
    (nextValueOrUpdateValue: T | ((prevSetting: T) => void)) => {
      Storage.save(
        id,
        isUpdater(nextValueOrUpdateValue)
          ? nextValueOrUpdateValue(Storage.load(id, initialValue, parse))
          : nextValueOrUpdateValue,
      );
    },
    [id, initialValue, parse],
  );

  return [value, saveValue];
}

const parseBoolean = z.boolean().parse;
export function useStoreBoolean(
  id: string,
  initialValue: boolean,
): [boolean, (perv: StateUpdater<boolean>) => void] {
  return useStore(id, initialValue, parseBoolean);
}

const parseNumber = z.number().parse;
export function useStoreNumber(
  id: string,
  initialValue: number,
): [number, (perv: StateUpdater<number>) => void] {
  return useStore(id, initialValue, parseNumber);
}

const parseString = z.string().parse;
export function useStoreString(
  id: string,
  initialValue: string,
): [string, (perv: StateUpdater<string>) => void] {
  return useStore(id, initialValue, parseString);
}
