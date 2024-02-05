import { useAppThemeMode } from "../../app/store";
import Select from "../../components/select";
import Setting from "../../components/setting";
import { ThemeMode } from "../../models/theme";

const themeModeOptions = [
  { label: "System", value: ThemeMode.System },
  { label: "Dark", value: ThemeMode.Dark },
  { label: "Light", value: ThemeMode.Light },
];

export default function AppSettingsSettingThemeMode() {
  const [themeMode, setThemeMode] = useAppThemeMode();

  return (
    <Setting label="Mode">
      <Select
        onChange={setThemeMode}
        options={themeModeOptions}
        placeholder="Color Mode"
        value={themeMode}
      />
    </Setting>
  );
}
