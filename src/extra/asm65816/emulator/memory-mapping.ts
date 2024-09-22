import MemoryMappingArea from "./memory-mapping-area";
import { b, l, Value } from "./value";

//------------------------------------------------------------------------------
// Memory Mapping
//------------------------------------------------------------------------------

export default class MemoryMapping {
  public static LoROM = new MemoryMapping(
    [MemoryMappingArea.WRAM, MemoryMappingArea.WRAM_Mirror],
    [
      new MemoryMappingArea([{ min: l(0x808000), max: l(0xffffff) }]),
      new MemoryMappingArea([{ min: l(0x008000), max: l(0x7dffff) }], (addr) =>
        l((b(addr.bank + 0x80).byte << 16) | addr.word),
      ),
    ],
  );

  private _ram: [MemoryMappingArea, ...MemoryMappingArea[]];
  private _rom: [MemoryMappingArea, ...MemoryMappingArea[]];

  public constructor(
    ram: [MemoryMappingArea, ...MemoryMappingArea[]],
    rom: [MemoryMappingArea, ...MemoryMappingArea[]],
  ) {
    this._ram = ram;
    this._rom = rom;
  }

  public get ram_initial_address(): Value {
    return this._ram[0].initial_address;
  }

  public get rom_initial_address(): Value {
    return this._rom[0].initial_address;
  }

  public map(addr: Value): number {
    for (const area of this._ram)
      if (area.contains(addr)) return area.map(addr).long;

    for (const area of this._rom)
      if (area.contains(addr)) return area.map(addr).long;

    const message = `Reading from invalid address ${addr.format_address()}: unsupported area.`;
    throw new Error(message);
  }

  public map_readonly(addr: Value): number {
    for (const area of this._ram)
      if (area.contains(addr)) return area.map(addr).long;

    for (const area of this._rom)
      if (area.contains(addr)) {
        const message = `Writing to invalid address ${addr.format_address()}: cannot write in ROM.`;
        throw new Error(message);
      }

    const message = `Writing to invalid address ${addr.format_address()}: unsupported area.`;
    throw new Error(message);
  }
}
