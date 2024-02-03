import { StateUpdater, useCallback, useEffect, useState } from "preact/hooks";
import { z } from "zod";
import Store from "../store/store";

const isUpdater = <T>(
  maybeSettingUpdater: unknown,
): maybeSettingUpdater is (prevSetting: T) => void => {
  return typeof maybeSettingUpdater === "function";
};

export default function useStore<T>(
  id: string,
  initialValue: T,
  parse: (maybeT: unknown) => T,
): [T, StateUpdater<T>] {
  const [value, setValue] = useState(() => Store.load(id, initialValue, parse));

  useEffect(() => {
    setValue(Store.load(id, initialValue, parse));
    const callback = (nextValue: T) => setValue(nextValue);
    return Store.subscribe(id, callback);
  }, [id, initialValue, parse]);

  const saveValue = useCallback(
    (nextValueOrUpdateValue: T | ((prevSetting: T) => void)) => {
      Store.save(
        id,
        isUpdater(nextValueOrUpdateValue)
          ? nextValueOrUpdateValue(Store.load(id, initialValue, parse))
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
): [boolean, StateUpdater<boolean>] {
  return useStore(id, initialValue, parseBoolean);
}

const parseNumber = z.number().parse;
export function useStoreNumber(
  id: string,
  initialValue: number,
): [number, StateUpdater<number>] {
  return useStore(id, initialValue, parseNumber);
}

const parseString = z.string().parse;
export function useStoreString(
  id: string,
  initialValue: string,
): [string, StateUpdater<string>] {
  return useStore(id, initialValue, parseString);
}
