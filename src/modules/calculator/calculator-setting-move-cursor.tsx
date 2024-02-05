import RadioGroup, { binaryOptions } from "../../components/radio-group";
import Setting from "../../components/setting";
import { useCalculatorEditorsShouldMoveAfterTyping } from "./store";

export default function CalculatorSettingMoveCursor() {
  const [shouldMoveAfterTyping, setShouldMoveAfterTyping] =
    useCalculatorEditorsShouldMoveAfterTyping();

  return (
    <Setting hotkey="M" label="Move Cursor">
      <RadioGroup
        onChange={setShouldMoveAfterTyping}
        options={binaryOptions}
        value={shouldMoveAfterTyping}
      />
    </Setting>
  );
}
