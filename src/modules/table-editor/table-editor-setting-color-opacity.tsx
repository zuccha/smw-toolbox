import Setting from "../../components/setting";
import Slider from "../../components/slider";
import { useTableEditorColorOpacity } from "./store";

export default function AppEditorSettingColorOpacity() {
  const [colorOpacity, setColorOpacity] = useTableEditorColorOpacity();

  return (
    <Setting label="Color Opacity">
      <Slider
        max={100}
        min={0}
        onChange={setColorOpacity}
        step={1}
        value={colorOpacity}
      />
    </Setting>
  );
}
