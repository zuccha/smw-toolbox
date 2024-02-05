import SectionCollapsible from "../../components/section-collapsible";
import AppSettingsSettingThemeColor from "./app-settings-setting-theme-color";
import AppSettingsSettingThemeMode from "./app-settings-setting-theme-mode";
import { useAppSettingsTabThemeIsVisible } from "./store";

export default function AppSettingsSectionTheme() {
  const [isTabThemeVisible, setIsTabThemeVisible] =
    useAppSettingsTabThemeIsVisible();

  return (
    <SectionCollapsible
      isVisible={isTabThemeVisible}
      label="Theme"
      onChange={setIsTabThemeVisible}
    >
      <div class="App_SectionRow">
        <AppSettingsSettingThemeMode />
        <AppSettingsSettingThemeColor />
      </div>
    </SectionCollapsible>
  );
}
