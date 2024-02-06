import { useStoreBoolean } from "../../hooks/use-store";

export const appSettingsId = "AppSettings";

export const useAppSettingsTabGeneralIsVisible = () =>
  useStoreBoolean(`${appSettingsId}.tab.general.isVisible`, true);

export const useAppSettingsTabResetIsVisible = () =>
  useStoreBoolean(`${appSettingsId}.tab.reset.isVisible`, true);

export const useAppSettingsTabThemeIsVisible = () =>
  useStoreBoolean(`${appSettingsId}.tab.theme.isVisible`, true);
