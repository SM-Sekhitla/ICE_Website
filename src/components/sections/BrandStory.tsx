import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { company } from "@/data/company";
import { products } from "@/data/products";
import { ParallaxImage } from "@/components/animations/ParallaxImage";

const analyticsData = [
  { month: "Jan", completed: 1200 },
  { month: "Feb", completed: 1450 },
  { month: "Mar", completed: 1380 },
  { month: "Apr", completed: 1720 },
  { month: "May", completed: 1940 },
  { month: "Jun", completed: 2160 },
];
const monthlyTarget = 1800;
const chartMaximum = 2400;
const formatCount = (value: number) => value.toLocaleString("en-ZA");

export function Analytics() {
  const [view, setView] = useState<"chart" | "table">("chart");
  const latest = analyticsData[analyticsData.length - 1];
  const growth = Math.round((latest.completed / analyticsData[0].completed - 1) * 100);
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
            Explore Business Intelligence <span aria-hidden="true"><ArrowIcon /></span>
          </Link>
        </div>
        <div className="analytics-visual">
          <div className="chart-toolbar">
            <span className="chart-example mono">Sample dashboard</span>
            <div className="chart-view-switch" role="group" aria-label="Dashboard view">
              {(["chart", "table"] as const).map((option) => (
                <button
                  key={option}
                  aria-pressed={view === option}
                  aria-controls="analytics-results"
                  onClick={() => setView(option)}
                >
                  {option === "chart" ? "Chart" : "Data table"}
                </button>
              ))}
            </div>
          </div>
          <h3 className="chart-title">Service requests completed</h3>
          <p className="chart-subtitle">Monthly performance · January–June</p>
          <div className="chart-metrics">
            <div>
              <strong>{formatCount(latest.completed)}</strong>
              <span>Completed in June</span>
            </div>
            <div>
              <strong>+{growth}%</strong>
              <span>Compared with January</span>
            </div>
          </div>
          <div className="chart-legend">
            <span><i className="chart-legend-bar" /> Completed requests</span>
            <span><i className="chart-legend-target" /> Target: {formatCount(monthlyTarget)}/month</span>
          </div>
          <div id="analytics-results">
            {view === "chart" ? (
              <div className="requests-chart" role="img" aria-label={`Completed service requests, January to June. ${analyticsData.map((item) => `${item.month}: ${formatCount(item.completed)}`).join("; ")}. Monthly target: ${formatCount(monthlyTarget)} requests.`}>
                <span className="chart-unit">Requests</span>
                <div className="requests-plot" aria-hidden="true">
                  {[2400, 1800, 1200, 600, 0].map((tick) => (
                    <div className="chart-gridline" key={tick} style={{ bottom: `${tick / chartMaximum * 100}%` }}>
                      <span>{formatCount(tick)}</span>
                    </div>
                  ))}
                  <div className="chart-target-line" style={{ bottom: `${monthlyTarget / chartMaximum * 100}%` }} />
                  <div className="request-columns">
                    {analyticsData.map((item) => (
                      <div className="request-column" key={item.month}>
                        <motion.div
                          className={`request-bar${item.month === latest.month ? " request-bar-latest" : ""}`}
                          initial={reduced ? false : { height: 0 }}
                          whileInView={{ height: `${item.completed / chartMaximum * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: reduced ? 0 : 0.65 }}
                        >
                          <span className="request-value">{formatCount(item.completed)}</span>
                        </motion.div>
                        <span className="request-month">{item.month}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="chart-table-wrap">
                <table className="chart-table">
                  <caption className="sr-only">Monthly service requests completed against a target of {formatCount(monthlyTarget)}</caption>
                  <thead><tr><th scope="col">Month</th><th scope="col">Completed</th><th scope="col">Vs target</th></tr></thead>
                  <tbody>
                    {analyticsData.map((item) => (
                      <tr key={item.month}>
                        <th scope="row">{item.month}</th>
                        <td>{formatCount(item.completed)}</td>
                        <td>{item.completed >= monthlyTarget ? "+" : "−"}{formatCount(Math.abs(item.completed - monthlyTarget))}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="chart-insight">
            <span className="mono">What the data tells us</span>
            <p>Completions exceeded target in May and June. June finished <strong>{formatCount(latest.completed - monthlyTarget)} requests above target</strong>.</p>
          </div>
          <p className="chart-note">Illustrative sample data to demonstrate a dashboard. Not actual client results.</p>
        </div>
      </div>
    </section>
  );
}
export function Engineering() {
  return (
    <section className="section light-section engineering-section">
      <div className="section-label mono">
        03 / Engineering <span>Software + Enterprise architecture</span>
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
            <span aria-hidden="true"><ArrowIcon direction="down" /></span>
            <span>Identify the gaps</span>
            <span aria-hidden="true"><ArrowIcon direction="down" /></span>
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
        Meet our clients <span aria-hidden="true"><ArrowIcon /></span>
      </Link>
    </section>
  );
}
export function Collaboration() {
  return (
    <section className="section collaboration-section photo-story-section">
      <ParallaxImage src="/brand/team-editorial.jpg" />
      <div className="section-label mono">
        05 / How we work <span>Client collaboration</span>
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
          All eight products <span aria-hidden="true"><ArrowIcon /></span>
        </Link>
      </div>
      <div className="product-features-list">
        {products.slice(0, 3).map((product, i) => (
          <Link key={product.id} to={`/our-products#${product.id}`}>
            <span className="mono">0{i + 1}</span>
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <span aria-hidden="true"><ArrowIcon /></span>
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
        <span className="mono">06 / Our people</span>
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
          Get to know ICE <span aria-hidden="true"><ArrowIcon /></span>
        </Link>
      </div>
    </section>
  );
}
