import { CopyIcon, CheckIcon } from "lucide-preact";
import { useCallback } from "preact/hooks";
import { Icon } from "../components/icon-button";
import useAlternateComponentsWithCooldown from "./use-alternate-components-with-cooldown";

export default function useCopyWithIcon(): [Icon, (text: string) => void] {
  const [CopyOrCheckIcon, startCopyCooldown] =
    useAlternateComponentsWithCooldown(CopyIcon, CheckIcon, 1000);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    startCopyCooldown();
  }, []);

  return [CopyOrCheckIcon, copyToClipboard];
}
