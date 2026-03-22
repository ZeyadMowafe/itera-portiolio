import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "EduTrack LMS",
    category: "Management System",
    desc: "A full-featured learning management system with course creation, student tracking, and progress analytics.",
    tags: ["React", "Django", "PostgreSQL"],
    color: "#7C3AED",
    colorRgb: "124,58,237",
    videoUrl: "",
    details:
      "EduTrack is a comprehensive LMS platform that enables educators to create and manage courses, track student progress, issue certificates, and generate detailed analytics. Built with a React frontend and Django REST Framework backend, it supports real-time notifications and integrates with payment gateways.",
    features: [
      "Course builder with drag-and-drop",
      "Student progress tracking",
      "Analytics dashboard",
      "Payment integration",
      "Certificate generation",
    ],
  },
  {
    id: 2,
    title: "InventoryPro",
    category: "Custom System",
    desc: "Enterprise inventory and stock management system with real-time alerts, supplier management and reporting.",
    tags: ["Django", "DRF", "Bootstrap"],
    color: "#A855F7",
    colorRgb: "168,85,247",
    videoUrl: "",
    details:
      "InventoryPro is a robust inventory management solution designed for medium to large-scale operations. It features real-time stock monitoring, automated reorder alerts, supplier management, purchase order workflows, and comprehensive reporting with export capabilities.",
    features: [
      "Real-time stock tracking",
      "Automated low-stock alerts",
      "Supplier & PO management",
      "Multi-location support",
      "Advanced reporting",
    ],
  },
  {
    id: 3,
    title: "AdminFlow Dashboard",
    category: "Dashboard",
    desc: "A powerful admin dashboard with data visualization, role-based access, and advanced filtering capabilities.",
    tags: ["React", "Charts", "API"],
    color: "#4F46E5",
    colorRgb: "79,70,229",
    videoUrl: "",
    details:
      "AdminFlow is a highly customizable admin dashboard built for data-heavy applications. It features multi-level role-based access control, rich data visualizations, customizable widget layouts, bulk actions, and a global search system with live filtering across all data types.",
    features: [
      "Role-based access control",
      "Interactive data charts",
      "Customizable widget layout",
      "Bulk actions & exports",
      "Global search & filters",
    ],
  },
  {
    id: 4,
    title: "RestaurantOS",
    category: "Full-Stack App",
    desc: "Complete restaurant management platform covering orders, kitchen display, reservations, and billing.",
    tags: ["React", "Django", "WebSocket"],
    color: "#6D28D9",
    colorRgb: "109,40,217",
    videoUrl: "",
    details:
      "RestaurantOS is an all-in-one restaurant operations platform. It connects front-of-house order taking with the kitchen display system in real time via WebSockets, manages table reservations, handles billing and split payments, and provides end-of-day sales summaries.",
    features: [
      "Real-time order flow",
      "Kitchen display system",
      "Table reservation module",
      "Billing & split payments",
      "Daily sales reports",
    ],
  },
  {
    id: 5,
    title: "PropManager",
    category: "Web Application",
    desc: "Real estate property management platform for landlords with tenant portals, maintenance requests and contracts.",
    tags: ["Django", "PostgreSQL", "Bootstrap"],
    color: "#8B5CF6",
    colorRgb: "139,92,246",
    videoUrl: "",
    details:
      "PropManager simplifies property management for landlords and property managers. It includes tenant self-service portals, digital lease signing, maintenance request workflows, automated rent reminders, and a complete financial ledger per property.",
    features: [
      "Tenant portal",
      "Digital lease contracts",
      "Maintenance workflows",
      "Automated rent reminders",
      "Financial ledger",
    ],
  },
  {
    id: 6,
    title: "DataPulse API",
    category: "Backend API",
    desc: "High-performance analytics API with OAuth2 authentication, rate limiting, and real-time data streaming.",
    tags: ["DRF", "Redis", "Docker"],
    color: "#7E22CE",
    colorRgb: "126,34,206",
    videoUrl: "",
    details:
      "DataPulse is a production-grade analytics API designed for high-throughput environments. It uses OAuth2 with JWT for authentication, Redis for caching and rate limiting, Celery for background processing, and supports server-sent events for real-time data streaming to connected clients.",
    features: [
      "OAuth2 + JWT auth",
      "Redis caching & rate limiting",
      "Celery task queue",
      "Real-time SSE streaming",
      "Full API documentation",
    ],
  },
];

/* ── Modal ─────────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    /* Backdrop fade */
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    );
    /* Modal slide up */
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power4.out" },
    );
    /* Features stagger */
    gsap.fromTo(
      featuresRef.current,
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.07,
        ease: "power2.out",
        delay: 0.25,
      },
    );
    /* Prevent body scroll */
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.25 });
    gsap.to(modalRef.current, {
      opacity: 0,
      y: 28,
      scale: 0.96,
      duration: 0.28,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div ref={backdropRef} className="prj-backdrop" onClick={handleClose}>
      <div
        ref={modalRef}
        className="prj-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color band */}
        <div
          className="prj-modal-band"
          style={{
            background: `linear-gradient(90deg, ${project.color}, ${project.color}88)`,
          }}
        />

        {/* Close */}
        <button
          className="prj-modal-close"
          onClick={handleClose}
          aria-label="Close"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="prj-modal-body">
          <div className="prj-modal-meta">
            <span className="prj-modal-cat" style={{ color: project.color }}>
              {project.category}
            </span>
            <div className="prj-modal-tags">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="prj-tag"
                  style={{
                    borderColor: `${project.color}33`,
                    color: project.color,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <h2 className="prj-modal-title">{project.title}</h2>
          <p className="prj-modal-desc">{project.details}</p>

          <h4 className="prj-modal-section-title">Key Features</h4>
          <ul className="prj-modal-features">
            {project.features.map((f, i) => (
              <li key={f} ref={(el) => (featuresRef.current[i] = el)}>
                <span
                  className="prj-feature-dot"
                  style={{ background: project.color }}
                />
                {f}
              </li>
            ))}
          </ul>

          <h4 className="prj-modal-section-title">Demo Video</h4>
          {project.videoUrl ? (
            <div className="prj-video-wrap">
              <iframe
                src={project.videoUrl}
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div
              className="prj-video-placeholder"
              style={{ "--color": project.color }}
            >
              <div className="prj-play-icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polygon
                    points="10 8 16 12 10 16 10 8"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </div>
              <p>Demo video coming soon</p>
              <span>Add your video URL to the projects data</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ────────────────────────────────────────────── */
export default function Projects() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const cardsRef = useRef([]);
  const orbRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Orb parallax */
      gsap.to(orbRef.current, {
        y: -80,
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
        { opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%" } },
      );

      /* Headline */
      const words = headlineRef.current?.querySelectorAll(".prj-word");
      if (words?.length) {
        gsap.fromTo(
          words,
          { opacity: 0, y: 48, rotateX: -22 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.85, stagger: 0.09, ease: "power4.out",
            scrollTrigger: { trigger: headlineRef.current, start: "top 83%" } },
        );
      }

      /* Subtext */
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: subtextRef.current, start: "top 85%" } },
      );

      /* Cards */
      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        /* Entrance — alternating from left/right */
        const xFrom = i % 2 === 0 ? -40 : 40;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, x: xFrom, scale: 0.94 },
          { opacity: 1, y: 0, x: 0, scale: 1, duration: 0.8, delay: (i % 3) * 0.07,
            ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } },
        );

        /* 3D tilt */
        const onMove = (e) => {
          const rect = card.getBoundingClientRect();
          const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
          const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -8;
          gsap.to(card, {
            rotateX: rx,
            rotateY: ry,
            duration: 0.3,
            ease: "power2.out",
            transformPerspective: 900,
          });
        };
        const onEnter = () => {
          gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.35,
            ease: "power2.out",
          });
          gsap.to(card.querySelector(".prj-thumb-overlay"), {
            opacity: 1,
            duration: 0.3,
          });
          gsap.to(card.querySelector(".prj-thumb-icon"), {
            scale: 0.88,
            opacity: 0.12,
            duration: 0.3,
          });
          gsap.to(card.querySelector(".prj-overlay-label"), {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power3.out",
          });
          gsap.to(card.querySelector(".prj-line"), {
            scaleX: 1,
            duration: 0.45,
            ease: "power3.inOut",
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
          gsap.to(card.querySelector(".prj-thumb-overlay"), {
            opacity: 0,
            duration: 0.25,
          });
          gsap.to(card.querySelector(".prj-thumb-icon"), {
            scale: 1,
            opacity: 0.35,
            duration: 0.3,
          });
          gsap.to(card.querySelector(".prj-overlay-label"), {
            y: 12,
            opacity: 0,
            duration: 0.2,
          });
          gsap.to(card.querySelector(".prj-line"), {
            scaleX: 0,
            duration: 0.35,
            ease: "power2.in",
          });
        };
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseenter", onEnter);
        card.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headlineWords = ["Selected", "Projects"];

  return (
    <section id="projects" ref={sectionRef} className="prj-section">
      <div ref={orbRef} className="prj-orb" aria-hidden="true" />

      <div className="container-xl prj-container">
        {/* Head */}
        <div className="prj-head">
          <div ref={labelRef} className="label-chip">
            <span className="dot dot--pulse" />
            Our Work
          </div>

          <div className="prj-head-grid">
            <h2
              ref={headlineRef}
              className="prj-headline"
              style={{ perspective: "800px" }}
            >
              {headlineWords.map((w, i) => (
                <span key={i} className="prj-word-wrap">
                  <span
                    className={`prj-word ${i === 1 ? "gradient-text" : ""}`}
                  >
                    {w}
                  </span>
                </span>
              ))}
            </h2>
            <p ref={subtextRef} className="prj-subtext">
              A curated selection of systems, platforms, and applications we've
              designed and engineered for real-world impact.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="prj-grid">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="prj-card"
              onClick={() => setActiveProject(project)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Top accent line */}
              <div
                className="prj-line"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, ${project.color}66)`,
                }}
              />

              {/* Thumb */}
              <div
                className="prj-thumb"
                style={{ background: `rgba(${project.colorRgb},0.08)` }}
              >
                <div
                  className="prj-thumb-icon"
                  style={{ color: project.color }}
                >
                  <svg
                    width="52"
                    height="52"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.9"
                  >
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <path d="M8 21h8M12 17v4" />
                  </svg>
                </div>
                {/* Hover overlay */}
                <div
                  className="prj-thumb-overlay"
                  style={{ background: `rgba(${project.colorRgb},0.88)` }}
                >
                  <div className="prj-overlay-label">
                    <span>View Project</span>
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
              </div>

              {/* Info */}
              <div className="prj-info">
                <div className="prj-cat" style={{ color: project.color }}>
                  {project.category}
                </div>
                <h3 className="prj-title">{project.title}</h3>
                <p className="prj-desc">{project.desc}</p>
                <div className="prj-tags">
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      className="prj-tag"
                      style={{
                        borderColor: `${project.color}33`,
                        color: project.color,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}
    </section>
  );
}
