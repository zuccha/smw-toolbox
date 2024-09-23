import { ProcessorSnapshot } from "./processor-snapshot";
import { b, l, w } from "./value";

//------------------------------------------------------------------------------
// Processor
//------------------------------------------------------------------------------

export default class Processor {
  public constructor(
    initial_pb: number,
    initial_pc: number,
    initial_sp: number,
  ) {
    this.pb = b(initial_pb);
    this.pc = w(initial_pc);
    this.sp = w(initial_sp);
  }

  //----------------------------------------------------------------------------
  // Registers
  //----------------------------------------------------------------------------

  public readonly a = l(0);
  public readonly x = l(0);
  public readonly y = l(0);

  public readonly db = l(0);

  public readonly dp = l(0);
  public readonly sp = l(0);

  public readonly pb = l(0);
  public readonly pc = l(0);

  public get_a(): number {
    return this._flag_m ? this.a.byte : this.a.word;
  }

  public set_a(value: number): void {
    if (this._flag_m) this.a.byte = value;
    else this.a.word = value;
  }

  public get_x(): number {
    return this._flag_x ? this.x.byte : this.x.word;
  }

  public set_x(value: number): void {
    if (this._flag_x) this.x.byte = value;
    else this.x.word = value;
  }

  public get_y(): number {
    return this._flag_x ? this.y.byte : this.y.word;
  }

  public set_y(value: number): void {
    if (this._flag_x) this.y.byte = value;
    else this.y.word = value;
  }

  //----------------------------------------------------------------------------
  // Flags
  //----------------------------------------------------------------------------

  private _flag_n: 0 | 1 = 0;
  // prettier-ignore
  public get flag_n(): number { return this._flag_n;}
  // prettier-ignore
  public set flag_n(active: boolean | number) { this._flag_n = active ? 1 : 0; }

  private _flag_v: 0 | 1 = 0;
  // prettier-ignore
  public get flag_v(): number { return this._flag_v;}
  // prettier-ignore
  public set flag_v(active: boolean | number) { this._flag_v = active ? 1 : 0; }

  private _flag_m: 0 | 1 = 1;
  // prettier-ignore
  public get flag_m(): number { return this._flag_m;}
  // prettier-ignore
  public set flag_m(active: boolean | number) { this._flag_m = active ? 1 : 0; }

  private _flag_x: 0 | 1 = 1;
  // prettier-ignore
  public get flag_x(): number { return this._flag_x;}
  // prettier-ignore
  public set flag_x(active: boolean | number) { this._flag_x = active ? 1 : 0; if (active) this.x.page = 0; }

  private _flag_d: 0 | 1 = 0;
  // prettier-ignore
  public get flag_d(): number { return this._flag_d;}
  // prettier-ignore
  public set flag_d(active: boolean | number) { this._flag_d = active ? 1 : 0; }

  private _flag_i: 0 | 1 = 0;
  // prettier-ignore
  public get flag_i(): number { return this._flag_i;}
  // prettier-ignore
  public set flag_i(active: boolean | number) { this._flag_i = active ? 1 : 0; }

  private _flag_z: 0 | 1 = 0;
  // prettier-ignore
  public get flag_z(): number { return this._flag_z;}
  // prettier-ignore
  public set flag_z(active: boolean | number) { this._flag_z = active ? 1 : 0; }

  private _flag_c: 0 | 1 = 0;
  // prettier-ignore
  public get flag_c(): number { return this._flag_c;}
  // prettier-ignore
  public set flag_c(active: boolean | number) { this._flag_c = active ? 1 : 0; }

  private _flag_e: 0 | 1 = 0;
  // prettier-ignore
  public get flag_e(): number { return this._flag_e;}
  // prettier-ignore
  public set flag_e(active: boolean | number) { this._flag_e = active ? 1 : 0; }

  private _flag_b: 0 | 1 = 0;
  // prettier-ignore
  public get flag_b(): number { return this._flag_b;}
  // prettier-ignore
  public set flag_b(active: boolean | number) { this._flag_b = active ? 1 : 0; }

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

  //----------------------------------------------------------------------------
  // Reset
  //----------------------------------------------------------------------------

  public reset(pb: number, pc: number, sp: number) {
    this.a.long = 0;
    this.x.long = 0;
    this.y.long = 0;
    this.db.long = 0;
    this.dp.long = 0;
    this.sp.long = sp;
    this.pb.long = pb;
    this.pc.long = pc;
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
      a: this.a.word,
      x: this.x.word,
      y: this.y.word,
      db: this.db.byte,
      dp: this.dp.word,
      sp: this.sp.word,
      pb: this.pb.byte,
      pc: this.pc.word,

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
