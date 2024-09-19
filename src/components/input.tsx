import { useCallback, useRef } from "preact/hooks";
import "./input.css";

export type InputProps = {
  format?: (value: string) => string;
  max?: number;
  min?: number;
  onChange: (value: string) => string | void;
  pattern?: RegExp;
  placeholder: string;
  prefix?: string;
  size?: number;
  type: "number" | "text";
  value: string;
};

export default function Input({
  format,
  max,
  min,
  onChange,
  pattern,
  placeholder,
  prefix = "",
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

  const handleMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    inputRef.current?.focus();
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const nextValue = e.currentTarget.value;
      if (
        (!pattern || pattern.test(nextValue)) &&
        (size === undefined || nextValue.length <= size)
      ) {
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
      if (format) valueRef.current = format(valueRef.current);
    },
    [format, onChange, pattern, restoreValue, size],
  );

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Prevent hotkeys from triggering,
    e.stopPropagation();
  }, []);

  return (
    <div class="Input" onMouseDown={handleMouseDown}>
      {prefix && <span class="Input_Prefix">{prefix}</span>}
      <input
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
    </div>
  );
}
