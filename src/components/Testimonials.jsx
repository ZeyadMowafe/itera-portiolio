import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Testimonials.css";
import testimonials_img from "../assets/testimonials_img/rate_bahrstore.jpg";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────────── */
const testimonials = [
  {
    id: 1,
    name: "Bahr Store",
    role: "Owner — Bahr Store",
    initials: "BS",
    color: "#7C3AED",
    colorRgb: "124,58,237",
    tag: "Custom System — POS",
    stars: 5,
    quote:
      "مساء النور علي حضرتك مشاءالله حاجه محترمه جدا وسهل جدا ف التعامل ولحد الان شغال معايا كويس ومفهوش اي مشكله وبصراحه مكنتش متوقع الي هو بالسهوله ده بجد شكرا تسلم أيدك بصراحه",
    featured: true,
    chatScreenshot: testimonials_img,
  },
];

/* ── Stars ───────────────────────────────────────────────────────── */
function Stars({ count }) {
  return (
    <div className="tst-stars">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="tst-star" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Quote icon ──────────────────────────────────────────────────── */
function QuoteIcon({ color }) {
  return (
    <svg
      className="tst-quote-icon"
      width="64"
      height="48"
      viewBox="0 0 64 48"
      fill={color}
    >
      <path d="M0 48V29.333C0 18.511 5.689 10.133 17.067 4.2L21.333 10.4C15.644 13.956 12.089 18.578 10.667 24.267H21.333V48H0ZM37.333 48V29.333C37.333 18.511 43.022 10.133 54.4 4.2L58.667 10.4C52.978 13.956 49.422 18.578 48 24.267H58.667V48H37.333Z" />
    </svg>
  );
}

/* ── Lightbox ────────────────────────────────────────────────────── */
function Lightbox({ item, onClose }) {
  const backdropRef = useRef(null);
  const boxRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: "power2.out" },
    );
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, scale: 0.88, y: 32 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power4.out" },
    );
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    gsap.to(backdropRef.current, { opacity: 0, duration: 0.22 });
    gsap.to(boxRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={backdropRef}
      className="tst-lightbox-backdrop"
      onClick={handleClose}
    >
      <div
        ref={boxRef}
        className="tst-lightbox-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color band */}
        <div
          className="tst-lightbox-band"
          style={{
            background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
          }}
        />

        {/* Header */}
        <div className="tst-lightbox-header">
          <div className="tst-lightbox-title">
            <div
              className="tst-lightbox-icon"
              style={{
                background: `rgba(${item.colorRgb},0.1)`,
                color: item.color,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <div className="tst-lightbox-title-text">
              <span className="tst-lightbox-label">{item.name}</span>
              <span className="tst-lightbox-sub">
                Unedited conversation screenshot
              </span>
            </div>
          </div>
          <button
            className="tst-lightbox-close"
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
        </div>

        {/* Image / placeholder */}
        <div className="tst-lightbox-img-wrap">
          {item.chatScreenshot ? (
            <img
              src={item.chatScreenshot}
              alt={`Chat with ${item.name}`}
              className="tst-lightbox-img"
            />
          ) : (
            <div className="tst-lightbox-placeholder">
              <div
                className="tst-lightbox-placeholder-icon"
                style={{ color: item.color }}
              >
                <svg
                  width="44"
                  height="44"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  <path d="M8 10h8M8 14h5" />
                </svg>
              </div>
              <p className="tst-lightbox-placeholder-title">
                Screenshot not added yet
              </p>
              <p className="tst-lightbox-placeholder-hint">
                ضع مسار الصورة في <code>chatScreenshot</code> داخل الـ data
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export default function Testimonials() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const statsRef = useRef(null);
  const cardsRef = useRef([]);
  const orbRef = useRef(null);
  const orb2Ref = useRef(null);

  const [lightboxItem, setLightboxItem] = useState(null);

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
      gsap.to(orb2Ref.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

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

      const words = headlineRef.current?.querySelectorAll(".tst-word");
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

      gsap.fromTo(
        statsRef.current?.children,
        { opacity: 0, y: 28, scale: 0.88 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.65,
          stagger: 0.1,
          ease: "back.out(1.8)",
          scrollTrigger: { trigger: statsRef.current, start: "top 85%" },
        },
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;

        gsap.fromTo(
          card,
          { opacity: 0, y: 55, scale: 0.93, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.78,
            delay: (i % 3) * 0.08,
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
            scale: 1.025,
            duration: 0.35,
            ease: "power2.out",
            transformPerspective: 900,
          });
        };
        const onLeave = () =>
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.55,
            ease: "elastic.out(1, 0.5)",
          });

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /* Proof button — bounce animation then open lightbox */
  const handleProofClick = (e, item) => {
    const btn = e.currentTarget;
    gsap
      .timeline()
      .to(btn, { scale: 0.92, duration: 0.1, ease: "power2.in" })
      .to(btn, { scale: 1.06, duration: 0.18, ease: "back.out(2)" })
      .to(btn, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => setLightboxItem(item),
      });
  };

  const headlineWords = ["Client", "Stories"];

  return (
    <section id="testimonials" ref={sectionRef} className="tst-section">
      <div ref={orbRef} className="tst-orb" aria-hidden="true" />
      <div ref={orb2Ref} className="tst-orb tst-orb--2" aria-hidden="true" />

      <div className="container-xl tst-container">
        {/* ── Head ──────────────────────────────────────────────── */}
        <div className="tst-head">
          <div ref={labelRef} className="label-chip">
            <span className="dot dot--pulse" />
            Testimonials
          </div>

          <h2
            ref={headlineRef}
            className="tst-headline"
            style={{ perspective: "800px" }}
          >
            {headlineWords.map((w, i) => (
              <span key={i} className="tst-word-wrap">
                <span className={`tst-word ${i === 1 ? "gradient-text" : ""}`}>
                  {w}
                </span>
              </span>
            ))}
          </h2>

          <p ref={subtextRef} className="tst-subtext">
            Real feedback from the teams and founders we've had the privilege of
            building with.
          </p>
        </div>

        {/* ── Stats ─────────────────────────────────────────────── */}
        <div ref={statsRef} className="tst-stats">
          {[
            { value: "100%", label: "Satisfaction Rate" },
            { value: "5.0 ★", label: "Average Rating" },
            { value: "1+", label: "Happy Clients" },
            { value: "0", label: "Missed Deadlines" },
          ].map((s) => (
            <div key={s.label} className="tst-stat">
              <span className="tst-stat-value">{s.value}</span>
              <span className="tst-stat-label">{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Cards ─────────────────────────────────────────────── */}
        <div className="tst-grid">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className={`tst-card ${t.featured ? "tst-card--featured" : ""}`}
            >
              {/* Accent line */}
              <div
                className="tst-card-line"
                style={{
                  background: `linear-gradient(90deg, ${t.color}, ${t.color}66)`,
                }}
              />

              {/* Decorative quote */}
              <QuoteIcon color={t.color} />

              {/* Stars */}
              <Stars count={t.stars} />

              {/* Service tag */}
              <div className="tst-tag">{t.tag}</div>

              {/* Quote text */}
              <p className="tst-quote">"{t.quote}"</p>

              {/* ── Author row ───────────────────────────────────── */}
              <div className="tst-author">
                {/* Avatar */}
                <div
                  className="tst-avatar"
                  style={{
                    background: `linear-gradient(135deg, ${t.color}, ${t.color}bb)`,
                  }}
                >
                  {t.initials}
                </div>

                {/* Name + role */}
                <div className="tst-author-info">
                  <div className="tst-author-name">{t.name}</div>
                  <div className="tst-author-role">{t.role}</div>
                </div>

                {/* Verified badge */}
                <div className="tst-verified" title="Verified Client">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              </div>

              {/* ── Proof button ─────────────────────────────────── */}
              <button
                className="tst-proof-btn"
                style={{ "--proof-color": t.color, "--proof-rgb": t.colorRgb }}
                onClick={(e) => handleProofClick(e, t)}
                aria-label="View real client chat screenshot"
              >
                <span className="tst-proof-icon" style={{ color: t.color }}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                </span>
                <span className="tst-proof-label">View Real Review</span>
                <span className="tst-proof-arrow">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────── */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </section>
  );
}
