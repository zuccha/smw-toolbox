import { RefObject } from "preact";
import { useCallback, useLayoutEffect, useRef } from "preact/hooks";
import { clamp } from "../utils";

export default function useMouseDrag(
  elementRef: RefObject<HTMLElement>,
  onMouseDrag: (dragRatio: number) => void,
) {
  const isDraggingRef = useRef(false);
  const prevClientYRef = useRef(0);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDraggingRef.current = true;
    prevClientYRef.current = e.clientY;
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      if (isDraggingRef.current && elementRef.current) {
        const deltaY = e.clientY - prevClientYRef.current;
        prevClientYRef.current = e.clientY;
        onMouseDrag(clamp(deltaY / elementRef.current.clientHeight, -1, 1));
      }
    },
    [elementRef.current, onMouseDrag],
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, [handleMouseMove]);

  useLayoutEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}
