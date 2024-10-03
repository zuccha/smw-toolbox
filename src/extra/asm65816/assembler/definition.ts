import { Range } from "./range";

export default class Definition {
  public readonly range: Range;

  public constructor(range: Range) {
    this.range = range;
  }
}
