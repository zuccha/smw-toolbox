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
import { b, ReadOnlyValue, Value, w, word_mask } from "./value";

//------------------------------------------------------------------------------
// Processor
//------------------------------------------------------------------------------

export default class Processor {
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

  public get c(): ReadOnlyValue {
    return this._a.as_word();
  }

  public set c(value: ReadOnlyValue) {
    this._a.word = value.word;
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

  public get flag_n(): 0 | 1 {
    return this._flag_n;
  }

  public set flag_n(active: boolean | number) {
    this._flag_n = active ? 1 : 0;
  }

  // Overflow ------------------------------------------------------------------

  private _flag_v: 0 | 1 = 0;

  public get flag_v(): 0 | 1 {
    return this._flag_v;
  }

  public set flag_v(active: boolean | number) {
    this._flag_v = active ? 1 : 0;
  }

  // Accumulator Size ----------------------------------------------------------

  private _flag_m: 0 | 1 = 1;

  public get flag_m(): 0 | 1 {
    return this._flag_m;
  }

  public set flag_m(active: boolean | number) {
    if (this._flag_e) return;
    this._flag_m = active ? 1 : 0;
  }

  // Index Size ----------------------------------------------------------------

  private _flag_x: 0 | 1 = 1;

  public get flag_x(): 0 | 1 {
    return this._flag_x;
  }

  public set flag_x(active: boolean | number) {
    if (active || this.flag_e) {
      this._flag_x = 1;
      this._x.page = 0;
      this._y.page = 0;
    } else {
      this._flag_x = 0;
    }
  }

  // Decimal -------------------------------------------------------------------

  private _flag_d: 0 | 1 = 0;

  public get flag_d(): 0 | 1 {
    return this._flag_d;
  }

  public set flag_d(active: boolean | number) {
    this._flag_d = active ? 1 : 0;
  }

  // Interrupt -----------------------------------------------------------------

  private _flag_i: 0 | 1 = 0;

  public get flag_i(): 0 | 1 {
    return this._flag_i;
  }

  public set flag_i(active: boolean | number) {
    this._flag_i = active ? 1 : 0;
  }

  // Zero ----------------------------------------------------------------------

  private _flag_z: 0 | 1 = 0;

  public get flag_z(): 0 | 1 {
    return this._flag_z;
  }

  public set flag_z(active: boolean | number) {
    this._flag_z = active ? 1 : 0;
  }

  // Carry ---------------------------------------------------------------------

  private _flag_c: 0 | 1 = 0;

  public get flag_c(): 0 | 1 {
    return this._flag_c;
  }

  public set flag_c(active: boolean | number) {
    this._flag_c = active ? 1 : 0;
  }

  // Emulation -----------------------------------------------------------------

  private _flag_e: 0 | 1 = 0;

  public get flag_e(): 0 | 1 {
    return this._flag_e;
  }
  public set flag_e(active: boolean | number) {
    if (active) {
      this._flag_e = 1;
      this.flag_m = 1;
      this.flag_x = 1;
      this._sp.page = 0x01;
    } else {
      this._flag_e = 0;
    }
  }

  // Break ---------------------------------------------------------------------

  private _flag_b: 0 | 1 = 0;

  public get flag_b(): 0 | 1 {
    return this._flag_b;
  }

  public set flag_b(active: boolean | number) {
    this._flag_b = active ? 1 : 0;
  }

  // Generic -------------------------------------------------------------------

  public get flags() {
    return this._flag_e
      ? this.flag_c |
          (this.flag_z << 1) |
          (this.flag_i << 2) |
          (this.flag_d << 3) |
          (this.flag_b << 4) |
          // Unused flag
          (this.flag_v << 6) |
          (this.flag_n << 7)
      : this.flag_c |
          (this.flag_z << 1) |
          (this.flag_i << 2) |
          (this.flag_d << 3) |
          (this.flag_x << 4) |
          (this.flag_m << 5) |
          (this.flag_v << 6) |
          (this.flag_n << 7);
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

  public reset(args: {
    a: number;
    x: number;
    y: number;
    sp: number;
    dp: number;
    db: number;
    pb: number;
    pc: number;
    flags: number;
  }) {
    this._flag_n = ((args.flags >> 7) & 1) as 0 | 1;
    this._flag_v = ((args.flags >> 6) & 1) as 0 | 1;
    this._flag_m = ((args.flags >> 5) & 1) as 0 | 1;
    this._flag_x = ((args.flags >> 4) & 1) as 0 | 1;
    this._flag_d = ((args.flags >> 3) & 1) as 0 | 1;
    this._flag_i = ((args.flags >> 2) & 1) as 0 | 1;
    this._flag_z = ((args.flags >> 1) & 1) as 0 | 1;
    this._flag_c = ((args.flags >> 0) & 1) as 0 | 1;
    this._flag_e = 0;
    this._flag_b = 0;
    this._a.long = args.a & word_mask;
    this.x = w(args.x);
    this.y = w(args.y);
    this.sp = w(args.sp);
    this.dp = w(args.dp);
    this.db = b(args.db);
    this._pb.long = args.pb;
    this._pc.long = args.pc;
  }

  //----------------------------------------------------------------------------
  // Snapshot
  //----------------------------------------------------------------------------

  public snapshot(): ProcessorSnapshot {
    return {
      a: this._a.word,
      x: this.x.word,
      y: this.y.word,
      db: this.db.byte,
      dp: this.dp.word,
      sp: this.sp.word,
      pb: this.pb.byte,
      pc: this.pc.word,

      flag_n: this.flag_n,
      flag_v: this.flag_v,
      flag_m: this.flag_m,
      flag_x: this.flag_x,
      flag_d: this.flag_d,
      flag_i: this.flag_i,
      flag_z: this.flag_z,
      flag_c: this.flag_c,
      flag_e: this.flag_e,
      flag_b: this.flag_b,
    };
  }
}
