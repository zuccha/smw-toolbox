import { ProcessorSnapshot } from "./processor-snapshot";
import { Value } from "./value";

//------------------------------------------------------------------------------
// Processor
//------------------------------------------------------------------------------

export default class Processor {
  //----------------------------------------------------------------------------
  // Registers
  //----------------------------------------------------------------------------

  public readonly a = new Value(0);
  public readonly x = new Value(0);
  public readonly y = new Value(0);

  public readonly db = new Value(0);

  public readonly dp = new Value(0);
  public readonly sp = new Value(0x01fc);

  public readonly pb = new Value(0);
  public readonly pc = new Value(0x8000);

  public get_a(): number {
    return this._flag_m ? this.a.byte : this.a.word;
  }

  public set_a(value: number): void {
    if (this._flag_m) this.a.byte = value;
    else this.a.word = value;
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
        ? (this._flag_n << 7) |
          (this._flag_v << 6) |
          (this._flag_m << 5) |
          (this._flag_b << 4) |
          (this._flag_d << 3) |
          (this._flag_i << 2) |
          (this._flag_z << 1) |
          (this._flag_c << 0)
        : (this._flag_n << 7) |
          (this._flag_v << 6) |
          (this._flag_m << 5) |
          (this._flag_x << 4) |
          (this._flag_d << 3) |
          (this._flag_i << 2) |
          (this._flag_z << 1) |
          (this._flag_c << 0),
    };
  }
}
