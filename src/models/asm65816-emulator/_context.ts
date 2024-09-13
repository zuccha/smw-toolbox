import { Flag, Mask, Memory, State } from "./_types";
import { h, l, littleEndian, w } from "./_utils";

export type Context = {
  isA8Bit: boolean;
  isX8Bit: boolean;

  addrDp: (value: number) => number;
  addrAbs: (value: number) => number;
  addrLong: (value: number) => number;
  addrSr: (value: number) => number;
  addrX: (value: number) => number;
  addrY: (value: number) => number;

  loadDirectByte: (addr: number) => number;
  saveDirectByte: (addr: number, byte: number) => void;

  loadDirectWord: (addr: number) => number;
  saveDirectWord: (addr: number, word: number) => void;

  loadIndirectByte: (addr: number) => number;
  saveIndirectByte: (addr: number, byte: number) => void;

  loadIndirectWord: (addr: number) => number;
  saveIndirectWord: (addr: number, wrd: number) => void;

  loadIndirectLongByte: (addr: number) => number;
  saveIndirectLongByte: (addr: number, byte: number) => void;

  loadIndirectLongWord: (addr: number) => number;
  saveIndirectLongWord: (addr: number, word: number) => void;
};

export function ContextFromState(state: State): Context {
  // Registers state
  const isA8Bit = Boolean(state.flags & Flag.M);
  const isX8Bit = Boolean(state.flags & Flag.X);

  // Use value as an address.
  const addrDp = (value: number) => w(state.dp) + value;
  const addrAbs = (value: number) => (l(state.db) << 16) + value;
  const addrLong = (value: number) => value & Mask.Long;
  const addrSr = (value: number) => l(value) + w(state.sp);
  const addrX = (value: number) => value + w(state.x);
  const addrY = (value: number) => value + w(state.y);

  // Access direct memory
  const loadDirectByte = (addr: number): number => l(state.memory[addr] ?? 0);
  const saveDirectByte = (addr: number, byte: number): Memory => ({
    [addr]: l(byte),
  });

  const loadDirectWord = (addr: number): number =>
    littleEndian(loadDirectByte(addr), loadDirectByte(addr + 1));
  const saveDirectWord = (addr: number, word: number): Memory => ({
    [addr]: l(word),
    [addr + 1]: h(word),
  });

  // Access indirect memory
  const indirect = (addr: number): number =>
    addrAbs(littleEndian(loadDirectByte(addr), loadDirectByte(addr + 1)));

  const loadIndirectByte = (addr: number): number =>
    loadDirectByte(indirect(addr));
  const saveIndirectByte = (addr: number, byte: number): Memory =>
    saveDirectByte(indirect(addr), byte);

  const loadIndirectWord = (addr: number): number =>
    loadDirectWord(indirect(addr));
  const saveIndirectWord = (addr: number, word: number): Memory =>
    saveDirectWord(indirect(addr), word);

  // Access indirect long memory
  const indirectLong = (addr: number): number =>
    littleEndian(
      loadDirectByte(addr),
      loadDirectByte(addr + 1),
      loadDirectByte(addr + 2),
    );

  const loadIndirectLongByte = (addr: number): number =>
    loadDirectByte(indirectLong(addr));
  const saveIndirectLongByte = (addr: number, byte: number): Memory =>
    saveDirectByte(indirectLong(addr), byte);

  const loadIndirectLongWord = (addr: number): number =>
    loadDirectWord(indirectLong(addr));
  const saveIndirectLongWord = (addr: number, word: number): Memory =>
    saveDirectWord(indirectLong(addr), word);

  // Context
  return {
    isA8Bit,
    isX8Bit,

    addrDp,
    addrAbs,
    addrLong,
    addrSr,
    addrX,
    addrY,

    loadDirectByte,
    saveDirectByte,

    loadDirectWord,
    saveDirectWord,

    loadIndirectByte,
    saveIndirectByte,

    loadIndirectWord,
    saveIndirectWord,

    loadIndirectLongByte,
    saveIndirectLongByte,

    loadIndirectLongWord,
    saveIndirectLongWord,
  };
}
