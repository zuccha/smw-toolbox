import { useCallback, useLayoutEffect, useState } from "preact/hooks";
import {
  IntegerEncoding,
  IntegerLength,
  IntegerPrefixText,
  IntegerRadix,
  IntegerUnit,
  IntegerPattern,
} from "../models/integer";
import { toBin, toDec, toHex } from "../utils";
import Input, { InputProps } from "./input";
import "./input.css";

export type InputValueProps = Omit<
  InputProps,
  | "format"
  | "max"
  | "min"
  | "monospace"
  | "onChange"
  | "pattern"
  | "prefix"
  | "size"
  | "type"
  | "value"
> & {
  encoding: IntegerEncoding;
  onChange: (value: number) => void;
  unit: IntegerUnit;
  value: number;
};

const formatNumber = (
  value: number,
  encoding: IntegerEncoding,
  unit: IntegerUnit,
): string => {
  if (isNaN(value)) return "";
  const length = IntegerLength[unit][encoding];
  if (encoding === IntegerEncoding.Bin) return toBin(value, length);
  if (encoding === IntegerEncoding.Dec) return toDec(value, length);
  return toHex(value, length).toUpperCase();
};

const toUpperCase = (value: string): string => value.toUpperCase();

const equal = (value1: number, value2: number): boolean => {
  value1 = isNaN(value1) ? 0 : value1;
  value2 = isNaN(value2) ? 0 : value2;
  return value1 === value2;
};

export default function InputValue({
  encoding,
  onChange,
  unit,
  value,
  ...props
}: InputValueProps) {
  const [formattedValue, setFormattedValue] = useState(() =>
    formatNumber(value, encoding, unit),
  );

  const formatValue = useCallback(
    (value: number) => setFormattedValue(formatNumber(value, encoding, unit)),
    [encoding, unit],
  );

  const change = useCallback(
    (newFormattedValue: string) => {
      const newValue = parseInt(newFormattedValue, IntegerRadix[encoding]);
      if (isNaN(newValue)) {
        onChange(0);
        setFormattedValue("");
      } else {
        onChange(newValue);
        setFormattedValue(newFormattedValue.toUpperCase());
      }
    },
    [encoding, onChange],
  );

  useLayoutEffect(() => {
    if (!equal(value, parseInt(formattedValue, IntegerRadix[encoding]))) {
      formatValue(value);
    }
  }, [encoding, formatValue, unit, value]);

  return (
    <Input
      format={toUpperCase}
      monospace
      onChange={change}
      pattern={IntegerPattern[encoding]}
      prefix={IntegerPrefixText[encoding]}
      size={IntegerLength[unit][encoding]}
      type="text"
      value={formattedValue}
      {...props}
    />
  );
}
