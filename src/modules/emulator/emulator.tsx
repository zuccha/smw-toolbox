import EmulatorHotkeys from "./emulator-hotkeys";
import EmulatorSectionLog from "./emulator-section-log";
import EmulatorSectionMain from "./emulator-section-main";
import EmulatorSectionMemory from "./emulator-section-memory";
import EmulatorSectionOpcode from "./emulator-section-opcode";

export default function Emulator() {
  return (
    <div class="App_Module">
      <EmulatorHotkeys />

      <div class="App_ModuleBlock">
        <EmulatorSectionMain />
        <EmulatorSectionOpcode />
      </div>

      <div class="App_ModuleBlock">
        <EmulatorSectionLog />
        <EmulatorSectionMemory />
      </div>
    </div>
  );
}
