import RadioGroup, { binaryOptions } from "../../components/radio-group";
import Setting from "../../components/setting";
import { useCalculatorEditorHexIsSigned } from "./store";

export default function CalculatorSettingSignedHex() {
  const [isHexSigned, setIsHexSigned] = useCalculatorEditorHexIsSigned();

  return (
    <Setting label="Signed Hexadecimal">
      <RadioGroup
        onChange={setIsHexSigned}
        options={binaryOptions}
        value={isHexSigned}
      />
    </Setting>
  );
}
