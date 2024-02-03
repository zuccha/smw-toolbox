import { z } from "zod";
import { Either } from "../types";
import { sum } from "../utils";
import {
  $IntegerDataChunk,
  IntegerDataChunk,
  IntegerDataChunkFromString,
  IntegerDataChunkFromStringError,
  IntegerDataChunkToString,
} from "./integer-data-chunk";
import { IntegerEncoding } from "./integer";

//==============================================================================
// Row Comment Type
//==============================================================================

export enum IntegerDataRowCommentType {
  None,
  RowNumberDec,
  RowNumberHex,
  RowRangeHex,
}

export const IntegerDataRowCommentTypeSchema = z.nativeEnum(
  IntegerDataRowCommentType,
);

//==============================================================================
// Data Row
//==============================================================================

export type IntegerDataRow = {
  chunks: IntegerDataChunk[];
};

//==============================================================================
// Builders
//==============================================================================

export enum IntegerDataRowFromStringErrorCode {
  RowHasInvalidChunk,
  RowIsEmpty,
}

export type IntegerDataRowFromStringError = { message: string } & (
  | {
      code: IntegerDataRowFromStringErrorCode.RowHasInvalidChunk;
      rawChunk: string;
      rawChunkIndex: number;
      chunkError: IntegerDataChunkFromStringError;
    }
  | { code: IntegerDataRowFromStringErrorCode.RowIsEmpty }
);

export function IntegerDataRowFromString(
  rawRow: string,
): Either<IntegerDataRow, IntegerDataRowFromStringError> {
  const rawChunks = rawRow.split(/\s*:\s*/);
  const chunks: IntegerDataChunk[] = [];

  for (let i = 0; i < rawChunks.length; ++i) {
    const rawChunk = rawChunks[i]!;
    const [chunk, chunkError] = IntegerDataChunkFromString(rawChunk);
    if (chunkError)
      return [
        undefined,
        {
          code: IntegerDataRowFromStringErrorCode.RowHasInvalidChunk,
          rawChunk,
          rawChunkIndex: i,
          chunkError,
          message: `chunk ${i}, ${chunkError.message}`,
        },
      ];
    chunks.push(chunk);
  }

  const row = { chunks };
  return getSize(row) === 0
    ? [
        undefined,
        {
          code: IntegerDataRowFromStringErrorCode.RowIsEmpty,
          message: "no chunks found",
        },
      ]
    : [row, undefined];
}

export function IntegerDataRowToString(
  row: IntegerDataRow,
  context: {
    encoding: IntegerEncoding;
    indentation: number;
    isSigned: boolean;
    shouldSpaceValues: boolean;
  },
): string {
  const indentation = " ".repeat(context.indentation);
  const chunksString = row.chunks
    .map((chunk) => IntegerDataChunkToString(chunk, context))
    .join(" : ");
  return `${indentation}${chunksString}`;
}

//==============================================================================
// Methods
//==============================================================================

function getSize(row: IntegerDataRow): number {
  return sum(row.chunks.map($IntegerDataChunk.getSize));
}

//==============================================================================
// API
//==============================================================================

export const $IntegerDataRow = {
  getSize,
};
