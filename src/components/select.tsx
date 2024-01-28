import { useCallback } from "preact/hooks";
import "./select.css";
import { ChevronDown } from "lucide-preact";

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
      <select onChange={handleChange} placeholder={placeholder} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div class="select-icon">
        <ChevronDown size="1em" />
      </div>
    </div>
  );
}
