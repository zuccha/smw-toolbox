import { useMemo } from "preact/hooks";
import { useAppHotkeysIsEnabled } from "../../app/store";
import useHotkeys, { Hotkey } from "../../hooks/use-hotkeys";
import { toggle } from "../../utils";
import {
  useTableEditorTabAppearanceIsVisible,
  useTableEditorTabSettingsIsVisible,
  useTableEditorTabTutorialIsVisible,
} from "./store";

export default function TableEditorHotkeys() {
  const [, setIsTabAppearanceVisible] = useTableEditorTabAppearanceIsVisible();
  const [, setIsTabSettingsVisible] = useTableEditorTabSettingsIsVisible();
  const [, setIsTabTutorialVisible] = useTableEditorTabTutorialIsVisible();

  const [isHotkeysEnabled] = useAppHotkeysIsEnabled();

  const hotkeys = useMemo(() => {
    const hotkeys: Hotkey[] = [];

    // prettier-ignore
    if (isHotkeysEnabled) {
      hotkeys.push({ key: "h", onPress: () => setIsTabTutorialVisible(toggle) });
      hotkeys.push({ key: "s", onPress: () => setIsTabSettingsVisible(toggle) });
      hotkeys.push({ key: "t", onPress: () => setIsTabAppearanceVisible(toggle) });
    }

    return hotkeys;
  }, [
    setIsTabAppearanceVisible,
    setIsTabSettingsVisible,
    setIsTabTutorialVisible,
  ]);

  useHotkeys(hotkeys);

  return null;
}
