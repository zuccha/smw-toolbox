import { z } from "zod";

export enum ThemeMode {
  System,
  Dark,
  Light,
}

export const ThemeModeSchema = z.nativeEnum(ThemeMode);

export enum ThemeColor {
  Blue,
  Cyan,
  Green,
  Orange,
  Pink,
  Purple,
  Red,
  Yellow,
  Disco,
}

export const ThemeColorSchema = z.nativeEnum(ThemeColor);

export const Theme = {
  [ThemeMode.Dark]: {
    mode: ThemeMode.Dark,

    background1: "#3b3b3b",
    background2: "#242424",
    background3: "#141414",
    background4: "#4c4c4c",
    neutral1: "#f4f4f4",
    neutral2: "#a1a1a1",
    color: {
      [ThemeColor.Purple]: {
        primary1: "#D6BCFA",
        primary2: "#9F7AEA",
        primary3: "#322659",
      },
      [ThemeColor.Blue]: {
        primary1: "#90CDF4",
        primary2: "#4299E1",
        primary3: "#1A365D",
      },
      [ThemeColor.Cyan]: {
        primary1: "#76E4F7",
        primary2: "#0BC5EA",
        primary3: "#065666",
      },
      [ThemeColor.Green]: {
        primary1: "#68D391",
        primary2: "#48BB78",
        primary3: "#1C4532",
      },
      [ThemeColor.Yellow]: {
        primary1: "#FAF089",
        primary2: "#ECC94B",
        primary3: "#975A16",
      },
      [ThemeColor.Orange]: {
        primary1: "#F6AD55",
        primary2: "#ED8936",
        primary3: "#652B19",
      },
      [ThemeColor.Red]: {
        primary1: "#FC8181",
        primary2: "#F56565",
        primary3: "#63171B",
      },
      [ThemeColor.Pink]: {
        primary1: "#F687B3",
        primary2: "#ED64A6",
        primary3: "#521B41",
      },
    },
  },
  [ThemeMode.Light]: {
    mode: ThemeMode.Light,

    background1: "#e4e4e4",
    background2: "#f9f9f9",
    background3: "#dddddd",
    background4: "#e0e0e0",
    neutral1: "#222222",
    neutral2: "#777777",
    color: {
      [ThemeColor.Purple]: {
        primary1: "#9F7AEA",
        primary2: "#6B46C1",
        primary3: "#E9D8FD",
      },
      [ThemeColor.Blue]: {
        primary1: "#4299E1",
        primary2: "#2B6CB0",
        primary3: "#BEE3F8",
      },
      [ThemeColor.Cyan]: {
        primary1: "#0BC5EA",
        primary2: "#248DA2",
        primary3: "#C4F1F9",
      },
      [ThemeColor.Green]: {
        primary1: "#48BB78",
        primary2: "#2F855A",
        primary3: "#C6F6D5",
      },
      [ThemeColor.Yellow]: {
        primary1: "#ECC94B",
        primary2: "#A47519",
        primary3: "#FEFCBF",
      },
      [ThemeColor.Orange]: {
        primary1: "#ED8936",
        primary2: "#C05621",
        primary3: "#FEEBC8",
      },
      [ThemeColor.Red]: {
        primary1: "#F56565",
        primary2: "#C53030",
        primary3: "#FED7D7",
      },
      [ThemeColor.Pink]: {
        primary1: "#ED64A6",
        primary2: "#B83280",
        primary3: "#FED7E2",
      },
    },
  },
} as const;

export const discoFrequency = 100;
