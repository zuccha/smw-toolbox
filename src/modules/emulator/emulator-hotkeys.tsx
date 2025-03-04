import { useMemo } from "preact/hooks";
import useHotkeys, { Hotkey } from "../../hooks/use-hotkeys";
import useEmulator from "./use-emulator";

export default function TableEditorHotkeys() {
  const { run } = useEmulator();

  const hotkeys = useMemo((): Hotkey[] => {
    return [
      { key: `e`, ctrl: true, onPress: run },
      { key: `m`, ctrl: true, onPress: run },
    ];
  }, [run]);

  useHotkeys(hotkeys);

  return null;
}
