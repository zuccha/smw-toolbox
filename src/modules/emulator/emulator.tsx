import { useCallback, useState } from "preact/hooks";
import {
  Asm65816EmulatorFromInstructions,
  Asm65816EmulatorFromScratch,
} from "../../models/asm65816-emulator";
import { Asm65816Program } from "../../models/asm65816-program";
import EmulatorHotkeys from "./emulator-hotkeys";
import EmulatorSectionMain from "./emulator-section-main";
import EmulatorSectionSnes from "./emulator-section-snes";

export default function Emulator() {
  const [emulator, setEmulator] = useState(Asm65816EmulatorFromScratch);

  const run = useCallback((program: Asm65816Program) => {
    console.log(program.instructions);
    console.log(program.errors);
    if (program.errors.length === 0)
      setEmulator(Asm65816EmulatorFromInstructions(program.instructions));
  }, []);

  return (
    <div class="App_Module">
      <EmulatorHotkeys />

      <div class="App_ModuleBlock">
        <EmulatorSectionMain onRun={run} />
      </div>

      <div class="App_ModuleBlock">
        <EmulatorSectionSnes emulator={emulator} />
      </div>
    </div>
  );
}
