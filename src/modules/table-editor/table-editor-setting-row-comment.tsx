import Select from "../../components/select";
import Setting from "../../components/setting";
import { IntegerDataRowCommentType } from "../../models/integer-data-row";
import { useTableEditorRowCommentType } from "./store";

const rowCommentTypeOptions = [
  { label: "None", value: IntegerDataRowCommentType.None },
  { label: "Row Number (dec)", value: IntegerDataRowCommentType.RowNumberDec },
  { label: "Row Number (hex)", value: IntegerDataRowCommentType.RowNumberHex },
  { label: "Row Range (hex)", value: IntegerDataRowCommentType.RowRangeHex },
];

export default function AppEditorSettingRowComment() {
  const [rowCommentType, setRowCommentType] = useTableEditorRowCommentType();

  return (
    <Setting label="Row Comment">
      <Select
        onChange={setRowCommentType}
        options={rowCommentTypeOptions}
        placeholder="Row Comment"
        value={rowCommentType}
      />
    </Setting>
  );
}
