import { Either } from "../types";
import {
  Integer,
  IntegerEncoding,
  IntegerFromString,
  IntegerSize,
  IntegerToString,
  IntegerUnit,
} from "./integer";

//==============================================================================
// Prefix
//==============================================================================

export const IntegerDataChunkPrefix = {
  [IntegerUnit.Byte]: "db",
  [IntegerUnit.Word]: "dw",
  [IntegerUnit.Long]: "dl",
} as const;

//==============================================================================
// Data Chunk
//==============================================================================

export type IntegerDataContext = {
  encoding: IntegerEncoding;
  isSigned: boolean;
  shouldSpaceValues: boolean;
};

export type IntegerDataChunk = {
  integers: Integer[];
  unit: IntegerUnit;
};

//==============================================================================
// Builders
//==============================================================================

export enum IntegerDataChunkFromStringErrorCode {
  ChunkDoesNotHavePrefix,
  ChunkHasInvalidValue,
  ChunkIsEmpty,
}

export type IntegerDataChunkFromStringError = { message: string } & (
  | {
      code: IntegerDataChunkFromStringErrorCode.ChunkHasInvalidValue;
      rawValue: string;
      rawValueIndex: number;
    }
  | { code: IntegerDataChunkFromStringErrorCode.ChunkDoesNotHavePrefix }
  | { code: IntegerDataChunkFromStringErrorCode.ChunkIsEmpty }
);

export function IntegerDataChunkFromString(
  rawChunk: string,
): Either<IntegerDataChunk, IntegerDataChunkFromStringError> {
  rawChunk = rawChunk.trim();
  const bytePrefix = IntegerDataChunkPrefix[IntegerUnit.Byte];
  const wordPrefix = IntegerDataChunkPrefix[IntegerUnit.Word];

  const [prefix, unit] = rawChunk.startsWith(bytePrefix)
    ? [bytePrefix, IntegerUnit.Byte]
    : rawChunk.startsWith(wordPrefix)
    ? [wordPrefix, IntegerUnit.Word]
    : [undefined, undefined];

  if (!prefix)
    return [
      undefined,
      {
        code: IntegerDataChunkFromStringErrorCode.ChunkDoesNotHavePrefix,
        message: "no size instruction ('db' or 'dw') found",
      },
    ];

  rawChunk = rawChunk.replace(prefix, "").trim();
  const rawValues = rawChunk.split(/\s*,\s*/);

  const integers: Integer[] = [];
  for (let i = 0; i < rawValues.length; ++i) {
    const rawValue = rawValues[i]!;
    const integer = IntegerFromString(rawValue, { unit });
    if (!integer)
      return [
        undefined,
        {
          code: IntegerDataChunkFromStringErrorCode.ChunkHasInvalidValue,
          rawValue,
          rawValueIndex: i,
          message: `value '${rawChunk}' is not a valid`,
        },
      ];
    integers.push(integer);
  }

  const chunk = { integers, unit };
  return getSize(chunk) === 0
    ? [
        undefined,
        {
          code: IntegerDataChunkFromStringErrorCode.ChunkIsEmpty,
          message: "no values found",
        },
      ]
    : [chunk, undefined];
}

export function IntegerDataChunkToString(
  chunk: IntegerDataChunk,
  context: IntegerDataContext,
): string {
  const prefix = IntegerDataChunkPrefix[chunk.unit];
  const valuesString = chunk.integers
    .map((integer) =>
      IntegerToString(integer, context.encoding, context.isSigned, true, {
        unit: chunk.unit,
      }),
    )
    .join(context.shouldSpaceValues ? ", " : ",");
  return `${prefix} ${valuesString}`;
}

//==============================================================================
// Methods
//==============================================================================

function getSize(chunk: IntegerDataChunk): number {
  return chunk.integers.length * IntegerSize[chunk.unit];
}

//==============================================================================
// API
//==============================================================================

export const $IntegerDataChunk = {
  getSize,
};
