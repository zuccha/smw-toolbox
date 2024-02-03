import { X } from "lucide-preact";
import { ChangeEvent } from "preact/compat";
import { useCallback, useRef } from "preact/hooks";
import "./input-file.css";
import IconButton from "./icon-button";

export type InputFileProps = {
  fileName: string;
  onChange: (file: File | undefined) => void;
  placeholder: string;
};

export default function InputFile({
  fileName,
  onChange,
  placeholder,
}: InputFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const clear = useCallback(() => onChange(undefined), [onChange]);

  const handleMouseDown = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
      if (e.key === "Backspace" || e.key === "Delete") clear();
    },
    [clear],
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files && e.currentTarget.files[0]) {
        onChange(e.currentTarget.files[0]);
      }
    },
    [onChange],
  );

  return (
    <div
      class="InputFile"
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      tabIndex={0}
    >
      <div class="InputFile_Label">{fileName || placeholder}</div>

      {fileName && (
        <IconButton
          Icon={X}
          onClick={clear}
          tooltip="Remove"
          tooltipPosition="left"
        />
      )}

      <input onChange={handleChange} ref={inputRef} type="file" />
    </div>
  );
}
