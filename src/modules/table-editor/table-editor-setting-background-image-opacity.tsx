import Setting from "../../components/setting";
import Slider from "../../components/slider";
import { useTableEditorBackgroundImageOpacity } from "./store";

export default function AppEditorSettingBackgroundImageOpacity() {
  const [backgroundImageOpacity, setBackgroundImageOpacity] =
    useTableEditorBackgroundImageOpacity();

  return (
    <Setting label="Background Image Opacity">
      <Slider
        max={100}
        min={0}
        onChange={setBackgroundImageOpacity}
        step={1}
        value={backgroundImageOpacity}
      />
    </Setting>
  );
}
