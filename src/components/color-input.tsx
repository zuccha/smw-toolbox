import { Pipette } from "lucide-preact";
import { ChangeEvent } from "preact/compat";
import { useCallback } from "preact/hooks";
import { Theme, ThemeMode } from "../models/theme";
import "./color-input.css";

export type ColorInputProps = {
  onChange: (value: string) => void;
  value: string;
};

const halfwayValue = Number.parseInt("FFFFFF", 16) / 2;

export default function ColorInput({ onChange, value }: ColorInputProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange],
  );

  const color =
    Number.parseInt(value.substring(1), 16) < halfwayValue
      ? Theme[ThemeMode.Dark].neutral1
      : Theme[ThemeMode.Light].neutral1;

  return (
    <label class="ColorInput" style={{ backgroundColor: value, color }}>
      <Pipette size="1em" />
      <div class="ColorInput_Value">{value}</div>

      <input onChange={handleChange} type="color" value={value} />
    </label>
  );
}
