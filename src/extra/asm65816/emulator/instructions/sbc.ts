import { mod } from "../../../../utils";
import {
  flag_n_mask,
  flag_v_mask,
  minus_m,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
  plus_1_if_index_y_crosses_page,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, ReadOnlyValue, w } from "../value";

export function sub_decimal(
  a: number,
  value: number,
  carry: number,
  nibbles: number,
): number {
  let result = 0;
  carry = 1 - carry;
  for (let i = 0; i < nibbles; ++i) {
    const a_nibble = (a >> (i * 4)) & 0xf;
    const value_nibble = (value >> (i * 4)) & 0xf;
    const nibble = a_nibble - value_nibble - carry;
    carry =
      nibble < 0
        ? Math.floor(Math.abs(nibble) / 10) + 1
        : -Math.floor(nibble / 10);
    result |= mod(nibble, 10) << (i * 4);
  }
  return result;
}

export abstract class SBC extends Instruction {
  public static mnemonic = "SBC";

  protected sbc(value: ReadOnlyValue): ReadOnlyValue {
    if (this.p.flag_m) {
      const result_raw = this.p.flag_d
        ? sub_decimal(this.p.a.byte, value.byte, this.p.flag_c, 2)
        : this.p.a.byte + ~value.byte + this.p.flag_c;
      const result = b(result_raw);
      this.p.flag_n = result.byte & flag_n_mask;
      this.p.flag_v = result.byte & flag_v_mask;
      this.p.flag_z = result.byte === 0;
      this.p.flag_c = result_raw < 0 ? 0 : 1;
      return result;
    } else {
      const result_raw = this.p.flag_d
        ? sub_decimal(this.p.a.word, value.word, this.p.flag_c, 4)
        : this.p.a.word + ~value.word + this.p.flag_c;
      const result = w(result_raw);
      this.p.flag_n = result.page & flag_n_mask;
      this.p.flag_v = result.page & flag_v_mask;
      this.p.flag_z = result.word === 0;
      this.p.flag_c = result_raw < 0 ? 0 : 1;
      return result;
    }
  }
}

export abstract class SBC_Addr extends SBC {
  public execute_effect(): void {
    const value = this.load_m(this.addr);
    this.p.a = this.sbc(value);
  }
}

export namespace SBC {
  export class Immediate_VariableA extends SBC {
    public static opcode = 0xe9;
    public static mode = InstructionMode.Immediate_VariableA;
    public static base_cycles = 3;
    public static cyclesModifier = minus_m;

    public execute_effect(): void {
      this.p.a = this.sbc(this._arg);
    }
  }

  export class DirectPage extends SBC_Addr {
    public static opcode = 0xe5;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends SBC_Addr {
    public static opcode = 0xf5;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect extends SBC_Addr {
    public static opcode = 0xf2;
    public static mode = InstructionMode.DirectPage_Indirect;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X_Indirect extends SBC_Addr {
    public static opcode = 0xe1;
    public static mode = InstructionMode.DirectPage_X_Indirect;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect_Y extends SBC_Addr {
    public static opcode = 0xf1;
    public static mode = InstructionMode.DirectPage_Indirect_Y;
    public static base_cycles = 6;
    public static cyclesModifier =
      minus_m | plus_1_if_dp_low_is_zero | plus_1_if_index_y_crosses_page;
  }

  export class DirectPage_IndirectLong extends SBC_Addr {
    public static opcode = 0xe7;
    public static mode = InstructionMode.DirectPage_IndirectLong;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_IndirectLong_Y extends SBC_Addr {
    public static opcode = 0xf7;
    public static mode = InstructionMode.DirectPage_IndirectLong_Y;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends SBC_Addr {
    public static opcode = 0xed;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m;
  }

  export class Absolute_X extends SBC_Addr {
    public static opcode = 0xfd;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_x_crosses_page;
  }

  export class Absolute_Y extends SBC_Addr {
    public static opcode = 0xf9;
    public static mode = InstructionMode.Absolute_Y;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_y_crosses_page;
  }

  export class AbsoluteLong extends SBC_Addr {
    public static opcode = 0xef;
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m;
  }

  export class AbsoluteLong_X extends SBC_Addr {
    public static opcode = 0xff;
    public static mode = InstructionMode.AbsoluteLong_X;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m;
  }

  export class StackRelative extends SBC_Addr {
    public static opcode = 0xe3;
    public static mode = InstructionMode.StackRelative;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m;
  }

  export class StackRelative_Indirect_Y extends SBC_Addr {
    public static opcode = 0xf3;
    public static mode = InstructionMode.StackRelative_Indirect_Y;
    public static base_cycles = 8;
    public static cyclesModifier = minus_m;
  }
}
