import { useCallback, useRef, useState } from "preact/hooks";

export default function useComponentsWithCooldown<T>(
  baseItem: T,
  cooldownItem: T,
  cooldown: number,
): [T, () => void] {
  const [current, setCurrent] = useState({ item: baseItem });
  const cooldownIdRef = useRef(0);

  const startCooldown = useCallback(() => {
    setCurrent({ item: cooldownItem });
    clearTimeout(cooldownIdRef.current);
    cooldownIdRef.current = setTimeout(
      () => setCurrent({ item: baseItem }),
      cooldown,
    );
    return () => clearTimeout(cooldownIdRef.current);
  }, [baseItem, cooldown, current]);

  return [current.item, startCooldown];
}
