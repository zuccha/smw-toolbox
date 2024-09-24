import {
  flag_c_mask,
  flag_z_mask,
  flag_i_mask,
  flag_d_mask,
  flag_v_mask,
  flag_n_mask,
  flag_x_mask,
  flag_m_mask,
  flag_b_mask,
} from "./constants";
import { ProcessorSnapshot } from "./processor-snapshot";
import { byte_mask, ReadOnlyValue, Value, word_mask } from "./value";

//------------------------------------------------------------------------------
// Processor
//------------------------------------------------------------------------------

export default class Processor {
  public constructor(
    initial_pb: number,
    initial_pc: number,
    initial_sp: number,
  ) {
    this._pb = new Value(initial_pb, byte_mask);
    this._pc = new Value(initial_pc, word_mask);
    this._sp = new Value(initial_sp, word_mask);
  }

  //----------------------------------------------------------------------------
  // Registers
  //----------------------------------------------------------------------------

  // Accumulator ---------------------------------------------------------------

  private _a = new Value(0);

  public get a(): ReadOnlyValue {
    return this._flag_m ? this._a.as_byte() : this._a.as_word();
  }

  public set a(value: ReadOnlyValue) {
    if (this._flag_m) this._a.byte = value.byte;
    else this._a.word = value.word;
  }

  // X Index -------------------------------------------------------------------

  private _x = new Value(0);

  public get x(): ReadOnlyValue {
    return this._flag_x ? this._x.as_byte() : this._x.as_word();
  }

  public set x(value: ReadOnlyValue) {
    if (this._flag_x) this._x.byte = value.byte;
    else this._x.word = value.word;
  }

  // Y Index -------------------------------------------------------------------

  private _y = new Value(0);

  public get y(): ReadOnlyValue {
    return this._flag_x ? this._y.as_byte() : this._y.as_word();
  }

  public set y(value: ReadOnlyValue) {
    if (this._flag_x) this._y.byte = value.byte;
    else this._y.word = value.word;
  }

  // Data Bank -----------------------------------------------------------------

  private _db = new Value(0);

  public get db(): ReadOnlyValue {
    return this._db;
  }

  public set db(value: ReadOnlyValue) {
    this._db.byte = value.byte;
  }

  // Direct Page ---------------------------------------------------------------

  private _dp = new Value(0);

  public get dp(): ReadOnlyValue {
    return this._dp;
  }

  public set dp(value: ReadOnlyValue) {
    if (!this._flag_e) this._dp.word = value.word;
  }

  // Stack Pointer -------------------------------------------------------------

  private _sp = new Value(0);

  public get sp(): ReadOnlyValue {
    return this._sp;
  }

  public set sp(value: ReadOnlyValue) {
    if (this._flag_e) this._sp.byte = value.byte;
    else this._sp.word = value.word;
  }

  // Program Bank --------------------------------------------------------------

  private _pb = new Value(0);

  public get pb(): ReadOnlyValue {
    return this._pb;
  }

  public set pb(value: ReadOnlyValue) {
    this._pb.byte = value.byte;
  }

  // Program Counter -----------------------------------------------------------

  private _pc = new Value(0);

  public get pc(): ReadOnlyValue {
    return this._pc;
  }

  public set pc(value: ReadOnlyValue) {
    this._pc.word = value.word;
  }

  //----------------------------------------------------------------------------
  // Flags
  //----------------------------------------------------------------------------

  // Negative ------------------------------------------------------------------

  private _flag_n: 0 | 1 = 0;

  public get flag_n(): number {
    return this._flag_n;
  }

  public set flag_n(active: boolean | number) {
    this._flag_n = active ? 1 : 0;
  }

  // Overflow ------------------------------------------------------------------

  private _flag_v: 0 | 1 = 0;

  public get flag_v(): number {
    return this._flag_v;
  }

  public set flag_v(active: boolean | number) {
    this._flag_v = active ? 1 : 0;
  }

  // Accumulator Size ----------------------------------------------------------

  private _flag_m: 0 | 1 = 1;

  public get flag_m(): number {
    return this._flag_m;
  }

  public set flag_m(active: boolean | number) {
    if (this._flag_e) return;
    this._flag_m = active ? 1 : 0;
  }

  // Index Size ----------------------------------------------------------------

  private _flag_x: 0 | 1 = 1;

  public get flag_x(): number {
    return this._flag_x;
  }

  public set flag_x(active: boolean | number) {
    if (this._flag_e) return;
    if (active) {
      this._flag_x = 1;
      this._x.page = 0;
      this._y.page = 0;
    } else {
      this._flag_x = 0;
    }
  }

  // Decimal -------------------------------------------------------------------

  private _flag_d: 0 | 1 = 0;

  public get flag_d(): number {
    return this._flag_d;
  }

  public set flag_d(active: boolean | number) {
    this._flag_d = active ? 1 : 0;
  }

  // Interrupt -----------------------------------------------------------------

  private _flag_i: 0 | 1 = 0;

  public get flag_i(): number {
    return this._flag_i;
  }

  public set flag_i(active: boolean | number) {
    this._flag_i = active ? 1 : 0;
  }

  // Zero ----------------------------------------------------------------------

  private _flag_z: 0 | 1 = 0;

  public get flag_z(): number {
    return this._flag_z;
  }

  public set flag_z(active: boolean | number) {
    this._flag_z = active ? 1 : 0;
  }

  // Carry ---------------------------------------------------------------------

  private _flag_c: 0 | 1 = 0;

  public get flag_c(): number {
    return this._flag_c;
  }

  public set flag_c(active: boolean | number) {
    this._flag_c = active ? 1 : 0;
  }

  // Emulation -----------------------------------------------------------------

  private _flag_e: 0 | 1 = 0;

  public get flag_e(): number {
    return this._flag_e;
  }
  public set flag_e(active: boolean | number) {
    this._flag_e = active ? 1 : 0;
    if (active) {
      this.flag_m = 1;
      this.flag_x = 1;
      this._sp.page = 0x01;
    }
  }

  // Break ---------------------------------------------------------------------

  private _flag_b: 0 | 1 = 0;

  public get flag_b(): number {
    return this._flag_b;
  }

  public set flag_b(active: boolean | number) {
    this._flag_b = active ? 1 : 0;
  }

  // Generic -------------------------------------------------------------------

  public get flags() {
    return this._flag_e
      ? this._flag_c |
          (this._flag_z << 1) |
          (this._flag_i << 2) |
          (this._flag_d << 3) |
          (this._flag_b << 4) |
          // Unused flag
          (this._flag_v << 6) |
          (this._flag_n << 7)
      : this._flag_c |
          (this._flag_z << 1) |
          (this._flag_i << 2) |
          (this._flag_d << 3) |
          (this._flag_x << 4) |
          (this._flag_m << 5) |
          (this._flag_v << 6) |
          (this._flag_n << 7);
  }

  public set flags(flags: number) {
    if (this.flag_e) {
      this.flag_c = flags & flag_c_mask;
      this.flag_z = flags & flag_z_mask;
      this.flag_i = flags & flag_i_mask;
      this.flag_d = flags & flag_d_mask;
      this.flag_b = flags & flag_b_mask;
      this.flag_v = flags & flag_v_mask;
      this.flag_n = flags & flag_n_mask;
    } else {
      this.flag_c = flags & flag_c_mask;
      this.flag_z = flags & flag_z_mask;
      this.flag_i = flags & flag_i_mask;
      this.flag_d = flags & flag_d_mask;
      this.flag_x = flags & flag_x_mask;
      this.flag_m = flags & flag_m_mask;
      this.flag_v = flags & flag_v_mask;
      this.flag_n = flags & flag_n_mask;
    }
  }

  //----------------------------------------------------------------------------
  // Reset
  //----------------------------------------------------------------------------

  public reset(pb: number, pc: number, sp: number) {
    this._a.long = 0;
    this._x.long = 0;
    this._y.long = 0;
    this._db.long = 0;
    this._dp.long = 0;
    this._sp.long = sp;
    this._pb.long = pb;
    this._pc.long = pc;
    this._flag_n = 0;
    this._flag_v = 0;
    this._flag_m = 1;
    this._flag_x = 1;
    this._flag_d = 0;
    this._flag_i = 0;
    this._flag_z = 0;
    this._flag_c = 0;
    this._flag_e = 0;
    this._flag_b = 0;
  }

  //----------------------------------------------------------------------------
  // Snapshot
  //----------------------------------------------------------------------------

  public snapshot(): ProcessorSnapshot {
    return {
      a: this._a.word,
      x: this._x.word,
      y: this._y.word,
      db: this._db.byte,
      dp: this._dp.word,
      sp: this._sp.word,
      pb: this._pb.byte,
      pc: this._pc.word,

      flag_n: this._flag_n,
      flag_v: this._flag_v,
      flag_m: this._flag_m,
      flag_x: this._flag_x,
      flag_d: this._flag_d,
      flag_i: this._flag_i,
      flag_z: this._flag_z,
      flag_c: this._flag_c,
      flag_e: this._flag_e,
      flag_b: this._flag_b,

      flags: this._flag_e
        ? [
            this._flag_n ? "N" : "n",
            this._flag_v ? "V" : "v",
            "-",
            this._flag_b ? "B" : "b",
            this._flag_d ? "D" : "d",
            this._flag_i ? "I" : "i",
            this._flag_z ? "Z" : "z",
            this._flag_c ? "C" : "c",
          ].join("")
        : [
            this._flag_n ? "N" : "n",
            this._flag_v ? "V" : "v",
            this._flag_m ? "M" : "m",
            this._flag_x ? "X" : "x",
            this._flag_d ? "D" : "d",
            this._flag_i ? "I" : "i",
            this._flag_z ? "Z" : "z",
            this._flag_c ? "C" : "c",
          ].join(""),
    };
  }
}
