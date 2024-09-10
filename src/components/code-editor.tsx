import { tags as t } from "@lezer/highlight";
import { createTheme } from "@uiw/codemirror-themes";
import CodeMirror, { ReactCodeMirrorProps } from "@uiw/react-codemirror";
import { useMemo } from "preact/hooks";
import { useAppTheme, useAppThemeColor } from "../app/store";
import { Theme, ThemeColor, ThemeMode } from "../models/theme";
import "./code-editor.css";

export type CodeEditorProps = {
  extensions?: ReactCodeMirrorProps["extensions"];
  onChange: (value: string) => void;
  value: string;
};

const themeDark = Theme[ThemeMode.Dark];
const themeLight = Theme[ThemeMode.Light];

const getTheme = (mode: ThemeMode, color: ThemeColor) => {
  const themeDarkColor =
    color === ThemeColor.Disco
      ? themeDark.color[ThemeColor.Blue]
      : themeDark.color[color];
  const themeLightColor =
    color === ThemeColor.Disco
      ? themeLight.color[ThemeColor.Blue]
      : themeLight.color[color];

  return mode === ThemeMode.Dark
    ? createTheme({
        theme: "dark",
        settings: {
          background: themeDark.background2,
          foreground: themeDark.neutral1,
          caret: themeDarkColor.primary2,
          selection: `${themeDarkColor.primary1}55`,
          selectionMatch: `${themeDarkColor.primary1}55`,
          lineHighlight: `${themeDarkColor.primary1}11`,
          gutterBackground: themeDark.background1,
          gutterForeground: themeDark.neutral2,
          gutterActiveForeground: themeDark.neutral1,
          // gutterBorder: ???,
          fontFamily: "monospace",
          fontSize: "1em",
        },
        styles: [
          { tag: t.comment, color: "#78a178" },
          { tag: t.derefOperator, color: "#a1a1a1" },
          { tag: t.keyword, color: "#81a1c1" },
          { tag: t.number, color: "#c57d83" },
          { tag: t.paren, color: "#8c81b4" },
          { tag: t.variableName, color: "#e0cf81" },
        ],
      })
    : createTheme({
        theme: "light",
        settings: {
          background: themeLight.background2,
          foreground: themeLight.neutral1,
          caret: themeLightColor.primary2,
          selection: `${themeLightColor.primary1}55`,
          selectionMatch: `${themeLightColor.primary1}55`,
          lineHighlight: `${themeLightColor.primary1}22`,
          gutterBackground: themeLight.background1,
          gutterForeground: themeLight.neutral2,
          gutterActiveForeground: themeLight.neutral1,
          // gutterBorder: ???,
          fontFamily: "monospace",
          fontSize: "1em",
        },
        styles: [
          { tag: t.comment, color: "#365736" },
          { tag: t.derefOperator, color: "#777777" },
          { tag: t.keyword, color: "#384d61" },
          { tag: t.number, color: "#733d41" },
          { tag: t.paren, color: "#504673" },
          { tag: t.variableName, color: "#968845" },
        ],
      });
};

const basicSetup = {
  completionKeymap: false,
  foldGutter: false,
  foldKeymap: false,
  highlightSpecialChars: false,
  lintKeymap: false,
  searchKeymap: false,
};

export default function CodeEditor({
  extensions,
  onChange,
  value,
}: CodeEditorProps) {
  const appTheme = useAppTheme();
  const [appThemeColor] = useAppThemeColor();

  const theme = useMemo(
    () => getTheme(appTheme.mode, appThemeColor),
    [appTheme.mode, appThemeColor],
  );

  return (
    <div className="CodeEditor">
      <CodeMirror
        autoFocus
        basicSetup={basicSetup}
        extensions={extensions}
        indentWithTab={false}
        maxHeight="50em"
        minHeight="25em"
        onChange={onChange}
        theme={theme}
        value={value}
      />
    </div>
  );
}
