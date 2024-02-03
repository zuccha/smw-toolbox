import { useStoreString } from "../hooks/use-store";
import { calculatorId } from "./calculator/store";

export const appId = "App";

export const useAppModuleSelected = () =>
  useStoreString(`${appId}.module.selected`, calculatorId);
