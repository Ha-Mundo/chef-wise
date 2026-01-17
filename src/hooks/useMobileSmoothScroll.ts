import { useEffect, RefObject } from "react";

const OFFSET = 20;      // ~5mm space before the target element
const DURATION = 400;  // animation duration in milliseconds

export function useMobileSmoothScroll(
  ref: RefObject<HTMLElement | null>,
  active: boolean
) {
  useEffect(() => {
    // Run only when active, ref exists and on mobile screens
    if (!active || !ref.current || window.innerWidth > 768) return;

    // Current scroll position
    const startScrollY = window.scrollY;
    // Final scroll position (element position minus offset)
    const targetScrollY = ref.current.getBoundingClientRect().top + startScrollY - OFFSET;
    // Total distance that needs to be scrolled
    const scrollDistance = targetScrollY - startScrollY;

    let animationStartTime: number | null = null;

    function animate(currentTime: number) {
      // Set the animation start time on the first frame
      if (!animationStartTime) animationStartTime = currentTime;

      // Animation progress between 0 and 1
      const progress = Math.min((currentTime - animationStartTime) / DURATION, 1);

      // Ease-out interpolation for a natural feeling
      const easedProgress = progress * (2 - progress);

      // Update scroll position
      window.scrollTo(0, startScrollY + scrollDistance * easedProgress);

      // Continue animation until progress reaches 1
      if (progress < 1) requestAnimationFrame(animate);
      
    }

    // Start the animation
    requestAnimationFrame(animate);
  }, [active]);
}
