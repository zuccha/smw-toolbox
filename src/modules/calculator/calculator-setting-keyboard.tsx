import { isMobile } from "react-device-detect";
import { KeyboardMode } from "../../components/keyboard";
import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Setting from "../../components/setting";
import { useCalculatorKeyboardMode } from "./store";

const keyboardModeOptions: RadioGroupOption<KeyboardMode>[] = [
  { label: "None", value: KeyboardMode.None },
  { label: "Compact", value: KeyboardMode.Compact },
  { label: "Full", value: KeyboardMode.Full },
] as const;

export default function CalculatorSettingKeyboard() {
  const [keyboardMode, setKeyboardMode] = useCalculatorKeyboardMode();

  return isMobile ? null : (
    <Setting label="Keyboard">
      <RadioGroup
        onChange={setKeyboardMode}
        options={keyboardModeOptions}
        value={keyboardMode}
      />
    </Setting>
  );
}
