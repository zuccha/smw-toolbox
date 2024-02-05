import { useCallback, useRef } from "preact/hooks";
import "./input.css";

export type InputProps = {
  max?: number;
  min?: number;
  onChange: (value: string) => string | void;
  pattern?: RegExp;
  placeholder: string;
  size?: number;
  type: "number" | "text";
  value: string;
};

export default function Input({
  max,
  min,
  onChange,
  pattern,
  placeholder,
  size,
  type,
  value,
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<string>(value);

  const restoreValue = useCallback(() => {
    if (!inputRef.current) return;

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
  }, [type]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const nextValue = e.currentTarget.value;
      if (!pattern || pattern.test(nextValue)) {
        const otherNextValue = onChange(nextValue);
        if (otherNextValue === undefined) {
          valueRef.current = nextValue;
        } else {
          if (otherNextValue !== nextValue) restoreValue();
          valueRef.current = otherNextValue;
        }
      } else if (inputRef.current) {
        restoreValue();
      }
    },
    [onChange, pattern, restoreValue],
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent hotkeys from triggering,
    e.stopPropagation();
  }, []);

  return (
    <input
      class="Input"
      max={max}
      min={min}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      ref={inputRef}
      size={size}
      type={type}
      value={value}
    />
  );
}
