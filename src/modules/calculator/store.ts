import { z } from "zod";
import {
  IntegerEditorCaret,
  IntegerEditorCaretSchema,
  IntegerEditorSpaceFrequency,
  IntegerEditorSpaceFrequencySchema,
} from "../../components/integer-editor";
import { KeyboardMode, KeyboardModeSchema } from "../../components/keyboard";
import useStore, { useStoreBoolean } from "../../hooks/use-store";
import { IntegerUnit, IntegerUnitSchema } from "../../models/integer";
import {
  IntegerStringTypingDirection,
  IntegerStringTypingDirectionSchema,
  IntegerStringTypingMode,
  IntegerStringTypingModeSchema,
} from "../../models/integer-string";

export const calculatorId = "Calculator";

const parseBooleanTuple3 = z.array(z.boolean()).length(3).parse;

export const useCalculatorEditorBinIsSigned = () =>
  useStoreBoolean(`${calculatorId}.editor.bin.isSigned`, false);

export const useCalculatorEditorDecIsSigned = () =>
  useStoreBoolean(`${calculatorId}.editor.dec.isSigned`, false);

export const useCalculatorEditorHexIsSigned = () =>
  useStoreBoolean(`${calculatorId}.editor.hex.isSigned`, false);

export const useCalculatorEditorsCaret = () =>
  useStore(
    `${calculatorId}.editors.caret`,
    IntegerEditorCaret.Box,
    IntegerEditorCaretSchema.parse,
  );

export const useCalculatorEditorsShouldFlipBitOnClick = () =>
  useStoreBoolean(`${calculatorId}.editors.shouldFlipBitOnClick`, false);

export const useCalculatorEditorsShouldMoveAfterTyping = () =>
  useStoreBoolean(`${calculatorId}.editors.shouldMoveAfterTyping`, true);

export const useCalculatorEditorsSpaceFrequency = () =>
  useStore(
    `${calculatorId}.editors.spaceFrequency`,
    IntegerEditorSpaceFrequency.Digits8,
    IntegerEditorSpaceFrequencySchema.parse,
  );

export const useCalculatorEditorsTypingDirection = () =>
  useStore(
    `${calculatorId}.editors.typingDirection`,
    IntegerStringTypingDirection.Right,
    IntegerStringTypingDirectionSchema.parse,
  );

export const useCalculatorEditorsTypingMode = () =>
  useStore(
    `${calculatorId}.editors.typingMode`,
    IntegerStringTypingMode.Overwrite,
    IntegerStringTypingModeSchema.parse,
  );

export const useCalculatorIsAdvanced = () =>
  useStoreBoolean(`${calculatorId}.isAdvanced`, false);

export const useCalculatorKeyboardMode = () =>
  useStore(
    `${calculatorId}.keyboard.mode`,
    KeyboardMode.None,
    KeyboardModeSchema.parse,
  );

export const useCalculatorOperand1Visibility = () =>
  useStore(
    `${calculatorId}.operand1.visibility`,
    [true, true, true],
    parseBooleanTuple3,
  );

export const useCalculatorOperand2Visibility = () =>
  useStore(
    `${calculatorId}.operand2.visibility`,
    [true, true, true],
    parseBooleanTuple3,
  );

export const useCalculatorResultVisibility = () =>
  useStore(
    `${calculatorId}.result.visibility`,
    [true, true, true],
    parseBooleanTuple3,
  );

export const useCalculatorTabSettingsIsVisible = () =>
  useStoreBoolean(`${calculatorId}.tab.settings.isVisible`, false);

export const useCalculatorTabTutorialIsVisible = () =>
  useStoreBoolean(`${calculatorId}.tab.tutorial.isVisible`, false);

export const useCalculatorUnit = () =>
  useStore(`${calculatorId}.unit`, IntegerUnit.Byte, IntegerUnitSchema.parse);
