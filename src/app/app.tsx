import { useMemo } from "preact/hooks";
import Button from "../components/button";
import useHotkeys from "../hooks/use-hotkeys";
import {
  Module,
  metaModules,
  modules,
  widgetModules,
} from "../modules/modules";
import { ok } from "../utils";
import { useAppThemeUpdate } from "./store";
import useNavigation from "./use-navigation";
import "./app.css";

type AppMenuItemProps = {
  index: number;
  isSelected: boolean;
  module: Module;
  onClick: () => void;
};

function AppMenuItem({ index, isSelected, module, onClick }: AppMenuItemProps) {
  return (
    <div class="App_Menu_Item">
      <Button
        isBorderless
        isSelected={isSelected}
        label={<module.Icon size="2em" />}
        onClick={onClick}
        tooltip={`${module.name} (Ctrl+${index})`}
        tooltipPosition="right"
      />
    </div>
  );
}

export default function App() {
  useAppThemeUpdate();

  const [selectedModuleId, setSelectedModuleId] = useNavigation();

  const Content = useMemo(
    () =>
      modules.find((module) => module.id === selectedModuleId)?.Content ??
      (() => null),
    [selectedModuleId],
  );

  const hotkeys = useMemo(
    () =>
      modules.flatMap((module, i) => [
        {
          key: `${i + 1}`,
          ctrl: true,
          onPress: () => ok(setSelectedModuleId(module.id)),
        },
        {
          key: `${i + 1}`,
          meta: true,
          onPress: () => ok(setSelectedModuleId(module.id)),
        },
      ]),
    [setSelectedModuleId],
  );

  useHotkeys(hotkeys);

  return (
    <div class="App">
      <div class="App_Menu">
        {widgetModules.map((module, i) => (
          <AppMenuItem
            index={i + 1}
            isSelected={module.id === selectedModuleId}
            key={module.id}
            module={module}
            onClick={() => setSelectedModuleId(module.id)}
          />
        ))}

        <div class="flex_1" />

        {metaModules.map((module, i) => (
          <div class="App_Menu_Item" key={module.id}>
            <AppMenuItem
              index={widgetModules.length + i + 1}
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
