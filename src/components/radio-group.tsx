import Button from "./button";
import "./radio-group.css";

export type RadioGroupOption<T> = { label: string; value: T };

export type RadioGroupProps<T> = {
  onChange: (value: T) => void;
  options: RadioGroupOption<T>[];
  value: T;
};

export const binaryOptions: RadioGroupOption<boolean>[] = [
  { label: "On", value: true },
  { label: "Off", value: false },
] as const;

export default function RadioGroup<T>({
  onChange,
  options,
  value,
}: RadioGroupProps<T>) {
  return (
    <div class="RadioGroup">
      {options.map((option) => {
        const onClick = () => onChange(option.value);

        return (
          <Button
            isSelected={option.value === value}
            key={option.value}
            label={option.label}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
}
