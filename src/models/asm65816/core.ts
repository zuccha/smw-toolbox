import { Integer } from "./integer";

export class Core {
  //----------------------------------------------------------------------------
  // Snapshot
  //----------------------------------------------------------------------------

  public snapshot(): Core.Snapshot {
    return {
      A: this.A,
      X: this.X,
      Y: this.Y,
      DB: this.DB,
      DP: this.DP,
      SP: this.SP,
      PB: this._PC.high,
      PC: this._PC.w,

      flag: {
        n: this._n,
        v: this._v,
        m: this._m,
        x: this._x,
        d: this._d,
        i: this._i,
        z: this._z,
        c: this._c,
      },

      flags:
        (this._n << 7) |
        (this._v << 6) |
        (this._m << 5) |
        (this._x << 4) |
        (this._d << 3) |
        (this._i << 2) |
        (this._z << 1) |
        (this._c << 0),

      ram: Object.fromEntries(this._ram),
    };
  }

  //----------------------------------------------------------------------------
  // Accumulator
  //----------------------------------------------------------------------------

  private _A = new Integer(0);

  public get A(): number {
    return this._m ? this._A.b : this._A.w;
  }

  public set A(A: number) {
    if (this._m) this._A.b = A;
    else this._A.w = A;
  }

  //----------------------------------------------------------------------------
  // X Index
  //----------------------------------------------------------------------------

  private _X = new Integer(0);

  public get X(): number {
    return this._x ? this._X.b : this._X.w;
  }

  public set X(X: number) {
    if (this._x) this._X.b = X;
    else this._X.w = X;
  }

  //----------------------------------------------------------------------------
  // Y Index
  //----------------------------------------------------------------------------

  private _Y = new Integer(0);

  public get Y(): number {
    return this._x ? this._Y.b : this._Y.w;
  }

  public set Y(Y: number) {
    if (this._x) this._Y.b = Y;
    else this._Y.w = Y;
  }

  //----------------------------------------------------------------------------
  // Data Bank
  //----------------------------------------------------------------------------

  private _DB = new Integer(0);

  public get DB(): number {
    return this._DB.b;
  }

  public set DB(DB: number) {
    this._DB.b = DB;
  }

  //----------------------------------------------------------------------------
  // Direct Page
  //----------------------------------------------------------------------------

  private _DP = new Integer(0);

  public get DP(): number {
    return this._DP.w;
  }

  public set DP(DP: number) {
    this._DP.w = DP;
  }

  //----------------------------------------------------------------------------
  // Stack Pointer
  //----------------------------------------------------------------------------

  private _SP = new Integer(0);

  public get SP(): number {
    return this._SP.w;
  }

  public set SP(SP: number) {
    this._SP.w = SP;
  }

  //----------------------------------------------------------------------------
  // Program Counter
  //----------------------------------------------------------------------------

  private _PC = new Integer(0);

  public get PC(): number {
    return this._PC.l;
  }

  public set PC(PC: number) {
    this._PC.l = PC;
  }

  //----------------------------------------------------------------------------
  // Flags
  //----------------------------------------------------------------------------

  // Negative
  private _n: 0 | 1 = 0;
  // prettier-ignore
  public get n(): 0 | 1 { return this._n; }
  // prettier-ignore
  public set n(active: boolean | number) { this._n = active ? 1 : 0; }

  // Overflow
  private _v: 0 | 1 = 0;
  // prettier-ignore
  public get v(): 0 | 1 { return this._v; }
  // prettier-ignore
  public set v(active: boolean | number) { this._v = active ? 1 : 0; }

  // Accumulator size (0 = 16-bit, 1 = 8-bit)
  private _m: 0 | 1 = 0;
  // prettier-ignore
  public get m(): 0 | 1 { return this._m; }
  // prettier-ignore
  public set m(active: boolean | number) { this._m = active ? 1 : 0; }

  // X/Y indexes size (0 = 16-bit, 1 = 8-bit)
  private _x: 0 | 1 = 0;
  // prettier-ignore
  public get x(): 0 | 1 { return this._x; }
  // prettier-ignore
  public set x(active: boolean | number) { this._x = active ? 1 : 0; }

  // Decimal
  private _d: 0 | 1 = 0;
  // prettier-ignore
  public get d(): 0 | 1 { return this._d; }
  // prettier-ignore
  public set d(active: boolean | number) { this._d = active ? 1 : 0; }

  // IRQ disable
  private _i: 0 | 1 = 0;
  // prettier-ignore
  public get i(): 0 | 1 { return this._i; }
  // prettier-ignore
  public set i(active: boolean | number) { this._i = active ? 1 : 0; }

  // Zero
  private _z: 0 | 1 = 0;
  // prettier-ignore
  public get z(): 0 | 1 { return this._z; }
  // prettier-ignore
  public set z(active: boolean | number) { this._z = active ? 1 : 0; }

  // Carry
  private _c: 0 | 1 = 0;
  // prettier-ignore
  public get c(): 0 | 1 { return this._c; }
  // prettier-ignore
  public set c(active: boolean | number) { this._c = active ? 1 : 0; }

  //----------------------------------------------------------------------------
  // RAM
  //----------------------------------------------------------------------------

  private _ram: Map<number, number> = new Map();

  private _load_byte(addr: number): number {
    return this._ram.get(addr) ?? 0;
  }

  private _load_word(addr: number): number {
    return this._load_byte(addr) & (this._load_byte(addr + 1) << 8);
  }

  private _load_long(addr: number): number {
    return (
      this._load_byte(addr) &
      (this._load_byte(addr + 1) << 8) &
      (this._load_byte(addr + 1) << 16)
    );
  }

  public load(addr: number): number {
    return this._m ? this._load_byte(addr) : this._load_word(addr);
  }

  private _save_byte(addr: number, value: number): void {
    this._ram.set(addr, value & 0xff);
  }

  private _save_word(addr: number, value: number): void {
    this._save_byte(addr, value);
    this._save_byte(addr + 1, value >> 8);
  }

  public save(addr: number, value: number): void {
    if (this._m) this._save_byte(addr, value);
    else this._save_word(addr, value);
  }

  //----------------------------------------------------------------------------
  // Addressing modes
  //----------------------------------------------------------------------------

  public direct(val: Integer): number {
    return val.b + this.DP;
  }

  public direct_x(val: Integer): number {
    return val.b + this.DP + this.X;
  }

  public direct_y(val: Integer): number {
    return val.b + this.DP + this.Y;
  }

  public direct_indirect(val: Integer): number {
    return this.DB + this._load_word(val.b + this.DP);
  }

  public direct_x_indirect(val: Integer): number {
    return this.DB + this._load_word(val.b + this.DP + this.X);
  }

  public direct_indirect_y(val: Integer): number {
    return this.DB + this._load_word(val.b + this.DP) + this.Y;
  }

  public direct_indirectLong(val: Integer): number {
    return this._load_long(val.b + this.DP);
  }

  public direct_indirectLong_y(val: Integer): number {
    return this._load_long(val.b + this.DP) + this.Y;
  }

  public absolute(val: Integer): number {
    return this.DB + val.w;
  }

  public absolute_x(val: Integer): number {
    return this.DB + val.w + this.X;
  }

  public absolute_y(val: Integer): number {
    return this.DB + val.w + this.Y;
  }

  public absolute_indirect(val: Integer): number {
    return this.DB + this._load_word(this.DB + val.w);
  }

  public absolute_indirectLong(val: Integer): number {
    return this._load_long(this.DB + val.w);
  }

  public absolute_x_indirect(val: Integer): number {
    return this.DB + this._load_word(this.DB + val.w + this.X);
  }

  public absoluteLong(val: Integer): number {
    return val.l;
  }

  public absoluteLong_x(val: Integer): number {
    return val.l + this.X;
  }

  public stackRelative(val: Integer): number {
    return this.SP + val.b;
  }

  public stackRelative_indirect_y(val: Integer): number {
    return this.DB + this._load_word(this.SP + val.b) + this.Y;
  }

  //----------------------------------------------------------------------------
  // Modifiers
  //----------------------------------------------------------------------------

  public get DP_low(): 0 | 1 {
    return this._DP.l ? 1 : 0;
  }

  public X_cross(addr: number): 0 | 1 {
    return this._x || ((addr + this.X) & 0xffff00) !== (addr & 0xffff00)
      ? 1
      : 0;
  }

  public Y_cross(addr: number): 0 | 1 {
    return this._x || ((addr + this.Y) & 0xffff00) !== (addr & 0xffff00)
      ? 1
      : 0;
  }
}

//----------------------------------------------------------------------------
// Flags
//----------------------------------------------------------------------------

export namespace Core {
  export enum Flag {
    N = 0x80,
    V = 0x40,
    M = 0x20,
    X = 0x10,
    D = 0x08,
    I = 0x04,
    Z = 0x02,
    C = 0x01,
  }

  export type Snapshot = {
    A: number;
    X: number;
    Y: number;
    DB: number;
    DP: number;
    SP: number;
    PB: number;
    PC: number;

    flag: {
      n: number;
      v: number;
      m: number;
      x: number;
      d: number;
      i: number;
      z: number;
      c: number;
    };

    flags: number;

    ram: Record<string, number>;
  };
}