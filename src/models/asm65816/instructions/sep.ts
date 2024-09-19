import { Core } from "../core";
import { Instruction } from "../instruction";

export class SEP extends Instruction {
  public static mnemonic = "SEP";
  public static type = Instruction.Type.Immediate;
  public static baseCycles = 3;
  public static baseLength = 2;

  public execute(): void {
    this._core.PC = this._core.PC + this.length;

    const arg = this._arg.b;
    if (arg & Core.Flag.N) this._core.n = 1;
    if (arg & Core.Flag.V) this._core.v = 1;
    if (arg & Core.Flag.M) this._core.m = 1;
    if (arg & Core.Flag.X) this._core.x = 1;
    if (arg & Core.Flag.D) this._core.d = 1;
    if (arg & Core.Flag.I) this._core.i = 1;
    if (arg & Core.Flag.Z) this._core.z = 1;
    if (arg & Core.Flag.C) this._core.c = 1;
  }
}
