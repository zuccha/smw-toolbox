import { useMemo } from "preact/hooks";
import { useAppHotkeysIsEnabled } from "../../app/store";
import useHotkeys, { Hotkey } from "../../hooks/use-hotkeys";
import { IntegerUnit } from "../../models/integer";
import {
  IntegerStringTypingMode,
  IntegerStringTypingDirection,
} from "../../models/integer-string";
import { ok, toggle } from "../../utils";
import useOperations from "./use-operations";
import {
  useCalculatorEditorDecIsSigned,
  useCalculatorEditorsShouldFlipBitOnClick,
  useCalculatorEditorsShouldMoveAfterTyping,
  useCalculatorEditorsTypingDirection,
  useCalculatorEditorsTypingMode,
  useCalculatorIsAdvanced,
  useCalculatorTabSettingsIsVisible,
  useCalculatorTabTutorialIsVisible,
  useCalculatorUnit,
} from "./store";
import useActions from "./use-actions";

export default function CalculatorHotkeys() {
  const [isHotkeysEnabled] = useAppHotkeysIsEnabled();
  const [isAdvanced, setIsAdvanced] = useCalculatorIsAdvanced();
  const { add, and, or, subtract, xor } = useOperations();

  const [, setIsDecSigned] = useCalculatorEditorDecIsSigned();
  const [, setShouldFlipBitOnClick] =
    useCalculatorEditorsShouldFlipBitOnClick();
  const [, setShouldMoveAfterTyping] =
    useCalculatorEditorsShouldMoveAfterTyping();
  const [, setTypingDirection] = useCalculatorEditorsTypingDirection();
  const [, setTypingMode] = useCalculatorEditorsTypingMode();

  const [, setIsTabSettingsVisible] = useCalculatorTabSettingsIsVisible();
  const [, setIsTabTutorialVisible] = useCalculatorTabTutorialIsVisible();

  const [, setUnit] = useCalculatorUnit();

  const { clear, finalize, swap } = useActions();

  const hotkeys = useMemo(() => {
    const hotkeys: Hotkey[] = [];

    // prettier-ignore
    if (isHotkeysEnabled) {
      hotkeys.push({ key: "q", onPress: () => setIsAdvanced(toggle) });
      hotkeys.push({ key: "s", onPress: () => setIsTabSettingsVisible(toggle) });
      hotkeys.push({ key: "h", onPress: () => setIsTabTutorialVisible(toggle) });
      hotkeys.push({ key: "t", onPress: () => setShouldFlipBitOnClick(toggle) });
      hotkeys.push({ key: "y", onPress: () => setUnit(IntegerUnit.Byte) });
      hotkeys.push({ key: "w", onPress: () => setUnit(IntegerUnit.Word) });
      hotkeys.push({ key: "i", onPress: () => setTypingMode(IntegerStringTypingMode.Insert) });
      hotkeys.push({ key: "o", onPress: () => setTypingMode(IntegerStringTypingMode.Overwrite) });
      hotkeys.push({ key: "l", onPress: () => setTypingDirection(IntegerStringTypingDirection.Left) });
      hotkeys.push({ key: "r", onPress: () => setTypingDirection(IntegerStringTypingDirection.Right) });
      hotkeys.push({ key: "m", onPress: () => setShouldMoveAfterTyping(toggle) });
      hotkeys.push({ key: "n", onPress: () => setIsDecSigned(toggle) });

      if (isAdvanced) {
        hotkeys.push({ key: "Backspace", ctrl: true, onPress: () => ok(clear()) });
        hotkeys.push({ key: "Delete", ctrl: true, onPress: () => ok(clear()) });
        hotkeys.push({ key: ";", onPress: swap });
        hotkeys.push({ key: "+", onPress: add });
        hotkeys.push({ key: "-", onPress: subtract });
        hotkeys.push({ key: "&", onPress: and });
        hotkeys.push({ key: "|", onPress: or });
        hotkeys.push({ key: "^", onPress: xor });
        hotkeys.push({ key: "=", onPress: finalize });
      }
    }

    return hotkeys;
  }, [
    add,
    and,
    isAdvanced,
    clear,
    finalize,
    isHotkeysEnabled,
    or,
    setTypingMode,
    setUnit,
    subtract,
    swap,
    xor,
  ]);

  useHotkeys(hotkeys);

  return null;
}
