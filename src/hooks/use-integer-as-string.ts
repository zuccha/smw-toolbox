import { useCallback, useLayoutEffect, useMemo, useRef } from "preact/hooks";
import {
  Integer,
  IntegerEncoding,
  IntegerLength,
  IntegerUnit,
} from "../models/integer";
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

function getInitialIndex(
  encoding: IntegerEncoding,
  unit: IntegerUnit,
  typingDirection: IntegerStringTypingDirection,
): number {
  return typingDirection === IntegerStringTypingDirection.Right
    ? 0
    : IntegerLength[unit][encoding] - 1;
}

export function useIntegerAsString(
  integer: Integer,
  onChange: (integer: Integer) => void,
  partialContext: Partial<IntegerStringContext> = {},
): [
  IntegerString,
  Methods<IntegerString, IntegerStringContext, typeof $IntegerString>,
] {
  const context = { ...defaultIntegerStringContext, ...partialContext };
  const { encoding, unit, typingDirection } = context;
  const indexRef = useRef(getInitialIndex(encoding, unit, typingDirection));

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

  useLayoutEffect(() => {
    indexRef.current = getInitialIndex(encoding, unit, typingDirection);
    jumpTo(indexRef.current);
  }, [encoding, typingDirection, unit]); // Don't add `jumpTo` to deps.

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
