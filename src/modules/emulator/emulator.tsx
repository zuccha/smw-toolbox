import EmulatorHotkeys from "./emulator-hotkeys";
import EmulatorSectionMain from "./emulator-section-main";
import EmulatorSectionSnes from "./emulator-section-snes";

export default function Emulator() {
  return (
    <div class="App_Module">
      <EmulatorHotkeys />

      <div class="App_ModuleBlock">
        <EmulatorSectionMain />
      </div>

      <div class="App_ModuleBlock">
        <EmulatorSectionSnes />
      </div>
    </div>
  );
}
