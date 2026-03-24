import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Navbar.css";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const logoRef = useRef(null);
  const ctaRef = useRef(null);
  const progressRef = useRef(null);
  const menuOverlayRef = useRef(null);
  const menuLinksRef = useRef([]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  /* ── Entrance ──────────────────────────────────────────────────── */
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
    )
      .fromTo(
        logoRef.current,
        { opacity: 0, x: -20, filter: "blur(6px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.5",
      )
      .fromTo(
        linksRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.07, ease: "power2.out" },
        "-=0.4",
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.85, filter: "blur(4px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.3",
      );
    return () => tl.kill();
  }, []);

  /* ── Scroll: progress bar + state ─────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);

      /* scroll progress bar */
      if (progressRef.current) {
        const total = document.body.scrollHeight - window.innerHeight;
        progressRef.current.style.transform = `scaleX(${total > 0 ? y / total : 0})`;
      }

      /* active section highlight */
      const sections = navLinks
        .map((l) => ({
          id: l.href.slice(1),
          el: document.querySelector(l.href),
        }))
        .filter((s) => s.el);

      let current = null;
      sections.forEach(({ id, el }) => {
        if (window.scrollY >= el.offsetTop - 120) current = id;
      });
      setActiveLink(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Menu open/close ─────────────────────────────────────────── */
  useEffect(() => {
    let scrollInterval;
    let fallbackTimeout;

    if (!menuOverlayRef.current) return;
    
    if (menuOpen) {
      // 1. Trigger smooth scroll to the top
      window.scrollTo({ top: 0, behavior: "smooth" });
      
      // 2. Soft-lock scrolling temporarily
      document.body.style.overflow = "hidden";

      // 3. Wait until we reach the top before applying the hard lock (position: fixed)
      scrollInterval = setInterval(() => {
        if (window.scrollY <= 10) {
          document.body.classList.add("menu-open");
          clearInterval(scrollInterval);
        }
      }, 50);

      // Fallback safely in case smooth scroll takes too long or gets stuck
      fallbackTimeout = setTimeout(() => {
        document.body.classList.add("menu-open");
        clearInterval(scrollInterval);
      }, 1200);

      gsap.set(menuOverlayRef.current, { display: "flex" });
      const tl = gsap.timeline();
      tl.fromTo(
        menuOverlayRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        { clipPath: "inset(0 0 0% 0)", duration: 0.55, ease: "power4.inOut" },
      ).fromTo(
        menuLinksRef.current,
        { opacity: 0, x: 32, filter: "blur(4px)" },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          stagger: 0.06,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.2",
      );
    } else {
      // Restore background scrolling
      document.body.classList.remove("menu-open");
      document.body.style.overflow = "";

      const tl = gsap.timeline({
        onComplete: () => gsap.set(menuOverlayRef.current, { display: "none" }),
      });
      tl.fromTo(
        menuLinksRef.current,
        { opacity: 1, x: 0 },
        {
          opacity: 0,
          x: -20,
          stagger: 0.04,
          duration: 0.25,
          ease: "power2.in",
        },
      ).to(
        menuOverlayRef.current,
        { clipPath: "inset(0 0 100% 0)", duration: 0.45, ease: "power4.inOut" },
        "-=0.1",
      );
    }

    // Cleanup intervals/timeouts if component unmounts or menuOpen changes
    return () => {
      clearInterval(scrollInterval);
      clearTimeout(fallbackTimeout);
    };
  }, [menuOpen]);

  /* ── Magnetic logo ───────────────────────────────────────────── */
  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - rect.left - rect.width / 2) * 0.2;
      const dy = (e.clientY - rect.top - rect.height / 2) * 0.2;
      gsap.to(el, { x: dx, y: dy, duration: 0.4, ease: "power2.out" });
    };
    const onLeave = () =>
      gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // Close the menu
    setMenuOpen(false);
    
    const el = document.querySelector(href);
    if (el) {
      // Timeout ensures the body position:fixed is fully removed before scrolling
      // We also calculate offset to account for the fixed navbar height
      setTimeout(() => {
        const navHeight = 80;
        const targetPosition = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPosition, behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <>
      <nav ref={navRef} className={`itera-nav ${scrolled ? "scrolled" : ""}`}>
        {/* Scroll progress bar */}
        <div ref={progressRef} className="nav-progress" />

        <div className="nav-inner container-xl">
          {/* Logo */}
          <a
            ref={logoRef}
            href="#"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <div className="nav-logo-box">
              <img src="./second_logo.svg" alt="Itera" className="nav-logo-img" />
            </div>
            <span className="nav-logo-text">ITERA</span>
          </a>

          {/* Desktop links */}
          <ul className="nav-links">
            {navLinks.map((link, i) => (
              <li key={link.label}>
                <a
                  ref={(el) => (linksRef.current[i] = el)}
                  href={link.href}
                  className={`nav-link ${activeLink === link.href.slice(1) ? "active" : ""}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="nav-link-inner">{link.label}</span>
                  <span className="nav-link-dot" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <a
            ref={ctaRef}
            href="#contact"
            className="btn-itera nav-cta-desktop"
            onClick={(e) => handleNavClick(e, "#contact")}
          >
            Start a Project
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

          {/* Hamburger */}
          <button
            className={`nav-hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Full-screen mobile menu overlay */}
      <div
        ref={menuOverlayRef}
        className="nav-overlay"
        style={{ display: "none" }}
      >
        <button 
          className="nav-overlay-close" 
          onClick={() => setMenuOpen(false)}
          aria-label="Close Menu"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <ul className="nav-overlay-links">
          {navLinks.map((link, i) => (
            <li key={link.label} ref={(el) => (menuLinksRef.current[i] = el)}>
              <a
                href={link.href}
                className="nav-overlay-link"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <span className="nav-overlay-num">0{i + 1}</span>
                {link.label}
                <svg
                  className="nav-overlay-arrow"
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </li>
          ))}
          <li
            ref={(el) => (menuLinksRef.current[navLinks.length] = el)}
            className="nav-overlay-cta"
          >
            <a
              href="#contact"
              className="btn-itera"
              onClick={(e) => handleNavClick(e, "#contact")}
            >
              Start a Project
            </a>
          </li>
        </ul>

        {/* Decorative bottom text */}
        <div className="nav-overlay-footer">
          <span>©2025 Itera Studio</span>
          <span>hello@itera.dev</span>
        </div>
      </div>
    </>
  );
}
