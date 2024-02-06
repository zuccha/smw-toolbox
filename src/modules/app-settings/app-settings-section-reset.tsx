import Button from "../../components/button";
import SectionCollapsible from "../../components/section-collapsible";
import Storage from "../../store/storage";
import { useAppSettingsTabResetIsVisible } from "./store";

export default function AppSettingsSectionReset() {
  const [isTabResetVisible, setIsTabResetVisible] =
    useAppSettingsTabResetIsVisible();

  return (
    <SectionCollapsible
      isVisible={isTabResetVisible}
      label="Reset"
      onChange={setIsTabResetVisible}
    >
      <div class="App_SectionCol">
        This operation will restore all settings to their default values and
        clear all data from the application (e.g., images, tables, calculator,
        etc.).
        <div class="App_SectionActions font-size_l">
          <Button label="Reset" onClick={Storage.clear} />
        </div>
      </div>
    </SectionCollapsible>
  );
}
