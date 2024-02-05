import SectionCollapsible from "../../components/section-collapsible";
import { useTableEditorTabAppearanceIsVisible } from "./store";
import AppEditorSettingBackgroundImage from "./table-editor-setting-background-image";
import AppEditorSettingBackgroundImageOpacity from "./table-editor-setting-background-image-opacity";
import AppEditorSettingColor from "./table-editor-setting-color";
import AppEditorSettingColorOpacity from "./table-editor-setting-color-opacity";

export default function TableEditorAppearance() {
  const [isTabAppearanceVisible, setIsTabAppearanceVisible] =
    useTableEditorTabAppearanceIsVisible();

  return (
    <SectionCollapsible
      isVisible={isTabAppearanceVisible}
      label="Appearance"
      onChange={setIsTabAppearanceVisible}
    >
      <div class="App_SectionCol">
        <div class="App_SectionFullRow">
          <AppEditorSettingBackgroundImage />
          <AppEditorSettingBackgroundImageOpacity />
        </div>

        <div class="App_SectionFullRow">
          <AppEditorSettingColor />
          <AppEditorSettingColorOpacity />
        </div>
      </div>
    </SectionCollapsible>
  );
}
