import { isMobile } from "react-device-detect";
import Keyboard, { KeyboardAction } from "../../components/keyboard";
import { IntegerHexDigits } from "../../models/integer";

const type = (key: string) => () => {
  if (document.activeElement)
    document.activeElement.dispatchEvent(new KeyboardEvent("keydown", { key }));
};

const keyboardActions: KeyboardAction[] = isMobile
  ? [
      ...IntegerHexDigits.map((digit) => ({
        label: digit,
        onClick: type(digit),
      })),
      { label: "DEL", onClick: type("Delete"), size: "xs" },
      { label: "⌫", onClick: type("Backspace") },
    ]
  : [];

export default function TableEditorKeyboard() {
  return keyboardActions.length > 0 ? (
    <div class="App_Center">
      <Keyboard actions={keyboardActions} rowSize={9} />
    </div>
  ) : null;
}
