import { useState } from "preact/hooks";
import InputNumber from "../../components/input-number";
import InputText from "../../components/input-text";
import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Select from "../../components/select";
import Setting from "../../components/setting";
import "./table-editor-export.css";
import { ColumnCommentType, RowCommentType } from "./types";

const namePattern = /^\.*[a-zA-Z0-9_]*$/;

const binaryOptions: RadioGroupOption<boolean>[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
] as const;

const columnCommentTypeOptions = [
  { label: "None", value: ColumnCommentType.None },
  { label: "Column Number (dec)", value: ColumnCommentType.ColumnNumberDec },
  { label: "Column Number (hex)", value: ColumnCommentType.ColumnNumberHex },
  { label: "Column Value (hex)", value: ColumnCommentType.ColumnValueHex },
];

const rowCommentTypeOptions = [
  { label: "None", value: RowCommentType.None },
  { label: "Row Number (dec)", value: RowCommentType.RowNumberDec },
  { label: "Row Number (hex)", value: RowCommentType.RowNumberHex },
  { label: "Row Range (hex)", value: RowCommentType.RowRangeHex },
];

export default function TableEditorExport() {
  const [name, setName] = useState("");
  const [indentation, setIndentation] = useState(0);

  const [columnCommentType, setColumnCommentType] = useState(
    ColumnCommentType.None
  );
  const [rowCommentType, setRowCommentType] = useState(RowCommentType.None);

  const [shouldSpaceValues, setShouldSpaceValues] = useState(false);

  return (
    <div class="table-editor-export _section-col">
      <div class="_section-row">
        <Setting label="Table Name">
          <InputText
            onChange={setName}
            pattern={namePattern}
            placeholder="Table Name"
            value={name}
          />
        </Setting>

        <Setting label="Indentation">
          <InputNumber
            isInteger
            min={0}
            onChange={setIndentation}
            placeholder="Indentation"
            value={indentation}
          />
        </Setting>
      </div>

      <div class="_section-row">
        <Setting label="Column Comment">
          <Select
            onChange={setColumnCommentType}
            options={columnCommentTypeOptions}
            placeholder="Column Comment"
            value={columnCommentType}
          />
        </Setting>

        <Setting label="Row Comment">
          <Select
            onChange={setRowCommentType}
            options={rowCommentTypeOptions}
            placeholder="Row Comment"
            value={rowCommentType}
          />
        </Setting>

        <Setting label="Space Values">
          <RadioGroup
            onChange={setShouldSpaceValues}
            options={binaryOptions}
            value={shouldSpaceValues}
          />
        </Setting>
      </div>
    </div>
  );
}
