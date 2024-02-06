import {
  CalculatorIcon,
  TableIcon,
  SettingsIcon,
  InfoIcon,
} from "lucide-preact";
import AppInfo from "./app-info/app-info";
import AppSettings from "./app-settings/app-settings";
import Calculator from "./calculator/calculator";
import TableEditor from "./table-editor/table-editor";

export type Module = {
  Content: React.FunctionComponent;
  Icon: React.FunctionComponent<{ size?: number | string }>;
  id: string;
  name: string;
};

export const widgetModules = [
  {
    Content: Calculator,
    Icon: CalculatorIcon,
    id: "/w/calculator",
    name: "Calculator",
  },
  {
    Content: TableEditor,
    Icon: TableIcon,
    id: "/w/table-editor",
    name: "Table Editor",
  },
] as const;

export const metaModules = [
  {
    Content: AppSettings,
    Icon: SettingsIcon,
    id: "/settings",
    name: "Settings",
  },
  {
    Content: AppInfo,
    Icon: InfoIcon,
    id: "/info",
    name: "Info",
  },
] as const;

export const modules = [...widgetModules, ...metaModules] as const;
