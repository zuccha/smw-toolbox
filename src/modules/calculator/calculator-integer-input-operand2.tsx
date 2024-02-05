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
  useCalculatorOperand2,
  useCalculatorOperand2Visibility,
  useCalculatorOperation,
  useCalculatorUnit,
} from "./store";
import { OperationLabel } from "./use-operations";
import { padL } from "../../utils";

export default forwardRef<IntegerInputRef>(
  function CalculatorIntegerInputOperand2(_props, ref) {
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

    const [operand2, { setValue: setOperand2 }] =
      useCalculatorOperand2(integerContext);

    const [operand2Visibility, setOperand2Visibility] =
      useCalculatorOperand2Visibility();

    const [operation] = useCalculatorOperation();
    const operationLabel = padL(OperationLabel[operation], 3, " ");
    const [prefixBin, prefixDec, prefixHex] = operand2Visibility[0]
      ? [operationLabel, "   ", "   "]
      : operand2Visibility[1]
      ? ["   ", operationLabel, "   "]
      : operand2Visibility[2]
      ? ["   ", "   ", operationLabel]
      : ["   ", "   ", "   "];

    return (
      <IntegerInput
        autoFocus
        caret={caret}
        integer={operand2}
        isSignedBin={isBinSigned}
        isSignedDec={isDecSigned}
        isSignedHex={isHexSigned}
        onChangeValue={setOperand2}
        onChangeVisibility={setOperand2Visibility}
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
        visibility={operand2Visibility}
      />
    );
  },
);
