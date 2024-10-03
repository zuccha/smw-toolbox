import {
  flag_n_mask,
  flag_v_mask,
  flag_z_mask,
  minus_m,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, ReadOnlyValue, w } from "../value";

export abstract class BIT extends Instruction {
  public static mnemonic = "BIT";

  protected bit(value: ReadOnlyValue): void {
    if (this.p.flag_m) {
      const result = b(this.p.a.byte & value.byte);
      this.p.flag_n = value.byte & flag_n_mask;
      this.p.flag_v = value.byte & flag_v_mask;
      this.p.flag_z = result.byte === 0;
    } else {
      const result = w(this.p.a.word & value.word);
      this.p.flag_n = value.page & flag_n_mask;
      this.p.flag_v = value.page & flag_v_mask;
      this.p.flag_z = result.word === 0;
    }
  }
}

export abstract class BIT_Addr extends BIT {
  public static affected_flags = flag_n_mask | flag_v_mask | flag_z_mask;

  public execute_effect(): void {
    this.bit(this.load_m(this.addr));
  }
}

export namespace BIT {
  export class Immediate_VariableA extends BIT {
    public static affected_flags = flag_z_mask;

    public static opcode = 0x89;
    public static mode = InstructionMode.Immediate_VariableA;
    public static base_cycles = 3;
    public static cycles_modifier = minus_m;

    public execute_effect(): void {
      const result = this.p.flag_m
        ? this.p.a.byte & this._arg.byte
        : this.p.a.word & this._arg.word;
      this.p.flag_z = result === 0;
    }
  }

  export class DirectPage extends BIT_Addr {
    public static opcode = 0x24;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends BIT_Addr {
    public static opcode = 0x34;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends BIT_Addr {
    public static opcode = 0x2c;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m;
  }

  export class Absolute_X extends BIT_Addr {
    public static opcode = 0x3c;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 5;
    public static cycles_modifier = minus_m | plus_1_if_index_x_crosses_page;
  }
}
