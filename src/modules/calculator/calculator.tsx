import CalculatorSectionTutorial from "./calculator-section-tutorial";
import CalculatorSectionSettings from "./calculator-section-settings";
import CalculatorHotkeys from "./calculator-hotkeys";
import CalculatorSectionMain from "./calculator-section-main";

export default function Calculator() {
  return (
    <div class="App_Module">
      <CalculatorHotkeys />

      <div class="App_ModuleBlock">
        <CalculatorSectionMain />
      </div>

      <div class="App_ModuleBlock">
        <CalculatorSectionSettings />
        <CalculatorSectionTutorial />
      </div>
    </div>
  );
}
