import { useAppHotkeysIsEnabled, useAppThemeMode } from "../../app/store";
import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import SectionCollapsible from "../../components/section-collapsible";
import Select from "../../components/select";
import Setting from "../../components/setting";
import { ThemeMode } from "../../hooks/use-theme";
import {
  useAppSettingsTabGeneralIsVisible,
  useAppSettingsTabThemeIsVisible,
} from "./store";

const binaryOptions: RadioGroupOption<boolean>[] = [
  { label: "On", value: true },
  { label: "Off", value: false },
] as const;

const colorSchemeModeOptions = [
  { label: "System", value: ThemeMode.System },
  { label: "Dark", value: ThemeMode.Dark },
  { label: "Light", value: ThemeMode.Light },
];

export default function AppSettings() {
  const [isTabGeneralVisible, setIsTabGeneralVisible] =
    useAppSettingsTabGeneralIsVisible();

  const [isTabThemeVisible, setIsTabThemeVisible] =
    useAppSettingsTabThemeIsVisible();

  const [themeMode, setThemeMode] = useAppThemeMode();

  const [isHotkeysEnabled, setIsHotkeysEnabled] = useAppHotkeysIsEnabled();

  return (
    <div class="App_Module">
      <div class="App_ModuleBlock">
        <SectionCollapsible
          isVisible={isTabGeneralVisible}
          label="General"
          onChange={setIsTabGeneralVisible}
        >
          <div class="App_SectionCol">
            <Setting hotkey="K" label="Hotkeys">
              <RadioGroup
                onChange={setIsHotkeysEnabled}
                options={binaryOptions}
                value={isHotkeysEnabled}
              />
            </Setting>
          </div>
        </SectionCollapsible>

        <SectionCollapsible
          isVisible={isTabThemeVisible}
          label="Theme"
          onChange={setIsTabThemeVisible}
        >
          <div class="App_SectionCol">
            <Setting label="Mode">
              <Select
                onChange={setThemeMode}
                options={colorSchemeModeOptions}
                placeholder="Color Mode"
                value={themeMode}
              />
            </Setting>
          </div>
        </SectionCollapsible>
      </div>
    </div>
  );
}
