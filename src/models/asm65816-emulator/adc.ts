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

export function adc_Direct_Byte(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_Byte_S(arg: number, state: State, ctx: Context) {
  const addr = ctx.stackRelative(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_Byte_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_x(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_Long(arg: number, state: State, ctx: Context) {
  const addr = ctx.absoluteLong(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_Long_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.absoluteLong_x(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_Word(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_Word_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute_x(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Direct_Word_Y(arg: number, state: State, ctx: Context) {
  const addr = ctx.absolute_y(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Immediate(arg: number, state: State, ctx: Context) {
  return adcLoadImmediate(arg, state, ctx);
}

export function adc_Indirect_Byte(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_indirect(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Indirect_Byte_SY(arg: number, state: State, ctx: Context) {
  const addr = ctx.stackRelative_indirect_y(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Indirect_Byte_X(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_x_indirect(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_Indirect_Byte_Y(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_indirect_y(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_IndirectLong_Byte(arg: number, state: State, ctx: Context) {
  const addr = ctx.direct_indirectLong(arg);
  return adcLoadAddr(addr, state, ctx);
}

export function adc_IndirectLong_Byte_Y(
  arg: number,
  state: State,
  ctx: Context,
) {
  const addr = ctx.direct_indirectLong_y(arg);
  return adcLoadAddr(addr, state, ctx);
}

//==============================================================================
// Operations
//==============================================================================

export const adcByInstructionId = {
  "ADC-Absolute": adc_Direct_Word,
  "ADC-AbsoluteLong": adc_Direct_Long,
  "ADC-AbsoluteLong_X": adc_Direct_Long_X,
  "ADC-Absolute_X": adc_Direct_Word_X,
  "ADC-Absolute_Y": adc_Direct_Word_Y,
  "ADC-Direct": adc_Direct_Byte,
  "ADC-Direct_Indirect": adc_Indirect_Byte,
  "ADC-Direct_IndirectLong": adc_IndirectLong_Byte,
  "ADC-Direct_IndirectLong_Y": adc_IndirectLong_Byte_Y,
  "ADC-Direct_Indirect_Y": adc_Indirect_Byte_Y,
  "ADC-Direct_X": adc_Direct_Byte_X,
  "ADC-Direct_X_Indirect": adc_Indirect_Byte_X,
  "ADC-Immediate": adc_Immediate,
  "ADC-StackRelative": adc_Direct_Byte_S,
  "ADC-StackRelative_Indirect_Y": adc_Indirect_Byte_SY,
} as const;
