import { ReactNode } from "preact/compat";
import { Fragment } from "preact/jsx-runtime";
import SectionCollapsible from "./section-collapsible";
import "./tutorial.css";

//==============================================================================
// Keybindings
//==============================================================================

type TutorialKeybindingsProps = {
  id: string;
  keybindings: string[];
  rowSpan?: number;
};

function TutorialKeybindings({
  id,
  keybindings,
  rowSpan,
}: TutorialKeybindingsProps) {
  return (
    <td rowSpan={rowSpan}>
      {keybindings.length > 0
        ? keybindings.map((keybinding, index) => (
            <Fragment key={`${id}-${keybinding}`}>
              <kbd>{keybinding}</kbd>
              {index < keybindings.length - 1 && ", "}
            </Fragment>
          ))
        : "-"}
    </td>
  );
}

//==============================================================================
// Actions
//==============================================================================

export type TutorialAction = {
  name: string;
  description: string;
  keybindings: string[];
};

export type TutorialActionsProps = {
  actions: TutorialAction[];
};

function TutorialActions({ actions }: TutorialActionsProps) {
  const shouldShowKeybindings = actions.some(
    (setting) => setting.keybindings.length > 0,
  );

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          {shouldShowKeybindings && <th>Keybindings</th>}
        </tr>
      </thead>
      <tbody>
        {actions.map((action, i) => (
          <tr key={i}>
            <td
              class="Tutorial_Action_Name"
              dangerouslySetInnerHTML={{ __html: action.name }}
            />
            <td
              class="Tutorial_Action_Description"
              dangerouslySetInnerHTML={{ __html: action.description }}
            />
            {shouldShowKeybindings && (
              <TutorialKeybindings
                id={action.name}
                keybindings={action.keybindings}
              />
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

//==============================================================================
// Settings
//==============================================================================

export type TutorialSettingValue = {
  type: string;
  description: string;
};

type TutorialSettingSimple = {
  name: string;
  values: TutorialSettingValue[];
  keybindings: string[];
};

type TutorialSettingComplex = {
  name: string;
  values: (TutorialSettingValue & { keybindings: string[] })[];
};

export type TutorialSetting = TutorialSettingSimple | TutorialSettingComplex;

const isTutorialSettingSimple = (
  tutorialSetting: TutorialSetting,
): tutorialSetting is TutorialSettingSimple => {
  return "keybindings" in tutorialSetting;
};

export type TutorialSettingsProps = {
  settings: TutorialSetting[];
};

function TutorialSettings({ settings }: TutorialSettingsProps) {
  const shouldShowKeybindings = settings.some((setting) =>
    isTutorialSettingSimple(setting)
      ? setting.keybindings.length > 0
      : setting.values.some((value) => value.keybindings.length > 0),
  );

  const formatType = (type: string) =>
    type.startsWith("#") ? <i>{type.substring(1)}</i> : type;

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Value</th>
          <th>Description</th>
          {shouldShowKeybindings && <th>Keybindings</th>}
        </tr>
      </thead>
      <tbody>
        {settings.map((setting) =>
          isTutorialSettingSimple(setting)
            ? setting.values.map((value, valueIndex) => (
                <tr key={value.type}>
                  {valueIndex === 0 && (
                    <td
                      class="Tutorial_Setting_Name"
                      rowSpan={setting.values.length}
                    >
                      {setting.name}
                    </td>
                  )}
                  <td>{formatType(value.type)}</td>
                  <td class="Tutorial_Setting_Description">
                    {value.description}
                  </td>
                  {valueIndex === 0 && shouldShowKeybindings && (
                    <TutorialKeybindings
                      id={value.type}
                      keybindings={setting.keybindings}
                      rowSpan={setting.values.length}
                    />
                  )}
                </tr>
              ))
            : setting.values.map((value, valueIndex) => (
                <tr key={value.type}>
                  {valueIndex === 0 && (
                    <td
                      class="Tutorial_Setting_Name"
                      rowSpan={setting.values.length}
                    >
                      {setting.name}
                    </td>
                  )}
                  <td>{formatType(value.type)}</td>
                  <td class="Tutorial_Setting_Description">
                    {value.description}
                  </td>
                  {shouldShowKeybindings && (
                    <TutorialKeybindings
                      id={value.type}
                      keybindings={value.keybindings}
                    />
                  )}
                </tr>
              )),
        )}
      </tbody>
    </table>
  );
}

//==============================================================================
// Section
//==============================================================================

export type TutorialSectionProps = {
  children: ReactNode;
  title: string;
};

function TutorialSection({ children, title }: TutorialSectionProps) {
  return (
    <div class="Tutorial_Section">
      <div class="Tutorial_Section_Title">{`${title}:`}</div>
      {children}
    </div>
  );
}

//==============================================================================
// Tutorial
//==============================================================================

export type TutorialProps = {
  children: ReactNode;
  isVisible: boolean;
  onChangeVisibility: (value: boolean) => void;
};

export default function Tutorial({
  children,
  isVisible,
  onChangeVisibility,
}: TutorialProps) {
  return (
    <div class="Tutorial">
      <SectionCollapsible
        isVisible={isVisible}
        label="Instructions"
        onChange={onChangeVisibility}
      >
        <div class="Tutorial_Sections">{children}</div>
      </SectionCollapsible>
    </div>
  );
}

Tutorial.Section = TutorialSection;
Tutorial.Actions = TutorialActions;
Tutorial.Settings = TutorialSettings;
