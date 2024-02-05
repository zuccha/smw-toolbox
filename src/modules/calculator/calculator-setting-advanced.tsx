import RadioGroup, { binaryOptions } from "../../components/radio-group";
import Setting from "../../components/setting";
import { useCalculatorIsAdvanced } from "./store";

export default function CalculatorSettingAdvanced() {
  const [isAdvanced, setIsAdvanced] = useCalculatorIsAdvanced();

  return (
    <Setting hotkey="Q" label="Advanced">
      <RadioGroup
        onChange={setIsAdvanced}
        options={binaryOptions}
        value={isAdvanced}
      />
    </Setting>
  );
}
