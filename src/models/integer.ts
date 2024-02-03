import { z } from "zod";
import { MethodDeps, methodDeps } from "./method";
import { clamp, padL } from "../utils";

//==============================================================================
// Unit
//==============================================================================

export enum IntegerUnit {
  Byte,
  Word,
}

export const IntegerUnitSchema = z.nativeEnum(IntegerUnit);

//==============================================================================
// Encoding
//==============================================================================

export enum IntegerEncoding {
  Bin,
  Dec,
  Hex,
}

export const IntegerEncodingSchema = z.nativeEnum(IntegerEncoding);

//==============================================================================
// Size
//==============================================================================

export const IntegerSize = {
  [IntegerUnit.Byte]: 1,
  [IntegerUnit.Word]: 2,
} as const;

//==============================================================================
// Bounds Unsigned
//==============================================================================

export const IntegerBoundsUnsigned = {
  [IntegerUnit.Byte]: { min: 0, max: 255 },
  [IntegerUnit.Word]: { min: 0, max: 65535 },
} as const;

//==============================================================================
// Bounds Signed
//==============================================================================

export const IntegerBoundsSigned = {
  [IntegerUnit.Byte]: { min: -129, max: 127 },
  [IntegerUnit.Word]: { min: -32768, max: 32767 },
} as const;

//==============================================================================
// Mask
//==============================================================================

export const IntegerMask = {
  [IntegerUnit.Byte]: {
    hide: 65280, // %1111111100000000
    show: 255, //   %0000000011111111
  },
  [IntegerUnit.Word]: {
    hide: 0, //     %0000000000000000
    show: 65535, // %1111111111111111
  },
};

//==============================================================================
// Hex Digits
//==============================================================================

// prettier-ignore
export const IntegerHexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"] as const;

export const IntegerHexDigitSchema = z.enum(IntegerHexDigits);

export type IntegerHexDigit = z.infer<typeof IntegerHexDigitSchema>;

export function digitToHex(digit: number): IntegerHexDigit {
  return IntegerHexDigits[digit] ?? "0";
}

export function hexToDigit(hex: string): number {
  return Number.parseInt(hex.length === 1 ? hex : "0", 16) ?? 0;
}

//==============================================================================
// Pattern
//==============================================================================

export const IntegerPattern = {
  [IntegerEncoding.Bin]: /^[0-1]$/,
  [IntegerEncoding.Dec]: /^[0-9]$/,
  [IntegerEncoding.Hex]: /^[0-9a-fA-F]$/,
} as const;

export function isValidIntegerDigit(
  digit: string,
  encoding: IntegerEncoding,
): boolean {
  return IntegerPattern[encoding].test(digit);
}

//==============================================================================
// Length
//==============================================================================

export const IntegerLength = {
  [IntegerUnit.Byte]: {
    [IntegerEncoding.Bin]: 8,
    [IntegerEncoding.Dec]: 3,
    [IntegerEncoding.Hex]: 2,
  },
  [IntegerUnit.Word]: {
    [IntegerEncoding.Bin]: 16,
    [IntegerEncoding.Dec]: 5,
    [IntegerEncoding.Hex]: 4,
  },
} as const;

//==============================================================================
// Radix
//==============================================================================

export const IntegerRadix = {
  [IntegerEncoding.Bin]: 2,
  [IntegerEncoding.Dec]: 10,
  [IntegerEncoding.Hex]: 16,
} as const;

//==============================================================================
// Prefix
//==============================================================================

export const IntegerPrefix = {
  [IntegerEncoding.Bin]: "%",
  [IntegerEncoding.Dec]: "",
  [IntegerEncoding.Hex]: "$",
} as const;

//==============================================================================
// Operation
//==============================================================================

export enum IntegerOperation {
  Add,
  And,
  Or,
  Subtract,
  Xor,
}

export const IntegerOperationSchema = z.nativeEnum(IntegerOperation);

//==============================================================================
// Integer
//==============================================================================

export type IntegerContext = {
  unit: IntegerUnit;
};

export const IntegerSchema = z.object({
  value: z.number(),
  valueRaw: z.number(),
});

export type Integer = z.infer<typeof IntegerSchema>;

export const defaultInteger: Integer = { value: 0, valueRaw: 0 };

type Deps = MethodDeps<Integer, IntegerContext>;
const deps: Deps = methodDeps;

//==============================================================================
// Builders
//==============================================================================

function extractEncoding(integerString: string): [IntegerEncoding, string] {
  if (integerString.startsWith(IntegerPrefix[IntegerEncoding.Bin]))
    return [IntegerEncoding.Bin, integerString.substring(1)];
  if (integerString.startsWith(IntegerPrefix[IntegerEncoding.Hex]))
    return [IntegerEncoding.Hex, integerString.substring(1)];
  return [IntegerEncoding.Dec, integerString];
}

function extractSign(integerString: string): [boolean, string] {
  return integerString.startsWith("-")
    ? [true, integerString.substring(1)]
    : [false, integerString];
}

export function IntegerFromString(
  signedString: string,
  context: IntegerContext,
): Integer | undefined {
  const [isSigned, unsignedString] = extractSign(signedString);
  const [encoding, decodedString] = extractEncoding(unsignedString);
  const radix = IntegerRadix[encoding];
  const { min, max } = isSigned
    ? IntegerBoundsSigned[context.unit]
    : IntegerBoundsUnsigned[context.unit];
  const signed = clamp(Number.parseInt(decodedString, radix), min, max);
  if (Number.isNaN(signed)) return undefined;
  const unsigned =
    isSigned || signed < 0
      ? 2 * (IntegerBoundsSigned[context.unit].max + 1) + signed
      : signed;
  return IntegerFromValue(unsigned, context);
}

IntegerFromString.deps = deps([], ["unit"]);

export function IntegerFromValue(
  value: number,
  context: IntegerContext,
): Integer {
  const mask = IntegerMask[context.unit];
  const valueRaw = (value & mask.hide) | (value & mask.show);
  return { value: valueRaw & mask.show, valueRaw };
}

IntegerFromValue.deps = deps([], ["unit"]);

export function IntegerToString(
  integer: Integer,
  encoding: IntegerEncoding,
  isSigned: boolean,
  shouldIncludePrefix: boolean,
  context: IntegerContext,
): string {
  const { unit } = context;
  const { min, max } = IntegerBoundsUnsigned[unit];
  const length = IntegerLength[unit][encoding];
  const radix = IntegerRadix[encoding];

  const unsigned = clamp(integer.value, min, max);
  const signed =
    isSigned && unsigned > IntegerBoundsSigned[unit].max
      ? -(2 * (IntegerBoundsSigned[unit].max + 1) - unsigned)
      : unsigned;
  const signedString = signed.toString(radix).toUpperCase();
  const paddedString = padL(signedString.replace("-", ""), length, "0");
  const prefixedString = shouldIncludePrefix
    ? `${IntegerPrefix[encoding]}${paddedString}`
    : paddedString;
  return signed < 0 ? `-${prefixedString}` : prefixedString;
}

//==============================================================================
// Methods
//==============================================================================

function setValue(
  obj: Integer,
  context: IntegerContext,
  value: number,
): Integer {
  const mask = IntegerMask[context.unit];
  const valueRaw = (obj.valueRaw & mask.hide) | (value & mask.show);
  return { value: valueRaw & mask.show, valueRaw: valueRaw };
}

setValue.deps = deps(["value", "valueRaw"], ["unit"]);

//==============================================================================
// API
//==============================================================================

export const $Integer = {
  setValue,
};
