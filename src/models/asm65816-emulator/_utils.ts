import {
  Asm65816InstructionModifier,
  Asm65816InstructionId,
  Asm65816InstructionMetaById,
} from "../asm65816-instruction";
import { Flag, Mask, Report, State } from "./_types";

// Get only the desired bytes of a number.
export const l = (val: number) => val & Mask.LowByte;
export const h = (val: number) => val & Mask.HighByte;
export const w = (val: number) => val & Mask.Word;

// Compose bytes into little endian format.
export function littleEndian(
  low: number,
  high: number,
  long: number = 0,
): number {
  return l(long << 16) | l(high << 8) | l(low);
}

// Set/unset new flags.
export function applyFlags(
  resetFlags: number,
  oldFlags: number,
  newFlags: number,
): number {
  return l((oldFlags & ~resetFlags) | newFlags);
}

// Produce report
export function produceReport(id: Asm65816InstructionId, state: State): Report {
  const meta = Asm65816InstructionMetaById[id];
  let bytes = meta.bytes;
  let cycles = meta.cycles;

  const CyclesModifiers = Asm65816InstructionModifier;

  if (
    meta.cyclesModifiers & CyclesModifiers.Plus1IfMIsZero &&
    state.flags & Flag.M
  )
    cycles += 1;

  if (
    meta.cyclesModifiers & CyclesModifiers.Plus2IfMIsZero &&
    state.flags & Flag.M
  )
    cycles += 2;

  if (
    meta.cyclesModifiers & CyclesModifiers.Plus1IfXIsZero &&
    state.flags & Flag.X
  )
    cycles += 1;

  // if (
  //   meta.cyclesModifiers & CyclesModifiers.Plus1IfEIsZero &&
  //   state.flags & Flag.E
  // )
  //   cycles += 1;

  if (
    meta.cyclesModifiers & CyclesModifiers.Plus1IfDirectPageLowByteIsNonZero &&
    l(state.dp) > 0
  )
    cycles += 1;

  // if (
  //   meta.cyclesModifiers & CyclesModifiers.Plus1IfIndexCrossesPageBoundary &&
  //   ?
  // )
  //   cycles += 1;

  if (
    meta.bytesModifiers & CyclesModifiers.Plus2IfMIsZero &&
    state.flags & Flag.M
  )
    bytes += 1;

  if (
    meta.bytesModifiers & CyclesModifiers.Plus1IfXIsZero &&
    state.flags & Flag.X
  )
    bytes += 1;

  return { bytes, cycles };
}
