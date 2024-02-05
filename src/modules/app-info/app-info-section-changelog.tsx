import Changelog from "../../components/changelog";
import SectionCollapsible from "../../components/section-collapsible";
import changelog from "./changelog";
import { useAppInfoTabChangelogIsVisible } from "./store";

export default function AppInfoSectionChangelog() {
  const [isTabChangelogVisible, setIsTabChangelogVisible] =
    useAppInfoTabChangelogIsVisible();

  return (
    <SectionCollapsible
      isVisible={isTabChangelogVisible}
      label="Changelog"
      onChange={setIsTabChangelogVisible}
    >
      <Changelog changelog={changelog} />
    </SectionCollapsible>
  );
}
