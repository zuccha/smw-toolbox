import { flag_n_mask, minus_2m, plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, Value, w } from "../value";

export abstract class ASL extends Instruction {
  public static mnemonic = "ASL";

  protected asl(value: Value): Value {
    if (this.p.flag_m) {
      const result = b(value.byte << 1);
      this.p.flag_n = result.byte & flag_n_mask;
      this.p.flag_z = result.byte === 0;
      this.p.flag_c = value.byte & flag_n_mask; // N is correct.
      return result;
    } else {
      const result = w(value.word << 1);
      this.p.flag_n = result.page & flag_n_mask;
      this.p.flag_z = result.word === 0;
      this.p.flag_c = value.page & flag_n_mask; // N is correct.
      return result;
    }
  }
}

export abstract class ASL_Addr extends ASL {
  public execute_effect(): void {
    const addr = this.addr;
    this.save_m(addr, this.asl(this.load_m(addr)));
  }
}

export namespace ASL {
  export class Accumulator extends ASL {
    public static opcode = 0x0a;
    public static mode = InstructionMode.Accumulator;
    public static base_cycles = 2;

    public execute_effect(): void {
      this.p.set_a(this.asl(this.p.a).word);
    }
  }

  export class DirectPage extends ASL_Addr {
    public static opcode = 0x06;
    public static mode = InstructionMode.DirectPage;
    public static base_cycles = 7;
    public static cyclesModifier = minus_2m | plus_1_if_dp_low_is_zero;
  }

  export class DirectPage_X extends ASL_Addr {
    public static opcode = 0x16;
    public static mode = InstructionMode.DirectPage_X;
    public static base_cycles = 8;
    public static cyclesModifier = minus_2m | plus_1_if_dp_low_is_zero;
  }

  export class Absolute extends ASL_Addr {
    public static opcode = 0x0e;
    public static mode = InstructionMode.Absolute;
    public static base_cycles = 8;
    public static cyclesModifier = minus_2m;
  }

  export class Absolute_X extends ASL_Addr {
    public static opcode = 0x1e;
    public static mode = InstructionMode.Absolute_X;
    public static base_cycles = 9;
    public static cyclesModifier = minus_2m;
  }
}
