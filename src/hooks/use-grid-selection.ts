import { useLayoutEffect, useState } from "preact/hooks";
import {
  $GridSelection,
  GridSelection,
  GridSelectionContext,
  GridSelectionFromDimension,
} from "../models/grid-selection";
import { useGetter, useSetter } from "./use-method";
import { Methods } from "../models/method";

export default function useGridSelection(
  width: number,
  height: number,
): [
  GridSelection,
  Methods<GridSelection, GridSelectionContext, typeof $GridSelection>,
] {
  const [obj, setObj] = useState(GridSelectionFromDimension(width, height));

  useLayoutEffect(() => {
    setObj(GridSelectionFromDimension(width, height));
  }, [width, height]);

  const methodContext = { obj, setObj, context: { height, width } };
  const clear = useSetter($GridSelection.clear, methodContext);
  const hasSelection = useGetter($GridSelection.hasSelection, methodContext);
  const isSelected = useGetter($GridSelection.isSelected, methodContext);
  const move = useSetter($GridSelection.move, methodContext);
  const restart = useSetter($GridSelection.restart, methodContext);
  const select = useSetter($GridSelection.select, methodContext);
  const selectIf = useSetter($GridSelection.selectIf, methodContext);
  const start = useSetter($GridSelection.start, methodContext);
  const stop = useSetter($GridSelection.stop, methodContext);
  const update = useSetter($GridSelection.update, methodContext);

  return [
    obj,
    {
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
    },
  ];
}
