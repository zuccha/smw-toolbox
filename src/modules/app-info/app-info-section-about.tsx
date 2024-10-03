import ExternalLink from "../../components/external-link";
import SectionCollapsible from "../../components/section-collapsible";
import { useAppInfoTabAboutIsVisible } from "./store";
import changelog from "./changelog";

const release = changelog[0] ?? { version: "<empty>", date: "<empty>" };

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
      <div>{`Version ${release.version} — ${release.date}`}</div>
      <div>©2024 zuccha</div>
      <div>
        <ExternalLink
          href="https://github.com/zuccha/smw-toolbox"
          label="Source code"
        />
      </div>
      <br />
      <div>
        <b>Contributing</b>
      </div>
      <div>
        <ExternalLink
          href="https://github.com/zuccha/smw-toolbox/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title="
          label="Report a bug"
        />
      </div>
      <div>
        <ExternalLink
          href="https://github.com/zuccha/smw-toolbox/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title="
          label="Suggest a feature"
        />
      </div>
    </SectionCollapsible>
  );
}
