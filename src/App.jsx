import { useState, useEffect, useCallback } from "react";




import {
  AnimationProvider,
  useAnimationReady,
} from "./context/AnimationContext";
import Loading from "./components/Loading";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Process from "./components/Process";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import FloatingButtons from "./components/FloatingButtons";

function AppInner() {
  const [loading, setLoading] = useState(true);
  const { setReady } = useAnimationReady();

  /* ── Bootstrap JS ──────────────────────────────────────────────── */
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  /* ── Disable scroll while loading ─────────────────────────────── */
  /* NOTE: removed body overflow:hidden — the loading-screen is position:fixed
     which already blocks interaction. Manipulating overflow causes scrollbar
     to appear/disappear on loading end, which creates CLS. */

  /* ── Called by Loading when its exit animation finishes ────────── */
  const handleLoadingComplete = useCallback(() => {
    /* Force scroll to top before revealing anything */
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    setLoading(false);

    /* Trigger hero animations — cap fonts wait at 300ms to not hurt LCP */
    const fontsOrTimeout = Promise.race([
      document.fonts.ready,
      new Promise((r) => setTimeout(r, 300)),
    ]);
    fontsOrTimeout.then(() => {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        setReady(true);
      });
    });
  }, [setReady]);


  return (
    <>
      <div className="noise-overlay" />

      {/* Loading stays mounted until its own animation finishes */}
      {loading && <Loading onComplete={handleLoadingComplete} />}

      {/* Shell preloads in background — hidden during loader, revealed after */}
      <div className={loading ? "app-shell-hidden" : "app-shell-visible"}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <TechStack />
          <Projects />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
      <FloatingButtons />
    </>
  );
}

export default function App() {
  return (
    <AnimationProvider>
      <AppInner />
    </AnimationProvider>
  );
}
