import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Setting from "../../components/setting";
import { useTableEditorShouldSpaceValues } from "./store";

const binaryOptions: RadioGroupOption<boolean>[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
] as const;

export default function AppEditorSettingSpaceValues() {
  const [shouldSpaceValues, setShouldSpaceValues] =
    useTableEditorShouldSpaceValues();

  return (
    <Setting label="Space Values">
      <RadioGroup
        onChange={setShouldSpaceValues}
        options={binaryOptions}
        value={shouldSpaceValues}
      />
    </Setting>
  );
}
