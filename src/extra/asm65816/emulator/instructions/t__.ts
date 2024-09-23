import { flag_n_mask } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, Value } from "../value";

abstract class T__ extends Instruction {
  public static mode = InstructionMode.Implied;

  protected transfer_byte(value: Value): number {
    this.p.flag_n = value.byte & flag_n_mask;
    this.p.flag_z = value.byte === 0;
    return value.byte;
  }

  protected transfer_word(value: Value): number {
    this.p.flag_n = value.page & flag_n_mask;
    this.p.flag_z = value.word === 0;
    return value.word;
  }
}

export class TAX extends T__ {
  public static mnemonic = "TAX";
  public static opcode = 0xaa;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_x) this.p.x.byte = this.transfer_byte(this.p.a);
    else this.p.x.word = this.transfer_word(this.p.a);
  }
}

export class TAY extends T__ {
  public static mnemonic = "TAY";
  public static opcode = 0xa8;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_x) this.p.y.byte = this.transfer_byte(this.p.a);
    else this.p.y.word = this.transfer_word(this.p.a);
  }
}

export class TCD extends T__ {
  public static mnemonic = "TCD";
  public static opcode = 0x5b;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.dp.word = this.transfer_word(this.p.a);
  }
}

export class TCS extends T__ {
  public static mnemonic = "TCS";
  public static opcode = 0x1b;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_e)
      this.p.sp.word = this.transfer_byte(b(0x0100 | this.p.a.byte));
    else this.p.sp.word = this.transfer_word(this.p.a);
  }
}

export class TDC extends T__ {
  public static mnemonic = "TDC";
  public static opcode = 0x7b;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.a.word = this.transfer_word(this.p.dp);
  }
}

export class TSC extends T__ {
  public static mnemonic = "TSC";
  public static opcode = 0x3b;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.a.word = this.transfer_word(this.p.sp);
  }
}

export class TSX extends T__ {
  public static mnemonic = "TSX";
  public static opcode = 0xba;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_x) this.p.x.byte = this.transfer_byte(this.p.sp);
    else this.p.x.word = this.transfer_word(this.p.sp);
  }
}

export class TXA extends T__ {
  public static mnemonic = "TXA";
  public static opcode = 0x8a;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_m) this.p.a.byte = this.transfer_byte(this.p.x);
    else this.p.a.word = this.transfer_word(this.p.x);
  }
}

export class TXS extends T__ {
  public static mnemonic = "TXS";
  public static opcode = 0x9a;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_e)
      this.p.sp.word = this.transfer_byte(b(0x0100 | this.p.x.byte));
    else this.p.sp.word = this.transfer_word(this.p.x);
  }
}

export class TXY extends T__ {
  public static mnemonic = "TXY";
  public static opcode = 0x9b;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_x) this.p.y.byte = this.transfer_byte(this.p.x);
    else this.p.y.word = this.transfer_word(this.p.x);
  }
}

export class TYA extends T__ {
  public static mnemonic = "TYA";
  public static opcode = 0x98;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_m) this.p.a.byte = this.transfer_byte(this.p.y);
    else this.p.a.word = this.transfer_word(this.p.y);
  }
}

export class TYX extends T__ {
  public static mnemonic = "TYX";
  public static opcode = 0xbb;
  public static base_cycles = 2;

  public execute_effect(): void {
    if (this.p.flag_x) this.p.x.byte = this.transfer_byte(this.p.y);
    else this.p.x.word = this.transfer_word(this.p.y);
  }
}
