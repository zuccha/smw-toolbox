import { useMemo } from "preact/hooks";
import { forwardRef } from "preact/compat";
import IntegerInput, { IntegerInputRef } from "../../components/integer-input";
import { IntegerEncoding } from "../../models/integer";
import {
  useCalculatorEditorBinIsSigned,
  useCalculatorEditorDecIsSigned,
  useCalculatorEditorHexIsSigned,
  useCalculatorEditorsCaret,
  useCalculatorEditorsShouldFlipBitOnClick,
  useCalculatorEditorsShouldMoveAfterTyping,
  useCalculatorEditorsSpaceFrequency,
  useCalculatorEditorsTypingDirection,
  useCalculatorEditorsTypingMode,
  useCalculatorOperand1,
  useCalculatorOperand2,
  useCalculatorOperation,
  useCalculatorResultVisibility,
  useCalculatorUnit,
} from "./store";
import useResult from "./use-result";

export default forwardRef<IntegerInputRef>(
  function CalculatorIntegerInputResult(_props, ref) {
    const [isBinSigned] = useCalculatorEditorBinIsSigned();
    const [isDecSigned] = useCalculatorEditorDecIsSigned();
    const [isHexSigned] = useCalculatorEditorHexIsSigned();

    const [caret] = useCalculatorEditorsCaret();
    const [shouldFlipBitOnClick] = useCalculatorEditorsShouldFlipBitOnClick();
    const [shouldMoveAfterTyping] = useCalculatorEditorsShouldMoveAfterTyping();
    const [spaceFrequency] = useCalculatorEditorsSpaceFrequency();
    const [typingDirection] = useCalculatorEditorsTypingDirection();
    const [typingMode] = useCalculatorEditorsTypingMode();

    const [unit] = useCalculatorUnit();

    const integerContext = useMemo(
      () => ({ encoding: IntegerEncoding.Bin, isSigned: false, unit }),
      [unit],
    );

    const [operand1] = useCalculatorOperand1(integerContext);
    const [operand2] = useCalculatorOperand2(integerContext);
    const [operation] = useCalculatorOperation();
    const [result, setResult] = useResult(operand1, operand2, operation, unit);

    const [resultVisibility, setResultVisibility] =
      useCalculatorResultVisibility();

    const [prefixBin, prefixDec, prefixHex] = resultVisibility[0]
      ? ["  =", "   ", "   "]
      : resultVisibility[1]
      ? ["   ", "  =", "   "]
      : resultVisibility[2]
      ? ["   ", "   ", "  ="]
      : ["   ", "   ", "   "];

    return (
      <IntegerInput
        autoFocus
        caret={caret}
        integer={result}
        isPasteIconHidden
        isDisabled
        isSignedBin={isBinSigned}
        isSignedDec={isDecSigned}
        isSignedHex={isHexSigned}
        onChangeValue={setResult}
        onChangeVisibility={setResultVisibility}
        minCaptionEncoding={IntegerEncoding.Bin}
        prefixBin={prefixBin}
        prefixDec={prefixDec}
        prefixHex={prefixHex}
        ref={ref}
        shouldFlipBitOnClick={shouldFlipBitOnClick}
        shouldMoveAfterTyping={shouldMoveAfterTyping}
        shouldShowLine
        spaceFrequency={spaceFrequency}
        typingDirection={typingDirection}
        typingMode={typingMode}
        unit={unit}
        visibility={resultVisibility}
      />
    );
  },
);
