import {
  flag_c_mask,
  flag_n_mask,
  flag_v_mask,
  flag_z_mask,
  minus_m,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
  plus_1_if_index_y_crosses_page,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, byte_mask, ReadOnlyValue, w, word_mask } from "../value";

export function add_decimal(
  a: number,
  value: number,
  carry: number,
  nibbles: number,
): number {
  let result = 0;
  for (let i = 0; i < nibbles; ++i) {
    const a_nibble = (a >> (i * 4)) & 0xf;
    const value_nibble = (value >> (i * 4)) & 0xf;
    const nibble = a_nibble + value_nibble + carry;
    carry = Math.floor(nibble / 10);
    result |= nibble % 10 << (i * 4);
  }
  return result;
}

export abstract class ADC extends Instruction {
  public static mnemonic = "ADC";
  public static affected_flags =
    flag_n_mask | flag_v_mask | flag_z_mask | flag_c_mask;

  protected adc(value: ReadOnlyValue): ReadOnlyValue {
    if (this.p.flag_m) {
      const result_raw = this.p.flag_d
        ? add_decimal(this.p.a.byte, value.byte, this.p.flag_c, 2)
        : this.p.a.byte + value.byte + this.p.flag_c;
      const result = b(result_raw);
      this.p.flag_n = result.byte & flag_n_mask;
      this.p.flag_v = result.byte & flag_v_mask;
      this.p.flag_z = result.byte === 0;
      this.p.flag_c = result_raw > byte_mask;
      return result;
    } else {
      const result_raw = this.p.flag_d
        ? add_decimal(this.p.a.word, value.word, this.p.flag_c, 4)
        : this.p.a.word + value.word + this.p.flag_c;
      const result = w(result_raw);
      this.p.flag_n = result.page & flag_n_mask;
      this.p.flag_v = result.page & flag_v_mask;
      this.p.flag_z = result.word === 0;
      this.p.flag_c = result_raw > word_mask;
      return result;
    }
  }
}

export abstract class ADC_Addr extends ADC {
  public execute_effect(): void {
    const value = this.load_m(this.addr);
    this.p.a = this.adc(value);
  }
}

export namespace ADC {
  export class Immediate_VariableA extends ADC {
    public static opcode = 0x69;
    public static mode = InstructionMode.Immediate_VariableA;
    public static base_cycles = 3;
    public static cyclesModifier = minus_m;

    public execute_effect(): void {
      this.p.a = this.adc(this._arg);
    }
  }

  export class DirectPage extends ADC_Addr {
    public static opcode = 0x65;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends ADC_Addr {
    public static opcode = 0x75;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect extends ADC_Addr {
    public static opcode = 0x72;
    public static mode = InstructionMode.DirectPage_Indirect;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X_Indirect extends ADC_Addr {
    public static opcode = 0x61;
    public static mode = InstructionMode.DirectPage_X_Indirect;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect_Y extends ADC_Addr {
    public static opcode = 0x71;
    public static mode = InstructionMode.DirectPage_Indirect_Y;
    public static base_cycles = 6;
    public static cyclesModifier =
      minus_m | plus_1_if_dp_low_is_zero | plus_1_if_index_y_crosses_page;
  }

  export class DirectPage_IndirectLong extends ADC_Addr {
    public static opcode = 0x67;
    public static mode = InstructionMode.DirectPage_IndirectLong;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_IndirectLong_Y extends ADC_Addr {
    public static opcode = 0x77;
    public static mode = InstructionMode.DirectPage_IndirectLong_Y;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends ADC_Addr {
    public static opcode = 0x6d;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m;
  }

  export class Absolute_X extends ADC_Addr {
    public static opcode = 0x7d;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_x_crosses_page;
  }

  export class Absolute_Y extends ADC_Addr {
    public static opcode = 0x79;
    public static mode = InstructionMode.Absolute_Y;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_y_crosses_page;
  }

  export class AbsoluteLong extends ADC_Addr {
    public static opcode = 0x6f;
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m;
  }

  export class AbsoluteLong_X extends ADC_Addr {
    public static opcode = 0x7f;
    public static mode = InstructionMode.AbsoluteLong_X;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m;
  }

  export class StackRelative extends ADC_Addr {
    public static opcode = 0x63;
    public static mode = InstructionMode.StackRelative;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m;
  }

  export class StackRelative_Indirect_Y extends ADC_Addr {
    public static opcode = 0x73;
    public static mode = InstructionMode.StackRelative_Indirect_Y;
    public static base_cycles = 8;
    public static cyclesModifier = minus_m;
  }
}
