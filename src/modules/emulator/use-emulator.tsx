import { useCallback } from "preact/hooks";
import Assembler from "../../extra/asm65816/assembler/assembler";
import useSignal from "../../hooks/use-signal";
import {
  emulator,
  useEmulatorCode,
  useEmulatorCompilationErrors,
  useEmulatorSelectedInstructionId,
  useEmulatorMaxInstructions,
  useEmulatorSnapshot,
  useEmulatorInitialState,
} from "./store";

const assembler = new Assembler();

export default function useEmulator() {
  const [code] = useEmulatorCode();
  const [compilationErrors, setCompilationErrors] =
    useEmulatorCompilationErrors();
  const [snapshot, setSnapshot] = useEmulatorSnapshot();
  const [selectedInstructionId, setSelectedInstructionId] =
    useEmulatorSelectedInstructionId();
  const [maxInstructions] = useEmulatorMaxInstructions();
  const [initialState] = useEmulatorInitialState();

  const [notifyEmulator, renderCount] = useSignal("emulator");

  const run = useCallback(() => {
    assembler.code = code.trimEnd();
    assembler.assemble();
    emulator.set_bytes(assembler.bytes);
    emulator.set_max_instructions(maxInstructions);
    emulator.initial_a = initialState.a;
    emulator.initial_x = initialState.x;
    emulator.initial_y = initialState.y;
    emulator.initial_sp = initialState.sp;
    emulator.initial_dp = initialState.dp;
    emulator.initial_db = initialState.db;
    emulator.initial_flags = initialState.flags;
    if (assembler.errors.length === 0) {
      emulator.run();
      notifyEmulator();
      setCompilationErrors([]);
      setSnapshot(emulator.snapshot);
      setSelectedInstructionId(-1);
    } else {
      setCompilationErrors(
        assembler.errors.map(
          (error) => `Line ${error.range.line}: ${error.message}`,
        ),
      );
    }
  }, [
    code,
    initialState,
    maxInstructions,
    notifyEmulator,
    setCompilationErrors,
  ]);

  const runUntil = useCallback(
    (id: number) => {
      emulator.run_until(id);
      notifyEmulator();
      setSelectedInstructionId(id);
    },
    [notifyEmulator],
  );

  const readByte = useCallback(
    (addr: number) => emulator.read_byte(addr),
    [renderCount],
  );

  return {
    compilationErrors,
    cycles: emulator.cycles,
    executionErrors: emulator.errors,
    initialRamAddress: emulator.initial_ram_address,
    initialRomAddress: emulator.initial_rom_address,
    instructions: emulator.instructions,
    length: emulator.length,
    memoryMapping: emulator.memory_mapping,
    readByte,
    run,
    runUntil,
    selectedInstructionId,
    snapshot,
    stackPointer: emulator.sp,
  };
}
