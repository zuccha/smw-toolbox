import { useCallback, useEffect, useState } from "preact/hooks";
import { modules } from "../modules/modules";
import { useAppSelectedModuleId } from "./store";

export default function useNavigation(): [string, (id: string) => void] {
  const [storeId, setStoreId] = useAppSelectedModuleId();

  const getId = useCallback(() => {
    const urlId = window.location.hash.substring(1);
    const id = modules.some((module) => module.id === urlId)
      ? urlId
      : modules.some((module) => module.id === storeId)
      ? storeId
      : modules[0].id;

    if (urlId !== id) window.location.hash = `#${id}`;
    if (storeId !== id) setStoreId(id);

    return id;
  }, [setStoreId, storeId]);

  const [selectedId, setSelectedId] = useState(getId);

  const setSelectedIdAndUpdateUrl = useCallback((id: string) => {
    setSelectedId(id);
    window.location.hash = `#${id}`;
  }, []);

  useEffect(() => {
    const updateSelectedModuleId = () => setSelectedId(getId());
    window.addEventListener("popstate", updateSelectedModuleId);
    return () => window.removeEventListener("popstate", updateSelectedModuleId);
  }, [getId]);

  return [selectedId, setSelectedIdAndUpdateUrl];
}
