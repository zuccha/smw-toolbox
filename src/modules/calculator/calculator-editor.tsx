import { Copy, ClipboardPaste, Check } from "lucide-preact";
import { ReactNode, useCallback } from "preact/compat";
import IconButton from "../../components/icon-button";
import useComponentsWithCooldown from "../../hooks/use-alternate-with-cooldown";

type CalculatorEditorProps = {
  children: ReactNode;
  isPasteIconHidden?: boolean;
  label: string;
  onCopy: () => void;
  onPaste: () => void;
};

export default function CalculatorEditor({
  children,
  isPasteIconHidden = false,
  label,
  onCopy,
  onPaste,
}: CalculatorEditorProps) {
  const [CopyOrCheck, startCopyCooldown] = useComponentsWithCooldown(
    Copy,
    Check,
    1000,
  );

  const copy = useCallback(() => {
    startCopyCooldown();
    onCopy();
  }, [onCopy, startCopyCooldown]);

  return (
    <>
      <span class="Calculator_Editor_Label">{label}</span>
      <div class="Calculator_Editor_Input">{children}</div>
      <div class="Calculator_Editor_Actions">
        <IconButton Icon={CopyOrCheck} onClick={copy} tooltip="Copy" />
        {!isPasteIconHidden && (
          <IconButton Icon={ClipboardPaste} onClick={onPaste} tooltip="Paste" />
        )}
      </div>
    </>
  );
}
