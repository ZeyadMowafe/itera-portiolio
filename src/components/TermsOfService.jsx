import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "./TermsOfService.css";

gsap.registerPlugin(ScrollTrigger);

const sections = [
  {
    number: "01",
    title: "Acceptance of Terms",
    content: [
      {
        subtitle: "Agreement to Terms",
        text: "By accessing or using the Itera Studio website (itera.dev) or engaging our services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing our services.",
      },
      {
        subtitle: "Eligibility",
        text: "You must be at least 18 years of age and have the legal authority to enter into binding agreements on behalf of yourself or the organization you represent. By using our services, you confirm that you meet these requirements.",
      },
    ],
  },
  {
    number: "02",
    title: "Our Services",
    content: [
      {
        subtitle: "Scope of Services",
        text: "Itera Studio provides full-stack web development services including, but not limited to: web application development, custom management systems, API development, dashboard and admin interface design, and end-to-end digital product engineering. The specific scope, deliverables, timelines, and pricing for any engagement are defined in a separate project agreement or proposal.",
      },
      {
        subtitle: "Service Modifications",
        text: "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time. We will provide reasonable notice of significant changes where possible. Itera Studio shall not be liable to you or any third party for any modification, suspension, or discontinuation of services.",
      },
    ],
  },
  {
    number: "03",
    title: "Project Engagements",
    content: [
      {
        subtitle: "Project Agreements",
        text: "Individual projects are governed by a separate written agreement, proposal, or statement of work that outlines the specific deliverables, timeline, payment terms, and other project-specific conditions. These Terms of Service apply in conjunction with any such project agreement.",
      },
      {
        subtitle: "Client Responsibilities",
        text: "You agree to provide timely, accurate information and materials required for project completion, designate a primary point of contact for communication, review and provide feedback on deliverables within agreed timeframes, and make payments according to the agreed schedule.",
      },
      {
        subtitle: "Revisions & Change Requests",
        text: "The number of revisions included in a project is defined in the project agreement. Additional revisions or changes that fall outside the original project scope may be subject to additional fees, which will be communicated and agreed upon before work begins.",
      },
    ],
  },
  {
    number: "04",
    title: "Intellectual Property",
    content: [
      {
        subtitle: "Client Ownership",
        text: "Upon receipt of full payment for a project, Itera Studio assigns to you all ownership rights, title, and interest in the final deliverables specifically created for your project, including source code, design files, and related materials as outlined in the project agreement.",
      },
      {
        subtitle: "Itera Retained Rights",
        text: "Itera Studio retains ownership of all pre-existing intellectual property, tools, frameworks, libraries, and methodologies used in delivering services. We also retain the right to display the work in our portfolio and use it for promotional purposes, unless otherwise agreed in writing.",
      },
      {
        subtitle: "Third-Party Components",
        text: "Our projects may incorporate open-source libraries, frameworks, or third-party components. These remain subject to their respective licenses. We will inform you of any significant third-party components used in your project.",
      },
    ],
  },
  {
    number: "05",
    title: "Payment Terms",
    content: [
      {
        subtitle: "Fees & Invoicing",
        text: "Project fees are as agreed in the project proposal or agreement. Invoices are due within the timeframe specified in the project agreement. Payments can be made via the methods outlined in your proposal.",
      },
      {
        subtitle: "Late Payments",
        text: "Payments not received by the due date may result in a pause of project work until payment is received. Itera Studio reserves the right to apply a late payment fee of up to 2% per month on overdue amounts.",
      },
      {
        subtitle: "Refunds",
        text: "Due to the nature of custom development work, refunds are not generally available for work already completed. If a project is cancelled by the client, payment is due for all work completed up to the cancellation date. Specific refund terms may be outlined in individual project agreements.",
      },
    ],
  },
  {
    number: "06",
    title: "Confidentiality",
    content: [
      {
        subtitle: "Mutual Confidentiality",
        text: "Both parties agree to keep confidential any proprietary or sensitive information shared during the course of engagement. This includes business strategies, technical specifications, financial information, and any other information designated as confidential. This obligation survives the termination of our engagement.",
      },
      {
        subtitle: "Exceptions",
        text: "Confidentiality obligations do not apply to information that is or becomes publicly known through no breach of this agreement, was independently developed without use of the other party's confidential information, or is required to be disclosed by law.",
      },
    ],
  },
  {
    number: "07",
    title: "Limitation of Liability",
    content: [
      {
        subtitle: "No Consequential Damages",
        text: "To the maximum extent permitted by applicable law, Itera Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages — including lost profits, data loss, or business interruption — arising from your use of our services, even if we have been advised of the possibility of such damages.",
      },
      {
        subtitle: "Liability Cap",
        text: "Our total liability to you for any claim arising from or related to these Terms or our services shall not exceed the total fees paid by you to Itera Studio in the three months preceding the claim.",
      },
    ],
  },
  {
    number: "08",
    title: "Warranties & Disclaimers",
    content: [
      {
        subtitle: "Our Commitment",
        text: "Itera Studio warrants that our services will be performed in a professional and workmanlike manner consistent with industry standards. We warrant that we have the right to provide the services and that our work product will not knowingly infringe on third-party intellectual property rights.",
      },
      {
        subtitle: "Disclaimer",
        text: 'Except as expressly stated, our services and website are provided "as is" without warranties of any kind, either express or implied. We do not warrant that the website will be error-free or uninterrupted, or that specific business results will be achieved through our services.',
      },
    ],
  },
  {
    number: "09",
    title: "Termination",
    content: [
      {
        subtitle: "Termination by Either Party",
        text: "Either party may terminate a project engagement with written notice as specified in the project agreement. Upon termination, you agree to pay for all services rendered up to the termination date. Itera Studio will provide all completed work product for which payment has been received.",
      },
      {
        subtitle: "Effect of Termination",
        text: "Sections of these Terms that by their nature should survive termination — including intellectual property, confidentiality, payment obligations, and limitation of liability — will remain in effect.",
      },
    ],
  },
  {
    number: "10",
    title: "Governing Law & Disputes",
    content: [
      {
        subtitle: "Governing Law",
        text: "These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these Terms or our services shall first be attempted to be resolved through good-faith negotiation between the parties.",
      },
      {
        subtitle: "Dispute Resolution",
        text: "If good-faith negotiation fails to resolve a dispute within 30 days, the parties agree to seek resolution through mediation before pursuing other legal remedies. This clause does not prevent either party from seeking urgent injunctive relief when necessary.",
      },
    ],
  },
  {
    number: "11",
    title: "Changes to Terms",
    content: [
      {
        subtitle: "Modifications",
        text: "Itera Studio reserves the right to modify these Terms of Service at any time. Material changes will be indicated by updating the 'Last Updated' date. Your continued use of our services after changes are posted constitutes acceptance of the updated terms. We encourage you to review these Terms periodically.",
      },
    ],
  },
];

export default function TermsOfService() {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const logoRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const sectionsRef = useRef([]);
  const orbRef = useRef(null);
  const orb2Ref = useRef(null);
  const lineRef = useRef(null);
  const tocRef = useRef(null);

  /* ── Smooth navigate to home ── */
  const goHome = (e) => {
    e.preventDefault();
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

      tl.fromTo(
        logoRef.current,
        { opacity: 0, y: -20, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
      )
        .fromTo(
          titleRef.current?.querySelectorAll(".tos-title-line"),
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

      // TOC entrance
      gsap.fromTo(tocRef.current, { opacity: 0, x: -30 }, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: tocRef.current, start: "top 85%" },
      });

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

  const scrollToSection = (e, index) => {
    e.preventDefault();
    sectionsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={pageRef} className="tos-page">
      {/* Decorative orbs */}
      <div ref={orbRef} className="tos-orb tos-orb--1" aria-hidden="true" />
      <div ref={orb2Ref} className="tos-orb tos-orb--2" aria-hidden="true" />

      {/* Grid lines */}
      <div className="tos-grid-lines" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="tos-grid-line" style={{ "--i": i }} />
        ))}
      </div>

      {/* ── Hero ── */}
      <header className="tos-hero">
        <div className="container-xl tos-container">

          {/* Centered Logo — replaces navbar */}
          <div className="tos-logo-row">
            <a
              ref={logoRef}
              href="/"
              className="tos-logo"
              onClick={goHome}
            >
              <div className="tos-logo-box">
                <img src="./second_logo.svg" alt="Itera" className="tos-logo-img" />
              </div>
              <span className="tos-logo-text">ITERA</span>
            </a>
          </div>

          <h1 ref={titleRef} className="tos-title" style={{ perspective: "800px" }}>
            <span className="tos-title-line">Terms of</span>
            <span className="tos-title-line gradient-text">Service</span>
          </h1>

          <div ref={metaRef} className="tos-meta">
            <div className="tos-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <span>Last Updated: March 26, 2026</span>
            </div>
            <div className="tos-meta-sep" />
            <div className="tos-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l3 3" />
              </svg>
              <span>~8 min read</span>
            </div>
            <div className="tos-meta-sep" />
            <div className="tos-meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span>11 Sections</span>
            </div>
          </div>

          <div ref={lineRef} className="tos-hero-line" />
        </div>
      </header>

      {/* ── Content ── */}
      <main className="tos-main">
        <div className="container-xl tos-container">
          <div className="tos-layout">

            {/* ToC sidebar */}
            <aside ref={tocRef} className="tos-toc">
              <div className="tos-toc-inner">
                <div className="tos-toc-label">Contents</div>
                <nav>
                  {sections.map((sec, i) => (
                    <a
                      key={sec.number}
                      href={`#section-${i}`}
                      className="tos-toc-link"
                      onClick={(e) => scrollToSection(e, i)}
                    >
                      <span className="tos-toc-num">{sec.number}</span>
                      <span className="tos-toc-text">{sec.title}</span>
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main body */}
            <div className="tos-body">
              {/* Intro */}
              <div className="tos-intro">
                <p>
                  Welcome to <strong>Itera Studio</strong>. These Terms of Service govern your use of our website and services. By engaging with Itera Studio, you acknowledge that you have read, understood, and agree to be bound by these terms. Please read them carefully before proceeding.
                </p>
              </div>

              {/* Sections */}
              <div className="tos-sections">
                {sections.map((sec, i) => (
                  <div
                    key={sec.number}
                    id={`section-${i}`}
                    ref={(el) => (sectionsRef.current[i] = el)}
                    className="tos-section-card"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <div className="tos-section-accent" />
                    <div className="tos-section-header">
                      <span className="tos-section-num">{sec.number}</span>
                      <h2 className="tos-section-title">{sec.title}</h2>
                    </div>
                    <div className="tos-section-body">
                      {sec.content.map((item, j) => (
                        <div key={j} className="tos-subsection">
                          <h3 className="tos-subsection-title">
                            <span className="tos-subsection-dot" />
                            {item.subtitle}
                          </h3>
                          <p className="tos-subsection-text">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="tos-cta">
                <div className="tos-cta-inner">
                  <div className="tos-cta-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.61-.61a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div className="tos-cta-text">
                    <h3>Need clarification on any of these terms?</h3>
                    <p>We believe in transparency. If anything in these Terms is unclear or you have specific questions about a project engagement, get in touch.</p>
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
          </div>
        </div>
      </main>
    </div>
  );
}