import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Setting from "../../components/setting";
import { IntegerUnit } from "../../models/integer";
import { useCalculatorUnit } from "./store";

const unitOptions: RadioGroupOption<IntegerUnit>[] = [
  { label: "Byte", value: IntegerUnit.Byte },
  { label: "Word", value: IntegerUnit.Word },
] as const;

export default function CalculatorSettingUnit() {
  const [unit, setUnit] = useCalculatorUnit();

  return (
    <Setting hotkey="Y/W" label="Unit">
      <RadioGroup onChange={setUnit} options={unitOptions} value={unit} />
    </Setting>
  );
}
