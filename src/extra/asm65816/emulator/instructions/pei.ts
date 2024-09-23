import { plus_1_if_dp_low_is_zero } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { w } from "../value";

export class PEI extends Instruction {
  public static mnemonic = "PEI";
  public static opcode = 0xd4;
  public static mode = InstructionMode.DirectPage_Indirect;
  public static base_cycles = 6;
  public static cyclesModifier = plus_1_if_dp_low_is_zero;

  public execute_effect(): void {
    this.p.sp.sub_word(2);

    const page = this.m.load_byte(w(this.addr.word + 1));
    this.m.save_byte(w(this.p.sp.word + 2), page);

    const byte = this.m.load_byte(this.addr);
    this.m.save_byte(w(this.p.sp.word + 1), byte);
  }
}