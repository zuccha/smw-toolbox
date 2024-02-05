import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Setting from "../../components/setting";
import { IntegerUnit } from "../../models/integer";
import { useTableEditorUnit } from "./store";

const unitOptions: RadioGroupOption<IntegerUnit>[] = [
  { label: "Byte", value: IntegerUnit.Byte },
  { label: "Word", value: IntegerUnit.Word },
] as const;

export default function AppEditorSettingUnit() {
  const [unit, setUnit] = useTableEditorUnit();

  return (
    <Setting label="Unit (Y/W)">
      <RadioGroup onChange={setUnit} options={unitOptions} value={unit} />
    </Setting>
  );
}
