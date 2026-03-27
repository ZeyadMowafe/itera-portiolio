import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "./LegalPrivacy.css";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information You Provide",
        text: "When you reach out to us through our contact form or via email, we collect the information you voluntarily provide — including your name, email address, and any project details you share. We only collect what's necessary to respond to your inquiry and provide our services.",
      },
      {
        subtitle: "Automatically Collected Data",
        text: "When you visit our website, we may automatically collect certain technical information such as your IP address, browser type, operating system, referring URLs, and pages visited. This data is collected through standard web server logs and analytics tools to help us understand how our site is used and improve the experience.",
      },
    ],
  },
  {
    number: "02",
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Communication & Service Delivery",
        text: "We use the contact information you provide solely to respond to your inquiries, provide project quotes, communicate about ongoing work, and deliver the services you've requested. We do not use your information for unsolicited marketing.",
      },
      {
        subtitle: "Site Improvement",
        text: "Anonymized and aggregated analytics data helps us understand which parts of our site are most useful, identify technical issues, and improve performance and usability. This data is never linked to individual users.",
      },
    ],
  },
  {
    number: "03",
    title: "Data Sharing & Third Parties",
    content: [
      {
        subtitle: "No Selling of Data",
        text: "We do not sell, rent, trade, or otherwise transfer your personal information to third parties for commercial purposes. Your data is not a product.",
      },
      {
        subtitle: "Service Providers",
        text: "We may share information with trusted third-party service providers who assist in operating our website or conducting our business — such as hosting providers, form services (e.g., Web3Forms), or communication tools. These parties are contractually obligated to keep your information confidential and use it only for the purposes we've specified.",
      },
      {
        subtitle: "Legal Requirements",
        text: "We may disclose your information if required to do so by law, or in the good-faith belief that such disclosure is necessary to comply with a legal obligation, protect our rights, or ensure the safety of others.",
      },
    ],
  },
  {
    number: "04",
    title: "Data Retention",
    content: [
      {
        subtitle: "How Long We Keep Your Data",
        text: "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, or as required by applicable law. Contact inquiry data is typically retained for up to 2 years. You may request deletion of your data at any time by contacting us.",
      },
    ],
  },
  {
    number: "05",
    title: "Cookies & Tracking",
    content: [
      {
        subtitle: "Our Use of Cookies",
        text: "Our website may use essential cookies to ensure basic functionality. We do not use advertising cookies or cross-site tracking cookies. Any analytics we use are configured to anonymize IP addresses and respect Do Not Track signals where possible.",
      },
      {
        subtitle: "Your Control",
        text: "You can control cookie preferences through your browser settings. Disabling cookies may affect some functionality of our site, but we aim to ensure the core experience remains accessible.",
      },
    ],
  },
  {
    number: "06",
    title: "Security",
    content: [
      {
        subtitle: "How We Protect Your Data",
        text: "We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our website uses HTTPS encryption for all data transmission. However, no method of transmission over the internet is 100% secure — we strive to use commercially acceptable means to protect your data but cannot guarantee absolute security.",
      },
    ],
  },
  {
    number: "07",
    title: "Your Rights",
    content: [
      {
        subtitle: "Access & Control",
        text: "You have the right to request access to the personal data we hold about you, request correction of inaccurate data, request deletion of your data, object to the processing of your data, and withdraw consent where processing is based on consent. To exercise any of these rights, please contact us at itera.codes@gmail.com.",
      },
    ],
  },
  {
    number: "08",
    title: "Changes to This Policy",
    content: [
      {
        subtitle: "Policy Updates",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal and operational reasons. When we make significant changes, we will update the 'Last Updated' date at the top of this page. We encourage you to review this policy periodically.",
      },
    ],
  },
];

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const sectionsRef = useRef([]);
  const orbRef = useRef(null);
  const orb2Ref = useRef(null);
  const lineRef = useRef(null);

  /* ── Smooth navigate to home ── */
  const goHome = (e) => {
    e.preventDefault();
    // Animate page out then navigate
    gsap.to(pageRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        navigate("/");
        window.scrollTo({ top: 0, behavior: "instant" });
      },
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    // Fade page in on mount
    gsap.fromTo(
      pageRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" }
    );

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Logo entrance
      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -20, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          titleRef.current?.querySelectorAll(".pp-title-line"),
          { opacity: 0, y: 48, rotateX: -18 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.85,
            stagger: 0.1,
            ease: "power4.out",
          },
          "-=0.3"
        )
        .fromTo(
          metaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: "power3.inOut" },
          "-=0.2"
        );

      // Orbs parallax
      gsap.to(orbRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
      gsap.to(orb2Ref.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Section cards
      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 87%" },
          }
        );

        const onMove = (e) => {
          const rect = el.getBoundingClientRect();
          const rx = ((e.clientY - rect.top) / rect.height - 0.5) * 5;
          const ry = ((e.clientX - rect.left) / rect.width - 0.5) * -5;
          gsap.to(el, {
            rotateX: rx,
            rotateY: ry,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 900,
          });
        };
        const onLeave = () => {
          gsap.to(el, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.6,
            ease: "elastic.out(1, 0.5)",
          });
        };
        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="pp-page">
      {/* Decorative orbs */}
      <div ref={orbRef} className="pp-orb pp-orb--1" aria-hidden="true" />
      <div ref={orb2Ref} className="pp-orb pp-orb--2" aria-hidden="true" />

      {/* Grid lines */}
      <div className="pp-grid-lines" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="pp-grid-line" style={{ "--i": i }} />
        ))}
      </div>

      {/* ── Hero ── */}
      <header ref={heroRef} className="pp-hero">
        <div className="container-xl pp-container">

          {/* Centered Logo — replaces navbar */}
          <div className="pp-logo-row">
            <a
              ref={logoRef}
              href="/"
              className="pp-logo"
              onClick={goHome}
            >
              <div className="pp-logo-box">
                <img src="./second_logo.svg" alt="Itera" className="pp-logo-img" />
              </div>
              <span className="pp-logo-text">ITERA</span>
            </a>
          </div>

          <h1 ref={titleRef} className="pp-title" style={{ perspective: "800px" }}>
            <span className="pp-title-line">Privacy</span>
            <span className="pp-title-line gradient-text">Policy</span>
          </h1>

          <div ref={metaRef} className="pp-meta">
            <div className="pp-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span>Last Updated: March 26, 2026</span>
            </div>
            <div className="pp-meta-sep" />
            <div className="pp-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
              <span>~5 min read</span>
            </div>
          </div>

          <div ref={lineRef} className="pp-hero-line" />
        </div>
      </header>

      {/* ── Content ── */}
      <main className="pp-main">
        <div className="container-xl pp-container">
          {/* Intro */}
          <div className="pp-intro">
            <p>
              At <strong>Itera Studio</strong>, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our site.
            </p>
          </div>

          {/* Sections */}
          <div className="pp-sections">
            {sections.map((sec, i) => (
              <div
                key={sec.number}
                ref={(el) => (sectionsRef.current[i] = el)}
                className="pp-section-card"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="pp-section-accent" />
                <div className="pp-section-header">
                  <span className="pp-section-num">{sec.number}</span>
                  <h2 className="pp-section-title">{sec.title}</h2>
                </div>
                <div className="pp-section-body">
                  {sec.content.map((item, j) => (
                    <div key={j} className="pp-subsection">
                      <h3 className="pp-subsection-title">
                        <span className="pp-subsection-dot" />
                        {item.subtitle}
                      </h3>
                      <p className="pp-subsection-text">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="pp-cta">
            <div className="pp-cta-inner">
              <div className="pp-cta-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="pp-cta-text">
                <h3>Questions about your privacy?</h3>
                <p>If you have any questions or concerns about this Privacy Policy or how we handle your data, please reach out — we're happy to help.</p>
              </div>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=itera.codes@gmail.com&su=Contact%20Us&body=Hi%20there!" className="btn-itera tos-cta-btn" target="_blank" rel="noopener noreferrer">
                Contact Us
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}