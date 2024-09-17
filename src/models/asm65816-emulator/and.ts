//==============================================================================
// Utils
//==============================================================================

import { Context } from "./_context";
import { Flag, State } from "./_types";
import { applyFlags, h, l, w } from "./_utils";

function and8Bit(
  value: number,
  a: number,
  flags: number,
): { a: number; flags: number } {
  const result = l(value) & l(a);
  const newFlags = (l(result) & Flag.N) | (l(result) === 0 ? Flag.Z : 0);
  return {
    a: h(a) | l(result),
    flags: applyFlags(Flag.N | Flag.Z, flags, newFlags),
  };
}

function and16Bit(
  value: number,
  a: number,
  flags: number,
): { a: number; flags: number } {
  const result = w(value) & w(a);
  const newFlags =
    ((w(result) & (Flag.N << 8)) >> 8) | (w(result) === 0 ? Flag.Z : 0);
  return {
    a: w(result),
    flags: applyFlags(Flag.N | Flag.Z, flags, newFlags),
  };
}

function andLoadAddr(addr: number, state: State, ctx: Context) {
  const result = ctx.isA8Bit
    ? and8Bit(ctx.load_byte(addr), state.a, state.flags)
    : and16Bit(ctx.load_word(addr), state.a, state.flags);
  return { state: result };
}

function andLoadImmediate(value: number, state: State, ctx: Context) {
  const result = ctx.isA8Bit
    ? and8Bit(value, state.a, state.flags)
    : and16Bit(value, state.a, state.flags);
  return { state: result };
}

//==============================================================================
// Instructions
//==============================================================================

export function and_Absolute(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_AbsoluteLong(arg: number, state: State, ctx: Context) {
  const addr = ctx.absoluteLong(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_AbsoluteLong_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.absoluteLong_x(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_Absolute_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute_x(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_Absolute_Y(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute_y(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_Direct(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_Direct_Indirect(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_indirect(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_Direct_IndirectLong(
  arg: number,
  state: State,
  ctx: Context,
) {
  const addr = ctx.direct_indirectLong(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_Direct_IndirectLong_Y(
  arg: number,
  state: State,
  ctx: Context,
) {
  const addr = ctx.direct_indirectLong_y(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_Direct_Indirect_Y(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_indirect_y(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_Direct_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_x(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_Direct_X_Indirect(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_x_indirect(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_Immediate(arg: number, state: State, ctx: Context) {
  return andLoadImmediate(arg, state, ctx);
}

export function and_StackRelative(arg: number, state: State, ctx: Context) {
  const addr = ctx.stackRelative(arg);
  return andLoadAddr(addr, state, ctx);
}

export function and_StackRelative_Indirect_Y(
  arg: number,
  state: State,
  ctx: Context,
) {
  const addr = ctx.stackRelative_indirect_y(arg);
  return andLoadAddr(addr, state, ctx);
}

//==============================================================================
// Operations
//==============================================================================

export const andByInstructionId = {
  "AND-Absolute": and_Absolute,
  "AND-AbsoluteLong": and_AbsoluteLong,
  "AND-AbsoluteLong_X": and_AbsoluteLong_X,
  "AND-Absolute_X": and_Absolute_X,
  "AND-Absolute_Y": and_Absolute_Y,
  "AND-Direct": and_Direct,
  "AND-Direct_Indirect": and_Direct_Indirect,
  "AND-Direct_IndirectLong": and_Direct_IndirectLong,
  "AND-Direct_IndirectLong_Y": and_Direct_IndirectLong_Y,
  "AND-Direct_Indirect_Y": and_Direct_Indirect_Y,
  "AND-Direct_X": and_Direct_X,
  "AND-Direct_X_Indirect": and_Direct_X_Indirect,
  "AND-Immediate": and_Immediate,
  "AND-StackRelative": and_StackRelative,
  "AND-StackRelative_Indirect_Y": and_StackRelative_Indirect_Y,
} as const;
