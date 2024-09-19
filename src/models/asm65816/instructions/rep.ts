import { Core } from "../core";
import { Instruction } from "../instruction";

export class REP extends Instruction {
  public static mnemonic = "REP";
  public static type = Instruction.Type.Immediate;
  public static baseCycles = 3;
  public static baseLength = 2;

  public execute(): void {
    this._core.PC = this._core.PC + this.length;

    const arg = this._arg.b;
    if (arg & Core.Flag.N) this._core.n = 0;
    if (arg & Core.Flag.V) this._core.v = 0;
    if (arg & Core.Flag.M) this._core.m = 0;
    if (arg & Core.Flag.X) this._core.x = 0;
    if (arg & Core.Flag.D) this._core.d = 0;
    if (arg & Core.Flag.I) this._core.i = 0;
    if (arg & Core.Flag.Z) this._core.z = 0;
    if (arg & Core.Flag.C) this._core.c = 0;

    if (this._core.e) {
      this._core.m = 1;
      this._core.x = 1;
    }
  }
}
