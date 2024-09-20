import MemoryMapping from "./memory-mapping";
import { byte_mask, v, Value, word_mask } from "./value";

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

  public reset(): void {
    this._memory = new Map();
  }

  private _load(addr: number): number {
    return (this._memory.get(addr) ?? 0) & byte_mask;
  }

  private _save(addr: number, value: number): void {
    this._memory.set(addr, value & byte_mask);
  }

  public load_byte(addr: Value): Value {
    return v(this._load(this._mapping.map(addr)));
  }

  public load_word(addr: Value): Value {
    const byte = this._load(this._mapping.map(addr));
    const page = this._load(this._mapping.map(v(addr.long + 1)));
    return v((page << 8) + byte);
  }

  public load_long(addr: Value): Value {
    const byte = this._load(this._mapping.map(addr));
    const page = this._load(this._mapping.map(v(addr.long + 1)));
    const bank = this._load(this._mapping.map(v(addr.long + 2)));
    return v((bank << 16) + (page << 8) + byte, word_mask);
  }

  public save_byte(addr: Value, value: Value, force = false): void {
    this._save(this._map(addr, !force), value.byte);
  }

  public save_word(addr: Value, value: Value, force = false): void {
    this._save(this._map(addr, !force), value.byte);
    this._save(this._map(v(addr.long + 1), !force), value.page);
  }

  public save_long(addr: Value, value: Value, force = false): void {
    this._save(this._map(addr, !force), value.byte);
    this._save(this._map(v(addr.long + 1), !force), value.page);
    this._save(this._map(v(addr.long + 2), !force), value.bank);
  }

  private _map(addr: Value, readonly: boolean): number {
    return readonly
      ? this._mapping.map_readonly(addr)
      : this._mapping.map(addr);
  }
}
