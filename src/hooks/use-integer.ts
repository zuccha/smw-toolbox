import { useLayoutEffect, useState } from "preact/hooks";
import {
  $Integer,
  Integer,
  IntegerContext,
  IntegerFromValue,
  IntegerSchema,
} from "../models/integer";
import { Methods } from "../models/method";
import useStore from "./use-store";
import { useSetter } from "./use-method";

export default function useInteger(
  obj: Integer,
  setObj: (obj: Integer) => void,
  context: IntegerContext,
): [Integer, Methods<Integer, IntegerContext, typeof $Integer>] {
  useLayoutEffect(() => {
    setObj(IntegerFromValue(obj.valueRaw, context));
  }, IntegerFromValue.deps(undefined, context));

  const methodContext = { obj, setObj, context };
  const setValue = useSetter($Integer.setValue, methodContext);

  return [obj, { setValue }];
}

export function useIntegerState(
  initialValue: Integer,
  context: IntegerContext,
): [Integer, Methods<Integer, IntegerContext, typeof $Integer>] {
  const [obj, setObj] = useState(initialValue);
  return useInteger(obj, setObj, context);
}

export function useIntegerStore(
  id: string,
  initialValue: Integer,
  context: IntegerContext,
): [Integer, Methods<Integer, IntegerContext, typeof $Integer>] {
  const [obj, setObj] = useStore(id, initialValue, IntegerSchema.parse);
  return useInteger(obj, setObj, context);
}
