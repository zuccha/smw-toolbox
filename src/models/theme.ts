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
    error1: "#F56565",
    neutral1: "#f4f4f4",
    neutral2: "#a1a1a1",
    color: {
      [ThemeColor.Purple]: {
        primary1: "#D6BCFA",
        primary2: "#9F7AEA",
        primary3: "#322659",
        highlight1: "#D6BCFA55",
        highlight2: "#D6BCFA22",
      },
      [ThemeColor.Blue]: {
        primary1: "#90CDF4",
        primary2: "#4299E1",
        primary3: "#1A365D",
        highlight1: "#90CDF455",
        highlight2: "#90CDF422",
      },
      [ThemeColor.Cyan]: {
        primary1: "#76E4F7",
        primary2: "#0BC5EA",
        primary3: "#065666",
        highlight1: "#76E4F755",
        highlight2: "#76E4F722",
      },
      [ThemeColor.Green]: {
        primary1: "#68D391",
        primary2: "#48BB78",
        primary3: "#1C4532",
        highlight1: "#68D39155",
        highlight2: "#68D39122",
      },
      [ThemeColor.Yellow]: {
        primary1: "#FAF089",
        primary2: "#ECC94B",
        primary3: "#975A16",
        highlight1: "#FAF08955",
        highlight2: "#FAF08922",
      },
      [ThemeColor.Orange]: {
        primary1: "#F6AD55",
        primary2: "#ED8936",
        primary3: "#652B19",
        highlight1: "#F6AD5555",
        highlight2: "#F6AD5522",
      },
      [ThemeColor.Red]: {
        primary1: "#FC8181",
        primary2: "#F56565",
        primary3: "#63171B",
        highlight1: "#FC818155",
        highlight2: "#FC818122",
      },
      [ThemeColor.Pink]: {
        primary1: "#F687B3",
        primary2: "#ED64A6",
        primary3: "#521B41",
        highlight1: "#F687B355",
        highlight2: "#F687B322",
      },
    },
  },
  [ThemeMode.Light]: {
    mode: ThemeMode.Light,

    background1: "#e4e4e4",
    background2: "#f9f9f9",
    background3: "#dddddd",
    background4: "#e0e0e0",
    error1: "#C53030",
    neutral1: "#222222",
    neutral2: "#777777",
    color: {
      [ThemeColor.Purple]: {
        primary1: "#9F7AEA",
        primary2: "#6B46C1",
        primary3: "#E9D8FD",
        highlight1: "#9F7AEA55",
        highlight2: "#9F7AEA22",
      },
      [ThemeColor.Blue]: {
        primary1: "#4299E1",
        primary2: "#2B6CB0",
        primary3: "#BEE3F8",
        highlight1: "#4299E155",
        highlight2: "#4299E122",
      },
      [ThemeColor.Cyan]: {
        primary1: "#0BC5EA",
        primary2: "#248DA2",
        primary3: "#C4F1F9",
        highlight1: "#0BC5EA55",
        highlight2: "#0BC5EA22",
      },
      [ThemeColor.Green]: {
        primary1: "#48BB78",
        primary2: "#2F855A",
        primary3: "#C6F6D5",
        highlight1: "#48BB7855",
        highlight2: "#48BB7822",
      },
      [ThemeColor.Yellow]: {
        primary1: "#ECC94B",
        primary2: "#A47519",
        primary3: "#FEFCBF",
        highlight1: "#ECC94B55",
        highlight2: "#ECC94B22",
      },
      [ThemeColor.Orange]: {
        primary1: "#ED8936",
        primary2: "#C05621",
        primary3: "#FEEBC8",
        highlight1: "#ED893655",
        highlight2: "#ED893622",
      },
      [ThemeColor.Red]: {
        primary1: "#F56565",
        primary2: "#C53030",
        primary3: "#FED7D7",
        highlight1: "#F5656555",
        highlight2: "#F5656522",
      },
      [ThemeColor.Pink]: {
        primary1: "#ED64A6",
        primary2: "#B83280",
        primary3: "#FED7E2",
        highlight1: "#ED64A655",
        highlight2: "#ED64A622",
      },
    },
  },
} as const;

export const discoFrequency = 100;
