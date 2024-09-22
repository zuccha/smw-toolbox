import { useCallback } from "preact/hooks";
import Assembler from "../../extra/asm65816/assembler/assembler";
import useSignal from "../../hooks/use-signal";
import {
  emulator,
  useEmulatorCode,
  useEmulatorCompilationErrors,
  useEmulatorInstructionId,
  useEmulatorMaxInstructions,
  useEmulatorSnapshot,
} from "./store";

const assembler = new Assembler();

export default function useEmulator() {
  const [code] = useEmulatorCode();
  const [compilationErrors, setCompilationErrors] =
    useEmulatorCompilationErrors();
  const [snapshot, setSnapshot] = useEmulatorSnapshot();
  const [instructionId, setInstructionId] = useEmulatorInstructionId();
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
      setInstructionId(-1);
    } else {
      setCompilationErrors(
        assembler.errors.map(
          (error) => `Line ${error.range.line}: ${error.message}`,
        ),
      );
    }
  }, [code, maxInstructions, notifyEmulator, setCompilationErrors]);

  const runUntil = useCallback(
    (id: number) => {
      emulator.run_until(id);
      notifyEmulator();
      setInstructionId(id);
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
    initialRamAddress: emulator.initial_ram_address,
    initialRomAddress: emulator.initial_rom_address,
    instructionId,
    instructions: emulator.instructions,
    length: emulator.length,
    readByte,
    run,
    runUntil,
    setMaxInstructions,
    snapshot,
  };
}
