//==============================================================================
// Utils
//==============================================================================

import { Context } from "./_context";
import { Bound, Flag, State } from "./_types";
import { applyFlags, h, l, w } from "./_utils";

function adc8Bit(
  value: number,
  a: number,
  flags: number,
): { a: number; flags: number } {
  const result = l(value) + l(a) + (flags & Flag.C);
  const newFlags =
    (l(result) & (Flag.N | Flag.V)) |
    (l(result) === 0 ? Flag.Z : 0) |
    (result > Bound.Byte ? Flag.C : 0);
  return {
    a: h(a) | l(result),
    flags: applyFlags(Flag.N | Flag.V | Flag.Z | Flag.C, flags, newFlags),
  };
}

function adc16Bit(
  value: number,
  a: number,
  flags: number,
): { a: number; flags: number } {
  const result = w(value) + w(a) + (flags & Flag.C);
  const newFlags =
    ((w(result) & ((Flag.N | Flag.V) << 8)) >> 8) |
    (w(result) === 0 ? Flag.Z : 0) |
    (result > Bound.Word ? Flag.C : 0);
  return {
    a: w(result),
    flags: applyFlags(Flag.N | Flag.V | Flag.Z | Flag.C, flags, newFlags),
  };
}

//==============================================================================
// Direct Byte
//==============================================================================

export function adc_Direct_Byte(arg: number, state: State, ctx: Context) {
  const addr = ctx.addrDp(arg);
  const result = ctx.isA8Bit
    ? adc8Bit(ctx.loadDirectByte(addr), state.a, state.flags)
    : adc16Bit(ctx.loadDirectWord(addr), state.a, state.flags);
  return { state: result };
}

export function adc_Immediate_Byte(arg: number, state: State, ctx: Context) {
  if (!ctx.isA8Bit) console.error("Invalid instruction with A 16-bit");
  const immediate = arg;
  const result = ctx.isA8Bit
    ? adc8Bit(immediate, state.a, state.flags)
    : adc16Bit(immediate, state.a, state.flags);
  return { state: result };
}

export function adc_Immediate_Word(arg: number, state: State, ctx: Context) {
  if (ctx.isA8Bit) console.error("Invalid instruction with A 8-bit");
  const immediate = arg;
  const result = ctx.isA8Bit
    ? adc8Bit(immediate, state.a, state.flags)
    : adc16Bit(immediate, state.a, state.flags);
  return { state: result };
}
