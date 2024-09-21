import { Either } from "../types";
import { range, center, toDec, toHex } from "../utils";
import {
  IntegerData,
  IntegerDataFromString,
  IntegerDataFromStringError,
  IntegerDataToString,
} from "./integer-data";
import { IntegerDataRow, IntegerDataRowCommentType } from "./integer-data-row";
import {
  Integer,
  IntegerEncoding,
  IntegerLength,
  IntegerPrefixCode,
  IntegerSize,
  IntegerUnit,
} from "./integer";
import { z } from "zod";

//==============================================================================
// Types
//==============================================================================

export enum IntegerTableColumnCommentType {
  None,
  ColumnNumberDec,
  ColumnNumberHex,
  ColumnValueHex,
}

export const IntegerTableColumnCommentTypeSchema = z.nativeEnum(
  IntegerTableColumnCommentType,
);

export type IntegerTable = {
  grid: Integer[][];
  height: number;
  name: string;
  unit: IntegerUnit;
  width: number;
};

//==============================================================================
// Utils
//==============================================================================

function computeColumnComment(
  columnCommentType: IntegerTableColumnCommentType,
  columnCount: number,
  columnGap: number,
  encoding: IntegerEncoding,
  indentation: number,
  unit: IntegerUnit,
): string {
  const columnWidth =
    IntegerLength[unit][encoding] + IntegerPrefixCode[encoding].length;
  const prefix = `;${" ".repeat(Math.max(0, indentation - 1) + 3)}`;
  const width = columnWidth * columnCount + columnGap * (columnCount - 1);
  const separator = `${prefix}${"-".repeat(width)}\n`;

  switch (columnCommentType) {
    case IntegerTableColumnCommentType.ColumnNumberDec: {
      const columns = range(columnCount)
        .map((i) => center(toDec(i), columnWidth))
        .join(" ".repeat(columnGap));
      return `${prefix}${columns}\n${separator}`;
    }
    case IntegerTableColumnCommentType.ColumnNumberHex: {
      const length = toHex(columnCount - 1).length;
      const columns = range(columnCount)
        .map((i) => center(toHex(i, length), columnWidth))
        .join(" ".repeat(columnGap));
      return `${prefix}${columns}\n${separator}`;
    }
    case IntegerTableColumnCommentType.ColumnValueHex: {
      const length = toHex(columnCount - 1).length;
      const size = IntegerSize[unit];
      const columns = range(columnCount)
        .map((i) => center(toHex(i * size, length), columnWidth))
        .join(" ".repeat(columnGap));
      return `${prefix}${columns}\n${separator}`;
    }
  }

  return "";
}

//==============================================================================
// Builders
//==============================================================================

export enum IntegerTableFromDataErrorCode {
  DataHasRowWithInconsistentChunks,
  DataHasRowsWithDifferentLengths,
  DataHasRowsWithDifferentUnits,
  DataIsEmpty,
}

export type IntegerTableFromDataError = { message: string } & (
  | { code: IntegerTableFromDataErrorCode.DataHasRowWithInconsistentChunks }
  | { code: IntegerTableFromDataErrorCode.DataHasRowsWithDifferentLengths }
  | { code: IntegerTableFromDataErrorCode.DataHasRowsWithDifferentUnits }
  | { code: IntegerTableFromDataErrorCode.DataIsEmpty }
);

export function IntegerTableFromData(
  data: IntegerData,
): Either<IntegerTable, IntegerTableFromDataError> {
  const height = data.rows.length;
  if (height === 0)
    return [
      undefined,
      {
        code: IntegerTableFromDataErrorCode.DataIsEmpty,
        message: "no data found",
      },
    ];

  const rows = data.rows.map((row) => {
    const chunk = row.chunks[0];
    return row.chunks.length === 1 && chunk
      ? { cells: chunk.integers, unit: chunk.unit }
      : undefined;
  });
  if (rows.some((row) => !row))
    return [
      undefined,
      {
        code: IntegerTableFromDataErrorCode.DataHasRowWithInconsistentChunks,
        message: "one or more rows use multiple 'db' or 'dw' instructions",
      },
    ];

  const width = rows[0]!.cells.length;
  if (rows.some((row) => row!.cells.length !== width))
    return [
      undefined,
      {
        code: IntegerTableFromDataErrorCode.DataHasRowsWithDifferentLengths,
        message: "one or more rows have a different number of elements",
      },
    ];

  const unit = rows[0]!.unit;
  if (rows.some((row) => row!.unit !== unit))
    return [
      undefined,
      {
        code: IntegerTableFromDataErrorCode.DataHasRowsWithDifferentUnits,
        message: "one or more rows use different 'db' or 'dw' instructions",
      },
    ];

  const grid = rows.map((row) => row!.cells);
  const name = data.name;
  return [{ grid, height, name, unit, width }, undefined];
}

export enum IntegerTableFromStringErrorCode {
  TableHasInvalidData,
}

export type IntegerTableFromStringError = { message: string } & (
  | IntegerTableFromDataError
  | {
      code: IntegerTableFromStringErrorCode.TableHasInvalidData;
      dataError: IntegerDataFromStringError;
    }
);

export function IntegerTableFromString(
  rawTable: string,
): Either<IntegerTable, IntegerTableFromStringError> {
  const [data, dataError] = IntegerDataFromString(rawTable);
  if (dataError)
    return [
      undefined,
      {
        code: IntegerTableFromStringErrorCode.TableHasInvalidData,
        dataError,
        message: dataError.message,
      },
    ];

  return IntegerTableFromData(data);
}

export function IntegerTableToString(
  table: IntegerTable,
  context: {
    columnCommentType: IntegerTableColumnCommentType;
    encoding: IntegerEncoding;
    indentation: number;
    isSigned: boolean;
    rowCommentType: IntegerDataRowCommentType;
    shouldSpaceValues: boolean;
    name: string;
  },
): string {
  const name = context.name ? `${context.name}:\n` : "";

  const columnComment = computeColumnComment(
    context.columnCommentType,
    table.width,
    context.shouldSpaceValues ? 2 : 1,
    context.encoding,
    context.indentation,
    table.unit,
  );

  const data = IntegerTableToData(table);
  const dataString = IntegerDataToString({ ...data, name: "" }, context);

  return `${name}${columnComment}${dataString}`;
}

export function IntegerTableToData(table: IntegerTable): IntegerData {
  const rows: IntegerDataRow[] = [];
  for (let y = 0; y < table.height; ++y) {
    const integers: Integer[] = [];
    for (let x = 0; x < table.width; ++x) {
      const integer = table.grid[y]![x]!;
      integers.push(integer);
    }
    const chunk = { integers, unit: table.unit };
    rows.push({ chunks: [chunk] });
  }
  return { name: table.name, rows };
}
