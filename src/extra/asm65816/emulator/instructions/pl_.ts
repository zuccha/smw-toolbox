import { flag_n_mask, minus_m, minus_x } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export abstract class PL_ extends Instruction {
  public static mode = InstructionMode.Implied;

  protected pull_byte(): number {
    const value = this.m.load_byte(w(this.p.sp.word + 1));
    this.p.flag_n = value.byte & flag_n_mask;
    this.p.flag_z = value.byte === 0;
    this.p.sp.add_word(1);
    return value.byte;
  }

  protected pull_word(): number {
    const value = this.m.load_word(w(this.p.sp.word + 1));
    this.p.flag_n = value.page & flag_n_mask;
    this.p.flag_z = value.word === 0;
    this.p.sp.add_word(2);
    return value.word;
  }
}

export class PLA extends PL_ {
  public static mnemonic = "PLA";
  public static opcode = 0x68;
  public static base_cycles = 5;
  public static cycles_modifier = minus_m;

  public execute_effect(): void {
    this.p.set_a(this.p.flag_m ? this.pull_byte() : this.pull_word());
  }
}

export class PLX extends PL_ {
  public static mnemonic = "PLX";
  public static opcode = 0xfa;
  public static base_cycles = 5;
  public static cycles_modifier = minus_x;

  public execute_effect(): void {
    this.p.set_x(this.p.flag_x ? this.pull_byte() : this.pull_word());
  }
}

export class PLY extends PL_ {
  public static mnemonic = "PLY";
  public static opcode = 0x7a;
  public static base_cycles = 5;
  public static cycles_modifier = minus_x;

  public execute_effect(): void {
    this.p.set_y(this.p.flag_x ? this.pull_byte() : this.pull_word());
  }
}

export class PLB extends PL_ {
  public static mnemonic = "PLB";
  public static opcode = 0xab;
  public static base_cycles = 4;

  public execute_effect(): void {
    this.p.db.byte = this.pull_byte();
  }
}

export class PLD extends PL_ {
  public static mnemonic = "PLD";
  public static opcode = 0x2b;
  public static base_cycles = 6;

  public execute_effect(): void {
    this.p.dp.word = this.pull_word();
  }
}

export class PLP extends PL_ {
  public static mnemonic = "PLP";
  public static opcode = 0x28;
  public static base_cycles = 4;

  public execute_effect(): void {
    this.p.flags = this.pull_byte();
  }
}
