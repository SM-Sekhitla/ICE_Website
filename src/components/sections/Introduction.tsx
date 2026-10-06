import { ArrowIcon } from "@/components/ui/ArrowIcon";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { company } from "@/data/company";
import { Reveal } from "@/components/animations/Reveal";
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reduced = useReducedMotion();
  const [number, setNumber] = useState(value);
  useEffect(() => {
    if (!visible || reduced) return;
    let frame: number;
    const start = performance.now();
    const tick = (time: number) => {
      const p = Math.min((time - start) / 1200, 1);
      setNumber(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, reduced, value]);
  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      <span aria-hidden="true">
        {number}
        {suffix}
      </span>
    </span>
  );
}
export function Introduction({ full = false }: { full?: boolean }) {
  return (
    <section id="about-ice" className="section light-section">
      <div className="section-label mono">
        01 / About ICE <span>Who are we?</span>
      </div>
      <div className="editorial-split">
        <Reveal>
          <h2>
            INDUSTRIAL
            <br />
            COMPUTING
            <br />
            <span className="red-text">ENGINEERING.</span>
          </h2>
        </Reveal>
        <div className="body-copy">
          <p>{company.paragraphs[0]}</p>
          {full && company.paragraphs.slice(1).map((p) => <p key={p}>{p}</p>)}
          {!full && (
            <Link className="text-link" to="/about-us">
              The ICE story <span aria-hidden="true"><ArrowIcon /></span>
            </Link>
          )}
        </div>
      </div>
      <div className="stats-row">
        <div>
          <strong>
            <Counter value={2012} />
          </strong>
          <span className="mono">Established</span>
        </div>
        <div>
          <strong>
            <Counter value={30} suffix="+" />
          </strong>
          <span className="mono">Professionals</span>
        </div>
        <div>
          <strong>
            <Counter value={100} suffix="+" />
          </strong>
          <span className="mono">Years combined experience</span>
        </div>
        <div>
          <strong className="sector-stat">
            GOVERNMENT
            <br />+ PRIVATE
          </strong>
          <span className="mono">Sectors we serve</span>
        </div>
      </div>
    </section>
  );
}
