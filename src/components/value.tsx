import { useMemo } from "preact/hooks";
import {
  IntegerEncoding,
  IntegerUnit,
  IntegerLength,
  IntegerPrefixText,
} from "../models/integer";
import { toBin, toDec, toHex } from "../utils";
import Tooltip from "./tooltip";

type ValueProps = {
  dim?: boolean;
  encoding: IntegerEncoding;
  unit: IntegerUnit;
  value: number;
};

const binPrefix = IntegerPrefixText[IntegerEncoding.Bin];
const hexPrefix = IntegerPrefixText[IntegerEncoding.Hex];

export const formatValue = (
  value: number,
  encoding: IntegerEncoding,
  unit: IntegerUnit,
) => {
  const unitLength = IntegerLength[unit];
  const bin = toBin(value, unitLength[IntegerEncoding.Bin]);
  const dec = toDec(value);
  const hex = toHex(value, unitLength[IntegerEncoding.Hex]);
  const tooltip = `${binPrefix}${bin} / ${dec} / ${hexPrefix}${hex}`;
  if (encoding === IntegerEncoding.Bin) return { tooltip, formatted: bin };
  if (encoding === IntegerEncoding.Dec) return { tooltip, formatted: dec };
  return { tooltip, formatted: hex };
};

export default function Value({ dim, encoding, unit, value }: ValueProps) {
  const { formatted, tooltip } = useMemo(
    () => formatValue(value, encoding, unit),
    [encoding, unit, value],
  );

  return (
    <Tooltip monospace tooltip={tooltip}>
      {dim ? <dim>{formatted}</dim> : formatted}
    </Tooltip>
  );
}
