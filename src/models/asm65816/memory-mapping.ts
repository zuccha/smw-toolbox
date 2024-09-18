import { Integer } from "./integer";
import { format_addr } from "./utils";

export class MemoryMappingArea {
  private _name: string;
  private _ranges: MemoryMappingArea.Range[];
  private _is_read_only: boolean;
  private _mirror: (addr: Integer) => number;

  public constructor(
    name: string,
    ranges: MemoryMappingArea.Range[],
    is_read_only: boolean,
    mirror = (addr: Integer): number => addr.l,
  ) {
    this._name = name;
    this._ranges = ranges;
    this._is_read_only = is_read_only;
    this._mirror = mirror;
  }

  public contains(addr: Integer): boolean {
    return this._ranges.some(
      (range) =>
        range.min.bank <= addr.bank &&
        addr.bank <= range.max.bank &&
        range.min.w <= addr.w &&
        addr.w <= range.max.w,
    );
  }

  public getReadAddr(addr: Integer): number | undefined {
    if (this.contains(addr)) {
      return this._mirror(addr);
    }
  }

  public getWriteAddr(addr: Integer): number | undefined {
    if (this.contains(addr)) {
      if (!this._is_read_only) return this._mirror(addr);

      const formatted_addr = format_addr(addr.l);
      const message = `Writing to invalid address ${formatted_addr}: cannot write to ${this._name}.`;
      throw new Error(message);
    }
  }
}

export namespace MemoryMappingArea {
  export type Range = {
    max: Integer;
    min: Integer;
  };

  export const WRAM = new MemoryMappingArea(
    "WRAM",
    [
      { min: new Integer(0x7f0000), max: new Integer(0x7f1fff) },
      { min: new Integer(0x7e2000), max: new Integer(0x7fffff) },
    ],
    false,
  );

  export const WRAM_Mirror = new MemoryMappingArea(
    "WRAM",
    [
      { min: new Integer(0x000000), max: new Integer(0x3f1fff) },
      { min: new Integer(0x7e0000), max: new Integer(0x7e1fff) },
      { min: new Integer(0x800000), max: new Integer(0xbf1fff) },
    ],
    false,
    (addr) => 0x7f0000 | addr.w,
  );
}

export class MemoryMapping {
  private _areas: MemoryMappingArea[];

  public constructor(areas: MemoryMappingArea[]) {
    this._areas = areas;
  }

  public getReadAddr(addr: number): number {
    for (const area of this._areas) {
      const readAddr = area.getReadAddr(new Integer(addr));
      if (readAddr !== undefined) return readAddr;
    }

    const formatted_addr = format_addr(addr);
    const message = `Reading from invalid address ${formatted_addr}: unsupported area.`;
    throw new Error(message);
  }

  public getWriteAddr(addr: number): number {
    for (const area of this._areas) {
      const writeAddr = area.getWriteAddr(new Integer(addr));
      if (writeAddr !== undefined) return writeAddr;
    }

    const formatted_addr = format_addr(addr);
    const message = `Writing to invalid address ${formatted_addr}: unsupported area.`;
    throw new Error(message);
  }
}

export namespace MemoryMapping {
  export const LoROM = new MemoryMapping([
    MemoryMappingArea.WRAM,
    MemoryMappingArea.WRAM_Mirror,
    new MemoryMappingArea(
      "ROM",
      [{ min: new Integer(0x808000), max: new Integer(0xffffff) }],
      true,
    ),
    new MemoryMappingArea(
      "ROM",
      [{ min: new Integer(0x008000), max: new Integer(0x7dffff) }],
      true,
      (addr) => (((addr.bank + 0x80) & 0xff) << 16) | addr.w,
    ),
  ]);
}
