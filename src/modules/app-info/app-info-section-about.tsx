import { ExternalLinkIcon } from "lucide-preact";
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
        <a href="https://github.com/zuccha/smw-toolbox" target="_blank">
          Source code <ExternalLinkIcon size="0.8em" />
        </a>
      </div>
      <br />
      <div>
        <b>Contributing</b>
      </div>
      <div>
        <a
          href="https://github.com/zuccha/smw-toolbox/issues/new?assignees=&labels=bug&projects=&template=bug_report.md&title="
          target="_blank"
        >
          Report a bug <ExternalLinkIcon size="0.8em" />
        </a>
      </div>
      <div>
        <a
          href="https://github.com/zuccha/smw-toolbox/issues/new?assignees=&labels=enhancement&projects=&template=feature_request.md&title="
          target="_blank"
        >
          Suggest a feature <ExternalLinkIcon size="0.8em" />
        </a>
      </div>
    </SectionCollapsible>
  );
}
