import { motion, useReducedMotion } from "framer-motion";
import { company } from "@/data/company";
export function Vision() {
  const reduced = useReducedMotion();
  return (
    <>
      <section className="section vision-section">
        <div className="section-label mono">
          08 / Vision <span>African-owned innovation</span>
        </div>
        <h2>
          {["TO LEAD IN", "AFRICAN-OWNED", "INNOVATION."].map((line, i) => (
            <motion.span
              key={line}
              initial={reduced ? false : { color: "#374151", x: -20 }}
              whileInView={{ color: i === 1 ? "#c1121f" : "#ffffff", x: 0 }}
              viewport={{ once: true, amount: 1 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              {line}
            </motion.span>
          ))}
        </h2>
        <p className="vision-copy">{company.vision}</p>
      </section>
      <section className="section mission-section">
        <div className="section-label mono">
          09 / Mission <span>Transformation with impact</span>
        </div>
        <div className="editorial-split">
          <h2>
            TECHNOLOGY.
            <br />
            TRANSFORMATION.
            <br />
            <span className="red-text">LONG-TERM IMPACT.</span>
          </h2>
          <p className="body-copy">{company.mission}</p>
        </div>
        <div className="mission-words">
          {["Efficiency", "Growth", "Sustainability"].map((word, i) => (
            <motion.span
              key={word}
              initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <small className="mono">0{i + 1}</small>
              {word}
            </motion.span>
          ))}
        </div>
      </section>
    </>
  );
}
