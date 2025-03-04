import { ChevronDown } from "lucide-preact";
import { useCallback } from "preact/hooks";
import { classNames } from "../utils";
import "./select.css";

export type SelectOption<T extends number> = { label: string; value: T };

export type SelectProps<T extends number> = {
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  placeholder: string;
  value: T;
};

export default function Select<T extends number>({
  onChange,
  options,
  placeholder,
  value,
}: SelectProps<T>) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(Number.parseInt(e.currentTarget.value) as T);
    },
    [onChange],
  );

  return (
    <div class="Select">
      <select onChange={handleChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div class="Select_Labels">
        {options.map((option) => {
          const className = classNames([
            ["Select_Label", true],
            ["hidden", option.value !== value],
          ]);
          return (
            <div class={className} key={option.value}>
              {option.label}
            </div>
          );
        })}
      </div>

      {options.some((option) => option.value === value) ? (
        <div class="Select_Placeholder">{"\u200B"}</div>
      ) : (
        <div class="Select_Placeholder">{placeholder}</div>
      )}

      <div class="Select_Icon">
        <ChevronDown size="1em" />
      </div>
    </div>
  );
}
