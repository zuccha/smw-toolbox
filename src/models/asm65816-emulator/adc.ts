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

function adcLoadAddr(addr: number, state: State, ctx: Context) {
  const result = ctx.isA8Bit
    ? adc8Bit(ctx.load_byte(addr), state.a, state.flags)
    : adc16Bit(ctx.load_word(addr), state.a, state.flags);
  return { state: result };
}

function adcLoadImmediate(value: number, state: State, ctx: Context) {
  const result = ctx.isA8Bit
    ? adc8Bit(value, state.a, state.flags)
    : adc16Bit(value, state.a, state.flags);
  return { state: result };
}

//==============================================================================
// Instructions
//==============================================================================

export function adc_Absolute(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_AbsoluteLong(arg: number, state: State, ctx: Context) {
  const addr = ctx.absoluteLong(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_AbsoluteLong_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.absoluteLong_x(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Absolute_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute_x(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Absolute_Y(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute_y(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_Indirect(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_indirect(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_IndirectLong(
  arg: number,
  state: State,
  ctx: Context,
) {
  const addr = ctx.direct_indirectLong(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_IndirectLong_Y(
  arg: number,
  state: State,
  ctx: Context,
) {
  const addr = ctx.direct_indirectLong_y(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_Indirect_Y(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_indirect_y(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_x(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_X_Indirect(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_x_indirect(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Immediate(arg: number, state: State, ctx: Context) {
  return adcLoadImmediate(arg, state, ctx);
}

export function adc_StackRelative(arg: number, state: State, ctx: Context) {
  const addr = ctx.stackRelative(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_StackRelative_Indirect_Y(
  arg: number,
  state: State,
  ctx: Context,
) {
  const addr = ctx.stackRelative_indirect_y(arg);
  return adcLoadAddr(addr, state, ctx);
}

//==============================================================================
// Operations
//==============================================================================

export const adcByInstructionId = {
  "ADC-Absolute": adc_Absolute,
  "ADC-AbsoluteLong": adc_AbsoluteLong,
  "ADC-AbsoluteLong_X": adc_AbsoluteLong_X,
  "ADC-Absolute_X": adc_Absolute_X,
  "ADC-Absolute_Y": adc_Absolute_Y,
  "ADC-Direct": adc_Direct,
  "ADC-Direct_Indirect": adc_Direct_Indirect,
  "ADC-Direct_IndirectLong": adc_Direct_IndirectLong,
  "ADC-Direct_IndirectLong_Y": adc_Direct_IndirectLong_Y,
  "ADC-Direct_Indirect_Y": adc_Direct_Indirect_Y,
  "ADC-Direct_X": adc_Direct_X,
  "ADC-Direct_X_Indirect": adc_Direct_X_Indirect,
  "ADC-Immediate": adc_Immediate,
  "ADC-StackRelative": adc_StackRelative,
  "ADC-StackRelative_Indirect_Y": adc_StackRelative_Indirect_Y,
} as const;
