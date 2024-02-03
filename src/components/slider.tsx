import { ChangeEvent } from "preact/compat";
import { useCallback } from "preact/hooks";
import "./slider.css";

export type SliderProps = {
  max?: number;
  min?: number;
  onChange: (value: number) => void;
  step?: number;
  value: number;
};

export default function Slider({
  max,
  min,
  onChange,
  step,
  value,
}: SliderProps) {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const nextValue = Number.parseInt(e.currentTarget.value);
      if (!Number.isNaN(nextValue)) onChange(nextValue);
    },
    [onChange],
  );

  return (
    <input
      class="Slider"
      max={max}
      min={min}
      onChange={handleChange}
      step={step}
      type="range"
      value={value}
    />
  );
}
