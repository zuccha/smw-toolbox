import InputNumber from "../../components/input-number";
import Setting from "../../components/setting";
import { useTableEditorIndentation } from "./store";

export default function AppEditorSettingIndentation() {
  const [indentation, setIndentation] = useTableEditorIndentation();

  return (
    <Setting label="Indentation">
      <InputNumber
        isInteger
        max={100}
        min={0}
        onChange={setIndentation}
        placeholder="0"
        value={indentation}
      />
    </Setting>
  );
}
