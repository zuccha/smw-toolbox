import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Setting from "../../components/setting";
import { IntegerStringTypingDirection } from "../../models/integer-string";
import { useCalculatorEditorsTypingDirection } from "./store";

const typingDirectionOptions: RadioGroupOption<IntegerStringTypingDirection>[] =
  [
    { label: "Left", value: IntegerStringTypingDirection.Left },
    { label: "Right", value: IntegerStringTypingDirection.Right },
  ] as const;

export default function CalculatorSettingTypingDirection() {
  const [typingDirection, setTypingDirection] =
    useCalculatorEditorsTypingDirection();

  return (
    <Setting hotkey="L/R" label="Typing Direction">
      <RadioGroup
        onChange={setTypingDirection}
        options={typingDirectionOptions}
        value={typingDirection}
      />
    </Setting>
  );
}
