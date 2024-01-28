import { z } from "zod";
import RadioGroup, { Option } from "../../components/radio-group";
import SectionCollapsible from "../../components/section-collapsible";
import SectionStatic from "../../components/section-static";
import Setting from "../../components/setting";
import useSetting from "../../hooks/use-setting";
import { Encoding, EncodingSchema, Unit, UnitSchema } from "../../types";
import "./table-editor.css";
import TableEditorExport from "./table-editor-export";

const encodingOptions: Option<Encoding>[] = [
  { label: "Bin", value: Encoding.Bin },
  { label: "Dec", value: Encoding.Dec },
  { label: "Hex", value: Encoding.Hex },
] as const;

const unitOptions: Option<Unit>[] = [
  { label: "Byte", value: Unit.Byte },
  { label: "Word", value: Unit.Word },
] as const;

export default function TableEditor() {
  //----------------------------------------------------------------------------
  // Settings
  //----------------------------------------------------------------------------

  const [exportVisible, setExportVisible] = useSetting(
    "table-editor-export-visible",
    false,
    z.boolean().parse
  );

  const [importVisible, setImportVisible] = useSetting(
    "table-editor-import-visible",
    false,
    z.boolean().parse
  );

  const [newVisible, setNewVisible] = useSetting(
    "table-editor-new-visible",
    false,
    z.boolean().parse
  );

  const [settingsVisible, setSettingsVisible] = useSetting(
    "table-editor-settings-visible",
    false,
    z.boolean().parse
  );

  const [encoding, setEncoding] = useSetting(
    "table-editor-encoding",
    Encoding.Hex,
    EncodingSchema.parse
  );

  const [unit, setUnit] = useSetting(
    "table-editor-unit",
    Unit.Byte,
    UnitSchema.parse
  );

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------

  return (
    <div class="table-editor">
      <SectionStatic label="Table Editor">Table</SectionStatic>

      <SectionCollapsible
        isVisible={settingsVisible}
        label="Settings"
        onChange={setSettingsVisible}
      >
        <div class="table-editor-settings">
          <Setting label="Encoding">
            <RadioGroup
              onChange={setEncoding}
              options={encodingOptions}
              value={encoding}
            />
          </Setting>

          <Setting label="Unit">
            <RadioGroup onChange={setUnit} options={unitOptions} value={unit} />
          </Setting>
        </div>
      </SectionCollapsible>

      <SectionCollapsible
        isVisible={exportVisible}
        label="Export"
        onChange={setExportVisible}
      >
        <TableEditorExport />
      </SectionCollapsible>

      <SectionCollapsible
        isVisible={importVisible}
        label="Import"
        onChange={setImportVisible}
      >
        WIP
      </SectionCollapsible>

      <SectionCollapsible
        isVisible={newVisible}
        label="New"
        onChange={setNewVisible}
      >
        WIP
      </SectionCollapsible>
    </div>
  );
}
