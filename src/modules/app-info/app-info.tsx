import AppInfoSectionAbout from "./app-info-section-about";
import AppInfoSectionChangelog from "./app-info-section-changelog";
import AppInfoSectionLicense from "./app-info-section-license";

export default function AppInfo() {
  return (
    <div class="App_Module">
      <div class="App_ModuleBlock">
        <AppInfoSectionAbout />
        <AppInfoSectionChangelog />
        <AppInfoSectionLicense />
      </div>
    </div>
  );
}
