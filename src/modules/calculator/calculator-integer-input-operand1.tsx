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
  useCalculatorOperand1Visibility,
  useCalculatorUnit,
} from "./store";

export default forwardRef<IntegerInputRef>(
  function CalculatorIntegerInputOperand1(_props, ref) {
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

    const [operand1, { setValue: setOperand1 }] =
      useCalculatorOperand1(integerContext);

    const [operand1Visibility, setOperand1Visibility] =
      useCalculatorOperand1Visibility();

    return (
      <IntegerInput
        autoFocus
        caret={caret}
        integer={operand1}
        isSignedBin={isBinSigned}
        isSignedDec={isDecSigned}
        isSignedHex={isHexSigned}
        onChangeValue={setOperand1}
        onChangeVisibility={setOperand1Visibility}
        minCaptionEncoding={IntegerEncoding.Bin}
        prefixBin="BIN"
        prefixDec="DEC"
        prefixHex="HEX"
        ref={ref}
        shouldFlipBitOnClick={shouldFlipBitOnClick}
        shouldMoveAfterTyping={shouldMoveAfterTyping}
        spaceFrequency={spaceFrequency}
        typingDirection={typingDirection}
        typingMode={typingMode}
        unit={unit}
        visibility={operand1Visibility}
      />
    );
  },
);
