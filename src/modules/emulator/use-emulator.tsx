import { useCallback } from "preact/hooks";
import { Asm65168ProgramFromCode } from "../../models/asm65816-program";
import { emulator, useEmulatorCode, useEmulatorCoreSnapshot } from "./store";

export default function useEmulator() {
  const [snapshot, setSnapshot] = useEmulatorCoreSnapshot();
  const [code] = useEmulatorCode();

  const run = useCallback(() => {
    const program = Asm65168ProgramFromCode(code.trimEnd());
    if (program.errors.length === 0) {
      emulator.run(program.bytes);
      setSnapshot(emulator.snapshot());
    }
  }, [code]);

  return { snapshot, run };
}
