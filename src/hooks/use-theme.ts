import { useEffect, useLayoutEffect, useState } from "preact/hooks";
import { z } from "zod";
import useStore from "./use-store";

export enum ThemeMode {
  System,
  Dark,
  Light,
}

export const ThemeModeSchema = z.nativeEnum(ThemeMode);

export const Theme = {
  [ThemeMode.Dark]: {
    background1: "#3b3b3b",
    background2: "#242424",
    background3: "#141414",
    background4: "#0a0a0a",
    neutral1: "#f4f4f4",
    neutral2: "#a1a1a1",
    primary1: "#dca87d",
    primary2: "#de8f4e",
    primary3: "#572400",
  },
  [ThemeMode.Light]: {
    background1: "#e4e4e4",
    background2: "#f9f9f9",
    background3: "#dddddd",
    background4: "#bbbbbb",
    neutral1: "#222222",
    neutral2: "#777777",
    primary1: "#d18d55",
    primary2: "#b8590b",
    primary3: "#ddbca1",
  },
} as const;

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const getSystemMode = (isDark: boolean): ThemeMode.Dark | ThemeMode.Light =>
  isDark ? ThemeMode.Dark : ThemeMode.Light;

export function useThemeMode(
  id: string,
): [ThemeMode, (colorSchemeMode: ThemeMode) => void] {
  return useStore(`${id}.mode`, ThemeMode.System, ThemeModeSchema.parse);
}

export default function useTheme(id: string) {
  const [mode] = useThemeMode(id);

  const [systemMode, setSystemMode] = useState(
    getSystemMode(darkModeMediaQuery.matches),
  );

  useEffect(() => {
    const callback = (e: MediaQueryListEvent) =>
      setSystemMode(getSystemMode(e.matches));
    darkModeMediaQuery.addEventListener("change", callback);
    return () => darkModeMediaQuery.removeEventListener("change", callback);
  }, []);

  return mode === ThemeMode.System ? Theme[systemMode] : Theme[mode];
}

export function useThemeUpdate(id: string) {
  const colorScheme = useTheme(id);

  useLayoutEffect(() => {
    const style = document.documentElement.style;
    style.setProperty("--color-background-1", colorScheme.background1);
    style.setProperty("--color-background-2", colorScheme.background2);
    style.setProperty("--color-background-3", colorScheme.background3);
    style.setProperty("--color-background-4", colorScheme.background4);
    style.setProperty("--color-neutral-1", colorScheme.neutral1);
    style.setProperty("--color-neutral-2", colorScheme.neutral2);
    style.setProperty("--color-primary-1", colorScheme.primary1);
    style.setProperty("--color-primary-2", colorScheme.primary2);
    style.setProperty("--color-primary-3", colorScheme.primary3);
  }, [colorScheme]);
}
