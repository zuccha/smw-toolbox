import { useCallback, useEffect } from "preact/hooks";

export type Hotkey = {
  key: string;
  onPress: () => boolean | void;

  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;

  always?: boolean;
};

export default function useHotkeys(hotkeys: Hotkey[]): void {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      for (const hotkey of hotkeys)
        if (
          e.key === hotkey.key &&
          (!hotkey.ctrl || e.ctrlKey) &&
          (!hotkey.meta || e.metaKey) &&
          (!hotkey.shift || e.shiftKey)
        ) {
          if (hotkey.onPress()) {
            e.preventDefault();
            e.stopPropagation();
          }
          return;
        }
    },
    [hotkeys],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
}
