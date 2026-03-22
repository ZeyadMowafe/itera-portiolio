import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Process.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Understanding the Idea",
    desc: "We start with a deep discovery session — understanding your vision, goals, users, and constraints. No assumptions, just listening.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Planning the Architecture",
    desc: "We map out the system — data models, API contracts, infrastructure, and technical decisions. The blueprint that prevents costly pivots.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Designing the Experience",
    desc: "UI/UX design that balances aesthetics with usability. From wireframes to polished high-fidelity mockups — every pixel intentional.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Development",
    desc: "Clean, documented, test-covered code. Iterative sprints with regular check-ins keep you in the loop throughout the entire build.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Deployment & Beyond",
    desc: "Production-ready deployment with CI/CD pipelines, monitoring, and documentation. We stay on after launch to ensure stability.",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function Process() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const timelineRef = useRef(null);
  const lineRef = useRef(null);
  const stepsRef = useRef([]);
  const dotsRef = useRef([]);
  const cardsRef = useRef([]);
  const orbRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Orb parallax ─────────────────────────────────────────── */
      gsap.to(orbRef.current, {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* ── Label ────────────────────────────────────────────────── */
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%" },
        },
      );

      /* ── Headline ─────────────────────────────────────────────── */
      const words = headlineRef.current?.querySelectorAll(".prc-word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 48, rotateX: -22 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.09,
            ease: "power4.out",
            scrollTrigger: { trigger: headlineRef.current, start: "top 83%" },
          },
        );
      }

      /* ── Subtext ──────────────────────────────────────────────── */
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: subtextRef.current, start: "top 85%" },
        },
      );

      /* ── Timeline line scrub ──────────────────────────────────── */
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.8,
          },
        },
      );

      /* ── Steps ────────────────────────────────────────────────── */
      stepsRef.current.forEach((step, i) => {
        if (!step) return;
        const isLeft = i % 2 === 0;

        /* Slide in from side */
        gsap.fromTo(
          step,
          { opacity: 0, x: isLeft ? -50 : 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: step, start: "top 84%" },
          },
        );

        /* Dot pop */
        const dot = dotsRef.current[i];
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.55,
              ease: "back.out(2.5)",
              scrollTrigger: { trigger: dot, start: "top 84%" },
            },
          );
          /* Dot pulse ring */
          gsap.to(dot.querySelector(".prc-dot-ring"), {
            scale: 2.2,
            opacity: 0,
            duration: 1.6,
            ease: "power2.out",
            repeat: -1,
            repeatDelay: 0.8,
            scrollTrigger: { trigger: dot, start: "top 84%" },
          });
        }

        /* Card hover tilt */
        const card = cardsRef.current[i];
        if (!card) return;
        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 7;
          const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -7;
          gsap.to(card, {
            rotateX: rx,
            rotateY: ry,
            duration: 0.35,
            ease: "power2.out",
            transformPerspective: 900,
          });
        };
        const onEnter = () => {
          gsap.to(card, {
            y: -6,
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(card.querySelector(".prc-card-line"), {
            scaleX: 1,
            duration: 0.45,
            ease: "power3.inOut",
          });
          gsap.to(card.querySelector(".prc-icon"), {
            rotate: -8,
            scale: 1.12,
            duration: 0.35,
            ease: "back.out(2)",
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            y: 0,
            scale: 1,
            duration: 0.55,
            ease: "elastic.out(1, 0.5)",
          });
          gsap.to(card.querySelector(".prc-card-line"), {
            scaleX: 0,
            duration: 0.35,
            ease: "power2.in",
          });
          gsap.to(card.querySelector(".prc-icon"), {
            rotate: 0,
            scale: 1,
            duration: 0.35,
          });
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = ["Our", "Process"];

  return (
    <section id="process" ref={sectionRef} className="prc-section">
      <div ref={orbRef} className="prc-orb" aria-hidden="true" />

      <div className="container-xl prc-container">
        {/* Head */}
        <div className="prc-head">
          <div ref={labelRef} className="label-chip prc-label">
            <span className="dot dot--pulse" />
            How We Work
          </div>

          <h2
            ref={headlineRef}
            className="prc-headline"
            style={{ perspective: "800px" }}
          >
            {headlineWords.map((w, i) => (
              <span key={i} className="prc-word-wrap">
                <span className={`prc-word ${i === 1 ? "gradient-text" : ""}`}>
                  {w}
                </span>
              </span>
            ))}
          </h2>

          <p ref={subtextRef} className="prc-subtext">
            A proven methodology that reduces risk, accelerates delivery, and
            keeps you informed at every milestone.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="prc-timeline">
          {/* Vertical line */}
          <div className="prc-line-wrap">
            <div ref={lineRef} className="prc-line" />
          </div>

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={step.number}
                ref={(el) => (stepsRef.current[i] = el)}
                className={`prc-step ${isLeft ? "prc-step--left" : "prc-step--right"}`}
              >
                {/* Card */}
                <div
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="prc-card"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Accent line */}
                  <div className="prc-card-line" />

                  <div className="prc-icon">{step.icon}</div>
                  <div className="prc-num">{step.number}</div>
                  <h3 className="prc-title">{step.title}</h3>
                  <p className="prc-desc">{step.desc}</p>
                </div>

                {/* Dot */}
                <div
                  ref={(el) => (dotsRef.current[i] = el)}
                  className="prc-dot-wrap"
                >
                  <div className="prc-dot-ring" />
                  <div className="prc-dot" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
