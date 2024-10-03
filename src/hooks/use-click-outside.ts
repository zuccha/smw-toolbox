import { RefObject } from "preact";
import { useEffect } from "preact/hooks";

export default function useClickOutside(
  ref: RefObject<HTMLElement>,
  onClickOutside: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside, ref]);
}
