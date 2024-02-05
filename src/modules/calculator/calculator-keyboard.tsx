import { useMemo } from "preact/hooks";
import { isMobile } from "react-device-detect";
import Keyboard, {
  KeyboardMode,
  KeyboardAction,
} from "../../components/keyboard";
import { IntegerHexDigits } from "../../models/integer";
import { useCalculatorIsAdvanced, useCalculatorKeyboardMode } from "./store";
import useActions from "./use-actions";
import useOperations from "./use-operations";

const type = (key: string, shiftKey?: boolean) => () => {
  if (document.activeElement)
    document.activeElement.dispatchEvent(
      new KeyboardEvent("keydown", { key, shiftKey }),
    );
};

type CalculatorKeyboardProps = {
  onMoveDown: () => void;
  onMoveUp: () => void;
};

export default function CalculatorKeyboard({
  onMoveDown,
  onMoveUp,
}: CalculatorKeyboardProps) {
  const [isAdvanced] = useCalculatorIsAdvanced();
  const [keyboardMode] = useCalculatorKeyboardMode();
  const { add, and, or, subtract, xor } = useOperations();

  const { clear, finalize, swap } = useActions();

  const actions = useMemo(() => {
    if (!isMobile && keyboardMode === KeyboardMode.None) return [];

    const keys: KeyboardAction[] = [];

    if (isMobile || (keyboardMode !== KeyboardMode.None && isAdvanced))
      keys.push(
        { label: "+", onClick: add },
        { label: "-", onClick: subtract },
        { label: "AND", onClick: and, size: "xs" },
        { label: "OR", onClick: or, size: "xs" },
        { label: "XOR", onClick: xor, size: "xs" },
        { label: "=", onClick: finalize },
        { label: "SWAP", onClick: swap, size: "xs" },
        { label: "AC", onClick: clear, size: "s" },
      );

    if (isMobile || keyboardMode !== KeyboardMode.None)
      keys.push(
        { label: "NEG", onClick: type("!"), size: "xs" },
        { label: "«", onClick: type("<") },
        { label: "»", onClick: type(">") },
        { label: "ROL", onClick: type("{"), size: "xs" },
        { label: "ROR", onClick: type("}"), size: "xs" },
        { label: "DEL", onClick: type("Delete"), size: "xs" },
        { label: "⌫", onClick: type("Backspace") },
        { label: "Cl", onClick: type("Delete", true), size: "s" },
      );

    if (isMobile || keyboardMode === KeyboardMode.Full)
      keys.push(
        ...IntegerHexDigits.map((digit) => ({
          label: digit,
          onClick: type(digit),
        })),
        { label: "INC", onClick: type(" "), size: "xs" },
        { label: "DEC", onClick: type(" ", true), size: "xs" },
        { label: " ", onClick: type(" "), colSpan: 2 },
        { label: "←", onClick: type("ArrowLeft") },
        { label: "↑", onClick: onMoveUp },
        { label: "↓", onClick: onMoveDown },
        { label: "→", onClick: type("ArrowRight") },
      );

    return keys;
  }, [
    add,
    and,
    isAdvanced,
    clear,
    finalize,
    keyboardMode,
    onMoveDown,
    onMoveUp,
    or,
    subtract,
    swap,
    xor,
  ]);

  return actions.length > 0 ? <Keyboard actions={actions} /> : null;
}
