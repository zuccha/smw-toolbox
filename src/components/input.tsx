import { useCallback, useRef } from "preact/hooks";
import "./input.css";

export type InputProps = {
  max?: number;
  min?: number;
  onChange: (value: string) => void;
  pattern?: RegExp;
  placeholder: string;
  type: "number" | "text";
  value: string;
};

export default function Input({
  max,
  min,
  onChange,
  pattern,
  placeholder,
  type,
  value,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<string>(value);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = e.currentTarget.value;
      if (!pattern || pattern.test(nextValue)) {
        onChange(nextValue);
        valueRef.current = nextValue;
      } else if (inputRef.current) {
        const selectionStart = inputRef.current.selectionStart;
        const selectionEnd = inputRef.current.selectionEnd;
        inputRef.current.value = valueRef.current;
        if (type === "text") {
          inputRef.current.selectionStart = selectionStart
            ? selectionStart - 1
            : selectionStart;
          inputRef.current.selectionEnd = selectionEnd
            ? selectionEnd - 1
            : selectionEnd;
        }
      }
    },
    [onChange, pattern, type]
  );

  return (
    <input
      class="input"
      max={max}
      min={min}
      onChange={handleChange}
      placeholder={placeholder}
      ref={inputRef}
      type={type}
      value={value}
    />
  );
}
