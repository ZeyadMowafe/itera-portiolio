import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Company: [
    { label: "About", href: "#about", internal: true },
    { label: "Services", href: "#services", internal: true },
    { label: "Process", href: "#process", internal: true },
    { label: "Projects", href: "#projects", internal: true },
  ],
  Services: [
    { label: "Web Development", href: "#services", internal: true },
    { label: "Custom Systems", href: "#services", internal: true },
    { label: "API Development", href: "#services", internal: true },
    { label: "Dashboards", href: "#services", internal: true },
  ],
  Connect: [
    {
      label: "GitHub",
      href: "https://github.com/iteracodes-dev",
      internal: false,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/itera-dev/",
      internal: false,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/itera.dev/",
      internal: false,
    },
    { label: "Telegram", href: "https://t.me/itera_dev", internal: false },
  ],
};

export default function Footer() {
  const footerRef = useRef(null);
  const brandRef = useRef(null);
  const linksRef = useRef(null);
  const bottomRef = useRef(null);
  const socialsRef = useRef([]);
  const bigTextRef = useRef(null);
  const orbRef = useRef(null);

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Orb float ───────────────────────────────────────────── */
      gsap.to(orbRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      /* ── Big background text ─────────────────────────────────── */
      gsap.fromTo(
        bigTextRef.current,
        { opacity: 0, y: 60, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: bigTextRef.current, start: "top 90%" },
        },
      );

      /* ── Brand block ─────────────────────────────────────────── */
      gsap.fromTo(
        brandRef.current,
        { opacity: 0, x: -40, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: brandRef.current, start: "top 90%" },
        },
      );

      /* ── Link columns ────────────────────────────────────────── */
      const cols = linksRef.current?.querySelectorAll(".ftr-col");
      if (cols?.length) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 36, filter: "blur(4px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: linksRef.current, start: "top 90%" },
          },
        );
        cols.forEach((col) => {
          const links = col.querySelectorAll(".ftr-link");
          gsap.fromTo(
            links,
            { opacity: 0, x: -12 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.06,
              ease: "power2.out",
              scrollTrigger: { trigger: col, start: "top 92%" },
            },
          );
        });
      }

      /* ── Socials ─────────────────────────────────────────────── */
      gsap.fromTo(
        socialsRef.current,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "back.out(2)",
          scrollTrigger: { trigger: brandRef.current, start: "top 90%" },
        },
      );

      /* ── Bottom bar ──────────────────────────────────────────── */
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: bottomRef.current, start: "top 98%" },
        },
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  /* ── Handle nav clicks ───────────────────────────────────────── */
  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (!link.internal) {
      if (link.href !== "#")
        window.open(link.href, "_blank", "noopener,noreferrer");
      return;
    }
    if (window.location.pathname === "/") {
      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document
          .querySelector(link.href)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 400);
    }
  };

  /* ── Smooth navigate to legal pages ─────────────────────────── */
  const navigateLegal = (e, path) => {
    e.preventDefault();
    // Animate footer out slightly then navigate
    gsap.to(footerRef.current, {
      opacity: 0,
      y: -10,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Restore footer opacity for when user comes back
        gsap.set(footerRef.current, { opacity: 1, y: 0 });
      },
    });
  };

  /* ── Social icon hover ───────────────────────────────────────── */
  const handleSocialEnter = (i) => {
    gsap.to(socialsRef.current[i], {
      scale: 1.15,
      y: -3,
      duration: 0.3,
      ease: "back.out(2)",
    });
  };
  const handleSocialLeave = (i) => {
    gsap.to(socialsRef.current[i], {
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <footer ref={footerRef} className="itera-footer">
      {/* Orb glow */}
      <div ref={orbRef} className="ftr-orb" aria-hidden="true" />

      {/* Big decorative text */}
      <div ref={bigTextRef} className="ftr-big-text" aria-hidden="true">
        ITERA
      </div>

      <div className="container-xl ftr-container">
        {/* Top grid */}
        <div className="ftr-top">
          {/* Brand */}
          <div ref={brandRef} className="ftr-brand">
            <a
              href="/"
              className="ftr-logo"
              onClick={(e) => {
                e.preventDefault();
                if (window.location.pathname === "/") {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <div className="ftr-logo-box">
                <img src="./second_logo.svg" alt="Itera" />
              </div>
              <span className="ftr-logo-text">ITERA</span>
            </a>

            <p className="ftr-tagline">
              Building powerful digital systems for the companies and ideas that
              matter.
            </p>

            {/* Availability badge */}
            <div className="ftr-available">
              <div className="ftr-avail-dot" />
              <span>Available for new projects</span>
            </div>

            {/* Socials */}
            <div className="ftr-socials">
              {[
                {
                  name: "GitHub",
                  href: "https://github.com/iteracodes-dev",
                  path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z",
                },
                {
                  name: "LinkedIn",
                  href: "https://www.linkedin.com/company/itera-dev/",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
                {
                  name: "Instagram",
                  href: "https://www.instagram.com/itera.dev/",
                  path: "M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5zm0 1.5h8.5c2.347 0 4.25 1.903 4.25 4.25v8.5c0 2.347-1.903 4.25-4.25 4.25h-8.5c-2.347 0-4.25-1.903-4.25-4.25v-8.5c0-2.347 1.903-4.25 4.25-4.25zm4.25 3.5a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zm0 1.5a3.25 3.25 0 110 6.5 3.25 3.25 0 010-6.5zm5.25-.88a1.12 1.12 0 100 2.24 1.12 1.12 0 000-2.24z",
                },
              ].map((s, i) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  ref={(el) => (socialsRef.current[i] = el)}
                  className="ftr-social"
                  onMouseEnter={() => handleSocialEnter(i)}
                  onMouseLeave={() => handleSocialLeave(i)}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div ref={linksRef} className="ftr-links-grid">
            {Object.entries(footerLinks).map(([cat, links]) => (
              <div key={cat} className="ftr-col">
                <h5 className="ftr-col-title">{cat}</h5>
                <ul>
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="ftr-link"
                        onClick={(e) => handleLinkClick(e, link)}
                      >
                        <span className="ftr-link-dot" />
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="ftr-divider" />

        {/* Bottom */}
        <div ref={bottomRef} className="ftr-bottom">
          <p>© {currentYear} Itera Studio. All rights reserved.</p>
          <div className="ftr-bottom-links">
            <a
              href="/privacy-policy"
              className="ftr-link"
              onClick={(e) => navigateLegal(e, "/privacy-policy")}
            >
              Privacy Policy
            </a>
            <a
              href="/terms-of-service"
              className="ftr-link"
              onClick={(e) => navigateLegal(e, "/terms-of-service")}
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
