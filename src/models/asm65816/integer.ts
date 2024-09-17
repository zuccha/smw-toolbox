export class Integer {
  public static Byte = 0x0000ff;
  public static Word = 0x00ffff;
  public static Long = 0xffffff;

  private _value: number;

  public constructor(value: number) {
    this._value = value & Integer.Long;
  }

  public get low() {
    return this._value & Integer.Byte;
  }

  public get high() {
    return (this._value >> 8) & Integer.Byte;
  }

  public get bank() {
    return (this._value >> 16) & Integer.Byte;
  }

  public get b() {
    return this._value & Integer.Byte;
  }

  public get w() {
    return this._value & Integer.Word;
  }

  public get l() {
    return this._value & Integer.Long;
  }

  public set low(value: number) {
    this._value = (this._value & 0xffff00) | (value & Integer.Byte);
  }

  public set high(value: number) {
    this._value = (this._value & 0xff00ff) | ((value & Integer.Byte) << 8);
  }

  public set bank(value: number) {
    this._value = (this._value & 0x00ffff) | ((value & Integer.Byte) << 16);
  }

  public set b(value: number) {
    this._value = (this._value & 0xffff00) | (value & Integer.Byte);
  }

  public set w(value: number) {
    this._value = (this._value & 0xff0000) | (value & Integer.Word);
  }

  public set l(value: number) {
    this._value = value & Integer.Long;
  }
}
