import { useCallback, useMemo, useRef, useState } from "preact/hooks";
import { isMobile } from "react-device-detect";
import { useAppHotkeysIsEnabled } from "../../app/store";
import Caption from "../../components/caption";
import CheckGroup from "../../components/check-group";
import Keyboard, {
  KeyboardAction,
  KeyboardMode,
} from "../../components/keyboard";
import SectionStatic from "../../components/section-static";
import { useIntegerStore } from "../../hooks/use-integer";
import {
  IntegerBoundsUnsigned,
  IntegerEncoding,
  IntegerFromValue,
  IntegerHexDigits,
  IntegerOperation,
  IntegerUnit,
  defaultInteger,
} from "../../models/integer";
import {
  IntegerStringTypingDirection,
  IntegerStringTypingMode,
} from "../../models/integer-string";
import { Direction } from "../../types";
import { isNothingFocused, mod, ok, toggle } from "../../utils";
import AppEditors, { CalculatorEditorsRef } from "./calculator-editors";
import CalculatorTutorial from "./calculator-tutorial";
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
  useCalculatorIsAdvanced,
  useCalculatorKeyboardMode,
  useCalculatorOperand1Visibility,
  useCalculatorOperand2Visibility,
  useCalculatorResultVisibility,
  useCalculatorTabSettingsIsVisible,
  useCalculatorTabTutorialIsVisible,
  useCalculatorUnit,
} from "./store";
import "./calculator.css";
import useHotkeys, { Hotkey } from "../../hooks/use-hotkeys";
import CalculatorSettings from "./calculator-settings";

//==============================================================================
// Settings Options
//==============================================================================

const groupVisibilityLabels = ["B", "D", "H"];

const OperationLabel = {
  [IntegerOperation.And]: "AND",
  [IntegerOperation.Add]: "+",
  [IntegerOperation.Or]: "OR",
  [IntegerOperation.Subtract]: "-",
  [IntegerOperation.Xor]: "XOR",
};

//==============================================================================
// Calculator
//==============================================================================

export default function Calculator() {
  //----------------------------------------------------------------------------
  // Store
  //----------------------------------------------------------------------------

  const [isBinSigned] = useCalculatorEditorBinIsSigned();
  const [isDecSigned, setIsDecSigned] = useCalculatorEditorDecIsSigned();
  const [isHexSigned] = useCalculatorEditorHexIsSigned();

  const [caret] = useCalculatorEditorsCaret();
  const [shouldFlipBitOnClick, setShouldFlipBitOnClick] =
    useCalculatorEditorsShouldFlipBitOnClick();
  const [shouldMoveAfterTyping, setShouldMoveAfterTyping] =
    useCalculatorEditorsShouldMoveAfterTyping();
  const [spaceFrequency] = useCalculatorEditorsSpaceFrequency();
  const [typingDirection, setTypingDirection] =
    useCalculatorEditorsTypingDirection();
  const [typingMode, setTypingMode] = useCalculatorEditorsTypingMode();

  const [isAdvanced, setIsAdvanced] = useCalculatorIsAdvanced();

  const [keyboardMode] = useCalculatorKeyboardMode();

  const [operand1Visibility, setOperand1Visibility] =
    useCalculatorOperand1Visibility();
  const [operand2Visibility, setOperand2Visibility] =
    useCalculatorOperand2Visibility();
  const [resultVisibility, setResultVisibility] =
    useCalculatorResultVisibility();

  const [isTabSettingsVisible, setIsTabSettingsVisible] =
    useCalculatorTabSettingsIsVisible();
  const [isTabTutorialVisible, setIsTabTutorialVisible] =
    useCalculatorTabTutorialIsVisible();

  const [unit, setUnit] = useCalculatorUnit();

  //----------------------------------------------------------------------------
  // State
  //----------------------------------------------------------------------------

  const operand1Ref = useRef<CalculatorEditorsRef>(null);
  const operand2Ref = useRef<CalculatorEditorsRef>(null);
  const resultRef = useRef<CalculatorEditorsRef>(null);

  const integerContext = useMemo(
    () => ({ encoding: IntegerEncoding.Bin, isSigned: false, unit }),
    [unit],
  );

  const [operand1, { setValue: setOperand1 }] = useIntegerStore(
    "Calculator.operand1",
    defaultInteger,
    integerContext,
  );

  const [operand2, { setValue: setOperand2 }] = useIntegerStore(
    "Calculator.operand2",
    defaultInteger,
    integerContext,
  );

  const [operation, setOperation] = useState(IntegerOperation.Add);

  const [result, setResultValue] = useMemo(() => {
    const resultValue = (() => {
      switch (operation) {
        case IntegerOperation.Add:
          return mod(
            operand1.value + operand2.value,
            IntegerBoundsUnsigned[unit].max + 1,
          );
        case IntegerOperation.And:
          return operand1.value & operand2.value;
        case IntegerOperation.Or:
          return operand1.value | operand2.value;
        case IntegerOperation.Subtract:
          return mod(
            operand1.value - operand2.value,
            IntegerBoundsUnsigned[unit].max + 1,
          );
        case IntegerOperation.Xor:
          return operand1.value ^ operand2.value;
      }
    })();
    const result = IntegerFromValue(resultValue, integerContext);
    return [result, () => result];
  }, [integerContext, operand1.value, operand2.value, operation]);

  const clearOperand1 = useCallback(() => setOperand1(0), [setOperand1]);
  const clearOperand2 = useCallback(() => setOperand2(0), [setOperand2]);

  const apply = useCallback(
    (nextOperation: IntegerOperation) => {
      setOperation(nextOperation);
    },
    [operand1],
  );

  const add = useCallback(() => apply(IntegerOperation.Add), [apply]);
  const subtract = useCallback(() => apply(IntegerOperation.Subtract), [apply]);
  const and = useCallback(() => apply(IntegerOperation.And), [apply]);
  const or = useCallback(() => apply(IntegerOperation.Or), [apply]);
  const xor = useCallback(() => apply(IntegerOperation.Xor), [apply]);

  const finalize = useCallback(() => {
    setOperand2(result.value);
  }, [result.value]);

  const clear = useCallback(() => {
    clearOperand1();
    clearOperand2();
  }, [clearOperand1, clearOperand2]);

  const swap = useCallback(() => {
    setOperand1(operand2.value);
    setOperand2(operand1.value);
  }, [operand1.value, operand2.value, setOperand1, setOperand2]);

  //----------------------------------------------------------------------------
  // Editors
  //----------------------------------------------------------------------------

  const props = {
    caret,
    shouldFlipBitOnClick,
    shouldMoveAfterTyping,
    typingDirection,
    typingMode,
    unit,
  };

  //----------------------------------------------------------------------------
  // Keyboard Event Listener
  //----------------------------------------------------------------------------

  const [isHotkeysEnabled] = useAppHotkeysIsEnabled();

  const hotkeys = useMemo(() => {
    const focusOperand1 = () =>
      isNothingFocused()
        ? ok(operand1Ref.current?.focus(Direction.Down))
        : false;

    const hotkeys: Hotkey[] = [{ key: "Tab", onPress: focusOperand1 }];

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

  //----------------------------------------------------------------------------
  // Keyboard
  //----------------------------------------------------------------------------

  const keyboardActions = useMemo(() => {
    const type = (key: string, shiftKey?: boolean) => () => {
      if (document.activeElement)
        document.activeElement.dispatchEvent(
          new KeyboardEvent("keydown", { key, shiftKey }),
        );
    };

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
        { label: "↑", onClick: type("ArrowUp") },
        { label: "↓", onClick: type("ArrowDown") },
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
    operation,
    or,
    subtract,
    swap,
    xor,
  ]);

  //----------------------------------------------------------------------------
  // Caption
  //----------------------------------------------------------------------------

  const isAnyBinVisible =
    operand1Visibility[0] || operand2Visibility[0] || resultVisibility[0];
  const isAnyDecVisible =
    operand1Visibility[1] || operand2Visibility[1] || resultVisibility[1];
  const isAnyHexVisible =
    operand1Visibility[2] || operand2Visibility[2] || resultVisibility[2];

  const [isCaptionSigned, captionEncoding] = isAnyBinVisible
    ? [isBinSigned, IntegerEncoding.Bin]
    : isAnyDecVisible
    ? [isDecSigned, IntegerEncoding.Dec]
    : isAnyHexVisible
    ? [isHexSigned, IntegerEncoding.Hex]
    : [false, undefined];

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------

  return (
    <div class="Calculator App_Module">
      <div class="Calculator App_ModuleBlock">
        <SectionStatic label="Calculator">
          <div class="Calculator_Main">
            <div class="Calculator_Editors">
              <div class="Calculator_Spacer">&nbsp;&nbsp;&nbsp;</div>
              <Caption
                encoding={captionEncoding}
                isSigned={isCaptionSigned}
                spaceFrequency={spaceFrequency}
                unit={unit}
              />
              <div class="Calculator_EditorsVisibility">
                <CheckGroup
                  labels={groupVisibilityLabels}
                  onChange={setOperand1Visibility}
                  values={operand1Visibility}
                />
              </div>

              <AppEditors
                {...props}
                autoFocus
                integer={operand1}
                isSignedBin={isBinSigned}
                isSignedDec={isDecSigned}
                isSignedHex={isHexSigned}
                isVisibleBin={operand1Visibility[0]}
                isVisibleDec={operand1Visibility[1]}
                isVisibleHex={operand1Visibility[2]}
                onChangeValue={setOperand1}
                prefixBin="BIN"
                prefixDec="DEC"
                prefixHex="HEX"
                ref={operand1Ref}
                refNext={operand2Ref}
                spaceFrequency={spaceFrequency}
              />

              {isAdvanced ? (
                <>
                  <div class="Calculator_DividerLine" />
                  <div class="Calculator_EditorsVisibility">
                    <CheckGroup
                      labels={groupVisibilityLabels}
                      onChange={setOperand2Visibility}
                      values={operand2Visibility}
                    />
                  </div>

                  <AppEditors
                    {...props}
                    integer={operand2}
                    isSignedBin={isBinSigned}
                    isSignedDec={isDecSigned}
                    isSignedHex={isHexSigned}
                    isVisibleBin={operand2Visibility[0]}
                    isVisibleDec={operand2Visibility[1]}
                    isVisibleHex={operand2Visibility[2]}
                    onChangeValue={setOperand2}
                    prefixBin={
                      operand2Visibility[0] ? OperationLabel[operation] : ""
                    }
                    prefixDec={
                      !operand2Visibility[0] && operand2Visibility[1]
                        ? OperationLabel[operation]
                        : ""
                    }
                    prefixHex={
                      !operand2Visibility[0] &&
                      !operand2Visibility[1] &&
                      operand2Visibility[2]
                        ? OperationLabel[operation]
                        : ""
                    }
                    ref={operand2Ref}
                    refNext={resultRef}
                    refPrev={operand1Ref}
                    spaceFrequency={spaceFrequency}
                  />

                  <div class="Calculator_DividerLine" />
                  <div class="Calculator_EditorsVisibility">
                    <CheckGroup
                      labels={groupVisibilityLabels}
                      onChange={setResultVisibility}
                      values={resultVisibility}
                    />
                  </div>

                  <AppEditors
                    {...props}
                    integer={result}
                    isDisabled
                    isPasteIconHidden
                    isSignedBin={isBinSigned}
                    isSignedDec={isDecSigned}
                    isSignedHex={isHexSigned}
                    isVisibleBin={resultVisibility[0]}
                    isVisibleDec={resultVisibility[1]}
                    isVisibleHex={resultVisibility[2]}
                    onChangeValue={setResultValue}
                    prefixBin={resultVisibility[0] ? "=" : ""}
                    prefixDec={
                      !resultVisibility[0] && resultVisibility[1] ? "=" : ""
                    }
                    prefixHex={
                      !resultVisibility[0] &&
                      !resultVisibility[1] &&
                      resultVisibility[2]
                        ? "="
                        : ""
                    }
                    ref={resultRef}
                    refPrev={operand2Ref}
                    spaceFrequency={spaceFrequency}
                  />
                </>
              ) : (
                <div class="Calculator_EditorsEmpty" />
              )}
            </div>

            {keyboardActions.length > 0 && (
              <Keyboard actions={keyboardActions} />
            )}
          </div>
        </SectionStatic>
      </div>

      <div class="Calculator App_ModuleBlock">
        <CalculatorSettings
          isVisible={isTabSettingsVisible}
          onChangeVisibility={setIsTabSettingsVisible}
        />

        <CalculatorTutorial
          isVisible={isTabTutorialVisible}
          onChangeVisibility={setIsTabTutorialVisible}
        />
      </div>
    </div>
  );
}
