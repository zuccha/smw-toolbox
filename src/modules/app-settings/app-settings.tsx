import AppSettingsSectionGeneral from "./app-settings-section-general";
import AppSettingsSectionTheme from "./app-settings-section-theme";

export default function AppSettings() {
  return (
    <div class="App_Module">
      <div class="App_ModuleBlock">
        <AppSettingsSectionGeneral />
        <AppSettingsSectionTheme />
      </div>
    </div>
  );
}
