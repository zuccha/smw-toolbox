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
NOP           ; Implied
ASL A         ; Accumulator
ADC #$00      ; Immediate Variable A (byte)
ADC #$0000    ; Immediate Variable A (word)
CPX #$00      ; Immediate Variable X (byte)
CPX #$0000    ; Immediate Variable X (word)
ADC $00       ; Direct Page
ADC $00,x     ; Direct Page X
LDX $00,y     ; Direct Page Y
ADC ($00)     ; Direct Page Indirect
ADC ($00,x)   ; Direct Page X Indirect
ADC ($00),y   ; Direct Page Indirect Y
ADC [$00]     ; Direct Page Indirect Long
ADC [$00],y   ; Direct Page Indirect Long Y
ADC $0000     ; Absolute
ADC $0000,x   ; Absolute X
ADC $0000,y   ; Absolute Y
JMP ($0000)   ; Absolute Indirect
JMP ($0000,x) ; Absolute X Indirect
JML [$0000]   ; Absolute Indirect Long
ADC $000000   ; Absolute Long
ADC $000000,x ; Absolute Long X
ADC $00,s     ; Stack Relative
ADC ($00,s),y ; Stack Relative Indirect Y
BRA $00       ; Offset
BRL $0000     ; Offset Long
MVN $00,$00   ; Block Move`;

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
  flags: 0,
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
