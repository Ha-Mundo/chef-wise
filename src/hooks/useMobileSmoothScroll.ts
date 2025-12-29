import { useEffect, RefObject } from "react";

export function useMobileSmoothScroll(
  ref: RefObject<HTMLElement | null>,
  active: boolean
): void {
  useEffect(() => {
    if (!active || !ref.current) return;

    if (window.innerWidth <= 768) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [active, ref]);
}
