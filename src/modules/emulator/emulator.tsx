import { useCallback, useState } from "preact/hooks";
import { Emulator as SnesEmulator } from "../../models/asm65816/emulator";
import { Asm65816Program } from "../../models/asm65816-program";
import EmulatorHotkeys from "./emulator-hotkeys";
import EmulatorSectionMain from "./emulator-section-main";
import EmulatorSectionSnes from "./emulator-section-snes";

const emulator = new SnesEmulator();

export default function Emulator() {
  const [snapshot, setSnapshot] = useState(() => emulator.snapshot());

  const run = useCallback((program: Asm65816Program) => {
    if (program.errors.length === 0) {
      emulator.run(program.bytes);
      setSnapshot(emulator.snapshot());
    }
  }, []);

  return (
    <div class="App_Module">
      <EmulatorHotkeys />

      <div class="App_ModuleBlock">
        <EmulatorSectionMain onRun={run} />
      </div>

      <div class="App_ModuleBlock">
        <EmulatorSectionSnes snapshot={snapshot} />
      </div>
    </div>
  );
}
