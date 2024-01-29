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
    [onChange]
  );

  return (
    <div class="select">
      <select
        class="hidden"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div class="select-labels">
        {options.map((option) => {
          const className = classNames([
            ["select-label", true],
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
        <div class="select-value">{"\u200B"}</div>
      ) : (
        <div class="select-placeholder">{placeholder}</div>
      )}

      <div class="select-icon">
        <ChevronDown size="1em" />
      </div>
    </div>
  );
}
