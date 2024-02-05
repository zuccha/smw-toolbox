import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Setting from "../../components/setting";
import { IntegerStringTypingMode } from "../../models/integer-string";
import { useCalculatorEditorsTypingMode } from "./store";

const typingModeOptions: RadioGroupOption<IntegerStringTypingMode>[] = [
  { label: "Insert", value: IntegerStringTypingMode.Insert },
  { label: "Overwrite", value: IntegerStringTypingMode.Overwrite },
] as const;

export default function CalculatorSettingTypingMode() {
  const [typingMode, setTypingMode] = useCalculatorEditorsTypingMode();

  return (
    <Setting hotkey="I/O" label="Typing Mode">
      <RadioGroup
        onChange={setTypingMode}
        options={typingModeOptions}
        value={typingMode}
      />
    </Setting>
  );
}
