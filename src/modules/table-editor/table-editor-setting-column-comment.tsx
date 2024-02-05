import Select from "../../components/select";
import Setting from "../../components/setting";
import { IntegerTableColumnCommentType } from "../../models/integer-table";
import { useTableEditorColumnCommentType } from "./store";

const columnCommentTypeOptions = [
  { label: "None", value: IntegerTableColumnCommentType.None },
  {
    label: "Column Number (dec)",
    value: IntegerTableColumnCommentType.ColumnNumberDec,
  },
  {
    label: "Column Number (hex)",
    value: IntegerTableColumnCommentType.ColumnNumberHex,
  },
  {
    label: "Column Value (hex)",
    value: IntegerTableColumnCommentType.ColumnValueHex,
  },
];

export default function AppEditorSettingColumnComment() {
  const [columnCommentType, setColumnCommentType] =
    useTableEditorColumnCommentType();

  return (
    <Setting label="Column Comment">
      <Select
        onChange={setColumnCommentType}
        options={columnCommentTypeOptions}
        placeholder="Column Comment"
        value={columnCommentType}
      />
    </Setting>
  );
}
