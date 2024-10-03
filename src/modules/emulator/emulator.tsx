import EmulatorHotkeys from "./emulator-hotkeys";
import EmulatorSectionInitialState from "./emulator-section-initial-state";
import EmulatorSectionLog from "./emulator-section-log";
import EmulatorSectionEditor from "./emulator-section-editor";
import EmulatorSectionMemory from "./emulator-section-memory";
import EmulatorSectionOpcode from "./emulator-section-opcode";
import EmulatorSectionTutorial from "./emulator-section-tutorial";

export default function Emulator() {
  return (
    <div class="App_Module">
      <EmulatorHotkeys />

      <div class="App_ModuleBlock">
        <EmulatorSectionEditor />
        <EmulatorSectionInitialState />
        <EmulatorSectionOpcode />
      </div>

      <div class="App_ModuleBlock">
        <EmulatorSectionLog />
        <EmulatorSectionMemory />
        <EmulatorSectionTutorial />
      </div>
    </div>
  );
}
