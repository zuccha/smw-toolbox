import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { v } from "../value";

export abstract class JSR extends Instruction {
  public static mnemonic = "JSR";

  public execute_effect(): void {
    this.p.pc.word = this.p.pc.word - 1;
    this.p.sp.word = this.p.sp.word - 2;
    this.m.save_byte(v(this.p.sp.word + 2), v(this.p.pc.page));
    this.m.save_byte(v(this.p.sp.word + 1), v(this.p.pc.byte));
    this.p.pc.word = this._arg.word;
  }
}

export abstract class JSL extends Instruction {
  public static mnemonic = "JSL";

  public execute_effect(): void {
    this.p.pc.word = this.p.pc.word - 1;
    this.p.sp.word = this.p.sp.word - 3;
    this.m.save_byte(v(this.p.sp.word + 3), v(this.p.pb.byte));
    this.m.save_byte(v(this.p.sp.word + 2), v(this.p.pc.page));
    this.m.save_byte(v(this.p.sp.word + 1), v(this.p.pc.byte));
    this.p.pb.byte = this._arg.bank;
    this.p.pc.word = this._arg.word;
  }
}

export namespace JSR {
  export class Absolute extends JSR {
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 6;
  }

  export class Absolute_X_Indirect extends JSR {
    public static mode = InstructionMode.Absolute_X_Indirect;
    public static base_cycles = 8;
  }

  export class AbsoluteLong extends JSL {
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 8;
  }
}
