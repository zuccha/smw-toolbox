import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "preact/hooks";
import { clamp } from "../utils";
import useMouseDrag from "./use-mouse-drag";
import useMouseScroll from "./use-mouse-scroll";

export default function useFrame<T>(items: readonly T[], windowSize: number) {
  const elementRef = useRef(null);
  const ratioRef = useRef(0);

  const [index, setIndex] = useState(0);

  useLayoutEffect(() => {
    setIndex(0);
    ratioRef.current = 0;
  }, [items]);

  const moveWindow = useCallback(
    (ratioDelta: number, damping: number) => {
      const maxIndex = items.length - windowSize;
      const maxIndexRatio = maxIndex / items.length;
      const ratio = ratioRef.current + ratioDelta / damping;
      ratioRef.current = clamp(ratio, 0, maxIndexRatio);
      setIndex(Math.floor(ratioRef.current * items.length));
    },
    [items.length, windowSize],
  );

  const handleMouseDrag = useCallback(
    (dragRatioDelta: number) => moveWindow(dragRatioDelta, 1),
    [moveWindow],
  );

  const handleMouseScroll = useCallback(
    (scrollRatioDelta: number) =>
      moveWindow(scrollRatioDelta, items.length / 3),
    [items.length, moveWindow],
  );

  const mouseDrag = useMouseDrag(elementRef, handleMouseDrag);
  const mouseScroll = useMouseScroll(elementRef, handleMouseScroll);

  const frame = useMemo(
    () => items.slice(index, index + windowSize),
    [index, items, windowSize],
  );

  return {
    elementRef,
    index,
    items: frame,
    mouseDrag,
    mouseScroll,
  };
}
