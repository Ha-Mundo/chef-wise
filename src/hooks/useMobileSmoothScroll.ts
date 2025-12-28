import { useEffect } from "react";

export function useMobileSmoothScroll(ref, active) {
  useEffect(() => {
    if (!ref?.current || !active ) return;
    if (window.innerWidth <= 768) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ref, active]);
}
