import { useStoreBoolean } from "../hooks/use-store";
import useTheme, {
  useThemeColor,
  useThemeMode,
  useThemeUpdate,
} from "../hooks/use-theme";

export const appId = "App";

export const useAppHotkeysIsEnabled = () =>
  useStoreBoolean(`${appId}.hotkeys.isEnabled`, true);

export const useAppTheme = () => useTheme(`${appId}.theme`);

export const useAppThemeColor = () => useThemeColor(`${appId}.theme`);

export const useAppThemeMode = () => useThemeMode(`${appId}.theme`);

export const useAppThemeUpdate = () => useThemeUpdate(`${appId}.theme`);
