import {
  Calculator as CalculatorIcon,
  Info as InfoIcon,
  Settings as SettingsIcon,
  Table as TableIcon,
} from "lucide-preact";
import { useMemo } from "preact/hooks";
import { z } from "zod";
import IconButton from "./components/icon-button";
import useColorScheme from "./hooks/use-color-scheme";
import useSetting from "./hooks/use-setting";
import AppSettings from "./modules/app-settings/app-settings";
import Calculator from "./modules/calculator/calculator";
import TableEditor from "./modules/table-editor/table-editor";
import { classNames } from "./utils";
import "./app.css";

const Wip = () => {
  return <div class="app-wip">WIP</div>;
};

const modules: {
  Content: React.FunctionComponent;
  Icon: React.FunctionComponent<{ size?: number | string }>;
  id: string;
  name: string;
  isWide?: boolean;
}[] = [
  {
    Content: Calculator,
    Icon: CalculatorIcon,
    id: "calculator",
    name: "Calculator",
  },
  {
    Content: TableEditor,
    Icon: TableIcon,
    id: "table-editor",
    name: "Table Editor",
    isWide: true,
  },
  {
    Content: AppSettings,
    Icon: SettingsIcon,
    id: "settings",
    name: "Settings",
  },
  {
    Content: Wip,
    Icon: InfoIcon,
    id: "about",
    name: "About",
  },
] as const;

export default function App() {
  useColorScheme();

  const [selectedModuleId, setSelectedModuleId] = useSetting(
    "app-selected-module",
    "calculator",
    z.string().parse
  );

  const Content = useMemo(
    () =>
      modules.find((module) => module.id === selectedModuleId)?.Content ??
      (() => null),
    [selectedModuleId]
  );

  return (
    <div class="app">
      <div class="app-menu">
        {modules.map((module) => {
          const className = classNames([
            ["app-menu-item", true],
            ["wide", Boolean(module.isWide)],
          ]);
          return (
            <div class={className} key={module.id}>
              <IconButton
                isSelected={module.id === selectedModuleId}
                label={<module.Icon size="2em" />}
                onClick={() => setSelectedModuleId(module.id)}
                tooltip={module.name}
                tooltipPosition="right"
              />
            </div>
          );
        })}
      </div>

      <div class="app-content">
        <Content />
      </div>
    </div>
  );
}
