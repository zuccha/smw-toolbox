import {
  flag_n_mask,
  flag_v_mask,
  flag_m_mask,
  flag_x_mask,
  flag_d_mask,
  flag_i_mask,
  flag_z_mask,
  flag_c_mask,
} from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class SEP extends Instruction {
  public static mnemonic = "SEP";
  public static mode = InstructionMode.Immediate;
  public static base_cycles = 3;
  public static baseLength = 2;

  public execute_effect(): void {
    const arg = this._arg.byte;

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
