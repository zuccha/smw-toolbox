import { RefObject } from "preact";
import { useCallback } from "preact/hooks";
import { clamp } from "../utils";

export default function useMouseScroll(
  elementRef: RefObject<HTMLElement>,
  onMouseScroll: (scrollRatioDelta: number) => void,
) {
  const handleScroll = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      if (elementRef.current)
        onMouseScroll(clamp(e.deltaY / elementRef.current.clientHeight, -1, 1));
    },
    [elementRef.current, onMouseScroll],
  );

  return {
    handleScroll,
  };
}
