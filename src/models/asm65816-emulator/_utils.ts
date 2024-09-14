import { Mask } from "./_types";

// Get only the desired bytes of a number.
export const l = (val: number) => val & Mask.LowByte;
export const h = (val: number) => val & Mask.HighByte;
export const b = (val: number) => val & Mask.BankByte;
export const w = (val: number) => val & Mask.Word;

// Compose bytes into little endian format.
export function littleEndian(
  low: number,
  high: number,
  long: number = 0,
): number {
  return (l(long) << 16) | (l(high) << 8) | l(low);
}

// Set/unset new flags.
export function applyFlags(
  resetFlags: number,
  oldFlags: number,
  newFlags: number,
): number {
  return l((oldFlags & ~resetFlags) | newFlags);
}
