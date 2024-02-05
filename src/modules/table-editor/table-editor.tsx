import TableEditorSectionGrid from "./table-editor-section-grid";
import TableEditorHotkeys from "./table-editor-hotkeys";
import TableEditorSectionAppearance from "./table-editor-section-appearance";
import TableEditorSectionSettings from "./table-editor-section-settings";
import TableEditorSectionTutorial from "./table-editor-section-tutorial";

export default function TableEditor() {
  return (
    <div class="App_Module">
      <TableEditorHotkeys />

      <div class="App_ModuleBlock">
        <TableEditorSectionGrid />
      </div>

      <div class="App_ModuleBlock">
        <TableEditorSectionSettings />
        <TableEditorSectionAppearance />
        <TableEditorSectionTutorial />
      </div>
    </div>
  );
}
