import { z } from "zod";
import useStore, {
  useStoreBoolean,
  useStoreString,
} from "../../hooks/use-store";
import { Emulator } from "../../models/asm65816/emulator";

export const emulatorId = "Emulator";

export const emulator = new Emulator();

const SnapshotSchema = z.object({
  A: z.number(),
  X: z.number(),
  Y: z.number(),
  DB: z.number(),
  DP: z.number(),
  SP: z.number(),
  PB: z.number(),
  PC: z.number(),

  flag: z.object({
    n: z.number(),
    v: z.number(),
    m: z.number(),
    x: z.number(),
    d: z.number(),
    i: z.number(),
    z: z.number(),
    c: z.number(),
    e: z.number(),
    b: z.number(),
  }),

  flags: z.number(),

  ram: z.record(z.string(), z.number()),
});

const defaultSnapshot = emulator.snapshot();

const defaultCode = `\
NOP           ; Implied
ASL A         ; Accumulator
ADC #$00      ; Immediate Byte
ADC #$0000    ; Immediate Word
ADC $00       ; Direct Byte
ADC $00,x     ; Direct Byte X
LDX $00,y     ; Direct Byte X
ADC $00,s     ; Direct Byte S
ADC $0000     ; Direct Word
ADC $0000,x   ; Direct Word X
ADC $0000,y   ; Direct Word Y
ADC $000000   ; Direct Long
ADC $000000,x ; Direct Long X
ADC ($00)     ; Indirect Byte
ADC ($00,x)   ; Indirect Byte X
ADC ($00),y   ; Indirect Byte Y
ADC ($00,s),y ; Indirect Byte S Y
JMP ($0000)   ; Indirect Word
JMP ($0000,x) ; Indirect Word X
ADC [$00]     ; Indirect Long Byte
ADC [$00],y   ; Indirect Long Byte Y
JML [$0000]   ; Indirect Long Word
MVN $00,$00   ; Move`;

export const useEmulatorCode = () =>
  useStoreString(`${emulatorId}.code`, defaultCode);

export const useEmulatorCoreSnapshot = () =>
  useStore(
    `${emulatorId}.core.snapshot`,
    defaultSnapshot,
    SnapshotSchema.parse,
  );

export const useEmulatorTabSnesIsVisible = () =>
  useStoreBoolean(`${emulatorId}.tab.snes.isVisible`, true);
