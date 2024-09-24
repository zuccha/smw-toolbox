import { Instruction } from "../instruction";
import InstructionMode from "../instruction-mode";
import { b, l, w } from "../value";

export class MVP extends Instruction {
  public static mnemonic = "MVP";
  public static opcode = 0x44;
  public static mode = InstructionMode.BlockMove;
  public static base_cycles = 0;

  private _iterations = 0;

  public get cycles(): number {
    return this._iterations * 7;
  }

  public execute_effect(): void {
    const srcBank = this._arg.byte;
    const destBank = this._arg.page;
    this.p.db = b(destBank);
    this._iterations = 0;
    while (this.p.a.word !== 0xffff) {
      this._iterations++;
      const value = this.m.load_byte(l((srcBank << 16) + this.p.x.word));
      this.m.save_byte(l((destBank << 16) + this.p.y.word), value);
      this.p.x = w(this.p.x.word - 1);
      this.p.y = w(this.p.y.word - 1);
      this.p.a = w(this.p.a.word - 1);
    }
  }
}
