import {
  CalculatorIcon,
  TableIcon,
  SettingsIcon,
  InfoIcon,
} from "lucide-preact";
import AppInfo from "./app-info/app-info";
import { appInfoId } from "./app-info/store";
import AppSettings from "./app-settings/app-settings";
import { appSettingsId } from "./app-settings/store";
import Calculator from "./calculator/calculator";
import { calculatorId } from "./calculator/store";
import TableEditor from "./table-editor/table-editor";
import { tableEditorId } from "./table-editor/store";

export type Module = {
  Content: React.FunctionComponent;
  Icon: React.FunctionComponent<{ size?: number | string }>;
  id: string;
  name: string;
};

export const coreModules: Module[] = [
  {
    Content: Calculator,
    Icon: CalculatorIcon,
    id: calculatorId,
    name: "Calculator",
  },
  {
    Content: TableEditor,
    Icon: TableIcon,
    id: tableEditorId,
    name: "Table Editor",
  },
] as const;

export const metaModules: Module[] = [
  {
    Content: AppSettings,
    Icon: SettingsIcon,
    id: appSettingsId,
    name: "Settings",
  },
  {
    Content: AppInfo,
    Icon: InfoIcon,
    id: appInfoId,
    name: "Info",
  },
] as const;
