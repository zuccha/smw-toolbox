import { useEffect, useLayoutEffect, useRef, useState } from "preact/hooks";
import {
  ThemeMode,
  ThemeModeSchema,
  Theme,
  ThemeColor,
  ThemeColorSchema,
  discoFrequency,
} from "../models/theme";
import useStore from "./use-store";

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const getSystemMode = (isDark: boolean): ThemeMode.Dark | ThemeMode.Light =>
  isDark ? ThemeMode.Dark : ThemeMode.Light;

export function useThemeColor(
  id: string,
): [ThemeColor, (themeColor: ThemeColor) => void] {
  return useStore(`${id}.color`, ThemeColor.Orange, ThemeColorSchema.parse);
}

export function useThemeMode(
  id: string,
): [ThemeMode, (themeMode: ThemeMode) => void] {
  return useStore(`${id}.mode`, ThemeMode.System, ThemeModeSchema.parse);
}

export default function useTheme(id: string) {
  const [userMode] = useThemeMode(id);

  const [systemMode, setSystemMode] = useState(
    getSystemMode(darkModeMediaQuery.matches),
  );

  useEffect(() => {
    const callback = (e: MediaQueryListEvent) =>
      setSystemMode(getSystemMode(e.matches));
    darkModeMediaQuery.addEventListener("change", callback);
    return () => darkModeMediaQuery.removeEventListener("change", callback);
  }, []);

  return userMode === ThemeMode.System ? Theme[systemMode] : Theme[userMode];
}

export function useThemeUpdate(id: string) {
  const rotateColorsIdRef = useRef(0);

  const [color] = useThemeColor(id);
  const theme = useTheme(id);

  useLayoutEffect(() => {
    const style = document.documentElement.style;
    style.setProperty("--color-background-1", theme.background1);
    style.setProperty("--color-background-2", theme.background2);
    style.setProperty("--color-background-3", theme.background3);
    style.setProperty("--color-background-4", theme.background4);
    style.setProperty("--color-neutral-1", theme.neutral1);
    style.setProperty("--color-neutral-2", theme.neutral2);
    if (color === ThemeColor.Disco) {
      const colors = Object.values(theme.color);
      const primary1Colors: string[] = colors.map(({ primary1 }) => primary1);
      const primary2Colors: string[] = colors.map(({ primary2 }) => primary2);
      const primary3Colors: string[] = colors.map(({ primary3 }) => primary3);
      let colorIndex = 0;

      const rotateColors = () => {
        style.setProperty("--color-primary-1", primary1Colors[colorIndex]!);
        style.setProperty("--color-primary-2", primary2Colors[colorIndex]!);
        style.setProperty("--color-primary-3", primary3Colors[colorIndex]!);
        colorIndex = (colorIndex + 1) % colors.length;
      };

      clearInterval(rotateColorsIdRef.current);
      rotateColorsIdRef.current = setInterval(rotateColors, discoFrequency);
      return () => clearInterval(rotateColorsIdRef.current);
    } else {
      style.setProperty("--color-primary-1", theme.color[color].primary1);
      style.setProperty("--color-primary-2", theme.color[color].primary2);
      style.setProperty("--color-primary-3", theme.color[color].primary3);
    }
  }, [color, theme]);
}
