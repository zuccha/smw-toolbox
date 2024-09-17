import { Instruction } from "../instruction";

export class CLI extends Instruction {
  // prettier-ignore
  public get name(): string { return "CLI"; }
  // prettier-ignore
  public get cycles(): number { return 2; }
  // prettier-ignore
  public get length(): number { return 1; }
  // prettier-ignore
  public get type(): Instruction.Type { return Instruction.Type.Implied; }

  public execute(): void {
    this._core.PC = this._core.PC + this.length;
    this._core.i = 0;
  }
}
