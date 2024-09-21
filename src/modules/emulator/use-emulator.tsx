import { useCallback } from "preact/hooks";
import Assembler from "../../extra/asm65816/assembler/assembler";
import useSignal from "../../hooks/use-signal";
import {
  emulator,
  useEmulatorCode,
  useEmulatorCompilationErrors,
  useEmulatorInstructionIndex,
  useEmulatorMaxInstructions,
  useEmulatorSnapshot,
} from "./store";

const assembler = new Assembler();

export default function useEmulator() {
  const [code] = useEmulatorCode();
  const [compilationErrors, setCompilationErrors] =
    useEmulatorCompilationErrors();
  const [snapshot, setSnapshot] = useEmulatorSnapshot();
  const [instructionIndex, setInstructionIndex] = useEmulatorInstructionIndex();
  const [maxInstructions] = useEmulatorMaxInstructions();

  const [notifyEmulator, renderCount] = useSignal("emulator");

  const run = useCallback(() => {
    assembler.code = code.trimEnd();
    assembler.assemble();
    emulator.set_bytes(assembler.bytes);
    emulator.set_max_instructions(maxInstructions);
    if (assembler.errors.length === 0) {
      emulator.run();
      notifyEmulator();
      setCompilationErrors([]);
      setSnapshot(emulator.snapshot);
      setInstructionIndex(Infinity);
    } else {
      setCompilationErrors(
        assembler.errors.map(
          (error) => `Line ${error.range.line}: ${error.message}`,
        ),
      );
    }
  }, [code, maxInstructions, notifyEmulator, setCompilationErrors]);

  const runUntil = useCallback(
    (index: number) => {
      emulator.run_until(index);
      notifyEmulator();
      setInstructionIndex(index);
    },
    [notifyEmulator],
  );

  const readByte = useCallback(
    (addr: number) => emulator.read_byte(addr),
    [renderCount],
  );

  const setMaxInstructions = useCallback(
    (maxInstructions: number) => emulator.set_max_instructions(maxInstructions),
    [renderCount],
  );

  return {
    compilationErrors,
    cycles: emulator.cycles,
    executionErrors: emulator.errors,
    instructionIndex,
    instructions: emulator.instructions,
    length: emulator.length,
    readByte,
    run,
    runUntil,
    setMaxInstructions,
    snapshot,
  };
}
