import { useMemo } from "preact/hooks";
import useHotkeys, { Hotkey } from "../../hooks/use-hotkeys";

export default function TableEditorHotkeys() {
  const hotkeys = useMemo(() => {
    const hotkeys: Hotkey[] = [];
    return hotkeys;
  }, []);

  useHotkeys(hotkeys);

  return null;
}
