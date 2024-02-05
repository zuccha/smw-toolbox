import RadioGroup, { binaryOptions } from "../../components/radio-group";
import Setting from "../../components/setting";
import { useCalculatorEditorBinIsSigned } from "./store";

export default function CalculatorSettingSignedBin() {
  const [isBinSigned, setIsBinSigned] = useCalculatorEditorBinIsSigned();

  return (
    <Setting label="Signed Binary">
      <RadioGroup
        onChange={setIsBinSigned}
        options={binaryOptions}
        value={isBinSigned}
      />
    </Setting>
  );
}
