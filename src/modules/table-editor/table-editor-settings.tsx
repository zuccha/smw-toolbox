import InputNumber from "../../components/input-number";
import InputText from "../../components/input-text";
import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Select from "../../components/select";
import Setting from "../../components/setting";
import { IntegerDataRowCommentType } from "../../models/integer-data-row";
import { IntegerTableColumnCommentType } from "../../models/integer-table";
import { IntegerEncoding, IntegerUnit } from "../../models/integer";
import { labelPattern } from "../../utils";
import {
  useTableEditorName,
  useTableEditorEncoding,
  useTableEditorUnit,
  useTableEditorSizeHeight,
  useTableEditorSizeWidth,
  useTableEditorIndentation,
  useTableEditorColumnCommentType,
  useTableEditorRowCommentType,
  useTableEditorShouldSpaceValues,
} from "./store";

const binaryOptions: RadioGroupOption<boolean>[] = [
  { label: "Yes", value: true },
  { label: "No", value: false },
] as const;

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

const rowCommentTypeOptions = [
  { label: "None", value: IntegerDataRowCommentType.None },
  { label: "Row Number (dec)", value: IntegerDataRowCommentType.RowNumberDec },
  { label: "Row Number (hex)", value: IntegerDataRowCommentType.RowNumberHex },
  { label: "Row Range (hex)", value: IntegerDataRowCommentType.RowRangeHex },
];

const encodingOptions: RadioGroupOption<IntegerEncoding>[] = [
  { label: "Bin", value: IntegerEncoding.Bin },
  { label: "Dec", value: IntegerEncoding.Dec },
  { label: "Hex", value: IntegerEncoding.Hex },
] as const;

const unitOptions: RadioGroupOption<IntegerUnit>[] = [
  { label: "Byte", value: IntegerUnit.Byte },
  { label: "Word", value: IntegerUnit.Word },
] as const;

export default function TableEditorSettings() {
  const [name, setName] = useTableEditorName();

  const [encoding, setEncoding] = useTableEditorEncoding();
  const [unit, setUnit] = useTableEditorUnit();

  const [height, setHeight] = useTableEditorSizeHeight();
  const [width, setWidth] = useTableEditorSizeWidth();

  const [indentation, setIndentation] = useTableEditorIndentation();

  const [columnCommentType, setColumnCommentType] =
    useTableEditorColumnCommentType();
  const [rowCommentType, setRowCommentType] = useTableEditorRowCommentType();

  const [shouldSpaceValues, setShouldSpaceValues] =
    useTableEditorShouldSpaceValues();

  return (
    <div class="App_SectionCol">
      <div class="App_SectionRow">
        <Setting label="Encoding">
          <RadioGroup
            onChange={setEncoding}
            options={encodingOptions}
            value={encoding}
          />
        </Setting>

        <Setting label="Unit (Y/W)">
          <RadioGroup onChange={setUnit} options={unitOptions} value={unit} />
        </Setting>

        <Setting label="Width">
          <InputNumber
            isInteger
            max={50}
            min={1}
            onChange={setWidth}
            placeholder="1"
            value={width}
          />
        </Setting>

        <Setting label="Height">
          <InputNumber
            isInteger
            max={50}
            min={1}
            onChange={setHeight}
            placeholder="1"
            value={height}
          />
        </Setting>

        <Setting label="Table Name">
          <InputText
            onChange={setName}
            pattern={labelPattern}
            placeholder="Table Name"
            value={name}
          />
        </Setting>
      </div>

      <div class="App_SectionRow">
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

        <Setting label="Indentation">
          <InputNumber
            isInteger
            max={100}
            min={0}
            onChange={setIndentation}
            placeholder="0"
            value={indentation}
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
