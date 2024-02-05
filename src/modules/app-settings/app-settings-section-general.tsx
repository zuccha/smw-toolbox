import SectionCollapsible from "../../components/section-collapsible";
import AppSettingsSettingHotkeysIsEnabled from "./app-settings-setting-hotkeys-is-enabled";
import { useAppSettingsTabGeneralIsVisible } from "./store";

export default function AppSettingsSectionGeneral() {
  const [isTabGeneralVisible, setIsTabGeneralVisible] =
    useAppSettingsTabGeneralIsVisible();

  return (
    <SectionCollapsible
      isVisible={isTabGeneralVisible}
      label="General"
      onChange={setIsTabGeneralVisible}
    >
      <AppSettingsSettingHotkeysIsEnabled />
    </SectionCollapsible>
  );
}
