import { Core } from "../core";
import { Instruction } from "../instruction";

export class REP extends Instruction {
  // prettier-ignore
  public get name(): string { return "REP"; }
  // prettier-ignore
  public get cycles(): number { return 3; }
  // prettier-ignore
  public get length(): number { return 2; }
  // prettier-ignore
  public get type(): Instruction.Type { return Instruction.Type.Immediate; }

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
