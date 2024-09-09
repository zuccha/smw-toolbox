import { useStoreBoolean } from "../../hooks/use-store";

export const emulatorId = "Emulator";

export const useEmulatorTabSnesIsVisible = () =>
  useStoreBoolean(`${emulatorId}.tab.snes.isVisible`, true);
