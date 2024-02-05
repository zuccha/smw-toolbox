import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import "./palette-picker.css";
import { discoFrequency } from "../models/theme";

type PalettePickerColorProps = {
  backgroundColor: string;
  isSelected: boolean;
  onClick: () => void;
};

function PalettePickerColor({
  backgroundColor,
  isSelected,
  onClick,
}: PalettePickerColorProps) {
  return (
    <input
      class={isSelected ? "selected" : undefined}
      onClick={onClick}
      style={{ backgroundColor }}
      type="button"
    />
  );
}

type PalettePickerColorDiscoProps = Omit<
  PalettePickerColorProps,
  "backgroundColor"
> & {
  colors: [string, ...string[]];
};

function PalettePickerColorDisco({
  colors,
  ...props
}: PalettePickerColorDiscoProps) {
  const [backgroundColor, setBackgroundColor] = useState(colors[0]);
  const rotateColorsIdRef = useRef(0);

  useEffect(() => {
    let colorIndex = 0;

    const rotateColors = () => {
      setBackgroundColor(colors[colorIndex]!);
      colorIndex = (colorIndex + 1) % colors.length;
    };

    clearInterval(rotateColorsIdRef.current);
    rotateColorsIdRef.current = setInterval(rotateColors, discoFrequency);
    return () => clearInterval(rotateColorsIdRef.current);
  }, [colors]);

  return <PalettePickerColor {...props} backgroundColor={backgroundColor} />;
}

export type PalettePickerProps<T extends number> = {
  onChange: (value: T) => void;
  options: { value: T; color: string }[];
  value: T;
};

export default function PalettePicker<T extends number>({
  onChange,
  options,
  value,
}: PalettePickerProps<T>) {
  const colors: [string, ...string[]] = useMemo(() => {
    const colors = options.map((option) => option.color);
    return colors.length > 0
      ? (colors as [string, ...string[]])
      : ["transparent"];
  }, [options]);

  return (
    <div class="PalettePicker">
      {options.map((option) =>
        option.color === "disco" ? (
          <PalettePickerColorDisco
            colors={colors}
            isSelected={option.value === value}
            key={option.value}
            onClick={() => onChange(option.value)}
          />
        ) : (
          <PalettePickerColor
            backgroundColor={option.color}
            isSelected={option.value === value}
            key={option.value}
            onClick={() => onChange(option.value)}
          />
        ),
      )}
    </div>
  );
}
