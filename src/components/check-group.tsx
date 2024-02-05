import { replace } from "../utils";
import Button from "./button";
import "./check-group.css";

export type CheckGroupProps<T extends boolean[]> = {
  labels: string[];
  onChange: (values: T) => void;
  values: T;
};

export default function CheckGroup<T extends boolean[]>({
  labels,
  onChange,
  values,
}: CheckGroupProps<T>) {
  return (
    <div class="CheckGroup">
      {labels.map((label, i) => {
        const value = values[i];
        if (value === undefined) return null;

        const onClick = () => {
          const nextValues = replace(values, i, !value) as T;
          onChange(nextValues);
        };
        return (
          <Button
            isSelected={value}
            key={label}
            label={label}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
}
