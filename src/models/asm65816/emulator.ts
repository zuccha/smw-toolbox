import { Core } from "./core";
import { Instruction } from "./instruction";
import { Integer } from "./integer";
import { Opcode, opcodeToInstruction } from "./opcode-to-instruction";

export class Emulator {
  private _bytes: number[] = [];
  private _core = new Core();
  private _reports: Instruction.Report[] = [];

  public run(bytes: number[]) {
    this._bytes = bytes.map((byte) => byte & 0xff);
    this._core = new Core();
    this._reports = [];

    while (this._core.PC < this._bytes.length) {
      const arg = this._arg();
      const opcode = this._get(this._core.PC) as Opcode;
      const instruction = new opcodeToInstruction[opcode](this._core, arg);
      instruction.execute();
      this._reports.push(instruction.report());
    }
  }

  public snapshot(): Core.Snapshot {
    return this._core.snapshot();
  }

  private _get(index: number) {
    return this._bytes[index] ?? 0;
  }

  private _arg() {
    const pc = this._core.PC;
    const l = this._get(pc + 1);
    const h = this._get(pc + 2) << 8;
    const b = this._get(pc + 3) << 16;
    return new Integer(b + h + l);
  }
}
