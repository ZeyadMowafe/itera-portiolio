import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Attaches a scroll-triggered reveal animation to the returned ref.
 * The element fades in + slides up when it enters the viewport.
 *
 * @param {object} options
 * @param {number} options.threshold  - IntersectionObserver threshold (0–1)
 * @param {number} options.delay      - GSAP delay in seconds
 * @param {number} options.duration   - GSAP duration in seconds
 * @param {number} options.y          - Starting Y offset in px
 */
export function useScrollReveal({
  threshold = 0.15,
  delay = 0,
  duration = 0.75,
  y = 40,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Start hidden
    gsap.set(el, { opacity: 0, y });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: "power3.out",
          });
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay, duration, y]);

  return ref;
}
