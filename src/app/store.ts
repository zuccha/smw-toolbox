import { useStoreBoolean } from "../hooks/use-store";
import { useThemeMode, useThemeUpdate } from "../hooks/use-theme";

export const appId = "App";

export const useAppHotkeysIsEnabled = () =>
  useStoreBoolean(`${appId}.hotkeys.isEnabled`, true);

export const useAppThemeMode = () => useThemeMode(`${appId}.theme`);

export const useAppThemeUpdate = () => useThemeUpdate(`${appId}.theme`);
