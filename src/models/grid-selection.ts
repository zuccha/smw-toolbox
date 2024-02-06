import { z } from "zod";
import { MethodDeps, methodDeps } from "./method";
import {
  $Grid,
  GridBounds,
  GridFromItem as GridFromDimension,
  GridSchema,
  defaultGridContext,
  isInGridBounds,
} from "./grid";

//==============================================================================
// State
//==============================================================================

export enum GridSelectionState {
  Unselected,
  Selected,
  SelectedRect,
}

const GridSelectionStateSchema = z.nativeEnum(GridSelectionState);

//==============================================================================
// Rect
//==============================================================================

export const GridSelectionRectSchema = z.object({
  x1: z.number(),
  x2: z.number(),
  y1: z.number(),
  y2: z.number(),
});

export type GridSelectionRect = z.infer<typeof GridSelectionRectSchema>;

//==============================================================================
// Selection
//==============================================================================

export type GridSelectionContext = {
  height: number;
  width: number;
};

export const SelectionSchema = z.object({
  grid: GridSchema(GridSelectionStateSchema),
  rect: z.union([GridSelectionRectSchema, z.undefined()]),
  rectPrev: z.union([GridSelectionRectSchema, z.undefined()]),
});

export type GridSelection = z.infer<typeof SelectionSchema>;

type Deps = MethodDeps<GridSelection, GridSelectionContext>;
const deps: Deps = methodDeps;

//==============================================================================
// Utils
//==============================================================================

function isInBounds(obj: GridSelection, x: number, y: number): boolean {
  return 0 <= x && x < obj.grid.width && 0 <= y && y < obj.grid.height;
}

//==============================================================================
// Builders
//==============================================================================

export function GridSelectionFromDimension(
  width: number,
  height: number,
): GridSelection {
  const grid = GridFromDimension(
    width,
    height,
    GridSelectionState.Unselected,
    {},
  );
  return { grid, rect: undefined, rectPrev: undefined };
}

GridSelectionFromDimension.deps = deps();

//==============================================================================
// Methods
//==============================================================================

function clear(_obj: GridSelection, context: GridSelectionContext) {
  return GridSelectionFromDimension(context.width, context.height);
}

clear.deps = deps([], [], [GridSelectionFromDimension]);

function computeRectBounds(
  obj: GridSelection,
  _context: GridSelectionContext,
): GridBounds {
  return obj.rect
    ? $Grid.computeBounds(obj.grid, defaultGridContext, {
        xStart: Math.min(obj.rect.x1, obj.rect.x2),
        xEnd: Math.max(obj.rect.x1, obj.rect.x2) + 1,
        yStart: Math.min(obj.rect.y1, obj.rect.y2),
        yEnd: Math.max(obj.rect.y1, obj.rect.y2) + 1,
      })
    : $Grid.computeBounds(obj.grid, defaultGridContext);
}

computeRectBounds.deps = deps(["grid", "rect"]);

function hasSelection(
  obj: GridSelection,
  context: GridSelectionContext,
): boolean {
  return $Grid.some(obj.grid, defaultGridContext, (x, y) =>
    isSelected(obj, context, x, y),
  );
}

hasSelection.deps = deps(["grid"], [], [isSelected]);

function isSelected(
  obj: GridSelection,
  _context: GridSelectionContext,
  x: number,
  y: number,
): boolean {
  const selectionState = $Grid.get(obj.grid, defaultGridContext, x, y);
  return (
    selectionState === GridSelectionState.Selected ||
    selectionState === GridSelectionState.SelectedRect
  );
}

isSelected.deps = deps(["grid"], []);

function move(
  obj: GridSelection,
  context: GridSelectionContext,
  deltaX: number,
  deltaY: number,
  shouldRestart: boolean = false,
): GridSelection {
  if (!obj.rectPrev) return obj;

  if (shouldRestart) {
    const x = Math.min(obj.rectPrev.x1, obj.rectPrev.x2);
    const y = Math.min(obj.rectPrev.y1, obj.rectPrev.y2);
    return restart(obj, context, x + deltaX, y + deltaY, true);
  }

  const rect = obj.rectPrev;
  const x = rect.x2 + deltaX;
  const y = rect.y2 + deltaY;
  return update({ ...obj, rect, rectPrev: rect }, context, x, y, true);
}

move.deps = deps(["rectPrev"], [], [restart, update]);

function restart(
  obj: GridSelection,
  _context: GridSelectionContext,
  x: number,
  y: number,
  shouldStop: boolean = false,
): GridSelection {
  if (!isInBounds(obj, x, y)) return obj;

  const grid = $Grid.map(obj.grid, defaultGridContext, (otherX, otherY) =>
    x === otherX && y === otherY
      ? GridSelectionState.Selected
      : GridSelectionState.Unselected,
  );
  const rect = { x1: x, x2: x, y1: y, y2: y };
  return { grid, rect: shouldStop ? undefined : rect, rectPrev: rect };
}

restart.deps = deps(["grid"], []);

function select(
  obj: GridSelection,
  _context: GridSelectionContext,
  x: number,
  y: number,
): GridSelection {
  const grid = $Grid.set(
    obj.grid,
    defaultGridContext,
    x,
    y,
    GridSelectionState.Selected,
  );
  return { ...obj, grid };
}

select.deps = deps(["grid"], []);

function selectIf(
  obj: GridSelection,
  _context: GridSelectionContext,
  predicate: (x: number, y: number) => boolean,
): GridSelection {
  const grid = $Grid.map(obj.grid, defaultGridContext, (x, y, selectionState) =>
    predicate(x, y) ? GridSelectionState.Selected : selectionState,
  );
  return { ...obj, grid };
}

selectIf.deps = deps(["grid"], []);

function start(
  obj: GridSelection,
  _context: GridSelectionContext,
  x: number,
  y: number,
): GridSelection {
  if (!isInBounds(obj, x, y)) return obj;

  const grid = $Grid.set(
    obj.grid,
    defaultGridContext,
    x,
    y,
    GridSelectionState.Selected,
  );
  const rect = { x1: x, x2: x, y1: y, y2: y };
  return { grid, rect, rectPrev: rect };
}

start.deps = deps(["grid"], []);

function stop(
  obj: GridSelection,
  context: GridSelectionContext,
): GridSelection {
  if (!obj.rect) return obj;

  const bounds = computeRectBounds(obj, context);
  const grid = $Grid.map(obj.grid, defaultGridContext, (x, y, selectionState) =>
    selectionState === GridSelectionState.SelectedRect &&
    isInGridBounds(bounds, x, y)
      ? GridSelectionState.Selected
      : selectionState,
  );

  return { ...obj, grid, rect: undefined };
}

stop.deps = deps(["grid", "rect"], [], [computeRectBounds]);

function update(
  obj: GridSelection,
  context: GridSelectionContext,
  x2: number,
  y2: number,
  shouldStop: boolean = false,
): GridSelection {
  if (!obj.rect) return obj;
  if (!isInBounds(obj, x2, y2)) return obj;

  const rect = { ...obj.rect, x2, y2 };
  const boundsPrev = computeRectBounds(obj, context);
  const boundsNext = computeRectBounds({ ...obj, rect }, context);

  const grid = $Grid.map(
    obj.grid,
    defaultGridContext,
    (x, y, selectionState) => {
      if (isInGridBounds(boundsNext, x, y))
        return selectionState === GridSelectionState.Unselected
          ? GridSelectionState.SelectedRect
          : selectionState;
      if (isInGridBounds(boundsPrev, x, y))
        return selectionState === GridSelectionState.SelectedRect
          ? GridSelectionState.Unselected
          : selectionState;
      return selectionState;
    },
  );

  return { grid, rect: shouldStop ? undefined : rect, rectPrev: rect };
}

update.deps = deps(["grid", "rect"], [], [computeRectBounds]);

//==============================================================================
// API
//==============================================================================

export const $GridSelection = {
  clear,
  hasSelection,
  isSelected,
  move,
  restart,
  select,
  selectIf,
  start,
  stop,
  update,
};
