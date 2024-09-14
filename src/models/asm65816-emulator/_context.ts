import { Flag, Memory, State } from "./_types";
import { h, l, w } from "./_utils";

export type Context = {
  // Registers
  isA8Bit: boolean;
  isX8Bit: boolean;

  // Memory access
  load_byte: (addr: number) => number;
  load_word: (addr: number) => number;
  save_byte: (addr: number, val: number) => Memory;
  save_word: (addr: number, val: number) => Memory;

  // Addressing modes
  direct: (val: number) => number;
  direct_x: (val: number) => number;
  direct_y: (val: number) => number;
  direct_indirect: (val: number) => number;
  direct_x_indirect: (val: number) => number;
  direct_indirect_y: (val: number) => number;
  direct_indirectLong: (val: number) => number;
  direct_indirectLong_y: (val: number) => number;
  absolute: (val: number) => number;
  absolute_x: (val: number) => number;
  absolute_y: (val: number) => number;
  absolute_indirect: (val: number) => number;
  absolute_indirectLong: (val: number) => number;
  absolute_x_indirect: (val: number) => number;
  absoluteLong: (val: number) => number;
  absoluteLong_x: (val: number) => number;
  stackRelative: (val: number) => number;
  stackRelative_indirect_y: (val: number) => number;
};

export function ContextFromState(state: State): Context {
  const isA8Bit = Boolean(state.flags & Flag.M);
  const isX8Bit = Boolean(state.flags & Flag.X);

  const x = w(state.x);
  const y = w(state.y);
  const dp = w(state.dp);
  const db = l(state.db) << 16;
  const sp = w(state.sp);
  const memory = state.memory;

  const load_byte = (addr: number) => l(memory[addr] ?? 0);
  const load_word = (addr: number) =>
    (load_byte(addr + 1) << 8) + load_byte(addr);
  const load_long = (addr: number) =>
    (load_byte(addr + 2) << 16) + (load_byte(addr + 1) << 8) + load_byte(addr);

  const save_byte = (addr: number, val: number): Memory => ({
    [addr]: l(val),
  });
  const save_word = (addr: number, val: number): Memory => ({
    [addr]: l(val),
    [addr + 1]: h(val),
  });

  // Context
  return {
    isA8Bit,
    isX8Bit,

    load_byte,
    load_word,
    save_byte,
    save_word,

    direct: (val: number) => l(val) + dp,
    direct_x: (val: number) => l(val) + dp + x,
    direct_y: (val: number) => l(val) + dp + y,
    direct_indirect: (val: number) => db + load_word(l(val) + dp),
    direct_x_indirect: (val: number) => db + load_word(l(val) + dp + x),
    direct_indirect_y: (val: number) => db + load_word(l(val) + dp) + y,
    direct_indirectLong: (val: number) => load_long(l(val) + dp),
    direct_indirectLong_y: (val: number) => load_long(l(val) + dp) + y,
    absolute: (val: number) => db + w(val),
    absolute_x: (val: number) => db + w(val) + x,
    absolute_y: (val: number) => db + w(val) + y,
    absolute_indirect: (val: number) => db + load_word(db + w(val)),
    absolute_indirectLong: (val: number) => load_long(db + w(val)),
    absolute_x_indirect: (val: number) => db + load_word(db + w(val) + x),
    absoluteLong: (val: number) => val,
    absoluteLong_x: (val: number) => val + x,
    stackRelative: (val: number) => sp + l(val),
    stackRelative_indirect_y: (val: number) => db + load_word(sp + l(val)) + y,
  };
}
