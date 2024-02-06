import AppSettingsSectionGeneral from "./app-settings-section-general";
import AppSettingsSectionReset from "./app-settings-section-reset";
import AppSettingsSectionTheme from "./app-settings-section-theme";

export default function AppSettings() {
  return (
    <div class="App_Module">
      <div class="App_ModuleBlock">
        <AppSettingsSectionGeneral />
        <AppSettingsSectionTheme />
        <AppSettingsSectionReset />
      </div>
    </div>
  );
}
