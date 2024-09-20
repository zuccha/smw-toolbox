import { useCallback } from "preact/hooks";
import useSignal from "../../hooks/use-signal";
import {
  emulator,
  useEmulatorCode,
  useEmulatorCompilationErrors,
} from "./store";
import Assembler from "../../extra/asm65816/assembler/assembler";

const assembler = new Assembler();

export default function useEmulator() {
  const [code] = useEmulatorCode();
  const [compilationErrors, setCompilationErrors] =
    useEmulatorCompilationErrors();

  const [notifyEmulator, renderCount] = useSignal("emulator");

  const run = useCallback(() => {
    assembler.code = code.trimEnd();
    assembler.assemble();
    emulator.reset(assembler.bytes);
    if (assembler.errors.length === 0) {
      emulator.run();
      notifyEmulator();
      setCompilationErrors([]);
    } else {
      setCompilationErrors(
        assembler.errors.map(
          (error) => `Line ${error.range.line}: ${error.message}`,
        ),
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
