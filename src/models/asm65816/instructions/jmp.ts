import { Instruction } from "../instruction";
import { Integer } from "../integer";

export abstract class JMP extends Instruction {
  public static mnemonic = "JMP";

  public execute(): void {
    this._core.PC = this.addr;
  }
}

export abstract class JML extends Instruction {
  public static mnemonic = "JML";

  public execute(): void {
    const addr = new Integer(this.addr);
    this._core.PB = addr.bank;
    this._core.PC = addr.w;
  }
}

export namespace JMP {
  export class Absolute extends JMP {
    public static type = Instruction.Type.Absolute;
    public static baseCycles = 3;
    public static baseLength = 3;
  }

  export class Absolute_Indirect extends JMP {
    public static type = Instruction.Type.Absolute_Indirect;
    public static baseCycles = 5;
    public static baseLength = 3;
  }

  export class Absolute_X_Indirect extends JMP {
    public static type = Instruction.Type.Absolute_X_Indirect;
    public static baseCycles = 6;
    public static baseLength = 3;
  }

  export class Absolute_IndirectLong extends JML {
    public static type = Instruction.Type.Absolute_IndirectLong;
    public static baseCycles = 6;
    public static baseLength = 3;
  }

  export class AbsoluteLong extends JML {
    public static type = Instruction.Type.AbsoluteLong;
    public static baseCycles = 4;
    public static baseLength = 4;
  }
}
