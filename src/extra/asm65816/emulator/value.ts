//------------------------------------------------------------------------------
// Value
//------------------------------------------------------------------------------

export class Value {
  private _value: number;

  public constructor(value: number, mask = long_mask) {
    this._value = value & mask;
  }

  //----------------------------------------------------------------------------
  // Getters
  //----------------------------------------------------------------------------

  public get byte() {
    return this._value & byte_mask;
  }

  public get word() {
    return this._value & word_mask;
  }

  public get long() {
    return this._value & long_mask;
  }

  public get page() {
    return (this._value & page_mask) >> 8;
  }

  public get bank() {
    return (this._value & bank_mask) >> 16;
  }

  //----------------------------------------------------------------------------
  // Setters
  //----------------------------------------------------------------------------

  public set byte(byte: number) {
    this._value = (this._value & ~byte_mask) | (byte & byte_mask);
  }

  public set word(word: number) {
    this._value = (this._value & ~word_mask) | (word & word_mask);
  }

  public set long(long: number) {
    this._value = (this._value & ~long_mask) | (long & long_mask);
  }

  public set page(page: number) {
    this._value = (this._value & ~page_mask) | ((page << 8) & page_mask);
  }

  public set bank(bank: number) {
    this._value = (this._value & ~bank_mask) | ((bank << 16) & bank_mask);
  }

  //----------------------------------------------------------------------------
  // Formatting
  //----------------------------------------------------------------------------

  public format_byte(prefix = ""): string {
    return to_hex(this.byte, 2, prefix);
  }

  public format_word(prefix = ""): string {
    return to_hex(this.word, 4, prefix);
  }

  public format_long(prefix = ""): string {
    return to_hex(this.long, 6, prefix);
  }

  public format_page(prefix = ""): string {
    return to_hex(this.page, 2, prefix);
  }

  public format_bank(prefix = ""): string {
    return to_hex(this.bank, 2, prefix);
  }

  public format_address(): string {
    return `[${to_hex(this.bank, 2, "")}:${to_hex(this.word, 4, "")}]`;
  }

  //----------------------------------------------------------------------------
  // Conversion
  //----------------------------------------------------------------------------

  public as_byte(): Value {
    return new Value(this._value, byte_mask);
  }

  public as_word(): Value {
    return new Value(this._value, word_mask);
  }

  public as_long(): Value {
    return new Value(this._value, long_mask);
  }
}

//------------------------------------------------------------------------------
// Read-Only Value
//------------------------------------------------------------------------------

export type ReadOnlyValue = {
  readonly byte: number;
  readonly word: number;
  readonly long: number;
  readonly page: number;
  readonly bank: number;

  format_byte: (prefix: string) => string;
  format_word: (prefix: string) => string;
  format_long: (prefix: string) => string;
  format_page: (prefix: string) => string;
  format_bank: (prefix: string) => string;
  format_address: () => string;
};

//------------------------------------------------------------------------------
// Shared Exports
//------------------------------------------------------------------------------

export const b = (value: number): ReadOnlyValue => new Value(value, byte_mask);
export const w = (value: number): ReadOnlyValue => new Value(value, word_mask);
export const l = (value: number): ReadOnlyValue => new Value(value, long_mask);

export const byte_mask = 0x0000ff;
export const word_mask = 0x00ffff;
export const long_mask = 0xffffff;
export const page_mask = 0x00ff00;
export const bank_mask = 0xff0000;

//------------------------------------------------------------------------------
// Utils
//------------------------------------------------------------------------------

function pad_l(text: string, length: number, fill: string): string {
  return `${fill.repeat(length - text.length)}${text}`;
}

export function to_hex(n: number, minLength: number, prefix: string): string {
  const hex = n.toString(16).toUpperCase();
  return `${prefix}${pad_l(hex, minLength, "0")}`;
}
