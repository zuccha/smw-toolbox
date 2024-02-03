import {
  CalculatorIcon,
  TableIcon,
  SettingsIcon,
  InfoIcon,
} from "lucide-preact";
import AppSettings from "./app-settings/app-settings";
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
    id: "settings",
    name: "Settings",
  },
  {
    Content: () => null,
    Icon: InfoIcon,
    id: "about",
    name: "About",
  },
] as const;
