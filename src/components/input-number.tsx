import { useCallback } from "preact/hooks";
import Input, { InputProps } from "./input";
import { clamp } from "../utils";

export type InputNumberProps = Omit<
  InputProps,
  "onChange" | "pattern" | "type" | "value"
> & {
  isInteger?: boolean;
  onChange: (value: number) => number | void;
  value: number;
};

const integerPattern = /^[+-]?[0-9]*$/;

export default function InputNumber({
  isInteger = false,
  onChange,
  value,
  ...props
}: InputNumberProps) {
  const handleChange = useCallback(
    (textValue: string) => {
      const clampedValue = clamp(
        Number.parseInt(textValue),
        props.min ?? -Infinity,
        props.max ?? Infinity,
      );
      const nextValue = onChange(clampedValue) ?? clampedValue;
      return Number.isNaN(nextValue) ? "" : `${nextValue}`;
    },
    [isInteger, onChange],
  );

  return (
    <Input
      {...props}
      onChange={handleChange}
      type="number"
      pattern={isInteger ? integerPattern : undefined}
      value={Number.isNaN(value) ? "" : `${value}`}
    />
  );
}
