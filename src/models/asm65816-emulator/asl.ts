//==============================================================================
// Utils
//==============================================================================

import { Context } from "./_context";
import { Flag, State } from "./_types";
import { applyFlags, h, l, w } from "./_utils";

function asl8Bit(
  value: number,
  flags: number,
): { value: number; flags: number } {
  const result = l(value << 1);
  const newFlags =
    (result & Flag.N) |
    (result === 0 ? Flag.Z : 0) |
    ((l(value) >> 7) & Flag.C);
  return {
    value: result,
    flags: applyFlags(Flag.N | Flag.Z | Flag.C, flags, newFlags),
  };
}

function asl16Bit(
  value: number,
  flags: number,
): { value: number; flags: number } {
  const result = w(value << 1);
  const newFlags =
    ((result >> 8) & Flag.N) |
    (result === 0 ? Flag.Z : 0) |
    ((l(value) >> 15) & Flag.C);
  return {
    value: result,
    flags: applyFlags(Flag.N | Flag.Z | Flag.C, flags, newFlags),
  };
}

function aslAccumulator(state: State, ctx: Context) {
  if (ctx.isA8Bit) {
    const result = asl8Bit(state.a, state.flags);
    return { state: { a: h(state.a) | result.value, flags: result.flags } };
  } else {
    const result = asl16Bit(state.a, state.flags);
    return { state: { a: result.value, flags: result.flags } };
  }
}

function aslAddress(addr: number, state: State, ctx: Context) {
  if (ctx.isA8Bit) {
    const result = asl8Bit(ctx.load_byte(state.a), state.flags);
    return {
      state: { flags: result.flags, memory: ctx.save_byte(addr, result.value) },
    };
  } else {
    const result = asl16Bit(ctx.load_word(state.a), state.flags);
    return {
      state: { flags: result.flags, memory: ctx.save_word(addr, result.value) },
    };
  }
}

//==============================================================================
// Instructions
//==============================================================================

export function asl_Absolute(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute(arg);
  return aslAddress(addr, state, ctx);
}

export function asl_Absolute_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute_x(arg);
  return aslAddress(addr, state, ctx);
}

export function asl_Accumulator(_arg: number, state: State, ctx: Context) {
  return aslAccumulator(state, ctx);
}

export function asl_Direct(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct(arg);
  return aslAddress(addr, state, ctx);
}

export function asl_Direct_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_x(arg);
  return aslAddress(addr, state, ctx);
}

//==============================================================================
// Operations
//==============================================================================

export const aslByInstructionId = {
  "ASL-Absolute": asl_Absolute,
  "ASL-Absolute_X": asl_Absolute_X,
  "ASL-Accumulator": asl_Accumulator,
  "ASL-Direct": asl_Direct,
  "ASL-Direct_X": asl_Direct_X,
} as const;
