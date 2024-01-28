import { useCallback } from "preact/hooks";
import Input, { InputProps } from "./input";

export type InputNumberProps = Omit<
  InputProps,
  "onChange" | "pattern" | "type" | "value"
> & {
  isInteger?: boolean;
  onChange: (value: number) => void;
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
      onChange(Number.parseInt(textValue));
    },
    [isInteger, onChange]
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
