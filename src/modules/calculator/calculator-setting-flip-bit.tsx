import RadioGroup, { binaryOptions } from "../../components/radio-group";
import Setting from "../../components/setting";
import { useCalculatorEditorsShouldFlipBitOnClick } from "./store";

export default function CalculatorSettingFlipBit() {
  const [shouldFlipBitOnClick, setShouldFlipBitOnClick] =
    useCalculatorEditorsShouldFlipBitOnClick();

  return (
    <Setting hotkey="T" label="Flip Bit">
      <RadioGroup
        onChange={setShouldFlipBitOnClick}
        options={binaryOptions}
        value={shouldFlipBitOnClick}
      />
    </Setting>
  );
}
