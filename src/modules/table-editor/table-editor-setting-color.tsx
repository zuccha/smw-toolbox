import { useCallback } from "preact/hooks";
import Button from "../../components/button";
import ColorInput from "../../components/color-input";
import InputNumber from "../../components/input-number";
import InputText from "../../components/input-text";
import Setting from "../../components/setting";
import { Colors } from "../../models/color";
import {
  IntegerBoundsUnsigned,
  IntegerEncoding,
  IntegerLength,
  IntegerRadix,
} from "../../models/integer";
import {
  useTableEditorSelectedValue,
  useTableEditorColorByValue,
  useTableEditorEncoding,
  useTableEditorUnit,
} from "./store";

const patterns = {
  [IntegerEncoding.Bin]: /^[01]*$/,
  [IntegerEncoding.Dec]: /^[0-9]*$/,
  [IntegerEncoding.Hex]: /^[0-9a-fA-F]*$/,
};

const prefixes = {
  [IntegerEncoding.Bin]: "0b",
  [IntegerEncoding.Hex]: "0x",
};

const formatInputValue = (value: string): string => value.toUpperCase();

export default function AppEditorSettingColor() {
  const [encoding] = useTableEditorEncoding();
  const [unit] = useTableEditorUnit();

  const [valueOrNaN, setValueOrNaN] = useTableEditorSelectedValue();
  const [value, valueString] = Number.isNaN(valueOrNaN)
    ? [0, ""]
    : [valueOrNaN, valueOrNaN.toString(IntegerRadix[encoding]).toUpperCase()];

  const [valueColor, setValueColor] = useTableEditorColorByValue(value);

  const resetValueColor = useCallback(() => {
    setValueColor(Colors[value % Colors.length]!);
  }, [setValueColor, value]);

  const handleChangeValueString = useCallback(
    (nextValueString: string) => {
      const radix = IntegerRadix[encoding];
      const nextValue = Number.parseInt(nextValueString, radix);
      setValueOrNaN(nextValue);
    },
    [encoding, setValueOrNaN],
  );

  return (
    <Setting label="Value Color">
      <div class="App_SectionCluster flex_1 flex-wrap_wrap">
        {encoding === IntegerEncoding.Dec ? (
          <InputNumber
            isInteger
            max={IntegerBoundsUnsigned[unit].max}
            min={0}
            onChange={setValueOrNaN}
            placeholder="0"
            value={valueOrNaN}
          />
        ) : (
          <InputText
            format={formatInputValue}
            isMonospace
            onChange={handleChangeValueString}
            pattern={patterns[encoding]}
            placeholder="0"
            prefix={prefixes[encoding]}
            size={IntegerLength[unit][encoding]}
            value={valueString}
          />
        )}

        <ColorInput onChange={setValueColor} value={valueColor} />

        <Button label="Reset" onClick={resetValueColor} />
      </div>
    </Setting>
  );
}
