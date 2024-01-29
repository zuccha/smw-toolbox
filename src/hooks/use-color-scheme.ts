import { useEffect, useLayoutEffect, useState } from "preact/hooks";
import { z } from "zod";
import useSetting from "./use-setting";

export enum ColorSchemeMode {
  System,
  Dark,
  Light,
}

export const ColorSchemeModeSchema = z.nativeEnum(ColorSchemeMode);

const ColorSchemes = {
  [ColorSchemeMode.Dark]: {
    background1: "#3b3b3b",
    background2: "#242424",
    background3: "#141414",
    neutral1: "rgba(255, 255, 255, 0.87)",
    neutral2: "rgba(255, 255, 255, 0.4)",
    primary1: "#dca87d",
    primary2: "#de8f4e",
    primary3: "#572400",
  },
  [ColorSchemeMode.Light]: {
    background1: "#e4e4e4",
    background2: "#f9f9f9",
    background3: "#dddddd",
    neutral1: "#222222",
    neutral2: "#777777",
    primary1: "#d18d55",
    primary2: "#b8590b",
    primary3: "#ddbca1",
  },
} as const;

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const getSystemMode = (
  isDark: boolean
): ColorSchemeMode.Dark | ColorSchemeMode.Light =>
  isDark ? ColorSchemeMode.Dark : ColorSchemeMode.Light;

export function useColorSchemeMode(): [
  ColorSchemeMode,
  (colorSchemeMode: ColorSchemeMode) => void
] {
  return useSetting(
    "app-color-scheme-mode",
    ColorSchemeMode.System,
    ColorSchemeModeSchema.parse
  );
}

export default function useColorScheme() {
  const [mode] = useColorSchemeMode();

  const [systemMode, setSystemMode] = useState(
    getSystemMode(darkModeMediaQuery.matches)
  );

  useEffect(() => {
    const callback = (e: MediaQueryListEvent) =>
      setSystemMode(getSystemMode(e.matches));
    darkModeMediaQuery.addEventListener("change", callback);
    return () => darkModeMediaQuery.removeEventListener("change", callback);
  }, []);

  useLayoutEffect(() => {
    const colorScheme =
      mode === ColorSchemeMode.System
        ? ColorSchemes[systemMode]
        : ColorSchemes[mode];

    const style = document.documentElement.style;
    style.setProperty("--color-background-1", colorScheme.background1);
    style.setProperty("--color-background-2", colorScheme.background2);
    style.setProperty("--color-background-3", colorScheme.background3);
    style.setProperty("--color-neutral-1", colorScheme.neutral1);
    style.setProperty("--color-neutral-2", colorScheme.neutral2);
    style.setProperty("--color-primary-1", colorScheme.primary1);
    style.setProperty("--color-primary-2", colorScheme.primary2);
    style.setProperty("--color-primary-3", colorScheme.primary3);
  }, [mode, systemMode]);
}
