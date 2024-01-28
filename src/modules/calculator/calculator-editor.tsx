import { Copy, ClipboardPaste } from "lucide-preact";
import { ReactNode } from "preact/compat";
import IconButton from "../../components/icon-button";

type CalculatorEditor = {
  children: ReactNode;
  label: string;
  onCopy: () => void;
  onPaste: () => void;
};

export default function Calculator({
  children,
  label,
  onCopy,
  onPaste,
}: CalculatorEditor) {
  return (
    <>
      <span class="calculator-editor-label">{label}</span>
      <div class="calculator-editor-input">{children}</div>
      <div class="calculator-editor-actions">
        <IconButton
          label={<Copy size="1.5em" />}
          onClick={onCopy}
          tooltip="Copy"
        />
        <IconButton
          label={<ClipboardPaste size="1.5em" />}
          onClick={onPaste}
          tooltip="Paste"
        />
      </div>
    </>
  );
}
