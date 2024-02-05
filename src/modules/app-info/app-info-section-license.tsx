import SectionCollapsible from "../../components/section-collapsible";
import { useAppInfoTabLicenseIsVisible } from "./store";

export default function AppInfoSectionLicense() {
  const [isTabLicenseVisible, setIsTabLicenseVisible] =
    useAppInfoTabLicenseIsVisible();

  return (
    <SectionCollapsible
      isVisible={isTabLicenseVisible}
      label="License"
      onChange={setIsTabLicenseVisible}
    >
      <div class="App_SectionCol">
        <div>
          The SMW Toolbox program (hereafter referred to as the "Software") is
          not official or supported by Nintendo, nor any other commercial
          entity.
        </div>
        <div>
          The Software is freeware thus it can be distributed freely provided
          the following conditions hold: (1) The Software is not distributed
          with or as part of any ROM image in any format, and (2) No goods,
          services, or money can be charged for the Software in any form, nor
          may it be included in conjunction with any other offer or monetary
          exchange.
        </div>
        <div>
          The Software is provided AS IS, and its use is at your own risk.
          Anyone mentioned in its documentation will not be held liable for any
          damages, direct or otherwise, arising from its use or presence.
        </div>
      </div>
    </SectionCollapsible>
  );
}
