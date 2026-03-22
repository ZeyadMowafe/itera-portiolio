import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M9 9h6M9 12h6M9 15h4" />
      </svg>
    ),
    title: "Web Applications",
    desc: "Modern, performant SPAs and full-stack web apps built with cutting-edge technology.",
    num: "01",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
        <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      </svg>
    ),
    title: "Management Systems",
    desc: "Custom ERP, CRM, and internal tools engineered for your exact business workflow.",
    num: "02",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M8 4v16M14 10h4M14 14h4" />
      </svg>
    ),
    title: "Dashboards",
    desc: "Beautiful data visualization and admin interfaces that turn complexity into clarity.",
    num: "03",
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 6h16M4 12h16M4 18h10" />
        <circle cx="19" cy="18" r="3" />
        <path d="M17.5 16.5l3 3" />
      </svg>
    ),
    title: "API Development",
    desc: "Robust, well-documented REST APIs with scalable architecture and clean data contracts.",
    num: "04",
  },
];

export default function About() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const btnRef = useRef(null);
  const cardsRef = useRef([]);
  const decorRef = useRef(null);
  const lineRef = useRef(null);
  const counterRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Label chip ─────────────────────────────────────────────── */
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -24, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%" },
        },
      );

      /* ── Headline: word by word clip reveal ─────────────────────── */
      const words = headlineRef.current?.querySelectorAll(".about-word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 56, rotateX: -20 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power4.out",
            scrollTrigger: { trigger: headlineRef.current, start: "top 82%" },
          },
        );
      }

      /* ── Subtext lines ──────────────────────────────────────────── */
      gsap.fromTo(
        subtextRef.current?.children,
        { opacity: 0, y: 30, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: subtextRef.current, start: "top 82%" },
        },
      );

      /* ── Button ─────────────────────────────────────────────────── */
      gsap.fromTo(
        btnRef.current,
        { opacity: 0, scale: 0.85, y: 16 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: btnRef.current, start: "top 88%" },
        },
      );

      /* ── Vertical line draw ─────────────────────────────────────── */
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        },
      );

      /* ── Decorative orb parallax ────────────────────────────────── */
      gsap.to(decorRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      /* ── Cards: staggered slide + fade ─────────────────────────── */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 60, scale: 0.94, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.75,
            delay: i * 0.09,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );

        /* Hover tilt */
        const onEnter = (e) => {
          const rect = card.getBoundingClientRect();
          const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
          const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -8;
          gsap.to(card, {
            rotateX: rx,
            rotateY: ry,
            scale: 1.03,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 800,
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          });
        };
        card.addEventListener("mousemove", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Split headline into animatable words */
  const headlineParts = [
    { text: "A studio", gradient: false },
    { text: "that codes", gradient: false },
    { text: "with", gradient: false },
    { text: "purpose", gradient: true },
  ];

  return (
    <section id="about" ref={sectionRef} className="about-section">
      {/* Decorative orb */}
      <div ref={decorRef} className="about-orb" aria-hidden="true" />

      {/* Vertical accent line */}
      <div ref={lineRef} className="about-vline" aria-hidden="true" />

      <div className="container-xl about-container">
        <div className="about-grid">
          {/* ── Left col ────────────────────────────────────────── */}
          <div className="about-left">
            <div ref={labelRef} className="label-chip">
              <span className="dot dot--pulse" />
              About Itera
            </div>

            <h2 ref={headlineRef} className="about-headline">
              {headlineParts.map((part, i) => (
                <span key={i} className="about-line">
                  <span
                    className={`about-word ${part.gradient ? "gradient-text" : ""}`}
                  >
                    {part.text}
                  </span>
                </span>
              ))}
            </h2>

            <div ref={subtextRef} className="about-subtext-wrap">
              <p className="about-subtext">
                Itera is a modern full-stack development studio. We don't just
                write code — we architect systems that scale, design interfaces
                that resonate, and build platforms that evolve with your
                business.
              </p>
              <p className="about-subtext">
                From early-stage products to enterprise platforms, our approach
                combines clean architecture, modern stack expertise, and
                product-level thinking.
              </p>
            </div>

            <div ref={btnRef}>
              <a
                href="#contact"
                className="btn-itera about-btn"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Work With Us
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Right col ───────────────────────────────────────── */}
          <div className="about-right">
            <div className="about-cards">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  ref={(el) => (cardsRef.current[i] = el)}
                  className="about-card"
                >
                  <div className="about-card-num">{p.num}</div>
                  <div className="about-card-icon">{p.icon}</div>
                  <h4 className="about-card-title">{p.title}</h4>
                  <p className="about-card-desc">{p.desc}</p>
                  <div className="about-card-shine" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
