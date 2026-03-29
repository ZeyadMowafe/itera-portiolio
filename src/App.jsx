import { useState, useEffect, useCallback } from "react";
import { Routes, Route } from "react-router-dom";

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
import PrivacyPolicy from "./components/LegalPrivacy";
import TermsOfService from "./components/TermsOfService";
import Testimonials from "./components/Testimonials";

/* ── Main portfolio page ─────────────────────────────────────────── */
function AppInner() {
  const [loading, setLoading] = useState(true);
  const { setReady } = useAnimationReady();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleLoadingComplete = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    setLoading(false);

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

      {loading && <Loading onComplete={handleLoadingComplete} />}

      <div className={loading ? "app-shell-hidden" : "app-shell-visible"}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <TechStack />
          <Projects />
          <Testimonials />
          <Process />
          <Contact />
        </main>
        <Footer />
      </div>
      <FloatingButtons />
    </>
  );
}

/* ── Legal page wrapper — no Navbar, has FloatingButtons ── */
function LegalPage({ children }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <>
      <div className="noise-overlay" />
      {children}
      <Footer />
      <FloatingButtons />
    </>
  );
}

/* ── Root with routing ───────────────────────────────────────────── */
export default function App() {
  return (
    <AnimationProvider>
      <Routes>
        <Route path="/" element={<AppInner />} />

        <Route
          path="/privacy-policy"
          element={
            <LegalPage>
              <PrivacyPolicy />
            </LegalPage>
          }
        />
        <Route
          path="/terms-of-service"
          element={
            <LegalPage>
              <TermsOfService />
            </LegalPage>
          }
        />
      </Routes>
    </AnimationProvider>
  );
}
