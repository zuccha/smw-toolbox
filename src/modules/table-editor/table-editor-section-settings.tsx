import SectionCollapsible from "../../components/section-collapsible";
import { useTableEditorTabSettingsIsVisible } from "./store";
import AppEditorSettingColumnComment from "./table-editor-setting-column-comment";
import AppEditorSettingEncoding from "./table-editor-setting-encoding";
import AppEditorSettingIndentation from "./table-editor-setting-indentation";
import AppEditorSettingName from "./table-editor-setting-name";
import AppEditorSettingRowComment from "./table-editor-setting-row-comment";
import AppEditorSettingSizeHeight from "./table-editor-setting-size-height";
import AppEditorSettingSizeWidth from "./table-editor-setting-size-width";
import AppEditorSettingSpaceValues from "./table-editor-setting-space-values";
import AppEditorSettingUnit from "./table-editor-setting-unit";

export default function TableEditorSettings() {
  const [isTabSettingsVisible, setIsTabSettingsVisible] =
    useTableEditorTabSettingsIsVisible();

  return (
    <SectionCollapsible
      isVisible={isTabSettingsVisible}
      label="Settings"
      onChange={setIsTabSettingsVisible}
    >
      <div class="App_SectionCol">
        <div class="App_SectionRow">
          <AppEditorSettingEncoding />
          <AppEditorSettingUnit />
          <AppEditorSettingSizeWidth />
          <AppEditorSettingSizeHeight />
          <AppEditorSettingName />
        </div>

        <div class="App_SectionRow">
          <AppEditorSettingColumnComment />
          <AppEditorSettingRowComment />
          <AppEditorSettingIndentation />
          <AppEditorSettingSpaceValues />
        </div>
      </div>
    </SectionCollapsible>
  );
}
