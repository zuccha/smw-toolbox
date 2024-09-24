import {
  flag_n_mask,
  minus_m,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
  plus_1_if_index_y_crosses_page,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, ReadOnlyValue, w } from "../value";

export abstract class EOR extends Instruction {
  public static mnemonic = "EOR";

  protected eor(value: ReadOnlyValue): ReadOnlyValue {
    if (this.p.flag_m) {
      const result = b(value.byte ^ this.p.a.byte);
      this.p.flag_n = result.byte & flag_n_mask;
      this.p.flag_z = result.byte === 0;
      return result;
    } else {
      const result = w(value.word ^ this.p.a.word);
      this.p.flag_n = result.page & flag_n_mask;
      this.p.flag_z = result.word === 0;
      return result;
    }
  }
}

export abstract class EOR_Addr extends EOR {
  public execute_effect(): void {
    this.p.a = this.eor(this.load_m(this.addr));
  }
}

export namespace EOR {
  export class Immediate_VariableA extends EOR {
    public static opcode = 0x49;
    public static mode = InstructionMode.Immediate_VariableA;
    public static base_cycles = 3;
    public static cyclesModifier = minus_m;

    public execute_effect(): void {
      this.p.a = this.eor(this._arg);
    }
  }

  export class DirectPage extends EOR_Addr {
    public static opcode = 0x45;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends EOR_Addr {
    public static opcode = 0x55;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect extends EOR_Addr {
    public static opcode = 0x52;
    public static mode = InstructionMode.DirectPage_Indirect;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X_Indirect extends EOR_Addr {
    public static opcode = 0x41;
    public static mode = InstructionMode.DirectPage_X_Indirect;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect_Y extends EOR_Addr {
    public static opcode = 0x51;
    public static mode = InstructionMode.DirectPage_Indirect_Y;
    public static base_cycles = 6;
    public static cyclesModifier =
      minus_m | plus_1_if_dp_low_is_zero | plus_1_if_index_y_crosses_page;
  }

  export class DirectPage_IndirectLong extends EOR_Addr {
    public static opcode = 0x47;
    public static mode = InstructionMode.DirectPage_IndirectLong;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_IndirectLong_Y extends EOR_Addr {
    public static opcode = 0x57;
    public static mode = InstructionMode.DirectPage_IndirectLong_Y;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends EOR_Addr {
    public static opcode = 0x4d;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m;
  }

  export class Absolute_X extends EOR_Addr {
    public static opcode = 0x5d;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_x_crosses_page;
  }

  export class Absolute_Y extends EOR_Addr {
    public static opcode = 0x59;
    public static mode = InstructionMode.Absolute_Y;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_y_crosses_page;
  }

  export class AbsoluteLong extends EOR_Addr {
    public static opcode = 0x4f;
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m;
  }

  export class AbsoluteLong_X extends EOR_Addr {
    public static opcode = 0x5f;
    public static mode = InstructionMode.AbsoluteLong_X;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m;
  }

  export class StackRelative extends EOR_Addr {
    public static opcode = 0x43;
    public static mode = InstructionMode.StackRelative;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m;
  }

  export class StackRelative_Indirect_Y extends EOR_Addr {
    public static opcode = 0x53;
    public static mode = InstructionMode.StackRelative_Indirect_Y;
    public static base_cycles = 8;
    public static cyclesModifier = minus_m;
  }
}
