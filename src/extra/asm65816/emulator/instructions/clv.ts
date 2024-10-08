import { flag_v_mask } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";

export class CLV extends Instruction {
  public static mnemonic = "CLV";
  public static opcode = 0xb8;
  public static mode = InstructionMode.Implied;
  public static base_cycles = 2;
  public static baseLength = 1;
  public static affected_flags = flag_v_mask;

  public execute_effect(): void {
    this.p.flag_v = 0;
  }
}
