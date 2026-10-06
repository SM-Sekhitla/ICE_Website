import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { ParallaxImage } from "@/components/animations/ParallaxImage";

export function Analytics() {
  const [view, setView] = useState<"data" | "insight">("insight");
  const reduced = useReducedMotion();
  return (
    <section className="section analytics-section">
      <div className="section-label mono">
        03 / Advanced analytics <span>Data / Analysis / Decision</span>
      </div>
      <div className="editorial-split">
        <div>
          <h2>
            MAKE YOUR
            <br />
            DATA <em>MEAN</em>
            <br />
            SOMETHING.
          </h2>
          <p>
            Turn complex data into clear, actionable insights with customized
            dashboards and real-time analytics.
          </p>
          <Link to="/our-services" className="text-link">
            Explore Business Intelligence <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="analytics-visual">
          <div className="chart-toolbar mono">
            <span>From data to intelligence</span>
            <div role="group" aria-label="Illustrative data view">
              <button
                aria-pressed={view === "data"}
                onClick={() => setView("data")}
              >
                Data
              </button>
              <button
                aria-pressed={view === "insight"}
                onClick={() => setView("insight")}
              >
                Insight
              </button>
            </div>
          </div>
          <div
            className="chart-bars"
            aria-label={
              view === "data"
                ? "Illustrative unsorted data"
                : "Illustrative data arranged to reveal a trend"
            }
          >
            {Array.from({ length: 24 }, (_, i) => {
              const height =
                view === "data" ? 20 + ((i * 37) % 75) : 15 + i * 3;
              return (
                <motion.div
                  key={i}
                  animate={{ height: `${height}%` }}
                  transition={{
                    duration: reduced ? 0 : 0.65,
                    delay: reduced ? 0 : i * 0.012,
                  }}
                />
              );
            })}
          </div>
          <div className="chart-axis mono">
            <span>Observe</span>
            <span>Understand</span>
            <span>Act</span>
          </div>
          <p className="chart-note mono">
            Illustrative visualisation / Explore the data
          </p>
        </div>
      </div>
    </section>
  );
}
export function Engineering() {
  return (
    <section className="section light-section engineering-section">
      <div className="section-label mono">
        04 / Engineering <span>Software + Enterprise architecture</span>
      </div>
      <div className="editorial-split">
        <h2>
          THE RIGHT
          <br />
          FOUNDATION.
          <br />
          <span className="red-text">THE NEXT STEP.</span>
        </h2>
        <div className="body-copy">
          <p>{company.paragraphs[1]}</p>
          <div className="engineering-flow mono">
            <span>Current architecture</span>
            <span aria-hidden="true">↓</span>
            <span>Identify the gaps</span>
            <span aria-hidden="true">↓</span>
            <span>Future system roadmap</span>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Sectors() {
  return (
    <section className="section sectors-section">
      <div className="section-label mono">
        05 / Where we work <span>Government + Private sector</span>
      </div>
      <h2>
        PUBLIC <span className="red-text">+</span> PRIVATE.
      </h2>
      <div className="sector-panels">
        <div>
          <span className="mono">01 / Government</span>
          <h3>
            Better service.
            <br />
            Informed decisions.
          </h3>
          <p>
            Technological advancement, operational efficiency and improved
            service delivery.
          </p>
          <span className="sector-client mono">
            Department of Home Affairs
            <br />
            Government Printing Works
          </span>
        </div>
        <div>
          <span className="mono">02 / Private sector</span>
          <h3>
            Different challenges.
            <br />
            Tailored solutions.
          </h3>
          <p>
            Strategic transformation and technology solutions shaped around each
            client’s needs.
          </p>
          <span className="sector-client mono">
            Healthcare / Finance / Engineering
            <br />
            Legal / Investment / Holdings
          </span>
        </div>
      </div>
      <Link className="text-link" to="/our-clients">
        Meet our clients <span aria-hidden="true">↗</span>
      </Link>
    </section>
  );
}
export function Collaboration() {
  return (
    <section className="section collaboration-section photo-story-section">
      <ParallaxImage src="/brand/team-editorial.jpg" />
      <div className="section-label mono">
        06 / How we work <span>Client collaboration</span>
      </div>
      <div className="editorial-split">
        <h2>
          WE BLEND IN.
          <br />
          <span className="red-text">
            WE MAKE
            <br />A SOLUTION.
          </span>
        </h2>
        <div className="body-copy">
          <p>{company.paragraphs[2]}</p>
          <blockquote>“Like ICE, we blend in and make a solution.”</blockquote>
        </div>
      </div>
    </section>
  );
}
export function ProductExperience() {
  return (
    <section className="section product-preview">
      <div className="section-label mono">
        07 / Products & experience <span>Applied engineering</span>
      </div>
      <div className="section-title-row">
        <h2>
          INTELLIGENCE.
          <br />
          IN PRACTICE.
        </h2>
        <Link to="/our-products" className="text-link">
          All eight products <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <div className="product-features-list">
        {products.slice(0, 3).map((product, i) => (
          <Link key={product.id} to={`/our-products#${product.id}`}>
            <span className="mono">0{i + 1}</span>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span aria-hidden="true">↗</span>
          </Link>
        ))}
      </div>
      <div className="experience-strip">
        <strong>100</strong>
        <span className="mono">
          Projects delivered
          <br />
          Published on the ICE website
        </span>
        <strong>10</strong>
        <span className="mono">
          Years experience
          <br />
          Original website milestone
        </span>
      </div>
    </section>
  );
}
export function People() {
  const reduced = useReducedMotion();
  return (
    <section className="people-section">
      <div className="people-image">
        <motion.img
          initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
          whileInView={{ clipPath: "inset(0 0% 0 0)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          src="/brand/engineer-editorial.jpg"
          alt="Software professional working across code editors and multiple screens"
          loading="lazy"
        />
        <span className="mono">People / Ideas / Possibilities</span>
      </div>
      <div className="people-copy">
        <span className="mono">11 / Our people</span>
        <h2>
          DIVERSE MINDS.
          <br />
          <span className="red-text">
            SHARED
            <br />
            AMBITION.
          </span>
        </h2>
        <p>
          A diverse team of over 30 professionals, many of them young and
          innovative. Over 100 years of combined experience, brought together at
          ICE.
        </p>
        <Link to="/about-us" className="text-link">
          Get to know ICE <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
