import InputNumber from "../../components/input-number";
import Setting from "../../components/setting";
import { useTableEditorSizeWidth } from "./store";

export default function AppEditorSettingSizeWidth() {
  const [width, setWidth] = useTableEditorSizeWidth();

  return (
    <Setting label="Width">
      <InputNumber
        isInteger
        max={50}
        min={1}
        onChange={setWidth}
        placeholder="1"
        value={width}
      />
    </Setting>
  );
}
