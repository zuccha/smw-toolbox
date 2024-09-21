import {
  flag_n_mask,
  minus_m,
  plus_1_if_dp_low_is_zero,
  plus_1_if_index_x_crosses_page,
  plus_1_if_index_y_crosses_page,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { v, Value } from "../value";

export abstract class AND extends Instruction {
  public static mnemonic = "AND";

  protected and(value: Value): Value {
    if (this.p.flag_m) {
      const result = v(value.byte & this.p.a.byte);
      this.p.flag_n = result.byte & flag_n_mask;
      this.p.flag_z = result.byte === 0;
      return result;
    } else {
      const result = v(value.word & this.p.a.word);
      this.p.flag_n = result.page & flag_n_mask;
      this.p.flag_z = result.word === 0;
      return result;
    }
  }
}

export abstract class AND_Addr extends AND {
  public execute_effect(): void {
    this.p.set_a(this.and(this.load_m(this.addr)).word);
  }
}

export namespace AND {
  export class Immediate_VariableA extends AND {
    public static mode = InstructionMode.Immediate_VariableA;
    public static base_cycles = 3;
    public static cyclesModifier = minus_m;

    public execute_effect(): void {
      this.p.set_a(this.and(this._arg).word);
    }
  }

  export class DirectPage extends AND_Addr {
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 4;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends AND_Addr {
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect extends AND_Addr {
    public static mode = InstructionMode.DirectPage_Indirect;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X_Indirect extends AND_Addr {
    public static mode = InstructionMode.DirectPage_X_Indirect;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_Indirect_Y extends AND_Addr {
    public static mode = InstructionMode.DirectPage_Indirect_Y;
    public static base_cycles = 6;
    public static cyclesModifier =
      minus_m | plus_1_if_dp_low_is_zero | plus_1_if_index_y_crosses_page;
  }

  export class DirectPage_IndirectLong extends AND_Addr {
    public static mode = InstructionMode.DirectPage_IndirectLong;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_IndirectLong_Y extends AND_Addr {
    public static mode = InstructionMode.DirectPage_IndirectLong_Y;
    public static base_cycles = 7;
    public static cyclesModifier = minus_m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends AND_Addr {
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m;
  }

  export class Absolute_X extends AND_Addr {
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_x_crosses_page;
  }

  export class Absolute_Y extends AND_Addr {
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m | plus_1_if_index_y_crosses_page;
  }

  export class AbsoluteLong extends AND_Addr {
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m;
  }

  export class AbsoluteLong_X extends AND_Addr {
    public static mode = InstructionMode.AbsoluteLong;
    public static base_cycles = 6;
    public static cyclesModifier = minus_m;
  }

  export class StackRelative extends AND_Addr {
    public static mode = InstructionMode.StackRelative;
    public static base_cycles = 5;
    public static cyclesModifier = minus_m;
  }

  export class StackRelative_Indirect_Y extends AND_Addr {
    public static mode = InstructionMode.StackRelative_Indirect_Y;
    public static base_cycles = 8;
    public static cyclesModifier = minus_m;
  }
}