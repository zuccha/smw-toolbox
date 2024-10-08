import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

export abstract class JSR extends Instruction {
  public static mnemonic = "JSR";

  public execute_effect(): void {
    this.p.pc = w(this.p.pc.word - 1);
    this.p.sp = w(this.p.sp.word - 2);
    this.m.save_byte(w(this.p.sp.word + 2), b(this.p.pc.page));
    this.m.save_byte(w(this.p.sp.word + 1), b(this.p.pc.byte));
    this.p.pc = this.addr;
  }
}

export abstract class JSL extends Instruction {
  public static mnemonic = "JSL";

  public execute_effect(): void {
    this.p.pc = w(this.p.pc.word - 1);
    this.p.sp = w(this.p.sp.word - 3);
    this.m.save_byte(w(this.p.sp.word + 3), b(this.p.pb.byte));
    this.m.save_byte(w(this.p.sp.word + 2), b(this.p.pc.page));
    this.m.save_byte(w(this.p.sp.word + 1), b(this.p.pc.byte));
    const addr = this.addr;
    this.p.pb = b(addr.bank);
    this.p.pc = addr;
  }
}

export namespace JSR {
  export class Absolute extends JSR {
    public static opcode = 0x20;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 6;
  }

  export class Absolute_X_Indirect extends JSR {
    public static opcode = 0xfc;
    public static mode = InstructionMode.Absolute_X_Indirect;
    public static base_cycles = 8;
  }

  export class AbsoluteLong extends JSL {
    public static opcode = 0x22;
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 8;
  }
}
