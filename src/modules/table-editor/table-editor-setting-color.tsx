import { useCallback } from "preact/hooks";
import Button from "../../components/button";
import ColorInput from "../../components/color-input";
import InputNumber from "../../components/input-number";
import Setting from "../../components/setting";
import { Colors } from "../../models/color";
import { IntegerBoundsUnsigned, IntegerUnit } from "../../models/integer";
import {
  useTableEditorSelectedValue,
  useTableEditorColorByValue,
} from "./store";

export default function AppEditorSettingColor() {
  const [valueOrNaN, setValueOrNaN] = useTableEditorSelectedValue();
  const value = valueOrNaN || 0;

  const [valueColor, setValueColor] = useTableEditorColorByValue(value);

  const resetValueColor = useCallback(() => {
    setValueColor(Colors[value % Colors.length]!);
  }, [setValueColor, value]);

  return (
    <Setting label="Decimal Value Color">
      <div class="App_SectionCluster flex_1 flex-wrap_wrap">
        <InputNumber
          isInteger
          max={IntegerBoundsUnsigned[IntegerUnit.Word].max}
          min={0}
          onChange={setValueOrNaN}
          placeholder="0"
          value={valueOrNaN}
        />

        <ColorInput onChange={setValueColor} value={valueColor} />

        <Button label="Reset" onClick={resetValueColor} />
      </div>
    </Setting>
  );
}
