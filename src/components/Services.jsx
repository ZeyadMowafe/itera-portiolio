import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Services.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "Web Development",
    desc: "High-performance websites and web applications built with modern frameworks. From landing pages to complex SPAs — crafted with pixel-perfect precision.",
    tags: ["React", "Next.js", "Django"],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Custom Systems",
    desc: "Enterprise-grade management systems, CRMs, ERPs and internal tools tailored to your workflow and team — scalable from day one.",
    tags: ["Django", "PostgreSQL", "REST API"],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Backend & API",
    desc: "Robust, documented REST APIs with clean architecture. Authentication, data modeling, permissions — built to last and easy to extend.",
    tags: ["DRF", "Auth", "Swagger"],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M4 6h16M4 10h16M4 14h8" />
        <circle cx="17" cy="17" r="4" />
        <path d="M15.5 15.5l3 3" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Dashboards & Admin",
    desc: "Data-rich dashboards, analytics panels, and admin interfaces. Complex data made simple — with beautiful charts and intuitive controls.",
    tags: ["Charts", "Tables", "Filters"],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Full-Stack Solutions",
    desc: "End-to-end product development — from architecture planning to deployment. One team, one vision, complete ownership of your digital product.",
    tags: ["Full-Stack", "Docker", "CI/CD"],
    icon: (
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const cardsRef = useRef([]);
  const bgLinesRef = useRef([]);
  const orbRef = useRef(null);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── BG lines draw in ─────────────────────────────────────── */
      gsap.fromTo(
        bgLinesRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.4,
          stagger: 0.1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        },
      );

      /* ── Orb parallax ─────────────────────────────────────────── */
      gsap.to(orbRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      /* ── Label ────────────────────────────────────────────────── */
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%" } },
      );

      /* ── Headline chars ───────────────────────────────────────── */
      const words = headlineRef.current?.querySelectorAll(".svc-word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 50, rotateX: -25 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.85, stagger: 0.09, ease: "power4.out",
            scrollTrigger: { trigger: headlineRef.current, start: "top 83%" } },
        );
      }

      /* ── Subtext ──────────────────────────────────────────────── */
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: subtextRef.current, start: "top 85%" } },
      );

      /* ── Cards cascade ────────────────────────────────────────── */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        /* Entrance */
        gsap.fromTo(
          card,
          { opacity: 0, y: 55, scale: 0.93 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, delay: i * 0.07, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" } },
        );

        /* 3D tilt on hover */
        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
          const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -10;
          gsap.to(card, {
            rotateX: rx,
            rotateY: ry,
            duration: 0.35,
            ease: "power2.out",
            transformPerspective: 900,
          });
          /* Move gradient spot with mouse */
          const spotEl = card.querySelector(".svc-spot");
          if (spotEl) {
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;
            spotEl.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(124,58,237,0.12) 0%, transparent 65%)`;
          }
        };
        const onEnter = () => {
          setActiveCard(i);
          gsap.to(card, { scale: 1.02, duration: 0.3, ease: "power2.out" });
          gsap.to(card.querySelector(".svc-icon"), {
            scale: 1.15,
            rotate: -6,
            duration: 0.4,
            ease: "back.out(1.5)",
          });
          gsap.to(card.querySelector(".svc-arrow"), {
            opacity: 1,
            x: 0,
            duration: 0.35,
            ease: "power2.out",
          });
          gsap.to(card.querySelector(".svc-line"), {
            scaleX: 1,
            duration: 0.5,
            ease: "power3.inOut",
          });
        };
        const onLeave = () => {
          setActiveCard(null);
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.55,
            ease: "elastic.out(1, 0.5)",
          });
          gsap.to(card.querySelector(".svc-icon"), {
            scale: 1,
            rotate: 0,
            duration: 0.4,
            ease: "power2.out",
          });
          gsap.to(card.querySelector(".svc-arrow"), {
            opacity: 0,
            x: -8,
            duration: 0.25,
            ease: "power2.in",
          });
          gsap.to(card.querySelector(".svc-line"), {
            scaleX: 0,
            duration: 0.4,
            ease: "power2.in",
          });
          const spotEl = card.querySelector(".svc-spot");
          if (spotEl) spotEl.style.background = "none";
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = ["Services", "we", "offer"];

  return (
    <section id="services" ref={sectionRef} className="services-section">
      {/* Background grid lines */}
      <div className="svc-bg-lines" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (bgLinesRef.current[i] = el)}
            className="svc-bg-line"
            style={{ "--i": i }}
          />
        ))}
      </div>

      {/* Decorative orb */}
      <div ref={orbRef} className="svc-orb" aria-hidden="true" />

      <div className="container-xl svc-container">
        {/* Head */}
        <div className="svc-head">
          <div ref={labelRef} className="label-chip">
            <span className="dot dot--pulse" />
            What We Do
          </div>

          <h2
            ref={headlineRef}
            className="svc-headline"
            style={{ perspective: "800px" }}
          >
            {headlineWords.map((w, i) => (
              <span key={i} className="svc-word-wrap">
                <span className={`svc-word ${i === 0 ? "gradient-text" : ""}`}>
                  {w}
                </span>
              </span>
            ))}
          </h2>

          <p ref={subtextRef} className="svc-subtext">
            From concept to deployment, we provide everything your digital
            product needs to thrive in production.
          </p>
        </div>

        {/* Grid */}
        <div className="svc-grid">
          {services.map((svc, i) => (
            <div
              key={svc.number}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`svc-card ${activeCard === i ? "svc-card--active" : ""}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Mouse-follow gradient spot */}
              <div className="svc-spot" />

              {/* Top bar line */}
              <div className="svc-line" />

              <div className="svc-card-top">
                <span className="svc-number">{svc.number}</span>
                <div className="svc-arrow">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="svc-icon">{svc.icon}</div>
              <h3 className="svc-title">{svc.title}</h3>
              <p className="svc-desc">{svc.desc}</p>

              <div className="svc-tags">
                {svc.tags.map((tag) => (
                  <span key={tag} className="svc-tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
