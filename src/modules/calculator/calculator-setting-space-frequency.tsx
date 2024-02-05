import { IntegerStringInputSpaceFrequency } from "../../components/integer-string-input";
import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Setting from "../../components/setting";
import { useCalculatorEditorsSpaceFrequency } from "./store";

const spaceFrequencyOptions: RadioGroupOption<IntegerStringInputSpaceFrequency>[] =
  [
    { label: "None", value: IntegerStringInputSpaceFrequency.None },
    { label: "8 Digits", value: IntegerStringInputSpaceFrequency.Digits8 },
    { label: "4 Digits", value: IntegerStringInputSpaceFrequency.Digits4 },
  ] as const;

export default function CalculatorSettingSpaceFrequency() {
  const [spaceFrequency, setSpaceFrequency] =
    useCalculatorEditorsSpaceFrequency();

  return (
    <Setting label="Space Frequency">
      <RadioGroup
        onChange={setSpaceFrequency}
        options={spaceFrequencyOptions}
        value={spaceFrequency}
      />
    </Setting>
  );
}
