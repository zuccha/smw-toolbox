import { IntegerStringInputCaret } from "../../components/integer-string-input";
import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Setting from "../../components/setting";
import { useCalculatorEditorsCaret } from "./store";

const caretOptions: RadioGroupOption<IntegerStringInputCaret>[] = [
  { label: "Bar", value: IntegerStringInputCaret.Bar },
  { label: "Box", value: IntegerStringInputCaret.Box },
  { label: "Underline", value: IntegerStringInputCaret.Underline },
] as const;

export default function CalculatorSettingCaret() {
  const [caret, setCaret] = useCalculatorEditorsCaret();

  return (
    <Setting label="Caret">
      <RadioGroup onChange={setCaret} options={caretOptions} value={caret} />
    </Setting>
  );
}
