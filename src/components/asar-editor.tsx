import { useCallback } from "preact/hooks";
import "./asar-editor.css";

export type AsarEditorProps = {
  onChange: (value: string) => void;
  value: string;
};

export default function AsarEditor({ onChange, value }: AsarEditorProps) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      e.stopPropagation();
      const nextValue = e.currentTarget.value;
      onChange(nextValue);
    },
    [onChange],
  );

  return (
    <textarea
      class="AsarEditor"
      onChange={handleChange}
      placeholder="Write your ASM code here"
      rows={20}
      value={value}
    ></textarea>
  );
}
