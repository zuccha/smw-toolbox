import { useState } from "preact/hooks";
import InputNumber from "../../components/input-number";
import InputText from "../../components/input-text";
import Setting from "../../components/setting";
import "./table-editor-export.css";

const namePattern = /^\.*[a-zA-Z0-9_]*$/;

export default function TableEditorExport() {
  const [name, setName] = useState("");
  const [indentation, setIndentation] = useState(0);

  return (
    <div class="table-editor-export">
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
  );
}
