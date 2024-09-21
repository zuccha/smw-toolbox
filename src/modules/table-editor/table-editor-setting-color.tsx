import { useCallback } from "preact/hooks";
import Button from "../../components/button";
import ColorInput from "../../components/color-input";
import InputValue from "../../components/input-value";
import Setting from "../../components/setting";
import { Colors } from "../../models/color";
import {
  useTableEditorSelectedValue,
  useTableEditorColorByValue,
  useTableEditorEncoding,
  useTableEditorUnit,
} from "./store";

export default function AppEditorSettingColor() {
  const [encoding] = useTableEditorEncoding();
  const [unit] = useTableEditorUnit();

  const [selectedValue, setSelectedValue] = useTableEditorSelectedValue();

  const [valueColor, setValueColor] = useTableEditorColorByValue(selectedValue);

  const resetValueColor = useCallback(() => {
    setValueColor(Colors[selectedValue % Colors.length]!);
  }, [setValueColor, selectedValue]);

  return (
    <Setting label="Value Color">
      <div class="App_SectionCluster flex_1 flex-wrap_wrap">
        <InputValue
          encoding={encoding}
          onChange={setSelectedValue}
          placeholder="00"
          value={selectedValue}
          unit={unit}
        />

        <ColorInput onChange={setValueColor} value={valueColor} />

        <Button label="Reset" onClick={resetValueColor} />
      </div>
    </Setting>
  );
}
