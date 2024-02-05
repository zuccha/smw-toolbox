import { z } from "zod";
import {
  IntegerStringInputCaret,
  IntegerStringInputCaretSchema,
  IntegerStringInputSpaceFrequency,
  IntegerStringInputSpaceFrequencySchema,
} from "../../components/integer-string-input";
import { KeyboardMode, KeyboardModeSchema } from "../../components/keyboard";
import useStore, { useStoreBoolean } from "../../hooks/use-store";
import {
  IntegerContext,
  IntegerOperation,
  IntegerOperationSchema,
  IntegerUnit,
  IntegerUnitSchema,
  defaultInteger,
} from "../../models/integer";
import {
  IntegerStringTypingDirection,
  IntegerStringTypingDirectionSchema,
  IntegerStringTypingMode,
  IntegerStringTypingModeSchema,
} from "../../models/integer-string";
import { useIntegerStore } from "../../hooks/use-integer";

export const calculatorId = "Calculator";

const parseBooleanTuple3 = z.tuple([
  z.boolean(),
  z.boolean(),
  z.boolean(),
]).parse;

const defaultVisibility: [boolean, boolean, boolean] = [true, true, true];

export const useCalculatorEditorBinIsSigned = () =>
  useStoreBoolean(`${calculatorId}.editor.bin.isSigned`, false);

export const useCalculatorEditorDecIsSigned = () =>
  useStoreBoolean(`${calculatorId}.editor.dec.isSigned`, false);

export const useCalculatorEditorHexIsSigned = () =>
  useStoreBoolean(`${calculatorId}.editor.hex.isSigned`, false);

export const useCalculatorEditorsCaret = () =>
  useStore(
    `${calculatorId}.editors.caret`,
    IntegerStringInputCaret.Box,
    IntegerStringInputCaretSchema.parse,
  );

export const useCalculatorEditorsShouldFlipBitOnClick = () =>
  useStoreBoolean(`${calculatorId}.editors.shouldFlipBitOnClick`, false);

export const useCalculatorEditorsShouldMoveAfterTyping = () =>
  useStoreBoolean(`${calculatorId}.editors.shouldMoveAfterTyping`, true);

export const useCalculatorEditorsSpaceFrequency = () =>
  useStore(
    `${calculatorId}.editors.spaceFrequency`,
    IntegerStringInputSpaceFrequency.Digits8,
    IntegerStringInputSpaceFrequencySchema.parse,
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

export const useCalculatorOperand1 = (context: IntegerContext) =>
  useIntegerStore("Calculator.operand1", defaultInteger, context);

export const useCalculatorOperand1Visibility = () =>
  useStore(
    `${calculatorId}.operand1.visibility`,
    defaultVisibility,
    parseBooleanTuple3,
  );

export const useCalculatorOperand2 = (context: IntegerContext) =>
  useIntegerStore("Calculator.operand2", defaultInteger, context);

export const useCalculatorOperand2Visibility = () =>
  useStore(
    `${calculatorId}.operand2.visibility`,
    defaultVisibility,
    parseBooleanTuple3,
  );

export const useCalculatorResultVisibility = () =>
  useStore(
    `${calculatorId}.result.visibility`,
    defaultVisibility,
    parseBooleanTuple3,
  );

export const useCalculatorOperation = () =>
  useStore(
    `${calculatorId}.operation`,
    IntegerOperation.Add,
    IntegerOperationSchema.parse,
  );

export const useCalculatorTabSettingsIsVisible = () =>
  useStoreBoolean(`${calculatorId}.tab.settings.isVisible`, false);

export const useCalculatorTabTutorialIsVisible = () =>
  useStoreBoolean(`${calculatorId}.tab.tutorial.isVisible`, false);

export const useCalculatorUnit = () =>
  useStore(`${calculatorId}.unit`, IntegerUnit.Byte, IntegerUnitSchema.parse);
