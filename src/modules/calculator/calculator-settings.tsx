import { isMobile } from "react-device-detect";
import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import SectionCollapsible from "../../components/section-collapsible";
import Setting from "../../components/setting";
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
  useCalculatorUnit,
} from "./store";
import {
  IntegerEditorCaret,
  IntegerEditorSpaceFrequency,
} from "../../components/integer-editor";
import { KeyboardMode } from "../../components/keyboard";
import { IntegerUnit } from "../../models/integer";
import {
  IntegerStringTypingDirection,
  IntegerStringTypingMode,
} from "../../models/integer-string";

const binaryOptions: RadioGroupOption<boolean>[] = [
  { label: "On", value: true },
  { label: "Off", value: false },
] as const;

const caretOptions: RadioGroupOption<IntegerEditorCaret>[] = [
  { label: "Bar", value: IntegerEditorCaret.Bar },
  { label: "Box", value: IntegerEditorCaret.Box },
  { label: "Underline", value: IntegerEditorCaret.Underline },
] as const;

const keyboardModeOptions: RadioGroupOption<KeyboardMode>[] = [
  { label: "None", value: KeyboardMode.None },
  { label: "Compact", value: KeyboardMode.Compact },
  { label: "Full", value: KeyboardMode.Full },
] as const;

const spaceFrequencyOptions: RadioGroupOption<IntegerEditorSpaceFrequency>[] = [
  { label: "None", value: IntegerEditorSpaceFrequency.None },
  { label: "8 Digits", value: IntegerEditorSpaceFrequency.Digits8 },
  { label: "4 Digits", value: IntegerEditorSpaceFrequency.Digits4 },
] as const;

const typingDirectionOptions: RadioGroupOption<IntegerStringTypingDirection>[] =
  [
    { label: "Left", value: IntegerStringTypingDirection.Left },
    { label: "Right", value: IntegerStringTypingDirection.Right },
  ] as const;

const typingModeOptions: RadioGroupOption<IntegerStringTypingMode>[] = [
  { label: "Insert", value: IntegerStringTypingMode.Insert },
  { label: "Overwrite", value: IntegerStringTypingMode.Overwrite },
] as const;

const unitOptions: RadioGroupOption<IntegerUnit>[] = [
  { label: "Byte", value: IntegerUnit.Byte },
  { label: "Word", value: IntegerUnit.Word },
] as const;

export type CalculatorSettingsProps = {
  isVisible: boolean;
  onChangeVisibility: (value: boolean) => void;
};

export default function CalculatorSettings({
  isVisible,
  onChangeVisibility,
}: CalculatorSettingsProps) {
  const [isBinSigned, setIsBinSigned] = useCalculatorEditorBinIsSigned();
  const [isDecSigned, setIsDecSigned] = useCalculatorEditorDecIsSigned();
  const [isHexSigned, setIsHexSigned] = useCalculatorEditorHexIsSigned();

  const [caret, setCaret] = useCalculatorEditorsCaret();
  const [shouldFlipBitOnClick, setShouldFlipBitOnClick] =
    useCalculatorEditorsShouldFlipBitOnClick();
  const [shouldMoveAfterTyping, setShouldMoveAfterTyping] =
    useCalculatorEditorsShouldMoveAfterTyping();
  const [spaceFrequency, setSpaceFrequency] =
    useCalculatorEditorsSpaceFrequency();
  const [typingDirection, setTypingDirection] =
    useCalculatorEditorsTypingDirection();
  const [typingMode, setTypingMode] = useCalculatorEditorsTypingMode();

  const [isAdvanced, setIsAdvanced] = useCalculatorIsAdvanced();

  const [keyboardMode, setKeyboardMode] = useCalculatorKeyboardMode();

  const [unit, setUnit] = useCalculatorUnit();

  return (
    <SectionCollapsible
      isVisible={isVisible}
      label="Settings"
      onChange={onChangeVisibility}
    >
      <div class="App_SectionRow">
        <Setting hotkey="Q" label="Advanced">
          <RadioGroup
            onChange={setIsAdvanced}
            options={binaryOptions}
            value={isAdvanced}
          />
        </Setting>

        <Setting hotkey="Y/W" label="Unit">
          <RadioGroup onChange={setUnit} options={unitOptions} value={unit} />
        </Setting>

        {!isMobile && (
          <Setting label="Keyboard">
            <RadioGroup
              onChange={setKeyboardMode}
              options={keyboardModeOptions}
              value={keyboardMode}
            />
          </Setting>
        )}

        <Setting hotkey="I/O" label="Typing Mode">
          <RadioGroup
            onChange={setTypingMode}
            options={typingModeOptions}
            value={typingMode}
          />
        </Setting>

        <Setting hotkey="L/R" label="Typing Direction">
          <RadioGroup
            onChange={setTypingDirection}
            options={typingDirectionOptions}
            value={typingDirection}
          />
        </Setting>

        <Setting hotkey="M" label="Move Cursor">
          <RadioGroup
            onChange={setShouldMoveAfterTyping}
            options={binaryOptions}
            value={shouldMoveAfterTyping}
          />
        </Setting>

        <Setting hotkey="T" label="Flip Bit">
          <RadioGroup
            onChange={setShouldFlipBitOnClick}
            options={binaryOptions}
            value={shouldFlipBitOnClick}
          />
        </Setting>

        <Setting label="Signed Binary">
          <RadioGroup
            onChange={setIsBinSigned}
            options={binaryOptions}
            value={isBinSigned}
          />
        </Setting>

        <Setting hotkey="N" label="Signed Decimal">
          <RadioGroup
            onChange={setIsDecSigned}
            options={binaryOptions}
            value={isDecSigned}
          />
        </Setting>

        <Setting label="Signed Hexadecimal">
          <RadioGroup
            onChange={setIsHexSigned}
            options={binaryOptions}
            value={isHexSigned}
          />
        </Setting>

        <Setting label="Caret">
          <RadioGroup
            onChange={setCaret}
            options={caretOptions}
            value={caret}
          />
        </Setting>

        <Setting label="Space Frequency">
          <RadioGroup
            onChange={setSpaceFrequency}
            options={spaceFrequencyOptions}
            value={spaceFrequency}
          />
        </Setting>
      </div>
    </SectionCollapsible>
  );
}
