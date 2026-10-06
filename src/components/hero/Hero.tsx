import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { company } from "@/data/company";
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const typeY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  return (
    <section className="hero" ref={ref}>
      <div className="hero-topline mono">
        <span>Industrial Computing Engineering</span>
        <span>Est. 2012 / South Africa</span>
      </div>
      <div className="hero-layout">
        <motion.div className="hero-copy" style={{ y: reduced ? 0 : typeY }}>
          <p className="eyebrow">
            <span className="status-dot" /> Advanced Analytics Group
          </p>
          <h1>
            <span>ENGINEERING</span>
            <span>DATA INTO</span>
            <span className="red-text">INTELLIGENCE.</span>
          </h1>
          <div className="hero-description">
            <span className="vertical-rule" />
            <p>
              A black-owned pioneering analytics firm. Software, data and
              technology solutions for government and the private sector.
            </p>
          </div>
          <Link className="button button-red" to="/our-services">
            Explore our capabilities <span aria-hidden="true"><ArrowIcon /></span>
          </Link>
        </motion.div>
        <div className="hero-art">
          <motion.img
            style={{ y: reduced ? 0 : imageY }}
            src="/brand/hero11.jpeg"
            alt="Technology exploration with virtual reality, from ICE’s original website"
            loading="eager"
          />
          <div className="hero-grid" aria-hidden="true" />
          <div className="image-cross cross-one" aria-hidden="true">
            +
          </div>
          <div className="image-cross cross-two" aria-hidden="true">
            +
          </div>
          <span className="hero-image-label mono">
            Human curiosity.
            <br />
            Engineered possibilities.
          </span>
          <div className="hero-image-bottom">
            <span className="mono">ICE / 2012</span>
            <span className="image-wordmark">ICE</span>
          </div>
          <div className="data-ribbon mono">
            <span>Software</span>
            <span>Data</span>
            <span>Engineering</span>
          </div>
        </div>
      </div>
      <div className="hero-bottom mono">
        <a href="#about-ice">
          Scroll to discover <span aria-hidden="true"><ArrowIcon direction="down" /></span>
        </a>
        <span>{company.tagline}</span>
        <span>01 — 12</span>
      </div>
    </section>
  );
}
