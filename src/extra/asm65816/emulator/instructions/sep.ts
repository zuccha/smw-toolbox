import {
  flag_n_mask,
  flag_v_mask,
  flag_m_mask,
  flag_x_mask,
  flag_d_mask,
  flag_i_mask,
  flag_z_mask,
  flag_c_mask,
  flag_b_mask,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class SEP extends Instruction {
  public static mnemonic = "SEP";
  public static opcode = 0xe2;
  public static mode = InstructionMode.Immediate;
  public static base_cycles = 3;
  public static baseLength = 2;
  public static affected_flags =
    flag_n_mask |
    flag_v_mask |
    flag_m_mask |
    flag_x_mask |
    flag_d_mask |
    flag_i_mask |
    flag_z_mask |
    flag_c_mask;

  public execute_effect(): void {
    const arg = this._arg.byte;

    if (this.p.flag_e) {
      if (arg & flag_n_mask) this.p.flag_n = 1;
      if (arg & flag_v_mask) this.p.flag_v = 1;
      // Bit 5 unused
      if (arg & flag_b_mask) this.p.flag_b = 1;
      if (arg & flag_d_mask) this.p.flag_d = 1;
      if (arg & flag_i_mask) this.p.flag_i = 1;
      if (arg & flag_z_mask) this.p.flag_z = 1;
      if (arg & flag_c_mask) this.p.flag_c = 1;
    } else {
      if (arg & flag_n_mask) this.p.flag_n = 1;
      if (arg & flag_v_mask) this.p.flag_v = 1;
      if (arg & flag_m_mask) this.p.flag_m = 1;
      if (arg & flag_x_mask) this.p.flag_x = 1;
      if (arg & flag_d_mask) this.p.flag_d = 1;
      if (arg & flag_i_mask) this.p.flag_i = 1;
      if (arg & flag_z_mask) this.p.flag_z = 1;
      if (arg & flag_c_mask) this.p.flag_c = 1;
    }
  }
}
