import { useCallback, useMemo, useRef } from "preact/hooks";
import { Integer, IntegerEncoding, IntegerUnit } from "../models/integer";
import {
  $IntegerString,
  IntegerString,
  IntegerStringContext,
  IntegerStringFromInteger,
  IntegerStringToInteger,
  IntegerStringTypingDirection,
} from "../models/integer-string";
import { Methods } from "../models/method";
import { useSetter } from "./use-method";

export const defaultIntegerStringContext = {
  encoding: IntegerEncoding.Bin,
  isSigned: false,
  shouldAllowOutOfBoundsCursor: false,
  shouldMoveAfterTyping: true,
  typingDirection: IntegerStringTypingDirection.Right,
  unit: IntegerUnit.Byte,
};

export function useIntegerAsString(
  integer: Integer,
  onChange: (integer: Integer) => void,
  partialContext: Partial<IntegerStringContext> = {},
): [
  IntegerString,
  Methods<IntegerString, IntegerStringContext, typeof $IntegerString>,
] {
  const context = { ...defaultIntegerStringContext, ...partialContext };
  const indexRef = useRef(0);

  const obj = useMemo(() => {
    return {
      ...IntegerStringFromInteger(integer, context),
      index: indexRef.current,
    };
  }, [integer, ...IntegerStringFromInteger.deps(undefined, context)]);

  const setObj = useCallback(
    (nextObj: IntegerString) => {
      const nextInteger = IntegerStringToInteger(nextObj, context);
      if (nextInteger) {
        onChange(nextInteger);
        indexRef.current = nextObj.index;
      }
    },
    [onChange, ...IntegerStringToInteger.deps(undefined, context)],
  );

  const methodContext = { obj, setObj, context };
  const clear = useSetter($IntegerString.clear, methodContext);
  const deleteDigit = useSetter($IntegerString.deleteDigit, methodContext);
  const insertDigit = useSetter($IntegerString.insertDigit, methodContext);
  const jumpTo = useSetter($IntegerString.jumpTo, methodContext);
  const moveLeft = useSetter($IntegerString.moveLeft, methodContext);
  const moveRight = useSetter($IntegerString.moveRight, methodContext);
  const negate = useSetter($IntegerString.negate, methodContext);
  const removeDigit = useSetter($IntegerString.removeDigit, methodContext);
  const replaceDigit = useSetter($IntegerString.replaceDigit, methodContext);
  const shiftDigit = useSetter($IntegerString.shiftDigit, methodContext);
  const shiftLeft = useSetter($IntegerString.shiftLeft, methodContext);
  const shiftRight = useSetter($IntegerString.shiftRight, methodContext);

  return [
    obj,
    {
      clear,
      deleteDigit,
      insertDigit,
      jumpTo,
      moveLeft,
      moveRight,
      negate,
      removeDigit,
      replaceDigit,
      shiftDigit,
      shiftLeft,
      shiftRight,
    },
  ];
}
