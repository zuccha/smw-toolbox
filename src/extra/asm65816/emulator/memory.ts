import MemoryMapping from "./memory-mapping";
import { b, byte_mask, l, Value, w } from "./value";

//------------------------------------------------------------------------------
// Memory
//------------------------------------------------------------------------------

export default class Memory {
  private _memory: Map<number, number>;
  private _mapping: MemoryMapping;

  public constructor(mapping: MemoryMapping) {
    this._memory = new Map();
    this._mapping = mapping;
  }

  public reset(mapping: MemoryMapping): void {
    this._memory = new Map();
    this._mapping = mapping;
  }

  private _load(addr: number): number {
    return (this._memory.get(addr) ?? 0) & byte_mask;
  }

  private _save(addr: number, value: number): void {
    this._memory.set(addr, value & byte_mask);
  }

  public load_byte(addr: Value): Value {
    return b(this._load(this._mapping.map(addr)));
  }

  public load_word(addr: Value): Value {
    const byte = this._load(this._mapping.map(addr));
    const page = this._load(this._mapping.map(l(addr.long + 1)));
    return w((page << 8) + byte);
  }

  public load_long(addr: Value): Value {
    const byte = this._load(this._mapping.map(addr));
    const page = this._load(this._mapping.map(l(addr.long + 1)));
    const bank = this._load(this._mapping.map(l(addr.long + 2)));
    return l((bank << 16) + (page << 8) + byte);
  }

  public save_byte(addr: Value, value: Value, force = false): void {
    this._save(this._map(addr, !force), value.byte);
  }

  public save_word(addr: Value, value: Value, force = false): void {
    this._save(this._map(addr, !force), value.byte);
    this._save(this._map(l(addr.long + 1), !force), value.page);
  }

  public save_long(addr: Value, value: Value, force = false): void {
    this._save(this._map(addr, !force), value.byte);
    this._save(this._map(l(addr.long + 1), !force), value.page);
    this._save(this._map(l(addr.long + 2), !force), value.bank);
  }

  public load_byte_raw(addr: Value): number | undefined {
    try {
      return this._memory.get(this._mapping.map(addr));
    } catch {
      return undefined;
    }
  }

  private _map(addr: Value, readonly: boolean): number {
    return readonly
      ? this._mapping.map_readonly(addr)
      : this._mapping.map(addr);
  }
}
