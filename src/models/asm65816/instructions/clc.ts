import { Instruction } from "../instruction";

export class CLC extends Instruction {
  // prettier-ignore
  public get name(): string { return "CLC"; }
  // prettier-ignore
  public get cycles(): number { return 2; }
  // prettier-ignore
  public get length(): number { return 1; }
  // prettier-ignore
  public get type(): Instruction.Type { return Instruction.Type.Implied; }

  public execute(): void {
    this._core.c = 0;
    this._core.PC = this._core.PC + this.length;
  }
}
