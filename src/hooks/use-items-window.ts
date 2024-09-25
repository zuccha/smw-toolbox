import { useCallback, useMemo, useState } from "preact/hooks";

export default function useItemsWindow<T>(
  items: readonly T[],
  windowSize: number,
) {
  const [scrollIndexFrac, setScrollIndexFrac] = useState(0);
  const nextScrollIndex = Math.floor(scrollIndexFrac);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      const nextScrollIndexFrac = scrollIndexFrac + e.deltaY / 30;
      const nextScrollIndex = Math.floor(nextScrollIndexFrac);
      if (nextScrollIndex < 0 || items.length - windowSize < nextScrollIndex)
        return;

      e.preventDefault();
      setScrollIndexFrac(nextScrollIndexFrac);
    },
    [items.length, scrollIndexFrac, windowSize],
  );

  const resetScroll = useCallback(() => setScrollIndexFrac(0), []);

  const scrolledItems = useMemo(
    () => items.slice(nextScrollIndex, nextScrollIndex + windowSize),
    [items, nextScrollIndex],
  );

  return {
    handleScroll,
    items: scrolledItems,
    resetScroll,
    scrollIndex: Math.floor(scrollIndexFrac),
  };
}
