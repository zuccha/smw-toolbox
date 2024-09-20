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

  const [notifyEmulator, renderCount] = useSignal("emulator");

  const run = useCallback(() => {
    const program = Asm65168ProgramFromCode(code.trimEnd());
    emulator.reset(program.bytes);
    if (program.errors.length === 0) {
      emulator.run();
      notifyEmulator();
      setCompilationErrors([]);
    } else {
      setCompilationErrors(
        program.errors.map((error) => `Line ${error.line}: ${error.message}.`),
      );
    }
  }, [code, notifyEmulator, setCompilationErrors]);

  const readByte = useCallback(
    (addr: number) => emulator.read_byte(addr),
    [renderCount],
  );

  return {
    compilationErrors,
    cycles: emulator.cycles,
    executionErrors: emulator.errors,
    instructions: emulator.instructions,
    length: emulator.length,
    readByte,
    run,
  };
}
