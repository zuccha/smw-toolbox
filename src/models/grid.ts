import { z } from "zod";
import { MethodDeps, methodDeps } from "./method";

//==============================================================================
// Bounds
//==============================================================================

export type GridBounds = {
  xStart: number;
  xEnd: number;
  yStart: number;
  yEnd: number;
};

export function isInGridBounds(
  bounds: GridBounds,
  x: number,
  y: number
): boolean {
  const { xStart, xEnd, yStart, yEnd } = bounds;
  return xStart <= x && x < xEnd && yStart <= y && y < yEnd;
}

//==============================================================================
// Grid
//==============================================================================

export type GridContext = {};
export const defaultGridContext = {};

export const GridSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    items: z.array(z.array(itemSchema)),
    height: z.number(),
    width: z.number(),
  });

export type Grid<T> = { items: T[][]; height: number; width: number };

type Deps<T> = MethodDeps<Grid<T>, GridContext>;
const deps = <T>(...args: Parameters<Deps<T>>) => methodDeps(...args);

//==============================================================================
// Builders
//==============================================================================

export function GridFromItem<T>(
  width: number,
  height: number,
  item: T,
  _context: GridContext
): Grid<T> {
  const items: T[][] = [];
  for (let y = 0; y < height; ++y) {
    const row: T[] = [];
    for (let x = 0; x < width; ++x) row.push(item);
    items.push(row);
  }
  return { items, height, width };
}

GridFromItem.deps = deps();

//==============================================================================
// Methods
//==============================================================================

function computeBounds<T>(
  obj: Grid<T>,
  _context: GridContext,
  bounds: GridBounds | undefined = undefined
): GridBounds {
  return bounds
    ? {
        xStart: Math.max(0, bounds.xStart),
        xEnd: Math.min(obj.width, bounds.xEnd),
        yStart: Math.max(0, bounds.yStart),
        yEnd: Math.min(obj.height, bounds.yEnd),
      }
    : { xStart: 0, xEnd: obj.width, yStart: 0, yEnd: obj.height };
}

computeBounds.deps = deps(["height", "width"]);

function get<T>(
  obj: Grid<T>,
  context: GridContext,
  x: number,
  y: number
): T | undefined {
  const bounds = computeBounds(obj, context);
  return isInGridBounds(bounds, x, y) ? obj.items[y]![x]! : undefined;
}

get.deps = deps(["height", "items", "width"], [], [computeBounds]);

function map<T>(
  obj: Grid<T>,
  _context: GridContext,
  mapItem: (x: number, y: number, item: T) => T
): Grid<T> {
  if (
    obj.items.length !== obj.height ||
    obj.items.some((row) => row.length !== obj.width)
  )
    return obj;

  const items = [
    ...obj.items.map((row, y) => [
      ...row.map((item, x) => mapItem(x, y, item)),
    ]),
  ];

  return { ...obj, items };
}

map.deps = deps(["height", "items", "width"]);

function set<T>(
  obj: Grid<T>,
  context: GridContext,
  x: number,
  y: number,
  item: T
): Grid<T> {
  const bounds = computeBounds(obj, context, undefined);
  if (!isInGridBounds(bounds, x, y)) return obj;
  const items = [...obj.items.map((row) => [...row])];
  items[y]![x] = item;
  return { ...obj, items };
}

set.deps = deps(["height", "items", "width"], [], [computeBounds]);

function some<T>(
  obj: Grid<T>,
  _context: GridContext,
  predicate: (x: number, y: number, item: T) => boolean
): boolean {
  for (let y = 0; y < obj.items.length; ++y)
    for (let x = 0; x < obj.items[y]!.length; ++x)
      if (predicate(x, y, obj.items[y]![x]!)) return true;
  return false;
}

some.deps = deps(["items"]);

//==============================================================================
// API
//==============================================================================

export const $Grid = {
  computeBounds,
  map,
  get,
  set,
  some,
};
