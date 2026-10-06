import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Link,
} from "react-router-dom";
import {
  MotionConfig,
  AnimatePresence,
  motion,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/ui/Footer";
import { HomePage } from "@/pages/HomePage";
import { StartupIntro } from "@/components/animations/StartupIntro";
const AboutPage = lazy(() =>
  import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })),
);
const CapabilitiesPage = lazy(() =>
  import("@/pages/CapabilitiesPage").then((m) => ({
    default: m.CapabilitiesPage,
  })),
);
const ProductsPage = lazy(() =>
  import("@/pages/ProductsPage").then((m) => ({ default: m.ProductsPage })),
);
const ClientsPage = lazy(() =>
  import("@/pages/ClientsPage").then((m) => ({ default: m.ClientsPage })),
);
const ContactPage = lazy(() =>
  import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
function SiteRoutes() {
  const location = useLocation();
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" });
      document.getElementById("main-content")?.focus({ preventScroll: true });
    }
    document.title =
      ((
        {
          "/": "Advanced Analytics Group",
          "/about-us": "About ICE",
          "/our-services": "Our Services",
          "/our-products": "Our Products",
          "/our-clients": "Our Clients",
          "/contact-us": "Contact ICE",
        } as Record<string, string>
      )[location.pathname] || "ICE") + " | Industrial Computing Engineering";
  }, [location.pathname, location.hash]);
  return (
    <>
      <motion.div
        aria-hidden="true"
        className="reading-progress"
        style={{ scaleX: scrollYProgress }}
      />
      <Navigation />
      {!reduced && (
        <motion.div
          key={location.pathname}
          aria-hidden="true"
          className="route-sweep"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: [0, 1, 0],
            transformOrigin: ["left", "left", "right"],
          }}
          transition={{ duration: 0.55 }}
        />
      )}
      <main id="main-content" tabIndex={-1}>
        <Suspense
          fallback={<div className="page-loading mono">Loading ICE…</div>}
        >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/our-services" element={<CapabilitiesPage />} />
            <Route path="/our-products" element={<ProductsPage />} />
            <Route path="/our-clients" element={<ClientsPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route
              path="/about"
              element={<Navigate to="/about-us" replace />}
            />
            <Route
              path="/capabilities"
              element={<Navigate to="/our-services" replace />}
            />
            <Route
              path="/projects"
              element={<Navigate to="/our-products" replace />}
            />
            <Route
              path="/contact"
              element={<Navigate to="/contact-us" replace />}
            />
            <Route path="/Home" element={<Navigate to="/" replace />} />
            <Route
              path="/insights"
              element={<ArchivePage title="Insights" />}
            />
            <Route path="/careers" element={<ArchivePage title="Careers" />} />
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>Page not found.</h1>
                  <Link className="text-link" to="/">
                    Return to ICE home ↗
                  </Link>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
function ArchivePage({ title }: { title: string }) {
  return (
    <section className="page-heading empty-page">
      <span className="mono">Industrial Computing Engineering</span>
      <h1>{title}</h1>
      <p>
        {title === "Careers"
          ? "For career enquiries, please contact ICE directly."
          : "Explore ICE’s services, products and company story."}
      </p>
      <Link
        className="text-link"
        to={title === "Careers" ? "/contact-us" : "/about-us"}
      >
        {title === "Careers" ? "Contact ICE" : "About ICE"} ↗
      </Link>
    </section>
  );
}
export default function App() {
  const reduced = useReducedMotion();
  const [introDone, setIntroDone] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const completeIntro = useCallback(() => setIntroDone(true), []);
  const showIntro = !introDone && !reduced;
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <div className="experience-shell">
          <AnimatePresence mode="wait">
            {showIntro ? (
              <StartupIntro key="startup" onComplete={completeIntro} />
            ) : (
              <motion.div
                className="site-stage"
                key="site"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.65, ease: "easeInOut" }}
              >
                <SiteRoutes />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
}
