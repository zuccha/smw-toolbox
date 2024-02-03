import { z } from "zod";

export enum Direction {
  Down,
  Left,
  Right,
  Up,
}

export const DirectionSchema = z.nativeEnum(Direction);

export type Focusable = {
  focus: (direction?: Direction) => boolean;
};

export type Either<A, B> = [A, undefined] | [undefined, B];
