import SectionStatic from "../../components/section-static";
import Select from "../../components/select";
import Setting from "../../components/setting";
import {
  ColorSchemeMode,
  useColorSchemeMode,
} from "../../hooks/use-color-scheme";

const colorSchemeModeOptions = [
  { label: "System", value: ColorSchemeMode.System },
  { label: "Dark", value: ColorSchemeMode.Dark },
  { label: "Light", value: ColorSchemeMode.Light },
];

export default function AppSettings() {
  const [colorSchemeMode, setColorSchemeMode] = useColorSchemeMode();

  return (
    <div class="app-settings _module">
      <SectionStatic label="Global Settings">
        <div class="_section-col">
          <Setting label="Color Mode">
            <Select
              onChange={setColorSchemeMode}
              options={colorSchemeModeOptions}
              placeholder="Color Mode"
              value={colorSchemeMode}
            />
          </Setting>
        </div>
      </SectionStatic>
    </div>
  );
}
