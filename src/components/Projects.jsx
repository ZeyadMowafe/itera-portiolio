import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import trive from "../assets/images/trive.jpeg";
import zfe from "../assets/images/zfe.png";
import smartqueue from "../assets/images/smart_queue.png";
// import inventoryVideo from "../assets/videos/Z-F-E System.mp4";

import { FaReact, FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import {
  SiDjango,
  SiPostgresql,
  SiBootstrap,
  SiRedis,
  SiDocker,
  SiSocketdotio,
  SiChartdotjs,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";

import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

// ── Tech icon map ─────────────────────────────────────────────────
const techIconMap = {
  React: { icon: FaReact, color: "#61DAFB" },
  Django: { icon: SiDjango, color: "#092E20" },
  PostgreSQL: { icon: SiPostgresql, color: "#336791" },
  DRF: { icon: SiDjango, color: "#ff1709" },
  Bootstrap: { icon: SiBootstrap, color: "#7952B3" },
  Redis: { icon: SiRedis, color: "#DC382D" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  WebSocket: { icon: SiSocketdotio, color: "#010101" },
  Charts: { icon: SiChartdotjs, color: "#FF6384" },
  API: { icon: TbApi, color: "#00B4D8" },
};

function TechTag({ tag, cardColor }) {
  const tech = techIconMap[tag];
  const Icon = tech?.icon;
  return (
    <span
      className="prj-tag"
      style={{
        borderColor: `${cardColor}33`,
        color: cardColor,
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {Icon && <Icon size={12} color={tech.color} style={{ flexShrink: 0 }} />}
      {tag}
    </span>
  );
}

// ── Projects data ─────────────────────────────────────────────────
const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "TRIVÉ Store",
    desc: "A premium fashion e-commerce platform with advanced filtering, real-time cart, and secure checkout experience.",
    tags: ["React", "Django", "PostgreSQL" , "Redis"],
    color: "#7C3AED",
    colorRgb: "124,58,237",
    imageUrl: trive,
    videoUrl: "",
    siteUrl: "https://trive-ecommerce.vercel.app/",
    repoUrl: "",
    details:
      "TRIVÉ is a full-stack e-commerce platform that delivers a modern shopping experience with a responsive UI and a scalable backend. It handles product browsing, cart management and authentication.",
    features: [
      "Advanced product filtering, search, and sorting",
      "Real-time cart with full management",
      "JWT authentication + social login",
      "Orders system with tracking & history",
      "RESTful API with Django & PostgreSQL",
      "Background tasks using Celery & Redis",
    ],
  },
  {
    id: 2,
    title: "Educational Management System",
    category: "Z.F.E System",
    desc: "Full-stack SaaS for managing students, attendance, payments, exams, and automated WhatsApp notifications.",
    tags: ["React", "Django", "PostgreSQL" , "Node.js"],
    color: "#A855F7",
    colorRgb: "168,85,247",
    imageUrl: zfe,
    videoUrl: "",
    siteUrl: "",
    repoUrl: "",
    details:
      "A complete educational management platform with Arabic dashboard, backend API, and WhatsApp notification service. Handles student management, barcode attendance, payments, exams, and interactive reports.",
    features: [
      "Student management with barcode generation",
      "Attendance & payment tracking",
      "Online exams with auto-grading",
      "Dashboard analytics & reports",
      "JWT authentication & route protection",
      "Automated WhatsApp notifications",
      "Scheduler for automatic tasks",
      "Fully responsive design, dark/light mode",
    ],
  },
  {
    id: 3,
    title: "Smart Booking & Queue System API",
    category: "SmartQueue Backend",
    desc: "Production-ready Django REST API for intelligent turn-based queue management with booking, services, and smart queue engine.",
    tags: ["Django", "DRF", "PostgreSQL" , "Redis" , "Docker"],
    color: "#4F46E5",
    colorRgb: "79,70,229",
    imageUrl: smartqueue,
    videoUrl: "",
    siteUrl: "",
    repoUrl:
      "https://github.com/FAROUKDEV7/SmartQueue-API-Intelligent-Queue-Booking-System",
    details:
      "A robust backend API for managing bookings, services, and smart queues. Provides JWT authentication, role-based access, queue management, and notifications. Designed with clean architecture, unit/integration tests, and Docker deployment.",
    features: [
      "Custom user system (JWT + roles)",
      "Service creation & management",
      "Booking system & CRUD",
      "Smart queue engine (dynamic position, wait-time estimation, late penalty)",
      "Admin controls: next, skip, complete",
      "Redis caching for queue performance",
      "Swagger UI for interactive API documentation",
      "Unit & integration tests",
    ],
  },
];

// ── ProjectMedia ──────────────────────────────────────────────────
function ProjectMedia({ project }) {
  const { videoUrl, imageUrl, siteUrl, repoUrl, color, colorRgb, title } =
    project;

  const openLink = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  // 1️⃣ فيديو
  if (videoUrl) {
    const isLocalVideo =
      videoUrl.includes(".mp4") || videoUrl.includes(".webm");
    return (
      <div className="prj-video-wrap">
        {isLocalVideo ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            muted
            loop
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              backgroundColor: "#000",
            }}
          />
        ) : (
          <iframe
            src={videoUrl}
            title={`${title} demo`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    );
  }

  const hasLink = siteUrl || repoUrl;

  // 2️⃣ صورة
  if (imageUrl) {
    return (
      <div
        className="prj-media-img"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        {hasLink && (
          <div
            className="prj-media-overlay"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {siteUrl && (
                <button
                  className="prj-media-overlay-pill"
                  onClick={() => openLink(siteUrl)}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  <FaExternalLinkAlt size={14} color="#fff" />
                  <span>Visit Website</span>
                </button>
              )}
              {repoUrl && (
                <button
                  className="prj-media-overlay-pill"
                  onClick={() => openLink(repoUrl)}
                  style={{ cursor: "pointer", outline: "none" }}
                >
                  <FaGithub size={16} color="#fff" />
                  <span>Source Code</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3️⃣ placeholder
  return (
    <div className="prj-video-placeholder" style={{ "--color": color }}>
      <div
        className="prj-play-icon"
        style={{ marginBottom: hasLink ? "0" : "10px" }}
      >
        {hasLink ? (
          siteUrl ? (
            <FaExternalLinkAlt size={22} color={`rgba(${colorRgb},0.7)`} />
          ) : (
            <FaGithub size={24} color={`rgba(${colorRgb},0.7)`} />
          )
        ) : (
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
        )}
      </div>
      {hasLink ? (
        <div
          style={{
            display: "flex",
            gap: "14px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "16px",
          }}
        >
          {siteUrl && (
            <button
              className="prj-media-overlay-pill"
              onClick={() => openLink(siteUrl)}
              style={{
                cursor: "pointer",
                outline: "none",
                transform: "none",
                position: "relative",
              }}
            >
              <FaExternalLinkAlt size={14} color="#fff" />
              <span>Visit Website</span>
            </button>
          )}
          {repoUrl && (
            <button
              className="prj-media-overlay-pill"
              onClick={() => openLink(repoUrl)}
              style={{
                cursor: "pointer",
                outline: "none",
                transform: "none",
                position: "relative",
              }}
            >
              <FaGithub size={16} color="#fff" />
              <span>Source Code</span>
            </button>
          )}
        </div>
      ) : (
        <>
          <p>Demo coming soon</p>
          <span>
            Add imageUrl, videoUrl, siteUrl, or repoUrl to the project
          </span>
        </>
      )}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  const backdropRef = useRef(null);
  const modalRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.35, ease: "power2.out" },
    );
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, y: 40, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power4.out" },
    );
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

  const mediaSectionTitle = project.videoUrl
    ? "Demo Video"
    : project.imageUrl
      ? "Preview"
      : project.siteUrl
        ? "Live Website"
        : project.repoUrl
          ? "Source Code"
          : "Preview";

  return (
    <div ref={backdropRef} className="prj-backdrop" onClick={handleClose}>
      <div
        ref={modalRef}
        className="prj-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="prj-modal-band"
          style={{
            background: `linear-gradient(90deg, ${project.color}, ${project.color}88)`,
          }}
        />
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
                <TechTag key={t} tag={t} cardColor={project.color} />
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
          <h4 className="prj-modal-section-title">{mediaSectionTitle}</h4>
          <ProjectMedia project={project} />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────
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
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%" },
        },
      );
      const words = headlineRef.current?.querySelectorAll(".prj-word");
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
        const xFrom = i % 2 === 0 ? -40 : 40;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, x: xFrom, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.8,
            delay: (i % 3) * 0.07,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          },
        );
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

        <div className="prj-grid">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="prj-card"
              onClick={() => setActiveProject(project)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div
                className="prj-line"
                style={{
                  background: `linear-gradient(90deg, ${project.color}, ${project.color}66)`,
                }}
              />
              <div
                className="prj-thumb"
                style={
                  project.imageUrl
                    ? {
                        background: `url(${project.imageUrl}) center top / cover no-repeat`,
                      }
                    : { background: `rgba(${project.colorRgb},0.08)` }
                }
              >
                {!project.imageUrl && (
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
                )}
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
              <div className="prj-info">
                <div className="prj-cat" style={{ color: project.color }}>
                  {project.category}
                </div>
                <h3 className="prj-title">{project.title}</h3>
                <p className="prj-desc">{project.desc}</p>
                <div className="prj-tags">
                  {project.tags.map((t) => (
                    <TechTag key={t} tag={t} cardColor={project.color} />
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
