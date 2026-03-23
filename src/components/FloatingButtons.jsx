import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./FloatingButtons.css";

/* ── Config ── */
const WA_NUMBER  = "201234567890";
const WA_MESSAGE = "مرحباً، أود الاستفسار عن خدماتكم 👋";
const WA_URL     = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
const SCROLL_THRESHOLD = 300; // بعد كام px يحصل الـ swap

/* ── Particle spawner ── */
function spawnParticle(container, x, y, color) {
  const p = document.createElement("div");
  p.className = "fb-particle";
  p.style.cssText = `left:${x}px;top:${y}px;background:${color};`;
  container.appendChild(p);
  const angle = Math.random() * Math.PI * 2;
  const dist  = 18 + Math.random() * 22;
  gsap.to(p, {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    opacity: 0, scale: 0,
    duration: 0.5 + Math.random() * 0.3,
    ease: "power2.out",
    onComplete: () => p.remove(),
  });
}

export default function FloatingButtons() {
  const waBtnRef       = useRef(null);
  const sttBtnRef      = useRef(null);
  const waBubbleRef    = useRef(null);
  const waRing1Ref     = useRef(null);
  const waRing2Ref     = useRef(null);
  const waIconRef      = useRef(null);
  const sttPath1Ref    = useRef(null);
  const sttPath2Ref    = useRef(null);
  const sttGhostRef    = useRef(null);
  const sttOrbRef      = useRef(null);
  const sttGlowRef     = useRef(null);
  const sttProgressRef = useRef(null);
  const sttParticleRef = useRef(null);
  const wrapperRef     = useRef(null);

  const [scrolled,  setScrolled]  = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const isSwapping   = useRef(false);
  const isAnimating  = useRef(false);
  const particleInt  = useRef(null);
  const sttPathLoop  = useRef(null);
  const sttOrbLoop   = useRef(null);
  const waRingLoop1  = useRef(null);
  const waRingLoop2  = useRef(null);
  const waBubbleLoop = useRef(null);

  /* ── Scroll tracking ── */
  useEffect(() => {
    const onScroll = () => {
      const y     = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? y / total : 0);
      setScrolled(y > SCROLL_THRESHOLD);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Initial entrance — WA slides in from right ── */
  useEffect(() => {
    const wa = waBtnRef.current;
    if (!wa) return;
    gsap.fromTo(wa,
      { opacity: 0, scale: 0.3, x: 30, rotate: 20 },
      { opacity: 1, scale: 1, x: 0, rotate: 0,
        duration: 0.8, ease: "back.out(2)", delay: 1.2 }
    );
    // STT starts hidden
    gsap.set(sttBtnRef.current, { opacity: 0, scale: 0.3, y: 30 });
  }, []);

  /* ── WA idle animations ── */
  useEffect(() => {
    const r1 = waRing1Ref.current;
    const r2 = waRing2Ref.current;
    if (!r1 || !r2) return;

    waRingLoop1.current = gsap.to(r1, {
      scale: 1.8, opacity: 0, duration: 1.9,
      ease: "power2.out", repeat: -1, repeatDelay: 0.3
    });
    waRingLoop2.current = gsap.to(r2, {
      scale: 1.8, opacity: 0, duration: 1.9,
      ease: "power2.out", repeat: -1, repeatDelay: 0.3, delay: 0.8
    });
  }, []);

  /* ── STT idle animations ── */
  useEffect(() => {
    const p1 = sttPath1Ref.current;
    const p2 = sttPath2Ref.current;
    const orb = sttOrbRef.current;
    if (!p1 || !p2 || !orb) return;

    const l1 = p1.getTotalLength?.() || 2200;
    const l2 = p2.getTotalLength?.() || 2200;
    p1.style.strokeDasharray  = l1;
    p1.style.strokeDashoffset = l1;
    p2.style.strokeDasharray  = l2;
    p2.style.strokeDashoffset = l2;

    sttPathLoop.current = gsap.to([p1, p2], {
      strokeDashoffset: 0, duration: 2.6,
      ease: "power1.inOut", yoyo: true, repeat: -1, stagger: 0.5
    });
    sttOrbLoop.current = gsap.to(orb, {
      scale: 1.7, opacity: 0, duration: 1.9,
      ease: "power2.out", repeat: -1, repeatDelay: 0.5
    });
  }, []);

  /* ── Progress ring ── */
  useEffect(() => {
    const ring = sttProgressRef.current;
    if (!ring) return;
    const circ = 2 * Math.PI * 46;
    ring.style.strokeDasharray  = circ;
    ring.style.strokeDashoffset = circ * (1 - scrollPct);
  }, [scrollPct]);

  /* ── THE SWAP ── */
  useEffect(() => {
    if (isSwapping.current) return;
    const wa  = waBtnRef.current;
    const stt = sttBtnRef.current;
    if (!wa || !stt) return;

    isSwapping.current = true;

    if (scrolled) {
      /* WA → exit down, STT → enter from below */
      gsap.timeline({ onComplete: () => { isSwapping.current = false; } })
        .to(wa, {
          y: 40, opacity: 0, scale: 0.5, rotate: -15,
          duration: 0.45, ease: "back.in(1.8)"
        })
        .fromTo(stt,
          { y: 30, opacity: 0, scale: 0.4, rotate: 10 },
          { y: 0,  opacity: 1, scale: 1,   rotate: 0,
            duration: 0.6, ease: "back.out(2)" },
          "-=0.1"
        );
    } else {
      /* STT → exit down, WA → enter from below */
      gsap.timeline({ onComplete: () => { isSwapping.current = false; } })
        .to(stt, {
          y: 40, opacity: 0, scale: 0.5, rotate: 15,
          duration: 0.45, ease: "back.in(1.8)"
        })
        .fromTo(wa,
          { y: 30, opacity: 0, scale: 0.4, rotate: -10 },
          { y: 0,  opacity: 1, scale: 1,   rotate: 0,
            duration: 0.6, ease: "back.out(2)" },
          "-=0.1"
        );
    }
  }, [scrolled]);

  /* ── WA click ── */
  const handleWaClick = () => {
    const btn = waBtnRef.current;
    gsap.timeline()
      .to(btn, { scale: 0.85, duration: 0.1, ease: "power3.in" })
      .to(btn, { scale: 1.15, duration: 0.3, ease: "back.out(2)" })
      .to(btn, { scale: 1,    duration: 0.2, ease: "power2.out",
        onComplete: () => window.open(WA_URL, "_blank", "noopener,noreferrer")
      });
  };

  /* ── STT click ── */
  const handleSttClick = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const btn  = sttBtnRef.current;
    const host = sttParticleRef.current;
    const rect = btn.getBoundingClientRect();
    const cx   = rect.width  / 2;
    const cy   = rect.height / 2;
    const colors = ["#7C3AED","#A855F7","#4F46E5","#C084FC","#fff"];

    for (let i = 0; i < 18; i++)
      setTimeout(() => spawnParticle(host, cx, cy, colors[i % colors.length]), i * 16);

    gsap.fromTo(sttGlowRef.current,
      { opacity: 0.85, scale: 1 },
      { opacity: 0,    scale: 2.5, duration: 0.6, ease: "power2.out" }
    );

    gsap.timeline({ onComplete: () => { isAnimating.current = false; } })
      .to(btn, { scale: 0.82, duration: 0.1, ease: "power3.in" })
      .to(btn, { scale: 1.18, rotate: 12,  duration: 0.35, ease: "back.out(2)" })
      .to(btn, { scale: 1,    rotate: 0,   duration: 0.3,  ease: "elastic.out(1,0.5)" });

    window.scrollTo({ top: 0, behavior: "smooth" });

    clearInterval(particleInt.current);
    particleInt.current = setInterval(() => {
      if (window.scrollY < 10) { clearInterval(particleInt.current); return; }
      spawnParticle(host, cx + (Math.random()-.5)*20, cy + (Math.random()-.5)*20,
        colors[Math.floor(Math.random() * colors.length)]);
    }, 80);
  };

  /* ── WA Hover ── */
  const handleWaEnter = () => gsap.to(waBtnRef.current, { scale: 1.12, duration: 0.3, ease: "back.out(2)" });
  const handleWaLeave = () => gsap.to(waBtnRef.current, { scale: 1,    duration: 0.5, ease: "elastic.out(1,0.4)" });

  /* ── STT Hover ── */
  const handleSttEnter = () => gsap.to(sttBtnRef.current, { scale: 1.1, duration: 0.3, ease: "back.out(2)" });
  const handleSttLeave = () => gsap.to(sttBtnRef.current, { scale: 1,   duration: 0.5, ease: "elastic.out(1,0.4)" });

  return (
    <div ref={wrapperRef} className="fb-wrapper">

      {/* ══════════════ WhatsApp Button ══════════════ */}
      <div
        ref={waBtnRef}
        className="fb-wa-btn"
        onClick={handleWaClick}
        onMouseEnter={handleWaEnter}
        onMouseLeave={handleWaLeave}
        aria-label="تواصل معنا على واتساب"
        role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleWaClick()}
      >
        {/* Pulse rings */}
        <div ref={waRing1Ref} className="fb-wa-ring" />
        <div ref={waRing2Ref} className="fb-wa-ring fb-wa-ring--2" />

        {/* Bubble */}
        <div ref={waBubbleRef} className="fb-wa-bubble">
          تواصل معنا
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        </div>

        {/* WA Icon */}
        <svg ref={waIconRef} className="fb-wa-icon" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="url(#wa-g)"/>
          <path fill="#fff"
            d="M16 6.4C10.7 6.4 6.4 10.7 6.4 16c0 1.73.46 3.35 1.26 4.75L6.4 25.6l5.03-1.18A9.56 9.56 0 0016 25.6c5.3 0 9.6-4.3 9.6-9.6S21.3 6.4 16 6.4zm0 17.6a7.94 7.94 0 01-4.1-1.14l-.29-.17-3.01.79.8-2.93-.19-.3A7.97 7.97 0 018.03 16C8.03 11.6 11.6 8.03 16 8.03S23.97 11.6 23.97 16 20.4 24 16 24zm4.36-5.98c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06a6.53 6.53 0 01-1.93-1.18c-.71-.64-1.2-1.42-1.34-1.66-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4-.14 0-.3-.02-.46-.02s-.42.06-.64.3c-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z"
          />
          <defs>
            <linearGradient id="wa-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#128C7E"/>
              <stop offset="100%" stopColor="#25D366"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ══════════════ Scroll To Top Button ══════════════ */}
      <div
        ref={sttBtnRef}
        className="fb-stt-btn"
        onClick={handleSttClick}
        onMouseEnter={handleSttEnter}
        onMouseLeave={handleSttLeave}
        aria-label="العودة للأعلى"
        role="button" tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleSttClick()}
      >
        {/* Particles */}
        <div ref={sttParticleRef} className="fb-particle-host" />

        {/* Orb */}
        <div ref={sttOrbRef} className="fb-stt-orb" />

        {/* Glow flash */}
        <div ref={sttGlowRef} className="fb-stt-glow" style={{ opacity: 0 }} />

        {/* Progress ring */}
        <svg className="fb-stt-ring-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="46" fill="none"
            stroke="rgba(124,58,237,0.15)" strokeWidth="2.5"/>
          <circle ref={sttProgressRef} cx="50" cy="50" r="46" fill="none"
            stroke="url(#stt-g)" strokeWidth="2.5" strokeLinecap="round"
            transform="rotate(-90 50 50)"/>
          <defs>
            <linearGradient id="stt-g" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#4F46E5"/>
              <stop offset="50%"  stopColor="#7C3AED"/>
              <stop offset="100%" stopColor="#A855F7"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Ghost echo */}
        <svg ref={sttGhostRef} className="fb-stt-ghost" viewBox="0 0 714.15 600.85" fill="none">
          <path stroke="rgba(168,85,247,0.25)" strokeWidth="50" strokeLinecap="round"
            d="m29.4,186.32s141.3-109.45,335.12-119.88l-11.12-12.49s-4.67-14,19.63-11.81l86.48,11.94s28.55,1.65,14.28,17.57l-36.24,34.59s-11.53,12.35-27.18,2.47l-21.96-23.06s-251.75,37.89-320.11,107.07c0,0-140.01,109.97-13.18,202.82,0,0,50.24,34.38,63.42,32.73,0,0,54.36,9.88,9.88-23.88-44.48-33.77-115.31-98.83,13.18-162.25,0,0,117.78-60.12,277.56-82.36,0,0,195.2-28.83,214.14-23.88,0,0,43.65-1.65,0-26.36,0,0-159.78-92.24-237.2-109.54,0,0-233.08,28.83-338.5,118.6,0,0-108,89.91-28.19,67.72Z"/>
          <path stroke="rgba(168,85,247,0.25)" strokeWidth="50" strokeLinecap="round"
            d="m684.75,414.53s-141.3,109.45-335.12,119.88l11.12,12.49s4.67,14-19.63,11.81l-86.48-11.94s-28.55-1.65-14.28-17.57l36.24-34.59s11.53-12.35,27.18-2.47l21.96,23.06s251.75-37.89,320.11-107.07c0,0,140.01-109.97,13.18-202.82,0,0-50.24-34.38-63.42-32.73,0,0-54.36-9.88-9.88,23.88,44.48,33.77,115.31,98.83-13.18,162.25,0,0-117.78,60.12-277.56,82.36,0,0-195.2,28.83-214.14,23.88,0,0-43.65,1.65,0,26.36,0,0,159.78,92.24,237.2,109.54,0,0,233.08-28.83,338.5-118.6,0,0,108-89.91,28.19-67.72Z"/>
        </svg>

        {/* Logo float */}
        <svg className="fb-stt-logo" viewBox="0 0 714.15 600.85" fill="none">
          <path ref={sttPath1Ref} className="fb-stt-path fb-stt-path--1"
            d="m29.4,186.32s141.3-109.45,335.12-119.88l-11.12-12.49s-4.67-14,19.63-11.81l86.48,11.94s28.55,1.65,14.28,17.57l-36.24,34.59s-11.53,12.35-27.18,2.47l-21.96-23.06s-251.75,37.89-320.11,107.07c0,0-140.01,109.97-13.18,202.82,0,0,50.24,34.38,63.42,32.73,0,0,54.36,9.88,9.88-23.88-44.48-33.77-115.31-98.83,13.18-162.25,0,0,117.78-60.12,277.56-82.36,0,0,195.2-28.83,214.14-23.88,0,0,43.65-1.65,0-26.36,0,0-159.78-92.24-237.2-109.54,0,0-233.08,28.83-338.5,118.6,0,0-108,89.91-28.19,67.72Z"/>
          <path ref={sttPath2Ref} className="fb-stt-path fb-stt-path--2"
            d="m684.75,414.53s-141.3,109.45-335.12,119.88l11.12,12.49s4.67,14-19.63,11.81l-86.48-11.94s-28.55-1.65-14.28-17.57l36.24-34.59s11.53-12.35,27.18-2.47l21.96,23.06s251.75-37.89,320.11-107.07c0,0,140.01-109.97,13.18-202.82,0,0-50.24-34.38-63.42-32.73,0,0-54.36-9.88-9.88,23.88,44.48,33.77,115.31,98.83-13.18,162.25,0,0-117.78,60.12-277.56,82.36,0,0-195.2,28.83-214.14,23.88,0,0-43.65,1.65,0,26.36,0,0,159.78,92.24,237.2,109.54,0,0,233.08-28.83,338.5-118.6,0,0,108-89.91,28.19-67.72Z"/>
          <defs>
            <linearGradient id="stt-logo-g" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#7C3AED"/>
              <stop offset="100%" stopColor="#A855F7"/>
            </linearGradient>
          </defs>
        </svg>

        {/* Scroll pct */}
        <span className="fb-stt-pct">{Math.round(scrollPct * 100)}%</span>
      </div>

    </div>
  );
}