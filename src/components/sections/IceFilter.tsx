import { motion, useReducedMotion } from "framer-motion";
import { values } from "@/data/values";
import { ParallaxImage } from "@/components/animations/ParallaxImage";
export function IceFilter({ number = "05" }: { number?: string }) {
  const reduced = useReducedMotion();
  return (
    <section className="section filter-section" id="ice-filter">
      <ParallaxImage
        src="/brand/engineer-editorial.jpg"
        className="filter-backdrop"
      />
      <div className="section-label mono">
        {number} / The ICE Filter <span>Code of Ethics</span>
      </div>
      <div className="filter-layout">
        <div className="filter-heading">
          <h2>
            THE ICE
            <br />
            FILTER<span className="red-text">.</span>
          </h2>
          <p className="mono">The 12 Cardinal Values</p>
          <div className="filter-line" aria-hidden="true" />
          <p>Our values run through everything we do.</p>
        </div>
        <ol className="values-list">
          {values.map((value, i) => (
            <motion.li
              key={value}
              initial={reduced ? false : { opacity: 0.45, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduced ? undefined : { x: 8 }}
            >
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <span className="value-name" aria-label={value}>
                <span className="sr-only">{value}</span>
                <span aria-hidden="true">
                  {value.split(/(\s+|-)/).map((word, index) =>
                    /^[A-Za-z]/.test(word) ? (
                      <span className="value-word" key={index}>
                        <span className="value-initial">{word[0]}</span>
                        {word.slice(1)}
                      </span>
                    ) : (
                      word
                    ),
                  )}
                </span>
              </span>
              <span className="value-tick" aria-hidden="true" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
