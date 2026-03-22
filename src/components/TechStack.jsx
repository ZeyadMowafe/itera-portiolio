import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiBootstrap,
} from "react-icons/si";
import { SiPython, SiDjango } from "react-icons/si";
import { SiPostgresql, SiSqlite } from "react-icons/si";
import { SiGit, SiGithub, SiDocker } from "react-icons/si";
import { SiDjango as SiDrf } from "react-icons/si";

import "./TechStack.css";

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    label: "Frontend",
    color: "#7C3AED",
    colorRgb: "124,58,237",
    items: [
      { name: "HTML5", icon: <SiHtml5 color="#E34F26" size={18} /> },
      { name: "CSS3", icon: <SiCss3 color="#1572B6" size={18} /> },
      { name: "JavaScript", icon: <SiJavascript color="#F7DF1E" size={18} /> },
      { name: "React", icon: <SiReact color="#61DAFB" size={18} /> },
      { name: "Bootstrap", icon: <SiBootstrap color="#7952B3" size={18} /> },
    ],
  },
  {
    label: "Backend",
    color: "#A855F7",
    colorRgb: "168,85,247",
    items: [
      { name: "Python", icon: <SiPython color="#3776AB" size={18} /> },
      { name: "Django", icon: <SiDjango color="#092E20" size={18} /> },
      { name: "DRF", icon: <SiDrf color="#ff1709" size={18} /> },
    ],
  },
  {
    label: "Database",
    color: "#4F46E5",
    colorRgb: "79,70,229",
    items: [
      { name: "PostgreSQL", icon: <SiPostgresql color="#336791" size={18} /> },
      { name: "SQLite", icon: <SiSqlite color="#003B57" size={18} /> },
    ],
  },
  {
    label: "DevOps & Tools",
    color: "#6D28D9",
    colorRgb: "109,40,217",
    items: [
      { name: "Git", icon: <SiGit color="#F05032" size={18} /> },
      { name: "GitHub", icon: <SiGithub color="#181717" size={18} /> },
      { name: "Docker", icon: <SiDocker color="#2496ED" size={18} /> },
    ],
  },
];

export default function TechStack() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const cardsRef = useRef([]);
  const orbRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(orbRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.fromTo(
        labelRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%" },
        },
      );

      const words = headlineRef.current?.querySelectorAll(".ts-word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 48, rotateX: -22 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.08,
            ease: "power4.out",
            scrollTrigger: { trigger: headlineRef.current, start: "top 83%" },
          },
        );
      }

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

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );

        const items = card.querySelectorAll(".ts-item");
        gsap.fromTo(
          items,
          { opacity: 0, x: -16 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: { trigger: card, start: "top 86%" },
          },
        );

        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 9;
          const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -9;
          gsap.to(card, {
            rotateX: rx,
            rotateY: ry,
            duration: 0.35,
            ease: "power2.out",
            transformPerspective: 900,
          });
          const spot = card.querySelector(".ts-spot");
          if (spot) {
            const px = ((e.clientX - rect.left) / rect.width) * 100;
            const py = ((e.clientY - rect.top) / rect.height) * 100;
            const rgb = card.dataset.rgb;
            spot.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(${rgb},0.13) 0%, transparent 65%)`;
          }
        };
        const onEnter = () => {
          gsap.to(card, { scale: 1.03, duration: 0.3, ease: "power2.out" });
          gsap.to(card.querySelector(".ts-line"), {
            scaleX: 1,
            duration: 0.45,
            ease: "power3.inOut",
          });
          gsap.to(card.querySelector(".ts-cat-dot"), {
            scale: 1.5,
            duration: 0.3,
            ease: "back.out(2)",
          });
        };
        const onLeave = () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.55,
            ease: "elastic.out(1, 0.5)",
          });
          gsap.to(card.querySelector(".ts-line"), {
            scaleX: 0,
            duration: 0.35,
            ease: "power2.in",
          });
          gsap.to(card.querySelector(".ts-cat-dot"), {
            scale: 1,
            duration: 0.3,
          });
          const spot = card.querySelector(".ts-spot");
          if (spot) spot.style.background = "none";
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });

      const track = trackRef.current;
      if (track) {
        gsap.to(track, {
          xPercent: -50,
          duration: 22,
          ease: "none",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const marqueeItems = [
    ...techCategories.flatMap((c) => c.items),
    ...techCategories.flatMap((c) => c.items),
  ];

  const headlineWords = ["Technology", "we", "trust", "&", "master"];

  return (
    <section id="tech" ref={sectionRef} className="techstack-section">
      <div ref={orbRef} className="ts-orb" aria-hidden="true" />

      <div className="container-xl ts-container">
        <div className="ts-head">
          <div ref={labelRef} className="label-chip">
            <span className="dot dot--pulse" />
            Our Stack
          </div>

          <div className="ts-head-grid">
            <h2
              ref={headlineRef}
              className="ts-headline"
              style={{ perspective: "800px" }}
            >
              {headlineWords.map((w, i) => (
                <span key={i} className="ts-word-wrap">
                  <span className={`ts-word ${i === 0 ? "gradient-text" : ""}`}>
                    {w}
                  </span>
                </span>
              ))}
            </h2>
            <p ref={subtextRef} className="ts-subtext">
              We work with a focused, battle-tested technology stack — enabling
              us to move fast without sacrificing quality or maintainability.
            </p>
          </div>
        </div>

        <div className="ts-grid">
          {techCategories.map((cat, i) => (
            <div
              key={cat.label}
              ref={(el) => (cardsRef.current[i] = el)}
              className="ts-card"
              data-rgb={cat.colorRgb}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="ts-spot" />
              <div
                className="ts-line"
                style={{
                  background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`,
                }}
              />

              <div className="ts-cat-header">
                <div className="ts-cat-dot" style={{ background: cat.color }} />
                <span className="ts-cat-label">{cat.label}</span>
              </div>

              <div className="ts-items">
                {cat.items.map((item) => (
                  <div key={item.name} className="ts-item">
                    <span className="ts-item-icon">{item.icon}</span>
                    <span className="ts-item-name">{item.name}</span>
                    <div className="ts-item-bar">
                      <div
                        className="ts-item-bar-fill"
                        style={{ "--color": cat.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ts-marquee" aria-hidden="true">
        <div ref={trackRef} className="ts-marquee-track">
          {marqueeItems.map((item, i) => (
            <div key={i} className="ts-marquee-item">
              <span style={{ display: "flex", alignItems: "center" }}>
                {item.icon}
              </span>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
