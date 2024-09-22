import { v, Value } from "./value";

//------------------------------------------------------------------------------
// Memory Mapping Area
//------------------------------------------------------------------------------

export default class MemoryMappingArea {
  public static WRAM = new MemoryMappingArea([
    { min: v(0x7e0000), max: v(0x7e1fff) },
    { min: v(0x7e2000), max: v(0x7fffff) },
  ]);

  public static WRAM_Mirror = new MemoryMappingArea(
    [
      { min: v(0x000000), max: v(0x3f1fff) },
      { min: v(0x7f0000), max: v(0x7f1fff) },
      { min: v(0x800000), max: v(0xbf1fff) },
    ],
    (addr) => v(0x7e0000 | addr.word),
  );

  public map: (addr: Value) => Value;

  private _ranges: [Range, ...Range[]];

  public constructor(ranges: [Range, ...Range[]], map = (addr: Value) => addr) {
    this.map = map;
    this._ranges = ranges;
  }

  public get initial_address(): Value {
    return this._ranges[0].min;
  }

  public contains(addr: Value): boolean {
    return this._ranges.some((range) => {
      const addr_bank = addr.bank;
      const addr_word = addr.word;
      const in_bank =
        range.min.bank <= addr_bank && addr_bank <= range.max.bank;
      const in_word =
        range.min.word <= addr_word && addr_word <= range.max.word;
      return in_bank && in_word;
    });
  }
}

type Range = { min: Value; max: Value };
