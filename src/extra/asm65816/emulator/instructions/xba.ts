import { flag_n_mask, flag_z_mask } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export class XBA extends Instruction {
  public static mnemonic = "XBA";
  public static opcode = 0xeb;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 3;
  public static affected_flags = flag_n_mask | flag_z_mask;

  public execute_effect(): void {
    const byte = this.p.a.byte;
    const page = this.p.a.page;
    this.p.a = w((byte << 8) | page);
    this.p.flag_n = page & flag_n_mask;
    this.p.flag_z = page === 0;
  }
}
