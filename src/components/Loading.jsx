import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Loading.css";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export default function Loading({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const glowRef = useRef(null);
  const glowInnerRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const progressNumRef = useRef(null);
  const wordmarkRef = useRef(null);
  const ringsRef = useRef([]);
  const dotsRef = useRef([]);

  useEffect(() => {
    /* ── Scramble wordmark ──────────────────────────────────────── */
    const target = "ITERA";
    let frame = 0;
    let rafId;
    const totalFrames = 40;

    const scramble = () => {
      const progress = Math.min(frame / totalFrames, 1);
      const revealIdx = Math.floor(progress * target.length);
      if (wordmarkRef.current) {
        wordmarkRef.current.textContent = target
          .split("")
          .map((ch, i) =>
            i < revealIdx
              ? ch
              : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join("");
      }
      frame++;
      if (frame <= totalFrames + 8) rafId = requestAnimationFrame(scramble);
    };

    /* ── Counter ─────────────────────────────────────────────────── */
    const counter = { val: 0 };
    const updateCounter = () => {
      if (progressNumRef.current) {
        progressNumRef.current.textContent = Math.floor(counter.val) + "%";
      }
    };

    /* ── Initial state ──────────────────────────────────────────── */
    gsap.set(containerRef.current, { opacity: 1 });
    gsap.set(logoRef.current, { opacity: 0, scale: 0.5, y: 30 });
    gsap.set(wordmarkRef.current, {
      opacity: 0,
      y: 16,
      letterSpacing: "0.5em",
    });
    gsap.set(progressRef.current, { opacity: 0, y: 10 });
    gsap.set(progressBarRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });
    gsap.set(glowRef.current, { opacity: 0, scale: 0.4 });
    gsap.set(glowInnerRef.current, { opacity: 0, scale: 0.2 });
    gsap.set(ringsRef.current, { opacity: 0, scale: 0.3 });
    gsap.set(dotsRef.current, { opacity: 0, scale: 0 });

    const tl = gsap.timeline();

    /* 1. Rings fan out */
    tl.to(ringsRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.1,
      stagger: 0.15,
      ease: "elastic.out(1, 0.55)",
    })

      /* 2. Glow bloom */
      .to(
        glowRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.7",
      )
      .to(
        glowInnerRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.5",
      )

      /* 3. Logo pops in */
      .to(
        logoRef.current,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.75,
          ease: "back.out(1.6)",
          onStart: () => {
            /* Logo shimmer */
            gsap.to(logoRef.current, {
              filter:
                "drop-shadow(0 0 28px rgba(167,139,250,0.95)) brightness(1.15)",
              duration: 0.4,
              yoyo: true,
              repeat: 1,
              ease: "power2.inOut",
              delay: 0.3,
            });
          },
        },
        "-=0.4",
      )

      /* 4. Orbit dots appear */
      .to(
        dotsRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2)",
        },
        "-=0.3",
      )

      /* 5. Wordmark scrambles in */
      .to(
        wordmarkRef.current,
        {
          opacity: 1,
          y: 0,
          letterSpacing: "0.25em",
          duration: 0.6,
          ease: "power3.out",
          onStart: () => {
            frame = 0;
            scramble();
          },
        },
        "-=0.2",
      )

      /* 6. Progress bar */
      .to(
        progressRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.1",
      )
      .to(progressBarRef.current, {
        scaleX: 1,
        duration: 1.1,
        ease: "power2.inOut",
      })
      .to(
        counter,
        {
          val: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: updateCounter,
        },
        "<",
      )

      /* 7. Rings breathe */
      .to(
        ringsRef.current,
        {
          scale: (i) => [1.08, 1.12, 1.06][i] || 1.1,
          opacity: (i) => [0.18, 0.1, 0.07][i] || 0.1,
          duration: 0.5,
          stagger: 0.06,
          ease: "power1.inOut",
        },
        "-=0.4",
      )

      /* 8. Exit: logo + wordmark lift, container fades */
      .to(
        [
          logoRef.current,
          glowRef.current,
          glowInnerRef.current,
          dotsRef.current,
        ],
        {
          y: -16,
          opacity: 0,
          scale: 0.9,
          duration: 0.55,
          stagger: 0.04,
          ease: "power3.in",
        },
        "+=0.15",
      )
      .to(
        [wordmarkRef.current, progressRef.current, ringsRef.current],
        {
          opacity: 0,
          y: -10,
          duration: 0.4,
          stagger: 0.04,
          ease: "power2.in",
        },
        "-=0.45",
      )
      .to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.55,
          ease: "power2.inOut",
          onComplete: () => {
            cancelAnimationFrame(rafId);
            onComplete();
          },
        },
        "-=0.25",
      );

    return () => {
      tl.kill();
      cancelAnimationFrame(rafId);
    };
  }, [onComplete]);

  /* Orbit dot positions */
  const dotAngles = [0, 72, 144, 216, 288];

  return (
    <div ref={containerRef} className="loading-screen">
      <div className="loading-center">
        {/* Rings */}
        <div className="loading-rings-wrap">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={(el) => (ringsRef.current[i] = el)}
              className="loading-ring"
              style={{ "--ring-i": i }}
            />
          ))}

          {/* Glow layers */}
          <div ref={glowRef} className="loading-glow-outer" />
          <div ref={glowInnerRef} className="loading-glow-inner" />

          {/* Orbit dots */}
          {dotAngles.map((angle, i) => (
            <div
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              className="loading-dot"
              style={{ "--angle": angle + "deg" }}
            />
          ))}

          {/* Logo */}
          <div ref={logoRef} className="loading-logo">
            <img src="./logo.svg" alt="Itera" />
          </div>
        </div>

        {/* Wordmark */}
        <div ref={wordmarkRef} className="loading-wordmark">
          ITERA
        </div>

        {/* Progress */}
        <div ref={progressRef} className="loading-progress-wrap">
          <div className="loading-progress">
            <div ref={progressBarRef} className="loading-progress-bar" />
          </div>
          <span ref={progressNumRef} className="loading-progress-num">
            0%
          </span>
        </div>
      </div>
    </div>
  );
}
