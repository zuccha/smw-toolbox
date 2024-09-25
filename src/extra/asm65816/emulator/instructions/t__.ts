import { flag_n_mask, flag_z_mask } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { ReadOnlyValue } from "../value";

abstract class T__ extends Instruction {
  public static mode = InstructionMode.Implied;
  public static affected_flags = flag_n_mask | flag_z_mask;

  protected transfer_byte(value: ReadOnlyValue): ReadOnlyValue {
    this.p.flag_n = value.byte & flag_n_mask;
    this.p.flag_z = value.byte === 0;
    return value;
  }

  protected transfer_word(value: ReadOnlyValue): ReadOnlyValue {
    this.p.flag_n = value.page & flag_n_mask;
    this.p.flag_z = value.word === 0;
    return value;
  }

  protected transfer(value: ReadOnlyValue, flag: number): ReadOnlyValue {
    return flag ? this.transfer_byte(value) : this.transfer_word(value);
  }
}

export class TAX extends T__ {
  public static mnemonic = "TAX";
  public static opcode = 0xaa;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.x = this.transfer(this.p.a, this.p.flag_x);
  }
}

export class TAY extends T__ {
  public static mnemonic = "TAY";
  public static opcode = 0xa8;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.y = this.transfer(this.p.a, this.p.flag_x);
  }
}

export class TCD extends T__ {
  public static mnemonic = "TCD";
  public static opcode = 0x5b;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.dp = this.transfer_word(this.p.a);
  }
}

export class TCS extends T__ {
  public static mnemonic = "TCS";
  public static opcode = 0x1b;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.sp = this.transfer(this.p.a, this.p.flag_e);
  }
}

export class TDC extends T__ {
  public static mnemonic = "TDC";
  public static opcode = 0x7b;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.a = this.transfer_word(this.p.dp);
  }
}

export class TSC extends T__ {
  public static mnemonic = "TSC";
  public static opcode = 0x3b;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.a = this.transfer_word(this.p.sp);
  }
}

export class TSX extends T__ {
  public static mnemonic = "TSX";
  public static opcode = 0xba;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.x = this.transfer(this.p.sp, this.p.flag_x);
  }
}

export class TXA extends T__ {
  public static mnemonic = "TXA";
  public static opcode = 0x8a;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.a = this.transfer(this.p.x, this.p.flag_m);
  }
}

export class TXS extends T__ {
  public static mnemonic = "TXS";
  public static opcode = 0x9a;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.sp = this.transfer(this.p.x, this.p.flag_e);
  }
}

export class TXY extends T__ {
  public static mnemonic = "TXY";
  public static opcode = 0x9b;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.y = this.transfer(this.p.x, this.p.flag_x);
  }
}

export class TYA extends T__ {
  public static mnemonic = "TYA";
  public static opcode = 0x98;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.a = this.transfer(this.p.y, this.p.flag_m);
  }
}

export class TYX extends T__ {
  public static mnemonic = "TYX";
  public static opcode = 0xbb;
  public static base_cycles = 2;

  public execute_effect(): void {
    this.p.x = this.transfer(this.p.y, this.p.flag_x);
  }
}
