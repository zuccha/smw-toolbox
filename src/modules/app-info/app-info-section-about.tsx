import SectionCollapsible from "../../components/section-collapsible";
import { useAppInfoTabAboutIsVisible } from "./store";

export default function AppInfoSectionAbout() {
  const [isTabAboutVisible, setIsTabAboutVisible] =
    useAppInfoTabAboutIsVisible();

  return (
    <SectionCollapsible
      isVisible={isTabAboutVisible}
      label="Info"
      onChange={setIsTabAboutVisible}
    >
      <div>
        <b>SMW Toolbox: Tools for hacking Super Mario World</b>
      </div>
      <div>Version 1.0.1 &#8212; 2024/09/08</div>
      <div>©2024 zuccha</div>
      <div>
        <a href="https://github.com/zuccha/smw-toolbox" target="_blank">
          Source code
        </a>
      </div>
    </SectionCollapsible>
  );
}
