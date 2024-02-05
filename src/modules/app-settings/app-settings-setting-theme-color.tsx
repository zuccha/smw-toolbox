import { useMemo } from "preact/hooks";
import { useAppThemeColor, useAppTheme } from "../../app/store";
import PalettePicker from "../../components/palette-picker";
import Setting from "../../components/setting";
import { ThemeColor } from "../../models/theme";

export default function AppSettingsSettingThemeColor() {
  const [themeColor, setThemeColor] = useAppThemeColor();

  const theme = useAppTheme();
  const themeColorOptions = useMemo(
    // prettier-ignore
    () => [
      { color: theme.color[ThemeColor.Purple].primary2, value: ThemeColor.Purple },
      { color: theme.color[ThemeColor.Blue].primary2, value: ThemeColor.Blue },
      { color: theme.color[ThemeColor.Cyan].primary2, value: ThemeColor.Cyan },
      { color: theme.color[ThemeColor.Green].primary2, value: ThemeColor.Green },
      { color: theme.color[ThemeColor.Yellow].primary2, value: ThemeColor.Yellow },
      { color: theme.color[ThemeColor.Orange].primary2, value: ThemeColor.Orange },
      { color: theme.color[ThemeColor.Red].primary2, value: ThemeColor.Red },
      { color: theme.color[ThemeColor.Pink].primary2, value: ThemeColor.Pink },
      { color: "disco", value: ThemeColor.Disco },
    ],
    [theme],
  );

  return (
    <Setting label="Palette">
      <PalettePicker
        onChange={setThemeColor}
        options={themeColorOptions}
        value={themeColor}
      />
    </Setting>
  );
}
