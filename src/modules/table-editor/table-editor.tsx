import { useMemo } from "preact/hooks";
import { useAppHotkeysIsEnabled } from "../../app/store";
import SectionCollapsible from "../../components/section-collapsible";
import SectionStatic from "../../components/section-static";
import useHotkeys, { Hotkey } from "../../hooks/use-hotkeys";
import { toggle } from "../../utils";
import {
  useTableEditorTabAppearanceIsVisible,
  useTableEditorTabSettingsIsVisible,
  useTableEditorTabTutorialIsVisible,
} from "./store";
import TableEditorAppearance from "./table-editor-appearance";
import TableEditorGrid from "./table-editor-grid";
import TableEditorSettings from "./table-editor-settings";
import TableEditorTutorial from "./table-editor-tutorial";

export default function TableEditor() {
  const [isTabAppearanceVisible, setIsTabAppearanceVisible] =
    useTableEditorTabAppearanceIsVisible();

  const [isTabSettingsVisible, setIsTabSettingsVisible] =
    useTableEditorTabSettingsIsVisible();

  const [isTabTutorialVisible, setIsTabTutorialVisible] =
    useTableEditorTabTutorialIsVisible();

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

  return (
    <div class="App_Module">
      <div class="App_ModuleBlock">
        <SectionStatic label="Table Editor">
          <TableEditorGrid />
        </SectionStatic>
      </div>

      <div class="App_ModuleBlock">
        <SectionCollapsible
          isVisible={isTabSettingsVisible}
          label="Settings"
          onChange={setIsTabSettingsVisible}
        >
          <TableEditorSettings />
        </SectionCollapsible>

        <SectionCollapsible
          isVisible={isTabAppearanceVisible}
          label="Appearance"
          onChange={setIsTabAppearanceVisible}
        >
          <TableEditorAppearance />
        </SectionCollapsible>

        <TableEditorTutorial
          isVisible={isTabTutorialVisible}
          onChangeVisibility={setIsTabTutorialVisible}
        />
      </div>
    </div>
  );
}
