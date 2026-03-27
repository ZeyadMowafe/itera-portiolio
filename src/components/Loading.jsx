import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Loading.css";

export default function Loading({ onComplete }) {
  const containerRef  = useRef(null);
  const arc1Ref       = useRef(null);
  const arc2Ref       = useRef(null);
  const logoWrapRef   = useRef(null);
  const wordmarkRef   = useRef(null);
  const lettersRef    = useRef([]);
  const ambientRef    = useRef(null);
  const glowRef       = useRef(null);
  const lineRef       = useRef(null);

  useEffect(() => {
    const arc1     = arc1Ref.current;
    const arc2     = arc2Ref.current;
    const logoWrap = logoWrapRef.current;
    const wordmark = wordmarkRef.current;
    const letters  = lettersRef.current;
    const ambient  = ambientRef.current;
    const glow     = glowRef.current;
    const line     = lineRef.current;

    // CSS already hides everything on paint.
    // gsap.set syncs GSAP's internal values to match CSS starting states.
    gsap.set(arc1,    { x: 600,  opacity: 0 });
    gsap.set(arc2,    { x: -600, opacity: 0 });
    gsap.set(wordmark,{ opacity: 0 });
    gsap.set(letters, { opacity: 0, y: 24, filter: "blur(8px)" });
    gsap.set(ambient, { opacity: 0, scale: 0.4 });
    gsap.set(glow,    { opacity: 0, scale: 0.2 });
    gsap.set(line,    { scaleX: 0, opacity: 0, transformOrigin: "center" });

    const tl = gsap.timeline();

    // 1 — Ambient glow blooms in
    tl.to(ambient, {
      opacity: 1, scale: 1,
      duration: 0.85, ease: "power2.out",
    })

    // 2 — Both arcs fly in from opposite sides at the same time
    .to(arc1, {
      x: 0, opacity: 1,
      duration: 0.9, ease: "power3.out",
    }, "-=0.35")
    .to(arc2, {
      x: 0, opacity: 1,
      duration: 0.9, ease: "power3.out",
    }, "<")

    // 3 — Collision: bump + elastic settle
    .to(logoWrap, {
      scale: 1.06, duration: 0.12, ease: "power2.out",
    })
    .to(logoWrap, {
      scale: 1, duration: 0.55, ease: "elastic.out(1, 0.48)",
    })

    // Glow burst on collision
    .to(glow, {
      opacity: 1, scale: 1,
      duration: 0.18, ease: "power2.out",
    }, "-=0.6")
    .to(glow, {
      opacity: 0, scale: 1.6,
      duration: 0.5, ease: "power2.in",
    }, "-=0.1")

    // 4 — Thin line draws in under logo
    .to(line, {
      scaleX: 1, opacity: 1,
      duration: 0.5, ease: "power3.out",
    }, "-=0.25")

    // 5 — ITERA: each letter fades + slides up
    .set(wordmark, { opacity: 1 })
    .fromTo(letters,
      { opacity: 0, y: 24, filter: "blur(8px)" },
      {
        opacity: 1, y: 0, filter: "blur(0px)",
        duration: 0.48,
        stagger: { amount: 0.3, ease: "power1.out" },
        ease: "power3.out",
      }, "-=0.05"
    )

    // 6 — Hold
    .to({}, { duration: 0.7 })

    // 7 — EXIT: arcs slide back to their sides
    .to(arc1, {
      x: 600, opacity: 0,
      duration: 0.55, ease: "power3.in",
    })
    .to(arc2, {
      x: -600, opacity: 0,
      duration: 0.55, ease: "power3.in",
    }, "<")

    // Wordmark + line fade up and out
    .to([wordmark, line], {
      opacity: 0, y: -16,
      duration: 0.35, ease: "power2.in",
    }, "-=0.4")

    // Ambient dissolves
    .to(ambient, {
      opacity: 0, scale: 1.8,
      duration: 0.4, ease: "power2.in",
    }, "-=0.35")

    // Screen fades to black
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.4, ease: "power2.inOut",
      onComplete,
    }, "-=0.12");

    return () => tl.kill();
  }, [onComplete]);

  const itera = "ITERA".split("");

  return (
    <div ref={containerRef} className="loading-screen">

      {/* Background radial glow */}
      <div ref={ambientRef} className="loading-ambient" />

      <div className="loading-center">

        {/* Logo assembly area */}
        <div ref={logoWrapRef} className="loading-logo-wrap">

          {/* Collision flash */}
          <div ref={glowRef} className="loading-glow-burst" />

          <svg
            viewBox="0 0 658.56 514.5"
            className="loading-logo-svg"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="ld-g1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"    />
                <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.92" />
              </linearGradient>
              <linearGradient id="ld-g2" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"    />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.88" />
              </linearGradient>
              <filter id="ld-glow-f">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4.5" result="b" />
                <feMerge>
                  <feMergeNode in="b"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Arc 1 — upper arrow — enters from RIGHT */}
            <g
              ref={arc1Ref}
              className="loading-arc-group-1"
            >
              <path
                fill="url(#ld-g1)"
                filter="url(#ld-glow-f)"
                d="M148.74,194.38s77.85-60.3,184.63-66.05l-6.13-6.88s-2.57-7.71,10.81-6.5l47.65,6.58s15.73.91,7.87,9.68l-19.97,19.06s-6.35,6.81-14.97,1.36l-12.1-12.71s-138.7,20.87-176.37,58.99c0,0-77.14,60.59-7.26,111.75,0,0,27.68,18.94,34.94,18.03,0,0,29.95,5.45,5.45-13.16-24.5-18.6-63.53-54.45,7.26-89.39,0,0,64.89-33.13,152.92-45.38,0,0,107.54-15.88,117.98-13.16,0,0,24.05-.91,0-14.52,0,0-88.03-50.82-130.69-60.35,0,0-128.42,15.88-186.5,65.34,0,0-59.5,49.54-15.53,37.31Z"
              />
            </g>

            {/* Arc 2 — lower arrow — enters from LEFT */}
            <g
              ref={arc2Ref}
              className="loading-arc-group-2"
            >
              <path
                fill="url(#ld-g2)"
                filter="url(#ld-glow-f)"
                d="M509.81,320.12s-77.85,60.3-184.63,66.05l6.13,6.88s2.57,7.71-10.81,6.5l-47.65-6.58s-15.73-.91-7.87-9.68l19.97-19.06s6.35-6.81,14.97-1.36l12.1,12.71s138.7-20.87,176.37-58.99c0,0,77.14-60.59,7.26-111.75,0,0-27.68-18.94-34.94-18.03,0,0-29.95-5.45-5.45,13.16,24.5,18.6,63.53,54.45-7.26,89.39,0,0-64.89,33.13-152.92,45.38,0,0-107.54,15.88-117.98,13.16,0,0-24.05.91,0,14.52,0,0,88.03,50.82,130.69,60.35,0,0,128.42-15.88,186.5-65.34,0,0,59.5-49.54,15.53-37.31Z"
              />
            </g>
          </svg>
        </div>

        {/* Accent line */}
        <div ref={lineRef} className="loading-divider" />

        {/* Wordmark */}
        <div ref={wordmarkRef} className="loading-wordmark">
          {itera.map((ch, i) => (
            <span
              key={i}
              ref={(el) => (lettersRef.current[i] = el)}
              className="loading-letter"
            >
              {ch}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}