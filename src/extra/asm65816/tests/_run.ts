import { expect } from "vitest";
import { toHex } from "../../../utils";
import Assembler from "../assembler/assembler";
import Emulator from "../emulator/emulator";
import { ProcessorSnapshot } from "../emulator/processor-snapshot";
import { byte_mask } from "../emulator/value";

type Mode =
  | "implied"
  | "A"
  | "#const"
  | "dp"
  | "dp,x"
  | "dp,y"
  | "(dp)"
  | "(dp,x)"
  | "(dp),y"
  | "[dp]"
  | "[dp],y"
  | "addr"
  | "addr,x"
  | "addr,y"
  | "(addr)"
  | "(addr,x)"
  | "[addr]"
  | "long"
  | "long,x"
  | "sr,s"
  | "(sr,s),y"
  | "srcBank,destBank"
  | "offset";

const formatArg: Record<Mode, (arg: number, value: number) => string> = {
  "implied": () => "",
  "A": () => "A",
  "#const": (_arg, value) => `#$${toHex(value, value > 255 ? 4 : 2)}`,
  "dp": (arg) => `$${toHex(arg, 2)}`,
  "dp,x": (arg) => `$${toHex(arg, 2)},x`,
  "dp,y": (arg) => `$${toHex(arg, 2)},y`,
  "(dp)": (arg) => `($${toHex(arg, 2)})`,
  "(dp,x)": (arg) => `($${toHex(arg, 2)},x)`,
  "(dp),y": (arg) => `($${toHex(arg, 2)}),y`,
  "[dp]": (arg) => `[$${toHex(arg, 2)}]`,
  "[dp],y": (arg) => `[$${toHex(arg, 2)}],y`,
  "addr": (arg) => `$${toHex(arg, 4)}`,
  "addr,x": (arg) => `$${toHex(arg, 4)},x`,
  "addr,y": (arg) => `$${toHex(arg, 4)},y`,
  "(addr)": (arg) => `($${toHex(arg, 4)})`,
  "(addr,x)": (arg) => `($${toHex(arg, 4)},x)`,
  "[addr]": (arg) => `[$${toHex(arg, 4)}]`,
  "long": (arg) => `$${toHex(arg, 6)}`,
  "long,x": (arg) => `$${toHex(arg, 6)},x`,
  "sr,s": (arg) => `$${toHex(arg, 2)},s`,
  "(sr,s),y": (arg) => `($${toHex(arg, 2)},s),y`,
  "srcBank,destBank": (arg) =>
    `$${toHex(arg & 0xff, 2)},$${toHex((arg >> 8) & 0xff, 2)}`,
  "offset": (arg) => `$${toHex(arg, arg > 255 ? 4 : 2)}`,
};

const generateMemory: Record<
  Mode,
  (arg: number, value: number, p: ProcessorSnapshot) => Map<number, number>
> = {
  "implied": () => new Map(),
  "A": () => new Map(),
  "#const": () => new Map(),
  "dp": (arg, value, p) =>
    new Map([
      [0x7e0000 + p.dp + arg, value & byte_mask],
      [0x7e0000 + p.dp + arg + 1, (value >> 8) & byte_mask],
    ]),
  "dp,x": (arg, value, p) =>
    new Map([
      [0x7e0000 + p.dp + arg + p.x, value & byte_mask],
      [0x7e0000 + p.dp + arg + p.x + 1, (value >> 8) & byte_mask],
    ]),
  "dp,y": (arg, value, p) =>
    new Map([
      [0x7e0000 + p.dp + arg + p.y, value & byte_mask],
      [0x7e0000 + p.dp + arg + p.y + 1, (value >> 8) & byte_mask],
    ]),
  "(dp)": (arg, value, p) =>
    new Map([
      [0x7e0000 + p.dp + arg, 0x10],
      [0x7e0000 + p.dp + arg + 1, 0xab],
      [(p.db << 16) + 0xab10, value & byte_mask],
      [(p.db << 16) + 0xab11, (value >> 8) & byte_mask],
    ]),
  "(dp,x)": (arg, value, p) =>
    new Map([
      [0x7e0000 + p.dp + arg + p.x, 0x10],
      [0x7e0000 + p.dp + arg + p.x + 1, 0xab],
      [(p.db << 16) + 0xab10, value & byte_mask],
      [(p.db << 16) + 0xab11, (value >> 8) & byte_mask],
    ]),
  "(dp),y": (arg, value, p) =>
    new Map([
      [0x7e0000 + p.dp + arg, 0x10],
      [0x7e0000 + p.dp + arg + 1, 0xab],
      [(p.db << 16) + 0xab10 + p.y, value & byte_mask],
      [(p.db << 16) + 0xab11 + p.y, (value >> 8) & byte_mask],
    ]),
  "[dp]": (arg, value, p) =>
    new Map([
      [0x7e0000 + p.dp + arg, 0x10],
      [0x7e0000 + p.dp + arg + 1, 0xab],
      [0x7e0000 + p.dp + arg + 2, 0x7f],
      [0x7fab10, value & byte_mask],
      [0x7fab11, (value >> 8) & byte_mask],
    ]),
  "[dp],y": (arg, value, p) =>
    new Map([
      [0x7e0000 + p.dp + arg, 0x10],
      [0x7e0000 + p.dp + arg + 1, 0xab],
      [0x7e0000 + p.dp + arg + 2, 0x7f],
      [0x7fab10 + p.y, value & byte_mask],
      [0x7fab11 + p.y, (value >> 8) & byte_mask],
    ]),
  "addr": (arg, value, p) =>
    new Map([
      [(p.db << 16) + arg, value & byte_mask],
      [(p.db << 16) + arg + 1, (value >> 8) & byte_mask],
    ]),
  "addr,x": (arg, value, p) =>
    new Map([
      [(p.db << 16) + arg + p.x, value & byte_mask],
      [(p.db << 16) + arg + p.x + 1, (value >> 8) & byte_mask],
    ]),
  "addr,y": (arg, value, p) =>
    new Map([
      [(p.db << 16) + arg + p.y, value & byte_mask],
      [(p.db << 16) + arg + p.y + 1, (value >> 8) & byte_mask],
    ]),
  "(addr)": (arg, value, p) =>
    new Map([
      [(p.db << 16) + arg, 0x10],
      [(p.db << 16) + arg + 1, 0xab],
      [(p.db << 16) + 0xab10, value & byte_mask],
      [(p.db << 16) + 0xab11, (value >> 8) & byte_mask],
    ]),
  "(addr,x)": (arg, value, p) =>
    new Map([
      [(p.db << 16) + arg + p.x, 0x10],
      [(p.db << 16) + arg + p.x + 1, 0xab],
      [(p.db << 16) + 0xab10, value & byte_mask],
      [(p.db << 16) + 0xab11, (value >> 8) & byte_mask],
    ]),
  "[addr]": (arg, value, p) =>
    new Map([
      [(p.db << 16) + arg, 0x10],
      [(p.db << 16) + arg + 1, 0xab],
      [(p.db << 16) + arg + 2, 0x7f],
      [0x7fab10, value & byte_mask],
      [0x7fab11, (value >> 8) & byte_mask],
    ]),
  "long": (arg, value) =>
    new Map([
      [arg, value & byte_mask],
      [arg + 1, (value >> 8) & byte_mask],
    ]),
  "long,x": (arg, value, p) =>
    new Map([
      [arg + p.x, value & byte_mask],
      [arg + p.x + 1, (value >> 8) & byte_mask],
    ]),
  "sr,s": (arg, value, p) =>
    new Map([
      [0x7e0000 + p.sp + arg, value & byte_mask],
      [0x7e0000 + p.sp + arg + 1, (value >> 8) & byte_mask],
    ]),
  "(sr,s),y": (arg, value, p) =>
    new Map([
      [0x7e0000 + p.sp + arg, 0x10],
      [0x7e0000 + p.sp + arg + 1, 0xab],
      [(p.db << 16) + 0xab10 + p.y, value & byte_mask],
      [(p.db << 16) + 0xab11 + p.y, (value >> 8) & byte_mask],
    ]),
  "srcBank,destBank": () => new Map(),
  "offset": () => new Map(),
};

export function run(args: {
  opcode: string;
  arg: number;
  value: number;
  mode: string;
  initialProcessor: Partial<ProcessorSnapshot>;
  initialMemory?: Map<number, number>;
  initialFlags?: number;
  expectedValue?: number;
  expectedProcessor: Partial<ProcessorSnapshot>;
  expectedMemory?: Map<number, number>;
  expectedErrors?: string[];
  maxInstructions?: number;
  considerPc?: boolean;
}) {
  const arg = args.arg ?? 0;
  const value = args.value ?? 0;
  const mode = args.mode as Mode;
  const memory = generateMemory[mode];

  const assembler = new Assembler();
  const formattedArg = formatArg[mode](arg, value);
  assembler.code = `${args.opcode} ${formattedArg}`;
  assembler.assemble();

  const emulator = new Emulator();
  emulator.set_program(assembler.program);
  emulator.set_max_instructions(args.maxInstructions ?? 3);

  emulator.initial_a = args.initialProcessor.a ?? 0x0000;
  emulator.initial_x = args.initialProcessor.x ?? 0x0001;
  emulator.initial_y = args.initialProcessor.y ?? 0x0002;
  emulator.initial_sp = args.initialProcessor.sp ?? 0x1fc0;
  emulator.initial_dp = args.initialProcessor.dp ?? 0x1020;
  emulator.initial_db = args.initialProcessor.db ?? 0x7e;
  emulator.initial_flags =
    args.initialFlags !== undefined
      ? args.initialFlags
      : ((args.initialProcessor.flag_n ?? 0) << 7) |
        ((args.initialProcessor.flag_v ?? 0) << 6) |
        ((args.initialProcessor.flag_m ?? 1) << 5) |
        ((args.initialProcessor.flag_x ?? 1) << 4) |
        ((args.initialProcessor.flag_d ?? 0) << 3) |
        ((args.initialProcessor.flag_i ?? 0) << 2) |
        ((args.initialProcessor.flag_z ?? 0) << 1) |
        ((args.initialProcessor.flag_c ?? 0) << 0);
  emulator.initial_flag_e = args.initialProcessor.flag_e ?? 0;
  emulator.reset_processor(true);
  const initialProcessor = args.considerPc
    ? emulator.snapshot
    : { ...emulator.snapshot, pb: 0x00, pc: 0x0000 };

  emulator.initial_memory = new Map([
    ...memory(args.arg, args.value, initialProcessor),
    ...(args.initialMemory ?? new Map()),
  ]);
  emulator.reset_memory(true);
  const initialMemory = emulator.memory;

  emulator.run();

  const expectedProcessor = { ...initialProcessor, ...args.expectedProcessor };
  const expectedMemory =
    args.expectedValue === undefined
      ? new Map([...initialMemory, ...(args.expectedMemory ?? new Map())])
      : new Map([
          ...initialMemory,
          ...memory(arg, args.expectedValue, initialProcessor),
          ...(args.expectedMemory ?? new Map()),
        ]);

  const resultProcessor = args.considerPc
    ? emulator.snapshot
    : { ...emulator.snapshot, pb: 0x00, pc: 0x0000 };
  const resultMemory = emulator.memory;

  const expectedErrors = args.expectedErrors ?? [];

  expect(resultProcessor).toEqual(expectedProcessor);
  expect(resultMemory).toEqual(expectedMemory);
  expect(emulator.errors).toEqual(expectedErrors);
}
