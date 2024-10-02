import { z } from "zod";
import Emulator from "../../extra/asm65816/emulator/emulator";
import createUseSharedState from "../../hooks/use-shared-state";
import useStore, {
  useStoreBoolean,
  useStoreNumber,
  useStoreString,
} from "../../hooks/use-store";

export const emulatorId = "Emulator";

export const emulator = new Emulator();

const defaultCode = `\
; Copy the ".data" table in RAM.
LDX #$02
.store_data:
  LDA .data,x : STA $10,x
  DEX : BPL .store_data

; Skip to the end, otherwise ".data"
; would be execute as instructions.
BRA .end

; Data table.
.data:
  db $0A, $0B, $0C

; End of program.
.end:`;

const EmulatorInitialStateSchema = z.object({
  a: z.number(),
  x: z.number(),
  y: z.number(),
  sp: z.number(),
  dp: z.number(),
  db: z.number(),
  flags: z.number(),
});

const defaultInitialState = {
  a: 0,
  x: 0,
  y: 0,
  sp: 0x01fc,
  dp: 0,
  db: 0,
  flags: 0b00110000,
};

export const useEmulatorCode = () =>
  useStoreString(`${emulatorId}.code`, defaultCode);

export const useEmulatorInitialState = () =>
  useStore(
    `${emulatorId}.initialState`,
    defaultInitialState,
    EmulatorInitialStateSchema.parse,
  );

export const useEmulatorMaxInstructions = () =>
  useStoreNumber(`${emulatorId}.maxInstructions`, 100);

export const useEmulatorCompilationErrors = createUseSharedState<string[]>([]);
export const useEmulatorSnapshot = createUseSharedState(emulator.snapshot);
export const useEmulatorSelectedInstructionId = createUseSharedState(-1);
export const useEmulatorOpcode = createUseSharedState("");

export const useEmulatorMemoryBaseAddress = () =>
  useStoreNumber(`${emulatorId}.memory.baseAddress`, 0x7e0000);

export const useEmulatorTabInitialStateIsVisible = () =>
  useStoreBoolean(`${emulatorId}.tab.initialState.isVisible`, true);

export const useEmulatorTabLogIsVisible = () =>
  useStoreBoolean(`${emulatorId}.tab.log.isVisible`, true);

export const useEmulatorTabMemoryIsVisible = () =>
  useStoreBoolean(`${emulatorId}.tab.memory.isVisible`, true);

export const useEmulatorTabOpcodeIsVisible = () =>
  useStoreBoolean(`${emulatorId}.tab.opcode.isVisible`, true);

export const useEmulatorTabTutorialIsVisible = () =>
  useStoreBoolean(`${emulatorId}.tab.tutorial.isVisible`, false);
