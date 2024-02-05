import SectionCollapsible from "../../components/section-collapsible";
import CalculatorSettingAdvanced from "./calculator-setting-advanced";
import CalculatorSettingCaret from "./calculator-setting-caret";
import CalculatorSettingFlipBit from "./calculator-setting-flip-bit";
import CalculatorSettingKeyboard from "./calculator-setting-keyboard";
import CalculatorSettingMoveCursor from "./calculator-setting-move-cursor";
import CalculatorSettingSignedBin from "./calculator-setting-signed-bin";
import CalculatorSettingSignedDec from "./calculator-setting-signed-dec";
import CalculatorSettingSignedHex from "./calculator-setting-signed-hex";
import CalculatorSettingSpaceFrequency from "./calculator-setting-space-frequency";
import CalculatorSettingTypingDirection from "./calculator-setting-typing-direction";
import CalculatorSettingTypingMode from "./calculator-setting-typing-mode";
import CalculatorSettingUnit from "./calculator-setting-unit";
import { useCalculatorTabSettingsIsVisible } from "./store";

export default function CalculatorSectionSettings() {
  const [isTabSettingsVisible, setIsTabSettingsVisible] =
    useCalculatorTabSettingsIsVisible();

  return (
    <SectionCollapsible
      isVisible={isTabSettingsVisible}
      label="Settings"
      onChange={setIsTabSettingsVisible}
    >
      <div class="App_SectionRow">
        <CalculatorSettingAdvanced />
        <CalculatorSettingUnit />
        <CalculatorSettingKeyboard />
        <CalculatorSettingTypingMode />
        <CalculatorSettingTypingDirection />
        <CalculatorSettingMoveCursor />
        <CalculatorSettingFlipBit />
        <CalculatorSettingSignedBin />
        <CalculatorSettingSignedDec />
        <CalculatorSettingSignedHex />
        <CalculatorSettingCaret />
        <CalculatorSettingSpaceFrequency />
      </div>
    </SectionCollapsible>
  );
}
