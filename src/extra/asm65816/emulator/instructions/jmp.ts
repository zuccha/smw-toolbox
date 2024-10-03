import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b } from "../value";

export abstract class JMP extends Instruction {
  public static mnemonic = "JMP";

  public execute_effect(): void {
    this.p.pc = this.addr;
  }
}

export abstract class JML extends Instruction {
  public static mnemonic = "JML";

  public execute_effect(): void {
    const addr = this.addr;
    this.p.pb = b(addr.bank);
    this.p.pc = addr;
  }
}

export namespace JMP {
  export class Absolute extends JMP {
    public static opcode = 0x4c;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 3;
  }

  export class Absolute_Indirect extends JMP {
    public static opcode = 0x6c;
    public static mode = InstructionMode.Absolute_Indirect;
    public static base_cycles = 5;
  }

  export class Absolute_X_Indirect extends JMP {
    public static opcode = 0x7c;
    public static mode = InstructionMode.Absolute_X_Indirect;
    public static base_cycles = 6;
  }

  export class Absolute_IndirectLong extends JML {
    public static opcode = 0xdc;
    public static mode = InstructionMode.Absolute_IndirectLong;
    public static base_cycles = 6;
  }

  export class AbsoluteLong extends JML {
    public static opcode = 0x5c;
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 4;
  }
}
