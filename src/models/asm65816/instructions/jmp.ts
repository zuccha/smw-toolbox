import { Instruction } from "../instruction";
import { Integer } from "../integer";

export abstract class JMP extends Instruction {
  // prettier-ignore
  public get name(): string { return "JMP"; }

  public execute(): void {
    this._core.PC = this.addr;
  }
}

export abstract class JML extends Instruction {
  // prettier-ignore
  public get name(): string { return "JML"; }

  public execute(): void {
    const addr = new Integer(this.addr);
    this._core.PB = addr.bank;
    this._core.PC = addr.w;
  }
}

export namespace JMP {
  export class Absolute extends JMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute; }
    // prettier-ignore
    public get cycles(): number { return 3; }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_Indirect extends JMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_Indirect; }
    // prettier-ignore
    public get cycles(): number { return 5; }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_X_Indirect extends JMP {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_X_Indirect; }
    // prettier-ignore
    public get cycles(): number { return 6; }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class Absolute_IndirectLong extends JML {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.Absolute_IndirectLong; }
    // prettier-ignore
    public get cycles(): number { return 6; }
    // prettier-ignore
    public get length(): number { return 3; }
  }

  export class AbsoluteLong extends JML {
    // prettier-ignore
    public get type(): Instruction.Type { return Instruction.Type.AbsoluteLong; }
    // prettier-ignore
    public get cycles(): number { return 4; }
    // prettier-ignore
    public get length(): number { return 4; }
  }
}
