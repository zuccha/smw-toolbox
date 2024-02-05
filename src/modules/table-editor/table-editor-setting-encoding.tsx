import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Setting from "../../components/setting";
import { IntegerEncoding } from "../../models/integer";
import { useTableEditorEncoding } from "./store";

const encodingOptions: RadioGroupOption<IntegerEncoding>[] = [
  { label: "Bin", value: IntegerEncoding.Bin },
  { label: "Dec", value: IntegerEncoding.Dec },
  { label: "Hex", value: IntegerEncoding.Hex },
] as const;

export default function AppEditorSettingEncoding() {
  const [encoding, setEncoding] = useTableEditorEncoding();

  return (
    <Setting label="Encoding">
      <RadioGroup
        onChange={setEncoding}
        options={encodingOptions}
        value={encoding}
      />
    </Setting>
  );
}
