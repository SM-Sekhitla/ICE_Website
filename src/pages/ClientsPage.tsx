import { useState } from "react";
import { clients } from "@/data/clients";
import { CallToAction } from "@/components/sections/CallToAction";
export function ClientsPage() {
  const [filter, setFilter] = useState("All");
  const visible = clients.filter(
    (client) =>
      filter === "All" ||
      (filter === "Government"
        ? client.sector === "Government"
        : client.sector !== "Government"),
  );
  return (
    <>
      <header className="page-heading">
        <span className="mono">ICE / Our clients</span>
        <h1>
          PUBLIC <span className="red-text">+</span>
          <br />
          PRIVATE.
        </h1>
        <p>
          Working closely with clients to deliver tailored technology solutions
          and long-term impact.
        </p>
      </header>
      <section className="section">
        <div
          className="client-controls"
          role="group"
          aria-label="Filter clients"
        >
          {["All", "Government", "Private sector"].map((option) => (
            <button
              key={option}
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <p className="mono" role="status">
          {visible.length} clients
        </p>
        <div className="client-list">
          {visible.map((client) => (
            <article key={client.name} className="client-entry">
              <img
                src={client.image}
                alt={`${client.name} logo`}
                loading="lazy"
              />
              <h2>{client.name}</h2>
              <p className="mono">{client.sector}</p>
            </article>
          ))}
        </div>
      </section>
      <CallToAction />
    </>
  );
}
