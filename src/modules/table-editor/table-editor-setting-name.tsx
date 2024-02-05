import InputText from "../../components/input-text";
import Setting from "../../components/setting";
import { labelPattern } from "../../utils";
import { useTableEditorName } from "./store";

export default function AppEditorSettingName() {
  const [name, setName] = useTableEditorName();

  return (
    <Setting label="Table Name">
      <InputText
        onChange={setName}
        pattern={labelPattern}
        placeholder="Table Name"
        value={name}
      />
    </Setting>
  );
}
