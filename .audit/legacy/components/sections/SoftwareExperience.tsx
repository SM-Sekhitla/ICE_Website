import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal, MaskReveal } from "@/components/animations/Reveal";
import { TERMINAL_LINES } from "@/data/site";

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i >= TERMINAL_LINES.length) {
        clearInterval(interval);
        return;
      }
      setVisibleLines(i + 1);
      i++;
    }, 200);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="ice-border ice-glass relative overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between border-b border-cyan-ice/10 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white-dim/20" />
          <span className="h-2 w-2 rounded-full bg-white-dim/20" />
          <span className="h-2 w-2 rounded-full bg-cyan-ice/40" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white-dim/40">
          ice@system: ~/innovation
        </span>
        <span className="font-mono text-[10px] text-cyan-ice/30">
          SYS::ACTIVE
        </span>
      </div>

      {/* Terminal body */}
      <div className="h-[460px] overflow-hidden p-5 font-mono text-xs leading-relaxed">
        {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={`whitespace-pre ${
              line.startsWith("ice@")
                ? "text-cyan-glow"
                : line.startsWith(">")
                  ? "text-cyan-ice/60"
                  : line.startsWith("STATUS")
                    ? "text-cyan-electric"
                    : line.startsWith("{") ||
                        line.startsWith("}") ||
                        line.startsWith("  ")
                      ? "text-white-dim/70"
                      : line.startsWith("GET")
                        ? "text-cyan-glow"
                        : "text-white-dim/50"
            }`}
          >
            {line}
            {i === visibleLines - 1 && i < TERMINAL_LINES.length && (
              <span className="ml-1 inline-block h-3 w-2 animate-blink bg-cyan-ice" />
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const CODE_BLOCKS = [
  {
    label: "ARCHITECTURE",
    lines: [
      "frontend /",
      "  components /",
      "    modules /",
      "  services /",
      "backend /",
      "  api /",
      "  domain /",
      "infrastructure /",
    ],
  },
  {
    label: "API RESPONSE",
    lines: [
      "{",
      '  "system": "ice",',
      '  "status": "operational",',
      '  "services": 12,',
      '  "uptime": "99.99%",',
      '  "region": "africa"',
      "}",
    ],
  },
];

export function SoftwareExperience() {
  return (
    <section className="relative z-10 py-32 lg:py-48">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-12">
        <Reveal>
          <SectionLabel num="05" label="SOFTWARE EXPERIENCE" />
        </Reveal>

        <div className="mt-12 max-w-5xl">
          <MaskReveal>
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight text-white-frost">
              Engineered
            </h2>
          </MaskReveal>
          <MaskReveal delay={0.1}>
            <h2 className="font-display text-section font-bold uppercase leading-[0.9] tracking-tight ice-gradient-cyan">
              in code.
            </h2>
          </MaskReveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Terminal */}
          <Reveal>
            <Terminal />
          </Reveal>

          {/* Code blocks */}
          <div className="grid grid-cols-1 gap-8">
            {CODE_BLOCKS.map((block, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <div className="ice-border ice-glass p-5">
                  <div className="mb-3 flex items-center justify-between border-b border-cyan-ice/10 pb-2.5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-ice">
                      {block.label}
                    </span>
                    <span className="font-mono text-[10px] text-white-dim/30">
                      ICE.NODE.{String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="font-mono text-xs leading-relaxed">
                    {block.lines.map((line, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: j * 0.05, duration: 0.4 }}
                        className={`whitespace-pre ${
                          line.includes('"')
                            ? "text-cyan-glow"
                            : line.includes("/")
                              ? "text-white-dim/50"
                              : "text-white-dim/70"
                        }`}
                      >
                        {line}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}

            {/* Database query block */}
            <Reveal delay={0.2}>
              <div className="ice-border ice-glass p-5">
                <div className="mb-3 flex items-center justify-between border-b border-cyan-ice/10 pb-2.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-ice">
                    DATABASE QUERY
                  </span>
                  <span className="font-mono text-[10px] text-cyan-electric">
                    200 OK / 12ms
                  </span>
                </div>
                <div className="font-mono text-xs leading-relaxed text-white-dim/60">
                  <div>
                    <span className="text-cyan-glow">SELECT</span> capability,
                    impact, scale
                  </div>
                  <div>
                    <span className="text-cyan-glow">FROM</span> ice.engineering
                  </div>
                  <div>
                    <span className="text-cyan-glow">WHERE</span> region ={" "}
                    <span className="text-cyan-electric">'Africa'</span>
                  </div>
                  <div>
                    <span className="text-cyan-glow">AND</span> status ={" "}
                    <span className="text-cyan-electric">'ACTIVE'</span>
                  </div>
                  <div>
                    <span className="text-cyan-glow">ORDER BY</span> excellence{" "}
                    <span className="text-cyan-glow">DESC</span>;
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
