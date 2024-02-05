import { useAppHotkeysIsEnabled } from "../../app/store";
import RadioGroup, { RadioGroupOption } from "../../components/radio-group";
import Setting from "../../components/setting";

const binaryOptions: RadioGroupOption<boolean>[] = [
  { label: "On", value: true },
  { label: "Off", value: false },
] as const;

export default function AppSettingsSettingHotkeysIsEnabled() {
  const [isHotkeysEnabled, setIsHotkeysEnabled] = useAppHotkeysIsEnabled();

  return (
    <Setting hotkey="K" label="Hotkeys">
      <RadioGroup
        onChange={setIsHotkeysEnabled}
        options={binaryOptions}
        value={isHotkeysEnabled}
      />
    </Setting>
  );
}
