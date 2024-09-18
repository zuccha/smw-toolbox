import { Instruction } from "../instruction";

export class INX extends Instruction {
  // prettier-ignore
  public get name(): string { return "INX"; }
  // prettier-ignore
  public get type(): Instruction.Type { return Instruction.Type.Implied; }
  // prettier-ignore
  public get cycles(): number { return 2; }
  // prettier-ignore
  public get length(): number { return 1; }

  public execute(): void {
    this._core.PC = this._core.PC + this.length;
    this._core.X = this._core.X + 1;
  }
}
