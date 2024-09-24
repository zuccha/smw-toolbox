import { minus_m, minus_x } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, w } from "../value";

abstract class PH_ extends Instruction {
  public static mode = InstructionMode.Implied;

  protected push_byte(byte: number) {
    this.p.sp = w(this.p.sp.word - 1);
    this.m.save_byte(w(this.p.sp.word + 1), b(byte));
  }

  protected push_word(word: number) {
    this.p.sp = w(this.p.sp.word - 2);
    this.m.save_word(w(this.p.sp.word + 1), w(word));
  }
}

export class PHA extends PH_ {
  public static mnemonic = "PHA";
  public static opcode = 0x48;
  public static base_cycles = 4;
  public static cycles_modifier = minus_m;

  public execute_effect(): void {
    this.p.flag_m
      ? this.push_byte(this.p.a.byte)
      : this.push_word(this.p.a.word);
  }
}

export class PHX extends PH_ {
  public static mnemonic = "PHX";
  public static opcode = 0xda;
  public static base_cycles = 4;
  public static cycles_modifier = minus_x;

  public execute_effect(): void {
    this.p.flag_x
      ? this.push_byte(this.p.x.byte)
      : this.push_word(this.p.x.word);
  }
}

export class PHY extends PH_ {
  public static mnemonic = "PHY";
  public static opcode = 0x5a;
  public static base_cycles = 4;
  public static cycles_modifier = minus_x;

  public execute_effect(): void {
    this.p.flag_x
      ? this.push_byte(this.p.y.byte)
      : this.push_word(this.p.y.word);
  }
}

export class PHB extends PH_ {
  public static mnemonic = "PHB";
  public static opcode = 0x8b;
  public static base_cycles = 3;

  public execute_effect(): void {
    this.push_byte(this.p.db.byte);
  }
}

export class PHD extends PH_ {
  public static mnemonic = "PHD";
  public static opcode = 0x0b;
  public static base_cycles = 4;

  public execute_effect(): void {
    this.push_word(this.p.dp.word);
  }
}

export class PHP extends PH_ {
  public static mnemonic = "PHP";
  public static opcode = 0x08;
  public static base_cycles = 3;

  public execute_effect(): void {
    this.push_byte(this.p.flags);
  }
}

export class PHK extends PH_ {
  public static mnemonic = "PHK";
  public static opcode = 0x4b;
  public static base_cycles = 3;

  public execute_effect(): void {
    this.push_byte(this.p.pb.byte);
  }
}
