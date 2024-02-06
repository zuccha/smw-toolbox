import { z } from "zod";
import { insert, isInRange, mod, remove, replace } from "../utils";
import {
  Integer,
  IntegerEncoding,
  IntegerFromString,
  IntegerLength,
  IntegerPrefix,
  IntegerRadix,
  IntegerToString,
  IntegerUnit,
  digitToHex,
  hexToDigit,
  isValidIntegerDigit,
} from "./integer";
import { MethodDeps, methodDeps } from "./method";

//==============================================================================
// Sign
//==============================================================================

export enum IntegerStringSign {
  Positive = "+",
  Negative = "-",
}

export function isIntegerStringSign(
  maybeSign: unknown,
): maybeSign is IntegerStringSign {
  return (
    maybeSign === IntegerStringSign.Negative ||
    maybeSign === IntegerStringSign.Positive
  );
}

//==============================================================================
// Typing Direction
//==============================================================================

export enum IntegerStringTypingDirection {
  Left,
  Right,
}

export const IntegerStringTypingDirectionSchema = z.nativeEnum(
  IntegerStringTypingDirection,
);

//==============================================================================
// Typing Mode
//==============================================================================

export enum IntegerStringTypingMode {
  Insert,
  Overwrite,
}

export const IntegerStringTypingModeSchema = z.nativeEnum(
  IntegerStringTypingMode,
);

//==============================================================================
// Integer String
//==============================================================================

export type IntegerStringContext = {
  encoding: IntegerEncoding;
  isSigned: boolean;
  shouldAllowOutOfBoundsCursor: boolean;
  shouldMoveAfterTyping: boolean;
  typingDirection: IntegerStringTypingDirection;
  unit: IntegerUnit;
};

export type IntegerString = {
  sign: IntegerStringSign | undefined;
  digits: string[];
  index: number;
};

type Deps = MethodDeps<IntegerString, IntegerStringContext>;
const deps: Deps = methodDeps;

//==============================================================================
// Builders
//==============================================================================

export function IntegerStringFromInteger(
  integer: Integer,
  context: IntegerStringContext,
): IntegerString {
  const signedString = IntegerToString(
    integer,
    context.encoding,
    context.isSigned,
    false,
    context,
  );
  const digits = signedString.replace("-", "").split("");
  const sign = context.isSigned
    ? signedString.startsWith("-")
      ? IntegerStringSign.Negative
      : IntegerStringSign.Positive
    : undefined;
  const index =
    context.typingDirection === IntegerStringTypingDirection.Right
      ? 0
      : digits.length - 1;
  return { sign, digits, index };
}

IntegerStringFromInteger.deps = deps(
  [],
  ["encoding", "isSigned", "typingDirection", "unit"],
);

export function IntegerStringToInteger(
  obj: IntegerString,
  context: IntegerStringContext,
): Integer | undefined {
  const sign = obj.sign === IntegerStringSign.Negative ? "-" : "";
  const prefix = IntegerPrefix[context.encoding];
  const signedString = `${sign}${prefix}${obj.digits.join("")}`;
  return IntegerFromString(signedString, context);
}

IntegerStringToInteger.deps = deps(["digits", "sign"], ["encoding", "unit"]);

//==============================================================================
// Utility Methods
//==============================================================================

function normalize(
  obj: IntegerString,
  context: IntegerStringContext,
): IntegerString {
  const [digits, index] =
    context.typingDirection === IntegerStringTypingDirection.Left
      ? [obj.digits.slice().reverse(), obj.digits.length - obj.index - 1]
      : [obj.digits, obj.index];
  return { ...obj, digits, index };
}

normalize.deps = deps(["digits", "index"], ["typingDirection"]);

function fitIndex(
  obj: IntegerString,
  context: IntegerStringContext,
  index: number,
): IntegerString {
  const ret = (i: number) => (i === obj.index ? obj : { ...obj, index: i });
  const offset = context.shouldAllowOutOfBoundsCursor ? 1 : 0;
  if (index < 0) return ret(0);
  if (index > obj.digits.length - 1 + offset) return ret(obj.digits.length - 1);
  return ret(index);
}

fitIndex.deps = deps(["digits"], ["isSigned", "shouldAllowOutOfBoundsCursor"]);

//==============================================================================
// Methods
//==============================================================================

function clear(
  _obj: IntegerString,
  context: IntegerStringContext,
): IntegerString {
  const { encoding, isSigned, unit } = context;
  return {
    sign: isSigned ? IntegerStringSign.Positive : undefined,
    digits: "0".repeat(IntegerLength[unit][encoding]).split(""),
    index:
      context.typingDirection === IntegerStringTypingDirection.Right
        ? 0
        : IntegerLength[unit][encoding] - 1,
  };
}

clear.deps = deps([], ["encoding", "isSigned", "unit"]);

function deleteDigit(
  obj: IntegerString,
  context: IntegerStringContext,
): IntegerString {
  if (!isInRange(obj.index, 0, obj.digits.length - 1))
    return fitIndex(obj, context, obj.index);

  const normalized = normalize(obj, context);
  const digits = remove(normalized.digits, normalized.index, "0");
  const index = normalized.index;
  return normalize({ ...normalized, digits, index }, context);
}

deleteDigit.deps = deps(["digits", "index"], [], [fitIndex, normalize]);

function insertDigit(
  obj: IntegerString,
  context: IntegerStringContext,
  digit: string,
): IntegerString {
  if (!isInRange(obj.index, 0, obj.digits.length - 1))
    return fitIndex(obj, context, obj.index);
  if (!isValidIntegerDigit(digit, context.encoding)) return obj;

  const normalized = normalize(obj, context);
  const digits = insert(normalized.digits, normalized.index, digit);
  const index = context.shouldMoveAfterTyping
    ? context.shouldAllowOutOfBoundsCursor
      ? Math.min(normalized.digits.length, normalized.index + 1)
      : Math.min(normalized.digits.length - 1, normalized.index + 1)
    : normalized.index;
  return normalize({ ...normalized, digits, index }, context);
}

insertDigit.deps = deps(
  ["digits", "index"],
  ["encoding", "shouldMoveAfterTyping", "shouldAllowOutOfBoundsCursor"],
  [fitIndex, normalize],
);

function jumpTo(
  obj: IntegerString,
  context: IntegerStringContext,
  index: number,
): IntegerString {
  return fitIndex(obj, context, index);
}

jumpTo.deps = deps([], [], [fitIndex]);

function moveLeft(
  obj: IntegerString,
  context: IntegerStringContext,
): IntegerString {
  return fitIndex(obj, context, obj.index - 1);
}

moveLeft.deps = deps([], [], [fitIndex]);

function moveRight(
  obj: IntegerString,
  context: IntegerStringContext,
): IntegerString {
  return fitIndex(obj, context, obj.index + 1);
}

moveRight.deps = deps([], [], [fitIndex]);

function negate(
  obj: IntegerString,
  _context: IntegerStringContext,
): IntegerString {
  if (obj.sign === IntegerStringSign.Negative)
    return { ...obj, sign: IntegerStringSign.Positive };
  if (obj.sign === IntegerStringSign.Positive)
    return { ...obj, sign: IntegerStringSign.Negative };
  return obj;
}

negate.deps = deps(["sign"], [], []);

function removeDigit(
  obj: IntegerString,
  context: IntegerStringContext,
): IntegerString {
  if (!isInRange(obj.index, 0, obj.digits.length))
    return fitIndex(obj, context, obj.index);

  const normalized = normalize(obj, context);
  if (normalized.index === 0) return deleteDigit(obj, context);

  const digits = remove(normalized.digits, normalized.index - 1, "0");
  const index = normalized.index - 1;
  return normalize({ ...normalized, digits, index }, context);
}

removeDigit.deps = deps(
  ["digits", "index"],
  [],
  [deleteDigit, fitIndex, normalize],
);

function replaceDigit(
  obj: IntegerString,
  context: IntegerStringContext,
  digit: string,
): IntegerString {
  if (!isInRange(obj.index, 0, obj.digits.length - 1))
    return fitIndex(obj, context, obj.index);
  if (!isValidIntegerDigit(digit, context.encoding)) return obj;

  const normalized = normalize(obj, context);
  const digits = replace(normalized.digits, normalized.index, digit);
  const index = context.shouldMoveAfterTyping
    ? context.shouldAllowOutOfBoundsCursor
      ? Math.min(normalized.digits.length, normalized.index + 1)
      : Math.min(normalized.digits.length - 1, normalized.index + 1)
    : normalized.index;
  return normalize({ ...normalized, digits, index }, context);
}

replaceDigit.deps = deps(
  ["digits", "index"],
  ["encoding", "shouldMoveAfterTyping", "shouldAllowOutOfBoundsCursor"],
  [fitIndex, normalize],
);

function shiftDigit(
  obj: IntegerString,
  context: IntegerStringContext,
  shift: number,
  index?: number,
): IntegerString {
  index = index ?? obj.index;
  const radix = IntegerRadix[context.encoding];
  const digit = digitToHex(mod(hexToDigit(obj.digits[index]!) + shift, radix));
  const digits = replace(obj.digits, index, digit);
  return { ...obj, digits, index };
}

shiftDigit.deps = deps(["digits", "index"], ["encoding"]);

function shiftLeft(
  obj: IntegerString,
  _context: IntegerStringContext,
  withCarry: boolean = false,
): IntegerString {
  const carry = withCarry ? obj.digits[0]! : "0";
  const digits = [...obj.digits.slice(1), carry];
  return { ...obj, digits };
}

shiftLeft.deps = deps(["digits"]);

function shiftRight(
  obj: IntegerString,
  _context: IntegerStringContext,
  withCarry: boolean = false,
): IntegerString {
  const carry = withCarry ? obj.digits[obj.digits.length - 1]! : "0";
  const digits = [carry, ...obj.digits.slice(0, obj.digits.length - 1)];
  return { ...obj, digits };
}

shiftRight.deps = deps(["digits"]);

//==============================================================================
// API
//==============================================================================

export const $IntegerString = {
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
};
