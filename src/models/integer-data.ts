import { Either } from "../types";
import { labelColumnPattern, sum, toDec, toHex } from "../utils";
import {
  $IntegerDataRow,
  IntegerDataRow,
  IntegerDataRowCommentType,
  IntegerDataRowFromString,
  IntegerDataRowFromStringError,
  IntegerDataRowToString,
} from "./integer-data-row";
import { IntegerEncoding } from "./integer";

//==============================================================================
// Data
//==============================================================================

export type IntegerData = {
  name: string;
  rows: IntegerDataRow[];
};

//==============================================================================
// Utils
//==============================================================================

function computeRowComment(
  commentPadding: number,
  columnCount: number,
  rowCommentType: IntegerDataRowCommentType,
  rowIndex: number,
  rowSize: number,
  rowSizeOffset: number,
  size: number,
): string {
  switch (rowCommentType) {
    case IntegerDataRowCommentType.RowNumberDec: {
      return `${" ".repeat(commentPadding)} ; ${toDec(rowIndex)}`;
    }
    case IntegerDataRowCommentType.RowNumberHex: {
      const length = toHex(columnCount - 1).length;
      return `${" ".repeat(commentPadding)} ; ${toHex(rowIndex, length)}`;
    }
    case IntegerDataRowCommentType.RowRangeHex: {
      const length = toHex(size - 1).length;
      const first = toHex(rowSizeOffset, length);
      const last = toHex(rowSizeOffset + rowSize - 1, length);
      return `${" ".repeat(commentPadding)} ; ${first}-${last}`;
    }
  }
  return "";
}

//==============================================================================
// Builders
//==============================================================================

export enum IntegerDataFromStringErrorCode {
  DataHasInvalidRow,
  DataIsEmpty,
}

export type IntegerDataFromStringError = { message: string } & (
  | {
      code: IntegerDataFromStringErrorCode.DataHasInvalidRow;
      rawRow: string;
      rawRowIndex: number;
      rowError: IntegerDataRowFromStringError;
    }
  | { code: IntegerDataFromStringErrorCode.DataIsEmpty }
);

export function IntegerDataFromString(
  rawData: string,
): Either<IntegerData, IntegerDataFromStringError> {
  const rawRows = rawData.split("\n").map((row) => row.split(";")[0]!.trim());

  let name = "";
  const rows: IntegerDataRow[] = [];
  for (let i = 0; i < rawRows.length; ++i) {
    const rawRow = rawRows[i]!;

    if (!rawRow) continue;

    if (labelColumnPattern.test(rawRow)) {
      name = rawRow.substring(0, rawRow.length - 1);
      continue;
    }

    const [row, rowError] = IntegerDataRowFromString(rawRow);
    if (rowError)
      return [
        undefined,
        {
          code: IntegerDataFromStringErrorCode.DataHasInvalidRow,
          rawRow,
          rawRowIndex: i,
          rowError,
          message: `row ${i}, ${rowError.message}`,
        },
      ];
    rows.push(row);
  }

  const data = { name, rows };
  return getSize(data) === 0
    ? [
        undefined,
        {
          code: IntegerDataFromStringErrorCode.DataIsEmpty,
          message: "no rows found",
        },
      ]
    : [data, undefined];
}

export function IntegerDataToString(
  data: IntegerData,
  context: {
    encoding: IntegerEncoding;
    indentation: number;
    isSigned: boolean;
    rowCommentType: IntegerDataRowCommentType;
    shouldSpaceValues: boolean;
  },
): string {
  const name = data.name ? `${data.name}:\n` : "";

  const rows = data.rows.map((row) => ({
    str: IntegerDataRowToString(row, context),
    size: $IntegerDataRow.getSize(row),
  }));

  let rowStrings = rows.map((row) => row.str);
  if (context.rowCommentType !== IntegerDataRowCommentType.None) {
    const maxLength = Math.max(...rows.map((row) => row.str.length));
    const size = getSize(data);
    let rowSizeOffset = 0;
    rowStrings = rows.map((row, rowIndex) => {
      const rowString =
        row.str +
        computeRowComment(
          maxLength - row.str.length,
          rows.length,
          context.rowCommentType,
          rowIndex,
          row.size,
          rowSizeOffset,
          size,
        );
      rowSizeOffset += row.size;
      return rowString;
    });
  }

  const rowsString = rowStrings.join("\n");
  return `${name}${rowsString}`;
}

//==============================================================================
// Methods
//==============================================================================

function getSize(data: IntegerData): number {
  return sum(data.rows.map($IntegerDataRow.getSize));
}

//==============================================================================
// API
//==============================================================================

export const $IntegerData = {
  getSize,
};
