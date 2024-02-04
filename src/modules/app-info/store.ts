import { useStoreBoolean } from "../../hooks/use-store";

export const appInfoId = "AppInfo";

export const useAppInfoTabAboutIsVisible = () =>
  useStoreBoolean(`${appInfoId}.tab.about.isVisible`, true);

export const useAppInfoTabChangelogIsVisible = () =>
  useStoreBoolean(`${appInfoId}.tab.changelog.isVisible`, false);

export const useAppInfoTabLicenseIsVisible = () =>
  useStoreBoolean(`${appInfoId}.tab.license.isVisible`, false);
