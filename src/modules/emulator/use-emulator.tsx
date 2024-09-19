import { useCallback } from "preact/hooks";
import useSignal from "../../hooks/use-signal";
import { Asm65168ProgramFromCode } from "../../models/asm65816-program";
import {
  emulator,
  useEmulatorCode,
  useEmulatorCompilationErrors,
} from "./store";

export default function useEmulator() {
  const [code] = useEmulatorCode();
  const [compilationErrors, setCompilationErrors] =
    useEmulatorCompilationErrors();

  const notifyEmulator = useSignal("emulator");

  const run = useCallback(() => {
    emulator.clear();
    const program = Asm65168ProgramFromCode(code.trimEnd());
    if (program.errors.length === 0) {
      emulator.run(program.bytes);
      notifyEmulator();
      setCompilationErrors([]);
    } else {
      setCompilationErrors(
        program.errors.map((error) => `Line ${error.line}: ${error.message}.`),
      );
    }
  }, [code, notifyEmulator, setCompilationErrors]);

  return {
    compilationErrors,
    cycles: emulator.cycles,
    executionErrors: emulator.errors,
    instructions: emulator.instructions,
    length: emulator.length,
    run,
    snapshot: emulator.snapshot(),
  };
}
