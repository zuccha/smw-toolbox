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
; This is an example program that doesn't mean much.

JSL .store_data

org $818000

.store_data:
  PHK : PLB
  LDX #$02
.store_data_loop:
  LDA .data,x : STA $10,x
  DEX : BPL .store_data_loop
  RTL

.data:
  db $0A, $0B, $0C
`;

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
