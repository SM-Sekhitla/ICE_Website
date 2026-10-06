import { useState } from "react";
import { Link } from "react-router-dom";
import { services } from "@/data/services";
export function Capabilities({ full = false }: { full?: boolean }) {
  const [active, setActive] = useState(0);
  const list = full ? services : services.slice(0, 5);
  return (
    <section className="section brand-section" id="capabilities">
      <div className="section-label mono">
        02 / Our services <span>Technology with purpose</span>
      </div>
      <div className="capability-layout">
        <div className="capability-intro">
          <h2>
            COMPLEXITY.
            <br />
            MEET CLARITY.
          </h2>
          <p>
            IT, software solutions and data analytics. Tailored to the way your
            organisation works.
          </p>
          <div className="capability-diagram" aria-hidden="true">
            <div className="diagram-ring" />
            <span>{String(active + 1).padStart(2, "0")}</span>
            <div className="diagram-axis" />
          </div>
          <span className="mono">ICE / Engineering solutions</span>
        </div>
        <div className="service-index">
          {list.map((service, i) => (
            <div
              className={`service-item ${active === i ? "active" : ""}`}
              key={service.id}
              onMouseEnter={() => setActive(i)}
            >
              <button
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-expanded={active === i}
                aria-controls={`${service.id}-description`}
              >
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <span>{service.title}</span>
                <span aria-hidden="true">{active === i ? "−" : "+"}</span>
              </button>
              <div
                id={`${service.id}-description`}
                className="service-description"
                hidden={active !== i}
              >
                <p>{service.description}</p>
                <Link
                  to={`/contact-us?service=${encodeURIComponent(service.title)}`}
                  className="text-link"
                >
                  Discuss this service <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          ))}
          {!full && (
            <Link className="text-link all-services" to="/our-services">
              View all services <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
      </div>
      {full && (
        <div className="service-context">
          <span className="mono">Across our practice</span>
          <p>
            Data analytics / ICT facilities management / Digital transformation
            / Business Anomaly Detection
          </p>
          <p>
            ICE’s company profile and service overview also describe Business
            Enterprise Architecture and ICT Systems Integration Service.
          </p>
        </div>
      )}
    </section>
  );
}
