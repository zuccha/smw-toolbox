import { Range } from "./range";

export default class AssemblerError extends Error {
  public readonly range: Range;

  public constructor(message: string, range: Range) {
    super(message);
    this.range = range;
  }
}
