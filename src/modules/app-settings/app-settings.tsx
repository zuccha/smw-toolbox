import { useMemo } from "preact/hooks";
import {
  useAppHotkeysIsEnabled,
  useAppTheme,
  useAppThemeColor,
  useAppThemeMode,
} from "../../app/store";
import PalettePicker from "../../components/palette-picker";
import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import SectionCollapsible from "../../components/section-collapsible";
import Select from "../../components/select";
import Setting from "../../components/setting";
import { ThemeColor, ThemeMode } from "../../models/theme";
import {
  useAppSettingsTabGeneralIsVisible,
  useAppSettingsTabThemeIsVisible,
} from "./store";

const binaryOptions: RadioGroupOption<boolean>[] = [
  { label: "On", value: true },
  { label: "Off", value: false },
] as const;

const themeModeOptions = [
  { label: "System", value: ThemeMode.System },
  { label: "Dark", value: ThemeMode.Dark },
  { label: "Light", value: ThemeMode.Light },
];

export default function AppSettings() {
  const [isTabGeneralVisible, setIsTabGeneralVisible] =
    useAppSettingsTabGeneralIsVisible();

  const [isTabThemeVisible, setIsTabThemeVisible] =
    useAppSettingsTabThemeIsVisible();

  const [themeColor, setThemeColor] = useAppThemeColor();
  const [themeMode, setThemeMode] = useAppThemeMode();

  const [isHotkeysEnabled, setIsHotkeysEnabled] = useAppHotkeysIsEnabled();

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
    <div class="App_Module">
      <div class="App_ModuleBlock">
        <SectionCollapsible
          isVisible={isTabGeneralVisible}
          label="General"
          onChange={setIsTabGeneralVisible}
        >
          <Setting hotkey="K" label="Hotkeys">
            <RadioGroup
              onChange={setIsHotkeysEnabled}
              options={binaryOptions}
              value={isHotkeysEnabled}
            />
          </Setting>
        </SectionCollapsible>

        <SectionCollapsible
          isVisible={isTabThemeVisible}
          label="Theme"
          onChange={setIsTabThemeVisible}
        >
          <div class="App_SectionRow">
            <Setting label="Mode">
              <Select
                onChange={setThemeMode}
                options={themeModeOptions}
                placeholder="Color Mode"
                value={themeMode}
              />
            </Setting>

            <Setting label="Palette">
              <PalettePicker
                onChange={setThemeColor}
                options={themeColorOptions}
                value={themeColor}
              />
            </Setting>
          </div>
        </SectionCollapsible>
      </div>
    </div>
  );
}
