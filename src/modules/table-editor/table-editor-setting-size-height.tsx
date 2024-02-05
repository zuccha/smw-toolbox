import InputNumber from "../../components/input-number";
import Setting from "../../components/setting";
import { useTableEditorSizeHeight } from "./store";

export default function AppEditorSettingSizeHeight() {
  const [height, setHeight] = useTableEditorSizeHeight();

  return (
    <Setting label="Height">
      <InputNumber
        isInteger
        max={50}
        min={1}
        onChange={setHeight}
        placeholder="1"
        value={height}
      />
    </Setting>
  );
}
