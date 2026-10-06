import { Menu, X } from "lucide-react";
import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navigation } from "@/data/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
export function Navigation() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [surface, setSurface] = useState("brand");
  const header = useRef<HTMLElement>(null);
  const location = useLocation();
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.scrollY < 80 || open) {
        setSurface("brand");
        return;
      }
      const height = header.current?.getBoundingClientRect().height ?? 90;
      const section = document
        .elementFromPoint(window.innerWidth / 2, height + 8)
        ?.closest("section, .page-heading, footer");
      const classes = section?.classList;
      setSurface(
        classes?.contains("brand-section") || classes?.contains("cta-section")
          ? "brand"
          : [
                "hero",
                "analytics-section",
                "product-preview",
                "vision-section",
                "filter-section",
                "footer",
                "photo-story-section",
              ].some((name) => classes?.contains(name))
            ? "dark"
            : "light",
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [open, location.pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <motion.header
        className="navigation"
        ref={header}
        data-surface={surface}
        initial={reduced ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nav-inner">
          <Link
            className="brand-logo"
            to="/"
            aria-label="ICE — Industrial Computing Engineering home"
          >
            <img
              src="/brand/ice-logo.png"
              alt="Industrial Computing Engineering"
              width="2331"
              height="444"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((link) => (
              <NavLink key={link.path} to={link.path} end={link.path === "/"}>
                {({ isActive }) => (
                  <>
                    <span className="nav-label-window">{link.label}</span>
                    {isActive && (
                      <motion.span
                        className="nav-active-line"
                        layoutId="navigation-underline"
                        aria-hidden="true"
                        transition={{
                          duration: reduced ? 0 : 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <Link className="nav-contact" to="/contact-us">
            Reach out <ArrowIcon />
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.nav
              id="mobile-navigation"
              className="mobile-nav"
              aria-label="Mobile navigation"
              initial={reduced ? false : { height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: reduced ? 0 : 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="mobile-nav-inner">
                {navigation.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={reduced ? false : { x: -18, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      duration: reduced ? 0 : 0.35,
                      delay: reduced ? 0 : index * 0.045,
                    }}
                  >
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
