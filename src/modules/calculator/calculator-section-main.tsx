import { useCallback, useMemo, useRef } from "preact/hooks";
import { IntegerInputRef } from "../../components/integer-input";
import SectionStatic from "../../components/section-static";
import CalculatorIntegerInputOperand1 from "./calculator-integer-input-operand1";
import CalculatorIntegerInputOperand2 from "./calculator-integer-input-operand2";
import CalculatorIntegerInputResult from "./calculator-integer-input-result";
import CalculatorKeyboard from "./calculator-keyboard";
import { useCalculatorIsAdvanced } from "./store";
import { isNothingFocused } from "../../utils";
import useHotkeys, { Hotkey } from "../../hooks/use-hotkeys";

export default function CalculatorSectionMain() {
  const [isAdvanced] = useCalculatorIsAdvanced();

  const operand1Ref = useRef<IntegerInputRef>(null);
  const operand2Ref = useRef<IntegerInputRef>(null);
  const resultRef = useRef<IntegerInputRef>(null);

  const moveDown = useCallback((): boolean => {
    if (resultRef.current?.hasFocus()) return resultRef.current.moveDown();
    if (operand2Ref.current?.hasFocus())
      return (
        operand2Ref.current.moveDown() ||
        (resultRef.current?.isVisible()
          ? resultRef.current?.focusFirst()
          : false)
      );
    if (operand1Ref.current?.hasFocus())
      return (
        operand1Ref.current.moveDown() ||
        (operand2Ref.current?.isVisible()
          ? operand2Ref.current?.focusFirst()
          : resultRef.current?.isVisible()
          ? resultRef.current?.focusFirst()
          : false)
      );
    return false;
  }, []);

  const moveUp = useCallback((): boolean => {
    if (operand1Ref.current?.hasFocus()) return operand1Ref.current.moveUp();
    if (operand2Ref.current?.hasFocus())
      return (
        operand2Ref.current.moveUp() ||
        (operand1Ref.current?.isVisible()
          ? operand1Ref.current?.focusLast()
          : false)
      );
    if (resultRef.current?.hasFocus())
      return (
        resultRef.current.moveUp() ||
        (operand2Ref.current?.isVisible()
          ? operand2Ref.current?.focusLast()
          : operand1Ref.current?.isVisible()
          ? operand1Ref.current?.focusLast()
          : false)
      );
    return false;
  }, []);

  const hotkeys: Hotkey[] = useMemo(
    () => [
      {
        key: "Tab",
        onPress: () =>
          isNothingFocused()
            ? (operand1Ref.current?.isVisible() &&
                operand1Ref.current?.focusFirst()) ||
              (operand2Ref.current?.isVisible() &&
                operand2Ref.current?.focusFirst()) ||
              (resultRef.current?.isVisible() &&
                resultRef.current?.focusFirst())
            : false,
      },
      {
        key: "ArrowDown",
        onPress: moveDown,
      },
      {
        key: "ArrowUp",
        onPress: moveUp,
      },
    ],
    [moveDown, moveUp],
  );

  useHotkeys(hotkeys);

  return (
    <SectionStatic label="Calculator">
      <div class="App_SectionCol align-items_center">
        <div class="App_SectionCol">
          <CalculatorIntegerInputOperand1 ref={operand1Ref} />

          {isAdvanced && (
            <>
              <CalculatorIntegerInputOperand2 ref={operand2Ref} />
              <CalculatorIntegerInputResult ref={resultRef} />
            </>
          )}
        </div>

        <CalculatorKeyboard onMoveDown={moveDown} onMoveUp={moveUp} />
      </div>
    </SectionStatic>
  );
}
