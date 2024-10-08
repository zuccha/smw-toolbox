import { plus_7_for_each_transfer } from "../constants";
import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, l, w } from "../value";

export class MVP extends Instruction {
  public static mnemonic = "MVP";
  public static opcode = 0x44;
  public static mode = InstructionMode.BlockMove;
  public static base_cycles = 0;
  public static cycles_modifier = plus_7_for_each_transfer;

  private _iterations = 0;

  public get cycles(): number {
    return this._iterations * 7;
  }

  public execute_effect(): void {
    const srcBank = this._arg.byte;
    const destBank = this._arg.page;
    this.p.db = b(destBank);
    this._iterations = 0;
    while (this.p.c.word !== 0xffff) {
      this._iterations++;
      const value = this.m.load_byte(l((srcBank << 16) + this.p.x.word));
      this.m.save_byte(l((destBank << 16) + this.p.y.word), value);
      this.p.x = w(this.p.x.word - 1);
      this.p.y = w(this.p.y.word - 1);
      this.p.c = w(this.p.c.word - 1);
    }
  }
}
