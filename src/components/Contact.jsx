import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
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
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email Us",
    value: "itera.codes@gmail.com",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=itera.codes@gmail.com&su=Contact%20Us&body=Hi%20there!",
    color: "#7C3AED",
    colorRgb: "124,58,237",
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
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.61-.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: "WhatsApp",
    value: "+20 104 442 3156",
    href: "https://wa.me/201044423156?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%D9%85%20%F0%9F%91%8B",
    color: "#A855F7",
    colorRgb: "168,85,247",
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
        <path d="M21 2H3v16h5l4 4 4-4h5V2z" />
        <path d="M9 10h6M9 7h6M9 13h4" />
      </svg>
    ),
    label: "Telegram",
    value: "@itera_dev",
    href: "https://t.me/itera_dev",
    color: "#4F46E5",
    colorRgb: "79,70,229",
  },
];

/* ── Floating label input ──────────────────────────────────────── */
function FloatingField({ label, children, focused }) {
  return (
    <div className={`ctc-field ${focused ? "ctc-field--focused" : ""}`}>
      <label className="ctc-label">{label}</label>
      {children}
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const formWrapRef = useRef(null);
  const infoRef = useRef(null);
  const channelsRef = useRef([]);
  const orbRef = useRef(null);
  const submitBtnRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Orb parallax ─────────────────────────────────────────── */
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

      /* ── Label ────────────────────────────────────────────────── */
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

      /* ── Headline ─────────────────────────────────────────────── */
      const words = headlineRef.current?.querySelectorAll(".ctc-word");
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

      /* ── Form wrap ────────────────────────────────────────────── */
      gsap.fromTo(
        formWrapRef.current,
        { opacity: 0, x: -48, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: formWrapRef.current, start: "top 82%" },
        },
      );

      /* ── Info + channels ──────────────────────────────────────── */
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, x: 48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: infoRef.current, start: "top 82%" },
        },
      );

      channelsRef.current.forEach((ch, i) => {
        if (!ch) return;
        gsap.fromTo(
          ch,
          { opacity: 0, y: 32, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ch, start: "top 88%" },
          },
        );

        /* Hover */
        const onEnter = () => {
          const rgb = ch.dataset.rgb;
          gsap.to(ch, { x: 6, scale: 1.02, duration: 0.3, ease: "power2.out" });
          gsap.to(ch.querySelector(".ctc-ch-icon"), {
            scale: 1.12,
            rotate: -6,
            duration: 0.35,
            ease: "back.out(2)",
          });
          gsap.to(ch.querySelector(".ctc-ch-arrow"), {
            x: 4,
            opacity: 1,
            duration: 0.3,
          });
          ch.style.borderColor = `rgba(${rgb},0.3)`;
          ch.style.boxShadow = `0 12px 40px rgba(${rgb},0.12)`;
        };
        const onLeave = () => {
          gsap.to(ch, {
            x: 0,
            scale: 1,
            duration: 0.45,
            ease: "elastic.out(1, 0.5)",
          });
          gsap.to(ch.querySelector(".ctc-ch-icon"), {
            scale: 1,
            rotate: 0,
            duration: 0.3,
          });
          gsap.to(ch.querySelector(".ctc-ch-arrow"), {
            x: 0,
            opacity: 0.4,
            duration: 0.25,
          });
          ch.style.borderColor = "";
          ch.style.boxShadow = "";
        };
        ch.addEventListener("mouseenter", onEnter);
        ch.addEventListener("mouseleave", onLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      access_key: import.meta.env.VITE_WEB3FORMS_KEY,
      name: formData.name,
      email: formData.email,
      project: formData.project,
      message: formData.message,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result.success) {
        setLoading(false);
        const btn = submitBtnRef.current;
        gsap
          .timeline()
          .to(btn, { scale: 0.94, duration: 0.1, ease: "power2.in" })
          .to(btn, { scale: 1.03, duration: 0.15, ease: "back.out(2)" })
          .to(btn, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
              setSubmitted(true);
              setTimeout(() => {
                const success =
                  sectionRef.current?.querySelector(".ctc-success");
                if (success) {
                  gsap.fromTo(
                    success,
                    { opacity: 0, scale: 0.9, y: 20 },
                    {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      duration: 0.6,
                      ease: "back.out(1.5)",
                    },
                  );
                }
              }, 50);
            },
          });
      } else {
        setLoading(false);
        alert(result.message || "Something went wrong.");
      }
    } catch (error) {
      setLoading(false);
      alert("Network error, please try again.");
    }
  };

  const headlineWords = ["Let's", "build", "something", "remarkable"];

  return (
    <section id="contact" ref={sectionRef} className="ctc-section">
      <div ref={orbRef} className="ctc-orb" aria-hidden="true" />

      <div className="container-xl ctc-container">
        {/* Head */}
        <div className="ctc-head">
          <div ref={labelRef} className="label-chip">
            <span className="dot dot--pulse" />
            Get In Touch
          </div>

          <h2
            ref={headlineRef}
            className="ctc-headline"
            style={{ perspective: "800px" }}
          >
            {headlineWords.map((w, i) => (
              <span key={i} className="ctc-word-wrap">
                <span className={`ctc-word ${i === 3 ? "gradient-text" : ""}`}>
                  {w}
                </span>
              </span>
            ))}
          </h2>

          <p ref={subtextRef} className="ctc-subtext">
            Have an idea or a project in mind? We'd love to hear about it. Reach
            out and let's start a conversation.
          </p>
        </div>

        {/* Body */}
        <div className="ctc-body">
          {/* Form */}
          <div ref={formWrapRef} className="ctc-form-wrap">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="ctc-form">
                <div className="ctc-row">
                  <FloatingField label="Your Name" focused={focused.name}>
                    <input
                      type="text"
                      name="name"
                      className="ctc-input"
                      placeholder="Enter Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocused((f) => ({ ...f, name: true }))}
                      onBlur={() => setFocused((f) => ({ ...f, name: false }))}
                      required
                    />
                  </FloatingField>

                  <FloatingField label="Email Address" focused={focused.email}>
                    <input
                      type="email"
                      name="email"
                      className="ctc-input"
                      placeholder="Enter Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocused((f) => ({ ...f, email: true }))}
                      onBlur={() => setFocused((f) => ({ ...f, email: false }))}
                      required
                    />
                  </FloatingField>
                </div>

                <FloatingField
                  label="Type of Project"
                  focused={focused.project}
                >
                  <select
                    name="project"
                    className="ctc-input ctc-select"
                    value={formData.project}
                    onChange={handleChange}
                    onFocus={() => setFocused((f) => ({ ...f, project: true }))}
                    onBlur={() => setFocused((f) => ({ ...f, project: false }))}
                    required
                  >
                    <option value="">Select a service...</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Custom System">Custom System</option>
                    <option value="Backend / API">Backend / API</option>
                    <option value="Dashboard / Admin">Dashboard / Admin</option>
                    <option value="Full-Stack Solution">
                      Full-Stack Solution
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </FloatingField>

                <FloatingField
                  label="Tell Us About Your Project"
                  focused={focused.message}
                >
                  <textarea
                    name="message"
                    className="ctc-input ctc-textarea"
                    placeholder="Describe your project, goals, and timeline..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocused((f) => ({ ...f, message: true }))}
                    onBlur={() => setFocused((f) => ({ ...f, message: false }))}
                    required
                  />
                </FloatingField>

                <button
                  ref={submitBtnRef}
                  type="submit"
                  className="btn-itera ctc-submit"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                  {!loading && (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  )}
                </button>
              </form>
            ) : (
              <div className="ctc-success">
                <div className="ctc-success-icon">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <h3>Message Received!</h3>
                <p>
                  Thanks for reaching out. We'll get back to you within 24
                  hours.
                </p>
                <button
                  className="btn-itera-outline ctc-reset"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      project: "",
                      message: "",
                    });
                  }}
                >
                  Send Another
                </button>
              </div>
            )}
          </div>

          {/* Info */}
          <div ref={infoRef} className="ctc-info">
            <div className="ctc-tagline">
              <h3 className="ctc-tagline-title">Ready to start?</h3>
              <p className="ctc-tagline-text">
                We typically respond within a few hours. For urgent projects,
                reach us directly through WhatsApp or Telegram.
              </p>
            </div>

            <div className="ctc-channels">
              {contactInfo.map((item, i) => (
                <a
                  key={item.label}
                  href={item.href}
                  ref={(el) => (channelsRef.current[i] = el)}
                  className="ctc-channel"
                  data-rgb={item.colorRgb}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    transition:
                      "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
                  }}
                >
                  <div
                    className="ctc-ch-icon"
                    style={{
                      background: `rgba(${item.colorRgb},0.1)`,
                      color: item.color,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div className="ctc-ch-text">
                    <div className="ctc-ch-label">{item.label}</div>
                    <div className="ctc-ch-value">{item.value}</div>
                  </div>
                  <svg
                    className="ctc-ch-arrow"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>

            <div className="ctc-availability">
              <div className="ctc-avail-dot" />
              <span>Available for new projects</span>
            </div>

            {/* Decorative quote */}
            <div className="ctc-quote">
              <p>"Great software starts with a great conversation."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
