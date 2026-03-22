import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import { useAnimationReady } from "../context/AnimationContext";
import "./Hero.css";

/* ─── Scramble text hook ────────────────────────────────────────── */
const CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
function useScramble(target, ready, delay = 0) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !ready) return;
    const el = ref.current;
    let frame = 0;
    let raf;
    const totalFrames = 32;
    const startDelay = delay * 60;
    let tick = 0;
    const run = () => {
      raf = requestAnimationFrame(run);
      tick++;
      if (tick < startDelay) return;
      const progress = Math.min(frame / totalFrames, 1);
      const revealIndex = Math.floor(progress * target.length);
      el.textContent = target
        .split("")
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < revealIndex) return ch;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      frame++;
      if (frame > totalFrames) cancelAnimationFrame(raf);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, ready]);
  return ref;
}

/* ─── Animated counter ──────────────────────────────────────────── */
function Counter({ to, suffix, delay }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const num = parseFloat(to);
    const start = { v: 0 };
    const timer = setTimeout(() => {
      gsap.to(start, {
        v: num,
        duration: 1.6,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = Math.floor(start.v) + suffix;
        },
      });
    }, delay);
    return () => clearTimeout(timer);
  }, [to, suffix, delay]);
  return <span ref={ref}>0{suffix}</span>;
}

export default function Hero() {
  const { ready } = useAnimationReady();
  const canvasRef = useRef(null);
  const headlineRef = useRef(null);
  const subtextRef = useRef(null);
  const buttonsRef = useRef(null);
  const badgeRef = useRef(null);
  const statsRef = useRef(null);
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  const line1Ref = useScramble("We Build", ready, 0.4);
  const line2WordRef = useScramble("Powerful", ready, 0.7);

  /* ── Hide elements immediately on mount (before loader finishes) ── */
  useEffect(() => {
    const els = [
      badgeRef.current,
      headlineRef.current,
      subtextRef.current,
      buttonsRef.current,
      statsRef.current,
    ];
    /* Set initial hidden state to 0.01 so LCP registers immediately!
       (Opacity 0 is ignored by Chromium LCP metric) */
    gsap.set(badgeRef.current, { opacity: 0.01, y: 20 });
    gsap.set(headlineRef.current?.querySelectorAll(".hero-line") || [], { opacity: 0.01, y: 40 });
    gsap.set(subtextRef.current, { opacity: 0.01, y: 22 });
    gsap.set(buttonsRef.current?.children || [], { opacity: 0.01, scale: 0.85, y: 14 });
    gsap.set(statsRef.current?.children || [], { opacity: 0.01, y: 22 });

    els.forEach((el) => {
      if (el) el.style.willChange = "transform, opacity";
    });
    return () => {
      els.forEach((el) => {
        if (el) el.style.willChange = "auto";
      });
    };
  }, []);

  /* ── Three.js ─────────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.offsetWidth / canvas.offsetHeight,
      0.1,
      100,
    );
    camera.position.z = 5;

    const count = window.devicePixelRatio > 1 ? 1400 : 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const origPositions = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#7C3AED"),
      new THREE.Color("#A855F7"),
      new THREE.Color("#4F46E5"),
      new THREE.Color("#C084FC"),
    ];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 22;
      const y = (Math.random() - 0.5) * 22;
      const z = (Math.random() - 0.5) * 12;
      positions[i * 3] = x;
      origPositions[i * 3] = x;
      positions[i * 3 + 1] = y;
      origPositions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      origPositions[i * 3 + 2] = z;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(geo, mat);
    scene.add(particles);
    gsap.to(mat, { opacity: 0.6, duration: 2.2, ease: "power2.inOut" });

    const shapes = [];
    const geoList = [
      new THREE.IcosahedronGeometry(1.1, 0),
      new THREE.OctahedronGeometry(0.85, 0),
      new THREE.TetrahedronGeometry(0.7, 0),
      new THREE.TorusGeometry(0.6, 0.12, 8, 16),
    ];
    geoList.forEach((g, i) => {
      const m = new THREE.MeshBasicMaterial({
        color: [0x7c3aed, 0xa855f7, 0x4f46e5, 0xc084fc][i],
        wireframe: true,
        transparent: true,
        opacity: 0,
      });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set(
        [-3.5, 3.2, -2.8, 4][i],
        [1.2, -2, 2.5, -0.8][i],
        [-1, 0, -2, -1.5][i],
      );
      mesh.scale.setScalar(0.01);
      scene.add(mesh);
      shapes.push(mesh);
      gsap.to(mesh.scale, {
        x: 1,
        y: 1,
        z: 1,
        duration: 1.4,
        delay: 0.3 + i * 0.2,
        ease: "elastic.out(1,0.6)",
      });
      gsap.to(m, {
        opacity: [0.12, 0.09, 0.08, 0.06][i],
        duration: 1.2,
        delay: 0.5 + i * 0.2,
      });
    });

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.8, 0.008, 4, 120),
      new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0,
      }),
    );
    ring.rotation.x = Math.PI / 3;
    scene.add(ring);
    gsap.to(ring.material, { opacity: 0.18, duration: 2, delay: 0.8 });
    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(4.2, 0.004, 4, 120),
      new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0,
      }),
    );
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    scene.add(ring2);
    gsap.to(ring2.material, { opacity: 0.1, duration: 2, delay: 1.1 });

    const handleResize = () => {
      const w = canvas.offsetWidth,
        h = canvas.offsetHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const mouse = { x: 0, y: 0 };
    const handleMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = performance.now() * 0.001;
      particles.scale.setScalar(1 + Math.sin(t * 0.4) * 0.015);
      particles.rotation.y = t * 0.025;
      particles.rotation.x = t * 0.008;
      shapes.forEach((s, i) => {
        s.rotation.x = t * [0.25, 0.18, 0.35, 0.15][i] + mouse.y * 0.3;
        s.rotation.y = t * [0.18, 0.32, 0.22, 0.28][i] + mouse.x * 0.3;
        s.position.y += Math.sin(t * [0.5, 0.7, 0.4, 0.6][i] + i) * 0.0025;
      });
      ring.rotation.z = t * 0.06;
      ring2.rotation.z = -t * 0.04;
      ring.rotation.y = mouse.x * 0.15;
      ring2.rotation.x = -Math.PI / 4 + mouse.y * 0.1;
      camera.position.x += (mouse.x * 0.35 - camera.position.x) * 0.025;
      camera.position.y += (mouse.y * 0.25 - camera.position.y) * 0.025;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouse);
      renderer.dispose();
    };
  }, []);

  /* ── GSAP entrance — fires only when loader is done ────────────── */
  useEffect(() => {
    if (!ready) return;
    const lines = headlineRef.current?.querySelectorAll(".hero-line");
    if (!lines?.length) return;
    /* force3D puts all transforms on GPU compositor thread */
    gsap.defaults({ force3D: true });

    const tl = gsap.timeline({ delay: 0.15 });
    tl.fromTo(
      badgeRef.current,
      { opacity: 0.01, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    )
      .to(badgeRef.current, {
        keyframes: [
          { x: -3, duration: 0.05 },
          { x: 3, duration: 0.05 },
          { x: -2, duration: 0.04 },
          { x: 0, duration: 0.05 },
        ],
      })
      .fromTo(
        lines,
        { opacity: 0.01, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power4.out" },
        "-=0.2",
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0.01, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
        "-=0.35",
      )
      .fromTo(
        buttonsRef.current.children,
        { opacity: 0.01, scale: 0.85, y: 14 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
        },
        "-=0.25",
      )
      .fromTo(
        statsRef.current.children,
        { opacity: 0.01, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.2",
      );
    return () => tl.kill();
  }, [ready]);

  /* ── Magnetic buttons ──────────────────────────────────────────── */
  useEffect(() => {
    if (!buttonsRef.current) return;
    const btns = Array.from(buttonsRef.current.children);
    const cleanups = btns.map((btn) => {
      const onMove = (e) => {
        const r = btn.getBoundingClientRect();
        gsap.to(btn, {
          x: (e.clientX - r.left - r.width / 2) * 0.3,
          y: (e.clientY - r.top - r.height / 2) * 0.3,
          duration: 0.4,
          ease: "power2.out",
        });
      };
      const onLeave = () =>
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
      btn.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    });
    return () => cleanups.forEach((c) => c());
  }, []);

  /* ── Custom cursor ─────────────────────────────────────────────── */
  useEffect(() => {
    const cursor = cursorRef.current,
      dot = cursorDotRef.current;
    if (!cursor || !dot) return;
    let cx = 0,
      cy = 0,
      tx = 0,
      ty = 0;
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", move);
    let raf;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      cursor.style.transform = `translate(${cx - 16}px,${cy - 16}px)`;
      dot.style.transform = `translate(${tx - 3}px,${ty - 3}px)`;
    };
    loop();
    const grow = () =>
      gsap.to(cursor, { scale: 2.2, opacity: 0.5, duration: 0.3 });
    const shrink = () =>
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    document.querySelectorAll("a,button").forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
    };
  }, []);

  /* ── Parallax on scroll ─────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (headlineRef.current) gsap.set(headlineRef.current, { y: y * 0.22 });
      if (subtextRef.current) gsap.set(subtextRef.current, { y: y * 0.12 });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScroll = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div ref={cursorRef} style={cursorStyle} />
      <div ref={cursorDotRef} style={cursorDotStyle} />

      <section ref={sectionRef} className="hero-section" id="home">
        <canvas ref={canvasRef} className="hero-canvas" />
        <div className="hero-gradient-overlay" />

        <div className="hero-grid-lines" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="grid-line" style={{ "--i": i }} />
          ))}
        </div>

        <div className="container-xl hero-content">
          <div ref={badgeRef} className="label-chip hero-badge">
            <span className="dot dot--pulse" />
            Full-Stack Development Studio
          </div>

          {/* ↓ div بدل span — Bootstrap مش بيعمل override على div */}
          <h1 ref={headlineRef} className="hero-headline">
            <div className="hero-line">
              <span ref={line1Ref}>We Build</span>
            </div>
            <div className="hero-line">
              <span ref={line2WordRef} className="gradient-text">
                Powerful
              </span>{" "}
              Digital
            </div>
            <div className="hero-line">Systems</div>
          </h1>

          <p ref={subtextRef} className="hero-subtext">
            Itera crafts scalable web platforms, custom management systems, and
            modern digital experiences — engineered for performance, designed
            for people.
          </p>

          <div ref={buttonsRef} className="hero-buttons">
            <button
              className="btn-itera hero-btn-primary"
              onClick={() => handleScroll("#projects")}
            >
              View Our Work
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="btn-itera-outline hero-btn-outline"
              onClick={() => handleScroll("#contact")}
            >
              Start a Project
            </button>
          </div>

          <div ref={statsRef} className="hero-stats">
            {[
              {
                value: "50",
                suffix: "+",
                label: "Projects Delivered",
                delay: 900,
              },
              {
                value: "100",
                suffix: "%",
                label: "Client Satisfaction",
                delay: 1050,
              },
              {
                value: "5",
                suffix: "+",
                label: "Years Experience",
                delay: 1200,
              },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat">
                <span className="hero-stat-value">
                  <Counter
                    to={stat.value}
                    suffix={stat.suffix}
                    delay={stat.delay}
                  />
                </span>
                <span className="hero-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-scroll-indicator">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>
    </>
  );
}

const cursorStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "1.5px solid rgba(124,58,237,0.7)",
  pointerEvents: "none",
  zIndex: 9999,
  willChange: "transform",
};
const cursorDotStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 6,
  height: 6,
  borderRadius: "50%",
  background: "#7C3AED",
  pointerEvents: "none",
  zIndex: 9999,
  willChange: "transform",
};
