import { useCallback } from "preact/hooks";
import InputBitmask from "../../components/bitmask";
import InputValue from "../../components/input-value";
import SectionCollapsible from "../../components/section-collapsible";
import Setting from "../../components/setting";
import { IntegerEncoding, IntegerUnit } from "../../models/integer";
import {
  useEmulatorInitialState,
  useEmulatorTabInitialStateIsVisible,
} from "./store";

export default function EmulatorSectionInitialState() {
  const [isTabInitialStateVisible, setIsTabInitialStateVisible] =
    useEmulatorTabInitialStateIsVisible();

  const [initialState, setInitialState] = useEmulatorInitialState();

  const setInitialA = useCallback(
    (a: number) => setInitialState((prev) => ({ ...prev, a })),
    [setInitialState],
  );

  const setInitialX = useCallback(
    (x: number) => setInitialState((prev) => ({ ...prev, x })),
    [setInitialState],
  );

  const setInitialY = useCallback(
    (y: number) => setInitialState((prev) => ({ ...prev, y })),
    [setInitialState],
  );

  const setInitialSp = useCallback(
    (sp: number) => setInitialState((prev) => ({ ...prev, sp })),
    [setInitialState],
  );

  const setInitialDp = useCallback(
    (dp: number) => setInitialState((prev) => ({ ...prev, dp })),
    [setInitialState],
  );

  const setInitialDb = useCallback(
    (db: number) => setInitialState((prev) => ({ ...prev, db })),
    [setInitialState],
  );

  const setInitialFlags = useCallback(
    (flags: number) => setInitialState((prev) => ({ ...prev, flags })),
    [setInitialState],
  );

  return (
    <SectionCollapsible
      isVisible={isTabInitialStateVisible}
      label="Initial State"
      onChange={setIsTabInitialStateVisible}
    >
      <div className="App_SectionCluster">
        <Setting label="A" size="md">
          <InputValue
            encoding={IntegerEncoding.Hex}
            onChange={setInitialA}
            placeholder="0000"
            unit={IntegerUnit.Word}
            value={initialState.a}
          />
        </Setting>

        <Setting label="X" size="md">
          <InputValue
            encoding={IntegerEncoding.Hex}
            onChange={setInitialX}
            placeholder="0000"
            unit={IntegerUnit.Word}
            value={initialState.x}
          />
        </Setting>

        <Setting label="Y" size="md">
          <InputValue
            encoding={IntegerEncoding.Hex}
            onChange={setInitialY}
            placeholder="0000"
            unit={IntegerUnit.Word}
            value={initialState.y}
          />
        </Setting>

        <Setting label="SP" size="md">
          <InputValue
            encoding={IntegerEncoding.Hex}
            onChange={setInitialSp}
            placeholder="01FC"
            unit={IntegerUnit.Word}
            value={initialState.sp}
          />
        </Setting>

        <Setting label="DP" size="md">
          <InputValue
            encoding={IntegerEncoding.Hex}
            onChange={setInitialDp}
            placeholder="0000"
            unit={IntegerUnit.Word}
            value={initialState.dp}
          />
        </Setting>

        <Setting label="DB" size="md">
          <InputValue
            encoding={IntegerEncoding.Hex}
            onChange={setInitialDb}
            placeholder="00"
            unit={IntegerUnit.Byte}
            value={initialState.db}
          />
        </Setting>

        <Setting label="Flags" size="md">
          <InputBitmask
            labelOn="NVMXDIZC"
            labelOff="nvmxdizc"
            onChange={setInitialFlags}
            size={8}
            value={initialState.flags}
          />
        </Setting>
      </div>
    </SectionCollapsible>
  );
}
