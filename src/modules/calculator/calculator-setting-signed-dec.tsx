import RadioGroup, { binaryOptions } from "../../components/radio-group";
import Setting from "../../components/setting";
import { useCalculatorEditorDecIsSigned } from "./store";

export default function CalculatorSettingSignedDec() {
  const [isDecSigned, setIsDecSigned] = useCalculatorEditorDecIsSigned();

  return (
    <Setting hotkey="N" label="Signed Decimal">
      <RadioGroup
        onChange={setIsDecSigned}
        options={binaryOptions}
        value={isDecSigned}
      />
    </Setting>
  );
}
