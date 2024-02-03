import { useMemo } from "preact/hooks";
import Button from "../components/button";
import { Module, coreModules, metaModules } from "../modules/modules";
import { useAppModuleSelected } from "../modules/store";
import { useAppThemeUpdate } from "./store";
import "../app/app.css";

export const modules = [...coreModules, ...metaModules] as const;

type AppMenuItemProps = {
  isSelected: boolean;
  module: Module;
  onClick: () => void;
};

function AppMenuItem({ isSelected, module, onClick }: AppMenuItemProps) {
  return (
    <div class="App_Menu_Item">
      <Button
        isBorderless
        isSelected={isSelected}
        label={<module.Icon size="2em" />}
        onClick={onClick}
        tooltip={module.name}
        tooltipPosition="right"
      />
    </div>
  );
}

export default function App() {
  useAppThemeUpdate();

  const [selectedModuleId, setSelectedModuleId] = useAppModuleSelected();

  const Content = useMemo(
    () =>
      modules.find((module) => module.id === selectedModuleId)?.Content ??
      (() => null),
    [selectedModuleId],
  );

  return (
    <div class="App">
      <div class="App_Menu">
        {coreModules.map((module) => (
          <AppMenuItem
            isSelected={module.id === selectedModuleId}
            key={module.id}
            module={module}
            onClick={() => setSelectedModuleId(module.id)}
          />
        ))}

        <div class="flex_1" />

        {metaModules.map((module) => (
          <div class="App_Menu_Item" key={module.id}>
            <AppMenuItem
              isSelected={module.id === selectedModuleId}
              key={module.id}
              module={module}
              onClick={() => setSelectedModuleId(module.id)}
            />
          </div>
        ))}
      </div>

      <div class="App_Content">
        <Content />
      </div>
    </div>
  );
}
